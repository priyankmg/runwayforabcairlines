export interface QueuedContact {
  id: string;
  customerId: string;
  customerName: string;
  category: "Reservations" | "Billing" | "Complaints";
  waitSeconds: number;
  coPilotName: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  priorContactsSummary: string;
}
