# Wembley Wonders — Session Handoff (22 Aug 2026, curator course-content build-out)

For Claude Code (or the chat assistant, if pasted back there): this continues
`WW-SESSION-HANDOFF-2026-08-21.md` on a different thread — curator lesson/
workbook content build-out, not the accreditation-data verification work
that doc covers. Everything below was verified against real files during
this session — treat it as ground truth, not assumption, unless your own
investigation shows otherwise.

## CONFIRMED FINDING — the curator roster/tutoring-focus doc does not exist

The session-handoff brief that kicked off this build-out cites
`WW-CURATOR-ROSTER-AND-TUTORING-FOCUS.md` as "already in repo/handed over"
and the authoritative "who they are + what they teach" layer. It does not
exist anywhere in this repo — checked directly. Two other names for what
may be the same or a related doc were also checked and are equally absent:
`ww-curator-tutoring-focus.md` (cited by `docs/curator-content/WW-Curator-Course-Content-Templates.md`
itself, line 52, as the source for each curator's tier ladder) and
`ww-programme-curators-roster.md` (cited in `docs/WW-OUTSTANDING-TASKS.md`).
Three separate sessions/docs each point to a canonical curator roster under
a different name; none of them landed in the repo. Same chat-memory-only
pattern already flagged elsewhere in this project (`maya-buddy.jpg`,
`atelier-commission-email-templates.md`, the Children-of-Anansi roster
before `WW-CANONICAL-ROSTER.md` was built earlier this same day).

**Decision, made with CJ:** don't reconstruct that roster doc now, don't
pause the whole task waiting on it either. Proceed on the 3 curators who
already have real, verified Explorer-tier content (Fasséké, Dodd, Cooke),
using each curator's own already-written "next tier" trailer as the real
source for what comes next — genuine content already committed to, not a
fabricated tier ladder. Leave the other 23 curators blocked until the
roster question is actually resolved; don't guess their tier progressions
in its absence.

**File path confirmed:** the 3 existing Explorer-tier builds stay at
`docs/curator-content/<programme>/`, not the `docs/accreditation/course-
content/<programme>/<curator-slug>/` path the build-out brief proposed.
Nothing in the app references these paths programmatically; moving them
was assessed as pure churn with CJ and declined.

## BUILT THIS SESSION — Builder tier for the 3 proven curators

`docs/curator-content/WW-Curator-Course-Content-Templates.md` (Template A/B)
was already in the repo, already matched what the build-out brief describes
as "reconstruct/confirm" — used directly, not rebuilt.

- **Balla Fasséké (Pageturners, Template A)** —
  `pageturners/balla-fasseke-builder-lesson-01.md` +
  `pageturners/balla-fasseke-builder-workbook-01.md`. Extends Explorer
  tier's single formula-slot into a 5-slot bank matched to a deliberately
  chosen meter, ending in an original opening stanza. `[REAL TOOL]` field
  re-checked, not assumed: still no meter/formula-analysis mechanism
  anywhere on the platform; written exercise remains the evidence itself.
- **Coxsone Dodd (Trubble n Bass, Template B)** — first version built as
  `coxsone-dodd-builder-lesson-01.md` + `.../coxsone-dodd-builder-workbook-01.md`,
  a 3-session development log. **Superseded the same session** — see
  "REPLACED" section below for the richer version CJ supplied and why it's
  better. Current file: `trubble-n-bass/coxsone-dodd-builder-lesson-and-workbook-01.md`.
- **Sam Cooke (Soul, Template B, compound)** —
  `soul/sam-cooke-builder-lesson-and-workbook-01.md`. Structural decision:
  Explorer tier combined Coaching and Platform-Building into one shared
  Part One/Part Two; this build-out brief's own §3 compound-technique rule
  says a bundled-skill curator should get the Part One/Part Two split run
  *once per bundled skill*, not once overall, once evidence needs to show
  sustained practice rather than a single instance. Builder tier follows
  that rule: two full tracks (Coaching, Platform-Building), each with its
  own solo training and real-evidence log, both required for a complete
  submission. Flagging this as a deliberate divergence from Explorer tier's
  structure, not an inconsistency — Explorer tier's single-pass shape was
  adequate for proving each mechanism once; Builder tier's sustained-
  evidence requirement isn't.

## UPDATE — Template B Part Two gets a second path (22 Aug 2026, after the Dodd Builder-tier build)

CJ added a structured-pairing option to Template B's real-people evidence
step, alongside the existing organic path (find a real relationship in your
own circle): a scheduled, facilitated Zoom session pairing two members,
with the facilitator's sign-off standing in as the third-party witness
`DevelopmentEvidence`'s `confirmByDevelopedMember()` was designed for but
has no UI to collect directly. Organic stays the default/primary path —
it's the closer match to how Dodd, Kitchener, and Vaughan actually worked —
structured-pairing is the answer for a member with no obvious person to
coach, or where a genuine third-party witness is specifically wanted. This
does not close the underlying platform gap (no UI calls
`submitDevelopmentEvidence()` yet) — it's a manual pilot path that can feed
into that mechanism once it's wired up, not a replacement for building it.

Applied to `docs/curator-content/WW-Curator-Course-Content-Templates.md`
(Template B's Part Two and Explorer-tier "Try This Yourself" section), and
retrofitted into the two already-built files that use this exact mechanism:
Dodd's Builder-tier lesson + workbook (both paths now explicit, including a
facilitator-name field), and Cooke's Builder-tier Coaching track (Track
Two, Platform-Building, is unaffected — it doesn't use `DevelopmentEvidence`
and has no verified mechanism at all yet, unchanged). Fasséké's Builder
tier is Template A and untouched by this update.

