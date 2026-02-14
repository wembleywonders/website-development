// src/hooks/useROVContext.ts
// React hook for ROV context detection and management

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
// Local type definitions (inlined because ../types/rovs was not found)
type CreatorSpace = string | null;
type PipelineStage = string | null;

export interface ROVQuickAction {
  id: string;
  label: string;
  action?: string;
}

/**
 * Ambient module declarations for '../services/rovs/ROVRegistry' are provided
 * further down in this file (with proper type imports) and should not be
 * duplicated here.
 */

export interface ROVContext {
  primaryROV?: ROVProfile | null;
  activeROVs: ROVProfile[];
  creatorSpace?: CreatorSpace | null;
  pipelineStage?: PipelineStage | null;
  isFirstVisit?: boolean;
}

/**
 * Removed ambient module augmentation for '../services/rovs/ROVRegistry' because
 * TypeScript cannot always resolve relative module names for augmentation in
 * certain project layouts; rely on the real module's exports or provide a
 * separate .d.ts file next to the implementation if explicit typing is needed.
 */

// Local ROVProfile type (inlined to avoid missing ../types/rovs import)
export interface ROVProfile {
  id: string;
  // Greeting texts used by the greetingService and UI
  greetings: {
    firstVisit: string;
    returning: string;
    contextual: Record<string, string>;
  };
  // Optional quick actions exposed by the ROV
  quickActions?: ROVQuickAction[];
  // Allow other optional metadata without causing type errors in this file
  [key: string]: any;
}

import { 
  ROV_REGISTRY, 
  getPrimaryROV, 
  getROVsForSpace, 
  getROVsForStage 
} from '../../../services/rovs/ROVRegistry';
import { greetingService } from '../../../services/rovs/greetingService';

interface UseROVContextReturn {
  /** Current ROV context */
  context: ROVContext;
  /** Primary ROV for current context */
  primaryROV: ROVProfile | null;
  /** All active ROVs for current context */
  activeROVs: ROVProfile[];
  /** Current creator space (if any) */
  creatorSpace: CreatorSpace | null;
  /** Current pipeline stage */
  pipelineStage: PipelineStage | null;
  /** Is this the user's first visit? */
  isFirstVisit: boolean;
  /** Select a specific ROV */
  selectROV: (rovId: string) => void;
  /** Currently selected ROV (may differ from primary) */
  selectedROV: ROVProfile | null;
  /** Get greeting for current context */
  getGreeting: () => string;
  /** Get contextual actions for current ROV */
  getActions: () => ROVQuickAction[];
  /** Record an interaction with current ROV */
  recordInteraction: (type: string, content: string) => void;
}

export function useROVContext(): UseROVContextReturn {
  const location = useLocation();
  const [selectedROVId, setSelectedROVId] = useState<string | null>(null);
  
  // Build context from current location
  const context = useMemo(() => {
    return greetingService.buildContext(location.pathname);
  }, [location.pathname]);
  
  // Get primary and active ROVs
  const primaryROV = context.primaryROV;
  const activeROVs = context.activeROVs;
  
  // Selected ROV (user override or primary)
  const selectedROV = useMemo(() => {
    if (selectedROVId && ROV_REGISTRY[selectedROVId]) {
      return ROV_REGISTRY[selectedROVId];
    }
    return primaryROV;
  }, [selectedROVId, primaryROV]);
  
  // Reset selection when context changes significantly
  useEffect(() => {
    setSelectedROVId(null);
  }, [context.creatorSpace, context.pipelineStage]);
  
  // Select a specific ROV
  const selectROV = useCallback((rovId: string) => {
    if (ROV_REGISTRY[rovId]) {
      setSelectedROVId(rovId);
    }
  }, []);
  
  // Get appropriate greeting
  const getGreeting = useCallback(() => {
    const rov = selectedROV || primaryROV;
    if (!rov) return '';
    
    if (context.isFirstVisit) {
      return rov.greetings.firstVisit;
    }
    
    // Check for contextual greeting
    const contextKey = context.creatorSpace || context.pipelineStage || '';
    if (contextKey && rov.greetings.contextual[contextKey]) {
      return rov.greetings.contextual[contextKey];
    }
    
    return rov.greetings.returning;
  }, [selectedROV, primaryROV, context]);
  
  // Get contextual actions
  const getActions = useCallback(() => {
    const rov = selectedROV || primaryROV;
    return rov?.quickActions || [];
  }, [selectedROV, primaryROV]);
  
  // Record interaction (for analytics/provenance)
  const recordInteraction = useCallback((type: string, content: string) => {
    const rov = selectedROV || primaryROV;
    if (!rov) return;
    
    // Could integrate with analytics service here
    console.log(`[ROV Interaction] ${rov.id}: ${type} - ${content}`);
    
    // Store in session for provenance trail
    const interactions = JSON.parse(
      sessionStorage.getItem('rov_interactions') || '[]'
    );
    interactions.push({
      rovId: rov.id,
      type,
      content,
      timestamp: new Date().toISOString(),
      path: location.pathname
    });
    sessionStorage.setItem('rov_interactions', JSON.stringify(interactions));
  }, [selectedROV, primaryROV, location.pathname]);
  
  return {
    context,
    primaryROV,
    activeROVs,
    creatorSpace: context.creatorSpace,
    pipelineStage: context.pipelineStage,
    isFirstVisit: context.isFirstVisit,
    selectROV,
    selectedROV,
    getGreeting,
    getActions,
    recordInteraction
  };
}

/**
 * Hook to check if a specific ROV should be active
 */
export function useIsROVActive(rovId: string): boolean {
  const { activeROVs } = useROVContext();
  return activeROVs.some(rov => rov.id === rovId);
}

/**
 * Hook to get a specific ROV's profile
 */
export function useROV(rovId: string): ROVProfile | null {
  return ROV_REGISTRY[rovId] || null;
}

/**
 * Hook for ROV handoff messaging
 */
export function useROVHandoff() {
  const { context } = useROVContext();
  const [lastROVId, setLastROVId] = useState<string | null>(null);
  
  useEffect(() => {
    const currentROVId = context.primaryROV?.id || null;
    
    if (lastROVId && currentROVId && lastROVId !== currentROVId) {
      // ROV changed - get handoff message
      const message = greetingService.getHandoffMessage(lastROVId, currentROVId);
      if (message) {
        // Could trigger a handoff animation/message here
        console.log(`[ROV Handoff] ${lastROVId} → ${currentROVId}: ${message}`);
      }
    }
    
    setLastROVId(currentROVId);
  }, [context.primaryROV, lastROVId]);
  
  return {
    previousROV: lastROVId ? ROV_REGISTRY[lastROVId] : null,
    currentROV: context.primaryROV
  };
}

export default useROVContext;
