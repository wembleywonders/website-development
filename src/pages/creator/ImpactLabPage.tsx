/**
 * ImpactLabPage.tsx
 * Wembley Wonders CIC
 *
 * The page that makes a creator feel like a professional.
 * Aggregates ROCE, sales, saved, and community contribution
 * across all their work for a given period.
 *
 * Route: /creator/impact-lab
 * Add to router/index.tsx:
 *   { path: '/creator/impact-lab', element: <ImpactLabPage /> }
 *
 * Place in: src/pages/creator/ImpactLabPage.tsx
 */

import React, { useState, useEffect } from 'react';
import ListingCard from '../../components/store/ListingCard';
import {
  ImpactLabSummary,
  ListingMetrics,
  buildImpactLabSummary,
  buildListingMetrics,
  formatGBP,
} from '../../utils/revenue/roce';
import './ImpactLabPage.css';

// ─── Period selector ──────────────────────────────────────────────────────────

type Period = 'quarter' | 'month' | 'year' | 'all';

const PERIOD_LABELS: Record<Period, string> = {
  quarter: 'This quarter',
  month:   'This month',
  year:    'This year',
  all:     'All time',
};

// ─── API stub — replace with real fetch ───────────────────────────────────────
// Wire to: GET /api/creators/:id/metrics?period=quarter

async function fetchCreatorMetrics(
  creatorId: string,
  period: Period
): Promise<ListingMetrics[]> {
  const res = await fetch(
    `/api/creators/${creatorId}/metrics?period=${period}`,
    { headers: { 'Authorization': `Bearer ${localStorage.getItem('ww_token')}` } }
  );
  if (!res.ok) throw new Error('Failed to fetch metrics');

  const raw = await res.json();

  // Map API response to ListingMetrics via buildListingMetrics
  return raw.map((item: any) => buildListingMetrics({
    listingId: item.listingId,
    title: item.title,
    programmeSlug: item.programmeSlug,
    copiesSold: item.copiesSold,
    creatorEarningsGBP: item.creatorEarningsGBP,
    savedCount: item.savedCount,
    durationMinutes: item.durationMinutes,
  }));
}

// ─── Summary stat block ───────────────────────────────────────────────────────

const SummaryStat: React.FC<{
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}> = ({ label, value, sub, emphasis }) => (
  <div className={`impact-stat ${emphasis ? 'impact-stat--emphasis' : ''}`}>
    <span className="impact-stat__value">{value}</span>
    <span className="impact-stat__label">{label}</span>
    {sub && <span className="impact-stat__sub">{sub}</span>}
  </div>
);

// ─── Spotlight card — highlights the standout listing ────────────────────────

const SpotlightCard: React.FC<{
  title: string;
  listing: ListingMetrics;
  context: string;
}> = ({ title, listing, context }) => (
  <div className="impact-spotlight">
    <div className="impact-spotlight__header">
      <span className="impact-spotlight__icon">✦</span>
      <span className="impact-spotlight__title">{title}</span>
    </div>
    <p className="impact-spotlight__listing">{listing.title}</p>
    <p className="impact-spotlight__context">{context}</p>
  </div>
);

// ─── Community reserve note ───────────────────────────────────────────────────

