// src/types/skills/certifications.ts
import { ActivityType } from './core';
import { MembershipTier } from '../membership';

export interface SkillEndorsement {
  id: string;
  skillId: string;
  endorsedUserId: string;
  endorserUserId: string;
  endorserName: string;
  endorserTier: MembershipTier;
  date: Date;
  context: string; // How they observed the skill
  specificExample: string;
  strengthLevel: 1 | 2 | 3 | 4 | 5;
  publiclyVisible: boolean;
  verified: boolean;
}

export interface SkillCertification {
  id: string;
  skillId: string;
  userId: string;
  name: string;
  description: string;
  dateEarned: Date;
  validUntil?: Date;
  badge: string;
  tier: MembershipTier;
  requirements: {
    minimumLevel: number;
    requiredActivities: ActivityType[];
    endorsementsNeeded: number;
    timeRequirement: number; // months
  };
  evidenceSubmitted: Array<{
    type: string;
    description: string;
    dateSubmitted: Date;
    verified: boolean;
  }>;
  issuedBy: 'community' | 'methodist-church' | 'external-partner';
  recognizedBy: string[];
}

export interface CertificationRequirement {
  id: string;
  certificationId: string;
  type: 'minimum-level' | 'activity-completion' | 'endorsement-count' | 'time-based' | 'evidence-submission';
  description: string;
  threshold: number;
  verificationType: 'automatic' | 'manual' | 'peer-review';
  weight: number; // importance in overall certification
}

export interface ProfessionalPortfolio {
  userId: string;
  skills: Array<{
    skillId: string;
    skillName: string;
    currentLevel: number;
    certifications: string[];
    endorsements: SkillEndorsement[];
    keyAchievements: string[];
    evidenceLinks: Array<{
      title: string;
      description: string;
      url: string;
      type: 'project' | 'testimonial' | 'media' | 'document';
    }>;
  }>;
  careerObjectives: string[];
  professionalSummary: string;
  networkConnections: Array<{
    name: string;
    relationship: string;
    skillContext: string;
    canProvideReference: boolean;
  }>;
  lastUpdated: Date;
}