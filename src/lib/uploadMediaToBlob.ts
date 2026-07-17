/**
 * uploadMediaToBlob.ts
 *
 * Uploads all files in public/media/ to Vercel Blob so they are accessible
 * in production. Run once after switching to USE_VERCEL_BLOB=true:
 *
 *   npx tsx src/lib/uploadMediaToBlob.ts
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const MEDIA_DIR = path.resolve(dirname, '../../public/media');

const MIME_MAP: Record<string, string> = {
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.pdf':  'application/pdf',
};

async function uploadAll() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('❌ BLOB_READ_WRITE_TOKEN is not set in .env');
    process.exit(1);
  }

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`❌ Media directory not found: ${MEDIA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(MEDIA_DIR);
  console.log(`📂 Found ${files.length} files in ${MEDIA_DIR}\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const contentType = MIME_MAP[ext];

    if (!contentType) {
      console.log(`⏭  Skipping (unknown type): ${file}`);
      skipped++;
      continue;
    }

    const filePath = path.join(MEDIA_DIR, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      skipped++;
      continue;
    }

    try {
      const buffer = fs.readFileSync(filePath);
      // Upload to Vercel Blob with the same filename (no random suffix)
      const result = await put(file, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType,
        token,
      });
      console.log(`✅ Uploaded: ${file} → ${result.url}`);
      success++;
    } catch (err: any) {
      console.error(`❌ Failed: ${file} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Done: ${success} uploaded, ${skipped} skipped, ${failed} failed`);
}

uploadAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
