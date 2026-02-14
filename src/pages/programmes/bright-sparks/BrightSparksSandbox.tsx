// src/pages/programmes/bright-sparks/BrightSparksSandbox.tsx
// Discovery Journey - Try mini-challenges from different programmes

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Clock, CheckCircle, ArrowRight, 
  Play, Star, Trophy, ChevronRight
} from 'lucide-react';
import './BrightSparksSandbox.css';

// ============================================
// CHALLENGE DATA
// ============================================

interface Challenge {
  id: string;
  programme: string;
  emoji: string;
  color: string;
  title: string;
  description: string;
  duration: string;
  task: string;
  sandboxPath: string;
  skills: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'tnb',
    programme: 'Trubble n Bass',
    emoji: '🎵',
    color: '#8338ec',
    title: 'Build a 4-Bar Loop',
    description: 'Create your first beat using our drum machine. No experience needed.',
    duration: '5 min',
    task: 'Arrange kicks, snares, and hi-hats into a groove that feels right to you.',
    sandboxPath: '/programmes/trubble-n-bass/sandbox',
    skills: ['Rhythm', 'Pattern recognition', 'Music production basics']
  },
  {
    id: 'stm',
    programme: 'STEMgeneers',
    emoji: '🔧',
    color: '#2a9d8f',
    title: 'Wire a Simple Circuit',
    description: 'Connect a virtual LED circuit and make it light up.',
    duration: '5 min',
    task: 'Drag components to complete the circuit. Watch the LED glow when you get it right.',
    sandboxPath: '/programmes/stemgeneers/sandbox',
    skills: ['Logic', 'Problem solving', 'Electronics basics']
  },
  {
    id: 'pt',
    programme: 'PageTurners',
    emoji: '📖',
    color: '#f4a261',
    title: 'Write a 6-Word Story',
    description: 'Tell a complete story in exactly six words.',
    duration: '5 min',
    task: 'Hemingway wrote: "For sale: baby shoes, never worn." Now you try.',
    sandboxPath: '/programmes/pageturners/sandbox',
    skills: ['Creativity', 'Concise writing', 'Storytelling']
  },
  {
    id: 'ss',
    programme: 'Silk Stilettos',
    emoji: '👗',
    color: '#ff006e',
    title: 'Style a Look',
    description: 'Put together an outfit for a specific occasion.',
    duration: '5 min',
    task: 'Choose pieces that work together. Explain your creative choices.',
    sandboxPath: '/programmes/silk-stilettos/sandbox',
    skills: ['Visual thinking', 'Color coordination', 'Self-expression']
  },
  {
    id: 'gtc',
    programme: 'G-Tech Casters',
    emoji: '🎙️',
    color: '#e63946',
    title: 'Plan a 2-Minute Segment',
    description: 'Outline a podcast intro that hooks listeners.',
    duration: '5 min',
    task: 'Write your hook, main point, and call-to-action. What makes people want to keep listening?',
    sandboxPath: '/programmes/gtechcasters/sandbox',
    skills: ['Communication', 'Structure', 'Audience awareness']
  },
  {
    id: 'aak',
    programme: "Auntie Anansi's Kitchen",
    emoji: '🍲',
    color: '#d62828',
    title: 'Document a Family Recipe',
    description: 'Record a recipe from memory with its story.',
    duration: '5 min',
    task: "Write down a dish you know by heart. Who taught you? What memories does it hold?",
    sandboxPath: '/programmes/auntie-anansis-kitchen/sandbox',
    skills: ['Documentation', 'Cultural preservation', 'Storytelling']
  },
  {
    id: 'kc',
    programme: "Kaywana's Court",
    emoji: '🎭',
    color: '#9d4edd',
    title: 'Create a Character',
    description: 'Build a character with a secret and a goal.',
    duration: '5 min',
    task: 'Every great character wants something and hides something. What are yours?',
    sandboxPath: '/programmes/kaywanas-court/sandbox',
    skills: ['Empathy', 'Psychology', 'Drama']
  },
  {
    id: 'sc',
    programme: 'Scrap Cat',
    emoji: '♻️',
    color: '#06d6a0',
    title: 'Diagnose a Device',
    description: 'Figure out why a phone won\'t charge.',
    duration: '5 min',
    task: 'Follow the diagnostic tree. Ask the right questions to find the problem.',
    sandboxPath: '/programmes/scrap-cat/sandbox',
    skills: ['Logical thinking', 'Troubleshooting', 'Tech basics']
  }
];

