"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TAB_DATA = [
  {
    id: "insights",
    label: "AI Insights",
    title: "Deep Pattern Recognition",
    desc: "Our AI connects dots across weeks of entries, identifying why your Tuesday mood consistently dips.",
    visual: (
      <div className="relative flex h-full w-full items-center justify-center p-8">
        <div className="flex h-32 items-end gap-4">
          {[40, 70, 45, 90, 65].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="relative w-8 rounded-t-lg bg-black/10 transition-colors group-hover:bg-black/20"
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
      </div>
    ),
  },
  {
    id: "privacy",
    label: "Privacy",
    title: "Zero-Knowledge Storage",
    desc: "Your data is encrypted before it even leaves your device. We can't see it. No one can.",
    visual: (
      <div className="flex h-full flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl border border-black/5 bg-white shadow-xl"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </motion.div>
        <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-black/20">
          AES-256 Encrypted
        </div>
      </div>
    ),
  },
  {
    id: "habits",
    label: "Behavior",
    title: "Habitual Decoding",
    desc: "Identify the exact moment a thought pattern turns into a behavior. Stop the cycle before it repeats.",
    visual: (
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex h-48 w-48 items-center justify-center rounded-full border border-dashed border-black/10"
        >
          <div className="absolute top-0 h-2 w-2 rounded-full bg-black" />
        </motion.div>
        <div className="absolute text-2xl font-serif italic text-black/40">
          Patterns
        </div>
      </div>
    ),
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("landing-scroll");
    const section = sectionRef.current;

    if (!scrollContainer || !section) {
      return;
    }

    const updateActiveIndex = () => {
      const sectionTop = section.offsetTop;
      const maxScroll = Math.max(1, section.offsetHeight - scrollContainer.clientHeight);
      const sectionScroll = scrollContainer.scrollTop - sectionTop;
      const progress = Math.min(0.999, Math.max(0, sectionScroll / maxScroll));
      const nextIndex = Math.min(
        TAB_DATA.length - 1,
        Math.floor(progress * TAB_DATA.length)
      );

      setActiveIndex(nextIndex);
    };

    updateActiveIndex();
    scrollContainer.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scrollContainer.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  const activeTab = TAB_DATA[activeIndex];

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center">
        <motion.div
          className="container mx-auto max-w-7xl px-12 py-20 md:px-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <div className="w-full space-y-2 lg:w-[35%]">
              <h2 className="mb-10 pl-6 text-[11px] font-bold uppercase tracking-[0.3em] text-ink-tertiary">
                Capabilities
              </h2>

              {TAB_DATA.map((tab, index) => (
                <div
                  key={tab.id}
                  className="relative w-full rounded-2xl p-6 transition-all duration-500"
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 -z-10 rounded-2xl border border-black/[0.03] bg-[#f4f4f5] shadow-sm"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                    />
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="relative h-1 w-1">
                      {activeIndex === index && (
                        <motion.div
                          layoutId="indicator"
                          className="absolute inset-0 rounded-full bg-black"
                        />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${
                          activeIndex === index ? "text-ink-primary" : "text-ink-tertiary"
                        }`}
                      >
                        {tab.label}
                      </span>

                      <h3
                        className={`mt-1 text-xl font-semibold tracking-tight transition-colors duration-500 ${
                          activeIndex === index
                            ? "text-ink-primary"
                            : "text-ink-secondary/50"
                        }`}
                      >
                        {tab.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-[40px] border border-black/[0.03] bg-[#fbfbfb] lg:w-[65%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="px-16 text-center"
                >
                  <div className="mb-10 flex h-64 items-center justify-center">
                    {activeTab.visual}
                  </div>
                  <p className="mx-auto max-w-sm text-lg leading-relaxed text-ink-secondary">
                    {activeTab.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
