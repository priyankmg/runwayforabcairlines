export type ContactTypeLabel = "Reservations" | "Billing" | "Complaints";
export type SessionPhase = "shadow" | "reverse-shadow";
export type SessionStatus = "complete" | "in-progress" | "upcoming";

export interface ShadowSession {
  id: string;
  expertId: string;
  contactType: ContactTypeLabel;
  phase: SessionPhase;
  status: SessionStatus;
  questionnairePassed?: boolean;
  openQuestions?: string[];
  completedAt?: string;
}

export const SHADOW_SESSIONS: ShadowSession[] = [
  {
    id: "ss-001", expertId: "expert-jordan-001", contactType: "Reservations",
    phase: "shadow", status: "complete", questionnairePassed: true,
    openQuestions: [], completedAt: "2025-03-17",
  },
  {
    id: "ss-002", expertId: "expert-jordan-001", contactType: "Reservations",
    phase: "reverse-shadow", status: "complete", questionnairePassed: true,
    openQuestions: ["Billing refund timelines when dispute spans two statements?"],
    completedAt: "2025-03-19",
  },
  {
    id: "ss-003", expertId: "expert-jordan-001", contactType: "Billing",
    phase: "shadow", status: "in-progress", questionnairePassed: undefined,
    openQuestions: ["When does a baggage fee dispute escalate vs. refund directly?"],
  },
  {
    id: "ss-004", expertId: "expert-jordan-001", contactType: "Billing",
    phase: "reverse-shadow", status: "upcoming",
  },
  {
    id: "ss-005", expertId: "expert-jordan-001", contactType: "Complaints",
    phase: "shadow", status: "upcoming",
  },
  {
    id: "ss-006", expertId: "expert-jordan-001", contactType: "Complaints",
    phase: "reverse-shadow", status: "upcoming",
  },
];

export const CHECK_INS = [
  { day: "Mon Mar 24", time: "9:00am", with: "Marcus Chen (Supervisor)" },
  { day: "Tue Mar 25", time: "9:00am", with: "Riley Stone (Mentor)" },
  { day: "Wed Mar 26", time: "9:00am", with: "Marcus Chen (Supervisor)" },
  { day: "Thu Mar 27", time: "9:00am", with: "Riley Stone (Mentor)" },
  { day: "Fri Mar 28", time: "9:00am", with: "Marcus Chen (Supervisor)" },
];
