// app/(dashboard)/dashboard/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Using Phosphor for a more "Clinical/Luxury" feel
import {
  PiCaretLeftBold,
  PiCloudCheckLight,
  PiCommandLight,
  PiArrowRightBold,
} from "react-icons/pi";

export default function NewEntryClient() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content.length === 0) return;
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, [content]);
  const handleCommit = async () => {
    if (content.length < 10) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        router.push("/dashboard");
        router.refresh(); // Refresh dashboard data
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to commit entry. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
      {/* 1. Header with Phosphor Icons */}
      <motion.header
        animate={{ opacity: isTyping ? 0.05 : 1 }}
        className="flex items-center justify-between px-8 py-6 sticky top-0 bg-[#fcfcfd]/80 backdrop-blur-sm z-20 transition-opacity duration-1000">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors">
          <PiCaretLeftBold className="h-3 w-3" /> Archive
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/[0.03]">
            <PiCloudCheckLight className="h-4 w-4 text-emerald-600" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#8a8a8a]">
              Live Encryption
            </span>
          </div>
          <Button
            disabled={isSaving || content.length < 10}
            onClick={handleCommit}
            className="h-10 px-6 bg-[#1a1a1a] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-black/5">
            {isSaving ? "Processing..." : "Commit Entry"}
            <PiArrowRightBold className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </motion.header>

      <main className="flex-1 flex justify-center px-6 pb-32">
        {/* The "Stage" - This controls the horizontal constraints */}
        <div className="w-full max-w-2xl mt-24 relative px-4 md:px-0">
          {/* Scientific Metadata (Remains absolute, floating outside the text flow) */}
          <motion.aside
            animate={{ opacity: isTyping ? 0 : 1, x: isTyping ? -15 : 0 }}
            className="absolute -left-64 top-2 w-44 hidden xl:block space-y-10 transition-all duration-1000">
            {/* ... (Metadata Content) ... */}
          </motion.aside>

          {/* The Typewriter Editor with proper internal breathing room */}
          <textarea
            autoFocus
            placeholder="Begin your narrative..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setIsTyping(true);
            }}
            /* Added: leading-relaxed and tracking-tight for that "Ink" look */
            className="w-full min-h-[600px] bg-transparent border-none focus:ring-0 resize-none text-2xl font-serif leading-[1.9] tracking-tight text-[#1a1a1a] placeholder:text-[#1a1a1a]/10 selection:bg-black/5 transition-colors"
            style={{ outline: "none" }}
          />

          {/* ... (Prompt Suggestion) ... */}
        </div>
      </main>

      {/* 3. Minimal Command Footer */}
      <motion.footer
        animate={{ opacity: isTyping ? 0 : 1, y: isTyping ? 20 : 0 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-1000">
        <div className="px-5 py-2.5 bg-white/90 backdrop-blur-xl border border-[#1a1a1a]/[0.05] rounded-full shadow-2xl flex items-center gap-8">
          <div className="flex items-center gap-3">
            <PiCommandLight className="h-4 w-4 text-[#8a8a8a]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8a8a]">
              System Menu
            </span>
          </div>
          <div className="h-4 w-[1px] bg-[#1a1a1a]/[0.05]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8a8a]">
            Tokens:{" "}
            <span className="text-[#1a1a1a] font-mono">{content.length}</span>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

