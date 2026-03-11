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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch real data from your 'journals' table
  const journals = await prisma.journal.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  const totalEntries = journals.length;

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10 px-6">
      {/* 1. Scientific Header */}
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

      {/* 2. Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Neural Archive"
          value={totalEntries.toString()}
          desc="Total observations stored"
          icon={<PiWavesLight className="h-5 w-5 text-ink-tertiary" />}
        />
        <StatCard
          label="Pattern Identity"
          value={totalEntries > 0 ? "Refining" : "Awaiting"}
          desc="Data density tracking"
          icon={<PiFingerprintLight className="h-5 w-5 text-ink-tertiary" />}
        />
        <StatCard
          label="Cognitive Load"
          value="Calculated"
          desc="Active analysis pending"
          icon={<PiFingerprintLight className="h-5 w-5 text-ink-tertiary" />}
        />
      </div>

      {/* 3. The Feed / Archive */}
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
            {journals.map((entry) => (
              <Link
                key={entry.id}
                href={`/dashboard/journals/${entry.id}`}
                className="group bg-white p-8 hover:bg-[#fcfcfd] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="h-1 w-1 rounded-full bg-black/10" />
                    <span className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest opacity-50">
                      {new Date(entry.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-lg font-serif italic text-ink-secondary line-clamp-1 group-hover:text-ink-primary transition-colors leading-relaxed">
                    {entry.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink-tertiary">
                    Analyze
                  </span>
                  <PiArrowRightBold className="h-3 w-3 text-ink-primary" />
                </div>
              </Link>
            ))}
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
