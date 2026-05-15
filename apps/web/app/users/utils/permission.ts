import User from '#users/models/user'

export type PermissionSubject = 'theme' | 'user' | 'role' | 'tokens' | 'website_settings'

export enum PermissionActions {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage', // all actions
}

export interface Permission {
  id: string
  action: PermissionActions
  subject: PermissionSubject
  name: string
  description: string
}

const generateCrudPermissions = (subject: PermissionSubject, label: string): Permission[] => {
  const actions = [
    {
      id: `${subject}:manage`,
      action: PermissionActions.MANAGE,
      name: `Gérer ${label}`,
      desc: `Droit complet sur : ${label}`,
    },
    {
      id: `${subject}:create`,
      action: PermissionActions.CREATE,
      name: `Créer ${label}`,
      desc: `Permet de créer : ${label}`,
    },
    {
      id: `${subject}:read`,
      action: PermissionActions.READ,
      name: `Voir ${label}`,
      desc: `Permet de lire : ${label}`,
    },
    {
      id: `${subject}:update`,
      action: PermissionActions.UPDATE,
      name: `Modifier ${label}`,
      desc: `Permet de modifier : ${label}`,
    },
    {
      id: `${subject}:delete`,
      action: PermissionActions.DELETE,
      name: `Supprimer ${label}`,
      desc: `Permet de supprimer : ${label}`,
    },
  ]

  return actions.map(({ action, name, desc }) => ({
    id: `${subject}:${action}`,
    action,
    subject,
    name,
    description: desc,
  }))
}

export const AllPermissions: Permission[] = [
  ...generateCrudPermissions('user', 'les utilisateurs'),
  ...generateCrudPermissions('role', 'les rôles'),
  ...generateCrudPermissions('tokens', 'les jetons'),
  ...generateCrudPermissions('website_settings', 'les paramètres du site web'),
  {
    id: 'theme:pink',
    action: PermissionActions.MANAGE,
    subject: 'theme',
    name: 'Thème Rose',
    description: "Permet d'appliquer le thème rose à l'application",
  },
  {
    id: 'theme:caca',
    action: PermissionActions.MANAGE,
    subject: 'theme',
    name: 'Thème Caca',
    description: "Permet d'appliquer le thème caca à l'application",
  },
  {
    id: 'theme:access',
    action: PermissionActions.MANAGE,
    subject: 'theme',
    name: 'Accès aux thèmes',
    description: "Permet d'appliquer le thème à l'application",
  },
]

export const getPermissions = (
  subjects: PermissionSubject[],
  actions: PermissionActions[] = [PermissionActions.READ]
) => {
  return AllPermissions.filter((p) => subjects.includes(p.subject) && actions.includes(p.action))
}

export function can(user: User, subject: PermissionSubject, action: PermissionActions): boolean {
  const requiredPermission = `${subject}:${action}`
  const managePermission = `${subject}:${PermissionActions.MANAGE}`

  return user.role.permissions.some((p) => p === requiredPermission || p === managePermission)
}
