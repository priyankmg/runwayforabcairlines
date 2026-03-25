import type { Expert } from "../types/expert";

export const JORDAN_ID = "expert-jordan-001";

const MISSION_IDS_ALL = ["res-l1", "res-l2", "res-l3", "bill-l1", "bill-l2", "bill-l3", "comp-l1", "comp-l2", "comp-l3"];

export const EXPERTS: Expert[] = [
  {
    expertId: JORDAN_ID,
    name: "Jordan Lee",
    hireDate: "2025-03-10",
    stage: "TAXI",
    daysInStage: 8,
    missionIdsCompleted: ["res-l1", "res-l2", "res-l3", "bill-l1", "bill-l2"],
    badgeIdsEarned: ["gate-cleared", "first-contact-sim", "reservations-specialist"],
    readinessScore: 68,
    retentionRisk: "LOW",
    pulseConfidence: 3.8,
    buddyExpertId: "expert-takeoff-001",
    preBoardingComplete: true,
    weekOneComplete: true,
    supervisedContactsComplete: 0,
  },
  { expertId: "expert-gate-001", name: "Avery Brooks", hireDate: "2025-03-22", stage: "GATE", daysInStage: 2, missionIdsCompleted: [], badgeIdsEarned: [], readinessScore: 0, retentionRisk: "LOW", pulseConfidence: 3.2, preBoardingComplete: false },
  { expertId: "expert-gate-002", name: "Blake Nguyen", hireDate: "2025-03-21", stage: "GATE", daysInStage: 3, missionIdsCompleted: [], badgeIdsEarned: [], readinessScore: 0, retentionRisk: "MEDIUM", pulseConfidence: 2.9, preBoardingComplete: false },
  { expertId: "expert-gate-003", name: "Casey Patel", hireDate: "2025-03-20", stage: "GATE", daysInStage: 4, missionIdsCompleted: [], badgeIdsEarned: [], readinessScore: 0, retentionRisk: "LOW", pulseConfidence: 3.5, preBoardingComplete: false },
  { expertId: "expert-gate-004", name: "Drew Okonkwo", hireDate: "2025-03-19", stage: "GATE", daysInStage: 5, missionIdsCompleted: [], badgeIdsEarned: [], readinessScore: 0, retentionRisk: "LOW", pulseConfidence: 3.4, preBoardingComplete: false },
  { expertId: "expert-push-001", name: "Emery Silva", hireDate: "2025-03-14", stage: "PUSHBACK", daysInStage: 5, missionIdsCompleted: [], badgeIdsEarned: ["gate-cleared"], readinessScore: 12, retentionRisk: "LOW", pulseConfidence: 3.6, preBoardingComplete: true, weekOneComplete: false },
  { expertId: "expert-push-002", name: "Finley Carter", hireDate: "2025-03-13", stage: "PUSHBACK", daysInStage: 6, missionIdsCompleted: [], badgeIdsEarned: ["gate-cleared"], readinessScore: 18, retentionRisk: "MEDIUM", pulseConfidence: 3.0, preBoardingComplete: true, weekOneComplete: false },
  { expertId: "expert-push-003", name: "Gray Lopez", hireDate: "2025-03-12", stage: "PUSHBACK", daysInStage: 7, missionIdsCompleted: ["res-l1"], badgeIdsEarned: ["gate-cleared", "first-contact-sim"], readinessScore: 35, retentionRisk: "LOW", pulseConfidence: 3.7, preBoardingComplete: true, weekOneComplete: true },
  { expertId: "expert-taxi-002", name: "Harper Reed", hireDate: "2025-03-08", stage: "TAXI", daysInStage: 10, missionIdsCompleted: ["res-l1", "res-l2", "bill-l1"], badgeIdsEarned: ["gate-cleared", "first-contact-sim"], readinessScore: 55, retentionRisk: "LOW", pulseConfidence: 3.5, preBoardingComplete: true, weekOneComplete: true },
  { expertId: "expert-taxi-003", name: "Indigo Walsh", hireDate: "2025-03-07", stage: "TAXI", daysInStage: 11, missionIdsCompleted: ["res-l1", "res-l2", "res-l3", "bill-l1"], badgeIdsEarned: ["gate-cleared", "first-contact-sim", "reservations-specialist"], readinessScore: 72, retentionRisk: "HIGH", pulseConfidence: 2.4, preBoardingComplete: true, weekOneComplete: true },
  { expertId: "expert-roll-001", name: "Jamie Frost", hireDate: "2025-02-20", stage: "ROLL", daysInStage: 14, missionIdsCompleted: [...MISSION_IDS_ALL], badgeIdsEarned: ["gate-cleared", "first-contact-sim", "reservations-specialist", "billing-specialist", "complaints-specialist", "full-fleet"], readinessScore: 88, retentionRisk: "LOW", pulseConfidence: 4.0, preBoardingComplete: true, weekOneComplete: true, supervisedContactsComplete: 6, qualityScores: [82, 85, 78, 88, 90, 84] },
  {
    expertId: "expert-takeoff-001",
    name: "Riley Stone",
    hireDate: "2025-01-15",
    stage: "TAKEOFF",
    daysInStage: 45,
    missionIdsCompleted: [...MISSION_IDS_ALL],
    badgeIdsEarned: ["gate-cleared", "first-contact-sim", "reservations-specialist", "billing-specialist", "complaints-specialist", "full-fleet", "tower-clearance", "ten-contacts"],
    readinessScore: 94,
    retentionRisk: "LOW",
    pulseConfidence: 4.3,
    preBoardingComplete: true,
    weekOneComplete: true,
    supervisedContactsComplete: 10,
    qualityScores: [85, 88, 90, 86, 89, 91, 87, 90, 88, 92],
  },
];

export function getExpert(id: string): Expert | undefined {
  return EXPERTS.find((e) => e.expertId === id);
}
