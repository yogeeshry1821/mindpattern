// app/(dashboard)/dashboard/journals/[id]/page.tsx
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
  PiCaretLeftBold,
  PiClipboardTextLight,
  PiCalendarBlankLight,
  PiClockLight,
  PiLockSimpleFill,
} from "react-icons/pi";

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Await the params object
  const { id } = await params;

  const journal = await prisma.journal.findUnique({
    where: {
      id: id, // Use the awaited id
    },
    include: {
      user: true,
    },
  });
  
  // Security: Check if exists and if it belongs to the logged-in user
  if (!journal || journal.user.email !== session.user.email) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      {/* 1. Navigation & Status */}
      <nav className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-tertiary hover:text-ink-primary transition-colors">
          <PiCaretLeftBold className="h-3 w-3" /> Back to Overview
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.02] border border-black/[0.05]">
          <PiLockSimpleFill className="h-3 w-3 text-ink-tertiary" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-ink-tertiary">
            Read Only Archive
          </span>
        </div>
      </nav>

      {/* 2. Metadata Header */}
      <header className="space-y-6 border-b border-black/[0.03] pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-ink-tertiary">
            <div className="flex items-center gap-1.5">
              <PiCalendarBlankLight className="h-4 w-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {new Date(journal.createdAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-black/10" />
            <div className="flex items-center gap-1.5">
              <PiClockLight className="h-4 w-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">
                {new Date(journal.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-primary">
            Session <span className="italic font-serif">Transcript</span>
          </h1>
        </div>
      </header>

      {/* 3. The Content (Prose) */}
      <main className="relative">
        {/* Decorative "Paper" vertical line */}
        <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-black/[0.03] hidden md:block" />

        <article className="max-w-none">
          <p className="text-xl md:text-2xl font-serif leading-[1.9] text-ink-secondary whitespace-pre-wrap italic selection:bg-black/5">
            {journal.content}
          </p>
        </article>
      </main>

      {/* 4. Footer Technical Data */}
      <footer className="pt-12 border-t border-black/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PiClipboardTextLight className="h-4 w-4 text-ink-tertiary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-tertiary">
            Verification Hash:{" "}
            <span className="text-ink-primary opacity-40 font-mono">
              {journal.id.substring(0, 12)}...
            </span>
          </span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-tertiary">
          Length:{" "}
          <span className="text-ink-primary">
            {journal.content.split(/\s+/).length} Words
          </span>
        </p>
      </footer>
    </div>
  );
}
