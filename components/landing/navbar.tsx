// components/landing/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      {/* 1. Same max-w-7xl as your Hero 
          2. Same px-12 md:px-20 as your Hero 
          3. w-full so it spans the container correctly
      */}
      <nav className="w-full max-w-7xl px-12 md:px-20">
        <div className="h-14 rounded-full border border-black/[0.04] bg-white/70 backdrop-blur-xl px-6 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          {/* Logo starts exactly where the 'Most people...' text starts */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
            <span className="text-md font-semibold tracking-tighter text-[#1a1a1a]">
              MindPattern
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-10">
            <Link
              href="/login"
              className="text-[13px] font-medium text-black/40 hover:text-black transition-colors">
              Login
            </Link>
            <Link href="/signup">
              <Button className="h-8 px-5 bg-[#1a1a1a] text-white rounded-full text-[11px] font-bold uppercase tracking-wider transition-all hover:bg-black">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
