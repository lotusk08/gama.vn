import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  Tag, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  User, 
  Search, 
  Settings, 
  Check, 
  AlertCircle, 
  Plus, 
  Info, 
  Copy, 
  ArrowLeft, 
  RefreshCw, 
  Share2,
  FileText
} from 'lucide-react';
import { BlogPost } from '../types';
import { 
  fetchBlogPosts, 
  createBlogPost, 
  checkPayloadConnection, 
  resetLocalPosts, 
  PAYLOAD_CMS_URL, 
  PayloadStatus 
} from '../lib/payload';

export default function Blog() {
  // State variables
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'Science' | 'Color' | 'Industry' | 'Business'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [cmsStatus, setCmsStatus] = useState<PayloadStatus>({
    isConnected: false,
    url: PAYLOAD_CMS_URL,
    source: 'Local Demo Mode'
  });
  
  // Modals state
  const [showIntegrationModal, setShowIntegrationModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  // New Post Form state
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('Science');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('');
  const [newReadTime, setNewReadTime] = useState('4 min read');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Ref for progress bar in reading mode
  const readingAreaRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load posts and verify CMS on mount
  const loadPostsData = async () => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, source, error } = await fetchBlogPosts();
      setPosts(fetchedPosts);
      
      const connection = await checkPayloadConnection();
      setCmsStatus(connection);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostsData();
  }, []);

  // Tracking article scroll progress using the main window scroll instead of a restricted nested container
  useEffect(() => {
    if (!selectedPost) {
      setScrollProgress(0);
      return;
    }

    // Scroll to top immediately when a post is selected so the reader starts at the beginning
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

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
    // Call once to initialize progress
    const timer = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [selectedPost]);

  const handleShare = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // Simulate share URL
    const shareUrl = `${window.location.origin}/#blog?id=${post.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Reset demo posts
  const handleResetDemo = () => {
    const freshPosts = resetLocalPosts();
    setPosts(freshPosts);
  };

  // Submit new article
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!newTitle || !newExcerpt || !newContent || !newAuthorName || !newAuthorRole) {
      setFormError('Please fill in all required fields marked with *');
      return;
    }

    try {
      const { post: created } = await createBlogPost({
        title: newTitle,
        excerpt: newExcerpt,
        content: newContent,
        category: newCategory,
        readTime: newReadTime || '3 min read',
        author: {
          name: newAuthorName,
          role: newAuthorRole
        }
      });

      // Update state
      setPosts(prev => [created, ...prev]);
      setFormSuccess(true);
      
      // Reset form fields
      setNewTitle('');
      setNewExcerpt('');
      setNewContent('');
      setNewAuthorName('');
      setNewAuthorRole('');
      setNewReadTime('4 min read');

      // Close modal after a delay
      setTimeout(() => {
        setShowAddModal(false);
        setFormSuccess(false);
      }, 1500);
    } catch (err: any) {
      setFormError(`Failed to save post: ${err.message || err}`);
    }
  };

  const copyPayloadSchema = () => {
    const schemaText = `{
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['Science', 'Color', 'Industry', 'Business'],
      required: true,
    },
    { name: 'date', type: 'text' },
    { name: 'readTime', type: 'text' },
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
  ],
}`;
    navigator.clipboard.writeText(schemaText).then(() => {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    });
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.author.name.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  // Featured post is the first post matching filters (if any) or simply the first overall
  const featuredPost = searchQuery === '' && activeCategory === 'all' && posts.length > 0
    ? posts[0] 
    : null;
  
  const gridPosts = featuredPost 
    ? filteredPosts.filter(p => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <section className="py-32 bg-white overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Dynamic header navigation or view mode */}
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Title, Subtitle, & Payload Integration Status Badge */}
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-12 border-b border-gray-100 pb-8 gap-6">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] font-sans">
                      • BẢN TIN & TẠP CHÍ GAMA
                    </span>
                    
                    {/* CMS Connection Indicator Badge */}
                    <button
                      onClick={() => setShowIntegrationModal(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-tight font-mono transition-all border shadow-sm cursor-pointer ${
                        cmsStatus.isConnected 
                          ? 'bg-[#EEF5ED] text-[#0A4E35] border-[#0A4E35]/20 hover:border-[#0A4E35]/40' 
                          : PAYLOAD_CMS_URL 
                            ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100/50' 
                            : 'bg-[#B48F57]/15 text-[#B48F57] border-[#B48F57]/20 hover:bg-[#B48F57]/25'
                      }`}
                      title="Click to view Payload CMS integration details"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cmsStatus.isConnected ? 'bg-emerald-500 animate-pulse' : PAYLOAD_CMS_URL ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      <span>
                        {cmsStatus.isConnected 
                          ? 'Cổng Payload CMS Live' 
                          : PAYLOAD_CMS_URL 
                            ? 'Lỗi kết nối Payload CMS' 
                            : 'Mẫu lưu trữ cục bộ'}
                      </span>
                      <Settings className="w-3 h-3 ml-0.5 opacity-70" />
                    </button>
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

              {/* Real-time search, filter and settings banner */}
              <div className="bg-slate-50/50 rounded-[24px] border border-gray-150/80 p-5 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Categories filtering tabs */}
                <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                  {(['all', 'Science', 'Color', 'Industry', 'Business'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                        activeCategory === cat
                          ? 'bg-[#0A4E35] text-white border-transparent shadow-sm'
                          : 'bg-white text-[#0A4E35] border-gray-150 hover:bg-gray-50 hover:border-gray-350'
                      }`}
                    >
                      {cat === 'all' ? 'All Publications' : cat}
                    </button>
                  ))}
                </div>

                {/* Real-time search string input */}
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

              {/* Main Contents Loader */}
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
                  {/* FEATURED POST (Hero Showcase) */}
                  {featuredPost && (
                    <div 
                      onClick={() => setSelectedPost(featuredPost)}
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
                              {featuredPost.author.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#0A4E35]">{featuredPost.author.name}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{featuredPost.author.role}</p>
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
                    </div>
                  )}

                  {/* SECONDARY BLOG CARDS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {gridPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
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
                              {post.author.name.charAt(0)}
                            </div>
                            <span className="text-gray-600 font-medium text-[11px]">{post.author.name}</span>
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
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            
            /* FULL IMMERSIVE READING SUB-PAGE */
            <motion.div
              key="reading-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button and Progress Indicator bar */}
              <div className="sticky top-20 bg-white z-40 py-4 border-b border-gray-100 flex items-center justify-between mb-8">
                <button
                  onClick={() => { setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A4E35] hover:text-[#B48F57] transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Trở lại danh sách</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-400 font-mono uppercase font-bold hidden sm:inline">
                    Tiến độ đọc: {Math.round(scrollProgress)}%
                  </span>
                  
                  {/* Reading Share Button */}
                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="px-4 py-2 bg-[#EEF5ED] hover:bg-[#0A4E35] hover:text-white text-[#0A4E35] rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    <span>{copiedId === selectedPost.id ? 'Đã sao chép!' : 'Sao chép liên kết'}</span>
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Progress bar line overlay */}
                <div className="absolute bottom-0 left-0 h-[2.5px] bg-[#B48F57] transition-all duration-75" style={{ width: `${scrollProgress}%` }} />
              </div>

              {/* Article content sheet */}
              <div 
                ref={readingAreaRef}
                className="flex flex-col gap-8"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-sans font-bold">
                  <span className="text-[10px] bg-[#EEF5ED] text-[#0A4E35] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-extrabold">
                    {selectedPost.category === 'Science' ? 'Khoa học' : selectedPost.category === 'Color' ? 'Màu sắc' : selectedPost.category === 'Industry' ? 'Công nghiệp' : 'Doanh nghiệp'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B48F57]" />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B48F57]" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* Main Article Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1] pr-4">
                  {selectedPost.title}
                </h1>

                {/* Author Bio Card Block */}
                <div className="flex items-center gap-4 py-5 border-y border-gray-150/80 my-2">
                  <div className="w-12 h-12 rounded-full bg-[#B48F57]/15 flex items-center justify-center text-[#B48F57] text-lg font-bold uppercase font-sans">
                    {selectedPost.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif font-bold text-base text-[#0A4E35]">{selectedPost.author.name}</p>
                    <p className="text-xs text-gray-500 font-sans font-medium">{selectedPost.author.role} • Phòng nghiên cứu hóa chất GAMA</p>
                  </div>
                </div>

                {/* Immersive reading markdown/text space with stylized elements */}
                <div className="font-sans text-sm sm:text-base text-[#0A4E35]/90 leading-relaxed whitespace-pre-line pr-4 flex flex-col gap-6 font-light">
                  
                  {/* Decorative introduction callout block */}
                  <p className="font-serif italic text-base sm:text-lg text-[#0A4E35] border-l-4 border-[#B48F57] pl-5 py-2 my-2 bg-slate-50 rounded-r-xl pr-3 leading-relaxed">
                    "{selectedPost.excerpt}"
                  </p>

                  {/* Main Paragraph body content formatted */}
                  {selectedPost.content}
                </div>

                {/* Chemical stamp footer */}
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

              {/* Related/Next publications suggested bar */}
              <div className="mt-16 pt-12 border-t border-gray-150">
                <h4 className="text-xs font-bold text-[#B48F57] uppercase tracking-widest font-sans mb-6">
                  • TIẾP TỤC ĐỌC BÀI VIẾT KHÁC
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts
                    .filter(p => p.id !== selectedPost.id)
                    .slice(0, 2)
                    .map(post => (
                      <div 
                        key={post.id}
                        onClick={() => {
                          setSelectedPost(post);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-slate-50 hover:bg-white border border-gray-150 hover:border-[#B48F57] rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between group h-40"
                      >
                        <div>
                          <span className="text-[9px] font-extrabold text-[#0A4E35] bg-[#EEF5ED] px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit mb-3">
                            {post.category === 'Science' ? 'Khoa học' : post.category === 'Color' ? 'Màu sắc' : post.category === 'Industry' ? 'Công nghiệp' : 'Doanh nghiệp'}
                          </span>
                          <h5 className="font-serif font-extrabold text-sm text-[#0A4E35] group-hover:text-[#B48F57] transition-colors line-clamp-2">
                            {post.title}
                          </h5>
                        </div>
                        <span className="text-[11px] text-gray-400 font-bold flex items-center gap-1 self-end mt-2">
                          <span>Xem bài viết</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. PAYLOAD CMS CONNECTION STATUS & HELP MODAL */}
        <AnimatePresence>
          {showIntegrationModal && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[24px] w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]"
              >
                <div className="bg-[#0A4E35] text-white p-6 relative">
                  <button
                    onClick={() => setShowIntegrationModal(false)}
                    className="absolute top-6 right-6 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2 items-center text-xs font-bold text-[#B48F57] uppercase tracking-widest mb-1.5 font-mono">
                    <Settings className="w-4 h-4" />
                    <span>Payload CMS Integration Ledger</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white">
                    API Configuration Guidelines
                  </h3>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-6 text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                  
                  {/* Status Block */}
                  <div className="bg-slate-50 border border-gray-150 rounded-2xl p-5">
                    <h4 className="font-bold text-[#0A4E35] uppercase tracking-wide text-xs mb-3 font-mono">CONNECTION TELEMETRY:</h4>
                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                        <span className="text-gray-400 font-bold">API STATUS:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${cmsStatus.isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {cmsStatus.isConnected ? '● ACTIVE PIPELINE' : '● FALLBACK DEMO MODE'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                        <span className="text-gray-400 font-bold">CONFIGURED API URL:</span>
                        <span className="font-mono text-[#0A4E35] bg-[#EEF5ED] px-2 py-1 rounded select-all break-all max-w-xs md:max-w-md text-right">
                          {PAYLOAD_CMS_URL || '(VITE_PAYLOAD_CMS_URL Not Defined)'}
                        </span>
                      </div>

                      {cmsStatus.error && (
                        <div className="flex flex-col gap-1 p-2.5 bg-rose-50 border border-rose-200/70 rounded-lg text-rose-700 font-mono text-[11px] mt-1">
                          <span className="font-bold">LAST CONNECTION ERROR:</span>
                          <span className="break-all">{cmsStatus.error}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-[#0A4E35] text-xs uppercase tracking-widest font-sans">1. How to Link Your Payload CMS</h4>
                    <p className="text-xs">
                      This application uses client-side environment configurations. To hook up your live Payload CMS instance:
                    </p>
                    <ol className="list-decimal pl-5 flex flex-col gap-2 text-xs">
                      <li>Open the <strong>Settings (API Keys)</strong> menu in the AI Studio sidebar dashboard.</li>
                      <li>Define a secret/environment variable named: <code className="font-mono bg-[#EEF5ED] text-[#0A4E35] px-1 rounded">VITE_PAYLOAD_CMS_URL</code>.</li>
                      <li>Set the value to your hosted CMS root URL (e.g., <code className="font-mono bg-[#EEF5ED] text-[#0A4E35] px-1 rounded">https://payload.gamacorp.com</code>).</li>
                      <li>Recompile the application to update client bundle settings. The connection badge will instantly glow green!</li>
                    </ol>
                  </div>

                  {/* Copyable Schema Config Block */}
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#0A4E35] text-xs uppercase tracking-widest font-sans">2. Ideal Collection Schema Config</h4>
                      <button
                        onClick={copyPayloadSchema}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-[#EEF5ED] text-[#0A4E35] rounded-lg text-[11px] font-bold tracking-tight border border-gray-200 transition-colors"
                      >
                        {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSchema ? 'Copied' : 'Copy Config'}</span>
                      </button>
                    </div>
                    <p className="text-xs">
                      For perfect data mapping, configure your Payload CMS collection <code className="font-mono bg-[#EEF5ED] text-[#0A4E35] px-1 rounded">posts</code> with this exact schema layout:
                    </p>
                    <pre className="p-4 bg-slate-900 text-[#EEF5ED] rounded-xl font-mono text-[10px] sm:text-[11px] overflow-x-auto border border-slate-950 max-h-48 leading-relaxed">
{`import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['Science', 'Color', 'Industry', 'Business'],
      required: true,
    },
    { name: 'date', type: 'text' },
    { name: 'readTime', type: 'text' },
    {
      name: 'author',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
      ],
    },
  ],
};

