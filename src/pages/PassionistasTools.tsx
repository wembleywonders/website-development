import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, Mic, PenTool, Calculator, UtensilsCrossed, 
  Music, Palette, Video, BookOpen, Lightbulb, Heart,
  Search, Filter, Zap, Clock, Users, Star
} from 'lucide-react';
import './PassionistasTools.css';

/**
 * Passionistas Tools Hub
 * ======================
 * 
 * All sandboxes in one place. No programme selection required.
 * Tools grouped by what you want to DO, not which team you're on.
 * 
 * Philosophy: Try first, commit later.
 */

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  path: string;
  timeEstimate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usedBy: string[]; // Which programmes use this
  popular?: boolean;
  new?: boolean;
}

type ToolCategory = 
  | 'diagnose-fix'      // Repair & troubleshooting
  | 'calculate-plan'    // Business & money
  | 'write-create'      // Writing & storytelling
  | 'design-make'       // Visual & physical creation
  | 'record-produce'    // Audio & video
  | 'preserve-share';   // Heritage & community

const CATEGORIES: Record<ToolCategory, { label: string; icon: React.ReactNode; colour: string }> = {
  'diagnose-fix': { 
    label: 'Diagnose & Fix', 
    icon: <Wrench size={20} />, 
    colour: '#10b981' 
  },
  'calculate-plan': { 
    label: 'Calculate & Plan', 
    icon: <Calculator size={20} />, 
    colour: '#8b5cf6' 
  },
  'write-create': { 
    label: 'Write & Create', 
    icon: <PenTool size={20} />, 
    colour: '#f59e0b' 
  },
  'design-make': { 
    label: 'Design & Make', 
    icon: <Palette size={20} />, 
    colour: '#ec4899' 
  },
  'record-produce': { 
    label: 'Record & Produce', 
    icon: <Mic size={20} />, 
    colour: '#3b82f6' 
  },
  'preserve-share': { 
    label: 'Preserve & Share', 
    icon: <Heart size={20} />, 
    colour: '#f97316' 
  },
};

