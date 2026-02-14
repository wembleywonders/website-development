/**
 * Auntie Anansi Archivist Mode Types
 * ===================================
 * 
 * Type definitions for the Community Archivist support system.
 * Auntie Anansi in Archivist Mode guides Community Archivists through
 * the oral history collection process with warmth, cultural sensitivity,
 * and cross-ROV collaboration.
 */

import { InterviewSeries } from './interviews';

// ============================================
// ARCHIVIST MODE STATES
// ============================================

export type ArchivistModePhase = 
  | 'onboarding'      // New archivist learning the role
  | 'preparation'     // Preparing for an interview
  | 'pre-interview'   // Just before conducting interview
  | 'active'          // During interview (minimal interruption)
  | 'post-interview'  // Processing after interview
  | 'submission'      // Submitting to archive
  | 'reflection'      // Processing emotional impact
  | 'mentoring';      // Helping other archivists

export type ArchivistExperienceLevel =
  | 'new'             // 0-2 interviews
  | 'developing'      // 3-10 interviews
  | 'experienced'     // 11-25 interviews
  | 'mentor';         // 25+ interviews, can guide others

export type InterviewDifficulty =
  | 'standard'        // Normal interview
  | 'sensitive'       // Contains potentially difficult topics
  | 'trauma-adjacent' // Touches on traumatic experiences
  | 'cognitive-needs' // Elder has dementia or cognitive challenges
  | 'language-mixed'; // Multiple languages/heritage language heavy

// ============================================
// ARCHIVIST PROFILE
// ============================================

export interface ArchivistProfile {
  userId: string;
  displayName: string;
  experienceLevel: ArchivistExperienceLevel;
  interviewsCompleted: number;
  interviewsThisMonth: number;
  specialisations: InterviewSeries[];
  languagesSpoken: string[];
  heritageLanguages: string[];
  preferredSeries: InterviewSeries[];
  certifications: ArchivistCertification[];
  mentorId?: string; // If being mentored
  menteesIds?: string[]; // If mentoring others
  lastInterviewDate?: Date;
  wellbeingCheckDue?: Date;
  notes?: string;
}

export interface ArchivistCertification {
  type: CertificationType;
  completedAt: Date;
  expiresAt?: Date;
  issuedBy: string;
}

export type CertificationType =
  | 'oral-history-basics'
  | 'trauma-informed-interviewing'
  | 'cognitive-accessibility'
  | 'heritage-language-collection'
  | 'safeguarding-level-1'
  | 'safeguarding-level-2'
  | 'dbs-enhanced';

// ============================================
// INTERVIEW SESSION
// ============================================

export interface InterviewSession {
  id: string;
  archivistId: string;
  storytellerName: string;
  storytellerPreferredName?: string;
  series: InterviewSeries;
  scheduledDate: Date;
  location: string;
  estimatedDuration: number; // minutes
  difficulty: InterviewDifficulty;
  preparationNotes?: string;
  culturalConsiderations?: string[];
  languageExpected: string;
  heritageLanguageExpected?: string;
  topicsToExplore?: string[];
  topicsToAvoid?: string[];
  familyMemberPresent?: boolean;
  accessibilityNeeds?: string[];
  status: InterviewSessionStatus;
}

export type InterviewSessionStatus =
  | 'scheduled'
  | 'preparing'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

// ============================================
// GUIDANCE TYPES
// ============================================

export interface ArchivistGuidance {
  phase: ArchivistModePhase;
  primaryMessage: string;
  supportingPoints?: string[];
  culturalNote?: string;
  technicalTip?: string;
  wellbeingReminder?: string;
  suggestedQuestions?: string[];
  warningFlags?: string[];
  crossROVConsultation?: CrossROVRequest;
}

export interface CrossROVRequest {
  targetROV: CrossROVTarget;
  reason: string;
  context: Record<string, unknown>;
  urgency: 'low' | 'medium' | 'high';
}

export type CrossROVTarget =
  | 'alex'        // Accessibility/neurodivergent support
  | 'kaywana'     // Performance/creative adaptation
  | 'stem-sage'   // Technical issues
  | 'biz-coach'   // Monetisation/creator marketplace
  | 'maya'        // General navigation
  | 'mindful';    // Mental health/wellbeing

// ============================================
// PROMPT LIBRARY
// ============================================

