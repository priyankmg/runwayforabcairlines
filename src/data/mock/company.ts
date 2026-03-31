export const ABC_PROFILE = {
  name: "ABC Airlines",
  hq: "Portland, Oregon",
  fleet: 80,
  dailyFlights: 250,
  loadFactor: 0.80,
  annualPassengers: 5_500_000,
  annualRevenue: "$500M",
  avgTicketFare: 100,
} as const;

export const CONTACT_TYPES = [
  { type: "Low touch", pct: 0.60, dailyVol: 3000, slaMin: 5 },
  { type: "Standard", pct: 0.30, dailyVol: 1500, slaMin: 10 },
  { type: "High touch", pct: 0.10, dailyVol: 500, slaMin: 25 },
] as const;

export const ATTRITION = {
  overall: { rate: 0.35, annualCount: 80, label: "Overall workforce attrition" },
  preContact: { rate: 0.50, annualCount: 80, label: "Pre-contact attrition (Runway problem)" },
  breakdown: [
    { segment: "No-shows", pct: 0.05, count: 8, stage: "GATE", cost: 3000, annual: 24000 },
    { segment: "Training dropouts", pct: 0.30, count: 48, stage: "TAXI", cost: 8000, annual: 384000 },
    { segment: "Pre-contact quitters", pct: 0.15, count: 24, stage: "ROLL", cost: 8000, annual: 192000 },
  ],
  totalWaste: 667000,
} as const;

export const RUNWAY_TARGETS = {
  noShowRate: 0.02,
  trainingDropout: 0.10,
  preContactAttrition: 0.05,
  overall: 0.15,
  day90Retention: 0.85,
  day180Retention: 0.75,
} as const;

export const HR_CONTACTS = [
  { id: "hr-001", name: "Sandra Obi", role: "HR Business Partner", email: "s.obi@abcairlines.com", avatarInitials: "SO" },
  { id: "hr-002", name: "James Whitfield", role: "Talent Acquisition", email: "j.whitfield@abcairlines.com", avatarInitials: "JW" },
  { id: "hr-003", name: "Priya Mehta", role: "Benefits & Payroll", email: "p.mehta@abcairlines.com", avatarInitials: "PM" },
] as const;
