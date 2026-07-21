import React from 'react';
import { lexicalToHtml } from '../../lib/payload';

interface AboutBlockSectionProps {
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    richContent?: unknown;
    image?: { url?: string } | null;
  } | null;
}

/** Renders the generic "about" block (short text + image), distinct from the /about route. */
export default function AboutBlockSection({ data }: AboutBlockSectionProps) {
  if (!data?.title) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          {data.subtitle && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3">
              • {data.subtitle}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] mb-6">{data.title}</h2>
          {data.description && (
            <p className="text-gray-500 mb-6 font-light leading-relaxed text-sm sm:text-base">{data.description}</p>
          )}
          {!!data.richContent && (
            <div
              className="prose max-w-none text-slate-700 font-light font-sans text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lexicalToHtml(data.richContent) }}
            />
          )}
        </div>
        {data.image?.url && (
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150">
            <img src={data.image.url} alt={data.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}
      </div>
    </section>
  );
}
