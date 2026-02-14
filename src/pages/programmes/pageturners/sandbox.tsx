/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * PageTurners Sandbox - Story Writing & Publishing Space
 * 
 * A creative sandbox where community members develop their writing,
 * from personal stories to published works with heritage integration.
 * 
 * Pathways to income:
 * - Self-published books and e-books
 * - Story submissions to Joystick e-zine
 * - Writing workshops and facilitation
 * - Copywriting and content creation services
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

// Writing genre interests
const WRITING_GENRES = [
  { id: 'fiction', label: 'Fiction & Stories', icon: '📚', description: 'Create imaginary worlds' },
  { id: 'memoir', label: 'Memoir & Life Stories', icon: '📖', description: 'Share your experiences' },
  { id: 'poetry', label: 'Poetry & Spoken Word', icon: '✨', description: 'Express through verse' },
  { id: 'heritage', label: 'Heritage & Oral History', icon: '��', description: 'Preserve community stories' },
  { id: 'journalism', label: 'Journalism & Features', icon: '📰', description: 'Report and investigate' },
  { id: 'children', label: "Children's Stories", icon: '🧸', description: 'Write for young readers' },
];

// Income pathways for writers
const WRITING_PATHWAYS = [
  { 
    id: 'self-publish', 
    label: 'Self-Publishing',
    description: 'Publish and sell your own books through the Cyberstore',
    skills: ['Writing', 'Editing', 'Cover design basics'],
    earningPotential: '55% of sales'
  },
  { 
    id: 'ezine-contributor', 
    label: 'Joystick E-Zine Contributor',
    description: 'Regular contributions to our community magazine',
    skills: ['Article writing', 'Meeting deadlines', 'Research'],
    earningPotential: '£25-75/article'
  },
  { 
    id: 'workshop-leader', 
    label: 'Writing Workshop Leader',
    description: 'Lead writing sessions for other community members',
    skills: ['Teaching', 'Feedback giving', 'Session planning'],
    earningPotential: '£30-60/session'
  },
  { 
    id: 'heritage-archivist', 
    label: 'Heritage Story Collector',
    description: 'Record and write up community oral histories',
    skills: ['Interview skills', 'Transcription', 'Narrative writing'],
    earningPotential: '£20-40/hour'
  },
];

const PageturnersSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [storyIdea, setStoryIdea] = useState('');
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

  const handlePathwaySelect = (pathwayId: string) => {
    trackAction('direction_action');
    setSelectedPathways(prev => 
      prev.includes(pathwayId)
        ? prev.filter(p => p !== pathwayId)
        : [...prev, pathwayId]
    );
  };

  const handleGeneratePlan = () => {
    trackProjectNamed('writing-project');
    setStep(3);
  };

  return (
    <div className="pageturners-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>📝 PageTurners</h1>
        <p className="sandbox-subtitle">Your stories matter. Let's get them written.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome message="Welcome to the writing space. Every published author started with a blank page—just like this one." />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass message="No degree required. No agent needed. You write it, we help you publish it." />
          </div>

          <h2>What kind of writing calls to you?</h2>
          <p className="step-description">Select the genres that feel right</p>

          <div className="genres-grid">
            {WRITING_GENRES.map(genre => (
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
              Explore Publishing Pathways →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror message="18 writers from Brent have published through PageTurners this year. Three are now earning regularly from their work." />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              story={{
                creatorFirstName: 'Gloria',
                area: 'Harlesden',
                achievement: 'collected her grandmother\'s recipes into a book, now leads heritage writing workshops',
                timeAgo: '6 months ago',
                quote: "I didn't think my family's stories were important enough. Turns out they're exactly what people want to read."
              }}
            />
          </div>

          <h2>How would you like to share your writing?</h2>
          <p className="step-description">Select one or more pathways to publication</p>

          <div className="pathways-grid">
            {WRITING_PATHWAYS.map(pathway => (
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
              <MayaPush message="One pathway chosen. Many writers combine routes—maybe add another?" />
            </div>
          )}

          {selectedPathways.length >= 1 && (
            <div className="story-section">
              <h3>What's the first story you want to tell?</h3>
              <textarea
                value={storyIdea}
                onChange={(e) => setStoryIdea(e.target.value)}
                placeholder="A sentence or two about your first writing project..."
                className="story-input"
              />
              <button className="next-button" onClick={handleGeneratePlan}>
                Create My Writing Plan →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition message="You just mapped your path from writer to published author. That's not a fantasy—that's a plan." />
          </div>

          <h2>Your Writing Journey</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Your Genres</h3>
              <div className="selected-items">
                {selectedGenres.map(id => {
                  const genre = WRITING_GENRES.find(g => g.id === id);
                  return genre ? (
                    <span key={id} className="selected-tag">{genre.icon} {genre.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Publishing Pathways</h3>
              <div className="selected-items">
                {selectedPathways.map(id => {
                  const pathway = WRITING_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      <span className="earning-potential">{pathway.earningPotential}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {storyIdea && (
              <div className="plan-section">
                <h3>Your First Project</h3>
                <p className="story-display">{storyIdea}</p>
              </div>
            )}
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder message="This isn't creative writing class. This IS where writers become authors." />
          </div>

          <div className="next-steps">
            <h3>Ready to Write?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Open Story Starter</button>
              <button className="action-button secondary">Join Writing Circle</button>
              <button className="action-button secondary">Find a Writing Mentor</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement message="You've claimed your space as a writer. Not because someone said you could—because you decided to." />
          </div>
        </section>
      )}
    </div>
  );
};

export default PageturnersSandbox;
