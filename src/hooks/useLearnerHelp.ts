/**
 * useLearnerHelp
 * ==============
 * The hook sandboxes call at trigger points.
 * 
 * Usage:
 *   const { onLearnerNeedsHelp, activeHelp, dismissHelp, openTutorial } =
 *     useLearnerHelp('trubble-n-bass', 'concept-room');
 * 
 *   // At a trigger point:
 *   onLearnerNeedsHelp('arrange-tab-first-open');
 * 
 *   // With context:
 *   onLearnerNeedsHelp('diagnostic-result-diy-true', {
 *     currentContent: { type: 'result', id: 'result_bearing', label: 'Drum bearing' }
 *   });
 */

import { useCallback, useRef, useState } from 'react';
import { resolveHelp, shouldFireTrigger } from '../services/learnerHelp/HelpResolver';
import type {
  LearnerHelpContext,
  HelpResponse,
  LearnerHelpState,
} from '../types/learnerHelp';
import type { Programme } from '../types/tutorial';

export function useLearnerHelp(programme: Programme, sandbox: string) {
  const [activeHelp, setActiveHelp] = useState<HelpResponse | null>(null);
  const [openTutorial, setOpenTutorial] = useState<{ id: string; step: number } | null>(null);
  const firedTriggersRef = useRef<Set<string>>(new Set());

  /**
   * Fire a trigger point. The resolver maps context → response.
   * Won't fire the same trigger twice in a session unless allowRepeat is set.
   */
  const onLearnerNeedsHelp = useCallback((
    triggerPoint: string,
    partialContext?: Partial<Omit<LearnerHelpContext, 'programme' | 'sandbox' | 'triggerPoint'>>,
    opts?: { allowRepeat?: boolean }
  ) => {
    if (!shouldFireTrigger(triggerPoint, firedTriggersRef.current, opts)) return;

    firedTriggersRef.current.add(triggerPoint);

    const ctx: LearnerHelpContext = {
      programme,
      sandbox,
      triggerPoint,
      ...partialContext,
    };

    const response = resolveHelp(ctx);
    if (response) {
      setActiveHelp(response);
    }
  }, [programme, sandbox]);

  /**
   * Dismiss the help panel.
   */
  const dismissHelp = useCallback(() => {
    setActiveHelp(null);
  }, []);

  /**
   * Open a tutorial at a specific step.
   * Called by the help panel's primary CTA.
   */
  const openTutorialAt = useCallback((id: string, step = 0) => {
    setOpenTutorial({ id, step });
    setActiveHelp(null);
  }, []);

  /**
   * Close the tutorial viewer.
   */
  const closeTutorial = useCallback(() => {
    setOpenTutorial(null);
  }, []);

  /**
   * Reset all fired triggers — use at session start or programme switch.
   */
  const resetTriggers = useCallback(() => {
    firedTriggersRef.current = new Set();
    setActiveHelp(null);
    setOpenTutorial(null);
  }, []);

  return {
    onLearnerNeedsHelp,
    activeHelp,
    dismissHelp,
    openTutorial,
    openTutorialAt,
    closeTutorial,
    resetTriggers,
  };
}
