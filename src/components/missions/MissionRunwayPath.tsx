"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, Plane, Sparkles } from "lucide-react";
import { MISSION_PATH_ORDER } from "./mission-path-order";
import { getMissionIcon } from "./mission-icons";

export type MissionRow = {
  id: string;
  code: string;
  title: string;
  contactType: string;
  level: number;
  unlocked: boolean;
  completed: boolean;
  lockReason: string;
};

function sortByPath(missions: MissionRow[]): MissionRow[] {
  const map = new Map(missions.map((m) => [m.id, m]));
  return MISSION_PATH_ORDER.map((id) => map.get(id)).filter(Boolean) as MissionRow[];
}

/** Top of screen = Takeoff; bottom = Start. Path winds down through missions. */
export function MissionRunwayPath({ missions }: { missions: MissionRow[] }) {
  const ordered = sortByPath(missions);
  const fromSky = [...ordered].reverse();

  return (
    <div className="relative mx-auto max-w-[440px] px-2 pb-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 90% 45% at 50% 5%, rgba(245,158,11,0.14), transparent 50%), radial-gradient(ellipse 70% 50% at 85% 40%, rgba(14,165,233,0.1), transparent 45%), radial-gradient(ellipse 55% 45% at 15% 75%, rgba(16,185,129,0.08), transparent 45%)",
        }}
      />

      <div className="flex flex-col items-center">
        {/* Takeoff — goal at top */}
        <motion.div
          className="relative z-[2] w-full max-w-[280px] overflow-hidden rounded-3xl border-2 border-emerald-400/60 bg-gradient-to-br from-emerald-600/30 via-[#0F2B5B] to-sky-600/25 p-6 text-center shadow-[0_0_48px_rgba(16,185,129,0.18)]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.22),transparent_55%)]" />
          <Plane className="mx-auto h-11 w-11 rotate-[-22deg] text-emerald-200 drop-shadow-[0_0_14px_rgba(52,211,153,0.55)]" />
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">Takeoff</p>
          <p className="mt-1 text-base font-bold text-white">First independent contact</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Finish the path below — Full Fleet badge unlocks when all nine simulations are cleared.
          </p>
        </motion.div>

        {fromSky.map((m, i) => {
          const Icon = getMissionIcon(m.id);
          const zigRight = i % 2 === 0;
          const isActive = m.unlocked && !m.completed;
          const isDone = m.completed;
          const isLast = i === fromSky.length - 1;

          return (
            <div key={m.id} className="relative flex w-full max-w-[320px] flex-col items-center">
              {/* Curved path segment */}
              <div className="relative flex h-16 w-full justify-center" aria-hidden>
                <svg className="h-16 w-24 overflow-visible text-amber-500/45" viewBox="0 0 96 64" preserveAspectRatio="none">
                  {zigRight ? (
                    <path
                      d="M 48 0 Q 88 20 72 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                    />
                  ) : (
                    <path
                      d="M 48 0 Q 8 20 24 64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                    />
                  )}
                </svg>
                <div
                  className={`absolute bottom-1 ${zigRight ? "right-[18%]" : "left-[18%]"} h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.9)]`}
                />
              </div>

              <motion.div
                className={`relative z-[1] w-full max-w-[230px] ${zigRight ? "self-end pr-1" : "self-start pl-1"}`}
                animate={isActive ? { scale: [1, 1.03, 1] } : {}}
                transition={isActive ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}}
              >
                <div
                  className={`relative overflow-hidden rounded-[1.35rem] border-2 p-3.5 shadow-xl ${
                    isDone
                      ? "border-emerald-400/55 bg-gradient-to-br from-emerald-950/85 to-[#0B1426] shadow-emerald-500/15"
                      : isActive
                        ? "border-amber-400/75 bg-gradient-to-br from-amber-950/55 to-[#0F2B5B]/95 shadow-amber-500/25"
                        : "border-slate-600/90 bg-[#0B1426]/95 opacity-[0.82] shadow-black/50"
                  }`}
                >
                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(245,158,11,0.18),transparent_55%)]" />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div
                      className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border-2 ${
                        isDone
                          ? "border-emerald-400/45 bg-emerald-500/15 text-emerald-300"
                          : isActive
                            ? "border-amber-400/55 bg-amber-500/25 text-amber-200"
                            : "border-slate-600 bg-slate-900/90 text-slate-500"
                      }`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.85} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Lv{m.level}</span>
                        {isDone ? (
                          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                        ) : !m.unlocked ? (
                          <Lock className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        )}
                      </div>
                      <h3 className="font-bold leading-tight text-white">{m.code}</h3>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-400">{m.title}</p>
                      {!m.unlocked && <p className="mt-1.5 text-[10px] leading-snug text-slate-500">{m.lockReason}</p>}
                      {m.unlocked && (
                        <Link
                          href={`/missions/${m.id}`}
                          className={`mt-2.5 inline-flex items-center justify-center rounded-full px-3 py-1.5 text-[11px] font-bold ${
                            isDone
                              ? "bg-white/10 text-slate-300 ring-1 ring-white/15 hover:bg-white/15"
                              : "bg-amber-500 text-[#0B1426] shadow-md shadow-amber-500/30 hover:bg-amber-400"
                          }`}
                        >
                          {isDone ? "Replay" : "Play"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {!isLast && (
                <div className="relative flex h-12 w-full justify-center" aria-hidden>
                  <div
                    className={`h-full w-px bg-gradient-to-b from-amber-500/55 to-amber-500/25 ${zigRight ? "mr-[32%]" : "ml-[32%]"}`}
                  />
                </div>
              )}
            </div>
          );
        })}

        <div className="mt-2 flex h-10 w-full justify-center">
          <div className="h-full w-px bg-gradient-to-b from-amber-500/40 to-sky-500/50" />
        </div>

        <div className="rounded-2xl border-2 border-sky-500/35 bg-gradient-to-br from-sky-950/60 to-[#0B1426] px-6 py-4 text-center shadow-lg shadow-sky-500/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400">Start</p>
          <p className="mt-1 text-sm font-semibold text-white">Taxi training runway</p>
          <p className="mt-1 text-xs text-slate-500">Work upward — each step is closer to Takeoff</p>
        </div>
      </div>
    </div>
  );
}
