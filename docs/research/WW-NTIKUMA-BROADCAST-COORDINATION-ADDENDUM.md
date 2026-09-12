# Ntikuma Broadcast Coordination — Addendum

**Read alongside `WW-NTIKUMA-BROADCAST-COORDINATION-DESIGN.md` — does not replace or
restate it.** Closes the two items that main package's Part 4 left explicitly open.
**Status: same gating as the main package — this closes two open questions in the
design, it does not authorise building anything.** Phase 3.3 build still requires a
separate, explicit go-ahead, and still depends on Phase 2 being confirmed complete
first (see the main package's own gate check — still not satisfied as of this addendum).

---

## 1. Named pre-watershed categories — resolved

CJ's answer: **Bright Sparks *is* the weekend pre-watershed structure, not one category
alongside others.** Concretely:

- Saturday/Sunday slots, subdivided by WW's other 13 programmes — each giving children a
  taster/introduction to that programme's real subject matter. This is consistent with
  Bright Sparks' existing role (feeder/taster tier, deliberately not badge-gated,
  awareness-level content) — it's an extension of what Bright Sparks already does, not a
  new function.
- Mother's Hour gets a specific placement: the school-run slot, not a generic "somewhere
  pre-watershed" category.

**Implication for the data model:** Bright Sparks weekend slots need a sub-category
field referencing which of the 13 other programmes each slot is introducing — this is a
real structural relationship (Bright Sparks slot → linked programme), not just a flat
label. Named example slots so far: the Bright Sparks weekend cross-programme structure,
and Mother's Hour (school-run). **Still genuinely open, not resolved by this
addendum:** whether there are further named categories beyond these two — do not assume
the list is complete.

**Cross-check, added on export (23 Aug 2026):** this resolution lines up with real,
existing platform infrastructure, not just a chat decision floating unconnected to code.
`src/safeguarding/SafeguardingFocus.ts`'s `TIER_SAFEGUARDING_POSTURE` (Section 13 of
`WW-SPEC-SAFEGUARDING-STRATEGY-001.md`) already defines Bright Sparks' posture exactly
this way: `badgeGated: false`, `focus: 'Awareness-level only. Does not assume a shared
starting line — teach, do not presume.'` That posture was set independently of this
broadcast-coordination design and matches it — a real point of internal consistency, not
manufactured for this document.

---

## 2. Safeguarding for pre-watershed content — resolved, but a different mechanism than post-9pm

CJ's answer: the same standard applied by flagship broadcasters (BBC, LBC) to their
pre-watershed content — editorial/presenter judgement on material appropriateness, so
that sensitive topics (crime, discrimination, similar) are handled with the respect and
care expected for the audience and slot, rather than avoided or sanitised into nothing.

**Important — this is not the same mechanism as the post-9pm gate. Do not build one
system for both.** Two genuinely different mechanisms for two different content bands:

- **Post-9pm (passionista/connoisseur):** a technical access-control gate —
  age-13-plus-supervision, reusing the STEMgeneers Layer 1 mechanism (per Part 2 of the
  main package). This is a login/permission-style check.
- **Pre-9pm (Bright Sparks weekend, Mother's Hour, general content that touches
  serious-but-age-appropriate topics):** editorial standards and presenter/producer
  judgement — a content-review practice applied before or during production, not an
  access gate a member hits when trying to view something.

### What was actually checked before writing anything further — per this addendum's own instruction, not assumed

**The DSL/deputy governance structure is real and already documented**, not something
to invent. `docs/safeguarding/WW-SPEC-SAFEGUARDING-STRATEGY-001.md`, Section 1: one
Designated Safeguarding Lead (Judith, child-development specialism); one named deputy
— **not yet decided** (Flora is a plausible fit, currently advisory rather than
decision-authority; formalising this is an open action item in that document, unrelated
to broadcast coordination). All flags route to the DSL + deputy pair; no individual
tutor/curator/ROV actions a concern unilaterally. This is mirrored in code:
`src/safeguarding/SafeguardingFocus.ts` exports `classifyEscalation()` (pattern-vs-incident
decision logic — a single incident is never auto-escalated; a repeat pattern triggers
`escalate-to-dsl`) and `routeToDSL()`. **`routeToDSL()` is explicitly stubbed** — its own
comment: "no DSL notification channel wired yet" — it logs a warning rather than faking a
real escalation.

**But this existing structure is about interpersonal/conduct risk, not broadcast content
appropriateness.** `SafeguardingFocus.ts`'s risk categories (fame-based access,
institution-based access, inherited status, backstage access, consequence transfer) and
its root-condition lenses are built to catch grooming/coercive-control patterns between
people — a mentor and a member, a senior figure and someone junior. Nothing in this file
or the spec it implements addresses "should this piece of content about crime or
discrimination air pre-watershed, and how should it be handled" — a content-editorial
question, not a person-risk question. **The DSL/deputy pair is a plausible escalation
backstop for editorial judgement calls too** (nothing in the spec restricts it to
conduct only), but the actual editorial-judgement *practice* — the BBC/LBC-style
presenter/producer content-review step CJ is describing — does not currently exist
anywhere on the platform as a built mechanism, under any name.

**Two named things that sound closer, checked directly and found not to be the same
concept, or not to be built at all:**

- **`EditorialStandardPage.tsx`** (live, routed at `/editorial-standard` and
  `/knowledge-commons?mode=framework`) is a real, real six-question framework — but it
  governs Knowledge Commons research/archive integrity (provenance, "who is missing from
  this account," extraction-vs-return, the dignity test for a subject recognising
  themselves in an account). It is not a broadcast-content-appropriateness practice.
  Named "editorial standard," genuinely a different concept — flagging so it isn't
  conflated with what this addendum needs.
- **"Guardian/Keeper sign-off chain for creative output"** — named in
  `WW-SPEC-SAFEGUARDING-STRATEGY-001.md` Section 5 ("Content as diagnostic layer": a
  member's own creative work is "reviewed through the existing Guardian/Keeper sign-off
  chain for creative output") and again in `SafeguardingFocus.ts`'s Leader-tier posture
  ("Guardian + Elder sign-off gates already sit here"). **This is the closest-sounding
  existing mechanism to what CJ described — and it has zero code implementation.**
  Searched directly: no store, no page, no gating function, no data model anywhere in
  `src/` implements a Guardian or Keeper sign-off of any kind. It is a named concept
  referenced twice, not built infrastructure. Treating it as something this new
  editorial-judgement practice could "plug into" would be wrong — it isn't there to plug
  into yet; it's a parallel, equally-unbuilt gap.

**Net finding, reported plainly rather than assumed either way:** there is a real
governance backbone (DSL/deputy) this practice could escalate into once genuinely
concerning content-editorial judgement calls arise, consistent with how conduct
escalation already works. There is no existing built practice — anywhere, under any
name — for the day-to-day editorial/presenter judgement step itself. If this is ever
authorised to build, it is new work, not a wire-up of something already there, and the
closest-named candidate infrastructure (Guardian/Keeper sign-off) would need to be built
essentially from nothing too, not extended.

---

## Status

Unchanged from the main package: **not authorised to build.** This addendum closes two
open design questions and reports what infrastructure actually exists to check against —
it does not start Phase 3.3 work, and Phase 1/2 remain unconfirmed complete per this
session's Full Status Check.
