"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Linkedin, Facebook, Instagram, Twitter, ShieldCheck, Star } from 'lucide-react';
import GamaLogo from './GamaLogo';
import type { FooterGlobal } from '../lib/payloadApi';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  footerData?: FooterGlobal | null;
}

const DEFAULT_FOOTER_LINKS = [
  { label: 'Về GAMA', tabId: 'about' },
  { label: 'Phát triển bền vững', tabId: 'sustainability' },
  { label: 'Sáng tạo & Đột phá', tabId: 'innovation' },
  { label: 'Tin tức', tabId: 'blog' },
  { label: 'Tuyển dụng', tabId: 'careers' },
  { label: 'Liên hệ', tabId: 'contact' },
];

export default function Footer({ setActiveTab, footerData }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setEmail(''), 2000);
    }
  };

  // Resolve footer links from CMS or fall back to defaults
  const footerLinks =
    footerData?.footerLinks && footerData.footerLinks.length > 0
      ? footerData.footerLinks
      : DEFAULT_FOOTER_LINKS;

  // Resolve newsletter copy
  const newsletterTitle = footerData?.newsletterTitle ?? 'Bản tin định kỳ';
  const newsletterText =
    footerData?.newsletterText ??
    'Đăng ký để nhận các bản tin nội bộ định kỳ, báo cáo thường niên và cập nhật đổi mới từ GAMA GROUP CO., LTD.';

  // Resolve social links
  const social = footerData?.socialLinks ?? {};

  // Resolve contact
  const rawCopyright = footerData?.copyright ?? `© ${new Date().getFullYear()} GAMA GROUP CO., LTD.`;
  const copyright = rawCopyright.replace(/\b\d{4}\b/, String(new Date().getFullYear()));

  // Resolve certifications — fall back to two default badges
  const certifications =
    footerData?.certifications && footerData.certifications.length > 0
      ? footerData.certifications
      : [
          { label: 'Đạt chuẩn ISO 9001', icon: 'ShieldCheck' },
          { label: 'Tiêu chuẩn xanh LEED', icon: 'Star' },
        ];

  const renderCertIcon = (icon?: string) => {
    if (icon === 'Star') return <Star className="w-3.5 h-3.5 fill-[#B48F57] text-[#B48F57]" />;
    return <ShieldCheck className="w-3.5 h-3.5" />;
  };

  return (
    <footer className="bg-gradient-to-b from-[#03140F] to-[#010907] text-slate-200 border-t border-white/5 relative overflow-hidden">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B48F57]/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">

         {/* Column 1: Brand & Logo */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="cursor-pointer active:scale-95 transition-transform" onClick={() => handleNavClick('home')}>
              <GamaLogo light />
            </div>
            <span className="text-sm font-semibold tracking-wider text-white font-sans mt-2">GAMA GROUP CO., LTD</span>
          </div>

          {/* Tagline */}
          {footerData?.tagline && (
            <p className="text-sm font-serif italic text-white/95 leading-relaxed border-l-2 border-[#B48F57]/40 pl-3">
              "{footerData.tagline}"
            </p>
          )}

          {/* Contact Details */}
          <div className="flex flex-col gap-3 text-xs text-slate-200 font-sans font-light mt-2">
            {footerData?.address && (
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B48F57] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{footerData.address}</span>
              </div>
            )}
            {footerData?.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B48F57] shrink-0" />
                <a href={`tel:${footerData.phone}`} className="hover:text-[#B48F57] transition-colors leading-relaxed">{footerData.phone}</a>
              </div>
            )}
            {footerData?.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B48F57] shrink-0" />
                <a href={`mailto:${footerData.email}`} className="hover:text-[#B48F57] transition-colors leading-relaxed">{footerData.email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Explore links */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold font-sans tracking-widest text-[#B48F57] uppercase border-b border-white/10 pb-2 w-fit mb-2">
            Khám phá
          </h4>
          <nav className="flex flex-col gap-3 text-xs text-slate-200 font-sans font-light">
            {footerLinks.map((link) => (
              <button
                key={link.tabId}
                onClick={() => handleNavClick(link.tabId)}
                className="hover:text-[#B48F57] hover:translate-x-1.5 transition-all duration-300 cursor-pointer text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-[1px] bg-[#B48F57] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Column 3: Newsletter */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold font-sans tracking-widest text-[#B48F57] uppercase border-b border-white/10 pb-2 w-fit mb-2">
            {newsletterTitle}
          </h4>
          <p className="text-xs text-slate-200 font-sans leading-relaxed font-light mb-2">
            {newsletterText}
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
              <input
                type="email"
                placeholder="email@doanhnghiep.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-full text-xs font-sans text-white outline-none w-full focus:border-[#B48F57] focus:ring-1 focus:ring-[#B48F57] transition-all"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#B48F57] hover:bg-white hover:text-[#010907] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 duration-300 cursor-pointer shrink-0 shadow-lg shadow-black/20"
              >
                Đăng ký
              </button>
            </form>
          ) : (
            <div className="bg-[#0A4E35]/40 border border-[#B48F57]/20 rounded-full py-2.5 px-4 flex items-center gap-2 text-xs text-[#B48F57] font-sans">
              <Check className="w-4 h-4 shrink-0" />
              <span>Đăng ký thành công!</span>
            </div>
          )}

          {/* Certification badges */}
          <div className="flex flex-wrap gap-3 items-center pt-5 border-t border-white/5 mt-3">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[9px] font-bold text-[#B48F57] font-sans uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                {renderCertIcon(cert.icon)}
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar: Copyright, Privacy & Social links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-sans font-light">
          <span className="text-slate-300">{copyright}</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <button onClick={() => handleNavClick('policy-privacy')} className="text-slate-300 hover:text-[#B48F57] transition-colors cursor-pointer">
            Chính sách bảo mật
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={social.linkedin ?? '#'}
            target={social.linkedin ? '_blank' : undefined}
            rel="noreferrer"
            className="p-2.5 bg-white/5 hover:bg-[#B48F57] text-slate-200 hover:text-white rounded-full transition-all hover:scale-110 duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={social.facebook ?? '#'}
            target={social.facebook ? '_blank' : undefined}
            rel="noreferrer"
            className="p-2.5 bg-white/5 hover:bg-[#B48F57] text-slate-200 hover:text-white rounded-full transition-all hover:scale-110 duration-300"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={social.instagram ?? '#'}
            target={social.instagram ? '_blank' : undefined}
            rel="noreferrer"
            className="p-2.5 bg-white/5 hover:bg-[#B48F57] text-slate-200 hover:text-white rounded-full transition-all hover:scale-110 duration-300"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={social.twitter ?? '#'}
            target={social.twitter ? '_blank' : undefined}
            rel="noreferrer"
            className="p-2.5 bg-white/5 hover:bg-[#B48F57] text-slate-200 hover:text-white rounded-full transition-all hover:scale-110 duration-300"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
