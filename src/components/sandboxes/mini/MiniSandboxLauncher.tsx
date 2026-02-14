// src/components/sandboxes/mini/MiniSandboxLauncher.tsx
// Mini-Sandbox Hub - Launch quick creative exercises

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Target, Zap, Filter } from 'lucide-react';
import './MiniSandbox.css';

interface MiniSandboxInfo {
  id: string;
  title: string;
  emoji: string;
  description: string;
  constraint: string;
  programme: string;
  programmeColor: string;
  category: 'creative' | 'business' | 'media' | 'technical';
  timeMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MINI_SANDBOXES: MiniSandboxInfo[] = [
  // G-Tech Casters - Media
  {
    id: 'audio-snippet',
    title: 'Audio Snippet',
    emoji: '🎙️',
    description: '60-second audio pitch for a local business',
    constraint: '60 seconds',
    programme: 'G-Tech Casters',
    programmeColor: '#06b6d4',
    category: 'media',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'client-pitch',
    title: 'Client Pitch',
    emoji: '🏢',
    description: '90-second pitch for media services to local organizations',
    constraint: '90 seconds, 4 elements',
    programme: 'G-Tech Casters',
    programmeColor: '#06b6d4',
    category: 'business',
    timeMinutes: 10,
    difficulty: 'medium'
  },
  {
    id: 'quick-collage',
    title: 'Quick Collage',
    emoji: '🖼️',
    description: 'Tell a story in 3 images',
    constraint: '3 images',
    programme: 'G-Tech Casters',
    programmeColor: '#06b6d4',
    category: 'creative',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'sound-hunt',
    title: 'Sound Hunt',
    emoji: '👂',
    description: 'Capture 5 ambient sounds that tell a story',
    constraint: '5 sounds',
    programme: 'G-Tech Casters',
    programmeColor: '#06b6d4',
    category: 'media',
    timeMinutes: 10,
    difficulty: 'medium'
  },

  // PageTurners - Writing
  {
    id: 'micro-story',
    title: 'Micro Story',
    emoji: '✍️',
    description: 'Complete story in exactly 200 words',
    constraint: '200 words exactly',
    programme: 'PageTurners',
    programmeColor: '#8b5cf6',
    category: 'creative',
    timeMinutes: 10,
    difficulty: 'medium'
  },
  {
    id: 'headline-challenge',
    title: 'Headline Challenge',
    emoji: '📰',
    description: '10 different headlines for the same story',
    constraint: '10 headlines',
    programme: 'PageTurners',
    programmeColor: '#8b5cf6',
    category: 'creative',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'service-description',
    title: 'Service Description',
    emoji: '📝',
    description: 'Pitch your service in exactly 50 words',
    constraint: '50 words',
    programme: 'PageTurners',
    programmeColor: '#8b5cf6',
    category: 'business',
    timeMinutes: 5,
    difficulty: 'easy'
  },

  // STEMgeneers - Technical
  {
    id: 'repair-sketch',
    title: 'Repair Sketch',
    emoji: '✏️',
    description: '4-panel repair guide for common problems',
    constraint: '4 panels',
    programme: 'STEMgeneers',
    programmeColor: '#f59e0b',
    category: 'technical',
    timeMinutes: 10,
    difficulty: 'medium'
  },
  {
    id: 'diagnostic-quiz',
    title: 'Diagnostic Quiz',
    emoji: '🔧',
    description: 'Practice troubleshooting common tech issues',
    constraint: '5 diagnoses',
    programme: 'STEMgeneers',
    programmeColor: '#f59e0b',
    category: 'technical',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'pricing-calculator',
    title: 'Pricing Calculator',
    emoji: '💰',
    description: 'Practice quoting repair jobs fairly',
    constraint: '5 quotes',
    programme: 'STEMgeneers',
    programmeColor: '#f59e0b',
    category: 'business',
    timeMinutes: 5,
    difficulty: 'easy'
  },

  // Silk Stilettos - Creative Services
  {
    id: 'style-board',
    title: 'Style Board',
    emoji: '👗',
    description: 'Create a 3-look mood board for a client',
    constraint: '3 looks',
    programme: 'Silk Stilettos',
    programmeColor: '#ec4899',
    category: 'creative',
    timeMinutes: 10,
    difficulty: 'medium'
  },
  {
    id: 'before-after',
    title: 'Before/After',
    emoji: '✨',
    description: 'Document a transformation for portfolio',
    constraint: '1 transformation',
    programme: 'Silk Stilettos',
    programmeColor: '#ec4899',
    category: 'creative',
    timeMinutes: 5,
    difficulty: 'easy'
  },

  // TECHreneurs - Business
  {
    id: 'elevator-pitch',
    title: 'Elevator Pitch',
    emoji: '🎯',
    description: '30-second pitch for any business situation',
    constraint: '30 seconds, 75 words',
    programme: 'TECHreneurs',
    programmeColor: '#10b981',
    category: 'business',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'service-menu',
    title: 'Service Menu',
    emoji: '📋',
    description: 'Create your 3-service offering for local businesses',
    constraint: '3 services minimum',
    programme: 'TECHreneurs',
    programmeColor: '#10b981',
    category: 'business',
    timeMinutes: 10,
    difficulty: 'medium'
  },
  {
    id: 'gap-spotter',
    title: 'Gap Spotter',
    emoji: '🔍',
    description: 'Walk a virtual street and spot business opportunities',
    constraint: '3 gaps minimum',
    programme: 'TECHreneurs',
    programmeColor: '#10b981',
    category: 'business',
    timeMinutes: 10,
    difficulty: 'medium'
  },

  // Cross-Programme
  {
    id: 'portfolio-snapshot',
    title: 'Portfolio Snapshot',
    emoji: '📸',
    description: 'Create a quick portfolio piece to show clients',
    constraint: '1 complete piece',
    programme: 'All Programmes',
    programmeColor: '#6366f1',
    category: 'business',
    timeMinutes: 5,
    difficulty: 'easy'
  },
  {
    id: 'testimonial-request',
    title: 'Testimonial Request',
    emoji: '⭐',
    description: 'Practice asking clients for testimonials',
    constraint: '3 approaches',
    programme: 'All Programmes',
    programmeColor: '#6366f1',
    category: 'business',
    timeMinutes: 5,
    difficulty: 'easy'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🎯' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'creative', label: 'Creative', icon: '🎨' },
  { id: 'media', label: 'Media', icon: '🎬' },
  { id: 'technical', label: 'Technical', icon: '🔧' }
];

const MiniSandboxLauncher: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProgramme, setSelectedProgramme] = useState<string>('all');

