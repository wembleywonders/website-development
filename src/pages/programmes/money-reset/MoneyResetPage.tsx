import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import '../ProgrammePage.css';
import './MoneyResetPage.css';

/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

// ============================================
// MONEY RESET — Capital Efficiency Intelligence
// ============================================
// NOT: remedial financial basics for people
//      who missed school.
//
// IS: the knowledge wealthy families transmit
//     privately, decoded for creators building
//     sovereign earnings from cultural assets.
//
// The Windrush generation built parallel
// financial infrastructure — Pardner, Susu,
// Box Hand — precisely because the mainstream
// system was designed to exclude them.
// That intelligence didn't expire. It needs
// updating and transmitting.
//
// Philosophical centrepiece: Pardner is not
// a heritage curiosity. It is a superior
// financial instrument for irregular income.
//
// Sequence:
// 1. THE REFRAME — what this actually is
// 2. THE GAP — what schools didn't teach
// 3. PARDNER — the philosophy, elevated
// 4. CAPITAL EFFICIENCY — the four principles
// 5. IP OWNERSHIP — the missing piece
// 6. 55/25/20 — as financial architecture
// 7. THE MODULES — now carrying weight
// 8. INTEGRATION — how it compounds
// ============================================

const CAPITAL_PRINCIPLES = [
  {
    number: '01',
    title: 'Separate the business from yourself',
    body: 'Influencers went bankrupt because they confused what the platform paid with what they owned. Creators fail when they treat the business account as a personal ATM. Your business generates income. You pay yourself from it. These are not the same thing.',
    colour: '#d4a853',
  },
  {
    number: '02',
    title: 'IP is your balance sheet',
    body: 'Salaried workers have no balance sheet — only a P&L that stops when they stop working. Sovereign creators build assets: documented recipes, authenticated sound kits, provenance-verified designs. These generate income while you sleep. Your IP is the capital that makes you a business, not a freelancer.',
    colour: '#3ecfcf',
  },
  {
    number: '03',
    title: 'Irregular income requires a different system',
    body: 'Budgeting advice designed for monthly salaries is useless for project-based creative work. You need envelope systems, income averaging, and the discipline to treat a feast month as a bridge to the next drought. This is learnable. The mainstream just never taught it to your demographic.',
    colour: '#9b7fe8',
  },
  {
    number: '04',
    title: 'Community capital beats individual saving',
    body: 'One person saving £100 a month for ten months has £1,000 — but only at month ten. Ten people in a Pardner circle each saving £100 a month means one person has £1,000 at month one. The maths has always been better. The only question is whether you have the community trust to operate it.',
    colour: '#4ade80',
  },
];

const PARDNER_MECHANICS = [
  { step: '1', text: 'A group of 8–12 people agrees on a contribution — typically £50–200/month' },
  { step: '2', text: 'Each period, one member receives the entire pot. Order agreed at the start.' },
  { step: '3', text: 'No interest. No bank fees. No credit check. No predatory terms.' },
  { step: '4', text: 'The rotation continues until every member has received once. Then it resets.' },
  { step: '5', text: 'The social contract is the enforcement mechanism. Community trust is the collateral.' },
];

const PARDNER_USES = [
  { use: 'Equipment purchase', example: '£500 sound kit in month 2 instead of month 10' },
  { use: 'Project funding', example: 'Studio session, print run, sample clearance' },
  { use: 'Emergency reserve', example: 'The month income doesn\'t arrive on schedule' },
  { use: 'IP registration', example: 'Trade mark, copyright registration costs' },
  { use: 'Course investment', example: 'Specialist training that accelerates earnings' },
];

const IP_ESSENTIALS = [
  {
    title: 'What you own by default',
    items: [
      'Original creative works from the moment of creation (copyright)',
      'Your trade secrets — the unpublished recipe, the undisclosed technique',
      'Your personal brand and public reputation',
    ],
    colour: '#4ade80',
    icon: '✓',
  },
  {
    title: 'What requires active registration',
    items: [
      'Trade marks (your name, logo, brand as commercial identifiers)',
      'Registered designs (visual appearance of products)',
      'Patents (functional innovations — rare for cultural creators)',
    ],
    colour: '#d4a853',
    icon: '!',
  },
  {
    title: 'What destroys value without documentation',
    items: [
      'Unwritten collaboration agreements — who owns the joint creation?',
      'Verbal licensing — permission granted without written terms',
      'Platform terms of service — read what you\'re signing over',
      'Work-for-hire without explicit IP retention clause',
    ],
    colour: '#f87171',
    icon: '✗',
  },
];

