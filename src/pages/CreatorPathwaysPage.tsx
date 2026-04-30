// src/pages/CreatorPathwaysPage.tsx
// Rebuilt: single flow — programmes first, talent card second, result third.
// No mode switcher. No quiz. Consistent with /start experience.
// All data preserved exactly.
//
// Updated April 2026:
//   — Your Earning Path section added (Section 5)
//   — Lower-end monthly figures lead throughout
//   — Pardner / community benefit note added
//   — What the Work Paid evidence hook added
//   — Maya personalised plan CTA added
//   — Programme ceiling figures replaced with realistic monthly averages

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreatorPathwaysPage.css';

// ─── Colour tokens ────────────────────────────────────────────
const T = {
  pageBg:      '#0f172a',
  cardBg:      'rgba(30, 41, 59, 0.85)',
  cardBgDeep:  'rgba(15, 23, 42, 0.7)',
  cardBorder:  'rgba(148, 163, 184, 0.18)',
  white:       '#ffffff',
  bright:      '#f8fafc',
  main:        '#e2e8f0',
  mid:         '#cbd5e1',
  muted:       '#94a3b8',
  dim:         '#64748b',
  green:       '#10b981',
  greenLight:  '#34d399',
  greenBg:     'rgba(16, 185, 129, 0.12)',
  greenBorder: 'rgba(16, 185, 129, 0.25)',
  gold:        '#fbbf24',
  goldBg:      'rgba(251, 191, 36, 0.1)',
  goldBorder:  'rgba(251, 191, 36, 0.25)',
  purple:      '#8b5cf6',
  purpleBg:    'rgba(139, 92, 246, 0.15)',
  purpleBorder:'rgba(139, 92, 246, 0.3)',
  teal:        '#0d9488',
  tealBg:      'rgba(13, 148, 136, 0.1)',
  tealBorder:  'rgba(13, 148, 136, 0.25)',
};

// ─── Types ────────────────────────────────────────────────────
type TalentId = 'verbal' | 'musical' | 'technical' | 'social' | 'visual' | 'storytelling';

interface Programme {
  id:          string;
  emoji:       string;
  name:        string;
  tagline:     string;
  avgMonthly:  string;  // lower-end average, not ceiling
  colour:      string;
  path:        string;
}

interface Talent {
  id:          TalentId;
  emoji:       string;
  label:       string;
  subtext:     string;
  zone1:       string;
  zone2:       string;
  firstIncome: string;
  ceiling:     string;
  programmeId: string;
}

interface Story {
  name:    string;
  age:     number;
  income:  string;
  route:   string;
  quote:   string;
}

interface EarningPhase {
  phase:     string;
  period:    string;
  typical:   string;   // what most people earn — leads
  some:      string;   // what some people reach
  note:      string;
}

interface ProgrammeEarning {
  programme:  string;
  emoji:      string;
  colour:     string;
  mo1to6:     string;
  mo6to18:    string;
  mo18to36:   string;
  mo36plus:   string;
  passive:    boolean;
}

// ─── Data ─────────────────────────────────────────────────────

// Ceiling replaced with realistic monthly average (lower-end)
// "Most people earn around X" — not "you could earn Y"
const PROGRAMMES: Programme[] = [
  { id: 'pageturners',            emoji: '📝', name: 'Pageturners',             tagline: 'Words. Stories. Worlds.',         avgMonthly: '£40–£120/mo avg', colour: '#f4a261', path: '/programmes/pageturners' },
  { id: 'trubble-n-bass',         emoji: '🎵', name: 'Trubble n Bass',          tagline: 'Decks. DAW. Drop.',               avgMonthly: '£50–£180/mo avg', colour: '#8338ec', path: '/programmes/trubble-n-bass' },
  { id: 'stemgeneers',            emoji: '🔧', name: 'STEMgeneers',             tagline: 'Make. Build. Innovate.',          avgMonthly: '£40–£150/mo avg', colour: '#2a9d8f', path: '/programmes/stemgeneers' },
  { id: 'bright-sparks',          emoji: '✨', name: 'Bright Sparks',           tagline: 'Not sure? Start here.',           avgMonthly: '£25–£100/mo avg', colour: '#fbbf24', path: '/programmes/bright-sparks' },
  { id: 'silk-stilettos',         emoji: '✂️', name: 'Silk Stilettos',          tagline: 'Style. Confidence. Expression.',  avgMonthly: '£50–£160/mo avg', colour: '#ff006e', path: '/programmes/silk-stilettos' },
  { id: 'auntie-anansis-kitchen', emoji: '📚', name: "Auntie Anansi's Kitchen", tagline: 'Culture. Food. Heritage.',        avgMonthly: '£40–£130/mo avg', colour: '#d62828', path: '/programmes/auntie-anansis-kitchen' },
];

