import type { Metadata } from 'next';
import { getPageByPath } from '../../lib/payloadApi';
import HomeClient from '../../components/HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getPageByPath('home');
  return {
    title: homePage?.seo?.metaTitle || homePage?.title || undefined,
    description: homePage?.seo?.metaDescription || undefined,
    openGraph: homePage?.seo?.ogImage?.url ? { images: [homePage.seo.ogImage.url] } : undefined,
  };
}

export default async function Page() {
  const homePage = await getPageByPath('home');
  return <HomeClient homePage={homePage} />;
}
