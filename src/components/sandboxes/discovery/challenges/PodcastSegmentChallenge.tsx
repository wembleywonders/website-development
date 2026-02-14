// src/components/sandboxes/discovery/challenges/PodcastSegmentChallenge.tsx
// G-Tech Casters: Plan a 2-minute podcast segment
// Structure and hook creation

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface PodcastSegmentChallengeProps {
  onComplete: (result: { completed: boolean; segment?: PodcastSegment; timeSpent: number }) => void;
  onSkip: () => void;
}

interface PodcastSegment {
  hook: string;
  topic: string;
  format: string;
  keyPoints: string[];
  callToAction: string;
}

const SEGMENT_FORMATS = [
  { 
    id: 'story', 
    name: 'Personal Story', 
    emoji: '📖', 
    description: 'Share an experience that teaches something',
    structure: ['Setup (who, where, when)', 'The moment everything changed', 'What you learned']
  },
  { 
    id: 'explainer', 
    name: 'Quick Explainer', 
    emoji: '💡', 
    description: 'Break down a concept simply',
    structure: ['What it is (in plain English)', 'Why it matters to listeners', 'One actionable takeaway']
  },
  { 
    id: 'debate', 
    name: 'Hot Take', 
    emoji: '🔥', 
    description: 'Share an unpopular opinion and defend it',
    structure: ['Your controversial claim', 'Your best evidence', 'Acknowledge the counterargument']
  },
  { 
    id: 'review', 
    name: 'Quick Review', 
    emoji: '⭐', 
    description: 'Review something in your niche',
    structure: ['What you\'re reviewing', 'Best feature / worst flaw', 'Who it\'s for (and who should skip it)']
  }
];

const HOOK_TEMPLATES = [
  { template: 'Question hook', example: '"Have you ever wondered why..."' },
  { template: 'Bold statement', example: '"Everything you know about X is wrong."' },
  { template: 'Story opener', example: '"Last Tuesday, I made the worst mistake of my life..."' },
  { template: 'Statistics shock', example: '"90% of people get this completely wrong..."' },
  { template: 'Direct address', example: '"If you\'ve ever felt X, this is for you."' }
];

const TOPIC_PROMPTS = [
  'Something you learned the hard way',
  'A skill everyone should have',
  'Something overrated in your field',
  'A mistake you see beginners make',
  'Something you changed your mind about'
];

