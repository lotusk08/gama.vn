"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import GamaLogo from './GamaLogo';
import GamaLogoIcon from './GamaLogoIcon';
import type { HeaderGlobal } from '../lib/payloadApi';

interface HeaderProps {
  headerData?: HeaderGlobal | null;
}

/** Normalizes a Payload-editable `path` field ("", "home", "about", "chinh-sach/privacy") into a real href. */
function toHref(path: string): string {
  if (!path || path === 'home') return '/';
  return `/${path.replace(/^\/+/, '')}`;
}

const DEFAULT_NAV_ITEMS = [
  {
    id: 'about',
    label: 'Về GAMA',
    hasSubMenu: false,
    subMenuItems: [] as { label: string; path: string }[],
  },
  { id: 'sustainability', label: 'Phát triển bền vững' },
  { id: 'innovation', label: 'Sáng tạo & Đột phá' },
  { id: 'blog', label: 'Tin tức' },
  { id: 'careers', label: 'Tuyển dụng' },
];

const DEFAULT_TOP_BAR = {
  stockSymbol: 'HOSE: GAMA',
  stockChange: '+1.45% (28,400đ)',
  certificationText: 'Tiêu chuẩn quốc tế ISO 9001:2015 & Hợp quy QCVN 16 Bộ Xây dựng',
};

const DEFAULT_TOP_BAR_LINKS = [
  { label: 'Báo Cáo Thường Niên 2026', path: 'about' },
  { label: 'Yêu cầu báo giá dự án', path: 'contact' },
];

export default function Header({ headerData }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resolve nav items — prefer CMS, fall back to defaults
  const navItems =
    headerData?.navItems && headerData.navItems.length > 0
      ? headerData.navItems.map((item) => ({
          path: item.path,
          label: item.label,
          hasSubMenu: item.hasSubMenu,
          subMenuItems: item.subMenuItems
        }))
      : DEFAULT_NAV_ITEMS.map((item) => ({ ...item, path: item.id }));

  // Resolve top bar ticker
  const ticker = headerData?.topBarTicker ?? DEFAULT_TOP_BAR;

  // Resolve top bar links
  const topBarLinks =
    headerData?.topBarLinks && headerData.topBarLinks.length > 0
      ? headerData.topBarLinks
      : DEFAULT_TOP_BAR_LINKS;

  // Resolve logo — CMS image URL or SVG fallback
  const logoUrl =
    headerData?.logo && typeof headerData.logo === 'object'
      ? (headerData.logo as { url?: string | null }).url
      : null;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      } flex flex-col justify-center`}
    >
      {/* Sleek top utility corporate ticker bar */}
      {!isScrolled && isHome && (
        <div className="w-full bg-[#051F16]/95 border-b border-white/5 py-2 px-6 sm:px-12 text-[10px] sm:text-[11px] text-[#B48F57] font-mono flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
            <span className="font-bold flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {ticker.stockSymbol ?? DEFAULT_TOP_BAR.stockSymbol}
            </span>
            <span className="text-emerald-400 font-bold font-mono">
              {ticker.stockChange ?? DEFAULT_TOP_BAR.stockChange}
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline font-sans">
              {ticker.certificationText ?? DEFAULT_TOP_BAR.certificationText}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-sans text-[10px] sm:text-xs">
            {topBarLinks.map((link, idx) => (
              <React.Fragment key={`${link.path}-${idx}`}>
                {idx > 0 && <span className="text-slate-600 hidden md:inline">|</span>}
                <Link
                  href={toHref(link.path)}
                  className={`hover:text-[#B48F57] transition-colors cursor-pointer ${idx === 0 ? 'hidden md:inline' : ''}`}
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Header Row */}
      <div className={`w-full flex items-center justify-between max-w-7xl mx-auto px-6 sm:px-12 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
        {/* Logo — Inline SVG brand asset (icon only) */}
        <Link href="/" className="cursor-pointer active:scale-95 transition-transform">
          <GamaLogoIcon />
        </Link>

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, idx) => {
            const itemHref = toHref(item.path);
            const isActive = pathname === itemHref || item.subMenuItems?.some((sub: any) => pathname === toHref(sub.path));
            return (
            <div
              key={`${item.path}-${idx}`}
              className="relative py-4 group"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={itemHref}
                className="text-[15px] font-sans font-medium transition-all cursor-pointer tracking-tight flex items-center gap-1 focus:outline-none"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[#0A4E35] font-bold'
                      : 'text-[#0A4E35]/75 hover:text-[#0A4E35]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Animated underline */}
                {isActive ? (
                  <motion.div
                    layoutId="activeHeaderTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B48F57]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B48F57] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
                )}
              </Link>

              {/* Sub-menu Dropdown container */}
              {item.hasSubMenu && item.subMenuItems && item.subMenuItems.length > 0 && (
                <AnimatePresence>
                  {hoveredItem === item.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-[100%] mt-2 bg-white rounded-none shadow-2xl border border-gray-100 overflow-hidden z-50 flex"
                      style={{
                        minWidth: '250px',
                        clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)'
                      }}
                    >
                      {/* Triangle indicator */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-gray-150 rotate-45 -translate-y-1.5" />

                      {/* Left content: Menu list */}
                      <div className="py-4 flex-grow flex flex-col gap-1 z-10 bg-white rounded-none">
                        {item.subMenuItems.map((sub: any, sIdx: number) => (
                          <Link
                            key={`${sub.path}-${sIdx}`}
                            href={toHref(sub.path)}
                            className={`w-full text-left py-2.5 pl-6 pr-14 rounded-none text-xs font-sans font-medium transition-colors cursor-pointer block ${
                              pathname === toHref(sub.path)
                                ? 'bg-[#EEF5ED] text-[#0A4E35] font-semibold'
                                : 'text-slate-600 hover:bg-[#EEF5ED] hover:text-[#0A4E35]'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>

                      {/* Right edge slanted ribbon segment */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-b from-[#0f5237] to-[#05261a] pointer-events-none z-20"
                        style={{
                          clipPath: 'polygon(33.33% 0, 120% 0, 120% 100%, 0 100%)'
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
            );
          })}
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
            {navItems.map((item, idx) => {
              const itemHref = toHref(item.path);
              const isActive = pathname === itemHref || item.subMenuItems?.some((sub: any) => pathname === toHref(sub.path));
              return (
              <div key={`${item.path}-${idx}`} className="flex flex-col gap-1">
                <Link
                  href={itemHref}
                  onClick={closeMobileMenu}
                  className={`text-left py-3 px-4 rounded-xl text-[15px] font-semibold transition-all block ${
                    isActive
                      ? 'bg-[#EEF5ED] text-[#0A4E35] font-bold border-l-4 border-[#B48F57]'
                      : 'text-slate-600 hover:bg-gray-50 hover:text-[#0A4E35]'
                  }`}
                >
                  {item.label}
                </Link>

                {item.hasSubMenu && item.subMenuItems && (
                  <div className="pl-6 pr-4 py-1 flex flex-col gap-1 border-l border-gray-100 ml-4 mt-1">
                    {item.subMenuItems.map((sub: any, sIdx: number) => (
                      <Link
                        key={`${sub.path}-${sIdx}`}
                        href={toHref(sub.path)}
                        onClick={closeMobileMenu}
                        className={`text-left py-2.5 px-3 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer block ${
                          pathname === toHref(sub.path)
                            ? 'bg-[#EEF5ED] text-[#0A4E35] font-semibold'
                            : 'text-slate-500 hover:text-[#0A4E35]'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
