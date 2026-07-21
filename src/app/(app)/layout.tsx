import React from 'react';
import '../../index.css';
import { getHeader, getFooter } from '../../lib/payloadApi';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Playfair_Display, Roboto, Roboto_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  display: 'swap',
});
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const headerData = await getHeader();
  return {
    title: headerData?.siteTitle ?? 'GAMA.vn - Nơi chuyên môn hóa học kiến tạo tương lai',
    description: headerData?.siteDescription ?? 'GAMA cung cấp giải pháp sơn phủ, chống thấm kiến trúc và công nghiệp cao cấp tiêu chuẩn xanh.',
    icons: {
      icon: [
        { url: '/favicon/icon0.svg', type: 'image/svg+xml' },
        { url: '/favicon/icon1.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: [
        { url: '/favicon/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [headerData, footerData] = await Promise.all([getHeader(), getFooter()]);

  return (
    <html lang="vi" className={`${playfair.variable} ${roboto.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#93CC88]/20 selection:text-[#1E463E]">
          <Header headerData={headerData} />
          <main className="flex-grow">{children}</main>
          <Footer footerData={footerData} />
        </div>
      </body>
    </html>
  );
}
