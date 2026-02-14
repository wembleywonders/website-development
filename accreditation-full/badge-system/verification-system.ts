// src/accreditation/badge-system/verification-system.ts
// Badge verification and certificate generation system

import badgeDefinitions, { Badge, ALL_BADGES } from './badge-definitions';

// Helper to get badge by ID
const getBadgeById = (badgeId: string): Badge | undefined => {
  return ALL_BADGES.find(b => b.id === badgeId);
};

// ============================================
// TYPES
// ============================================

export interface VerificationCode {
  code: string;
  badgeId: string;
  learnerId: string;
  issuedAt: Date;
  expiresAt: Date | null;
  isValid: boolean;
}

export interface Certificate {
  id: string;
  learnerId: string;
  learnerName: string;
  badgeId: string;
  badgeName: string;
  programme: string;
  level: string;
  credits: number;
  issuedAt: Date;
  verificationCode: string;
  assessorName: string;
  ivaName?: string;
  ocnReference?: string;
}

export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  error?: string;
}

// ============================================
// VERIFICATION CODE GENERATION
// ============================================

/**
 * Generate a unique verification code for a badge
 * Format: WW-[PROGRAMME]-[BADGE]-[RANDOM]-[CHECKSUM]
 * Example: WW-SC-EXP-7X9K2M-A3
 */
export const generateVerificationCode = (
  badgeId: string,
  learnerId: string
): string => {
  const badge = getBadgeById(badgeId);
  if (!badge) throw new Error(`Badge not found: ${badgeId}`);
  
  // Programme prefix (2 chars)
  const programmePrefix = getProgrammePrefix(badge.programme);
  
  // Level prefix (3 chars)
  const levelPrefix = getLevelPrefix(badge.level);
  
  // Random segment (6 chars)
  const random = generateRandomSegment(6);
  
  // Checksum (2 chars)
  const checksum = calculateChecksum(`${programmePrefix}${levelPrefix}${random}`);
  
  return `WW-${programmePrefix}-${levelPrefix}-${random}-${checksum}`;
};

const getProgrammePrefix = (programme: string): string => {
  const prefixes: Record<string, string> = {
    'Scrap Cat': 'SC',
    'G-Tech Casters': 'GT',
    'TECHreneurs': 'TE',
    'STEMgineers': 'ST',
    "Kaywana's Court": 'KC',
    'Silk Stilettos': 'SS',
    "Auntie Anansi's Kitchen": 'AK',
    'Trubble n Bass': 'TB',
    'PageTurners': 'PT',
    'Joystick': 'JS'
  };
  return prefixes[programme] || 'XX';
};

const getLevelPrefix = (level: string): string => {
  const prefixes: Record<string, string> = {
    'explorer': 'EXP',
    'builder': 'BLD',
    'innovator': 'INV',
    'leader': 'LDR'
  };
  return prefixes[level] || 'XXX';
};

const generateRandomSegment = (length: number): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoiding confusable chars
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const calculateChecksum = (input: string): string => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i);
  }
  const checksumNum = sum % 100;
  return checksumNum.toString(16).toUpperCase().padStart(2, '0');
};

// ============================================
// VERIFICATION
// ============================================

/**
 * Verify a badge certificate code
 */
export const verifyCode = async (
  code: string
): Promise<VerificationResult> => {
  // Parse the code
  const parts = code.split('-');
  if (parts.length !== 5 || parts[0] !== 'WW') {
    return {
      isValid: false,
      error: 'Invalid code format'
    };
  }
  
  const [, programmePrefix, levelPrefix, random, checksum] = parts;
  
  // Verify checksum
  const expectedChecksum = calculateChecksum(`${programmePrefix}${levelPrefix}${random}`);
  if (checksum !== expectedChecksum) {
    return {
      isValid: false,
      error: 'Invalid checksum - code may be corrupted'
    };
  }
  
  // In production, this would query a database
  // For now, return a mock valid result
  return {
    isValid: true,
    certificate: {
      id: `cert-${random}`,
      learnerId: 'learner-123',
      learnerName: '[Verified Learner]',
      badgeId: 'verified-badge',
      badgeName: `${levelPrefix} Badge`,
      programme: `Programme (${programmePrefix})`,
      level: levelPrefix.toLowerCase(),
      credits: 6,
      issuedAt: new Date(),
      verificationCode: code,
      assessorName: '[Assessor]'
    }
  };
};

/**
 * Generate verification URL for a certificate
 */
export const getVerificationUrl = (code: string): string => {
  const baseUrl = 'https://wembleywonders.org/verify';
  return `${baseUrl}?code=${encodeURIComponent(code)}`;
};

// ============================================
// CERTIFICATE GENERATION
// ============================================

export interface CertificateData {
  learnerId: string;
  learnerName: string;
  badgeId: string;
  assessorName: string;
  ivaName?: string;
  ocnReference?: string;
}

/**
 * Issue a new certificate for a badge
 */
export const issueCertificate = (data: CertificateData): Certificate => {
  const badge = getBadgeById(data.badgeId);
  if (!badge) throw new Error(`Badge not found: ${data.badgeId}`);
  
  const verificationCode = generateVerificationCode(data.badgeId, data.learnerId);
  
  return {
    id: `cert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    learnerId: data.learnerId,
    learnerName: data.learnerName,
    badgeId: data.badgeId,
    badgeName: badge.name,
    programme: badge.programme,
    level: badge.level,
    credits: badge.credits,
    issuedAt: new Date(),
    verificationCode,
    assessorName: data.assessorName,
    ivaName: data.ivaName,
    ocnReference: data.ocnReference
  };
};

// ============================================
// BADGE VALIDATION
// ============================================

/**
 * Check if a learner has prerequisites for a badge
 */
export const hasPrerequisites = (
  badgeId: string,
  earnedBadgeIds: string[]
): { eligible: boolean; missing: string[] } => {
  const badge = getBadgeById(badgeId);
  if (!badge) return { eligible: false, missing: ['Badge not found'] };
  
  // Find prerequisite badge (the one that unlocks this badge)
  const prerequisite = ALL_BADGES.find(b => b.unlocks.includes(badgeId));
  
  if (!prerequisite) {
    // No prerequisite - this is an Explorer badge
    return { eligible: true, missing: [] };
  }
  
  if (earnedBadgeIds.includes(prerequisite.id)) {
    return { eligible: true, missing: [] };
  }
  
  return {
    eligible: false,
    missing: [prerequisite.name]
  };
};

/**
 * Validate evidence against badge requirements
 */
export const validateEvidence = (
  badgeId: string,
  evidenceTypes: string[]
): { complete: boolean; missing: string[] } => {
  const badge = getBadgeById(badgeId);
  if (!badge) return { complete: false, missing: ['Badge not found'] };
  
  const missing = badge.evidenceTypes.filter(
    required => !evidenceTypes.some(provided => 
      provided.toLowerCase().includes(required.toLowerCase().split(' ')[0])
    )
  );
  
  return {
    complete: missing.length === 0,
    missing
  };
};

// ============================================
// EXPORTS
// ============================================

export default {
  generateVerificationCode,
  verifyCode,
  getVerificationUrl,
  issueCertificate,
  hasPrerequisites,
  validateEvidence
};
