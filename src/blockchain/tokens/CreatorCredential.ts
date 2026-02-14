/**
 * CREATOR CREDENTIAL SYSTEM
 * 
 * Soulbound (non-transferable) credentials that prove:
 * - Programme completion
 * - Skill verification
 * - Badge achievement
 * - Mentor certification
 * 
 * These cannot be bought, sold, or transferred.
 * They are proof of genuine achievement within the WW ecosystem.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import type {
  CreatorCredential,
  CredentialType,
  CredentialMetadata,
  CredentialAttribute
} from '../types';

// ============================================================
// PROGRAMME CREDENTIAL TEMPLATES
// ============================================================

export const PROGRAMME_CREDENTIALS: Record<string, {
  name: string;
  description: string;
  attributes: CredentialAttribute[];
  image: string;
}> = {
  'trubble-n-bass': {
    name: 'Trubble n Bass Graduate',
    description: 'Completed the Trubble n Bass music production programme. Certified in beat making, mixing, and audio production.',
    attributes: [
      { trait_type: 'Programme', value: 'Trubble n Bass' },
      { trait_type: 'Category', value: 'Music Production' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'Beat Making, Mixing, Sound Design' }
    ],
    image: '/credentials/trubble-n-bass-graduate.png'
  },
  'kawanas-court': {
    name: "Kaywana's Court Graduate",
    description: 'Completed the Kaywana\'s Court creative arts programme. Certified in fashion design, visual arts, and creative direction.',
    attributes: [
      { trait_type: 'Programme', value: "Kaywana's Court" },
      { trait_type: 'Category', value: 'Creative Arts' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'Fashion Design, Visual Arts, Styling' }
    ],
    image: '/credentials/kawanas-court-graduate.png'
  },
  'stemgeneers': {
    name: 'STEMgeneers Graduate',
    description: 'Completed the STEMgeneers programme. Certified in STEM education delivery and technical skills.',
    attributes: [
      { trait_type: 'Programme', value: 'STEMgeneers' },
      { trait_type: 'Category', value: 'STEM Education' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'STEM Tutoring, Technical Skills, Education' }
    ],
    image: '/credentials/stemgeneers-graduate.png'
  },
  'techreneurs': {
    name: 'TECHreneurs Graduate',
    description: 'Completed the TECHreneurs digital entrepreneurship programme. Certified in web development, digital marketing, and tech business.',
    attributes: [
      { trait_type: 'Programme', value: 'TECHreneurs' },
      { trait_type: 'Category', value: 'Digital Business' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'Web Dev, Digital Marketing, Business' }
    ],
    image: '/credentials/techreneurs-graduate.png'
  },
  'g-tech-casters': {
    name: 'G-Tech Casters Graduate',
    description: 'Completed the G-Tech Casters media production programme. Certified in video production, streaming, and content creation.',
    attributes: [
      { trait_type: 'Programme', value: 'G-Tech Casters' },
      { trait_type: 'Category', value: 'Media Production' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'Video Production, Streaming, Editing' }
    ],
    image: '/credentials/g-tech-casters-graduate.png'
  },
  'page-turners': {
    name: 'PageTurners Graduate',
    description: 'Completed the PageTurners writing and publishing programme. Certified in creative writing, editing, and content creation.',
    attributes: [
      { trait_type: 'Programme', value: 'PageTurners' },
      { trait_type: 'Category', value: 'Writing & Publishing' },
      { trait_type: 'Level', value: 'Graduate' },
      { trait_type: 'Skills', value: 'Creative Writing, Editing, Publishing' }
    ],
    image: '/credentials/page-turners-graduate.png'
  }
};

// ============================================================
// BADGE CREDENTIALS
// ============================================================

export const BADGE_CREDENTIALS: Record<string, {
  name: string;
  description: string;
  attributes: CredentialAttribute[];
}> = {
  'first-sale': {
    name: 'First Sale',
    description: 'Made your first sale on the WW Marketplace',
    attributes: [
      { trait_type: 'Badge Type', value: 'Milestone' },
      { trait_type: 'Achievement', value: 'First Sale' }
    ]
  },
  'rising-star': {
    name: 'Rising Star',
    description: 'Completed 10 sales on the marketplace',
    attributes: [
      { trait_type: 'Badge Type', value: 'Sales Milestone' },
      { trait_type: 'Sales Count', value: 10 }
    ]
  },
  'top-seller': {
    name: 'Top Seller',
    description: 'Completed 50 sales on the marketplace',
    attributes: [
      { trait_type: 'Badge Type', value: 'Sales Milestone' },
      { trait_type: 'Sales Count', value: 50 }
    ]
  },
  'community-champion': {
    name: 'Community Champion',
    description: 'Achieved Champion membership status through consistent contribution',
    attributes: [
      { trait_type: 'Badge Type', value: 'Status' },
      { trait_type: 'Level', value: 'Champion' }
    ]
  },
  'mentor-certified': {
    name: 'Certified Mentor',
    description: 'Completed mentor training and actively supporting new creators',
    attributes: [
      { trait_type: 'Badge Type', value: 'Certification' },
      { trait_type: 'Role', value: 'Mentor' }
    ]
  },
  'verified-creator': {
    name: 'Verified Creator',
    description: 'Identity and skills verified by Wembley Wonders',
    attributes: [
      { trait_type: 'Badge Type', value: 'Verification' },
      { trait_type: 'Status', value: 'Verified' }
    ]
  },
  'collaboration-king': {
    name: 'Collaboration King',
    description: 'Completed 5 or more successful collaborations with other creators',
    attributes: [
      { trait_type: 'Badge Type', value: 'Collaboration' },
      { trait_type: 'Collaborations', value: 5 }
    ]
  },
  'skill-combinator': {
    name: 'Skill Combinator',
    description: 'Unlocked a skill combination by completing multiple programmes',
    attributes: [
      { trait_type: 'Badge Type', value: 'Skills' },
      { trait_type: 'Achievement', value: 'Skill Combination Unlocked' }
    ]
  }
};

// ============================================================
// CREDENTIAL ISSUANCE
// ============================================================

/**
 * Issue a programme completion credential
 */
