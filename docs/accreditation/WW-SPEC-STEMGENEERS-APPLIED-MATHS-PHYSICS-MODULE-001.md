# WW-SPEC-STEMGENEERS-APPLIED-MATHS-PHYSICS-MODULE-001
## STEMgeneers — Applied Mathematics & Physics (module narrative)

**Status:** Drafted 2026-09-10 (Claude Code) from `WW-TASK` brief 3. Narrative
draft only — the "narrative first, per the pattern that worked for Roots" step.
Not yet compressed into the `accreditation/programmes/stemgeneers/` scaffold
(see "Scaffold status" below — that step is blocked on which STEMgeneers module
structure is canonical).

**Scope:** this one module only. Brief 3 was explicit: *"Do not touch other
modules."* This document does not define the rest of the STEMgeneers syllabus.

**Prerequisite (assumed, not taught here):** raw numeracy — number line, place
value, BODMAS, fractions/decimals/percentages — is taught in **Bright Sparks**
(brief 4). This module starts one level up, at number *systems*, and never
re-teaches the number line or BODMAS.

**Sourcing note (carried into the copy):** Pythagoras, Euclid, Archimedes,
Al-Khwarizmi and Newton are settled history of mathematics — no verification
pass. The **Ishango bone is different** and its contested status is written
into the member-facing copy below, not held only in this note.

---

## Why this module opens where it does

The module is a chronological spine: how humans built the mathematics that
physics and engineering now run on, in the order they actually built it. Each
step is a real person or artefact and a real method — and the through-line is
that **mathematics is something people made, argued over, and had to justify**,
not a fixed body of truth handed down. That framing is what makes the Builder
tier's verification pair land.

---

## Explorer tier — the chronological spine (5 topics, in this sequence)

### 1. Number systems — how counting became a system

**Anchor artefact: the Ishango bone.**

Member-facing copy (contested status is part of the copy, not a footnote):

> The Ishango bone is a real object: a piece of baboon fibula about 20,000
> years old, carved with three columns of notches, found at Ishango in the
> Democratic Republic of the Congo near Lake Edward. That much is not in
> dispute.
>
> **What the notches mean is genuinely disputed.** Some scholars read it as a
> plain tally stick — a record of a count, nothing more. Others argue the
> columns track the phases of the moon, making it a lunar calendar. Others
> point out that one column is all odd numbers, another pairs numbers that
> double, and a third clusters around primes, and argue it shows deliberate
> arithmetic — that whoever carved it was *doing maths*, not just counting.
>
> WW does not resolve this for you. The point of starting here is that the
> question — *is this a record, a calendar, or a calculation?* — is exactly
> the kind of question this module teaches you to hold open honestly. A member
> who writes "the Ishango bone proves early African arithmetic" has overstated
> it. A member who writes "it's just a tally stick" has understated it. The
> honest sentence names all three readings and says which evidence supports
> which.

Taught content: what a number *system* is (a base, place value as a system not
a rule, positional vs non-positional); tallying and grouping as the first
systems; the independent invention of place-value systems (Babylonian base-60,
Maya base-20, the Indian decimal system that carried zero as a number). Zero as
the genuine conceptual leap.

**Practice:** given a short unfamiliar notation (a supplied non-decimal system),
read and write three values in it, and state what makes it a *system*.

### 2. Geometry and proof — Pythagoras and Euclid

Taught content: the Pythagorean relationship as a worked, demonstrable fact
(and that "Pythagorean" triples were in use in Babylon and Egypt for
construction centuries before Pythagoras — the theorem is older than its
name). Then **Euclid**: the *Elements* as the first surviving system where
every claim is proved from a small set of stated axioms, in order, with nothing
assumed silently.

Framing: **axiomatic proof is the ancestor of "showing your work."** When an
assessor asks a STEMgeneers member to show their method rather than just the
answer, that expectation runs in a direct line back to Euclid — the answer is
not the finding; the argument that gets you there is.

**Practice:** prove one simple geometric result (e.g. angles in a triangle sum
to two right angles) as a numbered chain of steps, each step justified.

### 3. Mechanics and early calculus methods — Archimedes

Taught content: **levers** (the law of the lever as a ratio; mechanical
advantage; where this shows up in real tools); **buoyancy** (Archimedes'
principle stated properly — the upthrust equals the weight of fluid displaced —
and how to use it); and the **method of exhaustion** (bracketing a curved area
or a value between an under-estimate and an over-estimate and squeezing the gap
— the idea that becomes calculus 1,900 years later).

