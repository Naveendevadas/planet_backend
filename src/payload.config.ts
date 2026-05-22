import 'dotenv/config'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Customers } from './collections/Customers'
import { Media } from './collections/Media'
import Menu from './collections/Menu'
import Restaurant from './collections/Restaurant'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const s3Bucket =
  process.env.AWS_S3_BUCKET ?? process.env.S3_BUCKET
const s3Region =
  process.env.AWS_REGION ?? process.env.S3_REGION
const s3AccessKeyId =
  process.env.AWS_ACCESS_KEY_ID ?? process.env.S3_ACCESS_KEY_ID
const s3SecretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY ?? process.env.S3_SECRET_ACCESS_KEY
const serverURL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001'

const s3Configured = Boolean(
  s3Bucket && s3Region && s3AccessKeyId && s3SecretAccessKey,
)

function mediaProxyUrl(filename: string, prefix?: string | null) {
  const filePath = prefix ? `${prefix}/${filename}` : filename
  const encodedPath = filePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
  return `${serverURL}/api/media/file/${encodedPath}`
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  serverURL,

  cors: [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://planet-restuarent-frontend.vercel.app',
    'https://planet-frontend-gamma.vercel.app',
    'https://planet-backend-htep.onrender.com',
    'https://planet-backend-1.onrender.com',
    'https://planet-backend-g7x2.onrender.com',
  ],

  csrf: [
    'http://localhost:5173',
    'http://localhost:3001',
    'https://planet-restuarent-frontend.vercel.app',
    'https://planet-frontend-gamma.vercel.app',
    'https://planet-backend-htep.onrender.com',
    'https://planet-backend-1.onrender.com',
    'https://planet-backend-g7x2.onrender.com',
  ],

  collections: [
    Users,
    Customers,
    Media,
    Menu,
    Restaurant,
  ],

  editor: lexicalEditor(),

  secret:
    process.env.PAYLOAD_SECRET ||
    'a-very-long-random-secret-123!@#',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url:
      process.env.DATABASE_URL ||
      'mongodb://localhost:27017/planet',
  }),

  sharp,

  plugins: s3Configured
    ? [
        s3Storage({
          acl: undefined,
          collections: {
            media: {
              generateFileURL: ({ filename, prefix }) =>
                mediaProxyUrl(filename, prefix),
            },
          },
          bucket: s3Bucket!,
          config: {
            region: s3Region!,
            credentials: {
              accessKeyId: s3AccessKeyId!,
              secretAccessKey: s3SecretAccessKey!,
            },
          },
        }),
      ]
    : [],
})