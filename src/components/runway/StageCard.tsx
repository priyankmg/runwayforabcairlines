import type { StageProgress } from "@/services/runway-engine";

export function StageCard({ stage }: { stage: StageProgress }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{stage.label}</h3>
        <span className="text-sm text-slate-400">{stage.percentComplete}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#0B1426]">
        <div
          className="h-full rounded-full bg-sky-500/80 transition-all"
          style={{ width: `${stage.percentComplete}%` }}
        />
      </div>
      <p className="mt-2 text-xs capitalize text-slate-500">Status: {stage.status}</p>
    </div>
  );
}
