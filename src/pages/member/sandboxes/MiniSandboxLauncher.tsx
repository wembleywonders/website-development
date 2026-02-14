// src/pages/member/sandboxes/MiniSandboxLauncher.tsx
// Launcher page for all mini-sandboxes
// "Felt, Glue & Rounded Scissors" - bounded creative exploration

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import './MiniSandboxLauncher.css';

// ============================================
// TYPES
// ============================================

interface MiniSandbox {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'audio' | 'writing' | 'visual' | 'technical';
  programme?: string;
  constraints: {
    label: string;
    value: string;
  }[];
  skills: string[];
  timeEstimate: string;
  isNew?: boolean;
}

// ============================================
// SANDBOX DATA
// ============================================

const MINI_SANDBOXES: MiniSandbox[] = [
  {
    id: 'audio-snippet',
    name: '60-Second Audio',
    description: 'Record and arrange a 60-second audio piece. Build confidence with voice recording before tackling full episodes.',
    emoji: '🎙️',
    category: 'audio',
    programme: 'G-Tech Casters',
    constraints: [
      { label: 'Duration', value: '60 seconds max' },
      { label: 'Session', value: '15 minutes' }
    ],
    skills: ['Voice recording', 'Audio pacing', 'Storytelling'],
    timeEstimate: '10-15 min'
  },
  {
    id: 'micro-story',
    name: '200-Word Story',
    description: 'Write a complete story in exactly 200 words. Every word must earn its place. Discover the power of constraints.',
    emoji: '✍️',
    category: 'writing',
    programme: 'Pageturners',
    constraints: [
      { label: 'Words', value: '200 max' },
      { label: 'Session', value: '10 minutes' }
    ],
    skills: ['Concise writing', 'Narrative structure', 'Editing'],
    timeEstimate: '8-12 min',
    isNew: true
  },
  {
    id: 'quick-collage',
    name: '3-Image Collage',
    description: 'Tell a visual story with exactly 3 images. Learn that sequence and selection matter more than quantity.',
    emoji: '🖼️',
    category: 'visual',
    programme: 'G-Tech Casters',
    constraints: [
      { label: 'Images', value: '3 max' },
      { label: 'Session', value: '15 minutes' }
    ],
    skills: ['Visual storytelling', 'Curation', 'Composition'],
    timeEstimate: '10-15 min'
  },
  {
    id: 'headline-workshop',
    name: 'Headline Challenge',
    description: 'Write 10 different headlines for the same story. Discover how framing changes everything.',
    emoji: '📰',
    category: 'writing',
    programme: 'Pageturners',
    constraints: [
      { label: 'Headlines', value: 'Exactly 10' },
      { label: 'Characters', value: '60 max each' }
    ],
    skills: ['Hooks', 'Audience awareness', 'Iteration'],
    timeEstimate: '8-10 min'
  },
  {
    id: 'sound-hunt',
    name: '5-Sound Story',
    description: 'Record 5 environmental sounds and arrange them to tell a story without words. Pure audio narrative.',
    emoji: '👂',
    category: 'audio',
    programme: 'G-Tech Casters',
    constraints: [
      { label: 'Sounds', value: '5 max' },
      { label: 'Total length', value: '30 seconds' }
    ],
    skills: ['Sound design', 'Environmental audio', 'Pacing'],
    timeEstimate: '15-20 min'
  },
  {
    id: 'repair-sketch',
    name: 'Diagnosis Sketch',
    description: 'Draw a quick diagram explaining a device problem and your fix. Visual communication for repair work.',
    emoji: '✏️',
    category: 'technical',
    programme: 'Scrap Cat',
    constraints: [
      { label: 'Panels', value: '4 max' },
      { label: 'Session', value: '10 minutes' }
    ],
    skills: ['Technical drawing', 'Problem documentation', 'Visual explanation'],
    timeEstimate: '8-12 min'
  }
];

// ============================================
// COMPONENT
// ============================================

