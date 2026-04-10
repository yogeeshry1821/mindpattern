export default function LoadMeter({ value }: { value: string }) {
  const isHigh = value.toLowerCase() === "high";
  return (
    <div className="bg-white border border-black/[0.03] p-8 rounded-[32px] space-y-4 shadow-sm">
      <span className="text-[10px] font-bold uppercase tracking-widest text-ink-tertiary">
        Cognitive Load
      </span>
      <div className="flex items-end gap-1.5 h-8">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`flex-1 rounded-t-sm transition-all duration-500 ${
              isHigh ? "bg-orange-500" : "bg-black/10"
            }`}
            style={{
              height: `${bar * 20}%`,
              opacity: isHigh || bar <= 2 ? 1 : 0.2,
            }}
          />
        ))}
      </div>
      <p className="text-xs font-bold uppercase tracking-tighter text-ink-primary">
        {value} intensity
      </p>
    </div>
  );
}