const TALENTS: Talent[] = [
  { id: 'verbal',       emoji: '📝', label: 'Writing / Speaking',      subtext: "You reach for words — in notebooks, messages, arguments you win in your head",                     zone1: 'Pageturners',             zone2: 'Joystick + Rayd-yo',           firstIncome: 'Editorial features, audio essays',      ceiling: '£3,500/mo', programmeId: 'pageturners' },
  { id: 'musical',      emoji: '🎵', label: 'Music / Sound',           subtext: "You hear the world in beats, grooves, textures — and you produce, not just listen",               zone1: 'Trubble n Bass',          zone2: "Kaywana's Court + Rayd-yo",    firstIncome: 'Track licensing, playlist placement',    ceiling: '£4,000/mo', programmeId: 'trubble-n-bass' },
  { id: 'technical',    emoji: '🔧', label: 'Tech / Building',         subtext: "You take things apart to understand them, then put them back better",                              zone1: 'STEMgeneers',             zone2: 'TECHreneurs + G-Tech Casters', firstIncome: 'Digital products, tech tutorials',       ceiling: '£5,000+/mo',programmeId: 'stemgeneers' },
  { id: 'social',       emoji: '🤝', label: 'People / Community',      subtext: "You're the one everyone talks to — you know how to hold a room and hold space",                   zone1: 'Bright Sparks',           zone2: 'Rayd-yo + Membership',         firstIncome: 'Community shows, facilitation',          ceiling: '£2,800/mo', programmeId: 'bright-sparks' },
  { id: 'visual',       emoji: '✂️', label: 'Visual / Fashion',        subtext: "You see design in everything — colour, proportion, what something says before it speaks",         zone1: 'Silk Stilettos',          zone2: "Joystick + Kaywana's Court",   firstIncome: 'Editorial art, cover commissions',       ceiling: '£3,200/mo', programmeId: 'silk-stilettos' },
  { id: 'storytelling', emoji: '📚', label: 'Heritage / Storytelling', subtext: "You carry knowledge — family recipes, oral history, community memory that exists nowhere else",   zone1: "Auntie Anansi's Kitchen", zone2: 'Roots Archive + Joystick',     firstIncome: 'Certified heritage content, licensing',  ceiling: '£3,800/mo', programmeId: 'auntie-anansis-kitchen' },
];

const STORIES: Story[] = [
  { name: 'Marcus',  age: 17, income: '£175/mo', route: 'Trubble n Bass → Rayd-yo',               quote: "First time anyone told me the music I was already making was worth something." },
  { name: 'Priya',   age: 34, income: '£450/mo', route: 'Pageturners → Joystick',                  quote: "I had a decade of stories I hadn't told. The counter-archive proved they were mine to tell." },
  { name: 'Jerome',  age: 19, income: '£280/mo', route: 'STEMgeneers → TECHreneurs',               quote: "Built my first paid product in month five. No CV. No interview. Just the thing I made." },
  { name: "Ngozi",   age: 42, income: '£220/mo', route: "Auntie Anansi's Kitchen → Roots Archive", quote: "My grandmother's recipes are now certified. No one can claim them. That matters more than the money." },
];

const PHASE_DATA = [
  { phase: 'Foundation',   year: 'Yr 1', floor: 0,    ceiling: 300  },
  { phase: 'First Income', year: 'Yr 2', floor: 150,  ceiling: 900  },
  { phase: 'Traction',     year: 'Yr 3', floor: 500,  ceiling: 1800 },
  { phase: 'Independence', year: 'Yr 4', floor: 1100, ceiling: 2800 },
  { phase: 'Established',  year: 'Yr 5+',floor: 1800, ceiling: 5000 },
];

const THRESHOLDS = { survival: 1195, independence: 1400, comfortable: 1720 };
const MAX_INCOME = 5000;

// ─── Your Earning Path data ───────────────────────────────────
// Lower-end figures lead. Upper end shown as "some people reach".
// Monthly, not annual. Honest about the timeline.

const EARNING_PHASES: EarningPhase[] = [
  {
    phase:   'Getting started',
    period:  'Months 1–6',
    typical: '£8–£40/mo',
    some:    'up to £120/mo',
    note:    'First earnings from work you already know how to do. This is proof, not income.',
  },
  {
    phase:   'Finding your stride',
    period:  'Months 6–18',
    typical: '£40–£150/mo',
    some:    'up to £400/mo',
    note:    'The platform is working. Your catalogue is starting to compound.',
  },
  {
    phase:   'Building momentum',
    period:  'Months 18–36',
    typical: '£150–£400/mo',
    some:    'up to £900/mo',
    note:    'Cross-programme income is kicking in. Some of this arrives without fresh effort.',
  },
  {
    phase:   'Established',
    period:  '36 months+',
    typical: '£300–£700/mo',
    some:    '£1,200/mo and above',
    note:    'The catalogue works. The community knows you. Passive income is real.',
  },
];

