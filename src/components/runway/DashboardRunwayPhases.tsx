"use client";

import type { RunwayStage } from "@/data/types/expert";
import { RunwayPhaseStrip } from "@/components/runway/RunwayPhaseStrip";

/** Client bridge so the dashboard (server page) can host the interactive phase strip. */
export function DashboardRunwayPhases({ expertStage }: { expertStage: RunwayStage }) {
  return <RunwayPhaseStrip expertStage={expertStage} titleAs="h2" />;
}
