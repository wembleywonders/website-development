// src/systems/rovs/publication-pipeline/DraftGenerator.ts
// Generates story drafts for editorial review

import { StoryFlag } from './StoryFlagger';

export interface StoryDraft {
  id: string;
  storyId: string;
  version: number;
  headline: string;
  subheadline?: string;
  leadParagraph: string;
  body: string;
  quotes: string[];
  callToAction: string;
  mediaRefs: string[];
  tags: string[];
  wordCount: number;
  readingTime: number; // minutes
  createdAt: Date;
  lastEditedAt: Date;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  editorNotes?: string;
}

export class DraftGenerator {
  private drafts: Map<string, StoryDraft[]>;

  constructor() {
    this.drafts = new Map();
  }

  /**
   * Generate a draft from a story flag
   */
  generateDraft(story: StoryFlag): StoryDraft {
    const draft: StoryDraft = {
      id: `draft-${Date.now()}`,
      storyId: story.id,
      version: 1,
      headline: story.headline,
      subheadline: this.generateSubheadline(story),
      leadParagraph: this.generateLead(story),
      body: this.generateBody(story),
      quotes: this.extractQuotes(story),
      callToAction: this.generateCTA(story),
      mediaRefs: [],
      tags: this.generateTags(story),
      wordCount: 0,
      readingTime: 0,
      createdAt: new Date(),
      lastEditedAt: new Date(),
      status: 'draft'
    };

    // Calculate word count and reading time
    const allText = `${draft.headline} ${draft.leadParagraph} ${draft.body}`;
    draft.wordCount = allText.split(/\s+/).length;
    draft.readingTime = Math.ceil(draft.wordCount / 200);

    // Store draft
    const existing = this.drafts.get(story.id) || [];
    existing.push(draft);
    this.drafts.set(story.id, existing);

    return draft;
  }

  /**
   * Generate subheadline
   */
  private generateSubheadline(story: StoryFlag): string {
    const templates: Record<string, string[]> = {
      breakthrough: [
        'A story of persistence and success',
        'When determination meets opportunity'
      ],
      heritage: [
        'Preserving what matters most',
        'Stories that connect generations'
      ],
      mentoring: [
        'The ripple effect of giving back',
        'How one person can change everything'
      ],
      impact: [
        'Making a real difference',
        'Community change in action'
      ],
      comeback: [
        'Every setback is a setup for a comeback',
        'Proving that it\'s never too late'
      ],
      first: [
        'The beginning of something new',
        'Taking the first step'
      ]
    };

    const options = templates[story.type] || ['A Wembley Wonders story'];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Generate lead paragraph
   */
  private generateLead(story: StoryFlag): string {
    return `[DRAFT - REQUIRES EDITORIAL REVIEW]\n\n${story.learnerName} recently achieved something worth celebrating. ${story.summary}\n\nThis is their story.`;
  }

  /**
   * Generate body content
   */
  private generateBody(story: StoryFlag): string {
    const sections = [
      '## The Journey\n[Interview learner about their background and what brought them to Wembley Wonders]',
      '## The Challenge\n[Describe the obstacles they faced]',
      '## The Breakthrough\n[Detail the moment of success]',
      '## What It Means\n[Explore the impact on their life and community]',
      '## What\'s Next\n[Future plans and aspirations]'
    ];

    return sections.join('\n\n');
  }

  /**
   * Extract potential quotes
   */
  private extractQuotes(story: StoryFlag): string[] {
    return [
      `"[PLACEHOLDER: Get quote from ${story.learnerName} about their experience]"`,
      '"[PLACEHOLDER: Get quote from mentor/facilitator if applicable]"'
    ];
  }

  /**
   * Generate call to action
   */
  private generateCTA(story: StoryFlag): string {
    const ctas: Record<string, string> = {
      joystick: 'Want to start your own journey? [Join Wembley Wonders today](#)',
      raydyo: 'Hear more stories like this on Rayd-yo',
      both: 'Your story could be next. [Get started](#)'
    };

    return ctas[story.publishTarget] || ctas.joystick;
  }

  /**
   * Generate tags
   */
  private generateTags(story: StoryFlag): string[] {
    const baseTags = [story.type, 'wembley-wonders', 'community'];
    
    if (story.context?.programme) {
      baseTags.push(story.context.programme.toLowerCase().replace(/\s+/g, '-'));
    }

    return baseTags;
  }

  /**
   * Get drafts for a story
   */
  getDrafts(storyId: string): StoryDraft[] {
    return this.drafts.get(storyId) || [];
  }

  /**
   * Get latest draft
   */
  getLatestDraft(storyId: string): StoryDraft | null {
    const drafts = this.getDrafts(storyId);
    return drafts.length > 0 ? drafts[drafts.length - 1] : null;
  }

  /**
   * Update draft
   */
  updateDraft(draftId: string, updates: Partial<StoryDraft>): StoryDraft | null {
    for (const [storyId, drafts] of this.drafts) {
      const index = drafts.findIndex(d => d.id === draftId);
      if (index !== -1) {
        drafts[index] = {
          ...drafts[index],
          ...updates,
          lastEditedAt: new Date()
        };
        return drafts[index];
      }
    }
    return null;
  }

  /**
   * Create new version of draft
   */
  createNewVersion(draftId: string): StoryDraft | null {
    for (const [storyId, drafts] of this.drafts) {
      const draft = drafts.find(d => d.id === draftId);
      if (draft) {
        const newDraft: StoryDraft = {
          ...draft,
          id: `draft-${Date.now()}`,
          version: draft.version + 1,
          createdAt: new Date(),
          lastEditedAt: new Date(),
          status: 'draft'
        };
        drafts.push(newDraft);
        return newDraft;
      }
    }
    return null;
  }
}

export default DraftGenerator;