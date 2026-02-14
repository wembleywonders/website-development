export interface CommunityStory {
  id: string;
  participantName: string;
  businessPartner?: string;
  storyType: 'success' | 'progress' | 'challenge' | 'collaboration';
  content: string;
  platform: 'raydyo' | 'joystick' | 'passionistas' | 'kaywanas-court';
  dateCollected: Date;
  verificationStatus: 'unverified' | 'participant-confirmed' | 'independently-verified';
  tags: string[];
  mediaLinks?: string[];
}

export interface ImpactMetric {
  id: string;
  businessId: string;
  metricType: 'employment' | 'skills-gained' | 'projects-completed' | 'mentorship-hours';
  value: number;
  description: string;
  verificationLevel: 'self-reported' | 'participant-confirmed' | 'third-party-verified';
  evidenceLinks: string[];
  dateRecorded: Date;
}

export interface StoryPrompt {
  platform: string;
  questions: string[];
  followUpQuestions: string[];
}
