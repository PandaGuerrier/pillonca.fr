import vine from '@vinejs/vine'

import User from '#users/models/user'

import { baseSearchValidator } from '#common/validators/search'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email().toLowerCase().trim().unique({ table: 'users', column: 'email' }),
    roleUuid: vine.string().uuid().exists({ table: 'roles', column: 'uuid' }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .confirmed({ confirmationField: 'passwordConfirmation' })
      .optional(),
  })
)

export const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    avatar: vine
      .file({
        extnames: ['png', 'jpg', 'jpeg', 'gif'],
        size: 1024 * 1024,
      })
      .nullable(),
  })
)

export const listUserValidator = vine.compile(
  vine.object({
    ...baseSearchValidator.getProperties(),
    roleIds: vine.array(vine.string().uuid().exists({ table: 'roles', column: 'uuid' })).optional(),
  })
)

export const createTokenValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
  })
)

export const inviteUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim().unique({ table: 'users', column: 'email' }),
    description: vine.string().trim().optional(),
    roleUuid: vine.string().uuid().exists({ table: 'roles', column: 'uuid' }),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    password: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .confirmed({ confirmationField: 'passwordConfirmation' }),
  })
)

export const editUserValidator = vine.withMetaData<{ userId: string }>().compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine
      .string()
      .email()
      .toLowerCase()
      .trim()
      .unique(async (_, value, field) => {
        const row = await User.query()
          .where('email', value)
          .whereNot('uuid', field.meta.userId)
          .first()
        return !row
      }),
    roleUuid: vine.string().uuid().exists({ table: 'roles', column: 'uuid' }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(255)
      .confirmed({ confirmationField: 'passwordConfirmation' })
      .optional(),
  })
)
