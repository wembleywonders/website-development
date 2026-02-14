/**
 * CHECKOUT IMPACT COMPONENT
 * 
 * Shows buyers their community contribution at checkout.
 * This is the "blockchain piece worth doing now" - no backend needed,
 * immediate psychological impact on buyers.
 * 
 * "25% of your purchase (£12.50) funds free youth workshops"
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface CheckoutImpactProps {
  /** Total cart value in GBP */
  cartTotal: number;
  /** Type of product affects community split */
  productType: 'product' | 'service' | 'package';
  /** Show detailed breakdown */
  showBreakdown?: boolean;
  /** Show estimated impact in hours */
  showImpactHours?: boolean;
  /** Custom class name */
  className?: string;
  /** Compact mode for smaller spaces */
  compact?: boolean;
}

export interface RevenueSplit {
  creator: number;
  creatorPercent: number;
  community: number;
  communityPercent: number;
  operations: number;
  operationsPercent: number;
}

export interface ImpactEstimate {
  workshopMinutes: number;
  participantsReached: number;
  impactStatement: string;
}

// ============================================================
// CONSTANTS
// ============================================================

const REVENUE_SPLITS: Record<string, { creator: number; community: number; operations: number }> = {
  product: { creator: 55, community: 25, operations: 20 },
  service: { creator: 60, community: 20, operations: 20 },
  package: { creator: 58, community: 22, operations: 20 }
};

// Average cost per workshop hour (used for impact calculation)
const WORKSHOP_COST_PER_HOUR = 15; // £15 per hour of youth workshop delivery

// Average participants per workshop
const PARTICIPANTS_PER_WORKSHOP = 12;

// ============================================================
// CALCULATIONS
// ============================================================

function calculateRevenueSplit(total: number, productType: string): RevenueSplit {
  const splits = REVENUE_SPLITS[productType] || REVENUE_SPLITS.product;
  
  return {
    creator: (total * splits.creator) / 100,
    creatorPercent: splits.creator,
    community: (total * splits.community) / 100,
    communityPercent: splits.community,
    operations: (total * splits.operations) / 100,
    operationsPercent: splits.operations
  };
}

function calculateImpactEstimate(communityContribution: number): ImpactEstimate {
  const workshopMinutes = Math.round((communityContribution / WORKSHOP_COST_PER_HOUR) * 60);
  const workshopHours = workshopMinutes / 60;
  const participantsReached = Math.round(workshopHours * PARTICIPANTS_PER_WORKSHOP);
  
  let impactStatement: string;
  
  if (workshopMinutes < 30) {
    impactStatement = `${workshopMinutes} minutes of free creative education`;
  } else if (workshopMinutes < 120) {
    impactStatement = `${workshopMinutes} minutes of free youth workshops`;
  } else {
    const hours = (workshopMinutes / 60).toFixed(1);
    impactStatement = `${hours} hours of free workshops reaching ${participantsReached} young people`;
  }
  
  return {
    workshopMinutes,
    participantsReached,
    impactStatement
  };
}

// ============================================================
// COMPONENT
// ============================================================

export const CheckoutImpact: React.FC<CheckoutImpactProps> = ({
  cartTotal,
  productType,
  showBreakdown = true,
  showImpactHours = true,
  className = '',
  compact = false
}) => {
  const split = useMemo(() => calculateRevenueSplit(cartTotal, productType), [cartTotal, productType]);
  const impact = useMemo(() => calculateImpactEstimate(split.community), [split.community]);
  
  if (compact) {
    return (
      <div className={`checkout-impact checkout-impact--compact ${className}`}>
        <span className="checkout-impact__icon">💚</span>
        <span className="checkout-impact__text">
          £{split.community.toFixed(2)} funds youth programmes
        </span>
      </div>
    );
  }
  
  return (
    <div className={`checkout-impact ${className}`}>
      <div className="checkout-impact__header">
        <span className="checkout-impact__icon">💚</span>
        <h4 className="checkout-impact__title">Your Community Impact</h4>
      </div>
      
      <div className="checkout-impact__main">
        <p className="checkout-impact__contribution">
          <strong>£{split.community.toFixed(2)}</strong> of your purchase funds youth programmes
        </p>
        
        {showImpactHours && (
          <p className="checkout-impact__estimate">
            That's <strong>{impact.impactStatement}</strong>
          </p>
        )}
      </div>
      
      {showBreakdown && (
        <div className="checkout-impact__breakdown">
          <p className="checkout-impact__breakdown-title">Where your money goes:</p>
          <div className="checkout-impact__splits">
            <div className="checkout-impact__split">
              <span className="checkout-impact__split-label">Creator</span>
              <span className="checkout-impact__split-bar">
                <span 
                  className="checkout-impact__split-fill checkout-impact__split-fill--creator"
                  style={{ width: `${split.creatorPercent}%` }}
                />
              </span>
              <span className="checkout-impact__split-value">{split.creatorPercent}%</span>
            </div>
            <div className="checkout-impact__split">
              <span className="checkout-impact__split-label">Community</span>
              <span className="checkout-impact__split-bar">
                <span 
                  className="checkout-impact__split-fill checkout-impact__split-fill--community"
                  style={{ width: `${split.communityPercent}%` }}
                />
              </span>
              <span className="checkout-impact__split-value">{split.communityPercent}%</span>
            </div>
            <div className="checkout-impact__split">
              <span className="checkout-impact__split-label">Operations</span>
              <span className="checkout-impact__split-bar">
                <span 
                  className="checkout-impact__split-fill checkout-impact__split-fill--operations"
                  style={{ width: `${split.operationsPercent}%` }}
                />
              </span>
              <span className="checkout-impact__split-value">{split.operationsPercent}%</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="checkout-impact__footer">
        <p className="checkout-impact__note">
          Every purchase supports the Forgotten 60% - young people often overlooked by mainstream education.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// ADDITIONAL EXPORTS
// ============================================================

/**
 * Get impact text for a given amount (useful for receipts, emails)
 */
export function getImpactText(cartTotal: number, productType: string = 'product'): string {
  const split = calculateRevenueSplit(cartTotal, productType);
  const impact = calculateImpactEstimate(split.community);
  
  return `£${split.community.toFixed(2)} of your purchase (${split.communityPercent}%) funds ${impact.impactStatement}.`;
}

/**
 * Get just the community contribution amount
 */
export function getCommunityContribution(cartTotal: number, productType: string = 'product'): number {
  const split = calculateRevenueSplit(cartTotal, productType);
  return split.community;
}

/**
 * Get full breakdown for receipts/invoices
 */
export function getFullBreakdown(cartTotal: number, productType: string = 'product') {
  const split = calculateRevenueSplit(cartTotal, productType);
  const impact = calculateImpactEstimate(split.community);
  
  return {
    total: cartTotal,
    productType,
    split,
    impact,
    formatted: {
      creator: `£${split.creator.toFixed(2)} (${split.creatorPercent}%)`,
      community: `£${split.community.toFixed(2)} (${split.communityPercent}%)`,
      operations: `£${split.operations.toFixed(2)} (${split.operationsPercent}%)`,
      impactStatement: impact.impactStatement
    }
  };
}

export default CheckoutImpact;