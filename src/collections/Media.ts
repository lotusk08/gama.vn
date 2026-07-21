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
    // imageSizes removed: generating resized variants requires Payload to download
    // the blob server-side (via fetch → ArrayBuffer), which triggers the
    // SharedArrayBuffer restriction in Vercel's serverless runtime.
    // Original images are served directly from Vercel Blob CDN; use the
    // Next.js <Image> component for on-the-fly optimisation where needed.
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
