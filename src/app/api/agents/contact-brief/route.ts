import { NextResponse } from "next/server";
import { runContactBrief } from "@/agents/live-contact-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactId, category } = body as { contactId: string; category?: string };
    const brief = await runContactBrief(contactId, category);
    return NextResponse.json(brief);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
