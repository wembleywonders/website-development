# KC Archive — Africa–Caribbean Economic Realignment (Diaspora-Trade cluster)

**Status of this file:** DRAFT entries — **NOT PUBLISHED.** Per the standing
no-auto-approve constitutional rule, nothing here is member-facing or locked. Each
entry below is a DRAFT awaiting a directors' review before it can move to PUBLISHED /
live tier.

**Task origin:** WW-TASK-KC-DIASPORA-TRADE-ENTRIES (drafted from a YouTube
compilation/reaction video). Per the standing rule carried into that task: the video is
a non-primary source and was **not** used as evidence for any factual claim. Every fact
in every entry below was checked against a primary or reliable secondary source; the
verification trail is in **Part A** and the per-entry confidence grades.

---

## Schema-reality note (read before porting these anywhere) — 9 Sept 2026, Claude Code

The task specifies drafting "against the real V71/V72 schema and API" using the
"original six-value `tectonic_tags` enum," a `cross_links` field, a DRAFT/PUBLISHED
status, a "live tier," and a (not-yet-built) `CONTESTED_DIMENSION` field.

**None of that schema exists anywhere in this repository.** Checked directly: full-repo
grep for `tectonic_tags`, `tectonic`, `CONTESTED_DIMENSION`, `kc_entries`,
`UNDERSEA_BANK`, `DIASPORA_FLOW`, `live-tier`/`live tier`, and `V71`/`V72` returns zero
hits in `src/`, `docs/`, migrations (there are no `.sql` files in the repo at all), or
anywhere else. The only Knowledge Commons persistence code that exists is
`src/knowledge-commons/lesson-modules/lessonModuleStore.ts` (a STEMgeneers-only
lesson-module pilot with a `review-status` enum) and `src/knowledge-commons/citation/
citationStore.ts` — neither is a KC-entry table with tectonic tags.

This matches the pattern already recorded in project memory
(`spec-interpretation-calls-and-working-defaults`) and in
`docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md`'s own placement note: **several
WW specs, including the KC tectonic taxonomy and its V71/V72 schema, live in CJ's
external notes system and are only pasted into sessions — they are not files here.** I
cannot verify the entries against a schema I cannot see.

