import { NextResponse } from "next/server";
import { getRetentionForExpert } from "@/agents/retention-risk-classifier";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = getRetentionForExpert(id);
  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(profile);
}
