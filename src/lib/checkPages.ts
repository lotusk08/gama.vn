import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';

async function checkPages() {
  const payload = await getPayload({ config: configPromise });

  console.log('--- PAGES ---');
  const pages = await payload.find({
    collection: 'pages',
    limit: 100,
  });
  for (const page of pages.docs) {
    console.log(`Page: ${page.title} (slug: ${page.slug})`);
    if (page.layout) {
      for (const block of page.layout) {
        console.log(`  Block: ${block.blockType}`);
        if (block.blockType === 'hero') {
          console.log(`    backgroundImage: ${JSON.stringify(block.backgroundImage)}`);
        }
        if (block.blockType === 'color-year') {
          console.log(`    backgroundImage: ${JSON.stringify(block.backgroundImage)}`);
        }
      }
    }
  }

  console.log('--- HEADER GLOBAL ---');
  const header = await payload.findGlobal({
    slug: 'header',
  });
  console.log(`Logo: ${JSON.stringify(header.logo)}`);

  console.log('--- FOOTER GLOBAL ---');
  const footer = await payload.findGlobal({
    slug: 'footer',
  });
  console.log(`Certifications: ${JSON.stringify(footer.certifications)}`);

  process.exit(0);
}

checkPages().catch(err => {
  console.error(err);
  process.exit(1);
});
