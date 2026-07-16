"use client";
import React, { useState, useEffect } from 'react';
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

function renderLexicalNode(node: any, policyKey: string, headingIndexRef: { current: number }) {
  if (!node) return null;

  if (node.type === 'text') {
    return node.text;
  }

  if (node.type === 'heading' && node.tag === 'h3') {
    const headingIndex = headingIndexRef.current++;
    
    // Icon mapping based on policyKey and heading index
    let IconComp = CheckCircle2; // default
    if (policyKey === 'suppliers') {
      if (headingIndex === 0) IconComp = CheckCircle2;
      if (headingIndex === 1) IconComp = Building;
      if (headingIndex === 2) IconComp = Users;
    } else if (policyKey === 'privacy') {
      if (headingIndex === 0) IconComp = Lock;
      if (headingIndex === 1) IconComp = Eye;
      if (headingIndex === 2) IconComp = CheckCircle2;
    } else if (policyKey === 'position') {
      if (headingIndex === 0) IconComp = Building;
      if (headingIndex === 1) IconComp = CheckCircle2;
      if (headingIndex === 2) IconComp = Users;
    } else if (policyKey === 'conduct') {
      if (headingIndex === 0) IconComp = CheckCircle2;
      if (headingIndex === 1) IconComp = AlertTriangle;
      if (headingIndex === 2) IconComp = Users;
    } else if (policyKey === 'speakup') {
      if (headingIndex === 0) IconComp = CheckCircle2;
      if (headingIndex === 1) IconComp = Lock;
      if (headingIndex === 2) IconComp = ArrowRight;
    } else if (policyKey === 'accessibility') {
      if (headingIndex === 0) IconComp = CheckCircle2;
      if (headingIndex === 1) IconComp = Heart;
    }

    return (
      <h3 className="font-serif font-bold text-slate-800 text-base sm:text-lg mt-8 mb-2 flex items-center gap-2">
        <IconComp className="w-5 h-5 text-[#B48F57] flex-shrink-0" />
        {node.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
        ))}
      </h3>
    );
  }

  if (node.type === 'paragraph') {
    return (
      <p className="mt-4">
        {node.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
        ))}
      </p>
    );
  }

  if (node.type === 'list') {
    return (
      <ul className="list-disc pl-5 space-y-2 mt-2">
        {node.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
        ))}
      </ul>
    );
  }

  if (node.type === 'listitem') {
    return (
      <li>
        {node.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
        ))}
      </li>
    );
  }

  if (node.type === 'link') {
    return (
      <a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 mt-4"
      >
        <ShieldAlert className="w-4 h-4" />
        <span>
          {node.children?.map((child: any, idx: number) => (
            <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
          ))}
        </span>
      </a>
    );
  }

  // Fallback for container-type nodes
  if (node.children) {
    return (
      <>
        {node.children.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexicalNode(child, policyKey, headingIndexRef)}</React.Fragment>
        ))}
      </>
    );
  }

  return null;
}

