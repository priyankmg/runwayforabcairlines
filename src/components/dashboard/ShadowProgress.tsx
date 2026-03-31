import { CheckCircle, Circle, Clock } from "lucide-react";
import { SHADOW_SESSIONS, type ShadowSession } from "@/data/mock/shadow-sessions";

const CONTACT_TYPES = ["Reservations", "Billing", "Complaints"] as const;

function statusIcon(status: ShadowSession["status"]) {
  if (status === "complete") return <CheckCircle className="h-4 w-4 text-emerald-400" />;
  if (status === "in-progress") return <Clock className="h-4 w-4 text-amber-400" />;
  return <Circle className="h-4 w-4 text-slate-600" />;
}

function statusLabel(status: ShadowSession["status"]) {
  if (status === "complete") return "text-emerald-400";
  if (status === "in-progress") return "text-amber-300";
  return "text-slate-500";
}

export function ShadowProgress({ expertId }: { expertId: string }) {
  const sessions = SHADOW_SESSIONS.filter((s) => s.expertId === expertId);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h2 className="mb-4 text-sm font-semibold text-white">Shadow & reverse-shadow progress</h2>
      <div className="space-y-3">
        {CONTACT_TYPES.map((ct) => {
          const shadow = sessions.find((s) => s.contactType === ct && s.phase === "shadow");
          const reverse = sessions.find((s) => s.contactType === ct && s.phase === "reverse-shadow");
          return (
            <div key={ct} className="rounded-xl border border-white/8 bg-[#0F2B5B]/20 px-4 py-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{ct}</p>
              <div className="flex gap-6">
                {[{ label: "Shadow", s: shadow }, { label: "Reverse shadow", s: reverse }].map(({ label, s }) => (
                  <div key={label} className="flex items-center gap-2">
                    {statusIcon(s?.status ?? "upcoming")}
                    <span className={`text-xs ${statusLabel(s?.status ?? "upcoming")}`}>{label}</span>
                    {s?.questionnairePassed === false && (
                      <span className="rounded bg-red-500/20 px-1 text-[10px] text-red-300">retry</span>
                    )}
                  </div>
                ))}
              </div>
              {reverse?.openQuestions && reverse.openQuestions.length > 0 && (
                <p className="mt-2 text-[11px] italic text-amber-200/80">
                  Open: &ldquo;{reverse.openQuestions[0]}&rdquo;
                </p>
              )}
              {shadow?.openQuestions && shadow.openQuestions.length > 0 && (
                <p className="mt-2 text-[11px] italic text-amber-200/80">
                  Open: &ldquo;{shadow.openQuestions[0]}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
