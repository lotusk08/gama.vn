import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Posts, Careers, Submissions, Policies, Media, Pages],
  globals: [Header, Footer],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'gama-payload-secret-key-12345',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/gama',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
