// src/cyberstore/pricing/components/FiftyFiveCalculator.tsx
//
// "The 55 Calculator" — from the Counting House financial literacy suite.
//
// Shows a seller exactly what they earn under each pricing mode,
// compared to what they'd earn on a mainstream platform.
//
// Designed for Gloria. Not for a VC pitch.
// The numbers have to be honest, clear, and immediately useful.
// No jargon. No aspirational projections. Just: here's what you earn.
//
// Also used in Easy Street Arc Session 3: The Numbers.

import React, { useState, useMemo } from 'react';
import {
  PricingMode,
  PricingCategoryConfig,
  computePriceBreakdown,
  computeRevenueProjection,
  suggestPricingMode,
  REVENUE_SPLITS,
} from '../types/pricing.types';
import './FiftyFiveCalculator.css';

interface FiftyFiveCalculatorProps {
  categoryConfig: PricingCategoryConfig;
  sellerEligibleForCommunityPrice: boolean;
  sellerDisplayName?: string;
  // Pre-populate from Easy Street arc context
  initialPrice?: number;
  initialUnits?: number;
}

export const FiftyFiveCalculator: React.FC<FiftyFiveCalculatorProps> = ({
  categoryConfig,
  sellerEligibleForCommunityPrice,
  sellerDisplayName,
  initialPrice = 6.50,
  initialUnits = 40,
}) => {
  const [price, setPrice] = useState(initialPrice);
  const [units, setUnits] = useState(initialUnits);
  const [selectedMode, setSelectedMode] = useState<PricingMode>(
    suggestPricingMode(initialPrice, categoryConfig, sellerEligibleForCommunityPrice)
  );

  const availableModes: PricingMode[] = [
    ...(categoryConfig.auctionEnabled ? ['LIVE_AUCTION' as PricingMode] : []),
    ...(categoryConfig.buyNowEnabled ? ['BUY_NOW' as PricingMode] : []),
    ...(categoryConfig.communityPriceEnabled && sellerEligibleForCommunityPrice
      ? ['COMMUNITY_PRICE' as PricingMode] : []),
  ];

  const breakdown = useMemo(
    () => computePriceBreakdown(price, selectedMode),
    [price, selectedMode]
  );

  const projection = useMemo(
    () => computeRevenueProjection(price, selectedMode, units),
    [price, selectedMode, units]
  );

  const suggestedMode = useMemo(
    () => suggestPricingMode(price, categoryConfig, sellerEligibleForCommunityPrice),
    [price, categoryConfig, sellerEligibleForCommunityPrice]
  );

  const formatGBP = (n: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency', currency: 'GBP',
      minimumFractionDigits: 2, maximumFractionDigits: 2
    }).format(n);

  return (
    <div className="ffc">
      <h2 className="sr-only">
        The 55 Calculator — see what you earn on Wembley Wonders
      </h2>

      {/* Inputs */}
      <div className="ffc__inputs">
        <div className="ffc__input-group">
          <label className="ffc__label" htmlFor="ffc-price">
            Price per item
          </label>
          <div className="ffc__price-input">
            <span className="ffc__currency">£</span>
            <input
              id="ffc-price"
              type="number"
              min={categoryConfig.minimumPrice}
              max={500}
              step={0.50}
              value={price}
              onChange={e => setPrice(Math.max(
                categoryConfig.minimumPrice,
                parseFloat(e.target.value) || 0
              ))}
            />
          </div>
          {categoryConfig.communityPriceEnabled && sellerEligibleForCommunityPrice && (
            <p className="ffc__threshold-note">
              Community Price available up to {formatGBP(categoryConfig.communityPriceThreshold)}
            </p>
          )}
        </div>

        <div className="ffc__input-group">
          <label className="ffc__label" htmlFor="ffc-units">
            Items per month
          </label>
          <input
            id="ffc-units"
            type="number"
            min={1}
            max={10000}
            step={1}
            value={units}
            onChange={e => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
      </div>

      {/* Mode selector */}
      <div className="ffc__modes">
        {availableModes.map(mode => (
          <ModeTab
            key={mode}
            mode={mode}
            selected={selectedMode === mode}
            suggested={suggestedMode === mode}
            onSelect={() => setSelectedMode(mode)}
          />
        ))}
      </div>

      {/* Per-item breakdown */}
      <div className="ffc__breakdown">
        <div className="ffc__breakdown-label">Per item at {formatGBP(price)}</div>
        <div className="ffc__split-bars">
          <SplitBar
            label={sellerDisplayName ? `${sellerDisplayName} earns` : 'You earn'}
            amount={breakdown.creatorAmount}
            rate={REVENUE_SPLITS[selectedMode].creatorRate}
            total={price}
            color="creator"
          />
          <SplitBar
            label="Community pool"
            amount={breakdown.communityPoolAmount}
            rate={0.25}
            total={price}
            color="pool"
            locked
          />
          <SplitBar
            label="Platform"
            amount={breakdown.platformAmount}
            rate={REVENUE_SPLITS[selectedMode].platformRate}
            total={price}
            color="platform"
          />
        </div>

        {!breakdown.platformCoversTransactionCost && (
          <div className="ffc__warning">
            At this price, platform fee ({formatGBP(breakdown.platformAmount)})
            doesn't cover transaction costs (~{formatGBP(breakdown.estimatedTransactionCost)}).
            Consider raising your price slightly.
          </div>
        )}
      </div>

      {/* Monthly projection */}
      <div className="ffc__projection">
        <div className="ffc__projection-label">
          {units} items/month — monthly picture
        </div>
        <div className="ffc__metric-grid">
          <MetricCard
            label={sellerDisplayName ? `${sellerDisplayName}'s income` : 'Your monthly income'}
            value={formatGBP(projection.monthlyCreatorIncome)}
            highlight
          />
          <MetricCard
            label="Community pool contribution"
            value={formatGBP(projection.monthlyCommunityPool)}
            sublabel="25% always"
          />
          <MetricCard
            label="Total monthly sales"
            value={formatGBP(projection.monthlyRevenue)}
          />
        </div>

        {/* The comparison that matters */}
        <div className="ffc__comparison">
          <div className="ffc__comparison-label">
            Compared to a mainstream platform (80/20 split)
          </div>
          <div className="ffc__comparison-row">
            <div className="ffc__comparison-them">
              <span className="ffc__comparison-platform">TikTok / Instagram shop</span>
              <span className="ffc__comparison-amount ffc__comparison-amount--them">
                {formatGBP(projection.mainstreamCreatorIncome)}
              </span>
            </div>
            <div className="ffc__comparison-us">
              <span className="ffc__comparison-platform">Wembley Wonders</span>
              <span className="ffc__comparison-amount ffc__comparison-amount--us">
                {formatGBP(projection.monthlyCreatorIncome)}
              </span>
            </div>
          </div>
          <div className="ffc__advantage">
            {formatGBP(projection.incomeAdvantage)} more per month
            — {projection.incomeAdvantagePercent}% more in your pocket
          </div>
        </div>

        {/* Community pool in context */}
        <div className="ffc__pool-context">
          <span className="ffc__pool-icon" aria-hidden="true">◆</span>
          <p className="ffc__pool-text">
            {formatGBP(projection.monthlyCommunityPool)} goes to the community pool
            this month. That's money that stays in Brent, governed by members,
            spent on what the community decides.
          </p>
        </div>
      </div>

      {/* Annual view */}
      <div className="ffc__annual">
        <span className="ffc__annual-label">Annually</span>
        <span className="ffc__annual-value">
          {formatGBP(projection.monthlyCreatorIncome * 12)} to you
          · {formatGBP(projection.monthlyCommunityPool * 12)} to the pool
        </span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// Sub-components
// -------------------------------------------------------------------------

const ModeTab: React.FC<{
  mode: PricingMode;
  selected: boolean;
  suggested: boolean;
  onSelect: () => void;
}> = ({ mode, selected, suggested, onSelect }) => {
  const labels: Record<PricingMode, { title: string; desc: string }> = {
    LIVE_AUCTION: { title: 'Live auction', desc: '55% to you' },
    BUY_NOW:      { title: 'Buy now',      desc: '60% to you' },
    COMMUNITY_PRICE: { title: 'Community price', desc: '65% to you' },
  };
  const { title, desc } = labels[mode];

  return (
    <button
      className={`ffc__mode-tab ${selected ? 'ffc__mode-tab--selected' : ''} ${suggested ? 'ffc__mode-tab--suggested' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="ffc__mode-title">{title}</span>
      <span className="ffc__mode-desc">{desc}</span>
      {suggested && !selected && (
        <span className="ffc__mode-suggested-badge">Suggested</span>
      )}
    </button>
  );
};

const SplitBar: React.FC<{
  label: string;
  amount: number;
  rate: number;
  total: number;
  color: 'creator' | 'pool' | 'platform';
  locked?: boolean;
}> = ({ label, amount, rate, total, color, locked }) => {
  const pct = Math.round(rate * 100);
  const widthPct = Math.round((amount / total) * 100);
  const formatGBP = (n: number) => `£${n.toFixed(2)}`;

  return (
    <div className="split-bar">
      <div className="split-bar__meta">
        <span className="split-bar__label">
          {label}
          {locked && <span className="split-bar__locked"> (always 25%)</span>}
        </span>
        <span className="split-bar__amounts">
          <span className={`split-bar__amount split-bar__amount--${color}`}>
            {formatGBP(amount)}
          </span>
          <span className="split-bar__pct">{pct}%</span>
        </span>
      </div>
      <div className="split-bar__track">
        <div
          className={`split-bar__fill split-bar__fill--${color}`}
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
}> = ({ label, value, sublabel, highlight }) => (
  <div className={`ffc__metric ${highlight ? 'ffc__metric--highlight' : ''}`}>
    <span className="ffc__metric-label">{label}</span>
    <span className="ffc__metric-value">{value}</span>
    {sublabel && <span className="ffc__metric-sublabel">{sublabel}</span>}
  </div>
);