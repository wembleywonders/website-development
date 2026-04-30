// badge-definitions.ts
// Wembley Wonders badge definitions for accreditation system

export interface BadgeDefinition {
  id: string;
  programme: string;
  level: 'explorer' | 'builder' | 'innovator' | 'leader';
  title: string;
  description: string;
  criteria: string[];
  evidenceTypes: string[];
  creditValue: number;
  linkedQualification?: string;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'tnb-explorer',
    programme: 'trubble-n-bass',
    level: 'explorer',
    title: 'Trubble n Bass Explorer',
    description: 'Demonstrated ability to create a complete beat using the platform tools.',
    criteria: [
      'Created and exported at least one original beat',
      'Used at least 3 instrument tracks',
      'Demonstrated understanding of rhythm and timing',
      'Applied a cultural style reference',
    ],
    evidenceTypes: ['wav-export', 'session-record', 'self-assessment'],
    creditValue: 3,
  },
  {
    id: 'tnb-builder',
    programme: 'trubble-n-bass',
    level: 'builder',
    title: 'Trubble n Bass Builder',
    description: 'Produced a complete track with melody, harmony, and rhythm.',
    criteria: [
      'Produced a track with original melody',
      'Applied scale and harmony principles',
      'Exported and listed on Cyberstore',
      'Completed peer review process',
    ],
    evidenceTypes: ['cyberstore-listing', 'track-export', 'peer-review'],
    creditValue: 6,
  },
  {
    id: 'gtc-explorer',
    programme: 'g-tech-casters',
    level: 'explorer',
    title: 'G-Tech Casters Explorer',
    description: 'Produced and published a podcast episode.',
    criteria: [
      'Recorded and edited an audio episode',
      'Applied basic audio production techniques',
      'Published to Rayd-yo or equivalent',
      'Written show notes',
    ],
    evidenceTypes: ['audio-file', 'published-episode', 'show-notes'],
    creditValue: 3,
  },
];
