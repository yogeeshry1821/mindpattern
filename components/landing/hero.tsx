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

      <div className="container mx-auto max-w-7xl px-12 md:px-20 relative z-10 pt-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}>
            <h2 className="text-md font-medium text-black/50 tracking-tight mb-8">
              Most people know what they want.
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-[#1a1a1a] mb-10">
            But they don’t know <br />
            {/* CHANGED: Increased opacity from black/20 to black/50 for accessibility & readability */}
            <span className="text-black/50 italic font-serif font-light">
              how their own behavior stops them.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}>
            {/* CHANGED: Updated copy to ground the user in reality (Option 3 style) */}
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl mb-12 tracking-tight leading-relaxed">
              Meet your AI-powered wellness journal. We track your moods,
              analyze your thought patterns, and give you the personal insights
              you need to get out of your own way.
            </p>

            {/* CHANGED: Switched to flex-col to stack button and social proof, removed space-x-4 */}
            <div className="flex flex-col items-start">
              {/* CHANGED: Arrow is now INSIDE the primary button. Added 'group' to animate the arrow on hover. */}
              <Button
                onClick={() => router.push("/signup")}
                className="group h-14 px-8 bg-[#1a1a1a] text-white rounded-full font-medium tracking-tight hover:bg-black transition-all shadow-2xl shadow-black/10 flex items-center gap-3">
                Start the Experience
                <svg
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>

              {/* CHANGED: Added social proof right below the point of friction */}
              <p className="mt-4 ml-4 text-sm font-medium text-black/40">
                Join 14,000+ minds finding clarity today.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
