import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageByPath, getAllPageSlugs } from '../../../lib/payloadApi';
import PageClient from '../../../components/PageClient';

interface Params {
  slug: string[];
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs
    .filter((slug) => slug !== 'home')
    .map((slug) => ({ slug: slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageByPath(slug.join('/'));
  if (!page) return {};
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || undefined,
    openGraph: page.seo?.ogImage?.url ? { images: [page.seo.ogImage.url] } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const path = slug.join('/');
  const page = await getPageByPath(path);
  if (!page) notFound();
  return <PageClient page={page} />;
}
