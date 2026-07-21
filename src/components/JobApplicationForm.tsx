"use client";
import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { submitJobApplication } from '../lib/payload';

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onCancel?: () => void;
}

export default function JobApplicationForm({ jobId, jobTitle, onCancel }: JobApplicationFormProps) {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantCv, setApplicantCv] = useState('');

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!applicantName || !applicantEmail) {
      setFormError('Vui lòng nhập họ tên và email liên hệ.');
      return;
    }

    try {
      await submitJobApplication(jobId, jobTitle, applicantName, applicantEmail, applicantCv);
      setFormSuccess(true);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantCv('');
    } catch (err: any) {
      setFormError(`Gửi hồ sơ thất bại: ${err.message || err}`);
    }
  };

  if (formSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-2 font-medium">
        <Check className="w-5 h-5 shrink-0 text-emerald-600" />
        <span>Nộp hồ sơ thành công! Đội ngũ nhân sự của GAMA sẽ sớm liên hệ với bạn.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="flex flex-col gap-4">
      {formError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs font-semibold">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#0A4E35]/80 uppercase tracking-wider">Họ và tên của bạn *</label>
          <input
            type="text"
            placeholder="Ví dụ: Lê Nguyễn Minh"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className="bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#0A4E35]/80 uppercase tracking-wider">Email liên hệ *</label>
          <input
            type="email"
            placeholder="Ví dụ: candidate@email.com"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            className="bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[#0A4E35]/80 uppercase tracking-wider">Đường dẫn CV / Hồ sơ năng lực (LinkedIn, Drive, ...)</label>
        <input
          type="text"
          placeholder="Ví dụ: https://linkedin.com/in/username hoặc liên kết Drive"
          value={applicantCv}
          onChange={(e) => setApplicantCv(e.target.value)}
          className="bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-slate-500 hover:text-slate-700 bg-slate-50 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Hủy bỏ
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span>Gửi hồ sơ</span>
        </button>
      </div>
    </form>
  );
}
