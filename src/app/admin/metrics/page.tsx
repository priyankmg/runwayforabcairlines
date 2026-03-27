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
import { COMPANY_SNAPSHOT } from "@/data/mock/company-snapshot";

const funnelV2 = [
  { stage: "Offer", groupA: 72, groupB: 70 },
  { stage: "Gate", groupA: 68, groupB: 61 },
  { stage: "Pushback", groupA: 64, groupB: 55 },
  { stage: "Taxi", groupA: 52, groupB: 38 },
  { stage: "Roll", groupA: 38, groupB: 26 },
  { stage: "Takeoff", groupA: 32, groupB: 21 },
];

const abAttrition = [
  { label: "No-show (pre Day 1)", baseline: 5, groupA: 2.1, groupB: 4.8 },
  { label: "Training dropout", baseline: 30, groupA: 9, groupB: 28 },
  { label: "Pre-contact quit", baseline: 15, groupA: 4, groupB: 14 },
  { label: "Overall pre-contact", baseline: 50, groupA: 14, groupB: 48 },
];

const leading = [
  { metric: "Pre-boarding reg (48h)", target: "High", groupA: "91%", groupB: "62%" },
  { metric: "Week 1 pulse avg", target: ">3.5", groupA: "3.9", groupB: "3.2" },
  { metric: "Check-in attendance", target: ">90%", groupA: "94%", groupB: "71%" },
];

export default function MetricsPage() {
  const c = COMPANY_SNAPSHOT;

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Platform metrics</h1>
        <p className="mt-1 text-slate-400">Runway v2 — adoption funnel, A/B alternating assignment, and ABC snapshot.</p>
      </div>

      <section className="grid gap-4 rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-5 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-amber-400">ABC Airlines snapshot</h2>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li>HQ: {c.hq}</li>
            <li>Fleet: {c.fleet}</li>
            <li>Daily flights: {c.dailyFlights}</li>
            <li>Passengers / yr: {c.annualPassengers}</li>
            <li>Contact vol / day: {c.contactVolumePerDay}</li>
            <li>Frontline agents: {c.frontlineAgents}</li>
            <li className="pt-2 text-amber-200/90">Pre-contact attrition: {c.preContactAttrition}</li>
            <li className="text-rose-300/90">Annual hiring waste (baseline): {c.annualHiringWaste}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
          <p>
            Alternating assignment: Offer 1 → Group A (Runway), Offer 2 → Group B (control), per v2 rollout plan. Early
            stopping: if month 6 shows &gt;20pp attrition gap, route all offers to Runway.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Adoption funnel — Group A vs B (cohort still in flight)</h2>
        <div className="h-80 min-h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <BarChart data={funnelV2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#0B1426", border: "1px solid #334155" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="groupA" name="Group A (Runway)" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="groupB" name="Group B (Control)" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Pre-contact attrition (%)</h2>
        <div className="h-72 min-h-[288px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart data={abAttrition}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 9 }} interval={0} angle={-12} textAnchor="end" height={70} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ background: "#0B1426", border: "1px solid #334155" }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend />
              <Bar dataKey="baseline" name="Pre-Runway baseline" fill="#475569" radius={[4, 4, 0, 0]} />
              <Bar dataKey="groupA" name="Group A (Runway target path)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="groupB" name="Group B (control)" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 p-4">
        <h2 className="font-semibold text-white">Leading indicators (mock weekly)</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
              <tr>
                <th className="py-2">Metric</th>
                <th className="py-2">Target</th>
                <th className="py-2">Group A</th>
                <th className="py-2">Group B</th>
              </tr>
            </thead>
            <tbody>
              {leading.map((row) => (
                <tr key={row.metric} className="border-b border-white/5">
                  <td className="py-2">{row.metric}</td>
                  <td className="py-2 text-slate-500">{row.target}</td>
                  <td className="py-2 text-emerald-300">{row.groupA}</td>
                  <td className="py-2 text-slate-400">{row.groupB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
