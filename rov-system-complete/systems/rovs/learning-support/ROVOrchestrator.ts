// src/systems/rovs/learning-support/ROVOrchestrator.ts
// Coordinates all ROV activities and manages handoffs between ROVs

import { LearningROV, ROVObservation, JournalContribution, ROVId } from './LearningROVSystem';

// ============================================
// TYPES
// ============================================

export interface ROVEvent {
  id: string;
  type: 'observation' | 'suggestion' | 'handoff' | 'alert';
  sourceROV: ROVId;
  targetROV?: ROVId;
  learnerId: string;
  timestamp: Date;
  data: Record<string, unknown>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ROVHandoff {
  id: string;
  fromROV: ROVId;
  toROV: ROVId;
  reason: string;
  context: Record<string, unknown>;
  timestamp: Date;
  acknowledged: boolean;
}

export interface OrchestratorState {
  activeROVs: Map<ROVId, ROVStatus>;
  eventQueue: ROVEvent[];
  handoffQueue: ROVHandoff[];
  learnerSessions: Map<string, LearnerSession>;
}

export interface ROVStatus {
  rovId: ROVId;
  status: 'active' | 'watching' | 'idle' | 'offline';
  currentLearnerId?: string;
  lastActivity: Date;
  observationCount: number;
}

export interface LearnerSession {
  learnerId: string;
  programmeId: string;
  startTime: Date;
  activeROVs: ROVId[];
  observations: ROVObservation[];
  contributions: JournalContribution[];
}

// ============================================
// ORCHESTRATOR CLASS
// ============================================

export class ROVOrchestrator {
  private state: OrchestratorState;
  private eventListeners: Map<string, ((event: ROVEvent) => void)[]>;

  constructor() {
    this.state = {
      activeROVs: new Map(),
      eventQueue: [],
      handoffQueue: [],
      learnerSessions: new Map()
    };
    this.eventListeners = new Map();
    this.initializeROVs();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  private initializeROVs(): void {
    const rovIds: ROVId[] = [
      'pathfinder', 'discovery', 'insight', 'collector',
      'keeper', 'helper', 'alex', 'mindful', 'fixer', 'guardian'
    ];

    rovIds.forEach(rovId => {
      this.state.activeROVs.set(rovId, {
        rovId,
        status: 'idle',
        lastActivity: new Date(),
        observationCount: 0
      });
    });
  }

  // ============================================
  // SESSION MANAGEMENT
  // ============================================

  startLearnerSession(learnerId: string, programmeId: string): LearnerSession {
    const session: LearnerSession = {
      learnerId,
      programmeId,
      startTime: new Date(),
      activeROVs: this.getROVsForProgramme(programmeId),
      observations: [],
      contributions: []
    };

    this.state.learnerSessions.set(learnerId, session);

    // Activate relevant ROVs
    session.activeROVs.forEach(rovId => {
      this.activateROV(rovId, learnerId);
    });

    // Emit session start event
    this.emitEvent({
      id: `evt-${Date.now()}`,
      type: 'observation',
      sourceROV: 'pathfinder',
      learnerId,
      timestamp: new Date(),
      data: { action: 'session_started', programmeId },
      priority: 'medium'
    });

    return session;
  }

  endLearnerSession(learnerId: string): void {
    const session = this.state.learnerSessions.get(learnerId);
    if (!session) return;

    // Deactivate ROVs
    session.activeROVs.forEach(rovId => {
      this.deactivateROV(rovId);
    });

    // Archive session
    this.archiveSession(session);

    this.state.learnerSessions.delete(learnerId);
  }

  private archiveSession(session: LearnerSession): void {
    // Keeper ROV archives the session
    this.emitEvent({
      id: `evt-${Date.now()}`,
      type: 'observation',
      sourceROV: 'keeper',
      learnerId: session.learnerId,
      timestamp: new Date(),
      data: {
        action: 'session_archived',
        duration: Date.now() - session.startTime.getTime(),
        observationCount: session.observations.length,
        contributionCount: session.contributions.length
      },
      priority: 'low'
    });
  }

  // ============================================
  // ROV ACTIVATION
  // ============================================

  private activateROV(rovId: ROVId, learnerId: string): void {
    const status = this.state.activeROVs.get(rovId);
    if (status) {
      status.status = 'active';
      status.currentLearnerId = learnerId;
      status.lastActivity = new Date();
    }
  }

  private deactivateROV(rovId: ROVId): void {
    const status = this.state.activeROVs.get(rovId);
    if (status) {
      status.status = 'idle';
      status.currentLearnerId = undefined;
    }
  }

  private getROVsForProgramme(programmeId: string): ROVId[] {
    const programmeROVs: Record<string, ROVId[]> = {
      'scrap-cat': ['fixer', 'discovery', 'keeper', 'pathfinder', 'guardian'],
      'g-tech-casters': ['collector', 'discovery', 'keeper', 'pathfinder', 'guardian'],
      'techreneurs': ['insight', 'collector', 'pathfinder', 'helper', 'guardian'],
      'stemgineers': ['discovery', 'fixer', 'insight', 'pathfinder', 'guardian'],
      'kaywanas-court': ['collector', 'keeper', 'guardian', 'pathfinder', 'mindful'],
      'silk-stilettos': ['insight', 'collector', 'pathfinder', 'helper', 'guardian'],
      'auntie-anansis-kitchen': ['keeper', 'collector', 'discovery', 'pathfinder', 'guardian'],
      'trubble-n-bass': ['discovery', 'collector', 'keeper', 'pathfinder', 'guardian'],
      'page-turners': ['collector', 'keeper', 'pathfinder', 'helper', 'guardian'],
      'joystick': ['discovery', 'collector', 'pathfinder', 'mindful', 'guardian']
    };

    return programmeROVs[programmeId] || ['pathfinder', 'helper', 'guardian'];
  }

  // ============================================
  // EVENT HANDLING
  // ============================================

  emitEvent(event: ROVEvent): void {
    this.state.eventQueue.push(event);
    this.processEvent(event);
  }

  private processEvent(event: ROVEvent): void {
    // Update ROV status
    const rovStatus = this.state.activeROVs.get(event.sourceROV);
    if (rovStatus) {
      rovStatus.lastActivity = new Date();
      rovStatus.observationCount++;
    }

    // Add to learner session
    const session = this.state.learnerSessions.get(event.learnerId);
    if (session && event.type === 'observation') {
      session.observations.push({
        id: event.id,
        rovId: event.sourceROV,
        learnerId: event.learnerId,
        timestamp: event.timestamp,
        type: 'activity',
        content: event.data,
        tags: [],
        programme: session.programmeId,
        stage: 'create'
      } as ROVObservation);
    }

    // Notify listeners
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach(listener => listener(event));

    // Check for automatic handoffs
    this.checkForHandoffs(event);
  }

  addEventListener(eventType: string, callback: (event: ROVEvent) => void): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.push(callback);
    this.eventListeners.set(eventType, listeners);
  }

