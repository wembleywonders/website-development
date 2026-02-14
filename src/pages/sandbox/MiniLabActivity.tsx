// src/pages/sandbox/MiniLabActivity.tsx
import React, { useState } from 'react';
import { useSandbox } from '../../contexts/SandboxContext';
import MiniLabStep from '../../pages/creators-hub/sandbox/steps/MiniLabStep';
import './ActivityShared.css';

interface MiniLabActivityProps {
  onComplete?: () => void;
  onSkip?: () => void;
  programmeContext?: string;
}

const MiniLabActivity: React.FC<MiniLabActivityProps> = ({
  onComplete,
  onSkip,
  programmeContext,
}) => {
  const { addActivity, session } = useSandbox();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMiniLabComplete = async (result: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const activity = {
        id: `activity-${Date.now()}`,
        type: 'mini-lab' as const,
        promptId: result.promptId,
        promptTitle: result.promptTitle,
        content: result.response,
        timestamp: result.timestamp,
        visibility: 'private' as const,
      };

      addActivity(activity);

      // Success message
      console.log('Mini Lab completed:', activity);

      // Call onComplete callback after a brief delay for UX
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save your mini lab'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="activity-container mini-lab-activity">
      <div className="activity-header">
        <h2>Step 1: Mini Lab</h2>
        <p className="activity-intro">
          Get creative with a quick 10-minute prompt to spark ideas
        </p>
        {programmeContext && (
          <p className="programme-context">📍 {programmeContext}</p>
        )}
      </div>

      {error && (
        <div className="activity-error">
          <p>⚠️ {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="activity-content">
        <MiniLabStep onComplete={handleMiniLabComplete} />
      </div>

      <div className="activity-footer">
        <p className="activity-stats">
          <span>📊 Activities completed: {session.completedActivities.length}</span>
        </p>
        {onSkip && (
          <button className="skip-button" onClick={onSkip} disabled={isSubmitting}>
            ← Skip to Next Activity
          </button>
        )}
      </div>

      {isSubmitting && (
        <div className="activity-saving">
          <p>💾 Saving your work...</p>
        </div>
      )}
    </div>
  );
};

export default MiniLabActivity;
