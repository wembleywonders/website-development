/**
 * Maya Unified Store
 * 
 * UPGRADED: Bridges the original 5-stage pedagogical system with the 
 * Children of Anansi ROV Framework for comprehensive creator support.
 * 
 * Manages:
 * - Pedagogical stage progression (1-5)
 * - Maya mode transitions (ACTIVE → WITNESS → PARTNER)
 * - ROV child routing and trust tracking
 * - Unified creator state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  // Unified state types
  UnifiedCreatorState,
  createDefaultUnifiedState,
  
  // Legacy types (for backward compatibility)
  MayaState,
  DEFAULT_MAYA_STATE,
  migrateToUnifiedState,
  
  // Core types
  MayaMode,
  MayaMessage,
  MayaMessageType,
  PedagogicalStage,
  QuietMomentTriggers,
  PatternInsight,
  ActiveChild,
  HandoffRecord,
  ChildTrustRelationship,
  CommunityStats,
  
  // Definitions and constants
  STAGE_DEFINITIONS,
  MAYA_MODE_DEFINITIONS,
  STAGE_MESSAGES,
  HANDOFF_MESSAGE,
  RE_ENTRY_MESSAGE,
  SESSION_END_PROMPTS,
  CHILD_RETURN_MESSAGES,
  PUSH_MESSAGES,
  
  // Helper functions
  isReadyForSilence,
  getMostTrustedChild,
  isReadyForStageProgression,
  getSuggestedStance,
  shouldMayaKeep,
  updateTrustScore,
  recordHandoff,
  progressToNextStage,
  getChildIntroduction,
  getChildReturnMessage,
  getRandomMessage
} from '../types/mayaTypes';

import type {
  ROVStance,
  MemberMood,
  KnowledgeDomain,
  HandoffLevel,
  OpenLoop,
  Interaction
} from '../../rov/types';

// ============================================
// STORE INTERFACE
// ============================================

interface MayaStore {
  isExpanded: any;
  userPreferences: any;
  hasUnread: any;
  silentObservations: any;
  // === Unified State ===
  state: UnifiedCreatorState;
  
  // === Initialization ===
  initializeCreator: (id: string, name: string, programmes?: string[]) => void;
  loadCreatorState: (state: UnifiedCreatorState) => void;
  
  // === Mode Transitions (Legacy + Enhanced) ===
  setMode: (mode: MayaMode) => void;
  checkQuietMomentTriggers: () => boolean;
  triggerHandoff: () => void;
  triggerReEntry: (patternId: string) => void;
  
  // === Stage Progression ===
  advanceStage: (newStage: PedagogicalStage, automatic: boolean, reason: string) => void;
  checkStageProgression: () => boolean;
  
  // === Quiet Moment Tracking (Legacy) ===
  trackAction: (actionType: 'tool_use' | 'layer_create' | 'undo_recovery' | 'direction_action') => void;
  trackProjectNamed: () => void;
  trackSuggestionRejected: () => void;
  trackErrorResolved: (timeToResolveMs: number) => void;
  
  // === ROV Integration (New) ===
  setActiveEntity: (entity: ActiveChild) => void;
  setCurrentStance: (stance: ROVStance) => void;
  setCurrentMood: (mood: MemberMood) => void;
  
  // Child routing
  routeToChild: (childId: ActiveChild, reason: string, topic: string) => void;
  returnToMaya: (fromChild: ActiveChild, outcome: 'completed' | 'ongoing' | 'abandoned' | 'referred') => void;
  routeBetweenSiblings: (fromChild: ActiveChild, toChild: ActiveChild, reason: string, topic: string) => void;
  
  // Trust management
  updateChildTrust: (childId: ActiveChild, delta: number) => void;
  recordPositiveExperience: (childId: ActiveChild) => void;
  recordNegativeExperience: (childId: ActiveChild) => void;
  getMostTrustedChild: () => ActiveChild | null;
  
  // Open loops
  openLoop: (childId: ActiveChild, topic: string, description: string) => void;
  closeLoop: (topic: string, outcome: string) => void;
  touchLoop: (topic: string) => void;
  
  // Development tracking
  updateDevelopmentStage: (domain: KnowledgeDomain, stage: 'early' | 'developing' | 'established' | 'multiplier') => void;
  recordCapability: (capability: string) => void;
  
  // ROV signals
  trackROVSignal: (signal: 'anticipatedQuestion' | 'selfValidated' | 'helpedOthers' | 'independentCompletion') => void;
  
  // === Maya's Three Questions ===
  recordMayaAssessment: (assessment: { wantsMost?: string; mostAfraid?: string; canHide?: string }) => void;
  getMayaAssessment: () => UnifiedCreatorState['mayaAssessment'];
  
  // === Silent Pattern Tracking ===
  recordToolUsed: (toolId: string) => void;
  recordFeatureAvoided: (featureId: string) => void;
  addPatternInsight: (observation: string, confidence: number, noticedBy?: ActiveChild, domain?: KnowledgeDomain) => void;
  shareInsight: (insightId: string) => void;
  recordPreferredChild: (childId: ActiveChild) => void;
  recordPreferredDomain: (domain: KnowledgeDomain) => void;
  
  // === Messages ===
  addMessage: (text: string, type: MayaMessageType, metadata?: MayaMessage['metadata']) => void;
  addChildIntroductionMessage: (childId: ActiveChild) => void;
  addChildReturnMessage: (childId: ActiveChild) => void;
  addPushMessage: () => void;
  addCommunityMirrorMessage: () => void;
  clearMessages: () => void;
  
  // === UI State ===
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
  markAsRead: () => void;
  
  // === Session Management ===
  startSession: () => void;
  endSession: () => void;
  recordTopicDiscussed: (topic: string) => void;
  
  // === Community Stats ===
  setCommunityStats: (stats: CommunityStats) => void;
  
  // === User Preferences ===
  setMayaEnabled: (enabled: boolean) => void;
  setShowHints: (show: boolean) => void;
  setReflectionPrompts: (enabled: boolean) => void;
  setCommunityMessages: (enabled: boolean) => void;
  setChallengeLevel: (level: 'gentle' | 'moderate' | 'rigorous') => void;
  setPreferredStance: (stance: ROVStance) => void;
  setPreferredChild: (childId: ActiveChild) => void;
  
  // === Helpers ===
  getCurrentStageDefinition: () => typeof STAGE_DEFINITIONS[PedagogicalStage];
  getCurrentModeDefinition: () => typeof MAYA_MODE_DEFINITIONS[MayaMode];
  getSessionEndPrompt: () => string;
  shouldShowInline: () => boolean;
  isProactive: () => boolean;
  shouldMayaKeep: () => boolean;
  getSuggestedStance: () => ROVStance;
  
  // === Export/Import ===
  exportState: () => UnifiedCreatorState;
  importState: (state: UnifiedCreatorState) => void;
  
  // === Reset ===
  resetMaya: () => void;
  
  // === Legacy Compatibility ===
  /** @deprecated Use state directly */
  currentStage: PedagogicalStage;
  /** @deprecated Use state directly */
  currentMode: MayaMode;
  /** @deprecated Use state.mayaMessages */
  messages: MayaMessage[];
  /** @deprecated Use state.quietTriggers */
  quietTriggers: QuietMomentTriggers;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useMayaStore = create<MayaStore>()(
  persist(
    (set, get) => ({
      // === Unified State ===
      state: createDefaultUnifiedState('default', 'Creator'),
      
      // === UI State Properties ===
      isExpanded: false,
      userPreferences: {},
      hasUnread: false,
      silentObservations: { insights: [], patterns: { preferredTools: [], avoidedFeatures: [], preferredChildren: [], preferredDomains: [] }, documentedCapabilities: [] },
      
      // === Legacy Compatibility Getters ===
      get currentStage() { return get().state.pedagogicalStage; },
      get currentMode() { return get().state.mayaMode; },
      get messages() { return get().state.mayaMessages; },
      get quietTriggers() { return get().state.quietTriggers; },
      
      // ==========================================
      // INITIALIZATION
      // ==========================================
      
      initializeCreator: (id: string, name: string, programmes: string[] = []) => {
        set({ state: createDefaultUnifiedState(id, name, programmes) });
      },
      
      loadCreatorState: (state: UnifiedCreatorState) => {
        set({ state });
      },
      
      // ==========================================
      // MODE TRANSITIONS
      // ==========================================
      
      setMode: (mode: MayaMode) => {
        set((s) => ({
          state: { ...s.state, mayaMode: mode, updatedAt: new Date() }
        }));
      },
      
      checkQuietMomentTriggers: () => {
        const { state } = get();
        if (state.quietMomentOccurred) return false;
        return isReadyForSilence(state.quietTriggers);
      },
      
      triggerHandoff: () => {
        const { addMessage, state } = get();
        
        addMessage(HANDOFF_MESSAGE.text, HANDOFF_MESSAGE.type);
        
        set((s) => ({
          state: {
            ...s.state,
            mayaMode: 'HANDOFF',
            quietMomentOccurred: true,
            quietMomentTimestamp: new Date(),
            updatedAt: new Date()
          }
        }));
        
        // Transition to WITNESS mode after brief delay
        setTimeout(() => {
          set((s) => ({
            state: { ...s.state, mayaMode: 'WITNESS', updatedAt: new Date() }
          }));
        }, 3000);
      },
      
      triggerReEntry: (patternId: string) => {
        const { addMessage, state } = get();
        
        const insight = state.silentObservations.insights.find(i => i.id === patternId);
        if (!insight) return;
        
        addMessage(RE_ENTRY_MESSAGE.text, RE_ENTRY_MESSAGE.type, { patternId });
        
        set((s) => ({
          state: {
            ...s.state,
            mayaMode: 'RE_ENTRY',
            updatedAt: new Date()
          }
        }));
      },
      
      // ==========================================
      // STAGE PROGRESSION
      // ==========================================
      
      advanceStage: (newStage: PedagogicalStage, automatic: boolean, reason: string) => {
        const { state, addMessage, checkQuietMomentTriggers, triggerHandoff } = get();
        
        if (newStage <= state.pedagogicalStage) return;
        
        console.log(`[Maya] Stage ${state.pedagogicalStage} → ${newStage}: ${reason} (${automatic ? 'auto' : 'manual'})`);
        
        // Get ignition moment message
        const ignitionMessages = STAGE_MESSAGES[newStage].ignitionMoment;
        const ignitionMoment = ignitionMessages.length > 0 ? getRandomMessage(ignitionMessages) : undefined;
        
        set((s) => ({
          state: progressToNextStage(s.state, ignitionMoment)
        }));
        
        // Add ignition message if available
        if (ignitionMoment) {
          addMessage(ignitionMoment, 'ignition');
        }
        
        // Stage 4 → check for quiet moment
        if (newStage === 4 && get().state.mayaMode === 'ACTIVE') {
          if (checkQuietMomentTriggers()) {
            triggerHandoff();
          }
        }
        
        // Stage 5 → PARTNER mode
        if (newStage === 5) {
          set((s) => ({
            state: { ...s.state, mayaMode: 'PARTNER', updatedAt: new Date() }
          }));
        }
      },
      
      checkStageProgression: () => {
        const { state, advanceStage } = get();
        
        if (isReadyForStageProgression(state)) {
          const nextStage = (state.pedagogicalStage + 1) as PedagogicalStage;
          advanceStage(nextStage, true, 'Automatic progression based on signals');
          return true;
        }
        return false;
      },
      
      // ==========================================
      // QUIET MOMENT TRACKING
      // ==========================================
      
      trackAction: (actionType) => {
        set((s) => {
          const triggers = { ...s.state.quietTriggers };
          
          switch (actionType) {
            case 'tool_use':
              triggers.selfDirectedActions.unpromptedToolUses += 1;
              break;
            case 'layer_create':
              triggers.selfDirectedActions.layerCreationsWithoutHint += 1;
              break;
            case 'undo_recovery':
              triggers.selfDirectedActions.undoRecoveries += 1;
              break;
            case 'direction_action':
              triggers.intentSignals.consistentDirection += 1;
              break;
          }
          
          return {
            state: { ...s.state, quietTriggers: triggers, updatedAt: new Date() }
          };
        });
        
        const { checkQuietMomentTriggers, triggerHandoff, state } = get();
        if (checkQuietMomentTriggers() && !state.quietMomentOccurred) {
          triggerHandoff();
        }
      },
      
      trackProjectNamed: () => {
        set((s) => ({
          state: {
            ...s.state,
            quietTriggers: {
              ...s.state.quietTriggers,
              intentSignals: {
                ...s.state.quietTriggers.intentSignals,
                namedProject: true
              }
            },
            updatedAt: new Date()
          }
        }));
        
        const { checkQuietMomentTriggers, triggerHandoff, state } = get();
        if (checkQuietMomentTriggers() && !state.quietMomentOccurred) {
          triggerHandoff();
        }
      },
      
      trackSuggestionRejected: () => {
        set((s) => ({
          state: {
            ...s.state,
            quietTriggers: {
              ...s.state.quietTriggers,
              intentSignals: {
                ...s.state.quietTriggers.intentSignals,
                rejectedSuggestion: true
              }
            },
            updatedAt: new Date()
          }
        }));
      },
      
      trackErrorResolved: (timeToResolveMs: number) => {
        set((s) => ({
          state: {
            ...s.state,
            quietTriggers: {
              ...s.state.quietTriggers,
              resilienceSignals: {
                errorEncountered: true,
                resolvedWithoutHelp: true,
                timeToRecoveryMs: timeToResolveMs,
                handledChallenge: true
              }
            },
            updatedAt: new Date()
          }
        }));
        
        const { checkQuietMomentTriggers, triggerHandoff, state } = get();
        if (checkQuietMomentTriggers() && !state.quietMomentOccurred) {
          triggerHandoff();
        }
      },
      
      // ==========================================
      // ROV INTEGRATION
      // ==========================================
      
      setActiveEntity: (entity: ActiveChild) => {
        set((s) => ({
          state: {
            ...s.state,
            activeEntity: entity,
            session: {
              ...s.state.session,
              childrenVisited: s.state.session.childrenVisited.includes(entity)
                ? s.state.session.childrenVisited
                : [...s.state.session.childrenVisited, entity]
            },
            updatedAt: new Date()
          }
        }));
      },
      
      setCurrentStance: (stance: ROVStance) => {
        set((s) => ({
          state: {
            ...s.state,
            currentStance: stance,
            session: {
              ...s.state.session,
              stancesUsed: s.state.session.stancesUsed.includes(stance)
                ? s.state.session.stancesUsed
                : [...s.state.session.stancesUsed, stance]
            },
            updatedAt: new Date()
          }
        }));
      },
      
      setCurrentMood: (mood: MemberMood) => {
        set((s) => ({
          state: { ...s.state, currentMood: mood, updatedAt: new Date() }
        }));
      },
      
      // --- Child Routing ---
      
      routeToChild: (childId: ActiveChild, reason: string, topic: string) => {
        const { state, addChildIntroductionMessage } = get();
        
        // Record the handoff
        const updatedState = recordHandoff(
          state,
          state.activeEntity,
          childId,
          'warmHandoff',
          reason,
          topic
        );
        
        set({ state: { ...updatedState, mayaMode: 'ROUTING' } });
        
        // Add introduction message
        addChildIntroductionMessage(childId);
      },
      
      returnToMaya: (fromChild: ActiveChild, outcome) => {
        const { addChildReturnMessage } = get();
        
        set((s) => ({
          state: {
            ...s.state,
            activeEntity: 'maya',
            mayaMode: 'RE_ENTRY',
            updatedAt: new Date()
          }
        }));
        
        // Add return message
        addChildReturnMessage(fromChild);
        
        // Update trust based on outcome
        if (outcome === 'completed') {
          get().recordPositiveExperience(fromChild);
        } else if (outcome === 'abandoned') {
          get().recordNegativeExperience(fromChild);
        }
      },
      
      routeBetweenSiblings: (fromChild: ActiveChild, toChild: ActiveChild, reason: string, topic: string) => {
        const { state } = get();
        
        const updatedState = recordHandoff(
          state,
          fromChild,
          toChild,
          'warmHandoff',
          reason,
          topic
        );
        
        // Inherit some trust from referring sibling
        const fromTrust = state.trustRelationships[fromChild]?.trustScore || 50;
        const inheritedTrust = Math.floor(fromTrust * 0.7);
        const currentToTrust = state.trustRelationships[toChild]?.trustScore || 50;
        const newToTrust = Math.max(currentToTrust, inheritedTrust);
        
        set({
          state: {
            ...updatedState,
            trustRelationships: {
              ...updatedState.trustRelationships,
              [toChild]: {
                ...updatedState.trustRelationships[toChild],
                trustScore: newToTrust
              }
            }
          }
        });
      },
      
      // --- Trust Management ---
      
      updateChildTrust: (childId: ActiveChild, delta: number) => {
        set((s) => ({
          state: updateTrustScore(s.state, childId, delta)
        }));
      },
      
      recordPositiveExperience: (childId: ActiveChild) => {
        get().updateChildTrust(childId, 5);
      },
      
      recordNegativeExperience: (childId: ActiveChild) => {
        get().updateChildTrust(childId, -10);
      },
      
      getMostTrustedChild: () => {
        return getMostTrustedChild(get().state);
      },
      
      // --- Open Loops ---
      
      openLoop: (childId: ActiveChild, topic: string, description: string) => {
        const loop: OpenLoop = {
          childId,
          topic,
          description,
          startedAt: new Date(),
          lastTouchedAt: new Date()
        };
        
        set((s) => ({
          state: {
            ...s.state,
            openLoops: [...s.state.openLoops.slice(-9), loop], // Keep max 10
            updatedAt: new Date()
          }
        }));
      },
      
      closeLoop: (topic: string, _outcome: string) => {
        set((s) => ({
          state: {
            ...s.state,
            openLoops: s.state.openLoops.filter(l => l.topic !== topic),
            updatedAt: new Date()
          }
        }));
      },
      
      touchLoop: (topic: string) => {
        set((s) => ({
          state: {
            ...s.state,
            openLoops: s.state.openLoops.map(l =>
              l.topic === topic ? { ...l, lastTouchedAt: new Date() } : l
            ),
            updatedAt: new Date()
          }
        }));
      },
      
      // --- Development Tracking ---
      
      updateDevelopmentStage: (domain: KnowledgeDomain, stage) => {
        set((s) => ({
          state: {
            ...s.state,
            developmentStages: {
              ...s.state.developmentStages,
              [domain]: stage
            },
            updatedAt: new Date()
          }
        }));
      },
      
      recordCapability: (capability: string) => {
        set((s) => ({
          state: {
            ...s.state,
            silentObservations: {
              ...s.state.silentObservations,
              documentedCapabilities: [
                ...s.state.silentObservations.documentedCapabilities,
                capability
              ]
            },
            updatedAt: new Date()
          }
        }));
      },
      
      // --- ROV Signals ---
      
      trackROVSignal: (signal) => {
        set((s) => ({
          state: {
            ...s.state,
            quietTriggers: {
              ...s.state.quietTriggers,
              rovSignals: {
                ...s.state.quietTriggers.rovSignals,
                [signal]: true
              }
            },
            updatedAt: new Date()
          }
        }));
        
        // Check for stage progression
        get().checkStageProgression();
      },
      
      // ==========================================
      // MAYA'S THREE QUESTIONS
      // ==========================================
      
      recordMayaAssessment: (assessment) => {
        set((s) => ({
          state: {
            ...s.state,
            mayaAssessment: {
              ...s.state.mayaAssessment,
              ...assessment,
              assessedAt: s.state.mayaAssessment?.assessedAt || new Date(),
              revisedAt: s.state.mayaAssessment ? new Date() : undefined
            },
            updatedAt: new Date()
          }
        }));
      },
      
      getMayaAssessment: () => {
        return get().state.mayaAssessment;
      },
      
      // ==========================================
      // SILENT PATTERN TRACKING
      // ==========================================
      
      recordToolUsed: (toolId: string) => {
        set((s) => {
          const tools = [...s.state.silentObservations.patterns.preferredTools];
          if (!tools.includes(toolId)) {
            tools.push(toolId);
          }
          return {
            state: {
              ...s.state,
              silentObservations: {
                ...s.state.silentObservations,
                patterns: {
                  ...s.state.silentObservations.patterns,
                  preferredTools: tools
                }
              },
              updatedAt: new Date()
            }
          };
        });
      },
      
      recordFeatureAvoided: (featureId: string) => {
        set((s) => {
          const features = [...s.state.silentObservations.patterns.avoidedFeatures];
          if (!features.includes(featureId)) {
            features.push(featureId);
          }
          return {
            state: {
              ...s.state,
              silentObservations: {
                ...s.state.silentObservations,
                patterns: {
                  ...s.state.silentObservations.patterns,
                  avoidedFeatures: features
                }
              },
              updatedAt: new Date()
            }
          };
        });
      },
      
      addPatternInsight: (observation: string, confidence: number, noticedBy?: ActiveChild, domain?: KnowledgeDomain) => {
        const insight: PatternInsight = {
          id: `insight_${Date.now()}`,
          observation,
          confidence,
          firstNoticed: new Date(),
          occurrences: 1,
          shared: false,
          noticedBy,
          domain
        };
        
        set((s) => ({
          state: {
            ...s.state,
            silentObservations: {
              ...s.state.silentObservations,
              insights: [...s.state.silentObservations.insights, insight]
            },
            updatedAt: new Date()
          }
        }));
        
        // If confidence is high enough in WITNESS mode, trigger re-entry
        if (confidence >= 0.8 && get().state.mayaMode === 'WITNESS') {
          get().triggerReEntry(insight.id);
        }
      },
      
      shareInsight: (insightId: string) => {
        set((s) => ({
          state: {
            ...s.state,
            silentObservations: {
              ...s.state.silentObservations,
              insights: s.state.silentObservations.insights.map(i =>
                i.id === insightId ? { ...i, shared: true } : i
              )
            },
            updatedAt: new Date()
          }
        }));
      },
      
      recordPreferredChild: (childId: ActiveChild) => {
        set((s) => {
          const children = [...s.state.silentObservations.patterns.preferredChildren];
          if (!children.includes(childId)) {
            children.push(childId);
          }
          return {
            state: {
              ...s.state,
              silentObservations: {
                ...s.state.silentObservations,
                patterns: {
                  ...s.state.silentObservations.patterns,
                  preferredChildren: children
                }
              },
              updatedAt: new Date()
            }
          };
        });
      },
      
      recordPreferredDomain: (domain: KnowledgeDomain) => {
        set((s) => {
          const domains = [...s.state.silentObservations.patterns.preferredDomains];
          if (!domains.includes(domain)) {
            domains.push(domain);
          }
          return {
            state: {
              ...s.state,
              silentObservations: {
                ...s.state.silentObservations,
                patterns: {
                  ...s.state.silentObservations.patterns,
                  preferredDomains: domains
                }
              },
              updatedAt: new Date()
            }
          };
        });
      },
      
      // ==========================================
      // MESSAGES
      // ==========================================
      
      addMessage: (text: string, type: MayaMessageType, metadata?: MayaMessage['metadata']) => {
        const { state } = get();
        
        const message: MayaMessage = {
          id: `msg_${Date.now()}`,
          text,
          type,
          timestamp: new Date(),
          stage: state.pedagogicalStage,
          mode: state.mayaMode,
          requiresResponse: ['reflection', 're-entry', 'session-end', 'three-questions'].includes(type),
          metadata: {
            ...metadata,
            childId: state.activeEntity !== 'maya' ? state.activeEntity : undefined,
            stance: state.currentStance || undefined
          }
        };
        
        set((s) => ({
          state: {
            ...s.state,
            mayaMessages: [...s.state.mayaMessages, message],
            session: {
              ...s.state.session,
              messageCount: s.state.session.messageCount + 1
            },
            updatedAt: new Date()
          }
        }));
      },
      
      addChildIntroductionMessage: (childId: ActiveChild) => {
        const { state, addMessage } = get();
        const introMessage = getChildIntroduction(state.pedagogicalStage, childId);
        addMessage(introMessage, 'child-introduction', { childId });
      },
      
      addChildReturnMessage: (childId: ActiveChild) => {
        const { addMessage } = get();
        const returnMessage = getChildReturnMessage(childId);
        addMessage(returnMessage, 'child-return', { childId });
      },
      
      addPushMessage: () => {
        const { state, addMessage } = get();
        const pushMessages = PUSH_MESSAGES[state.pedagogicalStage];
        const message = getRandomMessage(pushMessages);
        addMessage(message, 'push');
      },
      
      addCommunityMirrorMessage: () => {
        const { state, addMessage } = get();
        const mirrorMessages = STAGE_MESSAGES[state.pedagogicalStage].communityMirror;
        const message = getRandomMessage(mirrorMessages);
        addMessage(message, 'community-mirror');
        
        set((s) => ({
          state: {
            ...s.state,
            lastCommunityMirrorShown: new Date(),
            updatedAt: new Date()
          }
        }));
      },
      
      clearMessages: () => {
        set((s) => ({
          state: {
            ...s.state,
            mayaMessages: [],
            updatedAt: new Date()
          }
        }));
      },
      
      // ==========================================
      // UI STATE
      // ==========================================
      
      toggleExpanded: () => {
        // UI state not persisted in unified state, handled by component
      },
      
      setExpanded: (_expanded: boolean) => {
        // UI state not persisted in unified state, handled by component
      },
      
      markAsRead: () => {
        // UI state not persisted in unified state, handled by component
      },
      
      // ==========================================
      // SESSION MANAGEMENT
      // ==========================================
      
      startSession: () => {
        const now = new Date();
        set((s) => ({
          state: {
            ...s.state,
            session: {
              id: `session-${Date.now()}`,
              startedAt: now,
              lastActivityAt: now,
              messageCount: 0,
              topicsDiscussed: [],
              childrenVisited: [],
              handoffsThisSession: 0,
              stancesUsed: []
            },
            lastSessionAt: s.state.session.startedAt,
            totalSessionCount: s.state.totalSessionCount + 1,
            updatedAt: now
          }
        }));
      },
      
      endSession: () => {
        const { addMessage, state } = get();
        
        // Only show session-end reflection in appropriate modes
        if (
          ['WITNESS', 'PARTNER', 'RE_ENTRY'].includes(state.mayaMode) &&
          state.preferences.reflectionPromptsEnabled
        ) {
          const prompt = get().getSessionEndPrompt();
          addMessage(prompt, 'session-end');
        }
      },
      
      recordTopicDiscussed: (topic: string) => {
        set((s) => ({
          state: {
            ...s.state,
            session: {
              ...s.state.session,
              topicsDiscussed: s.state.session.topicsDiscussed.includes(topic)
                ? s.state.session.topicsDiscussed
                : [...s.state.session.topicsDiscussed, topic],
              currentTopic: topic,
              lastActivityAt: new Date()
            },
            updatedAt: new Date()
          }
        }));
      },
      
      // ==========================================
      // COMMUNITY STATS
      // ==========================================
      
      setCommunityStats: (stats: CommunityStats) => {
        set((s) => ({
          state: {
            ...s.state,
            communityStats: stats,
            updatedAt: new Date()
          }
        }));
      },
      
      // ==========================================
      // USER PREFERENCES
      // ==========================================
      
      setMayaEnabled: (enabled: boolean) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, mayaEnabled: enabled },
            updatedAt: new Date()
          }
        }));
      },
      
      setShowHints: (show: boolean) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, showHints: show },
            updatedAt: new Date()
          }
        }));
      },
      
      setReflectionPrompts: (enabled: boolean) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, reflectionPromptsEnabled: enabled },
            updatedAt: new Date()
          }
        }));
      },
      
      setCommunityMessages: (enabled: boolean) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, communityMessagesEnabled: enabled },
            updatedAt: new Date()
          }
        }));
      },
      
      setChallengeLevel: (level) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, challengeLevel: level },
            updatedAt: new Date()
          }
        }));
      },
      
      setPreferredStance: (stance: ROVStance) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, preferredStance: stance },
            updatedAt: new Date()
          }
        }));
      },
      
      setPreferredChild: (childId: ActiveChild) => {
        set((s) => ({
          state: {
            ...s.state,
            preferences: { ...s.state.preferences, preferredChild: childId },
            updatedAt: new Date()
          }
        }));
      },
      
      // ==========================================
      // HELPERS
      // ==========================================
      
      getCurrentStageDefinition: () => {
        return STAGE_DEFINITIONS[get().state.pedagogicalStage];
      },
      
      getCurrentModeDefinition: () => {
        return MAYA_MODE_DEFINITIONS[get().state.mayaMode];
      },
      
      getSessionEndPrompt: () => {
        const index = Math.floor(Math.random() * SESSION_END_PROMPTS.length);
        return SESSION_END_PROMPTS[index];
      },
      
      shouldShowInline: () => {
        const mode = get().state.mayaMode;
        return mode === 'ACTIVE' || mode === 'HANDOFF' || mode === 'ROUTING';
      },
      
      isProactive: () => {
        const modeDef = get().getCurrentModeDefinition();
        return modeDef.proactive;
      },
      
      shouldMayaKeep: () => {
        return shouldMayaKeep(get().state);
      },
      
      getSuggestedStance: () => {
        return getSuggestedStance(get().state);
      },
      
      // ==========================================
      // EXPORT/IMPORT
      // ==========================================
      
      exportState: () => {
        return get().state;
      },
      
      importState: (state: UnifiedCreatorState) => {
        set({ state });
      },
      
      // ==========================================
      // RESET
      // ==========================================
      
      resetMaya: () => {
        set({
          state: createDefaultUnifiedState('default', 'Creator')
        });
      }
    }),
    {
      name: 'maya-unified-store',
      partialize: (store) => ({
        state: store.state
      })
    }
  )
);

