// src/systems/rovs/learning-support/ActivityObserver.ts
// Tracks and categorizes learner activities for ROV observation

import { ROVId, ROVObservation, FiveCStage } from './LearningROVSystem';
import { getOrchestrator } from './ROVOrchestrator';

// ============================================
// TYPES
// ============================================

export type ActivityType =
  | 'workshop_attendance'
  | 'simulator_session'
  | 'build_project'
  | 'repair_attempt'
  | 'recording_session'
  | 'content_creation'
  | 'business_activity'
  | 'performance_rehearsal'
  | 'mentoring_session'
  | 'assessment_attempt'
  | 'tutorial_completion'
  | 'peer_collaboration'
  | 'heritage_documentation'
  | 'community_event';

export interface Activity {
  id: string;
  type: ActivityType;
  learnerId: string;
  programmeId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // minutes
  metadata: Record<string, unknown>;
  outcome?: 'success' | 'partial' | 'failed' | 'ongoing';
  tags: string[];
}

export interface ActivityPattern {
  learnerId: string;
  activityType: ActivityType;
  frequency: number; // per week
  avgDuration: number; // minutes
  successRate: number; // 0-1
  trend: 'improving' | 'stable' | 'declining';
}

export interface ObservationTrigger {
  activityType: ActivityType;
  rovId: ROVId;
  condition: (activity: Activity) => boolean;
  stage: FiveCStage;
  priority: 'low' | 'medium' | 'high';
}

// ============================================
// OBSERVATION TRIGGERS
// ============================================

const OBSERVATION_TRIGGERS: ObservationTrigger[] = [
  // Pathfinder triggers
  {
    activityType: 'tutorial_completion',
    rovId: 'pathfinder',
    condition: () => true,
    stage: 'connect',
    priority: 'medium'
  },
  {
    activityType: 'workshop_attendance',
    rovId: 'pathfinder',
    condition: (a) => a.metadata.isFirstWorkshop === true,
    stage: 'connect',
    priority: 'high'
  },

  // Discovery triggers
  {
    activityType: 'build_project',
    rovId: 'discovery',
    condition: () => true,
    stage: 'create',
    priority: 'high'
  },
  {
    activityType: 'simulator_session',
    rovId: 'discovery',
    condition: () => true,
    stage: 'create',
    priority: 'medium'
  },
  {
    activityType: 'repair_attempt',
    rovId: 'discovery',
    condition: () => true,
    stage: 'create',
    priority: 'high'
  },

  // Insight triggers
  {
    activityType: 'assessment_attempt',
    rovId: 'insight',
    condition: () => true,
    stage: 'cultivate',
    priority: 'high'
  },
  {
    activityType: 'tutorial_completion',
    rovId: 'insight',
    condition: (a) => (a.metadata.completionCount as number) >= 5,
    stage: 'cultivate',
    priority: 'medium'
  },

  // Collector triggers
  {
    activityType: 'heritage_documentation',
    rovId: 'collector',
    condition: () => true,
    stage: 'celebrate',
    priority: 'high'
  },
  {
    activityType: 'mentoring_session',
    rovId: 'collector',
    condition: () => true,
    stage: 'celebrate',
    priority: 'medium'
  },

  // Keeper triggers
  {
    activityType: 'heritage_documentation',
    rovId: 'keeper',
    condition: () => true,
    stage: 'celebrate',
    priority: 'high'
  },
  {
    activityType: 'content_creation',
    rovId: 'keeper',
    condition: (a) => a.outcome === 'success',
    stage: 'create',
    priority: 'medium'
  },

  // Fixer triggers
  {
    activityType: 'repair_attempt',
    rovId: 'fixer',
    condition: () => true,
    stage: 'create',
    priority: 'high'
  },
  {
    activityType: 'build_project',
    rovId: 'fixer',
    condition: (a) => a.metadata.includesHardware === true,
    stage: 'create',
    priority: 'high'
  },

  // Helper triggers
  {
    activityType: 'workshop_attendance',
    rovId: 'helper',
    condition: (a) => a.metadata.needsSupport === true,
    stage: 'connect',
    priority: 'high'
  },

  // Guardian triggers
  {
    activityType: 'recording_session',
    rovId: 'guardian',
    condition: () => true,
    stage: 'create',
    priority: 'medium'
  },
  {
    activityType: 'community_event',
    rovId: 'guardian',
    condition: () => true,
    stage: 'celebrate',
    priority: 'medium'
  }
];

// ============================================
// ACTIVITY OBSERVER CLASS
// ============================================

export class ActivityObserver {
  private activities: Map<string, Activity>;
  private patterns: Map<string, ActivityPattern[]>;
  private orchestrator = getOrchestrator();

  constructor() {
    this.activities = new Map();
    this.patterns = new Map();
  }

  // ============================================
  // ACTIVITY TRACKING
  // ============================================

  startActivity(
    type: ActivityType,
    learnerId: string,
    programmeId: string,
    metadata: Record<string, unknown> = {}
  ): Activity {
    const activity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      learnerId,
      programmeId,
      startTime: new Date(),
      metadata,
      tags: this.generateTags(type, metadata)
    };

    this.activities.set(activity.id, activity);

    // Trigger relevant ROVs
    this.triggerObservations(activity, 'start');