const MODULES = [
  {
    icon: '🧠',
    title: 'The Money Intelligence Audit',
    desc: 'Map what you actually know, what you were never taught, and what you\'ve absorbed from systems designed to keep you financially dependent. Starting point, not judgment.',
  },
  {
    icon: '📊',
    title: 'Irregular Income Systems',
    desc: 'Envelope budgeting, income averaging, and the discipline of treating feast months as capital. Built for project-based work, not monthly salaries.',
  },
  {
    icon: '🗺️',
    title: 'Debt Navigation Without Shame',
    desc: 'Strategies for managing and reducing debt that don\'t pathologise the people the system was designed to indebted. Practical, documented, actionable.',
  },
  {
    icon: '🏺',
    title: 'Pardner Economics',
    desc: 'The philosophy elevated: why rotating savings circles are a superior instrument for creators with irregular income, and how to operate one with proper agreements.',
  },
  {
    icon: '⚖️',
    title: 'IP Ownership Basics',
    desc: 'What you own by default, what requires registration, and the specific mistakes that transfer your cultural assets to someone else\'s balance sheet.',
  },
  {
    icon: '🏗️',
    title: 'The 55/25/20 Architecture',
    desc: 'Understanding the revenue split as financial philosophy, not just policy: what each percentage actually means for long-term capital building.',
  },
  {
    icon: '📈',
    title: 'Multiple Streams, Real Numbers',
    desc: 'What £10,000/month gross actually requires: working backwards from the number to the portfolio of streams needed to reach it sustainably.',
  },
  {
    icon: '🛡️',
    title: 'Business vs. Lifestyle Separation',
    desc: 'The specific accounting disciplines that distinguish a creator business from expensive self-employment. Tax, VAT threshold, company vs. sole trader decision tree.',
  },
];

const INTEGRATION_LINKS = [
  {
    programme: 'TECHreneurs',
    slug: 'techreneurs',
    reason: 'Business model + financial architecture = the complete foundation for sovereign earnings',
    icon: '💻',
  },
  {
    programme: 'Pageturners',
    slug: 'pageturners',
    reason: 'IP documentation is the bridge between cultural asset and protected income stream',
    icon: '✍️',
  },
  {
    programme: 'Trubble n Bass',
    slug: 'trubble-n-bass',
    reason: 'Music income requires specific IP knowledge: publishing rights, master rights, sync licensing',
    icon: '🎵',
  },
  {
    programme: 'Auntie Anansi\'s Kitchen',
    slug: 'auntie-anansis-kitchen',
    reason: 'Heritage recipe documentation has specific IP considerations: trade secrets vs. publication',
    icon: '🍲',
  },
];

