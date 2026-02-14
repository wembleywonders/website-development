// src/components/simulators/SimulatorCard.tsx
import React from 'react';

interface SimulatorCardProps {
  simulator: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    features: string[];
    stats: {
      sessions: number;
      rating: number;
      successRate: number;
    };
    status?: 'most-popular' | 'updated' | 'new';
  };
  onLaunch: () => void;
  onHelp: () => void;
}

const SimulatorCard: React.FC<SimulatorCardProps> = ({ simulator, onLaunch, onHelp }) => {
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'most-popular': return 'Most Popular';
      case 'updated': return 'Updated';
      case 'new': return 'New';
      default: return '';
    }
  };

  return (
    <div className="simulator-card">
      <div className="simulator-header">
        {simulator.status && (
          <div className="simulator-status">{getStatusText(simulator.status)}</div>
        )}
        <span className="simulator-icon">{simulator.icon}</span>
        <h3 className="simulator-title">{simulator.title}</h3>
        <p className="simulator-subtitle">{simulator.subtitle}</p>
      </div>
      <div className="simulator-content">
        <p className="simulator-description">{simulator.description}</p>
        <ul className="simulator-features">
          {simulator.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="simulator-stats">
          <div className="stat-item">
            <div className="stat-number">{simulator.stats.sessions.toLocaleString()}</div>
            <div className="stat-label">Practice Sessions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{simulator.stats.rating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{simulator.stats.successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
        <div className="simulator-actions">
          <button className="launch-btn" onClick={onLaunch}>
            Launch {simulator.title.split(' ')[0]} Simulator
          </button>
          <button className="help-btn" onClick={onHelp} title="Get help with this simulator">
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulatorCard;