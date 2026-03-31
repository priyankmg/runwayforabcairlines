export interface MentorAssignment {
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  menteeSage: string;
  todaysMission?: string;
  openQuestions: string[];
  pulseScore: number;
  aiDailySummary: string;
  trajectory: "on-track" | "monitor" | "at-risk";
}

export const MENTOR_ASSIGNMENTS: MentorAssignment[] = [
  {
    mentorId: "expert-takeoff-001",
    mentorName: "Riley Stone",
    menteeId: "expert-jordan-001",
    menteeName: "Jordan Lee",
    menteeSage: "TAXI",
    todaysMission: "BILL-L1: Double charge (Billing Level 1)",
    openQuestions: ["Billing refund timelines when dispute spans two statements?"],
    pulseScore: 3.8,
    aiDailySummary:
      "Jordan completed the Reservations reverse-shadow session yesterday and passed the questionnaire. She had one open question about billing refund timelines across two billing cycles — recommend a 10-minute clarification before today's check-in. She is on pace to clear Billing shadow by end of this week. Pulse confidence steady at 3.8 — no flags.",
    trajectory: "on-track",
  },
  {
    mentorId: "expert-takeoff-001",
    mentorName: "Riley Stone",
    menteeId: "expert-push-003",
    menteeName: "Gray Lopez",
    menteeSage: "PUSHBACK",
    todaysMission: "RES-L1: Simple flight change (Level 1)",
    openQuestions: ["What does the hold time policy cover during peak hours?"],
    pulseScore: 3.7,
    aiDailySummary:
      "Gray is in Pushback — first simulation attempt scheduled for today. No prior open questions from yesterday. Pulse confidence 3.7, which is healthy for this stage. Recommend encouraging first attempt regardless of outcome — failure is expected and built into the model.",
    trajectory: "on-track",
  },
];
