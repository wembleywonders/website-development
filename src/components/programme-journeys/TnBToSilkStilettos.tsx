// TnBToSilkStilettos.tsx
// Thin wrapper around the generic JourneyBridge for the specific
// Trubble n Bass → Silk Stilettos pairing. Renders the confirmed
// 'tnb-to-silk' bridge from journeyConfig.ts — no logic duplicated here.

import React from 'react';
import JourneyBridge from './JourneyBridge';

export interface TnBToSilkStilettosProps {
  /** Values for this bridge's carryData fields: trackName, style, mood. */
  carryValues?: {
    trackName?: string;
    style?: string;
    mood?: string;
  };
  onDismiss?: () => void;
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const TnBToSilkStilettos: React.FC<TnBToSilkStilettosProps> = ({
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  return (
    <JourneyBridge
      bridgeId="tnb-to-silk"
      carryValues={carryValues}
      onDismiss={() => onDismiss?.()}
      onNavigate={onNavigate}
    />
  );
};

export default TnBToSilkStilettos;
