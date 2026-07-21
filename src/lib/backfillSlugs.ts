import 'dotenv/config';
import { getPayload } from 'payload';
import configPromise from '../../payload.config';
import { toSlug } from '../collections/slugify';

/**
 * One-off migration: populates `slug` for posts/careers documents created
 * before the slug field existed, so their URLs stop falling back to the
 * Mongo ID (e.g. /blog/6a585f048c1d308a05b1ca33 -> /blog/ten-bai-viet).
 */
async function backfillSlugs() {
  const payload = await getPayload({ config: configPromise });

  for (const collection of ['posts', 'careers'] as const) {
    console.log(`Checking ${collection} for missing slugs...`);
    const { docs } = await payload.find({ collection, limit: 1000, depth: 0 });

    const usedSlugs = new Set(docs.map((d: any) => d.slug).filter(Boolean));

    for (const doc of docs as any[]) {
      if (doc.slug) continue;

      const base = toSlug(doc.title || String(doc.id));
      let candidate = base || String(doc.id);
      let suffix = 2;
      while (usedSlugs.has(candidate)) {
        candidate = `${base}-${suffix++}`;
      }
      usedSlugs.add(candidate);

      await payload.update({ collection, id: doc.id, data: { slug: candidate } });
      console.log(`  ${collection}/${doc.id}: "${doc.title}" -> slug "${candidate}"`);
    }
  }

  console.log('Slug backfill completed successfully!');
  process.exit(0);
}

backfillSlugs().catch(err => {
  console.error('Slug backfill error:', err);
  process.exit(1);
});
