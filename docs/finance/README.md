# Transaction Data Extraction — Recurring Process

This is a repeatable, re-runnable check, not a one-off report. It exists to give Blake
(ACCA-qualified voluntary advisor) in-year visibility into whatever real Cyberstore/Pardner
transaction data exists on the platform, so a discrepancy has a chance of being caught in
month three or six — while it's still fixable in-period — rather than only surfacing a year
later at annual-accounts stage, when a fix becomes a prior-year restatement instead of a
same-year correction.

**What it produces is provisional supporting material only — never accounts, never a
disclosure, never anything filed.** Every run's output says so at the top of the report
itself. Claude Code has made no accounting judgement anywhere in this process; the script
extracts facts and their sources, nothing else.

## How to run it

```
npm run finance:extract
```

(equivalent to `node scripts/finance/extract-transaction-data.mjs` directly). No arguments,
no setup beyond a working Node install (this repo already requires one). It reads source
files in this repository only — it does not and cannot reach a live backend, database, or
API from here.

Each run:

1. Writes a dated markdown report to `docs/finance/reports/WW-TRANSACTION-EXTRACT-<date>.md`.
2. Compares this run's findings against the previous run's saved state
   (`docs/finance/reports/.state/latest.json`) and, if anything differs, adds a
   **"Changed since the last run"** section at the top of the report — flagged as "this
   changed, worth a look," never as a judgement on whether the change is a problem. That
   call belongs to Blake.
3. Overwrites `.state/latest.json` with this run's results, so the *next* run diffs against
   *this* one.

Running it twice on the same calendar day overwrites that day's report file (harmless — the
state file still updates correctly for the next real run).

## What it actually checks, and why the current state matters

This is a **frontend-only repository** — there is no backend, no database, and no server
process reachable from here (confirmed: no `.github/workflows/` CI exists, no server entry
point exists anywhere in this repo, and `node-cron` is a listed dependency with **zero
importers anywhere in `src/`** — present in `package.json`, wired to nothing). So there is
no transaction table this script can query, this run or any future run, until that changes.

What the script checks instead — and what makes it worth re-running rather than a single
static document — is the same set of source-code facts a human investigation confirmed by
hand on 23 Aug 2026: the `ATELIER_COMMISSION` settlement feature flag, whether each of the
four Cyberstore surfaces still returns mock/empty/simulated data or is still unrouted, and
whether the Pardner reserve snapshot is still a hardcoded placeholder. **The value of
re-running this monthly or quarterly is catching the moment any one of these flips from
stub to real** — that transition is exactly the kind of thing that's easy to miss if nobody
checks between year-ends, and is the earliest point at which a real transaction figure would
first become extractable at all.

If a check's expected marker (a comment, a function shape, a hardcoded literal) is gone but
nothing obviously replaced it with real data, the script does **not** guess either way — it
reports `*-CHECK-MANUALLY` or `CHANGED` and asks a human to look, rather than silently
assuming the change means "now real" or "still fake."

## When real backend data eventually exists

The checks in `extract-transaction-data.mjs` are written as small, independent, labelled
blocks (one per source file/fact) specifically so that whichever check first needs to
change — e.g. `CyberstoreStorefront listing data` once `fetchProductsMock()` becomes a real
`fetch()` call — can be extended to pull and total real figures, without needing to rebuild
the report/diff/state machinery around it. That machinery (report generation, prior-run
comparison, change flagging) is not throwaway scaffolding built for an all-empty first run;
it's the part meant to keep working once real numbers exist.

## Cadence and automation — status, not a recommendation

CJ has not specified a cadence (monthly vs. quarterly); this script does not assume one —
it's built to support being run on demand at minimum, which is what exists today: someone
(CJ, Blake, or whoever's asked) runs `npm run finance:extract` and reviews the output.

**True unattended scheduling is not realistic from this repository as it stands**, and that
should be stated plainly rather than implied to already work:

- There is no running server process in this repo for a cron-style scheduler to live in.
  `node-cron` is present in `package.json` but has never been wired to anything — adding a
  call to it here would not cause anything to run on a schedule unless a persistent Node
  process also existed somewhere to host it, which this static Vite frontend does not have.
- There is no CI configuration in this repository (`.github/workflows/` does not exist) that
  a scheduled job could be added to.
- **Realistic options if automation is wanted**, in order of least new infrastructure: (a) a
  GitHub Actions workflow with a `schedule:` cron trigger, added to this repo — the standard,
  low-effort way to run a script like this unattended on a hosted git repo, assuming this
  repo lives on GitHub with Actions available; (b) an external scheduler (a hosted cron
  service, or a scheduled task on whatever machine/server the platform eventually runs on)
  invoking `npm run finance:extract` and committing or emailing the result; (c) a calendar
  reminder for a person to run it manually on the agreed cadence — the lowest-effort option,
  and arguably sufficient given the underlying data won't change without a real backend
  existing first.

None of these has been set up. Setting one up is separate work from this task and hasn't
been done here — flagging the realistic options rather than picking one, since the cadence
and appetite for new CI infrastructure are calls for CJ, not something to assume.

## Files

- `scripts/finance/extract-transaction-data.mjs` — the script.
- `docs/finance/reports/WW-TRANSACTION-EXTRACT-<date>.md` — one report per run.
- `docs/finance/reports/.state/latest.json` — machine state used to diff the next run
  against; not meant for human reading, safe to delete if a clean baseline is ever wanted
  (the next run will just report "no prior run found" instead of a diff).
