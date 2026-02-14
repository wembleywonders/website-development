/**
 * useAuntieAnansiArchivist Hook
 * =============================
 * 
 * React hook for integrating Auntie Anansi Archivist Mode
 * into components. Handles state management, conversation
 * history, and cross-ROV consultations.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  auntieAnansiArchivistService,
  SERIES_METADATA,
} from '../systems/rovs/personalities/auntie-anansi';
import type {
  ArchivistProfile,
  ArchivistModePhase,
  AuntieAnansiResponse,
  InterviewSession,
  CrossROVRequest,
} from '../types/rovs/archivist.types';
import type { InterviewSeries } from '../types/rovs/interviews';

// ============================================
// HOOK TYPES
// ============================================

interface UseAuntieAnansiArchivistOptions {
  profile: ArchivistProfile;
  onCrossROVRequest?: (request: CrossROVRequest) => void;
  onWellbeingAlert?: (level: 'check-in' | 'concern' | 'urgent', reason: string) => void;
}

interface ConversationMessage {
  id: string;
  role: 'archivist' | 'auntie';
  content: string;
  timestamp: Date;
  response?: AuntieAnansiResponse;
}

interface UseAuntieAnansiArchivistReturn {
  // State
  isInitialised: boolean;
  currentPhase: ArchivistModePhase;
  messages: ConversationMessage[];
  isProcessing: boolean;
  lastResponse: AuntieAnansiResponse | null;
  
  // Actions
  sendMessage: (message: string) => Promise<AuntieAnansiResponse>;
  startSession: (session: InterviewSession) => AuntieAnansiResponse;
  endSession: () => AuntieAnansiResponse;
  setPhase: (phase: ArchivistModePhase) => void;
  clearHistory: () => void;
  
  // Helpers
  getSeriesInfo: (series: InterviewSeries) => typeof SERIES_METADATA[InterviewSeries];
  getInterviewTechniques: () => typeof import('../systems/rovs/personalities/auntie-anansi').INTERVIEW_TECHNIQUES;
  getDifficultMomentHelp: (situation: string) => unknown;
}

// ============================================
// HOOK IMPLEMENTATION
// ============================================

export const useAuntieAnansiArchivist = (
  options: UseAuntieAnansiArchivistOptions
): UseAuntieAnansiArchivistReturn => {
  const { profile, onCrossROVRequest, onWellbeingAlert } = options;
  
  // State
  const [isInitialised, setIsInitialised] = useState(false);
  const [currentPhase, setCurrentPhaseState] = useState<ArchivistModePhase>('onboarding');
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<AuntieAnansiResponse | null>(null);
  
  // Initialise on mount
  useEffect(() => {
    if (!isInitialised && profile) {
      const response = auntieAnansiArchivistService.initialise(profile);
      
      setMessages([{
        id: generateId(),
        role: 'auntie',
        content: response.message,
        timestamp: new Date(),
        response,
      }]);
      
      setCurrentPhaseState(auntieAnansiArchivistService.getPhase());
      setLastResponse(response);
      setIsInitialised(true);
    }
  }, [profile, isInitialised]);
  
  // Handle cross-ROV requests
  const handleCrossROV = useCallback((response: AuntieAnansiResponse) => {
    if (response.crossROVHandoff && onCrossROVRequest) {
      onCrossROVRequest(response.crossROVHandoff);
    }
  }, [onCrossROVRequest]);
  
  // Handle wellbeing alerts
  const handleWellbeing = useCallback((response: AuntieAnansiResponse) => {
    if (response.wellbeingFlag && onWellbeingAlert) {
      onWellbeingAlert(response.wellbeingFlag.level, response.wellbeingFlag.reason);
    }
  }, [onWellbeingAlert]);
  
  // Send message
  const sendMessage = useCallback(async (message: string): Promise<AuntieAnansiResponse> => {
    setIsProcessing(true);
    
    // Add user message
    const userMessage: ConversationMessage = {
      id: generateId(),
      role: 'archivist',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Process with service (simulated async for UI feedback)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const response = auntieAnansiArchivistService.processMessage(message);
    
    // Add response
    const auntieMessage: ConversationMessage = {
      id: generateId(),
      role: 'auntie',
      content: response.message,
      timestamp: new Date(),
      response,
    };
    setMessages(prev => [...prev, auntieMessage]);
    
    // Update state
    setCurrentPhaseState(auntieAnansiArchivistService.getPhase());
    setLastResponse(response);
    setIsProcessing(false);
    
    // Handle side effects
    handleCrossROV(response);
    handleWellbeing(response);
    
    return response;
  }, [handleCrossROV, handleWellbeing]);
  
  // Start interview session
  const startSession = useCallback((session: InterviewSession): AuntieAnansiResponse => {
    const response = auntieAnansiArchivistService.startSession(session);
    
    setMessages(prev => [...prev, {
      id: generateId(),
      role: 'auntie',
      content: response.message,
      timestamp: new Date(),
      response,
    }]);
    
    setCurrentPhaseState('pre-interview');
    setLastResponse(response);
    
    return response;
  }, []);
  
  // End interview session
  const endSession = useCallback((): AuntieAnansiResponse => {
    const response = auntieAnansiArchivistService.endSession();
    
    setMessages(prev => [...prev, {
      id: generateId(),
      role: 'auntie',
      content: response.message,
      timestamp: new Date(),
      response,
    }]);
    
    setCurrentPhaseState('post-interview');
    setLastResponse(response);
    
    return response;
  }, []);
  
  // Set phase manually
  const setPhase = useCallback((phase: ArchivistModePhase) => {
    auntieAnansiArchivistService.setPhase(phase);
    setCurrentPhaseState(phase);
  }, []);
  
  // Clear history
  const clearHistory = useCallback(() => {
    auntieAnansiArchivistService.clearHistory();
    setMessages([]);
  }, []);
  
  // Helpers
  const getSeriesInfo = useCallback((series: InterviewSeries) => {
    return SERIES_METADATA[series];
  }, []);
  
  const getInterviewTechniques = useCallback(() => {
    const { INTERVIEW_TECHNIQUES } = require('../systems/rovs/personalities/auntie-anansi');
    return INTERVIEW_TECHNIQUES;
  }, []);
  
  const getDifficultMomentHelp = useCallback((situation: string) => {
    const { DIFFICULT_MOMENT_GUIDANCE } = require('../systems/rovs/personalities/auntie-anansi');
    return DIFFICULT_MOMENT_GUIDANCE[situation] || null;
  }, []);
  
  return {
    // State
    isInitialised,
    currentPhase,
    messages,
    isProcessing,
    lastResponse,
    
    // Actions
    sendMessage,
    startSession,
    endSession,
    setPhase,
    clearHistory,
    
    // Helpers
    getSeriesInfo,
    getInterviewTechniques,
    getDifficultMomentHelp,
  };
};

// ============================================
// UTILITY
// ============================================

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default useAuntieAnansiArchivist;