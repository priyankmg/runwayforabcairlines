export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface CoachingCard {
  errorType: string;
  occurrences: number;
  coachingTip: string;
  exampleFromMission: string;
  policyReference?: string | null;
}

export interface ReadinessAssessment {
  expertId: string;
  readinessScore: number;
  readyForLive: boolean;
  strongAreas: string[];
  developmentAreas: string[];
  recommendedMissionsBeforeAdvancing: string[];
  trainingManagerSummary: string;
}

export interface ContactBrief {
  contactId: string;
  customerName: string;
  priorContactSummary: string;
  classification: { category: string; confidence: number };
  applicablePolicy: {
    policyName: string;
    keyPoints: string[];
    compensation: string;
  };
  suggestedOpening: string;
  escalationFlag: boolean;
  escalationReason: string | null;
}

export interface RetentionRiskAlert {
  expertId: string;
  expertName: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  primarySignals: string[];
  daysToLikelyAttrition: number;
  recommendedManagerAction: string;
  confidenceScore: number;
}

/** v2 Simulation Engine post-mission debrief (spec §6). */
export interface SimulationDebrief {
  score: {
    accuracy: number;
    empathyLanguage: number;
    resolutionSpeed: number;
    policyCompliance: number;
  };
  overallGrade: "PASS" | "RETRY";
  whatWentWell: string[];
  areasToImprove: string[];
  policyReference: string;
  badgeEarned: string | null;
}
