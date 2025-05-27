import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewText',
    defaultColumns: ['user', 'product', 'rating', 'createdAt'],
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
