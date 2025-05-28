import fs from 'fs'
import path from 'path'
import { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'
import editor from './Users/access/editor'
import { admin } from './Users/access/admin'
import { hideForUsers } from './Users/access/hideForUsers'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
    imageSizes: [
      // { name: 'thumbnail', width: 300, height: 300 },
      // { name: 'product', width: 600, height: 600 },
      // { name: 'hero', width: 1600, height: 600 },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
    },
  },
  admin: {
    useAsTitle: 'alt',
    hidden: hideForUsers,
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  fields: [
    { name: 'alt', label: 'Alt Text', type: 'text', required: true },
    { name: 'tags', label: 'Tags (e.g. banner, product, logo)', type: 'text', hasMany: true },
    {
      name: 'relatedProduct',
      label: 'Related Product',
      type: 'relationship',
      relationTo: 'products',
    },
  ],
  hooks: {},
}
