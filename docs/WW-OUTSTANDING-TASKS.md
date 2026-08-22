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

Three nexus-gate tools designed but never built: Manuscript Analysis ROV
(Pageturners), Audio Quality-Check ROV (Trubble n Bass), Staging/
Production-Readiness ROV (Kaywana's Court). Confirmed via full src-tree
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

## 🔴 Named research left incomplete

- Cassava — still missing from the Tree Council/Fruit Grove roster
- TECHreneurs — flagged as a likely "one-way port" under the triangular-
  trade return-to-origin test, never actually checked

*Checked 21 Aug 2026 (Claude Code):* neither "Fruit Grove" nor "Tree
Council" appears anywhere in this repo (other than this tracker file
itself) — the roster Cassava is supposedly missing from isn't in the repo
to check against. Same chat-memory-only situation as several items above.
The TECHreneurs "one-way port" check is a content/historical-analysis
question, not something resolvable by grepping code — genuinely still open,
nothing to correct or confirm from this session's pass.

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

## 🟢 Esi-vs-Maya in Kitchen — RESOLVED

ww-cast-roster.md (25 Jul, dated after the correction that moved Esi to
Knowledge Commons) confirms Esi returned to Kitchen — she is Kitchen's
host. Live RecipeHeritageKeeper.tsx code (still uses Maya's voice) is the
outdated piece — separate follow-up task to update it, not blocking
KitchenROV.tsx.

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
