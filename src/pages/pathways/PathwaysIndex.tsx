import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';
import './PathwaysIndex.css';

/**
 * Pathways Index
 * ==============
 * 
 * Overview of all pathways (formerly programmes).
 * Pathways are deeper journeys — you explore tools first in Passionistas,
 * then go deeper into specific pathways when ready.
 */

interface Pathway {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  colour: string;
  path: string;
  category: 'create' | 'build' | 'business' | 'foundation';
}

const PATHWAYS: Pathway[] = [
  // CREATE
  {
    id: 'kaywanas-court',
    name: "Kaywana's Court",
    tagline: "Theatre, radio drama, and live performance",
    icon: '🎭',
    colour: '#ef4444',
    path: '/pathways/kaywanas-court',
    category: 'create'
  },
  {
    id: 'trubble-n-bass',
    name: "Trubble n Bass",
    tagline: "Music production and sound",
    icon: '🎵',
    colour: '#ec4899',
    path: '/pathways/trubble-n-bass',
    category: 'create'
  },
  {
    id: 'silk-stilettos',
    name: "Silk Stilettos",
    tagline: "Fashion, design, and visual arts",
    icon: '👠',
    colour: '#f59e0b',
    path: '/pathways/silk-stilettos',
    category: 'create'
  },
  {
    id: 'pageturners',
    name: "Pageturners",
    tagline: "Writing, publishing, and storytelling",
    icon: '📖',
    colour: '#6366f1',
    path: '/pathways/pageturners',
    category: 'create'
  },
  {
    id: 'aunties-kitchen',
    name: "Auntie's Kitchen",
    tagline: "Culinary heritage and food culture",
    icon: '🍲',
    colour: '#f97316',
    path: '/pathways/aunties-kitchen',
    category: 'create'
  },

  // BUILD
  {
    id: 'stemgeneers',
    name: "STEMgeneers",
    tagline: "Repair economy: e-bikes, phones, tech",
    icon: '⚙️',
    colour: '#10b981',
    path: '/pathways/stemgeneers',
    category: 'build'
  },
  {
    id: 'scrap-cat',
    name: "Scrap Cat",
    tagline: "Repair skills on donated equipment",
    icon: '🔧',
    colour: '#14b8a6',
    path: '/pathways/scrap-cat',
    category: 'build'
  },
  {
    id: 'gtech-casters',
    name: "G-Tech Casters",
    tagline: "Streaming, podcasting, and content",
    icon: '🎙️',
    colour: '#3b82f6',
    path: '/pathways/gtech-casters',
    category: 'build'
  },
  {
    id: 'raydyo',
    name: "Rayd-yo",
    tagline: "Community radio and broadcast",
    icon: '📻',
    colour: '#8b5cf6',
    path: '/pathways/raydyo',
    category: 'build'
  },
  {
    id: 'joystick',
    name: "Joystick",
    tagline: "Gaming content and esports",
    icon: '🎮',
    colour: '#6366f1',
    path: '/pathways/joystick',
    category: 'build'
  },

  // BUSINESS
  {
    id: 'techreneurs',
    name: "TECHreneurs",
    tagline: "Business strategy and entrepreneurship",
    icon: '💼',
    colour: '#8b5cf6',
    path: '/pathways/techreneurs',
    category: 'business'
  },
  {
    id: 'money-reset',
    name: "Money Reset",
    tagline: "Financial foundations and wealth building",
    icon: '💰',
    colour: '#059669',
    path: '/pathways/money-reset',
    category: 'business'
  },
];

const CATEGORIES = [
  { id: 'create', label: 'Create', description: 'Performance, writing, design, food' },
  { id: 'build', label: 'Build', description: 'Tech, repair, media production' },
  { id: 'business', label: 'Business', description: 'Strategy, finance, entrepreneurship' },
];

const PathwaysIndex: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Pathways"
      pageStrapline="Deeper journeys for when you're ready to specialise"
      pageType="programmes"
    >
      <div className="pathways-index">
        
        {/* Header */}
        <header className="pathways-header">
          <div className="header-icon">
            <Compass size={48} />
          </div>
          <h1>Choose Your Pathway</h1>
          <p>
            Pathways are deeper journeys. Start with <Link to="/workshops/spark-generator">tools</Link> to 
            explore freely, then go deeper into specific pathways when you find what 
            excites you.
          </p>
        </header>

        {/* Quick Access to Tools */}
        <div className="tools-reminder">
          <span className="reminder-icon">⚡</span>
          <div className="reminder-content">
            <strong>Not sure yet?</strong>
            <span>Try our tools first — no commitment, just exploration.</span>
          </div>
          <Link to="/workshops/spark-generator" className="reminder-link">
            Explore Tools →
          </Link>
        </div>

        {/* Pathways by Category */}
        {CATEGORIES.map(category => {
          const pathways = PATHWAYS.filter(p => p.category === category.id);
          
          return (
            <section key={category.id} className="pathways-category">
              <div className="category-header">
                <h2>{category.label}</h2>
                <p>{category.description}</p>
              </div>
              
              <div className="pathways-grid">
                {pathways.map(pathway => (
                  <Link 
                    key={pathway.id}
                    to={pathway.path}
                    className="pathway-card"
                    style={{ '--pathway-colour': pathway.colour } as React.CSSProperties}
                  >
                    <span className="pathway-icon">{pathway.icon}</span>
                    <div className="pathway-content">
                      <h3>{pathway.name}</h3>
                      <p>{pathway.tagline}</p>
                    </div>
                    <ArrowRight className="pathway-arrow" size={20} />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Skills Escalator */}
        <section className="escalator-section">
          <h2>The Skills Escalator</h2>
          <p className="section-intro">
            You don't have to pick just one. Skills transfer across pathways.
          </p>
          
          <div className="escalator-diagram">
            <div className="escalator-step">
              <div className="step-marker">1</div>
              <div className="step-content">
                <h3>Explore</h3>
                <p>Try tools, join sessions, see what clicks</p>
                <Link to="/workshops/spark-generator">Start here →</Link>
              </div>
            </div>
            <div className="escalator-arrow">→</div>
            <div className="escalator-step">
              <div className="step-marker">2</div>
              <div className="step-content">
                <h3>Build Foundations</h3>
                <p>Scrap Cat for repair, Money Reset for finance</p>
                <span className="step-note">Skills that earn</span>
              </div>
            </div>
            <div className="escalator-arrow">→</div>
            <div className="escalator-step">
              <div className="step-marker">3</div>
              <div className="step-content">
                <h3>Follow Your Passion</h3>
                <p>Theatre, music, design, writing, food</p>
                <span className="step-note">Creative pathways</span>
              </div>
            </div>
            <div className="escalator-arrow">→</div>
            <div className="escalator-step">
              <div className="step-marker">4</div>
              <div className="step-content">
                <h3>Cross-Pollinate</h3>
                <p>Use tech skills for theatre, business skills for art</p>
                <span className="step-note">Multi-skilled creator</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pathways-cta">
          <h2>Ready to Begin?</h2>
          <p>
            Join Passionistas for full access to all pathways, tools, sessions, 
            and the community that makes it all work.
          </p>
          <div className="cta-buttons">
            <Link to="/membership" className="cta-btn primary">
              Become a Passionista
            </Link>
            <Link to="/workshops/spark-generator" className="cta-btn secondary">
              Try Tools Free
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default PathwaysIndex;