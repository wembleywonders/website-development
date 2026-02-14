// src/components/sandboxes/discovery/CreativePathFinder.tsx
// "Find Your Creative Path" - Pick 3 challenges, discover what clicks
// Entry point for new members to sample different programmes

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './CreativePathFinder.css';

// ============================================
// TYPES
// ============================================

interface Challenge {
  id: string;
  programme: string;
  programmeEmoji: string;
  title: string;
  description: string;
  duration: string; // "5 min"
  skills: string[];
  color: string;
  component?: string; // path to sandbox component
}

interface DiscoveryResult {
  challengeId: string;
  completed: boolean;
  timeSpent: number;
  enjoymentRating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

// ============================================
// CHALLENGE DATA
// ============================================

const CHALLENGES: Challenge[] = [
  {
    id: 'trubble-loop',
    programme: 'Trubble n Bass',
    programmeEmoji: '🎵',
    title: 'Build a 4-Bar Loop',
    description: 'Create your first beat using our drum machine. No experience needed.',
    duration: '5 min',
    skills: ['Rhythm', 'Pattern recognition', 'Music production basics'],
    color: '#ef4444',
    component: 'DrumLoopChallenge'
  },
  {
    id: 'stem-circuit',
    programme: 'STEMgineers',
    programmeEmoji: '🔧',
    title: 'Wire a Simple Circuit',
    description: 'Connect a virtual LED circuit and make it light up.',
    duration: '5 min',
    skills: ['Logic', 'Problem solving', 'Electronics basics'],
    color: '#10b981',
    component: 'CircuitChallenge'
  },
  {
    id: 'page-sixword',
    programme: 'PageTurners',
    programmeEmoji: '📖',
    title: 'Write a 6-Word Story',
    description: 'Tell a complete story in exactly six words.',
    duration: '5 min',
    skills: ['Creativity', 'Concise writing', 'Storytelling'],
    color: '#8b5cf6',
    component: 'SixWordStoryChallenge'
  },
  {
    id: 'silk-style',
    programme: 'Silk Stilettos',
    programmeEmoji: '👗',
    title: 'Style a Look',
    description: 'Put together an outfit for a specific occasion.',
    duration: '5 min',
    skills: ['Visual thinking', 'Color coordination', 'Self-expression'],
    color: '#ec4899',
    component: 'StyleLookChallenge'
  },
  {
    id: 'gtech-segment',
    programme: 'G-Tech Casters',
    programmeEmoji: '🎙️',
    title: 'Plan a 2-Minute Segment',
    description: 'Outline a podcast intro that hooks listeners.',
    duration: '5 min',
    skills: ['Communication', 'Structure', 'Audience awareness'],
    color: '#f59e0b',
    component: 'PodcastSegmentChallenge'
  },
  {
    id: 'anansi-recipe',
    programme: "Auntie Anansi's Kitchen",
    programmeEmoji: '🍲',
    title: 'Document a Family Recipe',
    description: 'Record a recipe from memory with its story.',
    duration: '5 min',
    skills: ['Documentation', 'Cultural preservation', 'Storytelling'],
    color: '#f97316',
    component: 'FamilyRecipeChallenge'
  },
  {
    id: 'kaywana-character',
    programme: "Kaywana's Court",
    programmeEmoji: '🎭',
    title: 'Create a Character',
    description: 'Build a character with a secret and a goal.',
    duration: '5 min',
    skills: ['Empathy', 'Psychology', 'Drama'],
    color: '#6366f1',
    component: 'CharacterCreatorChallenge'
  },
  {
    id: 'scrap-diagnose',
    programme: 'Scrap Cat',
    programmeEmoji: '♻️',
    title: 'Diagnose a Device',
    description: "Figure out why a phone won't charge.",
    duration: '5 min',
    skills: ['Logical thinking', 'Troubleshooting'],
    color: '#14b8a6',
    component: 'DeviceDiagnosisChallenge'
  }
];

// ============================================
// COMPONENT
// ============================================

const CreativePathFinder: React.FC = () => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'select' | 'play' | 'results'>('select');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [results, setResults] = useState<DiscoveryResult[]>([]);

