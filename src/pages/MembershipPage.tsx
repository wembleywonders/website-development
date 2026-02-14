import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DraggableMaya from "../components/maya/DraggableMaya";
import Footer from '../components/layout/Footer';
import './MembershipPage.css';

interface MemberProgress {
  currentTier: 'applicant' | 'connector' | 'curator' | 'champion';
  assessmentPeriodStart?: Date;
  completedActivities: string[];
  safeguardingStatus: 'pending' | 'cleared' | 'requires_review';
  progressScore: number;
  lastInteraction: Date;
}

const MembershipPage: React.FC = () => {
  const [memberProgress, setMemberProgress] = useState<MemberProgress>({
    currentTier: 'applicant',
    completedActivities: [],
    safeguardingStatus: 'pending',
    progressScore: 0,
    lastInteraction: new Date()
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem('memberProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setMemberProgress({
        ...progress,
        lastInteraction: new Date(progress.lastInteraction),
        assessmentPeriodStart: progress.assessmentPeriodStart ? new Date(progress.assessmentPeriodStart) : undefined
      });
    }
  }, []);

  const handleProgressUpdate = (updatedProgress: MemberProgress) => {
    setMemberProgress(updatedProgress);
    localStorage.setItem('memberProgress', JSON.stringify(updatedProgress));
  };

  // Determine Maya's membership tier based on current progress
  const getMayaMembershipTier = (): 'visitor' | 'membership' | 'connector' | 'curator' | 'champion' | 'apply' => {
    switch (memberProgress.currentTier) {
      case 'connector':
        return 'connector';
      case 'curator':
        return 'curator';
      case 'champion':
        return 'champion';
      case 'applicant':
      default:
        return 'apply';
    }
  };

  return (
    <div className="membership-page">
      
      <div className="membership-content">
        {/* Hero Section - Focused on Starting Point */}
        <section className="membership-hero">
          <div className="hero-container">
            <div className="membership-badge">
              <span>🏡</span>
              <span>Professional Community Platform</span>
            </div>
            <h1 className="membership-title">Your Leadership Journey Starts Here</h1>
            <p className="membership-subtitle">
              All new members begin with Connector tier - a comprehensive 12-month development program that builds the foundation for community leadership in Wembley.
            </p>
          </div>
        </section>

        {/* Current Progress Display */}
        {memberProgress.currentTier !== 'applicant' && (
          <section className="current-progress-section">
            <div className="progress-container">
              <div className="progress-header">
                <h2>Your Current Progress</h2>
                <div className="current-tier-badge">
                  {memberProgress.currentTier === 'connector' && '🔗 Connector'}
                  {memberProgress.currentTier === 'curator' && '🎯 Curator'}
                  {memberProgress.currentTier === 'champion' && '👑 Champion'}
                </div>
              </div>
              
              <div className="progress-stats">
                <div className="stat-item">
                  <span className="stat-label">Progress Score</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${memberProgress.progressScore}%` }}></div>
                  </div>
                  <span className="stat-value">{memberProgress.progressScore}%</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Completed Activities</span>
                  <span className="stat-value">{memberProgress.completedActivities.length}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Safeguarding Status</span>
                  <span className={`status-badge ${memberProgress.safeguardingStatus}`}>
                    {memberProgress.safeguardingStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Primary Action - Connector Application */}
        <section className="primary-action-section">
          <div className="primary-container">
            <div className="connector-spotlight">
              <div className="spotlight-header">
                <div className="spotlight-icon">🔗</div>
                <h2 className="spotlight-title">Connector Membership</h2>
                <p className="spotlight-subtitle">Your Essential First Step</p>
              </div>
              
              <div className="spotlight-content">
                <p className="spotlight-description">
                  Like a provisional driving licence for community leadership. This comprehensive assessment and development period ensures you have the skills, knowledge, and commitment needed to make a real difference in Wembley.
                </p>
                
                <div className="spotlight-features">
                  <div className="feature-highlight">
                    <span className="feature-icon">⏱️</span>
                    <div className="feature-content">
                      <h4>12-Month Development Period</h4>
                      <p>Structured learning and assessment process</p>
                    </div>
                  </div>
                  <div className="feature-highlight">
                    <span className="feature-icon">🛡️</span>
                    <div className="feature-content">
                      <h4>Enhanced Safeguarding Training</h4>
                      <p>Essential for all youth program involvement</p>
                    </div>
                  </div>
                  <div className="feature-highlight">
                    <span className="feature-icon">📚</span>
                    <div className="feature-content">
                      <h4>Skills Development Program</h4>
                      <p>Digital skills, leadership basics, community engagement</p>
                    </div>
                  </div>
                  <div className="feature-highlight">
                    <span className="feature-icon">🤝</span>
                    <div className="feature-content">
                      <h4>Community Project Participation</h4>
                      <p>Hands-on experience with real initiatives</p>
                    </div>
                  </div>
                </div>
                
                <div className="commitment-info">
                  <strong>Time Commitment:</strong> 4-6 hours per month
                </div>
              </div>
              
              <div className="spotlight-actions">
                {memberProgress.currentTier === 'applicant' ? (
                  <>
                    <Link to="/apply" className="btn btn-primary-large">Apply for Connector Membership</Link>
                    <Link to="/assessment-guide" className="btn btn-secondary">Take Assessment First</Link>
                    <Link to="/membership" className="btn btn-outline">Learn More About Connector Tier</Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" className="btn btn-primary-large">View Your Dashboard</Link>
                    <Link to="/programmes" className="btn btn-secondary">Current Activities</Link>
                    <Link to="/dashboard" className="btn btn-outline">Track Progress</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Future Progression Opportunities */}
        <section className="progression-section">
          <div className="progression-container">
            <h2 className="progression-title">Your Future Progression Opportunities</h2>
            <p className="progression-description">
              After successfully completing your Connector year, you'll be eligible to advance to leadership roles with real authority and budget responsibility.
            </p>
            
            <div className="future-tiers-grid">
              {/* Curator Tier */}
              <div className="future-tier-card">
                <div className="future-tier-header">
                  <div className="tier-icon">🎯</div>
                  <h3 className="tier-name">Curator Tier</h3>
                  <p className="tier-timeline">Available after 12 months</p>
                </div>
                
                <div className="tier-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">💰</span>
                    <span>£50,000 budget authority</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">👥</span>
                    <span>Youth program leadership</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🗳️</span>
                    <span>Democratic governance participation</span>
                  </div>
                </div>
                
                <p className="tier-description">
                  Lead community initiatives, manage youth programs, and exercise real budget authority while developing executive-level skills.
                </p>
                
                <Link to="/curator" className="tier-link">Learn About Curator Opportunities</Link>
              </div>

              {/* Champion Tier */}
              <div className="future-tier-card premium">
                <div className="premium-badge">Executive Level</div>
                <div className="future-tier-header">
                  <div className="tier-icon">👑</div>
                  <h3 className="tier-name">Champion Tier</h3>
                  <p className="tier-timeline">Available after 2+ years</p>
                </div>
                
                <div className="tier-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">💎</span>
                    <span>£250,000+ budget authority</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🏛️</span>
                    <span>Strategic governance leadership</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🤝</span>
                    <span>Partnership negotiation authority</span>
                  </div>
                </div>
                
                <p className="tier-description">
                  Exercise executive authority over strategic community development with significant budget responsibility and governance leadership.
                </p>
                
                <Link to="/champion" className="tier-link">Learn About Champion Opportunities</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Clear Pathway Visualization */}
        <section className="pathway-visualization">
          <div className="pathway-container">
            <h2 className="pathway-title">Your Clear Progression Path</h2>
            
            <div className="pathway-flow">
              <div className={`pathway-step ${memberProgress.currentTier === 'applicant' ? 'current' : 'completed'}`}>
                <div className="step-indicator">START</div>
                <h3>Apply Now</h3>
                <p>Connector Tier Application</p>
              </div>
              
              <div className="pathway-arrow">→</div>
              
              <div className={`pathway-step ${memberProgress.currentTier === 'connector' ? 'current' : memberProgress.currentTier === 'applicant' ? 'future' : 'completed'}`}>
                <div className="step-indicator">YEAR 2</div>
                <h3>Advance to Leadership</h3>
                <p>Curator Tier Opportunities</p>
              </div>
              
              <div className="pathway-arrow">→</div>
              
              <div className={`pathway-step ${memberProgress.currentTier === 'champion' ? 'current' : 'future'}`}>
                <div className="step-indicator">YEAR 3+</div>
                <h3>Executive Authority</h3>
                <p>Champion Tier Governance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Maya Integration Context */}
        <section className="maya-integration-info">
          <div className="integration-container">
            <div className="maya-intro">
              <h3>Need Help Navigating Your Journey?</h3>
              <p>
                Maya can provide personalized guidance based on your current membership tier and progress. 
                She has access to tier-specific resources and can help you understand next steps.
              </p>
            </div>
          </div>
        </section>
      </div>

      <DraggableMaya 
        membershipTier={getMayaMembershipTier()}
        userId={memberProgress.currentTier !== 'applicant' ? `member-${Date.now()}` : undefined}
      />
      
      <Footer />
    </div>
  );
};

export default MembershipPage;