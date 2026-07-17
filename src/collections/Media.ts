import { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Only disable local storage when explicitly using Vercel Blob (production).
// Locally, files are written to public/media/ so they're accessible at /media/*.
const useVercelBlob = process.env.USE_VERCEL_BLOB === 'true';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    // Disable local disk storage only in production when Vercel Blob is active.
    disableLocalStorage: useVercelBlob,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};
