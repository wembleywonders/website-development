// recruitment.ts
// NEW TERRITORY (15 July 2026 session) — authored from scratch.

export type VolunteerInterestArea =
  | 'easy-street'
  | 'trubble-n-bass'
  | 'rayd-yo'
  | 'stemgeneers'
  | 'backstage-skills'
  | 'events-community'
  | 'admin-operations';

export const VOLUNTEER_INTEREST_OPTIONS: { value: VolunteerInterestArea; label: string }[] = [
  { value: 'easy-street', label: 'Easy Street (production support)' },
  { value: 'trubble-n-bass', label: 'Trubble n Bass (music mentoring)' },
  { value: 'rayd-yo', label: 'Rayd-yo (broadcast)' },
  { value: 'stemgeneers', label: 'STEMgeneers (workshops)' },
  { value: 'backstage-skills', label: 'Backstage Skills (props, tech)' },
  { value: 'events-community', label: 'Events & community engagement' },
  { value: 'admin-operations', label: 'Admin & operations' },
];

export type VolunteerApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'interview_scheduled'
  | 'accepted'
  | 'declined'
  | 'withdrawn';

export interface VolunteerApplication {
  fullName: string;
  email: string;
  phone?: string;
  interestAreas: VolunteerInterestArea[];
  relevantExperience?: string;
  hasWorkedWithMinorsBefore?: boolean;
  status: VolunteerApplicationStatus;
  submittedAt: string; // ISO datetime
}

export interface VolunteerApplicationResult {
  success: boolean;
  applicationId?: string;
  error?: string;
}