**What was done instead:** the entries are drafted as markdown, following the
`docs/research/KC-*.md` convention that is the only KC-archive pattern that actually
exists in this repo (`KC-HIDDEN-COSTS-ARCHIVE.md`, `KC-STEAK-TECHNIQUE-REFERENCE.md`,
`KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md`). Each entry carries every field the task
named — `status`, `confidence`, `tectonic_tags` (mapped to the six-value enum **as
described in the task**, since the enum's own definition is external), a
`tectonic_taxonomy_candidate` note for re-tagging once the fuller taxonomy migration
ships, `cross_links`, and — for Entry 3 — the contested dimension handled in prose. When
the real V71/V72 schema is available, these port field-for-field. **This is logged as an
open item in `docs/WW-OUTSTANDING-TASKS.md`.**

---

## Cross-links — checked against the real repo

- `docs/research/WW-SPEC-SOURCE-VETTING-RUBRIC-001.md` — **real file.** The four-test
  rubric was applied per-claim below (Test 1 source every claim; Test 2 corroboration;
  Test 3 depth over heat; Test 4 argument not category).
- `docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md` and
  `docs/research/WW-OPEN-INVESTIGATIONS.md` — **real files.** Entry 4 (Guyana) and the
  open questions in Entries 1–3 are written in the research-vessel format: confirmed /
  uncorroborated / still-open, stated plainly.
- `docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md` — **real file, but note it
  is untracked / never actually committed** (see `WW-OUTSTANDING-TASKS.md` "Held pending
  CJ decision", item 3). Entry 4 below is deliberately scoped to *not* duplicate it —
  that entry owns the diaspora-labour / three-Guianas / Windrush-testimony angle; Entry
  4 here owns the maritime-boundary / offshore-oil ("undersea bank") angle and Guyana's
  place in the Entries 1–2 economic conversation. The overlap is flagged, not silently
  reproduced.
- `docs/research/WW-SPEC-THESE-ARE-THE-FACTS-001.md` — **real file.** Entry 3's
  contested-dimension handling follows the same "name both positions, adjudicate
  neither" discipline TATF applies on-air.

---

# PART A — Primary-source verification

## A.1 — Ghana / Mahama AfCFTA–Caribbean proposal

**What the video claimed (paraphrase):** Ghana's president used a Jamaica state visit to
propose bringing the Caribbean into the AfCFTA.

**What was actually found (primary / reliable secondary):**

- **The statement, verbatim.** President John Dramani Mahama: *"One of the things that I
  would champion when I become AU chair next year is to expand the remit of the African
  Continental Free Trade Area to include the Caribbean."* And separately: *"The Caribbean
  was accepted and duly acknowledged as the seventh region of Africa. So it allows
  CARICOM to sit in AU meetings and to hold discussions affecting Africa and the
  Caribbean."*
- **Setting.** A joint media briefing with Jamaican Prime Minister Andrew Holness at the
  Office of the Prime Minister, Kingston, Jamaica, **Monday 3 August 2026**, during
  Mahama's four-day state visit (2–5 August 2026). He also addressed the Jamaican
  Parliament and laid a tribute to Marcus Garvey. Reported by *Graphic Online* (Ghana's
  state daily), GBC Ghana (state broadcaster), the *Jamaica Gleaner*, Pulse Ghana, and
  others — **multiply corroborated.**
- **What has actually happened, formally: nothing yet.** No legal proposal for Caribbean
  membership or association has been tabled at the AfCFTA Secretariat or the AU. Mahama's
  own stated next step is to "build support among African Union member states" and
  "consult the AfCFTA Secretariat, CARICOM leaders and other institutions" *after* he
  takes the AU chair. No working group has been formed on this specific proposal.
- **The AU chairmanship.** Ghana is the **incoming** AU chair; Mahama assumes the
  rotating one-year chairmanship at the AU Assembly, **around February 2027** (the
  *Gleaner* editorial dates it to February 2027). As of the drafting date he does **not**
  hold it.
- **Real existing scaffolding (not the same as the proposal).** CARICOM has been
  designated the AU's **"sixth/seventh region"** (the AU's diaspora-region concept),
  which lets CARICOM sit in some AU meetings. The **African Export-Import Bank
  (Afreximbank)** has committed **up to US$5 billion** in lending to the Caribbean over
  four years. A 2024 Afreximbank analysis put current Africa–Caribbean trade at **just
  over US$1 billion**, with ~57% of the unrealised potential attributed to "trade
  frictions linked to logistical, procedural and infrastructure challenges." These are
  real; they are the context Mahama's proposal sits in, not evidence the proposal itself
  has advanced.

**Verification verdict:** The **fact that Mahama made this pledge, when, where and in
what words** is CORROBORATED (multiple independent reliable outlets, including two state
media organs). The **policy itself is a stated future intent contingent on a
chairmanship he does not yet hold** — there is no enacted policy, tabled proposal, or
formal mechanism. Graded accordingly in Entry 1.

## A.2 — AU–CARICOM "19-point" reparatory justice framework

**What the video claimed (paraphrase):** African and Caribbean governments adopted a
19-point reparations plan.

**What was actually found:**

- **The event.** The **International / High-Level Consultative Conference on
  Reparations**, themed **"Next Steps on Reparatory Justice,"** held in **Accra, Ghana,
  17–19 June 2026** (the closing declaration was adopted on **Friday 19 June**; some
  reports frame the substantive sessions as 18–19 June). Convened by Ghana with the
  **African Union** and the **CARICOM Reparations Commission**; the AU's own reparations
  mechanisms (Committee of Experts on Reparations, Reference Group of Legal Experts) were
  in the room. More than 80 countries were represented. Heads of state present included
  those of **Namibia, Liberia, Senegal, Barbados, and São Tomé and Príncipe**; French
  President Emmanuel Macron addressed the gathering virtually. — Corroborated by AP (via
  Fox News), Al Jazeera, GBC Ghana, and AU materials.
- **The trigger.** It followed **UN General Assembly Resolution A/RES/80/250 (March
  2026)**, which recognised the transatlantic trafficking of enslaved Africans and
  racialised chattel enslavement as "the gravest crime against humanity."
- **Lineage.** Builds on the **2023 Accra Proclamation on Reparations** (an AU document)
  and the **September 2025 Addis Ababa Declaration on the Transcontinental Partnership**;
  and it runs alongside — it does not replace — the **CARICOM Ten-Point Plan for
  Reparatory Justice**.
- **The "19 points" — content confirmed by category, not verbatim.** The framework
  demands, per AP and Al Jazeera reporting: **full, formal and unconditional apologies**
  from states and institutions that benefited from enslavement and the slave trade;
  **financial compensation**; **debt relief and cancellation**; a **Global Reparations
  Fund**; **return of looted cultural artefacts and ancestral/human remains**; **reform
  of international financial institutions** for fairer Global South representation;
  **climate-justice financing**; **expanded citizenship pathways and a "right of return"**
  for descendants of enslaved Africans; and **preservation of former slave forts and
  castles as memorials**. Mahama also announced the creation of **three bodies** (on
  reparations, cultural restitution, and legal affairs).
- **Two things the framework notably does NOT do:** it **does not name which specific
  countries** should pay compensation or issue apologies; and it contains **no
  enforcement mechanism** — it is a political agenda, expected to be **presented to the
  next UN General Assembly**. Al Jazeera's own framing: turning these declarations into
  policy faces "political resistance, legal obstacles and questions about
  implementation."

**Verification verdict:** The **existence of the framework, its adopting bodies, venue,
date, thematic demands, and its lack of any enforcement mechanism** are CORROBORATED
(AP + Al Jazeera + AU channels). **The exact enumeration of the 19 individual points was
NOT located in an official AU or CARICOM primary document within reasonable search
effort** — the AU's public "Accra Proclamation" page is the 2023 document, not the 2026
19-point text. The "19" count is reported consistently across many outlets but traces to
the same conference-day reporting, not to a published numbered list. Entry 2 therefore
presents the demands **by category** and grades the specific "19 discrete points as
worded" sub-claim as SINGLE_SOURCE / UNVERIFIED.

## A.3 — EU citizenship-by-investment (CBI) ultimatum to five Caribbean states

**What the video claimed (paraphrase):** the EU told five Caribbean states to end their
"golden passport" programmes by June 2028 over security/vetting concerns or lose
visa-free access.

**What was actually found — this one has a genuine EU primary source:**

- **Primary document.** **Council of the European Union meeting document WK 9011/2025
  INIT, Brussels, 30 June 2025** — a European Commission (DG HOME, Unit B4) presentation
  to the Council's **Visa Working Party**, titled *"Citizenship by investment programs
  (CBIPs)."* Marked LIMITE but released under PUBLIC access. This is the EU stating its
  own position in its own words. Key content, close to verbatim from the slides:
  - Legal basis: **Article 8 of Regulation (EU) 2018/1806** (the "Visa Regulation"),
    which establishes the **visa suspension mechanism**. The EC "may suspend visa
    exemption vis-à-vis a third country" where there is *"an increased risk or imminent
    threat to the public policy or internal security of Member States."*
  - The five states named: **Antigua and Barbuda, Dominica, Grenada, Saint Kitts and
    Nevis, and Saint Lucia** — the "five visa-free Eastern Caribbean countries operating
    investor citizenship schemes," covered in the Commission's Visa Suspension Mechanism
    reports since the 6th report (2023).
  - Stated rationale, verbatim from the "Persistence of key concern points" slide:
    *"Background vetting carried out by CBIP jurisdictions does not provide sufficient
    guarantees"*; *"the possibility to conduct virtual interviews does not provide
    sufficient safeguards (e.g. biometric verification)"*; and *"CBIPs enable
    visa-required TCNs to bypass migration & security risk assessment of the Schengen visa
    procedure and may represent a threat to public policy or internal security."*
  - "Next steps" slide: under the **revised visa suspension mechanism**, *"CBIPs become a
    ground for suspension"* — **but** *"suspension will not be automatic in cases
    involving CBIPs. The economic importance of CBIPs and the countries' external
    relations will remain key factors in the Commission's assessment."*
- **The ultimatum itself (near-primary — the letter, as reported).** A letter dated **25
  June 2026** from **Magnus Brunner**, European Commissioner for Internal Affairs and
  Migration, sent to each of the five governments (the Antigua copy addressed to Prime
  Minister Gaston Browne). It requests a **full phase-out of the CBI programmes by 1 June
  2028**, offering a **24-month transition**, with **interim measures by September 2026**
  (exclusion of all individuals subject to EU restrictive measures; reinforced vetting
  for all nationalities). It grounds the demand in the **revised visa suspension
  mechanism, in force 30 December 2025**, under which operating a CBI programme
  *"regardless of how well it is managed"* is now *"a self-standing ground for suspending
  visa-free access."* Reported consistently by IMI Daily, NOW Grenada, CNBC,
  Caribbean360 and others. **The consequence — loss of visa-free Schengen access — is the
  EU's own stated mechanism, not an outside inference.** The specific **1 June 2028** date
  and **24-month** transition come from the letter as reported; I did not read the letter
  text itself, only consistent multi-outlet reporting of it.
- **Current status.** As of early August 2026: **no visa-free access has been suspended**;
  **none of the five programmes has closed**; applications remain open; existing passports
  are unaffected. Multiple outlets describe the June 2028 date as **a negotiating
  position, not an agreed closure date**.
- **The Caribbean governments' response (for the contested-dimension framing).** After a
  **10 July 2026 meeting in Roseau, Dominica** (chaired by Dominica PM Roosevelt Skerrit;
  with Browne of Antigua & Barbuda, Philip J. Pierre of Saint Lucia, Dickon Mitchell of
  Grenada, Terrance Drew of Saint Kitts & Nevis; Godwin Friday of St Vincent also
  present), the five issued their **first collective response**. Their arguments: CBI is
  *"an important pillar of economic resilience and development financing for small island
  developing states,"* funding climate resilience, disaster recovery and infrastructure
  and reducing reliance on unsustainable borrowing; **any transition must be accompanied
  by a comprehensive framework safeguarding economic stability** and providing
  alternative financing; they **reject a unilateral phase-out** without reciprocal EU
  support; and they cite their **regional regulatory authority** (a shared CBI regulator)
  as evidence of ongoing reform. Browne separately: the government *"will not be pressured
  into a unilateral phase-out that would cause irreparable harm to the national economy
  and the welfare of our citizens,"* and no EU offer to date is *"quantified, binding, or
  explicitly framed as replacement revenues."*
- **On a racial / double-standard dimension.** The EU's own **Malta** CBI programme was
  struck down by the **European Court of Justice on 29 April 2025** (Case C-181/23) as
  incompatible with EU law. External commentary has framed the EU's posture toward the
  Caribbean programmes — which sell citizenship "to mostly wealthy non-Westerners" — as a
  double standard, and some of that commentary reads a racial or geopolitical hierarchy
  into it. **The five governments' official joint response does not make a racial or
  discrimination argument** (confirmed: IMI Daily's read of the statement notes its
  deliberately "conciliatory" tone and absence of any such claim). This split is what
  Entry 3 handles as a contested dimension in prose.

**Verification verdict:** The **EU's stated rationale** (security / insufficient vetting)
is CONFIRMED against an EU primary document. The **deadline (1 June 2028), transition
period, and consequence (visa-free suspension)** are CORROBORATED from the Brunner
letter as consistently reported by multiple specialist and mainstream outlets
(near-primary; letter text not directly read). The **racial-motivation reading** is a
CONTESTED external inference, explicitly not adjudicated.

---

# PART B — DRAFT KC live-tier entries

> All three are **status: DRAFT**. Not published, not member-facing, no auto-approve.
> `tectonic_tags` use the six-value live enum **as described in the task**
> (`STABILITY / VOLATILITY / HOTSPOT / FLASHPOINT / GLACIER / FRACTURE`); the enum's
> authoritative definition is external to this repo, so the mapping is best-effort and
> flagged for review. Each entry also carries a `tectonic_taxonomy_candidate` note for
> re-tagging once the fuller Layer-1/2/3 taxonomy migration ships.

---

## Entry 1 — Ghana–Caribbean AfCFTA proposal

- **id:** KC-DT-001
- **status:** DRAFT
- **confidence:** `CORROBORATED` that the pledge was made (multiple independent reliable
  outlets, incl. two Ghanaian state media organs) · `UNVERIFIED / ASPIRATIONAL` as to
  any enacted policy, tabled proposal, or formal mechanism — none exists. The entry is
  about a **stated future intent**, and is graded and worded as such.
- **tectonic_tags:** `GLACIER` (primary — a slow, structural, decades-in-gestation
  realignment of Atlantic trade geography, currently moving only at the level of
  political intent) · `STABILITY` (secondary — the proposal's *aim* is durable
  integration architecture, not disruption). **Review flag:** a reviewer who reads the
  enum differently may prefer `VOLATILITY`; the enum definition is external.
- **tectonic_taxonomy_candidate:** boundary_type candidate **DIVERGENT**; driving_force
  candidate **DIASPORA_FLOW** — pending taxonomy migration. (Rationale: the proposal
  frames the Caribbean and Africa as halves of one population separated by the Middle
  Passage, now being drawn back into a single economic space — a divergent boundary being
  bridged by diaspora ties rather than proximity.)
- **cross_links:** KC-DT-002, KC-DT-003, KC-DT-004,
  `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001`

**Body (draft):**

On 3 August 2026, during a state visit to Jamaica, Ghana's President John Dramani
Mahama said that when he becomes chair of the African Union — a rotating one-year post he
is due to assume around February 2027 — he would "champion" expanding the African
Continental Free Trade Area (AfCFTA) "to include the Caribbean." He made the statement at
a joint press briefing with Jamaican Prime Minister Andrew Holness, alongside a wider
agenda of trade, education, culture and reparations, and a tribute to Marcus Garvey.

The AfCFTA is a continental free-trade area among African Union member states. The
Caribbean is not part of its legal architecture. Mahama's proposal is that CARICOM — the
15-member Caribbean Community — be brought into that architecture, or into a structured
Africa–Caribbean trade arrangement linked to it, so that businesses on both sides could
trade duty-free. He connected this to CARICOM's existing status as a recognised
"diaspora region" of the African Union, which already lets CARICOM attend some AU
meetings.

**What has actually happened:** as of this drafting, nothing formal. No proposal has
been tabled at the AfCFTA Secretariat or the AU. Mahama's own stated next step is to
build support among AU member states and consult the AfCFTA Secretariat and CARICOM
leaders *after* he holds the chair. The proposal is a statement of what he intends to
advocate, from a position he does not yet occupy.

**The context it sits in is real, and is not the same as the proposal advancing.**
Africa–Caribbean trade is currently just over US$1 billion a year — less than 1% of
either region's visible exports. A 2024 Afreximbank study attributed most of the
unrealised potential to logistical, procedural and infrastructure frictions.
Afreximbank has separately committed up to US$5 billion in lending to the Caribbean over
four years. These facts describe the gap the proposal is aimed at; they are not evidence
it is being closed.

**Open questions (research-vessel format):**
- Whether Mahama actually prioritises this once he holds the chair, against competing
  continental agenda items (he has also signalled reparations and AU financial reform as
  chairmanship priorities).
- Whether AfCFTA member states — many with their own protectionist sensitivities — would
  accept extending tariff-free access to a non-African bloc.
- What legal form this would even take: full accession is almost certainly not available
  to non-AU states, so any real version is a bespoke association agreement whose terms do
  not yet exist.

**Vetting notes:** Test 1 — the pledge is sourced to a named person, date and setting,
with verbatim quotes. Test 2 — corroborated across *Graphic Online*, GBC Ghana, the
*Jamaica Gleaner*, Pulse Ghana and others. Test 3 — with the "return to the motherland"
framing stripped out, the residual factual claim is narrow: *a politician said he will
advocate for X once he holds office Y*. The entry is written to that narrow claim, not
the framing. Test 4 — no category villain-coding; the entry names specific institutions
and specific unresolved obstacles.

---

## Entry 2 — AU–CARICOM 19-point reparatory justice framework

- **id:** KC-DT-002
- **status:** DRAFT
- **confidence:** `CORROBORATED` for the framework's existence, adopting bodies, venue
  (Accra), date (17–19 June 2026), thematic demands, and its lack of any enforcement
  mechanism (AP + Al Jazeera + AU channels) · `SINGLE_SOURCE / UNVERIFIED` for the exact
  enumeration of "19 discrete points as worded" — the numbered primary text was not
  located in an official AU/CARICOM channel within reasonable search effort; the entry
  therefore states the demands **by category**.
- **tectonic_tags:** `FLASHPOINT` (primary — a formal, coordinated demand directed at
  former slave-trading states and institutions, raising the diplomatic temperature of an
  already-contested issue) · `GLACIER` (secondary — the underlying grievance is
  centuries old and the process moves over decades).
- **tectonic_taxonomy_candidate:** boundary_type candidate **CONVERGENT_COLLISION** or
  **TRANSFORM** against the states named in (a future, actually-enumerated version of)
  the framework — **to be decided once the real document's mechanism, or lack of one, is
  confirmed.** On present evidence (a demand with no enforcement mechanism, to be carried
  to the UNGA), **TRANSFORM** (two plates grinding past each other without resolution)
  fits better than **CONVERGENT_COLLISION** (a head-on impact forcing change). Pending
  taxonomy migration.
- **cross_links:** KC-DT-001, KC-DT-003, KC-DT-004

**Body (draft):**

In Accra, Ghana, on 17–19 June 2026, an international conference themed "Next Steps on
Reparatory Justice" adopted a framework — widely reported as a "19-point" plan — jointly
advanced by the African Union and the CARICOM Reparations Commission. It followed a March
2026 UN General Assembly resolution (A/RES/80/250) recognising the transatlantic
trafficking of enslaved Africans and racialised chattel enslavement as "the gravest
crime against humanity," and it builds on the AU's 2023 Accra Proclamation on Reparations
and the 2025 Addis Ababa Declaration. Heads of state from Namibia, Liberia, Senegal,
Barbados, and São Tomé and Príncipe attended; President Macron of France addressed the
meeting by video.

**What the framework demands (by category — the exact numbered wording could not be
verified against a primary document):**

- Full, formal and unconditional apologies from states and institutions that benefited
  from enslavement and the slave trade.
- Financial compensation.
- Debt relief and cancellation for affected countries.
- A Global Reparations Fund.
- Return of looted cultural artefacts and ancestral / human remains.
- Reform of international financial institutions to give Global South countries fairer
  representation.
- Climate-justice financing.
- Expanded citizenship pathways and a "right of return" for descendants of enslaved
  Africans.
- Preservation of former slave forts and castles as memorials.

Ghana also announced the creation of three coordinating bodies (on reparations, cultural
restitution, and legal affairs).

**Two structural facts about the framework:**
1. It **does not name which countries** owe compensation or apologies. It is a statement
   of what is demanded, not a bill presented to a named debtor.
2. It has **no enforcement mechanism.** It is a political agenda, to be carried to the
   next UN General Assembly. Every step from here depends on the voluntary agreement of
   states that have so far declined to pay.

**Where this entry stops.** WW's remit is to set out what the framework actually says and
what standing it actually has. **It is not within KC's remit to adjudicate whether
reparations are owed, or in what amount** — that is a values question, and the governing
principle is *explore and expose, don't manufacture a winning argument.* The entry
presents the demands as demands, the process as a process without teeth, and the
counter-position (that translating any of this into policy faces sustained political,
legal and fiscal resistance from the states named) as a real feature of the landscape,
not a rhetorical concession.

**Open questions:** the actual enumerated text of the framework; whether the "Global
Reparations Fund" acquires any committed contributor; whether the UNGA presentation
produces anything beyond a further resolution.

**Vetting notes:** Test 1 — named bodies, dated event, named heads of state. Test 2 —
AP and Al Jazeera independently, plus AU materials. Test 3 — the claim survives with the
heat removed: *a framework was adopted; it lists demands; it has no enforcement
mechanism.* Test 4 — the entry engages the specific document and the specific process;
it does not villain-code "Europe" or "the West" as a category, and it does not import the
accusatory register even where individual underlying facts (the UNGA resolution, the
2023 Proclamation) check out.

---

## Entry 3 — EU citizenship-by-investment ultimatum to five Caribbean states

- **id:** KC-DT-003
- **status:** DRAFT
- **confidence:** `CONFIRMED` for the EU's stated rationale (checked against EU primary
  document WK 9011/2025 INIT) · `CORROBORATED` for the 1 June 2028 deadline, 24-month
  transition, and the visa-free-suspension consequence (Brunner letter of 25 June 2026,
  as consistently reported by multiple specialist and mainstream outlets; letter text
  not directly read) · contains a live `CONTESTED_DIMENSION` (handled in prose below,
  since the field does not exist in the current schema).
