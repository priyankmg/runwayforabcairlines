import type { LucideIcon } from "lucide-react";
import {
  DoorOpen,
  Headphones,
  Ticket,
  Wallet,
  MessageSquareWarning,
  LayoutGrid,
  TowerControl,
  Hash,
  Mountain,
  CalendarClock,
  Crown,
  HeartHandshake,
} from "lucide-react";

export const BADGE_ICONS: Record<string, LucideIcon> = {
  "gate-cleared": DoorOpen,
  "first-contact-sim": Headphones,
  "reservations-specialist": Ticket,
  "billing-specialist": Wallet,
  "complaints-specialist": MessageSquareWarning,
  "full-fleet": LayoutGrid,
  "tower-clearance": TowerControl,
  "ten-contacts": Hash,
  "cruising-altitude": Mountain,
  "long-haul": CalendarClock,
  captain: Crown,
  "mentor-wings": HeartHandshake,
};

export function getBadgeIcon(id: string): LucideIcon {
  return BADGE_ICONS[id] ?? Ticket;
}
