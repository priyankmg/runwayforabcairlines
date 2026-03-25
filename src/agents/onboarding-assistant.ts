import { completeChat } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { Message } from "@/data/types/agents";
import { getExpert } from "@/data/mock/experts";

const SYSTEM = `You are the Runway Onboarding Assistant for ABC Airlines support experts.
Warm, encouraging tone. Never promise compensation, schedule, or specific policy outcomes—direct those to HR or a supervisor.
Always mention the next actionable step. The user is a new hire who may be anxious. Keep replies concise (under 120 words).`;

function fallbackReply(messages: Message[], stage: string): string {
  const last = messages.filter((m) => m.role === "user").pop()?.content?.toLowerCase() ?? "";
  if (last.includes("day one") || last.includes("first day")) {
    return "Day one on Runway is about orientation, not perfection. Complete your checklist, say hi in the cohort space, and try your first simulation—it's OK if it doesn't go perfectly. Next step: open your Pushback checklist from the dashboard.";
  }
  if (last.includes("badge") || last.includes("mission")) {
    return "Badges unlock when you demonstrate progress—like finishing pre-boarding (Gate Cleared) or your first simulation. Head to Mission Center to see what's unlocked; harder missions open after you hit accuracy targets on the level before.";
  }
  return `You're in the ${stage} stage. Check the runway tracker for what's next, complete any pulse survey if it's Monday, and use Mission Center when you're in Taxi training. For HR or pay questions, contact your recruiter—I'm here for how Runway works and what to expect in onboarding.`;
}

export async function runOnboardingAssistant(
  messages: Message[],
  expertId: string,
  stage: string
): Promise<string> {
  const expert = getExpert(expertId);
  const ctx = expert
    ? `Expert: ${expert.name}. Stage: ${expert.stage}. Pre-boarding done: ${Boolean(expert.preBoardingComplete)}. Week one done: ${Boolean(expert.weekOneComplete)}.`
    : `Expert id: ${expertId}. Stage hint: ${stage}.`;

  try {
    const text = await completeChat(
      `${SYSTEM}\nContext: ${ctx}`,
      messages.map((m) => ({ role: m.role, content: m.content }))
    );
    await logGovernance({
      agent: "Onboarding Assistant",
      inputSummary: messages.slice(-1)[0]?.content?.slice(0, 200) ?? "",
      outputSummary: text.slice(0, 200),
      confidence: 0.85,
    });
    return text;
  } catch {
    const text = fallbackReply(messages, expert?.stage ?? stage);
    await logGovernance({
      agent: "Onboarding Assistant (fallback)",
      inputSummary: messages.slice(-1)[0]?.content?.slice(0, 200) ?? "",
      outputSummary: text.slice(0, 200),
      confidence: 0.5,
    });
    return text;
  }
}
