// src/components/sandboxes/mini/MicroStorySandbox.tsx
// Mini-sandbox for creating 200-word micro stories
// Programme: Pageturners
// Constraint: 200 words max, 10 minute session

import React, { useState, useEffect, useCallback } from 'react';
import MiniSandboxBase, { ConstraintMeter, SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './MicroStorySandbox.css';

// ============================================
// PROMPTS
// ============================================

const STORY_PROMPTS: SandboxPrompt[] = [
  {
    id: 'story-door',
    title: 'The Door That Wasn\'t There Yesterday',
    brief: 'You notice a door in a familiar place that you\'ve never seen before. What\'s behind it? What happens when you open it? Tell the whole story in 200 words.',
    category: 'Fantasy/Mystery',
    hints: [
      'Start with the moment of discovery',
      'Use sensory details - what does the door look/feel like?',
      'The ending can be a twist, a revelation, or a question'
    ],
    inspiration: 'Hemingway\'s famous 6-word story ("For sale: baby shoes, never worn") proves that constraints breed creativity. Every word must earn its place.'
  },
  {
    id: 'story-last',
    title: 'The Last Customer',
    brief: 'A shop is closing forever. One final customer comes in. Who are they? What do they buy? What does it mean? 200 words.',
    category: 'Human Drama',
    hints: [
      'The object they buy should carry emotional weight',
      'What history exists between customer and shopkeeper?',
      'Endings can be bittersweet'
    ],
    inspiration: 'Raymond Carver wrote entire worlds in a few pages. "Cathedral" builds to a moment of profound connection through mundane detail.'
  },
  {
    id: 'story-message',
    title: 'Wrong Number, Right Message',
    brief: 'Someone receives a text meant for someone else. The message changes their day - or their life. Tell us what it said and what happened next.',
    category: 'Contemporary',
    hints: [
      'What does the message say? Be specific.',
      'Why does it matter to the wrong recipient?',
      'Does the character respond? Ignore it? Act on it?'
    ],
    inspiration: 'Lydia Davis writes stories in a single paragraph that contain multitudes. Her "Story" is just 400 words but covers a whole relationship.'
  },
  {
    id: 'story-sound',
    title: 'The Sound That Stopped',
    brief: 'There\'s a sound you hear every day without noticing. One day, it stops. Write about that silence and what it reveals.',
    category: 'Reflection',
    hints: [
      'What was the sound? Traffic, birds, a neighbor, a machine?',
      'Silence can be relief, loss, or warning',
      'What does the character do next?'
    ],
    inspiration: 'Jamaica Kincaid\'s "Girl" is one long sentence, a mother\'s instructions to her daughter, that reveals an entire culture and relationship.'
  },
  {
    id: 'story-wembley',
    title: 'Wembley, 3AM',
    brief: 'Something unexpected happens in Wembley at 3 in the morning. Who\'s awake? What do they witness? Local setting, universal story.',
    category: 'Local/Place',
    hints: [
      'Use real places - the stadium, a specific street, a late-night shop',
      'Who\'s out at 3AM? Night workers, insomniacs, teenagers?',
      'Small moments can be profound'
    ],
    inspiration: 'Zadie Smith\'s Kilburn feels alive because she uses real places with fictional precision. Settings aren\'t backdrops - they\'re characters.'
  }
];

// ============================================
// COMPONENT
// ============================================

const MicroStorySandbox: React.FC = () => {
  const [currentPrompt] = useState<SandboxPrompt>(
    STORY_PROMPTS[Math.floor(Math.random() * STORY_PROMPTS.length)]
  );
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [title, setTitle] = useState('');
  const [showStats, setShowStats] = useState(false);

  const constraints: SandboxConstraints = {
    maxWords: 200,
    timeLimit: 10,  // 10 minute session
  };

  // Count words and characters
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    setWordCount(words);
    setCharacterCount(chars);
  }, [text]);

  // Handle text input with word limit
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const words = newText.trim() ? newText.trim().split(/\s+/).length : 0;
    
    // Allow typing but warn when over
    setText(newText);
  }, []);

  const isOverLimit = wordCount > constraints.maxWords!;
  const wordsRemaining = constraints.maxWords! - wordCount;
  
  // Simple readability metrics
  const avgWordLength = wordCount > 0 ? (characterCount / wordCount).toFixed(1) : '0';
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const avgSentenceLength = sentences > 0 ? (wordCount / sentences).toFixed(1) : '0';

  return (
    <MiniSandboxBase
      sandboxId="micro-story"
      sandboxName="200-Word Story"
      sandboxEmoji="✍️"
      programme="Pageturners"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="micro-story-sandbox">
        {/* Word Counter */}
        <div className="word-counter-section">
          <ConstraintMeter
            label="Words Used"
            current={wordCount}
            max={constraints.maxWords!}
            unit="words"
            emoji="✍️"
          />
          <div className="words-remaining">
            {isOverLimit ? (
              <span className="over-limit">
                ⚠️ {Math.abs(wordsRemaining)} words over limit - trim to save!
              </span>
            ) : wordsRemaining <= 20 ? (
              <span className="near-limit">
                🎯 {wordsRemaining} words remaining - choose wisely!
              </span>
            ) : (
              <span className="plenty-left">
                📝 {wordsRemaining} words remaining
              </span>
            )}
          </div>
        </div>

        {/* Title Input */}
        <div className="title-section">
          <label htmlFor="story-title">Story Title (optional)</label>
          <input
            id="story-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a title..."
            maxLength={100}
          />
        </div>

        {/* Writing Area */}
        <div className="writing-section">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Start writing your story here..."
            className={isOverLimit ? 'over-limit' : ''}
          />
          
          <div className="writing-footer">
            <button 
              className="btn-stats"
              onClick={() => setShowStats(!showStats)}
            >
              📊 {showStats ? 'Hide' : 'Show'} Stats
            </button>
            <span className="char-count">
              {characterCount} characters
            </span>
          </div>
        </div>

        {/* Stats Panel */}
        {showStats && (
          <div className="stats-panel">
            <h4>📊 Writing Stats</h4>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-value">{wordCount}</span>
                <span className="stat-label">Words</span>
              </div>
              <div className="stat">
                <span className="stat-value">{sentences}</span>
                <span className="stat-label">Sentences</span>
              </div>
              <div className="stat">
                <span className="stat-value">{avgWordLength}</span>
                <span className="stat-label">Avg Word Length</span>
              </div>
              <div className="stat">
                <span className="stat-value">{avgSentenceLength}</span>
                <span className="stat-label">Avg Sentence Length</span>
              </div>
            </div>
            <p className="stats-insight">
              {parseFloat(avgSentenceLength) > 20 
                ? '💡 Your sentences are quite long. Try varying length for rhythm.'
                : parseFloat(avgSentenceLength) < 8
                ? '💡 Short punchy sentences! Consider a longer one for contrast.'
                : '💡 Good sentence variety. Keep that rhythm going!'
              }
            </p>
          </div>
        )}

        {/* Writing Tips */}
        <div className="tips-panel">
          <h4>🎯 Micro Story Tips</h4>
          <ul>
            <li><strong>Start late, end early</strong> - Jump into the action, leave before everything is explained</li>
            <li><strong>One scene, one moment</strong> - 200 words is a snapshot, not a film</li>
            <li><strong>Cut ruthlessly</strong> - If a word isn't working hard, delete it</li>
            <li><strong>Read aloud</strong> - Your ear catches what your eye misses</li>
          </ul>
        </div>

        {/* Quick Word Suggestions (for trimming) */}
        {isOverLimit && (
          <div className="trim-suggestions">
            <h4>✂️ Trimming Tips</h4>
            <ul>
              <li>Replace "very" + adjective with a stronger adjective</li>
              <li>Cut "that" - it's often unnecessary</li>
              <li>Turn "was walking" into "walked" (avoid -ing forms)</li>
              <li>Delete "began to" and "started to"</li>
              <li>Remove adverbs - make the verb do the work</li>
            </ul>
          </div>
        )}
      </div>
    </MiniSandboxBase>
  );
};

export default MicroStorySandbox;