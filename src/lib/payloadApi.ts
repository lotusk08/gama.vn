/**
 * payloadApi.ts — Server-safe Payload CMS fetch utilities for Next.js server components.
 *
 * Uses `process.env.PAYLOAD_URL` (or falls back to localhost) so no VITE_ prefix
 * or import.meta.env is needed. Call these only from Server Components or
 * async Server Actions — never from `"use client"` files.
 */

import { getPayload } from 'payload';
import configPromise from '../../payload.config';

let payloadInstance: any = null;

async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({
      config: configPromise,
    });
  }
  return payloadInstance;
}

// ─── Types (lightweight, used by server components before types are regenerated) ──

export interface HeaderGlobal {
  id: string;
  siteTitle?: string | null;
  siteDescription?: string | null;
  logo?: { url?: string | null; alt?: string } | null;
  navItems: {
    label: string;
    tabId: string;
    id?: string | null;
    hasSubMenu?: boolean | null;
    subMenuItems?: { label: string; tabId: string; id?: string | null }[] | null;
  }[];
  topBarTicker?: {
    stockSymbol?: string | null;
    stockChange?: string | null;
    certificationText?: string | null;
  };
  topBarLinks?: { label: string; tabId: string; id?: string | null }[];
}

export interface FooterGlobal {
  id: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
  };
  copyright?: string;
  newsletterTitle?: string;
  newsletterText?: string;
  footerLinks?: { label: string; tabId: string; id?: string | null }[];
  certifications?: { label: string; icon?: string; id?: string | null }[];
}

export interface PageBlock {
  blockType: string;
  id?: string | null;
  [key: string]: unknown;
}

export interface PageDoc {
  id: string;
  title: string;
  slug: string;
  layout: PageBlock[];
}

// ─── Public helpers ────────────────────────────────────────────────────────

/** Fetch the Header global */
export async function getHeader(): Promise<HeaderGlobal | null> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: 'header',
      depth: 1,
    });
    return data as HeaderGlobal;
  } catch (err) {
    console.error('Error fetching header global:', err);
    return null;
  }
}

/** Fetch the Footer global */
export async function getFooter(): Promise<FooterGlobal | null> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: 'footer',
      depth: 1,
    });
    return data as FooterGlobal;
  } catch (err) {
    console.error('Error fetching footer global:', err);
    return null;
  }
}

/** Fetch a Pages document by slug */
export async function getPage(slug: string): Promise<PageDoc | null> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });
    return (data.docs?.[0] as PageDoc) ?? null;
  } catch (err) {
    console.error(`Error fetching page ${slug}:`, err);
    return null;
  }
}

/** Find the first block matching a given blockType in a layout array */
export function findBlock<T extends PageBlock>(
  layout: PageBlock[] | undefined | null,
  blockType: string,
): (T & PageBlock) | undefined {
  return layout?.find((b) => b.blockType === blockType) as T & PageBlock | undefined;
}
