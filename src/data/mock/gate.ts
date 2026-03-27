/** v2 §4 Gate — My Help Network (simulated HR contacts). */
export const HELP_NETWORK_REPS = [
  { id: "hr-1", name: "Sam Okonkwo", role: "HR Business Partner", email: "s.okonkwo@abcairlines.example" },
  { id: "hr-2", name: "Jordan Kim", role: "Recruiting", email: "j.kim@abcairlines.example" },
];

export const GATE_CHECKLIST_ITEMS = [
  { id: "register", label: "Register on Runway and set password", doneKey: "preBoarding" as const },
  { id: "offer", label: "E-sign offer and choose joining date", doneKey: "preBoarding" as const },
  { id: "forms", label: "Personal details, bank details, photo", doneKey: "preBoarding" as const },
  { id: "culture", label: "Vision, mission, leadership principles videos", doneKey: "preBoarding" as const },
  { id: "buddy", label: "Peer buddy introduction", doneKey: "preBoarding" as const },
];
