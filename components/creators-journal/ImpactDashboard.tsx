// src/components/creators-journal/ImpactDashboard.tsx
// Shows learner's impact metrics and community contribution

import React, { useState, useEffect } from 'react';
import './ImpactDashboard.css';

export interface ImpactMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

export interface ImpactHighlight {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'environmental' | 'social' | 'economic' | 'educational';
}

export interface ImpactDashboardProps {
  // Either pass data directly OR pass learnerId to fetch
  metrics?: ImpactMetric[];
  highlights?: ImpactHighlight[];
  totalCredits?: number;
  totalBadges?: number;
  memberSince?: Date;
  learnerId?: string;
}

const CATEGORY_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
  environmental: { emoji: '🌍', label: 'Environmental', color: '#10b981' },
  social: { emoji: '🤝', label: 'Social', color: '#3b82f6' },
  economic: { emoji: '💰', label: 'Economic', color: '#f59e0b' },
  educational: { emoji: '📚', label: 'Educational', color: '#8b5cf6' }
};

// Sample data for when learnerId is used
const SAMPLE_METRICS: ImpactMetric[] = [
  {
    id: 'hours',
    label: 'Hours Logged',
    value: 24,
    unit: 'hrs',
    icon: '⏱️',
    description: 'Total learning hours',
    trend: 'up',
    trendValue: 8
  }
];

const SAMPLE_HIGHLIGHTS: ImpactHighlight[] = [
  {
    id: '1',
    title: 'First device repaired',
    description: 'Successfully repaired a broken speaker',
    date: new Date(),
    category: 'environmental'
  }
];

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  metrics: propMetrics,
  highlights: propHighlights,
  totalCredits: propCredits,
  totalBadges: propBadges,
  memberSince: propMemberSince,
  learnerId
}) => {
  const [metrics, setMetrics] = useState<ImpactMetric[]>(propMetrics || []);
  const [highlights, setHighlights] = useState<ImpactHighlight[]>(propHighlights || []);
  const [totalCredits, setTotalCredits] = useState(propCredits || 0);
  const [totalBadges, setTotalBadges] = useState(propBadges || 0);
  const [memberSince, setMemberSince] = useState(propMemberSince || new Date());
  
  useEffect(() => {
    if (learnerId && !propMetrics) {
      // In real implementation, fetch from API
      setMetrics(SAMPLE_METRICS);
      setHighlights(SAMPLE_HIGHLIGHTS);
      setTotalCredits(12);
      setTotalBadges(2);
      setMemberSince(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)); // 90 days ago
    }
  }, [learnerId, propMetrics]);

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getMembershipDuration = (): string => {
    const now = new Date();
    const months = Math.floor(
      (now.getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    if (months < 1) return 'New member';
    if (months === 1) return '1 month';
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    return years === 1 ? '1 year' : `${years} years`;
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable'): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <section className="impact-dashboard">
      <header className="impact-header">
        <div className="impact-title">
          <h3>🌟 Your Impact</h3>
          <span className="member-duration">Member for {getMembershipDuration()}</span>
        </div>
        <div className="impact-summary">
          <div className="summary-stat">
            <span className="stat-value">{totalBadges}</span>
            <span className="stat-label">Badges</span>
          </div>
          <div className="summary-stat">
            <span className="stat-value">{totalCredits}</span>
            <span className="stat-label">Credits</span>
          </div>
        </div>
      </header>

      <div className="metrics-grid">
        {metrics.map(metric => (
          <div key={metric.id} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-content">
              <div className="metric-value">
                {formatNumber(metric.value)}
                <span className="metric-unit">{metric.unit}</span>
              </div>
              <div className="metric-label">{metric.label}</div>
              {metric.trend && (
                <div className={`metric-trend trend-${metric.trend}`}>
                  {getTrendIcon(metric.trend)}
                  {metric.trendValue && (
                    <span>
                      {metric.trend === 'up' ? '+' : ''}
                      {metric.trendValue}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {highlights.length > 0 && (
        <div className="impact-highlights">
          <h4>Recent Impact Highlights</h4>
          <ul className="highlights-list">
            {highlights.slice(0, 5).map(highlight => {
              const category = CATEGORY_CONFIG[highlight.category];
              return (
                <li key={highlight.id} className="highlight-item">
                  <span 
                    className="highlight-category"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.emoji}
                  </span>
                  <div className="highlight-content">
                    <strong>{highlight.title}</strong>
                    <p>{highlight.description}</p>
                  </div>
                  <time className="highlight-date">
                    {new Intl.DateTimeFormat('en-GB', {
                      month: 'short',
                      day: 'numeric'
                    }).format(highlight.date)}
                  </time>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="impact-cta">
        <p>Every skill you learn, every device you fix, every story you share — it all adds up.</p>
        <strong>Keep making a difference! 💪</strong>
      </div>
    </section>
  );
};

export default ImpactDashboard;