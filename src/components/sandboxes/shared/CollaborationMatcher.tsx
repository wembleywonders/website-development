// src/components/sandboxes/shared/CollaborationMatcher.tsx
import React, { useState } from 'react';
import styles from './CollaborationMatcher.module.css';

// ========================================
// TYPES
// ========================================

export type ProgrammeType = 
  | 'stemgeneers'
  | 'techreneurs' 
  | 'gtechcasters'
  | 'kaywanas-court'
  | 'pageturners'
  | 'trubble-n-bass'
  | 'silk-stilettos'
  | 'auntie-anansis-kitchen'
  | 'bright-sparks'
  | 'scrap-cat';

export type ProjectComplexity = 'simple' | 'standard' | 'complex';

export interface CollaborationRole {
  programme: ProgrammeType;
  programmeName: string;
  role: string;
  contribution: string;
  contributionLevel: 'essential' | 'enhancement' | 'optional';
  valueAdd: number; // £ value
  skillsProvided: string[];
}

export interface CollaborationOutcome {
  scale: 'solo' | 'collaborative' | 'team';
  description: string;
  timeRequired: string;
  roles: CollaborationRole[];
  marketValue: number;
  yourEarnings: number;
  revenueSplit: {
    you: number;
    collaborators: number;
    overhead: number;
    community: number;
  };
  benefits: string[];
  examples: string[];
}

export interface CollaborationMatcherProps {
  // What the user is creating
  yourProgramme: ProgrammeType;
  projectType: string;
  projectDescription: string;
  
  // User's current skills/interests
  userSkills?: string[];
  
  // Callbacks
  onRequestCoordination?: (outcome: CollaborationOutcome) => void;
  onSelectOutcome?: (outcome: CollaborationOutcome) => void;
}

// ========================================
// PROGRAMME METADATA
// ========================================

const PROGRAMME_NAMES: Record<ProgrammeType, string> = {
  'stemgeneers': 'STEMgeneers',
  'techreneurs': 'TECHreneurs',
  'gtechcasters': 'G-Tech Casters',
  'kaywanas-court': "Kaywana's Court",
  'pageturners': 'Pageturners',
  'trubble-n-bass': 'Trubble n Bass',
  'silk-stilettos': 'Silk Stilettos',
  'auntie-anansis-kitchen': "Auntie Anansi's Kitchen",
  'bright-sparks': 'Bright Sparks',
  'scrap-cat': 'Scrap Cat',
};

// ========================================
// COLLABORATION LOGIC ENGINE
// ========================================

const calculateCollaborationOpportunities = (
  yourProgramme: ProgrammeType,
  projectType: string,
  projectDescription: string
): CollaborationOutcome[] => {
  const outcomes: CollaborationOutcome[] = [];
  
  // SOLO OUTCOME - Always available
  outcomes.push(generateSoloOutcome(yourProgramme, projectType));
  
  // COLLABORATIVE OUTCOME - Standard enhancement
  outcomes.push(generateCollaborativeOutcome(yourProgramme, projectType, projectDescription));
  
  // TEAM OUTCOME - Complex productions
  outcomes.push(generateTeamOutcome(yourProgramme, projectType, projectDescription));
  
  return outcomes;
};

// ========================================
// SOLO OUTCOME
// ========================================

const generateSoloOutcome = (
  programme: ProgrammeType,
  projectType: string
): CollaborationOutcome => {
  const baseValues: Record<ProgrammeType, number> = {
    'stemgeneers': 80,
    'techreneurs': 60,
    'gtechcasters': 70,
    'kaywanas-court': 75,
    'pageturners': 50,
    'trubble-n-bass': 90,
    'silk-stilettos': 85,
    'auntie-anansis-kitchen': 65,
    'bright-sparks': 70,
    'scrap-cat': 75,
  };

  return {
    scale: 'solo',
    description: 'You + ROV guidance = functional, personal-use creation',
    timeRequired: '3-6 hours',
    roles: [
      {
        programme,
        programmeName: PROGRAMME_NAMES[programme],
        role: 'Creator (You)',
        contribution: 'All creation, execution, and finishing',
        contributionLevel: 'essential',
        valueAdd: 0,
        skillsProvided: ['Core skill mastery', 'ROV-guided refinement'],
      }
    ],
    marketValue: baseValues[programme],
    yourEarnings: baseValues[programme] * 0.85, // 85% after equipment overhead
    revenueSplit: {
      you: 85,
      collaborators: 0,
      overhead: 15,
      community: 0,
    },
    benefits: [
      'Complete creative control',
      'Build portfolio independently',
      'Learn fundamentals thoroughly',
      'ROV guidance available 24/7',
    ],
    examples: getSoloExamples(programme),
  };
};

