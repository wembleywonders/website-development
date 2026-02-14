// src/components/sandboxes/mini/HeadlineChallengeSandbox.tsx
// Mini-sandbox: Write 10 different headlines for the same story
// Programme: Pageturners
// Constraint: 10 headlines, 60 characters max each

import React, { useState, useCallback } from 'react';
import MiniSandboxBase, { ConstraintMeter, SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './HeadlineChallengeSandbox.css';

// ============================================
// PROMPTS
// ============================================

const HEADLINE_PROMPTS: SandboxPrompt[] = [
  {
    id: 'headline-local',
    title: 'Local Hero Story',
    brief: 'A Wembley resident saved a child from a burning building last night. Write 10 different headlines for this story - make each one approach it from a different angle.',
    category: 'News',
    hints: [
      'Try: dramatic, understated, question, quote, number-led',
      'Consider: who reads this? Neighbours? National audience?',
      'The same facts can feel heroic, scary, or heartwarming'
    ],
    inspiration: 'Tabloids and broadsheets cover the same story completely differently. "HERO DAD" vs "Local man rescues child in Wembley fire" - same facts, different worlds.'
  },
  {
    id: 'headline-business',
    title: 'Business Closure',
    brief: 'A beloved local restaurant that\'s been open for 40 years is closing next month. Write 10 headlines - some sympathetic, some analytical, some clickbait.',
    category: 'Business/Community',
    hints: [
      'Emotional angle vs business angle',
      'Nostalgia vs future-focused',
      'What question does each headline answer?'
    ],
    inspiration: 'The Guardian might ask "what this means for high streets" while the local paper leads with the owner\'s tears. Both valid, both different.'
  },
  {
    id: 'headline-tech',
    title: 'New App Launch',
    brief: 'A teenager from your area just launched an app that\'s gone viral - 1 million downloads in a week. Write 10 headlines covering different angles.',
    category: 'Tech/Youth',
    hints: [
      'Age angle, local pride angle, tech angle, money angle',
      'Inspirational vs analytical vs skeptical',
      'What makes someone click?'
    ],
    inspiration: 'TechCrunch cares about the product. Your mum cares that they\'re from round here. Buzzfeed just wants you to click.'
  },
  {
    id: 'headline-sport',
    title: 'Underdog Victory',
    brief: 'A local youth football team just beat a professional academy team 3-0 in a cup match. Write 10 headlines for different audiences.',
    category: 'Sport',
    hints: [
      'Celebrate the winners vs embarrass the losers',
      'Statistics vs emotion vs character',
      'Who\'s the main character of your headline?'
    ],
    inspiration: 'Sports headlines are an art form. "GIANT KILLERS" vs "Academy humiliated by amateurs" vs "Dreams come true for Wembley youth" - all the same match.'
  }
];

// ============================================
// HEADLINE STYLES
// ============================================

const HEADLINE_STYLES = [
  { id: 'dramatic', name: 'Dramatic', emoji: '🔥', example: 'HERO SAVES CHILD FROM INFERNO' },
  { id: 'question', name: 'Question', emoji: '❓', example: 'What Made Him Run Into The Flames?' },
  { id: 'quote', name: 'Quote', emoji: '💬', example: '"I Didn\'t Think, I Just Acted"' },
  { id: 'number', name: 'Number-Led', emoji: '🔢', example: '3 Minutes That Changed Everything' },
  { id: 'understated', name: 'Understated', emoji: '📰', example: 'Local man assists in building fire' },
  { id: 'clickbait', name: 'Clickbait', emoji: '👆', example: 'You Won\'t Believe What This Dad Did' },
  { id: 'emotional', name: 'Emotional', emoji: '💔', example: 'A Father\'s Love Knew No Fear' },
  { id: 'analytical', name: 'Analytical', emoji: '📊', example: 'Fire response times raise questions' },
  { id: 'local', name: 'Local Pride', emoji: '🏠', example: 'Wembley\'s Own: Hero Next Door' },
  { id: 'future', name: 'Future-Focused', emoji: '🔮', example: 'Family reunited after dramatic rescue' }
];

// ============================================
// COMPONENT
// ============================================

const HeadlineChallengeSandbox: React.FC = () => {
  const [currentPrompt] = useState<SandboxPrompt>(
    HEADLINE_PROMPTS[Math.floor(Math.random() * HEADLINE_PROMPTS.length)]
  );
  const [headlines, setHeadlines] = useState<string[]>(Array(10).fill(''));
  const [selectedStyles, setSelectedStyles] = useState<string[]>(Array(10).fill(''));
  const [showStyleGuide, setShowStyleGuide] = useState(false);

  const constraints: SandboxConstraints = {
    maxItems: 10,
    maxCharacters: 60,
    timeLimit: 10,
  };

  const filledCount = headlines.filter(h => h.trim().length > 0).length;
  const validCount = headlines.filter(h => h.trim().length > 0 && h.length <= 60).length;

  const updateHeadline = useCallback((index: number, value: string) => {
    setHeadlines(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const updateStyle = useCallback((index: number, styleId: string) => {
    setSelectedStyles(prev => {
      const updated = [...prev];
      updated[index] = styleId;
      return updated;
    });
  }, []);

  // Check for variety
  const uniqueStyles = new Set(selectedStyles.filter(s => s)).size;
  const hasVariety = uniqueStyles >= 5;

  return (
    <MiniSandboxBase
      sandboxId="headline-challenge"
      sandboxName="10 Headlines Challenge"
      sandboxEmoji="📰"
      programme="Pageturners"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="headline-challenge-sandbox">
        {/* Progress */}
        <div className="headline-progress">
          <ConstraintMeter
            label="Headlines Written"
            current={validCount}
            max={10}
            unit="headlines"
            emoji="📰"
          />
          <div className="variety-indicator">
            {hasVariety ? (
              <span className="variety-good">✨ Good variety! {uniqueStyles} different styles</span>
            ) : (
              <span className="variety-hint">💡 Try {5 - uniqueStyles} more styles for variety</span>
            )}
          </div>
        </div>

        {/* Style Guide Toggle */}
        <div className="style-guide-section">
          <button 
            className="btn-style-guide"
            onClick={() => setShowStyleGuide(!showStyleGuide)}
          >
            📚 {showStyleGuide ? 'Hide' : 'Show'} Headline Style Guide
          </button>
          
          {showStyleGuide && (
            <div className="style-guide">
              <div className="style-grid">
                {HEADLINE_STYLES.map(style => (
                  <div key={style.id} className="style-card">
                    <span className="style-emoji">{style.emoji}</span>
                    <span className="style-name">{style.name}</span>
                    <span className="style-example">"{style.example}"</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Headlines Input */}
        <div className="headlines-list">
          {headlines.map((headline, index) => {
            const charCount = headline.length;
            const isOverLimit = charCount > 60;
            const isFilled = headline.trim().length > 0;
            
            return (
              <div key={index} className={`headline-row ${isFilled ? 'filled' : ''} ${isOverLimit ? 'over-limit' : ''}`}>
                <span className="headline-number">{index + 1}</span>
                
                <div className="headline-input-group">
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => updateHeadline(index, e.target.value)}
                    placeholder={`Headline ${index + 1}...`}
                    className="headline-input"
                  />
                  <span className={`char-count ${isOverLimit ? 'over' : charCount > 50 ? 'near' : ''}`}>
                    {charCount}/60
                  </span>
                </div>

                <select
                  value={selectedStyles[index]}
                  onChange={(e) => updateStyle(index, e.target.value)}
                  className="style-select"
                >
                  <option value="">Style?</option>
                  {HEADLINE_STYLES.map(style => (
                    <option key={style.id} value={style.id}>
                      {style.emoji} {style.name}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Analysis */}
        {validCount >= 5 && (
          <div className="headlines-analysis">
            <h4>📊 Your Headlines</h4>
            <div className="analysis-stats">
              <div className="stat">
                <span className="stat-value">{validCount}</span>
                <span className="stat-label">Valid headlines</span>
              </div>
              <div className="stat">
                <span className="stat-value">{uniqueStyles}</span>
                <span className="stat-label">Different styles</span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  {Math.round(headlines.filter(h => h.trim()).reduce((sum, h) => sum + h.length, 0) / filledCount) || 0}
                </span>
                <span className="stat-label">Avg. characters</span>
              </div>
            </div>
            
            {filledCount >= 8 && (
              <div className="best-headline">
                <strong>Which is your strongest?</strong> 
                <p>The best headline makes you want to read the story immediately.</p>
              </div>
            )}
          </div>
        )}

        {/* Tips Panel */}
        <div className="tips-panel">
          <h4>🎯 Headline Principles</h4>
          <ul>
            <li><strong>Every word earns its place</strong> - Headlines are expensive real estate</li>
            <li><strong>Active verbs</strong> - "Man saves child" not "Child was saved"</li>
            <li><strong>Specific beats vague</strong> - "3 minutes" is better than "moments"</li>
            <li><strong>Promise value</strong> - Why should I read this?</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default HeadlineChallengeSandbox;