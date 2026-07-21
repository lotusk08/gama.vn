import type { Metadata } from 'next';
import { getPosts } from '../../../lib/payloadApi';
import BlogList from '../../../components/BlogList';

export const metadata: Metadata = {
  title: 'Tin tức | GAMA.vn',
  description: 'Khoa học màu sắc & Nhật ký nghiên cứu từ đội ngũ chuyên gia GAMA.',
};

export default async function BlogIndexPage() {
  const posts = await getPosts();
  return <BlogList initialPosts={posts} />;
}
