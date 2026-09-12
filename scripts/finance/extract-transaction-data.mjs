#!/usr/bin/env node
/**
 * extract-transaction-data.mjs
 *
 * Provisional transaction data extract for Blake (ACCA-qualified voluntary
 * advisor) — supporting material for future draft accounts work, NOT
 * accounts production. Re-run this on whatever cadence CJ/Blake decide
 * (monthly/quarterly/on demand) so Blake gets in-year visibility instead
 * of a single year-end snapshot. See docs/finance/README.md.
 *
 * WHAT THIS SCRIPT ACTUALLY DOES: this is a frontend-only repository with
 * no reachable backend or database, so there is no transaction table to
 * query. What "extraction" means here is a repeatable, scripted re-check
 * of the same source-code facts a human investigation confirmed by hand
 * on 23 Aug 2026 (feature-flag state, stub/mock status, dead-code
 * reachability) — the goal is to catch the MOMENT any of these flips from
 * stub to real, and to catch it in the same run that would otherwise just
 * report "still nothing," not a year later. If/when a real backend exists,
 * the checks below are exactly the places new "pull real totals" logic
 * needs to be added — this script's structure is built to extend, not to
 * be thrown away once real data exists.
 *
 * Every check is independent and wrapped so one missing/moved file cannot
 * crash the whole run — a missing file is itself a reportable finding
 * ("expected source moved or was deleted — investigate"), never silently
 * skipped.
 *
 * Run: node scripts/finance/extract-transaction-data.mjs
 *  (or: npm run finance:extract)
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const REPORTS_DIR = join(REPO_ROOT, 'docs', 'finance', 'reports');
const STATE_DIR = join(REPORTS_DIR, '.state');
const STATE_FILE = join(STATE_DIR, 'latest.json');

const runDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const runTimestamp = new Date().toISOString();

// ── helpers ────────────────────────────────────────────────────────────────

function readRepoFile(relPath) {
  const full = join(REPO_ROOT, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, 'utf8');
}

/**
 * Source comments in this codebase routinely wrap a sentence across
 * multiple `//` lines (e.g. "...real cart, order, or\n// checkout...").
 * A literal multi-word regex against raw file text misses those — collapse
 * comment markers and all whitespace runs to single spaces before running
 * any marker-detection regex, so a marker check only fails when the words
 * are genuinely gone, not because of where the source happened to wrap.
 */
function normalizeForMarkerSearch(content) {
  return content.replace(/\/\/\s?/g, ' ').replace(/\s+/g, ' ');
}

/** Recursively finds files under src/ whose content matches `pattern`, excluding `excludeDirPrefix`. */
function findImportersUnder(pattern, excludeDirPrefixes = []) {
  const srcRoot = join(REPO_ROOT, 'src');
  const hits = [];
  function walk(dir) {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      const rel = full.slice(srcRoot.length + 1).replace(/\\/g, '/');
      if (excludeDirPrefixes.some((p) => rel.startsWith(p))) continue;
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        walk(full);
      } else if (/\.(ts|tsx)$/.test(entry.name)) {
        let content;
        try {
          content = readFileSync(full, 'utf8');
        } catch {
          continue;
        }
        if (pattern.test(content)) hits.push('src/' + rel);
      }
    }
  }
  walk(srcRoot);
  return hits;
}

const findings = []; // { id, label, status, detail, source, caveat }

function record(id, label, status, detail, source, caveat = null) {
  findings.push({ id, label, status, detail, source, caveat });
}

// ── 1. Revenue model definitions + ATELIER_COMMISSION feature flag ──────────

