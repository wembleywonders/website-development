# Wembley Wonders — Session Handoff (21 Aug 2026)

For Claude Code (or the chat assistant, if pasted back there): this continues
`WW-SESSION-HANDOFF-2026-08-20.md`. Everything below was verified against
real files/commands during this session — treat it as ground truth, not
assumption, unless your own investigation shows otherwise. That prior
handoff's two open items (`progression-map.ts` landing status, curator
tutoring-focus verification) are both resolved below — don't re-investigate
them from scratch.

## CONFIRMED FINDINGS — do not re-investigate these from scratch

### 1. `progression-map.ts` — landed

`src/accreditation/badge-system/progression-map.ts` (the only copy the live
app imports) was a 2-line stub as of the 20 Aug handoff. It is now a real
662-line file, type-checks clean (`npx tsc --noEmit --skipLibCheck` on the
file directly — the project-wide `tsc` run has ~403 pre-existing unrelated
error lines, mostly `@types/react-router-dom` conflicts, confirmed via grep
to not touch this file).

Built by merging the two divergent repo-root copies:
- `accreditation-full/badge-system/progression-map.ts` (489 lines, the real
  functional TypeScript — `ProgressionStep`/`ProgressionPathway` interfaces,
  4 pathways) — ported near-verbatim.
- `accreditation/badge-system/progression-map.ts` (390 lines, markdown in a
  comment block, no real exports) — only its Cyberstore revenue-split table
  had no functional-TS equivalent elsewhere, so that's now
  `REVENUE_SPLIT_WITH_POLISH_LAB` / `REVENUE_SPLIT_WITHOUT_POLISH_LAB`
  (55/25/20 vs. 75/25). The rest of that file (weekly-engagement tables,
  family strategy, implementation checklist) is planning narrative, not
  data this module carries.

