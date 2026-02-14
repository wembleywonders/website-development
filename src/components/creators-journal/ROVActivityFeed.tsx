// src/components/creators-journal/ROVActivityFeed.tsx
// Displays ROV observations and contributions to the Creator's Journal

import React, { useState } from 'react';
import './ROVActivityFeed.css';

// ============================================
// TYPES
// ============================================

interface ROVObservation {
  id: string;
  rovId: string;
  rovName: string;
  rovEmoji: string;
  timestamp: Date;
  type: 'observation' | 'suggestion' | 'flag' | 'milestone' | 'support';
  message: string;
  relatedEntry?: string;
  actionable?: {
    label: string;
    action: () => void;
  };
}

interface ROVProfile {
  id: string;
  name: string;
  emoji: string;
  role: string;
  personality: string;
  status: 'active' | 'watching' | 'idle';
  lastAction?: string;
}

// ============================================
// SAMPLE DATA
// ============================================

const ACTIVE_ROVS: ROVProfile[] = [
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    emoji: '🧭',
    role: 'Learning Guide',
    personality: 'Encouraging explorer',
    status: 'active',
    lastAction: 'Suggested next workshop'
  },
  {
    id: 'discovery',
    name: 'Discovery',
    emoji: '🔬',
    role: 'Activity Observer',
    personality: 'Curious scientist',
    status: 'watching',
    lastAction: 'Logged simulator session'
  },
  {
    id: 'insight',
    name: 'Insight',
    emoji: '💡',
    role: 'Pattern Analyst',
    personality: 'Thoughtful analyst',
    status: 'active',
    lastAction: 'Detected learning pattern'
  },
  {
    id: 'collector',
    name: 'Collector',
    emoji: '📝',
    role: 'Story Journalist',
    personality: 'Curious journalist',
    status: 'idle',
    lastAction: 'Drafted story outline'
  },
  {
    id: 'keeper',
    name: 'Keeper',
    emoji: '📚',
    role: 'Archive Guardian',
    personality: 'Careful librarian',
    status: 'watching',
    lastAction: 'Archived project files'
  },
  {
    id: 'helper',
    name: 'Helper',
    emoji: '🤝',
    role: 'Personal Support',
    personality: 'Patient friend',
    status: 'idle',
    lastAction: 'Available if needed'
  }
];

const SAMPLE_OBSERVATIONS: ROVObservation[] = [
  {
    id: '1',
    rovId: 'discovery',
    rovName: 'Discovery',
    rovEmoji: '🔬',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'observation',
    message: 'Logged 45-minute simulator session. Third practice this week!',
    relatedEntry: 'Activity: Tax Return Simulator'
  },
  {
    id: '2',
    rovId: 'insight',
    rovName: 'Insight',
    rovEmoji: '💡',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'milestone',
    message: 'Pattern detected: Your confidence in financial tasks has increased 40% over 2 weeks.',
    actionable: {
      label: 'View Progress Report',
      action: () => console.log('Opening progress report')
    }
  },
  {
    id: '3',
    rovId: 'pathfinder',
    rovName: 'Pathfinder',
    rovEmoji: '🧭',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'suggestion',
    message: 'Based on your STEMgineers progress, you might enjoy the G-Tech Casters podcast workshop next week.',
    actionable: {
      label: 'Learn More',
      action: () => console.log('Opening workshop details')
    }
  },
  {
    id: '4',
    rovId: 'collector',
    rovName: 'Collector',
    rovEmoji: '📝',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: 'flag',
    message: 'Your repair of Uncle Winston\'s speaker has been flagged as a potential story for Joystick. An editor will review soon.',
    relatedEntry: 'Project: Speaker Box Restoration'
  },
  {
    id: '5',
    rovId: 'keeper',
    rovName: 'Keeper',
    rovEmoji: '📚',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    type: 'observation',
    message: 'Archived your completed project with photos and documentation. This knowledge is preserved forever.',
    relatedEntry: 'Archive: First Speaker Build'
  }
];

// ============================================
// COMPONENTS
// ============================================

const ROVStatusIndicator: React.FC<{ status: ROVProfile['status'] }> = ({ status }) => {
  const statusConfig = {
    active: { color: '#22c55e', label: 'Active' },
    watching: { color: '#f59e0b', label: 'Watching' },
    idle: { color: '#94a3b8', label: 'Idle' }
  };
  
  const config = statusConfig[status];
  
  return (
    <span className="rov-status" style={{ backgroundColor: `${config.color}20`, color: config.color }}>
      <span className="status-dot" style={{ backgroundColor: config.color }}></span>
      {config.label}
    </span>
  );
};

