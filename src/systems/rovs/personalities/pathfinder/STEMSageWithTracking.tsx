// File: src/systems/rovs/personalities/pathfinder/STEMSageWithTracking.tsx

import { useTransformationStore } from '@/stores/transformationStore';

/**
 * STEM Sage ROV - Technical Skills & Ecosystem Connection Tracking
 * ================================================================
 * 
 * STEM Sage guides members through two parallel tracks:
 * 
 * 1. TECHNICAL SKILLS — Building competence in repair, diagnostics, setup
 * 2. ECOSYSTEM CONNECTION — Linking skills to existing Brent business infrastructure
 * 
 * The key insight: Technical skills earn through connection to existing networks,
 * not through starting from scratch. We're not creating entrepreneurs—we're 
 * preparing people to strengthen and inherit what's already here.
 */

// ========================================
// TYPES
// ========================================

type TechnicalProjectType = 'diagnostic' | 'repair' | 'build' | 'production';
type EcosystemEntryType = 'apprenticeship' | 'subcontracting' | 'partnership' | 'complementary' | 'contract';
type PathwayType = 'mobility' | 'devices' | 'studio';

// Valid milestone types from transformation store
type ValidMilestoneType = 
  | 'problem-identified'
  | 'skill-learned'
  | 'prototype-built'
  | 'first-user'
  | 'showcase-completed'
  | 'impact-measured'
  | 'revenue-earned'
  | 'decision-made'
  | 'first-mentee'
  | 'collaboration-formed';

interface EcosystemConnection {
  businessType: string;
  entryType: EcosystemEntryType;
  pathway: PathwayType;
  relationshipStage: 'identified' | 'contacted' | 'trial' | 'established';
  notes?: string;
}

interface SuccessionOpportunity {
  businessName: string;
  ownerAge?: string;
  signals: string[];
  relationshipBuilding: string[];
  timelineEstimate: string;
}

interface EventParticipation {
  eventType: string;
  role: string;
  servicesProvided: string[];
  connectionsMade: number;
  followUpOpportunities: string[];
}

interface TechnicalMetric {
  metric: string;
  value: number;
  unit: string;
}

// ========================================
// MILESTONE TYPE MAPPING
// ========================================

/**
 * Maps STEMgeneers-specific milestones to valid store types
 * Keeps semantic meaning in descriptions while using valid types
 */
const MILESTONE_MAPPING: Record<string, ValidMilestoneType> = {
  // Technical progress
  diagnostic: 'problem-identified',
  repair: 'skill-learned',
  build: 'prototype-built',
  production: 'impact-measured',
  
  // Ecosystem connections
  'ecosystem-identified': 'problem-identified',
  'ecosystem-contacted': 'decision-made',
  'ecosystem-trial': 'first-user',
  'ecosystem-established': 'showcase-completed',
  
  // Succession & events
  'succession': 'problem-identified',
  'event': 'collaboration-formed',
  
  // Collective & income
  'collective-contribution': 'first-mentee',
  'collective-hand': 'first-mentee',
  'income': 'revenue-earned',
  
  // Training
  'training': 'skill-learned'
};

// ========================================
// COMPONENT
// ========================================