{
  const path = 'src/blockchain/config/revenueModels.ts';
  const content = readRepoFile(path);
  if (content === null) {
    record('revenueModels', 'Revenue model source file', 'FILE-MOVED-OR-MISSING',
      `Expected file not found at ${path} — investigate before trusting any revenue-model figure below.`, path);
  } else {
    const flagMatch = content.match(/atelier\.commission\.settlement\.enabled\s*=\s*(true|false)/);
    const flagValue = flagMatch ? flagMatch[1] : null;

    record('atelierCommissionFlag', 'ATELIER_COMMISSION backend settlement flag',
      flagValue === 'false' ? 'OFF' : flagValue === 'true' ? 'ON' : 'UNKNOWN-MARKER-NOT-FOUND',
      flagValue === 'false'
        ? 'Confirmed off — directors’ decision, per the code’s own comment. Settlement not automated; no real ATELIER_COMMISSION transactions can exist while this is off.'
        : flagValue === 'true'
          ? 'Flag now reads ON — this is a change from the 23 Aug 2026 baseline (was OFF). Needs a human check: has real ATELIER_COMMISSION settlement actually started, and if so, where does that data now live?'
          : 'Could not find the atelier.commission.settlement.enabled marker comment at all — file may have been restructured. Cannot confirm flag state from this script; check manually.',
      `${path} (header comment)`);

    for (const [key, label] of [
      ['STANDARD', 'STANDARD split (config only, not a transaction total)'],
      ['ATELIER_COMMISSION', 'ATELIER_COMMISSION split (config only, not a transaction total)'],
      ['ATELIER_AUCTION', 'ATELIER_AUCTION split (config only, not a transaction total)'],
    ]) {
      // Anchored to the actual declaration ("export const KEY"), not just any
      // mention of the key's name — the header comment references
      // "ATELIER_COMMISSION / ATELIER_AUCTION" together before either's real
      // definition, so an unanchored search for "ATELIER_AUCTION" latched onto
      // ATELIER_COMMISSION's block first. Caught by checking this script's own
      // output before shipping it, not assumed correct.
      const re = new RegExp(`export const ${key}[^{]*\\{\\s*maker:\\s*(\\d+)[\\s\\S]*?platform:\\s*(\\d+)[\\s\\S]*?community:\\s*(\\d+)`);
      const m = content.match(re);
      record(`split-${key}`, label,
        m ? 'CONFIG-CONFIRMED' : 'NOT-FOUND',
        m ? `maker ${m[1]}% / platform ${m[2]}% / community ${m[3]}%` : 'Could not extract this split’s percentages — file structure may have changed.',
        `${path}`);
    }
  }
}

// ── 2. CommunityShopPage.tsx — the one live-routed storefront ──────────────

{
  const path = 'src/pages/CommunityShopPage.tsx';
  const content = readRepoFile(path);
  if (content === null) {
    record('communityShopPage', 'CommunityShopPage.tsx', 'FILE-MOVED-OR-MISSING',
      `Expected file not found at ${path}.`, path);
  } else {
    const honestyMarker = /does NOT create a real cart, order, or checkout/.test(normalizeForMarkerSearch(content));
    record('communityShopPageCart', 'CommunityShopPage cart/checkout reality',
      honestyMarker ? 'CONFIRMED-NOT-REAL' : 'MARKER-NOT-FOUND-CHECK-MANUALLY',
      honestyMarker
        ? 'Page’s own comment still confirms: "Add to basket" is local UI state only, no persistence, no real cart/order/checkout, no backend connection.'
        : 'The honesty-comment this script checks for is gone — could mean the page was rewritten to have a real cart, or the comment was just edited. Needs a human read of the current file, not an assumption either way.',
      `${path} (header comment)`);
  }
}

const appTsx = readRepoFile('src/App.tsx') ?? '';
record('communityShopPageRouting', 'CommunityShopPage routing',
  /path="\/shop"[\s\S]{0,40}CommunityShopPage|path="\/cyberstore"[\s\S]{0,40}CommunityShopPage/.test(appTsx)
    ? 'ROUTED-LIVE' : 'ROUTING-NOT-FOUND-CHECK-MANUALLY',
  /path="\/shop"/.test(appTsx) && /path="\/cyberstore"/.test(appTsx)
    ? 'Routed at both /shop and /cyberstore in src/App.tsx.'
    : 'Could not confirm the expected /shop or /cyberstore route — check src/App.tsx directly.',
  'src/App.tsx');

// ── 3. CyberstoreStorefront.tsx — unrouted per 23 Aug investigation ────────

{
  const path = 'src/studio/CyberstoreStorefront.tsx';
  const content = readRepoFile(path);
  if (content === null) {
    record('cyberstoreStorefront', 'CyberstoreStorefront.tsx', 'FILE-MOVED-OR-MISSING',
      `Expected file not found at ${path} — was tracked as untracked/uncommitted on 23 Aug 2026; check it wasn’t lost.`, path);
  } else {
    const mockFn = content.match(/async function fetchProductsMock\([^)]*\)\s*:\s*Promise<[^>]+>\s*{\s*return\s*(\[[^\]]*\]);/);
    const isEmptyMock = mockFn && mockFn[1].replace(/\s/g, '') === '[]';
    record('cyberstoreStorefrontData', 'CyberstoreStorefront listing data',
      isEmptyMock ? 'CONFIRMED-EMPTY-MOCK' : mockFn ? 'MOCK-NOW-RETURNS-DATA-CHECK' : 'FUNCTION-SHAPE-CHANGED-CHECK-MANUALLY',
      isEmptyMock
        ? 'fetchProductsMock() still hardcoded to return an empty array — zero real listings, by design, unchanged since 23 Aug 2026.'
        : mockFn
          ? `fetchProductsMock() now returns a non-empty literal (${mockFn[1].slice(0, 80)}...) — this is a change; confirm whether this is still mock data or a real API call before treating it as a real figure.`
          : 'Could not find fetchProductsMock() in its previously-known shape — file likely restructured (e.g. now a real fetch()). Needs a human read.',
      `${path}`);
  }
}

