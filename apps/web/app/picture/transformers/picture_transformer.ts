import { BaseTransformer } from '@adonisjs/core/transformers'
import type Picture from '#picture/models/picture'

export default class PictureTransformer extends BaseTransformer<Picture> {
  toObject() {
    const picture = this.resource

    return {
      ...this.pick(picture, ['uuid', 'title', 'description', 'isActive', 'createdAt', 'updatedAt']),
      fileUrl: picture.file?.getVariant('webp')?.url ?? null,
    }
  }
}
