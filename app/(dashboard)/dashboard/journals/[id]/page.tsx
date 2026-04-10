import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  PiArrowLeftBold,
  PiLockKeyBold,
  PiCheckCircleBold,
} from "react-icons/pi";
import SentimentGauge from "../../../../../components/analysis/SentimentGauge";
import LoadMeter from "../../../../../components/analysis/LoadMeter";

export default async function JournalDetailPage({
  params,
}: {
  params: { id: string };
}) {

  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  // 2. Use the awaited 'id'
  const journal = await prisma.journal.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!journal) notFound();

  const analysis = journal.analysis as any; // Already parsed by Prisma

  return (
    <main className="max-w-6xl mx-auto py-20 px-6 space-y-12">
      {/* 1. Header Navigation */}
      <nav className="flex items-center justify-between border-b border-black/[0.03] pb-6">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-tertiary hover:text-ink-primary transition-colors">
          <PiArrowLeftBold className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          Intelligence Overview
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-black/[0.02] rounded-full">
          <PiLockKeyBold className="h-3 w-3 text-ink-tertiary" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-ink-tertiary">
            Secure Neural Archive // Read-Only
          </span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* LEFT COLUMN: THE EVIDENCE (5/12) */}
        <section className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-[0.3em]">
              Observation Record //{" "}
              {new Date(journal.createdAt).toLocaleDateString()}
            </span>
            <h1 className="text-3xl font-serif italic text-ink-primary leading-tight">
              Session Transcript
            </h1>
          </div>

          <div className="p-8 bg-white border border-black/[0.03] rounded-[32px] shadow-sm relative group">
            <p className="text-lg text-ink-secondary leading-relaxed whitespace-pre-wrap font-serif italic">
              "{journal.content}"
            </p>
            <div className="mt-8 pt-6 border-t border-black/[0.03] flex justify-between items-center text-[10px] font-mono text-ink-primary uppercase opacity-70">
              <span>Word Count: {journal.content.split(" ").length}</span>
              <span>Hash: {journal.id.slice(-8)}</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: THE SCIENCE (7/12) */}
        <section className="lg:col-span-7 space-y-12 font-sans">
          {analysis ? (
            <div className="animate-in fade-in duration-700">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] !font-mono font-bold uppercase tracking-widest text-indigo-500">
                    Neural Synthesis Result
                  </span>
                </div>

                <h2 className="text-3xl !font-serif italic font-semibold tracking-tight text-ink-primary leading-[1.1] py-2">
                  {analysis.summary}
                </h2>

                <div className="flex flex-wrap gap-2 pt-2 p-2">
                  {analysis.topics?.map((topic: string) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-black/[0.03] text-[10px] font-bold uppercase tracking-widest text-ink-tertiary rounded-full">
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Visualization Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                <SentimentGauge value={analysis.sentiment} />
                <LoadMeter value={analysis.cognitive_load} />
              </div>

              {/* Recommended Steps */}
              <div className="bg-black/100 p-10 rounded-[40px] shadow-2xl">
                <h3 className="text-[10px] font-bold  uppercase tracking-[0.4em] mb-8 text-white/50">
                  Recommended Protocols
                </h3>

                <ul className="space-y-6">
                  {(
                    analysis.recommendations || [
                      "Continue monitoring this pattern",
                      "Review observations in 48 hours",
                    ]
                  ).map((step: string, index: number) => (
                    <li key={index} className="flex gap-4 items-start">
                      <PiCheckCircleBold className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="text-lg font-serif italic text-white/90">
                        {step}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-20 border border-dashed border-black/10 rounded-[40px] text-center">
              <p className="text-ink-tertiary font-serif italic">
                The Neural Engine is currently calculating insights...
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
