# WW External Accreditation — Master Status Index

**Purpose:** Single source of truth for where each programme stands on external accreditation.
Read this before opening any programme's individual mapping/submission file.

## The signposting model (ILP / Creator Journey design principle)

Every row below follows the same two-step pattern wherever an external body exists:

1. **External step (Explorer-tier credential):** the member enrols directly with the external
   body — OCN London, RSL Awards, CVQ/NCTVET, IHGS, etc. — completes the relevant course/units
   on that body's own terms, and receives a credential that stands independently of WW.
2. **Internal step (Builder-tier+ portfolio evidence):** the member returns to WW and applies
   what they learned to a real, community-facing output — a Scrap Cat build, a Knowledge Commons
   entry, a produced track, a garment sold through Steps — signed off by the relevant custodian
   (Maker, Keeper, etc.) per the existing badge chain.

Where no external body exists for a module, WW's own bespoke unit *is* the external-facing
credential (OCN's Bespoke Qualifications route), collapsing the two steps into one.

## Status table

| Programme | External body | Status | Resolution |
|---|---|---|---|
| TECHreneurs | OCN London | Confirmed strong fit (First Steps to Enterprise → Creating & Sustaining a Business) | No action needed |
| STEMgeneers | OCN London | Partial fit (Science & Engineering suite covers CAD, Materials, Mechanics, Electrical, Product Design; Pre-Access suite covers Energy & Sustainability) | **Engineering Ethics & Professional Practice gap → bespoke OCN unit drafted** |
| Roots | OCN London (bespoke) / IHGS (reference) | No existing OCN fit; IHGS offers a real but separate professional-body ladder | **8-unit OCN bespoke submission drafted** — see that document's own internal notes on Roots' unresolved split identity before treating this as complete |
| Auntie Anansi's Kitchen | OCN London | Confirmed strong fit (Skills for Professions in Catering, Hospitality & Tourism) | No action needed |
| Pageturners | OCN London (bespoke) / NCTJ (journalism-adjacent only) | Weak OCN fit (functional English only); no CVQ fit | **8-unit OCN bespoke submission drafted** (1 ungraded gate unit) |
| Rayd-yo | OCN London | Confirmed good fit (Skills for Professions in Creative & Digital Industries, names journalism) | No action needed |
| Easy Street | — | Not applicable — non-certifying shared destination | No action needed |
| Scrap Cat | OCN London | Good fit (Science & Engineering suite + Vehicle Maintenance unit category); Heritage Craft Revival (pottery/weaving) has no external match | Heritage Craft Revival module stays internal-only |
| Kaywana's Court | OCN London | Confirmed strong fit (L2/L3 Performing Arts — Stanislavski, Set Design, Devising Drama, Audition Techniques) | No action needed |
| Silk Stilettos | CVQ (NCTVET) | OCN only partial (industrial textiles, not fashion design); CVQ has direct named occupational areas (Fashion Designing, Garment Construction & Manufacturing, Pattern Making) | **CVQ mapping document drafted** |
| Trubble n Bass | RSL Awards | No OCN or CVQ fit; RSL's Creative Music Industry suite is a strong, current, Ofqual-regulated match | **RSL mapping document drafted** |
| G-Tech Casters | OCN London | Good fit for most modules (Creative & Digital Industries); Live Reportage & Event Casting gap | **Confirmed real gap** — see verification notes below. No unit exists yet; not commissioned in this pass |

## Separate track: curator/tutor CPD (not member accreditation)

Safeguarding and pastoral-care CPD for curators, tutors, and ROVs is tracked separately and is
**not** part of this member-facing accreditation structure — see the NSPCC/pastoral-care mapping.
**This file does not exist anywhere accessible to this session** (see verification notes below).
Do not conflate the two tracks when building out badge/ILP logic.

## Open items carried forward

- Silk Stilettos' Brand Development & wearable-ergonomics content has no CVQ or OCN counterpart
  — confirm it stays internal-only, same treatment as Scrap Cat's Heritage Craft Revival.
- Curator CPD list has no repo path yet, and its content isn't available to reconstruct it from
  — see verification notes.
- G-Tech Casters' Live Reportage & Event Casting bespoke unit — confirmed a real gap (see below),
  not yet commissioned.

---

## Verification notes (checked directly before filing this index and the three linked documents)

Per this project's standing "provided ≠ verified" discipline, and the established precedent from
the Pageturners/Roots OCN submissions (file external-facing content as drafted, flag verification
separately): the tables above stay as supplied, with corrections/additions noted here.

- **None of the claimed source specs exist in this repo**
  (`WW-SPEC-STEMGENEERS-SYLLABUS-001`, `WW-SPEC-SILK-STILETTOS-SYLLABUS-001`,
  `WW-SPEC-TRUBBLE-N-BASS-SYLLABUS-001`). All three programmes do have real, pre-existing
  `accreditation/programmes/<name>/` scaffolding (`unit-mapping.md`, `assessment-criteria.md`,
  `evidence-requirements.md`), which the new documents were cross-checked against directly where
  possible.

- **G-Tech Casters' "Live Reportage & Event Casting" gap — verified real, per the handoff's own
  explicit request to check first.** `accreditation/programmes/g-tech-casters/unit-mapping.md`
  (the real directory — note it's `g-tech-casters`, hyphenated, not `gtech-casters` as one
  reference elsewhere spelled it) contains no unit, module, or section addressing live reportage
  or event casting anywhere — confirmed by reading its full section list. The gap is real; no
  bespoke unit has been drafted for it in this pass, matching the handoff's own instruction not
  to commission new work until this was checked.

- **"Joystick portfolio" is a real, consistently-used WW accreditation concept — but genuinely
  unwired as a live feature, for every programme, not just the ones mapped here.** Trubble n
  Bass's own existing `evidence-requirements.md`/`assessment-criteria.md` and
  `src/accreditation/badge-system/progression-map.ts` all name it as a real capstone destination.
  But a dedicated prior investigation
  (`docs/accreditation/WW-SESSION-HANDOFF-2026-08-28-CREATOR-JOURNEY-PILOT.md`, 28 Aug 2026)
  found: *"No 'auto-surface Innovator/Leader-tier work as a gallery entry' mechanism anywhere...
  `JoystickPage.tsx` — static; a hardcoded four-article list... No programme-output ingestion...
  PATTERN DOES NOT EXIST (for any programme)."* Infrastructure/documentation-level concept: real.
  Live, member-usable feature: not built. Applies to every reference to "Joystick portfolio" in
  the linked mapping documents below, not a defect specific to any one of them.

- **Curator/tutor CPD (`ww-curator-cpd-safeguarding.md`)** is described as "currently held in
  Claude's memory." Checked this session's actual persistent memory directly — it contains two
  files (an interpretation-calls note and one about external-facing content with unverified
  claims), neither of which is this file. Whatever chat session originally held this content, it
  is not accessible from here. Cannot reconstruct or file it — flagged rather than invented.
