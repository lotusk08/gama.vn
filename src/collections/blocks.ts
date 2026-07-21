import { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { ICON_OPTIONS } from '../lib/iconMap';

// ─── Hero Block ────────────────────────────────────────────────────────────
export const HeroBlock: Block = {
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
export const AboutBlock: Block = {
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
export const StatsBlock: Block = {
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
export const ProcessBlock: Block = {
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
export const TestimonialsBlock: Block = {
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
export const ColorOfTheYearBlock: Block = {
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
export const CoreValuesBlock: Block = {
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
          options: ICON_OPTIONS,
        },
      ],
    },
  ],
};

// ─── CTA Banner Block ──────────────────────────────────────────────────────
export const CtaBannerBlock: Block = {
  slug: 'cta-banner',
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subtext', type: 'textarea' },
    { name: 'buttonLabel', type: 'text' },
    {
      name: 'buttonPath',
      type: 'text',
      admin: { description: 'Relative URL path the button links to, e.g. "contact" or "" for home.' },
    },
  ],
};

// ─── Rich Text Block ───────────────────────────────────────────────────────
export const RichTextBlock: Block = {
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

// ─── Tabbed Panel Block ─────────────────────────────────────────────────────
// Generalizes the recurring "select a tab, view its content" pattern used
// across About (factories/certifications), Sustainability (pillars) and
// Innovation (technologies) into one reusable, Payload-editable block.
export const TabbedPanelBlock: Block = {
  slug: 'tabbed-panel',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'badge', type: 'text' },
        { name: 'summary', type: 'textarea' },
        {
          name: 'metrics',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
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
    },
  ],
};

// ─── Timeline Block ─────────────────────────────────────────────────────────
export const TimelineBlock: Block = {
  slug: 'timeline',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'entries',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

// ─── Feature Grid Block ─────────────────────────────────────────────────────
export const FeatureGridBlock: Block = {
  slug: 'feature-grid',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'columns',
      type: 'select',
      options: ['2', '3', '4'],
      defaultValue: '3',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'iconName', type: 'select', options: ICON_OPTIONS },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

// ─── Stat Highlights Block ──────────────────────────────────────────────────
export const StatHighlightsBlock: Block = {
  slug: 'stat-highlights',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

// ─── Quote Block ─────────────────────────────────────────────────────────────
export const QuoteBlock: Block = {
  slug: 'quote',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'role', type: 'text' },
  ],
};

// ─── Team Block ──────────────────────────────────────────────────────────────
export const TeamBlock: Block = {
  slug: 'team',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'members',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'credentials', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
};

// ─── Certifications Block ────────────────────────────────────────────────────
// Kept as its own dedicated (not generic) block: the QCVN / ISO / lab-test /
// registration content is genuinely unique, structured domain data rather
// than a pattern reused elsewhere on the site.
export const CertificationsBlock: Block = {
  slug: 'certifications',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'certId', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'issuer', type: 'text' },
        { name: 'summary', type: 'textarea' },
        {
          name: 'highlights',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'details',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'approvedProducts',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
};

// ─── Contact Info Block ──────────────────────────────────────────────────────
export const ContactInfoBlock: Block = {
  slug: 'contact-info',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'offices',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
        { name: 'phone', type: 'text' },
        { name: 'mapUrl', type: 'text' },
      ],
    },
    {
      name: 'emailDirectory',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'email', type: 'text', required: true },
      ],
    },
  ],
};

// ─── Contact Form Block ───────────────────────────────────────────────────
// Marker block (no fields) that renders the site's contact form + office
// directory. Kept as a dedicated interactive component rather than a
// generic block, since a lead-capture form isn't a content pattern reused
// elsewhere on the site.
export const ContactFormBlock: Block = {
  slug: 'contact-form',
  fields: [],
};

export const ALL_BLOCKS: Block[] = [
  HeroBlock,
  AboutBlock,
  StatsBlock,
  ProcessBlock,
  TestimonialsBlock,
  ColorOfTheYearBlock,
  CoreValuesBlock,
  CtaBannerBlock,
  RichTextBlock,
  TabbedPanelBlock,
  TimelineBlock,
  FeatureGridBlock,
  StatHighlightsBlock,
  QuoteBlock,
  TeamBlock,
  CertificationsBlock,
  ContactInfoBlock,
  ContactFormBlock,
];
