import React from 'react';
import '../../index.css';
import { getHeader, getFooter, getPage, HeaderGlobal, FooterGlobal, PageDoc } from '../../lib/payloadApi';
import App from '../../App';
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
  const headerData: HeaderGlobal | null = await getHeader();
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
  // Fetch globals and home page data server-side
  const headerData: HeaderGlobal | null = await getHeader();
  const footerData: FooterGlobal | null = await getFooter();
  const homePage: PageDoc | null = await getPage('home');

  return (
    <html lang="vi" className={`${playfair.variable} ${roboto.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <App headerData={headerData} footerData={footerData} homePage={homePage} />
        {children}
      </body>
    </html>
  );
}


