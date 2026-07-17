import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function run() {
  console.log('Initializing Payload...');
  const payload = await getPayload({
    config: configPromise,
  });

  const mediaDir = path.resolve(dirname, '../../public/media');
  console.log(`Scanning media directory: ${mediaDir}`);

  if (!fs.existsSync(mediaDir)) {
    console.error('Media directory does not exist.');
    process.exit(1);
  }

  const files = fs.readdirSync(mediaDir);
  console.log(`Found ${files.length} files in media directory.`);

  for (const file of files) {
    // Skip hidden files
    if (file.startsWith('.')) continue;

    const filePath = path.join(mediaDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) continue;

    // Check if it already exists in the database
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: file,
        },
      },
      limit: 1,
    });

    if (existing.totalDocs > 0) {
      const doc = existing.docs[0];
      const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
      const isLocalUrl = doc.url && doc.url.startsWith('/');

      if (hasBlobToken && isLocalUrl) {
        console.log(`Media document for "${file}" has a local URL but BLOB_READ_WRITE_TOKEN is set. Deleting local record to re-upload to Vercel Blob...`);
        await payload.delete({
          collection: 'media',
          id: doc.id,
        });
      } else {
        console.log(`Media document for "${file}" already exists in database. Skipping.`);
        continue;
      }
    }

    // Determine mimeType
    const ext = path.extname(file).toLowerCase();
    let mimeType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.svg') mimeType = 'image/svg+xml';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.gif') mimeType = 'image/gif';
    else if (ext === '.pdf') mimeType = 'application/pdf';

    try {
      const buffer = fs.readFileSync(filePath);
      const altText = path.parse(file).name.replace(/[-_]/g, ' ');

      console.log(`Uploading "${file}" as alt "${altText}" with mime "${mimeType}"...`);
      await payload.create({
        collection: 'media',
        data: {
          alt: altText,
        },
        file: {
          name: file,
          mimetype: mimeType,
          size: stats.size,
          data: buffer,
        },
      });
      console.log(`Successfully uploaded "${file}" to CMS!`);
    } catch (err) {
      console.error(`Error uploading "${file}":`, err);
    }
  }

  console.log('Media synchronization complete.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error running sync script:', err);
  process.exit(1);
});
