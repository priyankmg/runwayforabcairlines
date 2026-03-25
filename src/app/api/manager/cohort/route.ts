import { NextResponse } from "next/server";
import { EXPERTS } from "@/data/mock/experts";

export async function GET() {
  return NextResponse.json({
    experts: EXPERTS.map((e) => ({
      expertId: e.expertId,
      name: e.name,
      stage: e.stage,
      daysInStage: e.daysInStage,
      readinessScore: e.readinessScore,
      pulseConfidence: e.pulseConfidence,
      retentionRisk: e.retentionRisk,
    })),
  });
}
