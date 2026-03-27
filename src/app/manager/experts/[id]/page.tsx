import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpert } from "@/data/mock/experts";
import { buildStageProgressList } from "@/services/runway-engine";
import { StageCard } from "@/components/runway/StageCard";
import { ExpertAgentPanel } from "./ExpertAgentPanel";
import { MANAGER_NARRATIVES } from "@/data/mock/manager-narratives";

export default async function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expert = getExpert(id);
  if (!expert) notFound();
  const stages = buildStageProgressList(expert);
  const narrative = MANAGER_NARRATIVES[id];
  const trajectory = expert.trajectory ?? "monitor";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link href="/manager" className="text-sm text-sky-400 hover:underline">
        ← Manager dashboard
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-white">{expert.name}</h1>
        <p className="mt-1 text-slate-400">
          {expert.stage} · readiness {expert.readinessScore} · pulse {expert.pulseConfidence.toFixed(1)} · Group{" "}
          {expert.abGroup ?? "—"}
        </p>
        <p className="mt-2 inline-block rounded-full bg-[#0F2B5B] px-3 py-1 text-xs font-semibold capitalize text-amber-200 ring-1 ring-amber-500/30">
          Trajectory: {trajectory.replace(/_/g, " ")}
        </p>
      </div>
      {narrative && (
        <section className="rounded-2xl border border-sky-500/30 bg-sky-950/20 p-5">
          <h2 className="text-sm font-semibold text-sky-300">AI daily narrative (v2)</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{narrative}</p>
        </section>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s) => (
          <StageCard key={s.stage} stage={s} />
        ))}
      </div>
      <ExpertAgentPanel expertId={expert.expertId} />
    </div>
  );
}
