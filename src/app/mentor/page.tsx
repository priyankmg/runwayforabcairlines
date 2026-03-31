import { MENTOR_ASSIGNMENTS } from "@/data/mock/mentor";
import { CHECK_INS } from "@/data/mock/shadow-sessions";
import { CheckCircle, Clock, AlertTriangle, MessageSquare, Calendar } from "lucide-react";

const TRAJECTORY_CFG = {
  "on-track": { icon: CheckCircle, label: "On track", color: "text-emerald-400", border: "border-emerald-500/30 bg-emerald-500/5" },
  monitor: { icon: Clock, label: "Monitor", color: "text-amber-400", border: "border-amber-500/30 bg-amber-500/10" },
  "at-risk": { icon: AlertTriangle, label: "At risk", color: "text-red-400", border: "border-red-500/40 bg-red-500/8" },
} as const;

export default function MentorPage() {
  const mentorName = "Riley Stone";

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Mentor view</h1>
        <p className="mt-1 text-slate-400">{mentorName} — your assigned mentees and daily AI summaries.</p>
      </div>

      {/* Check-ins today */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <Calendar className="h-4 w-4 text-sky-400" /> Today&apos;s check-ins
        </h2>
        <div className="flex flex-wrap gap-2">
          {CHECK_INS.slice(0, 2).map((c) => (
            <div key={c.day} className="rounded-lg border border-white/8 bg-[#0F2B5B]/30 px-3 py-2 text-sm">
              <span className="text-slate-400">{c.time}</span>
              <span className="ml-2 text-white">{c.with}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mentee cards */}
      <div className="space-y-5">
        {MENTOR_ASSIGNMENTS.map((assignment) => {
          const traj = TRAJECTORY_CFG[assignment.trajectory];
          const TrajIcon = traj.icon;

          return (
            <div
              key={assignment.menteeId}
              className={`rounded-2xl border-2 p-5 ${traj.border}`}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white">{assignment.menteeName}</h2>
                  <p className="text-sm text-slate-400">Stage: {assignment.menteeSage} · Pulse {assignment.pulseScore.toFixed(1)} / 5.0</p>
                </div>
                <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${traj.color} border-current/30`}>
                  <TrajIcon className="h-3.5 w-3.5" />
                  {traj.label}
                </div>
              </div>

              {/* AI daily summary */}
              <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400/80">AI daily summary</p>
                <p className="text-sm leading-relaxed text-slate-200">{assignment.aiDailySummary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {assignment.todaysMission && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Today&apos;s mission</p>
                    <p className="text-sm text-slate-300">{assignment.todaysMission}</p>
                  </div>
                )}
                {assignment.openQuestions.length > 0 && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Open questions</p>
                    <ul className="space-y-1">
                      {assignment.openQuestions.map((q, i) => (
                        <li key={i} className="text-sm italic text-amber-200/80">&ldquo;{q}&rdquo;</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg bg-sky-600/20 px-3 py-2 text-xs font-medium text-sky-300 ring-1 ring-sky-500/30 hover:bg-sky-600/30"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Message {assignment.menteeName.split(" ")[0]}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
