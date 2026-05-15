import { inject } from '@adonisjs/core/container'
import type { HttpContext } from '@adonisjs/core/http'

import User from '#users/models/user'

import UserPolicy from '#users/policies/user_policy'
import PasswordResetService from '#users/services/password_reset_service'

import { inviteUserValidator } from '#users/validators'

@inject()
export default class InviteController {
  constructor(private passwordResetService: PasswordResetService) {}

  public async handle({ bouncer, request, response }: HttpContext) {
    await bouncer.with(UserPolicy).authorize('invite')

    const payload = await request.validateUsing(inviteUserValidator)

    const user = await User.create({
      email: payload.email,
      roleUuid: payload.roleUuid,
    })

    await user.save()

    await this.passwordResetService.generateToken(user)

    return response.redirect().toRoute('users.index')
  }
}
