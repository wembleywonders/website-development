// src/systems/rovs/badge-integration/BadgeRecommender.ts
// Recommends badges based on learner activity and interests

export interface BadgeRecommendation {
  badgeId: string;
  badgeName: string;
  programme: string;
  relevanceScore: number;
  reason: string;
  estimatedTimeToComplete: number; // hours
  prerequisites: string[];
  prerequisitesMet: boolean;
}

export interface LearnerProfile {
  learnerId: string;
  interests: string[];
  skills: string[];
  earnedBadges: string[];
  activePrograms: string[];
  activityHistory: Array<{
    type: string;
    programme: string;
    timestamp: Date;
  }>;
}

export class BadgeRecommender {
  private badgeData: Map<string, any>;

  constructor() {
    this.badgeData = new Map();
    this.initializeBadgeData();
  }

  private initializeBadgeData(): void {
    // Simplified badge data for recommendations
    const badges = [
      { id: 'sc-explorer', name: 'Device Diagnostic', programme: 'Scrap Cat', interests: ['tech', 'repair', 'sustainability'], skills: ['diagnostics', 'troubleshooting'] },
      { id: 'gtc-explorer', name: 'Podcast Explorer', programme: 'G-Tech Casters', interests: ['media', 'audio', 'storytelling'], skills: ['recording', 'editing'] },
      { id: 'te-explorer', name: 'Business Canvas', programme: 'TECHreneurs', interests: ['business', 'entrepreneurship', 'sales'], skills: ['planning', 'pitching'] },
      { id: 'stm-explorer', name: 'Digital Literacy', programme: 'STEMgineers', interests: ['coding', 'making', 'tech'], skills: ['coding', 'electronics'] },
      { id: 'kc-explorer', name: 'Character Workshop', programme: "Kaywana's Court", interests: ['theatre', 'performance', 'storytelling'], skills: ['acting', 'presentation'] },
      { id: 'ss-explorer', name: 'Style Explorer', programme: 'Silk Stilettos', interests: ['fashion', 'style', 'creative'], skills: ['styling', 'content-creation'] },
      { id: 'aak-explorer', name: 'Recipe Keeper', programme: "Auntie Anansi's Kitchen", interests: ['cooking', 'heritage', 'family'], skills: ['cooking', 'documentation'] }
    ];

    badges.forEach(b => this.badgeData.set(b.id, b));
  }

  /**
   * Get badge recommendations for a learner
   */
  recommend(profile: LearnerProfile, limit: number = 5): BadgeRecommendation[] {
    const recommendations: BadgeRecommendation[] = [];

    for (const [badgeId, badge] of this.badgeData) {
      // Skip already earned badges
      if (profile.earnedBadges.includes(badgeId)) continue;

      // Calculate relevance score
      const score = this.calculateRelevance(profile, badge);

      if (score > 0) {
        recommendations.push({
          badgeId: badge.id,
          badgeName: badge.name,
          programme: badge.programme,
          relevanceScore: score,
          reason: this.generateReason(profile, badge, score),
          estimatedTimeToComplete: 45, // GLH for Explorer badges
          prerequisites: [],
          prerequisitesMet: true
        });
      }
    }

    return recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  /**
   * Calculate relevance score
   */
  private calculateRelevance(profile: LearnerProfile, badge: any): number {
    let score = 0;

    // Interest match
    const interestMatch = profile.interests.filter(i => 
      badge.interests.includes(i)
    ).length;
    score += interestMatch * 30;

    // Skill match
    const skillMatch = profile.skills.filter(s => 
      badge.skills.includes(s)
    ).length;
    score += skillMatch * 20;

    // Active in programme
    if (profile.activePrograms.includes(badge.programme)) {
      score += 25;
    }

    // Recent activity in programme
    const recentActivity = profile.activityHistory.filter(a => 
      a.programme === badge.programme &&
      (Date.now() - a.timestamp.getTime()) < 30 * 24 * 60 * 60 * 1000
    ).length;
    score += Math.min(25, recentActivity * 5);

    return Math.min(100, score);
  }

  /**
   * Generate recommendation reason
   */
  private generateReason(profile: LearnerProfile, badge: any, score: number): string {
    const reasons: string[] = [];

    const matchedInterests = profile.interests.filter(i => badge.interests.includes(i));
    if (matchedInterests.length > 0) {
      reasons.push(`Matches your interest in ${matchedInterests.join(', ')}`);
    }

    if (profile.activePrograms.includes(badge.programme)) {
      reasons.push(`Next step in your ${badge.programme} journey`);
    }

    const matchedSkills = profile.skills.filter(s => badge.skills.includes(s));
    if (matchedSkills.length > 0) {
      reasons.push(`Builds on your ${matchedSkills.join(', ')} skills`);
    }

    return reasons[0] || 'Recommended for you';
  }

  /**
   * Get next badge in progression
   */
  getNextInProgression(programme: string, earnedBadges: string[]): string | null {
    const levelOrder = ['explorer', 'builder', 'innovator', 'leader'];
    const programmePrefix = this.getProgrammePrefix(programme);

    for (const level of levelOrder) {
      const badgeId = `${programmePrefix}-${level}`;
      if (!earnedBadges.includes(badgeId)) {
        return badgeId;
      }
    }

    return null;
  }

  private getProgrammePrefix(programme: string): string {
    const prefixes: Record<string, string> = {
      'Scrap Cat': 'sc',
      'G-Tech Casters': 'gtc',
      'TECHreneurs': 'te',
      'STEMgineers': 'stm',
      "Kaywana's Court": 'kc',
      'Silk Stilettos': 'ss',
      "Auntie Anansi's Kitchen": 'aak'
    };
    return prefixes[programme] || '';
  }
}

export default BadgeRecommender;
