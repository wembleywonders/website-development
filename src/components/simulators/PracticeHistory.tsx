// src/components/simulators/PracticeHistory.tsx
import React from 'react';

interface PracticeSession {
  id: string;
  portalName: string;
  lastPracticed: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  statusLabel: string;
}

interface PracticeHistoryProps {
  sessions: PracticeSession[];
}

const PracticeHistory: React.FC<PracticeHistoryProps> = ({ sessions }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-progress';
      default: return 'status-not-started';
    }
  };

  return (
    <div className="practice-history">
      <h2 className="history-title">Your Practice History</h2>
      <div className="history-grid">
        {sessions.map((session) => (
          <div key={session.id} className="history-item">
            <div className="history-portal">{session.portalName}</div>
            <div className="history-date">Last practiced: {session.lastPracticed}</div>
            <div className="history-progress">
              <div 
                className="progress-fill" 
                style={{ width: `${session.progress}%` }}
              ></div>
            </div>
            <div className={`history-status ${getStatusClass(session.status)}`}>
              {session.statusLabel}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeHistory;