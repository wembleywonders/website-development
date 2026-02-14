/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/stores/transformationStore.ts
 * Component: transformation-tracking
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ===================================
// TRANSFORMATION JOURNEY TYPES
// ===================================

type TransformationStage = 1 | 2 | 3 | 4;

interface StageLabels {
  1: 'Seeking Help';
  2: 'Building Solution';
  3: 'Solution Deployed';
  4: 'Teaching Others';
}

interface ProblemIdentification {
  description: string;
  category: 'unemployment' | 'skills-gap' | 'digital-exclusion' | 'cultural-preservation' | 'community-need' | 'safety' | 'economic' | 'other';
  affectedBy: string[]; // Who else faces this problem?
  personalImpact: string; // How does this affect the user?
  identifiedAt: Date;
  discoveredThrough?: 'kitchen' | 'programme' | 'community' | 'personal-experience' | 'observation';
}

interface SolutionDesign {
  title: string;
  description: string;
  approach: string;
  toolsChosen: string[]; // Studio zones, equipment, ROVs used
  skillsNeeded: string[];
  skillsToLearn: string[];
  collaborators: string[];
  timeline?: string;
  budget?: number;
  startedAt: Date;
  ignitionMoment?: Date; // THE CRITICAL MOMENT when ownership shifted
  ignitionTrigger?: string; // What caused the ignition moment?
}

interface SolutionDeployment {
  title: string;
  description: string;
  category: 'product' | 'service' | 'content' | 'advocacy' | 'tool' | 'event' | 'other';
  usersReached: number;
  feedback: Array<{
    source: string;
    comment: string;
    date: Date;
  }>;
  showcasedAt: string[]; // Rayd-yo, Joystick, Cyberstore, Kaywana's Court, etc.
  revenueGenerated?: number;
  impactMeasured?: {
    metric: string;
    value: number;
    unit: string;
  }[];
  deployedAt: Date;
  sustainabilityPlan?: string;
  passionistasSupport?: {
    promotions: number;
    reviews: number;
    fundingReceived: number;
  };
  scrapCatImpact?: {
    materialsSaved: number;
    costReduction: number;
  };
}

interface MentoringActivity {
  menteesCount: number;
  mentees: Array<{
    id: string;
    name?: string; // Optional for privacy
    problemFacing: string;
    stageReached: TransformationStage;
    startedMentoringAt: Date;
    milestonesAchieved: string[];
  }>;
  lessonsShared: string[];
  mentoringApproach?: string;
  startedMentoringAt: Date;
  hoursContributed?: number;
}

interface Milestone {
  id: string;
  type: 
    | 'problem-identified'
    | 'decision-made'
    | 'skill-learned'
    | 'prototype-built'
    | 'first-user'
    | 'revenue-earned'
    | 'first-mentee'
    | 'collaboration-formed'
    | 'showcase-completed'
    | 'impact-measured';
  stage: TransformationStage;
  description: string;
  timestamp: Date;
  evidenceUrl?: string;
  celebratedBy?: string[]; // Community members who celebrated this
  rovSupport?: string; // Which ROV helped achieve this
}

interface StageHistoryEntry {
  stage: TransformationStage;
  enteredAt: Date;
  exitedAt?: Date;
  milestonesAchieved: string[];
  challengesFaced?: string[];
  supportReceived?: string[];
  keyLearnings?: string[];
}

interface TransformationJourney {
  // Current state
  currentStage: TransformationStage;
  stageLabels: StageLabels;
  
  // Stage history
  stageHistory: StageHistoryEntry[];
  
  // Stage 1: "Can you help me with my problem?"
  problemIdentified?: ProblemIdentification;
  
  // Stage 2: "I'm going to build a solution"
  solutionDesign?: SolutionDesign;
  
  // Stage 3: "I built it, others can use it"
  solutionDeployed?: SolutionDeployment;
  
  // Stage 4: "I'm teaching others"
  mentoringActive?: MentoringActivity;
  
  // Cross-stage tracking
  milestones: Milestone[];
  
