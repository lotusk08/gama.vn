import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle, Paintbrush, ShieldCheck, Leaf } from 'lucide-react';

const heroBanner = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';

interface HeroProps {
  onExploreServices: () => void;
  onExploreWork: () => void;
}

export default function Hero({ onExploreServices, onExploreWork }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-44 pb-32 flex items-center bg-[#EEF5ED]/50 overflow-hidden">
      {/* Background Decorative Elements representing Color & Engineering */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute right-[-10%] top-[-20%] w-[600px] h-[600px] border-[40px] border-[#B48F57]/10 rounded-full" />
        <div className="absolute left-[-5%] bottom-[-10%] w-[400px] h-[400px] border-[20px] border-[#0A4E35]/5 rounded-full" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2ece5_1px,transparent_1px),linear-gradient(to_bottom,#e2ece5_1px,transparent_1px)] bg-[size:6rem_6rem]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Subtitle / GAMA Corporate */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-10 h-[2px] bg-[#B48F57]" />
            <span className="text-[13px] font-sans font-extrabold text-[#B48F57] uppercase tracking-[0.25em]">
              Thương hiệu GAMA • Từ năm 1994
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[62px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.12] mb-8 animate-fade-in"
          >
            Sắc màu tĩnh lặng.<br />
            Chạm vào xúc cảm, giữ trọn bình yên.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#0A4E35]/85 font-sans leading-relaxed mb-10 max-w-2xl font-light"
          >
            Khi màng sơn không chỉ là lớp phủ vô tri, nó trở thành ngôn ngữ của không gian, che chở những điều quý giá nhất. GAMA chế tác những dải sắc độ bền bỉ cùng thời gian, thấu hiểu sâu sắc từng nếp nhà nhiệt đới và đồng hành cùng khát vọng gìn giữ di sản tổ ấm qua các thế hệ.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onExploreServices}
              className="px-8 py-4 bg-[#0A4E35] hover:bg-[#05473E] text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 group"
            >
              <span>Khám phá lĩnh vực</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreWork}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-[#0A4E35] border border-gray-200 font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            >
              Liên hệ ngay
            </button>
          </motion.div>
        </div>

        {/* Right visual column with Luxury Interior Walls & Badges */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full relative"
          >
            {/* The Generated Banner */}
            <div className="rounded-[24px] overflow-hidden border-8 border-white shadow-2xl relative group">
              <img
                src={heroBanner}
                alt="GAMA Premium Architectural Paint Finish"
                className="w-full h-[400px] object-cover transform scale-100 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A4E35]/20 to-transparent pointer-events-none" />
            </div>

            {/* Float badge: Emotion */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-10"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B48F57] font-bold uppercase tracking-wider font-mono">Khơi Gợi</span>
                <span className="text-xs font-bold text-[#0A4E35]">Sắc Độ Tâm Hồn</span>
              </div>
            </motion.div>

            {/* Float badge: Peace of Mind */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-2.5 z-10"
            >
              <div className="p-2 rounded-xl bg-amber-50 text-[#B48F57]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#B48F57] font-bold uppercase tracking-wider font-mono">Che Chở</span>
                <span className="text-xs font-bold text-[#0A4E35]">Vững Chãi Nắng Mưa</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hidden md:flex" onClick={onExploreServices}>
        <span className="text-[10px] text-[#0A4E35] font-bold uppercase tracking-widest">Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-[#0A4E35]" />
        </motion.div>
      </div>
    </section>
  );
}