  const programmes = ['all', ...new Set(MINI_SANDBOXES.map(s => s.programme))];

  const filteredSandboxes = MINI_SANDBOXES.filter(sandbox => {
    if (selectedCategory !== 'all' && sandbox.category !== selectedCategory) return false;
    if (selectedProgramme !== 'all' && sandbox.programme !== selectedProgramme) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="mini-sandbox-launcher">
      <header className="launcher-header">
        <Link to="/sandbox" className="launcher-back">
          <ArrowLeft size={20} />
          <span>Back to Sandboxes</span>
        </Link>
        <div className="launcher-title">
          <h1>⚡ Mini-Sandboxes</h1>
          <p>Quick 5-10 minute exercises to build real skills</p>
        </div>
      </header>

      {/* Filters */}
      <div className="launcher-filters">
        <div className="filter-group">
          <label><Filter size={14} /> Category</label>
          <div className="filter-buttons">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={selectedCategory === cat.id ? 'active' : ''}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Programme</label>
          <select 
            value={selectedProgramme}
            onChange={(e) => setSelectedProgramme(e.target.value)}
          >
            {programmes.map(prog => (
              <option key={prog} value={prog}>
                {prog === 'all' ? 'All Programmes' : prog}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="launcher-count">
        {filteredSandboxes.length} mini-sandbox{filteredSandboxes.length !== 1 ? 'es' : ''} available
      </div>

      {/* Sandbox Grid */}
      <div className="launcher-grid">
        {filteredSandboxes.map(sandbox => (
          <Link 
            key={sandbox.id}
            to={`/sandbox/mini/${sandbox.id}`}
            className="launcher-card"
            style={{ borderColor: sandbox.programmeColor }}
          >
            <div className="launcher-card-header">
              <span className="launcher-card-emoji">{sandbox.emoji}</span>
              <span 
                className="launcher-card-difficulty"
                style={{ color: getDifficultyColor(sandbox.difficulty) }}
              >
                {sandbox.difficulty}
              </span>
            </div>
            
            <h3 className="launcher-card-title">{sandbox.title}</h3>
            <p className="launcher-card-description">{sandbox.description}</p>
            
            <div className="launcher-card-meta">
              <span className="launcher-card-constraint">
                <Target size={12} />
                {sandbox.constraint}
              </span>
              <span className="launcher-card-time">
                <Clock size={12} />
                {sandbox.timeMinutes} min
              </span>
            </div>
            
            <div 
              className="launcher-card-programme"
              style={{ backgroundColor: `${sandbox.programmeColor}20`, color: sandbox.programmeColor }}
            >
              {sandbox.programme}
            </div>
          </Link>
        ))}
      </div>

      {/* Ecosystem Tip */}
      <div className="launcher-tip">
        <Zap size={20} />
        <div>
          <strong>Ecosystem Focus</strong>
          <p>
            These mini-sandboxes help you practice skills that connect to real local business needs. 
            Master the pitch, build the portfolio, then approach actual clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiniSandboxLauncher;

/* 
 * Additional styles for launcher (add to MiniSandbox.css or create separate file)
 */