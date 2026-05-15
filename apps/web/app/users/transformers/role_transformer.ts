import { BaseTransformer } from '@adonisjs/core/transformers'
import type Role from '#users/models/role'

export default class RoleTransformer extends BaseTransformer<Role> {
  toObject() {
    return this.pick(this.resource, ['uuid', 'name', 'description', 'permissions'])
  }
}
