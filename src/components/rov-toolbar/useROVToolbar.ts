// useROVToolbar.ts
// Generic ROV toolbar state/logic hook — reusable across all thirteen
// programmes. Generalizes the confirmed pattern already proven in
// trubble-n-bass/maya-toolbar/MayaMusicToolbar.tsx (mode state, expand/
// dismiss, Ctrl+M shortcut, context-filtered suggestions, trigger-keyed
// teach moments) but takes its data as parameters instead of hardcoding
// TnB-specific concepts. ProgrammeROVToolbar.tsx (sibling, still empty)
// is expected to consume this hook and supply each programme's own
// suggestions/teach content via ToolbarContext.tsx (also still empty).

import { useState, useEffect, useCallback, useMemo } from 'react';

export type ROVToolbarMode = 'listen' | 'suggest' | 'teach';

export interface ROVSuggestion {
  id: string;
  text: string;
  action: string;
  /** Which active context this suggestion requires to be shown, e.g.
   *  'has_rhythm'. Omit to always show (subject to the 3-item cap). */
  context?: string;
}

export interface ROVTeachMoment {
  id: string;
  /** Matches an entry in activeContexts or a `field:value` trigger string,
   *  e.g. 'style:gospel' — mirrors MayaMusicToolbar's trigger convention. */
  trigger: string;
  title: string;
  explanation: string;
  tradition?: string;
}

export interface UseROVToolbarOptions {
  programmeId: string;
  suggestions?: ROVSuggestion[];
  teachMoments?: ROVTeachMoment[];
  /** Contexts currently true for this session, e.g. ['has_rhythm']. */
  activeContexts?: string[];
  /** Called to produce the Listen-mode message; falls back to a generic one. */
  getListenPrompt?: (activeContexts: string[]) => string;
  onSuggestionAccept?: (suggestion: ROVSuggestion) => void;
  maxVisibleSuggestions?: number;
}

const DEFAULT_LISTEN_PROMPT = 'I\u2019m here if you need me \u2014 just say the word.';
const MAX_SUGGESTIONS_DEFAULT = 3;

export function useROVToolbar(options: UseROVToolbarOptions) {
  const {
    programmeId,
    suggestions = [],
    teachMoments = [],
    activeContexts = [],
    getListenPrompt,
    onSuggestionAccept,
    maxVisibleSuggestions = MAX_SUGGESTIONS_DEFAULT,
  } = options;

  const [mode, setMode] = useState<ROVToolbarMode>('listen');
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentTeach, setCurrentTeach] = useState<ROVTeachMoment | null>(null);

  // Ctrl+M toggles the toolbar, same shortcut as MayaMusicToolbar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.ctrlKey) {
        e.preventDefault();
        setIsExpanded((x) => !x);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Load a matching teach moment whenever the active contexts change —
  // mirrors MayaMusicToolbar's style-change effect, generalized to any
  // trigger string rather than just 'style:*'.
  useEffect(() => {
    if (activeContexts.length === 0) return;
    const match = teachMoments.find((t) => activeContexts.includes(t.trigger));
    if (match) setCurrentTeach(match);
  }, [activeContexts, teachMoments]);

  const visibleSuggestions = useMemo(() => {
    return suggestions
      .filter((s) => !s.context || activeContexts.includes(s.context))
      .slice(0, maxVisibleSuggestions);
  }, [suggestions, activeContexts, maxVisibleSuggestions]);

  const listenPrompt = useMemo(() => {
    if (getListenPrompt) return getListenPrompt(activeContexts);
    return DEFAULT_LISTEN_PROMPT;
  }, [getListenPrompt, activeContexts]);

  const toggleExpanded = useCallback(() => setIsExpanded((x) => !x), []);

  const dismiss = useCallback(() => setDismissed(true), []);
  const revive = useCallback(() => setDismissed(false), []);

  const selectMode = useCallback((m: ROVToolbarMode) => {
    setMode(m);
    setIsExpanded(true);
  }, []);

  const acceptSuggestion = useCallback(
    (suggestion: ROVSuggestion) => {
      onSuggestionAccept?.(suggestion);
    },
    [onSuggestionAccept]
  );

  const requestTeach = useCallback((moment: ROVTeachMoment) => {
    setCurrentTeach(moment);
  }, []);

  return {
    programmeId,
    mode,
    isExpanded,
    dismissed,
    currentTeach,
    visibleSuggestions,
    listenPrompt,
    toggleExpanded,
    dismiss,
    revive,
    selectMode,
    acceptSuggestion,
    requestTeach,
  };
}