Framing: this is where mathematics starts being *applied to the physical
world* under real constraint (Archimedes designing defensive machines for
Syracuse) — the STEMgeneers register.

**Practice:** use the lever ratio to solve a real load problem; use
displacement to find the volume of an irregular object; use a crude
exhaustion argument to bracket π between two fractions.

### 4. Algebra and algorithms — Al-Khwarizmi

Taught content: **Muhammad ibn Musa al-Khwarizmi** (Baghdad, ~820 CE) and his
*Kitab al-jabr wa'l-muqabala*. The word **"algebra" comes directly from
*al-jabr*** in that title (the operation of "restoring" — moving a subtracted
term to the other side). The word **"algorithm" comes from his own name**
(Latinised as *Algoritmi*), because his step-by-step methods for solving
equations became the model for what a procedure *is*. Also: his role in
carrying the Indian decimal place-value system (and zero) into the
mathematics that Europe later adopted.

Framing: this module is the point where **maths and computing share a root**.
A member who has done topic 4 has met the reason a program is called an
"algorithm" and the reason the operation is called "algebra".

**Cross-link (flag):** this topic bridges directly to STEMgeneers'
**Computing & Programming Fundamentals** content — an equation-solving
procedure and a program are the same kind of object (a defined sequence of
steps that transforms an input to an output). *Repo note: a module named
"Computing & Programming Fundamentals" does not yet exist in the repo — the
nearest built content is the base's "Introduction to Coding" / Digital
Literacy unit. This cross-link should be wired to whatever the canonical
computing module ends up being called.*

**Practice:** solve a linear and a simple quadratic equation, writing each as
a numbered procedure that would work on *any* equation of that form — i.e.
write the algorithm, not just the answer.

### 5. Calculus — Newton (and Leibniz, independently)

Taught content: what calculus is *for* — rates of change (differentiation) and
accumulation (integration) as two sides of one relationship; the link back to
Archimedes' method of exhaustion (topic 3). **Isaac Newton** developed it (his
"method of fluxions") to do physics — motion, gravitation. **Gottfried Wilhelm
Leibniz developed it independently and at around the same time**, with the
notation (dy/dx, ∫) that everyone actually uses now. The priority dispute
between them is real history; the point for the member is that **two people
built the same tool separately because the problem was ready to be solved** —
a pattern that recurs across the history of science.

Framing: calculus is the mathematics physics is written in — this topic is the
hinge between the Explorer spine and any real applied-physics work at Builder
and above.

**Practice:** differentiate and integrate simple polynomials by rule; use a
derivative to find a rate (e.g. speed from a distance-time expression); state
in one sentence what the integral of that rate gives back.

---

## Builder tier — the applied pair (verification-principle framing)

Both exercises are about the **same question**: *how do you know a piece of
mathematics is trustworthy enough to act on when the stakes are real?* They
answer it two different ways, and are taught explicitly as a pair.

### A. Ifá cast-to-hex exercise

**Cross-reference, do not duplicate.** The Ifá binary/cast exercise is specced
separately. *Repo note: as of 2026-09-10 that spec is not a file in this repo —
it is chat-memory only. This module references it; it must not restate or
re-derive it. When the Ifá spec is filed, link it here by path.*

What this module needs to say about it, for the pairing to work: Ifá divination
encodes each cast as one of 256 figures — a 2×8 binary pattern, read and
interpreted against a memorised corpus. It is a **lived practice**: its
reliability comes from centuries of use, a trained practitioner (babalawo), and
a community that holds the corpus and checks the reading. The maths is real
(a base-2 system with 2⁸ states) and the trust mechanism is **social and
practised**, not institutional.

### B. Katherine Johnson — hand-verification of Glenn's orbital trajectory

Member-facing content (settled history, no sourcing pass needed):

> In February 1962, John Glenn was about to become the first American to orbit
> the Earth, aboard *Friendship 7*. The orbital trajectory had been computed
> by IBM 7090 electronic computers — new, fast, and not yet fully trusted.
> Glenn refused to fly until the numbers were checked by hand. He asked
> specifically for **Katherine Johnson** — a mathematician at NASA (then NACA)
> who had been doing this class of calculation for years — saying, in
> substance, *"get the girl to check the numbers; if she says they're good,
> I'm ready to go."*
>
> Johnson worked the same trajectory equations by hand, step by step, and
> confirmed the computer's output. Glenn flew. The mission succeeded.

