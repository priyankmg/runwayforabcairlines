import { NextResponse } from "next/server";
import { getSession } from "@/agents/simulation-sessions";
import { simulationCustomerReply } from "@/agents/simulation-engine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, message } = body as { sessionId: string; message: string };
    const session = getSession(sessionId);
    if (!session) return NextResponse.json({ error: "Session expired or invalid" }, { status: 404 });
    session.messages.push({ role: "expert", content: message });
    const customerReply = await simulationCustomerReply(session, message);
    session.messages.push({ role: "customer", content: customerReply });
    return NextResponse.json({ customerReply, messageCount: session.messages.length });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
