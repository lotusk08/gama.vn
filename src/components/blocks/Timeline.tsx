"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineProps {
  data?: {
    title?: string;
    description?: string;
    entries?: Array<{ year: string; title: string; description?: string }>;
  } | null;
}

export default function Timeline({ data }: TimelineProps) {
  const entries = data?.entries ?? [];
  const [activeYear, setActiveYear] = useState(entries[0]?.year);
  if (entries.length === 0) return null;
  const active = entries.find((e) => e.year === activeYear) ?? entries[0];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {(data?.title || data?.description) && (
          <div className="max-w-3xl mb-12">
            {data?.title && (
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-tight mb-3">
                {data.title}
              </h2>
            )}
            {data?.description && (
              <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed font-light">{data.description}</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {entries.map((entry) => (
            <button
              key={entry.year}
              onClick={() => setActiveYear(entry.year)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono tracking-wider transition-all cursor-pointer ${
                active.year === entry.year
                  ? 'bg-[#0A4E35] text-white shadow-md'
                  : 'bg-white text-[#0A4E35]/70 border border-gray-200 hover:border-[#B48F57]'
              }`}
            >
              {entry.year}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.year}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-[#EEF5ED]/50 rounded-3xl p-8 sm:p-10 border border-[#0A4E35]/5"
          >
            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-[#0A4E35] mb-4">{active.title}</h3>
            {active.description && (
              <p className="text-sm sm:text-base text-gray-600 font-sans leading-relaxed font-light">{active.description}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
