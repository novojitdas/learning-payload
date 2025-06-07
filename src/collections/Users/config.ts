import type { CollectionConfig } from 'payload'
import CustomComponent from '@/components/CustomComponent'
import { protectRoles } from './hooks/protectRoles'
import { user } from './access/user'
import { admin, adminFieldAccess } from './access/admin'
import { userOrAdmin } from './access/userOrAdmin'
import { hideForUsers } from './access/hideForUsers'
import { newUserWelcomeEmail } from './hooks/newUserWelcomeEmail'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Your Profile', // Label for a single item
    plural: 'Accounts', // Label in the sidebar and list view
  },
  admin: {
    useAsTitle: 'email',
    hidden: hideForUsers,
  },
  auth: true,
  access: {
    read: user,
    create: admin,
    update: userOrAdmin,
    delete: admin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      required: true,
    },
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
  hooks: {
    afterChange: [newUserWelcomeEmail],
  },
}
