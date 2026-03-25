# Runway — ABC Airlines Expert Onboarding & Journey Platform

**Tagline:** From hired to cleared for takeoff — the expert journey, reimagined.

Runway is a prototype of a modern expert onboarding product: one continuous experience from offer signature through the first independent customer contact, with **AI embedded at each stage** and **progression mechanics** inspired by games. It targets ABC Airlines’ problem of losing roughly **half** of new customer-support experts before they handle a live contact—especially during training (~30%), in the pre-contact gap (~15%), and as no-shows (~5%).

This repository implements the **Product Specification v1.0** (RunwayExpert / Cursor Build Guide): Next.js 15, TypeScript, Tailwind CSS, optional **Anthropic Claude** (`claude-sonnet-4-20250514` by default), optional **Neon Postgres** for governance logging, deployable to **Vercel**.

---

## Product vision (from spec)

- **Insight:** Onboarding fails when it is treated as information transfer; it succeeds when it builds **trust** (role clarity, capability, organizational support).
- **Metaphor:** An aircraft accelerates down a runway; each hire gets a personal runway from **Gate** → **Pushback** → **Taxi** → **Roll** → **Takeoff** (first independent contact).

### Five stages (summary)

| Stage      | Meaning                         | Supporting AI (spec)   |
|-----------|----------------------------------|-------------------------|
| **Gate** | Offer → day one pre-boarding     | Onboarding Assistant    |
| **Pushback** | Day one → week one           | Error Pattern Agent     |
| **Taxi** | Training (simulation missions) | Readiness Classifier + Simulation Engine |
| **Roll** | Supervised contacts 1–10       | Live Contact Assistant  |
| **Takeoff** | Independent + ongoing       | Retention Risk Classifier |

---

## Design language

- **Primary:** Deep navy `#0F2B5B`
- **Accent (runway lights):** Amber `#F59E0B`
- **Secondary sky:** `#0EA5E9`
- **Dark background:** `#0B1426`
- **Success / danger:** `#10B981` / `#EF4444`
- **Font:** Inter (Google Fonts)

Hero UI: **horizontal runway tracker** with stage cards and animated aircraft position (Framer Motion).

---

## Local development

```bash
npm install
cp .env.example .env.local   # optional: add keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Without `ANTHROPIC_API_KEY`, agents and the simulation **customer** use **deterministic fallbacks** so the UI and APIs still work.
- With `ANTHROPIC_API_KEY`, onboarding chat, simulation dialogue, debrief, readiness, error-pattern, contact brief, and retention refresh use Claude.
- With `DATABASE_URL` (Neon), governance actions are appended to table `runway_governance_log` (created automatically on first write). Without it, logs stay **in-memory** on the server.

```bash
npm run build
npm start
```

---

## App map (screens)

| Route | Purpose |
|-------|---------|
| `/` | Jordan’s dashboard — runway tracker, today’s mission, badges, buddy card |
| `/runway` | Expanded runway + cohort timing context |
| `/missions` | Mission center — 9 scenarios, unlock states |
| `/missions/[id]` | Live simulation — chat + assistant panel |
| `/contacts` | Roll-stage queue (mock) |
| `/contacts/[id]` | Live contact — brief + mid-contact policy lookup |
| `/badges` | Full badge library (earned vs locked) |
| `/cohort` | Cohort cards — distribution, no rankings |
| `/manager` | Manager roster + at-risk panel (HIGH = red border) |
| `/manager/experts/[id]` | Expert profile + on-demand Readiness / Error Pattern |
| `/admin/metrics` | Adoption funnel, attrition vs baseline, agent effectiveness |

Floating **Onboarding Assistant** (bottom-right) calls `POST /api/assistant/chat`.

---

## API route map (spec §7)

**Experts**

- `GET /api/experts/:id` — profile  
- `GET /api/experts/:id/runway` — runway progress  
- `GET /api/experts/:id/badges` — earned + locked  
- `POST /api/experts/:id/pulse` — pulse payload (logged)

**Missions & simulation**

- `GET /api/missions?expertId=` — missions with unlock/completion  
- `GET /api/missions/:id` — single mission  
- `POST /api/simulation/start` — `{ missionId, expertId }`  
- `POST /api/simulation/respond` — `{ sessionId, message }`  
- `POST /api/simulation/complete` — debrief JSON  

**Agents & assistant**

- `POST /api/assistant/chat` — onboarding  
- `POST /api/assistant/mid-contact` — policy Q&A during contact  
- `POST /api/agents/contact-brief`  
- `POST /api/agents/error-pattern`  
- `POST /api/agents/readiness`  
- `GET /api/agents/retention-risk`  
- `GET /api/agents/retention-risk/:id`  

**Manager**

- `GET /api/manager/cohort`  
- `GET /api/manager/alerts`  
- `GET /api/manager/pulse`  
- `POST /api/manager/advance/:id` — mock acknowledgment  

**Governance**

- `POST /api/governance/log`  
- `GET /api/governance/log?limit=`  

---

## Mock data (spec §9)

- **Primary expert:** Jordan Lee (`expert-jordan-001`) — Taxi stage, 5/9 missions, sample badges and readiness **68**.  
- **Cohort:** 12 experts across stages (Gate through Takeoff).  
- **Missions:** RES-L1–L3, BILL-L1–L3, COMP-L1–L3 with personas, problems, resolutions, and mistakes.  
- **Badges:** 12 aviation-themed milestones (Gate Cleared through Mentor Wings).

Unlock rules follow the spec’s **level chain** (L2 after L1 of same type, L3 after L2); Taxi+ required to start missions.

---

## Project structure (aligned with spec §8)

Key paths:

- `src/app/` — App Router pages + `api/` routes  
- `src/agents/` — assistant, simulation session + engine, error pattern, readiness, live contact, retention  
- `src/services/` — `runway-engine`, `badge-service`, `governance-store`  
- `src/data/mock/` — experts, missions, badges, contacts, policies, customers  
- `src/data/types/` — shared TypeScript types  
- `src/components/` — layout, runway tracker, chat, simulation UI  

---

## Demo narrative (spec §12)

1. **Dashboard** — “Not a training portal — a runway.”  
2. **Mission center** — Simulations, not policy PDFs; locked harder missions until earned.  
3. **Live simulation** — AI co-pilots; expert owns the contact.  
4. **Manager** — Intervene before quit; retention signals surface early.  
5. **Metrics** — Funnel and agent effectiveness show measurement by design.

---

## License

See [LICENSE](./LICENSE) in this repository.
