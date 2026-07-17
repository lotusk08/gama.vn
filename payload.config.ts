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

// Use Vercel Blob in production (when BLOB_READ_WRITE_TOKEN is set)
const storagePlugins = process.env.BLOB_READ_WRITE_TOKEN
  ? [
      vercelBlobStorage({
        enabled: true,
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
  : [];

export default buildConfig({
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
  secret: process.env.PAYLOAD_SECRET || 'gama-payload-secret-key-12345',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/gama',
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
