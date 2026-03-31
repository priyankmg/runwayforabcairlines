"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { HR_CONTACTS } from "@/data/mock/company";

export function MyHelpNetwork() {
  const [openContact, setOpenContact] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function sendMessage() {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  }

  const contact = HR_CONTACTS.find((c) => c.id === openContact);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="mb-4 text-sm font-semibold text-white">My help network</h2>
      <div className="space-y-2">
        {HR_CONTACTS.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-[#0F2B5B]/30 px-3 py-2.5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F2B5B] text-xs font-bold text-sky-300 ring-1 ring-sky-500/30">
                {c.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{c.name}</p>
                <p className="text-xs text-slate-500">{c.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setOpenContact(c.id); setSent(false); }}
              className="rounded-lg bg-sky-600/20 px-3 py-1.5 text-xs font-medium text-sky-300 ring-1 ring-sky-500/30 hover:bg-sky-600/30"
            >
              <MessageSquare className="inline h-3.5 w-3.5 mr-1" />
              Message
            </button>
          </div>
        ))}
      </div>

      {openContact && contact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0F2B5B] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-medium text-white">{contact.name}</p>
                <p className="text-xs text-slate-400">{contact.role}</p>
              </div>
              <button type="button" onClick={() => setOpenContact(null)} className="rounded p-1 hover:bg-white/10">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <div className="px-4 py-5">
              {sent ? (
                <p className="text-center text-sm text-emerald-300">✓ Message sent to {contact.name}</p>
              ) : (
                <>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={`Message ${contact.name}…`}
                    className="w-full rounded-xl border border-white/10 bg-[#0B1426] p-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-[#0B1426]"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
