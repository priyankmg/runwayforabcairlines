import { NextResponse } from "next/server";
import { logGovernance } from "@/services/governance-store";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await logGovernance({
    agent: "Manager Advance",
    inputSummary: `expert=${id}`,
    outputSummary: "Stage advance requested (mock — no persistence)",
    confidence: 1,
  });
  return NextResponse.json({ ok: true, expertId: id, note: "Prototype: expert stage is mock-static" });
}
