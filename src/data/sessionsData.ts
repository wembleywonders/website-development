// ═══════════════════════════════════════════════════════════════
// SESSIONS DATA — Dynamic programme-linked session schedule
// ═══════════════════════════════════════════════════════════════
// Replaces hardcoded sample sessions. Each session links to its
// programme, facilitation guide week, and spark generator.
//
// In production, this would come from a database/API.
// For now, it generates a realistic schedule from programme data.
// ═══════════════════════════════════════════════════════════════

import { PROGRAMMES } from '../workshops/spark-generator/sparkData';

export interface ScheduledSession {
  id: string;
  title: string;
  programmeId: string;
  programmeName: string;
  programmeIcon: string;
  programmeColor: string;
  week: number;
  date: string;             // ISO date
  time: string;             // e.g. "19:00-20:30"
  day: string;              // e.g. "Tuesday"
  facilitator: string;
  zoomLink?: string;
  status: 'upcoming' | 'live' | 'completed';
  sparkGeneratorUrl: string;
  facilitationGuideUrl: string;
  sandboxUrl: string;
}

// ═══════════════════════════════════════════════════════════════
// PROGRAMME SCHEDULE CONFIG
// ═══════════════════════════════════════════════════════════════
// Maps programmes to their regular session days/times and
// the seasonal blocks they run in.
// ═══════════════════════════════════════════════════════════════

interface ProgrammeScheduleConfig {
  programmeId: string;
  day: string;
  time: string;
  facilitator: string;
  season?: 'spring' | 'summer' | 'autumn' | 'year-round';
}

const SCHEDULE_CONFIG: ProgrammeScheduleConfig[] = [
  // Year-round programmes (run all 32 weeks)
  { programmeId: 'pageturners', day: 'Tuesday', time: '19:00-19:45', facilitator: 'TBC', season: 'year-round' },
  { programmeId: 'gtechcasters', day: 'Wednesday', time: '19:00-19:45', facilitator: 'TBC', season: 'year-round' },
  { programmeId: 'bright_sparks', day: 'Saturday', time: '10:00-10:45', facilitator: 'TBC', season: 'year-round' },

  // Spring programmes (March–May)
  { programmeId: 'trubble_n_bass', day: 'Thursday', time: '19:00-19:45', facilitator: 'TBC', season: 'spring' },
  { programmeId: 'stemgeneers', day: 'Monday', time: '19:00-19:45', facilitator: 'TBC', season: 'spring' },

  // Summer programmes (June–August)
  { programmeId: 'kaywanas_court', day: 'Thursday', time: '19:00-19:45', facilitator: 'TBC', season: 'summer' },
  { programmeId: 'silk_stilettos', day: 'Monday', time: '19:00-19:45', facilitator: 'TBC', season: 'summer' },
  { programmeId: 'auntie_anansi', day: 'Saturday', time: '11:00-11:45', facilitator: 'TBC', season: 'summer' },

  // Autumn programmes (September–November)
  { programmeId: 'techreneurs', day: 'Thursday', time: '19:00-19:45', facilitator: 'TBC', season: 'autumn' },
  { programmeId: 'impact_labs', day: 'Monday', time: '19:00-19:45', facilitator: 'TBC', season: 'autumn' },
  { programmeId: 'creator_factory', day: 'Wednesday', time: '18:00-18:45', facilitator: 'TBC', season: 'autumn' },

  // Easy Street (runs as 6-week intensive blocks, scheduled manually)
  { programmeId: 'easy_street', day: 'Friday', time: '19:00-20:30', facilitator: 'TBC', season: 'year-round' },
];

// ═══════════════════════════════════════════════════════════════
// SESSION GENERATOR
// ═══════════════════════════════════════════════════════════════
// Generates sessions for a given date range from the config.
// In production, replace with database queries.
// ═══════════════════════════════════════════════════════════════

