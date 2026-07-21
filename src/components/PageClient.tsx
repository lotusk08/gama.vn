"use client";
import React from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';
import BlockRenderer from './BlockRenderer';
import type { PageDoc } from '../lib/payloadApi';
import { PAYLOAD_CMS_URL } from '../lib/payload';

export default function PageClient({ page }: { page: PageDoc }) {
  const { data: livePage } = useLivePreview({
    initialData: page as any,
    serverURL: PAYLOAD_CMS_URL,
    depth: 2,
  });

  const displayPage = livePage || page;
  const hasHeroBlock = displayPage.layout?.[0]?.blockType === 'hero';

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-white">
      {!hasHeroBlock && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full pt-40">
          <div className="border-b border-slate-200 pb-8 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-none effect-font-styling effect-font-gama">
              {displayPage.title}
            </h1>
          </div>
        </div>
      )}
      <BlockRenderer layout={displayPage.layout} />
    </div>
  );
}
