import vine from '@vinejs/vine'
import { baseSearchValidator } from '#common/validators/search'

export const createPictureValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().maxLength(2000).optional(),
    isActive: vine.boolean().optional(),
    file: vine.file({
      extnames: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
      size: 10 * 1024 * 1024,
    }),
  })
)

export const editPictureValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().maxLength(2000).optional(),
    isActive: vine.boolean().optional(),
    file: vine
      .file({
        extnames: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
        size: 10 * 1024 * 1024,
      })
      .optional(),
  })
)

export const listPictureValidator = vine.compile(
  vine.object({
    ...baseSearchValidator.getProperties(),
  })
)
