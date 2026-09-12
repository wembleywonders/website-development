import React, { useState, useCallback } from 'react';
import {
  JourneyBridge as JourneyBridgeConfig,
  getBridgeById,
} from './journeyConfig';

/**
 * JourneyBridge.tsx — renders one cross-programme journey prompt.
 *
 * journeyConfig.ts already defines the *data* (JOURNEY_BRIDGES) and a type
 * also called JourneyBridge — aliased here as JourneyBridgeConfig to avoid
 * colliding with this component's own name, same pattern already fixed for
 * VoicePart/voiceRanges.
 *
 * This component is deliberately generic: TnBToRaydyo.tsx, TnBToRoots.tsx
 * etc. are thin wrappers that each render <JourneyBridge bridgeId="..." />
 * with their specific bridge id, rather than duplicating this logic six times.
 *
 * carryData is a list of field names (e.g. 'trackName', 'tempo') that the
 * originating room should have available in its own state — this component
 * doesn't know what those values ARE, only which keys to pass forward.
 */

export interface JourneyBridgeProps {
  bridgeId: string;
  /** The actual values for whatever fields this bridge's carryData names.
   *  e.g. { trackName: 'My Song', tempo: 120, style: 'afrobeats' } */
  carryValues?: Record<string, unknown>;
  onDismiss?: (bridgeId: string) => void;
  /** Called instead of default navigation, if the parent wants to handle it
   *  (e.g. router-based navigation rather than a hard link) */
  onNavigate?: (toPath: string, carryValues?: Record<string, unknown>) => void;
}

const JourneyBridge: React.FC<JourneyBridgeProps> = ({
  bridgeId,
  carryValues,
  onDismiss,
  onNavigate,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const bridge: JourneyBridgeConfig | undefined = getBridgeById(bridgeId);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.(bridgeId);
  }, [bridgeId, onDismiss]);

  const handleNavigate = useCallback(() => {
    if (!bridge) return;

    // Only forward the fields this bridge actually declares — never leak
    // unrelated state into the next programme.
    const filteredCarry = carryValues
      ? Object.fromEntries(
          bridge.carryData
            .filter((key) => key in carryValues)
            .map((key) => [key, carryValues[key]])
        )
      : undefined;

    if (onNavigate) {
      onNavigate(bridge.toPath, filteredCarry);
      return;
    }

    // Default: carry data via sessionStorage, keyed by bridge id, then
    // navigate. The receiving programme reads it on mount and clears it.
    if (filteredCarry && Object.keys(filteredCarry).length > 0) {
      sessionStorage.setItem(
        `journey-bridge:${bridge.id}`,
        JSON.stringify(filteredCarry)
      );
    }
    window.location.href = bridge.toPath;
  }, [bridge, carryValues, onNavigate]);

  if (!bridge || dismissed) return null;

  return (
    <div className="journey-bridge" role="complementary" aria-label="Programme suggestion">
      <button
        type="button"
        className="journey-bridge__dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss suggestion"
      >
        ×
      </button>

      <p className="journey-bridge__prompt">{bridge.mayaPrompt}</p>

      <button
        type="button"
        className="journey-bridge__cta"
        onClick={handleNavigate}
      >
        {bridge.ctaLabel}
      </button>
    </div>
  );
};

export default JourneyBridge;
