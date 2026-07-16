import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Sunset, Sunrise, Eye, Paintbrush, ArrowUpRight } from 'lucide-react';

interface ColorShade {
  id: string;
  name: string;
  vietnameseName: string;
  hex: string;
  desc: string;
  complementary: string;
}

export default function ColorOfTheYear() {
  const shades: ColorShade[] = [
    {
      id: 'deep-ocean',
      name: 'Deep Ocean',
      vietnameseName: 'Xanh Đại Dương Sâu',
      hex: '#213C4D',
      desc: 'Sắc xanh dương thẳm của lòng đại dương tĩnh lặng. Mang lại cảm giác kiên định, chiều sâu tri thức và sự bảo vệ vững chắc cho các công trình biệt thự, phòng khách cao cấp.',
      complementary: 'Đất sét nung (Terracotta), Gỗ Sồi tự nhiên'
    },
    {
      id: 'nordic-mist',
      name: 'Nordic Mist',
      vietnameseName: 'Sương Mù Bắc Âu',
      hex: '#8BA1AC',
      desc: 'Một tông xanh trung tính dịu mát pha ánh xám bạc của làn sương sớm phương Bắc. Lý tưởng cho không gian làm việc sáng tạo, phòng ngủ thiền định, kiến tạo sự khoáng đạt và cân bằng.',
      complementary: 'Trắng sứ thanh khiết, Đồng mạ mờ'
    },
    {
      id: 'calm-sky',
      name: 'Calm Sky',
      vietnameseName: 'Bầu Trời Tĩnh Lặng',
      hex: '#D5E1E6',
      desc: 'Sắc xanh phấn nhạt của bầu trời hừng đông tinh khôi. Mang lại cảm xúc thuần khiết, rộng mở, xoa dịu mọi căng thẳng và tối ưu hóa khả năng tán xạ ánh sáng tự nhiên.',
      complementary: 'Xanh Slate đậm, Kim loại đen tối giản'
    }
  ];

  const lightings = [
    { id: 'morning', label: 'Ánh sáng Ban Mai', icon: <Sunrise className="w-4 h-4" />, overlay: 'rgba(251, 191, 36, 0.12)' },
    { id: 'noon', label: 'Ánh sáng Trưa Hè', icon: <Sun className="w-4 h-4" />, overlay: 'rgba(255, 255, 255, 0.05)' },
    { id: 'sunset', label: 'Ánh sáng Hoàng Hôn', icon: <Sunset className="w-4 h-4" />, overlay: 'rgba(244, 63, 94, 0.15)' }
  ];

  const [activeShade, setActiveShade] = useState<ColorShade>(shades[0]);
  const [activeLighting, setActiveLighting] = useState(lightings[1]);

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
              • XU HƯỚNG SẮC MÀU CHỦ ĐẠO 2026 // DULUX & GAMA INSPIRED
            </span>
            <h2 className="text-3xl sm:text-[40px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1]">
              Màu của năm 2026: Nhịp điệu xanh (Rhythm of Blues)
            </h2>
            <p className="text-gray-500 font-sans mt-4 text-sm leading-relaxed font-light">
              Hợp tác cùng các chuyên gia dự báo xu hướng toàn cầu, GAMA giới thiệu ba sắc độ tinh tuyển đại diện cho kỷ nguyên của sự phục hồi tâm hồn, chánh niệm và thiết kế bền vững. Hãy chạm để khám phá sự tương tác tuyệt diệu giữa màng sơn chất lượng cao và ánh sáng ban ngày.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B48F57] bg-[#EEF5ED] px-4 py-2 rounded-full border border-[#0A4E35]/10 shrink-0 w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>XU HƯỚNG THIẾT KẾ ĐƯƠNG ĐẠI</span>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Swatches and Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold uppercase text-[#B48F57] tracking-widest">CHỌN TÔNG MÀU TRẢI NGHIỆM</span>
              
              <div className="flex flex-col gap-3">
                {shades.map((shade) => (
                  <button
                    key={shade.id}
                    onClick={() => setActiveShade(shade)}
                    className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                      activeShade.id === shade.id
                        ? 'border-[#0A4E35] bg-[#EEF5ED]/30 shadow-md translate-x-1'
                        : 'border-gray-150 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl shrink-0 border border-gray-200 shadow-sm"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif font-extrabold text-slate-800 text-sm">{shade.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[#B48F57]">{shade.hex}</span>
                      </div>
                      <span className="text-xs text-gray-400 block mt-0.5">{shade.vietnameseName}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Shade Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShade.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-50 border border-gray-150 rounded-[24px] p-6 sm:p-8 flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-1">ĐẶC TÍNH SẮC ĐỘ</span>
                  <h4 className="font-serif font-extrabold text-[#0A4E35] text-xl">
                    {activeShade.vietnameseName} ({activeShade.name})
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {activeShade.desc}
                </p>

                <div className="border-t border-gray-200/60 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px]">KHUYÊN DÙNG PHỐI HỢP</span>
                    <span className="text-[#0A4E35] font-bold font-sans">{activeShade.complementary}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 font-bold block uppercase tracking-wider text-[9px]">CHỈ SỐ PHẢN XẠ SÁNG</span>
                    <span className="text-[#0A4E35] font-mono font-bold">
                      {activeShade.id === 'deep-ocean' ? 'LRV: 18%' : activeShade.id === 'nordic-mist' ? 'LRV: 42%' : 'LRV: 68%'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Immersive Room Preview */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#B48F57] tracking-widest">PHÒNG THỬ NGHIỆM TRỰC QUAN</span>
              
              {/* Lighting Simulator Controls */}
              <div className="flex gap-2 p-1.5 bg-slate-50 border border-gray-150 rounded-full w-fit">
                {lightings.map((lit) => (
                  <button
                    key={lit.id}
                    onClick={() => setActiveLighting(lit)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeLighting.id === lit.id
                        ? 'bg-[#0A4E35] text-white shadow-sm'
                        : 'text-[#0A4E35]/70 hover:text-[#0A4E35] hover:bg-white/50'
                    }`}
                  >
                    {lit.icon}
                    <span className="hidden sm:inline">{lit.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Immersive Preview Room canvas */}
            <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-2xl h-[420px] bg-slate-100 flex items-center justify-center group">
              {/* Image background representing living room wall with customizable lighting and color overlays */}
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                alt="GAMA Premium Color living room design"
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Solid color overlay mapped to wall color using mix-blend-mode to preserve details and lighting */}
              <div 
                className="absolute inset-0 mix-blend-multiply opacity-55 transition-all duration-700 ease-in-out pointer-events-none"
                style={{ backgroundColor: activeShade.hex }}
              />

              {/* Lighting simulation overlay (Sunrise/Sun/Sunset gradients) */}
              <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out pointer-events-none"
                style={{ backgroundColor: activeLighting.overlay }}
              />

              {/* Subtle ambient shadow overlays to keep the room realistic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

              {/* Interactive badge in room */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-white/20 text-xs font-sans z-10 flex flex-col gap-0.5">
                <span className="text-[9px] text-[#B48F57] font-bold uppercase tracking-widest font-mono">
                  MÀU SƠN TRONG PHÒNG:
                </span>
                <span className="font-serif font-extrabold text-[#0A4E35] text-sm">
                  {activeShade.name} ({activeShade.hex})
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  Hiệu chỉnh: {activeLighting.label}
                </span>
              </div>
            </div>

            {/* Spec Note */}
            <p className="text-[11px] text-gray-400 font-sans italic text-center">
              * Lưu ý: Màu sắc hiển thị trực quan mang tính chất tham khảo. Độ phản xạ thực tế (LRV) phụ thuộc vào kết cấu màng sơn GAMA bóng men sứ (Gloss) hay bóng mờ nhung (Matt).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
