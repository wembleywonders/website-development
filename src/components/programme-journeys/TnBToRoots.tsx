// TnBToRoots.tsx
// Thin wrapper around the generic JourneyBridge for the specific
// Trubble n Bass → Roots pairing. Renders the confirmed 'tnb-to-roots'
// bridge from journeyConfig.ts ("Archive Recovery" handoff) — no logic
// duplicated here. The receiving side of this handoff is MelodyRecovery.tsx,
// which reads sessionStorage under 'journey-bridge:tnb-to-roots'.

import React from 'react';
import JourneyBridge from './JourneyBridge';

export interface TnBToRootsProps {
  /** Values for this bridge's carryData fields: melodyData, provenanceNote, style. */
  carryValues?: {
    melodyData?: unknown;
    provenanceNote?: string;
    style?: string;
  };
  onDismiss?: () => void;
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const TnBToRoots: React.FC<TnBToRootsProps> = ({
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  return (
    <JourneyBridge
      bridgeId="tnb-to-roots"
      carryValues={carryValues}
      onDismiss={() => onDismiss?.()}
      onNavigate={onNavigate}
    />
  );
};

export default TnBToRoots;