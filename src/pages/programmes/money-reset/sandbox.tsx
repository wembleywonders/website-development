/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Money Reset Sandbox - Financial Literacy & Wealth Building Space
 * 
 * A sandbox where community members develop financial skills and
 * build sustainable wealth through community-first approaches.
 * 
 * Core principles:
 * - Pardner/Susu/Box Hand traditional savings
 * - Community wealth over individual extraction
 * - Financial independence without exploitation
 * - Intergenerational wealth building
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

// Financial goal areas
const FINANCIAL_GOALS = [
  { id: 'emergency-fund', label: 'Emergency Fund', icon: '🛟', description: 'Build your safety net' },
  { id: 'debt-freedom', label: 'Debt Freedom', icon: '⛓️‍💥', description: 'Break free from debt' },
  { id: 'startup-capital', label: 'Startup Capital', icon: '🚀', description: 'Fund your business' },
  { id: 'home-ownership', label: 'Home Ownership', icon: '🏠', description: 'Save for your home' },
  { id: 'education', label: 'Education & Skills', icon: '📚', description: 'Invest in yourself' },
  { id: 'generational', label: 'Generational Wealth', icon: '🌳', description: 'Build for your family' },
];

// Financial challenges (be honest)
const FINANCIAL_CHALLENGES = [
  { id: 'inconsistent-income', label: 'Inconsistent Income', description: 'Money comes in unpredictably' },
  { id: 'high-expenses', label: 'High Living Costs', description: 'Rent and bills take most of it' },
  { id: 'debt-burden', label: 'Existing Debt', description: 'Paying off past obligations' },
  { id: 'no-savings-habit', label: 'No Savings Habit', description: 'Never learned to save' },
  { id: 'supporting-others', label: 'Supporting Family', description: 'Helping others before yourself' },
  { id: 'credit-issues', label: 'Credit Problems', description: 'Low score or no credit history' },
];

// Community wealth tools
const WEALTH_PATHWAYS = [
  { 
    id: 'pardner-circle', 
    label: 'Pardner Circle',
    description: 'Join a traditional Caribbean savings circle—collective discipline, collective benefit',
    howItWorks: 'Weekly contribution, rotating payout. No interest. No banks.',
    potential: 'Access to £500-2,000 lump sums'
  },
  { 
    id: 'financial-coaching', 
    label: 'Financial Coaching',
    description: 'One-on-one sessions with community financial mentors',
    howItWorks: 'Practical budgeting, debt strategies, goal planning',
    potential: 'Personalized roadmap'
  },
  { 
    id: 'creator-earnings', 
    label: 'Creator Income Pathway',
    description: 'Build sustainable income through creative work',
    howItWorks: 'Skills development → Cyberstore sales → Regular income',
    potential: '55% of all sales to you'
  },
  { 
    id: 'community-investment', 
    label: 'Community Investment',
    description: 'Invest in community enterprises and earn returns',
    howItWorks: 'Small investments in community businesses',
    potential: 'Shared prosperity model'
  },
];

