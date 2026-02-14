// src/services/rovs/ROVContext.ts
// ROV Context Manager - Tracks creator relationships, development, and state
// Maintains the context needed for trust-preserving, progressive engagement

import type {
  MemberContext,
  CreatorDevelopmentStage,
  MemberMood,
  OpenLoop,
  Interaction,
  KnowledgeDomain,
  ROVStance
} from '../../rov/types';

// ============================================
// TYPES
// ============================================

export interface ROVContextState {
  /** Creator's unique identifier */
  creatorId: string;
  
  /** Creator's display name */
  name: string;
  
  /** When they first joined */
  memberSince: Date;
  
  /** Programmes they've engaged with */
  programmes: string[];
  
  /** Development stage per domain/child */
  developmentStages: Record<string, CreatorDevelopmentStage>;
  
  /** Trust scores with each child (0-100) */
  trustRelationships: Record<string, number>;
  
  /** Capabilities they've demonstrated */
  documentedCapabilities: string[];
  
  /** Current open work items */
  openLoops: OpenLoop[];
  
  /** Recent interaction history */
  recentInteractions: Interaction[];
  
  /** Current emotional state (if detected) */
  currentMood?: MemberMood;
  
  /** Last child they interacted with */
  lastChild?: string;
  
  /** Whether initial needs assessment is complete */
  needsAssessed: boolean;
  
  /** Maya's three questions responses (if captured) */
  mayaAssessment?: {
    wantsMost?: string;
    mostAfraid?: string;
    canHide?: string;
    assessedAt: Date;
  };
  
  /** Session-specific state */
  session: {
    startedAt: Date;
    currentChild?: string;
    currentStance?: ROVStance;
    messageCount: number;
    topicsDiscussed: string[];
    handoffsThisSession: number;
  };
  
  /** Last updated timestamp */
  updatedAt: Date;
}

export interface ContextUpdateEvent {
  type: 
    | 'interaction'
    | 'handoff'
    | 'capability_demonstrated'
    | 'mood_detected'
    | 'stage_progression'
    | 'loop_opened'
    | 'loop_closed'
    | 'trust_updated'
    | 'session_started'
    | 'session_ended';
  payload: Record<string, unknown>;
  timestamp: Date;
}

export interface ProgressionSignal {
  domain: string;
  signal: string;
  strength: 'weak' | 'moderate' | 'strong';
  timestamp: Date;
}

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_TRUST_SCORE = 50;
const TRUST_INCREMENT_POSITIVE = 5;
const TRUST_INCREMENT_NEGATIVE = -10;
const MAX_TRUST_SCORE = 100;
const MIN_TRUST_SCORE = 0;

const DEVELOPMENT_STAGE_ORDER: CreatorDevelopmentStage[] = [
  'early',
  'developing', 
  'established',
  'multiplier'
];

const PROGRESSION_THRESHOLDS = {
  early_to_developing: {
    interactions: 5,
    capabilities: 2,
    trustScore: 60
  },
  developing_to_established: {
    interactions: 15,
    capabilities: 5,
    trustScore: 75
  },
  established_to_multiplier: {
    interactions: 30,
    capabilities: 10,
    trustScore: 90,
    hasHelpedOthers: true
  }
};

const MAX_RECENT_INTERACTIONS = 50;
const MAX_OPEN_LOOPS = 10;

// ============================================
// ROV CONTEXT CLASS
// ============================================

export class ROVContext {
  private state: ROVContextState;
  private eventLog: ContextUpdateEvent[] = [];
  private progressionSignals: ProgressionSignal[] = [];
  
  constructor(creatorId: string, name: string, existingState?: Partial<ROVContextState>) {
    this.state = {
      creatorId,
      name,
      memberSince: existingState?.memberSince || new Date(),
      programmes: existingState?.programmes || [],
      developmentStages: existingState?.developmentStages || {},
      trustRelationships: existingState?.trustRelationships || {},
      documentedCapabilities: existingState?.documentedCapabilities || [],
      openLoops: existingState?.openLoops || [],
      recentInteractions: existingState?.recentInteractions || [],
      currentMood: existingState?.currentMood,
      lastChild: existingState?.lastChild,
      needsAssessed: existingState?.needsAssessed || false,
      mayaAssessment: existingState?.mayaAssessment,
      session: {
        startedAt: new Date(),
        messageCount: 0,
        topicsDiscussed: [],
        handoffsThisSession: 0
      },
      updatedAt: new Date()
    };
  }

