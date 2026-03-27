import { JORDAN_ID } from "@/data/mock/experts";

/** v2 §7 — Mentor view: Riley mentors Jordan (simulated). */
export const MENTOR_CONTEXT = {
  mentorName: "Riley Stone",
  mentorExpertId: "expert-takeoff-001",
};

export const MENTEE_SUMMARY = {
  expertId: JORDAN_ID,
  name: "Jordan Lee",
  stage: "TAXI" as const,
  todayMission: "Billing L3 — Corporate billing dispute",
  openQuestions: ["Billing escalation timing vs. Reservations", "When to loop manager on corporate accounts"],
  pulseScore: 3.8,
  aiDailySummary:
    "Jordan completed Reservations L2 yesterday and passed the follow-up questionnaire. She has three open questions on billing escalation protocol — recommend a 10-minute clarification before today's 9:00am check-in with Marcus.",
  contactTypeProgress: [
    { type: "Reservations", shadow: 100, reverseShadow: 60, eval: "In progress" },
    { type: "Billing", shadow: 40, reverseShadow: 0, eval: "Not started" },
    { type: "Complaints", shadow: 0, reverseShadow: 0, eval: "Not started" },
  ],
  coachingHighlight:
    "Error Pattern Agent: watch for policy application on credit-only refunds — surfaced twice on RES-L2.",
};
