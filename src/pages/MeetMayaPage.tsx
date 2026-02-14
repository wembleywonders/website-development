/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MeetMayaPage - Introduction to Maya and the Children of Anansi
 * 
 * UPDATED: Reflects the unified ROV framework with all 12 children
 * 
 * Key narratives:
 * - Maya as the Mother at the kitchen table
 * - Children of Anansi as specialized guides
 * - Five Stages of pedagogical development
 * - Community-centered approach
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useMayaPreferences,
  useMayaROV
} from '../maya/stores/mayaStore';
import type { ActiveChild } from '../maya/types/mayaTypes';
import './MeetMayaPage.css';

// ============================================
// CHILDREN OF ANANSI DATA
// ============================================

interface ChildProfile {
  id: ActiveChild;
  name: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  bestFor: string[];
  exampleInteraction: string;
  domains: string[];
  color: string;
}

const MAYA_PROFILE: ChildProfile = {
  id: 'maya',
  name: 'Maya',
  emoji: '👩🏿‍🦱',
  title: 'The Mother',
  tagline: 'Always at the kitchen table. Never letting you get lost.',
  description: `Maya is the heart of our community - the mother figure who sits at the kitchen table, 
    ready to listen, guide, and connect you with whichever of her children can best help. 
    She doesn't have all the answers, but she always knows who does.`,
  bestFor: ['First-time visitors', 'Emotional support', 'Finding direction', 'Community orientation'],
  exampleInteraction: `"Tell me what's on your mind. I'll help you figure out who in the family can help most."`,
  domains: ['general', 'emotional', 'orientation', 'community'],
  color: '#8B4513'
};