const PROGRAMME_EARNINGS: ProgrammeEarning[] = [
  { programme: 'Trubble n Bass',          emoji: '🎵', colour: '#8338ec', mo1to6: '£8–£50',   mo6to18: '£50–£180',  mo18to36: '£120–£400', mo36plus: '£250–£900',  passive: true  },
  { programme: 'Silk Stilettos',          emoji: '✂️', colour: '#ff006e', mo1to6: '£12–£60',  mo6to18: '£60–£160',  mo18to36: '£130–£380', mo36plus: '£250–£850',  passive: true  },
  { programme: 'Pageturners',             emoji: '📝', colour: '#f4a261', mo1to6: '£8–£40',   mo6to18: '£40–£120',  mo18to36: '£80–£280',  mo36plus: '£150–£600',  passive: true  },
  { programme: "Auntie Anansi's Kitchen", emoji: '📚', colour: '#d62828', mo1to6: '£10–£50',  mo6to18: '£50–£130',  mo18to36: '£100–£300', mo36plus: '£200–£700',  passive: true  },
  { programme: 'STEMgeneers',             emoji: '🔧', colour: '#2a9d8f', mo1to6: '£8–£40',   mo6to18: '£40–£150',  mo18to36: '£100–£320', mo36plus: '£200–£650',  passive: false },
  { programme: 'TECHreneurs',             emoji: '💻', colour: '#0ea5e9', mo1to6: '£15–£70',  mo6to18: '£70–£200',  mo18to36: '£150–£450', mo36plus: '£300–£1000', passive: false },
  { programme: 'G-Tech Casters',          emoji: '🎙️', colour: '#6366f1', mo1to6: '£8–£40',   mo6to18: '£40–£130',  mo18to36: '£80–£280',  mo36plus: '£150–£600',  passive: true  },
  { programme: 'Kaywana\'s Court',        emoji: '🎭', colour: '#f472b6', mo1to6: '£8–£40',   mo6to18: '£40–£120',  mo18to36: '£80–£250',  mo36plus: '£150–£550',  passive: false },
  { programme: 'Roots',                   emoji: '🌿', colour: '#10b981', mo1to6: '£10–£50',  mo6to18: '£50–£130',  mo18to36: '£100–£300', mo36plus: '£200–£700',  passive: true  },
  { programme: 'Rayd-yo',                 emoji: '📻', colour: '#f59e0b', mo1to6: '£8–£33',   mo6to18: '£33–£100',  mo18to36: '£67–£200',  mo36plus: '£100–£400',  passive: true  },
  { programme: 'Joystick',                emoji: '📰', colour: '#fb923c', mo1to6: '£8–£33',   mo6to18: '£25–£100',  mo18to36: '£50–£180',  mo36plus: '£100–£350',  passive: true  },
  { programme: 'Bright Sparks',           emoji: '✨', colour: '#fbbf24', mo1to6: '£8–£25',   mo6to18: '£25–£100',  mo18to36: '£67–£220',  mo36plus: '£120–£450',  passive: false },
];

// Cross-programme combination examples
const COMBINATIONS = [
  {
    label:   'Music + Broadcast + Rayd-yo',
    programmes: 'Trubble n Bass · G-Tech Casters · Rayd-yo',
    mo1to6:  '£25–£100',
    mo18to36:'£250–£650',
    mo36plus:'£500–£1,500',
    note:    'Catalogue licensing compounds. Archive episodes earn long after broadcast.',
  },
  {
    label:   'Writing + Performance + Heritage',
    programmes: 'Pageturners · Kaywana\'s Court · Joystick',
    mo1to6:  '£20–£80',
    mo18to36:'£200–£580',
    mo36plus:'£450–£1,200',
    note:    'Event MC work and syndication add to catalogue income.',
  },
  {
    label:   'Fashion + Wellness + Events',
    programmes: 'Silk Stilettos · Roots · Connoisseurs Club',
    mo1to6:  '£20–£100',
    mo18to36:'£250–£700',
    mo36plus:'£500–£1,400',
    note:    'Product sales passive. Event styling retainer active. Both stack.',
  },
  {
    label:   'Tech + Enterprise + Facilitation',
    programmes: 'STEMgeneers · TECHreneurs · Sandbox',
    mo1to6:  '£20–£90',
    mo18to36:'£250–£750',
    mo36plus:'£500–£1,800',
    note:    'Consultancy scales fastest outside London where costs are lower.',
  },
];

