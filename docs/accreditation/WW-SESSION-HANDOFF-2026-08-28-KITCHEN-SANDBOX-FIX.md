# WW-SESSION-HANDOFF-2026-08-28 — Auntie Anansi's Kitchen Sandbox Fix

## Context

Two questions asked of CJ in a 15 Aug 2026 session, never answered, so the Kitchen
sandbox consolidation never got picked up. Both now resolved enough to proceed:

1. **Does Kitchen have a real sale/listing mechanic to build toward?** RESOLVED 28 Aug
   2026: a cooked demonstration isn't a sellable static product — CJ's direction is that
   it monetises as a real **service: dinner service / meals-to-order**. Sharpens an
   existing destination (Kitchen's Creator Journey routes through TECHreneurs toward
   hospitality / bespoke catering).
2. **Contents of `AuntieAnansisKitchenSandbox.tsx` + `RecipeHeritageKeeper.module.css`** —
   fetched directly this session (below).

Standing rule: check the actual file/record before stating what exists. This exact
pattern (assumed-built turning out to be a stub; three files turning out to be two tools
wearing three wrappers) has recurred repeatedly on this project.

---

## Findings Log — Priority 1 (audit only, no changes made)

### The fragmentation, re-verified 28 Aug 2026 — and the live/orphaned split is the reverse of what Priority 2 assumed

The 15 Aug "3 files" mapping is structurally intact, but the three files are **two
genuinely different tools**, not two versions of one — and **the routed one is the tool
the Priority 2 plan expected to deprecate**.

| File | Lines | What it is | Routed? |
|---|---|---|---|
| `components/sandboxes/auntie-anansis-kitchen/RecipeHeritageKeeper.tsx` | 1595 | **Tool A.** "Recipe Heritage Keeper 2.1 — Identity Restoration Platform + Heritage Language Preservation + Immigrant Journey Documentation." | Only via the two wrappers below |
| `components/sandboxes/auntie-anansis-kitchen/AuntieAnansisSandbox.tsx` | 236 | Persuasion-first **landing wrapper** around `<RecipeHeritageKeeper />` — dedication, monoculture-crisis framing, cross-programme earning pathways, "3 free heritage plans", membership CTA. | **No — orphaned.** No route, no importer. |
| `pages/programmes/auntie-anansis-kitchen/sandbox.tsx` | 26 | Bare **"TOOL FIRST — NO PREAMBLE" wrapper** around `<RecipeHeritageKeeper />`. | **No — orphaned.** No route, no importer. |
| `pages/programmes/auntie-anansis-kitchen/AuntieAnansisKitchenSandbox.tsx` | 721 | **Tool B.** Self-contained recipe-documentation **5-tab wizard** (Basics → Ingredients → Method → Heritage → Preview). No persona voice, no persistence, no external deps. `SAMPLE_RECIPE` = "Granny's Curry Goat". | **YES.** `/programmes/auntie-anansis-kitchen/sandbox`, `/pathways/auntie-anansis-kitchen/sandbox`, `/pathways/aunties-kitchen/sandbox`. The programme-page CTA (`index.tsx:72`) points here. |

Note: `AuntieAnansisSandbox.tsx` and `sandbox.tsx` **both export a component literally
named `AuntieAnansisSandbox`** — a latent name collision.

### P1.1 — `AuntieAnansisKitchenSandbox.tsx` in full: genuinely self-contained?

**Yes.** Imports only React, `react-router-dom`, `lucide-react` icons, its own CSS.
Zero reference to `RecipeHeritageKeeper` or any shared Kitchen code. It is a clean,
focused recipe-capture wizard:

- Types: `Ingredient`, `Step`, `HeritageNote` (`story | origin | tradition | memory |
  tip`), `Recipe`.
- 5 tabs with a prev/next footer and progress dots; a Preview tab that renders a
  formatted recipe card with heritage notes as pull-quotes.
