# WW-SPEC-TECHRENEURS-CASE-STUDY-PIPELINE-001

**Addition to:** WW-SPEC-TECHRENEURS-SYLLABUS-001
**Status:** Spec locked (as authored). Build blocked — see dependency section, plus the
repo reality-check below, which the standing "provided ≠ verified" rule requires before
this is treated as settled.

---

## Placement note (28 Aug 2026, Claude Code)

Filed at `docs/accreditation/WW-SPEC-TECHRENEURS-CASE-STUDY-PIPELINE-001.md`. The only
other `WW-SPEC-*` doc in the repo is `docs/safeguarding/WW-SPEC-SAFEGUARDING-STRATEGY-001.md`,
co-located with its domain; there is no `docs/specs/` convention. This is a
syllabus/badge-tier spec, so it sits with the other accreditation-thread docs
(`docs/accreditation/`). **`WW-SPEC-TECHRENEURS-SYLLABUS-001`, the doc this is an
"Addition to", does not exist anywhere in the repo** — it is a chat-memory-only
reference, the same pattern flagged repeatedly in `docs/WW-OUTSTANDING-TASKS.md`. If the
syllabus is later supplied, this addition should be merged into or cross-linked from it.

---

## Repo reality-check (28 Aug 2026, Claude Code)

The spec's *conclusion* — that TECHreneurs fails the return-to-origin test because member
pricing outcomes never feed back into its teaching material — is a legitimate
content/historical-analysis finding, and it is the check that
`docs/WW-OUTSTANDING-TASKS.md` had flagged as "never actually checked." That much is
sound and is recorded in the tracker.

