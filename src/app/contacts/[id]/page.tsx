import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTACT_QUEUE } from "@/data/mock/contacts";
import { LiveContactView } from "@/components/simulation/LiveContactView";

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CONTACT_QUEUE.find((x) => x.id === id);
  if (!c) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link href="/contacts" className="text-sm text-sky-400 hover:underline">
        ← Queue
      </Link>
      <LiveContactView contactId={c.id} customerName={c.customerName} />
    </div>
  );
}