- "Load Example" / "Start Fresh"; Save shows a modal only ("This is a sandbox — your
  work isn't permanently saved").
- **Worth preserving if it's deprecated/merged:** the 5-tab wizard structure, the
  heritage-note taxonomy, and the curry-goat sample are all solid. It has no
  persistence (unlike Tool A) and no monetisation hooks.

### P1.2 — `RecipeHeritageKeeper.module.css` alongside `RecipeHeritageKeeper.tsx`

- `RecipeHeritageKeeper.module.css` is **170 lines** — its own header says "Most styles
  come from shared `SandboxPlanner.module.css` / These are ONLY the unique styles."
  Contents: island-selection grid, `.anansInfo` card, `.fightMonoculture` section,
  responsive rules. Amber palette (`#fbbf24` / `#f59e0b`).
- **But the component only imports its own module** (`import styles from
  './RecipeHeritageKeeper.module.css'`), not `SandboxPlanner.module.css`. So class
  lookups the CSS doesn't define — `styles.mayaShepherd`, `styles.mayaIcon`,
  `styles.mayaMessage`, and anything expected from the shared planner styles — resolve
  to `undefined`. **The guide UI is already partially unstyled.** Whoever touches this
  needs to decide: import the shared planner CSS, or inline the missing classes.
- `RecipeHeritageKeeper.tsx` itself (1595 lines): 4 `JourneyPath`s (`choosing`,
  `lost-lamb`, `elder-keeper`, `somewhere-between`); 14 islands/countries (Guyana,
  Jamaica, Trinidad, Grenada, St Lucia, Barbados, Dominica, St Vincent, Ghana, Nigeria,
  Somalia, …) each with `featuredDishes` + heritage languages; `HeritageLanguage` and
  `ImmigrantJourney` structs; multi-part story capture; localStorage persistence
  (`STORAGE_KEY = 'wembley-heritage-keeper-progress'`).

### P1.3 — which RecipeHeritageKeeper wrapper is live vs orphaned?

**Neither is live.** `grep -rn "AuntieAnansisSandbox"` and `grep -rn "sandbox.tsx"`
against `App.tsx` and all of `src/` return no route and no importer for either. The only
routed Kitchen sandbox is `AuntieAnansisKitchenSandbox.tsx` (Tool B), which does not
touch `RecipeHeritageKeeper` at all. `git log` shows `sandbox.tsx` was last touched by
"Route audit complete — 89 broken links fixed" (`da68111e`) — consistent with it having
been un-wired during a route cleanup.

### P1.4 — Cyberstore: any recurring-order / booking / subscription listing type?

**None in any of the four named implementations.** Confirmed, not assumed:

| Implementation | Listing/pricing model | Routed? |
|---|---|---|
| `CommunityShopPage` + `src/data/cyberstoreData.ts` | `CyberstoreProduct = { category, subcategory, price: number }` — **fixed price only**. Already carries a `food-heritage` → "Recipe Packs" category (£7.00–£8.50, one-off). | **Yes** (`/shop`, `/cyberstore`) |
| `production-hub/CyberstoreListingWizard.tsx` | `ProductType = 'beat' \| 'knowledge' \| 'general'`; `LicenseTier` (MP3/WAV lease … exclusive) for beats, flat `price` otherwise. One-off. | No |
| `studio/CyberstoreStorefront.tsx` | Imports the wizard. | No |
| `marketplace/integrations/creatorJourneyIntegration.ts` | `type: category === 'workshop' ? 'service' : 'product'` — a label; `createOrder` is a one-off order shape. | Rendered only by orphaned `CreatorJourneySection.tsx` |
| `src/blockchain/config/revenueModels.ts` | `RevenueSplit` (percentages) + `WallRentModel` (flat weekly rate). **No recurring/subscription model.** | n/a (config) |

**Separate subsystem, not one of the four:** `src/marketplace/` has a services layer —
`Service` interface with `bookingType: 'instant' | 'request' | 'consultation-first'`,
`ServicePackage`, `ServicePricing`, and sample data including "Monthly tech support
subscription" copy. **Not routed** (only `MarketplaceHome.tsx` / `CreatorDashboard.tsx`
pages exist, referenced by `WorkWithUsPage.tsx`). It's the closest existing shape to a
booking model — but it's consultation-booking, not recurring-order / meal-plan.

