import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import './WhatTheWorkPaid.css';

// ─────────────────────────────────────────────────────────────────────────────
// WhatTheWorkPaid — Wembley Wonders CIC
// Route: /joystick/what-the-work-paid
//
// Recurring earnings evidence feature. Published monthly in Joystick.
// Real income. Real creators. Explicit consent. Anonymised identity.
// Lower-end figures lead throughout.
//
// Editorial contract (from EditorialStandardPage):
//   — We publish the ordinary months alongside the strong ones.
//   — We do not curate only the best results.
//   — The floor is real. The trajectory from the floor is also real.
//   — Both belong in the record.
//
// Empty state: honest placeholder that explains what this will become.
//   The infrastructure is ready. The data populates as it arrives.
//
// Data model per entry:
//   — programme(s) active
//   — months on platform
//   — month reported (YYYY-MM)
//   — total earned (£)
//   — income sources (array of { type, amount })
//   — optional anonymised quote (one sentence max)
//   — consent confirmed: true
//   — passive_income: boolean (did any income arrive without fresh output?)
//
// Filters: by programme, by tier (getting-started / finding-stride /
//          building-momentum / established), by passive income flag.
//
// Route registration needed in App.tsx:
//   import WhatTheWorkPaid from './pages/joystick/WhatTheWorkPaid'
//   <Route path="/joystick/what-the-work-paid" element={<WhatTheWorkPaid />} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

interface IncomeSource {
  type:   string;   // e.g. 'Beat licence', 'Rayd-yo episode', 'Pattern sale'
  amount: number;   // £
}

interface WTPEntry {
  id:             string;
  programmes:     string[];       // e.g. ['Trubble n Bass', 'Rayd-yo']
  monthsOnPlatform: number;
  reportedMonth:  string;         // e.g. 'November 2026'
  reportedMonthISO: string;       // YYYY-MM for sorting
  totalEarned:    number;         // £
  sources:        IncomeSource[];
  quote:          string | null;  // one sentence, anonymised, or null
  passiveIncome:  boolean;        // any income without fresh output this month?
  consentConfirmed: true;         // always true — never published without
}

type TierFilter = 'all' | 'getting-started' | 'finding-stride' | 'building-momentum' | 'established';
type ProgrammeFilter = string; // programme name or 'all'

// ── Tier definitions (mirrors CreatorPathwaysPage) ────────────────────────────

const TIERS: { id: TierFilter; label: string; months: string; typical: string }[] = [
  { id: 'getting-started',    label: 'Getting started',    months: 'Mo 1–6',   typical: '£8–£40/mo'    },
  { id: 'finding-stride',     label: 'Finding stride',     months: 'Mo 6–18',  typical: '£40–£150/mo'  },
  { id: 'building-momentum',  label: 'Building momentum',  months: 'Mo 18–36', typical: '£150–£400/mo' },
  { id: 'established',        label: 'Established',        months: 'Mo 36+',   typical: '£300–£700/mo' },
];

// Helper: map months on platform to tier id
const getTier = (months: number): TierFilter => {
  if (months <= 6)  return 'getting-started';
  if (months <= 18) return 'finding-stride';
  if (months <= 36) return 'building-momentum';
  return 'established';
};

// ── Live data ─────────────────────────────────────────────────────────────────
// Empty on launch. Add entries here as consent is confirmed and data arrives.
// Each entry is added chronologically. Oldest first — the reader who follows
// the series over time sees the trajectory, not just the number.
//
// To add an entry:
//   1. Confirm written consent from the creator (stored in admin records)
//   2. Anonymise all identifying details
//   3. Add to ENTRIES array below
//   4. Deploy — no other changes needed

const ENTRIES: WTPEntry[] = [
  // ── Entries will appear here as real data arrives ──
  // Example structure (do not publish without real consent):
  //
  // {
  //   id: 'wtp-2026-11-001',
  //   programmes: ['Trubble n Bass', 'Rayd-yo'],
  //   monthsOnPlatform: 14,
  //   reportedMonth: 'November 2026',
  //   reportedMonthISO: '2026-11',
  //   totalEarned: 280,
  //   sources: [
  //     { type: 'Beat licence ×2', amount: 180 },
  //     { type: 'Rayd-yo production credit', amount: 60 },
  //     { type: 'Workshop facilitation', amount: 40 },
  //   ],
  //   quote: "First month I covered my phone bill and travel card from music alone.",
  //   passiveIncome: true,
  //   consentConfirmed: true,
  // },
];

