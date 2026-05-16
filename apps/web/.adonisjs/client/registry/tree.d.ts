/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  marketing: {
    show: typeof routes['marketing.show']
    mentionsLegales: typeof routes['marketing.mentions_legales']
    politiqueDeConfidentialite: typeof routes['marketing.politique_de_confidentialite']
  }
  dashboard: {
    show: typeof routes['dashboard.show']
  }
  pictures: {
    index: typeof routes['pictures.index']
    store: typeof routes['pictures.store']
    update: typeof routes['pictures.update']
    destroy: typeof routes['pictures.destroy']
  }
  auth: {
    signIn: {
      show: typeof routes['auth.sign_in.show']
      handle: typeof routes['auth.sign_in.handle']
    }
    signOut: {
      handle: typeof routes['auth.sign_out.handle']
    }
  }
  locale: {
    switch: typeof routes['locale.switch']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
    invite: {
      handle: typeof routes['users.invite.handle']
    }
    impersonate: {
      handle: typeof routes['users.impersonate.handle']
    }
  }
  settings: {
    index: typeof routes['settings.index']
  }
  profile: {
    update: typeof routes['profile.update']
    show: typeof routes['profile.show']
  }
  tokens: {
    index: typeof routes['tokens.index']
    destroy: typeof routes['tokens.destroy']
    store: typeof routes['tokens.store']
  }
  password: {
    update: typeof routes['password.update']
    show: typeof routes['password.show']
  }
  appearance: {
    show: typeof routes['appearance.show']
  }
}
