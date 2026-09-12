# WW-SESSION-HANDOFF-2026-08-27 — Career-First Site Redesign

## Context

This handoff picks up from the standing decision that every page on the
site should lead the visitor toward the career they want, not just
describe the platform. Two concrete pieces of that decision already exist
and are load-bearing for everything below:

**CTA split rule.** Any CTA phrased as discovery/planning/matching ("Plan
Your Pathway", "Find Your Fit") must route to an intake conversation — a
guided Maya/ROV Q&A that maps interests to a programme and career track.
Any CTA phrased as doing ("Create", "Build", "Try It") routes to the
sandbox. These are two different intentions and must never share a route.
This bug is already confirmed on G-Tech Casters ("Plan Your Media
Pathway" was routing to the sandbox instead of an intake flow) — treat
that as one instance of a pattern, not an isolated fix.

**Hero argument.** Homepage copy direction already agreed: "Looking for a
steady rising income? Our free ILP starts with what you know and takes
you where you want your earnings to go." CTA = "See the pathway" (→ ILP
milestone page) / "Start free" (→ Bright Sparks). This is the
headline-and-proof pairing: the headline creates the want, the ILP
milestone structure is the evidence that backs it up.

Standing rule carried over from this project's own process fixes: check
the actual file before stating what exists. This project has repeatedly
found that a component assumed built (or assumed connected) was actually
a 2-line stub, an orphaned duplicate, or never wired at all. Nothing below
should be marked done without having actually opened the file.

## Priority 0 — Blocking verification (do this before anything else)

**Does the ILP milestone/earnings pathway page exist as a real, routed,
public page?**

This is unconfirmed, not confirmed-absent. Two independent notes on this
project flag it as an open question, neither ever resolved:

- A June 2026 session asked directly "does the ILP earnings pathway have
  a public-facing page yet?" and the session ended before it was
  answered.
- Platform-frontend notes independently state: "ILP has no confirmed
  dedicated frontend surface despite deep backend schema — flagged as
  needing direct verification."

There is also a different, adjacent page on record —
`LearningPathwaysPage.tsx` — which is about programme progression
(beginner → creator → leader), not the ILP earnings-milestone structure
specifically. Do not conflate the two without checking: they may be the
same page under an old name, two overlapping pages, or two genuinely
different things.

**Checklist:**

- [ ] `grep -r "ILP" src/pages/` and `find src/pages -iname "*pathway*"` —
      list every candidate file
- [ ] For each candidate, open it and confirm: does it render
      milestone-by-milestone earning increments, or programme progression
      tiers, or neither?
- [ ] Confirm the route is actually registered in `App.tsx` and not
      404ing (this project has a confirmed history of routes existing in
      code but never being wired, e.g. the ghost-router incident)
- [ ] Confirm it pulls from real ILP backend data
      (`ILPService`/`transformationStore`) rather than static/mock
      milestone copy
- [ ] Record the finding in this doc's Findings Log below, and update
      `ww-platform-frontend-equivalent` tracking so this stops being
      re-asked in future sessions

If it does not exist: building it is the actual highest-leverage task on
this whole redesign — the homepage hero CTA, the About page, and every
programme page's career framing all want to point here. Nothing
downstream should ship pointing at a CTA with no destination.

If it exists but is orphaned/unwired: wiring it in is a much smaller job
than building it from scratch, and becomes Priority 1 instead of Priority
0.

## Priority 1 — Sitewide CTA audit

Before writing any new copy, confirm the actual scope of the routing bug
pattern:

- [ ] For every programme page, extract: primary CTA text, its
      route/onClick target, and whether that target is a sandbox or an
      intake flow
- [ ] Flag every mismatch (discovery-phrased CTA → sandbox route)
- [ ] For every `DraggableMaya`/ROV embed on a programme page, confirm
      `pageContext` is actually passed (confirmed missing on G-Tech
      Casters — check whether this is a one-off or a copy-paste gap
      repeated across pages)
- [ ] Output a table: programme | CTA text | current route | correct
      route | ROV context present (Y/N) — this table is the actual
      worklist for Priority 2

**Do not fix anything in this pass. Audit only, log findings below.**

## Priority 2 — Page-by-page changes

Apply only after Priority 0 and Priority 1 are closed, using the audit
table to drive real fixes rather than guessing which pages need it.

**Homepage**
- Hero copy → the ILP framing above, once "See the pathway" has a
  confirmed destination
- Confirm "Start free" routes to Bright Sparks, not signup-first

**Bright Sparks**
- Confirm its Maya integration is the deliberate "intentional
  Maya-direct, not a Child" routing (already decided) — do not
  accidentally wire it to a Child ROV during this pass
- Its taster task should end in an actual routing decision to a
  programme, not just a completion state

**Every programme page**
- Apply the CTA split fix per the Priority 1 audit table
- Wire correct `pageContext` per programme (mapping already exists in the
  curator/ Child roster: G-Tech Casters → Kumi, Roots → Esi, etc. — do
  not invent new mappings, use what's already on record)
- Add or surface a concrete "this leads to these careers" section — check
  whether `careerPaths.ts` (or equivalent) from earlier design work still
  exists in the codebase before writing this from scratch

**ILP / pathway page**
- Build or repair per Priority 0 findings

**Cyberstore / Shop**
- Lower priority, but note for later: reframe toward proof-of-career
  (real creator earnings, provenance panels) tied back to the pathway
  page. Do not start this until the four existing fragmented Cyberstore
  implementations (production-hub wizard / studio storefront /
  creatorJourney adapter / CommunityShopPage) are reconciled — see prior
  tracking on that, unrelated to this redesign and should not be
  conflated with it

**About Us / nav**
- Lowest priority for this pass. Nav should offer a persistent "Find your
  pathway" entry point rather than a buried dropdown item, once the
  destination page is confirmed real

## Findings Log

*(Claude Code: append findings here as you go, dated, same pattern as
prior session-handoff docs on this project — this is the current source
of truth for this thread, more current than any chat-side memory once
work starts.)*

### 28 Aug 2026 — Priority 0: ILP milestone/earnings pathway page

**Answer: neither "exists" nor "confirmed-absent" — the concept is real
but fragmented across four unconnected files, none of which is
simultaneously public, ILP-branded, and backend-connected. Treat as a
repurpose-and-connect job on the strongest candidate, not a from-scratch
build and not a simple wiring fix.**

Checked every candidate directly, per the checklist:

- **`src/pages/WhatYouBuildPage.tsx`** — the one file that actually names
  "The Individual Learning Plan" and describes it in the hero-copy voice
  ("The ILP is maintained by Maya... exports as a document you can take
  anywhere"). **Confirmed orphaned**: zero matches for `WhatYouBuildPage`
  anywhere in `App.tsx`'s route table, and zero imports of it anywhere
  else in `src/`. Not reachable by any URL today.
- **`/creators-journal`** (`src/pages/creators-journal/CreatorsJournalPage.tsx`)
  — real, routed (`App.tsx:459-460`), and `WhatYouBuildPage.tsx` itself
  links here as "View your ILP." But it imports `useAuth` and reads
  `user` directly (`CreatorsJournalPage.tsx:16,519`) — **gated behind
  login**. Can't serve as the public hero-CTA destination the redesign
  needs ("See the pathway" has to work for a visitor who hasn't signed up
  yet). Content sampled also reads as static narrative example ("Marcus
  Joins STEMgeneers," "Week 9: Featured on Rayd-yo") rather than a live
  personal milestone dashboard — not fully audited beyond that sample.
- **`/creator-pathways` and `/journey-map`** (`src/pages/CreatorPathwaysPage.tsx`,
  799 lines) — **routed** (`App.tsx:439-440`), **no auth gate found**,
  and structurally the closest real match to "milestone-by-milestone
  earning increments": has `EARNING_PHASES`, `PROGRAMME_EARNINGS`,
  `PHASE_DATA`, tabs for phases/programmes/combinations, copy like "Find
  your earning path," "Year 1 shows nothing — that is honest, it's
  learning time," and "What the Work Paid — real earnings from real
  creators, published monthly in Joystick." **But**: the word "ILP" does
  not appear anywhere in this file, and every data array
  (`EARNING_PHASES`, `PROGRAMME_EARNINGS`, `PHASE_DATA`, `COMBINATIONS`,
  `STORIES`) is a hardcoded literal in the file — no store or service
  import of any kind. Static/mock milestone copy, not live backend data,
  per the checklist's own test.
- **`src/components/earnings/EarningsInstrument.tsx`** — its own type
  file (`src/types/earningsInstrument.ts`) states in its header comment
  that "the instrument reads actual ILP data" — **checked directly, this
  is not true**: the component has no store or service import at all.
  Its one live consumer, `src/pages/panel/PanelStoryPage.tsx:634-636`
  (routed at `/panel/story`), seeds it with a single hardcoded stream
  (`activeStreams: ['repair-services']`), not user-specific data.
- **`ILPService`** — does not exist anywhere in the repo (checked by
  filename search, zero hits).
- **`transformationStore.ts`** (`src/stores/transformationStore.ts`) —
  the checklist itself named this as a candidate ILP backend. **Checked
  directly: it is not.** Its own header comments and types
  (`TransformationStage`: Seeking Help → Building Solution → Solution
  Deployed → Teaching Others) show it's a community-problem-solving
  journey tracker (Impact-Labs-adjacent), an entirely different domain
  from ILP earnings milestones. Flagging precisely so this isn't
  re-guessed as the ILP backend in a future session.
- **`LearningPathwaysPage.tsx`** — the file this handoff doc names as "a
  different, adjacent page on record" for programme-progression tiers —
  **does not exist anywhere in this repo** (filename search, zero hits).
  Another instance of a file referenced as if real that isn't; nothing to
  conflate it with because it isn't there to conflate.
- **`ww-platform-frontend-equivalent`** tracking file, which this
  checklist asks to be updated — **also does not exist anywhere in the
  repo**. This Findings Log entry is the update; there is no other file
  to write it into.

### 28 Aug 2026 — Priority 1: Sitewide CTA audit

**Two claims in this doc's own Context section turn out to be wrong once
checked directly — correcting rather than silently repeating them:**

1. G-Tech Casters' "Plan Your Media Pathway" does **not** route to the
   sandbox. It routes to `/pathways/gtechcasters/planner`
   (`gtechcasters/index.tsx:27`), which **is not registered anywhere in
   `App.tsx`** — it 404s. The CTA-split bug is real (a discovery-phrased
   CTA has no working intake destination) but the failure mode named in
   this doc's Context section is wrong: it's a dead link, not a
   sandbox mis-route.
2. G-Tech Casters has **no `DraggableMaya`/ROV embed at all**, on either
   `gtechcasters/index.tsx` or `GTechCastersSandbox.tsx` (zero matches for
   `DraggableMaya`, `pageContext`, `Maya`, or `ROV` in either file). The
   "missing `pageContext`" bug this doc names doesn't exist on this page
   today. The real instance of that exact bug is on **Rayd-yo** (see
   table) — `DraggableMaya` is only present on 2 of the 14 programme
   pages sitewide (Silk Stilettos — wired correctly; Rayd-yo — context
   missing). It is not a copy-paste gap repeated across pages; it's
   mostly *absent*, not mis-wired.

**Audit table:**

| Programme | Live page file | CTA text | Current route/destination | Phrasing | Correct route type | Mismatch? | ROV context (Y/N) |
|---|---|---|---|---|---|---|---|
| Pageturners | `pageturners/PageturnersPage.tsx:187` | "Enter the Sandbox →" | `/programmes/pageturners/sandbox` (real) | Doing | Sandbox | N | N (no DraggableMaya) |
| STEMgeneers | `stemgeneers/index.tsx:59` | "Join a live session" | `/programmes/stemgeneers/session` (real) | Ambiguous (signup) | N/A | N/A | N |
| TECHreneurs | `techreneurs/index.tsx` | *(none — renders `TECHreneursSandbox` directly)* | `/programmes/techreneurs` IS the sandbox | N/A | N/A | **Structural** — no landing/discovery page exists | N |
| Silk Stilettos | `silk-stilettos/index.tsx:507,524` | "Open Full Sandbox →" / "Open Creative Sandbox" | `/programmes/silk-stilettos/sandbox` (real) | Doing | Sandbox | N | **Y** — `pageContext` passed correctly (`:242-246`) |
| Bright Sparks | `bright-sparks/index.tsx:86,749` | "See all earning paths →" / "Find your earning path →" | `/creator-pathways` (real, per Priority 0) | Discovery | Intake/matching-ish | Arguably correct in spirit, though not an intake Q&A | N |
| Auntie Anansi's Kitchen | via `ProgrammePageTemplate.tsx:67` | "Join Auntie Anansi's Kitchen" | `/enroll?programme=auntie-anansis-kitchen` (real) | Ambiguous (signup) | N/A | N/A | N |
| Scrap Cat | `scrap-cat/index.tsx` | *(none — renders `ScrapCatSandbox` directly)* | `/programmes/scrap-cat` IS the sandbox | N/A | N/A | **Structural**, same as TECHreneurs | N |
| Money Reset | `money-reset/MoneyResetPage.tsx:487,490` | "Find a session →" / "Start the excavation first" | `/sessions` (real) / `/get-started` (real) | Ambiguous | N/A | N/A | N |
| Easy Street | `easy-street/index.tsx:580,642` | "Coffee Mornings →" / "Learn About Membership" | `/programmes/coffee-morning` **(not registered — 404)** / `/membership` (real) | Neither discovery nor doing | N/A | **Broken link**, unrelated to the CTA-split pattern | N |
| Kaywana's Court | `kaywanas-court/KaywanasCourtPage.tsx:146` | "Try the Heritage Production Planner →" | `/programmes/kaywanas-court/sandbox` (real) | Doing | Sandbox | N | N |
| G-Tech Casters | `gtechcasters/index.tsx:27,30` | "Plan Your Media Pathway →" / "Tune in to Rayd-yo 📻" | `/pathways/gtechcasters/planner` **(404)** / `/pathways/rayd-yo` **(wrong slug, real route is `/pathways/raydyo` — 404)** | Discovery / N/A | Intake flow | **Y — both primary CTAs on this page are dead links** | N |
| Roots | `roots/RootsPage.tsx` | *(none)* | N/A — no `Link`/react-router-dom import anywhere in the file | N/A | N/A | **No primary CTA exists on this page at all** | N |
| Trubble n Bass | via `ProgrammePageTemplate.tsx:67` | "Join Trubble n Bass" | `/enroll?programme=trubble-n-bass` (real) | Ambiguous (signup) | N/A | N/A | N |
| Rayd-yo | `RaydyoPage.tsx` | No single primary hero CTA — many contextual links to other programmes | Various, all real routes | Mixed | N/A | N/A | **N — `DraggableMaya` present (`:1047`) but only `membershipTier` passed, no `pageContext`** — the real instance of the bug this doc attributed to G-Tech Casters |
| Joystick | `JoystickPage.tsx` | "Read" article links | `/joystick/:slug` (real) | N/A (magazine page, not a programme funnel) | N/A | N/A | N |

**Notes that don't fit the table:**

- **TECHreneurs and Scrap Cat have no separate discovery/landing page at
  all** — their `/programmes/X` route renders the sandbox component
  directly. The CTA-split rule can't be applied to them until a landing
  page exists to split from; this is a bigger structural gap than a
  routing mismatch and should be its own Priority 2 line item, not folded
  into "apply the CTA split fix."
- **The discovery→sandbox mismatch as literally described in this doc's
  Context section was not found on any of the 14 live pages.** The
  actual confirmed pattern is different: discovery-phrased CTAs on
  G-Tech Casters point to unregistered routes (two dead links on one
  page), and most programmes' primary CTAs are signup-phrased ("Join X")
  pointing at `/enroll` or `/get-started` — a third category this doc's
  two-way discovery/doing split doesn't account for.
- Auntie Anansi's Kitchen and Trubble n Bass share identical CTA behavior
  because both render through the same `ProgrammePageTemplate.tsx` — any
  fix to the "Join X" → `/enroll` pattern should be made once, in the
  shared template, not per-page.
- Roots having zero navigable CTAs should go directly into Priority 2
  planning — there's no page to apply a "CTA split fix" to without adding
  a CTA first.

**Priority 0 and Priority 1 are now both closed. Per this doc's own
gating instruction, Priority 2 should not start without a separate,
explicit go-ahead — this log is the report, not a green light.**

**Recommendation, not actioned without go-ahead**: `CreatorPathwaysPage.tsx`
at `/creator-pathways` is the right page to build on — it's public,
routed, and already has the right shape and tone. The actual work is (1)
explicitly framing/branding it as the ILP per the agreed hero copy, (2)
replacing its static arrays with real data once a real ILP backend exists
(none does yet — this itself may be the bigger gap, a backend question
not just a frontend one), and (3) deciding what happens to
`WhatYouBuildPage.tsx`'s orphaned ILP-explainer copy — fold it in here,
or route it in properly as a companion page. Not started; this is a
finding, not a fix, per this doc's own Priority 0/1 audit-only
instruction.

## Explicitly out of scope for this pass

- Cyberstore 4-way fragmentation (tracked separately, don't fix
  opportunistically mid-redesign)
- Nexus-gate tooling (Manuscript Analysis / Audio Quality-Check /
  Staging-Readiness ROVs) — unrelated, already tracked elsewhere
- Any accreditation/curator content work