// ========================================
// COLLABORATIVE OUTCOME
// ========================================

const generateCollaborativeOutcome = (
  programme: ProgrammeType,
  projectType: string,
  projectDescription: string
): CollaborationOutcome => {
  const roles = getCollaborativeRoles(programme, projectType);
  
  const baseValue = 80;
  const collabValueAdd = roles.reduce((sum, role) => sum + role.valueAdd, 0);
  const totalMarketValue = baseValue + collabValueAdd;
  
  return {
    scale: 'collaborative',
    description: 'Your core skill + specialist enhancement = professional, market-ready product',
    timeRequired: '8-12 hours (your part: 4-6 hours)',
    roles: [
      {
        programme,
        programmeName: PROGRAMME_NAMES[programme],
        role: 'Lead Creator (You)',
        contribution: 'Core creation, primary execution',
        contributionLevel: 'essential',
        valueAdd: baseValue,
        skillsProvided: ['Domain expertise', 'Primary creation'],
      },
      ...roles
    ],
    marketValue: totalMarketValue,
    yourEarnings: totalMarketValue * 0.40, // 40% as lead creator
    revenueSplit: {
      you: 40,
      collaborators: 30,
      overhead: 20,
      community: 10,
    },
    benefits: [
      'Professional-grade output',
      'Learn from specialists',
      'Cross-skill exposure',
      'Higher market value',
      'Portfolio diversity',
    ],
    examples: getCollaborativeExamples(programme, projectType),
  };
};

// ========================================
// TEAM OUTCOME
// ========================================

const generateTeamOutcome = (
  programme: ProgrammeType,
  projectType: string,
  projectDescription: string
): CollaborationOutcome => {
  const roles = getTeamRoles(programme, projectType);
  
  const baseValue = 150;
  const teamValueAdd = roles.reduce((sum, role) => sum + role.valueAdd, 0);
  const totalMarketValue = baseValue + teamValueAdd;
  
  return {
    scale: 'team',
    description: 'Full production team = complex, high-value community project',
    timeRequired: '30-60 hours (distributed across team)',
    roles: [
      {
        programme,
        programmeName: PROGRAMME_NAMES[programme],
        role: 'Department Lead (You)',
        contribution: 'Lead your domain, coordinate with other departments',
        contributionLevel: 'essential',
        valueAdd: baseValue,
        skillsProvided: ['Domain leadership', 'Cross-team coordination'],
      },
      ...roles
    ],
    marketValue: totalMarketValue,
    yourEarnings: totalMarketValue * 0.25, // 25% as one of multiple leads
    revenueSplit: {
      you: 25,
      collaborators: 45,
      overhead: 20,
      community: 10,
    },
    benefits: [
      'Complex, prestigious projects',
      'Professional portfolio pieces',
      'Team leadership experience',
      'Multi-skill exposure',
      'Community impact',
      'Sustainable revenue model',
    ],
    examples: getTeamExamples(programme, projectType),
  };
};

// ========================================
// ROLE GENERATORS BY PROGRAMME
// ========================================

