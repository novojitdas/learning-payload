import { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'
import { editor } from './Users/access/editor'
import { admin } from './Users/access/admin'
import { hideForUsers } from './Users/access/hideForUsers'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewText',
    defaultColumns: ['user', 'product', 'rating', 'createdAt'],
    hidden: hideForUsers,
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  fields: [
    // {
    //   name: 'user',
    //   label: 'User',
    //   type: 'relationship',
    //   relationTo: 'users',
    //   required: true,
    // },
    {
      name: 'customer',
      label: 'Customer Name',
      type: 'text',
      required: true,
    },
    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'reviewText',
      label: 'Review Text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Rating (1 to 5 stars)',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
  ],
  timestamps: true,
}
