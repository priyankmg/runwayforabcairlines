import { completeChat, completeJson } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { MissionScenario } from "@/data/types/mission";
import type { SimulationDebrief } from "@/data/types/agents";
import type { SimSession } from "./simulation-sessions";

const CUSTOMER_SYSTEM = (s: MissionScenario) => `You are roleplaying the CUSTOMER in an airline support chat for ABC Airlines.
Persona: ${s.customerPersona}
Problem: ${s.problem}
Stay in character. Do not solve the issue yourself—make the support agent work through it. Keep messages under 60 words. If the agent gives a correct resolution path per policy, you may accept gracefully.`;

export async function simulationCustomerReply(session: SimSession, expertMessage: string): Promise<string> {
  const transcript = session.messages
    .map((m) => `${m.role === "customer" ? "Customer" : "Expert"}: ${m.content}`)
    .join("\n");

  try {
    const reply = await completeChat(CUSTOMER_SYSTEM(session.scenario), [
      { role: "user", content: `Transcript so far:\n${transcript}\n\nExpert just said:\n${expertMessage}\n\nReply as the customer only.` },
    ]);
    await logGovernance({
      agent: "Simulation Engine",
      inputSummary: expertMessage.slice(0, 160),
      outputSummary: reply.slice(0, 160),
      confidence: 0.82,
    });
    return reply;
  } catch {
    const lower = expertMessage.toLowerCase();
    const hints = session.scenario.correctResolution.toLowerCase();
    const ok = ["rebook", "credit", "policy", "escalat", "refund", "voucher", "apolog", "confirm", "document"].some(
      (w) => lower.includes(w) && hints.includes(w)
    );
    const fallback = ok
      ? "OK—that sounds fair. Thanks for walking me through it."
      : "I'm not sure that fixes my situation. Can you explain how that matches your policy?";
    await logGovernance({
      agent: "Simulation Engine (fallback)",
      inputSummary: expertMessage.slice(0, 160),
      outputSummary: fallback,
      confidence: 0.45,
    });
    return fallback;
  }
}

export function mockDebrief(session: SimSession, expertLines: number): SimulationDebrief {
  const elapsed = (Date.now() - session.startedAt) / 1000;
  const base = Math.min(95, 55 + expertLines * 6 - Math.min(15, elapsed / 60));
  const accuracy = Math.round(base + Math.random() * 8);
  const empathy = Math.round(Math.min(95, accuracy - 5 + Math.random() * 10));
  return {
    accuracy,
    empathy,
    resolutionSpeed: Math.max(40, Math.round(100 - elapsed / 3)),
    policyCompliance: Math.round(accuracy - 3),
    overallScore: Math.round((accuracy + empathy) / 2),
    summary: "Solid structure—keep tying offers back to published policy and confirming customer understanding before close.",
    improvements: ["Quote the specific policy name when you decline a request.", "Add a empathy line before the 'no'."],
    strengths: ["Clear ownership of the thread.", "Appropriate pacing for the scenario difficulty."],
  };
}

export async function simulationCompleteDebrief(session: SimSession): Promise<SimulationDebrief> {
  const expertLines = session.messages.filter((m) => m.role === "expert").length;
  const debrief = mockDebrief(session, expertLines);

  if (!process.env.ANTHROPIC_API_KEY) {
    await logGovernance({
      agent: "Simulation Engine / debrief",
      inputSummary: `mission=${session.missionId}`,
      outputSummary: `score=${debrief.overallScore}`,
      confidence: 0.55,
    });
    return debrief;
  }

  try {
    const transcript = session.messages.map((m) => `${m.role}: ${m.content}`).join("\n");
    const parsed = await completeJson<SimulationDebrief>(
      `Return ONLY valid JSON matching SimulationDebrief: accuracy, empathy, resolutionSpeed, policyCompliance, overallScore (0-100 numbers), summary (string), improvements (string array), strengths (string array). Scenario: ${session.scenario.code}. Correct resolution: ${session.scenario.correctResolution}`,
      `Full transcript:\n${transcript}`
    );
    await logGovernance({
      agent: "Simulation Engine / debrief",
      inputSummary: `mission=${session.missionId}`,
      outputSummary: `score=${parsed.overallScore}`,
      confidence: 0.78,
    });
    return parsed;
  } catch {
    await logGovernance({
      agent: "Simulation Engine / debrief (fallback)",
      inputSummary: `mission=${session.missionId}`,
      outputSummary: `score=${debrief.overallScore}`,
      confidence: 0.5,
    });
    return debrief;
  }
}