// ─── Component ────────────────────────────────────────────────
const CreatorPathwaysPage: React.FC = () => {
  const [selectedTalent,    setSelectedTalent]    = useState<TalentId | null>(null);
  const [showTimeline,      setShowTimeline]       = useState(false);
  const [showEarningPath,   setShowEarningPath]    = useState(false);
  const [earningTab,        setEarningTab]         = useState<'phases'|'programmes'|'combinations'>('phases');

  const talent = TALENTS.find(t => t.id === selectedTalent);

  // ── shared styles ──────────────────────────────────────────
  const sectionHeading = (text: string) => (
    <h2 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(1.4rem, 3vw, 1.875rem)', fontWeight: 800, color: T.bright, lineHeight: 1.25, textAlign: 'center' }}>
      {text}
    </h2>
  );

  const sectionSub = (text: string) => (
    <p style={{ margin: '0 0 1.75rem', fontSize: '1rem', color: T.muted, lineHeight: 1.6, textAlign: 'center' }}>
      {text}
    </p>
  );

  return (
    <div style={{
      minHeight:  '100vh',
      background: T.pageBg,
      color:      T.main,
      paddingTop: 80,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 3rem' }}>
          <h1 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: T.bright, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Find your earning path
          </h1>
          <p style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: T.muted, lineHeight: 1.7 }}>
            You have something. We just help you see what it's worth — and show you how to get paid for it.
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: T.dim, lineHeight: 1.6, fontStyle: 'italic' }}>
            We'll tell you what you'll probably earn. When you earn more — and you will — it's yours to enjoy.
          </p>
        </div>

        {/* ── Section 1: Programme grid ─────────────────────── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.dim, marginBottom: '1.25rem', textAlign: 'center' }}>
            Browse all programmes
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.875rem' }}>
            {PROGRAMMES.map(p => (
              <Link key={p.id} to={p.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  background:    T.cardBg,
                  border:        `1px solid ${T.cardBorder}`,
                  borderTop:     `3px solid ${p.colour}`,
                  borderRadius:  12,
                  padding:       '1.25rem 1rem',
                  textAlign:     'center',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '0.5rem',
                  cursor:        'pointer',
                  transition:    'transform 0.15s ease',
                }}>
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{p.emoji}</span>
                  <span style={{ fontSize: '0.925rem', fontWeight: 700, color: T.bright, lineHeight: 1.3 }}>{p.name}</span>
                  <span style={{ fontSize: '0.78rem', color: T.muted, lineHeight: 1.4 }}>{p.tagline}</span>
                  <span style={{
                    fontSize: '0.78rem', fontWeight: 700, color: T.gold,
                    background: T.goldBg, border: `1px solid ${T.goldBorder}`,
                    borderRadius: 100, padding: '2px 8px', alignSelf: 'center',
                  }}>
                    {p.avgMonthly}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: T.dim, marginTop: '0.875rem', fontStyle: 'italic' }}>
            Figures show typical monthly earnings for active creators — not the ceiling.
          </p>
        </section>

        {/* ── Section 2: Pick your talent card ─────────────── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            {sectionHeading('Pick your talent card')}
            {sectionSub('Not what you were taught. Not what looks good on a form. What you actually do.')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.875rem', maxWidth: 900, margin: '0 auto' }}>
            {TALENTS.map(t => (
              <button
                key={t.id}
                onClick={() => { setSelectedTalent(t.id); setShowTimeline(false); window.scrollBy({ top: 200, behavior: 'smooth' }); }}
                style={{
                  display:       'flex',
                  flexDirection: 'column',
                  alignItems:    'center',
                  gap:           '0.5rem',
                  padding:       '1.5rem 1rem',
                  background:    selectedTalent === t.id ? T.purpleBg : T.cardBg,
                  border:        `2px solid ${selectedTalent === t.id ? T.purple : T.cardBorder}`,
                  borderRadius:  12,
                  cursor:        'pointer',
                  textAlign:     'center',
                  transition:    'all 0.15s ease',
                  color:         T.bright,
                  fontFamily:    'inherit',
                }}
              >
                <span style={{ fontSize: '2.25rem', lineHeight: 1 }}>{t.emoji}</span>
                <span style={{ fontSize: '0.925rem', fontWeight: 700, color: T.bright, lineHeight: 1.3 }}>{t.label}</span>
                <span style={{ fontSize: '0.78rem', color: T.mid, lineHeight: 1.5 }}>{t.subtext}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Section 3: Result ─────────────────────────────── */}
        {selectedTalent && talent && (
          <section style={{ marginBottom: '3.5rem' }}>
            <div style={{
              background:   T.cardBg,
              border:       `1px solid ${T.purpleBorder}`,
              borderRadius: 16,
              padding:      '2rem',
              maxWidth:     800,
              margin:       '0 auto',
            }}>
              {/* Result header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.5rem' }}>{talent.emoji}</span>
                <div>
                  <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.4rem', fontWeight: 800, color: T.bright }}>{talent.label}</h2>
                  <span style={{ fontSize: '0.875rem', color: T.muted }}>{talent.subtext}</span>
                </div>
                <button onClick={() => setSelectedTalent(null)} style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${T.cardBorder}`, borderRadius: 6, color: T.muted, fontSize: '0.85rem', padding: '0.375rem 0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                  ← Choose again
                </button>
              </div>

              {/* Zone pathway */}
              <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160, padding: '1.125rem', background: T.goldBg, border: `1px solid ${T.goldBorder}`, borderRadius: 10 }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.gold, marginBottom: '0.5rem' }}>Zone 1 · Learn</span>
                  <span style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: T.bright, marginBottom: '0.25rem' }}>{talent.zone1}</span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: T.muted, lineHeight: 1.4 }}>Build the skill. No income yet — this is runway.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: T.dim, fontSize: '1.25rem', flexShrink: 0 }}>→</div>
                <div style={{ flex: 1, minWidth: 160, padding: '1.125rem', background: T.purpleBg, border: `1px solid ${T.purpleBorder}`, borderRadius: 10 }}>
                  <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T.purple, marginBottom: '0.5rem' }}>Zone 2 · Create &amp; Earn</span>
                  <span style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: T.bright, marginBottom: '0.25rem' }}>{talent.zone2}</span>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: T.muted, lineHeight: 1.4 }}>55% of everything you earn comes directly to you.</span>
                </div>
              </div>

              {/* Income stats */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'First income source', value: talent.firstIncome },
                  { label: '5-year potential',     value: talent.ceiling, highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label} style={{ flex: 1, minWidth: 140, padding: '1rem', background: T.cardBgDeep, borderRadius: 10, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.dim }}>{label}</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: highlight ? T.green : T.bright }}>{value}</span>
                    {highlight && <span style={{ fontSize: '0.7rem', color: T.dim, fontStyle: 'italic' }}>some creators reach this — not the average</span>}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: showTimeline ? '1.5rem' : 0 }}>
                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  style={{ padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${T.purple} 0%, #6366f1 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {showTimeline ? 'Hide timeline' : 'Show me the honest income timeline'}
                </button>
                <Link
                  to={`/programmes/${talent.programmeId}`}
                  style={{ padding: '0.75rem 1.5rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.main, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  Explore {talent.zone1} →
                </Link>
              </div>

              {/* Timeline */}
              {showTimeline && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${T.cardBorder}` }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700, color: T.bright }}>
                    What {talent.label.toLowerCase()} looks like — honestly
                  </h3>
                  <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: T.muted, lineHeight: 1.6 }}>
                    Year 1 shows nothing. That is honest — it's learning time, not earning time. The platform doesn't pretend otherwise.
                  </p>

                  {/* Threshold legend */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', fontSize: '0.78rem' }}>
                    {[
                      { label: `Survival £${THRESHOLDS.survival.toLocaleString()}/mo`,       colour: '#ef4444' },
                      { label: `Independence £${THRESHOLDS.independence.toLocaleString()}/mo`,colour: T.gold },
                      { label: `Comfortable £${THRESHOLDS.comfortable.toLocaleString()}/mo`,  colour: T.green },
                    ].map(({ label, colour }) => (
                      <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: T.muted }}>
                        <span style={{ width: 20, height: 2, background: colour, display: 'inline-block', borderRadius: 1 }} />
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                    {PHASE_DATA.map((phase, i) => {
                      const floorPct   = (phase.floor   / MAX_INCOME) * 100;
                      const ceilingPct = (phase.ceiling / MAX_INCOME) * 100;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                          <div style={{ width: 100, flexShrink: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: T.bright }}>{phase.phase}</span>
                            <span style={{ fontSize: '0.7rem', color: T.dim }}>{phase.year}</span>
                          </div>
                          <div style={{ flex: 1, position: 'relative', height: 24, background: 'rgba(148,163,184,0.1)', borderRadius: 4, overflow: 'visible' }}>
                            {[THRESHOLDS.survival, THRESHOLDS.independence, THRESHOLDS.comfortable].map((th, ti) => (
                              <div key={ti} style={{ position: 'absolute', left: `${(th / MAX_INCOME) * 100}%`, top: -4, bottom: -4, width: 1, background: ['#ef4444', T.gold, T.green][ti], opacity: 0.5 }} />
                            ))}
                            {phase.floor === 0 && phase.ceiling === 0 ? (
                              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontSize: '0.72rem', color: T.dim, fontStyle: 'italic' }}>Learning phase</span>
                            ) : (
                              <div style={{ position: 'absolute', left: `${floorPct}%`, width: `${ceilingPct - floorPct}%`, top: 2, bottom: 2, background: `linear-gradient(90deg, ${T.purple}, ${T.green})`, borderRadius: 3 }} />
                            )}
                          </div>
                          <div style={{ width: 110, flexShrink: 0, fontSize: '0.78rem', color: T.muted, textAlign: 'right' }}>
                            £{phase.floor.toLocaleString()} – £{phase.ceiling.toLocaleString()}{phase.ceiling >= MAX_INCOME ? '+' : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p style={{ margin: '1rem 0 1.25rem', fontSize: '0.8rem', color: T.dim, lineHeight: 1.6 }}>
                    Floor and ceiling figures assuming consistent weekly output. School or part-time work? The timelines stretch — the ceiling doesn't change.
                  </p>

                  <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                    <Link to={`/programmes/${talent.programmeId}`} style={{ padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${T.purple} 0%, #6366f1 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none' }}>
                      Start with {talent.zone1} →
                    </Link>
                    <Link to="/auth/signup" style={{ padding: '0.75rem 1.5rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.main, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}>
                      Join free to save this path
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Section 4: Success stories ────────────────────── */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 700, color: T.bright, textAlign: 'center' }}>
            People who started here
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {STORIES.map((s, i) => (
              <div key={i} style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: 12, padding: '1.375rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '1.1rem', flexShrink: 0 }}>
                    {s.name[0]}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1rem', color: T.bright }}>{s.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: T.dim }}>age {s.age}</span>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.875rem', fontWeight: 700, color: T.green, background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 100, padding: '3px 10px' }}>
                    {s.income}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: T.dim, marginBottom: '0.75rem' }}>{s.route}</div>
                <blockquote style={{ margin: 0, padding: '0.75rem', background: T.purpleBg, borderLeft: `3px solid ${T.purple}`, borderRadius: '0 6px 6px 0', fontSize: '0.925rem', color: T.mid, lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{s.quote}"
                </blockquote>
              </div>
            ))}
          </div>
          {/* What the Work Paid hook — will populate with real data over time */}
          <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: T.tealBg, border: `1px solid ${T.tealBorder}`, borderRadius: 10, maxWidth: 600, margin: '1.25rem auto 0' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: T.mid, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: T.teal }}>What the Work Paid</span> — real earnings from real creators, published monthly in Joystick.
              {' '}<Link to="/joystick" style={{ color: T.teal, textDecoration: 'none', fontWeight: 600 }}>Read the latest →</Link>
            </p>
          </div>
        </section>

        {/* ══ Section 5: Your Earning Path ══════════════════════════════════
            New section. Lower-end figures lead throughout.
            Three tabs: phases / programmes / combinations.
            Ends with pardner benefit note and Maya CTA.
        ══════════════════════════════════════════════════════════════════ */}
        <section style={{ marginBottom: '3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            {sectionHeading('Your Earning Path')}
            {sectionSub('Monthly figures. Honest ranges. What most people earn — not the headline exceptions.')}
          </div>

          {/* Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => setShowEarningPath(!showEarningPath)}
              style={{
                padding:    '0.85rem 2rem',
                background: showEarningPath ? T.tealBg : `linear-gradient(135deg, ${T.teal} 0%, #0f766e 100%)`,
                border:     `1px solid ${T.tealBorder}`,
                borderRadius: 10,
                color:      showEarningPath ? T.teal : '#fff',
                fontSize:   '0.95rem',
                fontWeight: 700,
                cursor:     'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              {showEarningPath ? 'Hide earning path ↑' : 'Show my earning path ↓'}
            </button>
          </div>

          {showEarningPath && (
            <div style={{ maxWidth: 900, margin: '0 auto' }}>

              {/* Tab navigation */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `1px solid ${T.cardBorder}`, paddingBottom: '0', flexWrap: 'wrap' }}>
                {([
                  { key: 'phases',       label: 'By timeline' },
                  { key: 'programmes',   label: 'By programme' },
                  { key: 'combinations', label: 'Combined income' },
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setEarningTab(tab.key)}
                    style={{
                      padding:      '0.625rem 1.25rem',
                      background:   earningTab === tab.key ? T.tealBg : 'none',
                      border:       'none',
                      borderBottom: earningTab === tab.key ? `2px solid ${T.teal}` : '2px solid transparent',
                      borderRadius: '6px 6px 0 0',
                      color:        earningTab === tab.key ? T.teal : T.muted,
                      fontSize:     '0.875rem',
                      fontWeight:   earningTab === tab.key ? 700 : 400,
                      cursor:       'pointer',
                      fontFamily:   'inherit',
                      marginBottom: '-1px',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Tab 1: By timeline (phases) ── */}
              {earningTab === 'phases' && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: T.muted, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    These are monthly figures. The left column is what most people earn. The right is what some people reach. Both are real.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {EARNING_PHASES.map((ep, i) => (
                      <div key={i} style={{
                        display:       'grid',
                        gridTemplateColumns: '160px 1fr 140px',
                        gap:           '1rem',
                        alignItems:    'center',
                        padding:       '1.125rem 1.25rem',
                        background:    T.cardBg,
                        border:        `1px solid ${T.cardBorder}`,
                        borderLeft:    `3px solid ${[T.dim, T.gold, T.purple, T.green][i]}`,
                        borderRadius:  10,
                      }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: T.bright }}>{ep.phase}</span>
                          <span style={{ fontSize: '0.75rem', color: T.dim }}>{ep.period}</span>
                        </div>
                        <div>
                          <p style={{ margin: '0 0 0.25rem', fontSize: '0.82rem', color: T.muted, lineHeight: 1.5 }}>{ep.note}</p>
                          <span style={{ fontSize: '0.75rem', color: T.dim, fontStyle: 'italic' }}>Some people reach {ep.some}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: T.green }}>{ep.typical}</span>
                          <span style={{ fontSize: '0.7rem', color: T.dim }}>most people</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: T.dim, lineHeight: 1.6, fontStyle: 'italic', textAlign: 'center' }}>
                    Outside London costs are lower — the same earnings go further. A creator in Wales or Birmingham reaches financial stability faster than one in Wembley on identical income.
                  </p>
                </div>
              )}

              {/* ── Tab 2: By programme ── */}
              {earningTab === 'programmes' && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: T.muted, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    Monthly earnings by programme. Passive income programmes build catalogue value that earns without fresh output.
                  </p>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px', fontSize: '0.82rem' }}>
                      <thead>
                        <tr>
                          {['Programme', 'Mo 1–6', 'Mo 6–18', 'Mo 18–36', 'Mo 36+', 'Passive'].map(h => (
                            <th key={h} style={{ padding: '0.5rem 0.875rem', textAlign: h === 'Programme' ? 'left' : 'center', color: T.dim, fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {PROGRAMME_EARNINGS.map((pe, i) => (
                          <tr key={i} style={{ background: T.cardBg }}>
                            <td style={{ padding: '0.75rem 0.875rem', borderRadius: '8px 0 0 8px', borderLeft: `3px solid ${pe.colour}` }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>{pe.emoji}</span>
                                <span style={{ fontWeight: 600, color: T.bright }}>{pe.programme}</span>
                              </span>
                            </td>
                            {[pe.mo1to6, pe.mo6to18, pe.mo18to36, pe.mo36plus].map((val, vi) => (
                              <td key={vi} style={{ padding: '0.75rem 0.875rem', textAlign: 'center', color: vi === 3 ? T.green : T.mid }}>{val}</td>
                            ))}
                            <td style={{ padding: '0.75rem 0.875rem', textAlign: 'center', borderRadius: '0 8px 8px 0' }}>
                              {pe.passive
                                ? <span style={{ color: T.teal, fontWeight: 700, fontSize: '0.75rem' }}>✓ Yes</span>
                                : <span style={{ color: T.dim,  fontSize: '0.75rem' }}>Active</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: T.dim, lineHeight: 1.6, fontStyle: 'italic' }}>
                    Passive = catalogue, licensing, or digital products earn without the creator being present. Active = income requires ongoing effort.
                  </p>
                </div>
              )}

              {/* ── Tab 3: Combined income ── */}
              {earningTab === 'combinations' && (
                <div>
                  <p style={{ fontSize: '0.85rem', color: T.muted, marginBottom: '1.25rem', lineHeight: 1.6 }}>
                    Cross-programme income is where the platform's model genuinely differentiates. No other platform lets you stack these income streams in one community economy.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {COMBINATIONS.map((c, i) => (
                      <div key={i} style={{ padding: '1.25rem', background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: T.bright, marginBottom: '0.2rem' }}>{c.label}</span>
                            <span style={{ fontSize: '0.75rem', color: T.dim }}>{c.programmes}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', textAlign: 'right' }}>
                            <div>
                              <span style={{ display: 'block', fontSize: '0.68rem', color: T.dim, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mo 1–6</span>
                              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: T.muted }}>{c.mo1to6}</span>
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: '0.68rem', color: T.dim, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mo 18–36</span>
                              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: T.purple }}>{c.mo18to36}</span>
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: '0.68rem', color: T.dim, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mo 36+</span>
                              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: T.green }}>{c.mo36plus}</span>
                            </div>
                          </div>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: T.muted, lineHeight: 1.5, fontStyle: 'italic' }}>{c.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Pardner / community benefit note ── */}
              <div style={{
                marginTop:    '2rem',
                padding:      '1.5rem',
                background:   T.goldBg,
                border:       `1px solid ${T.goldBorder}`,
                borderRadius: 12,
              }}>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 700, color: T.gold }}>
                  The 25% that flows back
                </h3>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.65 }}>
                  For every pound you earn, 25p goes into the community pool — governed by the community itself,
                  not by us. That pool funds shared equipment, the Cultivation Pardner floor payment for creators
                  in a lean month, and the sessions you attend. It's the pardner hand principle: what the community
                  generates, the community keeps.
                </p>
                <p style={{ margin: '0 0 0.875rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.65 }}>
                  If you have a difficult month and drop below £150 in earnings, the Cultivation Pardner can
                  supplement your income — not as charity, as the system working as designed.
                </p>
                <Link to="/how-it-works" style={{ fontSize: '0.85rem', fontWeight: 700, color: T.gold, textDecoration: 'none' }}>
                  How the 55/25/20 model works →
                </Link>
              </div>

              {/* ── UC / semi-retiree note ── */}
              <div style={{
                marginTop:    '1rem',
                padding:      '1rem 1.25rem',
                background:   T.cardBgDeep,
                border:       `1px solid ${T.cardBorder}`,
                borderRadius: 10,
              }}>
                <p style={{ margin: 0, fontSize: '0.8rem', color: T.dim, lineHeight: 1.65 }}>
                  <strong style={{ color: T.muted }}>On Universal Credit?</strong> Platform earnings above your work allowance reduce your UC award by 55p per pound. The figures above are gross — your net gain depends on your UC situation.
                  {' '}<strong style={{ color: T.muted }}>Semi-retired or drawing pension?</strong> Earnings below your personal allowance (£12,570/yr) are tax-free. The passive income model suits this life stage particularly well.
                </p>
              </div>

              {/* ── Maya personalised plan CTA ── */}
              <div style={{
                marginTop:    '1.5rem',
                padding:      '1.75rem',
                background:   T.purpleBg,
                border:       `1px solid ${T.purpleBorder}`,
                borderRadius: 14,
                textAlign:    'center',
              }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700, color: T.bright }}>
                  Want to see what this looks like for you specifically?
                </h3>
                <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: T.muted, lineHeight: 1.6, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                  Maya will ask you four questions — what you make, how much time you have, where you are in your working life, and what a good outcome looks like — then map a personalised earning path with the right ROV for your situation.
                </p>
                <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('maya:open', { detail: { source: 'creator-pathways', intent: 'earning-path' } }))}
                    style={{ padding: '0.85rem 1.75rem', background: `linear-gradient(135deg, ${T.purple} 0%, #6366f1 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    Talk to Maya →
                  </button>
                  <Link
                    to="/auth/signup"
                    style={{ padding: '0.85rem 1.75rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.main, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Join free first
                  </Link>
                </div>
              </div>

            </div>
          )}
        </section>

        {/* ── Bottom CTA ────────────────────────────────────── */}
        <div style={{ textAlign: 'center', padding: '2.5rem 2rem', background: 'rgba(139,92,246,0.06)', border: `1px solid ${T.purpleBorder}`, borderRadius: 20 }}>
          <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.4rem', fontWeight: 800, color: T.bright }}>
            Ready to find your path?
          </h2>
          <p style={{ margin: '0 auto 1.5rem', fontSize: '0.975rem', color: T.muted, maxWidth: 480, lineHeight: 1.65 }}>
            Pick your talent card above, or join free and let Maya guide you to the right programme.
          </p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth/signup" style={{ padding: '0.85rem 1.75rem', background: `linear-gradient(135deg, ${T.purple} 0%, #6366f1 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: '0.975rem', fontWeight: 700, textDecoration: 'none' }}>
              Join free →
            </Link>
            <Link to="/start" style={{ padding: '0.85rem 1.75rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.main, fontSize: '0.975rem', fontWeight: 600, textDecoration: 'none' }}>
              Try Judith's question first
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreatorPathwaysPage;