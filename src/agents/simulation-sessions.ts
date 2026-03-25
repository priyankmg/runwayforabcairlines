import type { MissionScenario } from "@/data/types/mission";

export interface SimSession {
  sessionId: string;
  missionId: string;
  expertId: string;
  scenario: MissionScenario;
  messages: { role: "customer" | "expert"; content: string }[];
  startedAt: number;
}

const sessions = new Map<string, SimSession>();

export function createSession(scenario: MissionScenario, expertId: string): SimSession {
  const sessionId = `sim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const session: SimSession = {
    sessionId,
    missionId: scenario.id,
    expertId,
    scenario,
    messages: [{ role: "customer", content: scenario.openingCustomerLine }],
    startedAt: Date.now(),
  };
  sessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId: string): SimSession | undefined {
  return sessions.get(sessionId);
}

export function clearOldSessions(maxAgeMs = 1000 * 60 * 60 * 4) {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.startedAt > maxAgeMs) sessions.delete(id);
  }
}
