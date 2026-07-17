import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

async function checkMedia() {
  console.log('Connecting to database...');
  const payload = await getPayload({ config: configPromise });

  console.log('Fetching media documents...');
  const media = await payload.find({
    collection: 'media',
    limit: 100,
  });

  console.log(`Found ${media.totalDocs} media documents:`);
  for (const doc of media.docs) {
    console.log(`- ID: ${doc.id}`);
    console.log(`  Alt: ${doc.alt}`);
    console.log(`  Filename: ${doc.filename}`);
    console.log(`  URL: ${doc.url}`);
    if (doc.sizes) {
      console.log('  Sizes:');
      for (const [sizeName, sizeData] of Object.entries(doc.sizes)) {
        console.log(`    * ${sizeName}: ${(sizeData as any).url || 'N/A'}`);
      }
    }
    console.log('----------------------------------------');
  }
  process.exit(0);
}

checkMedia().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
