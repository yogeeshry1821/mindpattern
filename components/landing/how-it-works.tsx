// components/landing/how-it-works.tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    tag: "Observation",
    title: "Capture the raw signal.",
    desc: "Most thoughts are lost to the noise of the day. Start by documenting the unfiltered stream of your consciousness. No judgment, just data.",
    sub: "The act of observing a behavior is the first step to changing it.",
  },
  {
    tag: "Analysis",
    title: "Reveal the hidden architecture.",
    desc: "Our AI doesn't just read your words; it maps the emotional resonance between them. It identifies the recurring loops that keep you stuck.",
    sub: "You are not your thoughts; you are the patterns they create.",
  },
  {
    tag: "Synthesis",
    title: "Build a new operating system.",
    desc: "Once a pattern is identified, it loses its power. We guide you toward intentional decisions that override your default habits.",
    sub: "Actionable clarity replaces habitual confusion.",
  },
];

export function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-48 bg-surface-soft relative">
      <div className="container mx-auto max-w-7xl px-12 md:px-20 relative">
        {/* THE PROGRESS THREAD - Swapped to ink-primary/20 for better visibility */}
        <div className="absolute left-[54px] md:left-[86px] top-64 bottom-64 w-[1px] bg-ink-primary/5 hidden lg:block">
          <motion.div
            style={{ scaleY }}
            className="w-full h-full bg-ink-primary/20 origin-top"
          />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-48">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter text-ink-primary mb-8">
            The path to <br />
            <span className="text-ink-tertiary italic font-serif">
              radical self-clarity.
            </span>
          </motion.h2>
          <p className="text-xl text-ink-secondary tracking-tight max-w-xl leading-relaxed">
            Transformation isn’t about intensity. It’s about identifying the
            invisible forces that dictate your daily life.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-64">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
              {/* Left Side: The "Label" */}
              <div className="lg:w-1/3 z-10">
                <div className="sticky top-40 bg-surface-soft/80 backdrop-blur-sm py-2">
                  <div className="flex items-center space-x-6 mb-6">
                    {/* Darker node for the "Ink" style */}
                    <div className="h-3 w-3 rounded-full border border-ink-primary/20 bg-ink-primary shadow-sm" />
                    <span className="text-[11px] font-bold tracking-[0.4em] text-ink-tertiary uppercase">
                      Phase 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-ink-secondary pl-9">
                    {step.tag}
                  </h3>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:w-2/3 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                  <h4 className="text-3xl md:text-5xl font-semibold tracking-tighter text-ink-primary mb-8 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-xl text-ink-secondary leading-relaxed mb-10 tracking-tight">
                    {step.desc}
                  </p>

                  <div className="pl-8 border-l border-ink-primary/10 italic font-serif text-lg text-ink-tertiary">
                    &ldquo;{step.sub}&rdquo;
                  </div>

                  {/* High-End Visual Anchor */}
                  <div className="mt-20 relative w-full aspect-[16/9] rounded-[40px] border border-ink-primary/[0.03] bg-white overflow-hidden group shadow-sm">
                    <div
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                      style={{
                        backgroundImage:
                          "radial-gradient(#000 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-[0.6em]">
                        Data Stream 0{index + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* The Final Psychological Hook */}
        <div className="mt-64 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-white border border-ink-primary/[0.03] p-16 md:p-24 rounded-[64px] shadow-sm max-w-4xl">
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-10 leading-tight text-ink-primary">
              Ready to meet the person <br />
              <span className="text-ink-tertiary italic font-serif">
                you haven&apos;t noticed yet?
              </span>
            </h3>
            <button className="h-16 px-12 bg-ink-primary text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-black hover:scale-[1.03] transition-all active:scale-[0.98] shadow-2xl shadow-ink-primary/10">
              Enter the Pattern
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
