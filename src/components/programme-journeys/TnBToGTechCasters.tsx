// TnBToGTechCasters.tsx
// Thin wrapper around the generic JourneyBridge for the specific
// Trubble n Bass → G-Tech Casters pairing. Renders the confirmed
// 'tnb-to-gtechcasters' bridge from journeyConfig.ts — no logic
// duplicated here.

import React from 'react';
import JourneyBridge from './JourneyBridge';

export interface TnBToGTechCastersProps {
  /** Values for this bridge's carryData fields: trackName, tempo, mood. */
  carryValues?: {
    trackName?: string;
    tempo?: number;
    mood?: string;
  };
  onDismiss?: () => void;
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const TnBToGTechCasters: React.FC<TnBToGTechCastersProps> = ({
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  return (
    <JourneyBridge
      bridgeId="tnb-to-gtechcasters"
      carryValues={carryValues}
      onDismiss={() => onDismiss?.()}
      onNavigate={onNavigate}
    />
  );
};

export default TnBToGTechCasters;
