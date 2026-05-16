/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SignInController = () => import('#auth/controllers/sign_in_controller')
const SignOutController = () => import('#auth/controllers/sign_out_controller')

router.get('/login', [SignInController, 'show']).use(middleware.guest()).as('auth.sign_in.show')
router.post('/login', [SignInController]).as('auth.sign_in.handle')
router.post('/logout', [SignOutController]).as('auth.sign_out.handle')

router
  .post('/switch/:locale', () => {})
  .use(middleware.switchLocale())
  .as('locale.switch')
