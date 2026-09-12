# Session handoff — Exhibition-Readiness Calendar, 3 Sep 2026

**Spec:** `docs/accreditation/WW-SPEC-EXHIBITION-READINESS-CALENDAR-001.md`
(filed this session).
**Branches:** `feat/exhibition-readiness-calendar` in **both** repos, each off
`master` (not stacked on the Cyberstore Phase 2 branch). Not pushed; the
backend repo has no remote.

## What it does

Generalises the nexus-gate readiness self-check pattern
(`src/rovs/nexus-gates/*ROV.tsx`) to four more programmes — **Scrap Cat,
STEMgeneers, TECHreneurs, Silk Stilettos** — for the "is this ready to be
shown in public" decision, and adds: on a clean pass the member can submit a
**structured calendar-entry draft** that a steward reviews before it becomes
anything. **No content generation** — structured fields only, no
description/blurb field, and `workingTitle` is guarded against obvious
marketing phrasing.

The three existing nexus-gate ROVs are **not touched**.

## Frontend — `feat/exhibition-readiness-calendar`

| File | |
|---|---|
| `src/rovs/exhibition-readiness/exhibitionReadinessConfig.ts` | **new** — the four programme checklists (`ExhibitionCriterion[]` each, same shape as `QualityCriterion`). Sourcing stated in-file: general professional practice, no locked rubric exists for these four. Also exports `readinessLaunchStyle` (shared inline button style for the sandboxes). |
| `src/rovs/exhibition-readiness/ExhibitionReadinessGate.tsx` (+ `.css`) | **new** — one component, `programmeSlug` prop. Reuses `StagingReadinessROV`'s interaction model exactly (meets/needs-work per criterion, member note, `readyToAdvance = allChecked && needsWorkCount === 0`, attempt log = snapshot not approval, **no Approve/Certify**). On a clean pass reveals a structured draft form → `submitCalendarEntryDraft`. Shares the nexus-gate CSS (`../nexus-gates/AudioQualityCheckROV.css`). |
| `src/services/calendarEntryDraftsApi.ts` | **new** — client for `/api/calendar/entry-drafts`. |
| `src/pages/admin/ExhibitionReadinessReviewPage.tsx` (+ `.module.css`) | **new** — routed `/admin/exhibition-readiness`. Frontend gate `user.role === 'ADMIN' \|\| 'MODERATOR'` (UX only; backend enforces `ORGANIZER`/`ADMIN`). Lists drafts, shows the checklist snapshot, Approve / Return-with-note. Approval does **not** create a calendar event. |
| `src/App.tsx` | +2 lines only (import + route). The rest of App.tsx's uncommitted diff is prior-session route plumbing — **not** in this commit (staged via `git apply --cached` of just the two lines). |
| 4 sandboxes (`scrap-cat/ScrapCatSandbox.tsx`, `stemgeneers/sandbox.tsx`, `techreneurs/TECHreneursSandbox.tsx`, `silk-stilettos/sandbox.tsx`) | each: one import, one `showReadinessGate` state (TECHreneurs: an `'exhibition-readiness'` `ActivityType`), an early-return rendering the gate, and one launch button in the header. Following `KaywanasCourtSandbox.tsx`'s `activeTool` pattern. All four sandbox diffs are 100% this session's. |

## Backend — `feat/exhibition-readiness-calendar` (off master)

- `V70__Create_calendar_entry_drafts_table.sql` — `calendar_entry_drafts`
  (structured columns only, no description field; `status` PENDING_REVIEW →
  APPROVED / RETURNED; `checklist_snapshot` TEXT holding a JSON array).
  **Assumes V69 (Cyberstore Phase 2) lands alongside** — see the migration's
  own note; if V70 applies before V69 exists, Flyway needs `outOfOrder=true`
  when V69 arrives.
- `CalendarEntryDraft` entity, `CalendarEntryDraftRepository`,
  `CreateCalendarEntryDraftRequest` / `ReviewCalendarEntryDraftRequest` /
  `CalendarEntryDraftResponse` DTOs, `CalendarEntryDraftService(+Impl)`,
  `CalendarEntryDraftController` (`/api/calendar/entry-drafts`).
- The service **re-checks** every checklist entry is `meets-criterion`
  before accepting a draft (the gate's UI guard is not the only enforcement),
  validates the date window and the format enum, and a draft can only be
  reviewed once — **no path to APPROVED that skips a named human.**
- `SecurityConfig`: `POST` and `GET /mine` → MEMBER+; the review queue,
  `GET /{id}`, `POST /{id}/decision` → `ORGANIZER` / `ADMIN`.
- `CalendarEntryDraftServiceImplTest` — 7 unit tests
  (`./mvnw test -Dtest=CalendarEntryDraftServiceImplTest` green).

**Prior-session ILP work in the backend repo:** as with the Cyberstore
branch, the backend working tree carries a large body of uncommitted
prior-session ILP (V49) work. This branch was taken off `master` and the ILP
work restored to the working tree unchanged; the commit was staged
file-by-file. Do not `git add -A` there. (The `/api/ilp/**` `SecurityConfig`
matcher sits in the working tree above this session's calendar matchers but
is **not** in this commit.)

## Verification

- Frontend: `npx tsc --noEmit -p tsconfig.json` — **166** errors (one *fewer*
  than the 167 baseline: a pre-existing missing-`pageStrapline` error in
  `silk-stilettos/sandbox.tsx` was fixed in passing). 0 new. `npm run build`
  green.
- Backend: `./mvnw compile` green; the 7 service unit tests green.
- **Not run** (needs backend + DB): the live click-through — open each of the
  four sandboxes → launch the gate → mark all criteria met → draft form
  appears → submit → draft on `/admin/exhibition-readiness` → Approve → status
  flips. The headless browser harness would not mount the SPA (pre-existing).

## Deferred (in the spec's "Open / deferred")

- Re-ground the four checklists in a locked accreditation rubric if one is
  written.
- Fold the three existing nexus-gate ROVs onto `ExhibitionReadinessGate`.
- Wire APPROVED drafts into a real calendar surface
  (`CommunityCalendarPage` / backend `Event`).
- Replace the `workingTitle` marketing-phrase denylist with a real content
  policy check (waits on the design-system decision).
