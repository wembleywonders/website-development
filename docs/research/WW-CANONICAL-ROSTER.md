# WW Canonical Roster — The 12 Children of Anansi

**Supersedes:** this file is now the single source of truth for Child-to-
programme mapping. It replaces, as independently authoritative sources, the
two old chat-derived roster mappings and the programme-mapping table
embedded in `docs/WW-OUTSTANDING-TASKS.md`'s "ROV naming collision" entry.
Those remain useful history — the outstanding-tasks entry in particular
documents *how* the current mapping was arrived at, including two wrong
guesses along the way — but none of them is a second valid answer to act on
independently going forward. If any source (old chat history, a code
comment, a different doc) disagrees with this file, that is a discrepancy to
flag and resolve **into** this file, not a second answer to choose between.

This is the root-cause fix for the 22 Aug 2026 Ntikuma/G-Tech Casters
conflict: four sources (two old chat mappings, the outstanding-tasks
tracker, and a same-session code edit) each independently claimed to be
authoritative, with no designated source any of them deferred to. Before
stating or changing any Child-to-programme mapping, check this file first.

Source of truth for the fields below: `src/rov/personalities/children.ts`
(8 Children) and `src/rov/personalities/newChildren.ts` (4 Children),
merged in `src/rov/index.ts` as `COMPLETE_CHILDREN_REGISTRY` /
`CHILD_BY_PROGRAMME`. Confirmed directly against that code on 22 Aug 2026,
not copied from a prior doc.

## The Makers (5)

| Child | Title | Domain | Confirmed programme |
|---|---|---|---|
| Anansewa | The Performer | Theatre, Performance & Embodied Expression | Kaywana's Court |
| Kofi | The Builder | Making, Prototyping & Engineering | STEMgeneers (+ Scrap Cat, same domain) |
| Afua | The Storyteller | Voice, Oral Tradition & Audio Drama | Rayd-yo (+ Easy Street, Trubble n Bass) |
| Adaeze | The Stylist | Fashion, Design & Visual Identity | Silk Stilettos |
| Kumi | The Gamer | Systems, Play & Edge Discovery | TECHreneurs (+ Casting Table, Money Reset — see Open items) |

## The Keepers (4)