const PodcastSegmentChallenge: React.FC<PodcastSegmentChallengeProps> = ({ onComplete, onSkip }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [hook, setHook] = useState('');
  const [keyPoints, setKeyPoints] = useState<string[]>(['', '', '']);
  const [callToAction, setCallToAction] = useState('');
  const [showHookHelp, setShowHookHelp] = useState(false);
  const [showTopicHelp, setShowTopicHelp] = useState(false);
  const [startTime] = useState(Date.now());

  const format = SEGMENT_FORMATS.find(f => f.id === selectedFormat);

  const updateKeyPoint = useCallback((index: number, value: string) => {
    setKeyPoints(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const filledPoints = keyPoints.filter(p => p.trim()).length;
  const isComplete = topic.trim() && hook.trim() && filledPoints >= 2;

  // Estimated time calculation
  const wordCount = [hook, ...keyPoints, callToAction].join(' ').split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round(wordCount * 0.5); // ~120 words per minute speaking pace

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      segment: {
        hook,
        topic,
        format: selectedFormat || '',
        keyPoints: keyPoints.filter(p => p.trim()),
        callToAction
      },
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [hook, topic, selectedFormat, keyPoints, callToAction, startTime, onComplete]);

  return (
    <div className="challenge-container podcast-challenge">
      {/* Format Selection */}
      {!selectedFormat ? (
        <div className="format-selection">
          <h3>Choose Your Segment Format</h3>
          <p>What kind of 2-minute segment will you create?</p>
          
          <div className="format-grid">
            {SEGMENT_FORMATS.map(fmt => (
              <button
                key={fmt.id}
                className="format-card"
                onClick={() => setSelectedFormat(fmt.id)}
              >
                <span className="format-emoji">{fmt.emoji}</span>
                <span className="format-name">{fmt.name}</span>
                <span className="format-desc">{fmt.description}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Format Header */}
          <div className="format-header">
            <div className="format-info">
              <span className="format-emoji-large">{format?.emoji}</span>
              <div>
                <h3>{format?.name}</h3>
                <p>{format?.description}</p>
              </div>
            </div>
            <button 
              className="btn-change-format"
              onClick={() => setSelectedFormat(null)}
            >
              Change format
            </button>
          </div>

          {/* Topic */}
          <div className="segment-field">
            <div className="field-header">
              <label>Your Topic</label>
              <button 
                className="btn-help"
                onClick={() => setShowTopicHelp(!showTopicHelp)}
              >
                💡 Need ideas?
              </button>
            </div>
            
            {showTopicHelp && (
              <div className="help-box">
                <strong>Topic prompts:</strong>
                <ul>
                  {TOPIC_PROMPTS.map((prompt, i) => (
                    <li key={i}>{prompt}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What's your segment about?"
              maxLength={100}
            />
          </div>

          {/* Hook */}
          <div className="segment-field">
            <div className="field-header">
              <label>Your Opening Hook (first 10 seconds)</label>
              <button 
                className="btn-help"
                onClick={() => setShowHookHelp(!showHookHelp)}
              >
                💡 Hook templates
              </button>
            </div>
            
            {showHookHelp && (
              <div className="help-box">
                <strong>Hook styles that work:</strong>
                <ul>
                  {HOOK_TEMPLATES.map((h, i) => (
                    <li key={i}>
                      <strong>{h.template}:</strong> {h.example}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <textarea
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Write your opening line - make them want to keep listening!"
              rows={2}
              maxLength={200}
            />
            <span className="char-count">{hook.length}/200</span>
          </div>

          {/* Key Points (structured by format) */}
          <div className="segment-field">
            <label>Your {format?.name} Structure</label>
            <div className="key-points">
              {format?.structure.map((prompt, index) => (
                <div key={index} className="key-point">
                  <span className="point-number">{index + 1}</span>
                  <div className="point-content">
                    <span className="point-prompt">{prompt}</span>
                    <textarea
                      value={keyPoints[index]}
                      onChange={(e) => updateKeyPoint(index, e.target.value)}
                      placeholder="Write your point..."
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="segment-field">
            <label>Call to Action (optional)</label>
            <input
              type="text"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
              placeholder="What should listeners do next? Subscribe, comment, try something?"
              maxLength={100}
            />
          </div>

          {/* Segment Preview */}
          <div className="segment-preview">
            <div className="preview-header">
              <h4>📋 Segment Outline</h4>
              <span className="time-estimate">
                ~{estimatedSeconds}s of {120}s
                {estimatedSeconds > 120 && <span className="over-time"> (too long!)</span>}
              </span>
            </div>
            
            <div className="preview-content">
              {hook && (
                <div className="preview-section">
                  <span className="section-label">🎣 Hook:</span>
                  <p>{hook}</p>
                </div>
              )}
              
              {keyPoints.some(p => p.trim()) && (
                <div className="preview-section">
                  <span className="section-label">📝 Main points:</span>
                  <ol>
                    {keyPoints.map((point, i) => point.trim() && (
                      <li key={i}>{point}</li>
                    ))}
                  </ol>
                </div>
              )}
              
              {callToAction && (
                <div className="preview-section">
                  <span className="section-label">👉 CTA:</span>
                  <p>{callToAction}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="segment-progress">
            <span className={topic ? 'done' : ''}>
              {topic ? '✅' : '⬜'} Topic
            </span>
            <span className={hook ? 'done' : ''}>
              {hook ? '✅' : '⬜'} Hook
            </span>
            <span className={filledPoints >= 2 ? 'done' : ''}>
              {filledPoints >= 2 ? '✅' : '⬜'} Key points ({filledPoints}/3)
            </span>
          </div>
        </>
      )}

      <div className="tips-compact">
        <strong>Podcasting truth:</strong> The first 10 seconds decide if anyone keeps listening. 
        Nail your hook, and the rest becomes easier.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!isComplete}
        >
          {isComplete ? '✅ Complete Segment' : 'Fill topic, hook & 2+ points'}
        </button>
      </div>
    </div>
  );
};

export default PodcastSegmentChallenge;