- **tectonic_tags:** `FRACTURE` (primary — external leverage applied to a small state's
  sovereign policy and to a standing visa relationship, threatening to break both) ·
  `FLASHPOINT` (secondary — an ultimatum with a dated deadline).
- **tectonic_taxonomy_candidate:** boundary_type candidate **CONVERGENT_SUBDUCTION** (a
  larger plate — the EU — forcing a smaller one under, reshaping the smaller state's
  sovereign policy space); surface_feature candidate **UNDERSEA_BANK** (the asset under
  contention is the passport / visa-access value itself — a submerged store of economic
  value that both sides are contesting control of). Pending taxonomy migration.
- **cross_links:** KC-DT-001, KC-DT-002, KC-DT-004

**Body (draft):**

Five Eastern Caribbean states — Antigua and Barbuda, Dominica, Grenada, Saint Kitts and
Nevis, and Saint Lucia — run citizenship-by-investment (CBI) programmes: an applicant
makes a qualifying investment or contribution and, after vetting, is granted citizenship
and a passport that carries visa-free access to the EU's Schengen Area. For some of these
states the programmes are a major share of government revenue (in 2023–24, on the EU's
own figures, roughly a third of GDP for Dominica and around 10–14% for Saint Kitts and
Nevis and Grenada).

On 25 June 2026, European Commissioner Magnus Brunner wrote to all five governments
requesting that they **phase out their CBI programmes entirely by 1 June 2028**, with a
24-month transition and interim tightening measures due by September 2026. The stated
consequence of non-compliance is **suspension of visa-free access to the Schengen Area**,
under the EU's visa suspension mechanism (Regulation (EU) 2018/1806), which was revised
with effect from 30 December 2025 to make operating a CBI programme a self-standing
ground for suspension.

