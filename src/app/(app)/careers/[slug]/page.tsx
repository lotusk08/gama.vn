import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCareers, getJobBySlug } from '../../../../lib/payloadApi';
import JobDetailView from '../../../../components/JobDetailView';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const jobs = await getCareers();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return {
    title: `${job.title} | Tuyển dụng GAMA.vn`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();
  return <JobDetailView job={job} />;
}