**Conclusion:** CJ's "dinner service / meals-to-order" needs a **genuinely new listing
mode** (as the handoff predicted). The more promising base is `src/marketplace/`'s
`Service` / booking model, not Cyberstore's product model — but that's a scoping call
for the follow-up task, not this pass.

### Additional Kitchen-scoped drift found this pass (for the tracker)

- The tracker's "second `RecipeHeritageKeeper.module.css` under `pages/programmes/`" is
  now inaccurate. The current orphan there is **`AuntieAnansisSandbox.module.css`** —
  byte-identical (8293 bytes) to the `components/` copy; both wrappers import the
  `components/` copy, so the `pages/programmes/` copy is dead.
- Orphaned Kitchen ROV stack, none wired:
  `src/systems/rovs/personalities/auntie-anansi/` (`ArchivistService.ts`,
  `ArchivistMode.ts`, `AUNTIE_ANANSI_ARCHIVIST_CONFIG`),
  `src/hooks/useAuntieAnansiArchivist.ts`, `src/hooks/useAuntieAnansiData.tsx`,
  `src/components/MayaAssistant/ArchivistROVChat.tsx`. Persona is "Auntie Anansi" the
  archivist; Maya appears only in comments as a handoff target.
- `ww-programme-architecture.md` (which this handoff asks to update) **does not exist
  anywhere in the repo** — chat-memory-only. The tracker (`docs/WW-OUTSTANDING-TASKS.md`)
  is the real doc; updated there instead.

---

## Esi-vs-Maya voice fix — scope confirmed, but conditional

Maya's voice in Kitchen-scoped code is confined to **`RecipeHeritageKeeper.tsx`**:
`getMayaMessage()` (line ~367), the `// MAYA MESSAGES (Soul-Guided)` block, `styles.mayaShepherd`
/ `mayaIcon` / `mayaMessage`, and two `{/* Maya Guide */}` render sites (~765, ~1532).
Kitchen's host is confirmed **Esi** (`ww-cast-roster.md:110`).

**Caveat:** `RecipeHeritageKeeper.tsx` is orphaned. If CJ's Priority 2 decision is that
the simple recipe wizard (`AuntieAnansisKitchenSandbox.tsx`, no persona voice at all) is
the Kitchen sandbox, this voice fix is moot. Do not run the Maya→Esi pass until the
"which tool" decision is made.

---

## Priority 2 — NOT started. Blocked on a CJ decision.

The Priority 2 plan ("consolidate the two RecipeHeritageKeeper wrappers into one entry
point, retire the other") assumed one wrapper is live. **Neither is.** The live sandbox
is a third, unrelated tool. So the real question is upstream:

**Which tool is the Auntie Anansi's Kitchen sandbox meant to be?**

- **Tool A — `RecipeHeritageKeeper`** (identity restoration / heritage language /
  immigrant journey). Richer, more distinctive, has persistence, but heavy and currently
  unrouted with partially-broken styling and a wrong-persona guide.
- **Tool B — `AuntieAnansisKitchenSandbox`** (recipe-documentation 5-tab wizard).
  Simpler, currently live, clean, no persona, no persistence.

They are not two versions of one tool — they do different things. Once CJ picks:

- **If Tool A:** route exactly one wrapper (recommend folding the persuasion content
  into the programme page and routing the bare `sandbox.tsx` shape), delete the other
  wrapper + the duplicate `AuntieAnansisSandbox.module.css`, fix the CSS import gap, run
  the Maya→Esi voice pass, and decide whether Tool B is deprecated or its 5-tab
  recipe-entry UI is merged in as a mode.
- **If Tool B:** deprecate `RecipeHeritageKeeper.tsx` + both wrappers + the orphan CSS +
  the orphan Archivist ROV stack; the voice fix becomes unnecessary.

Neither path should build the dinner-service / meals-to-order Cyberstore listing type —
that is a separate follow-up (P1.4 confirms it needs a new mode; the `src/marketplace/`
Service layer is the candidate base).

## Explicitly out of scope for this pass (unchanged)

- Building the dinner-service / meals-to-order listing mechanic (separate follow-up)
- The Silk Stilettos + Rayd-yo pilot (separate handoff, same day)
- Any of the three unbuilt nexus gates
