/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Trubble n Bass Sandbox - Music Production Space
 * 
 * A creative sandbox where community members learn music production,
 * from beats to tracks to releases.
 * 
 * Pathways to income:
 * - Beat sales and licensing
 * - Production services for artists
 * - Mixing and mastering services
 * - Music for media (games, videos, ads)
 */

import React, { useState, useEffect } from 'react';
import {
  MayaCompanion,
  MayaWelcome,
  MayaEncouragement,
  MayaCommunityMirror,
  MayaGatekeeperBypass,
  MayaIgnition,
  MayaPush,
  MayaPathwayReminder,
  MayaSuccessStory,
  useMayaStore,
  useMayaTracking,
} from '../../../maya';
import './sandbox.css';

// Music genre interests
const MUSIC_GENRES = [
  { id: 'uk-drill', label: 'UK Drill', icon: '🔥', description: 'Dark beats, sliding bass' },
  { id: 'afrobeats', label: 'Afrobeats', icon: '🌍', description: 'Rhythms from the continent' },
  { id: 'grime', label: 'Grime', icon: '⚡', description: 'Raw UK energy' },
  { id: 'dancehall', label: 'Dancehall/Reggae', icon: '🇯🇲', description: 'Caribbean vibes' },
  { id: 'rnb', label: 'R&B/Soul', icon: '💜', description: 'Smooth and soulful' },
  { id: 'house', label: 'House/Garage', icon: '🎧', description: 'Four to the floor' },
];

// Production skills to develop
const PRODUCTION_SKILLS = [
  { id: 'beatmaking', label: 'Beatmaking', description: 'Creating the foundation' },
  { id: 'sampling', label: 'Sampling & Chopping', description: 'Finding and flipping sounds' },
  { id: 'mixing', label: 'Mixing', description: 'Balancing the elements' },
  { id: 'mastering', label: 'Mastering', description: 'Final polish for release' },
  { id: 'sound-design', label: 'Sound Design', description: 'Creating unique sounds' },
  { id: 'arrangement', label: 'Arrangement', description: 'Structuring the track' },
];

// Income pathways
const MUSIC_PATHWAYS = [
  { 
    id: 'beat-sales', 
    label: 'Beat Sales & Licensing',
    description: 'Sell beats to artists through the Cyberstore',
    skills: ['Beatmaking', 'Marketing', 'Licensing knowledge'],
    earningPotential: '£25-500/beat'
  },
  { 
    id: 'production-services', 
    label: 'Production Services',
    description: 'Produce tracks for other artists',
    skills: ['Full production', 'Client communication', 'Arrangement'],
    earningPotential: '£100-1000/track'
  },
  { 
    id: 'mixing-mastering', 
    label: 'Mixing & Mastering',
    description: 'Polish tracks for release quality',
    skills: ['Technical mixing', 'Mastering', 'Critical listening'],
    earningPotential: '£30-150/track'
  },
  { 
    id: 'sync-licensing', 
    label: 'Sync & Media',
    description: 'Create music for games, videos, and ads',
    skills: ['Versatility', 'Brief interpretation', 'Quick turnaround'],
    earningPotential: '£50-2000/placement'
  },
];

const TrubbleNBassSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [projectIdea, setProjectIdea] = useState('');
  const [showMayaCommunity, setShowMayaCommunity] = useState(false);
  
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);

  useEffect(() => {
    startSession();
    const timer = setTimeout(() => setShowMayaCommunity(true), 2000);
    return () => clearTimeout(timer);
  }, [startSession]);

  const handleGenreSelect = (genreId: string) => {
    trackAction('tool_use');
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(g => g !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSkillSelect = (skillId: string) => {
    trackAction('tool_use');
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(s => s !== skillId)
        : [...prev, skillId]
    );
  };

  const handlePathwaySelect = (pathwayId: string) => {
    trackAction('direction_action');
    setSelectedPathways(prev => 
      prev.includes(pathwayId)
        ? prev.filter(p => p !== pathwayId)
        : [...prev, pathwayId]
    );
  };

  const handleGeneratePlan = () => {
    trackProjectNamed();
    setStep(4);
  };

  return (
    <div className="trubblenbass-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>🎵 Trubble n Bass</h1>
        <p className="sandbox-subtitle">Your sound. Your vision. Your studio.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome sandboxId="trubble-n-bass" />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass sandboxId="trubble-n-bass" />
          </div>

          <h2>What sounds move you?</h2>
          <p className="step-description">Select the genres you want to produce</p>

          <div className="genres-grid">
            {MUSIC_GENRES.map(genre => (
              <button
                key={genre.id}
                className={`genre-card ${selectedGenres.includes(genre.id) ? 'selected' : ''}`}
                onClick={() => handleGenreSelect(genre.id)}
              >
                <span className="genre-icon">{genre.icon}</span>
                <span className="genre-label">{genre.label}</span>
                <span className="genre-description">{genre.description}</span>
              </button>
            ))}
          </div>

          {selectedGenres.length > 0 && (
            <button className="next-button" onClick={() => setStep(2)}>
              Choose Your Skills →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          <h2>What skills do you want to develop?</h2>
          <p className="step-description">Pick the areas you want to focus on</p>

          <div className="skills-grid">
            {PRODUCTION_SKILLS.map(skill => (
              <button
                key={skill.id}
                className={`skill-card ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                onClick={() => handleSkillSelect(skill.id)}
              >
                <h3>{skill.label}</h3>
                <p>{skill.description}</p>
              </button>
            ))}
          </div>

          {selectedSkills.length > 0 && (
            <button className="next-button" onClick={() => setStep(3)}>
              Explore Income Pathways →
            </button>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror sandboxId="trubble-n-bass" />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              story={{
                creatorFirstName: 'Jayden',
                area: 'Alperton',
                achievement: 'started selling beats, now produces for local artists full-time',
                timeAgo: '7 months ago',
                quote: "I was making beats in my bedroom. Now artists are paying me for my sound."
              }}
            />
          </div>

          <h2>How would you like to earn?</h2>
          <p className="step-description">Select your income pathways</p>

          <div className="pathways-grid">
            {MUSIC_PATHWAYS.map(pathway => (
              <button
                key={pathway.id}
                className={`pathway-card ${selectedPathways.includes(pathway.id) ? 'selected' : ''}`}
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <h3>{pathway.label}</h3>
                <p className="pathway-description">{pathway.description}</p>
                <div className="pathway-skills">
                  {pathway.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <span className="earning-potential">{pathway.earningPotential}</span>
              </button>
            ))}
          </div>

          {selectedPathways.length === 1 && (
            <div className="maya-push-container">
              <MayaPush sandboxId="trubble-n-bass" />
            </div>
          )}

          {selectedPathways.length >= 1 && (
            <div className="project-section">
              <h3>What's your first production goal?</h3>
              <textarea
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                placeholder="A beat pack? A track for an artist? A demo reel?"
                className="project-input"
              />
              <button className="next-button" onClick={handleGeneratePlan}>
                Create My Producer Plan →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition sandboxId="trubble-n-bass" />
          </div>

          <h2>Your Production Journey</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Your Genres</h3>
              <div className="selected-items">
                {selectedGenres.map(id => {
                  const genre = MUSIC_GENRES.find(g => g.id === id);
                  return genre ? (
                    <span key={id} className="selected-tag">{genre.icon} {genre.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Focus Skills</h3>
              <div className="selected-items">
                {selectedSkills.map(id => {
                  const skill = PRODUCTION_SKILLS.find(s => s.id === id);
                  return skill ? (
                    <span key={id} className="selected-tag">{skill.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Income Pathways</h3>
              <div className="selected-items">
                {selectedPathways.map(id => {
                  const pathway = MUSIC_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      <span className="earning-potential">{pathway.earningPotential}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {projectIdea && (
              <div className="plan-section">
                <h3>Your First Project</h3>
                <p className="project-display">{projectIdea}</p>
              </div>
            )}
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder sandboxId="trubble-n-bass" />
          </div>

          <div className="next-steps">
            <h3>Ready to Produce?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Book Studio Session</button>
              <button className="action-button secondary">Join Beat Battle</button>
              <button className="action-button secondary">Find Producer Mentor</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement />
          </div>
        </section>
      )}
    </div>
  );
};

export default TrubbleNBassSandbox;
