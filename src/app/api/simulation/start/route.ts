import { NextResponse } from "next/server";
import { MISSIONS } from "@/data/mock/missions";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { getMissionUnlockReason } from "@/services/runway-engine";
import { createSession, clearOldSessions } from "@/agents/simulation-sessions";

export async function POST(req: Request) {
  try {
    clearOldSessions();
    const body = await req.json();
    const missionId = body.missionId as string;
    const expertId = (body.expertId as string) ?? JORDAN_ID;
    const expert = getExpert(expertId);
    if (!expert) return NextResponse.json({ error: "Expert not found" }, { status: 404 });
    const scenario = MISSIONS.find((m) => m.id === missionId);
    if (!scenario) return NextResponse.json({ error: "Mission not found" }, { status: 404 });
    const { unlocked, reason } = getMissionUnlockReason(missionId, expert);
    if (!unlocked) return NextResponse.json({ error: reason }, { status: 403 });
    const session = createSession(scenario, expertId);
    return NextResponse.json({
      sessionId: session.sessionId,
      missionId: session.missionId,
      openingLine: session.scenario.openingCustomerLine,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
