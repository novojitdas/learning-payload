import { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const RaffleWinner: GlobalConfig = {
  slug: 'raffle-winner',
  label: 'Raffle Winner',
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
