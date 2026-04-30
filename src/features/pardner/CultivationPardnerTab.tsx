/**
 * CultivationPardnerTab.tsx
 * Wembley Wonders CIC
 *
 * Tab component for CreatorDashboard.
 * Sits alongside earnings, content, analytics — integrated, not stigmatised.
 *
 * Integration:
 *   Import and add this as a tab in retail/components/CreatorDashboard.tsx
 *   Wire the data hooks to your actual API endpoints.
 */

import React, { useState, useEffect } from 'react';
import {
  PardnerRecord,
  PardnerAssessment,
  PardnerReserveSnapshot,
  PardnerStatus,
  getPardnerStatusLabel,
  formatGBP,
  PARDNER_FLOOR_THRESHOLD_GBP,
  PARDNER_PAYMENT_AMOUNT_GBP,
  PARDNER_MAX_QUARTERS,
  PARDNER_MIN_POSTS_PER_QUARTER,
  PARDNER_MIN_ENGAGEMENT_ACTIONS,
} from './PardnerEngine';
import './CultivationPardnerTab.css';

// ─── Mock data shape — replace with real API hooks ───────────────────────────
// Wire to: GET /api/creators/:id/pardner
// Wire to: GET /api/pardner/reserve/snapshot

interface PardnerTabProps {
  creatorId: string;
  creatorName: string;
  // These would come from your existing CreatorDashboard data context:
  currentMonthlyEarningsGBP: number;
  postsThisQuarter: number;
  engagementActionsThisQuarter: number;
}

// ─── Status visual config ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<PardnerStatus, {
  colour: string;
  icon: string;
  tone: 'neutral' | 'warm' | 'positive' | 'alert';
}> = {
  NOT_ELIGIBLE:  { colour: 'var(--pardner-muted)',    icon: '○', tone: 'neutral'  },
  ELIGIBLE:      { colour: 'var(--pardner-amber)',    icon: '◎', tone: 'warm'     },
  APPROVED:      { colour: 'var(--pardner-green)',    icon: '◉', tone: 'positive' },
  ACTIVE:        { colour: 'var(--pardner-gold)',     icon: '●', tone: 'warm'     },
  REVIEW_DUE:    { colour: 'var(--pardner-amber)',    icon: '◈', tone: 'alert'    },
  GRADUATED:     { colour: 'var(--pardner-green)',    icon: '★', tone: 'positive' },
  COMPLETED:     { colour: 'var(--pardner-muted)',    icon: '✓', tone: 'neutral'  },
  SUSPENDED:     { colour: 'var(--pardner-muted)',    icon: '◌', tone: 'neutral'  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PardnerPhilosophy: React.FC = () => (
  <div className="pardner-philosophy">
    <div className="pardner-philosophy__mark">✦</div>
    <p className="pardner-philosophy__text">
      The Cultivation Pardner is funded by the community reserve — the 25% that
      every transaction on this platform sets aside for the community itself.
      It exists because good work takes time to find its audience.
    </p>
    <p className="pardner-philosophy__sub">
      Named after the Caribbean Pardner tradition: mutual, trust-based, dignified.
      Not charity. Community.
    </p>
  </div>
);

const StatusBadge: React.FC<{ status: PardnerStatus }> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`pardner-badge pardner-badge--${config.tone}`}
      style={{ '--badge-colour': config.colour } as React.CSSProperties}
    >
      <span className="pardner-badge__icon">{config.icon}</span>
      {getPardnerStatusLabel(status)}
    </span>
  );
};

