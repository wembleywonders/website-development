# WW-SPEC-CONTENT-ROTATION-ENGINE-001

**Content Rotation Engine — Joystick / Rayd-yo / Easy Street**

Filed 4 Sep 2026 (Claude Code, at CJ's direction). **Status: Draft, not
yet built.** No code exists for this yet; this document is the design of
record.

- **Depends on:** Layer 1 (below) must be verified complete before Layer 2
  work starts.
- **Standing discipline that applies throughout:** this project has a
  confirmed "provided ≠ saved" failure pattern (ghost schema fields,
  components delivered but never actually wired, claims of completion that
  didn't match a live grep). Every task below must be closed by direct
  verification against the live repo/database, not by generating the code
  and assuming it landed. See ww-platform-backend.md / ww-platform-frontend.md
  for prior instances of this exact failure.

---

## 0. Why this spec exists

A content rotation engine (automated Joystick spotlight / Rayd-yo story
scheduling, fed by real Skunkworks → Impact Lab → Cyberstore completions)
was designed in principle across several planning sessions. That design
assumed a single, trustworthy source of truth for "what's been certified"
and "what's actually listed and live." The current codebase does not have
that yet. Building the rotation engine directly on top of the current
fragmented state would not automate the content calendar — it would
automate whichever fragment happens to be wired to a given page, and
present that as authoritative. Layer 1 exists to make the assumption true
before Layer 2 relies on it.

---

## LAYER 1 — Source-of-truth consolidation (prerequisite, blocking)

### 1.1 Cyberstore: pick one canonical implementation

Four independent, disconnected implementations currently exist:

| # | File | Role | Status |
|---|---|---|---|
| 1 | `production-hub/CyberstoreListingWizard.tsx` (renamed from CyberstoreDock) | 5-step listing-creation wizard | Submission mocked via `setTimeout` |
| 2 | `studio/CyberstoreStorefront.tsx` (renamed from CyberstoreDock) | Storefront/browse, computes payouts via `REVENUE_MODELS` | `fetchProductsMock` explicitly TODO, returns empty array |
| 3 | `types/creatorJourney.ts` adapter + `creatorJourneyIntegration.ts` | Bridges creatorJourney schema (real seed data: `JUDITH_PRODUCTS` etc.) to `CartItem`/`Order` | Clean additive adapter, but no page imports it |
| 4 | `CommunityShopPage.tsx` + `data/cyberstoreData.ts` | The actually-routed shop page | "Add to basket" has no `onClick` handler; own 4th `CyberstoreProduct` type shape |

**Task:** Decide and document which of these is canonical going forward.
`creatorJourneyIntegration.ts`'s adapter pattern (additive-only, bridges
into existing `CartItem`/`Order` types without modifying originals) is the
strongest existing candidate for the underlying data contract;
`CommunityShopPage.tsx` is the strongest candidate for the actual routed
UI. Reconcile these two rather than starting a fifth implementation.

**Verification:** grep for all four `CyberstoreProduct` type definitions
post-consolidation; confirm only one remains in active use; confirm the
retained page's buy/checkout flow is functionally wired, not just visually
present.

### 1.2 Revenue split: single `RevenueSplitConfig`

Six confirmed hardcoded instances of the 55/25/20 split, found
independently:

1. `PaymentController` (backend)
2. `StoreListingServiceImpl` (backend)
3. `CreatorMetricsServiceImpl` (backend)
4. `production-hub/CyberstoreListingWizard.tsx` — `earn = price * 0.55` (frontend)
5. `creatorJourneyIntegration.ts` — `price * 0.25` for community contribution (frontend), plus a documented deliberate override where journey products always use 55/25/20 even though `CartItem` types them as `'service'` (which elsewhere defaults to 60/20/20 — confirm this override is intentional and preserve it, don't silently collapse it)
6. `CommunityShopPage.tsx` — static display text in the philosophy strip / provenance panel ("55% to maker")

**Task:** Build one canonical `RevenueSplitConfig` (backend, extending the
existing `src/blockchain/config/revenueModels.ts`
STANDARD/ATELIER_COMMISSION/ATELIER_AUCTION structure). Replace all six
instances with reads from this config. `studio/CyberstoreStorefront.tsx`'s
existing pattern (importing `REVENUE_MODELS` rather than hardcoding) is the
correct target shape — use it as the template.

**Verification:** grep for `0.55`, `0.25`, `0.20`, `55%`, `25%`, `20%` as
literals across both frontend and backend; confirm zero hardcoded matches
remain outside the config file itself.

### 1.3 Impact Lab pipeline stage audit

Confirmed stub components (2-line placeholders, no real logic):
`SimulationChamber.tsx`, `JournalWall.tsx`, `MissionDeck.tsx`. Confirmed
real: `AudioBay.tsx` (built 15 Aug 2026, submission queue + technical
checklist + gated advance-to-Certification), `InnovationPod` (verify
current status directly, not from memory of an earlier pass).

**Task:** For each of the 5 pipeline stages
(Sandbox/Journal/Impact Lab/Certification/Store), confirm directly which
are real and which are stubs. A "certified" event the rotation engine
listens for can only be considered trustworthy for programmes whose full
pipeline path is real end-to-end.

**Verification:** direct `view`/grep against each file, not a memory-based
assumption — this exact category of error (assuming a component works
because it was described as built) is the standing failure pattern named
above.

### 1.4 Layer 1 exit criteria

Layer 2 work does not start until all three of the above are
independently verified complete:

- [ ] One Cyberstore implementation is canonical, routed, and has a working buy/checkout flow
- [ ] `RevenueSplitConfig` is the sole source of split percentages, zero hardcoded literals remain
- [ ] Each of the 5 Impact Lab pipeline stages has a confirmed real/stub status, documented

---

## LAYER 2 — Content Rotation Engine

### 2.1 Data model

```
ContentCompletion
  id
  programmeId           // one of the 11 certifying programmes
  memberId
  workId                // FK to the canonical creator_works / Cyberstore product record
  certifiedAt           // Impact Lab pass timestamp, null if not yet certified
  listedAt              // Cyberstore live timestamp, null if not yet listed
  badgeTierAtCompletion

ContentSlot
  id
  channel               // 'joystick' | 'raydyo'
  weekOf                // date
  programmeId            // nullable — Final Whistle Friday / Backstage slots aren't programme-specific
  sourceCompletionId    // FK to ContentCompletion — null only for fixed-anchor formats (Final Whistle Friday, Backstage)
  format                // 'spotlight' | 'service_broadcast' | 'final_whistle_friday' | 'hub_week' | 'chucks_chuckup' | 'backstage'
  status                // 'scheduled' | 'aired' | 'skipped_no_completion'
  occupiedBy            // nullable FK to a human host/presenter — null means AI-generated/placeholder per the Easy Street transition pattern

QueueState
  programmeId
  lastFeaturedWeek
  skipCount             // consecutive weeks skipped for lack of a certified/listed completion
```

### 2.2 Programme queue order (fixed, 11 certifying programmes)

Scrap Cat → Silk Stilettos → Auntie Anansi's Kitchen → TECHreneurs → Roots
→ STEMgeneers → Trubble n Bass → Pageturners → Kaywana's Court → G-Tech
Casters → Rayd-yo (self, Backstage/Joystick only) → repeat.

Bright Sparks excluded (filter/onboarding gear, never produces a certified
product). Easy Street handled outside the queue as Hub Week (2.4).

### 2.3 Validation rules (enforced, not house style)

1. **No fabricated content.** If `QueueState` for the current programme
   has no `ContentCompletion` with `certifiedAt` (for Rayd-yo) or
   `listedAt` (for Joystick) newer than `lastFeaturedWeek`, do not
   schedule a spotlight/story for that programme this week. Fall through
   to Final Whistle Friday or a Backstage clip instead. Increment
   `skipCount`.
2. **No same-programme double-run unless genuinely one event.** A
   `ContentSlot` on Joystick and a `ContentSlot` on Rayd-yo may share the
   same `programmeId` in the same `weekOf` **only if** both reference the
   same `sourceCompletionId` (i.e., one real certification-then-listing
   event). Otherwise, reject the second slot — reads as a push, not
   coverage.
3. **TECHreneurs slot integrity.** A `ContentCompletion` counts toward
   TECHreneurs' own queue turn only if `programmeId = TECHreneurs`
   natively (a member's own consulting/business-service output) — not a
   re-tagged Scrap Cat/Silk Stilettos item that merely routed through
   TECHreneurs' pricing gate.
4. **Service Broadcasting pre-empts, doesn't duplicate.** If G-Tech
   Casters or Rayd-yo produces a Service Broadcasting piece covering
   programme X's real launch, mark X's `QueueState.lastFeaturedWeek` as
   satisfied for that cycle — do not also schedule a separate
   spotlight/story for X the same cycle.

### 2.4 Fixed-anchor formats (run outside the rotating queue)

- **Final Whistle Friday** — biweekly, both channels, pulled from a
  milestone sub-query (badge-tier jumps, first sales) independent of
  `QueueState`. Activates at Phase 2 (see 2.6).
- **Hub Week (Easy Street)** — not in the programme queue (Easy Street is
  a hub/terminus, not a certifying destination). Triggered
  manually/event-driven whenever a genuine cross-programme convergence
  lands in an episode (e.g. a Pageturners story + Silk Stilettos costume +
  Trubble n Bass score in one episode) — not on a fixed schedule.
  Activates at Phase 3.
- **Chuck's Chuck-Up** — pre-roll slot, content pulled from whatever
  `ContentSlot` is airing that week across Joystick/Rayd-yo (kept in sync
  with the main rotation per the decision already made). Activates at
  Phase 3, requires Easy Street content maturity.

### 2.5 The `occupiedBy` / slot-in abstraction

Every `ContentSlot` format (`final_whistle_friday`, `service_broadcast`,
`chucks_chuckup`, etc.) exists as a named, defined role in this data model
independent of who or what fills it. `occupiedBy = null` means
AI-generated/placeholder content occupies the slot (matching the existing
Easy Street AI-to-real-actor transition pattern already in production).
Introducing a trained human host later is a single-field update — assign
`occupiedBy` — not a schema or format change. Do not build host-specific
logic into the slot format itself.

### 2.6 Phase gates (config-driven, not judgment calls)

```
PhaseGateConfig
  phase1_minComplete: true                         // bare rotation (Joystick spotlight + Rayd-yo Service Broadcasting), always on once Layer 1 is done
  phase2_finalWhistleFridayMinQueueSize: <TBD>     // minimum milestone-queue items before FWF activates
  phase3_hubWeekMinConvergingPieces: <TBD>         // minimum genuine cross-programme convergences observed in Easy Street before Hub Week / Chuck's Chuck-Up activate
  phase4_serviceBroadcastingLive: true             // activates once G-Tech Casters/Rayd-yo can reliably produce real launch coverage
```

Numeric thresholds marked `<TBD>` need a decision before Layer 2 build
starts — not hardcoded arbitrarily by whoever writes the code.

---

## 3. Open items requiring a decision before/during build

- [ ] Canonical Cyberstore implementation choice (1.1) — needs a decision, not just a consolidation exercise
- [ ] `RevenueSplitConfig` location/shape — extend `revenueModels.ts` or new file
- [ ] Phase 2/3 numeric thresholds (2.6)
- [ ] Whether `ContentCompletion.workId` references the consolidated Cyberstore product record from 1.1, or needs its own lighter-weight tracking table
- [ ] Admin-dashboard surface for this engine — likely a new tab or sub-view under the existing 15-tab `WW-SPEC-ADMIN-DASHBOARD-001` scoping (Marketing or Editorial tab is the likely home; confirm rather than assume)

---

## 4. Verification checklist (apply at every stage, not just at the end)

- [ ] Every "built" claim confirmed via direct grep/view of the live file, not inferred from the plan
- [ ] Every "wired" claim confirmed by tracing the actual import chain, not assumed from a file's existence
- [ ] No new duplicate implementations created alongside existing ones without an explicit decision to deprecate the old one
