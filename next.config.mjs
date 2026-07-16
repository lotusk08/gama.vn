import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Vercel Blob storage CDN
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // Unsplash (fallback during dev)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withPayload(nextConfig);
