import type { CollectionConfig } from 'payload'
import CustomComponent from '@/components/CustomComponent'
import { protectRoles } from './hooks/protectRoles'
import { user } from './access/user'
import { admin, adminFieldAccess } from './access/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: user,
    create: admin,
    update: user,
    delete: admin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      access: {
        update: adminFieldAccess,
      },
      hooks: {
        beforeChange: [protectRoles],
      },
    },
    {
      name: 'view',
      type: 'ui',
      admin: {
        components: {
          Field: CustomComponent,
        },
      },
    },
  ],
}
