import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProgrammesEditorialGrid.module.css';

// ============================================================
// ProgrammesEditorialGrid
// src/components/ProgrammesEditorialGrid.tsx
// ============================================================
// The Independent editorial grid model applied to programmes.
// Five sections. Each section has a lead, features, standards.
// Weight is visible. The hierarchy does the navigation.
//
// SLOT TIERS:
//   lead     — full width, hero image, standfirst
//   feature  — half width, image, body
//   standard — quarter width, icon, one-liner
// ============================================================

interface Programme {
  id:        string;
  name:      string;
  icon:      string;
  tag:       string;
  standfirst:string;
  outcome:   string;
  day:       string;
  colour:    string;
  path:      string;
  cta:       string;
  meta?:     string;
}

interface Section {
  id:       string;
  c:        string;
  icon:     string;
  label:    string;
  colour:   string;
  lead:     Programme;
  features: Programme[];
  standards:Programme[];
}

const SECTIONS: Section[] = [

  // ── 1. CONNECT ─────────────────────────────────────────
  {
    id:     'connect',
    c:      'Connect',
    icon:   '🌐',
    label:  'Entry & Belonging',
    colour: '#1D9E75',
    lead: {
      id:         'bright-sparks',
      name:       'Bright Sparks',
      icon:       '✨',
      tag:        'The curiosity threshold',
      standfirst: 'The door for people who haven\'t decided yet. And who are smarter for it. Not a youth programme. Not an intake form. The room where you find out what you already carry — before you commit to a direction.',
      outcome:    'You find your spark. You leave knowing your first door.',
      day:        'Saturday 10:00 AM · Year-round · Free',
      colour:     '#fbbf24',
      path:       '/programmes/bright-sparks',
      cta:        'Come on Saturday morning →',
    },
    features: [
      {
        id:         'connoisseurs-club',
        name:       'The Connoisseurs Club',
        icon:       '🎩',
        tag:        'For men · Five stages',
        standfirst: 'Seedling to Elder. The framework for men who\'ve built expertise in silence and never had that knowledge formally witnessed or celebrated.',
        outcome:    'Cultural recognition · Rites of passage',
        day:        'Convenor: Claude Fontanelle',
        colour:     '#aa0000',
        path:       '/connoisseurs-club',
        cta:        'Join the Connoisseurs →',
      },
      {
        id:         'passionistas',
        name:       'The Passionistas Fan Club',
        icon:       '👠',
        tag:        'For women · Recognition society',
        standfirst: 'For women who are done being quietly extraordinary. Not a support group. Not a networking event. Properly, loudly, without apology.',
        outcome:    'Women\'s recognition · Mutual witnessing',
        day:        'Convenor: Judith Fontanelle',
        colour:     '#1D9E75',
        path:       '/passionistas',
        cta:        'Join the Passionistas →',
      },
    ],
    standards: [],
  },

  // ── 2. CULTIVATE ───────────────────────────────────────
  {
    id:     'cultivate',
    c:      'Cultivate',
    icon:   '🌱',
    label:  'Skills & Development',
    colour: '#0ea5e9',
    lead: {
      id:         'techreneurs',
      name:       'TECHreneurs',
      icon:       '💻',
      tag:        'Launch & sell',
      standfirst: 'Build a product around what you already know. First sale within the programme. 55% yours from day one. Not a coding bootcamp — a business launch platform for people who already have something worth selling.',
      outcome:    'Launch a product, first real sale',
      day:        'Thursday 7:00 PM · Autumn',
      colour:     '#3b82f6',
      path:       '/programmes/techreneurs',
      cta:        'Launch something you own →',
    },
    features: [
      {
        id:         'stemgeneers',
        name:       'STEMgeneers',
        icon:       '⚡',
        tag:        'Build & repair',
        standfirst: 'Practical skills turned into income. Device repair, electronics, the knowledge your hands already have — formalised, documented, and priced properly.',
        outcome:    'Device repair (earn £15–40/job)',
        day:        'Monday 7:00 PM · Spring',
        colour:     '#10b981',
        path:       '/programmes/stemgeneers',
        cta:        'Start building →',
      },
      {
        id:         'impact-labs',
        name:       'Impact Labs',
        icon:       '🔬',
        tag:        'Research & propose',
        standfirst: 'Turn a community problem into a real proposal that goes to the directors. Not a theoretical exercise — a live brief with a live audience.',
        outcome:    'Real proposal to directors',
        day:        'Monday 7:00 PM · Autumn',
        colour:     '#14b8a6',
        path:       '/programmes/impact-labs',
        cta:        'Bring your proposal →',
      },
    ],
    standards: [],
  },

  // ── 3. CREATE ──────────────────────────────────────────
  {
    id:     'create',
    c:      'Create',
    icon:   '🎨',
    label:  'Cultural Production House',
    colour: '#a855f7',
    lead: {
      id:         'kaywanas-court',
      name:       "Kaywana's Court",
      icon:       '🎭',
      tag:        'Debate & storytelling',
      standfirst: 'A courtroom drama framework for people who have always known they were right but never had the room to prove it. Argument as performance. Performance as record. The verdict is yours to win.',
      outcome:    'Win a courtroom debate',
      day:        'Thursday 7:00 PM · Summer',
      colour:     '#f97316',
      path:       '/programmes/kaywanas-court',
      cta:        'Enter the court →',
    },
    features: [
      {
        id:         'pageturners',
        name:       'Pageturners',
        icon:       '✍️',
        tag:        'Write & publish',
        standfirst: 'Your story in the Joystick e-zine. Your name on it permanently. The provenance trail that means nobody can strip-mine your words without acknowledgement.',
        outcome:    'Published in Joystick e-zine',
        day:        'Tuesday 7:00 PM · Year-round',
        colour:     '#8b5cf6',
        path:       '/programmes/pageturners',
        cta:        'Start writing →',
      },
      {
        id:         'easy-street',
        name:       'Easy Street',
        icon:       '🎬',
        tag:        'Radio drama',
        standfirst: 'A six-week radio drama workshop bridging G-Tech Casters and Pageturners. The stories that need telling, in the format that carries them furthest.',
        outcome:    'Radio drama on Rayd-yo',
        day:        'Friday 7:00 PM · Year-round',
        colour:     '#84cc16',
        path:       '/programmes/easy-street',
        cta:        'Tell the story →',
      },
    ],
    standards: [
      {
        id:    'gtechcasters',
        name:  'G-Tech Casters',
        icon:  '🎙️',
        tag:   'Broadcast',
        standfirst: 'Your show on Rayd-yo. Your audience yours.',
        outcome: 'Your show on Rayd-yo Radio',
        day:   'Wed 7pm · Year-round',
        colour:'#06b6d4',
        path:  '/programmes/gtechcasters',
        cta:   'Go on air →',
      },
      {
        id:    'trubble-n-bass',
        name:  'Trubble n Bass',
        icon:  '🎵',
        tag:   'Produce & release',
        standfirst: 'Release a track. Listening party. 55% yours.',
        outcome: 'Release a track, listening party',
        day:   'Thu 7pm · Spring',
        colour:'#a855f7',
        path:  '/programmes/trubble-n-bass',
        cta:   'Start producing →',
      },
      {
        id:    'silk-stilettos',
        name:  'Silk Stilettos',
        icon:  '👠',
        tag:   'Design & influence',
        standfirst: 'Portfolio of original pieces. Your aesthetic documented.',
        outcome: 'Portfolio of original pieces',
        day:   'Mon 7pm · Summer',
        colour:'#ec4899',
        path:  '/programmes/silk-stilettos',
        cta:   'Design your mark →',
      },
      {
        id:    'auntie-anansis-kitchen',
        name:  "Auntie Anansi's Kitchen",
        icon:  '🍲',
        tag:   'Cook & preserve',
        standfirst: 'Heritage recipes documented. Culture preserved.',
        outcome: 'Heritage recipes documented',
        day:   'Sat 11am · Summer',
        colour:'#f59e0b',
        path:  '/programmes/auntie-anansis-kitchen',
        cta:   'Preserve the recipe →',
      },
    ],
  },

  // ── 4. COMPETE ─────────────────────────────────────────
  {
    id:     'compete',
    c:      'Compete',
    icon:   '🏆',
    label:  'Challenge & Recognition',
    colour: '#f59e0b',
    lead: {
      id:         'creator-factory',
      name:       'Creator Factory',
      icon:       '🏭',
      tag:        'Create under pressure',
      standfirst: 'Timed challenges. A portfolio built under pressure. The stage where you find out what you\'re actually capable of when the clock is running and the audience is watching. Ideas go in. Proof comes out.',
      outcome:    'Portfolio of timed challenges',
      day:        'Wednesday 6:00 PM · Autumn',
      colour:     '#ef4444',
      path:       '/programmes/creator-factory',
      cta:        'Enter the factory →',
    },
    features: [],
    standards: [],
  },

  // ── 5. CHANGE ──────────────────────────────────────────
  {
    id:     'change',
    c:      'Change',
    icon:   '⚡',
    label:  'Impact & Transformation',
    colour: '#ef4444',
    lead: {
      id:         'roots',
      name:       'Roots',
      icon:       '🌿',
      tag:        'Body sovereignty · Women-led',
      standfirst: 'The knowledge that should have been handed down. Hair science. Chemical literacy. Legal rights. The Apothecary creator pathway. Women-led, women-directed, women-managed.',
      outcome:    'Hair science, body sovereignty, legal rights',
      day:        'Leads: Judith Fontanelle · Flora Agba · Natalie',
      colour:     '#4A6741',
      path:       '/programmes/roots',
      cta:        'Find out more →',
      meta:       'ROV: Aya',
    },
    features: [],
    standards: [],
  },

];

