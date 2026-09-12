# Ntikuma Broadcast Coordination — Full Design Package

**Status: design specification, not a build instruction.** Consolidates four separate
design decisions made in chat after `CoordinatorsByProgramme` was built (confirmed
received and implemented by Claude Code — see `WW-CANONICAL-ROSTER.md`'s Ntikuma
section), but never confirmed as actually exported into the repo until now. Read in
order — each section builds on the one before it. **Nothing in this document should be
built without a separate, explicit go-ahead**, per the original phased plan's gating
(Phase 3.3 was never authorised to build).

**Gate check, done before writing this file, not skipped:** per this session's own Full
Status Check, Phase 1/2 are not confirmed fully complete — item 2.2 (a standalone
"confirmed, current, live programme list") was never produced, and item 2.3 (`ChildByProgramme`
reconciliation) still has two of the original four mappings (`money-reset→Kumi`,
`roots→Esi`) genuinely unreconciled, sitting exactly as originally added. Per this
package's own stated rule — *"If Phase 1/2 haven't been confirmed complete yet... this
package should wait — don't start Phase 3 work ahead of that gate"* — this file is being
created as a documentation export only (the instruction explicitly given: "Export This
Whole Document"), not as the start of Phase 3 build work. That distinction matters and is
not being blurred.

---

## ⚠️ Flag found while exporting this document, not present in the original chat content

**`src/safeguarding/WatershedGate.ts` already exists in this repository** — untracked,
uncommitted, 169 real lines of functional code (`evaluateAgeGate`, `isPastWatershed`,
`evaluateWatershedAccess`). It implements the **Part 2 / Part 4, Side 1** piece of this
exact design: the 9pm watershed hour and the age-13-plus-guardian-consent gate reusing
the STEMgeneers Layer 1 mechanism. Its own header text states this was "Decided 22 Aug
2026 (CJ, direct)" and separately lists, almost verbatim, the scope this document's Part
4 also names as out of its coverage — Mother's Hour, Children's Storytime, term-time
scheduling, producer-facing category selection.

This is not a coincidence — this document appears to be the actual source material
behind that file's build. **But this document's own status line says the whole package
was never authorised to build, and Phase 1/2 are not confirmed complete.** Whether
`WatershedGate.ts` should be treated as pre-authorised (since it implements a decision
CJ gave directly and confirmed, per its own header) or as a genuine scope violation (since
the phased-plan gate this document itself invokes was not satisfied) is a real,
unresolved question — not decided here, not guessed at. This needs an explicit call from
CJ, the same as everything else this package defers. Recorded here because exporting this
document without noting that part of it already exists in code would itself be the kind
of silent drift this session's whole discipline exists to catch.

**Nothing further has been built as a result of this export.** This file is
documentation only.

---

## Part 1 — Phase 3.1 Answered: Broadcast Mechanics, Passionista/Connoisseur, Calendar Visibility

CJ's answers to the three grounding questions that unblock 3.3 scoping:

**Broadcast mechanics:** Ntikuma assigns/schedules broadcast slots — e.g. G-Tech Casters
gets a specific slot to broadcast a Trubble n Bass session. This is an
assignment/scheduling model — he actively allocates time, not just approves what others
propose.

**Passionista vs. connoisseur — a content-domain split, not a skill-tier or role-type
split:**

- Passionistas = programmes/content threads centred on women's topics (example given:
  menstruation-related content).
- Connoisseurs = programmes/content threads centred on men's topics (example given:
  prostate cancer-related content).

These are the two role-categories Ntikuma coordinates broadcast scheduling across,
alongside general (non-gendered) content.

**Calendar visibility:** yes — show times should be visible platform-wide, obvious to
any member. CJ explicitly flagged real pros and cons to full visibility that hadn't been
enumerated at the time — a considered yes with tradeoffs, not a blind one.

