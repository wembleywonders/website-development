// TnBToPageturners.tsx
// Thin wrapper around the generic JourneyBridge for the specific
// Trubble n Bass → Pageturners pairing. Renders the confirmed
// 'tnb-to-pageturners' bridge from journeyConfig.ts — no logic
// duplicated here.

import React from 'react';
import JourneyBridge from './JourneyBridge';

export interface TnBToPageturnersProps {
  /** Values for this bridge's carryData fields: lyricDraft, style, tempo. */
  carryValues?: {
    lyricDraft?: string;
    style?: string;
    tempo?: number;
  };
  onDismiss?: () => void;
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const TnBToPageturners: React.FC<TnBToPageturnersProps> = ({
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  return (
    <JourneyBridge
      bridgeId="tnb-to-pageturners"
      carryValues={carryValues}
      onDismiss={() => onDismiss?.()}
      onNavigate={onNavigate}
    />
  );
};

export default TnBToPageturners;
