import { CollectionConfig } from 'payload';
import { ALL_BLOCKS } from './blocks';

// ─── Pages Collection ──────────────────────────────────────────────────────
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const path = data.slug === 'home' ? '' : data.slug;
        return `${baseUrl}/${path}?preview=true`;
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'The page\'s URL path, editable at any time. Use "home" for the main page ("/"); any other value becomes the route, e.g. "about" → /about, "chinh-sach/quyen-rieng-tu" → /chinh-sach/quyen-rieng-tu.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', admin: { description: 'Falls back to the page title when empty.' } },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: ALL_BLOCKS,
      required: true,
    },
  ],
};
