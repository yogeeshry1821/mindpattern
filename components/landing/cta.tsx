// components/landing/cta.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaSparkles } from "react-icons/fa";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"
      />
      2:09 AM
      <div className="container mx-auto px-4 relative z-10">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center">
          {" "}
          <FaSparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />{" "}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {" "}
            Ready to Start Your Journey?{" "}
          </h2>{" "}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {" "}
            Join thousands who are gaining deeper insights into their mental
            well-being. Start journaling today—it's free forever.{" "}
          </p>{" "}
          <Link href="/signup">
            {" "}
            <Button
              size="lg"
              className="text-lg px-10 py-7 bg-white text-primary-600 hover:bg-slate-100 shadow-2xl hover:shadow-white/20 transition-all group">
              {" "}
              Create Free Account{" "}
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />{" "}
            </Button>{" "}
          </Link>{" "}
          <p className="text-white/80 mt-6 text-sm">
            {" "}
            No credit card required • Free forever • 2-minute setup{" "}
          </p>{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
}