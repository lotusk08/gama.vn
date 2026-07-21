"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight, ArrowLeft, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { PAYLOAD_CMS_URL, lexicalToHtml } from '../lib/payload';
import { useLivePreview } from '@payloadcms/live-preview-react';

interface BlogPostViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostView({ post, relatedPosts }: BlogPostViewProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: livePost } = useLivePreview({
    initialData: post as any,
    serverURL: PAYLOAD_CMS_URL,
    depth: 2,
  });

  const hasLivePreviewData = livePost && typeof (livePost as any).title === 'string';
  const displayPost: BlogPost = hasLivePreviewData
    ? {
        ...post,
        ...livePost,
        content:
          typeof (livePost as any).content === 'object' && (livePost as any).content !== null
            ? lexicalToHtml((livePost as any).content)
            : (livePost as any).content ?? post.content,
      } as BlogPost
    : post;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${displayPost.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const categoryLabel = (cat: BlogPost['category']) =>
    cat === 'Science' ? 'Khoa học' : cat === 'Color' ? 'Màu sắc' : cat === 'Industry' ? 'Công nghiệp' : 'Doanh nghiệp';

  return (
    <section className="pt-36 pb-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          key="reading-view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-4xl mx-auto"
        >
          <div className="sticky top-20 bg-white z-40 py-4 border-b border-gray-100 flex items-center justify-between mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A4E35] hover:text-[#B48F57] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Trở lại danh sách</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-mono uppercase font-bold hidden sm:inline">
                Tiến độ đọc: {Math.round(scrollProgress)}%
              </span>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-[#EEF5ED] hover:bg-[#0A4E35] hover:text-white text-[#0A4E35] rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <span>{copied ? 'Đã sao chép!' : 'Sao chép liên kết'}</span>
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 h-[2.5px] bg-[#B48F57] transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-sans font-bold">
              <span className="text-[10px] bg-[#EEF5ED] text-[#0A4E35] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-extrabold">
                {categoryLabel(displayPost.category)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B48F57]" />
                {displayPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B48F57]" />
                {displayPost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold tracking-tight leading-[1.1] pr-4 effect-font-styling effect-font-gama">
              {displayPost.title}
            </h1>

            <div className="flex items-center gap-4 py-5 border-y border-gray-150/80 my-2">
              <div className="w-12 h-12 rounded-full bg-[#B48F57]/15 flex items-center justify-center text-[#B48F57] text-lg font-bold uppercase font-sans">
                {(displayPost.author?.name ?? 'G').charAt(0)}
              </div>
              <div>
                <p className="font-serif font-bold text-base text-[#0A4E35]">{displayPost.author?.name ?? 'GAMA Contributor'}</p>
                <p className="text-xs text-gray-500 font-sans font-medium">{(displayPost.author?.role ?? 'Technical Specialist')} • Phòng nghiên cứu hóa chất GAMA</p>
              </div>
            </div>

            <div className="font-sans text-sm sm:text-base text-[#0A4E35]/90 leading-relaxed pr-4 flex flex-col gap-6">
              <p className="font-serif italic text-base sm:text-lg text-[#0A4E35] border-l-4 border-[#B48F57] pl-5 py-2 my-2 bg-slate-50 rounded-r-xl pr-3 leading-relaxed">
                "{displayPost.excerpt}"
              </p>
              <div dangerouslySetInnerHTML={{ __html: displayPost.content }} />
            </div>

            <div className="p-6 bg-[#EEF5ED]/30 border border-[#0A4E35]/10 rounded-[24px] mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-[#0A4E35] font-serif font-bold text-sm">Ấn phẩm khoa học GAMA</h4>
                <p className="text-[11px] text-gray-500 font-sans mt-0.5">Được đánh giá độc lập bởi ủy ban kiểm định chất phủ bề mặt.</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#B48F57]/10 text-[#B48F57] px-3.5 py-1.5 rounded-lg border border-[#B48F57]/15 tracking-widest uppercase">
                ĐÃ DUYỆT
              </span>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-150">
              <h4 className="text-xs font-bold text-[#B48F57] uppercase tracking-widest font-sans mb-6">
                • TIẾP TỤC ĐỌC BÀI VIẾT KHÁC
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(related => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="bg-slate-50 hover:bg-white border border-gray-150 hover:border-[#B48F57] rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between group h-40"
                  >
                    <div>
                      <span className="text-[9px] font-extrabold text-[#0A4E35] bg-[#EEF5ED] px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit mb-3">
                        {categoryLabel(related.category)}
                      </span>
                      <h5 className="font-serif font-extrabold text-sm text-[#0A4E35] group-hover:text-[#B48F57] transition-colors line-clamp-2">
                        {related.title}
                      </h5>
                    </div>
                    <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1 self-end mt-2">
                      <span>Xem bài viết</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
