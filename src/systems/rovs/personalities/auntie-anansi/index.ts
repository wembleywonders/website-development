/**
 * Auntie Anansi ROV Personality
 * =============================
 * 
 * Auntie Anansi is the story keeper - inspired by the West African/Caribbean
 * trickster spider who carries all the world's stories.
 * 
 * In Wembley Wonders, Auntie Anansi has multiple modes:
 * 
 * 1. **Archivist Mode** - Guides Community Archivists through oral history collection
 * 2. **Kitchen Mode** - Supports recipe heritage preservation (Auntie Anansi's Kitchen)
 * 3. **Story Mode** - General storytelling and heritage guidance
 * 
 * This personality integrates with:
 * - Alex ROV (accessibility support)
 * - Kaywana ROV (performance/creative adaptation)
 * - STEM Sage (technical support)
 * - Biz Coach (monetisation/marketplace)
 * - Maya (general navigation)
 * - Mindful (wellbeing support)
 */

// Core configuration and prompts
export {
  AUNTIE_ANANSI_ARCHIVIST_CONFIG as ArchivistConfig,
  ARCHIVIST_GREETINGS,
  PHASE_GUIDANCE,
  INTERVIEW_TECHNIQUES,
  DIFFICULT_MOMENT_GUIDANCE,
  CROSS_ROV_PROTOCOLS,
  WELLBEING_INDICATORS,
  generateArchivistResponse,
} from './ArchivistMode';

// Service layer
export {
  AuntieAnansiArchivistService,
  auntieAnansiArchivistService,
} from './ArchivistService';

// Type exports
export type {
  ArchivistModePhase,
  ArchivistExperienceLevel,
  InterviewDifficulty,
  ArchivistProfile,
  InterviewSession,
  AuntieAnansiResponse,
  AuntieAnansiTone,
  AuntieAnansiExpression,
  CrossROVTarget,
  CrossROVRequest,
} from '../../../../types/rovs/archivist.types';

// Interview series
export {
  SERIES_METADATA,
  getSeriesMetadata,
  getSeriesByEmotionalIntensity,
  getSeriesRequiringTraining,
  getSeriesForCulture,
} from '../../../../types/rovs/interviews';

export type { InterviewSeries, SeriesMetadata } from '../../../../types/rovs/interviews';

// ============================================
// QUICK ACCESS HELPERS
// ============================================

import { auntieAnansiArchivistService } from './ArchivistService';
import { INTERVIEW_TECHNIQUES, DIFFICULT_MOMENT_GUIDANCE } from './ArchivistMode';
import type { ArchivistProfile, AuntieAnansiResponse } from '../../../../types/rovs/archivist.types';

/**
 * Quick helper to get started with Auntie Anansi in Archivist Mode
 */
export const startArchivistMode = (profile: ArchivistProfile): AuntieAnansiResponse => {
  return auntieAnansiArchivistService.initialise(profile);
};

/**
 * Quick helper to send a message to Auntie Anansi
 */
export const askAuntieAnansi = (message: string): AuntieAnansiResponse => {
  return auntieAnansiArchivistService.processMessage(message);
};

/**
 * Quick helper to get interview technique prompts
 */
export const getInterviewPrompts = () => INTERVIEW_TECHNIQUES;

/**
 * Quick helper to get difficult moment guidance
 */
export const getDifficultMomentHelp = (situation: 'tears' | 'anger' | 'confusion' | 'traumaDisclosure' | 'requestToStop' | 'technicalFailure') => {
  return DIFFICULT_MOMENT_GUIDANCE[situation];
};