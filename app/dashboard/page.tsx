// app/(dashboard)/dashboard/page.tsx
import { authOptions } from "@/lib/auth"; // Import your options insteadimport { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { Plus, Fingerprint, Activity, Zap } from "lucide-react";
import { redirect } from "next/navigation";
export default async function DashboardPage() {
const session = await getServerSession(authOptions); // Use this instead of auth()

  if (!session) {
    redirect("/login");
  }

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
            <Plus className="h-4 w-4" /> Initiate Session
          </Link>
        </Button>
      </header>

      {/* 2. Key Metrics (The "Biometrics" Row) */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Cognitive Load"
          value="Normal"
          desc="Based on last 3 entries"
          icon={<Activity className="h-4 w-4 text-ink-tertiary" />}
        />
        <StatCard
          label="Pattern Identity"
          value="Refining"
          desc="42% data density"
          icon={<Fingerprint className="h-4 w-4 text-ink-tertiary" />}
        />
        <StatCard
          label="Neural Velocity"
          value="1.2x"
          desc="Higher than last week"
          icon={<Zap className="h-4 w-4 text-ink-tertiary" />}
        />
      </div>

      {/* 3. The Main Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink-tertiary">
            Recent Observations
          </h2>
          <Link
            href="/dashboard/journals"
            className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity">
            View Archive
          </Link>
        </div>

        {/* Empty State: Styled as an "Alignment" box */}
        <div className="group relative border border-black/[0.03] bg-white rounded-[32px] p-16 flex flex-col items-center justify-center text-center transition-all hover:border-black/10">
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />

          <div className="h-12 w-12 rounded-full border border-black/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
      </section>
    </div>
  );
}

// Simple internal component for the stats
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
