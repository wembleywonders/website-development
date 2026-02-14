/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * TECHreneurs Sandbox - Business Planning & Launch Space
 * 
 * A sandbox where creators develop business skills and launch
 * their creative enterprises with community support.
 * 
 * Pathways:
 * - Launch your creative business
 * - Develop pricing and marketing strategies
 * - Access pardner circles for startup capital
 * - Connect with mentors and investors
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

// Business type interests
const BUSINESS_TYPES = [
  { id: 'product', label: 'Product-Based', icon: '📦', description: 'Physical or digital products' },
  { id: 'service', label: 'Service-Based', icon: '🤝', description: 'Skills and expertise for hire' },
  { id: 'content', label: 'Content Creation', icon: '📱', description: 'Media, courses, tutorials' },
  { id: 'events', label: 'Events & Experiences', icon: '🎉', description: 'Workshops, shows, gatherings' },
  { id: 'marketplace', label: 'Marketplace/Platform', icon: '🏪', description: 'Connect buyers and sellers' },
  { id: 'hybrid', label: 'Hybrid Model', icon: '🔄', description: 'Combine multiple approaches' },
];

// Business development stages
const DEVELOPMENT_STAGES = [
  { id: 'idea', label: 'Idea Stage', description: 'I have a concept but need to develop it' },
  { id: 'testing', label: 'Testing', description: 'I\'m experimenting with my offering' },
  { id: 'first-sales', label: 'First Sales', description: 'I\'ve made some sales but need to grow' },
  { id: 'scaling', label: 'Scaling Up', description: 'I\'m ready to reach more customers' },
];

// Support pathways
const SUPPORT_PATHWAYS = [
  { 
    id: 'business-planning', 
    label: 'Business Plan Development',
    description: 'Work with mentors to create a solid business plan',
    includes: ['Market research', 'Financial projections', 'Strategy'],
    duration: '4-6 weeks'
  },
  { 
    id: 'pardner-circle', 
    label: 'Pardner Circle Access',
    description: 'Join a community savings circle for startup capital',
    includes: ['Savings structure', 'Group support', 'Financial discipline'],
    potential: 'Up to £2,000 startup fund'
  },
  { 
    id: 'marketing-support', 
    label: 'Marketing & Branding',
    description: 'Learn to market your business effectively',
    includes: ['Social media', 'Brand identity', 'Customer acquisition'],
    duration: '3-4 weeks'
  },
  { 
    id: 'cyberstore-launch', 
    label: 'Cyberstore Launch Support',
    description: 'Get your products/services listed and selling',
    includes: ['Listing setup', 'Photography', 'Pricing strategy'],
    split: '55% to you, 25% community, 20% platform'
  },
];

const TECHreneursSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [businessIdea, setBusinessIdea] = useState('');
  const [showMayaCommunity, setShowMayaCommunity] = useState(false);
  
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);

  useEffect(() => {
    startSession();
    const timer = setTimeout(() => setShowMayaCommunity(true), 2000);
    return () => clearTimeout(timer);
  }, [startSession]);

  const handleTypeSelect = (typeId: string) => {
    trackAction('tool_use');
    setSelectedType(typeId);
  };

  const handleStageSelect = (stageId: string) => {
    trackAction('direction_action');
    setSelectedStage(stageId);
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
    trackProjectNamed('business-launch');
    setStep(4);
  };

  return (
    <div className="techreneurs-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>💼 TECHreneurs</h1>
        <p className="sandbox-subtitle">Your creative business. Built with community.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome message="Welcome to the business incubator. Every entrepreneur here started with just an idea—and community support." />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass message="No MBA required. No investors needed to start. The community is your launchpad." />
          </div>

          <h2>What type of business are you building?</h2>
          <p className="step-description">Select the model that fits your vision</p>

          <div className="types-grid">
            {BUSINESS_TYPES.map(type => (
              <button
                key={type.id}
                className={`type-card ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => handleTypeSelect(type.id)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-label">{type.label}</span>
                <span className="type-description">{type.description}</span>
              </button>
            ))}
          </div>

          {selectedType && (
            <button className="next-button" onClick={() => setStep(2)}>
              Define Your Stage →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          <h2>Where are you in your journey?</h2>
          <p className="step-description">Be honest—we'll meet you where you are</p>

          <div className="stages-grid">
            {DEVELOPMENT_STAGES.map(stage => (
              <button
                key={stage.id}
                className={`stage-card ${selectedStage === stage.id ? 'selected' : ''}`}
                onClick={() => handleStageSelect(stage.id)}
              >
                <h3>{stage.label}</h3>
                <p>{stage.description}</p>
              </button>
            ))}
          </div>

          {selectedStage && (
            <div className="idea-section">
              <h3>Tell us about your business idea</h3>
              <textarea
                value={businessIdea}
                onChange={(e) => setBusinessIdea(e.target.value)}
                placeholder="What product or service do you want to offer? Who would buy it?"
                className="idea-input"
              />
              <button className="next-button" onClick={() => setStep(3)}>
                Explore Support Options →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror message="42 businesses launched through TECHreneurs in the past year. 28 are still trading and growing." />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              story={{
                creatorFirstName: 'Keisha',
                area: 'Neasden',
                achievement: 'launched her hair braiding business, now employs two other stylists',
                timeAgo: '11 months ago',
                quote: "The pardner circle gave me my first £1,500. The mentorship taught me how to keep it."
              }}
            />
          </div>

          <h2>What support do you need?</h2>
          <p className="step-description">Select all that would help</p>

          <div className="pathways-grid">
            {SUPPORT_PATHWAYS.map(pathway => (
              <button
                key={pathway.id}
                className={`pathway-card ${selectedPathways.includes(pathway.id) ? 'selected' : ''}`}
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <h3>{pathway.label}</h3>
                <p className="pathway-description">{pathway.description}</p>
                <div className="pathway-includes">
                  {pathway.includes.map(item => (
                    <span key={item} className="include-tag">{item}</span>
                  ))}
                </div>
                {pathway.duration && <span className="pathway-meta">Duration: {pathway.duration}</span>}
                {pathway.potential && <span className="pathway-meta highlight">{pathway.potential}</span>}
                {pathway.split && <span className="pathway-meta">{pathway.split}</span>}
              </button>
            ))}
          </div>

          {selectedPathways.length === 1 && (
            <div className="maya-push-container">
              <MayaPush message="Good start. Most successful launches combine 2-3 support types." />
            </div>
          )}

          {selectedPathways.length >= 1 && (
            <button className="next-button" onClick={handleGeneratePlan}>
              Create My Launch Plan →
            </button>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition message="You just designed your business launch. Not a dream board—an actual plan with community backing." />
          </div>

          <h2>Your Business Launch Plan</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Business Type</h3>
              <div className="selected-items">
                {selectedType && (
                  <span className="selected-tag">
                    {BUSINESS_TYPES.find(t => t.id === selectedType)?.icon}{' '}
                    {BUSINESS_TYPES.find(t => t.id === selectedType)?.label}
                  </span>
                )}
              </div>
            </div>

            <div className="plan-section">
              <h3>Current Stage</h3>
              <div className="selected-items">
                {selectedStage && (
                  <span className="selected-tag">
                    {DEVELOPMENT_STAGES.find(s => s.id === selectedStage)?.label}
                  </span>
                )}
              </div>
            </div>

            {businessIdea && (
              <div className="plan-section">
                <h3>Your Business Concept</h3>
                <p className="idea-display">{businessIdea}</p>
              </div>
            )}

            <div className="plan-section">
              <h3>Your Support Package</h3>
              <div className="selected-items column">
                {selectedPathways.map(id => {
                  const pathway = SUPPORT_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      {pathway.potential && <span className="highlight">{pathway.potential}</span>}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder message="This isn't business school. This IS where community businesses launch and thrive." />
          </div>

          <div className="next-steps">
            <h3>Ready to Launch?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Book Business Mentor Session</button>
              <button className="action-button secondary">Join Pardner Circle</button>
              <button className="action-button secondary">Start Cyberstore Listing</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement message="You've designed your launch. The community is ready to support you. Now it's time to build." />
          </div>
        </section>
      )}
    </div>
  );
};

export default TECHreneursSandbox;
