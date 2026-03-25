"use client";

import { useEffect, useState } from "react";
import type { ContactBrief } from "@/data/types/agents";

export function LiveContactView({ contactId, customerName }: { contactId: string; customerName: string }) {
  const [brief, setBrief] = useState<ContactBrief | null>(null);
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents/contact-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId }),
    })
      .then((r) => r.json())
      .then(setBrief)
      .finally(() => setLoading(false));
  }, [contactId]);

  async function lookup() {
    if (!q.trim()) return;
    const res = await fetch("/api/assistant/mid-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, context: JSON.stringify(brief) }),
    });
    const data = await res.json();
    setAnswer(data.answer ?? "No answer");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3 space-y-4 rounded-2xl border border-white/10 bg-[#0F2B5B]/40 p-4">
        <h2 className="font-semibold text-white">Live contact — {customerName}</h2>
        <p className="text-sm text-slate-400">
          Co-pilot is active on a private channel. Customer sees only your public replies (simulated).
        </p>
        <div className="rounded-xl bg-black/20 p-4 text-sm text-slate-200">
          <p className="text-slate-400">Customer</p>
          <p className="mt-1">“I need help with my reservation — something doesn’t match what I booked.”</p>
        </div>
        <textarea
          className="min-h-[120px] w-full rounded-xl border border-white/10 bg-[#0B1426] p-3 text-sm focus:border-amber-500/50 focus:outline-none"
          placeholder="Your reply to the customer…"
        />
        <p className="text-xs text-slate-500">Sentiment gauge and AHT timer would appear here in Roll stage.</p>
      </div>
      <div className="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-[#0B1426] p-4">
        <h3 className="font-semibold text-amber-400">Contact brief</h3>
        {loading && <p className="text-sm text-slate-500">Loading brief…</p>}
        {brief && (
          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Classification:</span> {brief.classification.category} (
              {(brief.classification.confidence * 100).toFixed(1)}%)
            </p>
            <p>
              <span className="text-slate-500">History:</span> {brief.priorContactSummary}
            </p>
            <p>
              <span className="text-slate-500">Policy:</span> {brief.applicablePolicy.policyName}
            </p>
            <ul className="list-inside list-disc text-xs text-slate-400">
              {brief.applicablePolicy.keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-100">
              <span className="text-xs font-semibold text-amber-400">Suggested opening</span>
              <p className="mt-1 text-sm">{brief.suggestedOpening}</p>
            </div>
          </div>
        )}
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Policy lookup</p>
          <div className="mt-2 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-[#0F2B5B]/50 px-2 py-1 text-sm"
              placeholder="e.g. compensation for 3-hour delay?"
            />
            <button type="button" onClick={lookup} className="rounded-lg bg-sky-600 px-3 py-1 text-sm text-white">
              Ask
            </button>
          </div>
          {answer && <p className="mt-2 text-sm text-slate-300">{answer}</p>}
        </div>
      </div>
    </div>
  );
}