const ReserveNote: React.FC<{ amount: number }> = ({ amount }) => {
  if (amount < 0.01) return null;
  return (
    <div className="impact-reserve">
      <span className="impact-reserve__icon">◈</span>
      <div>
        <p className="impact-reserve__headline">
          Your sales put {formatGBP(amount)} into the community reserve this period.
        </p>
        <p className="impact-reserve__sub">
          That's the 25% that funds the Cultivation Pardner, equipment grants,
          and community programmes. It came from your work.
        </p>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const ImpactLabPage: React.FC = () => {
  const creatorId = localStorage.getItem('ww_creator_id') ?? '';

  const [period, setPeriod] = useState<Period>('quarter');
  const [summary, setSummary] = useState<ImpactLabSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!creatorId) return;
    setLoading(true);
    setError('');

    fetchCreatorMetrics(creatorId, period)
      .then(listings => {
        setSummary(buildImpactLabSummary(listings, PERIOD_LABELS[period]));
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [creatorId, period]);

  // ─── Loading ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="impact-lab impact-lab--loading">
        <div className="impact-lab__spinner" />
        <p>Calculating your impact…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="impact-lab impact-lab--error">
        <p>{error}</p>
      </div>
    );
  }

  if (!summary) return null;

  const hasActivity = summary.totalSold > 0 || summary.totalSaved > 0;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="impact-lab">

      {/* Header */}
      <header className="impact-lab__header">
        <div>
          <h1 className="impact-lab__title">Impact Lab</h1>
          <p className="impact-lab__subtitle">
            What your creative work has returned — in money, in community,
            and in time.
          </p>
        </div>

        {/* Period selector */}
        <div className="impact-period-selector">
          {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
            <button
              key={p}
              className={`impact-period-btn ${period === p ? 'impact-period-btn--active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </header>

      {/* Empty state */}
      {!hasActivity && (
        <div className="impact-lab__empty">
          <p className="impact-lab__empty-headline">
            No sales or saves yet this period.
          </p>
          <p className="impact-lab__empty-sub">
            The numbers will appear here as your work finds its audience.
            The Cyberstore is live — share your listings with your community.
          </p>
        </div>
      )}

      {/* Summary stats — always visible if there's any activity */}
      {hasActivity && (
        <section className="impact-summary">
          <SummaryStat
            label="Sold"
            value={summary.totalSold.toString()}
            sub={summary.totalSold === 1 ? 'copy' : 'copies'}
          />
          <SummaryStat
            label="Earned"
            value={formatGBP(summary.totalEarningsGBP)}
            sub="your 55%"
            emphasis
          />
          <SummaryStat
            label="Saved"
            value={summary.totalSaved.toString()}
            sub="wishlisted"
          />
          <SummaryStat
            label="Avg ROCE"
            value={summary.averageROCEPerHour
              ? `£${summary.averageROCEPerHour.toFixed(2)}/hr`
              : '—'}
            sub="per hour of creative work"
            emphasis={!!summary.averageROCEPerHour}
          />
        </section>
      )}

      {/* Community reserve note */}
      {summary.communityReserveContributedGBP > 0 && (
        <ReserveNote amount={summary.communityReserveContributedGBP} />
      )}

      {/* Spotlights — standout listings */}
      {(summary.bestROCEListing || summary.mostSavedListing || summary.highestGapListing) && (
        <section className="impact-spotlights">
          <h2 className="impact-section-title">Standouts</h2>
          <div className="impact-spotlights__grid">

            {summary.bestROCEListing && (
              <SpotlightCard
                title="Best return on your time"
                listing={summary.bestROCEListing}
                context={`${summary.bestROCEListing.roce?.label} — your most efficient work this period.`}
              />
            )}

            {summary.mostSavedListing && (
              <SpotlightCard
                title="Most wanted"
                listing={summary.mostSavedListing}
                context={`${summary.mostSavedListing.saved} people saved this. Your audience is paying attention.`}
              />
            )}

            {summary.highestGapListing &&
             summary.highestGapListing.listingId !== summary.mostSavedListing?.listingId && (
              <SpotlightCard
                title="Biggest opportunity"
                listing={summary.highestGapListing}
                context={`${summary.highestGapListing.savesToSalesGap} saves haven't converted to sales yet. Worth revisiting the price or description.`}
              />
            )}

          </div>
        </section>
      )}

      {/* All listings */}
      {summary.listings.length > 0 && (
        <section className="impact-listings">
          <h2 className="impact-section-title">
            All work — {PERIOD_LABELS[period].toLowerCase()}
          </h2>
          <div className="impact-listings__grid">
            {summary.listings.map(listing => (
              <ListingCard
                key={listing.listingId}
                metrics={listing}
                status="LIVE"
                priceGBP={null}
                isFreeDownload={false}
                variant="impact-lab"
                onEdit={() => {
                  window.location.href =
                    `/cyberstore/listings/${listing.listingId}/edit`;
                }}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ImpactLabPage;