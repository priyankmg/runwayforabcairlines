import { NextResponse } from "next/server";
import { getGovernanceLog, logGovernance } from "@/services/governance-store";

export async function GET(req: Request) {
  const limit = Number(new URL(req.url).searchParams.get("limit") ?? "50");
  const log = await getGovernanceLog(Math.min(200, limit));
  return NextResponse.json({ log });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await logGovernance({
      agent: body.agent ?? "client",
      inputSummary: String(body.inputSummary ?? "").slice(0, 500),
      outputSummary: String(body.outputSummary ?? "").slice(0, 500),
      confidence: typeof body.confidence === "number" ? body.confidence : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