export default function CorporatePolicies({ activePolicy, onChangePolicy }: CorporatePoliciesProps) {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await fetch('/api/policies?limit=100');
        const data = await res.json();
        if (data && data.docs) {
          setPolicies(data.docs);
        }
      } catch (err) {
        console.error('Error fetching policies:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPolicies();
  }, []);

  const menuItems = [
    { id: 'suppliers', label: 'Đối tác cung ứng', icon: Users, desc: 'Supplier Code of Conduct & Sustainability' },
    { id: 'privacy', label: 'Tuyên bố quyền riêng tư', icon: ShieldCheck, desc: 'Privacy & Data Protection Statement' },
    { id: 'position', label: 'Tuyên bố vị thế', icon: Landmark, desc: 'Corporate Position Statements' },
    { id: 'conduct', label: 'Bộ quy tắc ứng xử', icon: FileText, desc: 'Global Business Code of Conduct' },
    { id: 'speakup', label: 'Thông báo SpeakUp!', icon: ShieldAlert, desc: 'SpeakUp! Notice & Compliance' },
    { id: 'accessibility', label: 'Cam kết tiếp cận', icon: Award, desc: 'Digital Accessibility Statement' },
  ] as const;

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#0A4E35]/20 border-t-[#0A4E35] animate-spin" />
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Đang tải dữ liệu chính sách...
          </span>
        </div>
      </div>
    );
  }

  const currentPolicy = policies.find(p => p.key === activePolicy);

  // Determine title icon component and styling classes
  let HeaderIcon = Users;
  let headerIconWrapperClass = "w-12 h-12 rounded-2xl flex items-center justify-center border";

  if (activePolicy === 'suppliers') {
    HeaderIcon = Users;
    headerIconWrapperClass += " bg-[#EEF5ED] text-[#0A4E35] border-[#0A4E35]/10";
  } else if (activePolicy === 'privacy') {
    HeaderIcon = ShieldCheck;
    headerIconWrapperClass += " bg-[#FAF5EE] text-[#B48F57] border-[#B48F57]/10";
  } else if (activePolicy === 'position') {
    HeaderIcon = Landmark;
    headerIconWrapperClass += " bg-[#EEF5ED] text-[#0A4E35] border-[#0A4E35]/10";
  } else if (activePolicy === 'conduct') {
    HeaderIcon = FileText;
    headerIconWrapperClass += " bg-[#FAF5EE] text-[#B48F57] border-[#B48F57]/10";
  } else if (activePolicy === 'speakup') {
    HeaderIcon = ShieldAlert;
    headerIconWrapperClass += " bg-red-50 text-red-600 border-red-200";
  } else if (activePolicy === 'accessibility') {
    HeaderIcon = Award;
    headerIconWrapperClass += " bg-[#EEF5ED] text-[#0A4E35] border-[#0A4E35]/10";
  }

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
            {currentPolicy ? (
              <div className="animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <div className={headerIconWrapperClass}>
                    <HeaderIcon className={`w-6 h-6 ${activePolicy === 'speakup' ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block ${activePolicy === 'speakup' ? 'text-red-600' : 'text-[#B48F57]'}`}>
                      {currentPolicy.subTitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#0A4E35] tracking-tight">
                      {currentPolicy.title}
                    </h2>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-6" />

                <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {/* Important Security Warning Banner for SpeakUp Policy */}
                  {activePolicy === 'speakup' && (
                    <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 mb-6">
                      <p className="font-sans font-medium text-red-900 text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Lưu ý bảo mật quan trọng
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Cổng thông tin SpeakUp! được vận hành độc lập bởi một bên thứ ba chuyên nghiệp nhằm đảm bảo thông tin báo cáo của bạn được mã hóa an toàn và bảo mật ẩn danh 100%. Bạn có thể thực hiện báo cáo vi phạm mà không lo ngại bất kỳ hành vi trù dập hay phân biệt đối xử nào.
                      </p>
                    </div>
                  )}

                  <p className="font-sans font-normal text-slate-800 text-sm sm:text-base">
                    {currentPolicy.introduction}
                  </p>

                  {/* Render content richText from Lexical node tree */}
                  {currentPolicy.content?.root?.children && (
                    currentPolicy.content.root.children.map((childNode: any, nodeIdx: number) => (
                      <React.Fragment key={nodeIdx}>
                        {renderLexicalNode(childNode, activePolicy, { current: 0 })}
                      </React.Fragment>
                    ))
                  )}

                  {/* SpeakUp Action Button (rendered manually to avoid strict database richText validation) */}
                  {activePolicy === 'speakup' && (
                    <div className="mt-6 flex flex-wrap gap-4">
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
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <AlertTriangle className="w-12 h-12 mb-3" />
                <span className="text-sm">Không tìm thấy tài liệu chính sách.</span>
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
