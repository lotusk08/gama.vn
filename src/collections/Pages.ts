import { CollectionConfig, Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// ─── Hero Block ────────────────────────────────────────────────────────────
const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'ctaPrimaryLabel', type: 'text' },
    { name: 'ctaSecondaryLabel', type: 'text' },
    { name: 'badgeLabel', type: 'text' },
    { name: 'badgeSubLabel', type: 'text' },
    { name: 'badgeLabel2', type: 'text' },
    { name: 'badgeSubLabel2', type: 'text' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

// ─── About Block ───────────────────────────────────────────────────────────
const AboutBlock: Block = {
  slug: 'about',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'richContent',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

// ─── Stats / Clients Ticker Block ──────────────────────────────────────────
const StatsBlock: Block = {
  slug: 'stats',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'clients',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'category', type: 'text' },
      ],
    },
  ],
};

// ─── Process Block ─────────────────────────────────────────────────────────
const ProcessBlock: Block = {
  slug: 'process',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'stepNumber', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

// ─── Testimonials Block ────────────────────────────────────────────────────
const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
  ],
};

// ─── Color of the Year Block ───────────────────────────────────────────────
const ColorOfTheYearBlock: Block = {
  slug: 'color-year',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shades',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'vietnameseName', type: 'text' },
        { name: 'hex', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'complementary', type: 'text' },
      ],
    },
  ],
};

// ─── Core Values / Brand Pillars Block ────────────────────────────────────
const CoreValuesBlock: Block = {
  slug: 'core-values',
  fields: [
    { name: 'sectionLabel', type: 'text' },
    { name: 'sectionTitle', type: 'text', required: true },
    {
      name: 'pillars',
      type: 'array',
      fields: [
        { name: 'num', type: 'text' },
        { name: 'category', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'quote', type: 'textarea' },
        {
          name: 'iconName',
          type: 'select',
          options: ['ShieldCheck', 'Paintbrush', 'Palette', 'Globe'],
        },
      ],
    },
  ],
};

// ─── CTA Banner Block ──────────────────────────────────────────────────────
const CtaBannerBlock: Block = {
  slug: 'cta-banner',
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subtext', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    { name: 'buttonTab', type: 'text' },
  ],
};

// ─── Rich Text Block ───────────────────────────────────────────────────────
const RichTextBlock: Block = {
  slug: 'rich-text',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      required: true,
    },
  ],
};

// ─── Pages Collection ──────────────────────────────────────────────────────
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        return `${baseUrl}/?tab=${data.slug}&preview=true`;
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
        description: 'Used to fetch this page. Use "home" for the main page.',
      },
    },
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
        CoreValuesBlock,
        CtaBannerBlock,
        RichTextBlock,
      ],
      required: true,
    },
  ],
};
