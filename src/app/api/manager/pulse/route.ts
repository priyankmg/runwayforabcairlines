import { NextResponse } from "next/server";
import { EXPERTS } from "@/data/mock/experts";

export async function GET() {
  const avg =
    EXPERTS.reduce((s, e) => s + e.pulseConfidence, 0) / Math.max(1, EXPERTS.length);
  return NextResponse.json({
    cohortAverage: Math.round(avg * 10) / 10,
    weeklyTrend: [3.2, 3.3, 3.4, 3.5, 3.55, 3.6, avg],
    responsesThisWeek: 9,
  });
}