As of drafting: no suspension has taken effect, no programme has closed, and existing
passports are unaffected. Several analysts describe the 2028 date as a negotiating
position rather than a settled closure date.

### The contested dimension — handled in prose (no `CONTESTED_DIMENSION` field exists yet)

This entry sets out **three distinct positions** and adjudicates none of them.

**Position 1 — the EU's stated rationale (security and vetting).** From the Commission's
own presentation to the Council's Visa Working Party (WK 9011/2025 INIT, 30 June 2025):
background vetting by CBI jurisdictions "does not provide sufficient guarantees"; virtual
interviews lack safeguards such as biometric verification; and CBI programmes let
visa-required third-country nationals "bypass migration & security risk assessment of
the Schengen visa procedure and may represent a threat to public policy or internal
security." This is the EU's position in its own words. The same document also states
that suspension "will not be automatic" and that "the economic importance of CBIPs and
the countries' external relations will remain key factors."

**Position 2 — the five governments' objection (economic sovereignty and the absence of
a replacement).** In a joint statement after a 10 July 2026 meeting in Roseau, the five
argued that CBI revenue is "an important pillar of economic resilience and development
financing for small island developing states" — funding climate resilience, disaster
recovery and infrastructure — and that any transition "must be accompanied by a
comprehensive framework that safeguards economic stability" and provides alternative
financing. They reject a unilateral phase-out without reciprocal EU support, and point
to their shared regional CBI regulator as evidence of ongoing reform. Antigua's Prime
Minister Gaston Browne: the government "will not be pressured into a unilateral phase-out
that would cause irreparable harm to the national economy," and no EU offer so far is
"quantified, binding, or explicitly framed as replacement revenues."

