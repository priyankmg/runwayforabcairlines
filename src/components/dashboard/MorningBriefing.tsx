import type { Expert } from "@/data/types/expert";

/** v2 §6 — Onboarding Assistant morning greeting format (mock copy for dashboard). */
export function MorningBriefing({ expert }: { expert: Expert }) {
  const first = expert.name.split(" ")[0];
  const stageLabel =
    expert.stage === "TAXI"
      ? `Taxi (Training) — Day ${expert.daysInStage} of ~20`
      : `${expert.stage} — Day ${expert.daysInStage} in phase`;

  return (
    <section className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-[#0F2B5B]/60 to-[#0B1426] p-5 shadow-lg shadow-black/20">
      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Daily briefing</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        Good morning, {first}. Here is where you stand today:
      </p>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        <li>
          <span className="font-semibold text-white">Stage:</span> {stageLabel}
        </li>
        <li>
          <span className="font-semibold text-white">Completed yesterday:</span> Reservations L2 simulation — debrief{" "}
          <span className="text-emerald-400">PASS</span>
        </li>
        <li>
          <span className="font-semibold text-white">Action items:</span> Complete Billing L3 mission to advance billing
          coverage; shadow session scheduled tomorrow 2:00pm PST.
        </li>
        <li>
          <span className="font-semibold text-white">Open question:</span> Your note on refund timelines was routed to your
          mentor — check Messages before check-in.
        </li>
        <li>
          <span className="font-semibold text-white">Check-in:</span> Marcus at 9:00am (15 min)
        </li>
      </ul>
    </section>
  );
}