    return activity;
  }

  updateActivity(
    activityId: string,
    updates: Partial<Activity>
  ): Activity | null {
    const activity = this.activities.get(activityId);
    if (!activity) return null;

    Object.assign(activity, updates);

    // Check for milestone triggers
    this.checkMilestones(activity);

    return activity;
  }

  endActivity(
    activityId: string,
    outcome: Activity['outcome'] = 'success'
  ): Activity | null {
    const activity = this.activities.get(activityId);
    if (!activity) return null;

    activity.endTime = new Date();
    activity.duration = Math.round(
      (activity.endTime.getTime() - activity.startTime.getTime()) / 60000
    );
    activity.outcome = outcome;

    // Trigger end observations
    this.triggerObservations(activity, 'end');

    // Update patterns
    this.updatePatterns(activity);

    return activity;
  }

  // ============================================
  // OBSERVATION TRIGGERS
  // ============================================

  private triggerObservations(activity: Activity, phase: 'start' | 'end'): void {
    const triggers = OBSERVATION_TRIGGERS.filter(t => 
      t.activityType === activity.type && t.condition(activity)
    );

    triggers.forEach(trigger => {
      const observation: ROVObservation = {
        id: `obs-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        rovId: trigger.rovId,
        learnerId: activity.learnerId,
        timestamp: new Date(),
        type: phase === 'start' ? 'activity' : 'milestone',
        content: {
          activityId: activity.id,
          activityType: activity.type,
          phase,
          duration: activity.duration,
          outcome: activity.outcome,
          ...activity.metadata
        },
        tags: activity.tags,
        programme: activity.programmeId,
        stage: trigger.stage
      };

      // Send to orchestrator
      this.orchestrator.emitEvent({
        id: observation.id,
        type: 'observation',
        sourceROV: trigger.rovId,
        learnerId: activity.learnerId,
        timestamp: observation.timestamp,
        data: observation.content,
        priority: trigger.priority
      });
    });
  }

  private checkMilestones(activity: Activity): void {
    // Check for significant milestones
    const milestones = [
      { condition: activity.duration && activity.duration >= 60, tag: 'sustained_engagement' },
      { condition: activity.metadata.attempts === 3, tag: 'persistence' },
      { condition: activity.metadata.helpedPeer === true, tag: 'peer_support' },
      { condition: activity.metadata.elderInvolved === true, tag: 'intergenerational' }
    ];

    milestones.forEach(milestone => {
      if (milestone.condition && !activity.tags.includes(milestone.tag)) {
        activity.tags.push(milestone.tag);
        
        // Trigger Insight ROV for pattern analysis
        this.orchestrator.emitEvent({
          id: `milestone-${Date.now()}`,
          type: 'observation',
          sourceROV: 'insight',
          learnerId: activity.learnerId,
          timestamp: new Date(),
          data: {
            action: 'milestone_reached',
            milestone: milestone.tag,
            activityId: activity.id
          },
          priority: 'medium'
        });
      }
    });
  }

  // ============================================
  // PATTERN ANALYSIS
  // ============================================

  private updatePatterns(activity: Activity): void {
    const learnerPatterns = this.patterns.get(activity.learnerId) || [];
    
    let pattern = learnerPatterns.find(p => p.activityType === activity.type);
    
    if (!pattern) {
      pattern = {
        learnerId: activity.learnerId,
        activityType: activity.type,
        frequency: 0,
        avgDuration: 0,
        successRate: 0,
        trend: 'stable'
      };
      learnerPatterns.push(pattern);
    }

    // Update pattern metrics
    pattern.frequency++;
    pattern.avgDuration = (pattern.avgDuration + (activity.duration || 0)) / 2;
    
    if (activity.outcome === 'success') {
      pattern.successRate = (pattern.successRate * (pattern.frequency - 1) + 1) / pattern.frequency;
    } else if (activity.outcome === 'failed') {
      pattern.successRate = (pattern.successRate * (pattern.frequency - 1)) / pattern.frequency;
    }

    this.patterns.set(activity.learnerId, learnerPatterns);
  }

  getPatterns(learnerId: string): ActivityPattern[] {
    return this.patterns.get(learnerId) || [];
  }

  // ============================================
  // TAG GENERATION
  // ============================================

  private generateTags(type: ActivityType, metadata: Record<string, unknown>): string[] {
    const tags: string[] = [type];

    // Add metadata-based tags
    if (metadata.isFirstTime) tags.push('first_time');
    if (metadata.elderInvolved) tags.push('intergenerational');
    if (metadata.peerCollaboration) tags.push('collaborative');
    if (metadata.heritageContent) tags.push('heritage');
    if (metadata.communityImpact) tags.push('community_impact');

    return tags;
  }

  // ============================================
  // QUERIES
  // ============================================

  getActivity(activityId: string): Activity | undefined {
    return this.activities.get(activityId);
  }

  getLearnerActivities(learnerId: string): Activity[] {
    return Array.from(this.activities.values())
      .filter(a => a.learnerId === learnerId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  getRecentActivities(limit: number = 10): Activity[] {
    return Array.from(this.activities.values())
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, limit);
  }

  getActivitiesByType(type: ActivityType): Activity[] {
    return Array.from(this.activities.values())
      .filter(a => a.type === type);
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let observerInstance: ActivityObserver | null = null;

export const getActivityObserver = (): ActivityObserver => {
  if (!observerInstance) {
    observerInstance = new ActivityObserver();
  }
  return observerInstance;
};

export default ActivityObserver;