record('cyberstoreStorefrontRouting', 'CyberstoreStorefront routing',
  /CyberstoreStorefront/.test(appTsx) ? 'NOW-ROUTED-CHECK' : 'STILL-NOT-ROUTED',
  /CyberstoreStorefront/.test(appTsx)
    ? 'CyberstoreStorefront now appears in src/App.tsx — this is a change from 23 Aug 2026 (was unrouted). Confirm before assuming it’s reachable/live.'
    : 'No reference to CyberstoreStorefront in src/App.tsx — still unreachable via any live route, unchanged.',
  'src/App.tsx');

// ── 4. CyberstoreListingWizard.tsx — unrouted, simulated submit ────────────

{
  const path = 'src/production-hub/CyberstoreListingWizard.tsx';
  const content = readRepoFile(path);
  if (content === null) {
    record('cyberstoreListingWizard', 'CyberstoreListingWizard.tsx', 'FILE-MOVED-OR-MISSING',
      `Expected file not found at ${path} — was tracked as untracked/uncommitted on 23 Aug 2026; check it wasn’t lost.`, path);
  } else {
    const simMarker = /await new Promise\(r => setTimeout\(r,\s*1800\)\)/.test(content);
    record('cyberstoreListingWizardSubmit', 'CyberstoreListingWizard submit behaviour',
      simMarker ? 'CONFIRMED-SIMULATED' : 'CHANGED-CHECK-MANUALLY',
      simMarker
        ? 'handleSubmit() still a simulated delay + fake id, no real API call — nothing it "submits" is stored anywhere. Unchanged since 23 Aug 2026.'
        : 'The simulated-submit pattern this script checks for is gone — could mean a real submit path now exists. Needs a human read before assuming any listing data is real.',
      `${path}`);
  }
}

record('cyberstoreListingWizardRouting', 'CyberstoreListingWizard routing',
  /CyberstoreListingWizard/.test(appTsx) ? 'NOW-ROUTED-CHECK' : 'STILL-NOT-ROUTED',
  /CyberstoreListingWizard/.test(appTsx)
    ? 'CyberstoreListingWizard now appears in src/App.tsx — change from 23 Aug 2026. Confirm before assuming reachable/live.'
    : 'No reference in src/App.tsx — still unreachable via any live route, unchanged.',
  'src/App.tsx');

// ── 5. CultivationPardnerTab.tsx — Pardner reserve snapshot + record fetch ─

