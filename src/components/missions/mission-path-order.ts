/** Bottom → top progression: early missions first in array, Takeoff at end of array (renders at top with flex-col-reverse). */
export const MISSION_PATH_ORDER = [
  "res-l1",
  "bill-l1",
  "comp-l1",
  "res-l2",
  "bill-l2",
  "comp-l2",
  "res-l3",
  "bill-l3",
  "comp-l3",
] as const;
