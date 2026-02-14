// src/systems/rovs/personalities/collector/CollectorROVTypes.ts

export interface CollectorConfig {
  autoFlagBreakthroughs: boolean;
  heritagePriorityBoost: boolean;
  editorialReviewRequired: boolean;
  draftAssistanceEnabled: boolean;
}

export interface StoryDraft {
  storyId: string;
  version: number;
  headline: string;
  leadParagraph: string;
  body: string;
  quotes: string[];
  mediaRefs: string[];
  wordCount: number;
  createdAt: Date;
  lastEditedAt: Date;
  readyForReview: boolean;
}

export interface PublicationQueue {
  joystick: StoryDraft[];
  raydyo: StoryDraft[];
  pending: StoryDraft[];
  published: StoryDraft[];
}

export const DEFAULT_COLLECTOR_CONFIG: CollectorConfig = {
  autoFlagBreakthroughs: true,
  heritagePriorityBoost: true,
  editorialReviewRequired: true,
  draftAssistanceEnabled: true
};

export const STORY_TRIGGERS = {
  HIGH: [
    'elder teaching younger person',
    'first successful build after multiple attempts',
    'mentoring another learner',
    'preserving endangered skill/recipe',
    'community impact measurable'
  ],
  MEDIUM: [
    'milestone completion',
    'cross-programme participation',
    'creative problem-solving',
    'family involvement'
  ],
  LOW: [
    'regular activity logging',
    'workshop attendance',
    'simulator practice'
  ]
};