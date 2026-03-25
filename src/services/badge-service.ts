import type { Expert } from "@/data/types/expert";
import { BADGES } from "@/data/mock/badges";

const RES = ["res-l1", "res-l2", "res-l3"];
const BILL = ["bill-l1", "bill-l2", "bill-l3"];
const COMP = ["comp-l1", "comp-l2", "comp-l3"];
const ALL = [...RES, ...BILL, ...COMP];

function hasAll(expert: Expert, ids: string[]): boolean {
  return ids.every((id) => expert.missionIdsCompleted.includes(id));
}

/** Derive badge ids that should be earned from expert state (spec milestones). */
export function computeEarnedBadges(expert: Expert): string[] {
  const earned = new Set(expert.badgeIdsEarned);
  if (expert.preBoardingComplete) earned.add("gate-cleared");
  if (expert.missionIdsCompleted.length > 0) earned.add("first-contact-sim");
  if (hasAll(expert, RES)) earned.add("reservations-specialist");
  if (hasAll(expert, BILL)) earned.add("billing-specialist");
  if (hasAll(expert, COMP)) earned.add("complaints-specialist");
  if (hasAll(expert, ALL)) earned.add("full-fleet");
  if ((expert.supervisedContactsComplete ?? 0) >= 1) earned.add("tower-clearance");
  if ((expert.supervisedContactsComplete ?? 0) >= 10) earned.add("ten-contacts");
  return Array.from(earned);
}

export function badgesForExpert(expert: Expert) {
  const computed = computeEarnedBadges(expert);
  return BADGES.map((b) => ({
    ...b,
    earned: computed.includes(b.id),
  }));
}