const getCollaborativeRoles = (
  programme: ProgrammeType,
  projectType: string
): CollaborationRole[] => {
  const roleMap: Record<ProgrammeType, CollaborationRole[]> = {
    'stemgeneers': [
      {
        programme: 'silk-stilettos',
        programmeName: 'Silk Stilettos',
        role: 'Enclosure Designer',
        contribution: 'Professional aesthetic design for technical builds',
        contributionLevel: 'enhancement',
        valueAdd: 40,
        skillsProvided: ['Industrial design', 'Visual appeal', 'User experience'],
      },
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Build Documentarian',
        contribution: 'Video documentation of build process',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Video production', 'Tutorial creation', 'Content marketing'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'Market Strategist',
        contribution: 'Pricing, positioning, kit sales strategy',
        contributionLevel: 'optional',
        valueAdd: 30,
        skillsProvided: ['Business model', 'Pricing strategy', 'Market analysis'],
      },
    ],
    
    'gtechcasters': [
      {
        programme: 'trubble-n-bass',
        programmeName: 'Trubble n Bass',
        role: 'Audio Identity Designer',
        contribution: 'Theme music, sound design, jingles',
        contributionLevel: 'enhancement',
        valueAdd: 45,
        skillsProvided: ['Music composition', 'Sound design', 'Audio branding'],
      },
      {
        programme: 'pageturners',
        programmeName: 'Pageturners',
        role: 'Content Writer',
        contribution: 'Show notes, transcripts, blog companion',
        contributionLevel: 'enhancement',
        valueAdd: 30,
        skillsProvided: ['Copywriting', 'SEO content', 'Accessibility'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'Sponsorship Coordinator',
        contribution: 'Revenue strategy, sponsor outreach',
        contributionLevel: 'optional',
        valueAdd: 50,
        skillsProvided: ['Sponsorship sales', 'Revenue modeling', 'Partnership building'],
      },
    ],
    
    'kaywanas-court': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Production Documentarian',
        contribution: 'Behind-scenes footage, promotional content',
        contributionLevel: 'enhancement',
        valueAdd: 40,
        skillsProvided: ['Video production', 'Promotional content', 'Social media clips'],
      },
      {
        programme: 'trubble-n-bass',
        programmeName: 'Trubble n Bass',
        role: 'Sound Designer',
        contribution: 'Production audio, soundscapes, effects',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Sound design', 'Audio mixing', 'Atmospheric creation'],
      },
      {
        programme: 'silk-stilettos',
        programmeName: 'Silk Stilettos',
        role: 'Costume Designer',
        contribution: 'Character costumes, visual identity',
        contributionLevel: 'enhancement',
        valueAdd: 45,
        skillsProvided: ['Costume design', 'Character visualization', 'Period accuracy'],
      },
    ],
    
    'pageturners': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Audio Narrator',
        contribution: 'Convert written work to audio format',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Voice performance', 'Audio production', 'Multi-format reach'],
      },
      {
        programme: 'silk-stilettos',
        programmeName: 'Silk Stilettos',
        role: 'Visual Designer',
        contribution: 'Cover design, illustrations, visual identity',
        contributionLevel: 'enhancement',
        valueAdd: 30,
        skillsProvided: ['Graphic design', 'Illustration', 'Visual storytelling'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'Publishing Strategist',
        contribution: 'Distribution strategy, monetization planning',
        contributionLevel: 'optional',
        valueAdd: 25,
        skillsProvided: ['Publishing strategy', 'Revenue planning', 'Market positioning'],
      },
    ],
    
    'trubble-n-bass': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Music Video Producer',
        contribution: 'Visual content for music releases',
        contributionLevel: 'enhancement',
        valueAdd: 50,
        skillsProvided: ['Video production', 'Visual storytelling', 'Social media content'],
      },
      {
        programme: 'kaywanas-court',
        programmeName: "Kaywana's Court",
        role: 'Performance Director',
        contribution: 'Live performance coaching, stage presence',
        contributionLevel: 'enhancement',
        valueAdd: 40,
        skillsProvided: ['Performance coaching', 'Stage presence', 'Audience engagement'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'Music Business Advisor',
        contribution: 'Licensing, distribution, revenue strategy',
        contributionLevel: 'optional',
        valueAdd: 35,
        skillsProvided: ['Music licensing', 'Distribution strategy', 'Revenue optimization'],
      },
    ],
    
    'silk-stilettos': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Portfolio Photographer',
        contribution: 'Professional product photography, lookbooks',
        contributionLevel: 'enhancement',
        valueAdd: 40,
        skillsProvided: ['Photography', 'Product styling', 'Portfolio creation'],
      },
      {
        programme: 'pageturners',
        programmeName: 'Pageturners',
        role: 'Brand Storyteller',
        contribution: 'Brand narrative, product descriptions, marketing copy',
        contributionLevel: 'enhancement',
        valueAdd: 30,
        skillsProvided: ['Copywriting', 'Brand storytelling', 'Marketing content'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'E-commerce Strategist',
        contribution: 'Pricing, sales channels, customer acquisition',
        contributionLevel: 'optional',
        valueAdd: 45,
        skillsProvided: ['E-commerce strategy', 'Pricing optimization', 'Sales channels'],
      },
    ],
    
    'techreneurs': [
      {
        programme: 'pageturners',
        programmeName: 'Pageturners',
        role: 'Business Writer',
        contribution: 'Business plan documentation, pitch decks',
        contributionLevel: 'enhancement',
        valueAdd: 30,
        skillsProvided: ['Business writing', 'Pitch creation', 'Professional documentation'],
      },
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Content Marketer',
        contribution: 'Video marketing, social proof content',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Video marketing', 'Content strategy', 'Social proof'],
      },
    ],
    
    'auntie-anansis-kitchen': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Food Documentary Producer',
        contribution: 'Recipe videos, cooking process documentation',
        contributionLevel: 'enhancement',
        valueAdd: 45,
        skillsProvided: ['Food videography', 'Recipe documentation', 'Cultural storytelling'],
      },
      {
        programme: 'pageturners',
        programmeName: 'Pageturners',
        role: 'Recipe Writer',
        contribution: 'Professional recipe formatting, cultural context',
        contributionLevel: 'enhancement',
        valueAdd: 30,
        skillsProvided: ['Recipe writing', 'Cultural documentation', 'Publishing ready content'],
      },
      {
        programme: 'silk-stilettos',
        programmeName: 'Silk Stilettos',
        role: 'Food Stylist',
        contribution: 'Food presentation, photography styling',
        contributionLevel: 'optional',
        valueAdd: 35,
        skillsProvided: ['Food styling', 'Visual presentation', 'Photography direction'],
      },
    ],
    
    'scrap-cat': [
      {
        programme: 'stemgeneers',
        programmeName: 'STEMgeneers',
        role: 'Technical Advisor',
        contribution: 'Electronics integration, technical upgrades',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Electronics knowledge', 'Technical design', 'Safety standards'],
      },
      {
        programme: 'silk-stilettos',
        programmeName: 'Silk Stilettos',
        role: 'Upcycle Designer',
        contribution: 'Aesthetic transformation, design direction',
        contributionLevel: 'enhancement',
        valueAdd: 40,
        skillsProvided: ['Design vision', 'Aesthetic refinement', 'Market appeal'],
      },
      {
        programme: 'techreneurs',
        programmeName: 'TECHreneurs',
        role: 'Sustainability Marketer',
        contribution: 'Environmental value proposition, green marketing',
        contributionLevel: 'optional',
        valueAdd: 30,
        skillsProvided: ['Sustainability messaging', 'Value positioning', 'Market strategy'],
      },
    ],
    
    'bright-sparks': [
      {
        programme: 'gtechcasters',
        programmeName: 'G-Tech Casters',
        role: 'Journey Documentarian',
        contribution: 'Document discovery process, create portfolio',
        contributionLevel: 'enhancement',
        valueAdd: 35,
        skillsProvided: ['Documentary production', 'Portfolio creation', 'Story capture'],
      },
      {
        programme: 'pageturners',
        programmeName: 'Pageturners',
        role: 'Reflection Writer',
        contribution: 'Help articulate learning, write impact stories',
        contributionLevel: 'enhancement',
        valueAdd: 25,
        skillsProvided: ['Reflective writing', 'Story crafting', 'Impact documentation'],
      },
    ],
  };
  
  return roleMap[programme] || [];
};

