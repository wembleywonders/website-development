# WW-SPEC-THESE-ARE-THE-FACTS-001

**"These Are The Facts" — Real-Time Correction Mechanism**

**Status:** Draft for review · **Author:** CJ Fontanelle (concept), drafted with
Claude · **Date:** 3 Sept 2026 · **Revised:** 3 Sept 2026 (Claude Code — repo
cross-references corrected; see Revisions note at end)

---

## 1. Purpose

The BBC's bleep button filters profanity — it removes something in real time and
the audience hears the removal happen. "These Are The Facts" (TATF) does the
opposite: it adds something in real time, and the audience hears the addition
happen.

Its job is not censorship. It's correction, delivered visibly enough that:

- the audience gets the accurate record alongside the claim, not instead of it
- any presenter, guest, or contributor engaging with WW platforms — Rayd-yo,
  G-Tech Casters, or any future adopter — knows in advance that unsupported
  claims will be checked and corrected on the record, live
- WW's editorial credibility is demonstrated through the act of catching, not
  just asserted in a mission statement

Working line, borrowed directly from CJ's own framing and used as the
mechanism's spoken/visual ident every time it fires: **"These are the facts."**

This spec builds on, and is triggered directly by, the four-test rubric
formalised in **WW-SPEC-SOURCE-VETTING-RUBRIC-001**. TATF is that rubric's
live/on-air enforcement arm — the vetting rubric is pre-production filtering;
TATF is what happens when something gets past pre-production, or when a claim is
made live and there is no "before" to filter.

> The rubric this depends on is the **four-test source-vetting rubric**
> (WW-SPEC-SOURCE-VETTING-RUBRIC-001), *not* the six-question Editorial Standard
> published at `/editorial-standard` (`EditorialStandardPage.tsx`). Those are
> different frameworks: the six questions govern provenance and representation
> ethics for Knowledge Commons content; the four tests govern factual claims.

**Governing principle (decided 3 Sept 2026): correction, not consequence.** TATF
exists to fix the public record in the moment — not to punish, score, or
blacklist the person who made the claim. This principle overrides any other
instruction in this document if the two are ever in tension. It extends the
restraint of Rayd-yo's "the room pushes back" standard — one honest
counter-question before moving on, regardless of how sympathetic the guest, not
relentless interrogation — to TATF as well.

> "The room pushes back" is also the canonical name of **Test 2** in
> WW-SPEC-SOURCE-VETTING-RUBRIC-001 (corroboration). Used here it means the
> broader conversational-restraint standard, not Test 2 specifically. Both the
> restraint standard and the "no pay for airtime" principle referenced in §3
> are Rayd-yo constitutional principles that are **not yet written up in a
> Rayd-yo constitution document in the repo** — that document should be created
> and both stated in it; this spec assumes them but is not their source.

A mechanism built to correct a false claim must not become a mechanism that
stifles discussion or chills good-faith disagreement; only clear Test 1/2
failures (a claim statable as fact-vs-non-fact in one breath) should trigger a
flag, never a contestable opinion or a live argument in progress.

## 2. Trigger condition — explicit tie to the four-test rubric

TATF fires when a claim, on air or in content, fails one or more of the four
tests. Which test fails determines which flavour of correction fires — a
sourcing failure is not the same kind of problem as a category failure, and the
mechanism should sound different depending on which one it is.

| Test | Failure condition | TATF flavour |
|---|---|---|
| **Test 1 — Source every claim** | Claim has no traceable name/document/date behind it ("historians say," "everybody knows") | **Source Flag** — "These are the facts: no source has been identified for that claim. Here's what the record actually shows…" |
| **Test 2 — The room pushes back (corroboration)** | Claim is single-source or actively contradicted by an independent source | **Corroboration Flag** — "These are the facts: that claim is contested/unconfirmed. Here's what independent sources say…" |
| **Test 3 — Depth over heat** | Claim's persuasive force depends on dramatic delivery, not on what survives once the delivery is stripped away | **Substance Flag** — quieter, more editorial: "Stripped of the framing, here's what that claim actually establishes…" — best suited to recorded track (see §4), rarely a live interrupt, since it requires more unpacking than a live cut allows |
| **Test 4 — Argument not category** | Claim's mechanism villain-codes a whole category rather than engaging a specific person/text/event | **Framing Flag** — distinct tone from the other three, because this isn't always a factual error, it's an argument-shape problem: "These are the facts: [X] happened, [Y] did that. What was just said described a whole category instead — here's the distinction…" |

A single claim can fail more than one test at once (the far-right debate clip
and the "diaspora wars" clip, both recorded in
WW-SPEC-SOURCE-VETTING-RUBRIC-001 §5.3–5.4, are examples — Test 1 and Test 4
failing together). TATF fires once per claim, using whichever flavour is most
load-bearing, rather than stacking multiple flags on the same moment.

## 3. Track A — Live

For live Rayd-yo broadcast (and, per §6, live G-Tech Casters commentary).