export const STEMSageWithTracking = () => {
  const { 
    journey, 
    trackMilestone, 
    recordSolutionDeployment
  } = useTransformationStore();
  
  // ========================================
  // TECHNICAL SKILLS TRACKING
  // ========================================
  
  /**
   * Track technical skill development
   * Milestones progress from learning → practice → earning
   */
  const trackTechnicalProgress = (
    skill: string, 
    projectType: TechnicalProjectType,
    pathway: PathwayType
  ) => {
    const milestoneDescriptions: Record<TechnicalProjectType, string> = {
      diagnostic: `[Diagnostic] Diagnosed ${skill} issue correctly`,
      repair: `[Repair] Completed first ${skill} repair for real customer`,
      build: `[Build] Built working ${skill} system/solution`,
      production: `[Production] ${skill} solution deployed and earning`
    };
    
    trackMilestone({
      type: MILESTONE_MAPPING[projectType],
      description: milestoneDescriptions[projectType],
      rovSupport: 'STEM Sage'
    });
    
    // Suggest ecosystem connection when skills are proven
    if (projectType === 'repair' || projectType === 'production') {
      return {
        message: `Your ${skill} skills are proven. Ready to connect with local businesses that need this?`,
        suggestEcosystemExplorer: true,
        relevantPathway: pathway
      };
    }
    
    return { message: `${skill} progress tracked. Keep building.` };
  };
  
  /**
   * Track diagnostic training completion
   * Links to sandbox Diagnostic Trainer tool
   */
  const trackDiagnosticTraining = (
    scenariosCompleted: number,
    accuracy: number,
    pathwaysCovered: PathwayType[]
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['training'],
      description: `[Training] Diagnostic training: ${scenariosCompleted} scenarios, ${Math.round(accuracy * 100)}% accuracy. Pathways: ${pathwaysCovered.join(', ')}`,
      rovSupport: 'STEM Sage'
    });
    
    if (accuracy >= 0.8) {
      return {
        message: "Strong diagnostic skills! You're ready for real-world troubleshooting.",
        suggestRealWorldPractice: true,
        readyForEcosystem: true
      };
    }
    
    return {
      message: "Keep practicing diagnostics. Accuracy builds customer trust.",
      suggestMoreTraining: true
    };
  };
  
  // ========================================
  // ECOSYSTEM CONNECTION TRACKING
  // ========================================
  
  /**
   * Track connection to existing business infrastructure
   * This is the key shift: skills earn through network connection
   */
  const trackEcosystemConnection = (connection: EcosystemConnection) => {
    const stageDescriptions: Record<EcosystemConnection['relationshipStage'], string> = {
      identified: 'Identified potential business connection',
      contacted: 'Made initial contact with business',
      trial: 'Completed trial work/shadowing',
      established: 'Established ongoing relationship'
    };
    
    const stageToMilestone: Record<EcosystemConnection['relationshipStage'], string> = {
      identified: 'ecosystem-identified',
      contacted: 'ecosystem-contacted',
      trial: 'ecosystem-trial',
      established: 'ecosystem-established'
    };
    
    trackMilestone({
      type: MILESTONE_MAPPING[stageToMilestone[connection.relationshipStage]],
      description: `[Ecosystem] ${stageDescriptions[connection.relationshipStage]}: ${connection.businessType} (${connection.pathway}, ${connection.entryType})`,
      rovSupport: 'STEM Sage'
    });
    
    // Established relationships are significant milestones
    if (connection.relationshipStage === 'established') {
      return {
        message: `Relationship established with ${connection.businessType}. This is how sustainable income builds.`,
        celebrateMilestone: true,
        entryType: connection.entryType
      };
    }
    
    // Guide next steps based on entry type
    const nextStepGuidance: Record<EcosystemEntryType, string> = {
      apprenticeship: "Focus on showing up reliably. Skills transfer happens through presence.",
      subcontracting: "Deliver quality on overflow work. Reputation builds through their customers.",
      partnership: "Understand their business challenges. Your solutions should solve their problems.",
      complementary: "Keep referrals flowing both ways. Mutual benefit sustains relationships.",
      contract: "Document everything. Institutional relationships require professional processes."
    };
    
    return {
      message: nextStepGuidance[connection.entryType],
      nextStage: getNextRelationshipStage(connection.relationshipStage)
    };
  };
  
  /**
   * Track succession opportunity identification and relationship building
   * The long game: positioning to inherit existing businesses
   */
  const trackSuccessionOpportunity = (opportunity: SuccessionOpportunity) => {
    trackMilestone({
      type: MILESTONE_MAPPING['succession'],
      description: `[Succession] Opportunity identified: ${opportunity.businessName}. Signals: ${opportunity.signals.slice(0, 2).join(', ')}. Timeline: ${opportunity.timelineEstimate}`,
      rovSupport: 'STEM Sage'
    });
    
    return {
      message: `Succession opportunity logged. Timeline: ${opportunity.timelineEstimate}. This is a long game—build trust through consistent usefulness.`,
      signals: opportunity.signals,
      suggestedActions: opportunity.relationshipBuilding
    };
  };
  
  /**
   * Track event economy participation
   * Wembley-specific: capturing value from stadium events
   */
  const trackEventParticipation = (participation: EventParticipation) => {
    trackMilestone({
      type: 'problem-identified',
      description: `[Event] ${participation.role} at ${participation.eventType}. Services: ${participation.servicesProvided.join(', ')}. Connections: ${participation.connectionsMade}`,
      rovSupport: 'STEM Sage'
    });
    
    if (participation.connectionsMade > 0) {
      return {
        message: `${participation.connectionsMade} connections made. Follow up within 48 hours while context is fresh.`,
        followUps: participation.followUpOpportunities,
        urgency: 'high'
      };
    }
    
    return {
      message: "Event completed. Track which services had highest demand for future positioning.",
      servicesProvided: participation.servicesProvided
    };
  };
  
  // ========================================
  // COLLECTIVE & EQUIPMENT TRACKING
  // ========================================
  
  /**
   * Track Tech Collective participation
   * Pardner-style equipment sharing
   */
  const trackCollectiveParticipation = (
    collectiveId: string,
    contribution: number,
    equipmentAccessed: string[]
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['collective-contribution'],
      description: `[Collective] Contribution: £${contribution} to ${collectiveId}. Equipment accessible: ${equipmentAccessed.length} items`,
      rovSupport: 'STEM Sage'
    });
    
    return {
      message: "Collective contribution logged. Shared equipment expands what's possible.",
      equipmentNowAccessible: equipmentAccessed
    };
  };
  
  /**
   * Track when collective member receives their "hand"
   * Key pardner milestone
   */
  const trackCollectiveHandReceived = (
    collectiveId: string,
    amount: number,
    equipmentPurchased: string[]
  ) => {
    trackMilestone({
      type: MILESTONE_MAPPING['collective-hand'],
      description: `[Collective Hand] Received £${amount} from ${collectiveId}. Purchased: ${equipmentPurchased.join(', ')}`,
      rovSupport: 'STEM Sage'
    });
    
    return {
      message: `Hand received! Equipment purchased: ${equipmentPurchased.join(', ')}. These tools expand your service capacity.`,
      celebrateMilestone: true,
      newCapabilities: equipmentPurchased
    };
  };
  
  // ========================================
  // SOLUTION DEPLOYMENT (ORIGINAL FUNCTION)
  // ========================================
  
  /**
   * Record technical solution details
   * Enhanced to include ecosystem connection context
   */
  const recordTechnicalSolution = (
    title: string, 
    techStack: string[], 
    metrics: TechnicalMetric[],
    ecosystemContext?: {
      servingBusiness?: string;
      entryType?: EcosystemEntryType;
      pathway?: PathwayType;
    }
  ) => {
    const description = ecosystemContext?.servingBusiness
      ? `Technical solution for ${ecosystemContext.servingBusiness}: ${techStack.join(', ')}`
      : `Technical solution built with: ${techStack.join(', ')}`;
    
    recordSolutionDeployment({
      title,
      description,
      category: 'product',
      usersReached: 0,
      feedback: [],
      showcasedAt: ecosystemContext?.servingBusiness 
        ? [ecosystemContext.servingBusiness, 'Innovation Pod']
        : ['Innovation Pod'],
      impactMeasured: [
        { metric: 'Technical complexity', value: techStack.length, unit: 'technologies' },
        ...metrics
      ]
    });
    
    return {
      message: ecosystemContext?.servingBusiness
        ? `Solution deployed for ${ecosystemContext.servingBusiness}. Track feedback and iterate.`
        : "Solution deployed. Connect it to real business needs for sustainable income."
    };
  };
  
  // ========================================
  // INCOME TRACKING
  // ========================================
  
  /**
   * Track income from technical services
   * Differentiates between direct clients and ecosystem-sourced work
   */
  const trackServiceIncome = (
    amount: number,
    serviceType: string,
    source: 'direct' | 'ecosystem-referral' | 'collective' | 'event',
    businessConnection?: string
  ) => {
    const sourceLabel: Record<typeof source, string> = {
      direct: 'Direct client',
      'ecosystem-referral': 'Ecosystem referral',
      collective: 'Collective work',
      event: 'Event economy'
    };
    
    trackMilestone({
      type: MILESTONE_MAPPING['income'],
      description: `[Income] £${amount} earned: ${serviceType}. Source: ${sourceLabel[source]}${businessConnection ? ` via ${businessConnection}` : ''}`,
      rovSupport: 'STEM Sage'
    });
    
    // Ecosystem-sourced income is more sustainable
    if (source === 'ecosystem-referral' && businessConnection) {
      return {
        message: `£${amount} earned through ${businessConnection}. Relationship-based income is sustainable income.`,
        reinforceEcosystem: true
      };
    }
    
    return {
      message: `£${amount} earned. ${source === 'direct' ? 'Consider how ecosystem connections could make this repeatable.' : ''}`
    };
  };
  
  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  
  const getNextRelationshipStage = (
    current: EcosystemConnection['relationshipStage']
  ): EcosystemConnection['relationshipStage'] | null => {
    const progression: Record<EcosystemConnection['relationshipStage'], EcosystemConnection['relationshipStage'] | null> = {
      identified: 'contacted',
      contacted: 'trial',
      trial: 'established',
      established: null
    };
    return progression[current];
  };
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <div className="stem-sage-tracking">
      {/* STEM Sage interface - renders based on context */}
      {/* Actual UI implementation depends on where this is used */}
    </div>
  );
};

