import { inject } from '@adonisjs/core/container'
import { HttpContext } from '@adonisjs/core/http'

import User from '#users/models/user'

import { forgotPasswordValidator } from '#auth/validators'

import PasswordResetService from '#users/services/password_reset_service'

@inject()
export default class ForgotPasswordController {
  constructor(private passwordResetService: PasswordResetService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password', {})
  }

  async handle({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(forgotPasswordValidator)

    const user = await User.findBy('email', validatedData.email)

    if (!user) {
      return response.redirect().toRoute('auth.sign_in.show')
    }

    await this.passwordResetService.generateToken(user)

    return response.redirect().toRoute('auth.sign_in.show')
  }
}