export default Posts;`}
                    </pre>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={handleResetDemo}
                    className="px-4 py-2 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-full text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer border border-rose-200/50"
                  >
                    Reset Local Cache
                  </button>
                  <button
                    onClick={() => setShowIntegrationModal(false)}
                    className="px-6 py-2.5 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close Ledger Panel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 2. ADMIN PORTAL: CREATE ARTICLE FORM MODAL */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[24px] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[95vh]"
              >
                <div className="bg-[#0A4E35] text-white p-6 relative">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="absolute top-6 right-6 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2 items-center text-xs font-bold text-[#B48F57] uppercase tracking-widest mb-1.5 font-mono">
                    <FileText className="w-4 h-4" />
                    <span>Scientific Publication Ledger</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white">
                    Submit Technical Log
                  </h3>
                </div>

                <form onSubmit={handleCreatePost} className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-4 font-sans text-xs sm:text-sm">
                  
                  {formSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 flex items-center gap-2 font-medium mb-2">
                      <Check className="w-5 h-5 shrink-0 text-emerald-600" />
                      <span>Publication successfully logged into database ledger!</span>
                    </div>
                  )}

                  {formError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 flex items-center gap-2 font-medium mb-2">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">PUBLICATION TITLE *</label>
                      <input
                        type="text"
                        placeholder="e.g., Acrylic Monomer Curing Coefficients"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">CATEGORY LINE *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as BlogPost['category'])}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="Science">Science (R&D Chemist Logs)</option>
                        <option value="Color">Color (Aesthetic Design Trends)</option>
                        <option value="Industry">Industry (Protective Industrial Linings)</option>
                        <option value="Business">Business (Green Codes & Compliance)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">EXCERPT (SHORT SYNOPSIS) *</label>
                    <input
                      type="text"
                      placeholder="e.g., A study detailing pigment-binder mass ratios during extreme 55°C desert exposures."
                      value={newExcerpt}
                      onChange={(e) => setNewExcerpt(e.target.value)}
                      className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">FULL MANUSCRIPT CONTENT *</label>
                    <textarea
                      rows={6}
                      placeholder="Describe findings, test formulations, molecular specs, and concrete recommendations..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-slate-50 px-4 py-3 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">CONTRIBUTOR NAME *</label>
                      <input
                        type="text"
                        placeholder="e.g., Eng. Tariq Al-Mansoor"
                        value={newAuthorName}
                        onChange={(e) => setNewAuthorName(e.target.value)}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">CONTRIBUTOR ROLE *</label>
                      <input
                        type="text"
                        placeholder="e.g., Polymer Formulations Director"
                        value={newAuthorRole}
                        onChange={(e) => setNewAuthorRole(e.target.value)}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-[#0A4E35]/80 tracking-wider uppercase">ESTIMATED READ TIME</label>
                      <input
                        type="text"
                        placeholder="e.g., 5 min read"
                        value={newReadTime}
                        onChange={(e) => setNewReadTime(e.target.value)}
                        className="w-full bg-slate-50 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-[#0A4E35] outline-none focus:border-[#0A4E35] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#EEF5ED]/45 border border-[#0A4E35]/5 rounded-xl text-[11px] text-gray-500 leading-relaxed mt-2">
                    <span className="font-bold text-[#0A4E35] block mb-0.5 font-serif">Integration Pipeline Indicator:</span>
                    {PAYLOAD_CMS_URL 
                      ? 'Note: Your Payload CMS url is configured. This form will attempt to directly transmit this post payload to your live Payload posts collections!'
                      : 'Demo Active: Your post will be securely saved inside your local browser storage cache to keep it persistently visible across app preview sessions.'}
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Publish Log</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