  // ============================================
  // GETTERS
  // ============================================

  /**
   * Get the full state for serialization
   */
  getState(): ROVContextState {
    return { ...this.state };
  }

  /**
   * Get MemberContext for prompt building
   */
  getMemberContext(): MemberContext {
    return {
      id: this.state.creatorId,
      name: this.state.name,
      memberSince: this.state.memberSince,
      programmes: this.state.programmes,
      recentInteractions: this.state.recentInteractions.slice(0, 10),
      currentMood: this.state.currentMood,
      needsAssessed: this.state.needsAssessed,
      lastChild: this.state.lastChild,
      openLoops: this.state.openLoops,
      developmentStage: this.state.developmentStages,
      trustRelationships: this.state.trustRelationships,
      documentedCapabilities: this.state.documentedCapabilities
    };
  }

  /**
   * Get development stage for a specific domain/child
   */
  getDevelopmentStage(domainOrChildId: string): CreatorDevelopmentStage {
    return this.state.developmentStages[domainOrChildId] || 'early';
  }

  /**
   * Get trust score with a specific child
   */
  getTrustScore(childId: string): number {
    return this.state.trustRelationships[childId] ?? DEFAULT_TRUST_SCORE;
  }

  /**
   * Get the child they trust most
   */
  getMostTrustedChild(): string | null {
    const entries = Object.entries(this.state.trustRelationships);
    if (entries.length === 0) return null;
    
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }

  /**
   * Get open loops for a specific child
   */
  getOpenLoops(childId?: string): OpenLoop[] {
    if (!childId) return this.state.openLoops;
    return this.state.openLoops.filter(loop => loop.childId === childId);
  }

  /**
   * Check if this is a returning creator (vs first time)
   */
  isReturning(): boolean {
    return this.state.recentInteractions.length > 0;
  }

  /**
   * Get time since last interaction
   */
  getTimeSinceLastInteraction(): number | null {
    if (this.state.recentInteractions.length === 0) return null;
    
    const lastInteraction = this.state.recentInteractions[0];
    return Date.now() - lastInteraction.timestamp.getTime();
  }

  /**
   * Check if they've been away a while (more than 2 weeks)
   */
  hasBeenAwayLong(): boolean {
    const timeSince = this.getTimeSinceLastInteraction();
    if (timeSince === null) return false;
    
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    return timeSince > twoWeeks;
  }

  // ============================================
  // INTERACTION TRACKING
  // ============================================

  /**
   * Record an interaction with a child
   */
  recordInteraction(
    childId: string,
    topic: string,
    outcome: Interaction['outcome'],
    stanceUsed?: ROVStance,
    notes?: string
  ): void {
    const interaction: Interaction = {
      timestamp: new Date(),
      childId,
      topic,
      outcome,
      stanceUsed,
      notes
    };

    // Add to recent interactions (most recent first)
    this.state.recentInteractions.unshift(interaction);
    
    // Trim if too many
    if (this.state.recentInteractions.length > MAX_RECENT_INTERACTIONS) {
      this.state.recentInteractions = this.state.recentInteractions.slice(0, MAX_RECENT_INTERACTIONS);
    }

    // Update last child
    this.state.lastChild = childId;

    // Update session
    this.state.session.messageCount++;
    this.state.session.currentChild = childId;
    this.state.session.currentStance = stanceUsed;
    if (!this.state.session.topicsDiscussed.includes(topic)) {
      this.state.session.topicsDiscussed.push(topic);
    }

    // Update trust based on outcome
    if (outcome === 'completed') {
      this.updateTrust(childId, TRUST_INCREMENT_POSITIVE);
    } else if (outcome === 'abandoned') {
      this.updateTrust(childId, TRUST_INCREMENT_NEGATIVE / 2);
    }

    // Log event
    this.logEvent('interaction', { childId, topic, outcome, stanceUsed });

    // Check for stage progression
    this.checkProgressionSignals(childId);

    this.state.updatedAt = new Date();
  }

