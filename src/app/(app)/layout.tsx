import React from 'react';
import '../../index.css';

export const metadata = {
  title: 'GAMA.vn - Nơi chuyên môn hóa học kiến tạo tương lai',
  description: 'GAMA cung cấp giải pháp sơn phủ, chống thấm kiến trúc và công nghiệp cao cấp tiêu chuẩn xanh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
