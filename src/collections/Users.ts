import type { CollectionConfig } from 'payload'
import CustomComponent from '@/components/CustomComponent'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
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
