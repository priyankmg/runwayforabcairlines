import type { Expert, RunwayStage } from "@/data/types/expert";
import { MISSIONS } from "@/data/mock/missions";

const STAGE_ORDER: RunwayStage[] = ["GATE", "PUSHBACK", "TAXI", "ROLL", "TAKEOFF"];

export interface StageProgress {
  stage: RunwayStage;
  label: string;
  percentComplete: number;
  status: "complete" | "current" | "upcoming";
}

const STAGE_LABELS: Record<RunwayStage, string> = {
  GATE: "Gate",
  PUSHBACK: "Pushback",
  TAXI: "Taxi",
  ROLL: "Roll",
  TAKEOFF: "Takeoff",
};

function stageIndex(s: RunwayStage): number {
  return STAGE_ORDER.indexOf(s);
}

/** Rough % within journey for runway animation (0–100). */
export function runwayProgressPercent(expert: Expert): number {
  const idx = stageIndex(expert.stage);
  const base = (idx / (STAGE_ORDER.length - 1)) * 100;
  const within = withinStageFraction(expert) * (100 / (STAGE_ORDER.length - 1));
  return Math.min(100, Math.round(base + within * 0.25));
}

function withinStageFraction(expert: Expert): number {
  switch (expert.stage) {
    case "GATE":
      return expert.preBoardingComplete ? 0.9 : 0.35;
    case "PUSHBACK":
      return expert.weekOneComplete ? 0.85 : 0.4;
    case "TAXI": {
      const n = expert.missionIdsCompleted.length;
      return Math.min(1, n / 9);
    }
    case "ROLL": {
      const c = expert.supervisedContactsComplete ?? 0;
      return Math.min(1, c / 10);
    }
    case "TAKEOFF":
      return 1;
    default:
      return 0;
  }
}

export function buildStageProgressList(expert: Expert): StageProgress[] {
  const currentIdx = stageIndex(expert.stage);
  return STAGE_ORDER.map((stage, i) => {
    let status: StageProgress["status"] = "upcoming";
    if (i < currentIdx) status = "complete";
    else if (i === currentIdx) status = "current";
    let percentComplete = 0;
    if (status === "complete") percentComplete = 100;
    if (status === "current") percentComplete = Math.round(withinStageFraction(expert) * 100);
    return {
      stage,
      label: STAGE_LABELS[stage],
      percentComplete,
      status,
    };
  });
}

export function getMissionUnlockReason(missionId: string, expert: Expert): { unlocked: boolean; reason: string } {
  const m = MISSIONS.find((x) => x.id === missionId);
  if (!m) return { unlocked: false, reason: "Unknown mission" };
  if (expert.stage === "GATE" || expert.stage === "PUSHBACK") {
    return { unlocked: false, reason: "Complete Pushback orientation to unlock Taxi missions" };
  }

  const typeIds = (t: string) => MISSIONS.filter((x) => x.contactType === t).sort((a, b) => a.level - b.level);
  const res = typeIds("RESERVATIONS");
  const bill = typeIds("BILLING");
  const comp = typeIds("COMPLAINTS");

  const completed = new Set(expert.missionIdsCompleted);

  const checkLevel = (sameType: typeof res, mid: string, level: 1 | 2 | 3): { unlocked: boolean; reason: string } => {
    if (level === 1) return { unlocked: true, reason: "" };
    const prev = sameType.find((x) => x.level === (level - 1) as 1 | 2);
    if (!prev || !completed.has(prev.id)) {
      return { unlocked: false, reason: `Complete ${prev?.code ?? "prior level"} with target accuracy first` };
    }
    return { unlocked: true, reason: "" };
  };

  if (m.contactType === "RESERVATIONS") return checkLevel(res, missionId, m.level);
  if (m.contactType === "BILLING") return checkLevel(bill, missionId, m.level);
  return checkLevel(comp, missionId, m.level);
}

export function isMissionUnlocked(missionId: string, expert: Expert): boolean {
  return getMissionUnlockReason(missionId, expert).unlocked;
}
