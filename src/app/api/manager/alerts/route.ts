import { NextResponse } from "next/server";
import { getAllRetentionAlerts } from "@/agents/retention-risk-classifier";

export async function GET() {
  return NextResponse.json({ alerts: getAllRetentionAlerts() });
}
