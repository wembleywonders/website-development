/**
 * IMPACT DISPLAY WIDGET
 * 
 * Shows creator's community impact in a compact widget format.
 * Used in dashboard and profile pages.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React from 'react';

// ============================================================
// TYPES
// ============================================================

export interface ImpactData {
  totalContributed: number;
  workshopHoursFunded: number;
  participantsReached: number;
  lastContribution?: {
    amount: number;
    date: string;
  };
}

export interface ImpactDisplayProps {
  impact: ImpactData;
  variant?: 'compact' | 'full' | 'minimal';
  showAnimation?: boolean;
  onClick?: () => void;
}

// ============================================================
// COMPONENT
// ============================================================

export const ImpactDisplay: React.FC<ImpactDisplayProps> = ({
  impact,
  variant = 'compact',
  showAnimation = true,
  onClick
}) => {
  const formatCurrency = (amount: number) => `£${amount.toFixed(2)}`;
  
  // Minimal variant - just the headline
  if (variant === 'minimal') {
    return (
      <div className="impact-display impact-display--minimal" onClick={onClick}>
        <span className="impact-icon">💚</span>
        <span className="impact-text">
          {impact.workshopHoursFunded.toFixed(1)} workshop hours funded
        </span>
      </div>
    );
  }
  
  // Compact variant - for dashboard widget
  if (variant === 'compact') {
    return (
      <div className="impact-display impact-display--compact" onClick={onClick}>
        <div className="impact-display__header">
          <span className="impact-icon">💚</span>
          <h4>Community Impact</h4>
        </div>
        
        <div className="impact-display__stats">
          <div className="stat">
            <span className="stat-value">{formatCurrency(impact.totalContributed)}</span>
            <span className="stat-label">Contributed</span>
          </div>
          <div className="stat">
            <span className="stat-value">{impact.workshopHoursFunded.toFixed(1)}</span>
            <span className="stat-label">Workshop Hours</span>
          </div>
          <div className="stat">
            <span className="stat-value">{impact.participantsReached}</span>
            <span className="stat-label">Young People</span>
          </div>
        </div>
        
        {impact.lastContribution && (
          <div className="impact-display__last">
            <span>Last contribution: {formatCurrency(impact.lastContribution.amount)}</span>
          </div>
        )}
      </div>
    );
  }
  
  // Full variant - detailed view
  return (
    <div className="impact-display impact-display--full" onClick={onClick}>
      <div className="impact-display__header">
        <span className="impact-icon">💚</span>
        <div>
          <h3>Your Community Impact</h3>
          <p>How your sales help fund free youth workshops</p>
        </div>
      </div>
      
      <div className="impact-display__hero">
        <div className={`impact-circle ${showAnimation ? 'animate' : ''}`}>
          <span className="hero-value">{formatCurrency(impact.totalContributed)}</span>
          <span className="hero-label">Total Contributed</span>
        </div>
      </div>
      
      <div className="impact-display__breakdown">
        <div className="breakdown-item">
          <span className="breakdown-icon">⏱️</span>
          <div className="breakdown-content">
            <span className="breakdown-value">{impact.workshopHoursFunded.toFixed(1)} hours</span>
            <span className="breakdown-label">of free workshops funded</span>
          </div>
        </div>
        
        <div className="breakdown-item">
          <span className="breakdown-icon">👥</span>
          <div className="breakdown-content">
            <span className="breakdown-value">{impact.participantsReached} young people</span>
            <span className="breakdown-label">reached through your contribution</span>
          </div>
        </div>
      </div>
      
      <div className="impact-display__explainer">
        <h4>How it works</h4>
        <div className="explainer-flow">
          <div className="flow-step">
            <span className="step-icon">💰</span>
            <span>25% of every sale</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <span className="step-icon">💚</span>
            <span>Goes to community fund</span>
          </div>
          <span className="flow-arrow">→</span>
          <div className="flow-step">
            <span className="step-icon">📚</span>
            <span>Pays for free workshops</span>
          </div>
        </div>
        <p className="explainer-note">
          £15 funds 1 hour of workshops for 12 young people
        </p>
      </div>
      
      {impact.lastContribution && (
        <div className="impact-display__recent">
          <span className="recent-label">Most recent contribution:</span>
          <span className="recent-amount">{formatCurrency(impact.lastContribution.amount)}</span>
          <span className="recent-date">
            {new Date(impact.lastContribution.date).toLocaleDateString()}
          </span>
        </div>
      )}
      
      <div className="impact-display__badge">
        <span className="badge-icon">🏆</span>
        <span className="badge-text">Community Creator</span>
      </div>
    </div>
  );
};

export default ImpactDisplay;