But several of the spec's load-bearing premises describe infrastructure that **is not
built**, and the spec presents them as existing ("that outbound leg is solid", "per the
existing ROV sign-off chain"). Checked directly:

| Spec claim | Repo reality (28 Aug 2026) |
|---|---|
| "TECHreneurs is a Nexus gate — every sellable output from Scrap Cat, Silk Stilettos, Auntie Anansi's Kitchen … routes through its pricing discipline" | **Not built as a gate.** `src/rovs/nexus-gates/` contains exactly three ROVs — `ManuscriptAnalysisROV` (Pageturners), `AudioQualityCheckROV` (Trubble n Bass), `StagingReadinessROV` (Kaywana's Court). There is **no TECHreneurs nexus-gate ROV**, and no code routes other programmes' outputs through a mandatory TECHreneurs valuation step. The tracker consistently names three nexus gates and does not include TECHreneurs. |
| "Valuation Worksheet, Sourcing Brief, Module 2 listing copy" | **Partially real.** A real Valuation Worksheet exists: `src/components/valuation/ValuationWorksheetForm.tsx` + `src/prototype-registry/types/valuation.ts` (`ValuationArchitectureRecord` — worksheet status, `valuationClaim`, `floorPrice`, `comparables`, self/peer assessment scores). It is used by `VentureBuilder.tsx` (the TECHreneurs sandbox) and ~9 other pages — but as a **personal workspace keyed to a `prototypeId`**, not a cross-programme gate. **"Sourcing Brief" and "Module 2 listing copy" were not found anywhere in the repo.** |
| "teaches pricing exclusively from external case studies (the nightclub hierarchy-pricing collapse, the cinema loss-leading model)" | **Not found.** Neither case study appears in TECHreneurs code, `tutorials.techreneurs.ts`, or curator content. What TECHreneurs actually teaches on pricing: `tutorials.techreneurs.ts`'s "Pricing & Sales" pathway ("Value vs Time Pricing", market-rate research) and `VentureBuilder.tsx`'s unit-price + 55/25/20 calculator with a "Pricing Set" milestone. The nightclub/cinema comparative case studies are a chat-memory reference. |
| "the individual creator gets a return leg too, via the ILP/Pardner projection-vs-outcome review" | **The ILP page does not exist** (see `WW-SESSION-HANDOFF-2026-08-28-CREATOR-JOURNEY-PILOT.md` — no routed ILP page, no `ILPService`, no ILP backend). This "return leg" is also aspirational. |
| "TECHreneurs' Keeper custodian (per the existing ROV sign-off chain)" | **No TECHreneurs Keeper/curator ROV or sign-off chain found.** TECHreneurs' named curators (`docs/curator-content/WW-PROGRAMME-CURATORS-ROSTER.md`) are Madam C.J. Walker (locked, uncorroborated) + Marcus Garvey (added 21 Aug). No "Keeper custodian" role specific to TECHreneurs exists in code. |
| "the same shape as Elijah McCoy's 'technique becomes reference material' … or Charles Drew's preservation-technique reference-material tier" | **Weak precedents.** `WW-Curator-Course-Content-Templates.md` cites "Elijah McCoy's Skunkworks gap" as an example of a **REAL TOOL build gap that was caught** (a lesson pointing at something that didn't exist) — not a working model. Charles Drew's Kitchen/preservation-science mapping was flagged across the 21 Aug handoffs as a "thematic-only mismatch / wrong sandbox entirely." Neither is a clean established Leader-tier template to build on. |
| "the same two-layer model already policy-ready for KC deployment" | **Accurate as "policy-ready", not as policy.** `docs/WW-OUTSTANDING-TASKS.md` lists the KC commercial-use two-layer consent model under "🔴 Researched, ready for CJ's decision as Director" — a recommendation awaiting the Director's call, not enacted policy. |
| "any market-signal data Cyberstore tracks (views/interest, if available)" | **Cyberstore tracks none.** Per the creator-journey-pilot audit (28 Aug), the only live Cyberstore surface (`CommunityShopPage`) is a browse-only fixed-price catalogue with no cart, order, checkout, backend, or view/interest instrumentation. There is currently no "did it sell, at what price, after how long" data anywhere to capture. |
| Roots "passes this test cleanly — a member's verified research becomes a citable Knowledge Commons entry" | **Consistent with the repo.** The Knowledge Commons + Research-Vessel work (see `docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md`, `WW-OPEN-INVESTIGATIONS.md`, and the new `/investigations` surface) does implement exactly this return loop for Roots-adjacent research. The contrast the spec draws is fair. |
| "the constitutional no-auto-approval clause governs every nexus gate" | **Real.** The no-auto-approval clause appears in `src/safeguarding/SafeguardingFocus.ts`, `src/pages/GovernancePage.tsx`, `docs/safeguarding/WW-SPEC-SAFEGUARDING-STRATEGY-001.md`, and all three nexus-gate ROVs. |
| "the Equiano Principle" | **Real, referenced concept** — ~10 files including `GovernancePage.tsx`, `WhatYouBuildPage.tsx`, `ImpactPage.tsx`, and the Knowledge Commons components. |

**Net:** the spec's *diagnosis* (no programme-level return loop for TECHreneurs) is valid
and worth recording. The spec's *mechanism* is written as though it plugs into an
existing TECHreneurs nexus gate, ROV sign-off chain, module structure, external
case-study library, and ILP return leg — **none of which are built**. Treat this as a
design proposal that also implies several upstream build gaps, not a spec that only
needs the Cyberstore audit before implementation. The dependency list below is
necessary but not sufficient.

---

## Spec as authored

### Problem this resolves

TECHreneurs was flagged in `ww-outstanding-tasks.md` as a likely "one-way port" under the
platform's own triangular-trade return-to-origin test — never actually checked until now.
Verdict: confirmed, with a specific mechanism, not just a general gap.

TECHreneurs is a Nexus gate — every sellable output from Scrap Cat, Silk Stilettos,
Auntie Anansi's Kitchen, and others routes through its pricing discipline (Valuation
Worksheet, Sourcing Brief, Module 2 listing copy) before reaching market. That outbound
leg is solid. The individual creator gets a return leg too, via the ILP/Pardner
projection-vs-outcome review. What's missing is the programme-level return: nothing takes
the aggregate of real member pricing outcomes and feeds it back into TECHreneurs' own
teaching material. The programme currently teaches pricing exclusively from external case
studies (the nightclub hierarchy-pricing collapse, the cinema loss-leading model) while
sitting on top of a growing body of its own members' real, resolved pricing decisions
that never become case-study content. Compare to Roots, which passes this test cleanly —
a member's verified research becomes a citable Knowledge Commons entry that enriches the
shared archive for everyone after them. TECHreneurs has no equivalent loop.

### The mechanism: post-listing outcome capture → curated case study

#### Trigger states (three, not one)

A listing resolving is the trigger point. Three states, in increasing order of teaching
value:

1. **Sold at/near asking price** — lighter capture. Confirms the pricing model held;
   useful as a baseline example but not the richest teaching material.
2. **Sold after markdown** — richer capture: original price, markdown steps taken,
   time-to-sale at each step, what the creator changed and why.
3. **Withdrawn / never sold** — richest capture, and the priority case. This is where
   pricing reasoning actually gets exposed — positioning error, margin-structure error
   (echoing the cinema case's core lesson: priced the visible thing instead of finding
   where the real margin sits), wrong venue for a good product. Failure-as-teaching-material
   is already TECHreneurs' house style (the nightclub case is a real collapse, not a
   success story) — this formalises that instinct into the pipeline rather than
   introducing a new principle.

Capture for state 3 should include: full pricing rationale at listing time, any
market-signal data Cyberstore tracks (views/interest, if available), and the member's
own retrospective on what they'd change.

### Consent model — extends the Equiano Principle, does not invent a new one

A member's commercial outcome is the same sensitivity class as a Knowledge Commons
deposit. This pipeline uses the same two-layer model already policy-ready for KC
deployment: deposit-level license (does the outcome record exist at all) + separate
explicit member opt-in/out for WW's own commercial/teaching use of it. A resolved listing
does not automatically become teaching material — it becomes eligible, pending the same
opt-in WW already asks for elsewhere. No bespoke TECHreneurs-only consent flow.

### Curation gate — human, not automated

The platform's constitutional no-auto-approval clause governs every nexus gate; this
pipeline does not get an exception. Raw outcome data does not publish itself. TECHreneurs'
Keeper custodian (per the existing ROV sign-off chain) curates each eligible outcome into
the same comparative-pairing format the nightclub/cinema material already uses — pull the
pattern out, don't publish raw numbers. This is a real editorial step, not a formality:
the value is in the pattern extraction, matching how the existing external case studies
are presented as a paired comparison rather than isolated data points.

### Badge-tier placement — the missing Leader-tier capstone

TECHreneurs' curator-tutoring-focus spec (per-curator technique/badge-tier mapping) is
one of the 9 programmes still outstanding. This pipeline supplies its natural Leader-tier
definition: a member's own resolved pricing decision, curated into a comparative case
study that future TECHreneurs members learn from — the same shape as Elijah McCoy's
"technique becomes reference material" or Charles Drew's preservation-technique
reference-material tier, applied to TECHreneurs' own domain (pricing/valuation reasoning)
instead of a craft technique. Explorer/Builder/Innovator tiers are unaffected by this
addition; only Leader tier gains a concrete, non-generic definition it currently lacks.

### Dependency — stated explicitly, not discovered later

This cannot be built as automated capture until Cyberstore's 4-way fragmentation
(production-hub wizard / studio storefront / creatorJourney-Judith adapter /
CommunityShopPage) is resolved — "did it sell, at what price, after how long" cannot be
systematically logged while that data lives across four unreconciled implementations. The
Priority 1 audit already queued in `WW-SESSION-HANDOFF-2026-08-28-CREATOR-JOURNEY-PILOT.md`
(Silk Stilettos + Rayd-yo pilot) answers the "which Cyberstore implementation is actually
live" question as a side effect — this is a real ordering dependency, not new work. This
pipeline should not be built ahead of that audit's findings.

*(Claude Code, 28 Aug 2026: that audit is now done — see the handoff's Findings Log.
Answer: only `CommunityShopPage` is live, it is a browse-only fixed-price catalogue with
no cart/order/checkout/backend and **no view or interest tracking**. So the "market-signal
data (views/interest, if available)" the spec hopes for does not exist, and neither does
any sale/price/time-to-sale record. The dependency is not merely "reconcile the four" —
it is "build listing-outcome instrumentation that currently exists nowhere.")*

### Explicitly out of scope for this spec

- Building any Cyberstore instrumentation itself (depends on the fragmentation audit above)
- Manual/interim capture as a stopgap before automation — not recommended; better to wait
  for one real data source than build against a source likely to be reconciled away
- The Explorer/Builder/Innovator tier definitions for TECHreneurs (separate,
  already-scoped curator-tutoring-focus work)

### Status

Spec locked. Build blocked on the Cyberstore fragmentation audit resolving which
implementation is canonical — **and, per the reality-check above, on the TECHreneurs
nexus gate, Keeper/ROV sign-off chain, module structure, external case-study library, and
ILP return leg actually being built, none of which currently are.**

---

# Appendix A — Draft deliverables (28 Aug 2026, Claude Code)

Produced on the instruction "draft, scope, and build." These are the concrete artefacts
the spec implies but does not itself contain. They are drafts held in this doc, not
changes to live code (the target modules — `badge-definitions.ts`, the curator-tutoring
spec — are either orphaned or don't exist; see Appendix B). The one thing genuinely built
is the data model — see Appendix C.

## A1 — TECHreneurs Leader-tier badge definition

The current `te-leader` badge in `src/accreditation/badge-system/badge-definitions.ts`
("Business Leader" — *Pitch at PitchFest / Mentor 3 / £500+ revenue*) is generic
scaling-and-mentoring. It is not wrong, but it is the same shape every programme's Leader
badge has. This pipeline supplies TECHreneurs' **domain-specific** Leader capstone:
authoring a pricing case study from your own resolved listing outcome — the same shape as
"a craft technique becomes reference material," applied to pricing/valuation reasoning.

Drop-in replacement (or a fifth `te-leader-capstone` badge, if the generic one is kept
for the mentoring track):

```ts
{
  id: 'te-leader',
  name: 'Pricing Reference-Setter',
  level: 'leader',
  programme: 'TECHreneurs',
  programmeEmoji: '💰',
  description:
    'Turn your own resolved pricing decision into reference material future ' +
    'TECHreneurs members learn from.',
  requirements: [
    'Take one of your own works through the full Valuation Worksheet and list it',
    'Record the listing outcome when it resolves (sold at ask / sold after markdown / withdrawn)',
    'For a withdrawn or marked-down outcome: complete the pricing retrospective',
    'Give two-layer consent for teaching use of the outcome record',
    'Work with the TECHreneurs Keeper to curate it into the comparative-pairing format',
    'Co-author the published case study and its one-line lesson',
  ],
  evidenceTypes: [
    'Completed Valuation Worksheet (projection)',
    'Listing Outcome record (actual)',
    'Pricing retrospective',
    'Two-layer consent record',
    'Published comparative case study (co-authored with the Keeper)',
    'Curator sign-off',
  ],
  credits: 12,
  glh: 90,
  ocnUnits: ['BE-L3-01', 'BE-L3-02', 'BE-L3-03'],
  unlocks: [],
  membershipAlignment: 'curator',
}
```

Notes:
- Explorer/Builder/Innovator are untouched — that mapping is the separate,
  already-scoped curator-tutoring-focus work.
- The OCN unit codes (`BE-L3-*`) are placeholders — the real Level 3 Business Enterprise
  unit references need confirming against the OCN spec when that work is done.
- "Pricing Reference-Setter" is a working name; the roster owner should confirm it fits
  the TECHreneurs curator voice (Madam C.J. Walker / Marcus Garvey).

## A2 — Comparative-pairing case-study format

The external case studies (nightclub hierarchy-pricing collapse; cinema loss-leading
model) are presented as a **paired comparison** — two cases set against each other on one
axis of contrast — not as isolated data points. Member-sourced case studies use the same
shape. Each published case study is:

| Element | What it is |
|---|---|
| **Title** | Names the tension, not the product. e.g. "Priced the object, not the room." |
| **Comparative thesis** | One sentence: the axis the two panels contrast on. |
| **Panel A / Panel B** | One member outcome each. Per panel: the pattern the curator extracted (the teaching content — *not* the raw numbers), the primary pricing error, and a one-line lesson. |
| **Projected vs actual** | The delta between the Valuation Worksheet's claim/floor and what the market did — the analytical core. |
| **Carry-forward lesson** | The single thing a future member should take. |

The curator's job is **pattern extraction**. Raw prices, dates, and the member's identity
(unless consented as `named`) do not appear in the published form. The pairing is
mandatory — a single outcome waits until a contrasting one exists.

Priority pairing: a `withdrawn` outcome (richest) against a `sold-at-ask` outcome
(baseline) of a *similar* work — the contrast that most clearly exposes what the pricing
reasoning got right or wrong.

## A3 — Consent model, concretely

Extends the Equiano Principle two-layer model already researched for KC commercial use
(`docs/WW-OUTSTANDING-TASKS.md`, "Researched, ready for CJ's decision"). No bespoke
TECHreneurs flow. Mapped to fields (`CaseStudyConsent` in Appendix C):

| Layer | Question asked of the member | Field | Effect if withheld |
|---|---|---|---|
| 1 — record | "May we record what happened with this listing?" | `recordConsent` | No outcome record is created at all. |
| 2 — teaching use | "May WW use this outcome as teaching material for other members?" | `teachingUseConsent` | Record exists (feeds the member's own ILP review) but is never eligible for a case study. |
| attribution | "Named, or anonymised?" | `attribution` | Defaults to `anonymised`. |
| withdrawal | Layer 2 can be revoked later | `teachingUseWithdrawnAt` | A published case study moves to `withdrawn` status and is pulled; the layer-1 record persists. |

Eligibility requires **live** layer-2 consent (`hasLiveTeachingConsent`) plus the
state-specific capture (retrospective for `withdrawn`, markdown steps for
`sold-after-markdown`).

---

# Appendix B — Build-gap breakdown & sequencing (28 Aug 2026, Claude Code)

The spec names one dependency (Cyberstore reconciliation). There are five, and they have
an order. Nothing past step 0 should start until step 0 lands.

| # | Gap | Status | Blocks | Rough size |
|---|---|---|---|---|
| **0** | **Cyberstore reconciliation** — one live implementation that records listing lifecycle (listed → price changes → sold/withdrawn, with dates). | Not started. Only `CommunityShopPage` is live; browse-only; no order/interest data. The creator-journey-pilot audit (28 Aug) confirmed this. | Everything below — automated capture is impossible without a single source. | Large — it's the 4-way fragmentation reconciliation already tracked separately, not new work this spec creates. |
| **1** | **Listing-outcome instrumentation** — the marketplace emits a resolution event and captures price history + (if available) market signal. | Not started. `PrototypeEvent`/`EventType` in `prototype-registry/types/index.ts` already has `'sold'` / `'listed-marketplace'` event kinds to build on. | Steps 2–5. | Medium — one event handler + a write path, once step 0 fixes the source. |
| **2** | **Two-layer consent — enacted as policy** — currently a recommendation awaiting the Director. | Researched, not decided. `Creator.consentGiven` exists in the registry but is a single boolean, not two-layer. | Any case study reaching `published`. | Small (policy) + small (a second consent field + the prompt). |
| **3** | **TECHreneurs Keeper custodian + ROV sign-off chain** — a named curator role and a sign-off step, per the pattern the other nexus gates use. | Does not exist. The three built nexus-gate ROVs (`src/rovs/nexus-gates/`) are Pageturners/TNB/Kaywana's Court; there is no TECHreneurs one, and no valuation gate that other programmes route through. | Curation (`in-curation` → `keeperSignedOff`). | Medium — a ROV + wiring, mirroring `StagingReadinessROV` etc. |
| **4** | **Module 2 teaching surface** — where a published case study actually appears to members, alongside the external cases. | Does not exist. TECHreneurs' routed sandbox (`TECHreneursSandbox.tsx`) is a static page; `VentureBuilder.tsx` and `ValuationWorksheetForm.tsx` are both orphaned (unrouted). The nightclub/cinema cases aren't in the repo either. | The pipeline having any visible output. | Medium — a teaching-content component + route, plus authoring the two seed external cases. |
| **5** | **Badge-system wiring** — `src/accreditation/badge-system/` (incl. `badge-definitions.ts`, `progression-map.ts`) is imported by nothing. The Leader badge in A1 lands in dead code until this is wired. | Orphaned. `badge-system/index.ts` is a stub. | The Leader-tier badge being real. | Medium — shared with every other programme's badge work. |

**What is genuinely buildable now (steps that don't depend on 0):**
- The **data model** — done, Appendix C.
- The **consent policy decision** (step 2, policy half) — CJ's call, no code.
- Authoring the **two seed external case studies** (nightclub, cinema) in the
  comparative-pairing format — content work, gives the pipeline something to slot member
  cases beside.
- Drafting the **Level 3 OCN unit references** for the Leader badge.

**Recommended order:** step 0 → step 1 → (step 2 policy in parallel) → step 3 → step 4 →
step 5. Do not build interim manual capture (the spec's own out-of-scope note, and
correct — a manual record built against today's fragmented Cyberstore is likely to be
reconciled away).

---

# Appendix C — What was built (28 Aug 2026, Claude Code)

`src/prototype-registry/types/pricingCaseStudy.ts` — the data model, dependency-free
(only a type-only import of `ProgrammeSource`). Follows `valuation.ts` house style
(interfaces + string-literal unions + `*_INFO` records + factory + validation helpers).
Scoped `tsc --strict` clean. **Not wired to anything** — landed ahead of wiring, the same
way `progression-map.ts` was. Contents:

- `ListingOutcome` — the raw outcome record; three `ListingResolution` states with
  per-state capture (`MarkdownStep[]`, `MarketSignal`, `creatorRetrospective`).
- `PricingErrorKind` + `PRICING_ERROR_INFO` — the failure taxonomy the curation step
  pulls patterns into (positioning / margin-structure / venue / anchoring / timing).
- `CaseStudyConsent` + `hasLiveTeachingConsent()` — the two-layer model from A3.
- `assessEligibility()` — the gate between a resolved listing and the curator.
- `PricingCaseStudyRecord` + `CaseStudyPanel` + `CurationStatus` — the curated
  comparative-pairing output and its human-gate lifecycle (`eligible` → `in-curation` →
  `paired` → `published`, with `declined` / `withdrawn` terminal states).
- `projectedVsActual()` — the analytical core: the delta between the Valuation
  Worksheet's claim/floor and the market outcome.
- Factory helpers (`createEmptyListingOutcome`, `createEmptyConsent`,
  `createCaseStudyFromOutcomes`).
