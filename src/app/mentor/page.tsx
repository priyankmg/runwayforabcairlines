import Link from "next/link";
import { MENTOR_CONTEXT, MENTEE_SUMMARY } from "@/data/mock/mentor-view";

export default function MentorPage() {
  const m = MENTEE_SUMMARY;

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Mentor view</h1>
        <p className="mt-1 text-sm text-slate-400">
          {MENTOR_CONTEXT.mentorName} — assigned mentees and daily AI summary (Runway v2 §7).
        </p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
        <h2 className="text-sm font-semibold text-amber-200">Mentee — {m.name}</h2>
        <p className="mt-1 text-xs text-slate-500">
          Stage {m.stage} · Pulse {m.pulseScore.toFixed(1)}/5 · Today: {m.todayMission}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{m.aiDailySummary}</p>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Open questions</p>
          <ul className="mt-2 list-inside list-disc text-sm text-slate-400">
            {m.openQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg bg-[#0F2B5B] px-4 py-2 text-sm text-sky-300 ring-1 ring-sky-500/40"
        >
          Open message thread (simulated)
        </button>
      </div>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-semibold text-white">Contact-type progress</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-2">Type</th>
                <th className="pb-2">Shadow</th>
                <th className="pb-2">Reverse shadow</th>
                <th className="pb-2">Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {m.contactTypeProgress.map((row) => (
                <tr key={row.type} className="border-b border-white/5">
                  <td className="py-2 text-slate-200">{row.type}</td>
                  <td className="py-2 text-slate-400">{row.shadow}%</td>
                  <td className="py-2 text-slate-400">{row.reverseShadow}%</td>
                  <td className="py-2 text-slate-400">{row.eval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/25 p-5">
        <h2 className="text-sm font-semibold text-amber-400">Error Pattern Agent — coaching focus</h2>
        <p className="mt-2 text-sm text-slate-300">{m.coachingHighlight}</p>
      </section>

      <Link href="/" className="inline-block text-sm text-amber-400 hover:underline">
        ← Dashboard
      </Link>
    </div>
  );
}
