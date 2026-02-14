// src/accreditation/badge-system/index.ts
// Main exports for badge system

export * from './badge-definitions';
export * from './verification-system';

// Re-export commonly used items
export {
  ALL_BADGES,
  OCN_QUALIFICATIONS,
  APPRENTICESHIP_STANDARDS,
  getBadgesByProgramme,
  getBadgesByLevel,
  getNextBadge,
  getQualificationProgress
} from './badge-definitions';

export {
  generateVerificationCode,
  verifyCode,
  issueCertificate,
  hasPrerequisites,
  validateEvidence
} from './verification-system';
