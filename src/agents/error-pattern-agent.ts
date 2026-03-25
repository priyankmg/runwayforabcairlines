import { completeJson } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { CoachingCard } from "@/data/types/agents";
import type { Expert } from "@/data/types/expert";

function fallbackCard(expert: Expert): CoachingCard {
  return {
    errorType: "Policy application",
    occurrences: 2,
    lastOccurred: expert.missionIdsCompleted[expert.missionIdsCompleted.length - 1] ?? "res-l2",
    coachingTip: "Before offering compensation, name the policy section and confirm eligibility in two sentences.",
    exampleFromMission: "You offered a cash refund where only credit applies—instead, explain credit shell timeline.",
    policyReference: "refund-credit",
  };
}

export async function runErrorPatternAgent(expert: Expert): Promise<CoachingCard[]> {
  try {
    const card = await completeJson<CoachingCard>(
      `You analyze simulation history for ABC Airlines trainees. Return ONE JSON object CoachingCard with fields errorType, occurrences, lastOccurred (mission id string), coachingTip (max 50 words), exampleFromMission, optional policyReference.`,
      `Expert ${expert.name} completed missions: ${expert.missionIdsCompleted.join(", ")}. Readiness ${expert.readinessScore}. Infer a plausible repeated mistake pattern.`
    );
    await logGovernance({
      agent: "Error Pattern Agent",
      inputSummary: expert.expertId,
      outputSummary: card.coachingTip.slice(0, 120),
      confidence: 0.72,
    });
    return [card];
  } catch {
    const card = fallbackCard(expert);
    await logGovernance({
      agent: "Error Pattern Agent (fallback)",
      inputSummary: expert.expertId,
      outputSummary: card.coachingTip.slice(0, 120),
      confidence: 0.4,
    });
    return [card];
  }
}
