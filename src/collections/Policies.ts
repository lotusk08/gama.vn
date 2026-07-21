import { CollectionConfig } from 'payload';

export const Policies: CollectionConfig = {
  slug: 'policies',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${baseUrl}/chinh-sach/${data.key}?preview=true`;
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'key',
      type: 'select',
      options: [
        { label: 'Đối tác cung ứng', value: 'suppliers' },
        { label: 'Tuyên bố quyền riêng tư', value: 'privacy' },
        { label: 'Tuyên bố vị thế', value: 'position' },
        { label: 'Bộ quy tắc ứng xử', value: 'conduct' },
        { label: 'Thông báo SpeakUp!', value: 'speakup' },
        { label: 'Cam kết tiếp cận', value: 'accessibility' },
      ],
      required: true,
      unique: true,
    },
    { name: 'title', type: 'text', required: true },
    { name: 'subTitle', type: 'text', required: true },
    { name: 'introduction', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', admin: { description: 'Falls back to the page title when empty.' } },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
};
