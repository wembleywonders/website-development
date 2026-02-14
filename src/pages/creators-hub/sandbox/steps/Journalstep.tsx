import React, { useState } from 'react';
import '../ActivityShared.css';

interface JournalStepProps {
  labResult?: any;
  onComplete: (entry: string) => void;
}

const JournalStep: React.FC<JournalStepProps> = ({ labResult, onComplete }) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJournalEntry(text);
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const handleSubmit = () => {
    if (journalEntry.length >= 50) {
      onComplete(journalEntry);
    }
  };

  const prompts = [
    "What did you create in the Mini Lab? How does it reflect your creative vision?",
    "What challenges did you face? What did you learn?",
    "How does this project connect to your community or heritage?",
    "What would you do differently next time?",
    "How does this work make you feel? What does it mean to you?"
  ];

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>📖 Reflect in Your Journal</h2>
        <p className="activity-subtitle">
          Document your creative journey. What did you make? What did you learn?
        </p>
      </div>

      {labResult && (
        <div className="context-box">
          <h3>Your Mini Lab Creation</h3>
          <p>You just completed: <strong>{labResult.title || 'Mini Lab Activity'}</strong></p>
          <p>Reflect on this experience below.</p>
        </div>
      )}

      <div className="prompts-section">
        <h3>Reflection Prompts:</h3>
        <ul className="prompts-list">
          {prompts.map((prompt, idx) => (
            <li key={idx}>{prompt}</li>
          ))}
        </ul>
      </div>

      <div className="input-section">
        <div className="input-header">
          <label htmlFor="journal-entry">Your Journal Entry</label>
          <span className="word-count">
            {wordCount} words {wordCount < 50 && `(${50 - wordCount} more needed)`}
          </span>
        </div>
        <textarea
          id="journal-entry"
          className="journal-textarea"
          value={journalEntry}
          onChange={handleTextChange}
          placeholder="Start writing your reflection here... What did you create? What did you discover about yourself? How does this connect to your journey?"
          rows={12}
        />
      </div>

      <div className="activity-actions">
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={journalEntry.length < 50}
        >
          {journalEntry.length < 50 
            ? 'Write at least 50 characters to continue' 
            : 'Continue to Voice Note →'}
        </button>
        <p className="helper-text">
          Your journal helps you track your creative growth over time.
        </p>
      </div>
    </div>
  );
};

export default JournalStep;
