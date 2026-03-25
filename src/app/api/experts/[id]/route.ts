import { NextResponse } from "next/server";
import { getExpert } from "@/data/mock/experts";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const expert = getExpert(id);
  if (!expert) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(expert);
}
