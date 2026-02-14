/**
 * USE ROV HOOK
 * 
 * Manages ROV state and interactions.
 * Handles ROV selection, context, and session management.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import { useState, useCallback, useMemo } from 'react';
import { ROVId, ROV_COMPONENTS, getROVForProgramme } from '../rovs';

// ============================================================
// TYPES
// ============================================================

export interface ROVSession {
  rovId: ROVId;
  startedAt: string;
  context: ROVContext;
  history: ROVInteraction[];
}

export interface ROVContext {
  creatorId: string;
  programme: string;
  currentTask?: string;
  sessionGoal?: string;
  previousInteractions?: number;
}

export interface ROVInteraction {
  timestamp: string;
  type: 'task_selected' | 'step_completed' | 'resource_viewed' | 'template_used';
  data: Record<string, any>;
}

export interface UseROVReturn {
  activeROV: ROVId | null;
  session: ROVSession | null;
  selectROV: (rovId: ROVId, context?: Partial<ROVContext>) => void;
  closeROV: () => void;
  logInteraction: (type: ROVInteraction['type'], data: Record<string, any>) => void;
  getRecommendedROVs: (programme: string, salesCount: number) => ROVId[];
  ROVComponent: React.ComponentType<any> | null;
}

// ============================================================
// RECOMMENDATION LOGIC
// ============================================================

function getRecommendations(programme: string, salesCount: number): ROVId[] {
  const recommendations: ROVId[] = [];
  
  // Programme-specific production ROV
  const programmeROV = getROVForProgramme(programme);
  if (programmeROV) {
    recommendations.push(programmeROV);
  }
  
  // Business ROVs based on sales stage
  if (salesCount === 0) {
    recommendations.push('marketing-coach', 'portfolio-builder');
  } else if (salesCount < 5) {
    recommendations.push('milestone-coach', 'client-comms');
  } else {
    recommendations.push('finance-guide', 'collab-finder');
  }
  
  // Always include Maya as fallback
  if (!recommendations.includes('maya')) {
    recommendations.push('maya');
  }
  
  return recommendations.slice(0, 4);
}

// ============================================================
// HOOK
// ============================================================

export function useROV(defaultContext?: Partial<ROVContext>): UseROVReturn {
  const [activeROV, setActiveROV] = useState<ROVId | null>(null);
  const [session, setSession] = useState<ROVSession | null>(null);
  
  // Select and activate a ROV
  const selectROV = useCallback((rovId: ROVId, context?: Partial<ROVContext>) => {
    const fullContext: ROVContext = {
      creatorId: defaultContext?.creatorId || 'anonymous',
      programme: defaultContext?.programme || 'unknown',
      ...context
    };
    
    setActiveROV(rovId);
    setSession({
      rovId,
      startedAt: new Date().toISOString(),
      context: fullContext,
      history: []
    });
    
    // Track ROV selection
    console.log(`[ROV] Selected: ${rovId}`, fullContext);
  }, [defaultContext]);
  
  // Close active ROV
  const closeROV = useCallback(() => {
    if (session) {
      // Could save session to history here
      console.log(`[ROV] Closed: ${session.rovId}`, {
        duration: Date.now() - new Date(session.startedAt).getTime(),
        interactions: session.history.length
      });
    }
    
    setActiveROV(null);
    setSession(null);
  }, [session]);
  
  // Log interaction within session
  const logInteraction = useCallback((
    type: ROVInteraction['type'],
    data: Record<string, any>
  ) => {
    if (!session) return;
    
    const interaction: ROVInteraction = {
      timestamp: new Date().toISOString(),
      type,
      data
    };
    
    setSession(prev => prev ? {
      ...prev,
      history: [...prev.history, interaction]
    } : null);
    
    console.log(`[ROV] Interaction:`, interaction);
  }, [session]);
  
  // Get recommended ROVs for current state
  const getRecommendedROVs = useCallback((programme: string, salesCount: number) => {
    return getRecommendations(programme, salesCount);
  }, []);
  
  // Get the active ROV component
  const ROVComponent = useMemo(() => {
    if (!activeROV) return null;
    return ROV_COMPONENTS[activeROV] || null;
  }, [activeROV]);
  
  return {
    activeROV,
    session,
    selectROV,
    closeROV,
    logInteraction,
    getRecommendedROVs,
    ROVComponent
  };
}

export default useROV;