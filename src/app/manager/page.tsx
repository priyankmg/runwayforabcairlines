import Link from "next/link";
import { EXPERTS } from "@/data/mock/experts";
import { getAllRetentionAlerts } from "@/agents/retention-risk-classifier";

export default function ManagerPage() {
  const alerts = getAllRetentionAlerts();
  const hasHigh = alerts.some((a) => a.riskLevel === "HIGH");
  const hasMed = alerts.some((a) => a.riskLevel === "MEDIUM");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Manager dashboard</h1>
        <p className="mt-1 text-slate-400">Marcus Chen — v2 training manager view, AI narratives on expert profiles, retention signals.</p>
      </div>

      <section
        className={`rounded-2xl border p-4 ${
          hasHigh ? "border-red-500/60 bg-red-500/10" : hasMed ? "border-amber-500/50 bg-amber-500/5" : "border-white/10 bg-white/[0.02]"
        }`}
      >
        <h2 className="font-semibold text-white">At-risk experts</h2>
        <p className="mt-1 text-sm text-slate-400">Retention Risk Classifier — recommended actions.</p>
        <ul className="mt-4 space-y-3">
          {alerts.map((a) => (
            <li key={a.expertId} className="rounded-xl border border-white/10 bg-[#0B1426] p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Link href={`/manager/experts/${a.expertId}`} className="font-medium text-sky-300 hover:underline">
                  {a.expertName}
                </Link>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-semibold ${
                    a.riskLevel === "HIGH"
                      ? "bg-red-500/20 text-red-300"
                      : a.riskLevel === "MEDIUM"
                        ? "bg-amber-500/20 text-amber-200"
                        : "bg-slate-600/30 text-slate-300"
                  }`}
                >
                  {a.riskLevel}
                </span>
              </div>
              <p className="mt-2 text-slate-400">{a.recommendedManagerAction}</p>
              <p className="mt-1 text-xs text-slate-500">Signals: {a.primarySignals.join("; ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-[#0F2B5B]/50 text-xs uppercase text-slate-400">
            <tr>
              <th className="p-3">Expert</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Days</th>
              <th className="p-3">Readiness</th>
              <th className="p-3">Pulse</th>
              <th className="p-3">Risk</th>
              <th className="p-3">A/B</th>
              <th className="p-3">Trajectory</th>
            </tr>
          </thead>
          <tbody>
            {EXPERTS.map((e) => (
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
                <td className="p-3 text-slate-400">{e.abGroup ?? "—"}</td>
                <td className="p-3 text-slate-500 capitalize">{e.trajectory?.replace(/_/g, " ") ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
