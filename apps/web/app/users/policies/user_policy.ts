import { BasePolicy } from '@adonisjs/bouncer'
import { type AuthorizerResponse } from '@adonisjs/bouncer/types'

import type User from '#users/models/user'

export default class UserPolicy extends BasePolicy {
  viewList(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }

  view(currentUser: User, user: User): AuthorizerResponse {
    return currentUser.isAdmin || currentUser.uuid === user.uuid
  }

  create(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }

  update(currentUser: User, user: User): AuthorizerResponse {
    return currentUser.isAdmin || currentUser.uuid === user.uuid
  }

  delete(currentUser: User, user: User): AuthorizerResponse {
    return currentUser.isAdmin && currentUser.uuid !== user.uuid
  }

  invite(currentUser: User): AuthorizerResponse {
    return currentUser.isAdmin
  }
}
