import Link from "next/link";
import { notFound } from "next/navigation";
import { getExpert } from "@/data/mock/experts";
import { buildStageProgressList } from "@/services/runway-engine";
import { StageCard } from "@/components/runway/StageCard";
import { ExpertAgentPanel } from "./ExpertAgentPanel";

export default async function ExpertProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expert = getExpert(id);
  if (!expert) notFound();
  const stages = buildStageProgressList(expert);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link href="/manager" className="text-sm text-sky-400 hover:underline">
        ← Manager dashboard
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-white">{expert.name}</h1>
        <p className="mt-1 text-slate-400">
          {expert.stage} · readiness {expert.readinessScore} · pulse {expert.pulseConfidence.toFixed(1)}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s) => (
          <StageCard key={s.stage} stage={s} />
        ))}
      </div>
      <ExpertAgentPanel expertId={expert.expertId} />
    </div>
  );
}
