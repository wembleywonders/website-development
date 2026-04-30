/**
 * ListingCard.tsx
 * Wembley Wonders CIC
 *
 * The creator's view of a single Cyberstore listing.
 * Four metrics. One insight. No noise.
 *
 *   Rainy Season Beat
 *   Sold: 4    Earned: £34    Saved: 11    ROCE: £17/hr
 *
 * Place in: src/components/store/ListingCard.tsx
 */

import React, { useState } from 'react';
import {
  ListingMetrics,
  ROCETier,
  formatGBP,
  formatDuration,
} from '../../utils/revenue/roce';
import './ListingCard.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface ListingCardProps {
  metrics: ListingMetrics;
  status: 'DRAFT' | 'LIVE' | 'PAUSED' | 'SOLD_OUT';
  priceGBP: number | null;
  isFreeDownload: boolean;
  onEdit?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  variant?: 'dashboard' | 'impact-lab';
}

// ─── ROCE tier colours ────────────────────────────────────────────────────────

const ROCE_TIER_CONFIG: Record<ROCETier, {
  colour: string;
  label: string;
}> = {
  exceptional: { colour: 'var(--roce-exceptional)', label: 'Exceptional' },
  strong:      { colour: 'var(--roce-strong)',      label: 'Strong' },
  developing:  { colour: 'var(--roce-developing)',  label: 'Developing' },
  early:       { colour: 'var(--roce-early)',       label: 'Early days' },
};

// ─── Status badge ─────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: ListingCardProps['status'] }> = ({ status }) => {
  const config = {
    LIVE:     { label: 'Live',     cls: 'status--live' },
    DRAFT:    { label: 'Draft',    cls: 'status--draft' },
    PAUSED:   { label: 'Paused',   cls: 'status--paused' },
    SOLD_OUT: { label: 'Sold out', cls: 'status--sold-out' },
  }[status];

  return (
    <span className={`listing-card__status ${config.cls}`}>
      {config.label}
    </span>
  );
};

// ─── Metric cell ──────────────────────────────────────────────────────────────

const MetricCell: React.FC<{
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  colour?: string;
}> = ({ label, value, sub, highlight, colour }) => (
  <div
    className={`listing-metric ${highlight ? 'listing-metric--highlight' : ''}`}
    style={colour ? { '--metric-colour': colour } as React.CSSProperties : undefined}
  >
    <span className="listing-metric__value">{value}</span>
    <span className="listing-metric__label">{label}</span>
    {sub && <span className="listing-metric__sub">{sub}</span>}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ListingCard: React.FC<ListingCardProps> = ({
  metrics,
  status,
  priceGBP,
  isFreeDownload,
  onEdit,
  onPause,
  onResume,
  variant = 'dashboard',
}) => {
  const [insightDismissed, setInsightDismissed] = useState(false);

  const { roce } = metrics;
  const roceConfig = roce ? ROCE_TIER_CONFIG[roce.tier] : null;

  const priceDisplay = isFreeDownload
    ? 'Free'
    : priceGBP !== null && priceGBP !== undefined
      ? formatGBP(priceGBP)
      : 'Unpriced';

  return (
    <article className={`listing-card listing-card--${variant}`}>

      {/* Header */}
      <div className="listing-card__header">
        <div className="listing-card__title-row">
          <h3 className="listing-card__title">{metrics.title}</h3>
          <StatusBadge status={status} />
        </div>
        <div className="listing-card__meta">
          <span className="listing-card__programme">
            {metrics.programmeSlug.replace(/-/g, ' ')}
          </span>
          <span className="listing-card__price">{priceDisplay}</span>
        </div>
      </div>

      {/* The four metrics — the heart of the card */}
      <div className="listing-card__metrics">
        <MetricCell
          label="Sold"
          value={metrics.sold.toString()}
          sub={metrics.sold === 1 ? 'copy' : 'copies'}
        />
        <MetricCell
          label="Earned"
          value={formatGBP(metrics.earningsGBP)}
          sub="your 55%"
        />
        <MetricCell
          label="Saved"
          value={metrics.saved.toString()}
          sub={metrics.savesToSalesGap > 0
            ? `${metrics.savesToSalesGap} not yet bought`
            : 'wishlisted'}
          highlight={metrics.savesToSalesGap >= 5}
        />
        <MetricCell
          label="ROCE"
          value={roce ? roce.label : '—'}
          sub={roce ? roceConfig?.label : 'Add duration to calculate'}
          highlight={!!roce && roce.tier !== 'early'}
          colour={roceConfig?.colour}
        />
      </div>

      {/* Maya insight — one line, dismissible */}
      {metrics.mayaInsight && !insightDismissed && (
        <div className="listing-card__insight">
          <span className="listing-card__insight-icon">✦</span>
          <p className="listing-card__insight-text">{metrics.mayaInsight}</p>
          <button
            className="listing-card__insight-dismiss"
            onClick={() => setInsightDismissed(true)}
            aria-label="Dismiss insight"
          >
            ×
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="listing-card__actions">
        {onEdit && (
          <button className="listing-card__action" onClick={onEdit}>
            Edit listing
          </button>
        )}
        {status === 'LIVE' && onPause && (
          <button className="listing-card__action listing-card__action--secondary"
            onClick={onPause}>
            Pause
          </button>
        )}
        {status === 'PAUSED' && onResume && (
          <button className="listing-card__action" onClick={onResume}>
            Resume
          </button>
        )}
        {status === 'DRAFT' && (
          <span className="listing-card__draft-note">
            Set a price to publish
          </span>
        )}
      </div>

    </article>
  );
};

export default ListingCard;