{
  const path = 'src/features/pardner/CultivationPardnerTab.tsx';
  const content = readRepoFile(path);
  if (content === null) {
    record('pardnerTab', 'CultivationPardnerTab.tsx', 'FILE-MOVED-OR-MISSING',
      `Expected file not found at ${path}.`, path);
  } else {
    const hardcodedBlock = content.match(/setReserve\(\{([\s\S]*?)\}\);/);
    const isEstimateTrue = hardcodedBlock ? /isEstimate:\s*true/.test(hardcodedBlock[1]) : null;

    if (hardcodedBlock && isEstimateTrue) {
      const nums = {};
      for (const [field, re] of [
        ['totalReserveGBP', /totalReserveGBP:\s*([\d.]+)/],
        ['pardnerAllocationGBP', /pardnerAllocationGBP:\s*([\d.]+)/],
        ['committedThisQuarterGBP', /committedThisQuarterGBP:\s*([\d.]+)/],
        ['availableForNewPaymentsGBP', /availableForNewPaymentsGBP:\s*([\d.]+)/],
        ['estimatedCreatorsEligibleThisQuarter', /estimatedCreatorsEligibleThisQuarter:\s*(\d+)/],
      ]) {
        const m = hardcodedBlock[1].match(re);
        nums[field] = m ? m[1] : null;
      }
      record('pardnerReserveSnapshot', 'Pardner reserve snapshot', 'CONFIRMED-STUBBED-HARDCODED',
        `Still a hardcoded literal with isEstimate: true. Values: totalReserveGBP=${nums.totalReserveGBP}, pardnerAllocationGBP=${nums.pardnerAllocationGBP}, committedThisQuarterGBP=${nums.committedThisQuarterGBP}, availableForNewPaymentsGBP=${nums.availableForNewPaymentsGBP}, estimatedCreatorsEligibleThisQuarter=${nums.estimatedCreatorsEligibleThisQuarter}. THESE ARE NOT REAL FIGURES — fictional placeholders, not usable in any form.`,
        `${path} (setReserve literal)`);
    } else if (hardcodedBlock && !isEstimateTrue) {
      record('pardnerReserveSnapshot', 'Pardner reserve snapshot', 'CHANGED-ISESTIMATE-NOW-FALSE',
        'The setReserve() literal no longer has isEstimate: true — this is a significant change from 23 Aug 2026. Needs a human check: has real CommunityReserve data now been wired in? If so this may finally be a usable figure — confirm before using it.',
        `${path} (setReserve literal)`);
    } else {
      record('pardnerReserveSnapshot', 'Pardner reserve snapshot', 'SHAPE-CHANGED-CHECK-MANUALLY',
        'Could not find the previously-known hardcoded setReserve({...}) literal — the stub may have been replaced with a real fetch. Needs a human read before treating anything here as real or fake.',
        `${path}`);
    }

    const realFetchMarker = /fetch\(`\/api\/pardner\/record\/\$\{creatorId\}`\)/.test(content);
    record('pardnerRecordEndpoint', 'Pardner individual record endpoint (/api/pardner/record/{id})',
      realFetchMarker ? 'CODE-CALLS-REAL-ENDPOINT-LIVENESS-UNKNOWN' : 'FETCH-PATTERN-CHANGED-CHECK-MANUALLY',
      'This script can only confirm the frontend code shape (a genuine fetch() call exists), not whether a live backend actually answers it or what it returns. That requires checking outside this repository — cannot be automated from here.',
      `${path}`,
      'UNKNOWN — not verifiable from static source alone, every run.');
  }
}

// ── 6. Dead-code reachability: marketplace Order type, unused since 23 Aug ─

{
  const importers = findImportersUnder(/from\s+['"].*\/marketplace['"]|from\s+['"]\.\.?\/marketplace\/index['"]/, ['marketplace/']);
  record('marketplaceOrderLiveness', 'src/marketplace (Order type / MarketplaceMayaROV) reachability',
    importers.length === 0 ? 'CONFIRMED-UNREACHABLE' : 'NOW-HAS-IMPORTERS-CHECK',
    importers.length === 0
      ? 'Zero files outside src/marketplace/ import from it — still dead code, unchanged since 23 Aug 2026.'
      : `Now imported by: ${importers.join(', ')} — this is a change. If this makes Order data reachable/live, check whether it now carries real transactions.`,
    'full src/ import scan (this script)');
}

// ── 7. Reference docs existence (ww-accounts.md / ww-revenue-models.md) ────

{
  const glob = (name) => {
    const hits = [];
    function walk(dir) {
      let entries;
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        const full = join(dir, e.name);
        if (e.isDirectory()) {
          if (e.name === 'node_modules' || e.name === '.git') continue;
          walk(full);
        } else if (e.name.toLowerCase() === name.toLowerCase()) {
          hits.push(full.slice(REPO_ROOT.length + 1));
        }
      }
    }
    walk(REPO_ROOT);
    return hits;
  };
  const accountsDoc = glob('ww-accounts.md');
  const revenueModelsDoc = glob('ww-revenue-models.md');
  record('referenceDocs', 'ww-accounts.md / ww-revenue-models.md existence',
    (accountsDoc.length + revenueModelsDoc.length) === 0 ? 'CONFIRMED-ABSENT' : 'NOW-PRESENT-CHECK',
    (accountsDoc.length + revenueModelsDoc.length) === 0
      ? 'Neither file exists anywhere in the repo — unchanged since 23 Aug 2026. The ATELIER_COMMISSION flag check above is authoritative regardless (checked directly in code).'
      : `Found: ${[...accountsDoc, ...revenueModelsDoc].join(', ')} — new since 23 Aug 2026, worth reading for any updated flag/decision state.`,
    'full repo file scan (this script)');
}

// ── build report ─────────────────────────────────────────────────────────

let previous = null;
if (existsSync(STATE_FILE)) {
  try {
    previous = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    previous = null;
  }
}

function diffAgainstPrevious(current, prior) {
  if (!prior) return null;
  const priorById = Object.fromEntries((prior.findings || []).map((f) => [f.id, f]));
  const changes = [];
  for (const f of current) {
    const before = priorById[f.id];
    if (!before) {
      changes.push({ id: f.id, label: f.label, kind: 'NEW-CHECK', note: 'This check did not exist in the prior run.' });
    } else if (before.status !== f.status || before.detail !== f.detail) {
      changes.push({
        id: f.id, label: f.label, kind: 'CHANGED',
        was: `${before.status} — ${before.detail}`,
        now: `${f.status} — ${f.detail}`,
      });
    }
  }
  return changes;
}

const changes = diffAgainstPrevious(findings, previous);

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|');
}

