"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle, Send, Globe, Star, Award, BookOpen, Shield, Users, MessageSquare, Handshake } from 'lucide-react';
import { OfficeLocation } from '../types';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'gamasun',
    subject: '',
    message: '',
    agreement: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const officeLocations: OfficeLocation[] = [
    {
      region: 'Văn phòng - Showroom chính',
      city: 'TP. Hồ Chí Minh, Việt Nam',
      address: '54/6E, Ấp Tiền Lân, Xã Bà Điểm, Huyện Hóc Môn, Thành Phố Hồ Chí Minh',
      phone: '089.66.77.866 - 0902.949.946',
      email: 'contacts@gama.vn'
    },
    {
      region: 'Chi nhánh & Kho bãi Miền Trung',
      city: 'Huế & Đà Nẵng, Việt Nam',
      address: 'Kho bãi trung chuyển & phân phối Sơn nước, Thiết bị vệ sinh GAMA khu vực miền Trung',
      phone: '089.66.77.866',
      email: 'contacts@gama.vn'
    },
    {
      region: 'Chi nhánh Tây Nguyên & Nam Trung Bộ',
      city: 'Đắk Lắk & Bình Thuận, Việt Nam',
      address: 'Hệ thống đại lý phân phối và kho bãi chiến lược khu vực Tây Nguyên (Buôn Mê Thuột) và Bình Thuận',
      phone: '089.66.77.866',
      email: 'contacts@gama.vn'
    }
  ];

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Vui lòng nhập họ tên của bạn';
    if (!formData.email.trim()) {
      tempErrors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Địa chỉ email không hợp lệ';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9. +()-]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Số điện thoại không hợp lệ (8 - 15 số)';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Vui lòng nhập tiêu đề yêu cầu';
    if (!formData.message.trim()) tempErrors.message = 'Vui lòng nhập nội dung chi tiết';
    if (!formData.agreement) tempErrors.agreement = 'Vui lòng đồng ý với điều khoản bảo mật thông tin';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'gamasun',
      subject: '',
      message: '',
      agreement: false
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B48F57] block mb-3 font-sans">
            • LIÊN HỆ VỚI CHÚNG TÔI
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-[1.2]">
            Kết nối cùng GAMA
          </h2>
          <p className="text-gray-500 font-sans mt-4 text-xs sm:text-sm leading-relaxed font-light">
            Sẵn sàng hợp tác cùng GAMA? Hãy gửi yêu cầu của bạn để liên hệ với Ban điều hành, yêu cầu tài liệu giới thiệu doanh nghiệp hoặc kết nối với lãnh đạo của các bộ phận chuyên môn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left contact forms */}
          <div className="lg:col-span-7 bg-[#EEF5ED]/30 rounded-[24px] p-8 border border-[#B48F57]/20 shadow-sm relative">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">HỌ VÀ TÊN CỦA BẠN *</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Lê Nguyễn Minh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-white px-4 py-3 rounded-xl border text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] ${
                        errors.name ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && <span className="text-[10px] text-rose-500 font-bold">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">ĐỊA CHỈ EMAIL *</label>
                    <input
                      type="email"
                      placeholder="Ví dụ: nguyenvan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white px-4 py-3 rounded-xl border text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] ${
                        errors.email ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && <span className="text-[10px] text-rose-500 font-bold">{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">SỐ ĐIỆN THOẠI *</label>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0896677866"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-white px-4 py-3 rounded-xl border text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] ${
                        errors.phone ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'
                      }`}
                    />
                    {errors.phone && <span className="text-[10px] text-rose-500 font-bold">{errors.phone}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">LỰA CHỌN PHÂN KHÚC GAMA *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200 text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] cursor-pointer"
                  >
                    <option value="gamasun">SƠN GAMA - Sản xuất & Nghiên cứu Sơn nước, Bột trét cao cấp</option>
                    <option value="gamahome">THIẾT BỊ VỆ SINH - Phân phối Thiết bị vệ sinh & Phòng tắm cao cấp GAMA</option>
                    <option value="gamacera">PHỤ KIỆN & GƯƠNG GAMA - Gương LED thông minh & Phụ kiện inox 304</option>
                    <option value="projects">Ban Quản lý Dự án & Hợp tác chiến lược</option>
                    <option value="support">Phòng Chăm sóc Khách hàng & Bảo hành chất lượng</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">TIÊU ĐỀ YÊU CẦU *</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đề xuất hợp tác chiến lược, Dự án đầu tư, Yêu cầu tài liệu kỹ thuật"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full bg-white px-4 py-3 rounded-xl border text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] ${
                      errors.subject ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'
                    }`}
                  />
                  {errors.subject && <span className="text-[10px] text-rose-500 font-bold">{errors.subject}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#0A4E35]/80 font-sans tracking-wider uppercase">NỘI DUNG CHI TIẾT YÊU CẦU *</label>
                  <textarea
                    rows={4}
                    placeholder="Vui lòng ghi rõ nội dung yêu cầu liên hệ, mục đích hợp tác để chúng tôi chuyển tiếp tới bộ phận chuyên trách..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-white px-4 py-3 rounded-xl border text-xs font-sans text-[#0A4E35] transition-all outline-none focus:border-[#0A4E35] resize-none ${
                      errors.message ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'
                    }`}
                  />
                  {errors.message && <span className="text-[10px] text-rose-500 font-bold">{errors.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-500 font-sans leading-relaxed">
                    <input
                      type="checkbox"
                      checked={formData.agreement}
                      onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                      className="mt-1 rounded border-gray-200 text-[#0A4E35] focus:ring-[#0A4E35]"
                    />
                    <span className="font-light">
                      Tôi đồng ý cho phép GAMA liên hệ lại với tôi dựa trên thông tin được cung cấp để giải quyết yêu cầu này.
                    </span>
                  </label>
                  {errors.agreement && <span className="text-[10px] text-rose-500 font-bold">{errors.agreement}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-[#B48F57] hover:bg-[#0A4E35] hover:text-white text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Gửi yêu cầu liên hệ
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-slate-900 effect-font-none text-lg mb-2">Gửi yêu cầu thành công</h3>
                <p className="text-xs text-gray-500 font-sans max-w-sm leading-relaxed mb-6 font-light">
                  Cảm ơn bạn. Yêu cầu liên hệ của bạn đã được ghi nhận vào hệ thống. Ban thư ký điều hành GAMA sẽ xử lý và phản hồi trong vòng 24 giờ làm việc.
                </p>
                
                <div className="bg-white border border-[#B48F57]/20 rounded-2xl p-5 text-xs font-sans text-gray-500 max-w-md w-full mb-8 text-left">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-2 font-bold text-[#0A4E35]">
                    <Globe className="w-4 h-4 text-[#B48F57]" />
                    <span>HỆ THỐNG GHI NHẬN GAMA</span>
                  </div>
                  <div>Bộ phận tiếp nhận: <strong className="text-[#0A4E35]">Ban Thư ký Tổng hợp GAMA</strong></div>
                  <div>Thời gian phản hồi dự kiến: <strong className="text-slate-700">Trong vòng 24 giờ làm việc</strong></div>
                  <div>Mã số yêu cầu: <strong className="text-slate-700">#GMA-{Math.floor(100000 + Math.random() * 900000)}</strong></div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#0A4E35] text-white hover:bg-opacity-95 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Gửi thêm yêu cầu liên hệ khác
                </button>
              </motion.div>
            )}
          </div>

          {/* Right addresses panel & Specification Guides Badge */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Office Locations */}
            <div className="flex flex-col gap-6">
              {officeLocations.map((loc) => (
                <div
                  key={loc.city}
                  className="bg-white rounded-[24px] p-6 border border-gray-150 flex flex-col gap-3 group hover:border-[#B48F57] hover:shadow-sm transition-all duration-300"
                >
                  <div>
                    <span className="text-[10px] text-[#B48F57] font-sans font-bold tracking-widest uppercase block mb-1">
                      {loc.region}
                    </span>
                    <h4 className="font-sans font-extrabold text-base sm:text-lg text-[#0A4E35] transition-colors">
                      {loc.city}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-gray-500 font-sans leading-normal font-light">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    {loc.phone && (
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{loc.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-bold text-[#0A4E35]">{loc.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Paint Specification Guides Badge */}
            <div className="bg-[#101720] rounded-[24px] p-8 border border-white/10 shadow-lg text-white text-center flex flex-col items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#B48F57]/10 rounded-full blur-2xl pointer-events-none" />
              
              {/* Laurel Wreath Simulation */}
              <div className="relative mb-5 flex items-center justify-center">
                {/* Left laurel branch visual */}
                <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-4 h-10 border-l border-b border-[#B48F57]/20 rounded-bl-full rotate-12" />
                {/* Right laurel branch visual */}
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-4 h-10 border-r border-b border-[#B48F57]/20 rounded-br-full -rotate-12" />
                
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#B48F57]" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-sans font-extrabold text-base tracking-wider text-white uppercase mb-1">
                HỒ SƠ NĂNG LỰC DOANH NGHIỆP GAMA
              </h3>
              <p className="text-[11px] text-gray-400 font-sans tracking-wide mb-6 font-light">
                Tải xuống tài liệu giới thiệu GAMA, báo cáo tài chính hàng năm và thông cáo báo chí chính thức từ ban điều hành.
              </p>

              {/* Yellow Button or Success message */}
              {downloaded ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-sans font-bold uppercase tracking-wide"
                >
                  ✓ Hồ sơ đã được gửi qua email đăng ký
                </motion.div>
              ) : (
                <button
                  onClick={() => {
                    setDownloaded(true);
                  }}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-[#B48F57] hover:bg-[#0A4E35] hover:text-white text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  Tải hồ sơ năng lực
                </button>
              )}
            </div>
          </div>

          {/* EMAIL DIRECTORY SECTION */}
          <div className="mt-20 pt-16 border-t border-gray-150">
            <div className="max-w-3xl mb-10">
              <span className="text-[10px] font-bold text-[#B48F57] uppercase tracking-widest block mb-2 font-mono">
                HỆ THỐNG LIÊN LẠC CHUYÊN TRÁCH GAMA
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-extrabold text-[#0A4E35] leading-snug">
                Các hộp thư điện tử chính thức
              </h4>
              <p className="text-xs text-gray-500 font-sans mt-2 font-light">
                Để được hỗ trợ nhanh chóng và chính xác nhất, vui lòng gửi thông tin đến đúng bộ phận chuyên trách dưới đây:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#EEF5ED]/50 border border-[#0A4E35]/10 rounded-2xl p-5 hover:border-[#B48F57] hover:bg-white transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A4E35]/5 flex items-center justify-center text-[#0A4E35]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-gray-400 uppercase">LIÊN HỆ CHUNG</p>
                    <a href="mailto:contacts@gama.vn" className="text-xs sm:text-sm font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors">
                      contacts@gama.vn
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans font-light">
                  Tiếp nhận thông tin chung, thắc mắc tổng quát và phản hồi dịch vụ.
                </p>
              </div>

              <div className="bg-[#EEF5ED]/50 border border-[#0A4E35]/10 rounded-2xl p-5 hover:border-[#B48F57] hover:bg-white transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A4E35]/5 flex items-center justify-center text-[#0A4E35]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-gray-400 uppercase font-sans">TRUYỀN THÔNG & BÁO CHÍ</p>
                    <a href="mailto:pr@gama.vn" className="text-xs sm:text-sm font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors">
                      pr@gama.vn
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans font-light">
                  Dành riêng cho các yêu cầu truyền thông, hợp tác báo chí và thông cáo sự kiện.
                </p>
              </div>

              <div className="bg-[#EEF5ED]/50 border border-[#0A4E35]/10 rounded-2xl p-5 hover:border-[#B48F57] hover:bg-white transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A4E35]/5 flex items-center justify-center text-[#0A4E35]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-gray-400 uppercase font-sans">CHĂM SÓC KHÁCH HÀNG</p>
                    <a href="mailto:support@gama.vn" className="text-xs sm:text-sm font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors">
                      support@gama.vn
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans font-light">
                  Hỗ trợ kỹ thuật sơn phủ, tư vấn sự cố thi công và bảo hành chất lượng sản phẩm.
                </p>
              </div>

              <div className="bg-[#EEF5ED]/50 border border-[#0A4E35]/10 rounded-2xl p-5 hover:border-[#B48F57] hover:bg-white transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A4E35]/5 flex items-center justify-center text-[#0A4E35]">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-gray-400 uppercase font-sans">ĐỐI TÁC & PHÁT TRIỂN</p>
                    <a href="mailto:partners@gama.vn" className="text-xs sm:text-sm font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors">
                      partners@gama.vn
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans font-light">
                  Kênh tiếp nhận đề xuất hợp tác kinh doanh, mở đại lý ủy quyền toàn quốc.
                </p>
              </div>

              <div className="bg-[#EEF5ED]/50 border border-[#0A4E35]/10 rounded-2xl p-5 hover:border-[#B48F57] hover:bg-white transition-all duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0A4E35]/5 flex items-center justify-center text-[#0A4E35]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono font-bold text-gray-400 uppercase font-sans">AN NINH & BẢO MẬT</p>
                    <a href="mailto:security@gama.vn" className="text-xs sm:text-sm font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors">
                      security@gama.vn
                    </a>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans font-light">
                  Tiếp nhận thông báo bảo mật thông tin, vi phạm thương hiệu hoặc phản ánh chính sách bảo mật.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