## REPLACED — Dodd's Builder tier, with a richer, framework-based version

CJ supplied a complete replacement for Dodd's Builder-tier content, superior
to what this session built first. Ported verbatim (formatting adapted to
match repo heading conventions, substance unchanged) to
`trubble-n-bass/coxsone-dodd-builder-lesson-and-workbook-01.md`, replacing
the two files this session built earlier today
(`coxsone-dodd-builder-lesson-01.md` + `coxsone-dodd-builder-workbook-01.md`,
now deleted).

What changed and why it's better: my first version asked for a 3-session
development log — more of the same Explorer-tier observation, repeated.
CJ's version adds a real framework first: six anonymised, historically-
grounded A&R case studies (Part One), which the learner analyses for a
*pattern* before applying that trained judgment to one real coaching
attempt (Part Two) — a genuinely different, harder skill than repeated
observation. Also restructured as a single combined lesson-and-workbook
file (matching Cooke's Explorer-tier precedent) rather than split files —
both shapes are now confirmed acceptable, matched to what the content
needs.

**New standing design rule, added to `WW-Curator-Course-Content-Templates.md`
item 6:** every tier beyond Explorer for a relationship-based (Template B)
curator should add something Explorer didn't have — a framework, a harder
judgment call, a longer time horizon — not just repeat the same observation
task more times. Apply this when building Innovator/Leader tiers for Dodd,
and when building Builder tier onward for any other Template B curator
(Kitchener, Kemistry, Vaughan, Noel Pointer, the TNB genre curators).

## NEW — Son/Salsa cross-reference content, and a real gap caught while porting

CJ supplied a new Explorer-tier lesson that isn't tied to a locked curator:
`trubble-n-bass/son-salsa-credit-where-due-explorer-lesson-and-workbook-01.md`.
Deliberately not a curator entry (Rodríguez/Pacheco anchor Son/Salsa itself)
— honest cross-reference material on Afro-Cuban jazz/mambo history (Bauzá,
Machito, Chano Pozo, the López brothers), same treatment as Lee Perry
inside Dodd's entry. Core skill: correcting the historical record —
separating who's famous for something from who actually did it first.

**Gap found and fixed before porting, not after:** the source brief's
`[REAL TOOL]` field named the Knowledge Commons deposit system
(`citationStore.ts` / `KcResearchDeposit`) as "where a properly sourced
correcting brief actually belongs on the platform," without flagging that
it's infrastructure-only. Checked directly, not assumed: `citationStore.ts`'s
own header comment confirms the `KcResearchDeposit` write-side "has never
been built" and the store's actions are "honestly stubbed... no fake
'success' states"; separately confirmed zero pages anywhere in the app
render or call `citationStore` at all. Same situation as Dodd's
`DevelopmentEvidence` gap. Added the honest caveat to the `[REAL TOOL]`
field and Activity 3 before porting — the written, dated brief is stated as
the evidence artifact itself, not a placeholder for a submission path that
doesn't exist yet.

**Structural decision left open, per the source note's own instruction:**
whether this lesson becomes a second Explorer-tier entry alongside Son/
Salsa's own future curator content, or gets folded into it as shared
context — explicitly "worth deciding when that build happens, not before."
Not decided here.

## NEW — Noel Pointer (Bright Sparks), and a nuanced [REAL TOOL] correction

CJ supplied Bright Sparks' and Noel Pointer's first Explorer-tier content:
`bright-sparks/noel-pointer-explorer-lesson-and-workbook-01.md` (new
programme folder). Technique is pedagogical, not genre-specific — teaches
a 3-principle method for making an intimidating subject land for a total
beginner (question-first, ground in the familiar, name mistakes in
advance), worked through calculus as the example subject, not the point of
the lesson.

**Correction made before porting — more nuanced than prior gaps, not
identical to them:** the source brief's `[REAL TOOL]` field said Creators
Journal logging is "the same as any other Bright Sparks evidence,"
implying an established practice. Checked directly: `addEntry` in
`src/stores/journalStore.ts` is real and genuinely live — not a stub, it's
actively called by `MayaHeritageAwareness.tsx` and a couple of
ROV-tracking components. But nothing in Bright Sparks itself
(`SparkDiscoveryJourney.tsx`, `BrightSparksSandbox.tsx`) calls it — there's
no actual precedent of Bright Sparks evidence being logged this way.
Corrected the lesson to state that precisely: the mechanism is live
platform-wide, just not wired to this specific programme yet.

## NEW — Noel Pointer's second Explorer piece (money edition)

CJ supplied a second Explorer-tier lesson for Pointer:
`bright-sparks/noel-pointer-explorer-lesson-and-workbook-02.md`. Same
method (question-first, ground in the familiar, name mistakes in
advance), applied to interest/inflation/credit scores instead of
calculus — deliberately proving the lesson shape transfers across
unrelated subjects, and filling a real, previously-flagged gap (no
Bright Sparks pathway touches financial literacy). `[REAL TOOL]` claim
re-checked, not assumed carried over: identical situation to Lesson 1 —
`addEntry` in `journalStore.ts` is live platform-wide but still not
called anywhere in Bright Sparks. Same correction applied.

## BUILT — Innovator tier for the 3 proven curators

- **Balla Fasséké (Template A)** — `pageturners/balla-fasseke-innovator-lesson-01.md`
  + `.../balla-fasseke-innovator-workbook-01.md`. Extends the Builder-tier
  opening stanza into a complete piece, adds a genuinely new skill Builder
  tier didn't require: judging when a formula-slot has stopped earning its
  place across a longer piece, and retiring/replacing it deliberately.
  `[REAL TOOL]` re-checked, unchanged.

- **Coxsone Dodd (Template B)** — `trubble-n-bass/coxsone-dodd-innovator-lesson-and-workbook-01.md`.
  Grounded directly in TNB-2.4's real accreditation text
  (`accreditation/programmes/trubble-n-bass/evidence-requirements.md`) —
  its two named evidence types (Artist development record, Developed
  member's confirmation) structure this tier's evidence requirement.
  **Correction carried forward, not repeated as true:** that same
  accreditation doc claims Criterion 2.4 is "verified via the platform's
  existing peer-witness requirement" and cites a nonexistent
  `ww-skunkworks-impact-labs.md` — both already found false in the 21 Aug
  handoff (three disconnected verification models exist, not one unified
  mechanism; no Skunkworks/Crew Log exists in code). The lesson states
  this directly rather than silently repeating the accreditation doc's
  overstatement. New layer beyond Builder tier: knowing when a development
  relationship has reached its honest limit and saying so is framed as
  real, complete evidence — not a lesser outcome than a success story.

- **Sam Cooke (Template B, compound)** — `soul/sam-cooke-innovator-lesson-and-workbook-01.md`.
  Per his own Builder-tier trailer: the two tracks (Coaching,
  Platform-Building) converge here rather than running separately — a
  platform placement has to be causally earned by real coaching, not just
  offered alongside it. An honest "not ready yet" is framed as a complete,
  valid submission, matching Dodd's same principle.

All three apply the tier-differentiation design rule (templates doc item
6): each Innovator tier adds a genuinely new judgment Builder tier didn't
require, not just a longer version of the same task.

## BUILT — Leader tier for the 3 proven curators (all 4 tiers now complete)

- **Balla Fasséké (Template A)** — `pageturners/balla-fasseke-leader-lesson-01.md`
  + `.../balla-fasseke-leader-workbook-01.md`. The member no longer
  chooses the subject/meter — teaches the full method to someone else on
  material neither of them picked, and evidence includes the taught
  person's own explanation in their own words, not a summary.

- **Coxsone Dodd (Template B)** — `trubble-n-bass/coxsone-dodd-leader-lesson-and-workbook-01.md`.
  **Correction made to my own prior work, not just the source material:**
  Innovator tier's closing trailer (written by me last turn) said Leader
  tier would be "TNB-3." Checked directly before writing this lesson:
  TNB-3 (`accreditation/programmes/trubble-n-bass/unit-mapping.md`) is
  explicitly curator-grounded to three *other* people — Bernard Edwards,
  Jam Master Jay, Terror Danjah — and its criteria (3.1–3.4, in
  `evidence-requirements.md`) are real production/distribution craft, not
  A&R. This lesson does not claim that content. What it actually asks for:
  the artist Dodd developed reaching TNB-3's real steps (Rayd-yo airplay,
  Joystick portfolio) as an outcome of his coaching, correctly credited to
  the artist's own work — or an honest "not ready yet" account if that
  hasn't happened. Same "don't force a curator into someone else's slot"
  discipline this session already applied to the Son/Salsa cross-reference
  lesson, now caught in my own trailer rather than only in source material.

- **Sam Cooke (Template B, compound)** — `soul/sam-cooke-leader-lesson-and-workbook-01.md`.
  Per his own trailer: sustains the Innovator-tier convergence across two
  artists at genuinely different stages, testing honest triage rather than
  just repeating the single-case convergence at a bigger number.

All three curators now have complete 4-tier arcs (Explorer → Builder →
Innovator → Leader) — the first curators on the platform to reach that
state. Both Template A (Fasséké) and Template B (Dodd single-technique,
Cooke compound) now have a full worked arc future curators can reference.

## CURRENT BUILD STATE (verify before extending, per this brief's own §1)

3 of 26 curators (Fasséké, Dodd, Cooke) now have all 4 tiers complete
(Explorer/Builder/Innovator/Leader) — the first curators on the platform
to reach full tier completion. A 4th,
Noel Pointer, now has 2 Explorer-tier pieces (calculus, then money) —
still Explorer tier only, no Builder yet. The other 22 curators have no
course content built at all. Plus one non-curator piece: a Son/Salsa
cross-reference Explorer lesson (Bauzá/Machito/Pozo/López brothers),
deliberately not counted against the 26-curator roster — see its own
section above for the still-open placement decision. 9 of 14 programmes
(G-Tech Casters, Rayd-yo, Roots, Silk Stilettos, Auntie Anansi's Kitchen,
TECHreneurs, Scrap Cat, Easy Street, Joystick) still have no tutoring-focus
spec drafted — unchanged from the 21 Aug handoff, not re-verified this
session since nothing in this session's scope touched them.

## OPEN — the actual next step

Two independent threads, either can go first:

1. **Continue the 3 proven curators to Innovator tier** — same "use their
   own committed trailer, don't invent" discipline this session used for
   Builder tier. Dodd's Innovator tier specifically maps to TNB-2.4, whose
   "verified via platform's existing peer-witness requirement" claim was
   already found inaccurate 21 Aug — don't let new lesson content restate
   that claim as true.
2. **Resolve the roster-doc gap** — either get `WW-CURATOR-ROSTER-AND-
   TUTORING-FOCUS.md`'s real content supplied from chat memory, or build a
   `docs/research/WW-CURATOR-ROSTER-AND-TUTORING-FOCUS.md` the same way
   `WW-CANONICAL-ROSTER.md` was built earlier today — compiling what's
   actually verifiable (this doc's 21 Aug table + the build-out brief's own
   curator list) into one real file. Only once this exists can the other
   23 curators' work start without guessing.

## STANDING DISCIPLINE FOR THIS REPO

Unchanged from the 20/21 Aug handoffs:

- Check the actual file content, not just that a path exists.
- A prior session's (or a prior document's) "verified"/"closed"/"already in
  repo" claim is not itself verification — this session's own example is
  the roster-doc citation above.
- Log any newly-discovered platform gap here immediately, even if
  unresolved, rather than letting it sit untracked until the next session
  has to rediscover it.