const getTeamRoles = (
  programme: ProgrammeType,
  projectType: string
): CollaborationRole[] => {
  // Team productions pull from collaborative roles + add project management
  const collabRoles = getCollaborativeRoles(programme, projectType);
  
  return [
    ...collabRoles.map(role => ({
      ...role,
      contributionLevel: 'essential' as const, // All become essential in team context
      valueAdd: role.valueAdd * 1.3, // 30% boost for coordinated team work
    })),
    {
      programme: 'techreneurs',
      programmeName: 'TECHreneurs',
      role: 'Project Coordinator',
      contribution: 'Timeline management, resource coordination, milestone tracking',
      contributionLevel: 'essential' as const,
      valueAdd: 60,
      skillsProvided: ['Project management', 'Team coordination', 'Resource allocation'],
    },
  ];
};

// ========================================
// EXAMPLE GENERATORS
// ========================================

const getSoloExamples = (programme: ProgrammeType): string[] => {
  const examples: Record<ProgrammeType, string[]> = {
    'stemgeneers': [
      'Functional breadboard circuit for personal use',
      'Basic speaker box with correct wiring',
      'Working prototype with technical documentation',
    ],
    'gtechcasters': [
      'Solo commentary podcast with ROV editing guidance',
      'Interview with one guest, basic production',
      'Personal story documentation',
    ],
    'kaywanas-court': [
      'Monologue performance with ROV direction',
      'Scene reading with personal interpretation',
      'Solo character development',
    ],
    'pageturners': [
      'Short story with editorial ROV feedback',
      'Personal essay with structure guidance',
      'Blog post with SEO optimization',
    ],
    'trubble-n-bass': [
      'Beat production with basic mixing',
      'Sample-based track with ROV feedback',
      'Personal music project',
    ],
    'silk-stilettos': [
      'Handmade piece for personal collection',
      'Design prototype with feedback',
      'Personal creative exploration',
    ],
    'techreneurs': [
      'Basic business model with ROV validation',
      'Pricing research and strategy',
      'Customer discovery framework',
    ],
    'auntie-anansis-kitchen': [
      'Family recipe documentation',
      'Personal cooking journey capture',
      'Heritage food preservation',
    ],
    'scrap-cat': [
      'Upcycled furniture piece',
      'Repaired electronic device',
      'Salvage material project',
    ],
    'bright-sparks': [
      'Programme exploration plan',
      'Personal skills assessment',
      'Discovery journey documentation',
    ],
  };
  
  return examples[programme] || [];
};

