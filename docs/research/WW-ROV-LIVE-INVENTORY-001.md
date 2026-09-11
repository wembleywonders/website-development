# WW-ROV-LIVE-INVENTORY-001 — Full Live-Repo ROV Inventory & Collision Audit

**Produced:** 11 Sep 2026, WW-SPEC-ROV-FULL-AUDIT-001. **Discovery only —
nothing in this pass was merged, deleted, or renamed.** This document
replaces chat-history/session-memory as the source of truth for "what ROV
systems actually exist in wembley-clean-rebuild" going forward. Where this
document disagrees with an earlier session's claim (including claims in
this repo's own `CLAUDE.md`), the disagreement is stated explicitly below,
with the fresh evidence — the earlier claim is not silently corrected.

## Methodology, and its limits

Every finding below is sourced from direct `git ls-tree` / `git grep` /
`git show` calls against `master`, run in this pass — no finding is
carried over from an earlier session's report without being re-checked
here. Two decisive, cheap checks did most of the work:

1. **Is the file inside `src/`?** `tsconfig.json`'s `"include": ["src"]`
   and `vite.config.ts`'s path aliases (`@`, `@systems`, etc. all resolve
   under `./src`) mean **anything outside `src/` is not part of the
   compiled app, full stop** — regardless of how thoroughly it's wired to
   other files *within* its own subtree. This one check retires 123 of
   the 282 ROV-pattern files found repo-wide in a single move (see
   "Dead zone" below).
