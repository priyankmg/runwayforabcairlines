# Runway — Expert Onboarding & Journey Platform

**ABC Airlines · Product Specification v2.0**

> From hired to cleared for takeoff — the expert journey, reimagined.

---

## The Problem

ABC Airlines loses ~50% of newly hired customer support experts before they handle a single customer contact — not because the wrong people are being hired, but because the onboarding experience fails to bridge the gap between offer acceptance and Day One confidence.

**Annual waste: $667K** in recruiting and training spend that produces zero capacity return.

| Failure point | Rate | Count | Cost |
|---|---|---|---|
| No-shows (Gate) | 5% | 8 | $24K |
| Training dropouts (Taxi) | 30% | 48 | $384K |
| Pre-contact quitters (Roll) | 15% | 24 | $192K |
| **Total** | **50%** | **80** | **$667K** |

---

## The Solution — The Runway Metaphor

An aircraft doesn't take off from a standing start. It accelerates through a structured sequence, building speed and confidence, until the moment of lift-off. Runway gives every new expert their own personal runway — AI-supported acceleration from hired to cleared for takeoff.

### The Five Stages

| Stage | Aviation phase | Period | Problem addressed |
|---|---|---|---|
| **Gate** | At the gate — committed, not yet moving | Offer sign → Day One | 5% no-show |
| **Pushback** | Leaving the gate — first movement | Day One → End of Week One | Day One confusion |
| **Taxi** | On the taxiway — building speed | Training Weeks 1–4 | 30% training dropout |
| **Roll** | Accelerating down the runway | Supervised contacts 1–10 | 15% pre-contact attrition |
| **Takeoff** | Lift-off | First independent contact+ | Full productivity |

---

## ABC Airlines Profile

- **HQ:** Portland, Oregon — regional carrier serving domestic US tier-2/below cities
- **Fleet:** ~80 regional jets (50–100 seats), ~250 daily flights, 80% load factor
- **Passengers:** ~5.5 million/year · **Revenue:** ~$500M
- **Contact center:** ~1.8 million annual contacts, 21-hour coverage window (2am–11pm PST)
- **Frontline agents:** ~180, supporting 7-day coverage with 9% absence buffer

---

## AI Agent Stack

| Agent | Stage active | Purpose |
|---|---|---|
| **Onboarding Assistant** | Gate + Pushback | Daily greeting, task guidance, HR routing |
| **Simulation Engine** | Taxi | Plays customer across 3 contact types × 3 difficulty levels |
| **Error Pattern Agent** | Taxi (continuous) | Coaching cards for recurring mistakes |
| **Readiness Classifier** | Taxi → Roll transition | Readiness score (0–100), ready threshold: 75 |
| **Live Contact Assistant** | Roll | Real-time context, policy, suggested opening within 30s |
| **Retention Risk Classifier** | Always on | 7–10 day attrition warning for managers |

All agents use `claude-sonnet-4-20250514` via the Anthropic SDK. All agent actions are logged to the governance store. Deterministic mock fallbacks run when `ANTHROPIC_API_KEY` is absent.

---

## Page Map

| Path | Description | Priority |
|---|---|---|
| `/` | Expert Dashboard — AI morning greeting, milestone timeline, My Help Network, RunwayTracker, shadow progress | ★★★ |
| `/runway` | Full runway view — interactive phase strip, 5 stages | ★★ |
| `/missions` | Mission Center — maze-style path, 9 missions across 3 contact types × 3 levels | ★★★ |
| `/missions/[id]` | Live simulation — split-screen customer chat + AI assistant panel | ★★★ |
| `/contacts` | Live contact queue (Roll stage) — co-pilot indicator, performance tracker | ★★ |
| `/contacts/[id]` | Live contact interface — identical to simulation, with sentiment gauge | ★★★ |
| `/badges` | Badge collection — 12 badges with icons and earn/reward detail | ★ |
| `/cohort` | Cohort view — peer progress without individual rank | ★ |
| `/manager` | Training Manager Dashboard — at-risk panel, AI daily narratives, 3-state trajectory | ★★ |
| `/mentor` | Mentor view — mentee cards, AI daily summaries, open questions, coaching cards | ★★ |
| `/admin/metrics` | Platform metrics — A/B test live view, adoption funnel, attrition vs baseline | ★★ |

---

## A/B Test Design

New hires are assigned alternately as requisitions open (~6–7/month).

- **Group A:** Runway platform
- **Group B:** Current process (control)

| Month | Signal available |
|---|---|
| 3 | First no-show rate signal |
| 6 | Meaningful training dropout comparison |
| 8 | Pre-contact attrition signal |
| 12 | Strong signal across all three failure points |
| 14–16 | Full experiment complete, 90-day retention on early cohorts |