> **Precondition.** Track A assumes Rayd-yo runs genuine real-time
> host-and-guest broadcast. If current Rayd-yo output is recorded/scheduled
> (the `/raydyo` page today is an audio player + schedule + volunteer
> show-making tools; live host+guest broadcast is not confirmed in code),
> Track B is the entire mechanism until a live broadcast product exists.

**Staffing.** A dedicated role — working name **Fact Producer** — sits in the
live production chair alongside the host, with the four-test rubric loaded as
working knowledge, not a reference document to be consulted mid-broadcast. This
is a research/editorial role, not a technical one; it needs someone who can
recognise a Test 1/Test 2 failure in real time, the way a subeditor catches a
wrong date on sight.

**Mechanism.**

1. Fact Producer identifies a claim in real time that clearly fails Test 1 or
   Test 2 — statable as fact-vs-non-fact in one breath, not a contestable
   opinion or a live argument in progress.
2. A short audio/visual cue fires — distinct from the bleep's silence; a rising
   tone or ident sting, not a cut.
3. The host delivers the line: "These are the facts…" followed by the
   correction, sourced, in one or two sentences. Tone is collaborative, not
   accusatory — "worth flagging, the record actually shows…" rather than "that's
   wrong." The correction is framed as both host and guest now sharing the
   accurate record, not as an accusation.
4. **Right of reply.** The guest gets one beat to respond before the
   conversation moves on. This is a formal right-of-reply guarantee — it is
   established *here* as part of WW's editorial standards (there is no separate
   existing clause it inherits from; this is where it is written down). This
   step is not optional; a flag without a right of reply is the version of this
   mechanism CJ explicitly does not want.
5. Conversation resumes. The correction stands on the record.

**Guest relations protocol.** A live on-air correction is a bigger moment for a
guest than a quiet edit — worth a two-tier approach:

- **Yellow flag** (internal only, not broadcast): Fact Producer notes a
  borderline claim but doesn't interrupt — logged for the recorded/post-
  production pass instead (§4).
- **Red flag** (broadcast): the claim is clear and significant enough to
  correct in the moment, live — always followed by the right-of-reply beat in
  step 4 above.

Guests should be told this mechanism exists and how it works before booking,
not discovered mid-interview — the same posture as Rayd-yo's "no pay for
airtime" principle: stated plainly, in advance, so it can't be read as an
ambush. Booking communications should describe TATF explicitly as a correction
mechanism, not a penalty — consistent with §5's governing principle.

**Constraint.** Live-track TATF is necessarily faster and shallower than the
recorded track — it can only reliably catch Test 1 and Test 2 failures (a
sourcing gap, an uncorroborated claim), where the Fact Producer already knows
the answer or can access it in seconds. Test 3 and Test 4 failures usually need
more unpacking than a live interrupt allows and should default to a Yellow Flag
for the recorded pass.

## 4. Track B — Recorded

For any pre-recorded/edited WW content — Rayd-yo segments, Joystick features,
and any programme drawing on WW-SPEC-SOURCE-VETTING-RUBRIC-001's vetting (the
"Track 1" pass in earlier docs).

**Mechanism.** This is the fuller, more rigorous version — the actual four-test
rubric applied properly, not a fast in-the-moment judgement call.

1. During post-production review, any claim flagged live as Yellow (§3), or any
   claim caught fresh in a recorded segment, is checked against all four tests
   in full — sourcing traced, corroboration searched, framing/heat stripped,
   category-vs-specific checked.
2. A TATF insert is built: same spoken ident ("These are the facts…"), same
   visual/audio treatment as the live cue for brand consistency, but with room
   for a fuller correction — a sentence or two more than the live version
   allows, since there's no live pacing constraint.
3. The insert is dropped in at the exact timestamp of the original claim, not
   appended as an end-of-segment disclaimer — the correction sits right where
   the claim was made, the same way a live flag does, just built with more
   care.
4. Documentation trail: every recorded-track TATF insert cites its source in
   the credits/show notes, consistent with the rubric's citation posture.

**Advantage over live-only.** Recorded track can properly handle Test 3 and
Test 4 failures, which need explanation rather than a quick correction — the
"diaspora wars" and far-right debate clips in WW-SPEC-SOURCE-VETTING-RUBRIC-001
§5.3–5.4 are exactly the shape of content this track is built for, if WW ever
needed to demonstrate the mechanism against outside material.

## 5. Escalation — contributor track record

**Decided (3 Sept 2026): deferred, not built in v1.** No per-contributor tally,
no visible flag count, no booking-risk score attached to any guest, presenter,
or contributor in this version of the mechanism. This was the clearest way the
mechanism could tip from "correction" into "consequence" — a running tally
against someone's name functions like a blacklist, not a fact-check — and CJ's
explicit instruction was not to build something so draconian it stifles
discussion.

If escalation tracking is ever revisited, it should only happen once there's
real operating data showing the correction mechanism itself is being applied
fairly and consistently — not before. If and when that happens, it would
connect to a future `ww-rights-adaptation-governance` doc's external-advisor
verification standards (that doc does not exist yet), but that link is
explicitly not being built now.

