import Link from "next/link";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { buildStageProgressList, runwayProgressPercent } from "@/services/runway-engine";
import { BADGES } from "@/data/mock/badges";
import { RunwayTracker } from "@/components/runway/RunwayTracker";
import { MorningBriefing } from "@/components/dashboard/MorningBriefing";
import { HELP_NETWORK_REPS } from "@/data/mock/gate";
import { MISSIONS } from "@/data/mock/missions";
import { isMissionUnlocked } from "@/services/runway-engine";

export default function DashboardPage() {
  const expert = getExpert(JORDAN_ID)!;
  const stages = buildStageProgressList(expert);
  const overall = runwayProgressPercent(expert);
  const recentIds = expert.badgeIdsEarned.slice(-3);
  const recent = recentIds
    .map((id) => BADGES.find((b) => b.id === id))
    .filter((b): b is (typeof BADGES)[number] => Boolean(b));
  const nextMission =
    MISSIONS.find((m) => isMissionUnlocked(m.id, expert) && !expert.missionIdsCompleted.includes(m.id)) ?? MISSIONS[5];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Good morning, {expert.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-slate-400">
          Runway v2 · Group {expert.abGroup ?? "A"} (alternating A/B rollout) · Stage {expert.stage}, day{" "}
          {expert.daysInStage} in phase.
        </p>
      </header>

      <MorningBriefing expert={expert} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-white">My Help Network</h2>
          <p className="mt-1 text-xs text-slate-500">HR & recruiting — quick access (v2 Gate)</p>
          <ul className="mt-3 space-y-2 text-sm">
            {HELP_NETWORK_REPS.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2 text-slate-300">
                <span>
                  {r.name} <span className="text-slate-500">· {r.role}</span>
                </span>
                <button type="button" className="text-xs text-sky-400 hover:underline">
                  Message
                </button>
              </li>
            ))}
          </ul>
          <Link href="/gate" className="mt-3 inline-block text-xs text-amber-400 hover:underline">
            Full Gate pre-boarding →
          </Link>
        </section>
        <section className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4">
          <h2 className="text-sm font-semibold text-amber-200">Weekly pulse</h2>
          <p className="mt-2 text-sm text-slate-400">
            Monday pulse (v2): confidence, expectations this week, mentor support, role match, open text. Complete to keep
            your trajectory signal green.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0B1426]"
          >
            Complete pulse (simulated)
          </button>
        </section>
      </div>

      <RunwayTracker stages={stages} overallPercent={overall} />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-amber-400">Current focus</h2>
          <p className="mt-2 text-lg font-medium text-white">Taxi — training missions</p>
          <p className="mt-1 text-sm text-slate-400">
            Readiness {expert.readinessScore.toFixed(1)} — target 75+ for supervised live contacts.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-sky-400">Today&apos;s mission</h2>
          <p className="mt-2 font-medium text-white">{nextMission.code}: {nextMission.title}</p>
          <p className="mt-1 text-xs text-slate-500">{nextMission.difficultyHint}</p>
          <Link href={`/missions/${nextMission.id}`} className="mt-3 inline-block text-sm text-amber-400 hover:underline">
            Open simulation →
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h2 className="text-sm font-semibold text-emerald-400">Pulse</h2>
          <p className="mt-2 text-sm text-slate-300">Confidence {expert.pulseConfidence.toFixed(1)} / 5.0</p>
          <p className="mt-1 text-xs text-slate-500">Complete your weekly pulse every Monday.</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Recent badges</h2>
        <div className="flex flex-wrap gap-3">
          {recent.length === 0 && <span className="text-sm text-slate-500">Complete missions to earn badges.</span>}
          {recent.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-100"
            >
              {b.name}
            </div>
          ))}
        </div>
        <Link href="/badges" className="mt-3 inline-block text-sm text-sky-400 hover:underline">
          View all badges
        </Link>
      </div>

      <div className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
        <h2 className="font-medium text-white">Buddy</h2>
        <p className="mt-1 text-sm text-slate-400">
          Riley Stone (Takeoff stage) — last message: &quot;Ping me before your first live contact.&quot;
        </p>
        <button
          type="button"
          className="mt-3 rounded-lg bg-[#0F2B5B] px-4 py-2 text-sm text-sky-300 ring-1 ring-sky-500/30"
        >
          Quick reply (simulated)
        </button>
      </div>
    </div>
  );
}
