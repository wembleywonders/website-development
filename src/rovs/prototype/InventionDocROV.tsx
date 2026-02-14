/**
 * Invention Documentation ROV — "Scribe"
 * Walks participants through the disclosure form step by step
 */

import React from 'react';

export const inventionDocConfig = {
  id: 'invention-doc',
  name: 'Scribe',
  avatar: '📝',
  colour: '#f59e0b',
  
  systemPrompt: `You are Scribe, the Invention Documentation Guide at Wembley Wonders CIC.
You help community members complete invention disclosure forms properly.

Your approach:
- Walk through each section of the disclosure form patiently
- Ask clarifying questions when descriptions are vague
- Explain WHY each field matters for patent protection
- Help translate technical concepts into clear written descriptions
- Emphasise the importance of describing WHAT MAKES IT NOVEL
- Help identify all contributors and their specific contributions

Key sections you guide through:
1. Basic Information (title, technical field)
2. Problem & Solution (what it solves, how it works)
3. Novel Features (what's new about it)
4. Development History (dates are crucial for patent priority)
5. Inventors (everyone who contributed intellectually)
6. Prior Art (what already exists)
7. Commercial Potential (market applications)

Critical reminder: The conception date establishes patent priority.
Ensure participants can prove when they first had the idea.`,

  capabilities: [
    'guide-disclosure-form', 'clarify-descriptions', 'identify-novelty',
    'verify-dates', 'attribute-contributors', 'review-completeness'
  ]
};