const EligibilityMeter: React.FC<{
  label: string;
  current: number;
  required: number;
  unit?: string;
  met: boolean;
}> = ({ label, current, required, unit = '', met }) => {
  const pct = Math.min((current / required) * 100, 100);
  return (
    <div className="pardner-meter">
      <div className="pardner-meter__header">
        <span className="pardner-meter__label">{label}</span>
        <span className={`pardner-meter__value ${met ? 'met' : 'unmet'}`}>
          {current}{unit} / {required}{unit}
          {met ? ' ✓' : ''}
        </span>
      </div>
      <div className="pardner-meter__track">
        <div
          className={`pardner-meter__fill ${met ? 'pardner-meter__fill--met' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const QuarterHistory: React.FC<{ record: PardnerRecord }> = ({ record }) => {
  if (record.quartersHistory.length === 0) {
    return (
      <p className="pardner-empty">No Pardner history yet this cycle.</p>
    );
  }

  return (
    <div className="pardner-history">
      {record.quartersHistory.map((q, i) => (
        <div key={i} className={`pardner-history__entry pardner-history__entry--${q.status.toLowerCase()}`}>
          <div className="pardner-history__quarter">
            {q.year} {q.quarter}
          </div>
          <div className="pardner-history__detail">
            <span className="pardner-history__status">{q.status}</span>
            {q.amountPaidGBP > 0 && (
              <span className="pardner-history__amount">
                {formatGBP(q.amountPaidGBP)} paid
              </span>
            )}
            {q.notes && (
              <p className="pardner-history__notes">{q.notes}</p>
            )}
          </div>
          <div className="pardner-history__score">
            Activity score: {q.activityScore}/100
          </div>
        </div>
      ))}
    </div>
  );
};

const ReserveHealth: React.FC<{ snapshot: PardnerReserveSnapshot }> = ({ snapshot }) => (
  <div className="pardner-reserve">
    <h4 className="pardner-reserve__title">Community Reserve — Pardner Allocation</h4>
    <p className="pardner-reserve__note">
      This information is public. Every creator on this platform can see how the
      reserve is funded and how much is available.
    </p>
    <div className="pardner-reserve__grid">
      <div className="pardner-reserve__stat">
        <span className="pardner-reserve__stat-label">Total Reserve</span>
        <span className="pardner-reserve__stat-value">
          {formatGBP(snapshot.totalReserveGBP)}
        </span>
      </div>
      <div className="pardner-reserve__stat">
        <span className="pardner-reserve__stat-label">Pardner Allocation (15%)</span>
        <span className="pardner-reserve__stat-value">
          {formatGBP(snapshot.pardnerAllocationGBP)}
        </span>
      </div>
      <div className="pardner-reserve__stat">
        <span className="pardner-reserve__stat-label">Committed This Quarter</span>
        <span className="pardner-reserve__stat-value pardner-reserve__stat-value--committed">
          {formatGBP(snapshot.committedThisQuarterGBP)}
        </span>
      </div>
      <div className="pardner-reserve__stat">
        <span className="pardner-reserve__stat-label">Available Now</span>
        <span className={`pardner-reserve__stat-value ${snapshot.canSupportAllEligible ? 'pardner-reserve__stat-value--healthy' : 'pardner-reserve__stat-value--strained'}`}>
          {formatGBP(snapshot.availableForNewPaymentsGBP)}
        </span>
      </div>
    </div>
    {!snapshot.canSupportAllEligible && (
      <p className="pardner-reserve__warning">
        ⚠ The reserve is currently under pressure. The Stewards Council will
        prioritise creators with the lowest earnings and highest activity scores.
      </p>
    )}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const CultivationPardnerTab: React.FC<PardnerTabProps> = ({
  creatorId,
  creatorName,
  currentMonthlyEarningsGBP,
  postsThisQuarter,
  engagementActionsThisQuarter,
}) => {

  // Replace with real API calls:
  // const { data: record } = useQuery(['pardner', creatorId], fetchPardnerRecord);
  // const { data: reserve } = useQuery(['pardner-reserve'], fetchReserveSnapshot);

  const [record, setRecord] = useState<PardnerRecord | null>(null);
  const [reserve, setReserve] = useState<PardnerReserveSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Stub — replace with real fetch
    setTimeout(() => {
      const stubRecord: PardnerRecord = {
        creatorId,
        status: currentMonthlyEarningsGBP < PARDNER_FLOOR_THRESHOLD_GBP
          ? 'ELIGIBLE'
          : 'NOT_ELIGIBLE',
        quartersReceived: 0,
        quartersHistory: [],
        totalReceivedGBP: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const stubReserve: PardnerReserveSnapshot = {
        totalReserveGBP: 4200,
        pardnerAllocationGBP: 630,
        committedThisQuarterGBP: 175,
        availableForNewPaymentsGBP: 455,
        estimatedCreatorsEligibleThisQuarter: 5,
        canSupportAllEligible: true,
        snapshotDate: new Date(),
      };

      setRecord(stubRecord);
      setReserve(stubReserve);
      setLoading(false);
    }, 600);
  }, [creatorId]);

  const belowFloor = currentMonthlyEarningsGBP < PARDNER_FLOOR_THRESHOLD_GBP;
  const meetsPostMin = postsThisQuarter >= PARDNER_MIN_POSTS_PER_QUARTER;
  const meetsEngMin = engagementActionsThisQuarter >= PARDNER_MIN_ENGAGEMENT_ACTIONS;
  const quartersLeft = record
    ? PARDNER_MAX_QUARTERS - record.quartersReceived
    : PARDNER_MAX_QUARTERS;

  if (loading) {
    return (
      <div className="pardner-loading">
        <div className="pardner-loading__spinner" />
        <p>Checking your Pardner status…</p>
      </div>
    );
  }

  if (!record || !reserve) return null;

  return (
    <div className="pardner-tab">

      {/* Philosophy statement — always visible */}
      <PardnerPhilosophy />

      {/* Current status */}
      <section className="pardner-section">
        <h3 className="pardner-section__title">Your Status</h3>
        <div className="pardner-status-row">
          <StatusBadge status={record.status} />
          {record.quartersReceived > 0 && (
            <span className="pardner-quarters-pill">
              {record.quartersReceived}/{PARDNER_MAX_QUARTERS} quarters used
            </span>
          )}
        </div>

        {record.status === 'REVIEW_DUE' && (
          <div className="pardner-alert pardner-alert--review">
            <strong>Conversation due.</strong> You've received Pardner support for
            {' '}{record.quartersReceived} quarters. A member of the Stewards Council
            will reach out to discuss next steps — not to judge, but to plan together.
          </div>
        )}

        {record.status === 'GRADUATED' && (
          <div className="pardner-alert pardner-alert--graduated">
            <strong>You've graduated.</strong> Your earnings have crossed the viability
            threshold. This is exactly what the Pardner exists to help create.
            {record.totalReceivedGBP > 0 && (
              <> Total received: {formatGBP(record.totalReceivedGBP)}.</>
            )}
          </div>
        )}

        {record.status === 'APPROVED' && (
          <div className="pardner-alert pardner-alert--approved">
            <strong>Payment on its way.</strong> The Stewards Council have approved
            your Pardner payment of {formatGBP(PARDNER_PAYMENT_AMOUNT_GBP)} for this
            quarter. It will arrive within 7 days.
          </div>
        )}
      </section>

      {/* Eligibility checklist — visible when below threshold or eligible */}
      {belowFloor && record.status !== 'GRADUATED' && record.status !== 'COMPLETED' && (
        <section className="pardner-section">
          <h3 className="pardner-section__title">This Quarter's Eligibility</h3>
          <p className="pardner-section__intro">
            The Pardner checks three things: earnings below the floor, content
            activity, and community engagement. All three matter.
          </p>

          <div className="pardner-checklist">
            <EligibilityMeter
              label="Monthly earnings"
              current={currentMonthlyEarningsGBP}
              required={PARDNER_FLOOR_THRESHOLD_GBP}
              unit=""
              met={belowFloor}
            />
            <p className="pardner-checklist__note">
              Below £{PARDNER_FLOOR_THRESHOLD_GBP}/month — ✓ you meet this criterion
            </p>

            <EligibilityMeter
              label="Posts this quarter"
              current={postsThisQuarter}
              required={PARDNER_MIN_POSTS_PER_QUARTER}
              met={meetsPostMin}
            />

            <EligibilityMeter
              label="Community engagements"
              current={engagementActionsThisQuarter}
              required={PARDNER_MIN_ENGAGEMENT_ACTIONS}
              met={meetsEngMin}
            />
          </div>

          {meetsPostMin && meetsEngMin && belowFloor && record.status === 'ELIGIBLE' && (
            <div className="pardner-alert pardner-alert--info">
              You meet all the criteria. Your assessment will go to the Stewards
              Council at the end of this quarter for a vote.
            </div>
          )}

          {(!meetsPostMin || !meetsEngMin) && (
            <div className="pardner-alert pardner-alert--nudge">
              Keep going. The quarter isn't over yet.{' '}
              {!meetsPostMin && `${PARDNER_MIN_POSTS_PER_QUARTER - postsThisQuarter} more posts needed. `}
              {!meetsEngMin && `${PARDNER_MIN_ENGAGEMENT_ACTIONS - engagementActionsThisQuarter} more community engagements needed.`}
            </div>
          )}

          {quartersLeft > 0 && record.quartersReceived > 0 && (
            <p className="pardner-quarters-note">
              {quartersLeft} quarter{quartersLeft !== 1 ? 's' : ''} of Pardner
              support remaining in this cycle.
            </p>
          )}
        </section>
      )}

      {/* Not below floor — show graduation message */}
      {!belowFloor && record.status !== 'GRADUATED' && (
        <section className="pardner-section">
          <div className="pardner-above-floor">
            <span className="pardner-above-floor__icon">↑</span>
            <div>
              <p className="pardner-above-floor__headline">
                Your earnings are above the floor threshold.
              </p>
              <p className="pardner-above-floor__sub">
                The Cultivation Pardner is here if you need it. Right now, you don't.
                That's a good thing.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quarter history */}
      {record.quartersHistory.length > 0 && (
        <section className="pardner-section">
          <h3 className="pardner-section__title">Pardner History</h3>
          <QuarterHistory record={record} />
        </section>
      )}

      {/* Reserve transparency — always visible */}
      <section className="pardner-section">
        <ReserveHealth snapshot={reserve} />
      </section>

    </div>
  );
};

export default CultivationPardnerTab;