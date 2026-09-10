# Roots — Unit Mapping

Compressed from `docs/accreditation/WW-SPEC-ROOTS-SYLLABUS-001.md`
(7 narrative modules + capstone → 3 RQF units, one with a conditional paired
variant), on the same pattern as `accreditation/programmes/g-tech-casters/` and
`accreditation/programmes/auntie-anansis-kitchen/`.

**This is the ancestral-record / archival-research strand of Roots.** The live
Roots codebase is Judith Fontanelle's body-sovereignty / hair-science strand
(`src/pages/programmes/roots/`); how the two strands share one badge is
unresolved — see the syllabus's "Relationship to existing Roots content".

## Roots is a deliberately different unit shape — do not flatten it

The other ten certifying programmes compress to a uniform run of units. Roots
does **not**, and this is confirmed deliberate:

- **Explorer tier is documentation-only for every topic**, regardless of
  subject matter — the research discipline itself is what is taught and
  assessed. No craft crossover applies at Explorer.
- **Builder tier and above carry a conditional pairing.** A topic with a
  material or technical **craft counterpart** (textile, foodway with a making
  technique, building method, instrument, tool tradition) triggers a crossing
  into **Scrap Cat's Heritage Craft Revival**. The trigger is a single yes/no
  **`material_tradition`** field set on the topic and confirmed by the
  ROV / Keeper before sign-off — not something the member is examined on.
- **A triggered unit is dual-signed:** the **Keeper (Roots)** signs the
  research and documentation; the **Maker (Scrap Cat)** signs the craft
  identification and any craft practice.

The paired variant is coded **ROOTS-2P** (see below). An unpaired Builder
learner takes **ROOTS-2** only.

## Qualification Framework Mapping

### Ofqual / RQF Mapping (indicative — pending formal recognition)

| WW Unit | Title | RQF Level | Credits | Nearest Equivalent |
|---------|-------|-----------|---------|-------------------|
| ROOTS-1 | Archival Research Discipline and the Structure of the Record | 2 | 4 | Oral History practice / Community Heritage Research / Historical Enquiry |
| ROOTS-2 | Record-Linkage, Oral History and Honest Limitation | 2 | 5 | Genealogical Research practice / Oral History Society practice guidance |
| ROOTS-2P | *(paired variant of ROOTS-2, when `material_tradition` = yes)* — Record-Linkage, Oral History and Heritage-Craft Identification | 2 | 6 | as ROOTS-2 + Heritage Crafts / Craft and Design cultural-heritage strand |
| ROOTS-3 | Knowledge Commons Deposit Practice (Capstone) | 2 | 3 | Community Heritage project delivery |

### Unit Content Mapping (narrative modules → RQF units)

**ROOTS-1 — Archival Research Discipline and the Structure of the Record
(RQF L2, 4 credits)** Draws on: Module 1 (Archival Research Fundamentals —
loss-first), Module 4 (Evidence-Tiering & Citation Discipline), Module 2
(Record-Linkage, first supervised pass), Module 6 (Naming the Gap — first
practised entry). The unit **opens with the structural gap** (the Antigua
slave-register case: first names only, approximate ages, no surname — an
absence built into how the record was kept) and teaches search method inside
that fact. Documentation-only; no craft crossover at this tier.

**ROOTS-2 — Record-Linkage, Oral History and Honest Limitation (RQF L2, 5
credits)** Draws on: Module 2 (Record-Linkage & Verification Method — James
Dent Walker's method, corrected onto its real practitioner from the popular
attribution to Alex Haley's *Roots*), Module 3 (Oral History Interview
Technique — to the protected-tier consent + damage-screening standard),
Module 5 (DNA & Ancestry Literacy — interpretation and its limits; paired
against, not duplicating, STEMgeneers' genetics content), Module 6 (Naming
the Gap — applied), Module 7 (Provenance & Consent Ethics — real weight:
research touching living non-consenting relatives). Documentation-only unless
paired.

