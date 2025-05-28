// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/config'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Product } from './collections/Products'
import { Reviews } from './collections/Reviews'

import { SocialLinks } from './globals/SocialLinks'
import { RaffleWinner } from './globals/RaffleWinner'

import { QuilLogo } from './graphics/Logo'
import { QuilIcon } from './graphics/Icon'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      description: 'This is a custom meta description',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/assets/favicon.svg',
        },
      ],
      openGraph: {
        title: 'This is a custom OG title',
        description: 'This is a custom OG description',
        images: [
          {
            url: '/assets/logo.svg',
            width: 800,
            height: 600,
          },
        ],
      },
      titleSuffix: '- QuilCraft',
    },
    components: {
      graphics: {
        Logo: QuilLogo,
        Icon: QuilIcon,
      },
    },
    dateFormat: 'd/MMM/yyyy',
  },
  upload: {
    limits: {
      fileSize: 4000000, // 5MB in bytes
    },
  },
  collections: [Users, Media, Posts, Categories, Product, Reviews],
  globals: [SocialLinks, RaffleWinner],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