const TOOLS: Tool[] = [
  // DIAGNOSE & FIX
  {
    id: 'diagnostic-trainer',
    name: 'Diagnostic Trainer',
    description: 'Practice troubleshooting phones, e-bikes, and PCs. Learn to identify problems before ordering parts.',
    icon: '🔧',
    category: 'diagnose-fix',
    path: '/tools/diagnostic-trainer',
    timeEstimate: '10-15 mins',
    difficulty: 'beginner',
    usedBy: ['STEMgeneers', 'Scrap Cat'],
    popular: true
  },
  {
    id: 'repair-checklist',
    name: 'Repair Checklist Generator',
    description: 'Generate step-by-step repair guides for common devices. Print or save to phone.',
    icon: '📋',
    category: 'diagnose-fix',
    path: '/tools/repair-checklist',
    timeEstimate: '5 mins',
    difficulty: 'beginner',
    usedBy: ['STEMgeneers', 'Scrap Cat']
  },
  
  // CALCULATE & PLAN
  {
    id: 'pricing-calculator',
    name: 'Service Pricing Calculator',
    description: 'Calculate fair rates for repairs, setups, and tech services. Based on London market research.',
    icon: '💷',
    category: 'calculate-plan',
    path: '/tools/pricing-calculator',
    timeEstimate: '10 mins',
    difficulty: 'beginner',
    usedBy: ['STEMgeneers', 'TECHreneurs'],
    popular: true
  },
  {
    id: 'collective-calculator',
    name: 'Pardner Calculator',
    description: 'Model equipment collectives and pardner-style savings. See how pooling resources multiplies access.',
    icon: '🤝',
    category: 'calculate-plan',
    path: '/tools/collective-calculator',
    timeEstimate: '10 mins',
    difficulty: 'beginner',
    usedBy: ['STEMgeneers', 'TECHreneurs']
  },
  {
    id: 'income-mapper',
    name: 'Income Stream Mapper',
    description: 'Map your skills to earning opportunities. See how multiple small streams become sustainable income.',
    icon: '💰',
    category: 'calculate-plan',
    path: '/tools/income-mapper',
    timeEstimate: '15 mins',
    difficulty: 'intermediate',
    usedBy: ['TECHreneurs', 'All programmes'],
    new: true
  },
  {
    id: 'business-canvas',
    name: 'Quick Business Canvas',
    description: 'One-page business model for your creative idea. No jargon, just clarity.',
    icon: '📊',
    category: 'calculate-plan',
    path: '/tools/business-canvas',
    timeEstimate: '20 mins',
    difficulty: 'intermediate',
    usedBy: ['TECHreneurs']
  },

  // WRITE & CREATE
  {
    id: 'script-builder',
    name: 'Radio Drama Script Builder',
    description: 'Write scripts with proper formatting, character tracking, and sound cues.',
    icon: '📝',
    category: 'write-create',
    path: '/tools/script-builder',
    timeEstimate: '30+ mins',
    difficulty: 'intermediate',
    usedBy: ['Kaywana\'s Court', 'G-Tech Casters', 'Rayd-yo'],
    popular: true
  },
  {
    id: 'character-creator',
    name: 'Character Creator',
    description: 'Build detailed characters for stories, scripts, and performances.',
    icon: '🎭',
    category: 'write-create',
    path: '/tools/character-creator',
    timeEstimate: '15 mins',
    difficulty: 'beginner',
    usedBy: ['Kaywana\'s Court', 'Pageturners']
  },
  {
    id: 'story-structure',
    name: 'Story Structure Helper',
    description: 'Map your story beats. Works for scripts, podcasts, and written stories.',
    icon: '📖',
    category: 'write-create',
    path: '/tools/story-structure',
    timeEstimate: '20 mins',
    difficulty: 'intermediate',
    usedBy: ['Pageturners', 'Kaywana\'s Court']
  },

  // DESIGN & MAKE
  {
    id: 'colour-palette',
    name: 'Colour Palette Generator',
    description: 'Create harmonious colour schemes for designs, brands, and products.',
    icon: '🎨',
    category: 'design-make',
    path: '/tools/colour-palette',
    timeEstimate: '5 mins',
    difficulty: 'beginner',
    usedBy: ['Silk Stilettos', 'G-Tech Casters']
  },
  {
    id: 'mood-board',
    name: 'Digital Mood Board',
    description: 'Collect and arrange visual inspiration for your projects.',
    icon: '🖼️',
    category: 'design-make',
    path: '/tools/mood-board',
    timeEstimate: '15 mins',
    difficulty: 'beginner',
    usedBy: ['Silk Stilettos', 'Kaywana\'s Court']
  },
  {
    id: 'measurement-converter',
    name: 'Maker\'s Measurement Tool',
    description: 'Convert between imperial/metric, scale patterns, calculate materials.',
    icon: '📐',
    category: 'design-make',
    path: '/tools/measurements',
    timeEstimate: '2 mins',
    difficulty: 'beginner',
    usedBy: ['Silk Stilettos', 'STEMgeneers']
  },

  // RECORD & PRODUCE
  {
    id: 'production-tech-sim',
    name: 'Production Tech Simulator',
    description: 'Practice sound mixing, lighting cues, and broadcast setup in a safe sandbox.',
    icon: '🎚️',
    category: 'record-produce',
    path: '/tools/production-sim',
    timeEstimate: '20 mins',
    difficulty: 'intermediate',
    usedBy: ['Kaywana\'s Court', 'Rayd-yo', 'G-Tech Casters'],
    popular: true
  },
  {
    id: 'beat-sketch',
    name: 'Beat Sketch Pad',
    description: 'Quick rhythm and melody sketching. Capture ideas before they fade.',
    icon: '🥁',
    category: 'record-produce',
    path: '/tools/beat-sketch',
    timeEstimate: '10 mins',
    difficulty: 'beginner',
    usedBy: ['Trubble n Bass']
  },
  {
    id: 'podcast-planner',
    name: 'Podcast Episode Planner',
    description: 'Structure your episodes, plan segments, time your content.',
    icon: '🎙️',
    category: 'record-produce',
    path: '/tools/podcast-planner',
    timeEstimate: '15 mins',
    difficulty: 'beginner',
    usedBy: ['G-Tech Casters', 'Rayd-yo']
  },
  {
    id: 'streaming-checklist',
    name: 'Streaming Setup Checklist',
    description: 'Pre-flight checklist for live streams. Never forget to unmute again.',
    icon: '📺',
    category: 'record-produce',
    path: '/tools/streaming-checklist',
    timeEstimate: '5 mins',
    difficulty: 'beginner',
    usedBy: ['G-Tech Casters', 'Joystick']
  },

  // PRESERVE & SHARE
  {
    id: 'recipe-keeper',
    name: 'Recipe Heritage Keeper',
    description: 'Record family recipes with stories, measurements, and variations. Preserve culinary heritage.',
    icon: '🍲',
    category: 'preserve-share',
    path: '/tools/recipe-keeper',
    timeEstimate: '20 mins',
    difficulty: 'beginner',
    usedBy: ['Auntie Anansi\'s Kitchen'],
    popular: true
  },
  {
    id: 'oral-history',
    name: 'Oral History Guide',
    description: 'Interview prompts and recording tips for capturing family and community stories.',
    icon: '🎤',
    category: 'preserve-share',
    path: '/tools/oral-history',
    timeEstimate: '15 mins',
    difficulty: 'beginner',
    usedBy: ['Pageturners', 'G-Tech Casters']
  },
  {
    id: 'heritage-language',
    name: 'Heritage Language Glossary',
    description: 'Build and share glossaries of heritage words, phrases, and expressions.',
    icon: '🗣️',
    category: 'preserve-share',
    path: '/tools/heritage-language',
    timeEstimate: '10 mins',
    difficulty: 'beginner',
    usedBy: ['Auntie Anansi\'s Kitchen', 'Pageturners'],
    new: true
  },
];

