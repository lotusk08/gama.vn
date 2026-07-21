import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Briefcase } from 'lucide-react';
import { JobOpening } from '../types';
import JobApplicationForm from './JobApplicationForm';

export default function JobDetailView({ job }: { job: JobOpening }) {
  return (
    <section className="pt-36 pb-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A4E35] hover:text-[#B48F57] transition-colors cursor-pointer group mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Trở lại danh sách tuyển dụng</span>
        </Link>

        <div className="flex gap-2 items-center text-xs font-bold text-[#B48F57] uppercase tracking-widest mb-3 font-mono">
          <Briefcase className="w-4 h-4" />
          <span>{job.department}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-[1.1] mb-6 effect-font-styling effect-font-gama">
          {job.title}
        </h1>

        <div className="bg-slate-50 rounded-xl p-4 border border-gray-150/80 flex flex-wrap gap-6 text-xs mb-10">
          <div>
            <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px]">PHÒNG BAN</span>
            <span className="text-[#0A4E35] font-bold">{job.department}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B48F57]" />
            <div>
              <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px]">ĐỊA ĐIỂM</span>
              <span className="text-[#0A4E35] font-bold">{job.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B48F57]" />
            <div>
              <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px]">HÌNH THỨC</span>
              <span className="text-[#0A4E35] font-bold">{job.type}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed mb-12">
          <div>
            <h4 className="font-bold text-[#0A4E35] text-xs uppercase tracking-wider mb-2 font-sans">Mô tả công việc</h4>
            <p className="text-xs leading-relaxed text-gray-500 font-light">{job.description}</p>
          </div>

          {job.responsibilities.length > 0 && (
            <div>
              <h4 className="font-bold text-[#0A4E35] text-xs uppercase tracking-wider mb-2 font-sans">Nhiệm vụ trọng tâm</h4>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs text-gray-500 font-light">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements.length > 0 && (
            <div>
              <h4 className="font-bold text-[#0A4E35] text-xs uppercase tracking-wider mb-2 font-sans">Yêu cầu chuyên môn</h4>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs text-gray-500 font-light">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h4 className="font-bold text-[#0A4E35] text-sm uppercase tracking-wider mb-5 font-sans">Đăng ký ứng tuyển</h4>
          <JobApplicationForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </section>
  );
}
