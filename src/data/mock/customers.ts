import type { CustomerProfile } from "../types/contact";

export const CUSTOMERS: CustomerProfile[] = [
  { id: "cust-001", name: "Alex Morgan", priorContactsSummary: "Last 3: seat upgrade (resolved), baggage delay claim (pending voucher)." },
  { id: "cust-002", name: "Sam Rivera", priorContactsSummary: "Last 3: billing dispute (closed), flight change, missed bag report." },
  { id: "cust-003", name: "Taylor Kim", priorContactsSummary: "Last 3: complaint — meal (voucher issued), delay comp inquiry." },
];
