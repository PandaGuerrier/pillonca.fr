import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import {
  afterCreate,
  afterFetch,
  afterFind,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

import { attachment, attachmentManager } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'

import BaseModel from '#common/models/base_model'
import Role from '#users/models/role'

import ResetPasswordToken from '#users/models/reset_password_token'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare roleUuid: string

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string | null

  @attachment({ preComputeUrl: false, variants: ['thumbnail'] })
  declare avatar: Attachment

  @column()
  declare avatarUrl: string | null

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => ResetPasswordToken)
  declare resetPasswordTokens: HasMany<typeof ResetPasswordToken>

  get isAdmin(): boolean {
    return this.role?.permissions?.some((p) => p === 'user:manage') ?? false
  }

  public static async computeAvatarUrl(user: User) {
    if (!user.avatar) {
      return
    }

    const thumbnail = user.avatar.getVariant('thumbnail')

    if (thumbnail) {
      await attachmentManager.computeUrl(thumbnail)
    }
  }

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uuid = randomUUID()
  }

  @afterFind()
  public static async runAfterFind(user: User) {
    if (user.roleUuid) {
      await user.load('role')
    }
    await this.computeAvatarUrl(user)
  }

  @afterFetch()
  public static async runAfterFetch(users: User[]) {
    await Promise.all(
      users.map((user) => {
        const promises = [this.computeAvatarUrl(user)]
        if (user.roleUuid) {
          promises.push(user.load('role'))
        }
        return Promise.all(promises)
      })
    )
  }

  @afterCreate()
  public static async assignDefault(user: User) {
    const userRole = await Role.findByOrFail('name', 'Utilisateur')
    await user.related('role').associate(userRole)
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
