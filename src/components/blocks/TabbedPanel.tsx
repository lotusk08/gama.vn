"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { lexicalToHtml } from '../../lib/payload';

interface TabbedPanelProps {
  data?: {
    title?: string;
    subtitle?: string;
    tabs?: Array<{
      label: string;
      badge?: string;
      summary?: string;
      metrics?: Array<{ value: string; label: string }>;
      richContent?: unknown;
      image?: { url?: string } | null;
    }>;
  } | null;
}

export default function TabbedPanel({ data }: TabbedPanelProps) {
  const tabs = data?.tabs ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  if (tabs.length === 0) return null;
  const active = tabs[Math.min(activeIdx, tabs.length - 1)];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {(data?.title || data?.subtitle) && (
          <div className="max-w-3xl mb-12">
            {data?.subtitle && (
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
                • {data.subtitle}
              </span>
            )}
            {data?.title && (
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-tight">
                {data.title}
              </h2>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-b border-gray-150 mb-10">
          {tabs.map((tab, idx) => (
            <button
              key={`${tab.label}-${idx}`}
              onClick={() => setActiveIdx(idx)}
              className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-t-xl transition-colors cursor-pointer ${
                activeIdx === idx
                  ? 'bg-[#EEF5ED] text-[#0A4E35] border-b-2 border-[#B48F57]'
                  : 'text-slate-500 hover:text-[#0A4E35] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              {active.badge && (
                <span className="inline-block text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest mb-3">
                  {active.badge}
                </span>
              )}
              {active.summary && (
                <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed mb-6 font-light">
                  {active.summary}
                </p>
              )}
              {!!active.richContent && (
                <div
                  className="prose max-w-none text-slate-700 font-light font-sans text-sm sm:text-base leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: lexicalToHtml(active.richContent) }}
                />
              )}
              {active.metrics && active.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {active.metrics.map((m, i) => (
                    <div key={i} className="bg-[#EEF5ED]/60 rounded-2xl p-4 text-center border border-[#0A4E35]/5">
                      <div className="text-lg sm:text-xl font-serif font-extrabold text-[#0A4E35]">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 font-sans mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {active.image?.url && (
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150">
                <img src={active.image.url} alt={active.label} className="w-full h-auto object-cover max-h-[420px]" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