  // Journey metadata
  journeyStartedAt: Date;
  lastUpdated: Date;
  totalTimeInJourney?: number; // milliseconds
}

interface TransformationInsights {
  timeInCurrentStage: number; // days
  readinessForNextStage: boolean;
  blockers: string[];
  recommendations: string[];
  progressPercentage: number;
  estimatedTimeToNextStage?: number; // days
}

// ===================================
// STORE STATE & ACTIONS
// ===================================

interface TransformationState {
  journey: TransformationJourney;
  
  // Stage management
  advanceStage: (newStage: TransformationStage, ignitionMoment?: boolean, trigger?: string) => void;
  
  // Stage 1 actions
  recordProblemIdentified: (problem: Omit<ProblemIdentification, 'identifiedAt'>) => void;
  updateProblemDetails: (updates: Partial<ProblemIdentification>) => void;
  
  // Stage 2 actions
  recordSolutionDesign: (solution: Omit<SolutionDesign, 'startedAt'>) => void;
  updateSolutionDesign: (updates: Partial<SolutionDesign>) => void;
  recordIgnitionMoment: (trigger: string) => void;
  
  // Stage 3 actions
  recordSolutionDeployment: (deployment: Omit<SolutionDeployment, 'deployedAt'>) => void;
  updateSolutionDeployment: (updates: Partial<SolutionDeployment>) => void;
  addUserFeedback: (feedback: { source: string; comment: string }) => void;
  
  // Stage 4 actions
  recordMentoringStart: (mentoring: Omit<MentoringActivity, 'startedMentoringAt'>) => void;
  addMentee: (mentee: Omit<MentoringActivity['mentees'][0], 'id' | 'startedMentoringAt' | 'milestonesAchieved'>) => void;
  updateMenteeProgress: (menteeId: string, stageReached: TransformationStage, milestone?: string) => void;
  
  // Milestone tracking
  trackMilestone: (milestone: Omit<Milestone, 'id' | 'timestamp' | 'stage'>) => void;
  celebrateMilestone: (milestoneId: string, celebratedBy: string) => void;
  
  // Analytics & insights
  getStageInsights: () => TransformationInsights;
  getJourneyTimeline: () => Array<{ date: Date; event: string; stage: TransformationStage }>;
  getProgressPercentage: () => number;
  
  // Utility
  resetJourney: () => void;
  exportJourney: () => string; // JSON export for user
}

// ===================================
// STORE IMPLEMENTATION
// ===================================

const STAGE_LABELS: StageLabels = {
  1: 'Seeking Help',
  2: 'Building Solution',
  3: 'Solution Deployed',
  4: 'Teaching Others'
};

