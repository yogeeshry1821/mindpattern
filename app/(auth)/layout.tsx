// app/(auth)/layout.tsx
"use client";

import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* 1. min-h-screen + h-auto: Allows the page to be scrollable if content is tall.
      2. items-start: Pushes the card to the TOP.
      3. pt-20: This is the specific gap from the very top (adjust as needed).
    */
    <div className="min-h-screen h-auto w-full bg-[#f9f9fb] relative overflow-y-auto flex items-start justify-center pt-20 pb-20 md:pt-32">
      {/* Brand Header - Fixed at top so it doesn't move */}
      <header className="absolute top-0 left-0 p-8 md:p-12 z-50">
        <Link href="/" className="inline-flex items-center space-x-3 group">
          <div className="h-4 w-4 rounded-full border border-black/20 flex items-center justify-center group-hover:border-black transition-colors">
            <div className="h-1 w-1 bg-black rounded-full" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-black">
            MindPattern
          </span>
        </Link>
      </header>

      {/* The Children (Login Card) */}
      <div className="w-full max-w-[400px] z-10 px-6">{children}</div>

      {/* Subtle Bottom Metadata - Fixed to the screen bottom */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 opacity-10 text-[9px] uppercase tracking-widest font-mono pointer-events-none hidden md:flex justify-between">
        <span>Identity // Verified</span>
        <span>Secure Terminal</span>
      </footer>
    </div>
  );
}
