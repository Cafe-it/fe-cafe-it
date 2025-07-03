import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
