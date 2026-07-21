import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '../../../../lib/payloadApi';
import BlogPostView from '../../../../components/BlogPostView';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | GAMA.vn`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return <BlogPostView post={post} relatedPosts={relatedPosts} />;
}
