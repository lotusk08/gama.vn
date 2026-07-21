import React from 'react';

interface QuoteProps {
  data?: {
    quote?: string;
    author?: string;
    role?: string;
  } | null;
}

export default function Quote({ data }: QuoteProps) {
  if (!data?.quote) return null;

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        <blockquote className="border-l-4 border-[#B48F57] pl-6 sm:pl-8">
          <p className="text-lg sm:text-2xl font-serif italic text-[#0A4E35] leading-relaxed mb-4">
            "{data.quote}"
          </p>
          {(data.author || data.role) && (
            <footer className="text-xs sm:text-sm font-sans text-gray-500">
              <span className="font-bold text-[#0A4E35]">{data.author}</span>
              {data.role && <span> — {data.role}</span>}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}
