"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Calendar, Clock, ChevronRight, Search, X, AlertCircle, Check, Share2, RefreshCw } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchBlogPosts } from '../lib/payload';

interface BlogListProps {
  initialPosts?: BlogPost[];
}

export default function BlogList({ initialPosts = [] }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Science' | 'Color' | 'Industry' | 'Business'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadPostsData = async () => {
    setLoading(true);
    try {
      const { posts: fetchedPosts } = await fetchBlogPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPosts.length === 0) {
      loadPostsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShare = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      (post.author?.name ?? '').toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const featuredPost = searchQuery === '' && activeCategory === 'all' && posts.length > 0
    ? posts[0]
    : null;

  const gridPosts = featuredPost
    ? filteredPosts.filter(p => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <section className="pt-36 pb-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          key="list-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 border-b border-gray-100 pb-8 gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] font-sans">
                  • BẢN TIN & TẠP CHÍ GAMA
                </span>
              </div>

              <h2 className="text-3xl sm:text-[40px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1]">
                Khoa học màu sắc & Nhật ký nghiên cứu
              </h2>
              <p className="text-gray-500 font-sans mt-3 text-sm leading-relaxed">
                Khám phá các nghiên cứu hóa học hiệu năng cao, báo cáo phát triển bền vững, thông số kỹ thuật và dự báo màu sắc kiến tạo bởi các chuyên gia GAMA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:mt-2">
              <button
                onClick={loadPostsData}
                className="p-2.5 text-[#0A4E35] hover:bg-gray-100 rounded-full border border-gray-150 transition-colors"
                title="Refresh Feed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="bg-slate-50/50 rounded-[24px] border border-gray-150/80 p-5 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {(['all', 'Science', 'Color', 'Industry', 'Business'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${activeCategory === cat
                      ? 'bg-[#0A4E35] text-white border-transparent shadow-sm'
                      : 'bg-white text-[#0A4E35] border-gray-150 hover:bg-gray-50 hover:border-gray-350'
                    }`}
                >
                  {cat === 'all' ? 'All Publications' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, chemists, codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-150 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:ring-1 focus:ring-[#0A4E35] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-[#0A4E35]/25 border-t-[#0A4E35] rounded-full animate-spin" />
              <p className="text-xs font-bold text-[#0A4E35] uppercase tracking-wider font-sans">Connecting to Publication Ledger...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-20 border-2 border-dashed border-gray-200 rounded-[32px] text-center max-w-lg mx-auto flex flex-col items-center gap-4 px-6 bg-slate-50/20">
              <div className="w-12 h-12 bg-[#B48F57]/15 rounded-full flex items-center justify-center text-[#B48F57]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-[#0A4E35] text-lg mb-1">No Articles Match Your Search</h3>
                <p className="text-gray-500 text-xs font-sans leading-relaxed">
                  We couldn't find any chemical studies or trend posts matching "{searchQuery}". Try selecting another category tab or broadening your query phrase.
                </p>
              </div>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-5 py-2 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer mt-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="bg-slate-50 rounded-[32px] border border-gray-150/70 p-6 sm:p-10 mb-12 flex flex-col lg:flex-row gap-8 lg:items-center hover:border-[#B48F57] transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-[10px] bg-[#EEF5ED] text-[#0A4E35] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          ★ FEATURED {featuredPost.category}
                        </span>
                        <span className="text-[11px] text-gray-400 font-sans font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.date}
                        </span>
                      </div>

                      <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0A4E35] group-hover:text-[#B48F57] transition-colors leading-tight mb-4 tracking-tight">
                        {featuredPost.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6 max-w-3xl">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200/60 text-xs font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0A4E35]/10 flex items-center justify-center font-bold text-[#0A4E35] text-xs uppercase">
                          {(featuredPost.author?.name ?? 'G').charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#0A4E35]">{featuredPost.author?.name ?? 'GAMA Contributor'}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{featuredPost.author?.role ?? 'Technical Specialist'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                        <button
                          onClick={(e) => handleShare(featuredPost, e)}
                          className="p-2 text-gray-400 hover:text-[#B48F57] bg-white rounded-full border border-gray-150 shadow-sm hover:scale-105 active:scale-95 transition-all"
                          title="Copy Share Link"
                        >
                          {copiedId === featuredPost.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                        </button>
                        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#0A4E35] group-hover:text-[#B48F57] transition-colors">
                          <span>Read Analysis</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {gridPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-150 hover:border-[#B48F57] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] bg-[#EEF5ED] text-[#0A4E35] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-gray-400 font-sans font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {post.date}
                        </span>
                      </div>

                      <h3 className="font-serif font-extrabold text-lg sm:text-xl text-[#0A4E35] group-hover:text-[#B48F57] transition-colors leading-snug mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-xs font-sans mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#B48F57]/10 flex items-center justify-center font-bold text-[#B48F57] text-[10px] uppercase">
                          {(post.author?.name ?? 'G').charAt(0)}
                        </div>
                        <span className="text-gray-600 font-medium text-[11px]">{post.author?.name ?? 'GAMA Contributor'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 font-bold flex items-center gap-1 mr-2">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                        <button
                          onClick={(e) => handleShare(post, e)}
                          className="p-1.5 text-gray-400 hover:text-[#B48F57] bg-slate-50 rounded-full border border-gray-100 shadow-sm transition-all hover:scale-105 active:scale-95"
                          title="Copy Share Link"
                        >
                          {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-[#0A4E35] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-[#B48F57] transition-colors">
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
