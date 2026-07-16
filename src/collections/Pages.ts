import { CollectionConfig, Block } from 'payload';

const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true },
    { name: 'exploreServicesText', type: 'text', required: true },
    { name: 'exploreWorkText', type: 'text', required: true },
  ],
};

const AboutBlock: Block = {
  slug: 'about',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
};

const StatsBlock: Block = {
  slug: 'stats',
  fields: [
    { name: 'title', type: 'text', required: true },
  ],
};

const ProcessBlock: Block = {
  slug: 'process',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
};

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text', required: true },
  ],
};

const ColorOfTheYearBlock: Block = {
  slug: 'color-year',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
};

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        AboutBlock,
        StatsBlock,
        ProcessBlock,
        TestimonialsBlock,
        ColorOfTheYearBlock,
      ],
      required: true,
    },
  ],
};
