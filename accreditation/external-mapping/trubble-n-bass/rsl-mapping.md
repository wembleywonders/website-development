# WW-TRUBBLE-N-BASS: RSL Awards Unit-Selection Mapping

**Source:** Maps WW-SPEC-TRUBBLE-N-BASS-SYLLABUS-001 against RSL Awards' current,
Ofqual-regulated "Creative Music Industry" and "Music Practitioners" qualification suites
(Levels 1–3).

**Status:** Draft — not yet reviewed by RSL Awards or discussed with a delivery centre offering
RSL qualifications.

See `accreditation/external-mapping/_index.md` for the master status table this document sits
under.

---

## Why this is a mapping document, not a bespoke submission

Unlike Roots and Pageturners, Trubble n Bass does not need WW-authored units: RSL Awards already
offers 160+ units across five real pathways (Performance, Production, Composition, Live Events,
Entrepreneurship) at Levels 1–3, and their qualifications are explicitly designed for flexible
unit selection by centres. The work here is identifying which existing RSL units satisfy each WW
syllabus module — this becomes the basis for WW becoming an RSL-approved delivery centre, or
partnering with one, rather than commissioning new content.

## Module-to-pathway mapping

| WW module | RSL pathway | Notes |
|---|---|---|
| Music Theory & Composition Fundamentals | **Composition** pathway | Direct fit — RSL's Composition units cover music theory as applied to original writing, not abstract theory alone |
| Beat-Making & Production Technique (existing BeatMakerROV discipline) | **Production** pathway | Direct fit — RSL's Level 2 content names Music Sequencing and Production, Composing Music (Styles), and Sound Mixing as core units |
| Sound Engineering & Audio Quality (existing AudioBay quality-check) | **Production** pathway | RSL's Studio Recording unit is a close match; WW's own AudioBay quality gate can sit alongside RSL's assessed studio-recording criteria rather than duplicating it |
| Genre Exploration & Cultural Roots | Not directly covered by any RSL pathway | Stays internal — RSL's units are technique-focused, not genre-history focused; this module keeps its existing WW-only assessment |
| Live Performance & Set Practice (Carnival sound-clash climax) | **Live Events** pathway | Direct fit — RSL names Rehearsal Skills and Music Performance as specialist units under this pathway |
| Collaboration & Ensemble Practice (Streetbeats band model) | **Performance** pathway | RSL's Performance pathway is built around ensemble and solo performance assessment; a reasonable fit though not an exact named-unit match |
| Distribution & Airplay (Afua/Lady Cynthia's gatekeeper role) | **Entrepreneurship** pathway | Strong fit — RSL's "How the Music Industry Works" and social-media-strategy content under this pathway covers distribution/promotion directly |
| Original Track/Set Production (capstone, portfolio via Joystick) | **Production** or **Composition** pathway, learner's choice | RSL's Level 2/3 Diploma structure culminates in a portfolio of original work, which aligns with WW's own capstone requirement and Joystick portfolio destination |

## What stays internal regardless of RSL enrolment

Genre Exploration & Cultural Roots has no RSL counterpart and should remain a WW-assessed module
regardless of which RSL pathway a member pursues. This is consistent with the STEMgeneers/Roots
pattern of some content having no external counterpart by design, not an oversight.

## Recommended next step

Rather than a formal bespoke-unit submission (RSL's existing catalogue already covers most of
this syllabus), the practical next step is contacting RSL Awards about **centre approval** to
deliver their Creative Music Industry qualifications directly, or identifying an existing
RSL-approved centre WW could partner with for delivery, since WW does not yet hold centre status
with RSL the way it's pursuing with OCN London.

---

## Internal verification notes (NOT part of the RSL mapping — for WW's own record only)

- `accreditation/programmes/trubble-n-bass/` genuinely has existing `unit-mapping.md`,
  `assessment-criteria.md`, `evidence-requirements.md`, and `curators.ts` — this mapping is
  consistent with, not contradicted by, that content (e.g. "portfolio via Joystick" phrasing
  matches `evidence-requirements.md` criterion 3.4 almost verbatim).
- **`BeatMakerROV` is real** — confirmed at `src/rovs/studio/BeatMakerROV.tsx`.
- **`AudioBay` is real code, but its role here needs a precise reading.** It exists (this repo's
  own standing project notes — see `CLAUDE.md`'s "Repo structure notes" — record: *"Three
  nexus-gate tools designed but not built... AudioBay.tsx does NOT satisfy the TNB gate (it's a
  pipeline-stage component, not a cross-programme nexus gate)."* This mapping's phrase "existing
  AudioBay quality-check" is accurate as far as it goes (the component exists and does audio-related
  work) but should not be read as confirming a built, cross-programme quality-gate mechanism —
  that specific piece is confirmed not built.
- **"Portfolio via Joystick" (the capstone row) is subject to the same finding logged in
  `accreditation/external-mapping/_index.md`:** real, named, consistently documented across TNB's
  existing accreditation files and `progression-map.ts` — but no live auto-surfacing mechanism
  exists for any programme, per a dedicated prior investigation. Genuinely the most solidly
  pre-existing use of the term found anywhere in this repo, so this mapping's own claim is on firm
  ground; the caveat is about the live feature, not this document's accuracy.