// ============================================
// CUSTOM HOOKS
// ============================================

/** Pedagogical stage hook */
export const useMayaStage = () => {
  const state = useMayaStore((s) => s.state);
  const stageDef = useMayaStore((s) => s.getCurrentStageDefinition());
  const advanceStage = useMayaStore((s) => s.advanceStage);
  
  return { 
    currentStage: state.pedagogicalStage, 
    stageDef, 
    advanceStage,
    stageHistory: state.stageHistory
  };
};

/** Maya mode hook */
export const useMayaMode = () => {
  const state = useMayaStore((s) => s.state);
  const modeDef = useMayaStore((s) => s.getCurrentModeDefinition());
  const shouldShowInline = useMayaStore((s) => s.shouldShowInline());
  const isProactive = useMayaStore((s) => s.isProactive());
  
  return { 
    currentMode: state.mayaMode, 
    modeDef, 
    shouldShowInline, 
    isProactive 
  };
};

/** Messages hook */
export const useMayaMessages = () => {
  const messages = useMayaStore((s) => s.state.mayaMessages);
  const addMessage = useMayaStore((s) => s.addMessage);
  const addPushMessage = useMayaStore((s) => s.addPushMessage);
  const addCommunityMirrorMessage = useMayaStore((s) => s.addCommunityMirrorMessage);
  const clearMessages = useMayaStore((s) => s.clearMessages);
  
  return { 
    messages, 
    addMessage, 
    addPushMessage,
    addCommunityMirrorMessage,
    clearMessages
  };
};

