// components/analysis/SentimentGauge.tsx

export default function SentimentGauge({ value }: { value: number }) {
  // Ensure we have a valid number between 0 and 1
  const score = typeof value === "number" ? value : 0.5;
  const percentage = Math.round(score * 100);

  return (
    <div className="bg-white border border-black/[0.03] p-8 rounded-[32px] space-y-6 shadow-sm group">
      {/* Label with explicit Mono Font */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-ink-tertiary">
          Neural Charge
        </span>
        <span className="text-[10px] font-mono text-ink-tertiary opacity-40">
          Stat // {percentage}%
        </span>
      </div>

      {/* The Gauge Visual */}
      <div className="relative pt-2">
        {/* Background Track */}
        <div className="relative h-1.5 w-full bg-black/[0.04] rounded-full overflow-hidden">
          {/* Moving Gradient Fill */}
          <div
            className="h-full bg-gradient-to-r from-red-400 via-yellow-300 to-emerald-400 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Needle Indicator (Optional but looks very 'Instrumental') */}
        <div
          className="absolute top-0 h-4 w-0.5 bg-ink-primary transition-all duration-1000 ease-out"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        />
      </div>

      {/* Footer Labels with Serif Contrast */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary opacity-50">
          Negative
        </span>

        {/* Dynamic Sentiment Descriptor in Serif */}
        <span className="text-xs font-serif italic text-ink-secondary">
          {score > 0.7
            ? "Positive Resonance"
            : score < 0.4
              ? "Negative Friction"
              : "Neutral State"}
        </span>

        <span className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary opacity-50">
          Positive
        </span>
      </div>
    </div>
  );
}
