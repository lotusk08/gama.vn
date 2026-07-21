import { BlogPost, JobOpening } from '../types';

// Retrieve the Payload CMS URL.
// In the browser: always use the current origin — Payload runs on the same server as Next.js.
// Server-side (SSR/RSC): use NEXT_PUBLIC_SERVER_URL env var.
const getCmsUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Always use current origin in browser — avoids localhost leaking from SSR env vars
    return window.location.origin;
  }
  // Server-side: use the configured server URL
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
};

// Module-level constant: may be 'http://localhost:3000' when evaluated server-side.
// DO NOT use this for actual fetch() calls from client components.
export const PAYLOAD_CMS_URL = getCmsUrl();

/**
 * Always resolves to the correct API base URL at call time.
 * Use this inside async functions instead of PAYLOAD_CMS_URL.
 * - In the browser: uses window.location.origin (guaranteed correct on Vercel)
 * - Server-side: uses NEXT_PUBLIC_SERVER_URL env var
 */
function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
}

export interface PayloadStatus {
  isConnected: boolean;
  url: string;
  source: 'Payload CMS' | 'Local Demo Mode';
  error?: string;
}

export function lexicalToHtml(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;

  // Handle arrays of nodes
  if (Array.isArray(node)) return node.map(lexicalToHtml).join('');

  // Payload v3 Lexical top-level wrapper: { root: { type: 'root', children: [...] } }
  if (node.root) return lexicalToHtml(node.root);

  const type = node.type;

  // Root node — recurse into children
  if (type === 'root') {
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    return content;
  }

  if (type === 'paragraph') {
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    // Empty paragraphs act as spacers
    if (!content.trim()) return '<p style="margin-bottom:0.5rem;"></p>';
    return `<p style="margin-bottom:1rem;line-height:1.8;">${content}</p>`;
  }

  if (type === 'heading') {
    // Payload v3 uses node.tag (e.g. 'h1', 'h2', 'h3')
    const tag = node.tag || 'h3';
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    const sizes: Record<string, string> = { h1: '1.8rem', h2: '1.5rem', h3: '1.2rem', h4: '1.05rem', h5: '1rem', h6: '0.9rem' };
    return `<${tag} style="font-size:${sizes[tag] || '1.2rem'};font-weight:700;margin:1.5rem 0 0.75rem;color:#0A4E35;line-height:1.3;">${content}</${tag}>`;
  }

  if (type === 'list') {
    // Payload v3: listType 'bullet' → <ul>, 'number' → <ol>
    const tag = (node.listType === 'number' || node.tag === 'ol') ? 'ol' : 'ul';
    const listStyle = tag === 'ol' ? 'decimal' : 'disc';
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    return `<${tag} style="list-style:${listStyle};padding-left:1.5rem;margin-bottom:1rem;">${content}</${tag}>`;
  }

  if (type === 'listitem') {
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    return `<li style="margin-bottom:0.25rem;">${content}</li>`;
  }

  if (type === 'quote') {
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    return `<blockquote style="border-left:4px solid #B48F57;padding:0.75rem 1rem;margin:1rem 0;background:#f9f6f1;border-radius:0 0.5rem 0.5rem 0;font-style:italic;color:#4a5568;">${content}</blockquote>`;
  }

  if (type === 'horizontalrule') {
    return '<hr style="border:none;border-top:1px solid #e2e8f0;margin:2rem 0;" />';
  }

  if (type === 'linebreak') {
    return '<br />';
  }

  if (type === 'link' || type === 'autolink') {
    const content = Array.isArray(node.children) ? node.children.map(lexicalToHtml).join('') : '';
    const href = node.fields?.url || node.url || '#';
    const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}"${target} style="color:#0A4E35;text-decoration:underline;">${content}</a>`;
  }

  if (type === 'text') {
    let text = node.text || '';
    // Escape HTML entities
    text = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Apply inline formatting (Payload v3 uses bitmask format field)
    // Bit 1 = Bold, Bit 2 = Italic, Bit 8 = Underline, Bit 16 = Strikethrough, Bit 32 = Code
    const fmt = node.format || 0;
    if (fmt & 32) text = `<code style="background:#f1f5f9;padding:0.1em 0.3em;border-radius:3px;font-family:monospace;font-size:0.9em;">${text}</code>`;
    if (fmt & 16) text = `<s>${text}</s>`;
    if (fmt & 8) text = `<u>${text}</u>`;
    if (fmt & 2) text = `<em>${text}</em>`;
    if (fmt & 1) text = `<strong>${text}</strong>`;
    return text;
  }

  if (type === 'upload') {
    const media = node.value;
    if (media) {
      const url = media.url || '';
      const alt = media.alt || media.filename || 'image';
      return `
        <div style="margin:1.5rem 0;border-radius:1rem;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
          <img src="${url}" alt="${alt}" style="width:100%;height:auto;object-fit:cover;max-height:500px;" />
          ${media.caption ? `<p style="font-size:0.75rem;color:#6b7280;margin-top:0.5rem;text-align:center;font-style:italic;">${media.caption}</p>` : ''}
        </div>
      `;
    }
    return '';
  }

  // Unknown node with children — try to recurse anyway
  if (Array.isArray(node.children)) {
    return node.children.map(lexicalToHtml).join('');
  }

  return '';
}

