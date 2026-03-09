// src/pages/SandboxIndex.tsx
// Sandbox landing page - grid of all programme sandboxes
// "Try before you commit. No signup required."

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Search
} from 'lucide-react';
import './SandboxIndex.css';

// ============================================
// TYPE DEFINITIONS
// ============================================

type SandboxStatus = 'available' | 'coming-soon';

interface ProgrammeSandbox {
  id: string;
  name: string;
  emoji: string;
  color: string;
  tagline: string;
  sandboxName: string;
  sandboxDescription: string;
  status: SandboxStatus;
  path: string;
  estimatedTime?: string;
  features?: string[];
}

// ============================================
// DATA
// ============================================

const PROGRAMME_SANDBOXES: ProgrammeSandbox[] = [
  {
    id: 'bright-sparks',
    name: 'Bright Sparks',
    emoji: '✨',
    color: '#fbbf24',
    tagline: 'Not sure where you fit? Start here.',
    sandboxName: 'Discovery Journey',
    sandboxDescription: 'Try mini-challenges from each programme to find your path',
    status: 'available',
    path: '/programmes/bright-sparks/sandbox',
    estimatedTime: '45 min',
    features: ['8 mini-challenges', 'Programme matcher', 'Strengths finder']
  },
  {
    id: 'g-tech-casters',
    name: 'G-Tech Casters',
    emoji: '🎙️',
    color: '#e63946',
    tagline: 'Voice. Direct. Broadcast.',
    sandboxName: 'Podcast Planner',
    sandboxDescription: 'Plan your first episode with structure templates and talking points',
    status: 'available',
    path: '/programmes/gtechcasters/sandbox',
    estimatedTime: '15 min',
    features: ['Episode templates', 'Segment planner', 'Show notes generator']
  },
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    emoji: '🎭',
    color: '#9d4edd',
    tagline: 'Stories. Stage. Screen.',
    sandboxName: 'Character Workshop',
    sandboxDescription: 'Build a character from scratch with Caribbean storytelling traditions',
    status: 'available',
    path: '/programmes/kaywanas-court/sandbox',
    estimatedTime: '20 min',
    features: ['Character builder', 'Scene generator', 'Dialect guide']
  },
  {
    id: 'stemgeneers',
    name: 'STEMgeneers',
    emoji: '⚡',
    color: '#2a9d8f',
    tagline: 'Make. Build. Innovate.',
    sandboxName: 'Circuit Playground',
    sandboxDescription: 'Design and simulate basic circuits without any hardware',
    status: 'available',
    path: '/programmes/stemgeneers/sandbox',
    estimatedTime: '25 min',
    features: ['Circuit builder', 'Component library', 'Simulation mode']
  },
  {
    id: 'techreneurs',
    name: 'TECHreneurs',
    emoji: '💻',
    color: '#e9c46a',
    tagline: 'Turn creativity into income.',
    sandboxName: 'Business Canvas',
    sandboxDescription: 'Map your creative business idea to real income streams',
    status: 'available',
    path: '/programmes/techreneurs/sandbox',
    estimatedTime: '30 min',
    features: ['Revenue calculator', 'Pricing helper', 'Launch checklist']
  },
  {
    id: 'pageturners',
    name: 'Pageturners',
    emoji: '✍️',
    color: '#f4a261',
    tagline: 'Words. Stories. Worlds.',
    sandboxName: 'Story Starter',
    sandboxDescription: 'Overcome writers block with prompts and structure tools',
    status: 'available',
    path: '/programmes/pageturners/sandbox',
    estimatedTime: '15 min',
    features: ['Writing prompts', 'Story structure', 'Character cards']
  },
  {
    id: 'silk-stilettos',
    name: 'Silk Stilettos',
    emoji: '🎨',
    color: '#ff006e',
    tagline: 'Style. Confidence. Expression.',
    sandboxName: 'Creative Pathways Planner',
    sandboxDescription: 'Map your creative interests to real earning pathways',
    status: 'available',
    path: '/programmes/silk-stilettos/sandbox',
    estimatedTime: '25 min',
    features: ['Interest explorer', 'Pathway mapper', '6-month plan']
  },
  {
    id: 'trubble-n-bass',
    name: 'Trubble n Bass',
    emoji: '🎵',
    color: '#8338ec',
    tagline: 'Decks. DAW. Drop.',
    sandboxName: 'Beat Lab',
    sandboxDescription: 'Build your first beat with loops, samples, and basic mixing',
    status: 'available',
    path: '/programmes/trubble-n-bass/sandbox',
    estimatedTime: '20 min',
    features: ['Loop library', 'Beat sequencer', 'Mix basics']
  },
  {
    id: 'auntie-anansis-kitchen',
    name: "Auntie Anansi's Kitchen",
    emoji: '🍲',
    color: '#d62828',
    tagline: 'Culture. Food. Heritage.',
    sandboxName: 'Recipe Heritage Keeper',
    sandboxDescription: 'Document family recipes with stories, techniques, and heritage context',
    status: 'available',
    path: '/programmes/auntie-anansis-kitchen/sandbox',
    estimatedTime: '20 min',
    features: ['Recipe builder', 'Heritage stories', 'Technique videos']
  },
  {
    id: 'easy-street',
    name: 'Easy Street',
    emoji: '📻',
    color: '#06b6d4',
    tagline: 'Radio Drama. Community Storytelling.',
    sandboxName: 'Drama Studio',
    sandboxDescription: 'Write and produce a short radio drama scene with character and sound direction',
    status: 'available',
    path: '/programmes/easy-street/sandbox',
    estimatedTime: '20 min',
    features: ['Scene builder', 'Character voices', 'Sound direction cues']
  },
  {
    id: 'roots',
    name: 'Roots',
    emoji: '🌿',
    color: '#059669',
    tagline: 'Body Sovereignty. Knowledge Archive.',
    sandboxName: 'Heritage Knowledge Builder',
    sandboxDescription: 'Document and certify a piece of personal or community knowledge for the counter-archive',
    status: 'available',
    path: '/programmes/roots/sandbox',
    estimatedTime: '15 min',
    features: ['Knowledge entry form', 'Provenance tagging', 'Counter-archive preview']
  },
  {
    id: 'scrap-cat',
    name: 'Scrap Cat',
    emoji: '♻️',
    color: '#06d6a0',
    tagline: 'Waste. Wonder. Worth.',
    sandboxName: 'Device Diagnostic Tool',
    sandboxDescription: 'Learn troubleshooting logic before touching real devices',
    status: 'available',
    path: '/programmes/scrap-cat/sandbox',
    estimatedTime: '15 min',
    features: ['Diagnostic trees', 'Repair guides', 'Tool lists']
  }
];