const MoneyResetPage: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <PageTemplate
      pageTitle="Money Reset"
      pageStrapline="Capital efficiency intelligence — not remedial financial basics"
      pageType="programme"
    >
      <div className="mr-page">

        {/* ── REFRAME ── */}
        <section className="mr-hero">
          <span className="mr-label">The reframe</span>
          <h1 className="mr-hero-title">
            This isn't what schools<br />
            <em>didn't teach you.</em><br />
            It's what they didn't teach you<br />
            <span className="mr-hero-accent">on purpose.</span>
          </h1>
          <p className="mr-hero-body">
            Wealthy families transmit financial architecture privately —
            how capital works, how IP builds a balance sheet, how business
            and lifestyle separation protects earnings. Your school
            gave you debt literacy: student loans, overdrafts, credit cards.
          </p>
          <p className="mr-hero-body">
            The Windrush generation built parallel financial infrastructure
            — Pardner, Susu, Box Hand — because the mainstream system
            was designed to exclude them. That intelligence didn't expire.
            Money Reset updates it and transmits it.
          </p>
        </section>

        {/* ── THE GAP ── */}
        <section className="mr-section mr-section--alt">
          <span className="mr-label">What's missing</span>
          <h2 className="mr-heading">
            The specific things<br />you were never taught.
          </h2>

          <div className="mr-gap-grid">
            <div className="mr-gap-col">
              <div className="mr-gap-header mr-gap-header--red">What schools taught</div>
              <div className="mr-gap-items">
                <div className="mr-gap-item mr-gap-item--red">How to open a bank account</div>
                <div className="mr-gap-item mr-gap-item--red">How student loans work (sort of)</div>
                <div className="mr-gap-item mr-gap-item--red">Basic income tax (in passing)</div>
                <div className="mr-gap-item mr-gap-item--red">How credit cards work</div>
              </div>
            </div>
            <div className="mr-gap-col">
              <div className="mr-gap-header mr-gap-header--gold">What they didn't</div>
              <div className="mr-gap-items">
                <div className="mr-gap-item mr-gap-item--gold">How IP creates a balance sheet</div>
                <div className="mr-gap-item mr-gap-item--gold">Why business and lifestyle must be separated</div>
                <div className="mr-gap-item mr-gap-item--gold">How irregular income requires different systems</div>
                <div className="mr-gap-item mr-gap-item--gold">How community capital instruments work</div>
                <div className="mr-gap-item mr-gap-item--gold">What £10k/month actually requires to sustain</div>
                <div className="mr-gap-item mr-gap-item--gold">How to structure multiple income streams</div>
                <div className="mr-gap-item mr-gap-item--gold">What you legally own and what you don't</div>
                <div className="mr-gap-item mr-gap-item--gold">How platforms extract value from your IP</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PARDNER — ELEVATED ── */}
        <section className="mr-section">
          <span className="mr-label">The philosophy</span>
          <h2 className="mr-heading">
            Your grandparents built<br />
            a better bank.
          </h2>
          <p className="mr-section-sub">
            Pardner — also called Susu (West African), Box Hand (Caribbean),
            Chit Fund (South Asian) — is a rotating savings circle that predates
            modern banking and outperforms it for creators with irregular income.
            This is not heritage nostalgia. The maths is demonstrably superior.
          </p>

          <div className="mr-pardner-layout">
            <div className="mr-pardner-left">
              <div className="mr-pardner-proof">
                <div className="mr-proof-scenario">
                  <span className="mr-proof-label">Individual saving</span>
                  <p>£100/month × 10 months = £1,000 available at <strong>month 10</strong></p>
                </div>
                <div className="mr-proof-vs">vs</div>
                <div className="mr-proof-scenario mr-proof-scenario--gold">
                  <span className="mr-proof-label">Pardner circle (10 people, £100/month)</span>
                  <p>£1,000 available to one person at <strong>month 1.</strong> Everyone gets it within 10 months.</p>
                </div>
              </div>

              <p className="mr-pardner-note">
                The only thing that makes Pardner work is community trust.
                The only thing that destroys it is taking your hand out early.
                We run formalised Pardner circles with written agreements
                to protect both the tradition and the participants.
              </p>
            </div>

            <div className="mr-pardner-right">
              <div className="mr-mechanics-title">How it works</div>
              <div className="mr-mechanics">
                {PARDNER_MECHANICS.map((m, i) => (
                  <div key={i} className="mr-mechanic">
                    <span className="mr-mechanic-step">{m.step}</span>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="mr-pardner-uses-title">What members use it for</div>
              <div className="mr-uses">
                {PARDNER_USES.map((u, i) => (
                  <div key={i} className="mr-use">
                    <span className="mr-use-name">{u.use}</span>
                    <span className="mr-use-eg">{u.example}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CAPITAL EFFICIENCY PRINCIPLES ── */}
        <section className="mr-section mr-section--alt">
          <span className="mr-label">The four principles</span>
          <h2 className="mr-heading">Capital efficiency intelligence.</h2>
          <p className="mr-section-sub">
            The knowledge privately transmitted in wealthy families,
            decoded for creators building sovereign earnings.
          </p>

          <div className="mr-principles-nav">
            {CAPITAL_PRINCIPLES.map((p, i) => (
              <button
                key={i}
                className={`mr-principle-tab ${activePrinciple === i ? 'active' : ''}`}
                onClick={() => setActivePrinciple(i)}
                style={{ '--p-colour': p.colour } as React.CSSProperties}
              >
                <span>{p.number}</span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>

          <div className="mr-principle-body" style={{ '--p-colour': CAPITAL_PRINCIPLES[activePrinciple].colour } as React.CSSProperties}>
            <p>{CAPITAL_PRINCIPLES[activePrinciple].body}</p>
          </div>
        </section>

        {/* ── IP OWNERSHIP ── */}
        <section className="mr-section">
          <span className="mr-label">The missing piece</span>
          <h2 className="mr-heading">
            Your IP is your balance sheet.<br />
            Most creators give it away<br />without knowing it.
          </h2>

          <div className="mr-ip-grid">
            {IP_ESSENTIALS.map((col, i) => (
              <div key={i} className="mr-ip-col" style={{ '--ip-colour': col.colour } as React.CSSProperties}>
                <div className="mr-ip-header">
                  <span className="mr-ip-icon">{col.icon}</span>
                  <h3>{col.title}</h3>
                </div>
                <div className="mr-ip-items">
                  {col.items.map((item, j) => (
                    <div key={j} className="mr-ip-item">
                      <span className="mr-ip-marker">{col.icon}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 55/25/20 AS ARCHITECTURE ── */}
        <section className="mr-section mr-section--alt">
          <span className="mr-label">The financial architecture</span>
          <h2 className="mr-heading">
            55/25/20 isn't a revenue split.<br />
            It's a capital building philosophy.
          </h2>

          <div className="mr-split-layout">
            <div className="mr-split-visual">
              <div className="mr-split-bar">
                <div className="mr-split-seg mr-split-55">
                  <span className="mr-split-pct">55%</span>
                  <span className="mr-split-lbl">Yours</span>
                </div>
                <div className="mr-split-seg mr-split-25">
                  <span className="mr-split-pct">25%</span>
                  <span className="mr-split-lbl">Community capital</span>
                </div>
                <div className="mr-split-seg mr-split-20">
                  <span className="mr-split-pct">20%</span>
                  <span className="mr-split-lbl">Platform infrastructure</span>
                </div>
              </div>
            </div>
            <div className="mr-split-detail">
              <div className="mr-split-item">
                <span className="mr-split-n mr-split-n--gold">55%</span>
                <div>
                  <strong>Yours — because your provenance is the asset.</strong>
                  <p>Not a reward for completing the programme. Not conditional on performance. Your knowledge, your cultural lineage, your irreplaceable authenticity. The majority is yours from the first thing you make.</p>
                </div>
              </div>
              <div className="mr-split-item">
                <span className="mr-split-n mr-split-n--teal">25%</span>
                <div>
                  <strong>Community capital — your future optionality.</strong>
                  <p>This isn't charity. This is the pool that means when an equipment failure, an opportunity, or a Pardner cycle arrives, the capital is there. You contributed to it. You can access it. The next Seedling benefits from what you built.</p>
                </div>
              </div>
              <div className="mr-split-item">
                <span className="mr-split-n mr-split-n--purple">20%</span>
                <div>
                  <strong>Infrastructure — the thing protecting what you own.</strong>
                  <p>Legal structures, IP registry, documentation, platform maintenance. The 20% that means your provenance trail is legally defensible and your cultural assets can't be strip-mined without consequence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODULES ── */}
        <section className="mr-section">
          <span className="mr-label">The programme</span>
          <h2 className="mr-heading">Eight sessions. Each one earning its place.</h2>

          <div className="mr-modules-grid">
            {MODULES.map((m, i) => (
              <div key={i} className="mr-module">
                <span className="mr-module-icon">{m.icon}</span>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NO SHAME ── */}
        <section className="mr-shame">
          <div className="mr-shame-inner">
            <h3>Whatever your financial situation, you're welcome here.</h3>
            <p>
              Debt, no savings, confused about money, never been taught any of this —
              none of that is personal failure. It's the predictable outcome of systems
              that transmitted financial intelligence selectively. Money Reset is
              a judgement-free space to build what you were never given.
            </p>
          </div>
        </section>

        {/* ── INTEGRATION ── */}
        <section className="mr-section mr-section--alt">
          <span className="mr-label">How it compounds</span>
          <h2 className="mr-heading">Financial architecture powers everything else.</h2>

          <div className="mr-integrations">
            {INTEGRATION_LINKS.map((link, i) => (
              <Link key={i} to={`/programmes/${link.slug}`} className="mr-integration">
                <span className="mr-int-icon">{link.icon}</span>
                <div>
                  <span className="mr-int-prog">{link.programme}</span>
                  <p>{link.reason}</p>
                </div>
                <span className="mr-int-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mr-cta">
          <h2 className="mr-cta-title">
            The intelligence was always there.<br />
            We're just making it transmissible.
          </h2>
          <p className="mr-cta-sub">
            Join Money Reset and build the financial architecture
            your cultural assets deserve.
          </p>
          <div className="mr-cta-btns">
            <Link to="/sessions" className="mr-btn mr-btn--primary">
              Find a session →
            </Link>
            <Link to="/get-started" className="mr-btn mr-btn--outline">
              Start the excavation first
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default MoneyResetPage;