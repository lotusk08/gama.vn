import { CollectionConfig } from 'payload';
import { slugifyField } from './slugify';

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${baseUrl}/careers/${data.slug}?preview=true`;
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugifyField(),
    { name: 'department', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      options: ['Toàn thời gian', 'Bán thời gian', 'Thực tập', 'Hợp đồng'],
      required: true,
      defaultValue: 'Toàn thời gian',
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [
        {
          name: 'responsibility',
          type: 'text',
          required: true,
        }
      ]
    },
    {
      name: 'requirements',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        }
      ]
    }
  ]
};