**Position 3 — the disputed reading: is there an unstated racial or double-standard
dimension?** The EU's own member-state CBI programme, Malta's, was struck down by the
European Court of Justice on 29 April 2025. Some external commentary frames the EU's
sustained pressure on small Caribbean states — whose CBI applicants are predominantly
wealthy non-Westerners — as reflecting a double standard, and part of that commentary
reads a racial or geopolitical hierarchy into the disparity of treatment. **WW does not
adjudicate this.** What can be stated factually: (a) the EU's stated basis is
exclusively security and vetting, not the origin or wealth of applicants; (b) the five
governments' own official response does **not** make a racial or discrimination
argument; (c) the double-standard-versus-Malta comparison is nonetheless a real and
openly-made line of argument in the surrounding debate. Whether an unstated motive
sits behind the stated one is **disputed, and not resolvable from the public record** —
naming that it is disputed, and why, is the complete and correct position here. This is
the same discipline WW applies to the Reconstruction/MAGA thesis and the plumber/nurse
occupational-risk material: name the positions, adjudicate none.

**Open questions:** whether the 2028 deadline holds or slips; whether the EU offers any
quantified replacement-revenue mechanism; whether any of the five actually closes a
programme; whether a suspension is ever triggered given the "not automatic" carve-out.

**Vetting notes:** Test 1 — EU primary document cited directly; letter sourced by date
and signatory. Test 2 — the rationale is primary; the deadline is corroborated across
IMI Daily, NOW Grenada, CNBC and Caribbean360. Test 3 — with the "Europe punishing the
Global South" framing removed, the residual facts are specific and survive: a dated
letter, a named legal mechanism, a stated consequence, a stated economic objection.
Test 4 — the entry engages the specific EU instrument and the specific government
responses; it does not villain-code "the EU" or "Europe," and it explicitly refuses to
resolve the motive question in either direction.