  // ============================================
  // HANDOFF MANAGEMENT
  // ============================================

  initiateHandoff(fromROV: ROVId, toROV: ROVId, reason: string, context: Record<string, unknown>): ROVHandoff {
    const handoff: ROVHandoff = {
      id: `handoff-${Date.now()}`,
      fromROV,
      toROV,
      reason,
      context,
      timestamp: new Date(),
      acknowledged: false
    };

    this.state.handoffQueue.push(handoff);

    // Emit handoff event
    const learnerId = context.learnerId as string || 'unknown';
    this.emitEvent({
      id: `evt-${Date.now()}`,
      type: 'handoff',
      sourceROV: fromROV,
      targetROV: toROV,
      learnerId,
      timestamp: new Date(),
      data: { reason, ...context },
      priority: 'medium'
    });

    return handoff;
  }

  acknowledgeHandoff(handoffId: string): void {
    const handoff = this.state.handoffQueue.find(h => h.id === handoffId);
    if (handoff) {
      handoff.acknowledged = true;
    }
  }

  private checkForHandoffs(event: ROVEvent): void {
    // Automatic handoff rules
    const handoffRules: Array<{
      condition: (e: ROVEvent) => boolean;
      fromROV: ROVId;
      toROV: ROVId;
      reason: string;
    }> = [
      {
        // Discovery spots achievement → Insight analyzes
        condition: (e) => e.sourceROV === 'discovery' && e.data.action === 'achievement_unlocked',
        fromROV: 'discovery',
        toROV: 'insight',
        reason: 'Achievement detected - pattern analysis needed'
      },
      {
        // Insight identifies story → Collector drafts
        condition: (e) => e.sourceROV === 'insight' && e.data.action === 'story_potential_identified',
        fromROV: 'insight',
        toROV: 'collector',
        reason: 'Story potential identified - draft needed'
      },
      {
        // Collector completes story → Keeper archives
        condition: (e) => e.sourceROV === 'collector' && e.data.action === 'story_drafted',
        fromROV: 'collector',
        toROV: 'keeper',
        reason: 'Story ready for archive'
      },
      {
        // Helper identifies need → Human mentor connection
        condition: (e) => e.sourceROV === 'helper' && e.data.action === 'mentor_needed',
        fromROV: 'helper',
        toROV: 'pathfinder',
        reason: 'Human mentor connection needed'
      },
      {
        // Mindful detects stress → Helper provides support
        condition: (e) => e.sourceROV === 'mindful' && e.data.action === 'stress_detected',
        fromROV: 'mindful',
        toROV: 'helper',
        reason: 'Learner needs support'
      }
    ];

    for (const rule of handoffRules) {
      if (rule.condition(event)) {
        this.initiateHandoff(rule.fromROV, rule.toROV, rule.reason, event.data);
        break;
      }
    }
  }

  // ============================================
  // STATUS QUERIES
  // ============================================

  getROVStatus(rovId: ROVId): ROVStatus | undefined {
    return this.state.activeROVs.get(rovId);
  }

  getAllROVStatuses(): ROVStatus[] {
    return Array.from(this.state.activeROVs.values());
  }

  getLearnerSession(learnerId: string): LearnerSession | undefined {
    return this.state.learnerSessions.get(learnerId);
  }

  getActiveSessionCount(): number {
    return this.state.learnerSessions.size;
  }

  getPendingHandoffs(): ROVHandoff[] {
    return this.state.handoffQueue.filter(h => !h.acknowledged);
  }

  // ============================================
  // STATISTICS
  // ============================================

  getStatistics(): {
    totalObservations: number;
    activeSessionCount: number;
    rovActivity: Record<ROVId, number>;
    handoffCount: number;
  } {
    const rovActivity: Partial<Record<ROVId, number>> = {};
    this.state.activeROVs.forEach((status, rovId) => {
      rovActivity[rovId] = status.observationCount;
    });

    return {
      totalObservations: this.state.eventQueue.length,
      activeSessionCount: this.state.learnerSessions.size,
      rovActivity: rovActivity as Record<ROVId, number>,
      handoffCount: this.state.handoffQueue.length
    };
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let orchestratorInstance: ROVOrchestrator | null = null;

export const getOrchestrator = (): ROVOrchestrator => {
  if (!orchestratorInstance) {
    orchestratorInstance = new ROVOrchestrator();
  }
  return orchestratorInstance;
};

export default ROVOrchestrator;
