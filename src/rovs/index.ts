/**
 * ROVS INDEX
 * 
 * Barrel exports for all ROV components.
 * 
 * Usage:
 * import { MayaCreatorROV, PricingAdvisorROV } from '@/rovs';
 */

// Maya - Central Guidance
// Ensure MayaCreatorROV and the required types are exported from './maya/MayaCreatorROV'
// import { MayaCreatorROV } from './maya/MayaCreatorROV';
// export { MayaCreatorROV, default as Maya } from './maya/MayaCreatorROV';
// export type { 
//   CreatorContext,
//   MayaResponse,
//   Resource,
//   SpecialistROV
// } from './maya/MayaCreatorROV';

// Studio ROVs - Production Guidance
export { BeatMakerROV, default as BeatMaker } from './studio/BeatMakerROV';
export { DesignCoachROV, default as DesignCoach } from './studio/DesignCoachROV';
export { WriterAssistROV, default as WriterAssist } from './studio/WriterAssistROV';
export { VideoGuideROV, default as VideoGuide } from './studio/VideoGuideROV';
export { CodeMentorROV, default as CodeMentor } from './studio/CodeMentorROV';
import { BeatMakerROV } from './studio/BeatMakerROV';
import { DesignCoachROV } from './studio/DesignCoachROV';
import { WriterAssistROV } from './studio/WriterAssistROV';
import { VideoGuideROV } from './studio/VideoGuideROV';
import { CodeMentorROV } from './studio/CodeMentorROV';

// Business ROVs - Creator Business Support
export { MarketingCoachROV, default as MarketingCoach } from './business/MarketingCoachROV';
export { PortfolioBuilderROV, default as PortfolioBuilder } from './business/PortfolioBuilderROV';
export { FinanceGuideROV, default as FinanceGuide } from './business/FinanceGuideROV';
export { ClientCommsROV, default as ClientComms } from './business/ClientCommsROV';
import { MarketingCoachROV } from './business/MarketingCoachROV';
import { PortfolioBuilderROV } from './business/PortfolioBuilderROV';
import { FinanceGuideROV } from './business/FinanceGuideROV';
import { ClientCommsROV } from './business/ClientCommsROV';

// Journey ROVs - Progression & Growth
export { MilestoneCoachROV, default as MilestoneCoach } from './journey/MilestoneCoachROV';
export { SkillTrackerROV, default as SkillTracker } from './journey/SkillTrackerROV';
export { CollabFinderROV, default as CollabFinder } from './journey/CollabFinderROV';
import { MilestoneCoachROV } from './journey/MilestoneCoachROV';
import { SkillTrackerROV } from './journey/SkillTrackerROV';
import { CollabFinderROV } from './journey/CollabFinderROV';

// Type exports - Studio
export type { MusicCreatorProfile } from './studio/BeatMakerROV';
export type { DesignCreatorProfile } from './studio/DesignCoachROV';
export type { WriterProfile } from './studio/WriterAssistROV';
export type { VideoCreatorProfile } from './studio/VideoGuideROV';
export type { TechCreatorProfile } from './studio/CodeMentorROV';

// Type exports - Business
// export type { CreatorProfile } from './business/PricingAdvisorROV';
export type { MarketingProfile } from './business/MarketingCoachROV';
export type { PortfolioProfile } from './business/PortfolioBuilderROV';
export type { FinanceProfile } from './business/FinanceGuideROV';
export type { ClientCommsProfile } from './business/ClientCommsROV';

// Type exports - Journey
export type { MilestoneProfile, Milestone, Goal } from './journey/MilestoneCoachROV';
export type { SkillProfile, Skill, SkillAssessment } from './journey/SkillTrackerROV';
export type { CollabProfile, CollabMatch, CollabOpportunity } from './journey/CollabFinderROV';

// ROV ID to Component mapping
export const ROV_COMPONENTS = {
  // Central
  // Uncomment and provide the correct import if MayaCreatorROV is available
  // 'maya': MayaCreatorROV,
  // Temporary placeholder to satisfy type requirements
  'maya': {} as any,
  // Studio
  'beatmaker': BeatMakerROV,
  'design-coach': DesignCoachROV,
  'writer-assist': WriterAssistROV,
  'video-guide': VideoGuideROV,
  'code-mentor': CodeMentorROV,
  // Business
  // 'pricing-advisor': PricingAdvisorROV, // Removed due to missing module
  'marketing-coach': MarketingCoachROV,
  'portfolio-builder': PortfolioBuilderROV,
  'finance-guide': FinanceGuideROV,
  'client-comms': ClientCommsROV,
  // Journey
  'milestone-coach': MilestoneCoachROV,
  'skill-tracker': SkillTrackerROV,
  'collab-finder': CollabFinderROV
} as const;

export type ROVId = keyof typeof ROV_COMPONENTS;

// Programme to ROV mapping
export const PROGRAMME_ROVS: Record<string, ROVId> = {
  'trubble-n-bass': 'beatmaker',
  'kawanas-court': 'design-coach',
  'page-turners': 'writer-assist',
  'g-tech-casters': 'video-guide',
  'techreneurs': 'code-mentor',
  'stemgeneers': 'maya' // Uses general Maya for now
};

// Helper to get the right ROV for a programme
export function getROVForProgramme(programmeId: string): ROVId {
  return PROGRAMME_ROVS[programmeId] || 'maya';
}

// ROV Categories for UI organization
export const ROV_CATEGORIES = {
  central: ['maya'],
  studio: ['beatmaker', 'design-coach', 'writer-assist', 'video-guide', 'code-mentor'],
  business: ['marketing-coach', 'portfolio-builder', 'finance-guide', 'client-comms'],
  journey: ['milestone-coach', 'skill-tracker', 'collab-finder']
} as const;
