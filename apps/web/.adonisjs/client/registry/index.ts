/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'marketing.show': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['marketing.show']['types'],
  },
  'dashboard.show': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.show']['types'],
  },
  'pictures.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/pictures',
    tokens: [{"old":"/dashboard/pictures","type":0,"val":"dashboard","end":""},{"old":"/dashboard/pictures","type":0,"val":"pictures","end":""}],
    types: placeholder as Registry['pictures.index']['types'],
  },
  'pictures.store': {
    methods: ["POST"],
    pattern: '/dashboard/pictures',
    tokens: [{"old":"/dashboard/pictures","type":0,"val":"dashboard","end":""},{"old":"/dashboard/pictures","type":0,"val":"pictures","end":""}],
    types: placeholder as Registry['pictures.store']['types'],
  },
  'pictures.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/pictures/:id',
    tokens: [{"old":"/dashboard/pictures/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/pictures/:id","type":0,"val":"pictures","end":""},{"old":"/dashboard/pictures/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pictures.update']['types'],
  },
  'pictures.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/pictures/:id',
    tokens: [{"old":"/dashboard/pictures/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/pictures/:id","type":0,"val":"pictures","end":""},{"old":"/dashboard/pictures/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pictures.destroy']['types'],
  },
  'auth.sign_in.show': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.sign_in.show']['types'],
  },
  'auth.sign_in.handle': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.sign_in.handle']['types'],
  },
  'auth.sign_out.handle': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.sign_out.handle']['types'],
  },
  'locale.switch': {
    methods: ["POST"],
    pattern: '/switch/:locale',
    tokens: [{"old":"/switch/:locale","type":0,"val":"switch","end":""},{"old":"/switch/:locale","type":1,"val":"locale","end":""}],
    types: placeholder as Registry['locale.switch']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update': {
    methods: ["PUT","PATCH"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'users.invite.handle': {
    methods: ["POST"],
    pattern: '/users/invite',
    tokens: [{"old":"/users/invite","type":0,"val":"users","end":""},{"old":"/users/invite","type":0,"val":"invite","end":""}],
    types: placeholder as Registry['users.invite.handle']['types'],
  },
  'users.impersonate.handle': {
    methods: ["POST"],
    pattern: '/users/impersonate/:id',
    tokens: [{"old":"/users/impersonate/:id","type":0,"val":"users","end":""},{"old":"/users/impersonate/:id","type":0,"val":"impersonate","end":""},{"old":"/users/impersonate/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.impersonate.handle']['types'],
  },
  'settings.index': {
    methods: ["GET","HEAD"],
    pattern: '/settings',
    tokens: [{"old":"/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['settings.index']['types'],
  },
  'profile.update': {
    methods: ["PUT"],
    pattern: '/settings/profile',
    tokens: [{"old":"/settings/profile","type":0,"val":"settings","end":""},{"old":"/settings/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/settings/profile',
    tokens: [{"old":"/settings/profile","type":0,"val":"settings","end":""},{"old":"/settings/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'tokens.index': {
    methods: ["GET","HEAD"],
    pattern: '/settings/tokens',
    tokens: [{"old":"/settings/tokens","type":0,"val":"settings","end":""},{"old":"/settings/tokens","type":0,"val":"tokens","end":""}],
    types: placeholder as Registry['tokens.index']['types'],
  },
  'tokens.destroy': {
    methods: ["DELETE"],
    pattern: '/settings/tokens/:id',
    tokens: [{"old":"/settings/tokens/:id","type":0,"val":"settings","end":""},{"old":"/settings/tokens/:id","type":0,"val":"tokens","end":""},{"old":"/settings/tokens/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tokens.destroy']['types'],
  },
  'tokens.store': {
    methods: ["POST"],
    pattern: '/api/tokens',
    tokens: [{"old":"/api/tokens","type":0,"val":"api","end":""},{"old":"/api/tokens","type":0,"val":"tokens","end":""}],
    types: placeholder as Registry['tokens.store']['types'],
  },
  'password.update': {
    methods: ["PUT"],
    pattern: '/settings/password',
    tokens: [{"old":"/settings/password","type":0,"val":"settings","end":""},{"old":"/settings/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['password.update']['types'],
  },
  'password.show': {
    methods: ["GET","HEAD"],
    pattern: '/settings/password',
    tokens: [{"old":"/settings/password","type":0,"val":"settings","end":""},{"old":"/settings/password","type":0,"val":"password","end":""}],
    types: placeholder as Registry['password.show']['types'],
  },
  'appearance.show': {
    methods: ["GET","HEAD"],
    pattern: '/settings/appearance',
    tokens: [{"old":"/settings/appearance","type":0,"val":"settings","end":""},{"old":"/settings/appearance","type":0,"val":"appearance","end":""}],
    types: placeholder as Registry['appearance.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
