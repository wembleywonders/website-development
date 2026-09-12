# STEMgeneers Audit — 2026-08-22/23

Verified against live files (routing, imports, store wiring) before any redesign work. No fixes implemented — report only, per standing instruction not to build on scoped-but-unapproved findings. Three rounds recorded here: page/sandbox file audit, "nexus-gate" tool claim, "Workshop ROV suite" claim.

## 1. Page & sandbox — file paths, wiring, props

Routing in `src/App.tsx` confirms exactly three live STEMgeneers route components.

### `STEMgeneersPage` — the page

- **File**: `src/pages/programmes/stemgeneers/index.tsx` (420 lines). Routed at `/programmes/stemgeneers` and `/pathways/stemgeneers`. No duplicate of this file exists.
- **Backend wiring**: none. No `fetch`/`axios`/API calls, no store import. Pulls static content from `MODULES`, `SESSION_PLANS`, `PROGRESSION_LEVELS` in `./curriculum/curriculumData.ts`. Pure content page — nothing dynamic to stub.
- **Props**: none. `export default STEMgeneersPage;` takes zero props, mounted as `<STEMgeneersPage />`.

### `STEMgeneerssandbox` — the sandbox

- **File**: `src/pages/programmes/stemgeneers/sandbox.tsx` (920 lines). Routed at `/programmes/stemgeneers/sandbox` **and** `/programmes/stemgeneers/prototype-lab` (both paths render this same file — the `/prototype-lab` URL is a naming trap; it does not render `PrototypeLab.tsx`).
- **Stray/unreachable duplicates found nearby** (zero importers anywhere in `src/`, confirmed by grep):
  - `src/pages/programmes/stemgeneers/PrototypeLab.tsx` (1,672 lines) — only reference anywhere is a code comment in `DevelopmentWitnessForm.tsx` saying it was "modelled on" this file.
  - `src/components/sandboxes/stemgeneers/TechnicalBuilder.tsx` (1,757 lines) — zero references anywhere. Fully orphaned.
  - `src/pages/programmes/stemgeneers/EcosystemExplorer.tsx` (622 lines) — exported component taking an `onClose` prop, but zero real importers. (One grep hit on the string is a false positive: `suggestEcosystemExplorer`, an unrelated boolean prop name on a Pathfinder ROV type.)
  - Combined: **~4,050 lines of dead STEMgeneers code** alongside the three live files — same duplicate-directory pattern CLAUDE.md already flags for `accreditation/` vs `accreditation-full/`.
- **Backend wiring**: real, verified. Imports `useJournalStore`, `useGateRequirements`, `useSTEMgeneersStats` from `src/stores/journalStore` (lines 26-29), and the diagnostic scorer's calls into the store are present in the actual code, not just claimed in the file's own revision-log comment.
- **Props**: none. `const STEMgeneerssandbox: React.FC = () => {...}`, mounted as `<STEMgeneersSandbox />`. Internal state fields: `activeTab`, `selectedItems`, `householdFrequency`, `printFilter`, `members`, `monthlyContrib`, `diagPath`, `diagStartTime`, `variantSeed`, `physicsExplanation`, `sessionRecorded`, `sessionResult`.

### `STEMgeneersSession` — the session workspace

- **File**: `src/pages/programmes/stemgeneers/SessionSandbox.tsx` (940 lines). Routed at `/programmes/stemgeneers/session`.
- **Backend wiring — mixed, with an actual quoted stub**:
  - Line 126: `const [gatesPassed] = useState(0); // would come from journalStore` — hardcoded to 0, explicitly marked as not-yet-wired in the code itself.
  - `repoEntries` (Cultural Wisdom Repository submissions, line 371) and `prototypes` (Make workspace submissions, line 649) are both initialized `useState([])` with no store or API call writing them anywhere — submitted entries live only in local component state and are lost on navigation/refresh. No comment flags these two, but they are functionally the same as mock/non-persistent data.
- **Props**: top-level `const STEMgeneersSession: React.FC = () => {...}` takes zero props, mounted as `<STEMgeneersSession />`. Internal sub-components (`LearnWorkspace()`, `RepairWorkspace()`, `MakeWorkspace()`, `ProtectWorkspace()`, `SellWorkspace()`) take no external props either; they manage their own local state.

## 2. "STEMgeneers nexus-gate tool" — claim checked, does not exist

Searched the entire repo (code + all docs, case-insensitive) for `nexus-gate` / `nexusgate` / `nexus gate`. The term appears in exactly one place: `docs/WW-OUTSTANDING-TASKS.md`, lines 168-178, which names three specific nexus-gate tools, each tied to a specific programme:

