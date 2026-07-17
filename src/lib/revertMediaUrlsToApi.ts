/**
 * revertMediaUrlsToApi.ts
 *
 * Reverts media document `url` fields from Vercel Blob CDN direct URLs
 * back to Payload's own `/api/media/file/<filename>` endpoint.
 *
 * This is the correct pattern: Payload's cloud-storage plugin serves files
 * through its own static handler at /api/media/file/, proxying from Vercel Blob.
 *
 * Run once: npx tsx src/lib/revertMediaUrlsToApi.ts
 */

import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

async function revert() {
  console.log('🔄 Reverting media URLs to /api/media/file/ endpoint...\n');

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
  console.log(`🌐 Server URL: ${serverUrl}\n`);

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

    if (!filename) {
      console.log(`⚠️  No filename for doc id=${doc.id}, skipping`);
      skipped++;
      continue;
    }

    // Build the canonical Payload API URL
    const apiUrl = `${serverUrl}/api/media/file/${filename}`;

    // Already using the API endpoint — skip
    if (currentUrl === apiUrl || currentUrl.includes('/api/media/file/')) {
      console.log(`⏭  Already API URL: ${filename}`);
      skipped++;
      continue;
    }

    try {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: apiUrl,
        } as any,
      });
      console.log(`✅ Reverted: ${filename}`);
      console.log(`   ${currentUrl}`);
      console.log(`   → ${apiUrl}`);
      updated++;
    } catch (err: any) {
      console.error(`❌ Failed to update doc ${doc.id}: ${err.message}`);
    }
  }

  console.log(`\n📊 Done: ${updated} updated, ${skipped} skipped`);
  process.exit(0);
}

revert().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
