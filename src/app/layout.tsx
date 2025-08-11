'use client';

import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeaderFooter = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/register');

  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          {showHeaderFooter && <Header />}
          <main className="flex-1">{children}</main>
          {showHeaderFooter && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
