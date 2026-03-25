import { completeJson } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { RetentionRiskAlert } from "@/data/types/agents";
import { EXPERTS } from "@/data/mock/experts";
import type { Expert } from "@/data/types/expert";

function expertToAlert(e: Expert): RetentionRiskAlert {
  const level = e.retentionRisk;
  return {
    expertId: e.expertId,
    expertName: e.name,
    riskLevel: level,
    primarySignals:
      level === "HIGH"
        ? ["Pulse confidence drop >1.5 vs cohort", "Simulation abandonment pattern", "Login frequency decline"]
        : level === "MEDIUM"
          ? ["Pulse confidence softening", "Slower mission cadence"]
          : ["Nominal engagement"],
    daysToLikelyAttrition: level === "HIGH" ? 7 : level === "MEDIUM" ? 14 : 45,
    recommendedManagerAction:
      level === "HIGH"
        ? "Same-day check-in: 15-min 1:1, review workload and simulation wins."
        : level === "MEDIUM"
          ? "Schedule coaching touchpoint this week; pair with high-performing buddy."
          : "Continue standard cadence.",
    confidenceScore: level === "HIGH" ? 0.81 : level === "MEDIUM" ? 0.62 : 0.35,
  };
}

export function getAllRetentionAlerts(): RetentionRiskAlert[] {
  return EXPERTS.filter((e) => e.retentionRisk !== "LOW").map(expertToAlert);
}

export function getRetentionForExpert(id: string): RetentionRiskAlert | null {
  const e = EXPERTS.find((x) => x.expertId === id);
  if (!e) return null;
  return expertToAlert(e);
}

export async function refreshAlertsWithLLM(): Promise<RetentionRiskAlert[]> {
  try {
    const list = await completeJson<{ alerts: RetentionRiskAlert[] }>(
      `Return JSON { "alerts": RetentionRiskAlert[] } for experts with any risk. Use spec fields. Only include MEDIUM and HIGH if plausible.`,
      EXPERTS.map((e) => `${e.expertId}: ${e.name}, stage ${e.stage}, pulse ${e.pulseConfidence}, risk ${e.retentionRisk}`).join("\n")
    );
    await logGovernance({
      agent: "Retention Risk Classifier",
      inputSummary: "cohort refresh",
      outputSummary: `${list.alerts?.length ?? 0} alerts`,
      confidence: 0.7,
    });
    return list.alerts?.length ? list.alerts : getAllRetentionAlerts();
  } catch {
    await logGovernance({
      agent: "Retention Risk Classifier (fallback)",
      inputSummary: "cohort",
      outputSummary: "mock alerts",
      confidence: 0.4,
    });
    return getAllRetentionAlerts();
  }
}
