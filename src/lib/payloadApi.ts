/**
 * payloadApi.ts — Server-safe Payload CMS fetch utilities for Next.js server components.
 *
 * Uses `process.env.PAYLOAD_URL` (or falls back to localhost) so no VITE_ prefix
 * or import.meta.env is needed. Call these only from Server Components or
 * async Server Actions — never from `"use client"` files.
 */

// The internal URL Next.js uses to reach the Payload API.
// In production on Vercel this should be set to the full deployment URL.
const PAYLOAD_URL =
  process.env.PAYLOAD_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  'http://localhost:3000';

/** Strip trailing slash once */
const base = PAYLOAD_URL.replace(/\/$/, '');

/** Generic fetch with cache: 'no-store' so globals are always fresh */
async function payloadFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${base}${path}`, {
      headers: { Accept: 'application/json' },
      // next: { revalidate: 60 }, // optionally use ISR
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
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
  return payloadFetch<HeaderGlobal>('/api/globals/header?depth=1');
}

/** Fetch the Footer global */
export async function getFooter(): Promise<FooterGlobal | null> {
  return payloadFetch<FooterGlobal>('/api/globals/footer?depth=1');
}

/** Fetch a Pages document by slug */
export async function getPage(slug: string): Promise<PageDoc | null> {
  const data = await payloadFetch<{ docs: PageDoc[] }>(
    `/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  );
  return data?.docs?.[0] ?? null;
}

/** Find the first block matching a given blockType in a layout array */
export function findBlock<T extends PageBlock>(
  layout: PageBlock[] | undefined | null,
  blockType: string,
): (T & PageBlock) | undefined {
  return layout?.find((b) => b.blockType === blockType) as T & PageBlock | undefined;
}
