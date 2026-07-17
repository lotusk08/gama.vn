/**
 * migrateMediaUrls.ts
 *
 * Updates the `url` and `filename` fields for all media documents in MongoDB
 * so they point to the Vercel Blob CDN instead of local disk paths.
 *
 * Run ONCE after uploading files with `npm run upload-media`:
 *   npx tsx src/lib/migrateMediaUrls.ts
 */

import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

// The Vercel Blob base URL for your store (parsed from BLOB_READ_WRITE_TOKEN)
function getBlobBaseUrl(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN || '';
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_/i)?.[1]?.toLowerCase();
  if (!storeId) {
    throw new Error('Cannot parse store ID from BLOB_READ_WRITE_TOKEN');
  }
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

async function migrate() {
  console.log('🔄 Migrating media document URLs to Vercel Blob CDN...\n');

  const blobBase = getBlobBaseUrl();
  console.log(`📦 Blob base URL: ${blobBase}\n`);

  const payload = await getPayload({ config: configPromise });

  const { docs, totalDocs } = await payload.find({
    collection: 'media',
    limit: 500,
    depth: 0,
  });

  console.log(`📄 Found ${totalDocs} media documents\n`);

  let updated = 0;
  let skipped = 0;

  for (const doc of docs) {
    const currentUrl: string = (doc as any).url || '';
    const filename: string = (doc as any).filename || '';

    // Already a Blob URL — skip
    if (currentUrl.includes('blob.vercel-storage.com')) {
      console.log(`⏭  Already Blob URL: ${filename}`);
      skipped++;
      continue;
    }

    // Build the new Blob URL using the filename stored in the document
    if (!filename) {
      console.log(`⚠️  No filename for doc id=${doc.id}, skipping`);
      skipped++;
      continue;
    }

    const newUrl = `${blobBase}/${encodeURIComponent(filename)}`;

    try {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: newUrl,
        } as any,
      });
      console.log(`✅ Updated: ${filename} → ${newUrl}`);
      updated++;
    } catch (err: any) {
      console.error(`❌ Failed to update doc ${doc.id}: ${err.message}`);
    }
  }

  console.log(`\n📊 Done: ${updated} updated, ${skipped} skipped`);
  process.exit(0);
}

migrate().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