  /**
   * Record a handoff between children
   */
  recordHandoff(fromChildId: string, toChildId: string, reason: string): void {
    this.state.session.handoffsThisSession++;
    
    // Handoffs can slightly decrease trust with the 'from' child if frequent
    if (this.state.session.handoffsThisSession > 3) {
      // Too many handoffs in one session might indicate confusion
      // But don't penalize heavily
      this.updateTrust(fromChildId, -1);
    }

    // Starting relationship with new child
    if (!this.state.trustRelationships[toChildId]) {
      // Inherit some trust from the referring child
      const fromTrust = this.getTrustScore(fromChildId);
      this.state.trustRelationships[toChildId] = Math.max(DEFAULT_TRUST_SCORE, fromTrust * 0.7);
    }

    this.logEvent('handoff', { fromChildId, toChildId, reason });
    this.state.updatedAt = new Date();
  }

  // ============================================
  // TRUST MANAGEMENT
  // ============================================

  /**
   * Update trust score with a child
   */
  updateTrust(childId: string, delta: number): void {
    const current = this.getTrustScore(childId);
    const newScore = Math.max(MIN_TRUST_SCORE, Math.min(MAX_TRUST_SCORE, current + delta));
    
    this.state.trustRelationships[childId] = newScore;
    
    this.logEvent('trust_updated', { childId, delta, newScore });
  }

  /**
   * Boost trust after a positive experience
   */
  recordPositiveExperience(childId: string, description?: string): void {
    this.updateTrust(childId, TRUST_INCREMENT_POSITIVE);
    
    if (description) {
      this.recordCapability(description);
    }
  }

  /**
   * Record when trust is damaged
   */
  recordNegativeExperience(childId: string, reason?: string): void {
    this.updateTrust(childId, TRUST_INCREMENT_NEGATIVE);
    
    if (reason) {
      this.logEvent('trust_updated', { childId, reason, type: 'negative' });
    }
  }

  // ============================================
  // CAPABILITY & PROGRESSION
  // ============================================

  /**
   * Record a demonstrated capability
   */
  recordCapability(capability: string): void {
    if (!this.state.documentedCapabilities.includes(capability)) {
      this.state.documentedCapabilities.push(capability);
      this.logEvent('capability_demonstrated', { capability });
    }
    
    this.state.updatedAt = new Date();
  }

  /**
   * Add a progression signal
   */
  addProgressionSignal(
    domain: string, 
    signal: string, 
    strength: ProgressionSignal['strength'] = 'moderate'
  ): void {
    this.progressionSignals.push({
      domain,
      signal,
      strength,
      timestamp: new Date()
    });

    this.checkProgressionSignals(domain);
  }

  /**
   * Check if creator should progress to next stage
   */
  private checkProgressionSignals(domain: string): void {
    const currentStage = this.getDevelopmentStage(domain);
    const currentIndex = DEVELOPMENT_STAGE_ORDER.indexOf(currentStage);
    
    if (currentIndex >= DEVELOPMENT_STAGE_ORDER.length - 1) {
      return; // Already at max stage
    }

    const nextStage = DEVELOPMENT_STAGE_ORDER[currentIndex + 1];
    const shouldProgress = this.evaluateProgression(domain, currentStage, nextStage);
    
    if (shouldProgress) {
      this.progressStage(domain, nextStage);
    }
  }

