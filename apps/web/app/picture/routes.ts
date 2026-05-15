import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PicturesController = () => import('#picture/controllers/pictures_controller')

router
  .resource('/dashboard/pictures', PicturesController)
  .only(['index', 'store', 'update', 'destroy'])
  .use('*', middleware.auth())
  .as('pictures')
