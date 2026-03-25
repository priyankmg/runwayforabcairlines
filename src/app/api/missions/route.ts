import { NextResponse } from "next/server";
import { MISSIONS } from "@/data/mock/missions";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { getMissionUnlockReason } from "@/services/runway-engine";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const expertId = searchParams.get("expertId") ?? JORDAN_ID;
  const expert = getExpert(expertId);
  if (!expert) return NextResponse.json({ error: "Expert not found" }, { status: 404 });

  const missions = MISSIONS.map((m) => {
    const { unlocked, reason } = getMissionUnlockReason(m.id, expert);
    const completed = expert.missionIdsCompleted.includes(m.id);
    return {
      ...m,
      unlocked,
      completed,
      canStart: unlocked && !completed,
      lockReason: unlocked ? "" : reason,
    };
  });

  return NextResponse.json({ expertId, missions });
}
