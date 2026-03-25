import { NextResponse } from "next/server";
import { logGovernance } from "@/services/governance-store";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    await logGovernance({
      agent: "Pulse Survey",
      inputSummary: `expert=${id}`,
      outputSummary: JSON.stringify(body).slice(0, 200),
      confidence: 1,
    });
    return NextResponse.json({ ok: true, expertId: id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