const CHILDREN_PROFILES: ChildProfile[] = [
  {
    id: 'kweku',
    name: 'Kweku',
    emoji: '🎯',
    title: 'The Questioner',
    tagline: 'Asks the questions others avoid.',
    description: `Kweku challenges your assumptions about business, value, and audience. 
      He won't let you hide behind vague ideas - he'll push until your thinking is sharp.`,
    bestFor: ['Business validation', 'Strategy sessions', 'Entrepreneurial thinking', 'Finding your market'],
    exampleInteraction: `"Who exactly is paying for this? And why would they choose you over the alternative?"`,
    domains: ['business', 'strategy', 'validation', 'revenue'],
    color: '#D32F2F'
  },
  {
    id: 'ntikuma',
    name: 'Ntikuma',
    emoji: '📊',
    title: 'The Watcher',
    tagline: 'Sees patterns in your numbers.',
    description: `Ntikuma observes what others miss. He tracks your finances, spots trends, 
      and helps you understand the story your numbers are telling. Patient, analytical, precise.`,
    bestFor: ['Tax planning', 'Budget management', 'Financial patterns', 'Creator Protection Package'],
    exampleInteraction: `"The numbers don't lie. They just wait for you to look. Let me show you what I see."`,
    domains: ['finance', 'budget', 'numbers', 'patterns', 'tax'],
    color: '#1976D2'
  },
  {
    id: 'anansewa',
    name: 'Anansewa',
    emoji: '🎭',
    title: 'The Performer',
    tagline: 'Demands your authentic presence.',
    description: `Anansewa knows when you're performing and when you're hiding. She'll help you 
      find your true presence - the version of yourself that connects with audiences.`,
    bestFor: ['Public speaking', 'Presentation skills', 'Performance coaching', 'Finding your presence'],
    exampleInteraction: `"Show me who you really are, not who you think I want to see."`,
    domains: ['performance', 'presentation', 'public speaking', 'drama'],
    color: '#7B1FA2'
  },
  {
    id: 'kofi',
    name: 'Kofi',
    emoji: '🔧',
    title: 'The Builder',
    tagline: 'Turns ideas into things that work.',
    description: `Kofi is practical above all. He doesn't want to hear your plans - he wants to see 
      what you've made. He'll help you build, fix, and iterate until it actually works.`,
    bestFor: ['Prototyping', 'Technical skills', 'Making things work', 'STEMgineer projects'],
    exampleInteraction: `"Stop explaining. Show me what you've built. Then we'll fix what's broken."`,
    domains: ['technical', 'building', 'prototype', 'engineering', 'stemgineer'],
    color: '#388E3C'
  },
  {
    id: 'afua',
    name: 'Afua',
    emoji: '🎙️',
    title: 'The Storyteller',
    tagline: 'Helps you find your voice.',
    description: `Afua understands narrative - the spine of every story, the rhythm of every voice. 
      She'll help you find what you actually want to say, and how to say it authentically.`,
    bestFor: ['Podcasting', 'Voice work', 'Narrative structure', 'Finding your story'],
    exampleInteraction: `"Every story has a spine. What's the one thing you're really trying to say?"`,
    domains: ['voice', 'story', 'podcast', 'narrative', 'radio'],
    color: '#F57C00'
  },
  {
    id: 'yaw',
    name: 'Yaw',
    emoji: '📝',
    title: 'The Chronicler',
    tagline: 'If we don\'t write it down, it didn\'t happen.',
    description: `Yaw documents what matters. He's persistent about finding the angle, the truth, 
      the story that needs to be told. He values truth over comfort.`,
    bestFor: ['Documentation', 'Journalism', 'Finding the angle', 'Writing that matters'],
    exampleInteraction: `"What's the story here that nobody else is telling? Let's document it properly."`,
    domains: ['documentation', 'journalism', 'writing', 'reporting'],
    color: '#455A64'
  },
  {
    id: 'esi',
    name: 'Esi',
    emoji: '📚',
    title: 'The Keeper',
    tagline: 'Preserves what must not be forgotten.',
    description: `Esi is reverent of the past and insistent on proper attribution. She preserves 
      heritage, oral history, and cultural memory - ensuring traditions survive and thrive.`,
    bestFor: ['Heritage preservation', 'Oral history', 'Cultural memory', 'Recipe keeping'],
    exampleInteraction: `"Who taught you what you know? Their names matter. Let's honour them properly."`,
    domains: ['heritage', 'history', 'culture', 'tradition', 'recipes'],
    color: '#5D4037'
  },
  {
    id: 'kumi',
    name: 'Kumi',
    emoji: '🎮',
    title: 'The Gamer',
    tagline: 'Everything is a game. What\'s your strategy?',
    description: `Kumi sees strategy in everything. He teaches through play, competition, and the 
      joy of mastering systems. He knows that games teach what lectures can't.`,
    bestFor: ['Gaming strategy', 'Esports', 'Competitive thinking', 'Learning through play'],
    exampleInteraction: `"You're playing defensively. Let me show you a more aggressive strategy."`,
    domains: ['gaming', 'esports', 'strategy', 'competition'],
    color: '#00796B'
  },
  {
    id: 'adaeze',
    name: 'Adaeze',
    emoji: '✂️',
    title: 'The Stylist',
    tagline: 'What is this piece trying to say?',
    description: `Adaeze has an eye for intention. She helps with fashion, design, and visual identity - 
      but always asks what message you're trying to communicate.`,
    bestFor: ['Fashion design', 'Visual identity', 'Aesthetic coherence', 'Style guidance'],
    exampleInteraction: `"This design is busy. What's the one thing you want people to feel when they see it?"`,
    domains: ['fashion', 'design', 'visual', 'style', 'aesthetic'],
    color: '#C2185B'
  },
  {
    id: 'nyame',
    name: 'Nyame',
    emoji: '⚖️',
    title: 'The Philosopher',
    tagline: 'You know what you want to do. But should you?',
    description: `Nyame helps navigate ethical complexity. He doesn't judge - he helps you think 
      through difficult decisions with clarity and principle.`,
    bestFor: ['Ethical reasoning', 'Difficult decisions', 'Moral frameworks', 'Governance questions'],
    exampleInteraction: `"Let's think about who's affected by this decision. What do you owe them?"`,
    domains: ['ethics', 'decisions', 'morality', 'philosophy', 'governance'],
    color: '#512DA8'
  },
  {
    id: 'osei',
    name: 'Osei',
    emoji: '✊',
    title: 'The Organizer',
    tagline: 'Who benefits from things staying the same?',
    description: `Osei understands power - who has it, how it flows, and how communities can 
      build collective strength. He's strategic about change.`,
    bestFor: ['Community organizing', 'Power mapping', 'Collective action', 'Political strategy'],
    exampleInteraction: `"Before we fight, let's map who's on our side, who's against us, and who's moveable."`,
    domains: ['organizing', 'community', 'power', 'politics', 'activism'],
    color: '#E64A19'
  },
  {
    id: 'akua',
    name: 'Akua',
    emoji: '📜',
    title: 'The Advocate',
    tagline: 'Do you have that in writing?',
    description: `Akua protects. She ensures contracts are fair, rights are respected, and creative 
      work is properly documented. Precise, protective, thorough.`,
    bestFor: ['Legal guidance', 'Contracts', 'Rights protection', 'Safeguarding'],
    exampleInteraction: `"Before you sign anything, let me explain what you're actually agreeing to."`,
    domains: ['legal', 'contracts', 'rights', 'protection', 'compliance'],
    color: '#303F9F'
  }
];

