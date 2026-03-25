import { getExpert, JORDAN_ID, EXPERTS } from "@/data/mock/experts";
import { RunwayPhaseStrip } from "@/components/runway/RunwayPhaseStrip";

export default function RunwayPage() {
  const expert = getExpert(JORDAN_ID)!;
  const cohortAvgDays = EXPERTS.reduce((s, e) => s + e.daysInStage, 0) / EXPERTS.length;

  return (
    <div className="mx-auto max-w-[1440px] space-y-12 pb-12">
      <RunwayPhaseStrip expertStage={expert.stage} />

      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 text-sm text-slate-300">
        <p>
          Cohort average days in current stage (aggregate):{" "}
          <span className="text-amber-400">{cohortAvgDays.toFixed(1)}</span>
        </p>
        <p className="mt-2 text-slate-500">
          Stage distribution is shown without rankings — your selection above is for learning what each phase means.
        </p>
      </div>
    </div>
  );
}
