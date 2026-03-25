import type { QueuedContact } from "../types/contact";

export const CONTACT_QUEUE: QueuedContact[] = [
  { id: "live-001", customerId: "cust-001", customerName: "Alex Morgan", category: "Reservations", waitSeconds: 42, coPilotName: "Riley Stone" },
  { id: "live-002", customerId: "cust-002", customerName: "Sam Rivera", category: "Billing", waitSeconds: 118, coPilotName: "Riley Stone" },
  { id: "live-003", customerId: "cust-003", customerName: "Taylor Kim", category: "Complaints", waitSeconds: 240, coPilotName: "Jamie Frost" },
];
