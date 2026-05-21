// import { mongooseAdapter } from '@payloadcms/db-mongodb'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import { s3Storage } from '@payloadcms/storage-s3'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'

// import { Users } from './collections/Users'
// import { Customers } from './collections/Customers'
// import { Media } from './collections/Media'
// import Menu from './collections/Menu'
// import Restaurant from './collections/Restaurant'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export default buildConfig({
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },

//   serverURL:
//     process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

//   cors: [
//     'http://localhost:5173',
//     'http://localhost:3001',
//     'http://localhost:3000',
//     'https://planet-restuarent-frontend.vercel.app',
//     'https://planet-backend-htep.onrender.com',
//   ],

//   csrf: [
//     'http://localhost:5173',
//     'http://localhost:3001',
//     'https://planet-restuarent-frontend.vercel.app',
//     'https://planet-backend-htep.onrender.com',
//   ],

//   collections: [
//     Users,
//     Customers,
//     Media,
//     Menu,
//     Restaurant,
//   ],

//   editor: lexicalEditor(),

//   secret:
//     process.env.PAYLOAD_SECRET ||
//     'a-very-long-random-secret-123!@#',

//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },

//   db: mongooseAdapter({
//     url:
//       process.env.DATABASE_URL ||
//       'mongodb://localhost:27017/planet',
//   }),

//   sharp,

//   plugins: [
//   s3Storage({
//     collections: {
//       media: {
//         // ✅ generateFileURL goes HERE — inside the collection, not outside
//         generateFileURL: ({ filename }) =>
//           `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${filename}`,
//       },
//     },
//     bucket: process.env.S3_BUCKET!,
//     config: {
//       region: process.env.S3_REGION!,
//       credentials: {
//         accessKeyId: process.env.S3_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
//       },
//     },
//   }),
// ],
// })




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

if (!s3Bucket || !s3Region || !s3AccessKeyId || !s3SecretAccessKey) {
  throw new Error(
    'S3 env vars missing. Set AWS_S3_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY in planet_backend/.env',
  )
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
    'https://planet-backend-htep.onrender.com',
  ],

  csrf: [
    'http://localhost:5173',
    'http://localhost:3001',
    'https://planet-restuarent-frontend.vercel.app',
    'https://planet-backend-htep.onrender.com',
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

  plugins: [
  s3Storage({
    collections: {
      media: {
        // Proxy through Payload — direct S3 URLs are 403 on a private bucket
        generateFileURL: ({ filename, prefix }) => {
          const filePath = prefix ? `${prefix}/${filename}` : filename
          const encodedPath = filePath
            .split('/')
            .map((segment) => encodeURIComponent(segment))
            .join('/')
          return `${serverURL}/api/media/file/${encodedPath}`
        },
      },
    },
    bucket: s3Bucket,
    config: {
      region: s3Region,
      credentials: {
        accessKeyId: s3AccessKeyId,
        secretAccessKey: s3SecretAccessKey,
      },
    },
  }),
],
})