// components/landing/hero.tsx
"use client";
import { motion } from "framer-motion";
import { NeuralBackground } from "./neural-background";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center bg-[#f9f9fb] overflow-hidden">
      <NeuralBackground />

      {/* Added max-w-7xl and mx-auto to center the whole block, and px-12 for left/right breathing room */}
      <div className="container mx-auto max-w-7xl px-12 md:px-20 relative z-10 pt-32">
        <div className="max-w-4xl">
          {" "}
          {/* Keeps the text width readable */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} // Subtle slide from left to emphasize the new spacing
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}>
            <h2 className="text-md font-medium text-black/40 tracking-tight mb-8">
              Most people know what they want.
            </h2>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-[#1a1a1a] mb-10">
            But they don’t know <br />
            <span className="text-black/20 italic font-serif font-light">
              how their own behavior stops them.
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}>
            <p className="text-xl md:text-2xl text-black/50 max-w-2xl mb-14 tracking-tight leading-relaxed">
              MindPattern identifies your thinking patterns <br />
              and guides you toward better decisions.
            </p>

            <div className="flex items-center space-x-4">
              <Button onClick={()=>(router.push('/signup'))} className="h-14 px-10 bg-[#1a1a1a] text-white rounded-full font-medium tracking-tight hover:bg-black transition-all shadow-2xl shadow-black/10">
                Start the Experience
              </Button>
              <button className="group h-14 w-14 rounded-full border border-black/5 bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-black/20 transition-all">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
