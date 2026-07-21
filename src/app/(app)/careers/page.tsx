import type { Metadata } from 'next';
import { getCareers } from '../../../lib/payloadApi';
import CareersList from '../../../components/CareersList';

export const metadata: Metadata = {
  title: 'Tuyển dụng | GAMA.vn',
  description: 'Cơ hội nghề nghiệp tại GAMA — nơi chuyên môn hóa học kiến tạo diện mạo tương lai.',
};

export default async function CareersIndexPage() {
  const jobs = await getCareers();
  return <CareersList initialJobs={jobs} />;
}
