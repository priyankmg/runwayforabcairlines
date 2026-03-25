"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane } from "lucide-react";
import type { RunwayStage } from "@/data/types/expert";
import { RUNWAY_PHASES_ORDERED, getRunwayPhaseCopy } from "@/data/runway-phase-copy";
import { phaseStripProgress } from "@/services/runway-engine";

type Props = {
  expertStage: RunwayStage;
};

export function RunwayPhaseStrip({ expertStage }: Props) {
  const [selected, setSelected] = useState<RunwayStage>(expertStage);

  useEffect(() => {
    setSelected(expertStage);
  }, [expertStage]);

  const active = getRunwayPhaseCopy(selected);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Your runway</h1>

      <div
        className="mt-6 min-h-[120px] rounded-2xl border border-white/10 bg-[#0F2B5B]/25 p-6 md:p-8"
        role="region"
        aria-live="polite"
        aria-label="Selected phase details"
      >
        <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">{active.title}</h2>
        <p className="mt-4 text-base font-normal leading-relaxed text-slate-300 md:text-[17px]">{active.tagline}</p>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
          Select a phase
        </p>

        <div className="flex min-w-0 w-full gap-3 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible md:pb-0 md:snap-none">
          {RUNWAY_PHASES_ORDERED.map((phase) => {
            const progress = phaseStripProgress(phase.stage, expertStage);
            const isSelected = selected === phase.stage;

            const baseCard =
              progress === "complete"
                ? "border-emerald-500/45 bg-emerald-950/35 text-slate-100 shadow-[0_0_0_1px_rgba(52,211,153,0.12)]"
                : progress === "current"
                  ? "border-amber-400/55 bg-amber-950/25 text-slate-50 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                  : "border-slate-700/70 bg-slate-950/50 text-slate-500";

            return (
              <div
                key={phase.stage}
                className="flex w-[min(100%,calc((100vw-3rem)/1.15))] shrink-0 snap-center flex-col items-stretch sm:w-[240px] md:w-auto md:min-w-0"
              >
                <div className="relative flex h-[52px] shrink-0 flex-col items-center justify-end pb-1">
                  <AnimatePresence mode="wait">
                    {isSelected && (
                      <motion.div
                        key={phase.stage}
                        initial={{ opacity: 0, y: 8, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 380, damping: 26 }}
                        className="absolute bottom-0 flex flex-col items-center"
                      >
                        <Plane
                          className="h-9 w-9 -rotate-[28deg] text-amber-400 drop-shadow-[0_0_14px_rgba(245,158,11,0.65)]"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="sr-only">Aircraft over selected phase</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(phase.stage)}
                  aria-pressed={isSelected}
                  className={`flex min-h-[148px] w-full min-w-0 flex-col rounded-xl border-2 p-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1426] md:min-h-[160px] md:p-3.5 ${baseCard} ${
                    isSelected ? "ring-2 ring-amber-400/50 ring-offset-2 ring-offset-[#0B1426]" : ""
                  }`}
                >
                  <span className="text-[11px] font-semibold leading-snug text-current md:text-xs md:leading-snug">
                    {phase.title}
                  </span>
                  <span className="mt-2 flex-1 text-[10px] font-light italic leading-snug text-current/90 md:text-[11px]">
                    {phase.tagline}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
