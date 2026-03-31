"use client";

import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import type { Expert } from "@/data/types/expert";
import { CHECK_INS } from "@/data/mock/shadow-sessions";

interface Props {
  expert: Expert;
  missionCompletedYesterday?: string;
  openQuestion?: string;
}

export function MorningGreeting({ expert, missionCompletedYesterday, openQuestion }: Props) {
  const [expanded, setExpanded] = useState(true);
  const todayCheckin = CHECK_INS[0];

  const STAGE_DAY_LABEL: Record<string, string> = {
    GATE: "Gate",
    PUSHBACK: "Pushback",
    TAXI: "Taxi (Training)",
    ROLL: "Roll (Supervised contacts)",
    TAKEOFF: "Takeoff",
  };
  const STAGE_DAYS: Record<string, string> = {
    GATE: "~10",
    PUSHBACK: "~7",
    TAXI: "~20",
    ROLL: "~14",
    TAKEOFF: "∞",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-gradient-to-br from-[#0F2B5B]/70 to-[#0B1426] shadow-lg shadow-amber-500/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-white">
              Good morning, {expert.name.split(" ")[0]}. Here is where you stand today.
            </p>
            {!expanded && (
              <p className="mt-1 text-sm text-slate-400">
                Stage: {STAGE_DAY_LABEL[expert.stage]} — Day {expert.daysInStage} of ~{STAGE_DAYS[expert.stage]}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-0.5 shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label={expanded ? "Collapse greeting" : "Expand greeting"}
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-white/8 px-5 pb-5 pt-4 text-sm">
          <ul className="space-y-2.5 text-slate-300">
            <li className="flex gap-2">
              <span className="shrink-0 font-semibold text-slate-400 w-36">Stage:</span>
              <span>{STAGE_DAY_LABEL[expert.stage]} — Day {expert.daysInStage} of ~{STAGE_DAYS[expert.stage]}</span>
            </li>
            {missionCompletedYesterday && (
              <li className="flex gap-2">
                <span className="shrink-0 font-semibold text-slate-400 w-36">Completed yesterday:</span>
                <span className="text-emerald-300">{missionCompletedYesterday}</span>
              </li>
            )}
            <li className="flex gap-2">
              <span className="shrink-0 font-semibold text-slate-400 w-36">Action item:</span>
              <span>Complete Billing L1 mission today to continue the Billing contact type track.</span>
            </li>
            {openQuestion && (
              <li className="flex gap-2">
                <span className="shrink-0 font-semibold text-slate-400 w-36">Open question:</span>
                <span className="italic text-amber-200/90">{openQuestion} — sent to your mentor.</span>
              </li>
            )}
            <li className="flex items-center gap-2">
              <span className="shrink-0 font-semibold text-slate-400 w-36">Check-in:</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-sky-400" />
                {todayCheckin.with} at {todayCheckin.time}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
