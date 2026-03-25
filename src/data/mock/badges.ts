import type { BadgeDef } from "../types/badge";

export const BADGES: BadgeDef[] = [
  { id: "gate-cleared", name: "Gate Cleared", description: "Pre-boarding complete", earnCondition: "Finish pre-boarding checklist" },
  { id: "first-contact-sim", name: "First Contact (sim)", description: "First simulation mission completed", earnCondition: "Complete any simulation mission" },
  { id: "reservations-specialist", name: "Reservations Specialist", description: "All Reservations missions", earnCondition: "Complete RES L1–L3" },
  { id: "billing-specialist", name: "Billing Specialist", description: "All Billing missions", earnCondition: "Complete BILL L1–L3" },
  { id: "complaints-specialist", name: "Complaints Specialist", description: "All Complaints missions", earnCondition: "Complete COMP L1–L3" },
  { id: "full-fleet", name: "Full Fleet", description: "All 9 missions complete", earnCondition: "Complete all simulation missions" },
  { id: "tower-clearance", name: "Tower Clearance", description: "First live contact", earnCondition: "Complete first supervised/live contact" },
  { id: "ten-contacts", name: "10 Contacts", description: "Ten contacts handled", earnCondition: "Handle 10 contacts" },
  { id: "cruising-altitude", name: "Cruising Altitude", description: "Fifty contacts", earnCondition: "Handle 50 contacts" },
  { id: "long-haul", name: "Long Haul", description: "30-day retention", earnCondition: "30 days active post-Takeoff" },
  { id: "captain", name: "Captain", description: "100 contacts", earnCondition: "Handle 100 contacts" },
  { id: "mentor-wings", name: "Mentor Wings", description: "Buddy session", earnCondition: "Complete first peer buddy session" },
];