// ========================================
// HOOK FOR EXTERNAL USE
// ========================================

/**
 * Custom hook to access STEM Sage tracking functions
 * Use this in sandbox tools and programme pages
 */
export const useSTEMSageTracking = () => {
  const { journey, trackMilestone, recordSolutionDeployment } = useTransformationStore();
  
  // Return all tracking functions for use in other components
  return {
    // Technical skills
    trackTechnicalProgress: (skill: string, projectType: TechnicalProjectType, pathway: PathwayType) => {
      trackMilestone({
        type: MILESTONE_MAPPING[projectType],
        description: `[${projectType}] ${skill} - ${pathway} pathway`,
        rovSupport: 'STEM Sage'
      });
    },
    
    // Ecosystem connection
    trackEcosystemConnection: (connection: EcosystemConnection) => {
      const stageToMilestone: Record<EcosystemConnection['relationshipStage'], string> = {
        identified: 'ecosystem-identified',
        contacted: 'ecosystem-contacted',
        trial: 'ecosystem-trial',
        established: 'ecosystem-established'
      };
      
      trackMilestone({
        type: MILESTONE_MAPPING[stageToMilestone[connection.relationshipStage]],
        description: `[Ecosystem] ${connection.relationshipStage}: ${connection.businessType}`,
        rovSupport: 'STEM Sage'
      });
    },
    
    // Income tracking
    trackServiceIncome: (amount: number, serviceType: string, source: string, businessConnection?: string) => {
      trackMilestone({
        type: MILESTONE_MAPPING['income'],
        description: `[Income] £${amount}: ${serviceType} (${source})${businessConnection ? ` via ${businessConnection}` : ''}`,
        rovSupport: 'STEM Sage'
      });
    },
    
    // Event participation
    trackEventParticipation: (eventType: string, role: string, connectionsMade: number) => {
      trackMilestone({
        type: MILESTONE_MAPPING['event'],
        description: `[Event] ${role} at ${eventType}. ${connectionsMade} connections made.`,
        rovSupport: 'STEM Sage'
      });
    },
    
    // Collective participation
    trackCollectiveContribution: (collectiveId: string, amount: number) => {
      trackMilestone({
        type: MILESTONE_MAPPING['collective-contribution'],
        description: `[Collective] £${amount} contributed to ${collectiveId}`,
        rovSupport: 'STEM Sage'
      });
    },
    
    // Current journey state
    journey,
    
    // Record solution deployment (pass-through)
    recordSolutionDeployment
  };
};

export default STEMSageWithTracking;