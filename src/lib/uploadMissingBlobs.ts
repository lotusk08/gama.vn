/**
 * uploadMissingBlobs.ts
 * Uploads missing Blob variants that were stored with different names in MongoDB.
 * Run once: npx tsx src/lib/uploadMissingBlobs.ts
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const MEDIA_DIR = path.resolve(dirname, '../../public/media');

// Maps: target blob filename → source local file
const UPLOADS: Array<{ target: string; source: string; mime: string }> = [
  { target: 'hero-banner-1.jpg',   source: 'hero-banner.jpg',   mime: 'image/jpeg' },
  { target: 'color-year-1.jpg',    source: 'color-year.jpg',    mime: 'image/jpeg' },
  { target: 'innovation-4.jpg',    source: 'innovation-1.jpg',  mime: 'image/jpeg' },
  { target: 'innovation-5.jpg',    source: 'innovation-2.jpg',  mime: 'image/jpeg' },
  { target: 'innovation-6.jpg',    source: 'innovation-3.jpg',  mime: 'image/jpeg' },
];

async function run() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) { console.error('❌ BLOB_READ_WRITE_TOKEN not set'); process.exit(1); }

  for (const { target, source, mime } of UPLOADS) {
    const srcPath = path.join(MEDIA_DIR, source);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️  Source not found: ${source}`);
      continue;
    }
    const buffer = fs.readFileSync(srcPath);
    try {
      const result = await put(target, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: mime,
        token,
      });
      console.log(`✅ ${target} → ${result.url}`);
    } catch (err: any) {
      console.error(`❌ ${target}: ${err.message}`);
    }
  }
  console.log('\nDone.');
}

run();