export const useTransformationStore = create<TransformationState>()(
  persist(
    (set, get) => ({
      // Initial state
      journey: {
        currentStage: 1,
        stageLabels: STAGE_LABELS,
        stageHistory: [{
          stage: 1,
          enteredAt: new Date(),
          milestonesAchieved: []
        }],
        milestones: [],
        journeyStartedAt: new Date(),
        lastUpdated: new Date()
      },

      // ===================================
      // STAGE MANAGEMENT
      // ===================================
      
      advanceStage: (newStage, ignitionMoment = false, trigger) => {
        set((state) => {
          const now = new Date();
          const currentStageEntry = state.journey.stageHistory[state.journey.stageHistory.length - 1];
          
          // Close current stage
          const updatedHistory = [...state.journey.stageHistory];
          updatedHistory[updatedHistory.length - 1] = {
            ...currentStageEntry,
            exitedAt: now
          };
          
          // Open new stage
          updatedHistory.push({
            stage: newStage,
            enteredAt: now,
            milestonesAchieved: []
          });
          
          // Record ignition moment if Stage 1 → Stage 2
          let solutionDesignUpdate = state.journey.solutionDesign;
          if (ignitionMoment && newStage === 2) {
            solutionDesignUpdate = {
              ...solutionDesignUpdate,
              ignitionMoment: now,
              ignitionTrigger: trigger
            } as SolutionDesign;
          }
          
          return {
            journey: {
              ...state.journey,
              currentStage: newStage,
              stageHistory: updatedHistory,
              solutionDesign: solutionDesignUpdate,
              lastUpdated: now
            }
          };
        });
        
        // Auto-track milestone
        get().trackMilestone({
          type: 'decision-made',
          description: `Advanced to Stage ${newStage}: ${STAGE_LABELS[newStage]}${trigger ? ` (${trigger})` : ''}`,
          rovSupport: 'System'
        });
      },

      // ===================================
      // STAGE 1: PROBLEM IDENTIFICATION
      // ===================================
      
      recordProblemIdentified: (problem) => {
        set((state) => ({
          journey: {
            ...state.journey,
            problemIdentified: {
              ...problem,
              identifiedAt: new Date()
            },
            lastUpdated: new Date()
          }
        }));
        
        get().trackMilestone({
          type: 'problem-identified',
          description: `Problem identified: ${problem.description}`
        });
      },
      
      updateProblemDetails: (updates) => {
        set((state) => ({
          journey: {
            ...state.journey,
            problemIdentified: {
              ...state.journey.problemIdentified,
              ...updates
            } as ProblemIdentification,
            lastUpdated: new Date()
          }
        }));
      },

      // ===================================
      // STAGE 2: SOLUTION DESIGN
      // ===================================
      
      recordSolutionDesign: (solution) => {
        set((state) => ({
          journey: {
            ...state.journey,
            solutionDesign: {
              ...solution,
              startedAt: new Date()
            },
            lastUpdated: new Date()
          }
        }));
        
        get().trackMilestone({
          type: 'decision-made',
          description: `Solution design started: ${solution.title}`
        });
      },
      
      updateSolutionDesign: (updates) => {
        set((state) => ({
          journey: {
            ...state.journey,
            solutionDesign: {
              ...state.journey.solutionDesign,
              ...updates
            } as SolutionDesign,
            lastUpdated: new Date()
          }
        }));
      },
      
      recordIgnitionMoment: (trigger) => {
        set((state) => ({
          journey: {
            ...state.journey,
            solutionDesign: {
              ...state.journey.solutionDesign,
              ignitionMoment: new Date(),
              ignitionTrigger: trigger
            } as SolutionDesign,
            lastUpdated: new Date()
          }
        }));
        
        get().trackMilestone({
          type: 'decision-made',
          description: `Ignition moment: ${trigger}`,
          rovSupport: 'User Self-Realization'
        });
      },

      // ===================================
      // STAGE 3: SOLUTION DEPLOYMENT
      // ===================================
      
      recordSolutionDeployment: (deployment) => {
        set((state) => ({
          journey: {
            ...state.journey,
            solutionDeployed: {
              ...deployment,
              deployedAt: new Date()
            },
            lastUpdated: new Date()
          }
        }));
        
        get().trackMilestone({
          type: 'showcase-completed',
          description: `Solution deployed: ${deployment.title}`
        });
      },
      
      updateSolutionDeployment: (updates) => {
        set((state) => ({
          journey: {
            ...state.journey,
            solutionDeployed: {
              ...state.journey.solutionDeployed,
              ...updates
            } as SolutionDeployment,
            lastUpdated: new Date()
          }
        }));
      },
      
      addUserFeedback: (feedback) => {
        set((state) => {
          const currentFeedback = state.journey.solutionDeployed?.feedback || [];
          return {
            journey: {
              ...state.journey,
              solutionDeployed: {
                ...state.journey.solutionDeployed,
                feedback: [
                  ...currentFeedback,
                  { ...feedback, date: new Date() }
                ]
              } as SolutionDeployment,
              lastUpdated: new Date()
            }
          };
        });
      },

      // ===================================
      // STAGE 4: MENTORING
      // ===================================
      
      recordMentoringStart: (mentoring) => {
        set((state) => ({
          journey: {
            ...state.journey,
            mentoringActive: {
              ...mentoring,
              startedMentoringAt: new Date()
            },
            lastUpdated: new Date()
          }
        }));
        
        get().trackMilestone({
          type: 'first-mentee',
          description: 'Started mentoring others'
        });
      },
      
      addMentee: (mentee) => {
        set((state) => {
          const currentMentees = state.journey.mentoringActive?.mentees || [];
          const newMentee = {
            ...mentee,
            id: `mentee-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            startedMentoringAt: new Date(),
            milestonesAchieved: []
          };
          
          return {
            journey: {
              ...state.journey,
              mentoringActive: {
                ...state.journey.mentoringActive,
                mentees: [...currentMentees, newMentee],
                menteesCount: currentMentees.length + 1
              } as MentoringActivity,
              lastUpdated: new Date()
            }
          };
        });
      },
      
      updateMenteeProgress: (menteeId, stageReached, milestone) => {
        set((state) => {
          const mentees = state.journey.mentoringActive?.mentees || [];
          const updatedMentees = mentees.map(m => {
            if (m.id === menteeId) {
              return {
                ...m,
                stageReached,
                milestonesAchieved: milestone 
                  ? [...m.milestonesAchieved, milestone]
                  : m.milestonesAchieved
              };
            }
            return m;
          });
          
          return {
            journey: {
              ...state.journey,
              mentoringActive: {
                ...state.journey.mentoringActive,
                mentees: updatedMentees
              } as MentoringActivity,
              lastUpdated: new Date()
            }
          };
        });
      },

      // ===================================
      // MILESTONE TRACKING
      // ===================================
      
      trackMilestone: (milestone) => {
        set((state) => {
          const newMilestone: Milestone = {
            ...milestone,
            id: `milestone-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            stage: state.journey.currentStage
          };
          
          // Add to stage history
          const updatedHistory = [...state.journey.stageHistory];
          const currentStageIndex = updatedHistory.length - 1;
          updatedHistory[currentStageIndex] = {
            ...updatedHistory[currentStageIndex],
            milestonesAchieved: [
              ...updatedHistory[currentStageIndex].milestonesAchieved,
              newMilestone.description
            ]
          };
          
          return {
            journey: {
              ...state.journey,
              milestones: [...state.journey.milestones, newMilestone],
              stageHistory: updatedHistory,
              lastUpdated: new Date()
            }
          };
        });
      },
      
      celebrateMilestone: (milestoneId, celebratedBy) => {
        set((state) => {
          const updatedMilestones = state.journey.milestones.map(m => {
            if (m.id === milestoneId) {
              return {
                ...m,
                celebratedBy: [...(m.celebratedBy || []), celebratedBy]
              };
            }
            return m;
          });
          
          return {
            journey: {
              ...state.journey,
              milestones: updatedMilestones,
              lastUpdated: new Date()
            }
          };
        });
      },

      // ===================================
      // ANALYTICS & INSIGHTS
      // ===================================
      
      getStageInsights: () => {
        const { journey } = get();
        const currentStageEntry = journey.stageHistory[journey.stageHistory.length - 1];
        const now = new Date();
        
        // Calculate time in current stage
        const timeInStage = now.getTime() - currentStageEntry.enteredAt.getTime();
        const daysInStage = Math.floor(timeInStage / (1000 * 60 * 60 * 24));
        
        // Assess readiness for next stage
        let readiness = false;
        let blockers: string[] = [];
        let recommendations: string[] = [];
        
        switch (journey.currentStage) {
          case 1:
            readiness = !!journey.problemIdentified;
            if (!journey.problemIdentified) {
              blockers.push('Problem not yet clearly identified');
              recommendations.push('Take time to articulate the problem you want to solve');
            }
            if (daysInStage > 14) {
              recommendations.push('Consider discussing your problem in the Kitchen for community input');
            }
            break;
            
          case 2:
            readiness = !!journey.solutionDesign && (journey.solutionDesign.skillsNeeded.length > 0);
            if (!journey.solutionDesign) {
              blockers.push('Solution design not started');
              recommendations.push('Begin sketching out your solution approach');
            }
            if (journey.solutionDesign && !journey.solutionDesign.ignitionMoment) {
              recommendations.push('Record the moment when you decided "I can build this"');
            }
            if (daysInStage > 60) {
              recommendations.push('Consider breaking your solution into smaller milestones');
            }
            break;
            
          case 3:
            readiness = !!journey.solutionDeployed && journey.solutionDeployed.usersReached > 0;
            if (!journey.solutionDeployed) {
              blockers.push('Solution not yet deployed');
              recommendations.push('Share your work with the community for feedback');
            }
            if (journey.solutionDeployed && journey.solutionDeployed.usersReached === 0) {
              blockers.push('No users reached yet');
              recommendations.push('Promote through Passionistas network or Rayd-yo');
            }
            break;
            
          case 4:
            readiness = !!journey.mentoringActive && journey.mentoringActive.menteesCount > 0;
            if (!journey.mentoringActive) {
              recommendations.push('Share your learnings with others facing similar challenges');
            }
            break;
        }
        
        // Calculate progress percentage
        const stageProgress = {
          1: journey.problemIdentified ? 100 : 50,
          2: journey.solutionDesign ? (journey.solutionDesign.ignitionMoment ? 100 : 70) : 30,
          3: journey.solutionDeployed ? (journey.solutionDeployed.usersReached > 0 ? 100 : 60) : 20,
          4: journey.mentoringActive ? (journey.mentoringActive.menteesCount > 0 ? 100 : 50) : 30
        };
        
        const overallProgress = ((journey.currentStage - 1) * 25) + (stageProgress[journey.currentStage] / 4);
        
        return {
          timeInCurrentStage: daysInStage,
          readinessForNextStage: readiness,
          blockers,
          recommendations,
          progressPercentage: Math.min(overallProgress, 100)
        };
      },
      
      getJourneyTimeline: () => {
        const { journey } = get();
        const timeline: Array<{ date: Date; event: string; stage: TransformationStage }> = [];
        
        // Stage transitions
        journey.stageHistory.forEach(entry => {
          timeline.push({
            date: entry.enteredAt,
            event: `Entered ${STAGE_LABELS[entry.stage]}`,
            stage: entry.stage
          });
        });
        
        // Milestones
        journey.milestones.forEach(m => {
          timeline.push({
            date: m.timestamp,
            event: m.description,
            stage: m.stage
          });
        });
        
        // Sort by date
        timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
        
        return timeline;
      },
      
      getProgressPercentage: () => {
        return get().getStageInsights().progressPercentage;
      },

      // ===================================
      // UTILITY
      // ===================================
      
      resetJourney: () => {
        set({
          journey: {
            currentStage: 1,
            stageLabels: STAGE_LABELS,
            stageHistory: [{
              stage: 1,
              enteredAt: new Date(),
              milestonesAchieved: []
            }],
            milestones: [],
            journeyStartedAt: new Date(),
            lastUpdated: new Date()
          }
        });
      },
      
      exportJourney: () => {
        const { journey } = get();
        return JSON.stringify(journey, null, 2);
      }
    }),
    {
      name: 'transformation-store',
      partialize: (state) => ({
        journey: state.journey
      })
    }
  )
);

// ===================================
// CUSTOM HOOKS
// ===================================

export const useTransformationInsights = () => {
  const store = useTransformationStore();
  return {
    insights: store.getStageInsights(),
    timeline: store.getJourneyTimeline(),
    progress: store.getProgressPercentage()
  };
};

export const useCurrentStage = () => {
  const currentStage = useTransformationStore((state) => state.journey.currentStage);
  const stageLabel = STAGE_LABELS[currentStage];
  const advanceStage = useTransformationStore((state) => state.advanceStage);
  
  return {
    currentStage,
    stageLabel,
    advanceStage
  };
};

export const useMilestones = () => {
  const milestones = useTransformationStore((state) => state.journey.milestones);
  const trackMilestone = useTransformationStore((state) => state.trackMilestone);
  const celebrateMilestone = useTransformationStore((state) => state.celebrateMilestone);
  
  return {
    milestones,
    trackMilestone,
    celebrateMilestone,
    recentMilestones: milestones.slice(-5).reverse()
  };
};

export default useTransformationStore;
