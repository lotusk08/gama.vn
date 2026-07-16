"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Linkedin, Facebook, Instagram, Twitter, ShieldCheck, Star } from 'lucide-react';
import GamaLogo from './GamaLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
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

  return (
    <footer className="bg-[#051F16] text-white border-t border-white/5 relative">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">
        
        {/* Column 1: Brand & Logo */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="cursor-pointer active:scale-95 transition-transform" onClick={() => handleNavClick('home')}>
              <GamaLogo light />
            </div>
            <span className="text-sm font-semibold tracking-wider text-white font-sans">GAMA GROUP CO., LTD</span>
          </div>

          {/* Certificates badges */}
          <div className="flex flex-wrap gap-3 items-center pt-1">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-bold text-[#B48F57] font-sans uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Đạt chuẩn ISO 9001</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[9px] font-bold text-[#B48F57] font-sans uppercase">
              <Star className="w-3.5 h-3.5 fill-[#B48F57] text-[#B48F57]" />
              <span>Tiêu chuẩn xanh LEED</span>
            </div>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold font-sans tracking-widest text-[#B48F57] uppercase">Khám phá</h4>
          <nav className="flex flex-col gap-2.5 text-xs text-white font-sans font-light">
            <button onClick={() => handleNavClick('about')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left">Về GAMA</button>
            <button onClick={() => handleNavClick('sustainability')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left">Phát triển bền vững</button>
            <button onClick={() => handleNavClick('innovation')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left">Sáng tạo & Đột phá</button>
            <button onClick={() => handleNavClick('blog')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left">Tin tức</button>
            <button onClick={() => handleNavClick('careers')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left">Tuyển dụng</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-[#B48F57] transition-colors cursor-pointer text-left font-normal text-white">Liên hệ</button>
          </nav>
        </div>

        {/* Column 4: Newsletter */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold font-sans tracking-widest text-[#B48F57] uppercase">Bản tin định kỳ</h4>
          <p className="text-[11px] text-white font-sans leading-relaxed font-light">
            Đăng ký để nhận các bản tin nội bộ định kỳ, báo cáo thường niên và cập nhật đổi mới từ GAMA GROUP CO., LTD.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full mt-2">
              <input
                type="email"
                placeholder="email@doanhnghiep.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-full text-xs font-sans text-white outline-none w-full focus:border-[#B48F57] transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#B48F57] hover:bg-white hover:text-[#0A4E35] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
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
        </div>
      </div>

      {/* Bottom bar: Copyright, Privacy & Social links */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-sans font-light">
          <span className="text-white">© {new Date().getFullYear()}</span>
          <span className="hidden sm:inline text-white">•</span>
          <button onClick={() => handleNavClick('policy-privacy')} className="text-white hover:text-[#B48F57] transition-colors cursor-pointer">Chính sách bảo mật</button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#B48F57] transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#B48F57] transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#B48F57] transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#B48F57] transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
