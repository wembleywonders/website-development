# WW Self-Monitoring Principle

Companion to `WW-RESEARCH-VESSEL-PRINCIPLE.md`, but a distinct claim — that one is
about WW's identity as a producer of original research; this one is about WW's own
operational infrastructure actively watching itself for drift, rather than being a
static presentation layer someone has to manually check.

CJ's own framing (22 Aug 2026): *"I feel that we've got a live self-monitoring and
adjusting system that means we're freer to do the community engagement while the
website does the support work as opposed to just being brochureware."*

## The pattern

Confirmed real across three separate domains in one session, not planned as one thing
from the start:

1. Content gets a review-status/provenance layer (the KC lesson-module pilot) so
   corrections are tracked as data, not made silently and forgotten.
2. Programme structure gets a canonical source of truth (`WW-CANONICAL-ROSTER.md`,
   once built) so drift gets caught against one file instead of accumulating silently
   across contradictory sources — the exact failure mode that caused the Neville and
   Ntikuma confusion earlier the same session.
3. Financial data gets a recurring extract with change-flagging (the transaction-data
   tool for Blake) so a discrepancy surfaces in-year, not at the annual review when
   correcting it is already moot.

Three different problems — content accuracy, architectural consistency, financial
visibility — solved with the same underlying shape: don't just do the thing once,
build in a way to notice when it drifts from what it should be.

## Honest status — recorded plainly so this isn't overclaimed later

**As of 22 Aug 2026**, none of these three mechanisms was actually built and running
yet. All three were well-scoped — real instructions sent to Claude Code, real data
models and workflows specified — but "self-monitoring" described the design intent,
not the operating reality at that point. The foundational layer underneath all three
(Phase 1 cleanup, Phase 2's confirmed programme structure) hadn't even been confirmed
complete by Claude Code's own status check as of this note — the newer systems were
meant to sit on top of that ground, not be trusted independently of it.

## What would need to be true before this is genuinely operational

Each mechanism needs an actual track record, not just a build. A drift-flagging
system that has never yet caught a real discrepancy hasn't earned trust yet — it's
earned a test period. The same verify-before-trust discipline that shaped every other
decision this session should apply to the monitoring systems themselves before
attention meaningfully shifts away from manual checking and toward community
engagement on the strength of them.

---

## Update — 23 Aug 2026 (Claude Code)

Recorded because the "none of these three is built yet" line above is now stale on
its own terms, and this file's own discipline says to fix that the moment it's known,
not leave it standing as if still current. **The build status has moved; the "no
track record yet" conclusion has not** — those are different claims, and only the
first one has actually changed:

- **Mechanism 1 (KC lesson-module review-status layer)** — built.
  `src/knowledge-commons/lesson-modules/lessonModuleStore.ts` exists, typechecks
  clean under `--strict`. **Not yet wired into any live page or route** — no UI
  consumes it, no real lesson module has been deposited through it. It has caught
  zero real corrections because nothing has been run through it yet. Built, not
  running.
- **Mechanism 2 (`WW-CANONICAL-ROSTER.md`)** — built, and further along than the
  other two: it already functions as the live reference point other checks defer to
  (per `CLAUDE.md`'s standing rule to check it before stating any Child-to-programme
  mapping), and this session's own full-status-check work used it directly to confirm
  which of the original four mappings remain unreconciled. That is real use, but it
  is not yet the same as the file *itself* having caught a fresh piece of drift since
  its creation — its founding case (the Ntikuma/G-Tech Casters conflict) is the reason
  it exists, not a catch performed by the file once live. Closest of the three to
  "operational," not yet fully there by its own standard above.
- **Mechanism 3 (transaction-data tool for Blake)** — built and run once, producing a
  real baseline extract. Its change-detection logic was verified to work correctly
  (tested directly, by injecting a deliberately altered prior state and confirming the
  diff fired as expected), but it has not yet run a second time under real conditions,
  so it has not yet caught a real discrepancy either. Built, mechanically verified,
  not yet battle-tested.

**Net effect: two of the three mechanisms now exist as code where they didn't on 22
Aug; none of the three has yet done the one thing that would make "self-monitoring"
true as an operating claim rather than a design one — caught a real piece of drift
after being live.** The file's own closing standard from 22 Aug stands unchanged and
is repeated here deliberately rather than softened: attention should not meaningfully
shift toward trusting these systems until each has an actual track record, not just a
build.
