import React from 'react';

interface TeamProps {
  data?: {
    title?: string;
    members?: Array<{
      name: string;
      role: string;
      credentials?: string;
      description?: string;
      photo?: { url?: string } | null;
    }>;
  } | null;
}

export default function Team({ data }: TeamProps) {
  const members = data?.members ?? [];
  if (members.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {data?.title && (
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col items-center text-center">
              {member.photo?.url ? (
                <img src={member.photo.url} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-[#EEF5ED]" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#EEF5ED] flex items-center justify-center mb-4 text-[#0A4E35] font-serif font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
              )}
              <h3 className="text-base font-serif font-extrabold text-[#0A4E35]">{member.name}</h3>
              <span className="text-xs font-bold text-[#B48F57] uppercase tracking-wider mt-1">{member.role}</span>
              {member.credentials && <span className="text-[11px] text-gray-400 font-sans mt-1">{member.credentials}</span>}
              {member.description && (
                <p className="text-xs text-gray-500 font-sans leading-relaxed font-light mt-3">{member.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