const getCollaborativeExamples = (programme: ProgrammeType, projectType: string): string[] => {
  const examples: Record<ProgrammeType, string[]> = {
    'stemgeneers': [
      'Speaker box with designer enclosure = premium product (£120 market value)',
      'Circuit with video tutorial = teaching income stream',
      'Technical build with business strategy = kit sales ready',
    ],
    'gtechcasters': [
      'Interview + theme music + show notes = professional podcast',
      'Documentary + sponsorship strategy = revenue-generating series',
      'Community story + multiple formats = cross-platform reach',
    ],
    'kaywanas-court': [
      'Performance + video documentation = portfolio piece',
      'Scene + sound design = professional production quality',
      'Character work + costume design = fully realized performance',
    ],
    'pageturners': [
      'Story + audio narration = multi-format content',
      'Article + visual design = publishable feature',
      'Written work + distribution strategy = monetized content',
    ],
    'trubble-n-bass': [
      'Track + music video = social media ready release',
      'Beat + performance coaching = live-ready act',
      'Production + licensing strategy = revenue-generating catalog',
    ],
    'silk-stilettos': [
      'Design + professional photography = e-commerce ready',
      'Creation + brand story = marketable collection',
      'Product + sales strategy = sustainable business',
    ],
    'techreneurs': [
      'Business model + professional documentation = pitch-ready',
      'Strategy + video pitch = investor-ready presentation',
      'Plan + written content = comprehensive business package',
    ],
    'auntie-anansis-kitchen': [
      'Recipe + food videography = publishable cookbook content',
      'Heritage story + professional writing = cultural archive piece',
      'Cooking process + styling = premium recipe card',
    ],
    'scrap-cat': [
      'Upcycle + design refinement = boutique product',
      'Repair + technical documentation = teaching content',
      'Salvage project + sustainability marketing = premium positioning',
    ],
    'bright-sparks': [
      'Discovery + documentation = portfolio foundation',
      'Skills journey + reflective writing = impact story',
      'Programme exploration + video series = recruitment content',
    ],
  };
  
  return examples[programme] || [];
};