const ROVCard: React.FC<{ rov: ROVProfile }> = ({ rov }) => {
  return (
    <div className={`rov-card rov-card--${rov.status}`}>
      <div className="rov-card__header">
        <span className="rov-card__emoji">{rov.emoji}</span>
        <div className="rov-card__info">
          <h4>{rov.name}</h4>
          <p>{rov.role}</p>
        </div>
        <ROVStatusIndicator status={rov.status} />
      </div>
      <p className="rov-card__personality">"{rov.personality}"</p>
      {rov.lastAction && (
        <p className="rov-card__last-action">
          <span>Last:</span> {rov.lastAction}
        </p>
      )}
    </div>
  );
};

const ObservationItem: React.FC<{ observation: ROVObservation }> = ({ observation }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };
  
  const typeConfig = {
    observation: { icon: '👁️', label: 'Observed' },
    suggestion: { icon: '💭', label: 'Suggestion' },
    flag: { icon: '🚩', label: 'Flagged' },
    milestone: { icon: '🎯', label: 'Milestone' },
    support: { icon: '🤝', label: 'Support' }
  };
  
  const config = typeConfig[observation.type];
  
  return (
    <div className={`observation-item observation-item--${observation.type}`}>
      <div className="observation-item__header">
        <span className="observation-item__rov">
          {observation.rovEmoji} {observation.rovName}
        </span>
        <span className="observation-item__type">
          {config.icon} {config.label}
        </span>
        <span className="observation-item__time">{formatTime(observation.timestamp)}</span>
      </div>
      
      <p className="observation-item__message">{observation.message}</p>
      
      {observation.relatedEntry && (
        <p className="observation-item__related">
          📎 {observation.relatedEntry}
        </p>
      )}
      
      {observation.actionable && (
        <button 
          className="observation-item__action"
          onClick={observation.actionable.action}
        >
          {observation.actionable.label} →
        </button>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export interface ROVActivityFeedProps {
  learnerId?: string;
  maxItems?: number;
  showROVFleet?: boolean;
}

const ROVActivityFeed: React.FC<ROVActivityFeedProps> = ({ 
  learnerId,
  maxItems = 5,
  showROVFleet = true 
}) => {
  const [showAllROVs, setShowAllROVs] = useState(false);
  const displayedROVs = showAllROVs ? ACTIVE_ROVS : ACTIVE_ROVS.slice(0, 3);
  
  // In real implementation, filter observations by learnerId
  const displayedObservations = SAMPLE_OBSERVATIONS.slice(0, maxItems);
  
  return (
    <div className="rov-activity-feed">
      {/* ROV Fleet Overview */}
      {showROVFleet && (
        <div className="rov-fleet-section">
          <div className="section-header">
            <h3>🤖 Your ROV Support Team</h3>
            <p>These ROVs are watching your journey and documenting your progress</p>
          </div>
          
          <div className="rov-fleet-grid">
            {displayedROVs.map(rov => (
              <ROVCard key={rov.id} rov={rov} />
            ))}
          </div>
          
          {ACTIVE_ROVS.length > 3 && (
            <button 
              className="show-more-rovs"
              onClick={() => setShowAllROVs(!showAllROVs)}
            >
              {showAllROVs ? 'Show fewer' : `Show all ${ACTIVE_ROVS.length} ROVs`}
            </button>
          )}
        </div>
      )}
      
      {/* Recent Observations */}
      <div className="observations-section">
        <div className="section-header">
          <h3>📋 Recent ROV Activity</h3>
          <p>What your ROVs have logged to your journal</p>
        </div>
        
        <div className="observations-list">
          {displayedObservations.map(obs => (
            <ObservationItem key={obs.id} observation={obs} />
          ))}
        </div>
      </div>
      
      {/* How It Works Mini-Explainer */}
      {showROVFleet && (
        <div className="rov-explainer">
          <h4>How ROVs Support Your Learning</h4>
          <div className="explainer-flow">
            <div className="explainer-step">
              <span className="step-emoji">🛠️</span>
              <span>You do the work</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="explainer-step">
              <span className="step-emoji">🤖</span>
              <span>ROVs observe & log</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="explainer-step">
              <span className="step-emoji">📝</span>
              <span>Journal auto-updates</span>
            </div>
            <span className="flow-arrow">→</span>
            <div className="explainer-step">
              <span className="step-emoji">🌟</span>
              <span>Stories get shared</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ROVActivityFeed;
