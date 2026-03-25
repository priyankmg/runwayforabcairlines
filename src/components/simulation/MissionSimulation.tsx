"use client";

import { useState } from "react";
import { JORDAN_ID } from "@/data/mock/experts";

export function MissionSimulation({ missionId, title }: { missionId: string; title: string }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lines, setLines] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [debrief, setDebrief] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/simulation/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionId, expertId: JORDAN_ID }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSessionId(data.sessionId);
      setLines([{ role: "customer", text: data.openingLine }]);
      setDebrief(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Start failed");
    } finally {
      setBusy(false);
    }
  }

  async function send() {
    if (!sessionId || !input.trim() || busy) return;
    const msg = input.trim();
    setInput("");
    setLines((l) => [...l, { role: "expert", text: msg }]);
    setBusy(true);
    try {
      const res = await fetch("/api/simulation/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setLines((l) => [...l, { role: "customer", text: data.customerReply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setBusy(false);
    }
  }

  async function complete() {
    if (!sessionId || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/simulation/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDebrief(data.debrief);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Complete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 flex flex-col rounded-2xl border border-white/10 bg-[#0F2B5B]/40">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="font-semibold text-white">Customer contact</h2>
          <p className="text-xs text-slate-400">{title}</p>
        </div>
        <div className="min-h-[320px] flex-1 space-y-3 overflow-y-auto p-4">
          {!sessionId && (
            <p className="text-sm text-slate-400">Start the simulation to receive the first customer message.</p>
          )}
          {lines.map((l, i) => (
            <div
              key={i}
              className={`max-w-[90%] rounded-xl px-4 py-2 text-sm ${
                l.role === "customer" ? "bg-black/25 text-slate-100" : "ml-auto bg-sky-600/25 text-slate-100"
              }`}
            >
              <span className="mb-1 block text-[10px] uppercase text-slate-500">{l.role}</span>
              {l.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-white/10 p-3">
          <input
            className="flex-1 rounded-lg border border-white/10 bg-[#0B1426] px-3 py-2 text-sm focus:border-amber-500/50 focus:outline-none"
            placeholder="Type your response as the expert…"
            value={input}
            disabled={!sessionId || busy}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            type="button"
            onClick={send}
            disabled={!sessionId || busy}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Send
          </button>
        </div>
        <div className="flex gap-2 border-t border-white/5 p-3">
          {!sessionId ? (
            <button
              type="button"
              onClick={start}
              disabled={busy}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-[#0B1426]"
            >
              Start mission
            </button>
          ) : (
            <button
              type="button"
              onClick={complete}
              disabled={busy}
              className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300"
            >
              End & debrief
            </button>
          )}
        </div>
        {error && <p className="px-4 pb-3 text-sm text-red-400">{error}</p>}
      </div>

      <div className="lg:col-span-2 flex flex-col rounded-2xl border border-white/10 bg-[#0B1426]/80 p-4">
        <h3 className="font-semibold text-amber-400">AI assistant panel</h3>
        <p className="mt-2 text-sm text-slate-400">
          In production, this panel shows policy snippets, coaching tips, and suggested phrasing. The simulation engine plays the
          customer on the left — you stay in control of the contact.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-slate-300">
          <li>• Reference mission scenario and correct resolution path from training.</li>
          <li>• Escalate when policy requires — don’t debate discrimination or social threats.</li>
          <li>• Confirm customer understanding before closing.</li>
        </ul>
        {debrief && (
          <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm">
            <div className="font-semibold text-emerald-300">Debrief</div>
            <p className="mt-2 text-slate-300">Overall: {(debrief as { overallScore?: number }).overallScore ?? "—"}</p>
            <p className="mt-1 text-slate-400">{(debrief as { summary?: string }).summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