const lines = [];
lines.push(`# Provisional Transaction Data Extract — ${runDate} — For Blake's Review, Not Authoritative`);
lines.push('');
lines.push('**This is raw extracted data intended only to support Blake’s (ACCA-qualified voluntary advisor) future draft accounts work. It is not accounts, not a disclosure, and not statutory material. Every figure below requires Blake’s review before it is used in anything filed. This document contains numbers and their sources only — no accounting judgement or disclosure treatment has been applied.**');
lines.push('');
lines.push(`Generated by \`scripts/finance/extract-transaction-data.mjs\`, run ${runTimestamp}.`);
lines.push(previous
  ? `Compared against the prior run dated ${previous.runDate ?? 'unknown'}.`
  : 'No prior run found — this is the first extract; nothing to compare against yet.');
lines.push('');

if (changes && changes.length > 0) {
  lines.push('## Changed since the last run — worth a look');
  lines.push('');
  lines.push('Flagged as "this changed since the prior run," not a judgement on whether the change is a problem — that call is Blake’s.');
  lines.push('');
  for (const c of changes) {
    lines.push(`- **${mdEscape(c.label)}** (\`${c.id}\`)`);
    if (c.kind === 'NEW-CHECK') {
      lines.push(`  - ${mdEscape(c.note)}`);
    } else {
      lines.push(`  - Was: ${mdEscape(c.was)}`);
      lines.push(`  - Now: ${mdEscape(c.now)}`);
    }
  }
  lines.push('');
} else if (previous) {
  lines.push('## Changed since the last run');
  lines.push('');
  lines.push('No changes detected in any tracked check since the prior run.');
  lines.push('');
}

lines.push('## All checks, this run');
lines.push('');
lines.push('| Check | Status | Detail | Source |');
lines.push('|---|---|---|---|');
for (const f of findings) {
  lines.push(`| ${mdEscape(f.label)} | ${mdEscape(f.status)} | ${mdEscape(f.detail)}${f.caveat ? ` _(${mdEscape(f.caveat)})_` : ''} | \`${mdEscape(f.source)}\` |`);
}
lines.push('');

lines.push('## Headline read (mechanical summary, not an opinion)');
lines.push('');
const noRealData = findings.filter(f => /CONFIRMED/.test(f.status) && !/CONFIG-CONFIRMED/.test(f.status));
lines.push(`${noRealData.length} check(s) this run confirmed "no real transaction data" or "still stubbed/off/dead" in their prior known state. Any check above marked CHANGED, NOW-*, or *-CHECK-MANUALLY is where a human (Blake or engineering) should look first — those are the only rows where something may have moved since the baseline.`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('**Nothing in this document should be entered into any draft account, note, or working paper as a transaction figure without Blake’s review.** This script checks the Wembley Wonders frontend codebase only — it cannot query a live backend and does not attempt to.');
lines.push('');

const reportPath = join(REPORTS_DIR, `WW-TRANSACTION-EXTRACT-${runDate}.md`);
mkdirSync(REPORTS_DIR, { recursive: true });
writeFileSync(reportPath, lines.join('\n'), 'utf8');

mkdirSync(STATE_DIR, { recursive: true });
writeFileSync(STATE_FILE, JSON.stringify({ runDate, runTimestamp, findings }, null, 2), 'utf8');

console.log(`Report written: ${reportPath.slice(REPO_ROOT.length + 1)}`);
console.log(`State updated: ${STATE_FILE.slice(REPO_ROOT.length + 1)}`);
if (changes && changes.length > 0) {
  console.log(`\n${changes.length} change(s) detected since the prior run — see the report's "Changed since the last run" section.`);
} else if (previous) {
  console.log('\nNo changes detected since the prior run.');
} else {
  console.log('\nFirst run — no prior baseline to compare against.');
}
