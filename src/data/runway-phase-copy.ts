import type { RunwayStage } from "@/data/types/expert";
import { RUNWAY_STAGE_ORDER } from "@/services/runway-engine";

export interface RunwayPhaseCopy {
  stage: RunwayStage;
  /** e.g. "Gate — Offer signed to Day One" */
  title: string;
  /** Italic tagline under title in cards; same as body for detail panel */
  tagline: string;
}

const COPY: Record<RunwayStage, Omit<RunwayPhaseCopy, "stage">> = {
  GATE: {
    title: "Gate — Offer signed to Day One",
    tagline:
      "You're in. Platform access starts now — meet your buddy, complete pre-boarding, and arrive on Day One already connected to your team.",
  },
  PUSHBACK: {
    title: "Pushback — Day One through Week One",
    tagline:
      "First week on the ground. Get oriented, meet your cohort, and attempt your first simulation. This is where the job becomes real.",
  },
  TAXI: {
    title: "Taxi — Training, Weeks 1–4",
    tagline:
      "Build your skills through simulated contacts — not policy reading. Each mission you complete unlocks the next. Progress is earned, not given.",
  },
  ROLL: {
    title: "Roll — Supervised Contacts 1–10",
    tagline:
      "You're on the runway with a co-pilot. Handle live contacts with a senior expert silently alongside you and AI assistance in real time. Performance tracking starts at contact 6.",
  },
  TAKEOFF: {
    title: "Takeoff — First Independent Contact and Beyond",
    tagline:
      "Cleared for takeoff. You've earned it. From here, every contact builds your record, your badges, and your career at ABC Airlines.",
  },
};

export const RUNWAY_PHASES_ORDERED: RunwayPhaseCopy[] = RUNWAY_STAGE_ORDER.map((stage) => ({
  stage,
  ...COPY[stage],
}));

export function getRunwayPhaseCopy(stage: RunwayStage): RunwayPhaseCopy {
  return { stage, ...COPY[stage] };
}
