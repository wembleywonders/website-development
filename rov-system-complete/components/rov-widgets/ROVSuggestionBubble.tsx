// src/components/rov-widgets/ROVSuggestionBubble.tsx
// Floating suggestion bubble from an ROV

import React, { useState } from 'react';
import './ROVSuggestionBubble.css';

export interface Suggestion {
  id: string;
  text: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ROVSuggestionBubbleProps {
  rovEmoji: string;
  rovName: string;
  suggestions: Suggestion[];
  position?: 'fixed' | 'inline';
  onAccept: (suggestionId: string) => void;
  onDismiss: (suggestionId: string) => void;
  onDismissAll: () => void;
}

export const ROVSuggestionBubble: React.FC<ROVSuggestionBubbleProps> = ({
  rovEmoji,
  rovName,
  suggestions,
  position = 'fixed',
  onAccept,
  onDismiss,
  onDismissAll
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (suggestions.length === 0) {
    return null;
  }

  const currentSuggestion = suggestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={`rov-suggestion-bubble position-${position}`}>
      <div className="bubble-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="bubble-avatar">{rovEmoji}</span>
        <span className="bubble-rov">{rovName}</span>
        <span className="bubble-count">
          {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
        </span>
        <button 
          className="bubble-toggle"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="bubble-content">
          <div className={`suggestion-card priority-${currentSuggestion.priority}`}>
            <p className="suggestion-text">{currentSuggestion.text}</p>
            
            <div className="suggestion-actions">
              <button 
                className="btn-accept"
                onClick={() => onAccept(currentSuggestion.id)}
              >
                {currentSuggestion.action}
              </button>
              <button 
                className="btn-dismiss"
                onClick={() => {
                  onDismiss(currentSuggestion.id);
                  if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
                }}
              >
                Not now
              </button>
            </div>
          </div>

          {suggestions.length > 1 && (
            <div className="suggestion-nav">
              <button 
                className="nav-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              <span className="nav-indicator">
                {currentIndex + 1} / {suggestions.length}
              </span>
              <button 
                className="nav-btn"
                onClick={handleNext}
                disabled={currentIndex === suggestions.length - 1}
              >
                →
              </button>
            </div>
          )}

          <button 
            className="btn-dismiss-all"
            onClick={onDismissAll}
          >
            Dismiss all suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default ROVSuggestionBubble;