**Flag carried forward from this stage, not yet resolved at this point:** does
passionista/connoisseur content route through the platform's existing safeguarding
infrastructure (DSL/deputy governance, the STEMgeneers Layer 1 age-gating precedent,
Kept Knowledge's content-sensitivity flags), or does it need separate handling? This was
deliberately left open here — see Part 2, where CJ answered it.

**Real design implication for the calendar scope, identified at this stage:** "show
times visible" and "who can actually access the content" are two different things, and
the data model needs to keep them separate — the fact a slot exists can be visible
platform-wide; access to a gated slot needs its own check.

---

## Part 2 — Decision: Passionista/Connoisseur Safeguarding

CJ's decision, given directly, resolving Part 1's open flag: passionista/connoisseur
content routes through the **same** safeguarding checks as other sensitive member
content on the platform. Stated rationale, plainly: *"some conversations are not for
children's ears."* This is decided, not open — build to it.

Concretely: passionista/connoisseur broadcast content needs the same kind of gate
already established elsewhere on the platform — the STEMgeneers Layer 1 precedent
(minimum age 13, paired with active supervision rather than age alone) is the closest
existing model, but don't assume the exact same threshold applies without checking — see
Part 4, where CJ confirmed it does.

**Design implication for the calendar's data model:** the broadcast slot structure
needs a field distinguishing "visible to all" from "requires safeguarding gate to
access," not just a passionista/connoisseur label alone. Check how the platform's
existing gating mechanism (whatever Layer 1 actually uses) is implemented in code
before building a second, parallel mechanism — reuse it if the current implementation
allows.

*(Cross-check, added on export: as of 23 Aug 2026, "the STEMgeneers Layer 1 mechanism"
did not exist anywhere in the repo as its own spec/provenance file prior to this — see
`WW-OUTSTANDING-TASKS.md`'s correction on this point. `WatershedGate.ts`'s own header
confirms the same: "That mechanism did not exist anywhere in the repo before this file
— this is the first real implementation of it, not a port of existing code." Anyone
picking this up should not assume a separate, older Layer 1 implementation is sitting
somewhere waiting to be reused — as of this export, `WatershedGate.ts` (if it is treated
as in-scope at all — see the flag above) would be the first and only implementation.)*

---

## Part 3 — Watershed Concept (before the specific hour was confirmed)

CJ's framing for how the safeguarding gate gets delivered: "watershed programming" —
modelled on broadcast television's watershed convention (e.g. the UK's 9pm watershed,
confirmed as the actual hour in Part 4). Certain slots sit within a designated,
publicly-known later time-band, and that time-band itself functions as a visible,
understood signal to members — on top of, not instead of, the actual age/supervision
gate underneath.

This adds a third layer to the calendar's data model, beyond visibility and
access-control: a "watershed" property, distinct from but related to the
passionista/connoisseur category and the age-gate requirement. On the calendar itself,
watershed slots should be visually/structurally distinguished from daytime/general
slots — the timing itself does expectation-setting work before anyone reaches the
underlying access check.

---

## Part 4 — Full Scheduling Framework: 9pm Confirmed, Two-Sided Structure

**The hour:** 9pm, confirmed directly by CJ. Rationale: a convention that's worked for
decades and is familiar across all the cultures WW serves, not just one. Use exactly
this hour, not a placeholder.

This is not just an access-gate hour — it's a full two-sided scheduling framework, and
both sides need to be in scope:

**Side 1 — post-9pm:** passionista/connoisseur and other adult-oriented content (music,
comedy, etc.) sits after 9pm. The watershed reduces the likelihood of this content
airing before it, as an upstream scheduling norm, not only a viewer-facing access check.

**Side 2 — pre-9pm, genuinely new scope, not covered in Parts 1-3:** the watershed also
restores a positive, named structure for children's and teen programming, deliberately
tied to real calendar patterns — after-school hours, half-term, and school holidays. CJ
gave two named example slot categories, described as real intended programming
categories, not just illustrations:

- "Mother's Hour"
- "Children's Storytime"

Treat these as named slot types the scheduling system should be able to represent. Do
not assume these two are the complete list — CJ may have more in mind not yet named;
flag this as an open question rather than assuming exhaustiveness.

**A third function, also new scope:** CJ explicitly said this framework should help WW's
own "budding broadcasters" (member producers — described as covering things like books,
so this is not audio/video-only) age-manage their own associated productions as they
create them. This has a real producer-facing dimension distinct from the viewer-facing
calendar — some way for a member creating content to understand and select which
category their work belongs in as they produce it, not just an admin/Ntikuma-level
scheduling tool.

### Full revised scope for 3.3 (once authorised to build — still not authorised as of this document)

- Calendar/schedule data model representing, at minimum: general slots, named
  pre-watershed recurring categories (Mother's Hour, Children's Storytime, and
  presumably others not yet named), and post-watershed passionista/connoisseur slots —
  three-plus categories, not a binary gated/ungated split.
- Recurring scheduling tied to calendar patterns (after-school times, half-term, school
  holidays) — check whether WW already has any concept of a school term/holiday
  calendar elsewhere in the codebase before building a new one. *(Not checked as part of
  this export — this document is documentation only, per the gate above; that check
  belongs to whoever eventually scopes the build.)*
- A producer-facing element letting a member select which category their work belongs
  in as they submit/produce it — scope as a real requirement, not an afterthought.
- The post-9pm access gate itself (age-13-plus-supervision, reusing the STEMgeneers
  Layer 1 mechanism if the code allows) — unchanged from Part 2's decision.

### Still open, explicitly not decided anywhere in this package — flag both as real questions for CJ, do not guess

- Whether Mother's Hour, Children's Storytime, and similar named slots need their own
  safeguarding/age consideration, or are simply understood as safe by virtue of being
  pre-watershed.
- The complete list of named pre-watershed categories beyond the two given examples.

---

## Status of this whole package

Fully specified design, gated behind Phase 2 confirmation per the original phased plan,
and **not authorised to build**. Per this session's Full Status Check, Phase 1/2 have
not been confirmed complete (see the gate check at the top of this file) — this package
should continue to wait, the same discipline that was violated once already this session
(the original `ChildByProgramme` fix landing before canon was checked), and — per the
flag recorded above — may already have been partially violated a second time by
`WatershedGate.ts`. That is a decision for CJ, not resolved by this export.
