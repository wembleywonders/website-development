// src/systems/rovs/publication-pipeline/StoryFlagger.ts
// Flags potential stories for publication

export interface StoryFlag {
  id: string;
  learnerId: string;
  learnerName: string;
  type: 'breakthrough' | 'heritage' | 'mentoring' | 'impact' | 'comeback' | 'first';
  priority: 'high' | 'medium' | 'low';
  headline: string;
  summary: string;
  context: any;
  publishTarget: 'joystick' | 'raydyo' | 'both';
  flaggedBy: string; // ROV ID
  flaggedAt: Date;
  status: 'flagged' | 'drafting' | 'review' | 'approved' | 'published' | 'archived';
}

export interface StoryTrigger {
  type: string;
  conditions: string[];
  priority: 'high' | 'medium' | 'low';
  publishTarget: 'joystick' | 'raydyo' | 'both';
}

export class StoryFlagger {
  private triggers: StoryTrigger[];
  private flaggedStories: Map<string, StoryFlag>;

  constructor() {
    this.flaggedStories = new Map();
    this.triggers = this.initializeTriggers();
  }

  private initializeTriggers(): StoryTrigger[] {
    return [
      // High priority triggers
      {
        type: 'breakthrough',
        conditions: ['first-success-after-failures', 'skill-mastery', 'unexpected-achievement'],
        priority: 'high',
        publishTarget: 'joystick'
      },
      {
        type: 'heritage',
        conditions: ['elder-teaching', 'cultural-preservation', 'family-tradition', 'oral-history'],
        priority: 'high',
        publishTarget: 'both'
      },
      {
        type: 'mentoring',
        conditions: ['learner-becomes-teacher', 'mentee-success', 'intergenerational-learning'],
        priority: 'high',
        publishTarget: 'joystick'
      },
      // Medium priority triggers
      {
        type: 'impact',
        conditions: ['community-benefit', 'device-saved', 'money-saved', 'environmental-impact'],
        priority: 'medium',
        publishTarget: 'joystick'
      },
      {
        type: 'comeback',
        conditions: ['return-after-absence', 'overcoming-barrier', 're-engagement'],
        priority: 'medium',
        publishTarget: 'joystick'
      },
      // Low priority triggers
      {
        type: 'first',
        conditions: ['first-badge', 'first-workshop', 'first-repair', 'first-recording'],
        priority: 'low',
        publishTarget: 'joystick'
      }
    ];
  }

  /**
   * Check if activity triggers a story flag
   */
  checkForStory(
    learnerId: string,
    learnerName: string,
    activity: string,
    context: any
  ): StoryFlag | null {
    const activityLower = activity.toLowerCase();

    for (const trigger of this.triggers) {
      const matchedCondition = trigger.conditions.find(condition => 
        activityLower.includes(condition.replace(/-/g, ' ')) ||
        activityLower.includes(condition.replace(/-/g, ''))
      );

      if (matchedCondition) {
        return this.createFlag(
          learnerId,
          learnerName,
          trigger.type as StoryFlag['type'],
          trigger.priority,
          matchedCondition,
          context,
          trigger.publishTarget
        );
      }
    }

    return null;
  }

  /**
   * Create a story flag
   */
  createFlag(
    learnerId: string,
    learnerName: string,
    type: StoryFlag['type'],
    priority: StoryFlag['priority'],
    trigger: string,
    context: any,
    publishTarget: StoryFlag['publishTarget']
  ): StoryFlag {
    const flag: StoryFlag = {
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      learnerId,
      learnerName,
      type,
      priority,
      headline: this.generateHeadline(type, trigger, learnerName),
      summary: this.generateSummary(type, trigger, context),
      context,
      publishTarget,
      flaggedBy: 'collector-rov',
      flaggedAt: new Date(),
      status: 'flagged'
    };

    this.flaggedStories.set(flag.id, flag);
    return flag;
  }

  /**
   * Generate headline for story
   */
  private generateHeadline(type: string, trigger: string, learnerName: string): string {
    const templates: Record<string, string[]> = {
      breakthrough: [
        'From Struggle to Success',
        'The Moment It Clicked',
        'Breaking Through Barriers'
      ],
      heritage: [
        'Preserving Our Stories',
        'Wisdom Across Generations',
        'Keeping Culture Alive'
      ],
      mentoring: [
        'Paying It Forward',
        'When Learners Become Teachers',
        'The Power of Mentoring'
      ],
      impact: [
        'Making a Difference',
        'Community Impact',
        'Real Change, Real People'
      ],
      comeback: [
        'Back and Stronger',
        'The Return',
        'Never Too Late'
      ],
      first: [
        'First Steps',
        'A New Beginning',
        'Starting the Journey'
      ]
    };

    const options = templates[type] || ['A Story Worth Telling'];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Generate summary for story
   */
  private generateSummary(type: string, trigger: string, context: any): string {
    return `[DRAFT] Story about ${trigger.replace(/-/g, ' ')}. Context: ${JSON.stringify(context).substring(0, 100)}...`;
  }

  /**
   * Get flagged stories by status
   */
  getByStatus(status: StoryFlag['status']): StoryFlag[] {
    return Array.from(this.flaggedStories.values())
      .filter(s => s.status === status)
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }

  /**
   * Update story status
   */
  updateStatus(storyId: string, status: StoryFlag['status']): boolean {
    const story = this.flaggedStories.get(storyId);
    if (story) {
      story.status = status;
      return true;
    }
    return false;
  }

  /**
   * Get high priority stories for review
   */
  getHighPriorityQueue(): StoryFlag[] {
    return this.getByStatus('flagged').filter(s => s.priority === 'high');
  }
}

export default StoryFlagger;