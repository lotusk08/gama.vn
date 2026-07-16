import { CollectionConfig } from 'payload';

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
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
