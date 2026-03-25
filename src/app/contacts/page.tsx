import Link from "next/link";
import { CONTACT_QUEUE } from "@/data/mock/contacts";

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Live contact queue</h1>
        <p className="mt-1 text-slate-400">Roll stage — co-pilot model (simulated queue).</p>
      </div>
      <ul className="space-y-3">
        {CONTACT_QUEUE.map((c) => (
          <li key={c.id}>
            <Link
              href={`/contacts/${c.id}`}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0F2B5B]/30 px-4 py-3 transition hover:border-amber-500/40"
            >
              <div>
                <p className="font-medium text-white">{c.customerName}</p>
                <p className="text-xs text-slate-500">
                  {c.category} · wait {c.waitSeconds}s · co-pilot: {c.coPilotName}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">Co-pilot</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
