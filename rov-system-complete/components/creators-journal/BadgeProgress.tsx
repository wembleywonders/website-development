// src/components/creators-journal/BadgeProgress.tsx
// Shows badge progress and readiness for assessment

import React, { useState, useEffect } from 'react';
import './BadgeProgress.css';

export interface BadgeProgressData {
  badgeId: string;
  badgeName: string;
  programme: string;
  level: 'explorer' | 'builder' | 'innovator' | 'leader';
  emoji: string;
  criteriaCompleted: number;
  criteriaTotal: number;
  evidenceCount: number;
  hoursLogged: number;
  hoursRequired: number;
  readinessScore: number;
  isReady: boolean;
  suggestedActions: string[];
}

export interface BadgeProgressProps {
  // Either pass badges directly OR pass learnerId to fetch
  badges?: BadgeProgressData[];
  learnerId?: string;
  onRequestAssessment?: (badgeId: string) => void;
  onViewDetails?: (badgeId: string) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  explorer: '#10b981',
  builder: '#3b82f6',
  innovator: '#8b5cf6',
  leader: '#f59e0b'
};

// Sample data for when learnerId is used
const SAMPLE_BADGES: BadgeProgressData[] = [
  {
    badgeId: 'scrapcat-explorer',
    badgeName: 'Scrap Cat Explorer',
    programme: 'Scrap Cat',
    level: 'explorer',
    emoji: '♻️',
    criteriaCompleted: 3,
    criteriaTotal: 4,
    evidenceCount: 5,
    hoursLogged: 8,
    hoursRequired: 10,
    readinessScore: 75,
    isReady: false,
    suggestedActions: ['Complete final criteria', 'Log 2 more hours']
  }
];

export const BadgeProgress: React.FC<BadgeProgressProps> = ({
  badges: propBadges,
  learnerId,
  onRequestAssessment = () => {},
  onViewDetails = () => {}
}) => {
  const [badges, setBadges] = useState<BadgeProgressData[]>(propBadges || []);
  
  useEffect(() => {
    if (learnerId && !propBadges) {
      // In real implementation, fetch from API
      // For now, use sample data
      setBadges(SAMPLE_BADGES);
    }
  }, [learnerId, propBadges]);

  const getProgressPercentage = (badge: BadgeProgressData): number => {
    return Math.round((badge.criteriaCompleted / badge.criteriaTotal) * 100);
  };

  const getReadinessLabel = (score: number): string => {
    if (score >= 85) return 'Ready!';
    if (score >= 70) return 'Almost there';
    if (score >= 50) return 'Making progress';
    return 'Getting started';
  };

  return (
    <section className="badge-progress">
      <header className="badge-progress-header">
        <h3>🏅 Badge Progress</h3>
        <span className="badge-count">
          {badges.filter(b => b.isReady).length} ready for assessment
        </span>
      </header>

      {badges.length === 0 ? (
        <div className="badge-progress-empty">
          <p>Start a programme to begin earning badges!</p>
        </div>
      ) : (
        <div className="badge-list">
          {badges.map(badge => {
            const progress = getProgressPercentage(badge);
            const levelColor = LEVEL_COLORS[badge.level];
            
            return (
              <article 
                key={badge.badgeId} 
                className={`badge-card ${badge.isReady ? 'is-ready' : ''}`}
              >
                <div className="badge-icon">
                  <span className="badge-emoji">{badge.emoji}</span>
                  <span 
                    className="badge-level" 
                    style={{ backgroundColor: levelColor }}
                  >
                    {badge.level}
                  </span>
                </div>

                <div className="badge-content">
                  <div className="badge-info">
                    <h4 className="badge-name">{badge.badgeName}</h4>
                    <span className="badge-programme">{badge.programme}</span>
                  </div>

                  <div className="badge-metrics">
                    <div className="metric">
                      <span className="metric-label">Criteria</span>
                      <span className="metric-value">
                        {badge.criteriaCompleted}/{badge.criteriaTotal}
                      </span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Evidence</span>
                      <span className="metric-value">{badge.evidenceCount}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Hours</span>
                      <span className="metric-value">
                        {badge.hoursLogged}/{badge.hoursRequired}
                      </span>
                    </div>
                  </div>

                  <div className="badge-progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${progress}%`,
                        backgroundColor: levelColor 
                      }}
                    />
                    <span className="progress-label">{progress}%</span>
                  </div>

                  <div className="badge-readiness">
                    <span className={`readiness-score score-${Math.floor(badge.readinessScore / 25)}`}>
                      {getReadinessLabel(badge.readinessScore)}
                    </span>
                  </div>

                  {badge.suggestedActions.length > 0 && !badge.isReady && (
                    <div className="badge-actions-hint">
                      <strong>Next step:</strong> {badge.suggestedActions[0]}
                    </div>
                  )}
                </div>

                <div className="badge-actions">
                  <button 
                    className="btn-details"
                    onClick={() => onViewDetails(badge.badgeId)}
                  >
                    Details
                  </button>
                  {badge.isReady && (
                    <button 
                      className="btn-assess"
                      onClick={() => onRequestAssessment(badge.badgeId)}
                    >
                      🎯 Request Assessment
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BadgeProgress;