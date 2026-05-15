import type { HttpContext } from '@adonisjs/core/http'

import Picture from '#picture/models/picture'
import PictureTransformer from '#picture/transformers/picture_transformer'

export default class MarketingController {
  public async handle({ inertia }: HttpContext) {
    const pictures = await Picture.query().where('is_active', true).orderBy('created_at', 'desc')

    return inertia.render('marketing/show', {
      pictures: PictureTransformer.transform(pictures),
    })
  }
}