export const PassionistasTools: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filter tools
  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = searchQuery === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    
    const matchesDifficulty = selectedDifficulty === 'all' || tool.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Get popular tools for quick access
  const popularTools = TOOLS.filter(t => t.popular);

  return (
    <div className="passionistas-tools">
      
      {/* Header */}
      <header className="tools-header">
        <div className="header-content">
          <h1>
            <Zap className="header-icon" />
            Passionistas Toolbox
          </h1>
          <p className="header-subtitle">
            All the creative tools in one place. No programme selection needed. 
            Just pick what you want to do and start.
          </p>
        </div>
      </header>

      {/* Quick Access - Popular Tools */}
      <section className="quick-access">
        <h2>
          <Star className="section-icon" />
          Quick Start — Most Popular
        </h2>
        <div className="popular-grid">
          {popularTools.map(tool => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className="popular-card"
            >
              <span className="popular-icon">{tool.icon}</span>
              <div className="popular-info">
                <h3>{tool.name}</h3>
                <span className="popular-time">
                  <Clock size={14} />
                  {tool.timeEstimate}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="tools-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>
            <Filter size={16} />
            Category:
          </label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ToolCategory | 'all')}
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="category-nav">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Tools
        </button>
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
            style={{ 
              '--cat-colour': cat.colour,
              borderColor: selectedCategory === key ? cat.colour : undefined,
              backgroundColor: selectedCategory === key ? `${cat.colour}15` : undefined
            } as React.CSSProperties}
            onClick={() => setSelectedCategory(key as ToolCategory)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </section>

      {/* Tools Grid */}
      <section className="tools-grid-section">
        {filteredTools.length === 0 ? (
          <div className="no-results">
            <p>No tools match your search. Try different keywords or clear filters.</p>
            <button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="tools-grid">
            {filteredTools.map(tool => {
              const category = CATEGORIES[tool.category];
              return (
                <Link 
                  key={tool.id}
                  to={tool.path}
                  className="tool-card"
                  style={{ '--tool-colour': category.colour } as React.CSSProperties}
                >
                  {/* Badges */}
                  <div className="tool-badges">
                    {tool.new && <span className="badge new">New</span>}
                    {tool.popular && <span className="badge popular">Popular</span>}
                  </div>

                  {/* Icon */}
                  <div className="tool-icon">{tool.icon}</div>

                  {/* Content */}
                  <div className="tool-content">
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="tool-meta">
                    <span className="meta-time">
                      <Clock size={14} />
                      {tool.timeEstimate}
                    </span>
                    <span className={`meta-difficulty ${tool.difficulty}`}>
                      {tool.difficulty}
                    </span>
                  </div>

                  {/* Used By */}
                  <div className="tool-teams">
                    <Users size={14} />
                    <span>{tool.usedBy.slice(0, 2).join(', ')}</span>
                    {tool.usedBy.length > 2 && <span className="more">+{tool.usedBy.length - 2}</span>}
                  </div>

                  {/* Category indicator */}
                  <div 
                    className="tool-category-bar"
                    style={{ backgroundColor: category.colour }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Help Section */}
      <section className="tools-help">
        <div className="help-card">
          <Lightbulb size={32} />
          <h3>Not sure where to start?</h3>
          <p>
            Try the <strong>Diagnostic Trainer</strong> if you like fixing things, 
            or the <strong>Recipe Keeper</strong> if you want to preserve family heritage. 
            Every tool works standalone—no prior knowledge needed.
          </p>
        </div>
        <div className="help-card">
          <Users size={32} />
          <h3>Ready for more?</h3>
          <p>
            Once you've explored the tools, consider joining Passionistas to connect 
            with collaborators and work on real projects together.
          </p>
          <Link to="/membership" className="help-link">
            Learn about membership →
          </Link>
        </div>
      </section>

    </div>
  );
};
