import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ✅ Your deployed backend URL (set via env var)
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // ✅ Your Vercel frontend is now allowed
  cors: [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://planet-restuarent-frontend.vercel.app',
    'https://planet-backend-htep.onrender.com',
  ],

  csrf: [
    'http://localhost:5173',
    'http://localhost:3001',
    'https://planet-restuarent-frontend.vercel.app',
    'https://planet-backend-htep.onrender.com'
  ],

  collections: [
    Users,
    Customers,
    Media,
    Menu,
    Restaurant,
  ],

  editor: lexicalEditor(),
secret: process.env.PAYLOAD_SECRET || 'a-very-long-random-secret-123!@#',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/planet',
}),

  sharp,
  plugins: [],
})