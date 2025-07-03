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
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        {children}
      </body>
    </html>
  );
}
