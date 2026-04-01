import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; // [ASSUMPTION] Prisma singleton exists here
import {
  PiWavesLight,
  PiFingerprintLight,
  PiPlusBold,
  PiArrowRightBold,
} from "react-icons/pi";
import { Navbar } from "@/components/landing/navbar";
// import JournalCard from "@/components/ui/JournalCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const journals = await prisma.journal.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });
  console.log("journals", journals);
  // --- NEURAL CALCULATIONS ---
  const analyzedEntries = journals.filter((j) => j.analysis);
  const totalEntries = journals.length;

  // Calculate Average Sentiment
  const avgSentiment =
    analyzedEntries.length > 0
      ? analyzedEntries.reduce((acc, curr) => {
          // Access curr.analysis directly!
          const data = curr.analysis as any;
          return acc + (data?.sentiment || 0);
        }, 0) / analyzedEntries.length
      : 0;
  // Calculate Cognitive Load peaks
  const highLoadCount = analyzedEntries.filter((j) => {
    const data = j.analysis as string
    return data.cognitive_load?.toLowerCase() === "high";
  }).length;

  // Determine Pattern Identity status
  const identityStatus =
    totalEntries > 5 ? "Stable" : totalEntries > 0 ? "Refining" : "Awaiting";

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10  pt-24 px-6 relative">
      <Navbar />

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/[0.03] pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink-tertiary">
              System Active // {session.user?.name}
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink-primary">
            Intelligence <span className="italic font-serif">Overview</span>
          </h1>
        </div>

        <Button
          asChild
          className="h-12 px-8 bg-ink-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-black/5">
          <Link href="/dashboard/new" className="flex items-center gap-2">
            <PiPlusBold className="h-4 w-4" /> Initiate Session
          </Link>
        </Button>
      </header>
      {analyzedEntries.length > 0 && (
        <section className="relative group">
          {/* Surface-Soft Background Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-black/[0.02] to-transparent rounded-[40px] blur-xl opacity-50 transition group-hover:opacity-100" />

          <div className="relative bg-white border border-black/[0.03] rounded-[32px] p-10 overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* The "Scanner" Visual */}
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full border border-black/[0.05] flex items-center justify-center relative">
                  <PiWavesLight className="h-8 w-8 text-black/20 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-t-2 border-black/10 animate-spin [animation-duration:3s]" />
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500">
                    Active Synthesis
                  </span>
                  <div className="h-1 w-1 rounded-full bg-black/10" />
                  <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">
                    Ref: {analyzedEntries[0].id.slice(0, 8)}
                  </span>
                </div>

                <blockquote className="text-2xl md:text-3xl font-serif italic text-ink-primary leading-tight tracking-tight">
                  {(analyzedEntries[0].analysis as any)?.summary}
                </blockquote>

                <p className="text-[11px] text-ink-tertiary font-medium uppercase tracking-widest opacity-60">
                  Primary takeaway from your most recent neural observation.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* 2. Key Metrics - NOW DYNAMIC */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Neural Archive"
          value={totalEntries.toString()}
          desc={`${analyzedEntries.length} entries processed by engine`}
          icon={<PiWavesLight className="h-5 w-5 text-ink-tertiary" />}
        />
        <StatCard
          label="Pattern Identity"
          value={identityStatus}
          desc={`Mood Stability: ${(avgSentiment * 100).toFixed(0)}%`}
          icon={<PiFingerprintLight className="h-5 w-5 text-ink-tertiary" />}
        />
        <StatCard
          label="Cognitive Load"
          value={highLoadCount > 0 ? `${highLoadCount} Peaks` : "Optimal"}
          desc={
            highLoadCount > 0
              ? "High mental stress detected"
              : "No critical strain found"
          }
          icon={<PiFingerprintLight className="h-5 w-5 text-ink-tertiary" />}
        />
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-black/[0.03] pb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-tertiary">
            Chronological Archive
          </h2>
          <span className="text-[10px] font-mono text-ink-tertiary uppercase opacity-50">
            {totalEntries} Records Found
          </span>
        </div>

        {totalEntries > 0 ? (
          <div className="grid gap-px bg-black/[0.03] border border-black/[0.03] rounded-[32px] overflow-hidden shadow-sm">
            {journals.map((entry) => {
              const analysis = entry.analysis as any;
              return (
                <Link
                  key={entry.id}
                  href={`/dashboard/journals/${entry.id}`}
                  className="group bg-white p-8 hover:bg-[#fcfcfd] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">
                        {new Date(entry.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {/* Analysis Badge */}
                      {analysis && (
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-black/10" />
                          <span className="text-[9px] font-bold uppercase tracking-tighter text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                            Neural Insight Available
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-lg font-serif italic text-ink-secondary line-clamp-1 group-hover:text-ink-primary transition-colors leading-relaxed">
                        {entry.content}
                      </p>
                      {/* Show topics preview if available */}
                      {analysis?.topics && (
                        <div className="flex gap-2 mt-2">
                          {analysis.topics.slice(0, 3).map((t: string) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono text-slate-400 uppercase">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink-tertiary">
                      {analysis ? "View Insights" : "Analyzing"}
                    </span>
                    <PiArrowRightBold className="h-3 w-3 text-ink-primary" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="group relative border border-black/[0.03] bg-white rounded-[32px] p-16 flex flex-col items-center justify-center text-center transition-all hover:border-black/10">
            <div className="h-12 w-12 rounded-full border border-black/[0.05] flex items-center justify-center mb-6">
              <div className="h-2 w-2 bg-black/20 rounded-full" />
            </div>
            <p className="text-ink-secondary text-sm font-serif italic mb-6 max-w-xs">
              "Your narrative remains unwritten today. The first step to clarity
              is observation."
            </p>
            <Button
              variant="outline"
              asChild
              className="rounded-xl border-black/[0.05] text-[10px] uppercase tracking-widest font-bold h-10 px-6 hover:bg-surface-soft">
              <Link href="/dashboard/new">Record Entry</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  desc,
  icon,
}: {
  label: string;
  value: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-black/[0.03] rounded-[24px] p-6 hover:shadow-lg hover:shadow-black/[0.02] transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-tertiary">
          {label}
        </span>
        {icon}
      </div>
      <div className="text-2xl font-semibold text-ink-primary mb-1 tracking-tight">
        {value}
      </div>
      <p className="text-[10px] text-ink-tertiary italic font-serif">{desc}</p>
    </div>
  );
}
