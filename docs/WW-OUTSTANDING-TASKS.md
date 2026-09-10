# WW Outstanding Tasks — Master Tracker

Exported from chat memory 21 Aug 2026. This is now the canonical location for
this tracker — going forward, log new findings here directly (in Claude Code
or chat) rather than letting them sit only in chat memory, where the other
surface can't see them.

**Standing rule:** Before stating what exists, what's decided, or what
something does anywhere in this project — check the actual file/record
first, even when the answer feels obvious or already settled. When a check
contradicts something already recorded here, correct it openly and update
this file — a wrong conclusion doesn't get to quietly stand just because it
was already written down once.

**Status legend:** 🔴 open / needs a decision or build · 🟡 partially
resolved, has a known follow-up · 🟢 resolved, kept for history · 🔵 parked
deliberately

## 🔴 Master build order (2026-08-28) — Phase 0.1 pre-build audit contradicts the plan's premises

`WW-MASTER-BUILD-ORDER-2026-08-28-CREATOR-JOURNEY-FOUNDATIONS` locks four
builds and sequences them. Before starting Phase 0.1 (Cyberstore
reconciliation), the actual repo state was checked (28 Aug 2026, Claude
Code). Three of Phase 0.1's premises are wrong, and one is a hard
architectural blocker:

1. **"Build a real listing-creation flow (none exists today)" — one
   exists.** `src/services/sandboxToStoreService.ts` (443 lines:
   `StoreListing` type, `buildListingDraft`, `validateListingDraft`,
   `saveListingDraft` → POST `/api/store/listings/draft`, `publishListing`,
   `getMyListings`) + `src/components/store/AddToStoreButton.tsx` (the
   entry point) + `src/pages/cyberstore/ListingEditorPage.tsx` (routed at
   `/cyberstore/listings/:listingId/edit` — a full working editor: title,
   description, tags, pricing, free-download, limited-edition, publish,
   55/25/20 split display, autosave). **The gap is not "build it" — it is
   that `AddToStoreButton` is rendered in no sandbox, so the flow has no
   live entry point, and it is entirely backend-dependent (see #4).**

2. **"Retire the other three, do not leave four live in parallel" —
   already done.** Only `CommunityShopPage` + `ListingEditorPage` are
   routed. `production-hub/CyberstoreListingWizard.tsx` (767L),
   `studio/CyberstoreStorefront.tsx` (183L),
   `marketplace/integrations/creatorJourneyIntegration.ts` (287L), and
   `components/cyberstore/CreatorJourneySection.tsx` (588L) are all
   unrouted / unimported. Also unrouted: `src/cyberstore/pricing/*`
   (a 6th cluster the build order doesn't name). "Retirement" here is
   deprecation headers + deletion, not untangling live parallel systems.

3. **"Reconcile the fifth incompatible product shape" — the real split is
   `CyberstoreProduct` (`src/data/cyberstoreData.ts`, what the live browse
   page reads — static catalogue) vs. `StoreListing`
   (`sandboxToStoreService.ts`, what the live editor writes — creator
   listings). These are browse-model vs. create-model, and neither
   currently talks to the other.**

4. **"Build a real cart/checkout backend" (0.1) and "new ILPService
   backend" (0.2) — both backends already exist.** This is the frontend
   repo (`website-development.git`); the backend is a separate Spring Boot
   repo at `~/projects/wembley-wonders/backend` (`org.wembleywonders:
   wembley-wonders-api`, actively maintained — recent commit "Fix
   publish/pause/resume endpoints"). Checked directly 28 Aug 2026:
   - **Store/purchase/payout backend exists.** `StoreListingController`
     (`/api/store/listings`: `POST /draft`, `GET /{id}`, `PATCH /{id}`,
     `POST /{id}/publish`, `GET` list, `POST /{id}/pause`, `POST
     /{id}/resume`) — matches `sandboxToStoreService.ts`'s contract
     exactly. `StorePurchase` entity (buyer email, amount, `creator/
     reserve/ops` split columns, `stripePaymentIntentId`,
     `stripeTransferId`, download count). `PaymentController`
     (`/api/payments`: earnings, transactions, payouts, `payout/request`,
     `payout/full`, balance, admin metrics). `StripeWebhookController`,
     `PaymentIntent`. Checkout is Stripe-based.
   - **ILP backend exists.** `ILPController` + a full `Ilp*` domain-enum
     family (`IlpMilestoneType`, `IlpGoalDomain`, `IlpGoalStatus`,
     `IlpRovOwner`, `IlpSignalSource`, `IlpSignalType`, `IlpSalience`,
     `IlpRevisionType`, `IlpTruthCheckOutcome`, `IlpSyncType`) +
     `CreatorJourneyController` `GET /api/creators/{id}/journey`.
   - **Not in the backend:** Rayd-yo / broadcast service-arm (the only
     "broadcast" class is `CommunityPoolBroadcaster`, unrelated);
     TECHreneurs nexus gate / case-study capture.

**Corrected scope for the master build order (28 Aug 2026, Claude Code —
pending CJ, because this changes the plan's sequencing):**

| Build-order item | Backend | Frontend | Real remaining work |
|---|---|---|---|
| 0.1 Cyberstore | ✅ StoreListing CRUD + Stripe purchases + payouts | ✅ `ListingEditorPage` (routed) + `sandboxToStoreService` + `AddToStoreButton` (built, **unmounted**) | Wire `AddToStoreButton` into sandboxes + a "sell" entry on `CommunityShopPage`; a cart store + checkout page (frontend) against the existing Stripe endpoints; **wall-rental mode** (front + a backend `pricingMode` on `StoreListing`); retire the 3–4 orphan impls; reconcile `CyberstoreProduct` (static browse) ⇄ `StoreListing` (creator listings). |
| 0.2 ILP page | ✅ `ILPController` + `Ilp*` model + `/journey` | ❌ no route, no page, no client | Frontend route + page + `ilpService.ts` client. Audit `ILPController`'s actual endpoint surface first. **Not** "build a backend." |
| 1.3 Rayd-yo | ❌ nothing | ❌ near-nothing | Genuine from-scratch, **both repos**. Heaviest, as the order says. |
| 1.4 TECHreneurs nexus ROV | n/a (frontend pattern) | ❌ | Frontend component matching the 3 real ones. As written. |
| 1.2 Silk Stilettos accreditation | n/a | partial (`SILK_STILETTOS_BADGES` exist) | Frontend content/data. As written. |
| 1.1 Kitchen wiring | n/a | tools exist, wiring doesn't | Frontend. As written. |

**Not started.** The build order was written without backend access; two
of its four decisions ("build new backend") rest on things that already
exist. It needs re-issuing against the corrected picture before Phase 0
code is written — most importantly, whether cross-repo work (this repo +
`~/projects/wembley-wonders/backend`, a separate git repo) is in scope for
these sessions.

### Backend audit (28 Aug 2026, Claude Code — per WW-SESSION-HANDOFF-2026-08-28-BACKEND-AUDIT)

Repo: `~/projects/wembley-wonders/backend` — `org.wembleywonders:wembley-wonders-api`,
Spring Boot, its own git (no remote configured on this checkout; latest commit
"Fix publish/pause/resume endpoints all calling getListing by mistake"). **The
backend repo has no `WW-OUTSTANDING-TASKS.md` or any markdown docs/tracker of
its own** — this audit lands here, in the frontend canonical tracker, because
that is where the master build order lives. Same confirmed-real / confirmed-stub
/ confirmed-absent format as the frontend audit.

**1. ILP / Creator-Journey — three distinct things, only the wrong-named one works**

- **`LearnerJourney` / ILP scaffold — CONFIRMED SCAFFOLD (built as file skeletons,
  no logic).** `entity/ilp/LearnerJourney.java` (17.7 KB — real, rich: `current_stage`
  1–4 "Seeking Help", `ilp_narrative` + version + `edited_by` maya/learner/facilitator,
  `problem_*`, `ignition_*`, `solution_*` (tools/skills/collaborators/timeline),
  `deployment_*`) and `entity/ilp/IlpGoal.java` (8 KB — real) exist. So do 11 `Ilp*`
  enums, 3 `model/ilp/*Summary` DTOs, and **`V49__Create_ilp_schema.sql` (689 lines —
  a full schema: `learner_journeys` + more)**. **But `ILPController.java`,
  `ILPService.java`, `repository/ilp/ILPRepositories.java`, and 8 of the 9
  `entity/ilp/` files are 0-byte empty files.** No repository → nothing reads or
  writes `learner_journeys`. No service → no logic. No controller → no endpoints.
  The `V49` header says its purpose is to "promote `transformationStore.ts` to a
  persistent backend layer" — i.e. this ILP models the **transformation journey**
  (problem → solution → deployment → teaching others), *not* the earnings-milestone
  pathway the master build order's hero copy describes. Confirms the frontend audit:
  `transformationStore` is the ILP's basis, and it is a different concept from
  "free ILP that takes you where you want your earnings to go".
- **`CreatorJourneyController` — CONFIRMED REAL and functional.**
  `GET /api/creators/{id}/journey` and `GET /api/creators` →
  `CreatorJourneyResponse`: real per-member **economics** (lifetime earnings,
  current monthly income, product counts, total sales, CIC advance
  outstanding/repaid), **journey meta** (`stage` = `CreatorStage` enum, joined
  date, first-sale date, `hadPriorIncome`, `isLocalBrent`, Stripe Connect
  onboarded, archive sections live/planned), and a chronological list of
  **provenance events** (from `ProvenanceRecord`, mapped to calendar-event
  types incl. `raydyo-drop`). Persists real data. Its own docstring: "Used by the
  frontend CreatorRegistry to hydrate static seed data with live backend state."
  **This is the closest thing to what `/creator-pathways` would need if wired to
  real data** — real earnings + a stage — but it carries no milestone /
  earnings-target / pathway-step concept, and it is framed as a
  provenance/economics timeline, not an ILP.
- **`PanelController` — CONFIRMED REAL.** `GET /api/panel/story|programmes|position`
  → `PanelSummaryResponse`, plus `GET /api/panel/badge-progress/{learnerId}` →
  `BadgeProgressResponse` (what the frontend `BadgeProgress.tsx` already calls).
  Serves the frontend `/panel/*` routes.

**2. Cyberstore — cart/checkout/order model**

- **Listing entity — CONFIRMED REAL.** `entity/StoreListing.java`: `creatorId`,
  `provenanceId`, `programmeSlug`, `title`, `description`, `productType` (enum,
  default `DIGITAL_DOWNLOAD`), `fileUrl`, `priceGbp`, `freeDownload`,
  `limitedEdition`, `editionSize`, `copiesSold`, `tags`, `wardTag`, `creator/reserve/ops`
  share pcts (55/25/20), `status` (`ListingStatus` enum, default `DRAFT`),
  timestamps.
- **Listing-CREATE endpoint — CONFIRMED REAL.** `POST /api/store/listings/draft`
  (`StoreListingController.createDraft` → `StoreListingServiceImpl.createDraft`,
  which does `new StoreListing()` → `storeListingRepository.save()`). Also
  `PATCH /{id}`, `POST /{id}/publish`, `GET` list, `POST /{id}/pause|resume` —
  all persist. **The frontend audit's "zero listing-creation flow client-side" was
  because `AddToStoreButton` is unmounted, NOT because the endpoint is missing.**
  The endpoint matches `sandboxToStoreService.ts` exactly.
- **Cart / Order / Checkout entity — CONFIRMED ABSENT.** No `Cart`, `Order`,
  `Checkout`, or `Basket` entity or controller. What exists post-transaction:
  `entity/StorePurchase.java` (buyer email, amount, `creator/reserve/ops`
  amounts, `stripePaymentIntentId`, `stripeTransferId`, download count) and
  `entity/cyberstore/SaleRecord.java`. Checkout is **Stripe-driven**:
  `StripeWebhookController` (`/api/webhooks/stripe`, `/stripe/v2`) handles
  `payment_intent.succeeded/failed`, `checkout.session.completed`,
  `charge.refunded`, `payout.*`; `PaymentController` imports
  `CreatePaymentIntentRequest`. So a buyer purchase is: create a Stripe
  PaymentIntent / Checkout Session → webhook → `StoreListingServiceImpl` saves a
  `StorePurchase`. There is no server-side multi-item cart.

**3. Wall-rental `pricingMode` field — CONFIRMED ABSENT (needs adding from scratch, both sides)**

- `enums/PricingMode.java` exists with **exactly three values: `LIVE_AUCTION`,
  `BUY_NOW`, `COMMUNITY_PRICE`** (its comment: "Direct port from the confirmed
  frontend type pricing.types.ts"). No `WALL_RENTAL` / `RENTAL` / `RENT`.
- `entity/cyberstore/ListingPricingConfig.java` — real, rich (a per-listing config
  with `activeModes: List<PricingMode>`, auction start/reserve price, buy-now
  price, community price + eligibility, stock counts). **But it has no REST
  controller** (`grep` for `ListingPricingConfig` / `PricingService` /
  `activeModes` across `controller/` returns nothing except
  `AuctionWebSocketController` for live bidding). So even the three modes that
  *do* exist are not exposed to the frontend over HTTP.
- `StoreListing` itself has **no `pricingMode` / `rentalType` field** — just
  `priceGbp` + `freeDownload`.
- V67 (`Rebuild_pricing_config_tables`) constraint: `mode IN ('LIVE_AUCTION',
  'BUY_NOW', 'COMMUNITY_PRICE')`.
- **So 0.1's wall-rental is "add a new mode to the backend (enum value + a config
  shape for flat weekly rent + a REST surface for pricing config, which doesn't
  exist yet), then wire the frontend" — the larger of the two options the handoff
  named.** The frontend already has the model (`WallRentModel` /
  `SILK_STILETTOS_WALL_RENT` in `revenueModels.ts`).

**4. Rayd-yo — accreditation and service-arm — CONFIRMED ABSENT on both sides**

- No file matching `rayd*` / `raydyo` / `broadcast` / `airtime` / `coverage` in
  the backend. `service/cyberstore/CommunityPoolBroadcaster.java` is a WebSocket
  broadcaster for the community-pool ticker — unrelated.
- The only Rayd-yo trace: `RegistrationType` values `PODCAST_EPISODE` / `BROADCAST`
  map to a `raydyo-drop` calendar-event type in `CreatorJourneyController`, so a
  provenance record can be *tagged* as a broadcast. There is no Rayd-yo
  accreditation entity and no cross-programme broadcast/coverage ("service-arm")
  concept.
- Matches the frontend finding. **Confirmed absent on both sides — genuine
  from-scratch, both repos.**

**5a. Silk Stilettos accreditation data — CONFIRMED ABSENT in the backend**

- No `accreditation` / `progression` / `pathway` / `curriculum` package or entity
  anywhere. No `/api/accreditation`, `/api/progression`, `/api/pathway`. No
  `ProgressionPathway` / `ProgressionStep` / `AccreditationUnit` /
  `AssessmentCriteria` / `EvidenceRequirement` type.
- `V40__Create_badge_progress_table.sql` — a `badge_progress` table exists, but
  it tracks **membership tiers** (NONE / CONNECTOR / CURATOR / CHAMPION) and
  cross-programme diversity counts, "recalculated on each session event" — *not*
  the Explorer/Builder/Innovator/Leader accreditation badges, and it holds badge
  *progress*, never badge *definitions* or unit/assessment content.
- So the backend has nothing behind the stub `accreditation/programmes/silk-stilettos/`
  directories. That content is frontend-only work (badge-definitions.ts +
  progression-map.ts + the markdown), as the build order assumed.

**5b. TECHreneurs nexus-gate-equivalent persistence — CONFIRMED ABSENT**

- No `techreneur` / `nexus` / `valuation` / `pricing-review` / `sign-off` file in
  the backend. No pricing-review or curator-sign-off entity. The
  `ValuationArchitectureRecord` and the new `pricingCaseStudy.ts` types are
  frontend-only. 1.4's nexus-gate ROV is a frontend component (matching the three
  real ones) with no backend dependency; the case-study *capture* in
  `WW-SPEC-TECHRENEURS-CASE-STUDY-PIPELINE-001` Phase 2 would need new backend
  entities.

**Master build order — re-issue inputs (do not act until re-issued):**

- 0.2 "ILP page + new ILPService backend" → the ILP the build order describes
  (earnings pathway) has **no backend**; the ILP that has a backend scaffold is a
  different concept (transformation journey) and its scaffold is non-functional
  (empty service/controller/repository). The real live per-member data closest to
  the build order's intent is `CreatorJourneyController` / `PanelController`.
  **CJ decision needed: is 0.2 "build the frontend against `/api/creators/{id}/journey`
  + `/api/panel/*`", "finish the LearnerJourney ILP scaffold (backend work) then
  build the frontend", or "these are two different products"?**
- 0.1 cart/checkout → no server cart; checkout is Stripe. "Build a cart/checkout
  backend" is really "build a Stripe checkout flow (frontend) + possibly a
  server cart entity if multi-item baskets are wanted".
- 0.1 wall-rental → new backend enum value + pricing-config REST surface (neither
  exists) + frontend.
- 1.3 Rayd-yo, 1.4 TECHreneurs nexus, 1.2 Silk Stilettos, 1.1 Kitchen → backend
  adds nothing; frontend scope stands as previously corrected.

---

## 🔴 Creator-journey pilot (Silk Stilettos + Rayd-yo) — blocked, needs CJ scope decision

Audited 28 Aug 2026 (Claude Code). Full write-up:
`docs/accreditation/WW-SESSION-HANDOFF-2026-08-28-CREATOR-JOURNEY-PILOT.md`.
The pilot picked Silk Stilettos + Rayd-yo because they were believed to
avoid every known blocker. On a live check, all four load-bearing pieces
are built-but-orphaned or absent:

- **Priority 0 — ILP / Creator-Journey page: does not exist as a real
  routed public page.** `WhatYouBuildPage.tsx` (the only real ILP explainer)
  is orphaned — no route, no importers. `/creator-pathways`
  (`CreatorPathwaysPage.tsx`) is routed and public and is the closest
  structural match, but the word "ILP" never appears in it and 100% of its
  data is hardcoded literals (no store/service). `/creators-journal` is
  login-gated. No `ILPService` / ILP backend exists anywhere. This is a
  hard blocker — there is no page to wire the pilot's pathway into. Same
  question was raised and left unresolved in the 27 Aug career-first
  redesign handoff; this closes it: **absent, needs building or a redefined
  endpoint.**
- **Silk Stilettos accreditation: stub.** All three
  `accreditation/programmes/silk-stilettos/` files are "To be completed"
  placeholders. No `SILK_STILETTOS_PATHWAY` in either progression-map.ts.
  Badges (`SILK_STILETTOS_BADGES`) do exist in `badge-definitions.ts`. But
  the **entire `src/accreditation/badge-system/` tree is orphaned** —
  `grep -rln "accreditation/badge-system" src/` (minus the dir itself)
  returns nothing; `badge-system/index.ts` is a `// Stub` + `export {}`.
  A Silk Stilettos pathway can't be "ported from real units" the way
  Trubble n Bass was — there are no real units to port.
- **Rayd-yo: no accreditation dir, no syllabus doc, no service-arm code.**
  `accreditation/programmes/rayd-yo/` and `WW-SPEC-RAYD-YO-SYLLABUS-001.md`
  both absent. `RaydyoPage/` is a radio-station website;
  `RaydyoPage/types/integration.ts` is a `// Stub`. The nearest thing to a
  "coverage trigger" is the `tnb-to-raydyo` bridge in
  `src/components/programme-journeys/journeyConfig.ts` — but the whole
  `programme-journeys/` tree has zero live consumers. Broadcast-coordination
  exists only as design docs + a `CoordinatorsByProgramme` lookup constant.
- **Cyberstore: no listing-creation, no wall-rental mode live.** See the
  extended Cyberstore entry under Technical build gaps below.
- **Joystick portfolio-gallery auto-surface hook: does not exist for any
  programme.** The claim that it's "confirmed for Kitchen and Pageturners"
  is not backed by code — Pageturners only has static per-genre
  `joystickOutput` description strings and "submit to Joystick" prompts.
  `src/systems/rovs/publication-pipeline/` is a designed-but-unwired
  story-flagging pipeline (not a portfolio gallery).

**Net:** the full loop has no wired segment today. Priority 2 ("wire the
confirmed-real pieces") has almost nothing confirmed-real to wire.
Not started — needs an explicit CJ decision, first on what the pilot's
pathway page actually is.

## 🔴 Decisions made, not yet recorded in the actual spec

STEMgeneers Layer 1 public-AI-tool age condition. Judith resolved this:
minimum age 13 (COPPA/UK-GDPR/AAP convergence), age gate paired with active
supervision (not age alone), API-only route for under-13 members who still
want the content (removes public-gallery exposure risk entirely). Action:
write this into the actual STEMgeneers Layer 1 spec/provenance files — last
seen with the age threshold marked "to be confirmed."

*Checked 21 Aug 2026 (Claude Code):* searched the full repo for any
STEMgeneers Layer 1 spec/provenance file (`grep -rl "Layer 1"` scoped to
STEMgeneers content, plus direct filename search) — nothing found. The
target file(s) this decision needs writing into don't exist in the repo at
all, so "age threshold marked to be confirmed" can't be checked against
real code — there's no file to check. This is a chat-memory-only spec, same
situation the curator roster was in before it got pasted in. Not
contradicted, not confirmed — genuinely unverifiable until the real spec
file is either pasted in or created. Not implementing a new spec file
unprompted since I don't have its actual current content, only this
decision fragment.

**Update, 22 Aug 2026 (Claude Code) — this mechanism now has a real first
implementation.** CJ confirmed (same session, in the context of the 9pm
watershed decision) this exact rule — min age 13, age gate paired with
guardian/parental consent as the active-supervision mechanism, restricted
route for under-13 or non-consented — should be reused exactly for the
post-9pm watershed access gate, not given a separate threshold.
`src/safeguarding/WatershedGate.ts` implements the decision logic
(`evaluateAgeGate`, `evaluateWatershedAccess`) as pure functions, following
`SafeguardingFocus.ts`'s existing STUBBED-when-no-backend convention.

**Confirmed, real blocker:** `WembleyUser` (`src/contexts/AuthContext.tsx`)
has no `dateOfBirth` or `guardianConsent` field — checked directly, the
live user object only carries `id, email, username, role, status, canVote,
canEnrollInProgrammes, member, displayName`. Date of birth is collected at
*application* time (`src/types/application.ts:9`) but does not flow into
the live authenticated session anywhere. CJ confirmed this needs a backend
change first. `WatershedGate.ts`'s `getAgeGateInputForUser()` is stubbed
accordingly — it does not fake a value. Not wiring the gate into any live
page until that field exists; a gate that cannot check real data would be
worse than no gate for a safeguarding feature.

Also still fully open, not started: the broader pre-watershed scheduling
framework this same decision covers — named recurring categories (Mother's
Hour, Children's Storytime, list not yet complete per CJ), term-time-aware
scheduling (no school-term/holiday calendar concept exists anywhere in the
repo — checked), and a producer-facing category-selection UI so members
submitting content can select which slot type their work belongs in. CJ
confirmed pre-watershed children's/teen content needs its own dedicated
safeguarding framing (not simply "safe by virtue of being pre-watershed"),
consistent with established broadcasting standards — not yet designed.

## 🔴 Pending sign-offs (named person, specific ask)

Judith — likeness-verification gate for Maya's 3D model is open
(maya-buddy.jpg approved 15 Aug as canonical reference/template for all 24
characters; the side-by-side review against an actual exported model can't
happen until the pipeline produces something to review). See
ww-maya-character-pipeline.

Judith — editorial sign-off on the six commission email templates
(atelier-commission-email-templates.md, drafted 15 Aug). Payment/escrow
wording deliberately placeholder pending Blake's settlement decision below.

*Checked 21 Aug 2026 (Claude Code):* neither `maya-buddy.jpg` /
`ww-maya-character-pipeline` nor `atelier-commission-email-templates.md`
exist anywhere in this repo (direct filename search, both empty). Both
items are genuinely human-sign-off items regardless — nothing here was a
code claim to verify — but worth flagging that the artifacts Judith would
actually be reviewing aren't in the repo either, so there's nothing for a
future Claude Code session to check against if asked "is this still
accurate" the way this pass just did for other items.

## 🔴 Researched, ready for CJ's decision as Director

Knowledge Commons — 3 open questions, all researched, ready to become
policy:

- Commercial use of Commons material — plain CC-NC flagged as inadequate
  (CC's own FAQ: NC is ambiguous, not user-type-based). Recommended:
  two-layer model — deposit-level license + separate explicit member
  opt-in/out for WW's own commercial use, consistent with the existing
  Equiano Principle consent logic.
- IP timestamp adequacy — C2PA (WW's existing manifest standard) specifies
  RFC 3161 Time Stamp Authority countersigning; without it a manifest
  becomes invalid once its signing credential expires. Needs a concrete
  check: does WW's current C2PA implementation include RFC 3161
  timestamping?

  ⚠️ **Checked 21 Aug 2026 (Claude Code) — question's premise is wrong.**
  Searched the full repo for "C2PA"/"c2pa" and for RFC 3161/
  TimeStampAuthority/TSA. Exactly one hit: a comment in
  `src/knowledge-commons/citation/citationStore.ts:25` listing "C2PA
  provenance architecture" alongside other architectural concepts
  (Voice Provenance Record, Equiano...) — a reference to the *idea*, not an
  implementation. No manifest-generation, signing, or timestamping code
  exists anywhere. "WW's current C2PA implementation" doesn't exist yet to
  check RFC 3161 against. This isn't a policy question CJ can resolve —
  it's a build gap underneath a policy question. Reclassify: still needs
  CJ's decision on the *policy* (should WW build to C2PA + RFC 3161), but
  "is it already compliant" isn't answerable because nothing's built.
- Data retention on protected-tier deposits — UK GDPR storage limitation
  requires a documented, purpose-linked schedule (undocumented = ICO treats
  as none). Oral History Society guidance confirms "archiving in the public
  interest" as lawful basis for long-term retention, provided
  pre-publication due diligence screens for "substantial damage or
  distress" risk to third parties.

Directors — cost-of-living governance trigger thresholds resolved with
drafted numbers: CPI 3% (BoE's own statutory escalation point), food
inflation 4%, RAC fuel index >10% over a rolling 3 months. Ready for
directors' confirmation as actual policy. See ww-revenue-governance.

## 🟡 Blake's remit (ACCA, advisory not decision-authority)

Atelier commission settlement — split ratio (75/20/5) resolved via industry
comparison, no longer open. What remains: settlement mechanics only —
payment timing, gross-vs-net-of-fees/VAT basis, escrow/release timing.

## Creator Margin Banding (WW-SPEC-CREATOR-MARGIN-BANDING-001) — Section 1 verification, 2026-09-02

Verification pass run before building the advisory margin-banding calculator
(Claude Code). The standalone calculator was built:
`src/features/margin-banding/` (`marginBandingConfig.ts`, `MarginBandingEngine.ts`,
`MarginBandingCalculator.tsx` + `.css`, `index.ts`). Five corrections came out
of the pass; three spec-interpretation calls were made to unblock the build
(recorded under "Interpretation calls" below — two approved, one still open):

1. **🟢 `revenueModels.ts` STANDARD split corrected.** `src/blockchain/config/revenueModels.ts`
   `STANDARD` was `{ maker: 55, platform: 25, community: 20 }` — platform and
   community reversed against every WW-REVENUE-GOVERNANCE discussion and the
   board-level revenue model (creator 55 / platform 20 / community 25). Corrected
   in place (CJ ruling, 2026-09-02) with a REVISION note in the file header. The
   two `ATELIER_*` splits already had platform at 20 and were not touched. The
   file stores **integer percentages, not decimals** (spec Section 3 assumed
   `0.55`); the new engine reads the constant and divides by 100 in one place
   (`creatorShareFraction()`).

   **File-history finding (2026-09-02):** the correction was committed
   (`ed8569af`) as the file's *first ever* git commit — but the file itself
   is not new. `revenueModels.ts` in its current shape (the
   `maker`/`platform`/`community` interface, the three splits, the
   `SILK_STILETTOS_WALL_RENT` block, the sum-to-100 check) has existed on
   disk, untracked, since **at least 27 July 2026** — a byte-identical copy
   sits in `~/Downloads/revenueModels (2).ts` dated 2026-07-27 13:42, and
   the wall-rent block was merged in from `~/Downloads/revenueModels.patch.ts`
   the same day. An earlier, structurally different version (decimal
   fractions, `originator`/`community`/`operations`, ~11 programme models,
   WW-SPEC-CITATION-001 helpers) goes back to early June 2026
   (`~/Downloads/revenueModels.ts`, 2026-06-01). The reversed STANDARD
   field order was present in the 27 July copy, so the wrong split sat in
   the "single source of truth" for roughly five weeks. No git history,
   reflog entry, or stash held it in that window; only Claude's local
   file-history captured the pre-edit state (this morning, 08:27).
   **Process gap worth watching:** governance-critical config
   (`revenueModels.ts` names itself "SINGLE SOURCE OF TRUTH" and requires a
   directors' decision for any change) went un-backed-up in git for over a
   month. Every current consumer of it is also still untracked
   (`MarginBandingCalculator.tsx`, `AtelierROV.tsx`, `CyberstoreStorefront.tsx`,
   `citationStore.ts`, `marginBandingConfig.ts`, `RosemaryWeaverROV.tsx`,
   `useRosemaryWeaverTracking.ts`). Config files that carry a governance
   rule in their own header should be committed the moment they are
   created, not left in the working tree.

2. **🔴 Backend `PricingMode.java` follows the wrong split model — needs its own
   migration decision.** `~/projects/wembley-wonders/backend`
   `enums/PricingMode.java` = `LIVE_AUCTION, BUY_NOW, COMMUNITY_PRICE` (the
   mode-based `pricing.types.ts` model, "direct port from the 55 Calculator
   spec"), consumed by `entity/cyberstore/ListingPricingConfig.java`,
   `SaleRecord.java` (hardcodes `communityPoolRate = 0.2500`, derives creator/
   platform rates per mode: 55/60/65 creator), `AuctionSession.java`. This is the
   code that computes real payout splits, so it is a live financial-integrity
   mismatch with the now-authoritative `revenueModels.ts` (which has no
   BUY_NOW/COMMUNITY_PRICE tiering — just STANDARD + the two ATELIER variants).
   Bringing the backend into line means deciding whether BUY_NOW / COMMUNITY_PRICE
   survive at all → enum change + entity changes + data migration. **Its own
   task, not part of the margin-banding build**, and it should not block it.

3. **🔵 `pricing.types.ts` + `FiftyFiveCalculator.tsx` archived, not deleted.**
   Moved `src/cyberstore/pricing/{types/pricing.types.ts, components/FiftyFiveCalculator.tsx, .css}`
   → `archive/parked-pricing-2026-09/` (+ a README). Both were unreferenced by
   routed code. Parked pending: (a) a **directors' product conversation** on
   whether the mode-based split concept (different % for auction/buy-now/
   community-price) should be adopted — if so, reconciled *into* `revenueModels.ts`,
   not run in parallel; (b) **Judith's editorial sign-off** before
   `FiftyFiveCalculator` is deleted or repurposed — it is bound to Easy Street's
   fiction (Gloria / the Counting House / "Session 3: The Numbers"). `src/cyberstore/`
   is now empty and removed.

4. **🟡 Badge-tier casing mismatch (noted, not fixed here).**
   `src/accreditation/badge-system/progression-map.ts` uses capitalised levels
   (`'Explorer' | 'Builder' | 'Innovator' | 'Leader'`);
   `src/accreditation/badge-system/badge-definitions.ts` declares
   `export type BadgeLevel = 'explorer' | 'builder' | 'innovator' | 'leader'`
   (lower-case). The margin-banding config takes the **capitalised** form as
   canonical (`CreatorTier`) and normalises input via `normalizeTier()`.
   `badge-definitions.ts` was deliberately **not** changed as a side effect of
   this task — reconciling the two is its own small cleanup.

5. **🔴 No health/dietary/fitness content-accuracy gate exists anywhere.**
   Spec Section 5 assumes an existing "Track 1/2 rubric or equivalent" to route
   health-adjacent listings through — there is none in code. The three
   `src/rovs/nexus-gates/*` ROVs are craft self-checks (manuscript / audio /
   staging), not clinical review; `Roots` is a heritage/oral-archive sandbox.
   The calculator ships with a **blocking `healthContentCleared` prop defaulting
   to not-cleared** (`healthAdjacent && !healthContentCleared` → results hidden,
   `HealthGate` shown), with the real gate as a TODO. **Health/dietary content is
   currently shipping platform-wide with no accuracy gate at all** — a bigger gap
   than this spec should try to close. Owner for clinical-accuracy sign-off is
   unassigned (spec guesses Roots or a dedicated reviewer, not TECHreneurs).

### Interpretation calls (spec pseudocode was silent or ambiguous)

**IC-1 — Materials netted out before RAG banding. ✅ APPROVED (CJ,
2026-09-02).** The written spec's pseudocode does not actually say whether
the RAG band is computed on the creator's gross take or on take-minus-
materials. The engine nets materials out first (`netTakePerUnit =
creatorTakePerUnit - materialsCostPerUnitGbp`, `MarginBandingEngine.ts:86`)
and bands on the net figure — net-of-materials is the correct reading.
**Action:** a one-line clarification to that effect belongs in
WW-SPEC-CREATOR-MARGIN-BANDING-001 itself (Section 3 pseudocode). That spec
is **not a file in this repo** — it lives in CJ's notes system (pasted into
the 2026-09-02 session, `[[wikilink]]` / Obsidian style). The line needs to
be added there by CJ, or the spec brought into `docs/finance/` and
maintained here. Flagged rather than silently assumed.

**IC-2 — 55% (STANDARD) split applied to time-billed service fees.
🟠 OPEN GOVERNANCE QUESTION — same weight as the `PricingMode.java`
migration item above, NOT folded in as decided (CJ, 2026-09-02).** The
calculator's job-mode path applies the STANDARD creator share to
time-billed service work (e.g. a TECHreneurs / G-Tech Casters hourly
engagement), on the same "everything defaults to STANDARD absent other
guidance" basis as the rest of the tool. **Nobody has actually confirmed
whether service / time-billed work should use STANDARD or a different
split.** This is kept as the working default only so the tool functions;
it is not a directors' decision and must not be cited as one. Needs a
governance ruling: does creator-55 / platform-20 / community-25 apply to
service fees, or does time-billed work sit outside the sale-split model
entirely? Owner: directors (CJ / Judith), with Blake on the finance
implication.

**IC-3 — Break-even-IP three-points logic. ✅ APPROVED as built (CJ,
2026-09-02).**

Also confirmed absent (spec Section 1 asked): `ROVCapabilities.ts` /
`WW-ARCHITECTURE-INVENTORY.md` — neither exists (`docs/rovs/*.md` are 0-byte
stubs). Calculator ships as a plain component with no ROV-capability
registration; that's a deferred task for whenever a real inventory exists, not a
blocker. Wage figures in `marginBandingConfig.ts` (£12.71 NLW 21+, £14.80 Real
Living Wage London) were web-verified against GOV.UK and the Living Wage
Foundation on 2026-09-02 — they change annually and the config carries
`verifiedOn` / `effectiveFrom` metadata plus an annual-review note.

## 🔴 Technical build gaps

CultivationPardnerTab.tsx — reserve snapshot honestly stubbed (backend
genuinely not ready); isEstimate flag + "Estimated" badge now surfaces this
honestly in the UI rather than showing fake precision. Separately found:
services/pardnerApi.ts defines endpoints (/eligibility, /queue, /apply) this
component doesn't use — it does its own inline fetch to
/api/pardner/record and /api/pardner/reserve-snapshot instead. Two
disconnected Pardner API clients exist — needs a decision, not yet made.

*Re-verified 21 Aug 2026 (Claude Code):* confirmed exactly as written —
`CultivationPardnerTab.tsx`'s own comments document the split candidly
(`GET /api/pardner/reserve-snapshot — STILL STUBBED`, "DIFFERENT set of
endpoints" than `pardnerApi.ts`), `isEstimate`/"Estimated" badge both real
and wired through. Still a decision item (which client is canonical), not
a technical gap I can resolve unilaterally — not implementing anything
here without that call being made first.

Cyberstore 4-way fragmentation — production-hub wizard, studio storefront,
creatorJourney/Judith adapter, CommunityShopPage. Not reconciled. See
ww-platform-frontend.

*Re-verified 21 Aug 2026 (Claude Code):* all 4 confirmed real and distinct:
`production-hub/CyberstoreListingWizard.tsx`, `studio/CyberstoreStorefront.tsx`,
`marketplace/integrations/creatorJourneyIntegration.ts` (genuinely the
Judith adapter — `buildJudithJourneyThread()`, and its own comment says
"CommunityShopPage already uses" it), and `pages/CommunityShopPage.tsx`.
Still not reconciled; still a product decision (which becomes canonical),
not something to fix unprompted.

*Extended 28 Aug 2026 (Claude Code, creator-journey pilot audit) — which
one is actually LIVE, and none of them does wall-rental:* only
`CommunityShopPage` is routed (`/shop`, `/cyberstore`) and it is a
**browse-only, fixed-price catalogue** — no listing-creation flow, no
rent-vs-price mode, and its "Add to basket" only increments a local UI
counter (its own audit comment: no cart/order/checkout/backend). It reads
a **fifth** incompatible product shape from `src/data/cyberstoreData.ts`.
The other three are dead: the production-hub wizard and studio storefront
import each other but nothing renders either; the Judith adapter's real
`CartItem`/`Order` pipeline is imported only by `CreatorJourneySection.tsx`,
which has zero renderers. `CyberstoreDock.tsx` (both copies) is currently
deleted in the working tree. **The "Steps" wall-rental mechanism is not in
any Cyberstore implementation** — it lives in
`src/blockchain/config/revenueModels.ts` (`WallRentModel` +
`SILK_STILETTOS_WALL_RENT`) and an orphaned curator-ROV
(`RosemaryWeaverROV.tsx`, zero consumers). Full detail:
`docs/accreditation/WW-SESSION-HANDOFF-2026-08-28-CREATOR-JOURNEY-PILOT.md`.

Three nexus-gate tools designed but never built: Manuscript Analysis ROV
(Pageturners), Audio Quality-Check ROV (Trubble n Bass), Staging/
Production-Readiness ROV (Kaywana's Court).

⚠️ **Update 28 Aug 2026 (Claude Code) — "never built" is now stale.** All
three exist at `src/rovs/nexus-gates/` (`ManuscriptAnalysisROV.tsx`,
`AudioQualityCheckROV.tsx`, `StagingReadinessROV.tsx`, dated 23 Aug) and
each is imported into its programme sandbox — `PageturnersSandbox.tsx`,
`TrubbleNBassSandbox.tsx`, `KaywanasCourtSandbox.tsx` respectively. Not
audited beyond "file exists and is imported" — whether they actually gate
(block progression / require sign-off) versus render as an advisory panel
was not checked this pass. Note for the TECHreneurs case-study spec
(`WW-SPEC-TECHRENEURS-CASE-STUDY-PIPELINE-001`, filed 28 Aug): that spec
calls TECHreneurs "a Nexus gate," but **there is no TECHreneurs nexus-gate
ROV** — the set is these three only.

Original finding, still accurate:
read: AudioBay.tsx does NOT satisfy the Trubble n Bass gate — it's a
pipeline-stage component (Impact Lab/Technician stage of the universal
Five-Cs pipeline), not a cross-programme nexus gate. No wiring routes other
programmes' audio into it. Related drift found in the same pass:
BeatMakerROV.tsx duplicated at production-hub/ and rovs/studio/ (same
pattern as CodeMentorROV/DesignCoachROV/VideoGuideROV/WriterAssistROV); a
second Trubble n Bass location exists at top-level src/trubble-n-bass/
alongside programmes/trubble-n-bass/ — not yet checked which is live.

⚠️ **Checked 21 Aug 2026 (Claude Code) — the trubble-n-bass claim above is
wrong as written.** No `src/trubble-n-bass/` directory exists at all
(direct check — `ls -d src/trubble-n-bass` fails). The real, analogous
duplication — already found and already resolved earlier this session — is
one level down: `src/pages/trubble-n-bass/` (top-level under `pages/`,
serves `TrubbleNBassPage` at `/pathways/trubble-n-bass` and
`/programmes/trubble-n-bass`) vs. `src/pages/programmes/trubble-n-bass/`
(serves `TrubbleNBassSandbox` at the `/sandbox` sub-routes). Both are live
in `App.tsx`; this isn't an unresolved "which one is live" question — it's
a page/sandbox split, confirmed via the actual route table, not a
duplicate. BeatMakerROV.tsx's duplication is still confirmed real and
unchanged (both copies byte-identical, 849 lines, 26,585 bytes — checked
earlier this session via `diff -q`).

Auntie Anansi's Kitchen — 3-file sandbox fragmentation, really 2 tools
wearing 3 wrappers: components/sandboxes/auntie-anansis-kitchen/
AuntieAnansisSandbox.tsx (landing page wrapping RecipeHeritageKeeper) +
pages/programmes/auntie-anansis-kitchen/sandbox.tsx (same
RecipeHeritageKeeper) + pages/programmes/auntie-anansis-kitchen/
AuntieAnansisKitchenSandbox.tsx (fully separate implementation, own
types/5-tab UI/sample recipe). Two open questions never answered: does
Kitchen have a real sale/listing mechanic to build toward yet; requested
contents of AuntieAnansisKitchenSandbox.tsx +
RecipeHeritageKeeper.module.css. Cross-ref: RecipeHeritageKeeper.tsx still
uses Maya's voice — needs updating to Esi per the resolved Esi-vs-Maya
decision (see below).

*Re-verified 21 Aug 2026 (Claude Code):* the 3-file fragmentation and the
Maya-voice reference both confirmed exactly as written (`RecipeHeritageKeeper.tsx:1532`,
"Maya Guide" comment, still present). New, previously-untracked finding in
the same area: only one real `RecipeHeritageKeeper.tsx` exists in the
repo, but there are TWO `RecipeHeritageKeeper.module.css` files — one
under `components/sandboxes/auntie-anansis-kitchen/` (used by the real
component) and a second under `pages/programmes/auntie-anansis-kitchen/`
that nothing in its own directory imports (checked via grep scoped to that
directory — zero hits). Looks like orphaned CSS left over from a copy/move
rather than a genuine second implementation, but flagging rather than
deleting since I haven't traced every possible importer across the repo.

⚠️ **Re-audited 28 Aug 2026 (Claude Code) — full write-up:
`docs/accreditation/WW-SESSION-HANDOFF-2026-08-28-KITCHEN-SANDBOX-FIX.md`.
The live/orphaned split is the opposite of what the Priority 2 plan
assumed.**

- The "3 files, 2 tools" mapping still holds structurally, but they are
  two *different tools*, not two versions of one:
  - **Tool A — `RecipeHeritageKeeper.tsx`** (1595 lines): "Identity
    Restoration Platform + Heritage Language Preservation + Immigrant
    Journey Documentation." 4 journey paths, 14 islands/countries,
    multi-part story capture, `HeritageLanguage`/`ImmigrantJourney`
    structs, localStorage persistence, a "Maya" guide persona. **Wrapped by
    two files — `components/.../AuntieAnansisSandbox.tsx` (persuasion
    landing) and `pages/programmes/.../sandbox.tsx` (bare "TOOL FIRST"
    wrapper) — and BOTH are orphaned** (no route, no importer; both
    coincidentally export a component named `AuntieAnansisSandbox`).
  - **Tool B — `AuntieAnansisKitchenSandbox.tsx`** (721 lines): a
    self-contained recipe-documentation 5-tab wizard (Basics → Ingredients
    → Method → Heritage → Preview), `SAMPLE_RECIPE` "Granny's Curry Goat",
    no persona voice, no persistence, no external deps. **THIS is the only
    routed Kitchen sandbox** — `/programmes/auntie-anansis-kitchen/sandbox`
    + two `/pathways/` aliases; the programme page CTA points here.
- **Answer to "which RecipeHeritageKeeper wrapper is live": neither.** The
  richer tool (RecipeHeritageKeeper) renders nowhere live.
- **Cyberstore recurring/booking/subscription listing type: none in any of
  the 4.** All one-off shapes (fixed-price via `cyberstoreData.ts`;
  licence-tier via the orphaned wizard; `RevenueSplit`% + flat
  `WallRentModel` in `revenueModels.ts`). Separate subsystem `src/marketplace/`
  has a `Service` model with `bookingType: 'instant'|'request'|'consultation-first'`
  and a sample "monthly subscription" — not routed, not one of the 4, and
  it's consultation-booking not recurring-order. **CJ's dinner-service /
  meals-to-order direction needs a genuinely new listing mode** (as the
  handoff predicted) — possible base is `src/marketplace/`'s Service layer,
  not Cyberstore's product model. Out of scope for the consolidation pass.
- Drift corrections: the "second `RecipeHeritageKeeper.module.css`" noted
  above is actually `AuntieAnansisSandbox.module.css` (byte-identical dup,
  8293 bytes, in both `components/.../` and `pages/programmes/.../`; only
  the `components/` copy is imported). Also orphaned and Kitchen-adjacent:
  the whole `src/systems/rovs/personalities/auntie-anansi/` Archivist ROV
  (+ `hooks/useAuntieAnansiArchivist.ts`, `hooks/useAuntieAnansiData.tsx`,
  `components/MayaAssistant/ArchivistROVChat.tsx`) — none wired.
- **Priority 2 is blocked on a CJ decision:** is the intended Kitchen
  sandbox the rich RecipeHeritageKeeper (identity/heritage-language/
  immigrant-journey) or the simple recipe wizard? They serve different
  purposes. The consolidation can't proceed until that's settled.
  `ww-programme-architecture.md` (which this handoff asks to update) does
  not exist in the repo.

useROVCapabilities.ts — 🟢 RESOLVED, see history section below.

WW-AUDIT-SRC-STATE-001.md (Jul 2026) — found ~249 empty files and 60
broken import paths. A later full scan (15 Aug) found 0 empty files — the
249 figure is stale/not current; do not cite it. Broken import path count
never re-verified.

*Re-verified 21 Aug 2026 (Claude Code):* empty files reconfirmed at 0
(`ww-drift-audit.sh`'s section 1, run this session: "None found" across
.ts/.tsx/.css/.scss). Broken import paths now actually checked, not just
flagged as unchecked: a full `npx tsc --noEmit -p tsconfig.json` run shows
**24** `TS2307 "Cannot find module"` errors outside node_modules — down
from 60, but real and current, not zero. Sample: `components/PageMeta.tsx`
→ `@utils/seo`, `community/chat/LiveChat.tsx` → `../wrapper/SafeReact`,
`pages/cyberstore/ListingEditorPage.tsx` → `./sandboxToStoreService`. A few
of the 24 (`@stripe/stripe-js`, `recharts`) may be missing npm packages
rather than broken source paths — not distinguished in this pass. The
"never re-verified" status on this line is now false; update accordingly.
Full list not reproduced here — available via the tsc command above if
someone picks this up as an actual cleanup task (not attempted this
session — 24 items each need individual triage, out of scope for a
verification pass).

🆕 **New finding, 21 Aug 2026 (Claude Code), not previously tracked here:**
`src/pages/CommunityShopPage.css.` — note the trailing dot in the filename.
A second, older (9 Mar vs. the real file's 23 Jun), smaller (11,960 bytes
vs. 19,184) stray CSS file sitting alongside the real
`CommunityShopPage.css`. Wouldn't have been caught by `ww-drift-audit.sh`'s
stray-file patterns (`*.bak*`/`*.old*`/etc. — a trailing dot isn't matched
by any of them). Low-stakes, easy cleanup — flagging rather than deleting
unprompted, per this session's own rule against silently removing files
without asking.

## 🔴 Governance clauses drafted, never closed

- Which Reserve Governance steward role owns partner-vetting sign-off
- Deputy sign-off authority when CJ and Judith are both unavailable
- Retroactive review scope for existing external advisors/partners

## 🔴 Source-vetting rubric + TATF — filed 3 Sept 2026, open items

`docs/research/WW-SPEC-SOURCE-VETTING-RUBRIC-001.md` (the four-test rubric,
CJ's canonical write-up) and `docs/research/WW-SPEC-THESE-ARE-THE-FACTS-001.md`
(the live/on-air correction mechanism, revised on filing) were committed.
Seven stale references to the previously-unwritten `ww-source-vetting-pipeline`
were repointed at the canonical doc. Outstanding:

1. **"Conditional pass" is defined two ways.** The rubric's §3 defines it as
   the *lineage-claim-tagging* bucket. `docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md`
   and the **shipped** `'conditional-pass'` status value in
   `src/knowledge-commons/lesson-modules/lessonModuleStore.ts` define it as the
   *usable-but-not-yet-corroborated* bucket — and that file's header says it was
   deliberately named to match the doc's wording. There is live code keyed to
   the older meaning. Needs a directors' call on which definition is canonical,
   then the loser updated in lockstep. Not resolved on filing — CJ's canonical
   text was filed verbatim.
2. **The proposed fifth source-vetting lens is not in the rubric write-up.**
   `WW-SPEC-SAFEGUARDING-STRATEGY-001.md` §9 + action item 3 and
   `src/safeguarding/SafeguardingFocus.ts:96` establish a pending fifth lens
   (domination-as-aspirational). The first formal write-up covers the original
   four tests only. Action item 3 in the safeguarding spec has been re-flagged
   as still open.
3. **Rayd-yo has no constitution document.** TATF leans on three Rayd-yo
   "constitutional" principles that exist nowhere in the repo: "the room pushes
   back" *as a live-conversation restraint standard* (distinct from its use as
   the name of rubric Test 2), the "no pay for airtime" clause, and a "formal
   right of reply" clause. TATF §3 step 4 now establishes right-of-reply itself
   rather than citing a non-existent clause. A Rayd-yo constitution doc should
   be written and all three stated in it.
4. **`ww-rights-adaptation-governance`** (referenced by TATF §5 for
   external-advisor verification standards) does not exist.
5. **Live-broadcast preconditions unverified.** TATF Track A assumes live
   Rayd-yo host+guest broadcast; §6 assumes live G-Tech Casters casting.
   Neither is confirmed as a current product in code (Rayd-yo `/raydyo` is a
   player + schedule + volunteer tools; G-Tech Casters is a teaching programme).
   Both callouts added to the spec.
6. **Fact Producer vs. Ntikuma broadcast coordinator** — overlap with
   `WW-NTIKUMA-BROADCAST-COORDINATION-DESIGN.md` / `WatershedGate.ts` not
   reconciled (TATF §7).
7. **The Pageturners "structural-parallel-vs-lineage-claim tagging template"**
   (rubric §3, §6) is a real discipline in the Balla Fasséké griot content but
   is not codified as a named standalone template. Those curator files are also
   mid-restructure and uncommitted (`git status`: `balla-fasseke-explorer-lesson-01.md`
   + `-workbook-01.md` deleted, merged into `-explorer-lesson-and-workbook-01.md`).

### Held pending CJ decision (flagged 3 Sept 2026)

Five items that need a call from CJ rather than a Claude Code action.

**Three files — repoint edits made, held uncommitted.** Each carries the
`ww-source-vetting-pipeline` → `WW-SPEC-SOURCE-VETTING-RUBRIC-001` repoint in
the working tree, but sits on top of substantial uncommitted or untracked
prior-session content that isn't part of this task. Decision needed on each:
commit in full (bringing the prior content in with it), or handle in a
separate pass.

1. `docs/research/ww-creators-code.md` — tracked; ~85 lines of uncommitted
   additions predate the ~8-line repoint.
2. `docs/research/WW-REF-SCREENWRITING-CRAFT-WILDER-001.md` — entirely
   untracked.
3. `docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md` — entirely
   untracked; its own changelog states it was "filed into the repo 28 Aug
   2026" but it never was.

**Two reconciliation questions — directors' call, not a Claude Code task.**

4. **"Conditional pass" — which definition is canonical?** `WW-SPEC-SOURCE-VETTING-RUBRIC-001`
   §3 (the lineage-claim-tagging bucket) vs. `docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md`
   and the shipped `'conditional-pass'` status value in
   `src/knowledge-commons/lesson-modules/lessonModuleStore.ts` (the
   usable-but-uncorroborated bucket). Live code is keyed to the older meaning;
   once the canonical definition is set, the loser gets updated in lockstep.
   (Same as item 1 above, surfaced here as the decision it needs.)
5. **Fact Producer vs. Ntikuma broadcast coordinator — same person, adjacent,
   or folded in?** TATF §3's Fact Producer role overlaps the broadcast-
   governance layer in `WW-NTIKUMA-BROADCAST-COORDINATION-DESIGN.md` (+
   addendum) and `src/safeguarding/WatershedGate.ts`. (Same as item 6 above.)

## 🔴 Named research left incomplete

- Cassava — still missing from the Tree Council/Fruit Grove roster
- TECHreneurs — flagged as a likely "one-way port" under the triangular-
  trade return-to-origin test. **Checked 28 Aug 2026 — verdict: confirmed
  one-way port** (see below).

*Checked 21 Aug 2026 (Claude Code):* neither "Fruit Grove" nor "Tree
Council" appears anywhere in this repo (other than this tracker file
itself) — the roster Cassava is supposedly missing from isn't in the repo
to check against. Same chat-memory-only situation as several items above.
The TECHreneurs "one-way port" check is a content/historical-analysis
question, not something resolvable by grepping code — genuinely still open,
nothing to correct or confirm from this session's pass.

*Resolved 28 Aug 2026 (Claude Code):* CJ supplied the check as
`WW-SPEC-TECHRENEURS-CASE-STUDY-PIPELINE-001` (filed at
`docs/accreditation/`). Verdict: **confirmed one-way port.** The diagnosis
holds — TECHreneurs teaches pricing but has no loop that turns its own
members' resolved pricing outcomes into case-study teaching material, the
way Roots turns member research into citable Knowledge Commons entries. The
spec proposes a fix (post-listing outcome capture → human-curated
comparative case study → TECHreneurs' missing Leader-tier badge
definition).
**Caveat, per the standing "provided ≠ verified" rule — the spec's
mechanism assumes infrastructure that is not built** (verified directly,
recorded in the spec's own "Repo reality-check" section): there is no
TECHreneurs nexus-gate ROV (`src/rovs/nexus-gates/` holds only the
Pageturners/TNB/Kaywana's Court three); no "Sourcing Brief" or "Module 2"
in the repo; no nightclub/cinema pricing case studies in TECHreneurs
content; no TECHreneurs "Keeper custodian" / ROV sign-off chain; and the
ILP "return leg" it references doesn't exist (see the creator-journey-pilot
handoff). The real Valuation Worksheet
(`src/components/valuation/ValuationWorksheetForm.tsx` +
`src/prototype-registry/types/valuation.ts`) is a personal workspace, not a
cross-programme gate. Build is blocked not just on the Cyberstore
fragmentation audit but on those upstream gaps — and that audit (done 28
Aug, see the creator-journey-pilot handoff) found the live Cyberstore
tracks **no** sale/price/time-to-sale or view/interest data at all, so the
capture source has to be built from nothing.

- `WW-SPEC-TECHRENEURS-SYLLABUS-001` (the doc the case-study spec is an
  "Addition to") does not exist in the repo — chat-memory-only, add to the
  list of specs referenced-as-real that aren't here.

*Draft/scope/build pass, 28 Aug 2026 (Claude Code):* the spec now carries
three appendices — (A) draft artefacts: the TECHreneurs domain-specific
Leader-tier badge ("Pricing Reference-Setter", drop-in for `te-leader`),
the comparative-pairing case-study format, and the two-layer consent model
mapped to fields; (B) a 6-step build-gap breakdown with sequencing (step 0
= Cyberstore reconciliation, then instrumentation → consent policy →
Keeper ROV → Module 2 teaching surface → badge-system wiring); (C) the one
thing actually built: `src/prototype-registry/types/pricingCaseStudy.ts` —
the dependency-free data model (`ListingOutcome`, `PricingErrorKind`,
`CaseStudyConsent`, `assessEligibility`, `PricingCaseStudyRecord`,
`projectedVsActual`), sibling to `valuation.ts`, scoped tsc-strict clean,
full-project tsc unchanged at 167 errors. **Not wired** — landed ahead of
wiring like `progression-map.ts`. Everything past build-gap step 0 stays
blocked.

## 🔴 Roots↔Globe↔Rayd-yo connective layer — scoped, not started

**Trigger condition:** Roots accreditation scaffold verified built (this task,
`WW-TASK-ROOTS-SYLLABUS-SIGNED-OFF`, 2026-09-10 — **DONE**) AND first KC
diaspora globe entries published (companion brief,
`WW-TASK-KC-DIASPORA-TRADE-ENTRIES` — **still open**: that brief reported back
with DRAFT-status entries only, not published; the no-auto-approve
constitutional rule means they need a directors' review before publication).

Added now with the KC-side condition still open, per the reporting instruction
(the item exists in the tracker the moment either half lands).

**Covers:**
- `cross_links` wiring from Roots deposits to relevant globe entries
  (`kc_live_entries.cross_links UUID[]`, V71 — PEER / THEMATIC relations);
- the demand-signal mechanism feeding the globe's sub-national creation
  criterion from clustered Roots member research activity — V73 gives the
  *structure* (`kc_live_entries.parent_entry_id`, the `locked` seismic-gap
  flag) but not the demand-signal rule itself (what volume of clustered
  activity proposes a new sub-national entry); until that is mechanised, the
  Roots capstone (ROOTS-3 criterion 3.3) hands the flag to Documenter /
  Archivist review by hand;
- a Rayd-yo intake point pulling from both Roots deposits and globe entries as
  raw material for produced broadcast content.

**Roots-side status:** `docs/accreditation/WW-SPEC-ROOTS-SYLLABUS-001.md` +
`accreditation/programmes/roots/{unit-mapping,assessment-criteria,evidence-requirements}.md`
built on branch `feat/roots-accreditation` (2026-09-10). Flag carried in that
work: the signed-off syllabus is the *archival-research* strand of Roots
(Walker / Schomburg, `WW-RESEARCH-ELEMENT-BY-PROGRAMME.md` DEMONSTRATED); the
live Roots codebase is Judith Fontanelle's *body-sovereignty / hair-science*
strand — how the two share one badge / host / tier ladder is unresolved and
needs CJ.

## 🟢 ROV naming collision — FULLY RESOLVED (final state)

Independently flagged 4+ sessions before being properly resolved 15 Aug
2026. Canonical system: 12 Children of Anansi (children.ts/newChildren.ts),
3 clusters — Makers: Anansewa/Kofi/Afua/Adaeze/Kumi (5); Keepers:
Kweku/Yaw/Esi/Ntikuma (4); Community: Osei/Akua/Nyame (3). Nora is NOT a
real Child — a proposal, never coded. rov/index.ts rewritten as a genuine
re-export layer; the old ROV_FAMILY_ALIASES mechanism (Solomon/Neville/
Maxine/Esther/Tariq) confirmed dead and removed as a mechanism. ROVsPage.tsx
rewritten to render the real 12 in their 3 clusters. Routing closed for all
three founding programmes: G-Tech Casters→Kumi, Roots→Esi, Bright
Sparks→Maya directly. ROVCapabilities.ts's 9 functional-capability IDs
confirmed non-competing (Children = WHO Maya routes to, capability ROVs =
WHAT activates within that interaction — "Maya as conductor"). Remaining
real task: wire the conducting logic into rovPromptBuilder.ts (Maya
currently only touches the identity layer, never the capability catalog) —
scoped future build item.

⚠️ **CORRECTION — 21 Aug 2026 drift audit, not yet reconciled into the
paragraph above.** The "confirmed dead and removed" line is only true of
the narrow resolveROVAlias()/ROV_FAMILY_ALIASES mechanism in rov/index.ts.
It does not cover a separate, live system: src/services/rovs/ROVRegistry.ts
defines Solomon/Neville/Maxine/Esther/Tariq as full persona objects with
real dialogue, actively imported by CreatorSpaceTemplate.tsx, two
useROVContext.ts hooks, and greetingService.ts. Separately, PathfinderROV.tsx
is "Neville" as a full component (NevilleMode, useNeville()), imported into
SimulatorsPage.tsx, YourJourneyPage.tsx, STEMgeneersPage.tsx, and the Maya
routing layer. This is a genuine 4th/5th ROV naming scheme, not accounted
for above, and the "retired 15 Aug 2026" claim in CLAUDE.md is currently
wrong as written. Also unresolved: whether "Nora" (found live in
AtelierROV.tsx and RosemaryWeaverROV.tsx as "12th child") contradicts the
12-Children canon above — not yet checked against newChildren.ts directly.
This is the single highest-priority item in this whole file — it sits
under a "RESOLVED" heading that isn't actually accurate, which is exactly
the failure mode this tracker exists to catch.

✅ **CORRECTION — 21 Aug 2026, part of the correction above resolved by CJ
reading PathfinderROV.tsx's actual source in full.** The STEMgeneers/
Neville half of the correction above is **not a bug** and does not need
fixing. `PathfinderROV.tsx`'s own header comment documents a deliberate
merge: the original generic PathfinderROV (pathway navigation) + STEMSage
(repair diagnosis coaching) + SmithROV (fabrication guidance), unified into
one persona — Neville — spanning STEMgeneers/TECHreneurs/Scrap Cat via a
mode switcher, with exports deliberately kept backward-compatible with the
original PathfinderROV import path specifically so it would drop into
existing call sites without breaking anything. It's wired into real live
infrastructure with no Kofi-side equivalent: `useJournalStore`,
`usePendingVerificationId`, `useGateRequirements`, `useSTEMgeneersStats`,
`RepairLayer` types — skill-gate scoring, verification-response assessment,
live stats. This is decision shape **B** from the scoped investigation — a
genuinely different, functional purpose (technical coaching: repair
diagnosis + verification + gate progress) that legitimately coexists with
Kofi's identity/routing role — not shape A (stale system to retire). Do
NOT revert STEMgeneersPage.tsx to Kofi; nothing in code needs to change
here.

Routing-table description updated accordingly: STEMgeneers legitimately
has **both** Kofi (identity layer, per children.ts's `ChildByProgramme`
mapping — *but, checked directly, `STEMgeneersPage.tsx` itself currently
has zero Kofi/children.ts code of any kind; this check was scoped to that
one page, not every STEMgeneers-adjacent route, so "Kofi live somewhere
else in the STEMgeneers experience" is untested, not ruled out*) and
Neville (technical-coaching layer, confirmed live and functional, per
above). Whether a page with a fully working technical coach but no
identity-layer persona actually present is a problem worth flagging on its
own, or fine as designed (technical coaching and identity-greeting may
simply be different concerns that don't both need to fire on every page) —
**left open, genuinely unclear, not assumed either way.**

The other two PathfinderROV "importers" stay closed, unchanged: SimulatorsPage.tsx
and YourJourneyPage.tsx are cosmetic text badges only (no real import), and
`invokePathfinderROV()` has zero callers anywhere in `src/` — both already
confirmed inert, nothing further to do.

⚠️ **CORRECTION — 22 Aug 2026, audit-sync + CJ's direct design account.** The
"Routing closed for all three founding programmes: G-Tech Casters→Kumi,
Roots→Esi, Bright Sparks→Maya directly" line above does not hold for G-Tech
Casters. Checked directly against Kumi's own character block
(`children.ts:1331-1344`): her own stated programme is `'TECHreneurs'` (+
Casting Table) — nothing there supports G-Tech Casters. A same-session
compile-error fix independently tried assigning `gtechcasters` to Ntikuma
instead, which is *also* wrong: Ntikuma's own character block
(`children.ts:309-352` — "The Watcher," cover identity "the postman,"
already fully written) explicitly states `programme: 'Joystick'`, and
`'joystick': Ntikuma` was already correctly present in `ChildByProgramme`
beforehand — the gtechcasters addition just duplicated him onto a second,
unsupported programme.

The real reason neither guess held: per CJ's own account, G-Tech Casters
was originally planned as an external commercial arm, then folded
internally to become **Kaywana's Court's broadcast division** for WW's own
events, coordinated by **Ntikuma** across G-Tech Casters, Kaywana's Court,
Rayd-yo, and Joystick simultaneously — reporting to Maya's "conductor"
role ("like a central orchestra unit, similar to the brass section"), via
roles called "passionistas and connoisseurs." This is a genuine
cross-programme coordination function, not a single-programme ownership —
`ChildByProgramme`'s one-key-one-Child shape cannot represent it as-is.

Checked against live code: G-Tech Casters still has a fully standalone
route tree (`/programmes/gtechcasters`, `/pathways/gtech-casters`, its own
sandbox) — the internal fold-in is not reflected in routing. The one real,
live echo of it: `kaywanas-court/sandbox.tsx:80-88` already lists G-Tech
Casters as a documentation/broadcast collaborator for Kaywana's Court
productions. No code anywhere represents "passionistas and connoisseurs"
as CJ describes them — that exact wording exists in the codebase only as
an unrelated concept (the Connoisseurs Club / Passionistas Fan Club
community-belonging clubs, a naming collision, not the same idea).

`gtechcasters` has been removed from `ChildByProgramme` and left
intentionally open (same treatment as `bright-sparks`) pending a real
design decision on how to represent Ntikuma's coordinator role — options
range from leaving him out of this lookup table entirely (representing
coordination through a different mechanism) to changing the table's shape
to allow an "owns" vs. "coordinates across" distinction. Not resolved here
— scoped as future design work, not a data-entry fix.

**Update, same session:** CJ chose the second option. `children.ts` now has
`CoordinatorsByProgramme: Record<string, ChildPersonality[]>`, populated
with `Ntikuma` for `gtechcasters`, `kaywanas-court`, `rayd-yo`, and
`joystick` — a relationship table only, recording who coordinates where.
What the coordination function actually does day-to-day (how it serves
each program's broadcast needs, the passionista/connoisseur role split,
whether/how it surfaces on WW's calendar via `data/programmeSchedule.ts`)
is still fully open — not designed, not scoped, not started.

**Superseded, 22 Aug 2026 — this entry is now history, not the live
source.** `docs/research/WW-CANONICAL-ROSTER.md` was created as the single
canonical source of truth for the 12 Children and their programme mapping,
specifically so this kind of multi-source drift (this tracker, two old chat
mappings, and a same-session code edit each independently claiming to be
authoritative) can't recur. This entry stays as the record of *how* the
Ntikuma/G-Tech Casters conflict happened and got resolved, but the roster
file is what to check and update going forward — see CLAUDE.md's Core
Discipline #7. One more correction folded in during that file's creation:
`silk-stilettos` also had a stale entry (`Anansewa`, flagged at the time as
"weakest of these three, unconfirmed") that contradicted Adaeze's own file;
fixed in the same pass — see the canonical roster's Fix log.

`Roots→Esi` and the (not part of the original three, added same session)
`money-reset→Kumi` and `silk-stilettos→Anansewa` additions were checked
against each Child's own file and found *not contradicted* — Esi's own
programme is Knowledge Commons but she already covered a second programme
(Auntie Anansi's Kitchen) before this session, so a third fits the file's
own established convention; Kumi's TECHreneurs pairs thematically with
Money Reset's business-track framing; Anansewa's Kaywana's Court is
performance-specific and Silk Stilettos is broader, making this the
weakest of the three. None of these three is *confirmed* by any
authoritative source — "not contradicted" is not the same claim as
"correct" — but none was disproven either, so all three remain in the
table pending anything that actually checks them.

## 🟢 Esi-vs-Maya in Kitchen — RESOLVED (voice fix still pending)

ww-cast-roster.md (25 Jul, dated after the correction that moved Esi to
Knowledge Commons) confirms Esi returned to Kitchen — she is Kitchen's
host (`ww-cast-roster.md:110`: "Esi — Auntie Anansi's Kitchen, heritage
and recipes"). Live RecipeHeritageKeeper.tsx code (still uses Maya's voice)
is the outdated piece — separate follow-up task to update it, not blocking
KitchenROV.tsx.

*Checked 28 Aug 2026 (Claude Code):* Maya's voice in Kitchen-scoped code is
confined to **`RecipeHeritageKeeper.tsx`** — `getMayaMessage()`,
`styles.mayaShepherd`/`mayaIcon`/`mayaMessage`, the `// MAYA MESSAGES
(Soul-Guided)` block, and two `{/* Maya Guide */}` render sites (lines
~367, ~765, ~1532). The two wrapper files only pass `showMaya={false}`
(not a voice issue). `src/systems/rovs/personalities/auntie-anansi/`
mentions Maya only in comments as a handoff target; its persona is "Auntie
Anansi." **Important caveat for whoever does the fix:** `RecipeHeritageKeeper.tsx`
is currently **orphaned** (rendered by no live route — see the Kitchen
fragmentation entry above). If CJ's Priority 2 decision is that the simple
recipe wizard (`AuntieAnansisKitchenSandbox.tsx`, which has no persona
voice at all) is the intended Kitchen sandbox, this voice fix becomes moot.
Don't do the Maya→Esi pass until the "which tool is the Kitchen sandbox"
decision is made.

## 🟢 citationStore.ts — RESOLVED

Canonical path: src/knowledge-commons/citation/citationStore.ts. Frontend
cache/display layer in front of the KcResearchDeposit backend entity — both
needed, neither replaces the other. Built in mayaStore.ts's domain-grouped
hook style (codebase has no single uniform store pattern — confirmed by
direct comparison against journalStore.ts). KcResearchDeposit's backend
write-side remains a separate, still-open task.

## 🟢 useROVCapabilities.ts — RESOLVED

Was flagged "empty" twice; actually 635 bytes, built-but-unverified. Import
path confirmed correct against the full src tree. Real mismatch found and
fixed: hook called .canFullyAutomate()/.needsHumanApproval(), neither of
which exist on the real ROVCapabilities.ts service (real methods:
getForROV, getByCategory, canHandle) — would have thrown at runtime. Hook
rewritten to match real exports. If an automation-level distinction is
genuinely needed later, that requires adding a field to ROVCapability
first — separate task, not started.

## 🟢 Curator roster — RESOLVED, all 14 programmes locked

Full roster in ww-programme-curators-roster.md. Sandbox-verification
completed 21 Aug (Claude Code). Real open items:

- 9 of 14 programmes still lack tutoring-focus specs: G-Tech Casters,
  Rayd-yo, Roots, Silk Stilettos, Auntie Anansi's Kitchen, TECHreneurs,
  Scrap Cat, Easy Street, Joystick — chat-side drafting work.
- Course content build-out (lessons/workbooks) — 2 of 26 curators have
  Explorer-tier content built (Balla Fasséké, Coxsone Dodd); Builder/
  Innovator/Leader tiers for even these two are undone; other 24 curators
  not started. Templates + stress-test findings in
  ww-curator-tutoring-focus.md.

🔴 Flagged, not resolved: the fill-in-the-blank workbook format that works
for craft-based technique (Fasséké) doesn't transfer to relationship-based
technique (Dodd) — no private-practice equivalent exists for "recognising
raw talent." Needs an observation-log/structured-reflection format instead,
bridging to the same written-account evidence method used in Dodd's lesson.

⚠️ **CORRECTION — 23 Aug 2026 (Claude Code).** Both files cited above,
`ww-programme-curators-roster.md` and `ww-curator-tutoring-focus.md`,
were searched for directly and confirmed **absent from the repo** —
chat-memory-only references, same class of finding as several others in
this tracker. "RESOLVED, all 14 programmes locked" describes a decision
made in chat, not a file anyone (human or Claude Code) can currently open
and check.

A real file now exists at `docs/curator-content/WW-PROGRAMME-CURATORS-ROSTER.md`
(created 23 Aug 2026, landing the seven-curator Diversity Initiative
additions from 21 Aug 2026) — but it is an honestly partial start, not
the full 14-programme roster this heading claims: it covers 6 programmes'
new co-tutor additions plus one new Trubble n Bass genre slot, names the
pre-existing locked curator each sits beside, but does not contain those
pre-existing curators' own full entries (not supplied, not found
elsewhere in the repo except Balla Fasséké and Demodocus, both
independently corroborated by real content/handoff-doc references — see
that file's own "Repo cross-check" notes per entry for exactly what could
and couldn't be verified). If/when the fuller roster content is
available, merge it into that file rather than creating a third,
separately-authoritative one.

## 🟡 TNB-2.4 mentorship/development evidence mechanism

Root cause (found 21 Aug): no generic cross-programme mentorship/
development-log mechanism existed — the 20 Aug claim that this was
"verified via the platform's existing peer-witness requirement… platform-
wide" was false; the real mechanism (witnessRepair()/RepairVerification)
was Scrap-Cat-repair-specific only. Affects Dodd, Dorothy Vaughan, Noel
Pointer, and ~9 of 19 TNB genre curators (Soul, Calypso, Funk-partial,
Rock, R&B, Hip-Hop, Jungle, UK Garage, Highlife, Afrobeat, Afrobeats). Also
found not to exist anywhere in code: "Skunkworks"/"Crew Log" as cited by
TNB accreditation docs for cross-skill rotation (ImpactLabsChallenges.tsx
is an unrelated ethics-dilemma tool). Charles Drew's Kitchen mapping is
thematic-only mismatch, not a missing mechanism (real sandbox is oral-
history documentation, not experimental food science).

Fix implemented 21 Aug 2026 (scoped, approved, built, type-checked clean):
renamed RepairVerification→EvidenceVerification, added DevelopmentEvidence
type (sibling to RepairEvidence, developedMemberConfirmation as the one
genuinely new field), added store actions (submitDevelopmentEvidence/
witnessDevelopment/confirmByDevelopedMember + 2 getters), built
DevelopmentWitnessForm.tsx+.css. BadgeProgress.tsx's separate model
deliberately left untouched (open product question).

🔴 Honest boundary — not yet done: infrastructure only, no integration.
Nothing in the live app calls submitDevelopmentEvidence() yet; no page
exists for a member to log a development record on any programme. Do not
mark Dodd/Vaughan/Pointer's Builder+ tiers as closed until that integration
UI is built and re-verified — this is the exact mistake the original false
"closed" claim made.

## 🟡 accreditation/ vs accreditation-full/ vs src/accreditation/

src/accreditation/ holds only badge-system/, apprenticeship-pathways/,
ocn-qualifications/ — no programmes/ subdirectory. Root-level
accreditation/programmes/ is the only location with a real programmes
substructure — correct (if inconsistent) home for per-programme docs.
Trubble n Bass's unit-mapping/assessment-criteria/evidence-requirements
are real and complete there, matching G-Tech Casters' pattern.

accreditation/ and accreditation-full/ were wrongly concluded to be near-
duplicates based on directory-structure comparison alone — they diverged
in content. accreditation-full/badge-system/progression-map.ts is
genuinely real, functional TypeScript (proper interfaces, real exported
pathway constants for 4 of 13 programmes, labelled "Phase 2," abandoned
mid-build) vs. accreditation/'s markdown-in-a-comment version. Plan
confirmed, not yet executed: port the real interface structure into
src/accreditation/badge-system/progression-map.ts (the actual live-import
location, currently an empty stub) as the base, add a Trubble n Bass entry
on the same shape, separately pull in the markdown file's still-useful
55/25/20 revenue split logic rather than discarding it.

🟢 Resolved 21 Aug (Claude Code): progression-map.ts landed for real, 662
lines, scoped tsc clean, not yet imported anywhere live (safe to land
without disturbing anything else).

*Still true 28 Aug 2026, and wider than just this file:* nothing in `src/`
imports anything from `src/accreditation/badge-system/` at all —
`progression-map.ts`, `badge-definitions.ts` (which does contain real
`SILK_STILETTOS_BADGES`), and `verification-system.ts` are all orphaned;
`index.ts` is a `// Stub — pending implementation` / `export {}`. Building
a `SILK_STILETTOS_PATHWAY` on the same interface is straightforward, but it
would land in a module tree that renders nowhere — the missing piece is a
consumer (a real badge/pathway UI), not more pathway constants. Note also:
Silk Stilettos has no real accredited units to build the pathway *from*
(its `accreditation/programmes/silk-stilettos/` is a stub), unlike Trubble
n Bass which was ported from real units.

Still confirmed false, needs re-checking against any newer claims: the 19
Aug "10 programmes reformatted" zip never actually landed — only the
original 6 (kaywanas-court, techreneurs, stemgineers, g-tech-casters,
scrap-cat, silk-stilettos) exist in either location. Roots, Auntie Anansi's
Kitchen, Pageturners, Rayd-yo confirmed absent from both.

*Re-checked 21 Aug 2026 (Claude Code):* `accreditation/programmes/` now
has 7 (the original 6 + trubble-n-bass, added earlier this same session).
`accreditation-full/programmes/` still has only the original 6 —
trubble-n-bass wasn't ported there (consistent with it being the abandoned
"Phase 2" stub, not the live target). Still 7 total, not 10 — Roots,
Auntie Anansi's Kitchen, Pageturners, and Rayd-yo remain confirmed absent
from both. The "19 Aug zip" claim stays false; the baseline count moves
from 6 to 7 to reflect this session's own real work, not the zip.

*Corrected 22 Aug 2026 (Claude Code, audit-sync):* the `accreditation/programmes/stemgineers` folder named above has been renamed to `accreditation/programmes/stemgeneers`, matching the canonical spelling the 21 Aug session already established for `progression-map.ts` (`stemgeneers`/`STEMgeneers`, 118 occurrences vs. 33 for `-ineers` at the time). The same minority spelling was found still live in 11 more files across the app — including a real functional bug in `src/pages/CreatorFactoryPage.tsx`, whose creator-quiz used `'stemgineers'` as its own matching id while linking to the real `/programmes/stemgeneers` route, meaning the quiz could never actually match its own STEMgeneers recommendation against anything else in the app. All 11 files corrected to the canonical spelling in the same pass.

## 🔵 Parked deliberately

WW-SPEC-VISITOR-JOURNEY-ENGAGEMENT-001.md (two-layer engagement model,
side-quest layer, spiral-curriculum pedagogy, behavioural guardrails) —
CJ's call: current build gaps take priority. Not a scheduled future phase —
pull elements in opportunistically if they fit whatever's actively being
built, don't bolt the whole spec on later as one block.

## Process notes (why this file exists)

Adopted 15 Aug 2026: stubs/in-progress files whose design decision lives
only in a past chat session, never logged here, get missed on later
sweeps. (1) This tracker is the mandatory first check before touching any
stub. (2) When a stub's purpose isn't tracked here, search past
conversations before assuming from the filename. (3) Log the finding here
immediately, even if the underlying question is still open — an open
question on record beats a silent gap.

Extends 21 Aug 2026, post drift-audit: the same failure mode can happen the
other direction too — a claim gets marked 🟢 RESOLVED here, and a later
structural fact contradicts it, but the correction sits unmerged in
chat/audit output instead of being folded back into this file. The ROV
naming collision entry above is the live example. Going forward: when
ww-drift-audit.sh or a Claude Code session finds something that contradicts
a 🟢 entry, don't just report it — fold the correction into this file in
the same session, the way the correction block above was written, rather
than leaving two contradictory records to be reconciled "later."
