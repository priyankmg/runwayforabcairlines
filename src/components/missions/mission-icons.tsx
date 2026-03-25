import type { LucideIcon } from "lucide-react";
import {
  CalendarSync,
  Receipt,
  Armchair,
  Copy,
  Luggage,
  Landmark,
  Utensils,
  CloudLightning,
  Megaphone,
} from "lucide-react";

export const MISSION_ICONS: Record<string, LucideIcon> = {
  "res-l1": CalendarSync,
  "res-l2": Receipt,
  "res-l3": Armchair,
  "bill-l1": Copy,
  "bill-l2": Luggage,
  "bill-l3": Landmark,
  "comp-l1": Utensils,
  "comp-l2": CloudLightning,
  "comp-l3": Megaphone,
};

export function getMissionIcon(id: string): LucideIcon {
  return MISSION_ICONS[id] ?? CalendarSync;
}
