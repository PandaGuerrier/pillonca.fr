import { BaseTransformer } from '@adonisjs/core/transformers'
import type User from '#users/models/user'
import RoleTransformer from '#users/transformers/role_transformer'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    const user = this.resource
    const thumbnail = user.avatar?.getVariant('thumbnail')?.url

    return {
      ...this.pick(this.resource, ['uuid', 'fullName', 'email', 'avatarUrl', 'roleUuid']),
      thumbnail: thumbnail,
      role: RoleTransformer.transform(this.whenLoaded(user.role)),
    }
  }
}
