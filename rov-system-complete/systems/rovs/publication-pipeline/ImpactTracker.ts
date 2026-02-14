// src/systems/rovs/publication-pipeline/ImpactTracker.ts
// Tracks the impact of published stories

export interface PublicationImpact {
  id: string;
  storyId: string;
  draftId: string;
  publishedAt: Date;
  platform: 'joystick' | 'raydyo' | 'both';
  metrics: ImpactMetrics;
  engagements: Engagement[];
  outcomes: Outcome[];
  lastUpdated: Date;
}

export interface ImpactMetrics {
  views: number;
  reads: number; // Completed reads
  shares: number;
  comments: number;
  reactions: number;
  timeOnPage: number; // Average seconds
  reachEstimate: number;
}

export interface Engagement {
  id: string;
  type: 'comment' | 'share' | 'reaction' | 'mention' | 'response';
  content?: string;
  platform: string;
  userId?: string;
  timestamp: Date;
}

export interface Outcome {
  id: string;
  type: 'signup' | 'enquiry' | 'donation' | 'partnership' | 'media-mention' | 'award';
  description: string;
  value?: number; // Monetary value if applicable
  verified: boolean;
  timestamp: Date;
}

export class ImpactTracker {
  private impacts: Map<string, PublicationImpact>;

  constructor() {
    this.impacts = new Map();
  }

  /**
   * Start tracking a published story
   */
  startTracking(
    storyId: string,
    draftId: string,
    platform: 'joystick' | 'raydyo' | 'both'
  ): PublicationImpact {
    const impact: PublicationImpact = {
      id: `impact-${Date.now()}`,
      storyId,
      draftId,
      publishedAt: new Date(),
      platform,
      metrics: {
        views: 0,
        reads: 0,
        shares: 0,
        comments: 0,
        reactions: 0,
        timeOnPage: 0,
        reachEstimate: 0
      },
      engagements: [],
      outcomes: [],
      lastUpdated: new Date()
    };

    this.impacts.set(storyId, impact);
    return impact;
  }

  /**
   * Update metrics
   */
  updateMetrics(storyId: string, metrics: Partial<ImpactMetrics>): boolean {
    const impact = this.impacts.get(storyId);
    if (impact) {
      impact.metrics = { ...impact.metrics, ...metrics };
      impact.lastUpdated = new Date();
      return true;
    }
    return false;
  }

  /**
   * Record an engagement
   */
  recordEngagement(
    storyId: string,
    type: Engagement['type'],
    platform: string,
    content?: string,
    userId?: string
  ): Engagement | null {
    const impact = this.impacts.get(storyId);
    if (!impact) return null;

    const engagement: Engagement = {
      id: `eng-${Date.now()}`,
      type,
      content,
      platform,
      userId,
      timestamp: new Date()
    };

    impact.engagements.push(engagement);
    impact.lastUpdated = new Date();

    // Update relevant metric
    switch (type) {
      case 'comment':
        impact.metrics.comments++;
        break;
      case 'share':
        impact.metrics.shares++;
        break;
      case 'reaction':
        impact.metrics.reactions++;
        break;
    }

    return engagement;
  }

  /**
   * Record an outcome
   */
  recordOutcome(
    storyId: string,
    type: Outcome['type'],
    description: string,
    value?: number
  ): Outcome | null {
    const impact = this.impacts.get(storyId);
    if (!impact) return null;

    const outcome: Outcome = {
      id: `out-${Date.now()}`,
      type,
      description,
      value,
      verified: false,
      timestamp: new Date()
    };

    impact.outcomes.push(outcome);
    impact.lastUpdated = new Date();

    return outcome;
  }

  /**
   * Verify an outcome
   */
  verifyOutcome(storyId: string, outcomeId: string): boolean {
    const impact = this.impacts.get(storyId);
    if (!impact) return false;

    const outcome = impact.outcomes.find(o => o.id === outcomeId);
    if (outcome) {
      outcome.verified = true;
      return true;
    }
    return false;
  }

  /**
   * Get impact report for a story
   */
  getImpactReport(storyId: string): {
    metrics: ImpactMetrics;
    engagementSummary: Record<string, number>;
    outcomeSummary: Record<string, number>;
    totalValue: number;
    score: number;
  } | null {
    const impact = this.impacts.get(storyId);
    if (!impact) return null;

    // Summarize engagements by type
    const engagementSummary: Record<string, number> = {};
    impact.engagements.forEach(e => {
      engagementSummary[e.type] = (engagementSummary[e.type] || 0) + 1;
    });

    // Summarize outcomes by type
    const outcomeSummary: Record<string, number> = {};
    impact.outcomes.forEach(o => {
      outcomeSummary[o.type] = (outcomeSummary[o.type] || 0) + 1;
    });

    // Calculate total value
    const totalValue = impact.outcomes
      .filter(o => o.verified && o.value)
      .reduce((sum, o) => sum + (o.value || 0), 0);

    // Calculate impact score (0-100)
    const score = this.calculateImpactScore(impact);

    return {
      metrics: impact.metrics,
      engagementSummary,
      outcomeSummary,
      totalValue,
      score
    };
  }

  /**
   * Calculate impact score
   */
  private calculateImpactScore(impact: PublicationImpact): number {
    let score = 0;

    // Views contribution (max 20 points)
    score += Math.min(20, impact.metrics.views / 50);

    // Engagement contribution (max 30 points)
    const engagementRate = impact.metrics.views > 0
      ? (impact.metrics.comments + impact.metrics.shares + impact.metrics.reactions) / impact.metrics.views
      : 0;
    score += Math.min(30, engagementRate * 300);

    // Shares contribution (max 20 points)
    score += Math.min(20, impact.metrics.shares * 2);

    // Outcomes contribution (max 30 points)
    const verifiedOutcomes = impact.outcomes.filter(o => o.verified).length;
    score += Math.min(30, verifiedOutcomes * 10);

    return Math.round(score);
  }

  /**
   * Get top performing stories
   */
  getTopStories(limit: number = 10): Array<{ storyId: string; score: number }> {
    return Array.from(this.impacts.values())
      .map(impact => ({
        storyId: impact.storyId,
        score: this.calculateImpactScore(impact)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Get aggregate stats across all stories
   */
  getAggregateStats(): {
    totalStories: number;
    totalViews: number;
    totalShares: number;
    totalOutcomes: number;
    totalValue: number;
    avgScore: number;
  } {
    const impacts = Array.from(this.impacts.values());
    
    const totalViews = impacts.reduce((sum, i) => sum + i.metrics.views, 0);
    const totalShares = impacts.reduce((sum, i) => sum + i.metrics.shares, 0);
    const totalOutcomes = impacts.reduce((sum, i) => sum + i.outcomes.length, 0);
    const totalValue = impacts.reduce((sum, i) => 
      sum + i.outcomes.filter(o => o.verified).reduce((s, o) => s + (o.value || 0), 0), 0
    );
    const avgScore = impacts.length > 0
      ? impacts.reduce((sum, i) => sum + this.calculateImpactScore(i), 0) / impacts.length
      : 0;

    return {
      totalStories: impacts.length,
      totalViews,
      totalShares,
      totalOutcomes,
      totalValue,
      avgScore: Math.round(avgScore)
    };
  }
}

export default ImpactTracker;
