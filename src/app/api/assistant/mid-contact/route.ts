import { NextResponse } from "next/server";
import { midContactAnswer } from "@/agents/live-contact-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, context } = body as { question: string; context?: string };
    const answer = await midContactAnswer(question ?? "", context ?? "");
    return NextResponse.json({ answer });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
