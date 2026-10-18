import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { COLLECTIONS } from './payload/collections'
import { GLOBALS } from './payload/globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' – MedConsult Admin',
      icons: [
        { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
        { rel: 'icon', sizes: '48x48', url: '/favicon.ico' },
      ],
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: COLLECTIONS,
  globals: GLOBALS,
  editor: lexicalEditor(),
  localization: {
    locales: [
      { code: 'de', label: 'Deutsch' },
      { code: 'ru', label: 'Русский' },
      { code: 'uk', label: 'Українська' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Local development syncs the schema automatically; deployed databases change only through migrations.
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Files are served from the Blob CDN instead of being proxied through the app.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Browser uploads go straight to Blob (Vercel functions cap request bodies at 4.5 MB).
      clientUploads: true,
      // Keep the storage fields in the schema even locally without a token, so migrations match production.
      alwaysInsertFields: true,
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  telemetry: false,
})
