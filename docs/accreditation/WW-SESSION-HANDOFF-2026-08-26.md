# Wembley Wonders — Session Handoff (26 Aug 2026, pipeline-model verification)

Prepared against `WW Site Architecture Redesign — Pipeline Model &
Outcome-Based Homepage (23 Aug 2026)`, a chat-drafted design doc that
modelled every WW programme against a four-stage SKILL CHOICE → SKILL
ACQUIRED → PRODUCT PRODUCED → ENDPOINT pipeline, and proposed replacing the
homepage with five outcome-based clusters. The doc's own instruction: verify
against the real codebase, report first, no build without a separate,
explicit go-ahead. This handoff is that verification. **Nothing was built,
routed, or restructured in this pass** — code-read and doc-read only.

---

## Three corrections to the doc's own stated premises

### 1. The stage-3 readiness-check gap (Part 1) is stale

The doc names three ROVs as "confirmed unbuilt this session": Manuscript
Analysis (Pageturners), Audio Quality-Check (Trubble n Bass),
Staging/Production-Readiness (Kaywana's Court). Checked directly against
`docs/accreditation/WW-SESSION-HANDOFF-2026-08-23.md` and the live files:
all three were built and wired **the same day**, 23 Aug —
`src/rovs/nexus-gates/{ManuscriptAnalysisROV,AudioQualityCheckROV,
StagingReadinessROV}.tsx` exist, type-check clean, and are genuinely
imported into `PageturnersSandbox.tsx`, `TrubbleNBassSandbox.tsx`, and
`KaywanasCourtSandbox.tsx` respectively (confirmed via direct grep of real
`import` statements, not comment mentions).

What's still genuinely open: each ROV is wired only into its *reference*
programme. The 23 Aug handoff's own wiring audit shows Audio Quality-Check
was briefed to also reach Rayd-yo, Easy Street, Kaywana's Court, and
G-Tech Casters — none of that extension is done. Useful side-finding: this
is real supporting evidence for the design doc's own hypothesis (readiness
checks cluster into 3-4 shared types rather than 14 bespoke tools) — that
was already the original brief's intent, just not yet executed past the
first programme in each case.

### 2. There is no flat 14-programme grid to replace

The doc's Part 3 opens by proposing to "replace a flat 14-programme grid."
No such thing exists. Two real structures do:

- **`src/pages/HomePage.tsx`** (the actual `/` route, `App.tsx:429`) is a
  single-narrative, **Easy-Street-centric funnel**: hero is an Easy Street
  scene player, primary CTA is "Write for Easy Street," and its "How It's
  Made" rail features only 5 programmes (Pageturners, Rayd-yo, G-Tech
  Casters, Trubble n Bass, Joystick — Easy Street's own production chain,
  `HomePage.tsx:332-368`). Silk Stilettos, Kitchen, STEMgeneers,
  TECHreneurs, Kaywana's Court, Scrap Cat, Roots, and Bright Sparks appear
  nowhere on it.
- **`/programmes`** (`ProgrammesEditorialGrid.tsx`) is a separate, already
  curated **"five sections, thirteen programmes"** model, grouped by
  organisational function, not output type: Entry & Belonging (led by
  Bright Sparks), Skills & Development (led by TECHreneurs, featuring
  STEMgeneers + Impact Labs), Cultural Production House (Kaywana's Court +
  Pageturners/Easy Street/G-Tech Casters/Trubble n Bass/Silk
  Stilettos/Kitchen), Challenge & Recognition (Creator Factory), Impact &
  Transformation (Roots).

Restructuring to the doc's Goods/Live/Savings model means redesigning this
real, already-curated IA (and deciding what happens to the Easy-Street-
funnel homepage), not filling empty space with a new taxonomy.

Notable partial validation: Bright Sparks already leads the first section
of the real `/programmes` grid — directionally consistent with the doc's
"Bright Sparks as entry point" instinct, though nothing marks it as the
literal `/` default the doc proposes (no redirect from `/`, no onboarding
reference found). Notable contradiction: the doc proposes Scrap Cat stand
alone as its own outcome axis, but the real grid already folds Scrap Cat's
territory into STEMgeneers' own card ("Device repair... earn £15–40/job") —
not standing alone under the doc's model.

### 3. Roots is a different programme than the one the doc modelled

This is the sharpest finding of the pass. The doc builds Roots around two
outputs — private lineage/family-tree work, and a publishable aggregate
hereditary-illness pattern-research output — anchored to curators Walker
and Schomburg, with a hard genetic-privacy requirement attached.

