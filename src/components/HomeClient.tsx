"use client";
import React from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';
import BlockRenderer from './BlockRenderer';
import type { PageDoc } from '../lib/payloadApi';
import { PAYLOAD_CMS_URL } from '../lib/payload';

export default function HomeClient({ homePage }: { homePage: PageDoc | null }) {
  const { data: liveHomePage } = useLivePreview({
    initialData: (homePage || { id: 'home-preview' }) as any,
    serverURL: PAYLOAD_CMS_URL,
    depth: 2,
  });

  const displayHomePage = liveHomePage || homePage;

  return <BlockRenderer layout={displayHomePage?.layout} />;
}
