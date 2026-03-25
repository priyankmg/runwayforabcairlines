import { getExpert, JORDAN_ID, EXPERTS } from "@/data/mock/experts";
import { buildStageProgressList } from "@/services/runway-engine";
import { StageCard } from "@/components/runway/StageCard";

export default function RunwayPage() {
  const expert = getExpert(JORDAN_ID)!;
  const stages = buildStageProgressList(expert);
  const cohortAvgDays = EXPERTS.reduce((s, e) => s + e.daysInStage, 0) / EXPERTS.length;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Full runway</h1>
        <p className="mt-1 text-slate-400">Stage detail and cohort context — no individual rankings.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stages.map((s) => (
          <StageCard key={s.stage} stage={s} />
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
        <p>
          Cohort average days in current stage (aggregate): <span className="text-amber-400">{cohortAvgDays.toFixed(1)}</span>
        </p>
        <p className="mt-2 text-slate-500">
          Projected Takeoff varies by mission cadence — keep completing simulations to accelerate.
        </p>
      </div>
    </div>
  );
}