// ── Sub-components ────────────────────────────────────────

const LeadSlot: React.FC<{ prog: Programme }> = ({ prog }) => (
  <Link to={prog.path} className={styles.lead}
    style={{ '--prog-colour': prog.colour } as React.CSSProperties}>
    <div className={styles.leadImg}>
      <span className={styles.leadIcon}>{prog.icon}</span>
    </div>
    <div className={styles.leadContent}>
      <div className={styles.slotTag} style={{ color: prog.colour }}>{prog.tag}</div>
      <h2 className={styles.leadTitle}>{prog.name}</h2>
      <p className={styles.standfirst}>{prog.standfirst}</p>
      <div className={styles.leadMeta}>{prog.day}</div>
      {prog.meta && <div className={styles.leadMeta}>{prog.meta}</div>}
      <span className={styles.leadCta} style={{ color: prog.colour }}>{prog.cta}</span>
    </div>
  </Link>
);

const FeatureSlot: React.FC<{ prog: Programme }> = ({ prog }) => (
  <Link to={prog.path} className={styles.feature}
    style={{ '--prog-colour': prog.colour } as React.CSSProperties}>
    <div className={styles.featureImg}>
      <span className={styles.featureIcon}>{prog.icon}</span>
    </div>
    <div className={styles.slotTag} style={{ color: prog.colour }}>{prog.tag}</div>
    <h3 className={styles.featureTitle}>{prog.name}</h3>
    <p className={styles.featureBody}>{prog.standfirst}</p>
    <div className={styles.featureMeta}>{prog.day}</div>
    <span className={styles.featureCta} style={{ color: prog.colour }}>{prog.cta}</span>
  </Link>
);

