/**
 * payloadApi.ts — Server-safe Payload CMS fetch utilities for Next.js server components.
 *
 * Uses `process.env.PAYLOAD_URL` (or falls back to localhost) so no VITE_ prefix
 * or import.meta.env is needed. Call these only from Server Components or
 * async Server Actions — never from `"use client"` files.
 */

import { getPayload } from 'payload';
import configPromise from '../../payload.config';
import { lexicalToHtml } from './payload';
import type { BlogPost, JobOpening } from '../types';

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

// ─── Blog Posts ────────────────────────────────────────────────────────────

function transformServerPost(doc: any): BlogPost {
  let contentHtml = '';
  if (typeof doc.content === 'string') {
    contentHtml = doc.content
      .split(/\n\n+/)
      .filter((p: string) => p.trim())
      .map((p: string) => `<p style="margin-bottom:1rem;line-height:1.8;">${p.trim().replace(/\n/g, '<br />')}</p>`)
      .join('');
  } else if (doc.content && typeof doc.content === 'object') {
    contentHtml = lexicalToHtml(doc.content);
  }

  const wordCount = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const authorName: string = doc.author?.name || 'GAMA Contributor';
  const authorRole: string = doc.author?.role || 'Technical Specialist';

  return {
    id: String(doc.id || doc._id || Math.random()),
    title: doc.title || 'Untitled Post',
    excerpt: doc.excerpt || '',
    content: contentHtml || '<p style="color:#999;">Nội dung chưa được cập nhật.</p>',
    category: (doc.category || 'Science') as BlogPost['category'],
    date: doc.date || (doc.createdAt
      ? new Date(doc.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
      : ''),
    readTime: doc.readTime || `${Math.max(2, Math.ceil(wordCount / 200))} phút đọc`,
    author: { name: authorName, role: authorRole },
  };
}

/** Fetch all published blog posts server-side via Payload local API (no HTTP). */
export async function getPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.find({
      collection: 'posts',
      limit: 100,
      depth: 1,
      sort: '-createdAt',
    });
    return data.docs.map(transformServerPost);
  } catch (err) {
    console.error('[payloadApi] Error fetching posts:', err);
    return [];
  }
}

// ─── Job Openings ──────────────────────────────────────────────────────────

function transformServerJob(doc: any): JobOpening {
  const mapStringArray = (arr: any, key: string): string[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((item: any) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') return item[key] || item.text || item.value || '';
      return '';
    }).filter(Boolean);
  };

  return {
    id: String(doc.id || doc._id || Math.random()),
    title: doc.title || 'Untitled Position',
    department: doc.department || 'General',
    location: doc.location || 'GAMA Office',
    type: doc.type || 'Toàn thời gian',
    description: doc.description || '',
    requirements: mapStringArray(doc.requirements, 'requirement'),
    responsibilities: mapStringArray(doc.responsibilities, 'responsibility'),
  };
}

/** Fetch all job openings server-side via Payload local API (no HTTP). */
export async function getCareers(): Promise<JobOpening[]> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.find({
      collection: 'careers',
      limit: 100,
      depth: 1,
    });
    return data.docs.map(transformServerJob);
  } catch (err) {
    console.error('[payloadApi] Error fetching careers:', err);
    return [];
  }
}
