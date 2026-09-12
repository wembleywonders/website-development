// TnBToRaydyo.tsx
// Thin wrapper around the generic JourneyBridge for the specific
// Trubble n Bass → Rayd-yo pairing. Renders the confirmed 'tnb-to-raydyo'
// bridge from journeyConfig.ts — no logic duplicated here.

import React from 'react';
import JourneyBridge from './JourneyBridge';

export interface TnBToRaydyoProps {
  /** Values for this bridge's carryData fields: trackName, tempo, style. */
  carryValues?: {
    trackName?: string;
    tempo?: number;
    style?: string;
  };
  onDismiss?: () => void;
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const TnBToRaydyo: React.FC<TnBToRaydyoProps> = ({
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  return (
    <JourneyBridge
      bridgeId="tnb-to-raydyo"
      carryValues={carryValues}
      onDismiss={() => onDismiss?.()}
      onNavigate={onNavigate}
    />
  );
};

export default TnBToRaydyo;