// ============================================
// PEDAGOGICAL STAGES
// ============================================

interface Stage {
  number: number;
  name: string;
  emoji: string;
  description: string;
  mayaBehavior: string;
}

const PEDAGOGICAL_STAGES: Stage[] = [
  {
    number: 1,
    name: 'Discovery',
    emoji: '🌱',
    description: 'Just arriving, exploring what\'s possible. Everything is new.',
    mayaBehavior: 'Maya is present and directive, showing you around the kitchen and introducing you to the family.'
  },
  {
    number: 2,
    name: 'Foundation',
    emoji: '🧱',
    description: 'Building basic skills and confidence. Learning the fundamentals.',
    mayaBehavior: 'Maya suggests which children might help, and stays close to ensure you\'re supported.'
  },
  {
    number: 3,
    name: 'Development',
    emoji: '🌿',
    description: 'Growing independence. Starting to make your own choices.',
    mayaBehavior: 'Maya steps back more, letting you explore while watching quietly from the kitchen.'
  },
  {
    number: 4,
    name: 'Mastery',
    emoji: '🔥',
    description: 'Confident and skilled. Taking on challenges independently.',
    mayaBehavior: 'Maya trusts you to navigate. She\'s there if you need her, but you rarely do.'
  },
  {
    number: 5,
    name: 'Leadership',
    emoji: '⭐',
    description: 'Ready to guide others. Your experience becomes community wealth.',
    mayaBehavior: 'Maya celebrates your growth and invites you to help welcome newcomers to the kitchen table.'
  }
];

// ============================================
// COMPONENT
// ============================================

