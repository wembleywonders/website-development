// scheduling.ts
// NEW TERRITORY (15 July 2026 session) — authored from scratch.

export type WeekdayAvailability =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday';

export type TimeOfDayAvailability = 'morning' | 'afternoon' | 'evening';

export interface VolunteerAvailability {
  volunteerId: string;
  availableDays: WeekdayAvailability[];
  availableTimes: TimeOfDayAvailability[];
  hoursPerWeek?: number;
  startDate?: string; // ISO date — earliest they can start
  notes?: string;
}
