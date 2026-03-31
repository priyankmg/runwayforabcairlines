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
  LineChart,
  Line,
} from "recharts";
import { AB_TEST_DATA, AB_MONTHLY, AB_ATTRITION_BY_STAGE } from "@/data/mock/ab-test";

const funnel = [
  { stage: "Offer", value: 48, projected: 48 },
  { stage: "Gate done", value: 41, projected: 46 },
  { stage: "Taxi done", value: 28, projected: 40 },
  { stage: "Roll done", value: 19, projected: 35 },
  { stage: "Takeoff", value: 16, projected: 32 },
];

const attrition = [
  { stage: "No-show", actual: 15, baseline: 5, target: 2 },
  { stage: "Taxi dropout", actual: 32, baseline: 30, target: 10 },
  { stage: "Pre-contact", actual: 32, baseline: 15, target: 5 },
];

const agents = [
  { name: "Simulation", metric: "94% completion", detail: "Avg score 74%" },
  { name: "Error Pattern", metric: "23 cards", detail: "78% improved next mission" },
  { name: "Readiness", metric: "19 advanced", detail: "0 premature to Roll" },
  { name: "Retention", metric: "4 HIGH alerts", detail: "3 interventions saved" },
];

const TOOLTIP_STYLE = { contentStyle: { background: "#0B1426", border: "1px solid #334155" }, labelStyle: { color: "#e2e8f0" } };

export default function MetricsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Platform metrics</h1>
        <p className="mt-1 text-slate-400">
          Adoption funnel, A/B test live view, attrition vs baseline, and agent effectiveness (mock cohort data).
        </p>
      </div>

      {/* A/B Test live view — top priority */}
      <section className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
        <div className="mb-1 flex items-center gap-2">
          <h2 className="font-semibold text-white">A/B test — live view</h2>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
            Month 8 of 16
          </span>
        </div>
        <p className="mb-5 text-sm text-slate-400">
          Alternating assignment: Group A (Runway) vs Group B (Control). Updated weekly.
        </p>

        {/* Scorecard */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          {AB_TEST_DATA.map((g) => {
            const attrRate = ((g.noShows + g.trainingDropouts + g.preContactQuitters) / g.totalOffers * 100).toFixed(1);
            const productiveRate = (g.productive / g.totalOffers * 100).toFixed(1);
            const retentionRate = (g.day90Retention / g.productive * 100).toFixed(1);
            return (
              <div
                key={g.label}
                className={`rounded-xl border p-4 ${g.label.includes("Runway") ? "border-sky-500/40 bg-sky-500/10" : "border-slate-600/40 bg-slate-800/30"}`}
              >
                <p className="mb-3 font-semibold text-white">{g.label}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total offers</span>
                    <span className="font-medium text-white">{g.totalOffers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">No-shows</span>
                    <span className="font-medium text-red-300">{g.noShows}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Training dropouts</span>
                    <span className="font-medium text-red-300">{g.trainingDropouts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pre-contact quitters</span>
                    <span className="font-medium text-red-300">{g.preContactQuitters}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-1.5">
                    <span className="text-slate-400">Pre-contact attrition</span>
                    <span className="font-bold text-white">{attrRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Productive hires</span>
                    <span className={`font-bold ${g.label.includes("Runway") ? "text-emerald-300" : "text-slate-300"}`}>{g.productive} ({productiveRate}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">90-day retention</span>
                    <span className={`font-bold ${g.label.includes("Runway") ? "text-emerald-300" : "text-slate-300"}`}>{retentionRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Productive hires trend */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Productive hires — cumulative by month</p>
          <div className="h-56 min-h-[224px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={224}>
              <LineChart data={AB_MONTHLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Legend />
                <Line type="monotone" dataKey="groupA" name="Group A (Runway)" stroke="#0EA5E9" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="groupB" name="Group B (Control)" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attrition by stage A vs B */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Attrition rate by stage — Group A vs B (%)</p>
          <div className="h-52 min-h-[208px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={208}>
              <BarChart data={AB_ATTRITION_BY_STAGE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} unit="%" />
                <Tooltip {...TOOLTIP_STYLE} />
                <Legend />
                <Bar dataKey="groupARate" name="Group A (Runway)" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="groupBRate" name="Group B (Control)" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Adoption funnel */}
      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Adoption funnel — Offer → Takeoff</h2>
        <div className="h-72 min-h-[288px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart data={funnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend />
              <Bar dataKey="value" name="Actual" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" name="Projected w/ Runway" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Attrition vs baseline */}
      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/20 p-4">
        <h2 className="mb-4 font-semibold text-amber-400">Attrition by stage vs pre-Runway baseline (%)</h2>
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={attrition}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="stage" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend />
              <Bar dataKey="actual" name="Current (Runway on)" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="baseline" name="Pre-Runway baseline" fill="#64748b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Runway target" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quality + agent effectiveness */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-4">
          <h3 className="font-semibold text-white">Expert quality indicators</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Avg days Gate → Takeoff: 28</li>
            <li>First-contact quality (supervisor-rated): 4.1 / 5.0</li>
            <li>Pulse confidence at Takeoff: 4.2 vs 3.1 at Gate</li>
            <li>Questionnaire first-pass rate: 84%</li>
            <li>Reverse shadow readiness — first attempt: 71%</li>
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
