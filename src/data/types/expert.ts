export type RunwayStage = "GATE" | "PUSHBACK" | "TAXI" | "ROLL" | "TAKEOFF";

export type RetentionRisk = "LOW" | "MEDIUM" | "HIGH";

export interface Expert {
  expertId: string;
  name: string;
  hireDate: string;
  stage: RunwayStage;
  daysInStage: number;
  missionIdsCompleted: string[];
  badgeIdsEarned: string[];
  readinessScore: number;
  retentionRisk: RetentionRisk;
  pulseConfidence: number;
  buddyExpertId?: string;
  preBoardingComplete?: boolean;
  weekOneComplete?: boolean;
  supervisedContactsComplete?: number;
  qualityScores?: number[];
}
