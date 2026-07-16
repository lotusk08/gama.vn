"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, Target, Paintbrush, Layers, Shield, Sparkles, RefreshCw, Eye, ClipboardCheck, FlaskConical, Truck, HardHat, Droplets } from 'lucide-react';
import { ProcessStep } from '../types';

export default function Process() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const processData: ProcessStep[] = [
    {
      title: 'Kiến tạo Sắc độ',
      description: 'Từ những chiêm nghiệm sâu sắc về tâm lý học màu sắc đến nghiên cứu phân tử polyme cao cấp, chúng tôi dệt nên những lớp phủ mang tâm hồn và hơi thở riêng cho từng công trình.',
      subSteps: [
        {
          title: 'Đo đạc Ánh sáng',
          desc: 'Các chuyên gia sắc độ của GAMA lắng nghe sự chuyển động của ánh sáng, bóng đổ và vật liệu tự nhiên để thiết lập hệ màu sắc tinh tế, hài hòa tuyệt đối.'
        },
        {
          title: 'Liên kết Phân tử',
          desc: 'Chúng tôi nghiên cứu sâu các liên kết nhựa acrylic tinh khiết, tối ưu hóa độ dày màng sơn để đảm bảo khả năng thở tự nhiên của tường nhà.'
        },
        {
          title: 'Bảo vệ Sinh thái',
          desc: 'Từng giọt sơn được kiểm định nghiêm ngặt theo các tiêu chuẩn sinh thái toàn cầu, loại bỏ hoàn toàn VOC độc hại và mùi dung môi.'
        }
      ]
    },
    {
      title: 'Chế tác & Tinh lọc',
      description: 'Chuyển hóa những nghiên cứu tỉ mỉ trong phòng thí nghiệm thành những mẻ sơn đồng nhất, chính xác bằng dây chuyền tự động hóa khép kín.',
      subSteps: [
        {
          title: 'Phân rã Sắc tố',
          desc: 'Các hạt màu siêu mịn được phân tán trong môi trường lỏng với tốc độ cao, đảm bảo phân bổ đồng đều và không lắng cặn theo thời gian.'
        },
        {
          title: 'Hội tụ Nhựa bảo vệ',
          desc: 'Hòa quyện cốt màu cùng màng nhựa acrylic dẻo vai, tích hợp các hoạt chất chống tia cực tím UV và tăng cường độ liên kết màng.'
        },
        {
          title: 'Hiệu chuẩn Quang phổ',
          desc: 'Hệ thống đo quang phổ kỹ thuật số kiểm soát độ lệch màu cực nhỏ (dưới 0.2 Delta-E), mang đến sự nhất quán sắc màu tuyệt đối.'
        }
      ]
    },
    {
      title: 'Thử thách Thời gian',
      description: 'Trước khi rời xưởng, mỗi mẻ sơn đều phải trải qua những bài kiểm tra giả lập thời tiết khắc nghiệt để bảo chứng cho độ bền bỉ hàng thập kỷ.',
      subSteps: [
        {
          title: 'Mài mòn & Chùi rửa',
          desc: 'Màng sơn được chà sát liên tục hàng vạn lần để đảm bảo khả năng chống xước và dễ lau chùi trước mọi tác động sinh hoạt.'
        },
        {
          title: 'Giả lập Nắng mưa',
          desc: 'Bề mặt phủ được chiếu tia cực tím cường độ cao xen kẽ phun sương ẩm, đảm bảo sơn không bong tróc hay phai màu dưới khí hậu nhiệt đới.'
        },
        {
          title: 'Kiểm soát Dòng chảy',
          desc: 'Đo lường độ nhớt bằng thiết bị chuyên dụng để lớp sơn đạt độ tự san phẳng hoàn hảo, dễ thi công và không chảy giọt.'
        }
      ]
    },
    {
      title: 'Đồng hành & Chuyển giao',
      description: 'Chúng tôi không chỉ bán sơn; GAMA đồng hành cùng người thợ và chủ nhà từ khâu mở nắp đến khi màng sơn hoàn toàn khô mịn trên tường.',
      subSteps: [
        {
          title: 'Đóng gói Kín khí',
          desc: 'Sơn được niêm phong trong bao bì chịu lực, chống oxy hóa, giữ nguyên độ tươi mới và kéo dài thời gian lưu kho tự nhiên.'
        },
        {
          title: 'Vận chuyển An toàn',
          desc: 'Hệ thống kho vận điều hòa nhiệt độ tối ưu, đưa từng thùng sơn nguyên vẹn chất lượng tới trực tiếp chân công trình.'
        },
        {
          title: 'Hỗ trợ Kỹ thuật Hiện trường',
          desc: 'Chuyên gia GAMA trực tiếp hướng dẫn thi công, đo độ ẩm tường, tư vấn kỹ thuật phun sơn không khí và thời gian khô tiêu chuẩn.'
        }
      ]
    }
  ];

  const getSubstepIcon = (tabIdx: number, idx: number) => {
    if (tabIdx === 0) {
      if (idx === 0) return <FlaskConical className="w-5 h-5 text-[#0A4E35]" />;
      if (idx === 1) return <Droplets className="w-5 h-5 text-[#0A4E35]" />;
      return <ClipboardCheck className="w-5 h-5 text-[#0A4E35]" />;
    }
    if (tabIdx === 1) {
      if (idx === 0) return <Layers className="w-5 h-5 text-[#0A4E35]" />;
      if (idx === 1) return <Paintbrush className="w-5 h-5 text-[#0A4E35]" />;
      return <Eye className="w-5 h-5 text-[#0A4E35]" />;
    }
    if (tabIdx === 2) {
      if (idx === 0) return <Shield className="w-5 h-5 text-[#0A4E35]" />;
      if (idx === 1) return <Sparkles className="w-5 h-5 text-[#0A4E35]" />;
      return <RefreshCw className="w-5 h-5 text-[#0A4E35]" />;
    }
    // Support tab
    if (idx === 0) return <FileText className="w-5 h-5 text-[#0A4E35]" />;
    if (idx === 1) return <Truck className="w-5 h-5 text-[#0A4E35]" />;
    return <HardHat className="w-5 h-5 text-[#0A4E35]" />;
  };

  return (
    <section className="py-32 bg-[#EEF5ED]/40 border-y border-[#B48F57]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
            • TIẾN TRÌNH CHẾ TÁC
          </span>
          <h2 className="text-3xl sm:text-[44px] font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.1] mb-4">
            Từ phân tử khoa học đến hơi thở tổ ấm, chúng tôi dệt nên lớp phủ bền bỉ vĩnh cửu.
          </h2>
        </div>

        {/* Horizontal Process Nav Selection inside rounded block */}
        <div className="flex justify-between items-center max-w-4xl mx-auto border border-[#0A4E35]/20 bg-white p-2 rounded-full mb-20 shadow-sm overflow-x-auto gap-2">
          {processData.map((step, idx) => (
            <button
              key={step.title}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] text-center py-3.5 px-6 rounded-full text-[14px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#0A4E35] text-white shadow-md shadow-[#0a4e35]/10'
                  : 'text-[#0A4E35]/75 hover:bg-[#EEF5ED] hover:text-[#0A4E35]'
              }`}
            >
              {idx + 1}. {step.title}
            </button>
          ))}
        </div>

        {/* Process Roadmap Visual Node Routing */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
            >
              {/* Connecting roadmap line background */}
              <div className="absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-[#B48F57]/30 hidden md:block z-0" />

              {processData[activeTab].subSteps.map((sub, idx) => (
                <div key={sub.title} className="flex flex-col items-center md:items-start text-center md:text-left z-10 group">
                  {/* Circle Indicator Node */}
                  <div className="w-[80px] h-[80px] rounded-full bg-white border-2 border-[#B48F57] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:border-[#0A4E35] transition-all duration-300">
                    <div className="w-[50px] h-[50px] rounded-full bg-[#EEF5ED] flex items-center justify-center">
                      {getSubstepIcon(activeTab, idx)}
                    </div>
                  </div>

                  {/* Substep Title */}
                  <h4 className="font-sans font-extrabold text-[#0A4E35] text-lg sm:text-xl mb-3">
                    {sub.title}
                  </h4>

                  {/* Substep Description */}
                  <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed max-w-sm">
                    {sub.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
