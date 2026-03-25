import { completeJson } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { ReadinessAssessment } from "@/data/types/agents";
import type { Expert } from "@/data/types/expert";

function fallbackAssessment(expert: Expert): ReadinessAssessment {
  const score = expert.readinessScore;
  return {
    expertId: expert.expertId,
    readinessScore: score,
    readyForLive: score >= 75,
    strongAreas: ["Consistent login and mission completion cadence", "Reservations flow"],
    developmentAreas: ["Billing edge cases", "Escalation timing under stress"],
    recommendedMissionsBeforeAdvancing: score >= 75 ? [] : ["bill-l3", "comp-l1", "comp-l2"],
    trainingManagerSummary: `${expert.name} is ${score >= 75 ? "approaching" : "not yet at"} the supervised-live threshold. Focus on cross-type consistency before Roll.`,
  };
}

export async function runReadinessClassifier(expert: Expert): Promise<ReadinessAssessment> {
  try {
    const a = await completeJson<ReadinessAssessment>(
      `Return ONLY JSON for ReadinessAssessment: expertId, readinessScore 0-100, readyForLive boolean (true if >=75), strongAreas[], developmentAreas[], recommendedMissionsBeforeAdvancing[], trainingManagerSummary.`,
      `Data: ${JSON.stringify({
        expertId: expert.expertId,
        name: expert.name,
        missions: expert.missionIdsCompleted,
        pulse: expert.pulseConfidence,
        stage: expert.stage,
      })}`
    );
    await logGovernance({
      agent: "Readiness Classifier",
      inputSummary: expert.expertId,
      outputSummary: `score=${a.readinessScore} ready=${a.readyForLive}`,
      confidence: 0.8,
    });
    return a;
  } catch {
    const a = fallbackAssessment(expert);
    await logGovernance({
      agent: "Readiness Classifier (fallback)",
      inputSummary: expert.expertId,
      outputSummary: `score=${a.readinessScore}`,
      confidence: 0.45,
    });
    return a;
  }
}