/** Tracking hook */
export const useMayaTracking = () => {
  const trackAction = useMayaStore((s) => s.trackAction);
  const trackProjectNamed = useMayaStore((s) => s.trackProjectNamed);
  const trackSuggestionRejected = useMayaStore((s) => s.trackSuggestionRejected);
  const trackErrorResolved = useMayaStore((s) => s.trackErrorResolved);
  const recordToolUsed = useMayaStore((s) => s.recordToolUsed);
  const trackROVSignal = useMayaStore((s) => s.trackROVSignal);
  
  return { 
    trackAction, 
    trackProjectNamed, 
    trackSuggestionRejected, 
    trackErrorResolved, 
    recordToolUsed,
    trackROVSignal
  };
};

/** ROV integration hook */
export const useMayaROV = () => {
  const state = useMayaStore((s) => s.state);
  const setActiveEntity = useMayaStore((s) => s.setActiveEntity);
  const setCurrentStance = useMayaStore((s) => s.setCurrentStance);
  const setCurrentMood = useMayaStore((s) => s.setCurrentMood);
  const routeToChild = useMayaStore((s) => s.routeToChild);
  const returnToMaya = useMayaStore((s) => s.returnToMaya);
  const routeBetweenSiblings = useMayaStore((s) => s.routeBetweenSiblings);
  const updateChildTrust = useMayaStore((s) => s.updateChildTrust);
  const getMostTrustedChild = useMayaStore((s) => s.getMostTrustedChild);
  const getSuggestedStance = useMayaStore((s) => s.getSuggestedStance);
  const shouldMayaKeep = useMayaStore((s) => s.shouldMayaKeep);
  
  return {
    activeEntity: state.activeEntity,
    currentStance: state.currentStance,
    currentMood: state.currentMood,
    trustRelationships: state.trustRelationships,
    developmentStages: state.developmentStages,
    setActiveEntity,
    setCurrentStance,
    setCurrentMood,
    routeToChild,
    returnToMaya,
    routeBetweenSiblings,
    updateChildTrust,
    getMostTrustedChild,
    getSuggestedStance,
    shouldMayaKeep
  };
};

