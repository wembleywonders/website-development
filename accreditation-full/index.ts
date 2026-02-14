// src/accreditation/index.ts
// Main accreditation system exports

// Badge System
export * from './badge-system';

// Types
export type {
  Badge,
  BadgeLevel,
  MembershipTier,
  Programme,
  OCNQualification,
  ApprenticeshipStandard
} from './badge-system/badge-definitions';

export type {
  Certificate,
  VerificationCode,
  VerificationResult,
  CertificateData
} from './badge-system/verification-system';

// Default export for convenience
import BadgeDefinitions from './badge-system/badge-definitions';
import VerificationSystem from './badge-system/verification-system';

export default {
  ...BadgeDefinitions,
  ...VerificationSystem
};
