import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPolicies, getPolicyByKey } from '../../../../lib/payloadApi';
import CorporatePolicies, { PolicyKey } from '../../../../components/CorporatePolicies';

interface Params {
  key: string;
}

export async function generateStaticParams() {
  const policies = await getPolicies();
  return policies.map((p) => ({ key: p.key }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { key } = await params;
  const policy = await getPolicyByKey(key);
  if (!policy) return {};
  return {
    title: policy.seo?.metaTitle || `${policy.title} | GAMA.vn`,
    description: policy.seo?.metaDescription || policy.introduction,
  };
}

export default async function PolicyPage({ params }: { params: Promise<Params> }) {
  const { key } = await params;
  const policy = await getPolicyByKey(key);
  if (!policy) notFound();
  return <CorporatePolicies activePolicy={key as PolicyKey} currentPolicy={policy} />;
}
