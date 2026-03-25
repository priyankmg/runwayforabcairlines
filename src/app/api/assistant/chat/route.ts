import { NextResponse } from "next/server";
import type { Message } from "@/data/types/agents";
import { runOnboardingAssistant } from "@/agents/onboarding-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, expertId, stage } = body as { messages: Message[]; expertId: string; stage: string };
    const reply = await runOnboardingAssistant(messages ?? [], expertId, stage ?? "TAXI");
    return NextResponse.json({ role: "assistant", content: reply });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