const StandardSlot: React.FC<{ prog: Programme }> = ({ prog }) => (
  <Link to={prog.path} className={styles.standard}
    style={{ '--prog-colour': prog.colour } as React.CSSProperties}>
    <div className={styles.standardTop}>
      <span className={styles.standardIcon}>{prog.icon}</span>
      <span className={styles.slotTag} style={{ color: prog.colour }}>{prog.tag}</span>
    </div>
    <h4 className={styles.standardTitle}>{prog.name}</h4>
    <p className={styles.standardBody}>{prog.standfirst}</p>
    <div className={styles.standardMeta}>{prog.day}</div>
  </Link>
);

// ── Main component ────────────────────────────────────────

const ProgrammesEditorialGrid: React.FC = () => (
  <div className={styles.editorial}>
    <div className={styles.container}>

      <div className={styles.pageHeader}>
        <span className={styles.pageLabel}>The refinery</span>
        <h1 className={styles.pageTitle}>
          Where your knowledge<br />
          <em className={styles.pageTitleAccent}>becomes something real.</em>
        </h1>
        <p className={styles.pageSub}>
          Thirteen programmes. Five sections. Each one a different lens
          on what you already carry. The editorial weight tells you
          where to start.
        </p>
      </div>

      {SECTIONS.map(section => (
        <div key={section.id} className={styles.section}>

          {/* Section header — the divider */}
          <div
            className={styles.sectionHeader}
            style={{ '--section-colour': section.colour } as React.CSSProperties}
          >
            <span className={styles.sectionIcon}>{section.icon}</span>
            <span className={styles.sectionC}>{section.c}</span>
            <span className={styles.sectionLabel}>{section.label}</span>
            <div className={styles.sectionRule} />
          </div>

          {/* Grid */}
          <div className={styles.grid}>

            {/* Lead — always full width */}
            <LeadSlot prog={section.lead} />

            {/* Features — half width each */}
            {section.features.map(prog => (
              <FeatureSlot key={prog.id} prog={prog} />
            ))}

            {/* Standards — quarter width */}
            {section.standards.map(prog => (
              <StandardSlot key={prog.id} prog={prog} />
            ))}

          </div>
        </div>
      ))}

    </div>
  </div>
);

export default ProgrammesEditorialGrid;
