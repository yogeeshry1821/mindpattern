// components/landing/footer.tsx
"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-soft border-t border-ink-primary/[0.02] pt-32 pb-12">
      <div className="container mx-auto max-w-7xl px-12 md:px-20">
        {/* Top Section: Brand Statement & Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-sm">
            <div className="flex items-center space-x-3 mb-8">
              <div className="h-4 w-4 rounded-full border border-ink-primary/20 flex items-center justify-center">
                <div className="h-1 w-1 bg-ink-primary rounded-full" />
              </div>
              <span className="text-sm font-bold tracking-tighter uppercase text-ink-primary">
                MindPattern
              </span>
            </div>
            <p className="text-2xl font-medium tracking-tighter text-ink-primary leading-tight">
              Decoding the invisible architecture of your mind.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-24 gap-y-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-tertiary block mb-6">
                Product
              </span>
              <ul className="space-y-4 text-[13px] font-medium text-ink-secondary">
                <li>
                  <Link
                    href="/method"
                    className="hover:text-ink-primary transition-colors">
                    Method
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="hover:text-ink-primary transition-colors">
                    Privacy/AES-256
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-ink-primary transition-colors">
                    Membership
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-tertiary block mb-6">
                Connect
              </span>
              <ul className="space-y-4 text-[13px] font-medium text-ink-secondary">
                <li>
                  <Link
                    href="https://x.com"
                    className="hover:text-ink-primary transition-colors italic font-serif">
                    @mindpattern
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com"
                    className="hover:text-ink-primary transition-colors">
                    Github
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ink-tertiary block mb-6">
                Legal
              </span>
              <ul className="space-y-4 text-[13px] font-medium text-ink-secondary">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-ink-primary transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ethics"
                    className="hover:text-ink-primary transition-colors">
                    AI Ethics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* System Status Bar: The "Scientific" Detail */}
        <div className="border-t border-ink-primary/[0.05] pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left: Metadata */}
            <div className="flex items-center space-x-8 text-[10px] font-mono uppercase tracking-[0.2em] text-ink-tertiary">
              <div className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500/80 animate-pulse" />
                <span>System Operational</span>
              </div>
              <div className="hidden md:block">v2.4.0-Stable</div>
              <div className="hidden md:block">
                Lat: 12.9716° N / Lon: 77.5946° E
              </div>
            </div>

            {/* Right: Copyright & Tagline */}
            <div className="flex flex-col items-center md:items-end text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-tertiary mb-2">
                © {currentYear} MindPattern Studio
              </p>
              <p className="text-[10px] font-serif italic text-ink-tertiary opacity-60">
                Built for the evolution of thought.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Visual: Fading Line */}
        <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-ink-primary/[0.05] to-transparent" />
      </div>
    </footer>
  );
}
