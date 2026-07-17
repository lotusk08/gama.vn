"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Globe, Leaf, Recycle, Flame, FileText, ArrowRight, ArrowUpRight, Award, Compass } from 'lucide-react';

interface SustainablePillar {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  metric: string;
  metricLabel: string;
  details: string[];
  color: string;
  bgColor: string;
}

export default function Sustainability() {
  const [activePillar, setActivePillar] = useState<string>('climate');

  const pillars: SustainablePillar[] = [
    {
      id: 'climate',
      title: 'Hành động vì Khí hậu',
      tagline: 'Cam kết giảm phát thải CO2 toàn diện',
      desc: 'Chúng tôi đang tăng tốc lộ trình trung hòa carbon tại các cơ sở chế tác GAMA bằng cách chuyển dịch sang nguồn điện năng lượng mặt trời tái tạo và cải tiến lò nung nhiệt độ thấp tối ưu.',
      metric: '-50%',
      metricLabel: 'Lượng phát thải Carbon vào năm 2030',
      details: [
        'Lắp đặt hệ thống pin năng lượng mặt trời áp mái tại toàn bộ tổ hợp nhà máy GAMA.',
        'Đồng bộ hóa chuỗi cung ứng logistics thông minh nhằm giảm 30% hành trình vận chuyển rác thải.',
        'Tối ưu hóa hiệu năng lò hơi công nghiệp bằng công nghệ thu hồi nhiệt tuần hoàn tự động.'
      ],
      color: '#0A4E35',
      bgColor: '#EEF5ED'
    },
    {
      id: 'products',
      title: 'Chế tác Sinh thái',
      tagline: 'Công nghệ Eco-Shield không dung môi & Zero-VOC',
      desc: 'Màng sơn không chỉ làm đẹp mà phải bảo vệ sức khỏe con người. Toàn bộ các dòng sơn nội thất GAMA thế hệ mới cam kết loại bỏ hoàn toàn các dung môi bay hơi gây hại cho đường hô hấp.',
      metric: '0%',
      metricLabel: 'Hàm lượng VOC có trong dòng Eco-Shield',
      details: [
        'Ứng dụng nhựa sinh học dồi dào chiết xuất từ phụ phẩm thực vật thay thế một phần dầu mỏ.',
        'Sử dụng bột khoáng đá vôi tự nhiên không chứa kim loại nặng như chì và thủy ngân.',
        'Mùi sơn hoàn toàn trung tính, an toàn tuyệt đối cho gia đình có thể dọn vào ở ngay sau 24h.'
      ],
      color: '#B48F57',
      bgColor: '#FAF5EE'
    },
    {
      id: 'circular',
      title: 'Kinh tế Tuần hoàn',
      tagline: 'Bảo tồn nguồn tài nguyên nước và bao bì tái chế',
      desc: 'Định nghĩa lại vòng đời của sản phẩm sơn. Chúng tôi tiên phong ứng dụng các giải pháp thu gom, tái sử dụng nước thải súc rửa và phát triển vỏ thùng sơn làm từ nhựa tái chế cao cấp.',
      metric: '100%',
      metricLabel: 'Nước thải công nghiệp được xử lý tuần hoàn',
      details: [
        'Vận hành hệ thống lọc màng sinh học MBR khép kín, tái sử dụng nước cho hoạt động cảnh quan.',
        'Hợp tác cùng các nghiệp đoàn nhựa chế tác thùng sơn bằng 45% nhựa PCR thu gom từ đại dương.',
        'Triển khai chiến dịch thu hồi vỏ lon cũ tại các công trình lớn nhằm giảm gánh nặng chôn lấp.'
      ],
      color: '#213C4D',
      bgColor: '#F0F4F8'
    }
  ];

  const activeData = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      {/* 1. HERO EDITORIAL SECTION */}
      <section className="bg-gradient-to-b from-[#EEF5ED]/70 via-white to-white pt-36 sm:pt-44 pb-24 sm:pb-32 relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#B48F57]/10 rounded-full blur-3xl" />
          <div className="absolute left-10 bottom-10 w-80 h-80 bg-[#0A4E35]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-4 font-sans">
              • PHÁT TRIỂN BỀN VỮNG // VÌ MỘT TƯƠNG LAI XANH KIÊN CƯỜNG
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1] mb-6">
              Sắc màu bảo vệ tương lai.<br />
              Kiến tạo hành tinh đáng sống.
            </h1>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-8 font-light">
              Tại GAMA, chúng tôi tin rằng mỗi bề mặt được phủ sơn chính là một cơ hội để giảm thiểu tác động sinh thái và nâng cao chất lượng cuộc sống. Lấy cảm hứng từ triết lý phát triển bền vững toàn diện của AkzoNobel, GAMA không ngừng tối ưu hóa lượng khí thải từ nhà máy chế tác, nâng tầm tiêu chuẩn nguyên liệu không VOC và bảo bọc hành trình sống xanh của người Việt.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW SECTION */}
      <section className="py-16 bg-[#051F16] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col border-l border-[#B48F57]/20 pl-6">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#B48F57]">Zero</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-2 block">Dung môi hữu cơ bay hơi</span>
              <span className="text-xs text-slate-300 font-sans font-light mt-1">Hoàn toàn không mùi, bảo vệ hệ hô hấp khỏe mạnh.</span>
            </div>
            <div className="flex flex-col border-l border-[#B48F57]/20 pl-6">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#B48F57]">-50%</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-2 block">Lượng phát thải khí nhà kính</span>
              <span className="text-xs text-slate-300 font-sans font-light mt-1">Cắt giảm triệt để năng lượng hóa thạch vào năm 2030.</span>
            </div>
            <div className="flex flex-col border-l border-[#B48F57]/20 pl-6">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#B48F57]">45%</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-2 block">Nhựa PCR đại dương</span>
              <span className="text-xs text-slate-300 font-sans font-light mt-1">Tái sinh nguồn phế thải nhựa thành bao bì chịu lực.</span>
            </div>
            <div className="flex flex-col border-l border-[#B48F57]/20 pl-6">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#B48F57]">100%</span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400 mt-2 block">Đạt chứng nhận hợp quy</span>
              <span className="text-xs text-slate-300 font-sans font-light mt-1">Sản xuất nghiêm ngặt theo chuẩn sinh thái khắt khe.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PILLARS */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
              • HÀNH TRÌNH "HÀNH TINH KHỎE MẠNH" (PEOPLE. PLANET. PAINT.)
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-tight">
              Ba mũi nhọn hành động vì môi trường bền vững của chúng tôi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {pillars.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`p-6 rounded-2xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                    activePillar === pillar.id
                      ? 'border-[#0A4E35] bg-[#EEF5ED]/30 shadow-md translate-x-1.5'
                      : 'border-gray-150 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {pillar.id === 'climate' && <Globe className="w-5 h-5 text-[#0A4E35]" />}
                    {pillar.id === 'products' && <Leaf className="w-5 h-5 text-[#B48F57]" />}
                    {pillar.id === 'circular' && <Recycle className="w-5 h-5 text-[#213C4D]" />}
                    <h3 className="font-serif font-extrabold text-slate-800 text-base">{pillar.title}</h3>
                  </div>
                  <span className="text-xs text-gray-500 font-light font-sans">{pillar.tagline}</span>
                </button>
              ))}
            </div>

            {/* Right details visualization */}
            <div className="lg:col-span-8 bg-slate-50 border border-gray-150 rounded-[32px] p-8 sm:p-12 relative overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none"
                style={{ color: activeData.color }}
              >
                {activeData.id === 'climate' && <Globe className="w-full h-full" />}
                {activeData.id === 'products' && <Leaf className="w-full h-full" />}
                {activeData.id === 'circular' && <Recycle className="w-full h-full" />}
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <span 
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
                    style={{ backgroundColor: activeData.bgColor, color: activeData.color }}
                  >
                    CAM KẾT THỰC THI CHỦ ĐẠO
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] mt-4">
                    {activeData.tagline}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                  {activeData.desc}
                </p>

                {/* Main Metric Visualization */}
                <div 
                  className="p-6 rounded-2xl flex items-center justify-between gap-6 border"
                  style={{ borderColor: activeData.color + '15', backgroundColor: activeData.bgColor + '30' }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider font-sans">MỤC TIÊU CHIẾN LƯỢC</span>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium font-sans">{activeData.metricLabel}</span>
                  </div>
                  <span 
                    className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight shrink-0"
                    style={{ color: activeData.color }}
                  >
                    {activeData.metric}
                  </span>
                </div>

                {/* Nested sub-steps */}
                <div className="flex flex-col gap-4 mt-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">CHI TIẾT TRIỂN KHAI PHÒNG THÍ NGHIỆM & NHÀ MÁY:</span>
                  <div className="flex flex-col gap-3.5">
                    {activeData.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                        <span className="font-bold font-mono mt-0.5" style={{ color: activeData.color }}>0{idx + 1}.</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHỨNG NHẬN TIÊU CHUẨN XANH QUỐC TẾ */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
                  • KIỂM ĐỊNH KHÁCH QUAN & CHỨNG NHẬN
                </span>
                <h2 className="text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-snug">
                  Đồng hành kiến tạo công trình đạt tiêu chuẩn xanh toàn cầu
                </h2>
              </div>
              <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed font-light">
                GAMA thấu hiểu màng sơn đóng vai trò tối quan trọng đối với thang điểm đánh giá công trình xanh. Chúng tôi liên tục gửi mẫu kiểm định đến các trung tâm kiểm nghiệm độc lập, bảo chứng chất lượng sinh thái hoàn hảo cho các dự án thương mại cao cấp, tòa nhà văn phòng và khu nghỉ dưỡng sinh thái.
              </p>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-150 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF5ED] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#0A4E35]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">TIÊU CHUẨN LEED V4 CO-EFFICIENT</h4>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Hỗ trợ đắc lực tích lũy tối đa điểm số an toàn sức khỏe trong nhà.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-white border border-slate-150 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF5EE] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5 text-[#B48F57]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase">HỢP QUY QCVN 16 BỘ XÂY DỰNG VÀ CHUẨN ISO</h4>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Sản xuất nghiêm ngặt và quản lý chất lượng đồng bộ từ xưởng đến tay thợ.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative cards with quote */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="bg-white p-8 rounded-[24px] border border-slate-200/80 shadow-md flex flex-col justify-between h-72">
                <div className="flex items-center gap-1 text-[#B48F57]">
                  <Flame className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Hạ tầng Công nghiệp</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed my-4">
                  "Với GAMA, bảo vệ bền vững không phải là một chiến dịch tiếp thị nhất thời. Đó là nền tảng cốt lõi của khoa học phân tử, đảm bảo công trình chống chịu tốt nhất trước thời tiết biển mà không tàn phá hệ sinh thái."
                </p>
                <div className="border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold text-[#0A4E35] block">Kỹ sư trưởng Trần Đức Mỹ</span>
                  <span className="text-[10px] text-gray-400">Giám đốc Quản lý Kỹ thuật, GAMA Industrial</span>
                </div>
              </div>

              <div className="bg-[#0A4E35] text-white p-8 rounded-[24px] shadow-lg flex flex-col justify-between h-72 sm:translate-y-8">
                <div className="flex items-center gap-1 text-[#B48F57]">
                  <Leaf className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">Cam kết Thế hệ</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed my-4">
                  "Chúng tôi không thừa kế Trái Đất này từ tổ tiên; chúng tôi mượn nó từ thế hệ con cháu mai sau. Mỗi thùng sơn Eco-Shield được đóng nắp là một chiếc kén bảo vệ cho bầu không khí tương lai lành mạnh hơn."
                </p>
                <div className="border-t border-white/10 pt-4">
                  <span className="text-xs font-bold text-white block">ThS. Nguyễn Hoàng Anh</span>
                  <span className="text-[10px] text-slate-400">Đại diện Hội đồng Quản trị GAMA Group</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
