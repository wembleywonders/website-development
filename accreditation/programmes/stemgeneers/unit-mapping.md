# STEMgeneers — Unit Mapping

> **PARTIAL FILE.** Only the **Applied Mathematics & Physics** unit
> (`STEM-APM`) is populated here — compressed from
> `docs/accreditation/WW-SPEC-STEMGENEERS-APPLIED-MATHS-PHYSICS-MODULE-001.md`
> per brief 3 ("compress this module into the template"). The rest of the
> STEMgeneers unit structure is **still to be reworked** from
> `accreditation-full/programmes/stemgineers/` (a December 2025 generic OCN
> digital-skills document — badges "Digital Literacy Explorer → Maker Engineer
> → AI Explorer → Eco Innovator") once CJ confirms the target module list. See
> "Open structural questions" at the foot of this file. Do not treat the
> `STEM-APM` numbering or its placement as settling the wider scheme.

## Qualification Framework Mapping

### Ofqual / RQF Mapping (indicative — pending formal recognition)

| WW Unit | Title | RQF Level | Credits | Nearest Equivalent |
|---------|-------|-----------|---------|-------------------|
| STEM-APM | Applied Mathematics & Physics: the History and the Verification Principle | 2 | 4 | Mathematics / Use of Mathematics / Combined Science (applied) |
| *(other units)* | *pending rework from `accreditation-full/programmes/stemgineers/` — see below* | — | — | — |

### Unit Content Mapping (narrative module → RQF unit)

**STEM-APM — Applied Mathematics & Physics (RQF L2, 4 credits)**
Draws on the full module narrative in
`WW-SPEC-STEMGENEERS-APPLIED-MATHS-PHYSICS-MODULE-001`:

- **Explorer-tier content — the chronological spine:**
  1. Number systems (anchor: the **Ishango bone**, taught as **contested** — a
     real ~20,000-year-old artefact from Ishango, DR Congo, whose function is
     genuinely disputed between tally stick / lunar calendar / intentional
     arithmetic; the module does not resolve it, and teaches the member to
     state all three readings honestly).
  2. Geometry and proof (Pythagoras; **Euclid** — axiomatic proof as "the
     ancestor of *showing your work*").
  3. Mechanics and early calculus methods (**Archimedes** — levers, buoyancy,
     method of exhaustion).
  4. Algebra and algorithms (**Al-Khwarizmi** — "algebra" from *al-jabr*,
     "algorithm" from his name; the maths/computing shared root).
  5. Calculus (**Newton**, and **Leibniz** independently).
- **Builder-tier content — the verification-principle pair:** the **Ifá
  cast-to-hex** exercise (cross-referenced to its own spec, *not* duplicated
  or re-assessed here) paired explicitly against **Katherine Johnson**'s
  hand-verification of John Glenn's *Friendship 7* orbital trajectory (1962) —
  taught as "two ways trustworthy maths gets built: lived practice vs.
  institutional rigour under real stakes."

### External Qualification Anchor

The Explorer spine aligns broadly with **GCSE Mathematics** foundation content
and **Functional Skills Mathematics Level 2** (number, algebra, geometry,
handling calculation and proof). It is **not** a GCSE-equivalent and no such
claim should appear in member-facing copy (see the RPL note under
Apprenticeship Standard Mapping). The verification-principle Builder content
has no close external unit — its reference point is the professional
expectation that a result acted on under real stakes is independently checked.

### Apprenticeship Standard Mapping

- **The base document maps STEMgeneers to Digital Support Technician (Level
  3).** Per CJ's 9 Sept 2026 tracker entry that mapping is being replaced:
  **ST0457 Engineering Technician (Level 3)** is confirmed as the better fit
  (C&G 2357 NVQ L3 Electrotechnical was checked and **ruled out** as
  mismatched to STEMgeneers' actual IoT/embedded scope). Under **ST0457**,
  `STEM-APM` provides underpinning knowledge for:
  - K-set: "mathematical and scientific principles relevant to the
    engineering discipline" — the Explorer spine directly.
  - The engineering-values / professional-conduct expectations around
    checking work — the Builder verification pair.
  `STEM-APM` is underpinning knowledge, **not** a full standard mapping. This
  Digital-Support-Technician-vs-ST0457 switch is an **open item** (see below);
  the mapping above is written to ST0457 as the stated intent, not as a
  confirmed WW position.
- **No RPL / external-accreditation claim** may appear in any member-facing
  STEMgeneers copy until Blake confirms WW's actual standing to make it.

### Skills for Jobs / T-Level Mapping

**Engineering and Manufacturing** T-Level route — `STEM-APM` provides
foundation mathematical and scientific knowledge relevant to every
engineering specialism. Also relevant to **Digital Production, Design and
Development** via topic 4 (algebra/algorithms → computing).

## Cross-links

- **Bright Sparks (prerequisite, not taught here).** Raw numeracy — number
  line, place value, BODMAS, fractions/decimals/percentages — is taught in
  Bright Sparks (brief 4). `STEM-APM` starts at number *systems* and never
  re-teaches the number line or BODMAS.
- **Computing & Programming Fundamentals (bridge — flag).** Topic 4
  (Al-Khwarizmi) is the point where maths and computing share a root: an
  equation-solving procedure and a program are the same kind of object. *Repo
  note: no module named "Computing & Programming Fundamentals" exists yet —
  the nearest built content is the base's "Introduction to Coding" / Digital
  Literacy unit. Wire this cross-link to whatever the canonical computing
  module ends up being called.*
- **Ifá cast-to-hex exercise (Builder pair — cross-reference, do not
  duplicate).** *Repo note: the Ifá exercise spec is chat-memory only — not
  a repo file as of 2026-09-10. `STEM-APM` references it; when it is filed,
  link it here by path.*

## Programme Rotation Credit

Completion of `STEM-APM` contributes to:
- **ILP numeracy / applied-science strand.**
- **Kitchen** (via topic 3 / applied measurement — °C/°F, volume, density
  overlap; and the Bright Sparks numeracy prerequisite both share).
- **TECHreneurs Quantitative Methods** (shared numeracy foundation).

## Unit Code Register

`STEM-APM` — checked against existing unit codes (`GTC-*`, `AAK-*`, `ROOTS-*`,
`TNB-*`, and the base's own OCN codes `STEM-E3-01`…`STEM-L2-05`): **no
collision.** Deliberately named, not numbered, so it does not pre-claim a slot
in the eventual `STEM-1`/`STEM-2`/… scheme.

---

## Open structural questions (interpretation calls — flagged, not decided)

Logged so they carry the same weight as any other unresolved item, per the
standing "an unconfirmed working default is an open governance question" rule.
These are **not settled** by this file:

1. **The whole STEMgeneers unit structure.** The base
   (`accreditation-full/programmes/stemgineers/`) is a Dec-2025 generic
   digital-skills doc with 4 badges that don't match the g-tech-casters /
   kitchen / roots Explorer→Leader shape, don't match the **live** page
   content (`src/pages/programmes/stemgeneers/curriculum/curriculumData.ts` —
   a Black-excellence-in-STEM-history + 5Cs sandbox), and don't match CJ's
   Sept-2026 vision (Hardware Lab / 3D Design Lab / Materials Science /
   Nutrition Science). `STEM-APM` is drafted to stand in any of these; the
   rest is not.
2. **Where Applied Mathematics & Physics sits** — its own standalone unit (as
   here), or folded into a "foundations" unit at Explorer and a "making" unit
   at Builder.
3. **Digital Support Technician vs ST0457 Engineering Technician** as the
   apprenticeship target (mapping above is written to ST0457 as intent).
4. **RQF level of the maths content** — L2 is assumed; some of the Explorer
   spine (proof, calculus intro) reaches toward L2/L3 boundary.
</content>