## 6. G-Tech Casters crossover

Esports/gaming commentary already runs on real-time rules disputes and stat
corrections as a genre convention — a caster picking up TATF for a misremembered
patch note, a wrong tournament stat, or a disputed ruling is a natural second
home for the mechanism, and would prove it travels beyond Rayd-yo before any
platform-wide rollout is considered. Both live (in-broadcast casting) and
recorded (post-match analysis content) tracks apply identically — the four-test
rubric doesn't change, only the subject matter does.

> As with Rayd-yo, this assumes a live/recorded G-Tech Casters *broadcast
> product*. Today G-Tech Casters is a routed teaching programme (page +
> sandbox + a "Gaming Commentary Techniques" tutorial); there is no live
> casting output yet. Read §6 as "if/when G-Tech Casters runs broadcasts,"
> not as an available crossover now.

## 7. Open decisions

**Resolved (3 Sept 2026):**

- Contributor escalation tracking (§5): deferred, not built in v1 — see §5.
- Yellow Flag disposition: can be dropped after review if judged too minor —
  not every Yellow Flag must graduate to a recorded correction; a reviewer's
  judgement call, consistent with the "correction, not consequence" principle
  (a mechanism that forces every borderline note into a public correction risks
  the same chilling effect the principle is meant to avoid).

**Still open:**

- **Live Red Flag database timing:** does the flag get written to the system in
  real time as it's spoken on air, or only logged afterward by the Fact
  Producer? Current working assumption, consistent with "fix the record in the
  moment": real-time write, logged as it happens rather than reconstructed after
  broadcast — needs CJ's explicit confirmation before this is treated as
  decided, since it directly shapes the backend architecture (live write path
  vs. batch/post-hoc entry).
- **Live vs. recorded staffing:** is the Fact Producer role a dedicated hire, or
  folded into existing Rayd-yo/Joystick editorial workflows? Same open question
  already flagged for the consumer/budget-vetting feature.
  - Constraint: the platform's `AuthContext` role model is `USER | ADMIN |
    MODERATOR`. Note that `src/services/authService.ts` uses a *different* set
    (`MEMBER | ORGANIZER | ADMIN`) — the role model is not currently singular in
    code. Either way, Fact Producer should not become a bespoke system role; it
    is an editorial function, not an auth tier.
- **Reconciliation with Ntikuma broadcast coordination:** the Fact Producer
  role overlaps the broadcast-governance layer already designed in
  `WW-NTIKUMA-BROADCAST-COORDINATION-DESIGN.md` (+ addendum) and partly built
  in `src/safeguarding/WatershedGate.ts`. Is Fact Producer the same person as
  the Ntikuma broadcast coordinator, adjacent to them, or folded into that
  coordination model? Not addressed here.
- **Exact audio/visual cue design** (rising tone vs. sting vs. visual flag
  graphic) — needs a design pass, not decided here.

## 8. Cross-references

- **WW-SPEC-SOURCE-VETTING-RUBRIC-001** — the four-test rubric this mechanism
  enforces live. TATF's §2 flavour mapping is downstream of it.
- `WW-NTIKUMA-BROADCAST-COORDINATION-DESIGN.md` — adjacent broadcast-governance
  design; see §7 reconciliation item.
- `/editorial-standard` (`EditorialStandardPage.tsx`) — the six-question
  framework, a *separate* thing from the four-test rubric (see §1 callout).

---

## Revisions note (Claude Code, 3 Sept 2026 — not part of the spec)

Changes made to CJ's draft when filing, all repo-consistency corrections, no
design changes:

- `[[ww-source-vetting-pipeline]]` → `WW-SPEC-SOURCE-VETTING-RUBRIC-001` (§1 ×2,
  §4, §5).
- §1: added the callout distinguishing the four-test rubric from the routed
  six-question Editorial Standard, and the callout noting that "the room pushes
  back" (as a conversational-restraint standard) and "no pay for airtime" are
  Rayd-yo constitutional principles **not yet written up anywhere in the repo** —
  this spec assumes them, it is not their source.
- §2 table: Test 2 renamed "Corroboration" → "The room pushes back
  (corroboration)" to match the canonical rubric.
- §2, §4: the two clips now cite `WW-SPEC-SOURCE-VETTING-RUBRIC-001 §5.3–5.4`
  instead of "vetted this session."
- §3 step 4: "the existing fair-play 'formal right of reply' clause elsewhere in
  WW's editorial standards" → stated as established *here* (no such existing
  clause was found in the repo).
- §3: Track A precondition callout added (live Rayd-yo broadcast not confirmed
  in code).
- §5: `[[ww-rights-adaptation-governance]]`'s "existing external-advisor
  verification standards" → "a future `ww-rights-adaptation-governance` doc
  (does not exist yet)".
- §6: callout added (no live G-Tech Casters broadcast product yet).
- §7: role-model constraint corrected — two role models exist in code, not one;
  Ntikuma broadcast-coordination reconciliation added as an open item.
- §8 cross-references section added.