function transformPayloadDoc(doc: any): BlogPost {
  let contentHtml = '';

  if (typeof doc.content === 'string') {
    // Plain string content — wrap bare newlines in paragraphs
    contentHtml = doc.content
      .split(/\n\n+/)
      .filter((p: string) => p.trim())
      .map((p: string) => `<p style="margin-bottom:1rem;line-height:1.8;">${p.trim().replace(/\n/g, '<br />')}</p>`)
      .join('');
  } else if (doc.content && typeof doc.content === 'object') {
    // Payload v3 Lexical richText JSON object
    contentHtml = lexicalToHtml(doc.content);
    // If lexicalToHtml returned nothing, log the raw structure for debugging
    if (!contentHtml.trim()) {
      console.warn('[payload.ts] lexicalToHtml returned empty for doc:', doc.id, '\nRaw content:', JSON.stringify(doc.content, null, 2).slice(0, 500));
    }
  } else if (doc.content_html) {
    contentHtml = doc.content_html;
  }

  // Safely extract author — Payload group fields return null when never saved
  const authorName: string = doc.author?.name || doc.author?.username || 'GAMA Contributor';
  const authorRole: string = doc.author?.role || 'Technical Specialist';

  // Calculate approximate word count from stripped HTML
  const wordCount = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

  return {
    id: doc.id || String(doc._id || Math.random()),
    title: doc.title || 'Untitled Post',
    excerpt: doc.excerpt || doc.meta?.description || 'No excerpt available.',
    content: contentHtml || '<p style="color:#999;">Nội dung chưa được cập nhật.</p>',
    category: (doc.category || 'Science') as BlogPost['category'],
    date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : new Date().toLocaleDateString('vi-VN')),
    readTime: doc.readTime || `${Math.max(2, Math.ceil(wordCount / 200))} phút đọc`,
    author: {
      name: authorName,
      role: authorRole,
    },
  };
}

/**
 * Validates connectivity to the configured Payload CMS API.
 */
export async function checkPayloadConnection(): Promise<PayloadStatus> {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/posts?limit=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });

    if (response.ok) {
      return { isConnected: true, url: baseUrl, source: 'Payload CMS' };
    } else {
      return {
        isConnected: false, url: baseUrl, source: 'Local Demo Mode',
        error: `API returned status ${response.status}: ${response.statusText}`
      };
    }
  } catch (err: any) {
    return {
      isConnected: false, url: baseUrl, source: 'Local Demo Mode',
      error: err.message || 'Unreachable'
    };
  }
}

/**
 * Fetches all blog posts from Payload CMS (MongoDB) via the REST API.
 * Used only as a client-side fallback for the manual refresh button.
 * Primary data loading is done server-side via payloadApi.ts getPosts().
 */