  const maxSelections = 3;
  const canStartJourney = selectedChallenges.length === maxSelections;

  const toggleChallenge = useCallback((challengeId: string) => {
    setSelectedChallenges(prev => {
      if (prev.includes(challengeId)) {
        return prev.filter(id => id !== challengeId);
      }
      if (prev.length >= maxSelections) {
        return prev;
      }
      return [...prev, challengeId];
    });
  }, []);

  const startJourney = useCallback(() => {
    if (canStartJourney) {
      setCurrentStep('play');
      setCurrentChallengeIndex(0);
    }
  }, [canStartJourney]);

  const completeChallenge = useCallback((result: DiscoveryResult) => {
    setResults(prev => [...prev, result]);
    
    if (currentChallengeIndex < selectedChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      setCurrentStep('results');
    }
  }, [currentChallengeIndex, selectedChallenges.length]);

  const skipChallenge = useCallback(() => {
    const challengeId = selectedChallenges[currentChallengeIndex];
    completeChallenge({
      challengeId,
      completed: false,
      timeSpent: 0
    });
  }, [currentChallengeIndex, selectedChallenges, completeChallenge]);

  const resetJourney = useCallback(() => {
    setSelectedChallenges([]);
    setCurrentStep('select');
    setCurrentChallengeIndex(0);
    setResults([]);
  }, []);

  // Get selected challenge objects
  const selectedChallengeObjects = selectedChallenges.map(
    id => CHALLENGES.find(c => c.id === id)!
  );

  const currentChallenge = currentStep === 'play' 
    ? selectedChallengeObjects[currentChallengeIndex]
    : null;

