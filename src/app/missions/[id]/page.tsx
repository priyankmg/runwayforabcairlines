import Link from "next/link";
import { notFound } from "next/navigation";
import { MISSIONS } from "@/data/mock/missions";
import { MissionSimulation } from "@/components/simulation/MissionSimulation";

export default async function MissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link href="/missions" className="text-sm text-sky-400 hover:underline">
        ← Mission center
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-white">
          {m.code}: {m.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">{m.problem}</p>
      </div>
      <MissionSimulation missionId={m.id} title={m.title} />
    </div>
  );
}
