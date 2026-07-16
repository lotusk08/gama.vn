import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  Landmark, 
  FileText, 
  ShieldAlert, 
  Award, 
  ArrowRight, 
  ChevronRight,
  FileDown,
  Building,
  CheckCircle2,
  Lock,
  Eye,
  AlertTriangle,
  Heart
} from 'lucide-react';

export type PolicyKey = 'suppliers' | 'privacy' | 'position' | 'conduct' | 'speakup' | 'accessibility';

interface CorporatePoliciesProps {
  activePolicy: PolicyKey;
  onChangePolicy: (policy: PolicyKey) => void;
}

export default function CorporatePolicies({ activePolicy, onChangePolicy }: CorporatePoliciesProps) {
  const menuItems = [
    { id: 'suppliers', label: 'Đối tác cung ứng', icon: Users, desc: 'Supplier Code of Conduct & Sustainability' },
    { id: 'privacy', label: 'Tuyên bố quyền riêng tư', icon: ShieldCheck, desc: 'Privacy & Data Protection Statement' },
    { id: 'position', label: 'Tuyên bố vị thế', icon: Landmark, desc: 'Corporate Position Statements' },
    { id: 'conduct', label: 'Bộ quy tắc ứng xử', icon: FileText, desc: 'Global Business Code of Conduct' },
    { id: 'speakup', label: 'Thông báo SpeakUp!', icon: ShieldAlert, desc: 'SpeakUp! Notice & Compliance' },
    { id: 'accessibility', label: 'Cam kết tiếp cận', icon: Award, desc: 'Digital Accessibility Statement' },
  ] as const;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      {/* Header section with rich typography */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-16">
        <div className="border-b border-slate-200 pb-8">
          <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-widest block mb-2">
            • GAMA GROUP CO., LTD CORPORATE DISCLOSURE & GOVERNANCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#0A4E35] tracking-tight leading-none">
            Chính sách quản trị & Tuân thủ
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-3 max-w-2xl font-light">
            Các văn bản pháp lý, bộ quy tắc ứng xử doanh nghiệp và cam kết minh bạch vận hành theo tiêu chuẩn quản trị toàn cầu của GAMA GROUP CO., LTD.
          </p>
        </div>
      </div>

      {/* Main content grid with sticky sidebar menu and readable reading pane */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-6">
            DANH MỤC TÀI LIỆU
          </h2>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activePolicy === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangePolicy(item.id)}
                  className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 group cursor-pointer ${
                    isActive 
                      ? 'bg-[#0A4E35] text-white shadow-md shadow-[#0a4e35]/10' 
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-xl flex-shrink-0 transition-colors ${
                    isActive ? 'bg-[#125D41] text-[#B48F57]' : 'bg-slate-50 text-slate-400 group-hover:text-[#B48F57]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="text-xs sm:text-sm font-sans font-bold block leading-tight">
                      {item.label}
                    </span>
                    <span className={`text-[9px] font-mono tracking-wide block mt-1 uppercase ${
                      isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {item.desc}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform self-center ${
                    isActive ? 'text-[#B48F57] translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-100 mt-8 pt-6">
            <div className="bg-[#FAF5EE] rounded-2xl p-5 border border-[#B48F57]/10">
              <span className="text-[10px] font-mono font-bold text-[#B48F57] uppercase tracking-wider block mb-2">
                BAN THANH TRA & PHÁP CHẾ
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed font-light mb-4">
                Nếu có bất kỳ thắc mắc hoặc báo cáo vi phạm liên quan đến hệ thống tuân thủ, vui lòng liên hệ trực tiếp với chúng tôi.
              </p>
              <a 
                href="mailto:compliance@gama.vn" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A4E35] hover:text-[#B48F57] transition-colors"
              >
                <span>compliance@gama.vn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </aside>

        {/* Dynamic reading view area */}
        <section className="lg:col-span-8 bg-white rounded-[32px] border border-slate-200/80 p-8 sm:p-12 shadow-sm min-h-[600px] flex flex-col justify-between">
          <div>
            {activePolicy === 'suppliers' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] flex items-center justify-center text-[#0A4E35] border border-[#0A4E35]/10">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] tracking-widest uppercase block">
                      SUPPLIER CODE OF CONDUCT & SUSTAINABILITY
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Bộ Quy tắc dành cho Đối tác Cung ứng
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    Tại GAMA Group, chúng tôi tin tưởng rằng việc thiết lập và duy trì một chuỗi cung ứng bền vững, minh bạch và có trách nhiệm xã hội chính là chìa khóa then chốt để củng cố giá trị cốt lõi của doanh nghiệp. Chúng tôi cam kết hợp tác chặt chẽ với các nhà cung ứng dựa trên các tiêu chí cao nhất về đạo đức, an toàn, và bảo vệ môi trường toàn cầu.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Tuân thủ Pháp luật & Quy chuẩn Đạo đức
                  </h3>
                  <p>
                    Tất cả các đối tác cung cấp nguyên vật liệu, hóa chất, bao bì hay dịch vụ logistics cho GAMA Group đều bắt buộc phải tuân thủ nghiêm ngặt mọi quy định luật pháp hiện hành tại quốc gia sở tại và các điều ước quốc tế mà Việt Nam là thành viên. Chúng tôi tuyệt đối không dung túng cho bất kỳ hành vi hối lộ, tham nhũng, độc quyền hay cạnh tranh thiếu lành mạnh nào trong toàn bộ chuỗi cung ứng.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Bảo vệ Môi trường & Phát triển Bền vững
                  </h3>
                  <p>
                    Nhà cung ứng của GAMA Group phải cam kết thiết lập các biện pháp kiểm soát và giảm thiểu tác động tiêu cực đến môi trường tự nhiên. Điều này bao gồm:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Sử dụng hợp lý và tiết kiệm nguồn tài nguyên thiên nhiên, năng lượng và nước.</li>
                    <li>Áp dụng các công nghệ xử lý chất thải hiện đại, đảm bảo nước thải và khí thải đạt chuẩn an toàn trước khi xả ra môi trường.</li>
                    <li>Nghiêm cấm hoàn toàn việc sử dụng các hóa chất độc hại ngoài danh mục kiểm soát hoặc các chất có nguy cơ gây hại cao cho tầng ozone.</li>
                    <li>Ưu tiên các giải pháp bao bì có khả năng tái chế, phân hủy sinh học và giảm thiểu tối đa dấu chân Carbon.</li>
                  </ul>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    3. Tiêu chuẩn Lao động & Quyền con người
                  </h3>
                  <p>
                    Đối tác cung ứng phải tôn trọng quyền con người và đối xử nhân đạo với mọi người lao động. GAMA Group kiên quyết phản đối việc sử dụng lao động cưỡng bức, lao động trẻ em dưới mọi hình thức. Nhà cung ứng phải đảm bảo:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Môi trường làm việc an toàn, vệ sinh và lành mạnh, trang bị đầy đủ thiết bị bảo hộ lao động cho công nhân.</li>
                    <li>Trả lương và các chế độ đãi ngộ đúng hạn, công bằng và tuân thủ luật lao động hiện hành.</li>
                    <li>Tôn trọng quyền tự do hiệp hội và thỏa ước lao động tập thể của nhân viên.</li>
                  </ul>
                </div>
              </div>
            )}

            {activePolicy === 'privacy' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] flex items-center justify-center text-[#B48F57] border border-[#B48F57]/10">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] tracking-widest uppercase block">
                      PRIVACY & DATA PROTECTION STATEMENT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Tuyên bố Quyền Riêng tư & Bảo mật dữ liệu
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    Sự tin tưởng và an tâm của quý khách hàng, đối tác cùng toàn thể cán bộ nhân viên là tài sản vô giá của GAMA Group. Chúng tôi cam kết thu thập, xử lý và lưu trữ dữ liệu cá nhân một cách có trách nhiệm, minh bạch và tuân thủ chặt chẽ các quy định pháp luật về bảo vệ dữ liệu cá nhân (bao gồm Nghị định 13/2023/NĐ-CP của Chính phủ).
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Phạm vi Thu thập & Mục đích Sử dụng
                  </h3>
                  <p>
                    GAMA Group chỉ thực hiện thu thập các thông tin cá nhân cần thiết (như họ tên, số điện thoại, email, địa chỉ) khi được sự đồng ý tự nguyện của chủ thể dữ liệu nhằm phục vụ cho các mục đích:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Cung cấp và nâng cao chất lượng sản phẩm sơn, thiết bị vệ sinh, phụ kiện và dịch vụ hỗ trợ kỹ thuật.</li>
                    <li>Xử lý và hoàn tất các đơn đặt hàng, hợp đồng kinh doanh và dịch vụ bảo hành hậu mãi.</li>
                    <li>Gửi các bản tin nội bộ, chương trình ưu đãi đặc quyền và thông báo cập nhật công nghệ mới.</li>
                  </ul>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Cam kết Bảo mật Tuyệt đối
                  </h3>
                  <p>
                    Chúng tôi áp dụng các biện pháp an ninh mạng kỹ thuật cao kết hợp quy trình quản lý nội bộ chặt chẽ để ngăn chặn mọi hành vi truy cập trái phép, tiết lộ, thay đổi, hoặc hủy hoại dữ liệu cá nhân. Hệ thống máy chủ lưu trữ dữ liệu của GAMA được bảo vệ bởi tường lửa đa lớp, mã hóa dữ liệu đầu-cuối (SSL/TLS) và kiểm tra lỗ hổng bảo mật định kỳ.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    3. Quyền của Chủ thể Dữ liệu
                  </h3>
                  <p>
                    Chủ thể dữ liệu có toàn quyền kiểm soát thông tin cá nhân của mình, bao gồm quyền yêu cầu truy cập, đính chính, cập nhật, hoặc yêu cầu xóa bỏ vĩnh viễn dữ liệu cá nhân của mình khỏi hệ thống lưu trữ của GAMA Group bất kỳ lúc nào bằng cách gửi yêu cầu trực tiếp đến bộ phận chăm sóc khách hàng của chúng tôi.
                  </p>
                </div>
              </div>
            )}

            {activePolicy === 'position' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] flex items-center justify-center text-[#0A4E35] border border-[#0A4E35]/10">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] tracking-widest uppercase block">
                      CORPORATE POSITION STATEMENTS
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Tuyên bố Vị thế & Định hướng Phát triển
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    Với tư cách là tập đoàn đa ngành dẫn đầu tại Việt Nam trong lĩnh vực sản xuất vật liệu phủ (Sơn nước trang trí), thiết bị phòng tắm đồng bộ và gương thông minh cao cấp, GAMA Group kiên định định vị thương hiệu ở phân khúc chất lượng cao nhất, kiến tạo những không gian sống tinh tế và bảo vệ vững chắc mọi công trình kiến trúc.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Tiên phong Công nghệ & Đổi mới sáng tạo
                  </h3>
                  <p>
                    GAMA Group cam kết không ngừng đầu tư vào các trung tâm Nghiên cứu & Phát triển (R&D) hiện đại hàng đầu khu vực. Chúng tôi ứng dụng các đột phá khoa học tiên tiến như polyme liên kết chéo Core-Shell trong ngành sơn, công nghệ men tự kháng khuẩn trong thiết bị vệ sinh, và các tính năng cảm ứng phá sương thông minh trên gương LED để luôn giữ vững lợi thế cạnh tranh vượt trội.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Chuyển đổi xanh & Trách nhiệm Sinh thái
                  </h3>
                  <p>
                    Mọi hoạt động sản xuất kinh doanh của GAMA Group đều đặt bảo vệ môi trường làm kim chỉ nam. Chúng tôi đặt mục tiêu cắt giảm 50% lượng phát thải khí nhà kính (CO2) vào năm 2030 và hướng tới trung hòa Carbon hoàn toàn vào năm 2050. GAMA tự hào đồng hành cùng xu hướng kiến trúc xanh bền vững toàn cầu.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    3. Kiến tạo Giá trị Xã hội & Phát triển Cộng đồng
                  </h3>
                  <p>
                    Chúng tôi hướng tới việc mang lại giá trị thiết thực và phồn vinh bền vững cho cộng đồng xã hội, nâng cao điều kiện sống của người dân thông qua các chương trình thiện nguyện xây sửa trường học, nhà tình nghĩa, và tài trợ màu sơn bảo vệ các công trình di sản văn hóa Việt Nam.
                  </p>
                </div>
              </div>
            )}

            {activePolicy === 'conduct' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] flex items-center justify-center text-[#B48F57] border border-[#B48F57]/10">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] tracking-widest uppercase block">
                      GLOBAL BUSINESS CODE OF CONDUCT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Bộ Quy tắc Ứng xử Doanh nghiệp
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    Bộ Quy tắc Ứng xử này là kim chỉ nam cho mọi hành vi ứng xử, quyết định nghiệp vụ và hoạt động kinh doanh hàng ngày của toàn thể ban điều hành cùng toàn thể cán bộ nhân viên của GAMA Group trên toàn thế giới, đảm bảo chúng tôi luôn vận hành dựa trên các giá trị đạo đức cao nhất.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Chính trực & Trung thực trong Kinh doanh
                  </h3>
                  <p>
                    Sự chính trực là nền tảng cốt lõi cho mọi mối quan hệ đối tác của GAMA. Chúng tôi cam kết cạnh tranh công bằng, lành mạnh và tuân thủ tuyệt đối luật chống độc quyền. Mọi thông tin tài chính, báo cáo hoạt động và tài liệu kế toán của tập đoàn đều phải được lập một cách trung thực, chính xác, khách quan và minh bạch nhất.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Phòng chống Tham nhũng & Hối lộ
                  </h3>
                  <p>
                    GAMA Group áp dụng chính sách KHÔNG khoan nhượng (Zero-tolerance) đối với bất kỳ hành vi đưa hoặc nhận hối lộ, lại quả, tư lợi cá nhân hay xung đột lợi ích dưới mọi hình thức. Nhân viên không được phép nhận quà tặng, tiền mặt hoặc các khoản lợi ích vật chất có giá trị lớn từ phía đối tác khách hàng hay nhà cung ứng có khả năng ảnh hưởng đến tính khách quan khi ra quyết định kinh doanh.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    3. Tôn trọng sự Đa dạng & Bình đẳng lao động
                  </h3>
                  <p>
                    Chúng tôi nỗ lực xây dựng một môi trường làm việc chuyên nghiệp, nhân văn, nơi mọi nhân viên đều được tôn trọng, lắng nghe và có cơ hội phát triển công bằng như nhau, không phân biệt giới tính, tuổi tác, vùng miền, tôn giáo hay tình trạng sức khỏe. Mọi hành vi quấy rối, bắt nạt hoặc phân biệt đối xử đều bị xử lý kỷ luật nghiêm khắc theo quy chế lao động của tập đoàn.
                  </p>
                </div>
              </div>
            )}

            {activePolicy === 'speakup' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] flex items-center justify-center text-red-600 border border-red-200 bg-red-50">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-600 tracking-widest uppercase block">
                      SPEAKUP! NOTICE & COMPLIANCE REPORTING
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Hệ thống SpeakUp! ẩn danh bảo mật
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 mb-6">
                    <p className="font-sans font-medium text-red-900 text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Lưu ý bảo mật quan trọng
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Cổng thông tin SpeakUp! được vận hành độc lập bởi một bên thứ ba chuyên nghiệp nhằm đảm bảo thông tin báo cáo của bạn được mã hóa an toàn và bảo mật ẩn danh 100%. Bạn có thể thực hiện báo cáo vi phạm mà không lo ngại bất kỳ hành vi trù dập hay phân biệt đối xử nào.
                    </p>
                  </div>

                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    GAMA Group khuyến khích mọi nhân viên, đối tác, nhà cung cấp và khách hàng lên tiếng ngay khi phát hiện bất kỳ dấu hiệu vi phạm pháp luật, vi phạm Bộ Quy tắc Ứng xử Doanh nghiệp, hoặc các hành vi thiếu đạo đức kinh doanh gây hại cho lợi ích chung.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Các Hành vi cần Báo cáo
                  </h3>
                  <p>
                    Vui lòng thực hiện phản ánh qua SpeakUp! nếu bạn chứng kiến hoặc có chứng cứ về các hành vi vi phạm:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Đưa hối lộ, nhận hối lộ, tham ô công quỹ hoặc trục lợi cá nhân.</li>
                    <li>Gian lận sổ sách kế toán, báo cáo tài chính hoặc hồ sơ chất lượng sản phẩm.</li>
                    <li>Vi phạm các tiêu chuẩn an toàn lao động, gây ô nhiễm môi trường nghiêm trọng.</li>
                    <li>Phân biệt đối xử, quấy rối tình dục hoặc hành vi ngược đãi tại nơi làm việc.</li>
                  </ul>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Cam kết Bảo vệ Người Báo cáo
                  </h3>
                  <p>
                    Ban lãnh đạo GAMA cam kết tuyệt đối bảo vệ danh tính của người báo cáo trung thực. Mọi hành vi đe dọa, trù dập hay kỳ thị người báo cáo đều bị coi là vi phạm kỷ luật đặc biệt nghiêm trọng và sẽ bị sa thải lập tức, thậm chí chuyển giao cơ quan pháp luật xử lý hình sự.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    3. Kênh tiếp nhận báo cáo trực tiếp
                  </h3>
                  <p>
                    Bạn có thể gửi báo cáo ẩn danh trực tuyến thông qua cổng thông tin độc lập của Ethicspoint:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <a 
                      href="https://secure.ethicspoint.com/domain/media/en/gui/23734/index.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Truy cập Cổng SpeakUp! (Ethicspoint)</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activePolicy === 'accessibility' && (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF5ED] flex items-center justify-center text-[#0A4E35] border border-[#0A4E35]/10">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#B48F57] tracking-widest uppercase block">
                      DIGITAL ACCESSIBILITY STATEMENT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      Cam kết về Khả năng Tiếp cận Toàn diện
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    GAMA Group luôn mong muốn mang lại một môi trường bình đẳng, thân thiện và không có rào cản cho tất cả mọi người, bao gồm cả những người khuyết tật hay có hoàn cảnh đặc biệt khi tiếp cận thông tin, sản phẩm và dịch vụ số của chúng tôi.
                  </p>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    1. Áp dụng Tiêu chuẩn WCAG Toàn cầu
                  </h3>
                  <p>
                    Chúng tôi liên tục làm việc nhằm tối ưu hóa các nền tảng kỹ thuật số (website, ứng dụng di động) của tập đoàn tuân thủ nghiêm ngặt các nguyên tắc của Hướng dẫn Tiếp cận Nội dung Web (WCAG 2.1) cấp độ AA. Các cải tiến kỹ thuật cụ thể bao gồm:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Đảm bảo tỷ lệ tương phản màu sắc cao giúp người thị lực kém đọc văn bản dễ dàng.</li>
                    <li>Cung cấp đầy đủ văn bản thay thế (alt-text) cho tất cả các hình ảnh, đồ họa trên trang.</li>
                    <li>Hỗ trợ hoàn toàn việc điều hướng website bằng bàn phím thông minh không cần chuột điều khiển.</li>
                    <li>Khả năng tương thích tốt với các công cụ đọc màn hình chuyên dụng (JAWS, NVDA, VoiceOver).</li>
                  </ul>

                  <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
                    2. Đồng hành & Lắng nghe phản hồi
                  </h3>
                  <p>
                    Quá trình tối ưu hóa khả năng tiếp cận số là một hành trình cải tiến không ngừng nghỉ. Nếu bạn gặp bất kỳ trở ngại hay khó khăn nào trong việc sử dụng hoặc khai thác thông tin trên website của GAMA Group, vui lòng liên hệ ngay với nhóm hỗ trợ của chúng tôi để được hỗ trợ kịp thời:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Hotline hỗ trợ đặc quyền: <span className="font-medium text-slate-800">1800 9000</span></li>
                    <li>Email hỗ trợ tiếp cận: <span className="font-medium text-[#0A4E35]">accessibility@gama.vn</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Clean corporate card footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B48F57] animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                GAMA GROUP CORPORATE DISCLOSURE • UPDATE 2026
              </span>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-bold text-[#0A4E35] hover:text-[#B48F57] font-sans uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Về đầu trang</span>
              <span className="text-[10px] font-mono">↑</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
