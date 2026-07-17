"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Sparkles,
  Droplets,
  Users,
  Building,
  Factory,
  Award,
  MapPin,
  ExternalLink,
  Heart,
  Compass,
  FileCheck2,
  BookOpen,
  Eye,
  History,
  Workflow,
  ShieldCheck,
  FileText,
  Check,
  X,
  QrCode,
  Activity,
  Home,
  Grid,
  ArrowUpRight
} from 'lucide-react';

export default function About() {
  const [activeTimelineYear, setActiveTimelineYear] = useState('2021');
  const [activeTabSection, setActiveTabSection] = useState<'factories' | 'certifications'>('factories');
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const timeline = [
    {
      year: '2021',
      title: 'Thành lập Tập Đoàn GAMA',
      desc: 'Ngày 16/03/2021, Công ty TNHH Tập Đoàn Gama chính thức được thành lập, đặt nền móng cho sứ mệnh sản xuất và kinh doanh sơn nước, thiết bị vệ sinh chất lượng cao với tôn chỉ "Đặt chữ tín trên lợi nhuận".'
    },
    {
      year: 'Đầu 2021',
      title: 'Mở rộng văn phòng & kho bãi',
      desc: 'Thiết lập văn phòng và hệ thống kho bãi quy mô lớn tại TP. Hồ Chí Minh. Đồng thời nhanh chóng mở rộng mạng lưới phân phối và chi nhánh tới Huế, Đà Nẵng, Buôn Mê Thuột (Đắk Lắk) và Bình Thuận để phục vụ khách hàng hiệu quả.'
    },
    {
      year: '2022',
      title: 'Ra mắt thương hiệu Sơn nước GAMA',
      desc: 'Chính thức ra mắt thị trường dòng sản phẩm sơn nước GAMA chất lượng cao đạt chứng nhận chuẩn quốc tế, nhận được sự hoan nghênh nồng nhiệt từ khách hàng, nhà phân phối và đại lý trên cả nước.'
    },
    {
      year: '2023 - 2024',
      title: 'Chiến lược phát triển & Đa dạng hóa',
      desc: 'Đẩy mạnh đầu tư vào nguồn nhân lực chất lượng cao, đa dạng hóa dải sản phẩm sơn nước & thiết bị vệ sinh, đồng thời củng cố uy tín vững chắc với các chủ đầu tư, kiến trúc sư và nhà thầu dự án lớn.'
    }
  ];

  const subsidiaries = [
    {
      name: 'Phân khúc Sơn nước GAMA',
      role: 'Sản xuất & Nghiên cứu Vật liệu Phủ',
      desc: 'Chuyên cung cấp các giải pháp sơn đa dạng, bao gồm sơn nội thất, sơn ngoại thất, sơn trang trí và sơn chống thấm ứng dụng công nghệ màng liên kết acrylic "core-shell" tiên tiến.',
      link: 'gamagroup.com.vn'
    },
    {
      name: 'Phân khúc Thiết bị vệ sinh GAMA',
      role: 'Phân phối Thiết bị phòng tắm & Nhà bếp',
      desc: 'Phân phối chính hãng các sản phẩm thiết bị vệ sinh cao cấp bao gồm bồn cầu một khối, bồn tiểu nam, tủ chậu lavabo, sen vòi và phụ kiện từ GAMA, TOTO, INAX, VIGLACERA...',
      link: 'gamagroup.com.vn'
    },
    {
      name: 'Mạng lưới Kho vận & Phân phối',
      role: 'Hệ thống vận chuyển & Kho bãi toàn quốc',
      desc: 'Vận hành hệ thống xe giao hàng cơ động cùng các kho trung chuyển lớn tại Hồ Chí Minh, Huế, Đà Nẵng, Bình Thuận, Đắk Lắk đảm bảo đáp ứng nhanh chóng mọi công trình.'
    }
  ];

  const factories = [
    {
      name: 'Trụ sở & Showroom chính Hồ Chí Minh',
      address: '54/6E, Ấp Tiền Lân, Xã Bà Điểm, Huyện Hóc Môn, Thành Phố Hồ Chí Minh',
      capacity: 'Quy mô nhà máy > 1000m2',
      spec: 'Nơi trưng bày đầy đủ các bộ sưu tập thiết bị vệ sinh cao cấp và kho phân phối sơn GAMA lớn nhất khu vực phía Nam.'
    },
    {
      name: 'Chi nhánh & Kho bãi Miền Trung',
      address: 'Thành phố Huế & Thành phố Đà Nẵng',
      capacity: 'Kho trung chuyển vùng',
      spec: 'Điểm cung ứng vật tư xây dựng, sơn nước và thiết bị vệ sinh nhanh chóng cho toàn bộ các công trình duyên hải miền Trung.'
    },
    {
      name: 'Chi nhánh Tây Nguyên & Nam Trung Bộ',
      address: 'Thành phố Buôn Mê Thuột (Đắk Lắk) & Tỉnh Bình Thuận',
      capacity: 'Chi nhánh chiến lược',
      spec: 'Mở rộng mạng lưới đại lý phân phối, đảm bảo vận tải cơ động sơn nước và sứ vệ sinh đến các công trình cao nguyên và ven biển.'
    }
  ];

  const certifications = [
    {
      id: 'qcvn',
      standard: 'QCVN 16:2023/BXD',
      title: 'Chứng nhận hợp quy vật liệu xây dựng (Sơn tường nhũ tương)',
      issuer: 'Công ty Cổ phần Chứng nhận Quốc tế (ICB)',
      certificateNo: '250287.PRO.CN25.01',
      issueDate: '28/04/2025',
      expiryDate: '27/04/2028',
      desc: 'Chứng nhận chất lượng sản phẩm sơn tường nhũ tương GAMA phù hợp tuyệt đối Quy chuẩn kỹ thuật quốc gia của Bộ Xây dựng Việt Nam.',
      highlights: [
        { label: 'Quy chuẩn kỹ thuật', value: 'QCVN 16:2023/BXD' },
        { label: 'Phương thức', value: 'Phương thức 5 (Thông tư 28/2012/TT-BKHCN)' },
        { label: 'Áp dụng cho', value: '22 chủng loại sơn tường nhũ tương GAMA' }
      ],
      details: [
        'Được phép sử dụng dấu hợp quy (CR) chính thức trực tiếp trên sản phẩm và bao bì chứa sản phẩm.',
        'Bảo chứng chất lượng an toàn cho sức khỏe và công trình, do ICB đánh giá giám sát định kỳ hàng năm.',
        'Hệ thống sản phẩm đạt quy chuẩn bao gồm cả sơn nội thất, ngoại thất, sơn lót kháng kiềm, chống thấm và dòng sơn trang trí cao cấp GAMA.'
      ],
      director: 'Nguyễn Thanh Tùng (Giám đốc ICB)',
      registryCode: 'QCVN 16:2023/BXD',
      approvedProducts: [
        'Sơn cao cấp nội thất láng mịn G10',
        'Sơn cao cấp nội thất màu tươi sáng G11 Plus+',
        'Sơn cao cấp nội thất dễ lau chùi G12 Plus+',
        'Sơn cao cấp nội thất bóng 5 in 1 G13 Plus+',
        'Sơn cao cấp nội thất siêu bóng 7 in 1 G14 Plus+',
        'Sơn cao cấp nội thất trần nhà siêu trắng G15 Plus+',
        'Sơn cao cấp nội thất bóng mờ G16 Plus+',
        'Sơn lót nội thất cao cấp G20 Plus+',
        'Sơn lót nội thất chống kiềm hóa G21 Plus+',
        'Sơn cao cấp ngoại thất láng mịn G30',
        'Sơn cao cấp ngoại thất màu tươi sáng G31 Plus+',
        'Sơn cao cấp ngoại thất bóng men sứ G32 Plus+',
        'Sơn cao cấp ngoại thất siêu bóng nano 7 in 1 G33 Plus+',
        'Sơn cao cấp ngoại thất bóng mờ G34 Plus+',
        'Sơn lót ngoại thất cao cấp G40 Plus+',
        'Sót lót ngoại thất chống kiềm hóa G41 Plus+',
        'Sơn cao cấp chống thấm màu sắc đa dạng G51 Plus+',
        'Sơn cao cấp chống thấm màu bóng mờ G53 Plus+',
        'Sơn cao cấp chống thấm đa năng trộn xi măng G50 Plus+',
        'Sơn cao cấp chống thấm G54 Plus+',
        'Sơn cao cấp chống nóng chống ồn G52',
        'Sơn cao cấp sơn nhũ ánh đồng G61 Plus+'
      ]
    },
    {
      id: 'iso',
      standard: 'ISO 9001:2015',
      title: 'Hệ thống Quản lý Chất lượng Tiêu chuẩn Quốc tế',
      issuer: 'Tổ chức Chứng nhận KNA Cert (KNA Certification Co., Ltd.)',
      certificateNo: 'KAC25/0037',
      issueDate: '16/06/2026',
      firstCertifiedDate: '04/04/2025',
      expiryDate: '03/04/2028',
      desc: 'Đánh giá và chứng nhận Hệ thống Quản lý Chất lượng của Công ty TNHH Tập Đoàn Gama đạt chuẩn mực quốc tế cao cấp nhất.',
      highlights: [
        { label: 'Mã số thuế', value: '0316752013' },
        { label: 'Tiêu chuẩn quốc tế', value: 'ISO 9001:2015' },
        { label: 'Phạm vi áp dụng', value: 'Sản xuất Sơn & Thương mại TBVS' }
      ],
      details: [
        'Chứng nhận hệ thống quản lý chuẩn hóa toàn diện cho việc Sản xuất và Thương mại các sản phẩm sơn GAMA.',
        'Phạm vi bao hàm hoạt động Thương mại các sản phẩm Thiết bị vệ sinh, Vật liệu xây dựng và Điện gia dụng GAMA.',
        'Chứng chỉ được công nhận quốc tế rộng rãi dưới sự bảo chứng của diễn đàn công nhận đa phương IAF.'
      ],
      director: 'Phạm Minh Luân (Tổng Giám đốc KNA)',
      registryCode: 'ISO 9001:2015'
    },
    {
      id: 'labtest',
      standard: 'KẾT QUẢ THỬ NGHIỆM SƠN (LAS 1753)',
      title: 'Kết quả thử nghiệm chất lượng màng sơn GAMA thực tế',
      issuer: 'Phòng thí nghiệm kiểm định xây dựng LAS 1753 (ICB)',
      certificateNo: '250287.PRO.CN25 (Hồ sơ kiểm định mẫu)',
      issueDate: '27/04/2025',
      expiryDate: 'Giá trị kỹ thuật đi liền chứng nhận hợp quy',
      desc: 'Phiếu kết quả thử nghiệm độc lập màng sơn GAMA thực tế đạt hiệu năng vật lý đỉnh cao và an toàn sức khỏe sinh thái ưu việt.',
      highlights: [
        { label: 'Độ bám dính cắt ô', value: 'Loại 1 (TCVN 2097:2015)' },
        { label: 'Độ bền rửa trôi', value: 'Đạt > 1200 chu kỳ (TCVN 8653-4:2024)' },
        { label: 'Kháng sốc nhiệt nóng lạnh', value: 'Đạt > 50 chu kỳ (TCVN 8653-5:2024)' }
      ],
      details: [
        'Độ bền bám dính đạt Loại 1 (mức tối ưu nhất): Đảm bảo màng sơn bám dính siêu chắc, không bong tróc trước độ ẩm tường.',
        'Độ bền rửa trôi xuất sắc vượt qua 1200 chu kỳ cọ rửa cơ học liên tục, chống bụi bẩn bám dính màng sơn vượt trội.',
        'Khả năng chống nứt nẻ sốc nhiệt hoàn hảo vượt qua 50 chu kỳ nóng lạnh khắc nghiệt, chống chọi hoàn hảo khí hậu nhiệt đới.',
        'Hàm lượng hợp chất hữu cơ bay hơi (VOC) cực thấp (dao động chỉ từ 15,8 g/l đến 23,5 g/l theo chuẩn TCVN 10370-2:2014), cam kết bảo vệ lá phổi và sức khỏe người dùng.'
      ],
      director: 'Lê Thuận Sơn (Trưởng phòng TN) & Nguyễn Thanh Tùng',
      tester: 'Nguyễn Thế Quỳnh (Thử nghiệm viên)',
      registryCode: 'LAS 1753'
    },
    {
      id: 'registration',
      standard: 'ĐĂNG KÝ DOANH NGHIỆP',
      title: 'Giấy chứng nhận đăng ký doanh nghiệp GAMA GROUP',
      issuer: 'Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh',
      certificateNo: 'Mã số doanh nghiệp: 0316752013',
      issueDate: '08/04/2025 (Thay đổi lần thứ 7)',
      firstCertifiedDate: '16/03/2021 (Đăng ký lần đầu)',
      expiryDate: 'Bảo chứng pháp lý vô thời hạn',
      desc: 'Hồ sơ pháp lý hợp pháp khẳng định năng lực tài chính vững mạnh và hoạt động chính quy tuân thủ pháp luật của GAMA GROUP.',
      highlights: [
        { label: 'Vốn điều lệ đăng ký', value: '5.000.000.000 VNĐ' },
        { label: 'Đại diện pháp luật', value: 'Ông Lê Minh Hiếu (Giám đốc)' },
        { label: 'Thành viên sáng lập', value: 'Lê Minh Hiếu (86%), Nguyễn Đình Thuận (14%)' }
      ],
      details: [
        'Vốn điều lệ 5 tỷ đồng thực chất, minh chứng cho năng lực thực hiện và bảo lãnh các hợp đồng dự án quy mô lớn toàn quốc.',
        'Đăng ký kinh doanh chính quy, hoạt động chuẩn mực theo Giấy chứng nhận Đăng ký doanh nghiệp số 0316752013 do Phòng ĐKKD TP. Hồ Chí Minh cấp.',
        'Trụ sở chính hợp pháp tại 25/15 Văn Cao, Phường Phú Thạnh, Quận Tân Phú, TP. Hồ Chí Minh; Cơ sở xưởng sản xuất quy mô tại Huyện Hóc Môn.'
      ],
      director: 'Võ Thành Thơ (Trưởng phòng Đăng ký kinh doanh ký duyệt)',
      registryCode: '0316752013'
    }
  ];

  const leadership = [
    {
      name: 'Ông Lê Minh Hiếu',
      role: 'Giám đốc Điều hành (CEO)',
      credentials: 'Người đại diện pháp luật Tập đoàn GAMA',
      desc: 'Người sáng lập dẫn dắt sự phát triển vượt bậc của GAMA, tiên phong trong chiến lược đa dạng hóa hệ sinh thái sản phẩm sơn và thiết bị vệ sinh cao cấp.'
    },
    {
      name: 'Bà Nguyễn Thị Kim Tiền',
      role: 'Giám đốc Nhân sự',
      credentials: 'Ban Lãnh đạo Tập đoàn GAMA',
      desc: 'Chịu trách nhiệm kiến tạo văn hóa doanh nghiệp kỷ luật, tận tâm và đổi mới; xây dựng đội ngũ kỹ sư hóa chất và kỹ thuật viên trình độ cao.'
    },
    {
      name: 'GAMA R&D',
      role: 'Nghiên cứu & Phát triển',
      credentials: 'Phòng nghiên cứu polymer GAMA',
      desc: 'Đội ngũ chuyên gia hóa vật liệu chịu trách nhiệm nghiên cứu ứng dụng nhựa acrylic tiên tiến, công nghệ liên kết chéo "cross-linking" chống phai màu màu sắc.'
    }
  ];

  return (
    <section className="bg-slate-50 min-h-screen text-slate-800 selection:bg-[#0A4E35]/10 selection:text-[#0A4E35]">

      {/* 1. EDITORIAL HERO GREETING */}
      <div className="bg-white border-b border-slate-100 py-32 sm:py-40 relative overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-100" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-100" />
          <div className="absolute left-0 right-0 top-1/3 h-px bg-slate-100" />
          <div className="absolute left-0 right-0 top-2/3 h-px bg-slate-100" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B48F57]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#B48F57]">
                  Tâm Hồn & Khoa Học Của GAMA
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight leading-[1.1] mb-6 effect-font-styling effect-font-gama">
                CÔNG TY TNHH TẬP ĐOÀN GAMA<br />
                <span className="text-[#B48F57] font-sans text-lg sm:text-2xl block mt-3 font-medium tracking-wide">
                  GAMA GROUP COMPANY LIMITED
                </span>
              </h1>

              <p className="text-[#0A4E35]/90 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mb-8 font-light">
                Chúng tôi không chỉ là nhà sản xuất vật liệu; chúng tôi là đối tác đồng hành kiến tạo những không gian sống an lành, kiên cố. Với quy mô nhà máy sản xuất hơn 1000m2 và định hướng kinh doanh "Đặt chữ tín trên lợi nhuận", GAMA không ngừng nghiên cứu các dòng sơn nước kháng kiềm, chống thấm vượt trội và phân phối những hệ thống thiết bị vệ sinh sang trọng, bảo vệ trọn vẹn chất lượng sống và nâng niu hơi thở của gia đình bạn.
              </p>

              {/* Official Channels Block */}
              <div className="bg-[#EEF5ED] border border-[#0A4E35]/10 rounded-2xl p-6 max-w-3xl">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#0A4E35]" />
                  <span className="text-[10px] font-mono font-bold uppercase text-[#0A4E35] tracking-wider">
                    Thông tin liên hệ chính thức tập đoàn GAMA
                  </span>
                </div>
                <p className="text-xs text-[#0A4E35]/80 leading-relaxed mb-4 font-light">
                  Công ty TNHH Tập Đoàn Gama vận hành hệ thống kho bãi, chi nhánh phân phối đồng bộ từ Bắc vào Nam. Để nhận báo giá dự án, hồ sơ kỹ thuật hoặc kết nối đại lý chính hãng, quý khách hàng vui lòng liên hệ qua các kênh chính thống:
                </p>
                <div className="flex flex-wrap gap-5 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#0A4E35]">
                    <span>Hotline Sơn GAMA: 089.66.77.866</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#0A4E35]">
                    <span>Hotline Sứ vệ sinh: 0902.949.946</span>
                  </span>
                  <a
                    href="mailto:contacts@gama.vn"
                    className="inline-flex items-center gap-1.5 font-bold text-[#B48F57] hover:text-[#0A4E35] transition-colors"
                  >
                    <span>Email: contacts@gama.vn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-8 border border-slate-200/80 flex flex-col gap-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200 pb-3">
                // SỐ LIỆU NĂNG LỰC GAMA
              </span>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#0A4E35]">1000m²</span>
                  <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block mt-1">Diện tích sản xuất</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#0A4E35]">5+</span>
                  <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block mt-1">Chi nhánh lớn</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#0A4E35]">ISO 9k1</span>
                  <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block mt-1">Hệ thống chất lượng</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif font-bold text-[#0A4E35]">Hợp quy</span>
                  <span className="text-[10px] uppercase font-sans font-semibold text-slate-400 block mt-1">QCVN 16 Bộ XD</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 mt-2 flex items-center justify-between text-xs font-mono text-[#0A4E35]">
                <span>Hệ thống phân phối: Sẵn sàng</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. REACH TO THE HEART: THE SOUL OF GAMA (MISSION, VISION, CORE VALUES & ORIGIN STORY) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 sm:py-40 border-b border-slate-200/60 bg-white rounded-b-[48px] shadow-md relative z-20 -mt-12">

        {/* Poetic Quote block */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <Heart className="w-6 h-6 text-[#B48F57] mx-auto mb-6 animate-pulse" />
          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#0A4E35] leading-relaxed">
            "Một ngôi nhà không chỉ là gạch đá và bê tông. Đó là nơi lưu giữ những ký ức, những giấc mơ và những khoảnh khắc bình yên nhất của một gia đình. Chế tạo nên một màu sơn là nâng niu bức tranh cuộc sống của con người."
          </blockquote>
          <p className="text-xs font-mono uppercase tracking-widest text-[#B48F57] mt-4">— Tuyên ngôn lập nghiệp, 1994</p>
        </div>

        {/* Vision & Mission bento cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">

          <div className="bg-slate-50 rounded-[32px] p-8 sm:p-12 border border-slate-150 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute right-6 top-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Eye className="w-32 h-32 text-[#0A4E35]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">TẦM NHÌN SỨ MỆNH</span>
              <h3 className="font-serif font-extrabold text-[#0A4E35] text-2xl sm:text-3xl mb-4 leading-tight">
                Những bức tường chứng nhân lịch sử
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Chúng tôi hướng tới một tương lai nơi các công trình kiến trúc không bị suy tàn dưới những cơn mưa bão hay phai mờ trước cái nắng thiêu đốt. Chúng tôi kiến tạo một thế giới nơi những mái ấm luôn bền bỉ cùng thời gian, đứng vững rực rỡ, lành mạnh và an toàn qua nhiều thế hệ, không bị ảnh hưởng bởi sự bào mòn của năm tháng.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200/60 text-xs font-mono text-[#B48F57]">
              🛡️ Chỉ số bảo vệ di sản: Đảm bảo 100%
            </div>
          </div>

          <div className="bg-[#0A4E35] text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden group flex flex-col justify-between shadow-lg">
            <div className="absolute right-6 top-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Compass className="w-32 h-32 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">SỨ MỆNH THIÊNG LIÊNG</span>
              <h3 className="font-serif font-extrabold text-[#EEF5ED] text-2xl sm:text-3xl mb-4 leading-tight">
                Sự bảo vệ khoa học không thỏa hiệp
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                Kết hợp sự nghiêm ngặt về mặt toán học của khoa học vật liệu với hơi ấm dịu dàng của tổ ấm gia đình. Chúng tôi cam kết nghiên cứu các chất phủ 100% không dung môi, chống cháy, bảo vệ lá phổi non nớt của trẻ thơ bên trong, bảo vệ tòa nhà khỏi sự hủy hoại của môi trường và tôn vinh công lao thầm lặng của những người thợ xây.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-xs font-mono text-[#B48F57]">
              🌱 Đạt chuẩn bảo vệ sinh thái Eco-Shield
            </div>
          </div>

        </div>

        {/* Human story & origin (Reach to the heart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#B48F57]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B48F57]">
                CÂU CHUYỆN GAMA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] leading-snug">
              Sinh ra từ mưa bão, kết tinh bằng sự tận hiến
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Vào mùa hè nóng nực năm 1994, người sáng lập của chúng tôi - khi đó là một nhà nghiên cứu trẻ - đứng trước một ngôi trường mới hoàn thành ở miền Nam Việt Nam. Chưa đầy sáu tháng dưới cái nắng cháy da và những cơn mưa rào trút xuống, bề mặt sơn của ngôi trường đã bị phấn hóa, phồng rộp và bong tróc từng mảng. Học sinh bên trong phải hít thở mùi hóa chất nồng nặc từ loại sơn dung môi giá rẻ.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Chính lúc đó ông nhận ra: sơn không phải là một món hàng thông thường. Đó là ranh giới sinh học. Đó là lớp lá chắn ngăn cách cuộc sống gia đình với thời tiết khắc nghiệt bên ngoài, và định hình chất lượng không khí trong không gian học tập.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Ông đã tập hợp ba nhà hóa học trong một xưởng nhỏ. Từ bỏ formaldehyde độc hại và dung môi hóa học, họ bắt đầu pha chế các polymer gốc nước an toàn. Họ đặt tên cho liên doanh là <strong>GAMA</strong> — tượng trưng cho những tia sáng bảo vệ của sự chính xác khoa học. Qua ba mươi năm phát triển, chúng tôi chưa bao giờ quên ngôi trường ban đầu đó. Đó là lý do GAMA vẫn trực tiếp kiểm tra từng công trình lớn tại hiện trường, đảm bảo hóa học của chúng tôi phù hợp hoàn hảo với độ ẩm và cuộc sống thực tế của cộng đồng.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 sm:p-10 flex flex-col gap-8 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-xs font-mono text-[#B48F57] uppercase tracking-wider select-none">
                // CAM KẾT TỪ GAMA
              </div>

              <div className="flex flex-col gap-5">
                <div className="w-10 h-10 rounded-full bg-[#B48F57]/15 flex items-center justify-center text-[#B48F57]">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0A4E35]">
                  Ba trụ cột hóa học từ trái tim
                </h4>

                <ul className="flex flex-col gap-5 text-xs sm:text-sm text-slate-600 font-light">
                  <li className="flex gap-3">
                    <span className="font-mono text-[#B48F57] font-bold">I.</span>
                    <div>
                      <strong className="font-sans font-bold text-[#0A4E35] block">Hơi thở an lành</strong>
                      Chúng tôi cam kết không có trẻ em hay người thợ sơn nào phải hít khói độc hại từ sản phẩm GAMA. Công thức không dung môi là ranh giới thiêng liêng của chúng tôi.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[#B48F57] font-bold">II.</span>
                    <div>
                      <strong className="font-sans font-bold text-[#0A4E35] block">Gìn giữ thời gian</strong>
                      Chúng tôi xây dựng cho những chu kỳ dài hạn. Công thức của chúng tôi chống phai màu hơn mười lăm năm, tôn trọng ngân sách xây dựng của các chủ đầu tư và giúp chủ nhà tiết kiệm chi phí sửa chữa vô tận.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[#B48F57] font-bold">III.</span>
                    <div>
                      <strong className="font-sans font-bold text-[#0A4E35] block">Tôn trọng kiến trúc</strong>
                      Chúng tôi không thiết kế chất phủ để che giấu khuyết điểm. Sơn GAMA được tổng hợp để phản chiếu ánh sáng ban ngày một cách đẹp mắt, tôn vinh chất liệu thực tế của đá, bê tông và gỗ.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* OUR BUSINESSES SECTION (AKZONOBEL-STYLE) */}
      <div id="our-businesses-section" className="bg-white py-32 border-b border-slate-200/60 relative z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">

          {/* Section Header */}
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#B48F57] block mb-3">
              • PHÂN KHÚC HOẠT ĐỘNG // OUR BUSINESSES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-tight mb-6">
              Các phân khúc kinh doanh cốt lõi của GAMA Group
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed font-light">
              Tương tự như mô hình phát triển bền vững và tập trung chất lượng vượt trội của AkzoNobel, GAMA Group tổ chức cơ cấu vận hành xoay quanh 3 lĩnh vực then chốt. Chúng tôi mang đến cho khách hàng sự kết hợp hoàn hảo giữa công nghệ màng phủ tiên tiến, thiết bị vệ sinh sang trọng đạt chuẩn quốc tế, và gương thông minh tinh tế cho mỗi không gian sống.
            </p>
          </div>

          {/* Business Units Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Business Unit 1: Paints & Coatings */}
            <div className="bg-slate-50 rounded-[32px] p-8 sm:p-10 border border-slate-200 hover:border-[#B48F57]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#EEF5ED] rounded-2xl flex items-center justify-center mb-8 border border-[#0A4E35]/10 text-[#0A4E35]">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">Paints & Coatings</span>
                <h3 className="font-serif font-extrabold text-[#0A4E35] text-2xl mb-4 group-hover:text-[#B48F57] transition-colors duration-300">
                  Sơn trang trí & Chất phủ kiến trúc
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  Phát triển các giải pháp bảo vệ và trang trí bề mặt công trình vượt trội. Ứng dụng các công nghệ polyme tiên tiến thân thiện với môi trường, đáp ứng các tiêu chuẩn khắt khe về độ bền thời tiết và an toàn sức khỏe cho các công trình dân dụng và công nghiệp quy mô lớn.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#B48F57] font-bold bg-[#FAF5EE] px-2.5 py-1 rounded border border-[#B48F57]/20 uppercase">DECORATIVE PAINTS DIVISION</span>
                <span className="text-slate-400 group-hover:text-[#B48F57] transition-colors"><ArrowUpRight className="w-5 h-5" /></span>
              </div>
            </div>

            {/* Business Unit 2: Sanitaryware */}
            <div className="bg-slate-50 rounded-[32px] p-8 sm:p-10 border border-slate-200 hover:border-[#B48F57]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-[#FAF5EE] rounded-2xl flex items-center justify-center mb-8 border border-[#B48F57]/10 text-[#B48F57]">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">Premium Sanitaryware</span>
                <h3 className="font-serif font-extrabold text-[#0A4E35] text-2xl mb-4 group-hover:text-[#B48F57] transition-colors duration-300">
                  Thiết bị vệ sinh & Giải pháp phòng tắm
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  Cung cấp các giải pháp thiết bị phòng tắm đồng bộ cao cấp và tiết kiệm nước thông minh. Tích hợp công nghệ sứ nung nhiệt độ cao phủ men nano tự kháng khuẩn, kiến tạo không gian sống tiện nghi, thư giãn và mang tính thẩm mỹ bền vững với thời gian.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#B48F57] font-bold bg-[#FAF5EE] px-2.5 py-1 rounded border border-[#B48F57]/20 uppercase">BATHROOM SOLUTIONS DIVISION</span>
                <span className="text-slate-400 group-hover:text-[#B48F57] transition-colors"><ArrowUpRight className="w-5 h-5" /></span>
              </div>
            </div>

            {/* Business Unit 3: Smart Mirrors & Accessories */}
            <div className="bg-slate-50 rounded-[32px] p-8 sm:p-10 border border-slate-200 hover:border-[#B48F57]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 text-[#0A4E35]">
                  <Grid className="w-6 h-6 text-[#B48F57]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">Smart Accessories</span>
                <h3 className="font-serif font-extrabold text-[#0A4E35] text-2xl mb-4 group-hover:text-[#B48F57] transition-colors duration-300">
                  Phụ kiện kiến trúc & Gương thông minh
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light mb-6">
                  Đột phá trong việc nghiên cứu và ứng dụng công nghệ gương thông minh tích hợp sấy phá sương, cảm ứng tự động và các hệ phụ kiện kim khí inox SUS 304 nguyên khối. Giải pháp tối ưu hóa trải nghiệm người dùng trong không gian kiến trúc hiện đại.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#B48F57] font-bold bg-[#FAF5EE] px-2.5 py-1 rounded border border-[#B48F57]/20 uppercase">ARCHITECTURAL HARDWARE DIVISION</span>
                <span className="text-slate-400 group-hover:text-[#B48F57] transition-colors"><ArrowUpRight className="w-5 h-5" /></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. SCIENTIFIC SPECIFICATIONS: DIRECTORIES, SMART FACTORIES & CERTIFICATES */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B48F57] block mb-2">
            • Danh mục tập đoàn
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35]">
            Cơ cấu tổ chức & Năng lực sản xuất
          </h2>
          <p className="text-slate-400 font-sans text-xs mt-2">
            Minh bạch hóa hệ thống chi nhánh, nhà máy sản xuất thông minh và các chứng nhận tiêu chuẩn quốc tế đã kiểm chứng của tập đoàn GAMA.
          </p>
        </div>

        {/* Premium Segmented Tab Selector */}
        <div className="flex justify-center mb-12 border-b border-slate-200 max-w-2xl mx-auto pb-px">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-none w-full justify-around">
            <button
              onClick={() => setActiveTabSection('factories')}
              className={`pb-4 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider relative cursor-pointer whitespace-nowrap transition-colors ${activeTabSection === 'factories' ? 'text-[#0A4E35]' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Hạ tầng & Showroom
              {activeTabSection === 'factories' && (
                <motion.div layoutId="premiumSubTab" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#B48F57]" />
              )}
            </button>

            <button
              onClick={() => setActiveTabSection('certifications')}
              className={`pb-4 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider relative cursor-pointer whitespace-nowrap transition-colors ${activeTabSection === 'certifications' ? 'text-[#0A4E35]' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              Chứng chỉ quốc tế
              {activeTabSection === 'certifications' && (
                <motion.div layoutId="premiumSubTab" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#B48F57]" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Canvas */}
        <div className="min-h-[300px] mb-32">
          <AnimatePresence mode="wait">
            {activeTabSection === 'factories' && (
              <motion.div
                key="factories"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {factories.map((fac, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-[#B48F57]/40 shadow-sm transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 text-[#0A4E35] border border-slate-100">
                        <Factory className="w-5 h-5 text-[#B48F57]" />
                      </div>
                      <h4 className="font-serif font-extrabold text-[#0A4E35] text-lg mb-2">{fac.name}</h4>

                      <div className="flex items-start gap-1.5 mb-4 text-[11px] text-slate-400 font-sans font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#B48F57] shrink-0 mt-0.5" />
                        <span>{fac.address}</span>
                      </div>

                      <p className="text-xs text-slate-500 font-sans leading-relaxed mb-6">{fac.spec}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] font-sans">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">CÔNG SUẤT HÀNG NĂM:</span>
                      <span className="font-bold text-[#0A4E35] font-mono bg-slate-50 px-2.5 py-1 rounded border border-slate-100">{fac.capacity}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTabSection === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:border-[#B48F57]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-12 h-12 rounded-xl bg-[#EEF5ED] flex items-center justify-center text-[#0A4E35] shrink-0 border border-[#0A4E35]/10">
                        <Award className="w-6 h-6 text-[#0A4E35]" />
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-[10px] font-bold bg-[#B48F57]/10 text-[#B48F57] px-3 py-1 rounded border border-[#B48F57]/15 uppercase tracking-wider inline-block mb-3">
                          {cert.standard}
                        </span>
                        <h4 className="font-serif font-extrabold text-[#0A4E35] text-lg mb-1 group-hover:text-[#B48F57] transition-colors duration-300">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono font-bold block mb-4 uppercase tracking-wider">
                          ĐƠN VỊ CẤP: {cert.issuer}
                        </span>
                        <p className="text-xs text-slate-500 font-sans leading-relaxed">
                          {cert.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono font-medium text-emerald-600">Bảo chứng chính thức</span>
                      </div>
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem chi tiết bản cấp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. SCIENTIFIC BOARD OF GOVERNANCE (LEADERSHIP) */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B48F57] block mb-2">
              • Hội đồng quản trị & Khoa học
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35]">
              Những chuyên gia & Nhà quản trị tiên phong
            </h2>
            <p className="text-slate-400 font-sans text-xs mt-2">
              Đội ngũ lãnh đạo kết hợp hoàn hảo giữa quản trị doanh nghiệp đỉnh cao và hàng thập kỷ nghiên cứu polymer chuyên sâu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person, i) => (
              <div
                key={i}
                className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#0A4E35] text-white font-serif text-lg font-bold flex items-center justify-center shrink-0">
                    {person.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-extrabold text-[#0A4E35] text-base leading-tight">
                      {person.name}
                    </h4>
                    <p className="text-xs text-[#B48F57] font-sans font-medium mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-[10px] font-mono text-[#0A4E35] bg-[#EEF5ED] py-1 px-2.5 rounded border border-[#0A4E35]/10 w-fit">
                    {person.credentials}
                  </div>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {person.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. INTERACTIVE TIMELINE ROADMAP */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B48F57] block mb-2">
              • BIÊN NIÊN SỬ GAMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35]">
              Hơn 30 năm tận hiến và phát triển
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* Timeline Year Selectors */}
            <div className="flex justify-between items-center max-w-4xl mx-auto w-full border-b border-slate-200 pb-2 overflow-x-auto gap-4 sm:gap-6 scrollbar-none px-4">
              {timeline.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setActiveTimelineYear(item.year)}
                  className={`text-sm font-mono font-bold pb-2 px-2 transition-all relative shrink-0 cursor-pointer ${activeTimelineYear === item.year ? 'text-[#0A4E35]' : 'text-slate-400 hover:text-slate-600'
                    }`}
                >
                  {item.year}
                  {activeTimelineYear === item.year && (
                    <motion.div
                      layoutId="roadmapActiveIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#B48F57]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Timeline Card */}
            <div className="max-w-3xl mx-auto w-full px-4">
              <AnimatePresence mode="wait">
                {timeline.map(
                  (item) =>
                    activeTimelineYear === item.year && (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, scale: 0.98, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white border border-slate-200 rounded-[24px] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden"
                      >
                        {/* Giant back number */}
                        <div className="absolute right-6 top-4 text-8xl font-black text-slate-50 select-none pointer-events-none font-serif">
                          {item.year.substring(2)}
                        </div>

                        <div className="text-6xl font-serif font-black text-[#B48F57] leading-none shrink-0 md:border-r border-slate-100 md:pr-10 z-10 font-mono">
                          {item.year}
                        </div>

                        <div className="z-10">
                          <h4 className="font-serif font-extrabold text-lg sm:text-xl text-[#0A4E35] mb-3">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed font-light">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      {/* IMMERSIVE CERTIFICATE SHEET MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[24px] w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-8 relative"
            >
              {/* Gold decorative top bar */}
              <div className="h-2 bg-gradient-to-r from-[#0A4E35] via-[#B48F57] to-[#0A4E35]" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-[#EEF5ED] text-[#0A4E35] transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto max-h-[85vh] flex flex-col gap-8">

                {/* Official Header */}
                <div className="text-center flex flex-col items-center border-b border-slate-100 pb-8 relative">
                  <div className="w-16 h-16 bg-[#EEF5ED] rounded-full flex items-center justify-center border border-[#0A4E35]/15 mb-4 text-[#0A4E35]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#B48F57] uppercase tracking-[0.25em] mb-1.5">
                    Hồ sơ năng lực & Đăng ký chất lượng
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] max-w-2xl leading-tight">
                    {selectedCert.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 mt-4">
                    <span>Số hiệu: <strong className="text-[#0A4E35] font-semibold">{selectedCert.certificateNo}</strong></span>
                    <span className="hidden sm:inline">•</span>
                    <span>Đơn vị cấp: <strong className="text-[#0A4E35] font-semibold">{selectedCert.issuer}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* Left Column: Quick highlights & registry stamps */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col gap-4">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2">
                        // THÔNG TIN BẢN QUYỀN
                      </h4>
                      {selectedCert.highlights.map((hl: any, idx: number) => (
                        <div key={idx} className="flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{hl.label}</span>
                          <span className="text-xs font-semibold text-[#0A4E35] leading-snug">{hl.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* QR Code & Registry validation */}
                    <div className="bg-[#EEF5ED]/40 border border-[#0A4E35]/10 rounded-2xl p-6 flex items-center gap-4">
                      <QrCode className="w-12 h-12 text-[#0A4E35] shrink-0 opacity-85" />
                      <div>
                        <h5 className="text-xs font-serif font-bold text-[#0A4E35]">Tra cứu dữ liệu gốc</h5>
                        <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-1">
                          Quét mã để đối chiếu dữ liệu trực tiếp trên cổng thông tin lưu trữ của {selectedCert.issuer}.
                        </p>
                      </div>
                    </div>

                    {/* Stamp illustration rendering */}
                    <div className="border border-[#B48F57]/15 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden bg-slate-50/50">
                      <div className="absolute inset-0 bg-[radial-gradient(#B48F57_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                      {/* Stamp Ring Mockup */}
                      <div className="w-24 h-24 rounded-full border-4 border-dashed border-rose-600/30 flex items-center justify-center relative p-1 z-10 mb-4 animate-[spin_60s_linear_infinite]">
                        <div className="w-full h-full rounded-full border border-rose-600/50 flex flex-col items-center justify-center text-[5px] font-mono text-rose-600/80 font-bold leading-tight">
                          <span>GAMA GROUP</span>
                          <span className="text-[4px] my-0.5">★ ★ ★</span>
                          <span>HỢP QUY CHẤT LƯỢNG</span>
                        </div>
                      </div>

                      <div className="z-10">
                        <span className="text-[9px] text-rose-600/90 font-mono font-bold tracking-widest uppercase">ĐÃ ĐỐI CHIẾU BẢN GỐC</span>
                        <p className="text-[10px] text-slate-400 font-sans mt-1">Hồ sơ lưu trữ điện tử, ký duyệt bởi: <br /><strong className="text-[#0A4E35] font-semibold">{selectedCert.director}</strong></p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed clauses, tables & registry lists */}
                  <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Excerpt */}
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#B48F57] uppercase tracking-wider mb-2">• PHẠM VI ÁP DỤNG & HIỆU LỰC</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">{selectedCert.desc}</p>
                    </div>

                    {/* LAS 1753 Test Criteria Table Custom Render */}
                    {selectedCert.id === 'labtest' && (
                      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-[#0A4E35] text-white p-3 text-xs font-bold uppercase tracking-wider font-sans">
                          Bảng chỉ tiêu thử nghiệm màng sơn GAMA thực nghiệm (LAS 1753)
                        </div>
                        <div className="overflow-x-auto text-xs font-sans">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                                <th className="p-3">STT</th>
                                <th className="p-3">Chỉ tiêu kiểm nghiệm / Criteria</th>
                                <th className="p-3">Phương pháp thử</th>
                                <th className="p-3">Kết quả thực tế</th>
                                <th className="p-3 text-right">Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150">
                              <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3 font-semibold text-[#0A4E35]">01</td>
                                <td className="p-3">Độ bền của lớp sơn phủ theo phép thử cắt ô</td>
                                <td className="p-3 font-mono text-[11px]">TCVN 2097:2015</td>
                                <td className="p-3 font-semibold text-emerald-700">Loại 1</td>
                                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Xuất sắc</span></td>
                              </tr>
                              <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3 font-semibold text-[#0A4E35]">02</td>
                                <td className="p-3">Độ bền rửa trôi màng sơn (sau 1200 chu kỳ cọ)</td>
                                <td className="p-3 font-mono text-[11px]">TCVN 8653-4:2024</td>
                                <td className="p-3 font-semibold text-emerald-700">Đạt yêu cầu</td>
                                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Đạt tiêu chuẩn</span></td>
                              </tr>
                              <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3 font-semibold text-[#0A4E35]">03</td>
                                <td className="p-3">Độ bền chu kỳ nóng lạnh (sau 50 chu kỳ sốc)</td>
                                <td className="p-3 font-mono text-[11px]">TCVN 8653-5:2024</td>
                                <td className="p-3 font-semibold text-emerald-700">Đạt yêu cầu</td>
                                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Chống nứt tốt</span></td>
                              </tr>
                              <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-3 font-semibold text-[#0A4E35]">04</td>
                                <td className="p-3">Hàm lượng hợp chất hữu cơ bay hơi (VOC)</td>
                                <td className="p-3 font-mono text-[11px]">TCVN 10370-2:2014</td>
                                <td className="p-3 font-semibold text-emerald-700">15.8 - 23.5 g/l</td>
                                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Thân thiện sinh thái</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* QCVN 16:2023/BXD Approved Products Grid Render */}
                    {selectedCert.id === 'qcvn' && (
                      <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-mono font-bold text-[#B48F57] uppercase tracking-wider">• DANH MỤC 22 DÒNG SƠN ĐẠT CHUẨN ĐƯỢC PHÊ DUYỆT</h4>
                        <div className="border border-slate-150 rounded-xl bg-slate-50 p-4 max-h-64 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans">
                          {selectedCert.approvedProducts.map((p: string, pIdx: number) => (
                            <div key={pIdx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200/50">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-slate-700 font-medium">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Detailed Clauses Block */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono font-bold text-[#B48F57] uppercase tracking-wider">
                        • ĐIỀU KHOẢN CHẤT LƯỢNG & GIÁM SÁT CHI TIẾT
                      </h4>
                      <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 font-light list-disc pl-5">
                        {selectedCert.details.map((detail: string, idx: number) => (
                          <li key={idx} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certificate validity block */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-[#B48F57] shrink-0" />
                        <div>
                          <p className="text-xs font-serif font-bold text-[#0A4E35]">Thời hạn hiệu lực chứng chỉ</p>
                          <p className="text-[10px] text-slate-500 font-sans mt-0.5">Áp dụng giám sát định kỳ hàng năm theo quy định pháp lý.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 text-xs font-mono">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">NGÀY CẤP</span>
                          <span className="font-bold text-[#0A4E35]">{selectedCert.issueDate}</span>
                        </div>
                        <div className="w-px bg-slate-200" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">NGÀY HẾT HẠN</span>
                          <span className="font-bold text-rose-700">{selectedCert.expiryDate}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer panel */}
                <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Mã số lưu chiểu: GAMA-CERT-{selectedCert.id.toUpperCase()}</span>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-6 py-2 bg-[#0A4E35] text-white hover:bg-[#B48F57] rounded-full font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Đóng hồ sơ
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
