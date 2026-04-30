// src/types/intellectual-property/assessment.ts
// Assessment type definitions for IP and creative work evaluation

export interface AssessmentCriteria {
  id: string;
  title: string;
  description: string;
  evidenceRequired: string[];
  passMark: number;
  weight: number;
}

export interface AssessmentUnit {
  id: string;
  unitNumber: string;
  title: string;
  level: number;
  credits: number;
  criteria: AssessmentCriteria[];
}

export interface AssessmentRecord {
  learnerId: string;
  unitId: string;
  assessorId: string;
  dateAssessed: string;
  outcome: 'pass' | 'refer' | 'pending';
  evidenceSubmitted: string[];
  assessorNotes: string;
  internalVerified: boolean;
  externalVerified: boolean;
}

export interface IPAssessment {
  workId: string;
  creatorId: string;
  workType: string;
  originality: 'original' | 'derivative' | 'collaborative';
  provenanceVerified: boolean;
  assessmentDate: string;
  assessorNotes: string;
}
