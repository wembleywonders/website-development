import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Eye, Heart, MessageCircle, Share2, 
  Trophy, Clock, ArrowRight, Sparkles
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import './PlaceholderPages.css';

/**
 * Community Page
 * ==============
 * 
 * See what Passionistas are creating.
 * Gallery, current projects, recent victories.
 * Inspiration and connection.
 */

// Sample projects (replace with real data)
const CURRENT_PROJECTS = [
  {
    id: 1,
    title: "Starlight Express Pod Racing",
    description: "Drone championship with 70+ Passionistas across 8 teams. Engineering, design, media production.",
    status: "In Progress",
    progress: 65,
    teams: ["STEMgeneers", "G-Tech Casters", "Silk Stilettos", "TECHreneurs"],
    participants: 72,
    deadline: "March 2026",
    image: null,
    featured: true
  },
  {
    id: 2,
    title: "Caribbean Heritage Recipes Podcast",
    description: "8-part series documenting Wembley elders' food memories and family recipes.",
    status: "Recording",
    progress: 40,
    teams: ["G-Tech Casters", "Auntie's Kitchen"],
    participants: 12,
    deadline: "February 2025",
    image: null,
    featured: false
  },
  {
    id: 3,
    title: "Community Solar Charging Station",
    description: "Portable solar charging unit for community events. Engineering meets design meets business.",
    status: "Prototyping",
    progress: 30,
    teams: ["STEMgeneers", "Silk Stilettos", "TECHreneurs"],
    participants: 8,
    deadline: "April 2025",
    image: null,
    featured: false
  },
  {
    id: 4,
    title: "Miss Lou: Colonization in Reverse",
    description: "Staged reading with live music, exploring Louise Bennett-Coverley's poetry.",
    status: "Rehearsing",
    progress: 55,
    teams: ["Kaywana's Court", "Trubble n Bass"],
    participants: 18,
    deadline: "January 2025",
    image: null,
    featured: false
  },
];

const RECENT_WORK = [
  {
    id: 1,
    title: "Refurbished Gaming Rig",
    creator: "Marcus T.",
    pathway: "STEMgeneers",
    likes: 24,
    comments: 8,
    image: null,
    description: "Rebuilt from donated parts. Now runs Fortnite at 120fps."
  },
  {
    id: 2,
    title: "Grandmother's Pelau Recipe",
    creator: "Simone R.",
    pathway: "Auntie's Kitchen",
    likes: 45,
    comments: 12,
    image: null,
    description: "Family recipe from Trinidad, documented with three generations' variations."
  },
  {
    id: 3,
    title: "Podcast Intro Music",
    creator: "DJ Roots",
    pathway: "Trubble n Bass",
    likes: 31,
    comments: 5,
    image: null,
    description: "30-second intro for the Heritage Recipes podcast. Dub meets kitchen sounds."
  },
  {
    id: 4,
    title: "Speaker Box Design",
    creator: "Adaeze M.",
    pathway: "Silk Stilettos",
    likes: 38,
    comments: 14,
    image: null,
    description: "Exterior design for Uncle Winston's speaker box. Kente-inspired pattern."
  },
  {
    id: 5,
    title: "E-Bike Battery Diagnostic",
    creator: "Neville Workshop",
    pathway: "Scrap Cat",
    likes: 19,
    comments: 6,
    image: null,
    description: "Revived a 'dead' e-bike battery. Just needed cell balancing."
  },
  {
    id: 6,
    title: "Business Canvas: Repair Collective",
    creator: "Solomon Session",
    pathway: "TECHreneurs",
    likes: 22,
    comments: 9,
    image: null,
    description: "One-page model for a community tech repair cooperative."
  },
];

const PATHWAY_COLOURS: Record<string, string> = {
  'STEMgeneers': '#10b981',
  'TECHreneurs': '#8b5cf6',
  "Kaywana's Court": '#ef4444',
  'G-Tech Casters': '#3b82f6',
  'Trubble n Bass': '#ec4899',
  'Silk Stilettos': '#f59e0b',
  "Auntie's Kitchen": '#f97316',
  'Pageturners': '#6366f1',
  'Scrap Cat': '#14b8a6',
};

const CommunityPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | string>('all');

  const pathways = [...new Set(RECENT_WORK.map(w => w.pathway))];

  const filteredWork = filter === 'all' 
    ? RECENT_WORK 
    : RECENT_WORK.filter(w => w.pathway === filter);

  return (
    <PageTemplate
      pageTitle="Community"
      pageStrapline="See what Passionistas are creating — projects, gallery, and inspiration"
      pageType="community"
    >
      <div className="placeholder-page community-page">
        
        {/* Header */}
        <header className="page-header">
          <div className="header-icon">
            <Users size={48} />
          </div>
          <h1>Community</h1>
          <p>
            See what's happening. Current projects, recent work, and the people 
            behind it all. Get inspired. Find collaborators.
          </p>
        </header>

        {/* Current Projects */}
        <section className="content-section">
          <h2>
            <Trophy size={24} />
            Current Projects
          </h2>
          <p className="section-intro">
            Live collaborations happening right now. Some need more hands.
          </p>

          <div className="projects-grid">
            {CURRENT_PROJECTS.map(project => (
              <div 
                key={project.id} 
                className={`project-card ${project.featured ? 'featured' : ''}`}
              >
                {project.featured && (
                  <div className="featured-badge">
                    <Sparkles size={14} />
                    Featured Project
                  </div>
                )}
                
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-teams">
                  {project.teams.slice(0, 3).map(team => (
                    <span 
                      key={team} 
                      className="team-tag"
                      style={{ backgroundColor: `${PATHWAY_COLOURS[team]}20`, color: PATHWAY_COLOURS[team] }}
                    >
                      {team}
                    </span>
                  ))}
                  {project.teams.length > 3 && (
                    <span className="team-more">+{project.teams.length - 3}</span>
                  )}
                </div>
                
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="progress-text">{project.progress}% complete</span>
                </div>
                
                <div className="project-meta">
                  <span>
                    <Users size={14} />
                    {project.participants} participants
                  </span>
                  <span>
                    <Clock size={14} />
                    Due {project.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Work Gallery */}
        <section className="content-section gallery-section">
          <h2>
            <Eye size={24} />
            Recent Work
          </h2>
          <p className="section-intro">
            What Passionistas have been making lately.
          </p>

          {/* Pathway Filter */}
          <div className="gallery-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            {pathways.map(pathway => (
              <button 
                key={pathway}
                className={`filter-btn ${filter === pathway ? 'active' : ''}`}
                onClick={() => setFilter(pathway)}
                style={{ 
                  '--filter-colour': PATHWAY_COLOURS[pathway] 
                } as React.CSSProperties}
              >
                {pathway}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredWork.map(work => (
              <div key={work.id} className="gallery-card">
                <div 
                  className="gallery-image"
                  style={{ backgroundColor: `${PATHWAY_COLOURS[work.pathway]}20` }}
                >
                  <span className="placeholder-icon">
                    {work.pathway === 'STEMgeneers' && '⚙️'}
                    {work.pathway === "Auntie's Kitchen" && '🍲'}
                    {work.pathway === 'Trubble n Bass' && '🎵'}
                    {work.pathway === 'Silk Stilettos' && '👠'}
                    {work.pathway === 'Scrap Cat' && '🔧'}
                    {work.pathway === 'TECHreneurs' && '💼'}
                  </span>
                </div>
                
                <div className="gallery-content">
                  <h3>{work.title}</h3>
                  <p className="gallery-description">{work.description}</p>
                  
                  <div className="gallery-creator">
                    <span className="creator-name">{work.creator}</span>
                    <span 
                      className="creator-pathway"
                      style={{ color: PATHWAY_COLOURS[work.pathway] }}
                    >
                      {work.pathway}
                    </span>
                  </div>
                  
                  <div className="gallery-actions">
                    <button className="action-btn">
                      <Heart size={16} />
                      <span>{work.likes}</span>
                    </button>
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      <span>{work.comments}</span>
                    </button>
                    <button className="action-btn">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <section className="page-cta">
          <Users size={32} />
          <h2>Want to Share Your Work?</h2>
          <p>
            Passionistas can post to the gallery, join projects, and find collaborators. 
            Your work deserves to be seen.
          </p>
          <div className="cta-buttons">
            <Link to="/membership" className="cta-btn primary">
              Become a Passionista
            </Link>
            <Link to="/workshops/spark-generator" className="cta-btn secondary">
              Start Creating
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default CommunityPage;