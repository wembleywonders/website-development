import React from 'react';
import { MemberProgress, MembershipTier } from '../../types/membership';

interface ProgressTrackerProps {
  progress: MemberProgress;
  showDetails?: boolean;
  compact?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  progress, 
  showDetails = true, 
  compact = false 
}) => {
  const getTierInfo = (tier: MembershipTier) => {
    const tierInfo = {
      applicant: { name: 'Applicant', color: '#718096', icon: '📝' },
      connector: { name: 'Connector', color: '#4299e1', icon: '🔗' },
      curator: { name: 'Curator', color: '#48bb78', icon: '🎯' },
      champion: { name: 'Champion', color: '#ed8936', icon: '👑' }
    };
    return tierInfo[tier];
  };

  const getNextTier = (currentTier: MembershipTier): MembershipTier | null => {
    const tierOrder: MembershipTier[] = ['applicant', 'connector', 'curator', 'champion'];
    const currentIndex = tierOrder.indexOf(currentTier);
    return currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;
  };

  const currentTierInfo = getTierInfo(progress.currentTier);
  const nextTier = getNextTier(progress.currentTier);
  const nextTierInfo = nextTier ? getTierInfo(nextTier) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cleared': return '#48bb78';
      case 'pending': return '#ed8936';
      case 'requires_review': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'cleared': return 'Cleared';
      case 'pending': return 'Pending';
      case 'requires_review': return 'Requires Review';
      default: return 'Unknown';
    }
  };

  const calculateTimeInTier = () => {
    if (!progress.assessmentPeriodStart) return 'N/A';
    
    const start = new Date(progress.assessmentPeriodStart);
    const now = new Date();
    const diffInMonths = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    if (diffInMonths < 1) return 'Less than 1 month';
    if (diffInMonths === 1) return '1 month';
    return `${diffInMonths} months`;
  };

  if (compact) {
    return (
      <div className="progress-tracker-compact">
        <div className="current-tier-badge" style={{ backgroundColor: currentTierInfo.color }}>
          <span className="tier-icon">{currentTierInfo.icon}</span>
          <span className="tier-name">{currentTierInfo.name}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${progress.progressScore}%`,
              backgroundColor: currentTierInfo.color 
            }}
          />
        </div>
        <div className="progress-text">{progress.progressScore}% Complete</div>
      </div>
    );
  }

  return (
    <div className="progress-tracker">
      {/* Current Tier Status */}
      <div className="current-status">
        <div className="tier-header">
          <div className="tier-badge" style={{ backgroundColor: currentTierInfo.color }}>
            <span className="tier-icon">{currentTierInfo.icon}</span>
            <div className="tier-info">
              <h3>{currentTierInfo.name}</h3>
              <p>Current Tier</p>
            </div>
          </div>
          
          <div className="tier-stats">
            <div className="stat">
              <span className="stat-value">{calculateTimeInTier()}</span>
              <span className="stat-label">Time in Tier</span>
            </div>
            <div className="stat">
              <span className="stat-value">{progress.completedActivities.length}</span>
              <span className="stat-label">Activities Completed</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <span>Overall Progress</span>
            <span>{progress.progressScore}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${progress.progressScore}%`,
                backgroundColor: currentTierInfo.color 
              }}
            />
          </div>
        </div>

        {/* Safeguarding Status */}
        <div className="safeguarding-status">
          <div className="status-item">
            <span className="status-label">Safeguarding Status:</span>
            <span 
              className="status-badge"
              style={{ 
                backgroundColor: getStatusColor(progress.safeguardingStatus),
                color: 'white'
              }}
            >
              {getStatusText(progress.safeguardingStatus)}
            </span>
          </div>
        </div>
      </div>

      {/* Next Milestone */}
      {progress.nextMilestone && (
        <div className="next-milestone">
          <h4>Next Milestone</h4>
          <div className="milestone-card">
            <div className="milestone-icon">🎯</div>
            <div className="milestone-info">
              <h5>{progress.nextMilestone}</h5>
              {progress.nextMilestoneDate && (
                <p>Target: {new Date(progress.nextMilestoneDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progression to Next Tier */}
      {nextTierInfo && showDetails && (
        <div className="next-tier-info">
          <h4>Next Tier: {nextTierInfo.name}</h4>
          <div className="next-tier-card">
            <div className="tier-preview">
              <span className="tier-icon">{nextTierInfo.icon}</span>
              <div className="tier-details">
                <h5>{nextTierInfo.name}</h5>
                <p>Unlock new opportunities and responsibilities</p>
              </div>
            </div>
            
            <div className="requirements-preview">
              <p>Requirements to advance:</p>
              <ul>
                {progress.currentTier === 'connector' && (
                  <>
                    <li>Complete 12 months as Connector</li>
                    <li>Lead a community project</li>
                    <li>Complete intermediate training</li>
                    <li>Enhanced safeguarding clearance</li>
                  </>
                )}
                {progress.currentTier === 'curator' && (
                  <>
                    <li>Complete 24 months as Curator</li>
                    <li>Lead major initiative</li>
                    <li>Complete advanced governance training</li>
                    <li>Pass executive assessment</li>
                  </>
                )}
                {progress.currentTier === 'applicant' && (
                  <>
                    <li>Complete application process</li>
                    <li>Pass assessment</li>
                    <li>Complete onboarding</li>
                    <li>Basic safeguarding clearance</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      {showDetails && progress.completedActivities.length > 0 && (
        <div className="recent-activities">
          <h4>Recent Activities</h4>
          <div className="activities-list">
            {progress.completedActivities.slice(0, 5).map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-info">
                  <span>{activity}</span>
                </div>
              </div>
            ))}
            {progress.completedActivities.length > 5 && (
              <div className="activity-item more">
                <span>+{progress.completedActivities.length - 5} more activities</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Last Interaction */}
      <div className="last-interaction">
        <small>
          Last updated: {new Date(progress.lastInteraction).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default ProgressTracker;