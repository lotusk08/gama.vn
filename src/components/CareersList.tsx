"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Building, Compass, X, RefreshCw } from 'lucide-react';
import { JobOpening } from '../types';
import { fetchCareers } from '../lib/payload';
import JobApplicationForm from './JobApplicationForm';

interface CareersListProps {
  initialJobs?: JobOpening[];
}

const recruitmentSteps = [
  {
    step: '01',
    title: 'Nộp hồ sơ ứng tuyển',
    desc: 'Gửi CV và danh mục dự án cá nhân của bạn. Bộ phận nhân sự sẽ đánh giá và phản hồi trong vòng 5 ngày làm việc.'
  },
  {
    step: '02',
    title: 'Phỏng vấn kỹ thuật',
    desc: 'Thảo luận về chuyên môn hóa học, kỹ thuật hoặc kinh doanh với trưởng bộ phận GAMA để đánh giá độ phù hợp với tổ chức.'
  },
  {
    step: '03',
    title: 'Bài tập tình huống',
    desc: 'Đối với các nhà khoa học hoặc kỹ sư, trình bày phương án giải quyết bài toán thực tế về màng phủ bảo vệ hoặc yêu cầu kỹ thuật.'
  },
  {
    step: '04',
    title: 'Gặp gỡ ban điều hành',
    desc: 'Vòng phỏng vấn cuối cùng với Ban giám đốc GAMA để thống nhất về lộ trình, đãi ngộ và bắt đầu hành trình đồng hành.'
  }
];