2. **For files inside `src/`, is there a real import chain from a routed
   page (`src/App.tsx`'s `<Route>` list) down to this file?** A file can
   be imported by another file that is *itself* unreachable — this
   happened repeatedly (see Findings). "Imported by something" and "live"
   are treated as different claims throughout this document; conflating
   them is exactly the failure this audit exists to catch (per this
   repo's own `CLAUDE.md`, Core Discipline #4).

**Precision limit, stated honestly:** for the ~90 smaller, leaf-level
persona files under `src/` that are not part of one of the major systems
traced in depth below (individual files under `src/rovs/{studio,business,
journey,prototype,maya,nexus-gates,external}/`), reachability was checked
via whether *any* other `src/` file imports that file's basename — a
real but imperfect proxy (it can't distinguish "imported by a routed
page" from "imported by another orphaned file"). Where a file in this
tier shows a non-zero count, its actual importer is named in the table
so the chain can be checked further. This is discovery-grade evidence,
not a full static reachability graph — flagged per this audit's own
acceptance criteria rather than presented as more certain than it is.

## Headline numbers

| | Count |
|---|---|
| Total ROV-pattern files found repo-wide (file/dir names, `ROV_REGISTRY`, `ROVProfile`, `'stage-guide'`, `'guild-mentor'`, the named-entity list) | **282** |
| Outside `src/` — structurally excluded from the build, regardless of internal wiring | **123** |
| Inside `src/` (the only part that can possibly be live) | **159** |
| Distinct `ROV_REGISTRY`-named exports found, incompatible with each other | **2** |
| Distinct `useROVContext`-named exports found (3 real + 1 stub) | **4** |
| Confirmed-live ROV persona/system entry points, end to end | **2** (`rovMapping.ts`, `HelperSupportROV.tsx`) |

## 1. The dead zone — outside `src/`, 123 files, excluded by `tsconfig.json`

Not itemised file-by-file below (their status is uniformly identical —
"outside build root" is a single, decisive, repo-config-level fact, not
123 separate judgement calls). Grouped by directory:

| Directory | File count | What it is |
|---|---|---|
| `rov-system-complete/` | 64 | A self-contained export bundle: `components/creators-journal/` (6), `components/rov-widgets/` (5), `systems/rovs/{badge-integration, journal-integration, learning-support, publication-pipeline}` (~20), `systems/rovs/personalities/{alex,collector,discovery,fixer,guardian,helper,insight,keeper,mindful,pathfinder}` (~30), `docs/rovs/` |
| `systems/` (repo root, no `src/` prefix) | 48 | Confirmed **byte-identical in content** to `rov-system-complete/systems/rovs/` (diffed directly — e.g. `GuardianROV.tsx` differs only by a trailing newline). This is either an unpacking of the bundle above directly into the repo root, or the bundle's own source — either way, a duplicate of the same dead content, not a second independent build. |
| `components/rov-widgets/` (repo root) | 7 | Same relationship to `rov-system-complete/components/rov-widgets/` as above |
| `docs/rovs/`, `src/docs/rovs/` | 4 | Documentation fragments for the dead-zone system |

**Recommended disposition: DELETE**, once confirmed with CJ that nothing
outside this session's knowledge depends on `rov-system-complete/` as an
external reference artifact (e.g. a design doc someone still reads) —
functionally it contributes nothing to the running app today.

## 2. Live-tree systems — `src/` only

### 2a. `src/utils/rovMapping.ts` — **CONFIRMED ACTIVE**, the one clearly-live system

9 ROVs: `maya` (fallback) + `narrator, maker, merchant, keeper, guardian,
weaver, spark, elder` — its own header comment calls it "single source of
truth for which ROV serves which page." Confirmed via fresh import trace:

`rovMapping.ts` → imported by `src/components/maya/DraggableMaya.tsx` →
imported by **21 routed pages**, including `ApplyPage.tsx`,
`CampaignsPage.tsx`, `ChampionPage.tsx`, `CommunityCalendarPage.tsx`,
`CommunityShopPage.tsx`, `CommunityVoicePage.tsx`, `ConnectorPage.tsx`,
`CreatorFactoryPage.tsx`, `CuratorPage.tsx`, `GetStartedPage.tsx`,
`IndividualBenefits.tsx`, `MembershipPage.tsx`,
`ProfessionalDevelopmentPage.tsx`, `RaydyoPage.tsx`, `RuleBookPage.tsx`,
`WorkWithUsPage.tsx`, `WorkshopCalendarPage.tsx`, `WorkshopsPage.tsx`,
`programmes/silk-stilettos/index.tsx`, `team/TeamPage.tsx`,
`who-we-are/DirectorsPathway.tsx`, `who-we-are/HowWeSharePower.tsx`.

This is, by a wide margin, the most-reachable ROV system found in the
entire repo. **Role/category as coded:** greeter/routing persona per page
— not a sign-off or custodian mechanism (see §4, Collision C).

**Known internal bug, found in this pass:** `rovMapping.ts`'s own
`SEGMENT_TO_ROV` lookup is built from each ROV's `programmes: string[]`
array via `Object.entries(...).flatMap(...)`, inserted into a `Map` in
`ROV_PROFILES` object-key order (`maya, narrator, maker, merchant, keeper,
guardian, weaver, spark, elder`). Several programme segments appear in
more than one ROV's `programmes` array — `bright-sparks` (maker, guardian,
*and* spark), `roots` (keeper, guardian, *and* elder) — so only the
**last**-inserted claim survives; the earlier claims are silently dead
code within an otherwise-live file. Not touched in this pass (discovery
only) — flagged as its own follow-up.

### 2b. `src/services/rovs/ROVRegistry.ts` — **CONFIRMED ORPHANED** (re-verifies `CLAUDE.md`'s existing note)

17 personas — larger than `CLAUDE.md`'s own summary suggests ("8 named +
2 specialists"): `maya, solomon, neville, adaeze, maxine, esther, tariq,
aya, emergency, mindful, experimenter, archivist, technician, curator,
merchant, matchmaker, pathfinder`. Role field uses `'stage-guide'` /
`'guild-mentor'` categories (confirms those two literal strings from the
brief's search list are real, live in this one file).

Traced every real importer found:
- `useROVContext.ts` (`src/features/workspace/hooks/`) — imports
  `ROVRegistry.ts` and `greetingService.ts` both — **zero importers of
  this file anywhere in `src/`**.
- `useROVContext.ts` (`src/features/workspace/components/MayaAssistant/`)
  — separate file, same name — imports `ROVRegistry.ts` directly —
  **zero importers**.
- `CreatorSpaceTemplate.tsx` (`src/pages/programmes/_shared/`) — imports
  `ROV_REGISTRY` directly — **zero importers**.
- `greetingService.ts` — imported only by the first `useROVContext.ts`
  above, which is itself unreachable.

**Every path into `ROVRegistry.ts` dead-ends at a file nothing else
imports.** This re-confirms `CLAUDE.md`'s existing claim ("confirmed
unreachable from any live route as of 21 Aug 2026") still holds today,
via a fuller chain than that note describes — worth recording as
confirmed-not-just-repeated, since this audit's whole point is not to
take that kind of claim on trust.

**Bug found, not previously flagged anywhere in this repo's docs:**
`greetingService.ts` references `ROV_REGISTRY.pathfinder` and
`ROV_REGISTRY.matchmaker` — both real keys in `ROVRegistry.ts`'s object,
so this doesn't throw, but it's dead code referencing a registry nothing
reaches.

### 2c. `src/services/rovs/index.ts` — a **second, incompatible `ROV_REGISTRY`**, sitting one directory entry away from 2b

```ts
export const ROV_REGISTRY = {
  maya: { id: 'maya', name: 'Maya', icon: '🌟' },
  'marketing-coach': { ... }, 'portfolio-builder': { ... },
  'milestone-coach': { ... }, 'client-comms': { ... },
  'finance-guide': { ... }, 'collab-finder': { ... },
  'tech-support': { ... }, 'heritage-archivist': { ... }
} as const;
```

9 keys, kebab-case, a completely different shape and content from 2b's
17-key camelCase object. **Both are named `ROV_REGISTRY` and both live in
`src/services/rovs/`** — a genuine same-name, same-directory,
incompatible-shape collision. `import { ROV_REGISTRY } from
'@/services/rovs'` and `import { ROV_REGISTRY } from
'@/services/rovs/ROVRegistry'` resolve to two different objects.

Checked who actually imports `services/rovs/index.ts`: four
`tutorials.*.ts` data files (`tutorials.gtech-casters.ts`,
`tutorials.kaywanas-court.ts`, `tutorials.stemgeneers.ts`,
`tutorials.techreneurs.ts`) — but every one of them imports only the
unrelated `Tutorial` **type** from that same file, none touch
`ROV_REGISTRY`. **So this second `ROV_REGISTRY` has zero live consumers
either.** The collision is real at the source level — a landmine for
whoever next imports `ROV_REGISTRY` from the wrong path — but not
currently causing an observable bug, since neither definition is actually
read anywhere live today.

### 2d. `src/systems/rovs/personalities/` — mixed: mostly orphaned, **one confirmed live**

This is the `src/`-resident counterpart to the dead-zone bundle in §1,
but with different, evolved content (`auntie-anansi, aya, business,
emergency, factory-fleet, helper, insight, justice, kaywana, merchant,
mindful, pathfinder, smith, spark` — notably *without* `alex, collector,
discovery, fixer, guardian, keeper`, which only exist in the dead zone).

**`HelperSupportROV.tsx` — the one confirmed-live file in this
directory.** Imported by `src/pages/member/dashboard/MemberDashboard.tsx`,
which is routed at both `/member/dashboard` and `/onboarding` in
`src/App.tsx`. This is the **second** (and last) confirmed end-to-end-live
ROV entry point found in this entire audit.

Everything else in this directory, traced individually:

| File | Real importer(s) found | Live? |
|---|---|---|
| `factory-fleet/index.ts` | none | Orphaned |
| `merchant/MerchantROVSpec.ts` | none | Orphaned |
| `spark/SparkROVSpec.ts` | none | Orphaned |
| `smith/SmithROVSpec.ts` | none | Orphaned |
| `pathfinder/PathfinderROV.tsx` | only its own barrel files (`personalities/index.ts`, `pathfinder/index.ts`) | Orphaned — see below, this is a significant correction |
| `auntie-anansi/{ArchivistMode,ArchivistService}.ts` | `useAuntieAnansiArchivist.ts` → `ArchivistROVChat.tsx` (`src/components/MayaAssistant/`) → **zero importers of `ArchivistROVChat.tsx`** | Orphaned, full chain traced |
| `business/BusinessROV.tsx`, `emergency/EmergencyResponseROV.tsx`, `justice/JusticeComplianceROV.tsx`, `kaywana/KaywanaWithTracking.tsx`, `mindful/MindfulMentalHealthROV.tsx` | none found rendering them from a routed page | Orphaned |

**Correction to `CLAUDE.md`'s existing "Neville" claim, found and
verified in this pass:** `CLAUDE.md` currently states `PathfinderROV.tsx`
("Neville") is "wired into real live infrastructure... imported into
`SimulatorsPage.tsx`, `YourJourneyPage.tsx`, `STEMgeneersPage.tsx`."
Checked directly:

- `SimulatorsPage.tsx` and `YourJourneyPage.tsx` — confirmed (matches
  `CLAUDE.md`'s own separate, later correction) — these are cosmetic text
  badges (`<span>🧭 PathfinderROV</span>`), not component imports.
- `STEMgeneersPage.tsx` / `src/pages/programmes/stemgeneers/index.tsx` —
  **zero references to `PathfinderROV`, `useNeville`, or `NevilleMode`
  anywhere in that file.** A repo-wide search of `src/pages/**` for these
  three terms returns only the two cosmetic badges above — nothing else.
- The specific hooks `CLAUDE.md` cites as evidence (`useJournalStore`,
  `usePendingVerificationId`, `useGateRequirements`,
  `useSTEMgeneersStats`, `RepairLayer`) **are real and are live** — but
  via `src/pages/programmes/stemgeneers/{PrototypeLab,SessionSandbox,
  sandbox}.tsx` and `src/pages/creators-journal/CreatorsJournalPage.tsx`
  consuming the shared `src/stores/journalStore.ts` **directly**, not
  through `PathfinderROV.tsx`. `PathfinderROV.tsx` is a real, sizeable
  component that touches the same live store as a *parallel*, disconnected
  consumer — but the component itself is never imported by any page.

This is exactly the infrastructure-vs-integration distinction
`CLAUDE.md`'s own Core Discipline #4 warns about, now found inside a
claim in `CLAUDE.md` itself — recorded here rather than corrected
silently, per the standing "update docs the moment reality changes, as a
visible correction" discipline (Core Discipline #6).

### 2e. `src/rovs/` — a fully self-contained, 26-file island, confirmed orphaned as a whole

`src/rovs/index.ts` exports `ROV_COMPONENTS`, `ROV_CATEGORIES`,
`PROGRAMME_ROVS`, `ROVId`, wrapping every persona under
`src/rovs/{business,journey,maya,nexus-gates,prototype,studio,external}/`
— this answers most of the brief's named-entity list in one place:
`BeatMakerROV`, `CodeMentorROV`, `DesignCoachROV`, `VideoGuideROV`,
`WriterAssistROV` (all under `studio/`); `IPAdvisorROV`,
`InventionDocROV`, `PrototypeMentorROV`, `PatentabilityROV`,
`PriorArtSearchROV`, `LicensingCoachROV`, `ValuationCoachROV` (all under
`prototype/`); `PricingAdvisorROV`, `ClientCommsROV`, `FinanceGuideROV`,
`MarketingCoachROV`, `PortfolioBuilderROV` (under `business/`);
`CollabFinderROV`, `MilestoneCoachROV`, `SkillTrackerROV` (under
`journey/`); `MayaCreatorROV`, `MayaOnboardROV` (under `maya/`);
`AudioQualityCheckROV`, `ManuscriptAnalysisROV`, `StagingReadinessROV`
(under `nexus-gates/`); `AmbassadorROV` (under `external/`).

`src/rovs/index.ts` **is** imported — by `src/components/dashboard/
ROVSelector.tsx` and `src/hooks/useROV.ts`. But neither of those two has
any importer anywhere else in `src/` — the whole 26-file tree is
internally consistent and wired to itself, with zero connection to
anything the app actually routes to. **All 26 files: orphaned.**

(`src/accreditation/badge-system/progression-map.ts` also name-drops
several of these ROVs by string, but that file was already confirmed
standalone/zero-import earlier this session — doesn't change this
tree's status.)

### 2f. `src/pages/heritage/HeritageDiscoveryROV.tsx` — a subtler orphan, worth recording precisely

Two files share this exact name: `src/components/knowledge-commons/
HeritageDiscoveryROV.tsx` and `src/pages/heritage/HeritageDiscoveryROV.tsx`.
`src/App.tsx` routes `/heritage` to `src/components/knowledge-commons/
KnowledgeCommonsShell.tsx` — **not** `src/pages/heritage/
KnowledgeCommonsShell.tsx`, a same-named but different file that imports
the `pages/heritage/` copy of `HeritageDiscoveryROV.tsx`. The routed
`components/knowledge-commons/KnowledgeCommonsShell.tsx` has zero
reference to `HeritageDiscoveryROV` at all. So: `pages/heritage/
HeritageDiscoveryROV.tsx` has a real importer (`pages/heritage/
KnowledgeCommonsShell.tsx`) — but that importer is itself not the live
`/heritage` route. **Orphaned**, via exactly the "imported by something
unreachable" trap this audit's methodology section flags.

### 2g. `useROVContext` — four same-named exports, three real implementations plus one stub

- `src/hooks/useROVContext.ts` — real implementation, 1 external import
  found (`ROVAssistant.tsx`'s chain — see below).
- `src/features/workspace/hooks/useROVContext.ts` — real implementation,
  wraps `ROVRegistry.ts` + `greetingService.ts`, zero importers (§2b).
- `src/features/workspace/components/MayaAssistant/useROVContext.ts` —
  real implementation, wraps `ROVRegistry.ts` directly, zero importers
  (§2b).
- `src/hooks/index.ts` — **not a fourth implementation**, a stub barrel:
  every exported hook (`useROVContext`, `useIsROVActive`, `useROV`,
  `useROVHandoff`) literally throws `"... is not implemented in this
  build; please export it from './useROVContext'"`. Zero importers found.

### 2h. `src/components/skills/ROVCoaching.tsx` and `src/components/simulators/ROVAssistant.tsx`

Both real, single-purpose components. `ROVCoaching.tsx` is imported by
`src/pages/member/skills/index.tsx`; `ROVAssistant.tsx` by `src/pages/
member/simulators/index.tsx`. Neither `member/skills` nor `member/
simulators` was found routed in `src/App.tsx` under any path checked in
this pass — **not confirmed live**, but also not traced to full
certainty either way (member-area nested routing wasn't exhaustively
mapped in this pass); flagged for a follow-up check rather than called
either way without more certainty than the evidence supports.

## 3. Named-entity checklist (per the brief's search list)

| Name | Found in `src/`? | Where | As a ROV? |
|---|---|---|---|
| Maya | Yes | `rovMapping.ts` (live), `ROVRegistry.ts` (orphaned), `services/rovs/index.ts` (orphaned), `children.ts`/`newChildren.ts` (12 Children canon, unrelated) | Multiple, see collisions |
| Guardian | Yes | `rovMapping.ts` (live, safeguarding domain), `ROVRegistry.ts` has no `guardian` key (checked — absent from the 17), dead-zone `GuardianROV.tsx` (outside build) | See Collision A |
| Curator | Yes | `ROVRegistry.ts`'s `curator:` key only (`role: 'stage-guide'`, "The Curator," Wembley Provenance Badge copy) | See Collision B |
| Merchant | Yes | `rovMapping.ts` (live), `ROVRegistry.ts` (orphaned), `factory-fleet/index.ts` (orphaned), `MerchantROVSpec.ts` (orphaned) | See Collision C |
| Experimenter, Archivist, Technician, Matchmaker, Pathfinder | Yes | All are keys inside `ROVRegistry.ts`'s 17-entry object (orphaned system) | Not independently built elsewhere as live personas |
| Compass, Catalyst, Verify, Shield, Inventor, Architect, Producer, Artisan | Yes, but not as ROVs | Generic words/unrelated feature names (badge icon labels, page copy, a `Verify` blockchain component, `Architect`/`Producer` as Progression-Framework career-title strings) | **Cleared** — no ROV-shaped definition uses these names anywhere in `src/` |
| Summit, Storykeeper | No | Zero hits anywhere in `src/` | Cleared — absent, not just unbuilt |
| BeatMaker, DesignCoach, WriterAssist, VideoGuide, CodeMentor | Yes | `src/rovs/studio/` (orphaned island, §2e) | Real files, zero live reachability |
| PrototypeMentor, IPAdvisor, InventionDoc, Patentability, PriorArtSearch, LicensingCoach, ValuationCoach | Yes | `src/rovs/prototype/` (orphaned island, §2e) | Real files, zero live reachability |
| Dr. Chen | Yes, twice, unrelated to each other | (1) `src/pages/team/TeamPage.tsx`, a real WW **staff** bio entry ("Technical Development Specialist," STEMgeneers), routed at `/team`; (2) Easy Street's GP-surgery character in `ww-cast-roster.md` (backup branch only, not on `master`) | See Collision D — **neither is coded as a ROV** |

## 4. The four flagged collisions — confirmed or cleared, per the brief's explicit requirement

### Collision A — "Guardian": badge-custodian sign-off role vs. membership-tier safeguarding ROV

**Cleared as a code-level conflation — but the premise needs a correction.**
`ww-badge-accreditation.md` (the brief's own cited source for the
"badge-custodian" half) does not exist anywhere in this repo (confirmed
in the prior session's `WW-SPEC-ROV-NAMING-FIX-001` verification, and
re-checked here — still absent). There is no code implementing a
"badge-custodian Guardian" of any kind — `accreditation/*/badge-system/
verification-system.ts` (all three copies) contains no custodian-role
logic at all (confirmed prior session, unchanged). What actually exists:
`rovMapping.ts`'s live `guardian` entry (safeguarding/H&S domain — this
is very likely what the brief's "membership-tier safeguarding ROV" refers
to), a `GuardianROV.tsx` in the dead zone (outside the build, §1), and —
in the **backend** repository, a different codebase entirely —
`InterimCouncilSeat.GUARDIAN` ("Flora's ROV," a governance-council seat).
**Three independent things sharing one name, none conflated in code** —
no single type or object spans more than one of them.

### Collision B — "Curator": stage-guide ROV name vs. real-historical-figure tutor roster term

**Cleared.** `ROVRegistry.ts`'s `curator:` entry (`role: 'stage-guide'`,
display name "The Curator") is a fictional in-app persona whose entire
copy is about badge certification ("I award the Wembley Provenance Badge
to work that meets our standard," quick actions `check-readiness` /
`view-criteria`) — nothing about real historical tutors. The
real-historical-figure roster (this session's own
`accreditation/programmes/trubble-n-bass/curators.ts`, built
2026-09-11) is a completely separate `Curator` interface in a completely
separate file, with zero code path connecting the two. Genuinely
confusing to a reader (the word "curator" means two unrelated things two
directories apart), but not conflated in code. **Note: `ROVRegistry.ts`
itself is orphaned (§2b)**, so this specific "Curator" persona isn't
live regardless.

### Collision C — "Merchant": stage-guide ROV (Cyberstore) vs. badge-custodian role (TECHreneurs sign-off)

**Cleared as a code-level conflation, same shape as Collision A.** No
"badge-custodian Merchant" exists in code (same stub `verification-
system.ts` finding as Collision A). Three independent "Merchant"
definitions were found, none aware of each other: `rovMapping.ts`'s live
`merchant` (Commerce/Cyberstore/TECHreneurs domain — confirmed live,
§2a), `ROVRegistry.ts`'s `merchant:` entry (orphaned, §2b), and
`MerchantROVSpec.ts` (orphaned, §2d). The live one (`rovMapping.ts`) is
the only one that matters in practice today.

### Collision D — "Dr. Chen": Easy Street canon character vs. technical-skills-mentor ROV

**Confirmed as a genuine two-meaning name collision, but cleared of any
code-level ROV conflation.** `src/pages/team/TeamPage.tsx` (routed at
`/team`) lists a real staff-bio entry named "Dr. Chen" — "Technical
Development Specialist," leads STEMgeneers workshops, "Technical project
mentorship." This is the closest match in this repo to the brief's
"technical-skills-mentor" description — but it's coded as a plain
team-directory data object (`id/name/position/category/pathways`), not
as an `ROVProfile`, not in any `*ROV*` file, and shares no code with any
ROV system found in this audit. The Easy Street "Dr. Chen" (GP-surgery
anchor) exists only in `ww-cast-roster.md`, itself only present on the
`backup/frontend-blob-2026-09-10` branch — not on `master` at all, so
there's no live code for it to collide with. **Zero code merges these
two identities** — they're two unrelated uses of the same real name, in
two unrelated content categories (staff bio vs. in-story character),
neither implemented as a ROV.

## 5. Cross-check: have the three already-reconciled systems also drifted?

Per the brief's explicit ask — checking whether badge-custodian roles,
the Children-of-Anansi dual-role ROVs, and the human-face/story-anchors
have grown their own undocumented code duplicates the way `ROVRegistry.ts`
clearly has:

- **Badge-custodian roles** — no drift found. The only live code using
  this exact name set (`Narrator, Maker, Merchant, Keeper, Guardian,
  Weaver, Spark, Elder`) is `rovMapping.ts` (§2a) — one definition, no
  duplicate found anywhere else in `src/`.
- **Children-of-Anansi dual-role ROVs** — no drift found, and a
  clarification worth recording: `src/rov/personalities/children.ts`
  (original 8: Kweku, Ntikuma, Anansewa, Kofi, Afua, Yaw, Esi, Kumi) and
  `newChildren.ts` (the 4 additions: Adaeze, Nyame, Osei, Akua) are
  **complementary, not competing** — both are genuinely imported by real
  consumers (`rovPromptBuilder.ts`, `maya-router.ts`,
  `rov/personalities/index.ts`), together forming the canonical 12. One
  wrinkle found: `src/rov/index.ts`'s own re-export of `children.ts`'s
  named exports is commented out (`// Kweku, Ntikuma, ...`, actually
  empty) — its header comment claims to be "the genuine re-export layer,"
  but for the original-8 half of the roster that layer is currently
  broken. Doesn't affect the real consumers, which all import
  `children.ts` directly, bypassing `rov/index.ts` — but worth a
  follow-up so the claim in that file's own header matches what it does.
- **Human-face/story-anchors** — no separate ROV-typed duplicate found;
  these are represented purely through the same `children.ts`/
  `newChildren.ts` character blocks as the dual-role system above, not a
  second parallel structure.

## 6. Recommended dispositions

**Decision log (updates this table as calls are actually made — dated,
not silently folded into the rows below):**

- **11 Sep 2026 — `rov-system-complete/` + root-level `systems/`,
  `components/rov-widgets/`, `docs/rovs/` (121 files): DELETED**
  (`dff3c935`), confirmed by CJ. A related, unaudited duplicate found
  while scoping this — root-level `components/creators-journal/` — was
  independently verified (not assumed) and **also DELETED** (`ed37e6a1`)
  as its own separate, scoped pass, per CJ's explicit instruction to
  treat it separately since it fell outside this audit's original search
  pattern.
- **11 Sep 2026 — `src/services/rovs/index.ts`'s `ROV_REGISTRY` export:
  superseded.** The original recommendation below (delete just the
  export, keep the file) rested on an unchecked assumption that
  `rovBridgeService`/`rovCapabilitiesService` were live. Checked before
  acting: they weren't — zero importers anywhere in `src/`, same as
  `ROV_REGISTRY`. **All three files in that barrel (`index.ts`,
  `ROVBridge.ts`, `ROVCapabilities.ts`) DELETED** (`19aac771`) as a
  fully-verified orphan, not a partial edit on an unverified premise.
- **11 Sep 2026 — `src/services/rovs/ROVRegistry.ts` + its dependent
  chain: KEEP, decided by CJ.** Not deleted, not re-integrated — stays
  in the repo exactly as found, dormant. This is a deliberate decision to
  retain, not a deferral; a future spec that wants to wire it into a live
  route should treat that as new integration work, not "finishing" this
  audit. `greetingService.ts`, both unreachable `useROVContext.ts`
  variants, and `CreatorSpaceTemplate.tsx` all stay too, since they only
  exist to serve `ROVRegistry.ts`. Known pre-existing issues that come
  along with keeping it, for whoever picks this up next: a real `tsc`
  error at `ROVRegistry.ts:618` (`'evidenceGrades' does not exist in
  type 'ROVProfile'`) and three in `greetingService.ts` (`'gtechcasters'`
  / `'bright-sparks'` / `'auntie-anansis-kitchen'` not assignable to
  `CreatorSpace` — likely the same kebab-case-vs-not drift already fixed
  elsewhere in this codebase's programme-slug handling, not fixed here).

| System / file(s) | Status | Recommended disposition |
|---|---|---|
| `rov-system-complete/`, root `systems/`, root `components/rov-widgets/`, `docs/rovs/` (123 files) | Dead — outside build root | ~~Delete, pending CJ confirmation~~ **DONE, see decision log** |
| `src/services/rovs/ROVRegistry.ts` + its dependent chain (`greetingService.ts`, both unreachable `useROVContext.ts` variants, `CreatorSpaceTemplate.tsx`) | Orphaned | ~~Delete or consciously re-integrate~~ **KEPT, see decision log** |
| `src/services/rovs/index.ts`'s `ROV_REGISTRY` export | Orphaned, dormant collision with the above | ~~Delete this export specifically (keep the file)~~ **Superseded — whole file + ROVBridge.ts + ROVCapabilities.ts deleted, see decision log** |
| `src/rovs/` (26-file island, §2e) | Orphaned | **Delete or re-integrate** — same call as `ROVRegistry.ts`, a real design decision, not a cleanup afterthought |
| `src/systems/rovs/personalities/{factory-fleet,merchant,spark,smith,business,emergency,justice,kaywana,mindful,pathfinder}` | Orphaned | **Delete or re-integrate**; `PathfinderROV.tsx` ("Neville") in particular represents real, substantial work sitting disconnected from the STEMgeneers pages that already use the same underlying store — worth a deliberate decision, not silent removal |
| `src/systems/rovs/personalities/helper/HelperSupportROV.tsx` | **Active** | Keep, no action |
| `src/utils/rovMapping.ts` | **Active** | Keep — this is the real system; the internal `Map`-overwrite bug (§2a) is worth its own small fix, separate from this audit |
| `src/pages/heritage/HeritageDiscoveryROV.tsx` + its non-live `KnowledgeCommonsShell.tsx` | Orphaned | Clarify with CJ whether `pages/heritage/` was meant to replace `components/knowledge-commons/` and the swap never finished, or whether it's abandoned work — different fix depending on which |
| "Curator" (ROVRegistry's persona) vs. "curator" (real-historical-tutor roster) | Cleared of code conflation, confusing name | Low-priority rename candidate once `ROVRegistry.ts`'s fate is decided — not worth doing while that file is orphaned anyway |
| "Dr. Chen" (TeamPage staff bio) vs. "Dr. Chen" (Easy Street character) | Cleared of code conflation | Low-priority rename candidate for whichever one CJ considers less final — Easy Street's isn't even on `master` yet |

## 7. What this document is, going forward

This replaces chat-history and prior-session summaries as the source of
truth for "what ROV systems exist in this repo" — per the brief, it
should be fed back into project memory as that source. Nothing here was
fixed. The next spec that wants to touch any ROV system should start from
this table, re-verify the specific file(s) it's about to touch (repo
state moves; this document is a snapshot dated 11 Sep 2026), and record
any new finding the same way this document does — evidenced, dated, and
explicit about what changed and why, not silently folded into a
"RESOLVED" heading that stops being accurate the moment something shifts
again.
