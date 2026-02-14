// src/systems/rovs/personalities/insight/InsightROV.tsx
// 💡 Insight — The Pattern Analyst

import React from 'react';
import { ROVMessage } from '../../learning-support/LearningROVSystem';

export interface InsightPattern {
  id: string;
  type: 'learning-style' | 'peak-time' | 'collaboration' | 'breakthrough' | 'struggle';
  description: string;
  confidence: number; // 0-100
  dataPoints: number;
  discoveredAt: Date;
  actionable: boolean;
}

export interface InsightProps {
  learnerId: string;
  onPatternDetected: (pattern: InsightPattern) => void;
  onBadgeReadiness: (badgeId: string, readiness: number) => void;
}

/**
 * Insight ROV - Analyzes patterns and readiness
 * 
 * Personality: Thoughtful analyst who sees connections others miss
 * Primary Role: Pattern analysis and badge readiness assessment
 */
export const InsightROV: React.FC<InsightProps> = ({
  learnerId,
  onPatternDetected,
  onBadgeReadiness
}) => {
  const [patterns, setPatterns] = React.useState<InsightPattern[]>([]);

  const messages: Record<string, string[]> = {
    pattern: [
      "I've noticed something... you learn fastest when you're working with others.",
      "Pattern detected: Your best work happens in the morning.",
      "Interesting trend: You're drawn to problems that help others."
    ],
    confidence: [
      "Your confidence in this area has grown 40% over two weeks. The data shows it.",
      "I'm seeing consistent improvement. The numbers don't lie.",
      "Growth trajectory: You're 3x faster at this than when you started."
    ],
    readiness: [
      "Pattern detected: You're ready for the next badge. Here's the evidence...",
      "All indicators suggest you've mastered this level.",
      "Badge readiness: 95%. One more demonstration should do it."
    ],
    connection: [
      "I see a connection between your repair skills and your teaching ability.",
      "Your podcast work is informing your presentation skills. Interesting crossover.",
      "The patience you show in cooking translates directly to your mentoring."
    ]
  };

  const analyzeReadiness = (badgeId: string, evidence: any[]): number => {
    // Simplified readiness calculation
    const criteriaCount = 5; // Typical badge has ~5 criteria
    const evidenceCount = evidence.length;
    const readiness = Math.min(100, (evidenceCount / criteriaCount) * 100);
    
    onBadgeReadiness(badgeId, readiness);
    return readiness;
  };

  return (
    <div className="rov-insight" data-rov="insight">
      <div className="rov-avatar">💡</div>
      <div className="rov-content">
        <div className="rov-name">Insight</div>
        <div className="rov-role">Pattern Analyst</div>
        {patterns.length > 0 && (
          <div className="rov-patterns">
            <h4>Patterns Detected:</h4>
            {patterns.slice(-3).map(pattern => (
              <div key={pattern.id} className="pattern-item">
                <span className="pattern-type">{pattern.type}</span>
                <span className="pattern-confidence">{pattern.confidence}% confident</span>
                <p>{pattern.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const insightUtils = {
  detectLearningStyle: (activities: any[]): string => {
    // Analyze activities to determine learning style
    const hasVideo = activities.some(a => a.type === 'video');
    const hasHands = activities.some(a => a.type === 'practical');
    const hasRead = activities.some(a => a.type === 'reading');
    
    if (hasHands && !hasVideo) return 'kinesthetic';
    if (hasVideo && !hasRead) return 'visual';
    if (hasRead && !hasVideo) return 'reading';
    return 'multimodal';
  },

  calculateBreakthroughProbability: (recentProgress: number[]): number => {
    if (recentProgress.length < 3) return 0;
    const trend = recentProgress.slice(-3).reduce((a, b) => a + b, 0) / 3;
    return Math.min(100, trend * 1.5);
  }
};

export default InsightROV;
