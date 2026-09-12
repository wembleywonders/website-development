// File: src/community/rovs/silk-stilettos/RosemaryWeaverROV.tsx
//
// Forked from the old generic AtelierROV. Consolidates Esi/Kweku's
// craft+pricing roles into a single named host, Rosemary Weaver. Nora is
// NOT re-declared here — she is the platform-wide IP checkpoint and stays
// external to this suite; link out to her rather than duplicating her.
//
// Pricing is layered per the Option C decision: wall rent (flat, from
// SILK_STILETTOS_WALL_RENT) and sale commission (from ATELIER_COMMISSION /
// ATELIER_AUCTION) are shown as two separate, independent figures — not
// one number standing in for both.

import React, { useState } from 'react';
import {
  ATELIER_COMMISSION,
  ATELIER_AUCTION,
  SILK_STILETTOS_WALL_RENT,
} from '../../../blockchain/config/revenueModels';
import { useRosemaryWeaverTracking } from './useRosemaryWeaverTracking';

type SaleMode = 'commission' | 'auction';

interface RosemaryWeaverROVProps {
  makerName?: string;
  initialSaleMode?: SaleMode;
}

const RosemaryWeaverROV: React.FC<RosemaryWeaverROVProps> = ({
  makerName = 'there',
  initialSaleMode = 'commission',
}) => {
  const [saleMode, setSaleMode] = useState<SaleMode>(initialSaleMode);
  const [weeksCommitted, setWeeksCommitted] = useState(1);
  const { recordCraftGuidance, recordWallRentDecision, recordSalePricing } =
    useRosemaryWeaverTracking();

  const splits = saleMode === 'commission' ? ATELIER_COMMISSION : ATELIER_AUCTION;
  const totalRent = SILK_STILETTOS_WALL_RENT.weeklyRate * weeksCommitted;

  return (
    <section className="rosemary-weaver-rov" aria-label="Silk Stilettos guidance">
      <header className="rosemary-weaver-rov__header">
        <h2>Silk Stilettos — welcome, {makerName}</h2>
        <p className="rosemary-weaver-rov__strapline">
          Two separate numbers here: what the wall costs you, and what a sale
          costs you. They don't cancel each other out.
        </p>
      </header>

      <div className="rosemary-weaver-rov__section">
        <h3>Wall space</h3>
        <p>
          Rent covers your display slot only — leave, and the spot's gone.
          It applies whether or not anything sells.
        </p>
        <label>
          Weeks committed:{' '}
          <input
            type="number"
            min={1}
            value={weeksCommitted}
            onChange={(e) => setWeeksCommitted(Math.max(1, Number(e.target.value)))}
          />
        </label>
        <p>
          Total rent: {SILK_STILETTOS_WALL_RENT.currency}
          {totalRent} ({SILK_STILETTOS_WALL_RENT.weeklyRate}/
          {SILK_STILETTOS_WALL_RENT.billingUnit} × {weeksCommitted})
        </p>
        <button
          type="button"
          onClick={() => recordWallRentDecision(makerName, weeksCommitted)}
        >
          Confirm wall booking
        </button>
      </div>

      <div className="rosemary-weaver-rov__section">
        <h3>If it sells</h3>
        <div role="tablist" aria-label="Sale type">
          <button
            type="button"
            role="tab"
            aria-selected={saleMode === 'commission'}
            onClick={() => setSaleMode('commission')}
          >
            Commission
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={saleMode === 'auction'}
            onClick={() => setSaleMode('auction')}
          >
            Auction
          </button>
        </div>
        <p>
          Maker {splits.maker}% · Platform {splits.platform}% · Community{' '}
          {splits.community}%
        </p>
        <p className="rosemary-weaver-rov__settlement-note">
          This is on top of the wall rent above, not instead of it.
        </p>
        <button
          type="button"
          onClick={() =>
            recordSalePricing(makerName, 'your piece', saleMode)
          }
        >
          Set sale price
        </button>
      </div>

      <div className="rosemary-weaver-rov__section">
        <h3>Before you list</h3>
        <p>
          Not what your hands made — the story behind it. Talk it through
          with me first if you haven't already.
        </p>
        <button
          type="button"
          onClick={() => recordCraftGuidance(makerName, 'your piece')}
        >
          Talk through the craft
        </button>
      </div>

      <p className="rosemary-weaver-rov__nora-link">
        Ownership question, or work that draws on someone else's design?
        That's Nora's checkpoint, not mine — she's the same IP counsel
        across every suite on the platform.
      </p>
    </section>
  );
};

export default RosemaryWeaverROV;