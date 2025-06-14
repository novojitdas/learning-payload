import { unique } from 'next/dist/build/utils'
import { CollectionConfig } from 'payload'
import { relationship } from 'payload/shared'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { anyone } from './Users/access/anyone'
import { editor } from './Users/access/editor'
import { admin } from './Users/access/admin'
import { user, userFieldAccess } from './Users/access/user'
import { hideForUsers } from './Users/access/hideForUsers'

export const Product: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    hidden: hideForUsers,
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'stock',
      label: 'Available Stock',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Note: if value is less than 1 then inStock will be No',
      },
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      unique: true,
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'additionalImages',
      label: 'Additional Images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
    },
    {
      name: 'inStock',
      type: 'select',
      options: ['Yes', 'No'],
      label: 'In Stock?',
      defaultValue: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return data?.stock > 0 ? 'Yes' : 'No'
          },
        ],
      },
    },
  ],
}
