"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import { lexicalToHtml } from '../../lib/payload';

interface CertItem {
  certId: string;
  name: string;
  issuer?: string;
  summary?: string;
  highlights?: Array<{ text: string }>;
  details?: unknown;
  approvedProducts?: Array<{ text: string }>;
}

interface CertificationsProps {
  data?: {
    title?: string;
    subtitle?: string;
    items?: CertItem[];
  } | null;
}

export default function Certifications({ data }: CertificationsProps) {
  const items = data?.items ?? [];
  const [selected, setSelected] = useState<CertItem | null>(null);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <button
              key={item.certId}
              onClick={() => setSelected(item)}
              className="text-left bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-[#B48F57] hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EEF5ED] flex items-center justify-center mb-4 group-hover:bg-[#0A4E35] transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#0A4E35] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm sm:text-base font-serif font-extrabold text-[#0A4E35] mb-1">{item.name}</h3>
              {item.issuer && <span className="text-[10px] font-mono text-[#B48F57] uppercase tracking-wider">{item.issuer}</span>}
              {item.summary && <p className="text-xs text-gray-500 font-sans leading-relaxed font-light mt-3">{item.summary}</p>}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-serif font-extrabold text-[#0A4E35]">{selected.name}</h3>
                  {selected.issuer && <span className="text-xs font-mono text-[#B48F57] uppercase tracking-wider">{selected.issuer}</span>}
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {selected.summary && <p className="text-sm text-gray-600 font-sans leading-relaxed mb-6 font-light">{selected.summary}</p>}

              {selected.highlights && selected.highlights.length > 0 && (
                <ul className="flex flex-col gap-2 mb-6">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 font-sans flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B48F57] mt-1.5 shrink-0" />
                      {h.text}
                    </li>
                  ))}
                </ul>
              )}

              {!!selected.details && (
                <div
                  className="prose max-w-none text-slate-700 font-light font-sans text-sm leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: lexicalToHtml(selected.details) }}
                />
              )}

              {selected.approvedProducts && selected.approvedProducts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48F57] mb-3">Sản phẩm được chứng nhận</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.approvedProducts.map((p, i) => (
                      <li key={i} className="text-xs text-slate-600 font-sans bg-[#EEF5ED]/60 rounded-lg px-3 py-2">{p.text}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