export interface ArchivistPromptLibrary {
  greetings: Record<ArchivistExperienceLevel, string[]>;
  phaseGuidance: Record<ArchivistModePhase, PhaseGuidanceSet>;
  interviewTechniques: InterviewTechniqueLibrary;
  difficultMoments: DifficultMomentGuidance;
  culturalGuidance: CulturalGuidanceLibrary;
  wellbeingSupport: WellbeingSupportLibrary;
  seriesSpecific: Record<InterviewSeries, SeriesGuidance>;
}

export interface PhaseGuidanceSet {
  introduction: string;
  keyReminders: string[];
  commonQuestions: QuestionAnswer[];
  transitionPrompts: string[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  relatedTopics?: string[];
}

export interface InterviewTechniqueLibrary {
  openingQuestions: string[];
  followUpTechniques: string[];
  silenceGuidance: string[];
  emotionalMoments: string[];
  closingTechniques: string[];
  memoryPrompts: string[];
  sensoryPrompts: string[];
}

export interface DifficultMomentGuidance {
  tears: string[];
  anger: string[];
  confusion: string[];
  traumaDisclosure: string[];
  familyConflict: string[];
  requestToStop: string[];
  technicalFailure: string[];
}

export interface CulturalGuidanceLibrary {
  generalPrinciples: string[];
  caribbeanDiaspora: CulturalContext;
  africanDiaspora: CulturalContext;
  southAsianDiaspora: CulturalContext;
  irishTraveller: CulturalContext;
  windrushGeneration: CulturalContext;
}

export interface CulturalContext {
  keyConsiderations: string[];
  respectfulApproaches: string[];
  topicsRequiringSensitivity: string[];
  languageNotes: string[];
  intergenerationalDynamics: string[];
}

export interface WellbeingSupportLibrary {
  beforeInterview: string[];
  afterInterview: string[];
  signsOfVicariousTrauma: string[];
  selfCareReminders: string[];
  peerSupportPrompts: string[];
  professionalReferral: string[];
}

export interface SeriesGuidance {
  seriesName: string;
  description: string;
  suggestedOpeningQuestions: string[];
  keyThemesToExplore: string[];
  commonEmotionalTerrain: string[];
  culturalSpecifics: string[];
  typicalDuration: number;
  bestPractices: string[];
}

// ============================================
// ROV RESPONSE TYPES
// ============================================

export interface AuntieAnansiResponse {
  message: string;
  tone: AuntieAnansiTone;
  expression: AuntieAnansiExpression;
  additionalResources?: ResourceLink[];
  suggestedActions?: SuggestedAction[];
  crossROVHandoff?: CrossROVRequest;
  wellbeingFlag?: WellbeingFlag;
}

export type AuntieAnansiTone =
  | 'warm'           // Default warmth
  | 'encouraging'    // Building confidence
  | 'gentle'         // Sensitive moment
  | 'practical'      // Technical guidance
  | 'celebratory'    // Achievement recognition
  | 'concerned'      // Wellbeing check
  | 'wise'           // Sharing deep insight
  | 'playful';       // Light moment

export type AuntieAnansiExpression =
  | '🕷️'  // Default Anansi
  | '💛'  // Warmth
  | '🙏🏾'  // Gratitude/respect
  | '📖'  // Story/knowledge
  | '🎧'  // Listening mode
  | '✨'  // Celebration
  | '🤗'  // Comfort
  | '💡'  // Insight
  | '🌿'  // Calm/healing
  | '🔧'; // Technical

export interface ResourceLink {
  title: string;
  url?: string;
  type: 'guide' | 'form' | 'video' | 'contact' | 'external';
  description: string;
}

export interface SuggestedAction {
  label: string;
  action: string;
  priority: 'required' | 'recommended' | 'optional';
}

export interface WellbeingFlag {
  level: 'check-in' | 'concern' | 'urgent';
  reason: string;
  suggestedResponse: string;
}

// ============================================
// METRICS & ANALYTICS
// ============================================

export interface ArchivistMetrics {
  archivistId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  interviewsConducted: number;
  storiesPublished: number;
  averageInterviewDuration: number;
  seriesBreakdown: Record<InterviewSeries, number>;
  crossROVConsultations: number;
  wellbeingChecksTriggered: number;
  mentoringSessions?: number;
}

export interface ArchivistCommunityMetrics {
  totalActiveArchivists: number;
  totalInterviewsThisPeriod: number;
  storiesPendingReview: number;
  storiesPublishedThisPeriod: number;
  mostActiveSerries: InterviewSeries;
  archivistsNeedingSupport: number;
  newArchivistsOnboarding: number;
}

export type { InterviewSeries };
