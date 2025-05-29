import { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'
import { editor } from './Users/access/editor'
import { admin } from './Users/access/admin'
import { hideForUsers } from './Users/access/hideForUsers'

export const Categories: CollectionConfig = {
  slug: 'categories',
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
  ],
}
