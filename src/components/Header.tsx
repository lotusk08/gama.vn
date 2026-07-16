"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import GamaLogo from './GamaLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'Về GAMA' },
    { id: 'sustainability', label: 'Phát triển bền vững' },
    { id: 'innovation', label: 'Sáng tạo & Đột phá' },
    { id: 'blog', label: 'Tin tức' },
    { id: 'careers', label: 'Tuyển dụng' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      } flex flex-col justify-center`}
    >
      {/* Sleek top utility corporate ticker bar */}
      {!isScrolled && (
        <div className="w-full bg-[#051F16]/95 border-b border-white/5 py-2 px-6 sm:px-12 text-[10px] sm:text-[11px] text-[#B48F57] font-mono flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
            <span className="font-bold flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              HOSE: GAMA
            </span>
            <span className="text-emerald-400 font-bold font-mono">+1.45% (28,400đ)</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline font-sans">Tiêu chuẩn quốc tế ISO 9001:2015 & Hợp quy QCVN 16 Bộ Xây dựng</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-sans text-[10px] sm:text-xs">
            <button onClick={() => handleNavClick('about')} className="hover:text-[#B48F57] transition-colors cursor-pointer hidden md:inline">Báo Cáo Thường Niên 2026</button>
            <span className="text-slate-600 hidden md:inline">|</span>
            <button onClick={() => handleNavClick('contact')} className="hover:text-[#B48F57] transition-colors cursor-pointer">Yêu cầu báo giá dự án</button>
          </div>
        </div>
      )}

      {/* Main Header Row */}
      <div className={`w-full flex items-center justify-between max-w-7xl mx-auto px-6 sm:px-12 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
        {/* Gama Logo */}
        <div className="cursor-pointer active:scale-95 transition-transform" onClick={() => handleNavClick('home')}>
          <GamaLogo />
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative text-[15px] font-sans font-medium transition-all py-1.5 cursor-pointer tracking-tight group"
            >
              <span
                className={`transition-colors duration-200 ${
                  activeTab === item.id ? 'text-[#0A4E35] font-bold' : 'text-[#0A4E35]/75 hover:text-[#0A4E35]'
                }`}
              >
                {item.label}
              </span>
              
              {/* Animated underline */}
              {activeTab === item.id ? (
                <motion.div
                  layoutId="activeHeaderTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B48F57]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B48F57] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
              )}
            </button>
          ))}
        </nav>



        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#0A4E35] hover:bg-gray-150/40 transition-all active:scale-90"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-3 px-4 rounded-xl text-[15px] font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-[#EEF5ED] text-[#0A4E35] font-bold border-l-4 border-[#B48F57]'
                    : 'text-slate-600 hover:bg-gray-50 hover:text-[#0A4E35]'
                }`}
              >
                {item.label}
              </button>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
