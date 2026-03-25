"use client";

import { useState } from "react";

export function ExpertAgentPanel({ expertId }: { expertId: string }) {
  const [readiness, setReadiness] = useState<string | null>(null);
  const [coaching, setCoaching] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function loadReadiness() {
    setLoading("readiness");
    const res = await fetch("/api/agents/readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expertId }),
    });
    const data = await res.json();
    setReadiness(JSON.stringify(data, null, 2));
    setLoading(null);
  }

  async function loadCoaching() {
    setLoading("coaching");
    const res = await fetch("/api/agents/error-pattern", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expertId }),
    });
    const data = await res.json();
    setCoaching(JSON.stringify(data, null, 2));
    setLoading(null);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0F2B5B]/30 p-4">
      <h2 className="font-semibold text-white">AI assessments</h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadReadiness}
          disabled={loading !== null}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading === "readiness" ? "Loading…" : "Readiness Classifier"}
        </button>
        <button
          type="button"
          onClick={loadCoaching}
          disabled={loading !== null}
          className="rounded-lg bg-amber-600/80 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {loading === "coaching" ? "Loading…" : "Error Pattern Agent"}
        </button>
      </div>
      {readiness && (
        <pre className="max-h-64 overflow-auto rounded-lg bg-black/30 p-3 text-xs text-slate-300">{readiness}</pre>
      )}
      {coaching && (
        <pre className="max-h-64 overflow-auto rounded-lg bg-black/30 p-3 text-xs text-slate-300">{coaching}</pre>
      )}
    </div>
  );
}