  return (
    <div className="creative-path-finder">
      {/* Header */}
      <header className="finder-header">
        <h1>🧭 Find Your Creative Path</h1>
        <p>Pick 3 challenges from different programmes. Complete them in 15 minutes. Discover what clicks.</p>
      </header>

      {/* Selection Step */}
      {currentStep === 'select' && (
        <>
          {/* Progress Indicator */}
          <div className="selection-progress">
            <div className="progress-dots">
              {[...Array(maxSelections)].map((_, i) => (
                <span 
                  key={i} 
                  className={`dot ${i < selectedChallenges.length ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span className="progress-text">
              {selectedChallenges.length}/{maxSelections} selected
            </span>
          </div>

          {/* Challenge Grid */}
          <div className="challenge-section">
            <h2>Choose Your Challenges</h2>
            <div className="challenge-grid">
              {CHALLENGES.map(challenge => {
                const isSelected = selectedChallenges.includes(challenge.id);
                const isDisabled = !isSelected && selectedChallenges.length >= maxSelections;
                
                return (
                  <article
                    key={challenge.id}
                    className={`challenge-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                    onClick={() => !isDisabled && toggleChallenge(challenge.id)}
                    style={{ '--accent-color': challenge.color } as React.CSSProperties}
                  >
                    {isSelected && (
                      <span className="selected-badge">✓</span>
                    )}
                    
                    <div className="challenge-header">
                      <span className="programme-emoji">{challenge.programmeEmoji}</span>
                      <span className="programme-name">{challenge.programme}</span>
                    </div>

                    <h3>{challenge.title}</h3>
                    <p className="challenge-description">{challenge.description}</p>

                    <div className="challenge-meta">
                      <span className="duration">⏱️ {challenge.duration}</span>
                    </div>

                    <div className="challenge-skills">
                      {challenge.skills.map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <div className="start-section">
            <button
              className="btn-start-journey"
              disabled={!canStartJourney}
              onClick={startJourney}
            >
              {canStartJourney 
                ? '🚀 Start Your Journey (15 min)'
                : `Select ${maxSelections - selectedChallenges.length} more challenge${maxSelections - selectedChallenges.length !== 1 ? 's' : ''}`
              }
            </button>
            
            {selectedChallenges.length > 0 && (
              <div className="selected-summary">
                <strong>Selected:</strong>
                {selectedChallengeObjects.map(c => (
                  <span key={c.id} className="selected-item">
                    {c.programmeEmoji} {c.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Play Step */}
      {currentStep === 'play' && currentChallenge && (
        <div className="play-section">
          {/* Challenge Progress */}
          <div className="challenge-progress">
            <div className="progress-steps">
              {selectedChallengeObjects.map((c, i) => (
                <div 
                  key={c.id}
                  className={`step ${i === currentChallengeIndex ? 'current' : ''} ${i < currentChallengeIndex ? 'completed' : ''}`}
                >
                  <span className="step-emoji">{c.programmeEmoji}</span>
                  <span className="step-name">{c.programme}</span>
                </div>
              ))}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentChallengeIndex) / selectedChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Challenge */}
          <div 
            className="active-challenge"
            style={{ '--accent-color': currentChallenge.color } as React.CSSProperties}
          >
            <div className="challenge-intro">
              <span className="big-emoji">{currentChallenge.programmeEmoji}</span>
              <div>
                <span className="programme-label">{currentChallenge.programme}</span>
                <h2>{currentChallenge.title}</h2>
                <p>{currentChallenge.description}</p>
              </div>
            </div>

            {/* Challenge Workspace Placeholder */}
            <div className="challenge-workspace">
              <div className="workspace-placeholder">
                <p>🎯 Challenge workspace loads here</p>
                <p className="hint">Component: {currentChallenge.component}</p>
                
                {/* Temporary completion buttons for demo */}
                <div className="demo-actions">
                  <button
                    className="btn-complete"
                    onClick={() => completeChallenge({
                      challengeId: currentChallenge.id,
                      completed: true,
                      timeSpent: 300,
                      enjoymentRating: 4
                    })}
                  >
                    ✅ Complete Challenge
                  </button>
                  <button className="btn-skip" onClick={skipChallenge}>
                    Skip →
                  </button>
                </div>
              </div>
            </div>

            <div className="challenge-footer">
              <span className="time-hint">⏱️ Take about {currentChallenge.duration}</span>
              <span className="safe-hint">🛡️ This is practice - nothing publishes</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Step */}
      {currentStep === 'results' && (
        <div className="results-section">
          <div className="results-header">
            <span className="celebration">🎉</span>
            <h2>Journey Complete!</h2>
            <p>Here's what we discovered about your creative interests</p>
          </div>

          <div className="results-grid">
            {selectedChallengeObjects.map((challenge, index) => {
              const result = results[index];
              return (
                <div 
                  key={challenge.id}
                  className={`result-card ${result?.completed ? 'completed' : 'skipped'}`}
                  style={{ '--accent-color': challenge.color } as React.CSSProperties}
                >
                  <div className="result-header">
                    <span className="result-emoji">{challenge.programmeEmoji}</span>
                    <span className="result-status">
                      {result?.completed ? '✅ Completed' : '⏭️ Skipped'}
                    </span>
                  </div>
                  <h3>{challenge.programme}</h3>
                  <p>{challenge.title}</p>
                  
                  {result?.completed && (
                    <Link 
                      to={`/programmes/${challenge.programme.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="btn-explore"
                    >
                      Explore this programme →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="results-cta">
            <h3>What's Next?</h3>
            <p>
              Based on what resonated with you, explore the full programmes. 
              Each one has deeper challenges, mentorship, and paths to real opportunities.
            </p>
            
            <div className="cta-buttons">
              <Link to="/programmes" className="btn-programmes">
                📚 Browse All Programmes
              </Link>
              <button className="btn-restart" onClick={resetJourney}>
                🔄 Try Different Challenges
              </button>
            </div>
          </div>

          {/* Reality Check */}
          <div className="reality-check">
            <h4>💡 Real Talk</h4>
            <p>
              These 5-minute tasters give you a feel, but real skills take time. 
              Our programmes are designed for <strong>10-week journeys</strong>, not quick fixes. 
              If something clicked today, that's your signal to dig deeper.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativePathFinder;