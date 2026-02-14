// src/components/sandboxes/discovery/challenges/SixWordStoryChallenge.tsx
// PageTurners: Write a complete story in exactly 6 words
// Famous example: "For sale: baby shoes, never worn." - Hemingway

import React, { useState, useEffect, useCallback } from 'react';
import './ChallengeBase.css';

interface SixWordStoryChallengeProps {
  onComplete: (result: { completed: boolean; story?: string; timeSpent: number }) => void;
  onSkip: () => void;
}

const SixWordStoryChallenge: React.FC<SixWordStoryChallengeProps> = ({ onComplete, onSkip }) => {
  const [story, setStory] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [showExamples, setShowExamples] = useState(false);

  const FAMOUS_EXAMPLES = [
    { text: "For sale: baby shoes, never worn.", author: "Hemingway (attributed)" },
    { text: "Longed for him. Got him. Shit.", author: "Margaret Atwood" },
    { text: "Machine. Unexpectedly, I'd invented a time", author: "Alan Moore" },
    { text: "Dinosaurs return. Want their oil back.", author: "David Brin" }
  ];

  const PROMPTS = [
    "A moment that changed everything",
    "Something lost, something found",
    "A secret revealed",
    "Before and after",
    "What they never said"
  ];

  const [currentPrompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);

  useEffect(() => {
    const words = story.trim() ? story.trim().split(/\s+/).filter(w => w.length > 0) : [];
    setWordCount(words.length);
  }, [story]);

  const handleSubmit = useCallback(() => {
    if (wordCount === 6) {
      onComplete({
        completed: true,
        story,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      });
    }
  }, [wordCount, story, startTime, onComplete]);

  const isExactlySix = wordCount === 6;
  const isOverSix = wordCount > 6;

  return (
    <div className="challenge-container">
      <div className="challenge-prompt">
        <span className="prompt-label">Today's prompt:</span>
        <span className="prompt-text">"{currentPrompt}"</span>
      </div>

      <div className="writing-area">
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Write exactly six words..."
          className={`story-input ${isExactlySix ? 'perfect' : ''} ${isOverSix ? 'over' : ''}`}
          autoFocus
        />
        
        <div className="word-counter">
          <span className={`count ${isExactlySix ? 'perfect' : ''} ${isOverSix ? 'over' : ''}`}>
            {wordCount}/6 words
          </span>
          {isExactlySix && <span className="perfect-badge">✨ Perfect!</span>}
          {isOverSix && <span className="over-badge">Too many words</span>}
        </div>
      </div>

      <div className="examples-section">
        <button 
          className="btn-examples"
          onClick={() => setShowExamples(!showExamples)}
        >
          💡 {showExamples ? 'Hide' : 'See'} Famous Examples
        </button>
        
        {showExamples && (
          <div className="examples-list">
            {FAMOUS_EXAMPLES.map((ex, i) => (
              <div key={i} className="example">
                <span className="example-text">"{ex.text}"</span>
                <span className="example-author">— {ex.author}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tips-compact">
        <strong>Tips:</strong> Every word must work hard. Imply more than you say. 
        End with impact.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!isExactlySix}
        >
          {isExactlySix ? '✅ Submit Story' : `Need ${6 - wordCount} more word${6 - wordCount !== 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
};

export default SixWordStoryChallenge;