export type RunwayStage = "GATE" | "PUSHBACK" | "TAXI" | "ROLL" | "TAKEOFF";

export type RetentionRisk = "LOW" | "MEDIUM" | "HIGH";

/** v2: supervisor trajectory signal */
export type TrajectorySignal = "on_track" | "monitor" | "at_risk";

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
  /** v2 A/B rollout */
  abGroup?: "A" | "B";
  trajectory?: TrajectorySignal;
  /** v2 Gate — reporting details (simulated) */
  joiningSite?: string;
  reportToName?: string;
}
