import { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { hideForUsersGlobal } from './access/hideForUsersGlobal'
import { editor } from '@/collections/Users/access/editor'
import { anyone } from '@/collections/Users/access/anyone'

export const RaffleWinner: GlobalConfig = {
  slug: 'raffle-winner',
  label: 'Raffle Winner',
  admin: { hidden: hideForUsersGlobal },
  access: {
    read: anyone,
    update: editor,
  },
  fields: [
    {
      name: 'text',
      label: 'Winner Text',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
      }),
    },
  ],
}
