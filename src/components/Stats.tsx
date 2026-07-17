import React from 'react';

interface StatsProps {
  data?: {
    title?: string;
    clients?: Array<{
      name: string;
      category?: string;
    }>;
  } | null;
}

const DEFAULT_CLIENTS = [
  { name: 'City Land Garden Hills', category: 'Cung cấp Sơn & Sứ vệ sinh' },
  { name: 'Topaz Home 1', category: 'Cung cấp Sơn phủ ngoại thất' },
  { name: 'Topaz Elite', category: 'Cung cấp Sơn & Thiết bị vệ sinh' },
  { name: 'Khu Đô Thị Bình An (Thủ Đức)', category: 'Sơn lót chống kiềm' },
  { name: 'Bảy Hiền Tower', category: 'Cung cấp Thiết bị phòng tắm' },
  { name: 'Văn Phòng 339 Điện Biên Phủ', category: 'Sơn phủ kiến trúc cao cấp' },
  { name: 'Golden Island', category: 'Sơn phủ & Chống thấm màu' },
  { name: 'Đại Học CNTT Thủ Đức', category: 'Sơn phủ bảo vệ & Chống thấm' },
  { name: 'Big C Đà Lạt', category: 'Vật tư sơn chống rêu mốc' },
  { name: 'Nhà Xưởng Jinyu', category: 'Bột trét & Sơn lót ngoại thất' },
  { name: 'Big C An Lạc', category: 'Sơn chống thấm đa năng' },
  { name: 'Big C Tân Hiệp', category: 'Thiết bị vệ sinh đồng bộ' },
  { name: 'Big C Quy Nhơn', category: 'Sơn phủ ngoài trời chịu nhiệt' }
];

export default function Stats({ data }: StatsProps = {}) {
  const clients = data?.clients && data.clients.length > 0 ? data.clients : DEFAULT_CLIENTS;
  const title = data?.title ?? '• CÁC DỰ ÁN TIÊU BIỂU & ĐỐI TÁC KIẾN TRÚC';

  // Double list to create a seamless infinite loop visual effect
  const tickerItems = [...clients, ...clients];

  return (
    <div className="flex flex-col">
      {/* Our Clients Ticker Ribbon */}
      <section className="py-20 bg-[#EEF5ED]/30 border-b border-gray-150/70 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block text-center sm:text-left font-sans">
            {title}
          </span>
        </div>

        {/* Ticker Container with scroll animation */}
        <div className="relative flex w-full overflow-x-hidden">
          <div className="flex gap-16 items-center animate-[scroll_35s_linear_infinite] whitespace-nowrap min-w-full">
            {tickerItems.map((cli, idx) => (
              <div key={idx} className="flex flex-col items-start px-6 shrink-0 group">
                <span className="font-sans font-extrabold text-[#0A4E35]/85 text-xl tracking-wide group-hover:text-[#0A4E35] transition-colors">
                  {cli.name}
                </span>
                <span className="text-[10px] font-sans font-bold text-[#B48F57] uppercase tracking-wider">
                  {cli.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom scroll style inline */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    </div>
  );
}