export function issueProgrammeCredential(
  creatorId: string,
  programmeId: string,
  completionDate: string,
  workshopsCompleted: number
): CreatorCredential | { error: string } {
  const template = PROGRAMME_CREDENTIALS[programmeId];
  
  if (!template) {
    return { error: `Unknown programme: ${programmeId}` };
  }
  
  const credential: CreatorCredential = {
    id: generateCredentialId(),
    creatorId,
    credentialType: 'programme-completion',
    programmeId,
    issuedAt: new Date().toISOString(),
    issuedBy: 'wembley-wonders-authority',
    metadata: {
      name: template.name,
      description: template.description,
      image: template.image,
      attributes: [
        ...template.attributes,
        { trait_type: 'Completion Date', value: completionDate },
        { trait_type: 'Workshops Completed', value: workshopsCompleted },
        { trait_type: 'Issuer', value: 'Wembley Wonders CIC' },
        { trait_type: 'Company Number', value: '12960817' }
      ]
    },
    verified: true
  };
  
  return credential;
}

/**
 * Issue a badge credential
 */
export function issueBadgeCredential(
  creatorId: string,
  badgeId: string,
  evidence?: string[]
): CreatorCredential | { error: string } {
  const template = BADGE_CREDENTIALS[badgeId];
  
  if (!template) {
    return { error: `Unknown badge: ${badgeId}` };
  }
  
  const credential: CreatorCredential = {
    id: generateCredentialId(),
    creatorId,
    credentialType: 'skill-badge',
    issuedAt: new Date().toISOString(),
    issuedBy: 'wembley-wonders-authority',
    metadata: {
      name: template.name,
      description: template.description,
      attributes: [
        ...template.attributes,
        { trait_type: 'Badge ID', value: badgeId },
        { trait_type: 'Issuer', value: 'Wembley Wonders CIC' }
      ],
      evidence
    },
    verified: true
  };
  
  return credential;
}

/**
 * Issue mentor certification
 */
export function issueMentorCertification(
  creatorId: string,
  specializations: string[],
  trainingCompletedDate: string
): CreatorCredential {
  return {
    id: generateCredentialId(),
    creatorId,
    credentialType: 'mentor-certification',
    issuedAt: new Date().toISOString(),
    issuedBy: 'wembley-wonders-authority',
    metadata: {
      name: 'Certified WW Mentor',
      description: 'Authorized to mentor new creators in the Wembley Wonders ecosystem',
      attributes: [
        { trait_type: 'Certification Type', value: 'Mentor' },
        { trait_type: 'Specializations', value: specializations.join(', ') },
        { trait_type: 'Training Completed', value: trainingCompletedDate },
        { trait_type: 'Issuer', value: 'Wembley Wonders CIC' }
      ]
    },
    verified: true
  };
}

/**
 * Issue workshop attendance credential
 */
export function issueWorkshopAttendance(
  creatorId: string,
  programmeId: string,
  workshopNumber: number,
  workshopName: string,
  attendanceDate: string
): CreatorCredential {
  return {
    id: generateCredentialId(),
    creatorId,
    credentialType: 'workshop-attendance',
    programmeId,
    issuedAt: new Date().toISOString(),
    issuedBy: 'wembley-wonders-authority',
    metadata: {
      name: `Workshop ${workshopNumber}: ${workshopName}`,
      description: `Attended workshop ${workshopNumber} of the ${programmeId} programme`,
      attributes: [
        { trait_type: 'Programme', value: programmeId },
        { trait_type: 'Workshop Number', value: workshopNumber },
        { trait_type: 'Workshop Name', value: workshopName },
        { trait_type: 'Attendance Date', value: attendanceDate }
      ]
    },
    verified: true
  };
}

