// src/pages/member/simulators/SimulatorLauncher.tsx
// Launcher page for member simulators/sandboxes

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import './SimulatorLauncher.css';

// ============================================
// TYPES
// ============================================

interface Simulator {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'financial' | 'creative' | 'technical' | 'business';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  programme?: string;
  skills: string[];
  isNew?: boolean;
  isLocked?: boolean;
  completionCount?: number;
  lastAttempt?: Date;
}

// ============================================
// SIMULATOR DATA
// ============================================

const SIMULATORS: Simulator[] = [
  {
    id: 'tax-return',
    name: 'Tax Return Simulator',
    description: 'Practice completing a self-assessment tax return with realistic scenarios. Learn what expenses you can claim and how to avoid common mistakes.',
    emoji: '📊',
    category: 'financial',
    difficulty: 'intermediate',
    estimatedTime: '30-45 min',
    programme: 'TECHreneurs',
    skills: ['Self-assessment', 'Record keeping', 'Tax calculations'],
    completionCount: 2
  },
  {
    id: 'invoice-creator',
    name: 'Invoice Builder',
    description: 'Create professional invoices, understand payment terms, and learn how to chase late payments effectively.',
    emoji: '🧾',
    category: 'business',
    difficulty: 'beginner',
    estimatedTime: '15-20 min',
    programme: 'TECHreneurs',
    skills: ['Invoicing', 'Payment terms', 'Client communication'],
    isNew: true
  },
  {
    id: 'podcast-editor',
    name: 'Podcast Edit Simulator',
    description: 'Learn audio editing basics: cutting, leveling, adding music, and exporting. Uses simplified controls to build confidence.',
    emoji: '🎙️',
    category: 'creative',
    difficulty: 'beginner',
    estimatedTime: '20-30 min',
    programme: 'G-Tech Casters',
    skills: ['Audio editing', 'Sound levels', 'Export formats']
  },
  {
    id: 'device-diagnosis',
    name: 'Device Diagnosis Challenge',
    description: 'Diagnose common device problems from symptoms. Practice the troubleshooting mindset before touching real hardware.',
    emoji: '🔧',
    category: 'technical',
    difficulty: 'beginner',
    estimatedTime: '15-25 min',
    programme: 'Scrap Cat',
    skills: ['Troubleshooting', 'Problem analysis', 'Component knowledge'],
    completionCount: 5,
    lastAttempt: new Date('2025-01-15')
  },
  {
    id: 'pricing-calculator',
    name: 'Pricing Your Work',
    description: 'Calculate sustainable prices for creative services. Factor in time, materials, overhead, and profit margin.',
    emoji: '💰',
    category: 'business',
    difficulty: 'intermediate',
    estimatedTime: '25-35 min',
    programme: 'TECHreneurs',
    skills: ['Pricing strategy', 'Cost analysis', 'Value communication']
  },
  {
    id: 'social-scheduler',
    name: 'Social Media Planner',
    description: 'Plan a week of content across platforms. Learn optimal posting times, content mixing, and engagement strategies.',
    emoji: '📱',
    category: 'creative',
    difficulty: 'beginner',
    estimatedTime: '20-30 min',
    programme: 'G-Tech Casters',
    skills: ['Content planning', 'Platform strategy', 'Scheduling']
  },
  {
    id: 'client-negotiation',
    name: 'Client Conversation Simulator',
    description: 'Practice difficult client conversations: scope creep, late payments, revision limits. Build confidence for real situations.',
    emoji: '🤝',
    category: 'business',
    difficulty: 'advanced',
    estimatedTime: '30-40 min',
    programme: 'TECHreneurs',
    skills: ['Negotiation', 'Boundaries', 'Professional communication'],
    isLocked: true
  },
  {
    id: 'budget-builder',
    name: 'Personal Budget Builder',
    description: 'Create a realistic budget that accounts for irregular freelance income. Plan for taxes, quiet months, and growth.',
    emoji: '📈',
    category: 'financial',
    difficulty: 'beginner',
    estimatedTime: '20-30 min',
    skills: ['Budgeting', 'Cash flow', 'Financial planning']
  }
];

// ============================================
// COMPONENT
// ============================================