---

# PART C — Cross-linking and the Guyana entry

All four entries carry each other in `cross_links` (see each entry's field above). The
thematic through-line: a broad realignment in which African and Caribbean states are
trying to build economic weight together (Entries 1–2) at the same moment as external
powers — the EU (Entry 3), Venezuela and the US (Entry 4) — are applying leverage to
individual small states.

## Entry 4 — Guyana: maritime boundary, offshore oil, and the CARICOM–AU economic conversation

- **id:** KC-DT-004
- **status:** DRAFT — **and partial.** See the scoping note at the end: this covers the
  maritime/offshore-oil angle and Guyana's place in Entries 1–2. The fuller dedicated
  Guyana KC entry is scoped as its own follow-up task below, not silently dropped.
- **confidence:** `CORROBORATED` for the ICJ timeline, the force-majeure acreage, and
  Guyana's institutional position (multiple reliable outlets: Reuters/World Oil, OilNOW,
  Demerara Waves, CSIS) · the fuller diaspora-economy fact base is held (and
  independently verified as of 28 Aug 2026) in `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001`.
- **tectonic_tags:** `HOTSPOT` (primary — a concentrated offshore hydrocarbon province
  driving a sudden, localised economic and geopolitical upwelling) · `FLASHPOINT`
  (secondary — the Venezuela claim and the December 2023 annexation referendum).
- **tectonic_taxonomy_candidate:** surface_feature candidate **UNDERSEA_BANK** — this is
  the case the locked taxonomy already scopes under that label: the contested asset is
  the **offshore oil and the maritime space it sits in**, distinct from the Essequibo
  *land* dispute. Pending taxonomy migration.
- **cross_links:** KC-DT-001, KC-DT-002, KC-DT-003,
  `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001`, `WW-OPEN-INVESTIGATIONS`

**Body (draft):**

Guyana — the only English-speaking country in South America, a CARICOM member, and the
seat of the CARICOM Secretariat in Georgetown — has since 2015 become one of the
fastest-growing economies in the world on the back of the ExxonMobil-led Stabroek Block
oil discoveries offshore. Recoverable reserves in the block exceed 11 billion
oil-equivalent barrels; production passed 640,000 barrels per day in 2025.

**The maritime dimension of the Venezuela dispute (the "undersea bank" case).**
Venezuela's claim to the Essequibo region — about two-thirds of Guyana's land territory —
is longstanding, and it has pressed the claim harder since the Stabroek discoveries,
including a December 2023 referendum approving annexation. The part of this that is
specifically an *undersea* contest: much of the productive and prospective Stabroek
acreage lies in a maritime zone Caracas treats as an extension of its Essequibo claim.
Guyana has **held ExxonMobil back from exploring the north-western part of the block,
nearer Venezuela, under force majeure**, explicitly to avoid escalation, pending a
ruling from the International Court of Justice.

**The ICJ timeline (updated from the older KC-GUIANA entry).** The ICJ held oral
hearings on the merits of Guyana's case on the validity of the 1899 Arbitral Award in
**early May 2026**; a ruling is now expected in **early 2027** (the older entry's
"2027–2028" range has narrowed). ExxonMobil has publicly described the ICJ ruling as a
"critical trigger" for resuming work in the force-majeure acreage, and US officials have
said Washington would be willing to help negotiate the maritime boundary delimitation
*after* the ruling. So the oil timetable and the legal timetable are now explicitly
coupled.

**Guyana's position in the Entries 1–2 conversation.** Guyana is not a petitioner for a
seat at the table of Caribbean integration — it holds the institutional seat (the
CARICOM Secretariat). It was a strong mover behind CARICOM's July 2023 decision to
extend freedom of movement to all CARICOM nationals, a decision whose timing analysts
tie directly to Guyana's oil-driven labour demand. On reparations (Entry 2), President
Irfaan Ali has publicly called for UK reparations and Guyana maintains a national
reparations committee within the CARICOM framework. On the AfCFTA proposal (Entry 1),
Guyana is one of the CARICOM economies with the most to gain from a structured
Africa–Caribbean trade arrangement, having new export capacity and capital it did not
have a decade ago.

