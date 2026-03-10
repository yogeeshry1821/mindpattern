import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MindPattern - AI-Powered Mental Health Journaling",
  description:
    "Transform your thoughts into insights with AI-powered journaling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen relative">
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        </div>

        <Providers>
          <div className="relative z-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}