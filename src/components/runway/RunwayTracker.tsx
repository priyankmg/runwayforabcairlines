"use client";

import { motion } from "framer-motion";
import type { StageProgress } from "@/services/runway-engine";
import { Plane, Truck, PlaneTakeoff, Gauge, Rocket } from "lucide-react";
import type { RunwayStage } from "@/data/types/expert";

const icons: Record<RunwayStage, typeof Plane> = {
  GATE: Plane,
  PUSHBACK: Truck,
  TAXI: Plane,
  ROLL: Gauge,
  TAKEOFF: PlaneTakeoff,
};

function StageIcon({ stage }: { stage: RunwayStage }) {
  const I = icons[stage];
  return <I className="h-4 w-4" />;
}

export function RunwayTracker({
  stages,
  overallPercent,
}: {
  stages: StageProgress[];
  overallPercent: number;
}) {
  const planeX = `${Math.min(94, Math.max(6, overallPercent * 0.92))}%`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#0F2B5B]/80 to-[#0B1426] p-6 shadow-lg shadow-black/40">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Overall progress</h2>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-400">
          {overallPercent}% to Takeoff pace
        </span>
      </div>
      <p className="mb-8 text-sm text-slate-400">From hired to cleared for takeoff — one continuous journey.</p>

      <div className="relative mt-4 h-24">
        <div className="absolute bottom-8 left-0 right-0 h-3 rounded-full bg-[#0B1426] ring-1 ring-amber-500/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-600 via-amber-500 to-emerald-500 opacity-90"
            style={{ width: `${overallPercent}%` }}
          />
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <div
              key={t}
              className="absolute bottom-0 h-4 w-1 -translate-x-1/2 rounded-t bg-amber-400/80"
              style={{ left: `${t * 100}%` }}
            />
          ))}
        </div>
        <motion.div
          className="absolute bottom-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#0F2B5B] text-amber-400 shadow-lg ring-2 ring-amber-500/50"
          style={{ left: planeX }}
          layout
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <Rocket className="h-5 w-5" />
        </motion.div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stages.map((s) => (
          <div
            key={s.stage}
            className={`rounded-xl border p-3 text-center ${
              s.status === "current"
                ? "border-amber-500/60 bg-amber-500/10"
                : s.status === "complete"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F2B5B] text-sky-300">
              <StageIcon stage={s.stage} />
            </div>
            <div className="text-xs font-semibold text-white">{s.label}</div>
            <div className="mt-1 text-[11px] text-slate-400">{s.percentComplete}%</div>
            <div
              className={`mt-1 text-[10px] font-medium uppercase ${
                s.status === "current" ? "text-amber-400" : s.status === "complete" ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              {s.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
