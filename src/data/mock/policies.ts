export const POLICY_SNIPPETS: Record<string, string> = {
  "change-fee": "Domestic changes: fee per fare class; waivers only during IRROPS or documented medical.",
  "refund-credit": "Non-refundable fares: credit shell valid 12 months; cash refund only if airline-initiated cancel.",
  "delay-comp": "Delays 3+ hours: meal vouchers + rebook priority; hotel if overnight and eligible.",
  "baggage-fee": "Bag fees per published tariff; elite and corporate codes may waive per contract ID.",
  "escalation-discrimination": "Any perceived discrimination: document, no debate on intent, immediate duty manager.",
  "social-threat": "Social media escalation threats: de-escalate, log, transfer to Social Response within 5 minutes.",
};

export const POLICY_LIST = Object.entries(POLICY_SNIPPETS).map(([key, body]) => ({
  policyName: key.replace(/-/g, " "),
  keyPoints: body.split("; ").map((s) => s.trim()),
}));
