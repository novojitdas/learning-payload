// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
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
    components: {
      graphics: {
        Logo: QuilLogo,
        Icon: QuilIcon,
      },
    },
  },
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB in bytes
    },
  },
  collections: [Users, Media, Posts, Categories, Product, Reviews],
  globals: [SocialLinks, RaffleWinner],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
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
