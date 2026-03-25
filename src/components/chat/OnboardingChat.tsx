"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import type { Message } from "@/data/types/agents";
import { JORDAN_ID } from "@/data/mock/experts";

export function OnboardingChat({ stage }: { stage: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi — I'm your Onboarding Assistant. Ask me about Runway, day one, or missions." },
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          expertId: JORDAN_ID,
          stage,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessages((m) => [...m, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-[#0B1426] shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
        aria-label="Open onboarding assistant"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[min(420px,70vh)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B5B] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-medium text-white">Onboarding Assistant</span>
            <button type="button" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 ${
                  m.role === "user" ? "ml-6 bg-sky-600/30 text-slate-100" : "mr-4 bg-black/20 text-slate-200"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-slate-400">Thinking…</div>}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-3">
            <input
              className="flex-1 rounded-lg border border-white/10 bg-[#0B1426] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-[#0B1426] disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
