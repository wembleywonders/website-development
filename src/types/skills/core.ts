// src/types/skills/core.ts
import { MembershipTier } from '../membership';

export type SkillCategory = 
  | 'relationship-building'
  | 'experience-design'
  | 'leadership'
  | 'communication'
  | 'cultural-intelligence'
  | 'digital-literacy'
  | 'project-management'
  | 'governance';

export type SkillLevel = 'novice' | 'competent' | 'proficient' | 'expert' | 'master';

export type ROVPersonality = 'helper' | 'insight' | 'justice' | 'pathfinder' | 'guardian';

export type ActivityType = 
  | 'community-practice'
  | 'workshop-attendance'
  | 'event-organization'
  | 'mentoring-session'
  | 'governance-participation'
  | 'project-leadership'
  | 'rov-coaching';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  tier: MembershipTier;
  description: string;
  practiceActivities: string[];
  realWorldApplications: string[];
  careerBenefit: string;
  timeToMaster: string;
  requiredROVSupport: ROVPersonality[];
  prerequisites?: string[];
  relatedSkills: string[];
  measurableOutcomes: string[];
}

export interface SkillActivity {
  id: string;
  userId: string;
  skillId: string;
  activityType: ActivityType;
  description: string;
  skillsUsed: string[];
  date: Date;
  duration: number; // minutes
  experienceGained: number;
  endorsementReceived: boolean;
  rovAssistanceUsed: boolean;
  rovPersonality?: ROVPersonality;
  communityImpact?: string;
  reflectionNotes?: string;
  evidence?: Array<{
    type: 'photo' | 'document' | 'testimonial' | 'recording';
    url: string;
    description: string;
  }>;
}

export interface SkillBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  requirements: string[];
  earnedBy: number; // count of people who have it
}