  /**
   * Evaluate if progression criteria are met
   */
  private evaluateProgression(
    domain: string,
    currentStage: CreatorDevelopmentStage,
    nextStage: CreatorDevelopmentStage
  ): boolean {
    const thresholdKey = `${currentStage}_to_${nextStage}` as keyof typeof PROGRESSION_THRESHOLDS;
    const threshold = PROGRESSION_THRESHOLDS[thresholdKey];
    
    if (!threshold) return false;

    // Count interactions in this domain
    const domainInteractions = this.state.recentInteractions.filter(i => 
      i.childId === domain || i.topic.toLowerCase().includes(domain.toLowerCase())
    ).length;

    // Check thresholds
    const meetsInteractions = domainInteractions >= threshold.interactions;
    const meetsCapabilities = this.state.documentedCapabilities.length >= threshold.capabilities;
    const meetsTrust = this.getTrustScore(domain) >= threshold.trustScore;

    // For multiplier stage, also need to have helped others
    if ('hasHelpedOthers' in threshold && threshold.hasHelpedOthers) {
      const hasHelped = this.progressionSignals.some(s => 
        s.domain === domain && s.signal.includes('helped') || s.signal.includes('taught')
      );
      return meetsInteractions && meetsCapabilities && meetsTrust && hasHelped;
    }

    return meetsInteractions && meetsCapabilities && meetsTrust;
  }

  /**
   * Progress to next development stage
   */
  private progressStage(domain: string, newStage: CreatorDevelopmentStage): void {
    const oldStage = this.state.developmentStages[domain];
    this.state.developmentStages[domain] = newStage;
    
    this.logEvent('stage_progression', { 
      domain, 
      fromStage: oldStage, 
      toStage: newStage 
    });
    
    this.state.updatedAt = new Date();
  }

  /**
   * Manually set development stage (for testing or admin override)
   */
  setDevelopmentStage(domain: string, stage: CreatorDevelopmentStage): void {
    this.state.developmentStages[domain] = stage;
    this.state.updatedAt = new Date();
  }

  // ============================================
  // OPEN LOOPS
  // ============================================

  /**
   * Open a new work loop
   */
  openLoop(childId: string, topic: string, description: string): OpenLoop {
    const loop: OpenLoop = {
      childId,
      topic,
      description,
      startedAt: new Date(),
      lastTouchedAt: new Date()
    };

    this.state.openLoops.push(loop);
    
    // Trim if too many
    if (this.state.openLoops.length > MAX_OPEN_LOOPS) {
      // Remove oldest
      this.state.openLoops = this.state.openLoops.slice(-MAX_OPEN_LOOPS);
    }

    this.logEvent('loop_opened', { childId, topic });
    this.state.updatedAt = new Date();
    
    return loop;
  }

  /**
   * Touch/update an existing loop
   */
  touchLoop(topic: string): void {
    const loop = this.state.openLoops.find(l => l.topic === topic);
    if (loop) {
      loop.lastTouchedAt = new Date();
      this.state.updatedAt = new Date();
    }
  }

  /**
   * Close a loop (work completed or abandoned)
   */
  closeLoop(topic: string, outcome: 'completed' | 'abandoned' = 'completed'): void {
    const loopIndex = this.state.openLoops.findIndex(l => l.topic === topic);
    
    if (loopIndex >= 0) {
      const loop = this.state.openLoops[loopIndex];
      this.state.openLoops.splice(loopIndex, 1);
      
      this.logEvent('loop_closed', { 
        childId: loop.childId, 
        topic, 
        outcome,
        duration: Date.now() - loop.startedAt.getTime()
      });
      
      // Record interaction for the closure
      this.recordInteraction(loop.childId, topic, outcome);
    }
    
    this.state.updatedAt = new Date();
  }

  // ============================================
  // MOOD & STATE
  // ============================================

  /**
   * Update detected mood
   */
  setMood(mood: MemberMood): void {
    const previousMood = this.state.currentMood;
    this.state.currentMood = mood;
    
    this.logEvent('mood_detected', { previousMood, newMood: mood });
    this.state.updatedAt = new Date();
  }

  /**
   * Clear mood (e.g., at end of session)
   */
  clearMood(): void {
    this.state.currentMood = undefined;
  }

