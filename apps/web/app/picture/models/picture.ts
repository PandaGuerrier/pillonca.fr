import { beforeCreate, column } from '@adonisjs/lucid/orm'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { randomUUID } from 'node:crypto'

import BaseModel from '#common/models/base_model'

export default class Picture extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @attachment({ preComputeUrl: true, variants: ['webp'] })
  declare file: Attachment

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare isActive: boolean

  @beforeCreate()
  public static assignUuid(picture: Picture) {
    picture.uuid = randomUUID()
  }
}