The trust mechanism here is **institutional rigour under real stakes**: a named
expert, a documented method, a verifiable calculation, checked because a life
depended on it being right.

### The pairing — taught explicitly

> These are two ways trustworthy maths gets built:
>
> - **Ifá** — *lived practice.* Reliability from long use, a trained holder of
>   the method, and a community that checks the reading.
> - **Katherine Johnson** — *institutional rigour under real stakes.* A named
>   expert, a written-down method, an independently checkable result, verified
>   because the cost of an error was a life.
>
> Neither is "the real one." Both are real answers to the same problem. A
> STEMgeneers member is being trained toward the second — documented,
> checkable method — but should be able to name why the first is also a
> legitimate way a body of knowledge earns trust.

**Builder practice:** take a supplied calculation with a stated real-world
stake, verify it by an independent method (not by re-running the same steps),
and write a short account of *what would have to be true* for your check to be
trustworthy — the Katherine Johnson discipline, applied.

---

## Assessment shape (for compression into the scaffold)

| Tier | What is assessed | Evidence |
|------|------------------|----------|
| Explorer | The 5-topic spine: can read/write in a non-decimal number system and state the contested Ishango readings honestly (topic 1); prove a simple result as a justified step-chain (topic 2); solve real lever/buoyancy/exhaustion problems (topic 3); write an equation-solving procedure as an algorithm (topic 4); differentiate/integrate simple polynomials and state what each does (topic 5) | Worked-problem sets + one written "honest sentence" on the Ishango readings + one numbered proof |
| Builder | The verification pair: an independent-method check of a real-stakes calculation, plus a written account of why the check can be trusted; and a written comparison of the two trust models (Ifá lived practice vs Johnson institutional rigour) | The verification write-up + the comparison piece. The Ifá cast-to-hex exercise itself is evidenced under its own spec, cross-referenced not re-assessed here. |

---

## Scaffold status (implementation note — not part of the module content)

**Not yet compressed into `accreditation/programmes/stemgeneers/`.** Blocked on
a structural question CJ needs to settle:

- CJ directed (2026-09-10) that `accreditation-full/programmes/stemgineers/` is
  the base to rework. That base is a **December 2025 generic OCN digital-skills
  document** — badges "Digital Literacy Explorer → Maker Engineer → AI Explorer
  → Eco Innovator", OCN units `STEM-E3-01…STEM-L2-05`, progression to the
  **Digital Support Technician** apprenticeship. **It contains no Applied
  Mathematics & Physics module** and its shape is "digital skills / making /
  AI".
- It conflicts with **two** other STEMgeneers conceptions in the repo: the
  **live** page content (`src/pages/programmes/stemgeneers/curriculum/curriculumData.ts`
  — a Black-excellence-in-STEM-history + 5Cs sandbox, with a periodic table),
  and **CJ's own Sept 2026 vision** in `docs/WW-OUTSTANDING-TASKS.md` (Hardware
  Lab / 3D Design Lab / Applied Maths / Materials Science / Nutrition Science;
  Mark Dean, Marc Hannah, Katherine Johnson; **ST0457 Engineering Technician**,
  with C&G 2357 explicitly ruled out — not Digital Support Technician).
- Slotting this module into the base while "not touching other modules"
  requires deciding: does Applied Maths & Physics become its own unit
  (`STEM-APM`), or does its Explorer spine fold into the base's "Digital
  Literacy Explorer" badge and its Builder pair into "Maker Engineer"? And is
  the base's badge structure kept, or replaced with Explorer/Builder/Innovator/
  Leader to match g-tech-casters / kitchen / roots?

Recommendation: **do not compress until CJ confirms the target module list**,
or explicitly accepts a best-effort rework of the conflicting base with these
calls made and flagged. The module content above is stable regardless of which
way that goes.

## Changelog

- **2026-09-10** — file created (Claude Code) from brief 3. Narrative draft of
  the Applied Mathematics & Physics module only. Ishango contested status
  written into member-facing copy per the brief. Ifá cross-reference and the
  "Computing & Programming Fundamentals" bridge both flagged as pointing at
  specs/modules not yet filed in the repo. Scaffold compression held pending a
  CJ decision on the STEMgeneers module structure.
</content>
