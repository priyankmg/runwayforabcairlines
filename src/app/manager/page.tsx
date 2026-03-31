import Link from "next/link";
import { EXPERTS } from "@/data/mock/experts";
import { getAllRetentionAlerts } from "@/agents/retention-risk-classifier";
import { CheckCircle, Clock, AlertTriangle, GraduationCap } from "lucide-react";

type Trajectory = "on-track" | "monitor" | "at-risk";

function getTrajectory(e: (typeof EXPERTS)[number]): Trajectory {
  if (e.retentionRisk === "HIGH" || e.pulseConfidence < 2.8) return "at-risk";
  if (e.retentionRisk === "MEDIUM" || e.pulseConfidence < 3.5) return "monitor";
  return "on-track";
}

const TRAJECTORY_STYLE: Record<Trajectory, { label: string; icon: typeof CheckCircle; cls: string }> = {
  "on-track": { label: "On track", icon: CheckCircle, cls: "text-emerald-400" },
  monitor: { label: "Monitor", icon: Clock, cls: "text-amber-400" },
  "at-risk": { label: "At risk", icon: AlertTriangle, cls: "text-red-400" },
};

const AI_NARRATIVES: Record<string, string> = {
  "expert-jordan-001":
    "Jordan completed the Reservations reverse-shadow yesterday. She passed the questionnaire but had 1 open question about billing refund timelines. Recommend a 10-minute clarification before today's check-in.",
  "expert-taxi-003":
    "Indigo's pulse confidence dropped to 2.4 this week — 1.6 points below cohort average. Simulation engagement is down. HIGH retention risk. Recommend same-day 1:1.",
  "expert-push-002":
    "Finley missed yesterday's check-in. Pulse confidence 3.0 — softening vs. last week. Monitor closely; schedule outreach today.",
};

export default function ManagerPage() {
  const alerts = getAllRetentionAlerts();
  const hasHigh = alerts.some((a) => a.riskLevel === "HIGH");
  const hasMed = alerts.some((a) => a.riskLevel === "MEDIUM");

  const stageCounts = EXPERTS.reduce<Record<string, number>>((acc, e) => {
    acc[e.stage] = (acc[e.stage] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Manager dashboard</h1>
          <p className="mt-1 text-slate-400">Marcus Chen — cohort visibility, AI narratives, and retention risk.</p>
        </div>
        <Link
          href="/mentor"
          className="flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 hover:bg-sky-500/15"
        >
          <GraduationCap className="h-4 w-4" />
          Mentor view
        </Link>
      </div>

      {/* Cohort summary */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(stageCounts).map(([stage, n]) => (
          <span key={stage} className="rounded-full border border-white/10 bg-[#0F2B5B]/40 px-3 py-1 text-xs text-slate-300">
            {stage}: {n}
          </span>
        ))}
      </div>

      {/* At-risk panel */}
      <section
        className={`rounded-2xl border p-5 ${
          hasHigh ? "border-red-500/60 bg-red-500/8" : hasMed ? "border-amber-500/50 bg-amber-500/5" : "border-white/10 bg-white/[0.02]"
        }`}
      >
        <h2 className="font-semibold text-white">At-risk experts</h2>
        <p className="mt-1 text-sm text-slate-400">Retention Risk Classifier — 7-day warning window.</p>
        <ul className="mt-4 space-y-3">
          {alerts.map((a) => (
            <li key={a.expertId} className="rounded-xl border border-white/10 bg-[#0B1426] p-4 text-sm">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <Link href={`/manager/experts/${a.expertId}`} className="font-semibold text-sky-300 hover:underline">
                  {a.expertName}
                </Link>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-bold ${
                    a.riskLevel === "HIGH"
                      ? "bg-red-500/20 text-red-300"
                      : a.riskLevel === "MEDIUM"
                        ? "bg-amber-500/20 text-amber-200"
                        : "bg-slate-600/30 text-slate-300"
                  }`}
                >
                  {a.riskLevel} · ~{a.daysToLikelyAttrition}d
                </span>
              </div>
              <p className="mt-2 text-slate-300">{a.recommendedManagerAction}</p>
              <p className="mt-1 text-xs text-slate-500">Signals: {a.primarySignals.join("; ")}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Expert roster table with AI narratives and trajectory */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-[#0F2B5B]/50 text-xs uppercase text-slate-400">
            <tr>
              <th className="p-3">Expert</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Days</th>
              <th className="p-3">Readiness</th>
              <th className="p-3">Pulse</th>
              <th className="p-3">Trajectory</th>
              <th className="p-3">Risk</th>
            </tr>
          </thead>
          <tbody>
            {EXPERTS.map((e) => {
              const traj = getTrajectory(e);
              const { label, icon: TIcon, cls } = TRAJECTORY_STYLE[traj];
              return (
                <tr key={e.expertId} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-3">
                    <Link href={`/manager/experts/${e.expertId}`} className="text-sky-400 hover:underline">
                      {e.name}
                    </Link>
                  </td>
                  <td className="p-3 text-slate-300">{e.stage}</td>
                  <td className="p-3 text-slate-400">{e.daysInStage}</td>
                  <td className="p-3 text-slate-300">{e.readinessScore.toFixed(1)}</td>
                  <td className="p-3 text-slate-300">{e.pulseConfidence.toFixed(1)}</td>
                  <td className={`p-3 ${cls}`}>
                    <span className="flex items-center gap-1.5">
                      <TIcon className="h-3.5 w-3.5" />
                      {label}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={
                        e.retentionRisk === "HIGH"
                          ? "text-red-400"
                          : e.retentionRisk === "MEDIUM"
                            ? "text-amber-400"
                            : "text-emerald-400"
                      }
                    >
                      {e.retentionRisk}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* AI daily narratives */}
      <section>
        <h2 className="mb-4 font-semibold text-white">AI daily narratives</h2>
        <div className="space-y-3">
          {Object.entries(AI_NARRATIVES).map(([id, narrative]) => {
            const expert = EXPERTS.find((e) => e.expertId === id);
            if (!expert) return null;
            const traj = getTrajectory(expert);
            const { label, icon: TIcon, cls } = TRAJECTORY_STYLE[traj];
            return (
              <div key={id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Link href={`/manager/experts/${id}`} className="font-medium text-sky-300 hover:underline">
                    {expert.name}
                  </Link>
                  <span className={`flex items-center gap-1 text-xs ${cls}`}>
                    <TIcon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{narrative}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