export async function fetchBlogPosts(): Promise<{ posts: BlogPost[]; source: 'Payload CMS' | 'Local Demo Mode'; error?: string }> {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/posts?limit=100&depth=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.docs)) {
      return { posts: data.docs.map(transformPayloadDoc), source: 'Payload CMS' };
    } else {
      throw new Error('Response missing "docs" array');
    }
  } catch (err: any) {
    console.warn('Payload CMS fetch failed:', err);
    return {
      posts: [],
      source: 'Local Demo Mode',
      error: `Failed to fetch from Payload CMS (${err.message || err}).`
    };
  }
}

/**
 * Creates a new blog post via the Payload CMS REST API.
 */
export async function createBlogPost(postData: Omit<BlogPost, 'id' | 'date'>): Promise<{ post: BlogPost; source: 'Payload CMS' | 'Local Demo Mode' }> {
  const baseUrl = getApiBaseUrl();
  const newPost: BlogPost = {
    ...postData,
    id: `post-${Date.now()}`,
    date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        category: postData.category,
        readTime: postData.readTime,
        author: postData.author
      })
    });

    if (response.ok) {
      const data = await response.json();
      return { post: transformPayloadDoc(data.doc || data), source: 'Payload CMS' };
    }
    throw new Error(`POST failed with status ${response.status}`);
  } catch (err) {
    console.warn('Payload CMS POST request failed:', err);
    return { post: newPost, source: 'Local Demo Mode' };
  }
}

/** Clears any locally cached post overrides. */
export function resetLocalPosts(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('gama_local_posts');
  }
}

// ==========================================
// Careers Integration
// ==========================================

function transformPayloadJob(doc: any): JobOpening {
  const mapStringArray = (arr: any, key: string): string[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((item: any) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        return item[key] || item.text || item.value || JSON.stringify(item);
      }
      return '';
    }).filter(Boolean);
  };

  return {
    id: doc.id || String(doc._id || Math.random()),
    title: doc.title || 'Untitled Position',
    department: doc.department || 'General',
    location: doc.location || 'GAMA Office',
    type: doc.type || 'Toàn thời gian',
    description: doc.description || '',
    requirements: mapStringArray(doc.requirements, 'requirement'),
    responsibilities: mapStringArray(doc.responsibilities, 'responsibility')
  };
}

/**
 * Fetches job openings from Payload CMS via the REST API.
 * Used only as a client-side fallback for manual refresh.
 * Primary data loading is done server-side via payloadApi.ts getCareers().
 */
export async function fetchCareers(): Promise<{ jobs: JobOpening[]; source: 'Payload CMS' | 'Local Demo Mode'; error?: string }> {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/careers?limit=100&depth=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.docs)) {
      return { jobs: data.docs.map(transformPayloadJob), source: 'Payload CMS' };
    } else {
      throw new Error('Response missing "docs" array');
    }
  } catch (err: any) {
    console.warn('Payload CMS fetch careers failed:', err);
    return {
      jobs: [],
      source: 'Local Demo Mode',
      error: `Failed to fetch from Payload CMS (${err.message || err}).`
    };
  }
}

export async function submitJobApplication(
  jobId: string,
  jobTitle: string,
  name: string,
  email: string,
  cvUrl: string
): Promise<{ success: boolean; source: 'Payload CMS' | 'Local Demo Mode' }> {
  const baseUrl = getApiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/api/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ jobId, jobTitle, name, email, cvUrl })
    });
    if (response.ok) {
      return { success: true, source: 'Payload CMS' };
    }
    console.warn(`Payload CMS application POST failed with status ${response.status}`);
  } catch (err) {
    console.warn('Payload CMS application POST failed:', err);
  }
  return { success: false, source: 'Local Demo Mode' };
}

/** Clears any locally cached career/application overrides. */
export function resetLocalCareers(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('gama_local_careers');
    localStorage.removeItem('gama_local_applications');
  }
}
