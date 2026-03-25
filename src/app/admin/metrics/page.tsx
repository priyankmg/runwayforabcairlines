"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const funnel = [
  { stage: "Invited", value: 48, projected: 48 },
  { stage: "Gate done", value: 41, projected: 46 },
  { stage: "Taxi done", value: 28, projected: 40 },
  { stage: "Roll done", value: 19, projected: 35 },
  { stage: "Takeoff", value: 16, projected: 32 },
];

const attrition = [
  { stage: "Gate no-show", actual: 15, baseline: 5, target: 2, projected: 3 },
  { stage: "Taxi dropout", actual: 32, baseline: 30, target: 10, projected: 12 },
  { stage: "Pre-contact", actual: 32, baseline: 15, target: 5, projected: 8 },
];

const agents = [
  { name: "Simulation", metric: "94% completion", detail: "Avg score 74%" },
  { name: "Error Pattern", metric: "23 cards", detail: "78% improved next mission" },
  { name: "Readiness", metric: "19 advanced", detail: "0 premature to Roll" },
  { name: "Retention", metric: "4 HIGH alerts", detail: "3 interventions saved" },
];

export default function MetricsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-white">Platform metrics</h1>
        <p className="mt-1 text-slate-400">Adoption funnel, attrition vs baseline, and agent effectiveness (mock cohort data).</p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Adoption funnel</h2>
        <div className="h-72 min-h-[288px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart data={funnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#0B1426", border: "1px solid #334155" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="value" name="Actual" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" name="Projected w/ Runway" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Attrition by stage (%)</h2>
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={attrition}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ background: "#0B1426", border: "1px solid #334155" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="actual" name="Current actual" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="baseline" name="Pre-Runway baseline" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Runway target" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" name="Projected" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-4">
          <h3 className="font-semibold text-white">Expert quality</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Avg days Gate → Takeoff: 28</li>
            <li>First-contact quality (supervisor): 4.1 / 5.0</li>
            <li>Pulse confidence at Takeoff: 4.2 vs 3.1 at Gate</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 p-4">
          <h3 className="font-semibold text-white">Agent effectiveness</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {agents.map((a) => (
              <li key={a.name}>
                <span className="text-amber-400">{a.name}:</span> {a.metric} — {a.detail}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
