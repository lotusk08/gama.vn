import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactInfoProps {
  data?: {
    title?: string;
    offices?: Array<{ name: string; address: string; phone?: string; mapUrl?: string }>;
    emailDirectory?: Array<{ label: string; email: string }>;
  } | null;
}

export default function ContactInfo({ data }: ContactInfoProps) {
  const offices = data?.offices ?? [];
  const emailDirectory = data?.emailDirectory ?? [];
  if (offices.length === 0 && emailDirectory.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {data?.title && (
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight mb-10">
            {data.title}
          </h2>
        )}

        {offices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80">
                <h3 className="text-sm font-serif font-extrabold text-[#0A4E35] mb-3">{office.name}</h3>
                <div className="flex items-start gap-2 text-xs text-gray-500 font-sans font-light mb-2">
                  <MapPin className="w-4 h-4 text-[#B48F57] shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                {office.phone && (
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-xs text-gray-500 font-sans hover:text-[#0A4E35] transition-colors">
                    <Phone className="w-4 h-4 text-[#B48F57] shrink-0" />
                    {office.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {emailDirectory.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {emailDirectory.map((entry, idx) => (
              <a
                key={idx}
                href={`mailto:${entry.email}`}
                className="bg-[#EEF5ED]/60 rounded-xl p-4 text-center border border-[#0A4E35]/5 hover:border-[#B48F57] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#B48F57] mx-auto mb-2" />
                <div className="text-[11px] font-bold text-[#0A4E35] uppercase tracking-wider">{entry.label}</div>
                <div className="text-[11px] text-gray-500 font-sans mt-1">{entry.email}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