- Manuscript Analysis ROV — **Pageturners**
- Audio Quality-Check ROV — **Trubble n Bass**
- Staging/Production-Readiness ROV — **Kaywana's Court**

STEMgeneers is not among them. No fourth nexus-gate tool is listed, designed, or referenced for STEMgeneers anywhere — not in that doc, not in any other `docs/` file, not as a component/file/directory name anywhere in `src/` (`find -iname "*nexus*"` across the repo returns zero hits).

The likely source of the confusion: STEMgeneers does have a real, wired **layer-gate system** inside `sandbox.tsx` — `useGateRequirements`, `useSTEMgeneersStats`, and `recalculateGate`/`DIAGNOSTIC_GATE` in `journalStore.ts` (confirmed genuinely wired, not a stub — see §1 above). But this is explicitly the *opposite* of a nexus-gate by the outstanding-tasks doc's own definition: the 21 Aug 2026 handoff doc states plainly that `recalculateGate`/`DIAGNOSTIC_GATE` are "STEMgeneers-repair-layer specific" — a single-programme progression gate, not a cross-programme nexus tool.

**Conclusion**: there is no "STEMgeneers nexus-gate tool" to classify as real or stub, because it was never designed, referenced, or built under that name for that programme. Recommend correcting wherever "past sessions" recorded this claim so it isn't tracked as an open stub to eventually build.

## 3. "Workshop ROV suite (Kofi/Don)" — claim checked, name and scope both wrong

**The name is wrong.** The string "Kofi/Don" appears in exactly one place in the codebase: a code comment in `src/stores/journalStore.ts` (line 48), listing tracking-hook labels ("Rosemary Weaver, Esi, Kofi/Don, Kumi, Anansewa") — shorthand in a comment, not a persona definition. There is no `Don` persona, ROV, or component anywhere in the repo; every other "Don" hit in the codebase is the English word "don't."

The actual shared-suite ROV across STEMgeneers/TECHreneurs/Scrap Cat is **Neville** (`src/systems/rovs/personalities/pathfinder/PathfinderROV.tsx`), documented in its own header as a merge of PathfinderROV + STEMSage + SmithROV. This matches CLAUDE.md's own already-corrected note that Neville is a real, live persona.

**The claimed scope is wrong.** Neville's file defines exactly four modes: `STEMGENEERS`, `TECHRENEURS`, `SCRAP CAT`, and `GENERAL` (navigation). G-Tech Casters is not one of them — confirmed by reading the full mode union type and all mode-branching logic in the file; no `gtech`/`g-tech` string appears anywhere in it.

**Nothing from the suite actually renders on the STEMgeneers page.** Checked the full import list of all three live route files (`index.tsx`, `sandbox.tsx`, `SessionSandbox.tsx`): none import `PathfinderROV`, `useNeville`, or anything from `pathfinder/`. Repo-wide, `<PathfinderROV />` is never mounted anywhere in the app — `App.tsx` has zero references to it. The only other places it's touched:

- Static decorative badges (`<span className="rovBadge">🧭 PathfinderROV</span>`) in `SimulatorsPage.tsx` and `YourJourneyPage.tsx` — labels, not the component.
- `services/maya/conversation/rovBridge.ts` and `rovInvoker.ts`, whose own comments read "This would connect to your actual PathfinderROV logic" and "For now, returning contextual guidance based on PathfinderROV's purpose" — Maya's routing layer has a placeholder stand-in for Neville, not a real call into the component.

**What exists in `SessionSandbox.tsx` is a text promise, not a wired feature.** The REPAIR stage copy states things like "Every completed log triggers a verification conversation with Neville" and "a Neville verification conversation" as a gate requirement — but since Neville isn't imported anywhere in that file, this describes a mechanism that doesn't exist in the rendered page. It's aspirational copy referencing an ROV with no wiring to trigger it.

**Conclusion**: there is no borrowed-vs-generic split to characterize for "the suite" on STEMgeneers, because none of it renders there at all. What is genuinely real and wired on the page is the separate `journalStore`-backed layer-gate system (§1) — a different mechanism that the UI copy conflates with the never-wired Neville conversation.

## Open items not yet actioned

- Dead-file removal (`PrototypeLab.tsx`, `EcosystemExplorer.tsx`, `TechnicalBuilder.tsx`) — scoped, not built.
- `SessionSandbox.tsx` persistence gaps (`gatesPassed` hardcoded to 0; `repoEntries`/`prototypes` non-persistent) — scoped, not built.
- Correcting the nexus-gate and Workshop-ROV-suite claims in `docs/WW-OUTSTANDING-TASKS.md` — not yet made.
- The `/prototype-lab` route naming trap (renders `sandbox.tsx`, not `PrototypeLab.tsx`) — flagged, not resolved.
