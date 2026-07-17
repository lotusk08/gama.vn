"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, FlaskConical, Sun, Shield, Sparkles, HelpCircle, Eye, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface InnovationTech {
  id: string;
  name: string;
  enName: string;
  summary: string;
  benefit: string;
  illustrationUrl: string;
  metrics: { label: string; value: string }[];
  principles: string[];
}

export default function Innovation() {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({
    'cool-shield': '/api/media/file/innovation-1.jpg',
    'pure-shield': '/api/media/file/innovation-2.jpg',
    'easy-wash': '/api/media/file/innovation-3.jpg',
  });

  useEffect(() => {
    async function fetchInnovationImages() {
      try {
        const res = await fetch('/api/media?where[alt][in]=innovation-1,innovation-2,innovation-3');
        const data = await res.json();
        if (data.docs && data.docs.length > 0) {
          const map: Record<string, string> = {
            'cool-shield': '/api/media/file/innovation-1.jpg',
            'pure-shield': '/api/media/file/innovation-2.jpg',
            'easy-wash': '/api/media/file/innovation-3.jpg',
          };
          data.docs.forEach((doc: any) => {
            if (doc.alt === 'innovation-1') map['cool-shield'] = doc.url;
            if (doc.alt === 'innovation-2') map['pure-shield'] = doc.url;
            if (doc.alt === 'innovation-3') map['easy-wash'] = doc.url;
          });
          setImageUrls(map);
        }
      } catch (err) {
        console.error('Error fetching innovation images:', err);
      }
    }
    fetchInnovationImages();
  }, []);

  const technologies: InnovationTech[] = [
    {
      id: 'cool-shield',
      name: 'Công nghệ Phản xạ Nhiệt Cool-Shield™',
      enName: 'Heat-Reflective Technology',
      summary: 'Giải pháp giảm nhiệt chủ động cho mặt ngoài tòa nhà bằng cách tích hợp các hạt sắc tố có cấu trúc vi cầu rỗng phản xạ dải quang phổ hồng ngoại (tác nhân chính gây hấp thụ nhiệt nhiệt đới).',
      benefit: 'Hạ nhiệt độ bề mặt tường ngoại thất lên tới 5°C, giảm tải công suất điều hòa không khí trong nhà lên tới 15%.',
      illustrationUrl: '/api/media/file/innovation-1.jpg',
      metrics: [
        { label: 'Tỷ lệ phản xạ nhiệt hồng ngoại', value: '85%' },
        { label: 'Nhiệt độ tường thực tế giảm', value: 'Up to 5°C' },
        { label: 'Tiết kiệm năng lượng điện năng', value: '15% annually' }
      ],
      principles: [
        'Cấu trúc tinh thể titanium dioxide được gia cố lớp phủ phản xạ nano tinh khiết.',
        'Tán xạ triệt để bước sóng nhiệt thay vì hấp thụ vào kết cấu bê tông cốt thép của ngôi nhà.',
        'Ngăn chặn sự giãn nở nhiệt liên tục của bê tông, hạn chế nứt chân chim và dột rỉ màng sơn.'
      ]
    },
    {
      id: 'pure-shield',
      name: 'Màng bảo vệ Kháng khuẩn Ion Bạc Pure-Shield™',
      enName: 'Active Silver-Ion Protection',
      summary: 'Hệ thống phòng thủ vi sinh thông minh tự động kích hoạt nhờ các hạt nano ion bạc hoạt hóa cao phủ đều trong ma trận màng sơn, tiêu diệt mầm bệnh nguy hại khi tiếp xúc.',
      benefit: 'Tiêu diệt 99.9% vi rút, vi khuẩn đường ruột (E.coli) và ngăn ngừa triệt để sự ký sinh của rêu mốc, nấm ẩm ẩm ướt.',
      illustrationUrl: '/api/media/file/innovation-2.jpg',
      metrics: [
        { label: 'Hiệu quả tiêu diệt vi khuẩn vi rút', value: '99.99%' },
        { label: 'Đạt chuẩn kiểm định an toàn y tế', value: 'JIS Z 2801' },
        { label: 'Tuổi thọ màng kháng khuẩn tự nhiên', value: 'Vĩnh viễn' }
      ],
      principles: [
        'Ion bạc phá vỡ vỏ tế bào của sinh vật đơn bào ngay khi chạm trực tiếp.',
        'Ức chế enzyme hô hấp của tế bào nấm mốc, dập tắt quá trình sinh trưởng tự nhiên.',
        'Hợp chất kháng sinh gốc tự nhiên hoàn toàn không gây độc hại cho thú cưng và trẻ nhỏ sơ sinh.'
      ]
    },
    {
      id: 'easy-wash',
      name: 'Màng sơn Chống bám bẩn Tự làm sạch Easy-Wash™',
      enName: 'Self-Cleaning Nano Technology',
      summary: 'Ứng dụng cơ chế hoa sen (Lotus effect) với mật độ liên kết phân tử siêu mịn màng, làm mất khả năng bám dính của các phân tử bụi mịn, dầu mỡ hay bùn đất từ môi trường.',
      benefit: 'Bề mặt tường ngoại thất tự động rửa trôi bụi bẩn bám dính chỉ sau một cơn mưa rào tự nhiên, duy trì vẻ mỹ quan tươi mới lâu dài.',
      illustrationUrl: '/api/media/file/innovation-3.jpg',
      metrics: [
        { label: 'Mức độ chống thấm nước bề mặt', value: 'Đạt tuyệt đối' },
        { label: 'Số chu kỳ chà rửa mô phỏng', value: '25,000 chu kỳ' },
        { label: 'Thời gian bảo chứng tính thẩm mỹ', value: '15 năm rực rỡ' }
      ],
      principles: [
        'Cấu tạo bề mặt kỵ nước góc tiếp xúc siêu cao (hydrophobic) đẩy các giọt nước tụ lại thành hình cầu.',
        'Nước lăn tròn trên màng sơn cuốn sạch các hạt bụi mịn mà không ngấm qua khe kẽ.',
        'Kháng hóa chất chùi rửa thông thường, chống bạc màu do tác động của xà phòng tẩy rửa.'
      ]
    }
  ];

  const [activeTech, setActiveTech] = useState<InnovationTech>(technologies[0]);

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      {/* 1. HERO INNOVATION SECTION */}
      <section className="bg-[#EEF5ED]/40 pt-36 sm:pt-44 pb-24 sm:pb-32 relative overflow-hidden border-b border-[#B48F57]/10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-4 font-sans">
              • CÔNG NGHỆ & ĐỘT PHÁ // GAMA LAB MOLECULAR RESEARCH
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-serif font-extrabold tracking-tight leading-[1.1] mb-6 effect-font-styling effect-font-gama">
              Khoa học phân tử nâng tầm chất lượng sống
            </h1>
            <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed max-w-3xl font-light">
              Màng sơn hoàn hảo không dừng lại ở sắc màu thời thượng. Đó là kết tinh của hàng ngàn giờ nghiên cứu nghiêm ngặt bên trong GAMA Lab — nơi các nhà khoa học hóa học và vật liệu làm việc để chế tác ra những giải pháp thông minh vượt bậc. Chúng tôi định vị màng sơn GAMA là lớp bảo vệ đa tầng ứng dụng những công nghệ tiên tiến nhất châu Âu, chống chọi dũng mãnh trước khí hậu khắc nghiệt Việt Nam.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-gray-150 shadow-md flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EEF5ED] rounded-2xl flex items-center justify-center shrink-0">
              <FlaskConical className="w-6 h-6 text-[#0A4E35]" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-[#0A4E35] text-base">GAMA Lab</h3>
              <span className="text-xs text-gray-400 block mt-0.5">Tiêu chuẩn R&D Đức & ISO 9001</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CORE TECHNOLOGIES */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">

          {/* Header Title */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
                • CHỦ LỰC KỸ THUẬT ĐỘT PHÁ
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-tight">
                Hệ thống 03 giải pháp sơn bảo vệ màng sơn thông minh
              </h2>
            </div>

            {/* Quick selectors for desktop */}
            <div className="flex flex-wrap gap-2.5 p-1 bg-slate-50 border border-gray-150 rounded-full w-fit shrink-0">
              {technologies.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setActiveTech(tech)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTech.id === tech.id
                      ? 'bg-[#0A4E35] text-white shadow-sm'
                      : 'text-[#0A4E35]/70 hover:text-[#0A4E35] hover:bg-white/50'
                    }`}
                >
                  {tech.id === 'cool-shield' && 'Cool-Shield'}
                  {tech.id === 'pure-shield' && 'Pure-Shield'}
                  {tech.id === 'easy-wash' && 'Easy-Wash'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Workspace Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Dynamic Tech Card */}
            <div className="lg:col-span-7 bg-slate-50 border border-gray-150 rounded-[32px] p-8 sm:p-12 flex flex-col gap-8 relative overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest">
                    GAMA LAB EXCLUSIVE TECHNOLOGY
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="font-serif font-extrabold text-[#0A4E35] text-2xl sm:text-3xl tracking-tight leading-tight">
                  {activeTech.name}
                </h3>
                <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider">
                  {activeTech.enName}
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {activeTech.summary}
                </p>

                <div className="bg-[#EEF5ED]/60 border border-[#0A4E35]/10 p-5 rounded-2xl flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#0A4E35] uppercase tracking-wider">LỢI ÍCH SỬ DỤNG TRỰC QUAN</span>
                  <p className="text-xs sm:text-sm text-[#0A4E35] font-medium font-sans leading-relaxed">
                    {activeTech.benefit}
                  </p>
                </div>
              </div>

              {/* Grid values */}
              <div className="border-t border-gray-200/60 pt-6">
                <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-4">THÔNG SỐ PHÒNG THÍ NGHIỆM ĐẠT ĐƯỢC:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {activeTech.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 border-l border-slate-200 pl-4">
                      <span className="text-xs text-gray-400 font-medium font-sans leading-tight">{m.label}</span>
                      <span className="text-lg sm:text-xl font-serif font-extrabold text-[#0A4E35] mt-1">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nested technical principles */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">NGUYÊN LÝ HOẠT ĐỘNG HOÁ HỌC:</span>
                <div className="flex flex-col gap-2.5">
                  {activeTech.principles.map((pr, idx) => (
                    <div key={idx} className="flex gap-2 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#B48F57] shrink-0 mt-0.5" />
                      <span>{pr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Immersive graphic / illustration with details */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-xl h-[360px] bg-slate-100 flex items-center justify-center">
                <img
                  src={imageUrls[activeTech.id] || activeTech.illustrationUrl}
                  alt={activeTech.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[9px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-1">
                    HÌNH ẢNH MÔ PHỎNG THỰC TẾ
                  </span>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                    Ứng dụng {activeTech.enName}
                  </h4>
                </div>
              </div>

              {/* Sidebar with GAMA Lab philosophy */}
              <div className="bg-[#051F16] text-white rounded-[24px] p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#B48F57]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#B48F57] tracking-wider">TRIẾT LÝ SÁNG TẠO GAMA</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  "Sáng tạo đột phá tại GAMA không mang tính phô trương. Mọi phân tử hóa chất, mọi tỷ lệ pha trộn keo acrylic đều được thiết kế để giải quyết dứt điểm các cơn đau đầu kinh niên của gia chủ Việt Nam: nứt rạn rêu mốc do nồm ẩm ẩm, bạc màu do nắng gắt, và rỉ dột do mưa bão."
                </p>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Hội đồng R&D GAMA</span>
                  <span className="font-mono">Established 2016</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SIMULATION EXPERIMENT LAB */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
                • CƠ CHẾ KIỂM ĐỊNH KHẮC NGHIỆT (QUV WEATHEROMETER)
              </span>
              <h2 className="text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-snug">
                Sự kiên cường được tôi luyện qua những bài thử thách vô cực
              </h2>
            </div>

            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed font-light">
              Mỗi mẻ sơn GAMA xuất xưởng đều phải trải qua hàng trăm giờ gia tốc thời tiết nhân tạo trong buồng thử nghiệm UVCON & sương muối tại phòng kỹ thuật của chúng tôi. Chúng tôi tạo ra điều kiện thời tiết khắc nghiệt gấp 10 lần thực tế để kiểm tra khả năng giữ màu màu sơn, khả năng giữ màng bảo vệ, bảo vệ tài sản kiến trúc vững vàng qua 15 năm nắng mưa dồn dập dập.
            </p>

            <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B48F57]" />
                <span>Thử nghiệm sương mù muối đậm đặc liên tục trong 1,000 giờ để kiểm tra tính kháng rỉ.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B48F57]" />
                <span>Chiếu bức xạ tia cực tím UVB bước sóng ngắn 313nm cường độ cực đại kiểm định Chroma-Lock™.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B48F57]" />
                <span>Chu kỳ nung nóng ở 60°C kết hợp ngưng tụ ẩm đột ngột mô phỏng cơn dông mùa hè khắc nghiệt.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#B48F57] uppercase tracking-wider">• BẢNG PHÒNG THÍ NGHIỆM GAMA LAB</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold rounded-full">LIVE DATA APPROVED</span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-100 pb-3">
                  <span className="text-gray-500">Độ bền màng sơn trước UV</span>
                  <span className="font-bold font-mono text-[#0A4E35]">Vượt chuẩn 2.5 lần</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-100 pb-3">
                  <span className="text-gray-500">Khả năng kháng kiềm màng bê tông ẩm</span>
                  <span className="font-bold font-mono text-[#0A4E35]">Tuyệt hảo (0% loang muối)</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-100 pb-3">
                  <span className="text-gray-500">Hàm lượng kim loại nặng chì/thủy ngân</span>
                  <span className="font-bold font-mono text-emerald-600">Không phát hiện (ND)</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-slate-100 pb-3">
                  <span className="text-gray-500">Độ co giãn đàn hồi phục hồi vết nứt</span>
                  <span className="font-bold font-mono text-[#0A4E35]">&gt; 320%</span>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 font-sans italic">
                * Dữ liệu từ trung tâm phân tích hóa lý độc lập đo lường trên màng sơn lót kháng kiềm đa năng GAMA Nano-Sealer.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