The live, routed product (`RootsPage.tsx`, `RootsArchive.tsx`,
`src/components/sandboxes/roots/{OralArchive,ProvenanceRecord}.tsx`) is
about something else entirely: **Afro hair-care science, chemical
literacy, legal/body-sovereignty rights, and an Apothecary creator
pathway** (documented remedies → Cyberstore, `RootsPage.tsx:99-104`).
Founding team per the page's own copy is a safeguarding/child-development
professional, a salon practitioner, and a women's-studies academic
(`RootsPage.tsx:15-25`). `App.tsx:201` even routes `/hair-care`,
`/body-sovereignty`, and `/apothecary` all into Roots. A full-repo search
for lineage/genealogy/ancestry/hereditary/sickle-cell/Windrush/Walker/
Schomburg inside the live Roots code returns nothing — no genealogy or
family-tree tool exists anywhere in this repo. The only "lineage" hit
anywhere near Roots is `ProvenanceRecord.tsx`'s `lineageDescription`
field, which is about remedy provenance (who taught you this recipe), not
genealogical ancestry.

The Walker/Schomburg archival-reconstruction framing the doc inherited is
real — it's `docs/research/WW-RESEARCH-ELEMENT-BY-PROGRAMME.md`'s stated
research lens for Roots — but it was never reflected in the shipped
product. This gap predates the design session; the design doc inherited
research-doc framing rather than the live page, and then built an entire
two-fork pipeline model on top of it. It also sharpens an item already
open in `WW-CANONICAL-ROSTER.md` ("Roots → Esi" is listed as
not-contradicted-but-not-confirmed by Esi's own file) — given what Roots
actually ships as, Esi's "Heritage Preservation & Cultural Memory" domain
fits the *research-lens document's* Roots, not the *product's* Roots.
Flagging into that file's open items, not resolving it here.

Also noted in passing: `RootsPage.tsx:103`'s Apothecary pathway links to
`/programmes/easy-street` — an unrelated cross-wire worth a separate look,
not chased further in this pass.

---

## "Already exists" claims from the doc — checked directly against code

| Claim | Verdict |
| --- | --- |
| Silk Stilettos IP Portfolio/Pattern Registry as its stage-3 checkpoint | **Real code, orphaned.** `IPPortfolio.tsx`, `PatternRegistry.tsx`, `DesignStudio.tsx` all exist with genuine content. The live routed Silk Stilettos sandbox is a different, simpler file importing none of them; `DesignStudio.tsx` isn't routed in `App.tsx` at all. Zero importers anywhere. Same "built but unreachable" shape already logged elsewhere this project for the TNB `rooms/` directory and the Cyberstore fragmentation. |
| Scrap Cat savings-ledger mechanism | **Does not exist.** `ScrapCatSandbox.tsx` (~2000 lines) has a real repair guide with per-item `estimatedCost` ranges — no persisted saved-value record, no ledger, no aggregation, anywhere in the repo. Would need building from scratch, not extending. |
| STEMgeneers ↔ TECHreneurs routing/handoff | **Confirmed absent** — no import or cross-reference between the two anywhere in `src/`. The doc itself correctly flagged this as an open question rather than an existing thing; verification agrees. |
| KC lesson-module pipeline (deposit type/review-status/correction-tracking) as STEMgeneers' Maths-layer pipeline | **Real, correctly scoped, not integrated.** `src/knowledge-commons/lesson-modules/lessonModuleStore.ts` is a genuine Zustand store with deposit type, tier, license, and `conditional-pass` review status — but its own header explicitly restricts it to a single-programme STEMgeneers pilot, and it has zero importers anywhere else in `src/`. Infrastructure exists; integration doesn't — exactly the CLAUDE.md rule 4 distinction (infrastructure vs. reachable mechanism). |

---

## Other structural corrections

**STEMgeneers' real shape isn't the doc's four layers.** The doc proposes
Maths / Applied Sciences / Engineering / Products as STEMgeneers' internal
structure, with no checkpoint spec yet for any of them. The live
`SessionSandbox.tsx` / `PrototypeLab.tsx` already implement a fully
different, real, gated structure instead: **six repair layers** (Precision,
Appliance, Home, Furniture, Making, Trades), each gated by three diagnostic
sessions at 80%+, two witnessed real-world repair logs, one physics
explanation, and a Neville verification conversation. This is already a
working stage-3 checkpoint mechanism — just shaped nothing like the doc's
model. The doc's STEMgeneers section needs re-grounding against this real
structure, not built fresh against an assumed one.

Separately: `docs/research/WW-OPEN-INVESTIGATIONS.md`'s Gaspar Yanga thread
(settlement-founding/defensive-engineering figure, single-sourced claim,
still open as of 21 Aug) is explicitly about which programme this figure
belongs to, and warns against locking him into "STEMgeneers' open
engineering slot" to force a resolution. The design doc doesn't engage this
at all — it treats STEMgeneers' internal layer structure as a pure build
question when there's a live, unresolved question about the programme's
content identity underneath it.

**Easy Street's "original show" path doesn't exist and the live IP model
may actively work against it.** The doc claims members can build original
shows outside Easy Street's canon using the same taught craft skills
(Week 1 world-building, Week 2 character, Week 3 tension). The real
curriculum (`index.tsx`) is six weeks, not three, but weeks 1-3 do match
World → Character → Tension as claimed. However, every week is taught
*inside* Easy Street's specific canon (named streets, named characters) —
there is no generic or original-show variant anywhere in the code. More
significantly, the page's own "Community IP Model" section states plainly
that Easy Street's world "belongs to Wembley Wonders CIC... cannot be sold,
licensed away, or extracted" — members contribute episodes *within* that
world. This isn't just unbuilt; the current IP framing may conflict with
building it, since the world itself is locked as a CIC asset. Also: the
doc names "Jackson" and "Myrtle" as established canon; neither appears
anywhere in the repo. The actual live cast is Pearl, Aubrey, Marsha, John,
Auntie Budgie, and Brenda. Likely a chat-memory naming slip — flagging
precisely rather than silently correcting the doc's language.

**TECHreneurs has no storefront-creation flow.** `TECHreneursSandbox.tsx`
has exactly one Cyberstore reference — a static revenue-stream line item
("Cyberstore Digital Products," ~£110/mo) — not a build-a-storefront
mechanism. The page reads as curriculum/revenue-literacy content. The doc's
stage 3/4 "collapse" claim is correctly flagged in the doc itself as
untested; verification found no evidence either for or against it.

**Cross-links from programme sandboxes to either stage-4 endpoint type are
sparse overall.** Only `roots/sandbox.tsx:432` and
`stemgeneers/SessionSandbox.tsx:833` link to `/cyberstore`; only
`kaywanas-court/KaywanasCourtPage.tsx:498` links to `/calendar`. Pageturners,
Trubble n Bass, Silk Stilettos, Kitchen, TECHreneurs, Scrap Cat, and Easy
Street sandboxes have no grep-confirmed link to either endpoint. Most of the
doc's assumed Stage 4 GOODS/LIVE routing doesn't exist as real UI flow yet,
even in programmes the doc assumed already had it.

---

## What the doc overlooked entirely

- **Creator Factory** (`/creator-factory`, timed-challenge portfolio) and
  **Impact Labs** (`/impact-labs`, community-problem proposals to
  directors) — both live, both featured as their own sections on the real
  `/programmes` editorial grid, neither mentioned anywhere in the design
  doc's model. **Independent technical bug, unrelated to any redesign
  decision:** both cards link to `/programmes/creator-factory` and
  `/programmes/impact-labs`, and neither route is registered in `App.tsx`
  — both currently 404 to `SmartNotFound`. Worth fixing regardless of what
  happens with the pipeline-model proposal.
- **Money Reset** — a live routed programme, already flagged in
  `WW-CANONICAL-ROSTER.md` as an unconfirmed Kumi mapping, not mentioned
  anywhere in the design doc.
- All 14 of the doc's named programmes do have live routes today
  (confirmed non-zero `App.tsx` hits for each) — routing-level reachability
  itself isn't the gap; endpoint cross-linking and, for Roots, content
  identity are.

---

## Two open design questions — not resolved here, per the doc's own instruction

- **Easy Street naming split** (does the programme need a name distinct
  from "Easy Street," e.g. "Drama" as the programme with Easy Street as its
  flagship series): no code evidence either way. Genuinely CJ's call — and
  the IP-lock finding above is new information relevant to that decision,
  not a resolution of it.
- **STEMgeneers layer sequencing** (strict sequence through all layers vs.
  entering closer to engineering with existing instinct): needs to be
  re-asked against the real six-repair-layer structure found above, since
  the question as originally posed (across four layers) doesn't match what
  the codebase actually implements.

---

## Standing status

No build, routing change, ROV extension, or homepage restructuring was
performed in this pass — verification only, as both the design doc and
CLAUDE.md's core discipline require. The single largest open item is Roots:
its live product and its own documented research lens
(`WW-RESEARCH-ELEMENT-BY-PROGRAMME.md`) describe two different programmes
under one name, and any pipeline-model work touching Roots needs that
resolved first, at the content/product level, not worked around in the
architecture.