const getTeamExamples = (programme: ProgrammeType, projectType: string): string[] => {
  return [
    'Drone Racing Championship: 8-week series with 70+ participants across 8 programmes',
    'Caribbean Heritage Documentary: Multi-episode series featuring elders, recipes, cultural preservation',
    'Community Sound System Installation: Engineering + design + content + business model',
    'Theatre Production: Full cast + crew + documentation + marketing + revenue strategy',
    'Product Launch: Creation + refinement + marketing + sales + ongoing support',
  ];
};

// ========================================
// MAIN COMPONENT
// ========================================

const CollaborationMatcher: React.FC<CollaborationMatcherProps> = ({
  yourProgramme,
  projectType,
  projectDescription,
  userSkills = [],
  onRequestCoordination,
  onSelectOutcome,
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<CollaborationOutcome | null>(null);
  const [showDetails, setShowDetails] = useState<'solo' | 'collaborative' | 'team' | null>(null);

  const opportunities = calculateCollaborationOpportunities(
    yourProgramme,
    projectType,
    projectDescription
  );

  const handleSelectOutcome = (outcome: CollaborationOutcome) => {
    setSelectedOutcome(outcome);
    if (onSelectOutcome) {
      onSelectOutcome(outcome);
    }
  };

  const handleRequestCoordination = (outcome: CollaborationOutcome) => {
    if (onRequestCoordination) {
      onRequestCoordination(outcome);
    }
  };

  return (
    <div className={styles.collaborationMatcher}>
      <div className={styles.header}>
        <h2>🤝 Your Collaboration Opportunities</h2>
        <p className={styles.subtitle}>
          See how your {PROGRAMME_NAMES[yourProgramme]} project can scale through collaboration
        </p>
      </div>

      <div className={styles.outcomesGrid}>
        {opportunities.map((outcome) => (
          <div
            key={outcome.scale}
            className={`${styles.outcomeCard} ${selectedOutcome?.scale === outcome.scale ? styles.selected : ''}`}
            onClick={() => handleSelectOutcome(outcome)}
          >
            {/* Header */}
            <div className={styles.outcomeHeader}>
              <span className={styles.scaleIcon}>
                {outcome.scale === 'solo' && '🎙️'}
                {outcome.scale === 'collaborative' && '🤝'}
                {outcome.scale === 'team' && '🎬'}
              </span>
              <h3>{outcome.scale.charAt(0).toUpperCase() + outcome.scale.slice(1)}</h3>
            </div>

            {/* Description */}
            <p className={styles.description}>{outcome.description}</p>

            {/* Key Metrics */}
            <div className={styles.metrics}>
              <div className={styles.metric}>
                <span className={styles.label}>Time:</span>
                <span className={styles.value}>{outcome.timeRequired}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.label}>Market Value:</span>
                <span className={styles.value}>£{outcome.marketValue}</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.label}>Your Earnings:</span>
                <span className={`${styles.value} ${styles.earnings}`}>£{Math.round(outcome.yourEarnings)}</span>
              </div>
            </div>

            {/* Team Size */}
            <div className={styles.teamInfo}>
              <strong>Team: {outcome.roles.length} {outcome.roles.length === 1 ? 'person' : 'people'}</strong>
            </div>

            {/* Quick Benefits */}
            <div className={styles.quickBenefits}>
              {outcome.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className={styles.benefit}>
                  ✓ {benefit}
                </div>
              ))}
            </div>

            {/* Action Button */}
            <button
              className={styles.detailsButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(showDetails === outcome.scale ? null : outcome.scale);
              }}
            >
              {showDetails === outcome.scale ? 'Hide Details' : 'Show Details'}
            </button>

            {/* Expanded Details */}
            {showDetails === outcome.scale && (
              <div className={styles.expandedDetails} onClick={(e) => e.stopPropagation()}>
                {/* Roles Breakdown */}
                <div className={styles.rolesSection}>
                  <h4>Team Roles</h4>
                  {outcome.roles.map((role, idx) => (
                    <div key={idx} className={styles.roleCard}>
                      <div className={styles.roleHeader}>
                        <strong>{role.programmeName}</strong>
                        <span className={styles.contributionLevel}>
                          {role.contributionLevel}
                        </span>
                      </div>
                      <div className={styles.roleName}>{role.role}</div>
                      <p className={styles.roleContribution}>{role.contribution}</p>
                      <div className={styles.skillsList}>
                        {role.skillsProvided.map((skill, sidx) => (
                          <span key={sidx} className={styles.skillTag}>{skill}</span>
                        ))}
                      </div>
                      {role.valueAdd > 0 && (
                        <div className={styles.valueAdd}>+£{role.valueAdd} value</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Revenue Split Visualization */}
                <div className={styles.revenueSplit}>
                  <h4>Revenue Split</h4>
                  <div className={styles.splitBar}>
                    <div
                      className={`${styles.splitSegment} ${styles.you}`}
                      style={{ width: `${outcome.revenueSplit.you}%` }}
                    >
                      You: {outcome.revenueSplit.you}%
                    </div>
                    {outcome.revenueSplit.collaborators > 0 && (
                      <div
                        className={`${styles.splitSegment} ${styles.collaborators}`}
                        style={{ width: `${outcome.revenueSplit.collaborators}%` }}
                      >
                        Team: {outcome.revenueSplit.collaborators}%
                      </div>
                    )}
                    <div
                      className={`${styles.splitSegment} ${styles.overhead}`}
                      style={{ width: `${outcome.revenueSplit.overhead}%` }}
                    >
                      Overhead: {outcome.revenueSplit.overhead}%
                    </div>
                    {outcome.revenueSplit.community > 0 && (
                      <div
                        className={`${styles.splitSegment} ${styles.community}`}
                        style={{ width: `${outcome.revenueSplit.community}%` }}
                      >
                        Community: {outcome.revenueSplit.community}%
                      </div>
                    )}
                  </div>
                  <div className={styles.splitBreakdown}>
                    <div>You: £{Math.round(outcome.yourEarnings)}</div>
                    {outcome.revenueSplit.collaborators > 0 && (
                      <div>Collaborators: £{Math.round((outcome.marketValue * outcome.revenueSplit.collaborators) / 100)}</div>
                    )}
                    <div>Overhead: £{Math.round((outcome.marketValue * outcome.revenueSplit.overhead) / 100)}</div>
                    {outcome.revenueSplit.community > 0 && (
                      <div>Community: £{Math.round((outcome.marketValue * outcome.revenueSplit.community) / 100)}</div>
                    )}
                  </div>
                </div>

                {/* Examples */}
                <div className={styles.examplesSection}>
                  <h4>Example Outcomes</h4>
                  <ul>
                    {outcome.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>

                {/* All Benefits */}
                <div className={styles.benefitsSection}>
                  <h4>Full Benefits</h4>
                  <ul>
                    {outcome.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                {outcome.scale !== 'solo' && (
                  <button
                    className={styles.coordinationButton}
                    onClick={() => handleRequestCoordination(outcome)}
                  >
                    Request Maya Coordination
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison Summary */}
      <div className={styles.comparisonSummary}>
        <h3>Quick Comparison</h3>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th>Scale</th>
              <th>Team Size</th>
              <th>Time</th>
              <th>Market Value</th>
              <th>Your Earnings</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((outcome) => (
              <tr key={outcome.scale}>
                <td><strong>{outcome.scale}</strong></td>
                <td>{outcome.roles.length}</td>
                <td>{outcome.timeRequired}</td>
                <td>£{outcome.marketValue}</td>
                <td className={styles.earningsCell}>£{Math.round(outcome.yourEarnings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Philosophy Statement */}
      <div className={styles.philosophy}>
        <h3>💡 The Wembley Wonders Difference</h3>
        <p>
          Most platforms force you to choose: work solo or work in teams. We show you the value 
          of each approach, let YOU decide based on your project and goals, and provide the 
          infrastructure (ROVs, Maya coordination, revenue splits) to make any choice viable.
        </p>
        <p>
          <strong>Solo builds skills. Collaboration builds careers. Teams build community wealth.</strong>
        </p>
      </div>
    </div>
  );
};

export default CollaborationMatcher;
