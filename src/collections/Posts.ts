import { CollectionConfig } from 'payload';
import { slugifyField } from './slugify';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${baseUrl}/blog/${data.slug}?preview=true`;
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugifyField(),
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['Science', 'Color', 'Industry', 'Business'],
      required: true,
    },
    { name: 'date', type: 'text' },
    { name: 'readTime', type: 'text' },
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
  ],
};