const SimulatorLauncher: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Simulators', emoji: '🎮' },
    { id: 'financial', label: 'Financial', emoji: '📊' },
    { id: 'creative', label: 'Creative', emoji: '🎨' },
    { id: 'technical', label: 'Technical', emoji: '🔧' },
    { id: 'business', label: 'Business', emoji: '💼' }
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: '🌱 Beginner' },
    { id: 'intermediate', label: '🌿 Intermediate' },
    { id: 'advanced', label: '🌳 Advanced' }
  ];

  const filteredSimulators = SIMULATORS.filter(sim => {
    if (selectedCategory !== 'all' && sim.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && sim.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: Simulator['difficulty']): string => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category: Simulator['category']): string => {
    switch (category) {
      case 'financial': return '#3b82f6';
      case 'creative': return '#8b5cf6';
      case 'technical': return '#06b6d4';
      case 'business': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <PageTemplate
      title="Simulator Launcher"
      subtitle="Practice real-world skills in a safe sandbox environment"
      icon="🎮"
    >
      <div className="simulator-launcher">
        {/* Info Banner */}
        <div className="launcher-info">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h4>Learn by Doing, Safely</h4>
            <p>
              These simulators let you practice real-world tasks without real-world consequences. 
              Make mistakes, learn from them, build confidence. Your progress is tracked in your 
              Creator's Journal.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="launcher-filters">
          <div className="filter-section">
            <label>Category</label>
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label>Difficulty</label>
            <div className="filter-buttons">
              {difficulties.map(diff => (
                <button
                  key={diff.id}
                  className={`filter-btn ${selectedDifficulty === diff.id ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff.id)}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="launcher-results">
          Showing {filteredSimulators.length} simulator{filteredSimulators.length !== 1 ? 's' : ''}
        </div>

        {/* Simulator Grid */}
        <div className="simulator-grid">
          {filteredSimulators.map(sim => (
            <article 
              key={sim.id} 
              className={`simulator-card ${sim.isLocked ? 'locked' : ''}`}
            >
              {sim.isNew && <span className="new-badge">NEW</span>}
              {sim.isLocked && <span className="locked-badge">🔒 Locked</span>}
              
              <div className="simulator-card__header">
                <span className="simulator-emoji">{sim.emoji}</span>
                <div className="simulator-meta">
                  <span 
                    className="category-tag"
                    style={{ backgroundColor: getCategoryColor(sim.category) }}
                  >
                    {sim.category}
                  </span>
                  <span 
                    className="difficulty-tag"
                    style={{ color: getDifficultyColor(sim.difficulty) }}
                  >
                    {sim.difficulty}
                  </span>
                </div>
              </div>

              <h3>{sim.name}</h3>
              <p className="simulator-description">{sim.description}</p>

              <div className="simulator-details">
                <span className="detail">⏱️ {sim.estimatedTime}</span>
                {sim.programme && <span className="detail">📚 {sim.programme}</span>}
              </div>

              <div className="simulator-skills">
                {sim.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>

              {sim.completionCount !== undefined && sim.completionCount > 0 && (
                <div className="simulator-progress">
                  <span>✅ Completed {sim.completionCount} time{sim.completionCount !== 1 ? 's' : ''}</span>
                  {sim.lastAttempt && (
                    <span className="last-attempt">
                      Last: {new Date(sim.lastAttempt).toLocaleDateString('en-GB')}
                    </span>
                  )}
                </div>
              )}

              <div className="simulator-actions">
                {sim.isLocked ? (
                  <button className="btn-locked" disabled>
                    Complete prerequisites to unlock
                  </button>
                ) : (
                  <Link to={`/member/simulators/${sim.id}`} className="btn-launch">
                    🚀 Launch Simulator
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredSimulators.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No simulators match your filters</h3>
            <p>Try adjusting your category or difficulty selection.</p>
            <button onClick={() => { setSelectedCategory('all'); setSelectedDifficulty('all'); }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Reality Check Footer */}
        <div className="launcher-footer">
          <h4>📌 Remember: Simulators ≠ Real World</h4>
          <p>
            These tools teach concepts and build confidence, but real situations have variables 
            we can't simulate. Use these as preparation, not replacement for actual experience. 
            When you're ready, your mentors and community are here to support you through the real thing.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SimulatorLauncher;
