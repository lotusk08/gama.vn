import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface CtaBannerProps {
  data?: {
    headline?: string;
    subtext?: string;
    buttonLabel?: string;
    buttonPath?: string;
  } | null;
}

export default function CtaBanner({ data }: CtaBannerProps) {
  if (!data?.headline) return null;
  const href = data.buttonPath ? `/${data.buttonPath}`.replace(/\/+/g, '/') : '/contact';

  return (
    <section className="py-20 bg-white px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#05473E] to-[#02221C] rounded-[36px] p-12 sm:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border border-white/5">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute right-[-10%] top-[-20%] w-[350px] h-[350px] border-[20px] border-white rounded-full" />
          <div className="absolute left-[-10%] bottom-[-20%] w-[350px] h-[350px] border-[20px] border-white rounded-full" />
        </div>

        <div className="z-10 max-w-3xl flex flex-col items-center">
          <h2 className="text-3xl sm:text-[48px] lg:text-[56px] font-serif font-extrabold effect-font-gama-light leading-[1.1] mb-6 whitespace-pre-line">
            {data.headline}
          </h2>
          {data.subtext && (
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-sans leading-relaxed mb-10 max-w-xl font-light whitespace-pre-line">
              {data.subtext}
            </p>
          )}
          {data.buttonLabel && (
            <Link
              href={href}
              className="px-9 py-4.5 bg-[#B48F57] hover:bg-[#EEF5ED] text-white hover:text-[#0A4E35] text-xs font-bold rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5 group"
            >
              <span>{data.buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
