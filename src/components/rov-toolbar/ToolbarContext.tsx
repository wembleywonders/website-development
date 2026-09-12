// ToolbarContext.tsx
// Provides per-programme ROV toolbar configuration (suggestions, teach
// moments, listen prompt) to any ProgrammeROVToolbar mounted within it,
// and tracks the "active contexts" (e.g. 'has_rhythm') that a programme's
// own sandbox state feeds in as the member works.
//
// Composes with useROVToolbar.ts: a ProgrammeROVToolbar component should
// call useToolbarContext() to get { config, activeContexts }, then pass
// those straight into useROVToolbar({ programmeId: config.programmeId,
// suggestions: config.suggestions, ... }).

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ROVSuggestion, ROVTeachMoment } from './useROVToolbar';

export interface ROVToolbarConfig {
  programmeId: string;
  suggestions: ROVSuggestion[];
  teachMoments: ROVTeachMoment[];
  getListenPrompt?: (activeContexts: string[]) => string;
}

interface ToolbarContextValue {
  config: ROVToolbarConfig;
  activeContexts: string[];
  /** Mark a context as true — e.g. call when the sandbox detects the
   *  member now has a rhythm: addContext('has_rhythm'). Idempotent. */
  addContext: (context: string) => void;
  removeContext: (context: string) => void;
  setContexts: (contexts: string[]) => void;
  clearContexts: () => void;
}

const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export interface ToolbarProviderProps {
  config: ROVToolbarConfig;
  initialContexts?: string[];
  children: React.ReactNode;
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({
  config,
  initialContexts = [],
  children,
}) => {
  const [activeContexts, setActiveContexts] = useState<string[]>(initialContexts);

  const addContext = useCallback((context: string) => {
    setActiveContexts((prev) => (prev.includes(context) ? prev : [...prev, context]));
  }, []);

  const removeContext = useCallback((context: string) => {
    setActiveContexts((prev) => prev.filter((c) => c !== context));
  }, []);

  const setContexts = useCallback((contexts: string[]) => {
    setActiveContexts(contexts);
  }, []);

  const clearContexts = useCallback(() => {
    setActiveContexts([]);
  }, []);

  const value = useMemo<ToolbarContextValue>(
    () => ({ config, activeContexts, addContext, removeContext, setContexts, clearContexts }),
    [config, activeContexts, addContext, removeContext, setContexts, clearContexts]
  );

  return <ToolbarContext.Provider value={value}>{children}</ToolbarContext.Provider>;
};

/**
 * useToolbarContext — consume the nearest ToolbarProvider.
 * Throws clearly if used outside one, rather than silently returning
 * undefined and producing a confusing downstream crash in
 * ProgrammeROVToolbar or useROVToolbar.
 */
export function useToolbarContext(): ToolbarContextValue {
  const ctx = useContext(ToolbarContext);
  if (!ctx) {
    throw new Error(
      'useToolbarContext must be used within a <ToolbarProvider>. ' +
        'Wrap the programme page (or sandbox) that renders ProgrammeROVToolbar.'
    );
  }
  return ctx;
}

export default ToolbarContext;
