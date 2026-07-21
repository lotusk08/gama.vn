import { GlobalConfig } from 'payload';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
    },
    {
      name: 'newsletterTitle',
      type: 'text',
      defaultValue: 'Bản tin định kỳ',
    },
    {
      name: 'newsletterText',
      type: 'textarea',
      defaultValue:
        'Đăng ký để nhận các bản tin nội bộ định kỳ, báo cáo thường niên và cập nhật đổi mới từ GAMA GROUP CO., LTD.',
    },
    {
      name: 'footerLinks',
      label: 'Explore Links (Footer Column)',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'path', label: 'URL Path', type: 'text', required: true },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'icon',
          type: 'select',
          options: ['ShieldCheck', 'Star', 'Award', 'CheckCircle'],
          defaultValue: 'ShieldCheck',
        },
      ],
    },
  ],
};