**ROOTS-2P — paired variant (RQF L2, 6 credits)** Everything in ROOTS-2, plus
the Scrap Cat Heritage Craft Revival crossing when the topic's
`material_tradition` field is yes. The additional credit covers craft
identification and (where the member does craft practice) a witnessed piece of
craft work. **Dual-signed: Keeper (Roots) + Maker (Scrap Cat).** A learner
takes ROOTS-2 **or** ROOTS-2P for a given piece of work, never both.

**ROOTS-3 — Knowledge Commons Deposit Practice (Capstone) (RQF L2, 3 credits)**
Draws on: the Capstone. One substantial Knowledge Commons deposit, end to end.
**An honestly-deposited unresolved finding (the Antigua-case shape, written up
with the Module 6 skill) is an equally valid, equally excellent capstone
outcome** — assessment is on the rigour of the search and the honesty of the
account, not on whether the ancestor was found. Includes the globe
cross-linking requirement: cross-link to an existing Knowledge Commons globe
entry via `cross_links` where one exists for the place; where none exists, flag
the place as a candidate for demand-driven sub-national creation
(`kc_live_entries.parent_entry_id`, V73) for later Documenter / Archivist
review — not auto-created.

### External Qualification Anchor

ROOTS-2's oral-history component aligns with **Oral History Society practice
guidance** (consent, ethical interviewing, archiving in the public interest as a
lawful retention basis, pre-publication due-diligence screening for substantial
damage or distress) — the same body of practice already researched for the
Knowledge Commons protected-tier deposit pathway. Community-heritage awarding-body
units (e.g. OCN "Exploring Local History" / "Oral History" units at L1–L2) are
the nearest regulated reference. There is **no single close external
qualification** for the record-linkage / genealogical-proof-standard content —
its reference point is the professional genealogical proof standard, not an
Ofqual unit.

### Apprenticeship Standard Mapping

There is **no close apprenticeship-standard equivalent** for this programme at
Level 2 — archival and genealogical research is not an apprenticed occupation at
that level. Partial, indicative mappings only:

- **Library, Information and Archive Services Assistant (Level 3)** — partial:
  ROOTS-1 covers handling and interpreting archival material, finding aids,
  search strategy and record-keeping (the research log).
- **Cultural Heritage Conservation Technician (Level 3)** — partial, and only
  for ROOTS-2P: the craft-identification component touches material-culture
  literacy, not conservation practice.

Progression target: not an apprenticeship but **further/higher study** — an
archives/records or history/heritage qualification, or Oral History Society
training — for which ROOTS units provide underpinning practice.

### Skills for Jobs / T-Level Mapping

**Craft and Design** T-Level — cultural-heritage strand: ROOTS-1 and ROOTS-2
provide foundation research and documentation skills; ROOTS-2P links directly
to the heritage-craft content. ROOTS units do **not** map to a Catering, Media
or Digital pathway.

## Programme Rotation Credit

Completion of Roots units contributes to:

- **Knowledge Commons heritage-deposit strand** (via ROOTS-3 / the Capstone —
  Esi's cross-programme link; a completed deposit, resolved *or* an honest wall,
  is a Knowledge Commons entry).
- **Scrap Cat Heritage Craft Revival rotation** (via ROOTS-2P only, when the
  pairing triggers — the dual-signed craft-identification credit).
- **ILP cultural-heritage strand** (ROOTS-1 / ROOTS-2) and **ILP research-method
  strand**.

Note: Roots' Explorer tier grants **no** rotation credit into Scrap Cat — the
pairing is a Builder+ trigger only.

## Unit Code Register

`ROOTS-1` / `ROOTS-2` / `ROOTS-2P` / `ROOTS-3` — checked against existing
programme unit codes (`GTC-*`, `TNB-*`, `AAK-*`): no collision. `ROOTS-2P` is
the paired variant, not a fifth unit — a learner takes either `ROOTS-2` or
`ROOTS-2P` for a given body of work. Kept distinct so cross-programme rotation
credit references (especially the Scrap Cat dual-sign) stay unambiguous.