| Child | Title | Domain | Confirmed programme |
|---|---|---|---|
| Kweku | The Questioner | Truth, Verification & Editorial Rigour | Pageturners |
| Yaw | The Chronicler | Continuity, Record & Long Memory | See Open items — not currently in `ChildByProgramme` |
| Esi | The Keeper | Heritage Preservation & Cultural Memory | Knowledge Commons (+ Auntie Anansi's Kitchen, Roots — see Open items) |
| Ntikuma | The Watcher | Witness, Documentation & Community Journalism | Joystick (owns) — see cross-programme coordinator entry below |

## The Community (3)

| Child | Title | Domain | Confirmed programme |
|---|---|---|---|
| Osei | The Councillor | Governance, Participation & Collective Action | Community Sessions (+ Covenant Score) |
| Akua | The Advocate | Rights, Navigation & Documentation | Whistleblower Framework (+ Rights, Advocacy) |
| Nyame | The Elder | Ethics, Collective Wisdom & Long Memory | Governance (+ Stewards' Council) |

## Ntikuma — cross-programme coordinator

Ntikuma is not shaped like the other 11 entries above. He owns Joystick
outright (his own file states `programme: 'Joystick'`, correctly present in
`ChildByProgramme`), but per CJ's direct account he *also* coordinates
broadcast for WW's own events across G-Tech Casters, Kaywana's Court,
Rayd-yo, and Joystick simultaneously, reporting to Maya's "conductor" role
("like a central orchestra unit, similar to the brass section"), via roles
described as "passionistas and connoisseurs." This is recorded in code as
`CoordinatorsByProgramme` (`src/rov/personalities/children.ts`) — a
relationship table distinct from `ChildByProgramme`'s "owns" semantics,
listing Ntikuma against `gtechcasters`, `kaywanas-court`, `rayd-yo`, and
`joystick`.

**Phase 3.2 update, 22 Aug 2026 — data shape upgraded, still not fully
wired.** CJ confirmed three design points: the passionista/connoisseur role
is per-person (a coordinator carries one standing role, not one determined
by which programme they're on); calendar tie-in extends the existing
`data/programmeSchedule.ts` rather than a separate schedule; and the
long-term platform goal is WW-owned broadcast infrastructure, not permanent
reliance on external platforms. `CoordinatorsByProgramme` was upgraded to
`ProgrammeCoordination: CoordinatorAssignment[]` (`src/rov/personalities/children.ts`)
— each entry now carries `child`, `programme`, and an optional `role`.
`role` is deliberately left unset for Ntikuma: CJ specified the mechanic,
not which role he holds, and guessing would repeat the exact failure this
whole plan exists to stop. `Session` in `programmeSchedule.ts` gained an
optional `coordinatedBy?: string[]`, populated on the 4 real existing
G-Tech Casters sessions.

**Known blocker, not yet resolved:** `data/programmeSchedule.ts`'s
`PROGRAMMES` array has no entry at all for `rayd-yo` or `joystick` — only
`gtechcasters` and `kaywanas-court` (which itself has zero scheduled
`Session`s yet) exist there. Calendar tie-in for those two of Ntikuma's four
coordinated programmes is blocked on that gap, which is independent of this
coordination work and wasn't invented data to paper over here.

What the coordination function actually does day-to-day beyond this data
shape (UI, workflow, what "passionista" vs. "connoisseur" concretely means
in practice) is still open — Phase 3.3 scoping, not started.

No code anywhere represents "passionistas and connoisseurs" as CJ describes
them. That exact phrase exists in the codebase only as an unrelated naming
collision — the Connoisseurs Club / Passionistas Fan Club, a community-
belonging concept, not the broadcast-coordination roles CJ means.

## Open items — genuinely unclear, not forced to an answer

- **Yaw claims `programme: 'Joystick'` in his own file, colliding with
  Ntikuma's identical claim** — but Yaw has no entry in `ChildByProgramme`
  at all; only Ntikuma is actually wired to `joystick`. Not resolved here.
  Whether this is a stale leftover in Yaw's file or a second, unbuilt
  routing intent is unknown — flagging, not guessing.
- **Money Reset → Kumi**, **Roots → Esi**, **Casting Table → Kumi**: each
  "not contradicted" by the Child's own file but not confirmed by it either
  — none of the three Children's own `programme` field names these. Esi's
  precedent (she already covered Knowledge Commons + Auntie Anansi's Kitchen
  before this reconciliation) is the closest thing to a supporting pattern.
  Left in `ChildByProgramme` pending an actual confirming source, matching
  the existing Bright Sparks precedent of leaving a genuinely open gap open
  rather than forcing an answer.
- **`/casting-table` route redirects to `/programmes/easy-street/sandbox`**,
  not to any TECHreneurs route — inconsistent with `ChildByProgramme`'s
  `'casting-table': Kumi` entry, which sits thematically next to
  `'techreneurs': Kumi`. Not traced further; flagging the mismatch between
  the routing table and the Child-mapping table.
- **G-Tech Casters (`gtechcasters`) has no owning Child** — intentionally
  left out of `ChildByProgramme` (see Ntikuma's coordinator entry above).
  It still has a fully standalone route tree in `App.tsx`
  (`/programmes/gtechcasters`, `/pathways/gtech-casters`, its own sandbox),
  independent of Kaywana's Court — CJ's internal fold-in is not reflected in
  routing. Confirmed 22 Aug 2026 Phase 2.1 check; not changed, per the
  phase's report-only instruction.
- **Bright Sparks** has no owning Child by design — cross-programme summer
  sampler, routes through Maya directly, not a routing gap.
- **Naming inconsistency**: `ChildByProgramme` uses the key
  `'aunties-kitchen'`; the live route slug is `/programmes/auntie-anansis-kitchen`.
  Not confirmed whether anything actually looks this table up by exact route
  slug (the one live consumer found, `rovPromptBuilder.ts`, iterates all
  entries rather than keying off a single route param) — flagging the
  mismatch, not asserting it breaks anything.

## Fix log (part of this file's own creation, 22 Aug 2026)

`'silk-stilettos': Anansewa` — previously in `children.ts`'s
`ChildByProgramme`, flagged at the time as "the weakest of these three,
unconfirmed" — was removed. Adaeze's own file (`newChildren.ts`: header
comment, block comment, and `programme` field) all independently state
`'Silk Stilettos'`, and `newChildren.ts`'s own `NewChildByProgramme` already
had `'silk-stilettos': Adaeze` correct. Because `rov/index.ts`'s merged
`CHILD_BY_PROGRAMME` spreads `NewChildByProgramme` after
`ORIGINAL_CHILD_BY_PROGRAMME` (later entries win), the actually-consumed
routing was already correct — only `children.ts`'s own stale copy was wrong
and misleading. No live routing bug existed; this was a documentation/data
hygiene fix, not a functional one.

## Changelog

- **22 Aug 2026** — file created (Phase 2.5 of the WW cleanup & structure
  plan). Removed stale `'silk-stilettos': Anansewa` from `children.ts`'s
  `ChildByProgramme` (see Fix log above). All other entries confirmed
  directly against `children.ts`/`newChildren.ts` as of this date, not
  copied from a prior doc.
- **22 Aug 2026** — Phase 3.2: `CoordinatorsByProgramme` upgraded to
  `ProgrammeCoordination: CoordinatorAssignment[]` with a per-person `role`
  field; `programmeSchedule.ts`'s `Session` gained `coordinatedBy?: string[]`
  and the 4 real G-Tech Casters sessions were tagged `['ntikuma']`. See
  Ntikuma's entry above for the blocker found (rayd-yo/joystick missing
  `Programme` entries in `programmeSchedule.ts`).
