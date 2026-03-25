import { NextResponse } from "next/server";
import { refreshAlertsWithLLM } from "@/agents/retention-risk-classifier";

export async function GET() {
  try {
    const alerts = await refreshAlertsWithLLM();
    return NextResponse.json({ alerts });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
