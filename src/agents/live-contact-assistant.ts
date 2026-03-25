import { completeJson } from "@/lib/anthropic-client";
import { logGovernance } from "@/services/governance-store";
import type { ContactBrief } from "@/data/types/agents";
import { CUSTOMERS } from "@/data/mock/customers";
import { CONTACT_QUEUE } from "@/data/mock/contacts";
import { POLICY_SNIPPETS } from "@/data/mock/policies";

export async function runContactBrief(contactId: string, categoryHint?: string): Promise<ContactBrief> {
  const queued = CONTACT_QUEUE.find((q) => q.id === contactId);
  const customer =
    CUSTOMERS.find((c) => c.id === queued?.customerId) ?? CUSTOMERS[0]!;
  const category = categoryHint ?? queued?.category ?? "Reservations";

  try {
    const brief = await completeJson<ContactBrief>(
      `Return ONLY JSON ContactBrief: contactId, customerName, priorContactSummary, classification {category, confidence 0-1}, applicablePolicy {policyName, keyPoints[], compensation string}, suggestedOpening, escalationFlag, escalationReason string|null.`,
      `contactId=${contactId}, category=${category}, customer=${JSON.stringify(customer)}`
    );
    await logGovernance({
      agent: "Live Contact Assistant",
      inputSummary: contactId,
      outputSummary: brief.suggestedOpening.slice(0, 100),
      confidence: 0.77,
    });
    return brief;
  } catch {
    const brief: ContactBrief = {
      contactId,
      customerName: customer.name,
      priorContactSummary: customer.priorContactsSummary,
      classification: { category, confidence: 0.86 },
      applicablePolicy: {
        policyName: "change-fee",
        keyPoints: POLICY_SNIPPETS["change-fee"].split("; "),
        compensation: "N/A unless IRROPS",
      },
      suggestedOpening: `Hi ${customer.name.split(" ")[0]}, thanks for reaching ABC—I'm reviewing your reservation now and will have options for you in a moment.`,
      escalationFlag: false,
      escalationReason: null,
    };
    await logGovernance({
      agent: "Live Contact Assistant (fallback)",
      inputSummary: contactId,
      outputSummary: brief.suggestedOpening.slice(0, 100),
      confidence: 0.5,
    });
    return brief;
  }
}

export async function midContactAnswer(question: string, context: string): Promise<string> {
  const { completeChat, anthropicEnabled } = await import("@/lib/anthropic-client");
  if (anthropicEnabled()) {
    try {
      const text = await completeChat(
        "You are a policy copilot for ABC Airlines experts. Short answers with policy reference names. Under 100 words.",
        [{ role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` }]
      );
      await logGovernance({
        agent: "Live Contact Assistant / mid-contact",
        inputSummary: question.slice(0, 120),
        outputSummary: text.slice(0, 120),
        confidence: 0.75,
      });
      return text;
    } catch {
      /* fall through */
    }
  }
  const text =
    "Per delay-comp policy: delays 3+ hours may qualify for meal vouchers and rebook priority; confirm reason code in ops system before quoting hotel eligibility.";
  await logGovernance({
    agent: "Live Contact Assistant / mid-contact (fallback)",
    inputSummary: question.slice(0, 120),
    outputSummary: text.slice(0, 120),
    confidence: 0.4,
  });
  return text;
}
