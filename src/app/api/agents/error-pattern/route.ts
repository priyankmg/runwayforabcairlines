import { NextResponse } from "next/server";
import { getExpert, JORDAN_ID } from "@/data/mock/experts";
import { runErrorPatternAgent } from "@/agents/error-pattern-agent";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const expertId = (body.expertId as string) ?? JORDAN_ID;
    const expert = getExpert(expertId);
    if (!expert) return NextResponse.json({ error: "Expert not found" }, { status: 404 });
    const cards = await runErrorPatternAgent(expert);
    return NextResponse.json({ cards });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
