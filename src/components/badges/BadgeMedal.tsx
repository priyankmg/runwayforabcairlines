"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type Props = {
  name: string;
  description: string;
  earnCondition: string;
  reward?: string;
  earned: boolean;
  Icon: LucideIcon;
  index: number;
};

const RING_COLORS = [
  "from-amber-400/80 to-orange-600/60",
  "from-sky-400/70 to-blue-600/50",
  "from-emerald-400/70 to-teal-700/50",
  "from-violet-400/70 to-purple-700/50",
  "from-rose-400/70 to-pink-700/50",
  "from-cyan-400/70 to-sky-700/50",
];

export function BadgeMedal({ name, description, earnCondition, reward, earned, Icon, index }: Props) {
  const ring = RING_COLORS[index % RING_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className={`relative flex flex-col items-center text-center ${earned ? "" : "opacity-[0.42] grayscale"}`}
    >
      <div
        className={`relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-gradient-to-br p-[3px] shadow-lg ${ring} ${
          earned ? "shadow-amber-500/20" : "shadow-none"
        }`}
      >
        <div
          className={`flex h-full w-full flex-col items-center justify-center rounded-full border-2 ${
            earned
              ? "border-amber-200/25 bg-gradient-to-b from-[#1a2744] to-[#0B1426]"
              : "border-slate-700 bg-[#0d1525]"
          }`}
        >
          <div
            className={`flex h-[68px] w-[68px] items-center justify-center rounded-full ${
              earned
                ? "bg-gradient-to-br from-amber-500/20 via-[#0F2B5B]/80 to-sky-600/20 text-amber-200"
                : "bg-slate-900/90 text-slate-600"
            }`}
          >
            <Icon className="h-9 w-9" strokeWidth={1.6} />
          </div>
        </div>
        {earned && (
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
        )}
      </div>
      <h2 className="mt-3 max-w-[160px] text-sm font-bold leading-snug text-white">{name}</h2>
      <p className="mt-1 max-w-[200px] text-xs leading-snug text-slate-400">{description}</p>
      <p className="mt-2 max-w-[220px] text-[10px] uppercase tracking-wide text-slate-600">{earnCondition}</p>
      {reward && (
        <p className="mt-2 max-w-[220px] text-[11px] font-medium text-amber-400/90">{reward}</p>
      )}
    </motion.div>
  );
}