const DAY_MAP: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const SEASON_MONTHS: Record<string, number[]> = {
  spring: [2, 3, 4],       // March, April, May
  summer: [5, 6, 7],       // June, July, August
  autumn: [8, 9, 10],      // September, October, November
  'year-round': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

function getNextDayOfWeek(from: Date, dayName: string): Date {
  const targetDay = DAY_MAP[dayName];
  const d = new Date(from);
  const diff = (targetDay - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + (diff === 0 ? 0 : diff));
  return d;
}

export function generateSessions(
  fromDate: Date = new Date(),
  weeksAhead: number = 8
): ScheduledSession[] {
  const sessions: ScheduledSession[] = [];
  const endDate = new Date(fromDate);
  endDate.setDate(endDate.getDate() + weeksAhead * 7);

  for (const config of SCHEDULE_CONFIG) {
    const prog = PROGRAMMES[config.programmeId];
    if (!prog) continue;

    // Check if programme runs in current season
    const activeMonths = SEASON_MONTHS[config.season || 'year-round'];

    let currentDate = getNextDayOfWeek(new Date(fromDate), config.day);
    let weekCounter = 1;

    while (currentDate <= endDate && weekCounter <= 8) {
      const month = currentDate.getMonth();

      if (activeMonths.includes(month)) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const now = new Date();
        const sessionDate = new Date(currentDate);

        let status: 'upcoming' | 'live' | 'completed' = 'upcoming';
        if (sessionDate < now) status = 'completed';
        // Simple "live" check — same day
        if (sessionDate.toDateString() === now.toDateString()) status = 'live';

        sessions.push({
          id: `${config.programmeId}-w${weekCounter}-${dateStr}`,
          title: `${prog.name} — Week ${weekCounter}`,
          programmeId: config.programmeId,
          programmeName: prog.name,
          programmeIcon: prog.icon,
          programmeColor: prog.color,
          week: weekCounter,
          date: dateStr,
          time: config.time,
          day: config.day,
          facilitator: config.facilitator,
          status,
          sparkGeneratorUrl: `/workshops/spark-generator?programme=${config.programmeId}`,
          facilitationGuideUrl: `/workshops/facilitation?programme=${config.programmeId}`,
          sandboxUrl: prog.routes.sandbox,
        });

        weekCounter++;
      }

      // Move to next week
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  // Sort by date
  sessions.sort((a, b) => a.date.localeCompare(b.date));
  return sessions;
}

// ═══════════════════════════════════════════════════════════════
// STATIC RECURRING SESSIONS
// ═══════════════════════════════════════════════════════════════
// Non-programme sessions that recur weekly
// ═══════════════════════════════════════════════════════════════

export interface RecurringSession {
  title: string;
  day: string;
  time: string;
  description: string;
  type: 'drop-in' | 'feedback' | 'social' | 'governance';
}

export const RECURRING_SESSIONS: RecurringSession[] = [
  {
    title: 'Drop-in Help Desk',
    day: 'Wednesday',
    time: '12:00-13:00',
    description: 'Open Zoom room for technical help, project questions, and general support.',
    type: 'drop-in',
  },
  {
    title: 'Friday Feedback Circle',
    day: 'Friday',
    time: '17:00-17:45',
    description: 'Share your work-in-progress. Get constructive feedback. Build accountability.',
    type: 'feedback',
  },
  {
    title: 'Saturday Skills Swap',
    day: 'Saturday',
    time: '14:00-15:00',
    description: 'Teach something you know. Learn something you don\'t. Community knowledge exchange.',
    type: 'social',
  },
];

// ═══════════════════════════════════════════════════════════════
// FILTER HELPERS
// ═══════════════════════════════════════════════════════════════

export function filterSessionsByProgramme(sessions: ScheduledSession[], programmeId: string): ScheduledSession[] {
  return sessions.filter(s => s.programmeId === programmeId);
}

export function filterSessionsByWeek(sessions: ScheduledSession[], fromDate: Date, toDate: Date): ScheduledSession[] {
  const from = fromDate.toISOString().split('T')[0];
  const to = toDate.toISOString().split('T')[0];
  return sessions.filter(s => s.date >= from && s.date <= to);
}

export function getThisWeeksSessions(sessions: ScheduledSession[]): ScheduledSession[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
  return filterSessionsByWeek(sessions, startOfWeek, endOfWeek);
}

export function getUpcomingSessions(sessions: ScheduledSession[], count: number = 10): ScheduledSession[] {
  const today = new Date().toISOString().split('T')[0];
  return sessions.filter(s => s.date >= today).slice(0, count);
}