// ============================================
// COMPONENT
// ============================================

const BrightSparksSandbox: React.FC = () => {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [journeyStarted, setJourneyStarted] = useState(false);

  const toggleChallenge = (id: string) => {
    if (selectedChallenges.includes(id)) {
      setSelectedChallenges(prev => prev.filter(c => c !== id));
    } else if (selectedChallenges.length < 3) {
      setSelectedChallenges(prev => [...prev, id]);
    }
  };

  const startJourney = () => {
    if (selectedChallenges.length >= 1) {
      setJourneyStarted(true);
      const firstChallenge = CHALLENGES.find(c => c.id === selectedChallenges[0]);
      setActiveChallenge(firstChallenge || null);
    }
  };

  const markComplete = (id: string) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges(prev => [...prev, id]);
    }
    // Move to next challenge
    const currentIndex = selectedChallenges.indexOf(id);
    if (currentIndex < selectedChallenges.length - 1) {
      const nextChallenge = CHALLENGES.find(c => c.id === selectedChallenges[currentIndex + 1]);
      setActiveChallenge(nextChallenge || null);
    } else {
      setActiveChallenge(null); // All done
    }
  };

  // Selection Phase
  if (!journeyStarted) {
    return (
      <div className="bright-sparks-sandbox">
        <header className="bs-header">
          <div className="bs-header__badge">
            <Sparkles size={16} />
            <span>Discovery Journey</span>
          </div>
          <h1>Find Your Creative Path</h1>
          <p>Pick 3 challenges from different programmes. Complete them in 15 minutes. Discover what clicks.</p>
        </header>

        <section className="bs-selection">
          <div className="bs-selection__header">
            <h2>Choose Your Challenges</h2>
            <div className="bs-selection__counter">
              <span className={selectedChallenges.length >= 1 ? 'filled' : ''}>●</span>
              <span className={selectedChallenges.length >= 2 ? 'filled' : ''}>●</span>
              <span className={selectedChallenges.length >= 3 ? 'filled' : ''}>●</span>
              <span className="bs-selection__count">{selectedChallenges.length}/3 selected</span>
            </div>
          </div>

          <div className="bs-challenge-grid">
            {CHALLENGES.map(challenge => {
              const isSelected = selectedChallenges.includes(challenge.id);
              const isDisabled = !isSelected && selectedChallenges.length >= 3;
              
              return (
                <button
                  key={challenge.id}
                  className={`bs-challenge-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  style={{ '--challenge-color': challenge.color } as React.CSSProperties}
                  onClick={() => !isDisabled && toggleChallenge(challenge.id)}
                  disabled={isDisabled}
                >
                  <div className="bs-challenge-card__check">
                    {isSelected && <CheckCircle size={20} />}
                  </div>
                  
                  <div className="bs-challenge-card__emoji">{challenge.emoji}</div>
                  <div className="bs-challenge-card__programme">{challenge.programme}</div>
                  <h3 className="bs-challenge-card__title">{challenge.title}</h3>
                  <p className="bs-challenge-card__description">{challenge.description}</p>
                  
                  <div className="bs-challenge-card__meta">
                    <span className="bs-challenge-card__duration">
                      <Clock size={14} />
                      {challenge.duration}
                    </span>
                  </div>

                  <div className="bs-challenge-card__skills">
                    {challenge.skills.map((skill, i) => (
                      <span key={i} className="bs-skill-tag">{skill}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bs-start-section">
            <button 
              className="bs-start-btn"
              onClick={startJourney}
              disabled={selectedChallenges.length < 1}
            >
              <Play size={20} />
              Start Journey ({selectedChallenges.length} challenge{selectedChallenges.length !== 1 ? 's' : ''})
            </button>
            <p className="bs-start-note">
              {selectedChallenges.length < 1 
                ? 'Select at least 1 challenge to begin' 
                : `Estimated time: ${selectedChallenges.length * 5} minutes`}
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Journey Phase - All Complete
  if (completedChallenges.length === selectedChallenges.length && !activeChallenge) {
    return (
      <div className="bright-sparks-sandbox">
        <div className="bs-complete">
          <div className="bs-complete__icon">
            <Trophy size={64} />
          </div>
          <h1>Journey Complete! 🎉</h1>
          <p>You completed {completedChallenges.length} challenges and discovered new interests.</p>
          
          <div className="bs-complete__results">
            <h2>Your Results</h2>
            {completedChallenges.map(id => {
              const challenge = CHALLENGES.find(c => c.id === id);
              if (!challenge) return null;
              return (
                <div key={id} className="bs-result-card" style={{ '--challenge-color': challenge.color } as React.CSSProperties}>
                  <span className="bs-result-card__emoji">{challenge.emoji}</span>
                  <div className="bs-result-card__info">
                    <h3>{challenge.programme}</h3>
                    <p>Completed: {challenge.title}</p>
                  </div>
                  <Link to={challenge.sandboxPath} className="bs-result-card__link">
                    Try Full Sandbox <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bs-complete__actions">
            <Link to="/sandbox" className="bs-btn bs-btn--primary">
              Explore All Sandboxes
            </Link>
            <Link to="/enroll" className="bs-btn bs-btn--secondary">
              Join Wembley Wonders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Journey Phase - Active Challenge
  return (
    <div className="bright-sparks-sandbox">
      <header className="bs-journey-header">
        <div className="bs-progress">
          {selectedChallenges.map((id, index) => {
            const isComplete = completedChallenges.includes(id);
            const isActive = activeChallenge?.id === id;
            return (
              <div 
                key={id} 
                className={`bs-progress__step ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''}`}
              >
                {isComplete ? <CheckCircle size={16} /> : index + 1}
              </div>
            );
          })}
        </div>
        <span className="bs-progress__text">
          Challenge {completedChallenges.length + 1} of {selectedChallenges.length}
        </span>
      </header>

      {activeChallenge && (
        <div className="bs-active-challenge" style={{ '--challenge-color': activeChallenge.color } as React.CSSProperties}>
          <div className="bs-active-challenge__header">
            <span className="bs-active-challenge__emoji">{activeChallenge.emoji}</span>
            <div>
              <span className="bs-active-challenge__programme">{activeChallenge.programme}</span>
              <h1 className="bs-active-challenge__title">{activeChallenge.title}</h1>
            </div>
          </div>

          <div className="bs-active-challenge__task">
            <h2>Your Task</h2>
            <p>{activeChallenge.task}</p>
          </div>

          <div className="bs-active-challenge__workspace">
            <div className="bs-workspace-placeholder">
              <p>Mini-challenge workspace would load here</p>
              <Link to={activeChallenge.sandboxPath} className="bs-workspace-link">
                Open Full {activeChallenge.programme} Sandbox <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bs-active-challenge__actions">
            <button 
              className="bs-btn bs-btn--complete"
              onClick={() => markComplete(activeChallenge.id)}
            >
              <CheckCircle size={20} />
              Mark Complete & Continue
            </button>
            <Link to={activeChallenge.sandboxPath} className="bs-btn bs-btn--secondary">
              Try Full Sandbox Instead
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrightSparksSandbox;