const MoneyResetSandbox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);
  const [firstStep, setFirstStep] = useState('');
  const [showMayaCommunity, setShowMayaCommunity] = useState(false);
  
  const { trackAction, trackProjectNamed } = useMayaTracking();
  const startSession = useMayaStore((s) => s.startSession);

  useEffect(() => {
    startSession();
    const timer = setTimeout(() => setShowMayaCommunity(true), 2000);
    return () => clearTimeout(timer);
  }, [startSession]);

  const handleGoalSelect = (goalId: string) => {
    trackAction('tool_use');
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleChallengeSelect = (challengeId: string) => {
    trackAction('tool_use');
    setSelectedChallenges(prev => 
      prev.includes(challengeId)
        ? prev.filter(c => c !== challengeId)
        : [...prev, challengeId]
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
    trackProjectNamed('money-reset-plan');
    setStep(4);
  };

  return (
    <div className="moneyreset-sandbox">
      <MayaCompanion />
      
      <header className="sandbox-header">
        <h1>💰 Money Reset</h1>
        <p className="sandbox-subtitle">Community wealth. Built together. Shared fairly.</p>
      </header>

      {step === 1 && (
        <section className="sandbox-step">
          <div className="maya-welcome-container">
            <MayaWelcome message="Welcome to Money Reset. Financial freedom isn't about getting rich alone—it's about building wealth together." />
          </div>
          
          <div className="maya-bypass-container">
            <MayaGatekeeperBypass message="No bank approval needed. No credit check to start. The community is your financial system." />
          </div>

          <h2>What are you working toward?</h2>
          <p className="step-description">Select your financial goals</p>

          <div className="goals-grid">
            {FINANCIAL_GOALS.map(goal => (
              <button
                key={goal.id}
                className={`goal-card ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                <span className="goal-icon">{goal.icon}</span>
                <span className="goal-label">{goal.label}</span>
                <span className="goal-description">{goal.description}</span>
              </button>
            ))}
          </div>

          {selectedGoals.length > 0 && (
            <button className="next-button" onClick={() => setStep(2)}>
              Be Honest About Challenges →
            </button>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="sandbox-step">
          <h2>What's making it hard?</h2>
          <p className="step-description">Be honest—this is between you and your plan</p>

          <div className="challenges-grid">
            {FINANCIAL_CHALLENGES.map(challenge => (
              <button
                key={challenge.id}
                className={`challenge-card ${selectedChallenges.includes(challenge.id) ? 'selected' : ''}`}
                onClick={() => handleChallengeSelect(challenge.id)}
              >
                <h3>{challenge.label}</h3>
                <p>{challenge.description}</p>
              </button>
            ))}
          </div>

          {selectedChallenges.length > 0 && (
            <button className="next-button" onClick={() => setStep(3)}>
              Find Your Pathways →
            </button>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="sandbox-step">
          {showMayaCommunity && (
            <div className="maya-community-container">
              <MayaCommunityMirror message="67 community members are in active pardner circles right now. £34,000 has circulated in the past year with zero interest paid to banks." />
            </div>
          )}

          <div className="maya-success-container">
            <MayaSuccessStory 
              story={{
                creatorFirstName: 'Pauline',
                area: 'Wembley',
                achievement: 'used pardner savings to clear debt, now runs a circle herself',
                timeAgo: '14 months ago',
                quote: "My grandmother did pardner in Jamaica. Now I understand why. It works when we work together."
              }}
            />
          </div>

          <h2>How will you build?</h2>
          <p className="step-description">Select your wealth-building pathways</p>

          <div className="pathways-grid">
            {WEALTH_PATHWAYS.map(pathway => (
              <button
                key={pathway.id}
                className={`pathway-card ${selectedPathways.includes(pathway.id) ? 'selected' : ''}`}
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <h3>{pathway.label}</h3>
                <p className="pathway-description">{pathway.description}</p>
                <p className="how-it-works">{pathway.howItWorks}</p>
                <span className="potential">{pathway.potential}</span>
              </button>
            ))}
          </div>

          {selectedPathways.length === 1 && (
            <div className="maya-push-container">
              <MayaPush message="One pathway chosen. Most successful savers combine pardner with income-building." />
            </div>
          )}

          {selectedPathways.length >= 1 && (
            <div className="step-section">
              <h3>What's your first money move?</h3>
              <textarea
                value={firstStep}
                onChange={(e) => setFirstStep(e.target.value)}
                placeholder="Example: 'Save £20 this week' or 'Join a pardner circle' or 'Talk to a financial coach'"
                className="step-input"
              />
              <button className="next-button" onClick={handleGeneratePlan}>
                Create My Money Reset Plan →
              </button>
            </div>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="sandbox-step">
          <div className="maya-ignition-container">
            <MayaIgnition message="You just designed your path to financial freedom. Not through banks or credit—through community and discipline." />
          </div>

          <h2>Your Money Reset Plan</h2>
          
          <div className="plan-summary">
            <div className="plan-section">
              <h3>Your Goals</h3>
              <div className="selected-items">
                {selectedGoals.map(id => {
                  const goal = FINANCIAL_GOALS.find(g => g.id === id);
                  return goal ? (
                    <span key={id} className="selected-tag">{goal.icon} {goal.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Challenges to Address</h3>
              <div className="selected-items">
                {selectedChallenges.map(id => {
                  const challenge = FINANCIAL_CHALLENGES.find(c => c.id === id);
                  return challenge ? (
                    <span key={id} className="selected-tag challenge">{challenge.label}</span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="plan-section">
              <h3>Your Wealth-Building Pathways</h3>
              <div className="selected-items column">
                {selectedPathways.map(id => {
                  const pathway = WEALTH_PATHWAYS.find(p => p.id === id);
                  return pathway ? (
                    <div key={id} className="pathway-summary">
                      <strong>{pathway.label}</strong>
                      <span className="potential">{pathway.potential}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {firstStep && (
              <div className="plan-section">
                <h3>Your First Move</h3>
                <p className="step-display">{firstStep}</p>
              </div>
            )}
          </div>

          <div className="maya-pathway-container">
            <MayaPathwayReminder message="This isn't financial advice from strangers. This IS how the community builds wealth together." />
          </div>

          <div className="next-steps">
            <h3>Ready to Reset?</h3>
            <div className="action-buttons">
              <button className="action-button primary">Join Pardner Circle</button>
              <button className="action-button secondary">Book Financial Coaching</button>
              <button className="action-button secondary">Start Creator Pathway</button>
            </div>
          </div>

          <div className="maya-final-container">
            <MayaEncouragement message="Your money journey starts now. Not alone—with community. That's the reset." />
          </div>
        </section>
      )}
    </div>
  );
};

export default MoneyResetSandbox;
