import { BaseSeeder } from '@adonisjs/lucid/seeders'

import User from '#users/models/user'
import Role from '#users/models/role'
import { AllPermissions, getPermissions, PermissionActions } from '#users/utils/permission'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        name: 'Utilisateur',
        description: 'Rôle par défaut pour les utilisateurs enregistrés',
        permissions: [],
      },
      {
        name: 'Modérateur',
        description: 'Rôle pour les modérateurs avec des permissions étendues',
        permissions: getPermissions(['user'], [PermissionActions.READ]).map((perm) => perm.id),
      },
      {
        name: 'Administrateur',
        description: 'Rôle avec toutes les permissions sur la plateforme',
        permissions: AllPermissions.map((perm) => perm.id),
      },
    ])

    const uniqueKey = 'email'

    const admin = await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'admin@admin.com',
        fullName: 'Admin',
        password: '123',
      },
      {
        email: 'user@user.com',
        fullName: 'User',
        password: '123',
      },
    ])

    const adminRole = await Role.findByOrFail('name', 'Administrateur')
    await admin[0].related('role').associate(adminRole)
  }
}
