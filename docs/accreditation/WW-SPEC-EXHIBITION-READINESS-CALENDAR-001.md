# WW-SPEC-EXHIBITION-READINESS-CALENDAR-001

**Exhibition-readiness gate → structured calendar-entry draft → human review**

Filed 3 Sep 2026 (Claude Code, at CJ's direction). Status: **built** —
frontend gate + config for four programmes, backend review queue, admin
review page. Branch `feat/exhibition-readiness-calendar` (both repos).

---

## 1. What this is

Three nexus-gate readiness self-checks already exist
(`src/rovs/nexus-gates/` — Pageturners, Trubble n Bass, Kaywana's Court,
built 23 Aug 2026). Each is a structured self-assessment: four criteria,
each with "what meets this" and a "common issue & fix", the member marks
each *meets* / *needs work*, and there is **no automated path to an
approved status** — that constraint is load-bearing and carries over here
unchanged.

This spec **generalises that pattern** to four more programmes, for a
different decision point — *is this work ready to be shown in public* — and
adds one capability on top: when the self-check passes cleanly (every
criterion met), the member can submit a **structured calendar-entry draft**
that a steward reviews before it becomes anything.

### Scope

- **In:** Scrap Cat, STEMgeneers, TECHreneurs, Silk Stilettos. One shared
  gate component + a per-programme checklist config. A structured draft
  form revealed only on a clean pass. A backend review queue
  (`PENDING_REVIEW → APPROVED / RETURNED`). An admin/steward review page.
- **Out:** the three existing nexus-gate ROVs are **not** touched (folding
  all seven onto the shared component is a later cleanup). Approval does
  **not** auto-create a live calendar event — a director does that by hand;
  wiring approved drafts into the calendar (`CommunityCalendarPage` /
  backend `Event`) is a documented follow-up.
- **Explicitly blocked — no content generation.** No marketing,
  promotional, blurb, or review copy is produced anywhere in this feature.
  The draft carries structured fields only; there is deliberately no
  free-text "description" field. `workingTitle` is a plain factual
  identifier, length-capped, and guarded against the most obvious
  marketing phrasing. Content generation stays blocked pending the
  design-system decision.

## 2. The four checklists

Each is four criteria in the same shape as the nexus-gate ones
(`whatGoodLooksLike`, `commonIssueAndFix`). **Sourcing, stated plainly as
the `StagingReadinessROV` header does:** none of these four programmes has
a locked accreditation rubric to draw from
(`accreditation/programmes/<slug>/` is stub or absent for all four). The
criteria are therefore **general professional exhibition/demo-day practice**
— real, standard concepts, not fabricated platform lore — and the config
file says so per programme. If a locked rubric is written later, the
criteria should be re-grounded in it.

| Programme | The moment it gates | Criteria (summarised) |
|---|---|---|
| **Silk Stilettos** | Before a showcase / lookbook / runway slot | pieces finished & fitted · documentation done (photos, provenance card) · display/rail plan · model or mannequin & styling confirmed · sizing & care info prepared |
| **Scrap Cat** | Before a repair-café / market stall / demo table | items repaired **and safety-checked** (electrical, sharp edges, stability) · before/after documentation · tools & consumables for a live demo · pricing or "not for sale" labelling · stall logistics |
| **STEMgeneers** | Before a prototype demo day / maker faire | prototype does its one core thing reliably on a stranger's first try · failure mode is safe · build log / BOM to hand · a 60-second spoken "what it does" ready (a spoken-demo readiness check, **not** written copy) · transport & power confirmed |
| **TECHreneurs** | Before a venture showcase / demo | the thing demoed actually runs · the ask is concrete and true · numbers shown are the member's real numbers with a source · IP / consent position clear for anything shown publicly · room / AV needs confirmed |

## 3. The calendar-entry draft (structured fields only)

Revealed by the gate **only** when `readyToAdvance` (every criterion met).

| Field | Type | Note |
|---|---|---|
| `programmeSlug` | fixed | from the gate |
| `submittedByUserId` | fixed | from the authenticated session |
| `workingTitle` | short text, ≤160 chars | plain factual identifier; placeholder e.g. "Silk Stilettos showcase — <your name>"; a marketing-phrase guard rejects the obvious cases |
| `proposedStart` / `proposedEnd` | date / optional date | a window, not a booking |
| `format` | enum | `in-person` / `online` / `hybrid` |
| `venueNote` | optional short text | a venue **name** only |
| `checklist` | array, auto-filled | `{ id, label, status, note }` per criterion — the snapshot at submission |
| `readinessConfirmedAt` | timestamp | set server-side |

The server re-checks that every checklist entry is `meets-criterion` before
accepting the draft — the gate's UI guard is not the only enforcement.

## 4. Review workflow

`PENDING_REVIEW` → steward (`ORGANIZER` / `ADMIN`) picks **APPROVED** or
**RETURNED** with an optional note. A draft can only be reviewed once. There
is **no path to APPROVED that does not pass through a named human** — same
principle as the nexus gates' no-auto-approve rule.

Approval marks the draft; it does not create a calendar event. A director
then creates the real event. (Follow-up: an "approved drafts" view feeding
`CommunityCalendarPage` / the backend `Event` model.)

## 5. Implementation

### Frontend (`wembley-clean-rebuild`)

- `src/rovs/exhibition-readiness/exhibitionReadinessConfig.ts` — the four
  programme configs (`ExhibitionCriterion[]` each).
- `src/rovs/exhibition-readiness/ExhibitionReadinessGate.tsx` (+ `.css`) —
  one component, `programmeSlug` prop. Reuses the `StagingReadinessROV`
  interaction model exactly (meets / needs-work per criterion, member note,
  `readyToAdvance = allChecked && needsWorkCount === 0`, attempt log as a
  snapshot never an approval, no Approve/Certify action). On a clean pass it
  reveals the structured draft form; submitting calls the API.
- `src/services/calendarEntryDraftsApi.ts` — client for
  `/api/calendar/entry-drafts`.
- `src/pages/admin/ExhibitionReadinessReviewPage.tsx` — routed at
  `/admin/exhibition-readiness` (gated on `user.role === 'ADMIN'`; the
  backend is the real gate at `ORGANIZER`/`ADMIN`). Lists `PENDING_REVIEW`
  drafts with the checklist snapshot; Approve / Return-with-note.
- Gate mounted in the four sandboxes
  (`/programmes/<slug>/sandbox`, following `KaywanasCourtSandbox.tsx`'s
  `activeTool` pattern).

### Backend (`~/projects/wembley-wonders/backend`)

- `V70__Create_calendar_entry_drafts_table.sql` (assumes V69 lands
  alongside — see the migration's own note).
- `CalendarEntryDraft` entity, `CalendarEntryDraftRepository`,
  `CreateCalendarEntryDraftRequest` / `ReviewCalendarEntryDraftRequest` /
  `CalendarEntryDraftResponse` DTOs, `CalendarEntryDraftService(+Impl)`,
  `CalendarEntryDraftController` (`/api/calendar/entry-drafts`).
- `SecurityConfig`: `POST` and `GET /mine` → MEMBER+; the review queue,
  `GET /{id}`, and `POST /{id}/decision` → `ORGANIZER` / `ADMIN`.
- `CalendarEntryDraftServiceImplTest` — 7 unit tests.

## 6. Open / deferred

- Re-ground the four checklists in a locked accreditation rubric if/when one
  is written for these programmes.
- Fold the three existing nexus-gate ROVs onto `ExhibitionReadinessGate`
  (or a shared parent) — deferred, lower priority, touches shipped code.
- Wire APPROVED drafts into a real calendar surface.
- The `workingTitle` marketing-phrase guard is a coarse denylist; a proper
  content policy check waits on the design-system decision.