  /**
   * Detect mood from message content
   */
  detectMoodFromMessage(message: string): MemberMood | null {
    const lowerMessage = message.toLowerCase();
    
    // Distress signals
    const distressSignals = [
      'overwhelmed', 'can\'t cope', 'too much', 'breaking down',
      'hopeless', 'give up', 'scared', 'terrified', 'panic'
    ];
    if (distressSignals.some(s => lowerMessage.includes(s))) {
      return 'distressed';
    }

    // Frustration signals
    const frustrationSignals = [
      'frustrated', 'annoying', 'not working', 'broken', 'failed again',
      'sick of', 'tired of', 'giving up', 'waste of time'
    ];
    if (frustrationSignals.some(s => lowerMessage.includes(s))) {
      return 'frustrated';
    }

    // Excitement signals
    const excitementSignals = [
      'excited', 'amazing', 'can\'t wait', 'finally', 'breakthrough',
      'it worked', 'figured it out', 'nailed it'
    ];
    if (excitementSignals.some(s => lowerMessage.includes(s))) {
      return 'excited';
    }

    // Curiosity signals
    const curiositySignals = [
      'wondering', 'curious', 'what if', 'how does', 'why does',
      'tell me about', 'want to know', 'interested in'
    ];
    if (curiositySignals.some(s => lowerMessage.includes(s))) {
      return 'curious';
    }

    // Determination signals
    const determinationSignals = [
      'going to', 'will do', 'determined', 'committed', 'no matter what',
      'this time', 'ready to'
    ];
    if (determinationSignals.some(s => lowerMessage.includes(s))) {
      return 'determined';
    }

    return null;
  }

  // ============================================
  // PROGRAMME TRACKING
  // ============================================

  /**
   * Add a programme to their engagement list
   */
  addProgramme(programme: string): void {
    if (!this.state.programmes.includes(programme)) {
      this.state.programmes.push(programme);
      this.state.updatedAt = new Date();
    }
  }

  /**
   * Check if they've engaged with a programme
   */
  hasEngagedWith(programme: string): boolean {
    return this.state.programmes.includes(programme);
  }

  // ============================================
  // MAYA'S ASSESSMENT
  // ============================================

  /**
   * Record responses to Maya's three questions
   */
  recordMayaAssessment(
    responses: {
      wantsMost?: string;
      mostAfraid?: string;
      canHide?: string;
    }
  ): void {
    this.state.mayaAssessment = {
      ...this.state.mayaAssessment,
      ...responses,
      assessedAt: new Date()
    };
    
    this.state.needsAssessed = !!(
      responses.wantsMost || 
      responses.mostAfraid || 
      responses.canHide
    );
    
    this.state.updatedAt = new Date();
  }

  /**
   * Get Maya's assessment if available
   */
  getMayaAssessment(): ROVContextState['mayaAssessment'] {
    return this.state.mayaAssessment;
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  /**
   * Start a new session
   */
  startSession(): void {
    this.state.session = {
      startedAt: new Date(),
      messageCount: 0,
      topicsDiscussed: [],
      handoffsThisSession: 0,
      currentChild: this.state.lastChild
    };
    
    this.logEvent('session_started', {});
  }

  /**
   * End current session
   */
  endSession(): void {
    this.logEvent('session_ended', {
      duration: Date.now() - this.state.session.startedAt.getTime(),
      messageCount: this.state.session.messageCount,
      topicsDiscussed: this.state.session.topicsDiscussed,
      handoffs: this.state.session.handoffsThisSession
    });
    
    this.clearMood();
  }

  /**
   * Get current session stats
   */
  getSessionStats(): ROVContextState['session'] {
    return { ...this.state.session };
  }

  // ============================================
  // EVENT LOGGING
  // ============================================

  /**
   * Log a context update event
   */
  private logEvent(type: ContextUpdateEvent['type'], payload: Record<string, unknown>): void {
    this.eventLog.push({
      type,
      payload,
      timestamp: new Date()
    });

    // Keep only last 100 events in memory
    if (this.eventLog.length > 100) {
      this.eventLog = this.eventLog.slice(-100);
    }
  }

  /**
   * Get recent events
   */
  getRecentEvents(count: number = 20): ContextUpdateEvent[] {
    return this.eventLog.slice(-count);
  }

  // ============================================
  // SERIALIZATION
  // ============================================

  /**
   * Serialize state for storage
   */
  toJSON(): string {
    return JSON.stringify({
      ...this.state,
      memberSince: this.state.memberSince.toISOString(),
      updatedAt: this.state.updatedAt.toISOString(),
      session: {
        ...this.state.session,
        startedAt: this.state.session.startedAt.toISOString()
      },
      recentInteractions: this.state.recentInteractions.map(i => ({
        ...i,
        timestamp: i.timestamp.toISOString()
      })),
      openLoops: this.state.openLoops.map(l => ({
        ...l,
        startedAt: l.startedAt.toISOString(),
        lastTouchedAt: l.lastTouchedAt.toISOString()
      })),
      mayaAssessment: this.state.mayaAssessment ? {
        ...this.state.mayaAssessment,
        assessedAt: this.state.mayaAssessment.assessedAt.toISOString()
      } : undefined
    });
  }

  /**
   * Create instance from serialized state
   */
  static fromJSON(json: string): ROVContext {
    const data = JSON.parse(json);
    
    // Convert date strings back to Date objects
    const state: Partial<ROVContextState> = {
      ...data,
      memberSince: new Date(data.memberSince),
      updatedAt: new Date(data.updatedAt),
      session: {
        ...data.session,
        startedAt: new Date(data.session.startedAt)
      },
      recentInteractions: data.recentInteractions.map((i: Record<string, unknown>) => ({
        ...i,
        timestamp: new Date(i.timestamp as string)
      })),
      openLoops: data.openLoops.map((l: Record<string, unknown>) => ({
        ...l,
        startedAt: new Date(l.startedAt as string),
        lastTouchedAt: new Date(l.lastTouchedAt as string)
      })),
      mayaAssessment: data.mayaAssessment ? {
        ...data.mayaAssessment,
        assessedAt: new Date(data.mayaAssessment.assessedAt)
      } : undefined
    };

    return new ROVContext(data.creatorId, data.name, state);
  }
}

// ============================================
// CONTEXT STORE (In-Memory)
// ============================================

class ROVContextStore {
  private contexts: Map<string, ROVContext> = new Map();

