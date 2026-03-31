import type { RunwayStage } from "@/data/types/expert";

const MILESTONES: { stage: RunwayStage; label: string; sub: string }[] = [
  { stage: "GATE", label: "Offer signed", sub: "Pre-boarding" },
  { stage: "PUSHBACK", label: "Day One", sub: "Orientation" },
  { stage: "TAXI", label: "Training", sub: "Weeks 1–4" },
  { stage: "ROLL", label: "Supervised", sub: "Contacts 1–10" },
  { stage: "TAKEOFF", label: "Takeoff", sub: "Independent" },
];

const STAGE_ORDER: RunwayStage[] = ["GATE", "PUSHBACK", "TAXI", "ROLL", "TAKEOFF"];

export function MilestoneTimeline({
  currentStage,
  daysToTakeoff = 14,
}: {
  currentStage: RunwayStage;
  daysToTakeoff?: number;
}) {
  const currentIdx = STAGE_ORDER.indexOf(currentStage);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0F2B5B]/25 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Journey milestones</h2>
        <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-300">
          ~{daysToTakeoff} days to Takeoff
        </span>
      </div>

      <div className="relative flex items-center justify-between gap-1">
        {/* connecting line */}
        <div className="absolute left-[10%] right-[10%] top-[22px] h-0.5 bg-white/10" />
        <div
          className="absolute left-[10%] top-[22px] h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 transition-all"
          style={{ width: `${Math.max(0, (currentIdx / (MILESTONES.length - 1)) * 80)}%` }}
        />

        {MILESTONES.map((m, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={m.stage} className="relative flex flex-1 flex-col items-center">
              <div
                className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                  done
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                    :                   active
                    ? "border-amber-400 bg-amber-500/20 text-amber-200"
                    : "border-slate-700 bg-slate-900 text-slate-500"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <p className={`mt-2 text-center text-[11px] font-semibold ${active ? "text-amber-300" : done ? "text-emerald-400" : "text-slate-500"}`}>
                {m.label}
              </p>
              <p className="text-center text-[10px] text-slate-600">{m.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
