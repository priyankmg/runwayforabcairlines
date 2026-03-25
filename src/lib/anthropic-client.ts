import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

export function anthropicEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function completeJson<T>(system: string, user: string): Promise<T> {
  if (!anthropicEnabled()) {
    throw new Error("NO_API_KEY");
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system,
    messages: [{ role: "user", content: user }],
  });
  const text = res.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("No text in response");
  const raw = text.text.trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in response");
  return JSON.parse(jsonMatch[0]) as T;
}

export async function completeChat(system: string, messages: { role: "user" | "assistant"; content: string }[]): Promise<string> {
  if (!anthropicEnabled()) {
    throw new Error("NO_API_KEY");
  }
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });
  const text = res.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("No text in response");
  return text.text.trim();
}
