import type { Metadata } from "next";

import "./globals.css";
import { pretendard } from "./fonts";

export const metadata: Metadata = {
  title: "Cafe-it",
  description: "Check real-time cafe seat availability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased bg-gray-100`}>
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm">
          {children}
        </div>
      </body>
    </html>
  );
}
