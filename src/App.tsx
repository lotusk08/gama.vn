"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, ShieldCheck, Paintbrush, Palette, Globe } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import ColorOfTheYear from './components/ColorOfTheYear';
import Stats from './components/Stats';
import Blog from './components/Blog';
import ContactSection from './components/ContactSection';
import Careers from './components/Careers';
import Sustainability from './components/Sustainability';
import Innovation from './components/Innovation';
import Footer from './components/Footer';
import CorporatePolicies, { PolicyKey } from './components/CorporatePolicies';
import Process from './components/Process';
import type { HeaderGlobal, FooterGlobal, PageDoc } from './lib/payloadApi';
import { PAYLOAD_CMS_URL, lexicalToHtml } from './lib/payload';
import { useLivePreview } from '@payloadcms/live-preview-react';

interface AppProps {
  headerData?: HeaderGlobal | null;
  footerData?: FooterGlobal | null;
  homePage?: PageDoc | null;
}

const iconMap = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />,
  Paintbrush: <Paintbrush className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />,
  Palette: <Palette className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />,
  Globe: <Globe className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />,
};

export default function App({ headerData, footerData, homePage }: AppProps = {}) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [customPages, setCustomPages] = useState<any[]>([]);
  const [loadingPages, setLoadingPages] = useState<boolean>(true);

  useEffect(() => {
    // Scroll to top on active tab change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    // Parse the ?tab parameter from url on mount (crucial for Payload CMS Live Preview routing)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchCustomPages() {
      try {
        const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');
        const res = await fetch(`${baseUrl}/api/pages?limit=100&t=${Date.now()}`);
        const data = await res.json();
        if (data && data.docs) {
          setCustomPages(data.docs);
        }
      } catch (err) {
        console.error('Error fetching custom pages:', err);
      } finally {
        setLoadingPages(false);
      }
    }
    fetchCustomPages();
  }, []);

  const standardTabs = ['home', 'about', 'sustainability', 'innovation', 'blog', 'careers', 'contact'];
  const isCustomTab = !standardTabs.includes(activeTab) && !activeTab.startsWith('policy-');
  const activeCustomPage = customPages.find(p => p.slug === activeTab);

  // Hook up home page to realtime Payload Live Preview updates
  const { data: liveHomePage } = useLivePreview({
    initialData: (homePage || { id: 'home-preview' }) as any,
    serverURL: PAYLOAD_CMS_URL,
    depth: 2,
  });

  // Hook up active custom page to realtime Payload Live Preview updates
  const { data: liveCustomPage } = useLivePreview({
    initialData: (activeCustomPage || { id: 'custom-page-preview' }) as any,
    serverURL: PAYLOAD_CMS_URL,
    depth: 2,
  });

  const displayHomePage = liveHomePage || homePage;
  const displayCustomPage = liveCustomPage || activeCustomPage;

  // Extract CMS blocks
  const layout = displayHomePage?.layout;
  const heroBlock = layout?.find(b => b.blockType === 'hero');
  const coreValuesBlock = layout?.find(b => b.blockType === 'core-values');
  const colorYearBlock = layout?.find(b => b.blockType === 'color-year');
  const statsBlock = layout?.find(b => b.blockType === 'stats');
  const testimonialsBlock = layout?.find(b => b.blockType === 'testimonials');
  const ctaBannerBlock = layout?.find(b => b.blockType === 'cta-banner');

  const coreValuesSectionLabel = (coreValuesBlock?.sectionLabel as string) ?? '• TRỤ CỘT ĐỊNH VỊ & GIÁ TRỊ CỐT LÕI GAMA';
  const coreValuesSectionTitle = (coreValuesBlock?.sectionTitle as string) ?? 'Kiên định trong từng cam kết, đồng hành cùng mỗi mái ấm Việt.';

  const displayPillars = Array.isArray(coreValuesBlock?.pillars) && coreValuesBlock.pillars.length > 0
    ? (coreValuesBlock.pillars as Array<any>).map((p: any) => ({
      num: p.num ?? '',
      category: p.category ?? '',
      title: p.title ?? '',
      desc: p.description ?? '',
      quote: p.quote ?? '',
      icon: iconMap[p.iconName as keyof typeof iconMap] || iconMap.ShieldCheck,
    }))
    : [
      {
        num: 'PILLAR 01',
        category: 'CẢM XÚC & SỰ AN TÂM',
        title: 'Chất lượng có thể kiểm chứng',
        desc: 'Sự bảo vệ không phải là một lời hứa suông trên giấy tờ. Đó là sự kiên định của ngôi nhà trước những cơn bão nhiệt đới dữ dội nhất, là lớp lá chắn vô hình dệt từ khoa học polymer tiên tiến để giữ trọn vẹn sự bình yên trong từng giấc ngủ của gia đình bạn.',
        quote: '"Durability is not written in certificates; it is the silent guard that keeps your family safe while the storm rages outside."',
        icon: <ShieldCheck className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />
      },
      {
        num: 'PILLAR 02',
        category: 'SỰ TÔN TRỌNG NGHỀ NGHIỆP',
        title: 'Đồng hành cùng người thợ',
        desc: 'Chúng tôi thấu hiểu từng giọt mồ hôi trên bờ vai ướt đẫm, thấu hiểu khát khao thổi hồn vào những khối bê tông vô tri của những người thợ sơn Việt Nam. GAMA đứng bên cạnh họ với sự thấu cảm sâu sắc, cung cấp những giải pháp tinh xảo nhất để thăng hoa tay nghề của người nghệ nhân đích thực.',
        quote: '"We stand with those whose hands turn bare walls into warm sanctuaries, honoring their artistry with deep mutual respect."',
        icon: <Paintbrush className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />
      },
      {
        num: 'PILLAR 03',
        category: 'NGÔN NGỮ CỦA KHÔNG GIAN',
        title: 'Màu sắc như một ngôn ngữ',
        desc: 'Màu sắc tại GAMA không đơn thuần là những hạt sắc tố hóa học vô tri. Chúng là ký ức, là cảm xúc dạt dào, là sự tĩnh lặng của tâm hồn sau một ngày dài mỏi mệt. Chúng tôi chắt lọc từng dải màu để chạm tới nơi sâu thẳm nhất trong trái tim của mỗi chủ nhà có gu thẩm mỹ duy mỹ.',
        quote: '"Colors are not just paint; they are memory, mood, and the quiet, elegant language of your soul spoken aloud."',
        icon: <Palette className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />
      },
      {
        num: 'PILLAR 04',
        category: 'BẢN SẮC & KHÁT VỌNG',
        title: 'Gốc rễ Việt, tiêu chuẩn vươn xa',
        desc: 'Khởi nguồn từ trí tuệ và khát vọng của người Việt Nam, thấu hiểu sâu sắc từng cơn mưa rào dồn dập, cái nắng oi ả và hơi mặn mòi của biển cả quê hương. Từ mảnh đất kiên cường này, chúng tôi kiến tạo nên những sản phẩm chất lượng vượt tầm quốc tế, kiêu hãnh nâng tầm vị thế thương hiệu Việt.',
        quote: '"Deeply rooted in Vietnamese soil, crafted with a local soul to transcend and conquer global ecological standards."',
        icon: <Globe className="w-6 h-6 text-[#0A4E35] group-hover:text-white transition-colors duration-300" />
      }
    ];

  const ctaHeadline = (ctaBannerBlock?.headline as string) ?? 'Mưa nắng ngoài thềm.\nBình yên trong tổ ấm.';
  const ctaSubtext = (ctaBannerBlock?.subtext as string) ?? 'Những gì chúng tôi tinh chế hôm nay sẽ âm thầm che chở từng nhịp thở của ngôi nhà bạn mai sau. Lớp bảo vệ kiên cường của GAMA mang lại sự vững chãi bền lâu, nâng niu trọn vẹn từng khoảnh khắc bình yên.';
  const ctaButtonLabel = (ctaBannerBlock?.buttonLabel as string) ?? 'Khởi đầu hành trình kiến tạo';
  const ctaButtonTab = (ctaBannerBlock?.buttonTab as string) ?? 'contact';


  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#93CC88]/20 selection:text-[#1E463E]">

      {/* Top Header Navigation Bar — CMS-driven with hard-coded fallbacks */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} headerData={headerData} />

      {/* Main Core View Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              {/* 1. Hero Section */}
              <Hero
                data={heroBlock as any}
                onExploreServices={() => setActiveTab('services')}
                onExploreWork={() => {
                  const element = document.getElementById('testimonials-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveTab('blog');
                  }
                }}
              />

              {/* 2. Core Values Section (Replaces old Creed of Sanctuary / Brand Positioning) */}
              <section className="py-24 bg-[#EEF5ED]/40 text-slate-900 relative overflow-hidden border-b border-[#B48F57]/10">
                {/* Decorative layout background highlights */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:8rem_8rem]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
                  {/* Clean Section Header */}
                  <div className="max-w-3xl mb-16 text-center sm:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
                      {coreValuesSectionLabel}
                    </span>
                    <h2 className="text-3xl sm:text-[40px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.15] whitespace-pre-line">
                      {coreValuesSectionTitle}
                    </h2>
                  </div>

                  {/* Redesigned grid with custom icons and interactive effects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {displayPillars.map((pillar, idx) => (
                      <motion.div
                        key={pillar.num + idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white rounded-[24px] p-8 border border-gray-200/80 hover:border-[#B48F57] hover:shadow-xl hover:shadow-[#0a4e35]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Card Header with Icon & Index */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] border border-[#0A4E35]/5 flex items-center justify-center group-hover:bg-[#0A4E35] transition-all duration-300">
                              {pillar.icon}
                            </div>
                            <span className="text-xs font-mono font-bold text-[#B48F57]/60 group-hover:text-[#B48F57] transition-colors duration-300">
                              {pillar.num}
                            </span>
                          </div>

                          {/* Category & Title */}
                          <div className="mb-4">
                            <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-1">
                              {pillar.category}
                            </span>
                            <h3 className="text-lg sm:text-xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-snug">
                              {pillar.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6 font-light">
                            {pillar.desc}
                          </p>
                        </div>

                        {/* Styled quote block */}
                        <div className="border-t border-[#0A4E35]/5 pt-4 mt-auto">
                          <p className="text-xs font-serif text-[#B48F57] italic font-light leading-relaxed group-hover:text-[#0A4E35] transition-colors duration-300">
                            {pillar.quote}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* GAMA Color of the Year 2026 */}
              <ColorOfTheYear data={colorYearBlock as any} />

              {/* 3. Clients Moving Logo Ticker */}
              <Stats data={statsBlock as any} />

              {/* 4. Interactive Card Testimonial Slider */}
              <div id="testimonials-section">
                <Testimonials data={testimonialsBlock as any} />
              </div>

              {/* 5. Corporate Call To Action (CTA) Section */}
              <section className="py-20 bg-white px-6 sm:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#05473E] to-[#02221C] rounded-[36px] p-12 sm:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border border-white/5">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {/* Circle wireframes */}
                    <div className="absolute right-[-10%] top-[-20%] w-[350px] h-[350px] border-[20px] border-white rounded-full" />
                    <div className="absolute left-[-10%] bottom-[-20%] w-[350px] h-[350px] border-[20px] border-white rounded-full" />
                  </div>

                  <div className="z-10 max-w-3xl flex flex-col items-center">
                    <h2 className="text-3xl sm:text-[48px] lg:text-[56px] font-serif font-extrabold text-white leading-[1.1] mb-6 whitespace-pre-line">
                      {ctaHeadline}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 font-sans leading-relaxed mb-10 max-w-xl font-light whitespace-pre-line">
                      {ctaSubtext}
                    </p>
                    <button
                      onClick={() => setActiveTab(ctaButtonTab)}
                      className="px-9 py-4.5 bg-[#B48F57] hover:bg-[#EEF5ED] text-white hover:text-[#0A4E35] text-xs font-bold rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2.5 group"
                    >
                      <span>{ctaButtonLabel}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <About />
            </motion.div>
          )}

          {activeTab === 'sustainability' && (
            <motion.div
              key="sustainability"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Sustainability />
            </motion.div>
          )}

          {activeTab === 'innovation' && (
            <motion.div
              key="innovation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Innovation />
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Blog />
            </motion.div>
          )}

          {activeTab === 'careers' && (
            <motion.div
              key="careers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Careers />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactSection />
            </motion.div>
          )}

          {activeTab.startsWith('policy-') && (
            <motion.div
              key="policy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CorporatePolicies
                activePolicy={activeTab.replace('policy-', '') as PolicyKey}
                onChangePolicy={(policy) => setActiveTab(`policy-${policy}`)}
              />
            </motion.div>
          )}

          {isCustomTab && displayCustomPage && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col min-h-screen pt-32 pb-24 bg-white"
            >
              <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
                {/* Dynamic Page Header */}
                <div className="border-b border-slate-200 pb-8 mb-12">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-none effect-font-styling effect-font-gama">
                    {displayCustomPage.title}
                  </h1>
                </div>

                {/* Dynamic Blocks Layout */}
                <div className="flex flex-col gap-20">
                  {displayCustomPage.layout?.map((block: any, idx: number) => {
                    switch (block.blockType) {
                      case 'hero':
                        return (
                          <Hero
                            key={idx}
                            data={block}
                            onExploreServices={() => setActiveTab('contact')}
                            onExploreWork={() => { }}
                          />
                        );
                      case 'about':
                        return (
                          <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
                            <div>
                              {block.subtitle && (
                                <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3">
                                  • {block.subtitle}
                                </span>
                              )}
                              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] mb-6">
                                {block.title}
                              </h2>
                              {block.description && (
                                <p className="text-gray-500 mb-6 font-light leading-relaxed text-sm sm:text-base">
                                  {block.description}
                                </p>
                              )}
                              {block.richContent && (
                                <div
                                  className="prose max-w-none text-slate-700 font-light font-sans text-sm sm:text-base leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: lexicalToHtml(block.richContent) }}
                                />
                              )}
                            </div>
                            {block.image?.url && (
                              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150">
                                <img src={block.image.url} alt={block.title} className="w-full h-auto object-cover max-h-[500px]" />
                              </div>
                            )}
                          </div>
                        );
                      case 'rich-text':
                        return (
                          <div
                            key={idx}
                            className="prose max-w-4xl mx-auto text-slate-700 leading-relaxed font-light font-sans text-sm sm:text-base whitespace-pre-line py-6"
                            dangerouslySetInnerHTML={{ __html: lexicalToHtml(block.content) }}
                          />
                        );
                      case 'stats':
                        return <Stats key={idx} data={block} />;
                      case 'process':
                        return <Process key={idx} />;
                      case 'testimonials':
                        return <Testimonials key={idx} data={block} />;
                      case 'color-year':
                        return <ColorOfTheYear key={idx} data={block} />;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {isCustomTab && loadingPages && (
            <motion.div
              key="loading-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen pt-44 pb-32 flex items-center justify-center bg-slate-50"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-[#0A4E35]/20 border-t-[#0A4E35] animate-spin mx-auto mb-4" />
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Đang tải nội dung trang...
                </span>
              </div>
            </motion.div>
          )}

          {isCustomTab && !loadingPages && !displayCustomPage && (
            <motion.div
              key="not-found-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen pt-44 pb-32 flex items-center justify-center bg-slate-50"
            >
              <div className="text-center max-w-md p-8 bg-white rounded-3xl border border-gray-150 shadow-lg mx-6">
                <span className="text-4xl block mb-4">🔍</span>
                <h2 className="text-2xl font-serif font-extrabold text-[#0A4E35] mb-3">Không Tìm Thấy Trang</h2>
                <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6 font-light">
                  Nội dung trang này hiện không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống quản trị GAMA.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-3 bg-[#0A4E35] hover:bg-[#B48F57] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Quay về trang chủ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Shared Footer — CMS-driven with hard-coded fallbacks */}
      <Footer setActiveTab={setActiveTab} footerData={footerData} />
    </div>
  );
}
