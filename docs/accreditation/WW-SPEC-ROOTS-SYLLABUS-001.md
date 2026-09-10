# WW-SPEC-ROOTS-SYLLABUS-001
## Roots — Programme Syllabus (Ancestral-Record / Archival-Research strand)

**Status:** Drafted 2026-09-10 (Claude Code) from `WW-TASK-ROOTS-SYLLABUS-SIGNED-OFF`.
First formal syllabus for this programme — it did not exist in the repo before
this date (confirmed against the working tree, all branches, and full history;
the 19 Aug 8-module draft referenced in the task was chat-memory only and was
never saved to disk). CJ's sign-off on 2026-09-10 was on the **module structure
/ shape** below, not on this prose — see "Sign-off status" and the
implementation note at the foot of this file.

Structure signed off: **7 numbered modules + 1 capstone** (supersedes the 19 Aug
8-module draft). Module 1 reframed to open with loss; a new Module 6 ("Naming the
Gap"); the old Module 6 (Material/Technical Tradition Identification) removed from
the numbered sequence and folded into the Roots↔Scrap Cat pairing gating check
(see "Conditional pairing structure" below).

**Host ROV:** Esi (The Keeper — Heritage Preservation & Cultural Memory).
Roots → Esi is recorded in `ChildByProgramme` and is "not contradicted" by
Esi's own character block, but also not confirmed by it — see
`docs/research/WW-CANONICAL-ROSTER.md` "Open items". This syllabus does not
resolve that.

**Accreditation:** compressed into RQF-coded units in
`accreditation/programmes/roots/` (`unit-mapping.md`, `assessment-criteria.md`,
`evidence-requirements.md`), on the same OCN-London pattern as
`accreditation/programmes/g-tech-casters/` and
`accreditation/programmes/auntie-anansis-kitchen/` — but with a genuinely
different unit shape (conditional pairing; see below), deliberately not
flattened to the uniform structure the other programmes use.

---

## ⚠️ Relationship to existing Roots content — read before treating this as complete

Roots already exists in the codebase as a **body-sovereignty / hair-science /
safeguarding resource**, led by Judith Fontanelle:

- `src/pages/programmes/roots/RootsArchive.tsx` — "The Knowledge Archive":
  Hair Science by Texture, Chemical Literacy, Feature Pressure & Its History,
  Mixed Heritage Hair, each with an `EvidenceGrade`
  (`documented | research | traditional | contested`) and a `judith-leads`
  section status.
- `src/pages/programmes/roots/sandbox.tsx` — Aya (knowledge Q&A), a Remedies
  Database, an Apothecary formulation workspace, a Seasonal Guide.
- `src/pages/programmes/roots/RootsPage.tsx` — founding team Judith Fontanelle
  (child development / safeguarding), Flora Agba (salon practice), Natalie
  (women's studies / body politics). The Roots podcast series is
  "Caring for Your Child's Hair", framed as "a safeguarding resource disguised
  as a hair care guide".

**This syllabus is a different strand of the same programme.** It covers the
**ancestral-record / archival-research** strand — the one
`docs/research/WW-RESEARCH-ELEMENT-BY-PROGRAMME.md` marks **DEMONSTRATED** and
describes as *"the actual mechanics of archival survival and loss"*, evidenced in
the locked curator entries for **James Dent Walker** (reconstructing lineage from
military/pension records built by the system that enslaved people) and
**Arturo Schomburg** (a man who went looking for a record that had been actively
denied and built the institution that still holds it).

**Unresolved, flagged for CJ — not forced here:** how these two strands
(body-sovereignty/hair-science, led by Judith; ancestral-record/archival, hosted
by Esi) sit under one programme badge, one host ROV, and one set of Explorer→
Leader tiers. This syllabus does **not** supersede, absorb, or rename the
hair-science content, and it does not assume a single combined badge pathway.
The DNA & Ancestry Literacy module (Module 5) is the natural bridge point and is
written to sit alongside the hair-science content, not on top of it. If CJ's
intent was a single unified Roots syllabus covering both strands, **stop and
re-scope** — this draft delivers only the archival strand the task's module
structure describes.

---

## Programme purpose (this strand)

Teach a member to do real ancestral and community-history research — and to do
it already braced for what the record cannot give back. A member should leave
able to: work an archive methodically; link fragmentary records into a defensible
lineage using a named, taught method; conduct an oral-history interview to
protected-tier consent standards; grade and cite evidence honestly; read a DNA
or ancestry result without over-reading it; **write an honest "not found, and
here is why" entry that reads as a finding, not as silence**; navigate the
consent ethics of research that touches living relatives; and deposit the result
— resolved or not — into the Knowledge Commons to a real standard.

## Research element (per `WW-RESEARCH-ELEMENT-BY-PROGRAMME.md`)

**DEMONSTRATED.** Roots' research lens is the "what survived / what was lost /
how" question applied to the archival record *itself* — not as metaphor. The
record of an enslaved person's life was kept, where it was kept at all, as a
by-product of someone else's transactions. This syllabus teaches method inside
that fact rather than bolting the fact on afterwards.

## Badge pathway

Explorer → Builder → Innovator → Leader, consistent with the other certifying
programmes, **but with a conditional pairing at Builder and above** (see below).

- **Explorer** — the research discipline itself: archive orientation, the
  structure of the gap, first supervised record-linkage, honest citation, a
  first practised "Naming the Gap" entry. **Documentation-only regardless of
  topic.**
- **Builder** — an independent piece of real ancestral or community research,
  carried from question to deposited Knowledge Commons entry, including at least
  one oral-history interview conducted to consent standard. **Pairing may
  trigger here** (see "Conditional pairing structure").
- **Innovator** — original research: a lineage or community history nobody has
  assembled before, or a substantive correction to an existing account,
  deposited with full evidence-tiering.
- **Leader** — capstone: a substantial Knowledge Commons deposit planned and
  delivered end to end — **an honestly-deposited unresolved finding is an
  equally valid, equally excellent capstone outcome** (see Capstone).

---

## Conditional pairing structure (replaces the old Module 6, "Material/Technical Tradition Identification")

The 19 Aug draft had a standalone Module 6 teaching members to identify whether a
topic carries an associated material or technical tradition. That is **not a
content module** — it is a **gating check**, and it already exists as the
resolved yes/no field the ROV / Keeper confirms before sign-off, per the locked
Roots↔Scrap Cat pairing rule:

> **Roots↔Scrap Cat pairing rule (locked).** Explorer tier is
> documentation-only for every topic — the research discipline is what is being
> taught and assessed, and no craft crossover applies. At **Builder tier and
> above**, a topic that has a **material or technical craft counterpart** (a
> textile, a foodway with a making technique, a building method, an instrument,
> a tool tradition) triggers a crossing into **Scrap Cat's Heritage Craft
> Revival** — the task's name for the Builder+ heritage-craft crossing; Scrap
> Cat's built content (`src/pages/programmes/scrap-cat/`, `tutorials.scrap-cat.ts`)
> is currently framed as *repair* / salvage, so this crossing mode may itself be
> unbuilt. When triggered, the resulting unit is **dual-signed**: the
> **Keeper (Roots)** signs the research and documentation; the **Maker (Scrap
> Cat)** signs the craft identification and any craft practice. The trigger is a
> single **yes/no `material_tradition` field**, set on the topic and confirmed
> by the ROV/Keeper before sign-off — not a judgement the member is examined on.

**Documentation-home note.** The task instructs this gating check to be folded
into "the existing trigger-condition mechanism's documentation". As of
2026-09-10 that mechanism has **no canonical file in this repo** — grep for
"Heritage Craft Revival", "craft counterpart", "material tradition",
"trigger-condition" across `docs/` and `src/` returns nothing. It is
chat-memory / external-notes only, like several other WW specs (see the
`spec-interpretation-calls-and-working-defaults` memory). Until a Scrap Cat
pairing-rule doc exists, this section and `accreditation/programmes/roots/unit-mapping.md`
are its interim written home. **Flag:** create
`docs/accreditation/WW-SPEC-ROOTS-SCRAPCAT-PAIRING-001.md` (or fold into a Scrap
Cat syllabus when one is drafted) and relocate this rule there, leaving a pointer
here.

---

## Modules

### Module 1 — Archival Research Fundamentals: the Record and Its Gaps

**Opens with loss, not method.** Before a single search technique, the member
learns *why the record is shaped the way it is* — that the gaps are structural
and were built in, not accidents a better search term will fix.

**Founding example — the Antigua slave register.** The taught case is a real
registry entry: enslaved people listed by **first name only** — *Billy, John,
Prudence* — with **no surname** and an **approximate age** ("about 30", "aged
40 or thereabouts"). This is not a naming mismatch. It is a **structural
absence**: an enslaved person was not recorded as *needing* a surname, a birth
date, a parentage line, in the way the same document meticulously records the
owner's name, the owner's holdings, and the valuation. The register exists to
serve a transaction. The person is an entry in it.

The member works this example directly: given *Billy, about 30, Antigua, 1817*,
what can and cannot be recovered, and why each "cannot" is the record doing
exactly what it was built to do. Every later module is taught *inside* this
fact — a member learns search technique already braced for what it will not
find, not method first with loss as a footnote.

**Then, method — braced.** Archive types and what each was kept for (parish
registers, wills and probate, plantation ledgers, slave registers and
compensation records, ships' manifests, military and pension files, census,
newspapers, church and manumission records). How to read a finding aid. Search
strategy: name variants and transcription error, the difference between "not in
this index" and "not in this record set" and "never recorded at all". Keeping a
research log from the first session — every source checked, including the ones
that returned nothing, because *that* is data (Module 6).

**Practice exercise 1.1** — Given a supplied Antigua-register extract and a
family question ("who were Prudence's parents?"), produce a one-paragraph
statement of what the record can support, what it cannot, and *which kind* of
"cannot" each is (not indexed / not in this record set / structurally never
recorded). Assessed on whether the member distinguishes the three.

### Module 2 — Record-Linkage & Verification Method

*(Unchanged in intent from the 19 Aug draft.)*

The taught technique is **James Dent Walker's** real archival method — the
genealogist at the US National Archives whose record-linkage work is the actual
research behind Alex Haley's *Roots*, corrected here onto its real practitioner
rather than left with the popular author. Walker's approach: build outward from
the record that *was* kept about people the system tracked for its own reasons —
military service and pension files, Freedmen's Bureau records, compensation and
tax records — and link fragmentary entries across record sets by triangulating
name, place, age band, household composition and named associates, never on a
single match.

Content: the genealogical proof standard (reasonably exhaustive search;
complete and accurate citation; analysis of conflicting evidence; a written
conclusion); direct vs. indirect vs. negative evidence; the difference between
*a* record and *proof*; building a timeline and a household reconstruction;
when a link is "probable" and must be stated as probable, never quietly firmed
up.

**Practice exercise 2.1** — From a supplied bundle of 6–8 fragmentary records
(some referring to the same person, some not, one actively contradictory),
produce a linked timeline with each link graded (established / probable /
possible / rejected) and a one-line rationale per link.

### Module 3 — Oral History Interview Technique

*(Unchanged from the 19 Aug draft.)*

The consent and damage-screening standards already researched for the Knowledge
Commons **protected-tier** deposit pathway, taught as interview practice.
Informed consent as a process not a signature; what the interviewee is
consenting *to* (recording, transcription, deposit, WW commercial use — each
separately); the right to review, redact and withdraw; pre-interview
damage-screening for material that could cause "substantial damage or distress"
to the interviewee or to named third parties; trauma-aware interviewing (the
interviewee sets the pace; silence is allowed; you do not push a distressed
narrator for detail); recording the hands and the room, not only the audio,
where a practice is being shown.

**Practice exercise 3.1** — Conduct and record a 20–30 minute family or
community interview, having completed and submitted a consent record and a
damage-screening note *before* the interview. Assessed on the consent process
and the screening, not on the content recovered.

### Module 4 — Evidence-Tiering & Citation Discipline

*(Unchanged from the 19 Aug draft.)*

The **WW-Harvard** citation format, and the three-tier evidence grade used
across the platform (matching `RootsArchive.tsx`'s `EvidenceGrade` and the
Knowledge Commons deposit model):

- **documented** — established history / a primary or well-corroborated
  secondary source;
- **contested** — a real source exists but is disputed, single, or
  complicated by a second source;
- **original** — the member's own reconstruction or synthesis, not previously
  assembled.

Every claim in a deposit carries a tier and a citation. This module grades
**what was found**. It is distinct in purpose from Module 6, which is the skill
of stating **what was not**.

**Practice exercise 4.1** — Take a supplied 200-word family-history paragraph
with no citations and re-write it with every factual claim tiered and cited in
WW-Harvard, flagging any claim that cannot be supported at all (which is a
Module 6 sentence, not a citation).

### Module 5 — DNA & Ancestry Literacy

*(Unchanged from the 19 Aug draft. Deliberately paired **against**, not
duplicating, STEMgeneers' genetics content — Module 5 is interpretation and its
limits, not the underlying science, which STEMgeneers teaches. The task calls
this "STEMgeneers Module 9"; a module of that number was not located in the
STEMgeneers curriculum data — the pairing intent stands regardless, and the
STEMgeneers curriculum does carry "Genetics and evolution" content to point at.)*

What an autosomal DNA result can and cannot tell you: centimorgans and shared
segments; why "ethnicity estimates" are estimates against present-day reference
panels and shift when the panels are updated; why they are coarser for African
and diaspora populations because the reference data is thinner; endogamy and why
it inflates apparent relationship; the difference between a DNA match and a
*documented* relationship; mtDNA and Y-DNA as deep-ancestry lines only; the
privacy and consent dimension of testing (a member's result exposes relatives
who did not test). How a DNA result is used **as one indirect evidence source
inside the Module 2 method**, never as a standalone answer.

**Practice exercise 5.1** — Given a supplied match list and a family question,
write what the DNA supports, what it only suggests, and what it cannot address —
and identify one relative whose privacy is implicated by using it.

### Module 6 — Naming the Gap

**A distinct, practised skill: writing an honest "not found, and here is why"
entry.** This is the direct research-method equivalent of WW's research-vessel
principle — not grading confidence in what *was* found (Module 4), but
practising the discipline of **stating a limitation as a limitation**, visibly,
so it can never be mistaken for a quiet non-answer indistinguishable from
"nothing here".

The anatomy of a good gap entry:
1. **What was asked** — the specific question.
2. **What was searched** — every record set checked, by name, including the
   ones that returned nothing (from the Module 1 research log).
3. **What was found, and what it was not enough for.**
4. **Why the gap is there** — and *which kind* of gap: not-yet-digitised /
   not-indexed / record lost or destroyed / **structurally never recorded**
   (the Antigua-register kind). Naming the kind is the point — a
   not-yet-digitised gap invites a later revisit; a structural gap is a
   finding about the archive itself.
5. **What would close it, if anything** — or an honest "nothing available can".
6. **Deposit it as a finding**, tiered and cited like any other, not left as a
   blank field or an unstarted entry.

**Worked example A — the Antigua case (from Module 1), at individual scale.**
"Who were Prudence's parents?" → searched: Antigua slave register 1817–1834,
Anglican parish registers for the parish, compensation records, the estate's
surviving ledgers. Found: Prudence listed 1817 (age ~25) and 1821 on the same
estate; no parentage line in any entry. Gap kind: **structural** — the register
records mothers' names for children born into it after 1817 but carries no
retrospective parentage for adults already enslaved in 1817. What would close
it: only an estate baptism record naming her, if one survives, none located.
Deposit as: `contested`/`original`, an honest wall.

**Worked example B — the "stinking toe" / vernacular-name provenance case, at
naming scale.** A diaspora plant known by a vernacular name ("stinking toe",
West Indian locust, *Hymenaea courbaril*) — tracing *which* community's usage,
*when*, and *through whom* the name travelled. The record here is not a slave
register but scattered cookbooks, oral usage, migration-era press and horticultural
catalogues, and the gap is **attribution**: the name is real and used, but its
line of transmission is not documented and may not be documentable. Same
discipline, different scale — the member writes the gap as a gap ("the name is
attested from at least X; the community and route of transmission are not
established and the following were checked …") rather than either inventing a
lineage or dropping the thread.

**Practice exercise 6.1** — Take a real thread from the member's own Module 2 or
Module 5 work that hit a wall, and write it up as a full six-part gap entry.
Assessed on: all six parts present; the *kind* of gap correctly named; the entry
readable as a deliberate finding, not as an abandoned draft.

**Practice exercise 6.2** — Given a supplied "completed" family-history entry
that quietly omits an unresolved question (a parent simply not mentioned rather
than flagged as unknown), identify the silent gap and re-write that part as an
explicit Module 6 sentence.

### Module 7 — Provenance & Consent Ethics

*(Unchanged in intent from the 19 Aug draft, where it was Module 7.)*

Family and community research routinely touches **living relatives who did not
themselves consent** to being researched or named. This module carries real
weight for that reason.

Content: the difference between the interviewee's consent (Module 3) and the
consent of people *named within* an account who were never in the room;
protected-tier screening applied to a deposit, not just an interview; when a
living person's involvement in a family story is theirs to disclose and not the
researcher's; handling material that is documented and true but harmful to
disclose (an undisclosed parentage, a criminal record, an institutionalisation,
an immigration irregularity); provenance of physical items and images (who owns
the photograph, who has the right to deposit it); and the Equiano-Principle
consent logic as it applies to a deposit that includes third-party material.

**Practice exercise 7.1** — For a supplied family narrative containing two
living named non-consenting people and one sensitive-but-true disclosure,
produce the screening note: who must be approached, what must be redacted or
held, what can be deposited now.

### Capstone (Leader tier) — Knowledge Commons Deposit Practice

Plan and deliver one substantial Knowledge Commons deposit end to end: a real
ancestral or community-history research question, worked through the Module 2
method, with at least one Module 3 interview where the question allows, fully
evidence-tiered and cited (Module 4), DNA used correctly as indirect evidence if
used at all (Module 5), consent-screened (Module 7), and deposited to the live
Knowledge Commons standard.

**The capstone requirement is no longer "produce a completed, corroborated
entry."** A member whose real research hits a genuine structural wall — the
Antigua-case shape — and who **deposits that wall honestly, using the Module 6
"Naming the Gap" skill**, has done **excellent** work and is assessed as such.
An honestly-deposited unresolved finding is an equally valid, equally excellent
capstone outcome. It is not an incomplete result and must not be marked as one.
What is assessed is the **rigour of the search and the honesty of the
account**, not whether the ancestor was found.

**Globe cross-linking (per this session's connectivity discussion).** Where the
deposit concerns a specific place:

- **If a Knowledge Commons globe entry already exists for that place**, the
  capstone **must** cross-link the deposit to that entry via the existing
  `cross_links` field (`kc_live_entries.cross_links UUID[]`, V71 — PEER /
  THEMATIC relations).
- **If no globe entry exists for that place yet**, the capstone **must
  explicitly flag it** as a candidate for the globe's demand-driven
  **sub-national creation** criterion (the country → state → county hierarchy is
  `kc_live_entries.parent_entry_id`, V73). The flag is **recorded for later
  Documenter / Archivist review — not auto-created**. Note: V73 provides the
  *structure* (`parent_entry_id`, the `locked` seismic-gap flag); the
  *demand-signal rule itself* — what volume of clustered member research
  activity causes a new sub-national entry to be proposed — is an agreed rule
  that is **not yet mechanised** (chat-memory / see the connective-layer tracker
  item). Until it is, the capstone flag is a human hand-off.

**Capstone deliverables:** the deposited entry itself; the research log (every
source, including nil returns); the consent/screening file; a short reflective
account of where the research stands — resolved, partially resolved, or an
honest wall — written in Module 6 form if it is a wall.

---

## Module → tier → unit map

| Module | Tier home | RQF unit (see `unit-mapping.md`) |
|--------|-----------|----------------------------------|
| 1 Archival Research Fundamentals (loss-first) | Explorer | ROOTS-1 |
| 2 Record-Linkage & Verification Method | Explorer → Builder | ROOTS-1 → ROOTS-2 |
| 3 Oral History Interview Technique | Builder | ROOTS-2 |
| 4 Evidence-Tiering & Citation Discipline | Explorer | ROOTS-1 |
| 5 DNA & Ancestry Literacy | Builder | ROOTS-2 |
| 6 Naming the Gap | Explorer (first practice) → Builder+ (applied) | ROOTS-1 → ROOTS-2 |
| 7 Provenance & Consent Ethics | Builder | ROOTS-2 |
| Capstone — Knowledge Commons Deposit Practice | Leader | ROOTS-3 |
| *(gating check)* material_tradition → Scrap Cat pairing | Builder+ only, when triggered | ROOTS-2P (paired, dual-signed) |

---

## Sign-off status

- **Module structure / shape:** signed off by CJ, 2026-09-10 (carried in the
  task brief).
- **This prose:** NOT signed off. Per the task, the drafted content must be
  confirmed to embody the signed-off shape — specifically Module 1's loss-first
  framing and Module 6's "Naming the Gap" practice — before compression. See the
  implementation note.

## Implementation note (Claude Code, 2026-09-10 — not part of the syllabus text)

- Drafted fresh as a real file per the standing rule (the 19 Aug draft was never
  on disk). Placed at `docs/accreditation/WW-SPEC-ROOTS-SYLLABUS-001.md`,
  matching where the Kitchen syllabus (`WW-SPEC-AUNTIE-ANANSIS-KITCHEN-SYLLABUS-001.md`)
  was actually placed.
- **Headline finding, flagged to CJ:** the live Roots codebase is Judith
  Fontanelle's body-sovereignty / hair-science / safeguarding programme; this
  signed-off syllabus is the *archival-research* strand
  (`WW-RESEARCH-ELEMENT-BY-PROGRAMME.md` DEMONSTRATED: Walker, Schomburg). The
  two are not reconciled — how they share one badge / host / tier ladder is
  open. If a single unified syllabus was intended, this needs re-scoping.
- The Antigua slave-register case, the James Dent Walker / Alex Haley
  correction, and the "stinking toe" vernacular-name case are all
  chat-memory-only — not previously in the repo. Written from the task's own
  description plus general historical record; the specific register extracts
  used as practice material still need to be sourced to real transcribed
  entries before this reaches members.
- The Roots↔Scrap Cat pairing rule is stated here as its interim written home;
  its canonical doc does not exist yet (flagged above).

## Changelog

- **2026-09-10** — file created (Claude Code) from `WW-TASK-ROOTS-SYLLABUS-SIGNED-OFF`.
  7 modules + capstone. Compressed to `accreditation/programmes/roots/` the same
  day. Connective-layer tracker item added to `docs/WW-OUTSTANDING-TASKS.md`.
