# WW-PRINCIPLE-ILP-KC-CONTRIBUTION-PATHWAY-001
## ILP/Creator Journey → Knowledge Commons Contribution Pathway

**Status:** Draft principle document, not yet implemented. Canonical statement of the rule; implementation (UI, data model, consent flow) is a separate, later task — this document does not specify it (see §5).

**Verification note, 23 Aug 2026 (Claude Code):** checked every cross-reference and load-bearing factual claim in this document against the actual repo before filing it, per this project's standing discipline. Results below — most checked out well; one is a real, significant error, not just an unsupplied placeholder.

### Cross-reference check

| Reference | Status |
|---|---|
| `ww-research-vessel-principle` | **Confirmed real**, `docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md` — genuinely matches "why WW does research" framing (CJ's "research vessel, not just an archive and academy" quote, the Gaspar Yanga case, the academic-credibility value proposition). |
| `citationStore.ts` / `KcResearchDeposit` | **Confirmed real**, but infrastructure-only — no live UI, backend write-side never built (established earlier this session, re-affirmed, not re-litigated here). |
| `ww-ilp-pardner-system` | **Confirmed real**, `docs/research/ww-ilp-pardner-system.md` (created earlier this session). |
| `ww-creators-code` (Article I) | **Confirmed real**, `docs/research/ww-creators-code.md` — though Article I's own base text is itself still an unsupplied placeholder there (see that file). |
| `equianoProtocol.ts` | **Confirmed real**, `src/rov/calibration/equianoProtocol.ts` — its own `consentFramework` array literally includes "Knowledge Commons submissions require explicit consent and attribution rights," directly corroborating this document's consent-model claims. |
| `ww-research-capabilities` (six named research categories) | **Does not exist anywhere in this repo.** This document references specific category numbers (1, 3, 6) as if the categories are already defined elsewhere — they aren't, in this repo. Flagging as unsupplied, not inventing category definitions to fill the gap. |
| `ww-badge-accreditation` | **Does not exist anywhere in this repo** under this name. `accreditation/` (root-level, real per-programme docs) and `src/accreditation/` (badge-system code) both exist but are separate, already-known locations — this document's citation doesn't obviously map to either. |
| Two-layer consent model (14 Aug 2026), Oral History Society protected-tier screening, RFC 3161 timestamping | **All independently corroborated** — these match content already read directly from `docs/WW-OUTSTANDING-TASKS.md` earlier this session (the Knowledge Commons "3 open questions" section), not just trusted from this document's own framing. |

### A real error, not a gap — checked before this document was filed

**§3 states Roots "already has a defined KC-deposit capstone module (Module 8, 'Knowledge Commons Deposit Practice')" and holds it up as "the template" for the whole capstone-gating rule.** Checked directly: no `accreditation/programmes/roots/` directory exists at all (confirmed both earlier this session, independently, and again for this document specifically) — Roots has zero accreditation content of any kind, let alone a Module 8. The only "Module 8" anywhere in this repo belongs to Trubble n Bass (`accreditation/programmes/trubble-n-bass/unit-mapping.md`: "Module 8, Original Track/Set Production — capstone, portfolio via Joystick") — a completely unrelated production capstone in a different programme, not a Knowledge Commons deposit module, not Roots'.

This isn't a "hasn't landed in the repo yet" placeholder situation like most gaps found this session — §3's argument structure explicitly relies on this module already existing as a *precedent to generalise from* ("Applied platform-wide, for every structurally eligible programme above... matching Roots' existing Module 8 model"). That precedent doesn't exist. §3's actual design (Explorer never eligible, Builder/Innovator case-by-case, Leader/capstone as the designed point of contribution) may still be sound on its own logical merits — but it isn't yet demonstrated by a real, working example anywhere on the platform, and shouldn't be described as one until Roots (or any programme) actually has this module built.

---

## 1. The core principle

A member's Individual Learning/business Plan (ILP) journey produces two categorically different kinds of output, and this document exists to keep them from being conflated:

- **Personal creator-development evidence** — proof that this member can do something, used for badge sign-off. Belongs to the member's own record. Not, by default, community or academic research.
- **Community/academic research contribution** — a finding, a documented account, or a piece of evidence that stands on its own value regardless of who produced it, genuinely useful to future members, researchers, or the wider record WW is building.

Most ILP output is the first kind. Some of it — by nature of the programme and the tier — is genuinely the second kind, or close enough to it that a defined, consenting pathway into the Knowledge Commons is worth having rather than leaving it to individual judgement each time.

**The governing rule: KC-eligible, not KC-automatic.** No member's ILP work enters the Knowledge Commons by default, regardless of programme, tier, or content. Every deposit requires the member's own explicit, informed, per-deposit consent. This document defines where the door exists, not an obligation to walk through it.

## 2. Eligible programmes

Eligibility is based on whether a programme's real output is research-shaped by nature, not assigned uniformly across all 13 (14 counting Bright Sparks) founding programmes.

**Structurally eligible** (research-shaped output is the normal case, not the exception):

- **Roots** — genealogical/archival research; **claimed to already have a defined KC-deposit capstone module (Module 8) — this claim is false, see the error note above.**
- **Auntie Anansi's Kitchen** — heritage recipe/food-memory documentation (oral history collection, category 1)
- **Rayd-yo** — broadcast history research and oral testimony from living practitioners (oral history collection, category 1; documenting suppressed work, category 6)
- **Pageturners** — heritage-to-fiction research thread specifically (the "100 Black Britons hall of fame" Roots→Pageturners pairing feeds real biographical research before it becomes vignette writing; the underlying research, not the finished fiction, is the KC-eligible artefact)
- **STEMgeneers** — the Genetics & Bioscience Literacy thread specifically (already Explorer-only/no applied counterpart per the existing trigger-condition rule; a natural fit for research-only contribution rather than a craft artefact)
- **Trubble n Bass** — genre-history/cultural-roots research feeding curator work (comparative structural research, category 3), distinct from the music production itself

**Occasional/opportunistic only** (not a structural expectation): TECHreneurs, Scrap Cat, Silk Stilettos, Kaywana's Court, G-Tech Casters, Easy Street. These programmes are product/skill-focused by design. A genuinely research-worthy finding might surface incidentally (e.g. a Scrap Cat member uncovering real provenance on a heritage-craft technique via the Roots/Heritage Craft Revival pairing), and the pathway should still be open to it — but it is not a designed feature of these programmes' syllabi the way it is for the six above.

**Not applicable:** Bright Sparks (pre-specialisation feeder tier, no KC-deposit-worthy output by design).

## 3. The capstone-gating rule

KC eligibility is gated by maturity of output, not raw tier label. **The document names the existing Roots model as the template — that precedent does not currently exist (see error note above); the rule below is presented as designed, not as already demonstrated.**

Applied platform-wide, for every structurally eligible programme above:

- **Explorer tier** — never KC-eligible. This is where research discipline itself is taught; the work is practice, not yet a contribution.
- **Builder/Innovator tier** — may be KC-eligible on a case-by-case basis if the specific artefact is genuinely research-shaped (a real documented interview, a real archival find), gated by the same sign-off chain (named ROV custodian + peer witness) already required for badge progression at this level — no separate, lighter bar for KC entry.
- **Leader tier / capstone modules specifically** — the designed, expected point of KC contribution. This is where a member's accumulated work is mature enough to stand as a real deposit.

This mirrors the already-established platform-wide badge design principle that knowledge/heritage content with a corresponding applied-craft pathway can't certify past Explorer on documentation alone — the same instinct, applied to research quality rather than craft pairing: don't let early-stage practice work masquerade as a finished contribution.

## 4. How this hooks into the existing consent/licensing model

This pathway does not introduce a new consent mechanism. It uses the one already resolved for Knowledge Commons deposits generally, applied without exception to member-originated ILP work:

- **Two-layer consent model** (already resolved, 14 Aug 2026, independently confirmed against `docs/WW-OUTSTANDING-TASKS.md`): a deposit-level license (governing how the deposited material itself may be used/shared) plus a separate, explicit member opt-in/out specifically for WW's own commercial use of the material — consistent with the Equiano Principle's existing consent logic (confirmed real, `equianoProtocol.ts`). Neither layer defaults to "yes."
- **Provenance principle (Creator's Code Article I)** governs how the deposited material itself must be handled once in: vernacular names captured and treated as authoritative, absence from formal records treated as the record's gap rather than the subject's absence, and — critically for this pathway — colonial "collector"-style documentation of exploited or non-consenting subjects defaults the oral-consent field to flagged non-consent, never "unknown." (Article I's own base text remains an unsupplied placeholder in `ww-creators-code.md` — this pathway document assumes content that file doesn't yet have.)
- **Protected-tier screening** (already researched, ready for policy, 14 Aug 2026, independently confirmed): any deposit touching a living person who did not consent to be documented themselves — a family member named in someone else's oral history, a relative referenced in a genealogical find — requires the same due-diligence screening already specified for KC protected-tier deposits (the Oral History Society's "substantial damage or distress" pre-publication check), not a lighter bar because the source was ILP coursework rather than a formal research submission.
- **RFC 3161 timestamping and GDPR storage-limitation scheduling** — same open technical/compliance items already flagged for KC deposits generally apply without a separate carve-out for ILP-originated material.

No new consent infrastructure is being proposed here. The task is applying the existing model consistently to a source of deposits (member ILP work) that doesn't yet have a defined, named pathway into it.

## 5. What this principle document does NOT do

- It does not create an obligation for any member to contribute to KC. Participation in the ILP/Creator Journey and eligibility for badge progression are entirely independent of KC contribution.
- It does not lower the consent bar for any category of material already covered by existing KC policy.
- It does not assign KC-deposit requirements to programmes outside the eligible list above without a separate, deliberate decision to add them.
- It does not specify the technical implementation (UI flow, data model changes to `KcResearchDeposit`, how a Leader-tier capstone module surfaces the deposit option to a member) — that is implementation work for a later, separate task.

## 6. Open items, not yet resolved

- Whether Builder/Innovator-tier "case-by-case" eligibility (§3) needs a defined trigger condition (similar to Roots' existing yes/no material-tradition field) rather than relying on ROV custodian judgement each time.
- Whether the six structurally-eligible programmes need their own KC-deposit capstone module written explicitly into their syllabi (the document assumed only Roots currently has one — checked, none of the six do), or whether a single shared capstone-deposit mechanism can serve all six.
- How a Builder/Innovator-tier deposit's sign-off chain differs, if at all, from a Leader-tier capstone deposit's sign-off chain — both are specified in §3 as using "the same sign-off chain," but this hasn't been stress-tested against a real example the way other platform mechanisms have.
- Whether the "occasional/opportunistic" programmes (§2) need any defined pathway at all, or whether an ad hoc case simply gets routed through whichever eligible programme's mechanism fits best when it arises.
- **New, added during verification:** whether `ww-research-capabilities` (the six named research categories this document cites by number) and `ww-badge-accreditation` need to be supplied as real files, since this document currently references category numbers and a badge-accreditation model that don't exist anywhere to check against.

## Changelog

- **23 Aug 2026** — file created from supplied draft principle document. Verified every cross-reference against the repo before filing (see verification note and table at top). One real error corrected in the body text, not silently fixed: Roots does not have a Module 8 KC-deposit capstone module, or any accreditation content at all — the document's "already has... the template" framing was checked and found false, not just unsupplied.
