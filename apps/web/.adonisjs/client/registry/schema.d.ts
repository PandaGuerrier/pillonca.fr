/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'marketing.show': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#marketing/controllers/marketing_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#marketing/controllers/marketing_controller').default['handle']>>>
    }
  }
  'dashboard.show': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#dashboard/controllers/dashboard_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#dashboard/controllers/dashboard_controller').default['show']>>>
    }
  }
  'pictures.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/pictures'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#picture/validators').listPictureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pictures.store': {
    methods: ["POST"]
    pattern: '/dashboard/pictures'
    types: {
      body: ExtractBody<InferInput<(typeof import('#picture/validators').createPictureValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#picture/validators').createPictureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pictures.update': {
    methods: ["PUT","PATCH"]
    pattern: '/dashboard/pictures/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#picture/validators').editPictureValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#picture/validators').editPictureValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pictures.destroy': {
    methods: ["DELETE"]
    pattern: '/dashboard/pictures/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#picture/controllers/pictures_controller').default['destroy']>>>
    }
  }
  'auth.sign_in.show': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['show']>>>
    }
  }
  'auth.sign_in.handle': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators').signInValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators').signInValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_in_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.sign_out.handle': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#auth/controllers/sign_out_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#auth/controllers/sign_out_controller').default['handle']>>>
    }
  }
  'locale.switch': {
    methods: ["POST"]
    pattern: '/switch/:locale'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { locale: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#users/validators').listUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#users/validators').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update': {
    methods: ["PUT","PATCH"]
    pattern: '/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').editUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#users/validators').editUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/users_controller').default['destroy']>>>
    }
  }
  'users.invite.handle': {
    methods: ["POST"]
    pattern: '/users/invite'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').inviteUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#users/validators').inviteUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/invite_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/invite_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.impersonate.handle': {
    methods: ["POST"]
    pattern: '/users/impersonate/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/impersonates_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/impersonates_controller').default['store']>>>
    }
  }
  'settings.index': {
    methods: ["GET","HEAD"]
    pattern: '/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'profile.update': {
    methods: ["PUT"]
    pattern: '/settings/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#users/validators').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/settings/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/profile_controller').default['show']>>>
    }
  }
  'tokens.index': {
    methods: ["GET","HEAD"]
    pattern: '/settings/tokens'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['index']>>>
    }
  }
  'tokens.destroy': {
    methods: ["DELETE"]
    pattern: '/settings/tokens/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['destroy']>>>
    }
  }
  'tokens.store': {
    methods: ["POST"]
    pattern: '/api/tokens'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').createTokenValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#users/validators').createTokenValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password.update': {
    methods: ["PUT"]
    pattern: '/settings/password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#users/validators').updatePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#users/validators').updatePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['handle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['handle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password.show': {
    methods: ["GET","HEAD"]
    pattern: '/settings/password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#users/controllers/password_controller').default['show']>>>
    }
  }
  'appearance.show': {
    methods: ["GET","HEAD"]
    pattern: '/settings/appearance'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
