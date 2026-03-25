export type ContactType = "RESERVATIONS" | "BILLING" | "COMPLAINTS";
export type MissionLevel = 1 | 2 | 3;

export interface MissionScenario {
  id: string;
  code: string;
  title: string;
  contactType: ContactType;
  level: MissionLevel;
  customerPersona: string;
  problem: string;
  correctResolution: string;
  commonMistakes: [string, string, string];
  openingCustomerLine: string;
  difficultyHint: string;
}