**Early stopping trigger:** If Group A shows >20 percentage points lower attrition by month 6, route all offers to Runway.

---

## Local Development

### Prerequisites

- Node.js 18+
- An Anthropic API key (optional — app runs fully with mock fallbacks)
- A Neon Postgres database URL (optional — governance log falls back to in-memory)

### Setup

```bash
git clone https://github.com/your-org/runwayforabcairlines.git
cd runwayforabcairlines
npm install
cp .env.example .env.local
# Edit .env.local with your ANTHROPIC_API_KEY and DATABASE_URL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | No | Claude API access. App uses mock AI if absent. |
| `DATABASE_URL` | No | Neon Postgres. Governance log is in-memory if absent. |

---

## Tech Stack

| Technology | Role |
|---|---|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety throughout |
| Tailwind CSS | Design system |
| Framer Motion | Animations (aircraft, badges, phase strip) |
| Lucide React | Icons (missions, badges, UI) |
| Recharts | Charts (metrics page, A/B test view) |
| Anthropic Claude | AI agents (`claude-sonnet-4-20250514`) |
| Neon Postgres | Governance audit log (optional) |
| Vercel | Deployment target |

---

## Project Structure

```
src/
  app/
    page.tsx                    ← Expert Dashboard
    runway/page.tsx             ← Full runway view
    missions/page.tsx           ← Mission Center (maze path)
    missions/[id]/page.tsx      ← Live simulation
    contacts/page.tsx + [id]/   ← Contact queue and live interface
    badges/page.tsx             ← Badge collection
    cohort/page.tsx             ← Peer cohort
    manager/page.tsx            ← Training Manager dashboard
    mentor/page.tsx             ← Mentor view
    admin/metrics/page.tsx      ← Platform metrics + A/B test
    api/                        ← All API routes
  agents/
    onboarding-assistant.ts
    simulation-engine.ts
    error-pattern-agent.ts
    readiness-classifier.ts
    live-contact-assistant.ts
    retention-risk-classifier.ts
  services/
    runway-engine.ts            ← Stage progression, readiness
    badge-service.ts            ← Badge unlock logic
    governance-store.ts         ← Audit log
  data/
    mock/
      experts.ts                ← Jordan Lee + 11 cohort peers
      missions.ts               ← 9 simulation scenarios
      contacts.ts               ← Simulated live contact queue
      badges.ts                 ← 12-badge library
      policies.ts               ← ABC Airlines policy documents
      customers.ts              ← Mock customer profiles
      company.ts                ← ABC profile, HR contacts, attrition data
      ab-test.ts                ← A/B test Group A / Group B data
      shadow-sessions.ts        ← Shadow and reverse-shadow session tracking
      mentor.ts                 ← Mentor assignment and AI summaries
    types/
      expert.ts + mission.ts + contact.ts + badge.ts + agents.ts
  components/
    dashboard/
      MorningGreeting.tsx       ← AI daily greeting (spec format)
      MilestoneTimeline.tsx     ← Visual stage progress timeline
      MyHelpNetwork.tsx         ← HR contacts with messaging
      ShadowProgress.tsx        ← Shadow/reverse-shadow tracker
    runway/
      RunwayTracker.tsx
      RunwayPhaseStrip.tsx
    missions/
      MissionRunwayPath.tsx     ← Visual maze mission layout
      MissionSimulation.tsx
    badges/
      BadgeMedal.tsx
    simulation/
      LiveContactView.tsx
    layout/
      AppShell.tsx
      Sidebar.tsx
```

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Navy | `#0F2B5B` | Primary background, cards |
| Dark bg | `#0B1426` | Page background, night runway |
| Amber | `#F59E0B` | Runway lights, current stage, CTAs |
| Sky blue | `#0EA5E9` | Links, icons, Group A |
| Success | `#10B981` | Completed stages, passed missions |
| At-risk | `#EF4444` | HIGH risk alerts |
| Font | Inter (Google Fonts) | All text |

---

## Key Design Principles

1. **Progress is earned, not given.** Every stage advancement requires demonstrated competency.
2. **Marcus sees who is at risk before they quit.** The Retention Risk Classifier gives a 7-day warning window that doesn't exist today.
3. **Training is flying simulations, not reading policy documents.** The Simulation Engine is the primary training vehicle.
4. **The AI is co-piloting, not doing the work.** Jordan handles each contact; the assistant surfaces context, policy, and suggestions she can adopt or ignore.
5. **No one quits without a warning signal.** Pulse confidence, login frequency, simulation engagement, and error pattern stagnation all feed the risk model continuously.
