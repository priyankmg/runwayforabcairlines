import { NextResponse } from "next/server";
import { getSession } from "@/agents/simulation-sessions";
import { simulationCompleteDebrief } from "@/agents/simulation-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionId = body.sessionId as string;
    const session = getSession(sessionId);
    if (!session) return NextResponse.json({ error: "Session expired or invalid" }, { status: 404 });
    const debrief = await simulationCompleteDebrief(session);
    return NextResponse.json({ debrief, missionId: session.missionId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
