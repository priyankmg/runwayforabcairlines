export interface ABGroup {
  label: "Group A (Runway)" | "Group B (Control)";
  color: string;
  totalOffers: number;
  noShows: number;
  trainingDropouts: number;
  preContactQuitters: number;
  productive: number;
  day90Retention: number;
}

export const AB_TEST_DATA: ABGroup[] = [
  {
    label: "Group A (Runway)",
    color: "#0EA5E9",
    totalOffers: 27,
    noShows: 1,
    trainingDropouts: 3,
    preContactQuitters: 2,
    productive: 21,
    day90Retention: 19,
  },
  {
    label: "Group B (Control)",
    color: "#94a3b8",
    totalOffers: 27,
    noShows: 2,
    trainingDropouts: 8,
    preContactQuitters: 4,
    productive: 13,
    day90Retention: 10,
  },
];

// Monthly signal build-up (for trend chart, 8 months in)
export const AB_MONTHLY = [
  { month: "M1", groupA: 0, groupB: 0 },
  { month: "M2", groupA: 3, groupB: 2 },
  { month: "M3", groupA: 7, groupB: 5 },
  { month: "M4", groupA: 10, groupB: 7 },
  { month: "M5", groupA: 16, groupB: 11 },
  { month: "M6", groupA: 20, groupB: 13 },
  { month: "M7", groupA: 24, groupB: 13 },
  { month: "M8", groupA: 27, groupB: 13 },
];

export const AB_ATTRITION_BY_STAGE = [
  { stage: "No-show", groupA: 1, groupB: 2, groupARate: 3.7, groupBRate: 7.4 },
  { stage: "Training dropout", groupA: 3, groupB: 8, groupARate: 11.1, groupBRate: 29.6 },
  { stage: "Pre-contact quit", groupA: 2, groupB: 4, groupARate: 7.4, groupBRate: 14.8 },
];
