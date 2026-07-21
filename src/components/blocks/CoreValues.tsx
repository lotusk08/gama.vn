"use client";
import React from 'react';
import { motion } from 'motion/react';
import { renderIcon } from '../../lib/iconMap';

interface CoreValuesProps {
  data?: {
    sectionLabel?: string;
    sectionTitle?: string;
    pillars?: Array<{
      num?: string;
      category?: string;
      title: string;
      description?: string;
      quote?: string;
      iconName?: string;
    }>;
  } | null;
}

export default function CoreValues({ data }: CoreValuesProps) {
  const pillars = data?.pillars ?? [];
  if (pillars.length === 0) return null;

  return (
    <section className="py-24 bg-[#EEF5ED]/40 text-slate-900 relative overflow-hidden border-b border-[#B48F57]/10">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:8rem_8rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          {data?.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
              {data.sectionLabel}
            </span>
          )}
          {data?.sectionTitle && (
            <h2 className="text-3xl sm:text-[40px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.15] whitespace-pre-line">
              {data.sectionTitle}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={(pillar.num ?? '') + idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-[24px] p-8 border border-gray-200/80 hover:border-[#B48F57] hover:shadow-xl hover:shadow-[#0a4e35]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] border border-[#0A4E35]/5 flex items-center justify-center group-hover:bg-[#0A4E35] transition-all duration-300">
                    <span className="text-[#0A4E35] group-hover:text-white transition-colors duration-300">
                      {renderIcon(pillar.iconName)}
                    </span>
                  </div>
                  {pillar.num && (
                    <span className="text-xs font-mono font-bold text-[#B48F57]/60 group-hover:text-[#B48F57] transition-colors duration-300">
                      {pillar.num}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  {pillar.category && (
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-1">
                      {pillar.category}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                </div>

                {pillar.description && (
                  <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6 font-light">
                    {pillar.description}
                  </p>
                )}
              </div>

              {pillar.quote && (
                <div className="border-t border-[#0A4E35]/5 pt-4 mt-auto">
                  <p className="text-xs font-serif text-[#B48F57] italic font-light leading-relaxed group-hover:text-[#0A4E35] transition-colors duration-300">
                    {pillar.quote}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