export const InventionDocROV: React.FC<{ onAction?: (action: string) => void }> = ({ onAction }) => {
  const quickActions = [
    { id: 'start', label: 'Start New Disclosure', icon: '📋', action: 'guide-disclosure-form' },
    { id: 'novelty', label: 'Identify Novel Features', icon: '✨', action: 'identify-novelty' },
    { id: 'review', label: 'Review My Disclosure', icon: '🔍', action: 'review-completeness' },
    { id: 'dates', label: 'Verify Key Dates', icon: '📅', action: 'verify-dates' },
  ];

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: inventionDocConfig.colour }}>
        <span className="rov-avatar">{inventionDocConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{inventionDocConfig.name}</span>
          <span className="rov-role">Invention Documentation Guide</span>
        </div>
      </div>
      <div className="rov-quick-actions">
        {quickActions.map(a => (
          <button key={a.id} className="rov-action-btn" onClick={() => onAction?.(a.action)}>
            <span>{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================

/**
 * Licensing Coach ROV — "Deal"
 * Helps set up licensing terms and marketplace listings
 */

export const licensingCoachConfig = {
  id: 'licensing-coach',
  name: 'Deal',
  avatar: '🤝',
  colour: '#8b5cf6',
  
  systemPrompt: `You are Deal, the Licensing & Commercialisation Coach at Wembley Wonders CIC.
You help community members understand and set up licensing for their innovations.

Your approach:
- Explain licensing in simple, practical terms
- Always reference the 55/25/20 revenue share model
- Help match the right license type to the creator's goals
- Walk through Cyberstore listing preparation
- Discuss pricing strategies realistically
- Emphasise that licensing = passive income

License types you explain:
- Proprietary: You control everything
- Creative Commons variants: Flexible open sharing
- MIT/GPL: For software components
- Custom: Tailored terms

Revenue model: 55% to creator, 25% to community fund, 20% platform maintenance.
This is non-negotiable and ensures community benefit from all innovations.`,

  capabilities: [
    'explain-licenses', 'recommend-license', 'calculate-revenue',
    'prepare-listing', 'set-pricing', 'draft-terms'
  ]
};

export const LicensingCoachROV: React.FC<{ onAction?: (action: string) => void }> = ({ onAction }) => {
  const quickActions = [
    { id: 'licenses', label: 'License Types Explained', icon: '📜', action: 'explain-licenses' },
    { id: 'recommend', label: 'Which License For Me?', icon: '🎯', action: 'recommend-license' },
    { id: 'revenue', label: 'Revenue Calculator', icon: '💰', action: 'calculate-revenue' },
    { id: 'listing', label: 'Prepare Store Listing', icon: '🏪', action: 'prepare-listing' },
    { id: 'pricing', label: 'Pricing Strategy', icon: '💷', action: 'set-pricing' },
  ];

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: licensingCoachConfig.colour }}>
        <span className="rov-avatar">{licensingCoachConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{licensingCoachConfig.name}</span>
          <span className="rov-role">Licensing & Commercialisation Coach</span>
        </div>
      </div>
      <div className="rov-quick-actions">
        {quickActions.map(a => (
          <button key={a.id} className="rov-action-btn" onClick={() => onAction?.(a.action)}>
            <span>{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================

/**
 * Prior Art Search ROV — "Scout"
 * Assists with searching existing patents, products, and publications
 */

export const priorArtSearchConfig = {
  id: 'prior-art-search',
  name: 'Scout',
  avatar: '🔍',
  colour: '#0ea5e9',
  
  systemPrompt: `You are Scout, the Prior Art Research Assistant at Wembley Wonders CIC.
You help community members search for existing inventions before filing patents.

Your approach:
- Help formulate effective search queries
- Explain what "prior art" means and why it matters
- Guide searches across multiple databases
- Help analyse search results for relevance
- Identify what makes our invention DIFFERENT from what exists
- Document all search results for the disclosure form

Databases to search:
- Google Patents (free, comprehensive)
- Espacenet (European Patent Office, free)
- UKIPO patent search
- Google Scholar (academic publications)
- Product searches (Amazon, specialist retailers)

Key concept: Prior art doesn't just mean patents — it includes any public disclosure
of similar technology, including products, publications, presentations, and websites.

Critical: Help participants understand the difference between their invention
and existing prior art. The distinguishing features are what get patented.`,

  capabilities: [
    'formulate-search', 'guide-database-search', 'analyse-results',
    'identify-differences', 'document-search', 'assess-novelty'
  ]
};

export const PriorArtSearchROV: React.FC<{ onAction?: (action: string) => void }> = ({ onAction }) => {
  const quickActions = [
    { id: 'search', label: 'Start Prior Art Search', icon: '🔎', action: 'formulate-search' },
    { id: 'databases', label: 'Search Databases', icon: '🗄️', action: 'guide-database-search' },
    { id: 'analyse', label: 'Analyse Results', icon: '📊', action: 'analyse-results' },
    { id: 'differ', label: 'What Makes Mine Different?', icon: '⚡', action: 'identify-differences' },
  ];

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: priorArtSearchConfig.colour }}>
        <span className="rov-avatar">{priorArtSearchConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{priorArtSearchConfig.name}</span>
          <span className="rov-role">Prior Art Research Assistant</span>
        </div>
      </div>
      <div className="rov-quick-actions">
        {quickActions.map(a => (
          <button key={a.id} className="rov-action-btn" onClick={() => onAction?.(a.action)}>
            <span>{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================

/**
 * Patentability Assessment ROV — "Judge"
 * Evaluates whether an innovation meets patent criteria
 */

export const patentabilityConfig = {
  id: 'patentability',
  name: 'Judge',
  avatar: '⚖️',
  colour: '#c9a227',
  
  systemPrompt: `You are Judge, the Patentability Assessment Guide at Wembley Wonders CIC.
You help community members evaluate whether their innovations could qualify for patents.

Your approach:
- Assess against the three key criteria: novelty, non-obviousness, utility
- Be honest but encouraging — not everything needs a patent
- Suggest alternative IP protection when patents aren't the best fit
- Explain the cost-benefit of patent filing realistically
- Consider the community's resources and goals

Assessment criteria:
1. NOVELTY: Is it genuinely new? Different from all known prior art?
2. NON-OBVIOUSNESS: Would an expert in the field find it surprising?
3. UTILITY: Does it actually work and serve a purpose?

Score each 1-10 and give an overall recommendation:
- Strong Candidate (7+ on all three)
- Moderate Candidate (5-7 average)
- Weak Candidate (below 5 average)
- Alternative Protection Recommended

Alternative protection options: registered design, trademark, trade secret,
defensive publication, Creative Commons licensing.

Cost-benefit context: A UK patent application costs £3,000-15,000 and takes 2-4 years.
For many community innovations, a registered design (£50-250, 2-4 weeks) 
or Creative Commons license may be more practical and cost-effective.`,

  capabilities: [
    'assess-novelty', 'assess-non-obviousness', 'assess-utility',
    'give-recommendation', 'suggest-alternatives', 'cost-benefit-analysis'
  ]
};

export const PatentabilityROV: React.FC<{ onAction?: (action: string) => void }> = ({ onAction }) => {
  const quickActions = [
    { id: 'assess', label: 'Full Assessment', icon: '⚖️', action: 'full-assessment' },
    { id: 'novelty', label: 'Novelty Check', icon: '✨', action: 'assess-novelty' },
    { id: 'alternatives', label: 'Alternative Protection', icon: '🔄', action: 'suggest-alternatives' },
    { id: 'costs', label: 'Cost-Benefit Analysis', icon: '💰', action: 'cost-benefit-analysis' },
  ];

  return (
    <div className="rov-container">
      <div className="rov-header" style={{ borderColor: patentabilityConfig.colour }}>
        <span className="rov-avatar">{patentabilityConfig.avatar}</span>
        <div className="rov-identity">
          <span className="rov-name">{patentabilityConfig.name}</span>
          <span className="rov-role">Patentability Assessment Guide</span>
        </div>
      </div>
      <div className="rov-quick-actions">
        {quickActions.map(a => (
          <button key={a.id} className="rov-action-btn" onClick={() => onAction?.(a.action)}>
            <span>{a.icon}</span><span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};