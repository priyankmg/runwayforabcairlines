import { EXPERTS, JORDAN_ID } from "@/data/mock/experts";

export default function CohortPage() {
  const byStage = EXPERTS.reduce<Record<string, number>>((acc, e) => {
    acc[e.stage] = (acc[e.stage] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Your cohort</h1>
        <p className="mt-1 text-slate-400">Distribution by stage — no rankings, shared journey.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(byStage).map(([stage, n]) => (
          <span key={stage} className="rounded-full bg-[#0F2B5B] px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
            {stage}: {n}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXPERTS.map((e) => (
          <div
            key={e.expertId}
            className={`rounded-xl border p-4 ${
              e.expertId === JORDAN_ID ? "border-sky-500/50 bg-sky-500/10" : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p className="font-medium text-white">{e.name}</p>
            <p className="text-xs text-slate-500">
              {e.stage} · {e.daysInStage}d in stage
            </p>
            {e.expertId === JORDAN_ID && <p className="mt-2 text-xs text-sky-400">You</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