Added `TRUBBLE_N_BASS_PATHWAY`, built from the real accredited units in
`accreditation/programmes/trubble-n-bass/{unit-mapping,assessment-criteria,
evidence-requirements}.md` (TNB-1/2/3, RQF Level 2, 11 credits total) —
not the sibling pathways' generic "OCN Award/Certificate" template, since
Trubble n Bass already has real accredited content to draw from. Badge
tiers map to the unit each tier's evidence actually completes: Explorer+
Builder finish TNB-1, Innovator finishes TNB-2 (including the Artist
Development & A&R criterion — see the Dodd finding below, that criterion's
evidence mechanism doesn't actually exist yet), Leader finishes TNB-3.

One bug fixed while porting: `accreditation-full`'s STEMgineers pathway used
id `'stemgineers'` / name `'STEMgineers'`. Every live component that
references this programme (118 occurrences vs. 33 for the "-ineers"
spelling — `programmeSchedule.ts`, `JoinFlow.tsx`, `ProgrammesEditorialGrid.tsx`,
`CollaborationMatcher.tsx`, etc.) uses `'stemgeneers'`/`'STEMgeneers'`.
Landing the minority spelling would have made this pathway silently
unmatchable against real programme data. Corrected — now `STEMGENEERS_PATHWAY`,
id `'stemgeneers'`.

Nothing in the live app currently imports this file (`grep`'d, zero
consumers) — landing it did not wire it into any UI. Wiring it into the
badge-system UI is separate, undone work.

### 2. Curator tutoring-focus verification — done for the 26 defined so far

Checked all 7 curators from PageTurners/Kaywana's Court/STEMgeneers/Bright
Sparks and all 19 Trubble n Bass genre curators against real sandbox/
production-hub code. Full per-curator table:

| Curator (programme) | Verdict | Real code checked |
|---|---|---|
| Balla Fasséké (PageTurners) | Partial | `CreativeWritingStudio.tsx` has real poem prompts, no formula/meter-analysis mechanism |
| Demodocus (Kaywana's Court) | Partial | `src/production-hub/KaywanasAtrium.tsx` real (`PerformanceProject`, real Rayd-yo radio-showcase link); no structural link from a specific PageTurners artifact to a performance record |
| Imhotep (STEMgeneers) | Partial, gap at Innovator | `src/components/sandboxes/stemgeneers/TechnicalBuilder.tsx` real and solid for Explorer/Builder; "Skunkworks" Innovator venue doesn't exist anywhere in code |
| Dorothy Vaughan (STEMgeneers) | Partial, gap at Builder+ | `CodeMentorROV.tsx` real for code-building; "teaches another member" has no mechanism |
| Elijah McCoy (STEMgeneers) | Gap at Innovator | Same TechnicalBuilder base works for Explorer/Builder; same Skunkworks gap as Imhotep |
| Charles Drew (STEMgeneers → Auntie Anansi's Kitchen) | Weak/thematic only | `auntie-anansis-kitchen/` sandbox is real but is oral-history recipe documentation, not experimental food science with before/after comparison |
| Noel Pointer (Bright Sparks) | Gap above Explorer | `SparkDiscoveryJourney.tsx` is a multi-programme taster quiz, not a foundational-unit tracker or beginner-mentoring log |
| King Tubby (Trubble n Bass) | Confirmed (re-verified) | AudioBay's quality-check gate, exact fit |
| Coxsone Dodd (Trubble n Bass) | **Re-opened — see below** | Claimed closed by Module 9; the "platform's existing peer-witness requirement" it depends on doesn't actually reach Trubble n Bass |
| Art Blakey, Bridgetower/Saint-Georges (Trubble n Bass) | Partial (Explorer/Builder only) | `rooms/session/SessionRoom.tsx` + `EnsembleTabs.tsx` real — solo/duo/trio/quartet with named AI personas (Delroy, Pearl, Rico, Grace). Does NOT cover "cross-programme collaboration" or "mentors another member" tiers — personas are simulated, not real members |
| Handy/House (Blues), Classical, Gospel (Dorsey), Disco (Edwards) | Reasonable fit | Evidence is a produced piece (composition/transcription/remix) — real tooling in `TrubbleNBassBuilder.tsx`/`SongwritingWorkshop.tsx`/`SampleExplorer.tsx` covers this |
| Soul (Burke/Cooke), Calypso (Kitchener), Funk (White/Duke), Rock (Tharpe), R&B (Houston), Hip-Hop (Jay), Lovers Rock (Mark, partial), Jungle (Kemistry), UK Garage (Danjah), Highlife (Mensah), Afrobeat (Kuti), Afrobeats modern (Jezreel) | Gap (same root cause) | Evidence type is documented mentorship/platform-sharing/institution-building — no capture mechanism exists anywhere platform-wide (checked specifically, see meta-finding below). Not re-derived individually per curator since the missing mechanism is identical across all of them |
| Funk — Hayes ("written for" another member) | Reasonable fit | Evidence is a produced piece, closer to the Handy/House group than the mentorship group above |

The other 9 programmes (G-Tech Casters, Rayd-yo, Roots, Silk Stilettos,
Auntie Anansi's Kitchen, TECHreneurs, Scrap Cat, Easy Street, Joystick) have
locked curator identities only, no tutoring-focus spec drafted yet — out of
scope for this verification pass, nothing to check yet.

### 3. Meta-finding: no platform-wide peer-witness mechanism exists

`accreditation/programmes/trubble-n-bass/evidence-requirements.md` states
Coxsone Dodd's criterion (TNB-2.4) is "verified via the platform's existing
peer-witness requirement (required for Practitioner level and above
platform-wide)." This is not accurate against the live codebase. What
actually exists is three separate, disconnected verification models:

- `src/stores/journalStore.ts` + `src/types/creators-journal/index.ts` —
  real `witnessRepair()` action, real `VerificationStatus`/`WitnessRelationship`
  types, but built entirely around Scrap Cat's `RepairEvidence` (fields
  literally named `repairEvidenceId`, `witnessedRepairs`).
- `src/pages/programmes/stemgeneers/PrototypeLab.tsx` — a real
  witnessed-iteration checkbox UI, but it works by reusing the same
  Scrap-Cat-rooted `journalStore` action for STEMgeneers prototypes — proof
  the pattern *can* generalize, but nothing has done so yet for other
  programmes.
- `src/components/creators-journal/BadgeProgress.tsx` — a third, different
  vocabulary (`maya-confirmed`/`rov-assessed`/`mutual-attestation`) over
  mock session data, not obviously wired to the other two. Whether this is
  a real intended design or an unwired mockup was not established this
  session — flag, don't assume either way.

No generic "log a mentorship/development relationship" mechanism exists
anywhere (checked specifically — grepped for mentorship-log/coaching-log/
platform-sharing/collaboration-record patterns platform-wide, all empty).
`CollaborationMatcher.tsx` exists and is real, but it's a project-matching/
discovery tool (helps find a collaborator), not an evidence-logging one
(doesn't record that mentorship happened).

Separately: `ww-skunkworks-impact-labs.md`, cited by both TNB accreditation
docs for a "Crew Log"/"cross-skill rotation gate," does not exist anywhere
in this repo — only the two TNB docs reference it (likely lives only in
chat memory, same situation as the curator roster did before this session).
"Skunkworks" as a named build-registry does not exist in code at all. The
real `Impact Labs` sandbox (`src/components/sandboxes/impact-labs/
ImpactLabsChallenges.tsx`) is an ethics-dilemma discussion tool ("The
Wallet," "The AI Decision," "The Shop") — unrelated to engineering builds.
This directly affects Imhotep and Elijah McCoy's Innovator tier.

### 4. Development/mentorship evidence mechanism — implemented this session

The gap in finding #3 above is now closed at the infrastructure level.
Extended the existing `journalStore`/`creators-journal` types rather than
adding a 4th parallel verification system:

1. Renamed `RepairVerification` → `EvidenceVerification` in
   `src/types/creators-journal/index.ts`. Pure rename, zero field changes —
   confirmed via grep before renaming that it was referenced in exactly one
   place outside its own definition (`RepairEvidence.verification`); the
   only other hits for the string "RepairVerification" are unrelated
   function names in `STEMSageVerificationProtocol.ts`
   (`buildRepairVerificationSession` etc.) that just happen to contain the
   substring.
2. Added `DevelopmentEvidence`, a sibling to `RepairEvidence` (not forced
   into its repair-shaped `item`/`fault`/`diagnosis`/`repair` fields).
   Fields: `id`/`journalEntryId`/`createdAt`/`createdBy` envelope (same
   shape as `RepairEvidence`), `programme: string`, `developing.description`,
   `process.methodDescription`/`sessionsCount`/`totalTimeSpent`,
   `outcome.outcomeDescription`, and `developedMemberConfirmation` — the one
   genuinely new field family, since "the developed member confirms it
   themselves" (what TNB-2.4 specifically requires) has no `RepairEvidence`
   equivalent. `verification: EvidenceVerification`, reused as-is.
3. Added store actions in `journalStore.ts`: `submitDevelopmentEvidence()`,
   `getDevelopmentEvidenceById()`, `getDevelopmentEvidenceByProgramme()`,
   `witnessDevelopment()` (mirrors `witnessRepair()`'s logic almost
   exactly), `confirmByDevelopedMember()` (new — sets
   `developedMemberConfirmation` and upgrades `verification.status` from
   `unverified`/`self-reported` to `peer-witnessed`, without downgrading a
   stronger status a separate witness call may already have set). New state
   slice `developmentEvidence: Record<string, DevelopmentEvidence>`, added
   to the `persist` `partialize` list alongside `repairEvidence` so it
   survives reloads the same way. Deliberately did NOT route this through
   `recalculateGate`/`DIAGNOSTIC_GATE` — those are STEMgeneers-repair-layer
   specific and don't apply here.
4. Built the shared UI component:
   `src/components/creators-journal/DevelopmentWitnessForm.tsx` +
   `.css`, cloned from `PrototypeLab.tsx`'s inline `WitnessForm` pattern
   (same open/closed toggle, same inline-form shape) but with two sections
   instead of one — a "developed member confirms it themselves" form
   (primary evidence) and a "third-party witness" form (secondary,
   identical mechanism to a repair witness) — since evidence-requirements.md
   treats those as distinct, not interchangeable.
5. Deliberately left `BadgeProgress.tsx`'s separate
   `maya-confirmed`/`rov-assessed`/`mutual-attestation` model untouched —
   still an open product question, not an engineering call to make
   unilaterally.

Verified: scoped `tsc` check on the three touched/added files is clean; a
full project-wide `tsc --noEmit -p tsconfig.json` run shows the same 403
pre-existing error lines as before this change, with zero errors in any of
the three files (confirmed by grep on the output, not by assumption).

**What's NOT done — this is infrastructure, not integration**: nothing in
the live app currently calls `submitDevelopmentEvidence()` or renders
`DevelopmentWitnessForm` — there's no page-level UI yet for a member to
actually log a development/mentorship record on Trubble n Bass, STEMgeneers,
or Bright Sparks. The mechanism exists and is verified at the type/store
level; wiring a creation flow into each programme's actual page is separate,
undone work — same situation `progression-map.ts` was left in after
landing. Whoever picks this up next: build that per-programme creation UI,
then re-check Coxsone Dodd, Dorothy Vaughan, and Noel Pointer's Builder+
tiers against it specifically — don't assume it closes them until verified,
per the standing discipline below.

**What this does NOT fix** — separate problems, not solved by the above:
- Imhotep/McCoy's Skunkworks Innovator venue (no showcase venue exists at
  all — a missing feature, not a missing evidence-logging mechanism).
- Balla Fasséké's formula/meter-analysis tooling (no analysis feature
  exists).
- Charles Drew's preservation-science mismatch (wrong sandbox entirely —
  thematic overlap, not mechanical fit).

## OPEN TASK — the actual next step

**Wire the development/mentorship mechanism into a real programme page.**
The infrastructure from finding #4 exists and type-checks clean, but
nothing calls it yet. Pick one programme (Trubble n Bass is the obvious
first candidate — it's where Coxsone Dodd's TNB-2.4 criterion already
exists in the accreditation docs and just needs a real evidence path) and
build the creation UI: a form calling `submitDevelopmentEvidence()`,
surfaced somewhere a member would actually reach it, with
`DevelopmentWitnessForm` rendered on the resulting record. Then, and only
then, re-check Dodd/Vaughan/Pointer's Builder+ tiers against it — don't
mark them closed on the strength of the mechanism existing, the same
mistake this session found in the TNB-2.4 doc's own "verified via the
platform's existing peer-witness requirement" claim.

## STANDING DISCIPLINE FOR THIS REPO

Unchanged from the 20 Aug handoff, reconfirmed this session (Dodd's
claimed-closed gap turning out not to be closed is a fresh example of
exactly this pattern):

- Check the actual file content, not just that a path exists.
- Don't trust directory-structure-only comparisons to prove two locations
  are duplicates — content can diverge silently.
- Scope tool checks (`tsc`, etc.) to the specific file in question before
  trusting a project-wide run.
- A prior session's (or a prior document's) "verified"/"closed" claim is
  not itself verification — re-check if the stakes are high enough to
  matter. This session's single most important finding is that a written
  claim of "gap closed" was not backed by the code it named.
