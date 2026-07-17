import { GlobalConfig } from 'payload';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Site Title (Meta)',
      type: 'text',
      required: true,
      defaultValue: 'GAMA.vn - Nơi chuyên môn hóa học kiến tạo tương lai',
    },
    {
      name: 'siteDescription',
      label: 'Site Description (Meta)',
      type: 'textarea',
      required: true,
      defaultValue: 'GAMA cung cấp giải pháp sơn phủ, chống thấm kiến trúc và công nghiệp cao cấp tiêu chuẩn xanh.',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'tabId',
          type: 'text',
          required: true,
        },
        {
          name: 'hasSubMenu',
          label: 'Có Menu con (Dropdown)',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'subMenuItems',
          label: 'Menu con (Dropdown Items)',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.hasSubMenu === true,
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'tabId',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'topBarTicker',
      label: 'Top Bar Ticker',
      type: 'group',
      fields: [
        { name: 'stockSymbol', type: 'text', defaultValue: 'HOSE: GAMA' },
        { name: 'stockChange', type: 'text', defaultValue: '+1.45% (28,400đ)' },
        {
          name: 'certificationText',
          type: 'text',
          defaultValue: 'Tiêu chuẩn quốc tế ISO 9001:2015 & Hợp quy QCVN 16 Bộ Xây dựng',
        },
      ],
    },
    {
      name: 'topBarLinks',
      label: 'Top Bar Links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'tabId', type: 'text', required: true },
      ],
    },
  ],
};