// ── All programmes referenced across entries (for filter) ────────────────────
const ALL_PROGRAMMES = Array.from(
  new Set(ENTRIES.flatMap(e => e.programmes))
).sort();

// ── Component ─────────────────────────────────────────────────────────────────

const WhatTheWorkPaid: React.FC = () => {
  const [tierFilter,      setTierFilter]      = useState<TierFilter>('all');
  const [programmeFilter, setProgrammeFilter] = useState<ProgrammeFilter>('all');
  const [passiveOnly,     setPassiveOnly]     = useState(false);

  // Filter entries
  const filtered = ENTRIES
    .filter(e => tierFilter === 'all' || getTier(e.monthsOnPlatform) === tierFilter)
    .filter(e => programmeFilter === 'all' || e.programmes.includes(programmeFilter))
    .filter(e => !passiveOnly || e.passiveIncome)
    .sort((a, b) => a.reportedMonthISO.localeCompare(b.reportedMonthISO)); // oldest first

  const isEmpty = ENTRIES.length === 0;
  const noResults = !isEmpty && filtered.length === 0;

  return (
    <PageTemplate
      pageTitle="What the Work Paid"
      pageStrapline="Real earnings. Real creators. Honest figures. Published monthly."
      pageType="standard"
    >
      <div className="wtp-content">

        {/* ── Editorial contract ── */}
        <section className="wtp-contract">
          <div className="wtp-contract-inner">
            <p className="wtp-contract-lead">
              We publish what people actually earned — not what they could theoretically earn.
            </p>
            <p className="wtp-contract-body">
              Every entry here is real income from a real creator, published with their
              explicit consent and anonymised to protect their identity. We publish the
              ordinary months alongside the strong ones. We do not curate only the best
              results. The floor is real. The trajectory from the floor is also real.
              Both belong in the record.
            </p>
            <p className="wtp-contract-body">
              The figures shown are what most people earn at each stage — not the ceiling.
              When you earn more than you expected, that surprise is more useful to you
              than a promise that turned out to be an exception.
            </p>
            <div className="wtp-contract-links">
              <Link to="/editorial-standard" className="wtp-contract-link">
                Our editorial standard →
              </Link>
              <Link to="/creator-pathways" className="wtp-contract-link wtp-contract-link--secondary">
                See earning path projections →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tier reference strip ── */}
        <section className="wtp-tiers">
          <p className="wtp-tiers-label">What most people earn at each stage</p>
          <div className="wtp-tiers-grid">
            {TIERS.map(t => (
              <div key={t.id} className="wtp-tier-card">
                <span className="wtp-tier-phase">{t.label}</span>
                <span className="wtp-tier-months">{t.months}</span>
                <span className="wtp-tier-typical">{t.typical}</span>
                <span className="wtp-tier-note">most people</span>
              </div>
            ))}
          </div>
          <p className="wtp-tiers-footnote">
            Outside London — Cardiff, Birmingham, Leeds — the same earnings cover
            more of monthly outgoings against a lower cost base.
          </p>
        </section>

        {/* ── Filters ── */}
        {!isEmpty && (
          <section className="wtp-filters">
            <div className="wtp-filter-group">
              <span className="wtp-filter-label">Stage</span>
              <div className="wtp-filter-chips">
                {([{ id: 'all', label: 'All stages' }, ...TIERS] as const).map(t => (
                  <button
                    key={t.id}
                    className={`wtp-chip ${tierFilter === t.id ? 'active' : ''}`}
                    onClick={() => setTierFilter(t.id as TierFilter)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {ALL_PROGRAMMES.length > 0 && (
              <div className="wtp-filter-group">
                <span className="wtp-filter-label">Programme</span>
                <div className="wtp-filter-chips">
                  <button
                    className={`wtp-chip ${programmeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setProgrammeFilter('all')}
                  >
                    All programmes
                  </button>
                  {ALL_PROGRAMMES.map(p => (
                    <button
                      key={p}
                      className={`wtp-chip ${programmeFilter === p ? 'active' : ''}`}
                      onClick={() => setProgrammeFilter(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="wtp-filter-group">
              <label className="wtp-toggle-label">
                <input
                  type="checkbox"
                  checked={passiveOnly}
                  onChange={e => setPassiveOnly(e.target.checked)}
                  className="wtp-toggle-input"
                />
                <span className="wtp-toggle-text">
                  Show only months with passive income
                </span>
              </label>
            </div>
          </section>
        )}

        {/* ── Empty state — honest, specific, forward-looking ── */}
        {isEmpty && (
          <section className="wtp-empty">
            <div className="wtp-empty-inner">
              <span className="wtp-empty-mark">◈</span>
              <h2 className="wtp-empty-title">
                The first entry hasn't arrived yet.
              </h2>
              <p className="wtp-empty-body">
                This feature publishes from the first transaction that a consenting
                creator generates — however modest. The first entry might be £12 from
                a single Joystick contributor fee. We'll publish it. That £12, honestly
                presented with its context, is the beginning of the evidence base.
              </p>
              <p className="wtp-empty-body">
                We are not waiting until the numbers look impressive. We are waiting
                until a creator gives their consent. The infrastructure is ready.
                The data follows.
              </p>
              <p className="wtp-empty-body">
                If you are already earning through Wembley Wonders and would like
                your earnings included here — anonymised, with your explicit sign-off
                on every word — talk to Judith.
              </p>
              <div className="wtp-empty-actions">
                <a
                  href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20contribute%20to%20What%20the%20Work%20Paid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wtp-empty-btn wtp-empty-btn--primary"
                >
                  💬 Talk to Judith about contributing
                </a>
                <Link to="/creator-pathways" className="wtp-empty-btn wtp-empty-btn--secondary">
                  See earning path projections →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── No results state ── */}
        {noResults && (
          <section className="wtp-empty">
            <div className="wtp-empty-inner">
              <h2 className="wtp-empty-title">No entries match those filters.</h2>
              <p className="wtp-empty-body">
                Try broadening your selection — or check back as more entries arrive.
              </p>
              <button
                className="wtp-empty-btn wtp-empty-btn--secondary"
                onClick={() => {
                  setTierFilter('all');
                  setProgrammeFilter('all');
                  setPassiveOnly(false);
                }}
              >
                Clear filters
              </button>
            </div>
          </section>
        )}

        {/* ── Entry list ── */}
        {!isEmpty && filtered.length > 0 && (
          <section className="wtp-entries">
            <p className="wtp-entries-count">
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
              {tierFilter !== 'all' || programmeFilter !== 'all' || passiveOnly
                ? ' matching filters'
                : ' in the archive'}
              {' '}· oldest first
            </p>

            <div className="wtp-entries-list">
              {filtered.map(entry => {
                const tier = TIERS.find(t => t.id === getTier(entry.monthsOnPlatform));
                return (
                  <article key={entry.id} className="wtp-entry">

                    {/* Entry header */}
                    <div className="wtp-entry-header">
                      <div className="wtp-entry-meta">
                        <div className="wtp-entry-programmes">
                          {entry.programmes.map(p => (
                            <span key={p} className="wtp-entry-programme-tag">{p}</span>
                          ))}
                        </div>
                        <span className="wtp-entry-period">
                          {entry.reportedMonth} · {entry.monthsOnPlatform} months on platform
                        </span>
                      </div>
                      <div className="wtp-entry-earned">
                        <span className="wtp-entry-amount">£{entry.totalEarned}</span>
                        <span className="wtp-entry-amount-label">this month</span>
                      </div>
                    </div>

                    {/* Tier context */}
                    {tier && (
                      <div className="wtp-entry-tier">
                        <span className="wtp-entry-tier-label">{tier.label}</span>
                        <span className="wtp-entry-tier-range">
                          Typical for this stage: {tier.typical}
                        </span>
                        <span className={`wtp-entry-tier-marker ${
                          entry.totalEarned > parseInt(tier.typical.split('–')[1]) ? 'above' :
                          entry.totalEarned < parseInt(tier.typical.split('£')[1]) ? 'below' : 'within'
                        }`}>
                          {entry.totalEarned > parseInt(tier.typical.replace(/[^0-9–]/g, '').split('–')[1] || '0')
                            ? 'Above typical'
                            : entry.totalEarned < parseInt(tier.typical.replace('£', '').split('–')[0] || '0')
                            ? 'Below typical'
                            : 'Within typical range'}
                        </span>
                      </div>
                    )}

                    {/* Income breakdown */}
                    <div className="wtp-entry-sources">
                      {entry.sources.map((s, i) => (
                        <div key={i} className="wtp-entry-source">
                          <span className="wtp-entry-source-type">{s.type}</span>
                          <span className="wtp-entry-source-amount">£{s.amount}</span>
                        </div>
                      ))}
                    </div>

                    {/* Passive income flag */}
                    {entry.passiveIncome && (
                      <div className="wtp-entry-passive">
                        <span className="wtp-passive-dot" />
                        Some of this income arrived without fresh output this month
                      </div>
                    )}

                    {/* Quote */}
                    {entry.quote && (
                      <blockquote className="wtp-entry-quote">
                        "{entry.quote}"
                      </blockquote>
                    )}

                    {/* Consent badge */}
                    <div className="wtp-entry-consent">
                      ✓ Published with creator's explicit consent · Identity anonymised
                    </div>

                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Running totals (only shown when entries exist) ── */}
        {!isEmpty && (
          <section className="wtp-totals">
            <div className="wtp-totals-inner">
              <h2 className="wtp-totals-title">Across all published entries</h2>
              <div className="wtp-totals-grid">
                <div className="wtp-total-card">
                  <span className="wtp-total-value">
                    £{ENTRIES.reduce((sum, e) => sum + e.totalEarned, 0).toLocaleString()}
                  </span>
                  <span className="wtp-total-label">total documented earnings</span>
                </div>
                <div className="wtp-total-card">
                  <span className="wtp-total-value">{ENTRIES.length}</span>
                  <span className="wtp-total-label">months on record</span>
                </div>
                <div className="wtp-total-card">
                  <span className="wtp-total-value">
                    £{Math.round(ENTRIES.reduce((sum, e) => sum + e.totalEarned, 0) / Math.max(ENTRIES.length, 1))}
                  </span>
                  <span className="wtp-total-label">average monthly earnings</span>
                </div>
                <div className="wtp-total-card">
                  <span className="wtp-total-value">
                    {ENTRIES.filter(e => e.passiveIncome).length}
                  </span>
                  <span className="wtp-total-label">months with passive income</span>
                </div>
              </div>
              <p className="wtp-totals-note">
                These are real figures from consenting creators, not projections.
                The average will shift as more entries arrive — including lean months.
                That movement is the story.
              </p>
            </div>
          </section>
        )}

        {/* ── Contribute CTA ── */}
        <section className="wtp-contribute">
          <div className="wtp-contribute-inner">
            <h2 className="wtp-contribute-title">
              Earning through Wembley Wonders?
            </h2>
            <p className="wtp-contribute-body">
              If you'd like your earnings included here — anonymised, with your
              explicit sign-off on every word — talk to Judith. The feature is
              only as useful as the data it holds. Your ordinary month is more
              persuasive than someone else's exceptional one.
            </p>
            <div className="wtp-contribute-actions">
              <a
                href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20contribute%20to%20What%20the%20Work%20Paid"
                target="_blank"
                rel="noopener noreferrer"
                className="wtp-contribute-btn wtp-contribute-btn--primary"
              >
                💬 Talk to Judith
              </a>
              <Link to="/joystick" className="wtp-contribute-btn wtp-contribute-btn--secondary">
                ← Back to Joystick
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default WhatTheWorkPaid;