**Open questions (research-vessel format):**
- The ICJ merits ruling (expected early 2027) — not yet delivered; this entry must be
  revisited when it is.
- Whether a post-Maduro Venezuela (Delcy Rodríguez installed after the 3 January 2026 US
  capture of Maduro) de-escalates or whether state collapse becomes the larger border
  risk — carried in detail in `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001`, still open.
- Whether ExxonMobil's resumption of drilling near the maritime boundary *after* a
  favourable ruling itself becomes the next flashpoint.

### Scoping note — the fuller dedicated Guyana KC entry (follow-up task, not done here)

CJ has flagged, more than once, that Guyana — CJ's own family's country — lacks a
dedicated general KC entry despite full fact-checking sessions on South Africa and the
Sahel. Two things are now true at once:

1. There **is** substantial Guyana material in the repo:
   `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001` (the oil boom as a diaspora-economy
   inversion, the three Guianas, the Windrush-testimony scoping note) — though that file
   is currently **untracked and never committed** (see `WW-OUTSTANDING-TASKS.md`).
2. There is still **no single, general "Guyana" KC entry** that a member would find as
   the country's home page in the archive — covering its history, its political economy,
   the diaspora, and the current moment in one place.

Entry 4 above deliberately does **not** try to be that entry — it would either duplicate
`KC-GUIANA-SHIELD` or balloon past the scope of this task. The fuller entry is scoped as
its own follow-up task and logged in `WW-OUTSTANDING-TASKS.md`. What it would need:
a decision on how it relates to `KC-GUIANA-SHIELD` (parent entry with that as a
sub-investigation? merge?), the Windrush-testimony dependency (a Judith/CJ call, per
that file), and CJ's own family knowledge as a possible primary-source thread handled
under the safeguarding rules for personal testimony.

---

# PART D — Report summary (per entry)

| Entry | Verified against primary/reliable source | Confidence | What stays UNVERIFIED / open | Tectonic candidate note |
|---|---|---|---|---|
| **1 — Ghana/AfCFTA** | Mahama's pledge, verbatim quotes, date (3 Aug 2026), setting (Kingston press briefing) — *Graphic Online*, GBC Ghana, *Jamaica Gleaner*, multi-source | CORROBORATED (the pledge) / UNVERIFIED (any enacted policy) | No proposal tabled; no working group; chairmanship not yet held; legal form undefined | DIVERGENT boundary / DIASPORA_FLOW force |
| **2 — Reparations framework** | Existence, adopting bodies (AU + CARICOM Reparations Commission), Accra 17–19 Jun 2026, thematic demands, **no enforcement mechanism**, no named debtor states — AP, Al Jazeera, AU channels | CORROBORATED (shape + status) / SINGLE_SOURCE (the exact "19 points" as worded) | The enumerated primary text; any committed fund contributor; UNGA outcome | CONVERGENT_COLLISION or TRANSFORM — **decide once the real mechanism is confirmed**; TRANSFORM fits present evidence |
| **3 — EU CBI ultimatum** | EU's stated rationale — **EU primary document** WK 9011/2025 INIT (30 Jun 2025); deadline 1 Jun 2028, 24-month transition, visa-suspension consequence — Brunner letter (25 Jun 2026) as reported by IMI Daily, NOW Grenada, CNBC, Caribbean360 | CONFIRMED (rationale) / CORROBORATED (deadline + consequence) | Letter text not directly read; whether deadline holds; whether suspension ever triggered (the "not automatic" carve-out); **the racial-motive reading is a contested dimension, not adjudicated** | CONVERGENT_SUBDUCTION boundary / UNDERSEA_BANK surface feature |
| **4 — Guyana (partial)** | ICJ oral hearings May 2026, ruling expected early 2027, force-majeure acreage, Guyana's CARICOM seat and 2023 free-movement role — Reuters/World Oil, OilNOW, Demerara Waves, CSIS; fuller base in KC-GUIANA-SHIELD | CORROBORATED | ICJ ruling not delivered; post-Maduro trajectory; whether post-ruling drilling becomes the next flashpoint; **the fuller dedicated Guyana entry is scoped as a follow-up, not done** | UNDERSEA_BANK surface feature |

**Definition-of-done check:**
- [x] Part A verification completed for all three source claims against primary/reliable
  sources (not the video). A.3 has a genuine EU primary document; A.1 and A.2 are
  corroborated across multiple independent reliable secondary sources, with the
  weaker sub-claims (any enacted AfCFTA policy; the exact "19 points" wording) explicitly
  graded down.
- [x] Three DRAFT-status KC entries created, each with an honest confidence grade.
- [x] Entry 3's contested dimension handled in prose — three positions named, none
  adjudicated.
- [x] All entries cross-linked to each other.
- [x] Guyana: partial entry drafted **and** the fuller entry explicitly scoped as a
  follow-up task (logged in `WW-OUTSTANDING-TASKS.md`).
- [x] Each entry carries a tectonic-taxonomy candidate note for re-tagging after the
  fuller taxonomy migration ships.
- [ ] **Not done / cannot be done here:** validation against the real V71/V72 schema —
  it is not in this repo (see the schema-reality note at the top). Logged as an open
  item.

---

# Sources

**A.1 — Ghana / AfCFTA**
- Graphic Online — "Mahama to push for Caribbean's inclusion in AfCFTA as AU chair":
  https://www.graphic.com.gh/news/general-news/mahama-to-push-for-caribbeans-inclusion-in-afcfta-as-au-chair.html
