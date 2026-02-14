// src/systems/rovs/badge-integration/ReadinessAssessor.ts
// Assesses learner readiness for badge assessment

import { Evidence, EvidencePortfolio } from './EvidenceCollector';

export interface ReadinessAssessment {
  learnerId: string;
  badgeId: string;
  overallReadiness: number; // 0-100
  evidenceReadiness: number;
  skillReadiness: number;
  timeInvestment: number;
  recommendation: 'ready' | 'almost-ready' | 'needs-work' | 'not-started';
  gapsIdentified: string[];
  strengthsIdentified: string[];
  suggestedActions: string[];
  assessedAt: Date;
  assessedBy: string; // ROV that performed assessment
}

export interface SkillDemonstration {
  skillId: string;
  demonstrationCount: number;
  lastDemonstrated: Date;
  confidenceLevel: number; // 0-100
}

export class ReadinessAssessor {
  /**
   * Assess readiness for a badge
   */
  assess(
    learnerId: string,
    badgeId: string,
    portfolio: EvidencePortfolio,
    skillDemonstrations: SkillDemonstration[],
    timeSpentMinutes: number,
    requiredGLH: number
  ): ReadinessAssessment {
    // Calculate evidence readiness
    const evidenceReadiness = portfolio.completionPercentage;

    // Calculate skill readiness
    const skillReadiness = this.calculateSkillReadiness(skillDemonstrations);

    // Calculate time investment (as percentage of required GLH)
    const requiredMinutes = requiredGLH * 60;
    const timeInvestment = Math.min(100, Math.round((timeSpentMinutes / requiredMinutes) * 100));

    // Calculate overall readiness
    const overallReadiness = Math.round(
      (evidenceReadiness * 0.5) + (skillReadiness * 0.3) + (timeInvestment * 0.2)
    );

    // Determine recommendation
    let recommendation: ReadinessAssessment['recommendation'];
    if (overallReadiness >= 85) {
      recommendation = 'ready';
    } else if (overallReadiness >= 70) {
      recommendation = 'almost-ready';
    } else if (overallReadiness >= 30) {
      recommendation = 'needs-work';
    } else {
      recommendation = 'not-started';
    }

    // Identify gaps and strengths
    const gaps = this.identifyGaps(evidenceReadiness, skillReadiness, timeInvestment);
    const strengths = this.identifyStrengths(evidenceReadiness, skillReadiness, timeInvestment);
    const actions = this.suggestActions(gaps, skillDemonstrations);

    return {
      learnerId,
      badgeId,
      overallReadiness,
      evidenceReadiness,
      skillReadiness,
      timeInvestment,
      recommendation,
      gapsIdentified: gaps,
      strengthsIdentified: strengths,
      suggestedActions: actions,
      assessedAt: new Date(),
      assessedBy: 'insight-rov'
    };
  }

  /**
   * Calculate skill readiness from demonstrations
   */
  private calculateSkillReadiness(demonstrations: SkillDemonstration[]): number {
    if (demonstrations.length === 0) return 0;

    const avgConfidence = demonstrations.reduce(
      (sum, d) => sum + d.confidenceLevel, 0
    ) / demonstrations.length;

    const recentDemonstrations = demonstrations.filter(d => {
      const daysSince = (Date.now() - d.lastDemonstrated.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 30;
    });

    const recencyBonus = (recentDemonstrations.length / demonstrations.length) * 20;

    return Math.min(100, Math.round(avgConfidence + recencyBonus));
  }

  /**
   * Identify gaps in readiness
   */
  private identifyGaps(
    evidenceReadiness: number,
    skillReadiness: number,
    timeInvestment: number
  ): string[] {
    const gaps: string[] = [];

    if (evidenceReadiness < 80) {
      gaps.push('More evidence needed for assessment criteria');
    }
    if (skillReadiness < 70) {
      gaps.push('Additional skill practice recommended');
    }
    if (timeInvestment < 60) {
      gaps.push('More time investment needed');
    }

    return gaps;
  }

  /**
   * Identify strengths
   */
  private identifyStrengths(
    evidenceReadiness: number,
    skillReadiness: number,
    timeInvestment: number
  ): string[] {
    const strengths: string[] = [];

    if (evidenceReadiness >= 80) {
      strengths.push('Strong evidence portfolio');
    }
    if (skillReadiness >= 80) {
      strengths.push('Demonstrated skill proficiency');
    }
    if (timeInvestment >= 80) {
      strengths.push('Committed time investment');
    }

    return strengths;
  }

  /**
   * Suggest actions to improve readiness
   */
  private suggestActions(
    gaps: string[],
    demonstrations: SkillDemonstration[]
  ): string[] {
    const actions: string[] = [];

    if (gaps.some(g => g.includes('evidence'))) {
      actions.push('Complete remaining portfolio items');
      actions.push('Request assessor observation for practical skills');
    }

    if (gaps.some(g => g.includes('skill'))) {
      const weakSkills = demonstrations
        .filter(d => d.confidenceLevel < 60)
        .map(d => d.skillId);
      if (weakSkills.length > 0) {
        actions.push(`Practice these skills: ${weakSkills.join(', ')}`);
      }
    }

    if (gaps.some(g => g.includes('time'))) {
      actions.push('Attend more workshops or practice sessions');
    }

    return actions;
  }

  /**
   * Quick check if learner is ready
   */
  isReady(assessment: ReadinessAssessment): boolean {
    return assessment.recommendation === 'ready';
  }
}

export default ReadinessAssessor;
