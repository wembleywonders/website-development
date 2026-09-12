// File: src/community/rovs/silk-stilettos/useRosemaryWeaverTracking.ts
//
// Rosemary Weaver is the sole named host for Silk Stilettos — she absorbs
// the craft-guidance and pricing roles that AtelierROV's generic
// Esi/Kweku split used to cover. Nora remains separate and cross-suite
// (the platform-wide IP checkpoint) — she is not duplicated here.
//
// Pricing here is layered (Option C): wall rent (flat, from
// SILK_STILETTOS_WALL_RENT) and sale commission (from ATELIER_COMMISSION /
// ATELIER_AUCTION) are tracked as two separate touches, because they are
// two separate economic facts about Silk Stilettos, not one collapsed
// into the other.

import { useJournalStore } from '@/stores/journalStore';

export const useRosemaryWeaverTracking = () => {
  const { addEntry } = useJournalStore();

  // Craft stage — framing the work itself: materials, method, story.
  const recordCraftGuidance = (makerName: string, pieceDescription: string) => {
    addEntry({
      stage: 2,
      cPhase: 'create',
      entryType: 'coverage-touch',
      content: `${makerName} worked through the craft of ${pieceDescription} with Rosemary Weaver`,
      isPrivate: false,
      coverageCategory: 'craft',
      coverageStation: 'Silk Stilettos',
    });
  };

  // Wall rent stage — the display-space economics, independent of any sale.
  const recordWallRentDecision = (makerName: string, weeksCommitted: number) => {
    addEntry({
      stage: 2,
      cPhase: 'cultivate',
      entryType: 'coverage-touch',
      content: `${makerName} committed to ${weeksCommitted} week(s) of wall space at Silk Stilettos`,
      isPrivate: false,
      coverageCategory: 'pricing',
      coverageStation: 'Silk Stilettos',
    });
  };

  // Sale commission stage — pricing a piece for actual sale, separate from
  // the rent decision above. Still logs to the same 'pricing' category:
  // both are pricing literacy, just at different points in the journey.
  const recordSalePricing = (makerName: string, pieceDescription: string, mode: 'commission' | 'auction') => {
    addEntry({
      stage: 2,
      cPhase: 'cultivate',
      entryType: 'coverage-touch',
      content: `${makerName} priced ${pieceDescription} for sale (${mode}) with Rosemary Weaver`,
      isPrivate: false,
      coverageCategory: 'pricing',
      coverageStation: 'Silk Stilettos',
    });
  };

  return {
    recordCraftGuidance,
    recordWallRentDecision,
    recordSalePricing,
  };
};