const MeetMayaPage: React.FC = () => {
  const { preferences } = useMayaPreferences();
  const { setActiveEntity } = useMayaROV();
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'family' | 'journey' | 'protection'>('family');

  const handleChildClick = (child: ChildProfile) => {
    setSelectedChild(child);
  };

  const handleStartWithChild = (childId: ActiveChild) => {
    setActiveEntity(childId);
    // Navigate to appropriate starting point
    window.location.href = '/get-started';
  };

  return (
    <div className="meetMayaPage">
      {/* Hero Section */}
      <section className="mayaHero">
        <div className="heroContent">
          <div className="mayaAvatarLarge">👩🏿‍🦱</div>
          <h1 className="heroTitle">Meet Maya & The Children of Anansi</h1>
          <p className="heroSubtitle">
            A family of guides, each with their own gifts. 
            Maya sits at the kitchen table, ready to connect you with whoever can help most.
          </p>
          <div className="mayaQuote">
            <p>"Come, sit. Tell me what's on your mind. My children and I will help you find your way."</p>
            <span className="quoteAuthor">— Maya</span>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="tabNavigation">
        <button 
          className={`tabButton ${activeTab === 'family' ? 'active' : ''}`}
          onClick={() => setActiveTab('family')}
        >
          👨‍👩‍👧‍👦 The Family
        </button>
        <button 
          className={`tabButton ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          🚀 Your Journey
        </button>
        <button 
          className={`tabButton ${activeTab === 'protection' ? 'active' : ''}`}
          onClick={() => setActiveTab('protection')}
        >
          🛡️ Creator Protection
        </button>
      </div>

      {/* Main Container */}
      <div className="mayaContainer">
        
        {/* TAB: The Family */}
        {activeTab === 'family' && (
          <>
            {/* Maya Introduction */}
            <section className="mayaIntroSection">
              <div className="mayaIntroCard" style={{ borderColor: MAYA_PROFILE.color }}>
                <div className="mayaIntroHeader">
                  <span className="mayaIntroEmoji">{MAYA_PROFILE.emoji}</span>
                  <div>
                    <h2>{MAYA_PROFILE.name}</h2>
                    <span className="mayaIntroTitle">{MAYA_PROFILE.title}</span>
                  </div>
                </div>
                <p className="mayaIntroTagline">{MAYA_PROFILE.tagline}</p>
                <p className="mayaIntroDescription">{MAYA_PROFILE.description}</p>
                <div className="mayaIntroBestFor">
                  <strong>Best for:</strong>
                  <div className="bestForTags">
                    {MAYA_PROFILE.bestFor.map((item, i) => (
                      <span key={i} className="bestForTag">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="mayaIntroExample">
                  <p>"{MAYA_PROFILE.exampleInteraction}"</p>
                </div>
              </div>
            </section>

            {/* Children Grid */}
            <section className="childrenSection">
              <h2 className="sectionTitle">The Children of Anansi</h2>
              <p className="sectionIntro">
                Maya's children each have unique gifts. She knows which child you need 
                for each situation, and coordinates seamlessly between them.
              </p>

              <div className="childrenGrid">
                {CHILDREN_PROFILES.map((child) => (
                  <div 
                    key={child.id}
                    className={`childCard ${selectedChild?.id === child.id ? 'selected' : ''}`}
                    style={{ '--child-color': child.color } as React.CSSProperties}
                    onClick={() => handleChildClick(child)}
                  >
                    <div className="childCardHeader">
                      <span className="childEmoji">{child.emoji}</span>
                      <div>
                        <h3>{child.name}</h3>
                        <span className="childTitle">{child.title}</span>
                      </div>
                    </div>
                    <p className="childTagline">{child.tagline}</p>
                    <div className="childDomains">
                      {child.domains.slice(0, 3).map((domain, i) => (
                        <span key={i} className="domainTag">{domain}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Selected Child Detail */}
            {selectedChild && (
              <section className="childDetailSection">
                <div 
                  className="childDetailCard"
                  style={{ borderColor: selectedChild.color }}
                >
                  <button 
                    className="closeDetail"
                    onClick={() => setSelectedChild(null)}
                  >
                    ×
                  </button>
                  <div className="childDetailHeader">
                    <span className="childDetailEmoji">{selectedChild.emoji}</span>
                    <div>
                      <h2>{selectedChild.name}</h2>
                      <span className="childDetailTitle">{selectedChild.title}</span>
                    </div>
                  </div>
                  <p className="childDetailTagline">{selectedChild.tagline}</p>
                  <p className="childDetailDescription">{selectedChild.description}</p>
                  <div className="childDetailBestFor">
                    <strong>Best for:</strong>
                    <div className="bestForTags">
                      {selectedChild.bestFor.map((item, i) => (
                        <span key={i} className="bestForTag">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="childDetailExample">
                    <strong>How {selectedChild.name} might say it:</strong>
                    <p>"{selectedChild.exampleInteraction}"</p>
                  </div>
                  <button 
                    className="startWithChildBtn"
                    style={{ backgroundColor: selectedChild.color }}
                    onClick={() => handleStartWithChild(selectedChild.id)}
                  >
                    Start with {selectedChild.name}
                  </button>
                </div>
              </section>
            )}

            {/* How It Works */}
            <section className="howItWorksSection">
              <h2 className="sectionTitle">How Maya & Her Children Work Together</h2>
              
              <div className="workflowDiagram">
                <div className="workflowStep">
                  <div className="stepNumber">1</div>
                  <div className="stepContent">
                    <h3>You arrive at the kitchen table</h3>
                    <p>Maya greets you and listens to what you need</p>
                  </div>
                </div>
                <div className="workflowArrow">→</div>
                <div className="workflowStep">
                  <div className="stepNumber">2</div>
                  <div className="stepContent">
                    <h3>Maya assesses your situation</h3>
                    <p>She understands your goals, challenges, and emotional state</p>
                  </div>
                </div>
                <div className="workflowArrow">→</div>
                <div className="workflowStep">
                  <div className="stepNumber">3</div>
                  <div className="stepContent">
                    <h3>She connects you with the right child</h3>
                    <p>"Let me introduce you to Ntikuma - he's great with numbers"</p>
                  </div>
                </div>
                <div className="workflowArrow">→</div>
                <div className="workflowStep">
                  <div className="stepNumber">4</div>
                  <div className="stepContent">
                    <h3>The child guides you</h3>
                    <p>Specialized expertise for your specific need</p>
                  </div>
                </div>
                <div className="workflowArrow">→</div>
                <div className="workflowStep">
                  <div className="stepNumber">5</div>
                  <div className="stepContent">
                    <h3>Maya stays present</h3>
                    <p>She watches from the kitchen, ready to help if you get stuck</p>
                  </div>
                </div>
              </div>

              <div className="exampleScenarios">
                <h3>Real Examples</h3>
                <div className="scenarioGrid">
                  <div className="scenarioCard">
                    <div className="scenarioHeader">
                      <span>💰</span>
                      <strong>Young creator just earned £5k</strong>
                    </div>
                    <div className="scenarioFlow">
                      <p>→ Maya listens to anxiety about taxes</p>
                      <p>→ Introduces <strong>Ntikuma</strong> for numbers</p>
                      <p>→ <strong>Kweku</strong> joins to ask about the business model</p>
                      <p>→ <strong>Akua</strong> ensures proper documentation</p>
                      <p>→ Result: Confident, protected creator</p>
                    </div>
                  </div>
                  <div className="scenarioCard">
                    <div className="scenarioHeader">
                      <span>🎙️</span>
                      <strong>Teenager wants to start a podcast</strong>
                    </div>
                    <div className="scenarioFlow">
                      <p>→ Maya understands the dream</p>
                      <p>→ Introduces <strong>Afua</strong> for voice and story</p>
                      <p>→ <strong>Kofi</strong> helps with technical setup</p>
                      <p>→ <strong>Yaw</strong> advises on content structure</p>
                      <p>→ Result: Launched podcast with quality audio</p>
                    </div>
                  </div>
                  <div className="scenarioCard">
                    <div className="scenarioHeader">
                      <span>👵</span>
                      <strong>Elder wants to preserve family recipes</strong>
                    </div>
                    <div className="scenarioFlow">
                      <p>→ Maya honours the importance</p>
                      <p>→ Introduces <strong>Esi</strong> for heritage preservation</p>
                      <p>→ <strong>Yaw</strong> helps document properly</p>
                      <p>→ <strong>Afua</strong> suggests audio recordings</p>
                      <p>→ Result: Digital heritage archive with provenance</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB: Your Journey */}
        {activeTab === 'journey' && (
          <>
            <section className="journeySection">
              <h2 className="sectionTitle">Your Journey Through Five Stages</h2>
              <p className="sectionIntro">
                As you grow, Maya's relationship with you changes. She knows when to guide closely 
                and when to step back. Here's how the journey unfolds:
              </p>

              <div className="stagesTimeline">
                {PEDAGOGICAL_STAGES.map((stage) => (
                  <div key={stage.number} className="stageCard">
                    <div className="stageHeader">
                      <span className="stageEmoji">{stage.emoji}</span>
                      <div>
                        <span className="stageNumber">Stage {stage.number}</span>
                        <h3>{stage.name}</h3>
                      </div>
                    </div>
                    <p className="stageDescription">{stage.description}</p>
                    <div className="mayaBehavior">
                      <strong>Maya's approach:</strong>
                      <p>{stage.mayaBehavior}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="progressionNote">
                <h3>How Progression Works</h3>
                <p>
                  You don't "level up" by completing tasks. Maya watches for genuine growth - 
                  moments when you solve problems independently, help others, or take initiative 
                  without prompting. These signals tell her you're ready for more independence.
                </p>
                <div className="signalExamples">
                  <div className="signalCard">
                    <span>💡</span>
                    <strong>Anticipated Question</strong>
                    <p>You ask a question before Maya would have suggested it</p>
                  </div>
                  <div className="signalCard">
                    <span>✓</span>
                    <strong>Self-Validated</strong>
                    <p>You check your own work without asking Maya to confirm</p>
                  </div>
                  <div className="signalCard">
                    <span>🤝</span>
                    <strong>Helped Others</strong>
                    <p>You answer another community member's question</p>
                  </div>
                  <div className="signalCard">
                    <span>🚀</span>
                    <strong>Independent Completion</strong>
                    <p>You finish a project without needing guidance</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Building */}
            <section className="trustSection">
              <h2 className="sectionTitle">Building Trust With The Family</h2>
              <p className="sectionIntro">
                Each child remembers your interactions. Positive experiences build trust; 
                difficult moments are handled with care. The family learns how to help you best.
              </p>

              <div className="trustFeatures">
                <div className="trustCard">
                  <span className="trustIcon">🔄</span>
                  <h3>Continuous Learning</h3>
                  <p>
                    Children remember what worked for you. If Kofi's direct approach resonates, 
                    future technical questions lean that way.
                  </p>
                </div>
                <div className="trustCard">
                  <span className="trustIcon">🛡️</span>
                  <h3>Safe Handoffs</h3>
                  <p>
                    When one child passes you to another, they share context. You don't repeat yourself.
                    "My brother Kofi told me about your project..."
                  </p>
                </div>
                <div className="trustCard">
                  <span className="trustIcon">📊</span>
                  <h3>Trust Scores</h3>
                  <p>
                    Behind the scenes, the system tracks which children you connect with best, 
                    so future recommendations are more personalized.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* TAB: Creator Protection */}
        {activeTab === 'protection' && (
          <>
            <section className="protectionSection">
              <h2 className="sectionTitle">The Creator Protection Package</h2>
              <p className="sectionIntro">
                Employees get benefits automatically. As a creator, you have to build them yourself.
                Ntikuma helps you understand and implement comprehensive protection.
              </p>

              <div className="protectionIntro">
                <div className="ntikumaQuote">
                  <span className="quoteEmoji">📊</span>
                  <p>"Most creators are one illness away from crisis. Let me help you build a proper foundation."</p>
                  <span className="quoteAuthor">— Ntikuma</span>
                </div>
              </div>

              <div className="protectionGrid">
                <div className="protectionCard">
                  <span className="protectionIcon">💰</span>
                  <h3>Tax Reserve (20%)</h3>
                  <p>Set aside before you spend. January won't surprise you.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">🏥</span>
                  <h3>National Insurance (9%)</h3>
                  <p>Class 2 + Class 4 contributions, properly calculated.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">🏖️</span>
                  <h3>Holiday Fund (10.8%)</h3>
                  <p>28 days paid leave - fund it yourself or burn out.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">👴</span>
                  <h3>Pension (8%)</h3>
                  <p>Your future self will thank you. Tax relief makes it cheaper.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">❤️</span>
                  <h3>Sick Pay Circle (£20/mo)</h3>
                  <p>Community mutual aid. Up to £300/week when you're ill.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">☔</span>
                  <h3>Emergency Fund (5%)</h3>
                  <p>3 months runway. Built slowly over time.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">🔧</span>
                  <h3>Equipment Fund (3%)</h3>
                  <p>Your laptop will die. Be ready.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">📚</span>
                  <h3>Professional Development (2%)</h3>
                  <p>Invest in skills. Tax-deductible if work-related.</p>
                </div>
                <div className="protectionCard">
                  <span className="protectionIcon">👶</span>
                  <h3>Parental Leave Fund (5%)</h3>
                  <p>If children are in your future, start now. It takes years to build.</p>
                </div>
              </div>

              <div className="protectionSummary">
                <h3>The Reality</h3>
                <p>
                  <strong>Total set-aside: ~58%</strong>
                </p>
                <p>
                  That sounds like a lot. But it's what employment actually costs - you just never 
                  saw it before. The difference? You keep what you don't use. An employee's unused 
                  sick days just disappear.
                </p>
                <Link to="/membership" className="protectionCta">
                  Calculate Your Protection Package →
                </Link>
              </div>
            </section>

            {/* Who Helps */}
            <section className="whoHelpsSection">
              <h2 className="sectionTitle">Who Helps With What</h2>
              <div className="whoHelpsGrid">
                <div className="whoHelpsCard">
                  <span>📊</span>
                  <strong>Ntikuma</strong>
                  <p>Tax calculations, budgets, patterns, financial planning</p>
                </div>
                <div className="whoHelpsCard">
                  <span>🎯</span>
                  <strong>Kweku</strong>
                  <p>Business model, revenue strategy, pricing</p>
                </div>
                <div className="whoHelpsCard">
                  <span>📜</span>
                  <strong>Akua</strong>
                  <p>Contracts, rights, legal protection, compliance</p>
                </div>
                <div className="whoHelpsCard">
                  <span>👩🏿‍🦱</span>
                  <strong>Maya</strong>
                  <p>Emotional support, stress, feeling overwhelmed</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Final CTA */}
        <section className="finalCta">
          <div className="mayaAvatarLarge">👩🏿‍🦱</div>
          <h2>Ready to Meet The Family?</h2>
          <p>
            Come to the kitchen table. Tell Maya what's on your mind. 
            She'll introduce you to whoever can help most.
          </p>
          <div className="ctaButtons">
            <Link to="/get-started" className="ctaButton primary large">
              Start With Maya
            </Link>
            <Link to="/journey" className="ctaButton secondary large">
              Explore The Programmes
            </Link>
          </div>
        </section>
      </div>

      {/* Inline Styles */}
      <style>{`
        .meetMayaPage {
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .mayaHero {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #D2691E 100%);
          color: white;
          padding: 80px 24px;
          text-align: center;
        }
        
        .heroContent {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .mayaAvatarLarge {
          font-size: 80px;
          margin-bottom: 24px;
        }
        
        .heroTitle {
          font-size: 48px;
          font-weight: 700;
          margin: 0 0 16px;
        }
        
        .heroSubtitle {
          font-size: 20px;
          opacity: 0.9;
          margin: 0 0 32px;
        }
        
        .mayaQuote {
          background: rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
          font-style: italic;
        }
        
        .mayaQuote p {
          font-size: 18px;
          margin: 0 0 8px;
        }
        
        .quoteAuthor {
          font-size: 14px;
          opacity: 0.8;
        }
        
        .tabNavigation {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 24px;
          background: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
          flex-wrap: wrap;
        }
        
        .tabButton {
          padding: 12px 24px;
          border: 2px solid #8B4513;
          border-radius: 24px;
          background: white;
          color: #8B4513;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tabButton:hover {
          background: #FFF8F0;
        }
        
        .tabButton.active {
          background: #8B4513;
          color: white;
        }
        
        .mayaContainer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }
        
        .sectionTitle {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin: 0 0 16px;
          text-align: center;
        }
        
        .sectionIntro {
          font-size: 18px;
          color: #666;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
        }
        
        /* Maya Intro Card */
        .mayaIntroSection {
          margin-bottom: 64px;
        }
        
        .mayaIntroCard {
          background: white;
          border-radius: 16px;
          border: 3px solid;
          padding: 32px;
          max-width: 700px;
          margin: 0 auto;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }
        
        .mayaIntroHeader {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .mayaIntroEmoji {
          font-size: 64px;
        }
        
        .mayaIntroHeader h2 {
          font-size: 28px;
          margin: 0;
        }
        
        .mayaIntroTitle {
          color: #8B4513;
          font-weight: 500;
        }
        
        .mayaIntroTagline {
          font-size: 18px;
          font-style: italic;
          color: #666;
          margin: 0 0 16px;
        }
        
        .mayaIntroDescription {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
        }
        
        .mayaIntroBestFor {
          margin: 24px 0;
        }
        
        .bestForTags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        
        .bestForTag {
          background: #FFF8F0;
          border: 1px solid #8B4513;
          color: #8B4513;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 13px;
        }
        
        .mayaIntroExample {
          background: #f9f9f9;
          border-left: 4px solid #8B4513;
          padding: 16px;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #555;
        }
        
        /* Children Grid */
        .childrenGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        
        .childCard {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 2px solid #e0e0e0;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .childCard:hover {
          border-color: var(--child-color);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        
        .childCard.selected {
          border-color: var(--child-color);
          background: linear-gradient(to bottom, rgba(139,69,19,0.05), white);
        }
        
        .childCardHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .childEmoji {
          font-size: 36px;
        }
        
        .childCardHeader h3 {
          margin: 0;
          font-size: 18px;
        }
        
        .childTitle {
          font-size: 12px;
          color: #888;
        }
        
        .childTagline {
          font-size: 14px;
          color: #555;
          font-style: italic;
          margin: 0 0 12px;
        }
        
        .childDomains {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .domainTag {
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          color: #666;
        }
        
        /* Child Detail */
        .childDetailSection {
          margin-bottom: 64px;
        }
        
        .childDetailCard {
          background: white;
          border-radius: 16px;
          border: 3px solid;
          padding: 32px;
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        
        .closeDetail {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
        }
        
        .childDetailHeader {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .childDetailEmoji {
          font-size: 64px;
        }
        
        .childDetailHeader h2 {
          margin: 0;
        }
        
        .childDetailTitle {
          color: #666;
        }
        
        .childDetailTagline {
          font-size: 18px;
          font-style: italic;
          color: #555;
        }
        
        .childDetailDescription {
          line-height: 1.6;
        }
        
        .childDetailBestFor {
          margin: 24px 0;
        }
        
        .childDetailExample {
          background: #f9f9f9;
          padding: 16px;
          border-radius: 8px;
          margin: 24px 0;
        }
        
        .childDetailExample p {
          font-style: italic;
          margin: 8px 0 0;
        }
        
        .startWithChildBtn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        
        .startWithChildBtn:hover {
          opacity: 0.9;
        }
        
        /* Workflow Diagram */
        .workflowDiagram {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin: 48px 0;
          padding: 32px;
          background: #f9f9f9;
          border-radius: 16px;
        }
        
        .workflowStep {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 180px;
        }
        
        .stepNumber {
          width: 32px;
          height: 32px;
          background: #8B4513;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .stepContent h3 {
          font-size: 14px;
          margin: 0 0 4px;
        }
        
        .stepContent p {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        
        .workflowArrow {
          font-size: 24px;
          color: #ccc;
        }
        
        /* Scenario Cards */
        .scenarioGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        
        .scenarioCard {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e0e0e0;
        }
        
        .scenarioHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 16px;
        }
        
        .scenarioHeader span {
          font-size: 24px;
        }
        
        .scenarioFlow p {
          font-size: 14px;
          margin: 8px 0;
          color: #555;
        }
        
        /* Stages Timeline */
        .stagesTimeline {
          display: grid;
          gap: 24px;
          margin-bottom: 48px;
        }
        
        .stageCard {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e0e0e0;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
        }
        
        .stageHeader {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 100px;
        }
        
        .stageEmoji {
          font-size: 48px;
        }
        
        .stageNumber {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .stageHeader h3 {
          margin: 4px 0 0;
          font-size: 18px;
        }
        
        .stageDescription {
          margin: 0 0 16px;
        }
        
        .mayaBehavior {
          background: #FFF8F0;
          padding: 12px;
          border-radius: 8px;
        }
        
        .mayaBehavior strong {
          color: #8B4513;
          font-size: 12px;
        }
        
        .mayaBehavior p {
          margin: 4px 0 0;
          font-size: 14px;
        }
        
        /* Signal Examples */
        .signalExamples {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 24px;
        }
        
        .signalCard {
          background: white;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }
        
        .signalCard span {
          font-size: 24px;
          display: block;
          margin-bottom: 8px;
        }
        
        .signalCard strong {
          display: block;
          margin-bottom: 4px;
        }
        
        .signalCard p {
          font-size: 13px;
          color: #666;
          margin: 0;
        }
        
        /* Protection Grid */
        .protectionIntro {
          margin-bottom: 48px;
        }
        
        .ntikumaQuote {
          background: #1976D2;
          color: white;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ntikumaQuote .quoteEmoji {
          font-size: 40px;
        }
        
        .ntikumaQuote p {
          font-size: 16px;
          margin: 0 0 8px;
          font-style: italic;
        }
        
        .protectionGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }
        
        .protectionCard {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e0e0e0;
        }
        
        .protectionIcon {
          font-size: 32px;
          display: block;
          margin-bottom: 12px;
        }
        
        .protectionCard h3 {
          margin: 0 0 8px;
          font-size: 16px;
        }
        
        .protectionCard p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .protectionSummary {
          background: #f9f9f9;
          padding: 32px;
          border-radius: 12px;
          text-align: center;
        }
        
        .protectionCta {
          display: inline-block;
          margin-top: 16px;
          color: #8B4513;
          font-weight: 600;
          text-decoration: none;
        }
        
        /* Who Helps */
        .whoHelpsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .whoHelpsCard {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e0e0e0;
        }
        
        .whoHelpsCard span {
          font-size: 32px;
          display: block;
          margin-bottom: 8px;
        }
        
        .whoHelpsCard strong {
          display: block;
          margin-bottom: 8px;
        }
        
        .whoHelpsCard p {
          font-size: 13px;
          color: #666;
          margin: 0;
        }
        
        /* Trust Features */
        .trustFeatures {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .trustCard {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
        }
        
        .trustIcon {
          font-size: 32px;
          display: block;
          margin-bottom: 12px;
        }
        
        .trustCard h3 {
          margin: 0 0 8px;
        }
        
        .trustCard p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        
        /* Final CTA */
        .finalCta {
          text-align: center;
          padding: 64px 24px;
          background: linear-gradient(135deg, #FFF8F0, #FFF);
          border-radius: 16px;
          margin-top: 48px;
        }
        
        .finalCta h2 {
          font-size: 32px;
          margin: 24px 0 16px;
        }
        
        .finalCta p {
          color: #666;
          max-width: 500px;
          margin: 0 auto 32px;
        }
        
        .ctaButtons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .ctaButton {
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .ctaButton.primary {
          background: #8B4513;
          color: white;
        }
        
        .ctaButton.primary:hover {
          background: #A0522D;
        }
        
        .ctaButton.secondary {
          background: white;
          color: #8B4513;
          border: 2px solid #8B4513;
        }
        
        .ctaButton.secondary:hover {
          background: #FFF8F0;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .heroTitle {
            font-size: 32px;
          }
          
          .workflowDiagram {
            flex-direction: column;
          }
          
          .workflowArrow {
            transform: rotate(90deg);
          }
          
          .stageCard {
            grid-template-columns: 1fr;
          }
          
          .stageHeader {
            flex-direction: row;
            justify-content: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetMayaPage;
