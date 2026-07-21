import React from 'react';
import { renderIcon } from '../../lib/iconMap';

interface FeatureGridProps {
  data?: {
    title?: string;
    subtitle?: string;
    columns?: '2' | '3' | '4';
    items?: Array<{ iconName?: string; title: string; description?: string }>;
  } | null;
}

const COLS: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
};

export default function FeatureGrid({ data }: FeatureGridProps) {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

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

        <div className={`grid grid-cols-1 ${COLS[data?.columns ?? '3']} gap-6`}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-[#B48F57] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] border border-[#0A4E35]/5 flex items-center justify-center mb-5 group-hover:bg-[#0A4E35] transition-colors duration-300">
                <span className="text-[#0A4E35] group-hover:text-white transition-colors duration-300">
                  {renderIcon(item.iconName)}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-extrabold text-[#0A4E35] mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed font-light">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
