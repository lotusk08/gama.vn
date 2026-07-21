import { Field } from 'payload';

function toSlug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** A unique `slug` text field that auto-derives from `title` when left empty, editable by admins. */
export function slugifyField(): Field {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    admin: {
      description: 'URL segment for this item. Auto-generated from the title if left blank.',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (value) return toSlug(value);
          if (data?.title) return toSlug(data.title);
          return value;
        },
      ],
    },
  };
}
