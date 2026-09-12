import React from 'react';
import { DEFAULT_TRIO, DEFAULT_QUARTET } from './musicianPersonas';

/**
 * EnsembleTabs.tsx — reusable ensemble-size selector for the Session Room.
 *
 * Extracted from the tab logic first written inline in SessionRoom.tsx.
 * personaIdsForSize() is the single source of truth for which musicians
 * play in each ensemble size — SessionRoom.tsx should import and use this
 * rather than keeping its own copy.
 *
 * Constrained to what the real persona roster supports: Solo, Duo, Trio,
 * Quartet. Quintet/Section/Full-ensemble need new personas added to
 * musicianPersonas.ts first — that's a content decision, not a UI one.
 */

export type EnsembleSize = 'solo' | 'duo' | 'trio' | 'quartet';

export const ENSEMBLE_TABS: { size: EnsembleSize; label: string }[] = [
  { size: 'solo', label: 'Solo' },
  { size: 'duo', label: 'Duo' },
  { size: 'trio', label: 'Trio' },
  { size: 'quartet', label: 'Quartet' },
];

export function personaIdsForSize(size: EnsembleSize): string[] {
  switch (size) {
    case 'solo':
      return [DEFAULT_TRIO[0]]; // Delroy — rhythm is where most songwriters start
    case 'duo':
      return DEFAULT_TRIO.slice(0, 2); // Delroy + Pearl — rhythm and harmony
    case 'trio':
      return DEFAULT_TRIO;
    case 'quartet':
      return DEFAULT_QUARTET;
  }
}

export interface EnsembleTabsProps {
  activeSize: EnsembleSize;
  onChange: (size: EnsembleSize) => void;
}

const EnsembleTabs: React.FC<EnsembleTabsProps> = ({ activeSize, onChange }) => {
  return (
    <nav className="ensemble-tabs" role="tablist" aria-label="Ensemble size">
      {ENSEMBLE_TABS.map((tab) => (
        <button
          key={tab.size}
          type="button"
          role="tab"
          aria-selected={activeSize === tab.size}
          className={`ensemble-tabs__tab${activeSize === tab.size ? ' ensemble-tabs__tab--active' : ''}`}
          onClick={() => onChange(tab.size)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default EnsembleTabs;
