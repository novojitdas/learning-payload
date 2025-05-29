import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { anyone } from './Users/access/anyone'
import { editor } from './Users/access/editor'
import { admin } from './Users/access/admin'
import { hideForUsers } from './Users/access/hideForUsers'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Posts',
    useAsTitle: 'title',
    description: 'this is a blog collection.',
    hidden: hideForUsers,
  },
  auth: false,
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: admin,
  },
  defaultSort: ['updatedAt'],
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  fields: [
    {
      name: 'title',
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
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
  ],
}