// ============================================================
// CREDENTIAL VERIFICATION
// ============================================================

export interface VerificationResult {
  valid: boolean;
  credential?: CreatorCredential;
  issuer?: string;
  issuedAt?: string;
  error?: string;
}

/**
 * Verify a credential
 */
export function verifyCredential(
  credentialId: string,
  credentials: CreatorCredential[]
): VerificationResult {
  const credential = credentials.find(c => c.id === credentialId);
  
  if (!credential) {
    return { valid: false, error: 'Credential not found' };
  }
  
  if (!credential.verified) {
    return { valid: false, error: 'Credential not verified by issuer' };
  }
  
  // In production, would verify on-chain signature
  return {
    valid: true,
    credential,
    issuer: credential.issuedBy,
    issuedAt: credential.issuedAt
  };
}

/**
 * Get all credentials for a creator
 */
export function getCreatorCredentials(
  creatorId: string,
  credentials: CreatorCredential[]
): {
  programmes: CreatorCredential[];
  badges: CreatorCredential[];
  certifications: CreatorCredential[];
  workshops: CreatorCredential[];
} {
  const creatorCreds = credentials.filter(c => c.creatorId === creatorId);
  
  return {
    programmes: creatorCreds.filter(c => c.credentialType === 'programme-completion'),
    badges: creatorCreds.filter(c => c.credentialType === 'skill-badge'),
    certifications: creatorCreds.filter(c => c.credentialType === 'mentor-certification'),
    workshops: creatorCreds.filter(c => c.credentialType === 'workshop-attendance')
  };
}

/**
 * Check if creator has specific credential
 */
export function hasCredential(
  creatorId: string,
  credentialType: CredentialType,
  referenceId: string, // programmeId or badgeId
  credentials: CreatorCredential[]
): boolean {
  return credentials.some(c => 
    c.creatorId === creatorId &&
    c.credentialType === credentialType &&
    (c.programmeId === referenceId || 
     c.metadata.attributes.some(a => a.value === referenceId))
  );
}

// ============================================================
// CREDENTIAL DISPLAY
// ============================================================

export interface CredentialDisplay {
  id: string;
  name: string;
  description: string;
  image?: string;
  issuedAt: string;
  type: CredentialType;
  attributes: CredentialAttribute[];
  verificationUrl?: string;
}

/**
 * Format credential for display
 */
export function formatCredentialForDisplay(
  credential: CreatorCredential,
  explorerUrl?: string
): CredentialDisplay {
  return {
    id: credential.id,
    name: credential.metadata.name,
    description: credential.metadata.description,
    image: credential.metadata.image,
    issuedAt: credential.issuedAt,
    type: credential.credentialType,
    attributes: credential.metadata.attributes,
    verificationUrl: credential.txHash && explorerUrl
      ? `${explorerUrl}/tx/${credential.txHash}`
      : undefined
  };
}

/**
 * Generate shareable credential link
 */
export function generateCredentialShareLink(
  credential: CreatorCredential,
  baseUrl: string = 'https://wembleywonders.org'
): string {
  return `${baseUrl}/verify/credential/${credential.id}`;
}

// ============================================================
// HELPERS
// ============================================================

function generateCredentialId(): string {
  return `ww-cred-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get credential rarity (based on how many have been issued)
 */
export function calculateCredentialRarity(
  credentialType: string,
  allCredentials: CreatorCredential[]
): 'common' | 'uncommon' | 'rare' | 'legendary' {
  const count = allCredentials.filter(c => 
    c.metadata.name === PROGRAMME_CREDENTIALS[credentialType]?.name ||
    c.metadata.name === BADGE_CREDENTIALS[credentialType]?.name
  ).length;
  
  if (count > 100) return 'common';
  if (count > 50) return 'uncommon';
  if (count > 10) return 'rare';
  return 'legendary';
}

// ============================================================
// EXPORT
// ============================================================

export const CreatorCredentialService = {
  // Templates
  PROGRAMME_CREDENTIALS,
  BADGE_CREDENTIALS,
  // Issuance
  issueProgramme: issueProgrammeCredential,
  issueBadge: issueBadgeCredential,
  issueMentor: issueMentorCertification,
  issueWorkshop: issueWorkshopAttendance,
  // Verification
  verify: verifyCredential,
  getForCreator: getCreatorCredentials,
  hasCredential,
  // Display
  formatForDisplay: formatCredentialForDisplay,
  generateShareLink: generateCredentialShareLink,
  calculateRarity: calculateCredentialRarity
};

export default CreatorCredentialService;