- Jamaica Gleaner — "Editorial | The value of Mahama's idea" (5 Aug 2026):
  https://jamaica-gleaner.com/article/commentary/20260805/editorial-value-mahamas-idea
- GBC Ghana — "President Mahama deepens Ghana-Jamaica ties … historic Parliament
  address": https://www.gbcghanaonline.com/general/mahama-jamaica-parliament/2026/
- Pulse Ghana — "Ghana's President Mahama pledges to champion Caribbean inclusion in
  AfCFTA as incoming AU Chair":
  https://www.pulse.com.gh/story/mahama-afcfta-caribbean-trade-expansion-2026080416193729169

**A.2 — Reparations framework**
- AP (via Fox News) — "African, Caribbean leaders call for payments, debt cancellation,
  formal apologies over slavery":
  https://www.foxnews.com/world/african-caribbean-leaders-call-payments-debt-cancellation-formal-apologies-over-slavery
- Al Jazeera — "Why Accra slavery reparatory justice meeting matters" (24 Jun 2026):
  https://www.aljazeera.com/news/2026/6/24/why-accra-slavery-reparatory-justice-meeting-matters
- African Union — "African Union and CARICOM Reparations Mechanisms Hold First Joint
  Meeting Operationalizing a Joint Mechanism on Reparative Justice" (17 Jun 2026):
  https://au.int/en/pressreleases/20260617/african-union-and-caricom-reparations-mechanisms1-hold-first-joint-meeting
- African Union — "Accra Proclamation on Reparations" (2023):
  https://au.int/en/decisions/accra-proclamation-reparations
- GBC Ghana — "World leaders to meet in Accra to chart post-UN reparations agenda, June
  17-19": https://www.gbcghanaonline.com/general/world-leaders-to-meet-in-accra-to-chart-post-un-reparations-agenda-june-17/2026/
- CARICOM — "CARICOM Leaders Strengthen Reparations Agenda":
  https://caricom.org/caricom-leaders-strengthen-reparations-agenda/

**A.3 — EU CBI**
- Council of the EU — meeting document WK 9011/2025 INIT (30 Jun 2025), Commission DG
  HOME presentation "Citizenship by investment programs (CBIPs)" to the Visa Working
  Party: https://data.consilium.europa.eu/doc/document/WK-9011-2025-INIT/en/pdf
- IMI Daily — "End CBI by June 2028 or Risk Schengen Access: EU Writes to Caribbean
  States, Antigua Says":
  https://www.imidaily.com/caribbean/end-cbi-by-june-2028-or-risk-schengen-access-eu-writes-to-caribbean-states-antigua-says/
- IMI Daily — "Caribbean CBI States Submit Joint Response to EU 'Phase-Out' Demand":
  https://www.imidaily.com/caribbean/caribbean-cbi-states-submit-joint-response-to-eu-phase-out-demand/
- NOW Grenada — "End CBI by June 2028 or risk Schengen access: EU writes to Caribbean
  States": https://nowgrenada.com/2026/07/end-cbi-by-june-2028-or-risk-schengen-access-eu-writes-to-caribbean-states/
- CNBC — "EU urges Caribbean nations to shut down golden passport programs or face
  travel restrictions" (6 Aug 2026):
  https://www.cnbc.com/2026/08/06/-eu-cracks-down-on-caribbean-golden-passport-programs-with-visa-threat.html
- Business Standard — "EU bans Malta's golden passport scheme" (ECJ ruling, C-181/23,
  29 Apr 2025): https://www.business-standard.com/immigration/eu-bans-malta-s-golden-passport-scheme-what-s-next-for-rich-investors-125050100588_1.html

**Entry 4 — Guyana**
- World Oil — "Offshore oil dispute drives Venezuela-Guyana case at International Court"
  (10 May 2026): https://www.worldoil.com/news/2026/5/10/offshore-oil-dispute-drives-venezuela-guyana-case-at-international-court/
- OilNOW — "ExxonMobil flags ICJ ruling as key trigger for work in Guyana's force
  majeure acreage": https://oilnow.gy/featured/exxonmobil-flags-icj-ruling-as-key-trigger-for-work-in-guyanas-force-majeure-acreage/
- Demerara Waves — "Guyana tells ExxonMobil no exploration near Venezuela until World
  Court border ruling" (20 Feb 2026):
  https://demerarawaves.com/2026/02/20/guyana-tells-exxon-mobil-no-exploration-in-area-nearer-venezuela-until-world-court-ruling/
- Demerara Waves — "US ready to help settle Guyana-Venezuela maritime boundary after ICJ
  ruling" (30 Mar 2026): https://demerarawaves.com/2026/03/30/us-ready-to-help-settle-guyana-venezuela-maritime-boundary-after-icj-ruling/
- CSIS — "What Is the Significance of Venezuela's Naval Incursion into Guyana?":
  https://www.csis.org/analysis/what-significance-venezuelas-naval-incursion-guyana
- (Diaspora-economy fact base and its own sources: `docs/research/KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001.md`)

---

# Changelog

- **9 Sept 2026 (Claude Code)** — File created. Part A verification run against
  primary/reliable sources for all three video-sourced claims; the YouTube compilation
  was not used as evidence. Entries 1–3 drafted as DRAFT-status KC entries; Entry 4
  (Guyana, partial) drafted with the fuller dedicated entry scoped as a follow-up.
  Schema-reality gap recorded: the V71/V72 KC schema, the six-value `tectonic_tags`
  enum's authoritative definition, the `CONTESTED_DIMENSION` field, and the "live tier"
  concept are all external to this repo and could not be validated against. Cross-links
  set among all four entries and to `KC-GUIANA-SHIELD-DIASPORIC-ECONOMY-001`. Open items
  logged in `docs/WW-OUTSTANDING-TASKS.md`.
