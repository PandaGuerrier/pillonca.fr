import type { HttpContext } from '@adonisjs/core/http'

import Picture from '#picture/models/picture'
import PictureTransformer from '#picture/transformers/picture_transformer'
import {
  createPictureValidator,
  editPictureValidator,
  listPictureValidator,
} from '#picture/validators'
import { attachmentManager } from '@jrmc/adonis-attachment'

export default class PicturesController {
  public async index({ inertia, request }: HttpContext) {
    const payload = await request.validateUsing(listPictureValidator)

    const limit = payload.perPage || 20
    const page = payload.page || 1

    const query = Picture.query().orderBy('created_at', 'desc')

    if (payload.q) {
      query.where((sub) => {
        sub
          .where('title', 'ilike', `%${payload.q}%`)
          .orWhere('description', 'ilike', `%${payload.q}%`)
      })
    }

    const pictures = await query.paginate(page, limit)

    return inertia.render('picture/index', {
      pictures: PictureTransformer.paginate(pictures.all(), pictures.getMeta()),
      q: payload.q,
    })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createPictureValidator)

    await Picture.create({
      title: payload.title,
      description: payload.description ?? null,
      isActive: payload.isActive ?? true,
      file: await attachmentManager.createFromFile(payload.file),
    })

    return response.redirect().toRoute('pictures.index')
  }

  public async update({ params, request, response }: HttpContext) {
    const picture = await Picture.findOrFail(params.id)
    const payload = await request.validateUsing(editPictureValidator)

    if (payload.file) {
      picture.file = await attachmentManager.createFromFile(payload.file)
    }

    picture.merge({
      title: payload.title,
      description: payload.description ?? null,
      isActive: payload.isActive ?? picture.isActive,
    })

    await picture.save()

    return response.redirect().toRoute('pictures.index')
  }

  public async destroy({ params, response }: HttpContext) {
    const picture = await Picture.findOrFail(params.id)

    await picture.delete()

    return response.redirect().toRoute('pictures.index')
  }
}
