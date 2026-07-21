import React from 'react';

interface StatHighlightsProps {
  data?: {
    title?: string;
    items?: Array<{ value: string; label: string; description?: string }>;
  } | null;
}

export default function StatHighlights({ data }: StatHighlightsProps) {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-[#05473E] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {data?.title && (
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-center mb-12 effect-font-gama-light">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#B48F57] mb-2">{item.value}</div>
              <div className="text-xs sm:text-sm font-sans uppercase tracking-wider text-white/80">{item.label}</div>
              {item.description && (
                <p className="text-[11px] text-white/50 font-sans mt-2 font-light leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
