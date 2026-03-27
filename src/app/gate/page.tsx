import Link from "next/link";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { HELP_NETWORK_REPS, GATE_CHECKLIST_ITEMS } from "@/data/mock/gate";

export default function GatePage() {
  const expert = getExpert(JORDAN_ID)!;
  const preDone = Boolean(expert.preBoardingComplete);

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-white">Gate — Pre-boarding</h1>
        <p className="mt-2 text-sm text-slate-400">
          Offer signed to Day One. Complete tasks below before you report. Runway v2 — Portland HQ operations (simulated).
        </p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#0F2B5B]/30 p-5">
        <h2 className="text-sm font-semibold text-amber-400">Day One reporting</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>
            <span className="text-slate-500">Site:</span> {expert.joiningSite ?? "ABC Support Center — TBD"}
          </li>
          <li>
            <span className="text-slate-500">Report to:</span> {expert.reportToName ?? "Your supervisor"}
          </li>
          <li>
            <span className="text-slate-500">Time:</span> 8:30am local · Business casual · Bring government-issued ID
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-semibold text-sky-400">Pre-boarding checklist</h2>
        <ul className="mt-4 space-y-3">
          {GATE_CHECKLIST_ITEMS.map((item) => (
            <li key={item.id} className="flex items-start gap-3 text-sm">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  preDone ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-500"
                }`}
              >
                {preDone ? "✓" : "○"}
              </span>
              <span className={preDone ? "text-slate-200" : "text-slate-400"}>{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-sm font-semibold text-white">My Help Network</h2>
        <p className="mt-1 text-xs text-slate-500">Message HR directly (simulated). Escalations route automatically in production.</p>
        <ul className="mt-4 space-y-3">
          {HELP_NETWORK_REPS.map((rep) => (
            <li key={rep.id} className="flex flex-col rounded-xl border border-white/10 bg-[#0B1426] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white">{rep.name}</p>
                <p className="text-xs text-slate-400">{rep.role}</p>
              </div>
              <button
                type="button"
                className="mt-3 rounded-lg bg-sky-600/30 px-4 py-2 text-xs font-medium text-sky-200 ring-1 ring-sky-500/40 sm:mt-0"
              >
                Open message
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/" className="inline-block text-sm text-amber-400 hover:underline">
        ← Back to dashboard
      </Link>
    </div>
  );
}
