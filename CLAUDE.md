# Wembley Wonders — Standing Project Rules

These apply to every Claude Code session in this repo, automatically —
no need to restate them. They're distilled from real failures found and
fixed across the 20-21 Aug 2026 sessions (full detail in
docs/accreditation/WW-SESSION-HANDOFF-2026-08-20.md and -21.md).

## What Wembley Wonders actually is

Read this before treating any finding as a detour from "the real work."
CJ's own framing (21 Aug 2026): "Wembley Wonders was designed as a research
vessel, not just an archive and academy."

WW doesn't just train, teach, and record — it does real research, and
that's rare for a CIC. Most Community Interest Companies are service-
delivery organisations working from already-settled material. WW produces
original findings as part of what it is. When you verify a claim, trace
whether something's actually reachable, or correct an earlier assumption,
that is not overhead standing between you and the "real" deliverable — it
IS a deliverable, on the same footing as a built feature or a locked
curator entry. This is why the "provided ≠ verified" discipline below
exists — it isn't process for its own sake, it's downstream of what this
organisation actually does.

A session that finds and corrects a false claim (the TNB-2.4 "platform-
wide" error; the ROVRegistry.ts reachability correction; a curator
reassigned after research showed the wrong home) has done real work, even
if nothing got built. Don't apologise for a session that produced a
correction instead of a feature — report it with the same weight.

Some content is allowed to exist as an honestly-labelled open
investigation — not everything has to resolve before it's real. If
research turns up a genuine lead with an uncorroborated claim or an
unresolved fit (see: the Gaspar Yanga thread, 21 Aug 2026 — a real figure,
one single-sourced claim not yet corroborated, one still-open question
about which programme he actually belongs to), the right move is to report
that shape plainly — what's confirmed, what's uncorroborated, what's still
open — not to either force a false resolution or quietly drop it.
"Genuinely unclear" is a legitimate, complete answer, not a failure to
finish. Full principle and the product implication it raises — an "active
investigation" content status members might actually see, not yet
designed — is recorded in docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md.
The live, working instance of it — actual research threads currently held
open rather than forced to resolution, e.g. Gaspar Yanga — is tracked in
docs/research/WW-OPEN-INVESTIGATIONS.md; check it before asserting a
figure's status is settled.

Practical effect on how sessions get reported to CJ: a session's value
isn't measured only by what got built or locked. State plainly what was
verified, what was corrected, and what's still open — and treat "found a
real problem with an earlier claim" as the session doing its job, not as a
session that ran into trouble.

## Core discipline

1. **A claim that something "exists" or is "verified" in a doc is not
   itself verification.** Check the actual file/code before trusting a
   prior session's claim, especially anything phrased as "the platform's
   existing X" — this exact phrasing was found false once already
   (TNB-2.4's "peer-witness requirement" claim, 21 Aug 2026).
2. **Directory-structure comparison does not prove content is identical.**
   `find -maxdepth N` matching between two locations does not mean their
   files match — confirmed wrong once already (accreditation/ vs
   accreditation-full/, 20 Aug 2026: identical structure, genuinely
   different content in progression-map.ts).
3. **Never run bare `npx tsc`.** Local `node_modules/@types/node` is
   incomplete in this repo — an unscoped run walks up to a parent
   directory and produces 1000+ false-positive errors. Use
   `npx tsc --noEmit -p tsconfig.json` for a real full-project baseline
   (compare against ~403 known pre-existing errors, not zero), or
   `--skipLibCheck` scoped to specific files.
4. **Before writing lesson/content files that reference a platform
   mechanism, confirm the mechanism is real and reachable** — infrastructure
   existing (a type + store action) is not the same as integration existing
   (a page a member can actually use). State which one you mean explicitly.
5. **When a fix is scoped but not yet approved, don't implement it.**
   Present the scope, wait for explicit go-ahead, same as the
   DevelopmentEvidence mentorship-log fix (scoped 21 Aug, built only after
   "implement the fix" was said explicitly).
6. **Update docs to match reality the moment reality changes** — a handoff
   doc that still says "OPEN TASK" for something just implemented is itself
   a new instance of the exact drift this whole discipline exists to catch.
7. **Before stating or changing any Child-to-programme mapping, check
   `docs/research/WW-CANONICAL-ROSTER.md` first.** It is the single source
   of truth for the 12 Children of Anansi and their programme mapping,
   established 22 Aug 2026 after four independently-authoritative-claiming
   sources (two old chat mappings, the outstanding-tasks tracker, and a
   same-session code edit) produced the Ntikuma/G-Tech Casters conflict. If
   another source (old chat history, a code comment, a different doc)
   disagrees with it, that's a discrepancy to flag and resolve into that
   file, not a second valid answer to act on independently.

## Repo structure notes

- Real accreditation documentation lives at root-level `accreditation/programmes/<name>/`
  — NOT `src/accreditation/` (which holds only badge-system/, apprenticeship-pathways/,
  ocn-qualifications/, no programmes/ subdirectory).
- `accreditation-full/` exists alongside `accreditation/` — confirmed NOT a pure
  duplicate as of 20 Aug 2026; check both before assuming which is current.
- Curator course content lives at `docs/curator-content/<programme>/`.
- Before any curator or content research on a programme, read
  `docs/research/WW-RESEARCH-ELEMENT-BY-PROGRAMME.md` — the per-programme
  "what died, what survived, how" research lens referenced in the "What
  Wembley Wonders actually is" section above. It marks each programme
  DEMONSTRATED, OPEN, or PROPOSED — don't assume a research lens exists for
  a PROPOSED programme just because one exists for others.
- Session handoff docs live at `docs/accreditation/WW-SESSION-HANDOFF-*.md` —
  read the most recent one at the start of any session touching accreditation,
  curator content, or the badge/progression system.
- The 12 Children of Anansi (children.ts/newChildren.ts) are the canonical
  identity/routing system. **Correction, 21 Aug 2026:** this line used to
  say the ROV_FAMILY_ALIASES legacy names (Solomon/Neville/Maxine/Esther/
  Tariq) were "retired 15 Aug 2026" — that was wrong, and its own presence
  here is a live example of the discipline above. `PathfinderROV.tsx`
  ("Neville," STEMgeneers/TECHreneurs/Scrap Cat) is a separate, legitimate,
  functional technical-coaching persona — confirmed live, not retired, do
  not revert or rename it. `src/services/rovs/ROVRegistry.ts`'s Solomon/
  Neville/Maxine/Esther/Tariq are real personas but confirmed unreachable
  from any live route as of 21 Aug 2026 — origin and fate still genuinely
  open (possibly an abandoned earlier naming-diversity attempt, not
  established), not simply "retired." Check
  docs/WW-OUTSTANDING-TASKS.md's ROV naming collision entry (corrected
  twice this session) for the current state before asserting anything
  about ROV naming — do not restate "retired" again without re-checking.

## Available command

`/audit-sync` — full consistency audit (duplication, stray files, the
programme-architecture mesh, scoped TypeScript check, doc-vs-code claim
verification). Report-first, fix-on-confirmation. Run this periodically,
not just when something looks broken — several of the findings above were
only caught because someone happened to look, not because anything was
visibly failing.