export default function CareersList({ initialJobs = [] }: CareersListProps) {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(initialJobs);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  useEffect(() => {
    if (initialJobs.length === 0) {
      setLoading(true);
      fetchCareers()
        .then(({ jobs }) => setJobOpenings(jobs))
        .catch((err) => console.error('Error fetching careers:', err))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-36 pb-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        <div className="border-b border-gray-100 pb-12 mb-16 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
            • NHÂN SỰ & CƠ HỘI NGHỀ NGHIỆP GAMA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1] mb-4">
            Nơi chuyên môn hóa học kiến tạo diện mạo tương lai
          </h2>
          <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
            Tại GAMA, chúng tôi trao quyền cho các nhà hóa học, chuyên gia kỹ thuật và cố vấn thương mại để phá vỡ các giới hạn của khoa học vật liệu. Gia nhập một tổ chức được xây dựng trên nền tảng chất lượng vượt trội, an toàn môi trường tuyệt đối và độ bền vượt thời gian.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6">
            <span className="text-[10px] font-bold text-[#B48F57] uppercase tracking-widest block mb-2 font-mono">VĂN HÓA & KHÔNG GIAN LÀM VIỆC GAMA</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] leading-snug mb-5">
              Văn hóa kỷ luật, sáng tạo và bảo vệ môi trường
            </h3>
            <p className="text-gray-600 font-sans text-xs sm:text-sm leading-relaxed mb-4">
              Đội ngũ của chúng tôi làm việc tại điểm giao thoa giữa khoa học chính xác và phong cách sống cao cấp. Chúng tôi duy trì một môi trường phẳng, cởi mở, nơi các nhà nghiên cứu được hỗ trợ toàn diện để thử nghiệm các loại nhựa phủ mới, chất bảo quản sinh học bền vững và công nghệ nano lọc ánh sáng.
            </p>
            <p className="text-gray-600 font-sans text-xs sm:text-sm leading-relaxed mb-6">
              Với hệ thống văn phòng làm việc hiện đại tại TP. Hồ Chí Minh, các trung tâm nghiên cứu và nhà máy sản xuất thông minh, chúng tôi hỗ trợ thời gian làm việc linh hoạt, các chương trình nghiên cứu chuyên sâu và những chiến dịch đóng góp cho cộng đồng (CSR).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-gray-150">
                <Compass className="w-5 h-5 text-[#B48F57] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0A4E35] text-xs uppercase font-sans mb-1">Lộ trình rõ ràng</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">Lộ trình khoa học và thương mại bài bản với các chương trình đào tạo chuyên môn hàng năm.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-gray-150">
                <Building className="w-5 h-5 text-[#B48F57] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0A4E35] text-xs uppercase font-sans mb-1">Vận hành đồng bộ</h5>
                  <p className="text-[11px] text-gray-500 leading-normal">Hệ thống thư điện tử đồng bộ với tên miền chính thức của doanh nghiệp: <code className="font-mono bg-[#EEF5ED] text-[#0A4E35] px-1 rounded text-[10px]">name.lastname@gama.vn</code>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#0A4E35] rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-white/5">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] border-[15px] border-white rounded-full" />
                <div className="absolute left-[-5%] bottom-[-15%] w-[150px] h-[150px] border-[5px] border-white rounded-full" />
              </div>

              <div className="z-10 relative flex flex-col gap-6">
                <span className="text-[10px] bg-[#EEF5ED]/20 text-[#B48F57] px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold w-fit">
                  ★ TUYÊN NGÔN TUYỂN DỤNG
                </span>
                <p className="text-lg font-serif italic text-gray-100 leading-relaxed">
                  "Tại GAMA, chúng tôi không chỉ đơn thuần tuyển dụng nhân sự; chúng tôi quy tụ một hội đồng các chuyên gia chất phủ bảo vệ. Chúng tôi cùng chia sẻ niềm đam mê tạo ra những màng hóa chất hoàn hảo và những sắc màu kiến trúc phục hồi tâm hồn."
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-white/10 text-xs font-sans mt-2">
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#B48F57]">Nguyễn Thị Kim Tiền</p>
                    <p className="text-[10px] text-gray-300">Giám đốc Nhân sự & Tuyển dụng</p>
                  </div>
                  <div className="text-[10px] font-mono text-[#B48F57] bg-white/5 px-2.5 py-1 rounded">
                    gama.vn
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
              • QUY TRÌNH TUYỂN DỤNG
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
              Các bước đánh giá ứng viên
            </h3>
            <p className="text-gray-500 text-xs font-sans mt-2">
              Quy trình minh bạch, bài bản và hỗ trợ tối đa, được thiết kế để tôn trọng năng lực của từng ứng viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recruitmentSteps.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-gray-150 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-4 right-6 text-4xl font-mono font-black text-slate-100 select-none">
                  {step.step}
                </div>
                <div className="z-10 pt-4">
                  <h4 className="font-sans font-extrabold text-[#0A4E35] text-base mb-3">{step.title}</h4>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] font-sans block mb-2">
                • VỊ TRÍ ĐANG TUYỂN DỤNG
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                Cơ hội nghề nghiệp rộng mở
              </h3>
            </div>
            <div className="text-xs text-[#0A4E35] bg-[#EEF5ED] px-4 py-2 rounded-full font-mono font-bold border border-[#0A4E35]/15">
              Email liên hệ: hr@gama.vn
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <RefreshCw className="w-8 h-8 text-[#0A4E35] animate-spin mb-4" />
              <p className="text-sm text-gray-500 font-sans">Đang tải danh sách vị trí tuyển dụng...</p>
            </div>
          ) : jobOpenings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 w-full text-center">
              <Briefcase className="w-12 h-12 text-[#B48F57]/45 mb-4" />
              <p className="text-sm font-bold text-[#0A4E35] mb-1">Không tìm thấy vị trí tuyển dụng nào</p>
              <p className="text-xs text-gray-400 max-w-sm">Hiện tại chưa có vị trí ứng tuyển nào được đăng tải trên hệ thống.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-150 hover:border-[#B48F57] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <Link href={`/careers/${job.slug}`}>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="text-[9px] bg-[#EEF5ED] text-[#0A4E35] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B48F57]" />
                        {job.type}
                      </span>
                    </div>

                    <h4 className="font-serif font-extrabold text-lg sm:text-xl text-[#0A4E35] group-hover:text-[#B48F57] transition-colors leading-tight mb-3">
                      {job.title}
                    </h4>

                    <div className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#B48F57]" />
                      {job.location}
                    </div>

                    <p className="text-xs text-gray-500 font-sans leading-relaxed mb-6 line-clamp-4 font-light">
                      {job.description}
                    </p>
                  </Link>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full mt-4 py-3 bg-[#EEF5ED] hover:bg-[#0A4E35] group-hover:bg-[#0A4E35] text-[#0A4E35] group-hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Ứng tuyển ngay</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[24px] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              >
                <div className="bg-[#0A4E35] text-white p-6 relative">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="absolute top-6 right-6 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2 items-center text-xs font-bold text-[#B48F57] uppercase tracking-widest mb-1.5 font-mono">
                    <Briefcase className="w-4 h-4" />
                    <span>Cổng tiếp nhận hồ sơ ứng viên GAMA</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold effect-font-gama-light">
                    {selectedJob.title}
                  </h3>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  <JobApplicationForm
                    jobId={selectedJob.id}
                    jobTitle={selectedJob.title}
                    onCancel={() => setSelectedJob(null)}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
