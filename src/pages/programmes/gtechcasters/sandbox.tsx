/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * G-Tech Casters Sandbox - Podcast Creation Space
 * 
 * A creative sandbox where community members learn to create podcasts,
 * from concept to production to distribution.
 * 
 * Pathways to income:
 * - Podcast production services for local businesses
 * - Audio editing and mixing services
 * - Community podcast network contributions
 * - Interview and storytelling workshops
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

// Podcast creation interests
const PODCAST_INTERESTS = [
  { id: 'storytelling', label: 'Storytelling & Narrative', icon: '📖', description: 'Craft compelling audio stories' },
  { id: 'interviews', label: 'Interviews & Conversations', icon: '🎤', description: 'Host engaging discussions' },
  { id: 'music-culture', label: 'Music & Culture', icon: '🎵', description: 'Explore sounds and heritage' },
  { id: 'community-news', label: 'Community News', icon: '📰', description: 'Report on local happenings' },
  { id: 'education', label: 'Educational Content', icon: '🎓', description: 'Teach and inform' },
  { id: 'comedy', label: 'Comedy & Entertainment', icon: '😄', description: 'Make people laugh' },
];

// Income pathways for podcast creators
const PODCAST_PATHWAYS = [
  { 
    id: 'production-services', 
    label: 'Podcast Production Services',
    description: 'Edit, mix, and produce podcasts for clients',
    skills: ['Audio editing', 'Sound design', 'Mixing'],
    earningPotential: '£30-80/episode'
  },
  { 
    id: 'community-network', 
    label: 'Community Podcast Network',
    description: 'Create shows for the Wembley Wonders network',
    skills: ['Content creation', 'Consistency', 'Audience building'],
    earningPotential: '55% of ad revenue'
  },
  { 
    id: 'workshop-facilitation', 
    label: 'Workshop Facilitation',
    description: 'Teach others how to podcast',
    skills: ['Teaching', 'Demonstration', 'Curriculum design'],
    earningPotential: '£25-50/session'
  },
  { 
    id: 'audio-branding', 
    label: 'Audio Branding',
    description: 'Create intros, outros, and jingles for businesses',
    skills: ['Music production', 'Voice direction', 'Brand understanding'],
    earningPotential: '£100-500/project'
  },
];

const GTechCastersSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [podcastConcept, setPodcastConcept] = useState('');
  const [showMayaCommunity, setShowMayaCommunity] = useState(false);
  
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);

  useEffect(() => {
    startSession();
    // Show community stats after 2 seconds
    const timer = setTimeout(() => setShowMayaCommunity(true), 2000);
    return () => clearTimeout(timer);
  }, [startSession]);

  const handleInterestSelect = (interestId: string) => {
    trackAction('tool_use');
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
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
    setStep(3);
  };

  return (
    <div className="gtechcasters-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>🎙️ G-Tech Casters</h1>
        <p className="sandbox-subtitle">Your voice. Your stories. Your platform.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass custom="No radio experience needed. No broadcast license. You speak, the world can listen." />
          </div>

          <h2>What stories do you want to tell?</h2>
          <p className="step-description">Pick the formats that excite you most</p>

          <div className="interests-grid">
            {PODCAST_INTERESTS.map(interest => (
              <button
                key={interest.id}
                className={`interest-card ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
                onClick={() => handleInterestSelect(interest.id)}
              >
                <span className="interest-icon">{interest.icon}</span>
                <span className="interest-label">{interest.label}</span>
                <span className="interest-description">{interest.description}</span>
              </button>
            ))}
          </div>

          {selectedInterests.length > 0 && (
            <button className="next-button" onClick={() => setStep(2)}>
              Explore Pathways →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror custom="23 podcast creators from Brent are already earning through their shows. You're seeing the same pathways they used." />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              name="Devon"
              area="Wembley"
              achievement="started a community news podcast, now produces for 3 local businesses"
              timeAgo="8 months ago"
              quote="I just talked about what I knew. Turns out, that's valuable."
            />
          </div>

          <h2>How would you like to earn?</h2>
          <p className="step-description">Select one or more income pathways</p>

          <div className="pathways-grid">
            {PODCAST_PATHWAYS.map(pathway => (
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
              <MayaPush custom="One pathway selected. Pick another to see how they combine—many creators stack multiple income streams." />
            </div>
          )}

          {selectedPathways.length >= 2 && (
            <div className="concept-section">
              <h3>What's your podcast concept?</h3>
              <textarea
                value={podcastConcept}
                onChange={(e) => setPodcastConcept(e.target.value)}
                placeholder="Describe your podcast idea in a few sentences..."
                className="concept-input"
              />
              <button className="next-button" onClick={handleGeneratePlan}>
                Generate My Plan →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition custom="You just designed your podcast career. Not a dream—a plan with real pathways to income." />
          </div>

          <h2>Your Podcast Journey</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Your Focus Areas</h3>
              <div className="selected-items">
                {selectedInterests.map(id => {
                  const interest = PODCAST_INTERESTS.find(i => i.id === id);
                  return interest ? (
                    <span key={id} className="selected-tag">{interest.icon} {interest.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Income Pathways</h3>
              <div className="selected-items">
                {selectedPathways.map(id => {
                  const pathway = PODCAST_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      <span className="earning-potential">{pathway.earningPotential}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {podcastConcept && (
              <div className="plan-section">
                <h3>Your Concept</h3>
                <p className="concept-display">{podcastConcept}</p>
              </div>
            )}
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder />
          </div>

          <div className="next-steps">
            <h3>Ready to Start?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Book Studio Time</button>
              <button className="action-button secondary">Join Podcast Workshop</button>
              <button className="action-button secondary">Connect with Mentor</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement custom="You designed this. Not because anyone approved you—because you decided what to create. That's how it works here." />
          </div>
        </section>
      )}
    </div>
  );
};

export default GTechCastersSandbox;