  /**
   * Get or create context for a creator
   */
  getContext(creatorId: string, name: string = 'Creator'): ROVContext {
    let context = this.contexts.get(creatorId);
    
    if (!context) {
      context = new ROVContext(creatorId, name);
      this.contexts.set(creatorId, context);
    }
    
    return context;
  }

  /**
   * Check if context exists
   */
  hasContext(creatorId: string): boolean {
    return this.contexts.has(creatorId);
  }

  /**
   * Remove context
   */
  removeContext(creatorId: string): void {
    this.contexts.delete(creatorId);
  }

  /**
   * Get all context IDs
   */
  getAllContextIds(): string[] {
    return Array.from(this.contexts.keys());
  }

  /**
   * Clear all contexts
   */
  clear(): void {
    this.contexts.clear();
  }

  /**
   * Export all contexts for persistence
   */
  exportAll(): Record<string, string> {
    const exported: Record<string, string> = {};
    
    for (const [id, context] of this.contexts) {
      exported[id] = context.toJSON();
    }
    
    return exported;
  }

  /**
   * Import contexts from persistence
   */
  importAll(data: Record<string, string>): void {
    for (const [id, json] of Object.entries(data)) {
      const context = ROVContext.fromJSON(json);
      this.contexts.set(id, context);
    }
  }
}

// ============================================
// SINGLETON EXPORT
// ============================================

export const rovContextStore = new ROVContextStore();

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Quick access to get member context for prompt building
 */
export function getMemberContext(creatorId: string, name?: string): MemberContext {
  const context = rovContextStore.getContext(creatorId, name);
  return context.getMemberContext();
}

/**
 * Quick access to record an interaction
 */
export function recordInteraction(
  creatorId: string,
  childId: string,
  topic: string,
  outcome: Interaction['outcome'],
  stanceUsed?: ROVStance
): void {
  const context = rovContextStore.getContext(creatorId);
  context.recordInteraction(childId, topic, outcome, stanceUsed);
}

/**
 * Quick access to get development stage
 */
export function getDevelopmentStage(
  creatorId: string,
  domain: string
): CreatorDevelopmentStage {
  const context = rovContextStore.getContext(creatorId);
  return context.getDevelopmentStage(domain);
}

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  ROVContext,
  rovContextStore,
  getMemberContext,
  recordInteraction,
  getDevelopmentStage
};