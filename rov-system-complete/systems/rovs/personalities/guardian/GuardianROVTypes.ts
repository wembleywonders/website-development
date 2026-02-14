// src/systems/rovs/personalities/guardian/GuardianROVTypes.ts

export interface GuardianConfig {
  ageVerificationRequired: boolean;
  consentTrackingEnabled: boolean;
  interactionMonitoringEnabled: boolean;
  autoEscalationEnabled: boolean;
  escalationContactEmail: string;
}

export interface ConsentRecord {
  id: string;
  learnerId: string;
  consentType: string;
  granted: boolean;
  grantedAt?: Date;
  expiresAt?: Date;
  parentalConsent: boolean;
  parentGuardianName?: string;
  withdrawnAt?: Date;
  notes?: string;
}

export interface SafeguardingIncident {
  id: string;
  type: 'concern' | 'disclosure' | 'allegation' | 'observation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  reportedBy: string;
  reportedAt: Date;
  involvedParties: string[];
  actionTaken: string[];
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  escalatedTo?: string;
  resolution?: string;
}

export interface DBS {
  staffId: string;
  certificateNumber: string;
  issueDate: Date;
  updateServiceRegistered: boolean;
  lastChecked: Date;
  status: 'valid' | 'expired' | 'pending';
}

export const DEFAULT_GUARDIAN_CONFIG: GuardianConfig = {
  ageVerificationRequired: true,
  consentTrackingEnabled: true,
  interactionMonitoringEnabled: true,
  autoEscalationEnabled: true,
  escalationContactEmail: 'safeguarding@wembleywonders.org'
};

export const CONSENT_TYPES = [
  {
    id: 'media-consent',
    name: 'Media Consent',
    description: 'Permission to photograph/record for portfolio and publication',
    requiresParental: true,
    expiryDays: 365
  },
  {
    id: 'activity-consent',
    name: 'Activity Consent',
    description: 'Permission to participate in workshops and activities',
    requiresParental: true,
    expiryDays: 365
  },
  {
    id: 'data-consent',
    name: 'Data Processing Consent',
    description: 'Permission to store and process learning data',
    requiresParental: true,
    expiryDays: null // No expiry
  },
  {
    id: 'mentoring-consent',
    name: 'Mentoring Consent',
    description: 'Permission for 1:1 mentoring sessions',
    requiresParental: true,
    expiryDays: 180
  }
];

export const SAFEGUARDING_CONTACTS = {
  dsl: 'Designated Safeguarding Lead',
  deputy: 'Deputy Safeguarding Lead',
  lado: 'Local Authority Designated Officer',
  police: '999 (emergency) / 101 (non-emergency)',
  childline: '0800 1111',
  nspcc: '0808 800 5000'
};
