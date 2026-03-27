"use client";

import { useEffect, useState } from "react";
import { MissionRunwayPath, type MissionRow } from "@/components/missions/MissionRunwayPath";

export default function MissionsPage() {
  const [missions, setMissions] = useState<MissionRow[]>([]);

  useEffect(() => {
    fetch("/api/missions")
      .then((r) => r.json())
      .then((d) => setMissions(d.missions ?? []));
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">Mission runway</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
          v2 Taxi stage — simulations, shadow/reverse-shadow path in full product; here, nine missions unlock by competency toward Takeoff.
        </p>
      </div>

      {missions.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-500">Loading missions…</div>
      ) : (
        <MissionRunwayPath missions={missions} />
      )}
    </div>
  );
}
