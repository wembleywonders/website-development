// src/pages/sandbox/JournalEntryActivity.tsx
import React, { useState } from 'react';
import { useSandbox } from '../../contexts/SandboxContext';
import './ActivityShared.css';

interface JournalEntryActivityProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

const JournalEntryActivity: React.FC<JournalEntryActivityProps> = ({
  onComplete,
  onSkip,
}) => {
  const { addActivity, session } = useSandbox();
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<'private' | 'community' | 'public'>(
    'private'
  );

  const prompts = [
    {
      id: 'reflection',
      title: '🤔 Reflect on Your Day',
      starter: 'Today I learned... and it reminded me of...',
    },
    {
      id: 'gratitude',
      title: '🙏 Gratitude Practice',
      starter: 'Three things I\'m grateful for today are... because...',
    },
    {
      id: 'goals',
      title: '🎯 Tomorrow\'s Goals',
      starter: 'Tomorrow I want to focus on... because it matters to me...',
    },
    {
      id: 'creative',
      title: '✨ Creative Reflection',
      starter: 'If my day was a colour, it would be... because...',
    },
  ];

  const handleSubmit = async () => {
    if (!journalText.trim()) {
      setError('Please write something before saving');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const activity = {
        id: `activity-${Date.now()}`,
        type: 'journal' as const,
        promptId: 'journal-entry',
        promptTitle: 'Journal Reflection',
        content: journalText,
        timestamp: new Date().toISOString(),
        wordCount: journalText.trim().split(/\s+/).length,
        visibility,
      };

      addActivity(activity);

      setJournalText('');

      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save your journal entry'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="activity-container journal-activity">
      <div className="activity-header">
        <h2>📓 Journal Entry</h2>
        <p className="activity-intro">
          Reflect on your creative journey and what you&apos;ve learned
        </p>
      </div>

      {error && (
        <div className="activity-error">
          <p>⚠️ {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="activity-content">
        <div className="prompts-quick-select">
          <p className="prompts-label">💡 Pick a prompt or write freely:</p>
          <div className="prompts-buttons">
            {prompts.map(prompt => (
              <button
                key={prompt.id}
                className="prompt-button"
                onClick={() => setJournalText(prompt.starter)}
                disabled={isSubmitting}
              >
                {prompt.title}
              </button>
            ))}
          </div>
        </div>

        <div className="journal-workspace">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your journal entry here... no rules, no judgment. Write from your heart."
            rows={12}
            className="journal-input"
            disabled={isSubmitting}
          />

          <div className="writing-stats">
            <span className="word-count">
              {journalText.trim().split(/\s+/).filter(w => w).length} words
            </span>
            <span className="char-count">
              {journalText.length} characters
            </span>
          </div>
        </div>

        <div className="visibility-selector">
          <label>Who can see this?</label>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={(e) => setVisibility(e.target.value as any)}
                disabled={isSubmitting}
              />
              🔒 Private (Only me)
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="community"
                checked={visibility === 'community'}
                onChange={(e) => setVisibility(e.target.value as any)}
                disabled={isSubmitting}
              />
              👥 Community (Other members)
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={(e) => setVisibility(e.target.value as any)}
                disabled={isSubmitting}
              />
              🌍 Public (Everyone)
            </label>
          </div>
        </div>
      </div>

      <div className="activity-footer">
        <p className="activity-stats">
          <span>📊 Activities completed: {session.completedActivities.length}</span>
        </p>
        <div className="footer-buttons">
          <button
            className="btn-primary save-button"
            onClick={handleSubmit}
            disabled={isSubmitting || !journalText.trim()}
          >
            {isSubmitting ? '💾 Saving...' : 'Save Journal Entry →'}
          </button>
          {onSkip && (
            <button
              className="skip-button"
              onClick={onSkip}
              disabled={isSubmitting}
            >
              ← Skip Activity
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalEntryActivity;
