// verification-system.ts
// Internal and external verification workflow for Wembley Wonders accreditation

export interface VerificationRecord {
  id: string;
  assessmentId: string;
  verifierType: 'internal' | 'external';
  verifierId: string;
  verificationDate: string;
  outcome: 'confirmed' | 'referred' | 'rejected';
  notes: string;
  samplingMethod: 'random' | 'targeted' | 'risk-based';
}

export interface SamplingPlan {
  period: string;
  targetPercentage: number;
  priorityAreas: string[];
  verifierAssigned: string;
}

// Internal verification: minimum 10% sample of all assessments
// New assessors: 100% of first 10 assessments verified
// High-risk units: 25% minimum sample
export const VERIFICATION_THRESHOLDS = {
  standardSample: 0.10,
  newAssessorSample: 1.0,
  newAssessorThreshold: 10,
  highRiskSample: 0.25,
};