const MiniSandboxLauncher: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', emoji: '🎨' },
    { id: 'audio', label: 'Audio', emoji: '🎵' },
    { id: 'writing', label: 'Writing', emoji: '✍️' },
    { id: 'visual', label: 'Visual', emoji: '🖼️' },
    { id: 'technical', label: 'Technical', emoji: '🔧' }
  ];

  const filteredSandboxes = selectedCategory === 'all'
    ? MINI_SANDBOXES
    : MINI_SANDBOXES.filter(s => s.category === selectedCategory);

  const getCategoryColor = (category: MiniSandbox['category']): string => {
    switch (category) {
      case 'audio': return '#ef4444';
      case 'writing': return '#8b5cf6';
      case 'visual': return '#3b82f6';
      case 'technical': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <PageTemplate
      pageTitle="Mini Sandboxes"
      pageStrapline="Bounded creative exploration with safe, playful constraints."
    >
      <div className="mini-sandbox-launcher">
        {/* Philosophy Banner */}
        <div className="philosophy-banner">
          <div className="philosophy-icon">🎯</div>
          <div className="philosophy-content">
            <h3>Felt, Glue & Rounded Scissors</h3>
            <p>
              These mini-sandboxes give you limited tools and clear constraints - 
              like teaching art to children with simple materials and an inspiring brief. 
              The boundaries aren't restrictions; they're what make creativity possible.
            </p>
            <p className="philosophy-note">
              <strong>Nothing publishes. Nothing judges. Just safe exploration.</strong>
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Sandbox Grid */}
        <div className="sandbox-grid">
          {filteredSandboxes.map(sandbox => (
            <article key={sandbox.id} className="sandbox-card">
              {sandbox.isNew && <span className="new-badge">NEW</span>}
              
              <div className="sandbox-card__header">
                <span className="sandbox-emoji">{sandbox.emoji}</span>
                <span 
                  className="category-tag"
                  style={{ backgroundColor: getCategoryColor(sandbox.category) }}
                >
                  {sandbox.category}
                </span>
              </div>

              <h3>{sandbox.name}</h3>
              <p className="sandbox-description">{sandbox.description}</p>

              {sandbox.programme && (
                <div className="sandbox-programme">
                  📚 {sandbox.programme}
                </div>
              )}

              <div className="sandbox-constraints">
                <h4>Constraints:</h4>
                <ul>
                  {sandbox.constraints.map((c, i) => (
                    <li key={i}>
                      <span className="constraint-label">{c.label}:</span>
                      <span className="constraint-value">{c.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sandbox-skills">
                {sandbox.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="sandbox-footer">
                <span className="time-estimate">⏱️ {sandbox.timeEstimate}</span>
                <Link 
                  to={`/member/sandboxes/mini/${sandbox.id}`}
                  className="btn-launch"
                >
                  🚀 Launch
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Progression Note */}
        <div className="progression-note">
          <h4>📈 Where Mini-Sandboxes Fit</h4>
          <div className="progression-diagram">
            <div className="progression-step current">
              <span className="step-emoji">🎨</span>
              <span className="step-label">Mini Sandbox</span>
              <span className="step-desc">Safe play</span>
            </div>
            <span className="progression-arrow">→</span>
            <div className="progression-step">
              <span className="step-emoji">🛠️</span>
              <span className="step-label">Main Sandbox</span>
              <span className="step-desc">Full projects</span>
            </div>
            <span className="progression-arrow">→</span>
            <div className="progression-step">
              <span className="step-emoji">🎮</span>
              <span className="step-label">Passionistas</span>
              <span className="step-desc">Public sharing</span>
            </div>
            <span className="progression-arrow">→</span>
            <div className="progression-step">
              <span className="step-emoji">📰</span>
              <span className="step-label">Joystick</span>
              <span className="step-desc">Publication</span>
            </div>
          </div>
          <p>
            Mini-sandboxes build confidence and skills in isolation. 
            When you're ready, progress to main sandboxes for complete projects, 
            then share through Passionistas and Joystick.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default MiniSandboxLauncher;