// backstage-skills.ts
// Types for the Backstage Skills workshop programme.
// NEW TERRITORY (15 July 2026 session) — authored from scratch, not recovered.
// No backend DTO confirmed to exist yet for this shape; treat as a frontend-only
// draft until a matching Spring Boot entity/DTO is confirmed on the live schema.

export type WorkshopSkillLevel = 'newcomer' | 'some-experience' | 'confident' | 'mentor-ready';

export const SKILL_LEVEL_OPTIONS: { value: WorkshopSkillLevel; label: string }[] = [
  { value: 'newcomer', label: "Newcomer — never done this before" },
  { value: 'some-experience', label: 'Some experience' },
  { value: 'confident', label: 'Confident — comfortable working independently' },
  { value: 'mentor-ready', label: 'Confident enough to help others' },
];

export interface WorkshopSessionSlot {
  id: string;
  label: string;       // e.g. "Saturday 9 Aug, 10am–1pm"
  capacity: number;
  spotsRemaining: number;
}

export interface WorkshopRegistration {
  fullName: string;
  email: string;
  skillLevel: WorkshopSkillLevel;
  sessionSlotId: string | null;
  accessibilityNotes?: string;
}

export interface WorkshopRegistrationResult {
  success: boolean;
  registrationId?: string;
  error?: string;
}