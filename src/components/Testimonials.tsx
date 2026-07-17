"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  data?: {
    title?: string;
    subtitle?: string;
    items?: Array<{
      quote: string;
      author: string;
      role?: string;
      company?: string;
    }>;
  } | null;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "“Người ta thường nghĩ sơn chỉ là lớp ngoài cùng, nhưng với tôi, đó là chiếc áo dệt bằng xúc cảm của ngôi nhà. GAMA không chỉ tạo ra màu sắc, họ hiểu cách lưu giữ thời gian trên từng thớ tường phẳng mịn như lụa.”",
    author: "KTS. Lê Hoài Nam",
    role: "Nhà sáng lập & Giám đốc Sáng tạo",
    company: "Atelier Nam Concept"
  },
  {
    quote: "“Hơn ba mươi năm cầm cọ thi công, tôi chưa từng chạm tay vào màng sơn nào có độ che phủ tự nhiên và mịn màng như men sứ của GAMA. Khi thi công dòng G14, màng sơn tự san phẳng phẳng lì, không để lại một vệt cọ nhỏ.”",
    author: "Nghệ nhân Nguyễn Văn Quân",
    role: "Trưởng nhóm thi công di sản kiến trúc",
    company: "Hội Mỹ thuật Xây dựng Việt Nam"
  },
  {
    quote: "“Giữa sương muối buốt giá của Đà Lạt, ngôi biệt thự gỗ đá của chúng tôi vẫn giữ nguyên vẹn sắc độ trầm ấm ban đầu nhờ lớp bảo vệ siêu bóng Nano từ GAMA. Một sự tĩnh lặng sang trọng, bền bỉ và vô cùng an tâm.”",
    author: "Bà Nguyễn Hương Giang",
    role: "Chủ sở hữu",
    company: "The Pine Hill Mansion (Đà Lạt)"
  },
  {
    quote: "“Khi kiến tạo các công trình xanh đạt tiêu chuẩn sinh thái cao, chúng tôi đặt tiêu chí sức khỏe lên hàng đầu. Sơn nội thất sinh học của GAMA hoàn toàn không mùi, hàm lượng VOC gần như bằng không, mang lại bầu không khí trong lành nguyên bản ngay sau khi bàn giao.”",
    author: "Kỹ sư Trần Hoàng Bách",
    role: "Giám đốc Phát triển Bền vững",
    company: "Tập đoàn Địa ốc ECO-Green Việt Nam"
  }
];

export default function Testimonials({ data }: TestimonialsProps = {}) {
  const [current, setCurrent] = useState<number>(0);

  const testimonials: Testimonial[] = data?.items && data.items.length > 0
    ? data.items.map(item => ({
        quote: item.quote,
        author: item.author,
        role: item.role ?? '',
        company: item.company ?? ''
      }))
    : DEFAULT_TESTIMONIALS;

  const title = data?.title ?? 'Sự thấu cảm sâu sắc từ những người kiến thiết tổ ấm.';
  const subtitle = data?.subtitle ?? '• CẢM NHẬN CHIÊM NGHIỆM';

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        {/* Left text column */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-4 font-sans">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-[44px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1] mb-6">
            {title}
          </h2>
          <p className="text-[#0A4E35]/70 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-sm font-light">
            Lắng nghe những chia sẻ chân thực từ các kiến trúc sư duy mỹ, nghệ nhân thi công lành nghề và những gia chủ chọn GAMA làm tri kỷ đồng hành bảo vệ không gian sống.
          </p>

          {/* Navigation Controls on desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-250 flex items-center justify-center text-[#0A4E35] hover:bg-[#0A4E35] hover:text-white hover:border-transparent transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-250 flex items-center justify-center text-[#0A4E35] hover:bg-[#0A4E35] hover:text-white hover:border-transparent transition-all cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right testimonial slider with 3D bento card depth */}
        <div className="lg:col-span-7 flex flex-col items-center relative py-10">
          <div className="w-full max-w-lg min-h-[340px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {testimonials.map((test, idx) => {
                if (idx !== current) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-[#0A4E35] rounded-[24px] p-8 sm:p-10 shadow-xl border border-[#B48F57]/20 flex flex-col justify-between absolute z-10"
                  >
                    {/* Big quote icon */}
                    <div className="flex justify-between items-start mb-6">
                      <Quote className="w-10 h-10 text-[#B48F57] opacity-60 shrink-0" />
                      <span className="text-[11px] font-mono font-extrabold text-[#B48F57] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                        Đánh giá chất lượng
                      </span>
                    </div>

                    {/* The Quote */}
                    <p className="text-lg sm:text-[20px] font-serif font-bold text-white leading-relaxed mb-8 italic">
                      {test.quote}
                    </p>

                    {/* Author Details */}
                    <div className="border-t border-[#B48F57]/20 pt-4 flex flex-col">
                      <strong className="text-base font-sans font-bold text-[#B48F57]">
                        {test.author}
                      </strong>
                      <span className="text-xs text-white/80 font-medium font-sans mt-0.5">
                        {test.role}, {test.company}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Decorative background stacked cards for visual 3D bento depth */}
            <div className="absolute w-[94%] bg-[#0A4E35]/70 rounded-[24px] h-[95%] bottom-[-10px] transform scale-[0.96] z-0 shadow-lg pointer-events-none" />
            <div className="absolute w-[88%] bg-[#0A4E35]/40 rounded-[24px] h-[90%] bottom-[-20px] transform scale-[0.92] -z-10 shadow-md pointer-events-none" />
          </div>

          {/* Dots Pagination on Mobile */}
          <div className="flex items-center gap-2 mt-12 sm:mt-16">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  current === idx ? 'bg-[#0A4E35] scale-110' : 'bg-gray-250 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
