import router from '@adonisjs/core/services/router'

const MarketingController = () => import('#marketing/controllers/marketing_controller')

router.get('/', [MarketingController, 'handle']).as('marketing.show')
router.get('/mentions-legales', [MarketingController, 'mentionsLegales']).as('marketing.mentions_legales')
router.get('/politique-de-confidentialite', [MarketingController, 'politiqueDeConfidentialite']).as('marketing.politique_de_confidentialite')
