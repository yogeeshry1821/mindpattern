// components/landing/navbar.tsx
"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

export function Navbar({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollY } = useScroll({ container: containerRef });
  const router = useRouter();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Shrink/Proportionate Logic
  const range = [0, 100];
  const navWidth = useTransform(scrollY, range, ["100%", "90%"]);
  const navPadding = useTransform(scrollY, range, ["0px", "24px"]);
  const navBg = useTransform(scrollY, range, [
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0.5)",
  ]);
  const navBorder = useTransform(scrollY, range, [
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0.2)",
  ]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const productItems = [
    {
      name: "Neural Journal",
      desc: "AI-driven emotional pattern mapping.",
    },
    {
      name: "Focus Flow",
      desc: "Scientific deep-work environment.",

    },
    { name: "Echo Analysis", desc: "Voice-to-insight synthesis." },
  ];

  return (
    <motion.div
      style={{ padding: navPadding, paddingTop: navPadding }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        style={{
          width: navWidth,
          backgroundColor: navBg,
          borderColor: navBorder,
        }}
        className="max-w-7xl h-14 rounded-full border px-8 flex items-center justify-between pointer-events-auto transition-all duration-500 relative backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.04),inset_0_1px_1px_0_rgba(255,255,255,0.6)]">
        {/* Shine Streak */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
        />

        {/* Logo */}
        <div className="flex items-center space-x-2 relative z-10">
          <div className="h-4 w-4 rounded-full border border-black/10 flex items-center justify-center">
            <div className="h-1 w-1 bg-black rounded-full" />
          </div>
          <span className="text-md font-bold tracking-tighter uppercase">
            MindPattern
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-10 relative z-10">
          {/* Products with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}>
            <button className="flex items-center space-x-1 text-[12px] font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors">
              <span>Products</span>
              <motion.span animate={{ rotate: isProductsOpen ? 180 : 0 }}>
                <FaChevronDown className="text-[10px]" />
              </motion.span>
            </button>

            {/* Clean Dropdown */}
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white backdrop-blur-xl border border-black/[0.05] rounded-[24px] p-4 shadow-xl shadow-black/5 overflow-hidden">
                  <div className="flex flex-col space-y-1">
                    {productItems.map((product) => (
                      <button
                        key={product.name}
                        className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-black/5 transition-all text-left">
\                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-tighter text-black">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-black/40 leading-tight">
                            {product.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {["Docs", "Stories", "FAQ"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-[12px] font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors">
              {item}
            </button>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center space-x-6 relative z-10">
          <Link
            href="/login"
            className="text-[12px] font-bold uppercase tracking-widest text-black/60 hover:text-black">
            Login
          </Link>
          <Button
            onClick={() => router.push("/signup")}
            className="h-9 px-6 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-lg shadow-black/5">
            Get Started
          </Button>
        </div>
      </motion.nav>
    </motion.div>
  );
}
