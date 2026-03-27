# Runway — ABC Airlines Expert Onboarding (Product Specification **v2.0**)

**Tagline:** From hired to cleared for takeoff — the expert journey, reimagined.

**Problem:** ~50% of new support experts leave before a first customer contact; ABC estimates **~$667K/year** in wasted recruiting and training on post-join attrition (v2 business case).

**Solution:** One platform from **offer acceptance** through **first independent contact**, with **AI at every stage**, clear milestones, human connections (mentor, supervisor, HR), and instrumentation for **leading / concurrent / lagging** metrics—including an **alternating A/B** rollout story.

**Stack:** Next.js 15, TypeScript, Tailwind CSS, Anthropic Claude (`claude-sonnet-4-20250514`), optional Neon Postgres, deployable on Vercel.

---

## Company context (prototype)

ABC is modeled as a **regional carrier** (Portland HQ, ~80 regional jets, ~250 daily flights, ~5.5M passengers/year, ~$500M revenue). Contact-center load and hiring math are summarized on **`/admin/metrics`** alongside funnel charts.

---

## Five stages (runway metaphor)

| Stage | Period | Risk addressed |
|--------|--------|----------------|
| **Gate** | Offer → Day One | No-shows |
| **Pushback** | Day One → end of week one | Day-one confusion |
| **Taxi** | Training weeks 1–4 | Training dropout |
| **Roll** | Supervised contacts 1–10 | Pre-contact quit |
| **Takeoff** | First independent contact+ | Full productivity |

Phase copy on **`/runway`** matches spec **§3** (including **Taxi — Training Weeks 1–4**).

---

## What’s in this repo (v2-aligned)

| Area | Implementation notes |
|------|----------------------|
| **Expert dashboard `/`** | Runway tracker, **daily briefing** (morning format), **My Help Network**, Monday **pulse** CTA, A/B group line, missions/badges/buddy |
| **Gate `/gate`** | Pre-boarding checklist, **Day One reporting** (site, report-to), **My Help Network** HR cards |
| **Runway `/runway`** | Interactive **five-card strip** + definitions + amber aircraft on selection; green/amber/gray by true progress |
| **Missions** | Game-style path toward Takeoff; nine simulations; unlock rules |
| **Simulation debrief** | **v2 schema**: `score.{accuracy, empathyLanguage, resolutionSpeed, policyCompliance}`, `overallGrade` **PASS/RETRY**, `whatWentWell`, `areasToImprove`, `policyReference`, `badgeEarned` |
| **Badges** | **Rewards** from spec §8 (gift cards, lunch, eligibility, etc.) |
| **Mentor `/mentor`** | Mentee card, **AI daily summary**, open questions, **contact-type** progress table, Error Pattern highlight |
| **Manager `/manager`** | Roster + **A/B** + **trajectory**; at-risk panel; expert profile **AI narrative** (mock) for selected IDs |
| **Metrics `/admin/metrics`** | **ABC snapshot**, funnel **Offer → … → Takeoff** (Group A vs B), **attrition** bars (baseline vs A vs B), leading-indicator table |
| **APIs** | Expert, runway, missions, simulation, assistant, agents, manager cohort (**abGroup**, **trajectory**), governance |

Agents log to **governance** (memory + optional Neon). Without `ANTHROPIC_API_KEY`, agents use **deterministic fallbacks**.

---

## Local setup

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

- **`ANTHROPIC_API_KEY`** — live Claude for chat, simulation, debrief, etc.  
- **`DATABASE_URL`** — Neon; creates `runway_governance_log` on first write.  
- **`ANTHROPIC_MODEL`** — defaults to spec model name.

```bash
npm run build && npm start
```

---

## API summary (spec §13)

`GET/POST` patterns under `src/app/api/` — experts, missions, simulation (`start` / `respond` / `complete`), `assistant/chat`, `assistant/mid-contact`, agents (`contact-brief`, `error-pattern`, `readiness`, `retention-risk`), manager cohort/advance, governance log.

---

## Rollout & ethics (spec §10)

**Alternating assignment** (Runway vs control), progressive measurement, **early stopping** if Runway shows a strong attrition gap, and commitment to **shorten the control arm** once signal is sufficient—reflected in metrics UI and README for stakeholder demos.

---

## Demo script (spec §14)

1. **Dashboard** — runway + briefing + help network.  
2. **Gate** — pre-boarding and HR paths.  
3. **Missions / simulation** — earned progression + v2 debrief.  
4. **Manager** — risk + narrative + trajectory.  
5. **Metrics** — funnel and A/B attrition story.

---

## License

See [LICENSE](./LICENSE).
