// src/components/creators-journal/StageProgress.tsx
// Visual progress through the 5Cs framework stages

import React from 'react';
import './StageProgress.css';

export interface StageProgressProps {
  learnerId: string;
  onStageSelect?: (stage: string | null) => void;
  selectedStage?: string | null;
}

interface StageData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  count: number;
}

const StageProgress: React.FC<StageProgressProps> = ({
  learnerId,
  onStageSelect,
  selectedStage
}) => {
  // In real implementation, fetch from API
  const stages: StageData[] = [
    {
      id: 'connect',
      name: 'Connect',
      emoji: '🤝',
      color: '#4CAF50',
      description: 'Building relationships',
      count: 5
    },
    {
      id: 'create',
      name: 'Create',
      emoji: '🛠️',
      color: '#2196F3',
      description: 'Hands-on learning',
      count: 12
    },
    {
      id: 'cultivate',
      name: 'Cultivate',
      emoji: '🌱',
      color: '#FF9800',
      description: 'Deepening skills',
      count: 8
    },
    {
      id: 'compete',
      name: 'Compete',
      emoji: '🏆',
      color: '#9C27B0',
      description: 'Demonstrating mastery',
      count: 3
    },
    {
      id: 'celebrate',
      name: 'Celebrate',
      emoji: '🎉',
      color: '#E91E63',
      description: 'Sharing achievements',
      count: 2
    }
  ];

  const totalEntries = stages.reduce((sum, s) => sum + s.count, 0);
  const currentStageIndex = stages.findIndex(s => s.count === 0) - 1;
  const currentStage = currentStageIndex >= 0 ? stages[currentStageIndex] : stages[stages.length - 1];

  return (
    <div className="stage-progress">
      <div className="stage-overview">
        <div className="current-stage-indicator">
          <span className="current-emoji">{currentStage.emoji}</span>
          <span className="current-label">Currently in: {currentStage.name}</span>
        </div>
        <div className="total-entries">
          {totalEntries} journal entries
        </div>
      </div>

      <div className="stage-timeline">
        {stages.map((stage, index) => (
          <button
            key={stage.id}
            className={`stage-item ${selectedStage === stage.id ? 'selected' : ''} ${stage.count > 0 ? 'active' : 'inactive'}`}
            style={{ '--stage-color': stage.color } as React.CSSProperties}
            onClick={() => onStageSelect?.(selectedStage === stage.id ? null : stage.id)}
          >
            <div className="stage-icon">
              <span className="stage-emoji">{stage.emoji}</span>
              {index < stages.length - 1 && (
                <div className={`stage-connector ${stages[index + 1].count > 0 ? 'filled' : ''}`} />
              )}
            </div>
            <div className="stage-info">
              <span className="stage-name">{stage.name}</span>
              <span className="stage-count">{stage.count} entries</span>
            </div>
          </button>
        ))}
      </div>

      <div className="stage-legend">
        <p>Click a stage to filter your journal entries</p>
      </div>
    </div>
  );
};

export default StageProgress;