// ============================================
// COMPONENT
// ============================================

const SandboxIndex: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'available' | 'coming-soon'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSandboxes = PROGRAMME_SANDBOXES.filter(sandbox => {
    const matchesFilter = filter === 'all' || sandbox.status === filter;
    const matchesSearch = 
      sandbox.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sandbox.sandboxName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sandbox.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const availableCount = PROGRAMME_SANDBOXES.filter(s => s.status === 'available').length;
  const comingSoonCount = PROGRAMME_SANDBOXES.filter(s => s.status === 'coming-soon').length;

  return (
    <div className="sandbox-index">
      {/* Hero Section */}
      <section className="sandbox-index__hero">
        <div className="sandbox-index__hero-content">
          <div className="sandbox-index__badge">
            <Sparkles size={16} />
            <span>No signup required</span>
          </div>
          
          <h1 className="sandbox-index__title">Try Before You Commit</h1>
          
          <p className="sandbox-index__subtitle">
            Every programme has a free sandbox. Get hands-on experience with real tools 
            before deciding if it's for you. No account needed.
          </p>

          <div className="sandbox-index__stats">
            <div className="sandbox-index__stat">
              <span className="sandbox-index__stat-value">{availableCount}</span>
              <span className="sandbox-index__stat-label">Available Now</span>
            </div>
            <div className="sandbox-index__stat">
              <span className="sandbox-index__stat-value">{PROGRAMME_SANDBOXES.length}</span>
              <span className="sandbox-index__stat-label">Programmes</span>
            </div>
            <div className="sandbox-index__stat">
              <span className="sandbox-index__stat-value">Free</span>
              <span className="sandbox-index__stat-label">Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sandbox-index__controls">
        <div className="sandbox-index__container">
          <div className="sandbox-index__filters">
            <button
              className={`sandbox-index__filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({PROGRAMME_SANDBOXES.length})
            </button>
            <button
              className={`sandbox-index__filter-btn ${filter === 'available' ? 'active' : ''}`}
              onClick={() => setFilter('available')}
            >
              <Play size={14} />
              Available ({availableCount})
            </button>
            {comingSoonCount > 0 && (
              <button
                className={`sandbox-index__filter-btn ${filter === 'coming-soon' ? 'active' : ''}`}
                onClick={() => setFilter('coming-soon')}
              >
                <Clock size={14} />
                Coming Soon ({comingSoonCount})
              </button>
            )}
          </div>

          <div className="sandbox-index__search">
            <Search size={18} className="sandbox-index__search-icon" />
            <input
              type="text"
              placeholder="Search sandboxes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sandbox-index__search-input"
            />
          </div>
        </div>
      </section>

      {/* Sandbox Grid */}
      <section className="sandbox-index__grid-section">
        <div className="sandbox-index__container">
          <div className="sandbox-index__grid">
            {filteredSandboxes.map((sandbox) => (
              <article
                key={sandbox.id}
                className={`sandbox-card sandbox-card--${sandbox.status}`}
                style={{ '--programme-color': sandbox.color } as React.CSSProperties}
              >
                {/* Status Badge */}
                <div className={`sandbox-card__status sandbox-card__status--${sandbox.status}`}>
                  {sandbox.status === 'available' ? (
                    <>
                      <Play size={12} />
                      <span>Available</span>
                    </>
                  ) : (
                    <>
                      <Clock size={12} />
                      <span>Coming Soon</span>
                    </>
                  )}
                </div>

                {/* Programme Info */}
                <div className="sandbox-card__programme">
                  <span className="sandbox-card__emoji">{sandbox.emoji}</span>
                  <div className="sandbox-card__programme-info">
                    <h3 className="sandbox-card__programme-name">{sandbox.name}</h3>
                    <p className="sandbox-card__programme-tagline">{sandbox.tagline}</p>
                  </div>
                </div>

                {/* Sandbox Info */}
                <div className="sandbox-card__sandbox">
                  <h4 className="sandbox-card__sandbox-name">{sandbox.sandboxName}</h4>
                  <p className="sandbox-card__sandbox-description">{sandbox.sandboxDescription}</p>
                </div>

                {/* Features */}
                {sandbox.features && sandbox.features.length > 0 && (
                  <ul className="sandbox-card__features">
                    {sandbox.features.map((feature, i) => (
                      <li key={i} className="sandbox-card__feature">
                        <span className="sandbox-card__feature-dot" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer */}
                <div className="sandbox-card__footer">
                  {sandbox.estimatedTime && (
                    <span className="sandbox-card__time">
                      <Clock size={14} />
                      {sandbox.estimatedTime}
                    </span>
                  )}

                  {sandbox.status === 'available' ? (
                    <Link to={sandbox.path} className="sandbox-card__cta">
                      Try It
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <span className="sandbox-card__cta sandbox-card__cta--disabled">
                      Coming Soon
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredSandboxes.length === 0 && (
            <div className="sandbox-index__empty">
              <p>No sandboxes match your search.</p>
              <button onClick={() => { setFilter('all'); setSearchQuery(''); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="sandbox-index__bottom-cta">
        <div className="sandbox-index__container">
          <h2>Not sure where to start?</h2>
          <p>
            Try Bright Sparks — it samples all the programmes in mini-challenges 
            and recommends your best match.
          </p>
          <Link to="/programmes/bright-sparks/sandbox" className="sandbox-index__start-btn">
            <Sparkles size={20} />
            Start Discovery Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SandboxIndex;