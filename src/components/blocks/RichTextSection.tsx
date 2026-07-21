import React from 'react';
import { lexicalToHtml } from '../../lib/payload';

interface RichTextSectionProps {
  data?: { content?: unknown } | null;
}

export default function RichTextSection({ data }: RichTextSectionProps) {
  if (!data?.content) return null;

  return (
    <div
      className="prose max-w-4xl mx-auto text-slate-700 leading-relaxed font-light font-sans text-sm sm:text-base whitespace-pre-line py-6 px-6 sm:px-12"
      dangerouslySetInnerHTML={{ __html: lexicalToHtml(data.content) }}
    />
  );
}
