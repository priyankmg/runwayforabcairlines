import { neon } from "@neondatabase/serverless";

export interface GovernanceLogEntry {
  id: string;
  timestamp: string;
  agent: string;
  inputSummary: string;
  outputSummary: string;
  confidence?: number;
}

const memoryLog: GovernanceLogEntry[] = [];

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    return neon(url);
  } catch {
    return null;
  }
}

export async function logGovernance(entry: Omit<GovernanceLogEntry, "id" | "timestamp">): Promise<void> {
  const row: GovernanceLogEntry = {
    id: `gov-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  memoryLog.unshift(row);
  if (memoryLog.length > 500) memoryLog.pop();

  const sql = getSql();
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS runway_governance_log (
        id TEXT PRIMARY KEY,
        ts TIMESTAMPTZ DEFAULT NOW(),
        agent TEXT NOT NULL,
        input_summary TEXT NOT NULL,
        output_summary TEXT NOT NULL,
        confidence REAL
      )
    `;
    await sql`
      INSERT INTO runway_governance_log (id, agent, input_summary, output_summary, confidence)
      VALUES (${row.id}, ${row.agent}, ${row.inputSummary}, ${row.outputSummary}, ${row.confidence ?? null})
    `;
  } catch {
    /* optional DB */
  }
}

export async function getGovernanceLog(limit = 100): Promise<GovernanceLogEntry[]> {
  const sql = getSql();
  if (sql) {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS runway_governance_log (
          id TEXT PRIMARY KEY,
          ts TIMESTAMPTZ DEFAULT NOW(),
          agent TEXT NOT NULL,
          input_summary TEXT NOT NULL,
          output_summary TEXT NOT NULL,
          confidence REAL
        )
      `;
      const rows = await sql`
        SELECT id, ts::text as timestamp, agent, input_summary as "inputSummary", output_summary as "outputSummary", confidence
        FROM runway_governance_log ORDER BY ts DESC LIMIT ${limit}
      `;
      return rows as GovernanceLogEntry[];
    } catch {
      /* fall through */
    }
  }
  return memoryLog.slice(0, limit);
}