/** Open loops hook */
export const useMayaOpenLoops = () => {
  const openLoops = useMayaStore((s) => s.state.openLoops);
  const openLoop = useMayaStore((s) => s.openLoop);
  const closeLoop = useMayaStore((s) => s.closeLoop);
  const touchLoop = useMayaStore((s) => s.touchLoop);
  
  return { openLoops, openLoop, closeLoop, touchLoop };
};

/** Community stats hook */
export const useMayaCommunity = () => {
  const communityStats = useMayaStore((s) => s.state.communityStats);
  const setCommunityStats = useMayaStore((s) => s.setCommunityStats);
  const lastCommunityMirrorShown = useMayaStore((s) => s.state.lastCommunityMirrorShown);
  
  return { communityStats, setCommunityStats, lastCommunityMirrorShown };
};

/** Maya's three questions hook */
export const useMayaAssessment = () => {
  const assessment = useMayaStore((s) => s.state.mayaAssessment);
  const recordAssessment = useMayaStore((s) => s.recordMayaAssessment);
  const needsAssessment = !assessment;
  
  return { assessment, recordAssessment, needsAssessment };
};

/** Session hook */
export const useMayaSession = () => {
  const session = useMayaStore((s) => s.state.session);
  const startSession = useMayaStore((s) => s.startSession);
  const endSession = useMayaStore((s) => s.endSession);
  const recordTopicDiscussed = useMayaStore((s) => s.recordTopicDiscussed);
  
  return { session, startSession, endSession, recordTopicDiscussed };
};

/** Preferences hook */
export const useMayaPreferences = () => {
  const preferences = useMayaStore((s) => s.state.preferences);
  const setMayaEnabled = useMayaStore((s) => s.setMayaEnabled);
  const setShowHints = useMayaStore((s) => s.setShowHints);
  const setReflectionPrompts = useMayaStore((s) => s.setReflectionPrompts);
  const setCommunityMessages = useMayaStore((s) => s.setCommunityMessages);
  const setChallengeLevel = useMayaStore((s) => s.setChallengeLevel);
  
  return {
    preferences,
    setMayaEnabled,
    setShowHints,
    setReflectionPrompts,
    setCommunityMessages,
    setChallengeLevel
  };
};

export default useMayaStore;