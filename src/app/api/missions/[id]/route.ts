import { NextResponse } from "next/server";
import { MISSIONS } from "@/data/mock/missions";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { getMissionUnlockReason } from "@/services/runway-engine";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = MISSIONS.find((x) => x.id === id);
  if (!m) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { searchParams } = new URL(req.url);
  const expertId = searchParams.get("expertId") ?? JORDAN_ID;
  const expert = getExpert(expertId);
  if (!expert) return NextResponse.json({ error: "Expert not found" }, { status: 404 });
  const { unlocked, reason } = getMissionUnlockReason(id, expert);
  const completed = expert.missionIdsCompleted.includes(id);
  return NextResponse.json({
    mission: m,
    unlocked: unlocked && !completed,
    completed,
    lockReason: reason,
  });
}
