import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './src/collections/Users';
import { Posts } from './src/collections/Posts';
import { Careers } from './src/collections/Careers';
import { Submissions } from './src/collections/Submissions';
import { Policies } from './src/collections/Policies';
import { Media } from './src/collections/Media';
import { Pages } from './src/collections/Pages';
import { Header } from './src/globals/Header';
import { Footer } from './src/globals/Footer';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Use Vercel Blob only when explicitly opted in (USE_VERCEL_BLOB=true).
// This prevents local dev from attempting to upload to Vercel Blob,
// which requires Vercel's runtime environment headers to work.
const useVercelBlob = process.env.USE_VERCEL_BLOB === 'true';

const storagePlugins = useVercelBlob
  ? [
      vercelBlobStorage({
        enabled: true,
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN || '',
      }),
    ]
  : [];

export default buildConfig({
  // serverURL is required for Payload to generate correct absolute URLs
  // for media, admin, and API endpoints — especially in SSR contexts.
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Posts, Careers, Submissions, Policies, Media, Pages],
  globals: [Header, Footer],
  plugins: storagePlugins,

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || 'gama-payload-secret-key-fallback',

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/gama',
  }),

  sharp,

  // Payload v3 cors: use an array of origins or '*' for all
  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
