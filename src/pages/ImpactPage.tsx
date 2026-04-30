// src/pages/ImpactPage.tsx
// v4 — Everything v3 did, plus what we've built since.
//
// What's new in v4:
// — The platform statement: what this platform believes about Black art
// — The Knowledge Commons: three profiles as living proof of the system
// — The originStory principle: the most important field on the platform
// — The Fast Track: fourteen days, seed to broadcast
// — The Brotherman principle: they go to their grave with no songs written
//
// What's unchanged from v3:
// — The honest account (still the best section)
// — The five roles framework
// — The Equiano section
// — The CTA structure
//
// Reader: young person / parent / potential creator from Wembley community.
// Also: funders, partners, journalists — but written for the community first.
// Flow: Strip → Hero → Statement → Honest → System → Knowledge Commons →
//       Five Roles → originStory → Why → Equiano → CTA

import React, { useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────
// TOKENS
// Extended from v3. Same palette, new additions.
// ─────────────────────────────────────────

const T = {
  bg:            '#0f172a',
  bgCard:        'rgba(30, 41, 59, 0.5)',
  bgDark:        'rgba(15, 23, 42, 0.7)',
  border:        'rgba(148, 163, 184, 0.2)',
  borderGold:    'rgba(251, 191, 36, 0.2)',
  textPrimary:   '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted:     '#94a3b8',
  textDim:       '#64748b',
  green:         '#10b981',
  greenDk:       '#059669',
  cyan:          '#0ea5e9',
  purple:        '#a855f7',
  gold:          '#fbbf24',
  teal:          '#3ecfcf',   // Fast Track / Rayd-yo
  red:           '#e74c3c',   // The gap
  font:          "'DM Serif Display', 'Playfair Display', Georgia, serif",
  fontBody:      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono:      "'JetBrains Mono', 'Courier New', monospace",
};

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const FRAMEWORK = [
  {
    c: 'Connect',
    role: 'Origin Keeper',
    colour: T.gold,
    borderColour: 'rgba(251,191,36,0.4)',
    bg: 'rgba(251,191,36,0.08)',
    plain: 'You had the idea first.',
    statement: "You brought something into the world that wasn't there before.",
    description:
      "In most creative industries, the person who had the original idea gets the least credit once the work is finished. We record who that person was — and they get paid alongside everyone else.",
  },
  {
    c: 'Create',
    role: 'Developer',
    colour: T.green,
    borderColour: 'rgba(16,185,129,0.4)',
    bg: 'rgba(16,185,129,0.08)',
    plain: 'You did the work that made it real.',
    statement: 'You took the raw material and made it real.',
    description:
      "The producer, the arranger, the writer, the coder — the person who turns a rough idea into something finished. Their labour disappears into the final product. Ours doesn't.",
  },
  {
    c: 'Cultivate',
    role: 'Facilitator',
    colour: T.cyan,
    borderColour: 'rgba(14,165,233,0.4)',
    bg: 'rgba(14,165,233,0.08)',
    plain: 'You made it possible for everyone else.',
    statement: 'You held the space so everyone else could work.',
    description:
      'The session runner. The community organiser. The person who sets up the room, manages the energy, and makes sure nobody gets left behind. Usually the last to get paid — or not paid at all. Not here.',
  },
  {
    c: 'Compete',
    role: 'Performer',
    colour: '#f97316',
    borderColour: 'rgba(249,115,22,0.4)',
    bg: 'rgba(249,115,22,0.08)',
    plain: 'You stood up and delivered it.',
    statement: 'You carried the work into the room and stood behind it.',
    description:
      "The performer is the only person traditional industries recognise and pay. We think that's wrong. The performer is one of five — an important one, but not the only one.",
  },
  {
    c: 'Celebrate',
    role: 'Contextualiser',
    colour: T.purple,
    borderColour: 'rgba(168,85,247,0.4)',
    bg: 'rgba(168,85,247,0.08)',
    plain: 'You explained why it mattered.',
    statement: 'You said: this matters, and here is why.',
    description:
      'The reviewer, the documentarian, the person who writes it up, films it, archives it, tells the story. Without them, the work happens and disappears. With them, it becomes part of a record.',
  },
];

const WHAT_WE_DO = [
  {
    n: '01',
    icon: '📌',
    heading: 'We record who made what.',
    body: 'At every session, every Half Term, every Coach Trip — whoever originates, develops, facilitates, performs, or contextualises a piece of work gets their name attached to it. Permanently. In a database. With a timestamp.',
  },
  {
    n: '02',
    icon: '💷',
    heading: 'We pay the people who are usually unpaid.',
    body: "55% of revenue from any commercial performance flows back to the contributors. Not just the performer — all five roles. The split is built into the system. It doesn't depend on anyone's generosity.",
  },
  {
    n: '03',
    icon: '🎫',
    heading: 'Everyone leaves with a claim slip.',
    body: 'Every participant gets a printed QR slip at the end of a session. Their name. Their piece. Their role. A 90-day window to scan, register, and claim their credit. The system waits for them.',
  },
  {
    n: '04',
    icon: '🗺️',
    heading: 'There is a roadmap, not just a programme.',
    body: 'Five pathways. Structured progression. Peer accountability. Not "work hard and something will happen" — a clear route with economic outcomes attached to each stage.',
  },
];

const HONEST = [
  {
    label: "What we won't do",
    colour: '#f87171',
    items: [
      "Publish statistics we can't verify",
      'Use stock photographs of strangers',
      'Define success as the absence of pathology',
      "Promise outcomes we haven't yet earned",
    ],
  },
  {
    label: 'What we will do',
    colour: T.green,
    items: [
      'Show you the actual system and how it works',
      'Let you try the programmes before you commit',
      'Update this page as real data becomes available',
      'Tell you exactly where the money goes',
    ],
  },
];

// Archive profiles — three examples of the system working
const ARCHIVE_EXAMPLES = [
  {
    name: 'Jonathan Strong',
    dates: '~1748–1773',
    field: 'Subject of the first legal challenge to slavery in Britain',
    gap: 'Baptised at 15, beaten and left for dead, freed by the Lord Mayor. Died free, aged 25. Not in the national curriculum. No blue plaque.',
    colour: T.gold,
    profileId: 'jonathan-strong',
  },
  {
    name: 'George Padmore',
    dates: '1903–1959',
    field: 'Architect of Pan-Africanism. Organised African independence from a North London flat.',
    gap: 'The 5th Pan-African Congress (Manchester, 1945) changed the map of Africa. His flat in NW1 is unmarked. His name is not in British school history.',
    colour: T.teal,
    profileId: 'george-padmore',
  },
  {
    name: 'Felicity Ethnic',
    dates: '1987–present',
    field: 'Character comedienne. Pearlene, Ma Bennette, Vilma Simmit, Bigga International.',
    gap: 'Thirty-seven years of performance. Four award wins. An international touring record. Almost no presence in any official record of British comedy.',
    colour: T.purple,
    profileId: 'felicity-ethnic',
  },
];

// Fast Track formats for the impact page
const FAST_TRACK_FORMATS = [
  { icon: '🕷', label: 'Anansi Retelling', dest: 'Rayd-yo broadcast' },
  { icon: '◎', label: 'Response Poem',    dest: 'Rayd-yo or Joystick' },
  { icon: '◌', label: 'Flash Story',      dest: 'Joystick' },
  { icon: '◉', label: 'Personal Response',dest: 'Joystick' },
  { icon: '▷', label: 'Broadcast Minute', dest: 'Rayd-yo — live' },
];

// ─────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────

const cardBase: CSSProperties = {
  background: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(148, 163, 184, 0.2)',
  borderRadius: 12,
  padding: '2rem',
  backdropFilter: 'blur(10px)',
};

const sectionBase: CSSProperties = {
  padding: '4rem 2rem',
  maxWidth: 1200,
  margin: '0 auto',
};

const labelStyle: CSSProperties = {
  fontFamily: T.fontBody,
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: T.gold,
  display: 'block',
  marginBottom: 16,
};

const h2Style: CSSProperties = {
  fontFamily: T.font,
  fontWeight: 900,
  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
  lineHeight: 1.15,
  color: T.textPrimary,
  margin: '0 0 1.5rem 0',
};

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

const ImpactPage: React.FC = () => {
  const [activeC, setActiveC]           = useState(0);
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null);
  const [hoveredDoes, setHoveredDoes]   = useState<number | null>(null);
  const [activeArchive, setActiveArchive] = useState(0);

  const active        = FRAMEWORK[activeC];
  const activeProfile = ARCHIVE_EXAMPLES[activeArchive];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${T.bg} 0%, #1e293b 100%)`,
      color: T.textPrimary,
      fontFamily: T.fontBody,
    }}>

      {/* ══════════════════════════════════════════════════
          0. ANNOUNCEMENT STRIP
          The counter-archive is open. One line.
          ══════════════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(62, 207, 207, 0.08)',
        borderBottom: '1px solid rgba(62, 207, 207, 0.2)',
        padding: '0.6rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: T.fontMono,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: T.teal,
        }}>
          New
        </span>
        <span style={{ fontSize: '0.875rem', color: T.textSecondary }}>
          The Knowledge Commons is open — a counter-archive of Black British history built by this community.
        </span>
        <Link
          to="/heritage"
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: T.teal,
            textDecoration: 'none',
            borderBottom: '1px solid rgba(62,207,207,0.4)',
            paddingBottom: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Explore the archive →
        </Link>
      </div>

      {/* ══════════════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, #1e293b 0%, ${T.bg} 100%)`,
        padding: '5rem 2rem 4rem',
        textAlign: 'center',
        borderBottom: `2px solid rgba(16,185,129,0.3)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: T.bgDark, backdropFilter: 'blur(10px)',
            padding: '0.6rem 1.25rem', borderRadius: 24,
            border: `1px solid ${T.border}`,
            color: T.textMuted, fontSize: '0.85rem', fontWeight: 500,
            marginBottom: '2rem',
          }}>
            <span>📍</span> Wembley Wonders CIC · Based in Wembley, HA9
          </div>

          <h1 style={{
            fontFamily: T.font,
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
            lineHeight: 1.15,
            margin: '0 0 1.5rem 0',
            color: T.textPrimary,
          }}>
            We exist because the people who{' '}
            <span style={{
              background: `linear-gradient(135deg, ${T.green} 0%, ${T.cyan} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              create the most
            </span>{' '}
            get credited the least.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            color: T.textSecondary,
            maxWidth: 620,
            margin: '0 auto 2.5rem',
          }}>
            We're a community organisation in Wembley. We run programmes in
            music, technology, and creative skills — and we've built a system
            that records every contribution and pays everyone involved.
            Not just the performer. Everyone.
          </p>

          <div style={{
            display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[
              { icon: '📋', text: 'Every contribution is recorded' },
              { icon: '💷', text: 'Every role gets paid' },
              { icon: '🗺️', text: 'There is a clear pathway forward' },
            ].map(f => (
              <div key={f.text} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 8, padding: '0.55rem 1rem',
                fontSize: '0.85rem', fontWeight: 600, color: T.textSecondary,
              }}>
                <span>{f.icon}</span>{f.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          1b. THE PLATFORM STATEMENT
          What this platform believes about Black art.
          Written without referencing the argument —
          because the statement should stand on its own.
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 2rem',
        background: `linear-gradient(180deg, rgba(212,168,83,0.04) 0%, transparent 100%)`,
        borderBottom: `1px solid ${T.borderGold}`,
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <span style={labelStyle}>What we believe</span>

          {/* The seven sentences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{
              fontFamily: T.font,
              fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
              fontWeight: 700,
              lineHeight: 1.3,
              color: T.textPrimary,
              margin: 0,
              borderLeft: `4px solid ${T.gold}`,
              paddingLeft: '1.5rem',
            }}>
              This platform was built for the people who go to their grave
              with no songs written about them.
            </p>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: T.textSecondary,
              margin: 0,
            }}>
              The contribution was always there. The record wasn't.
              Communities like this one have always produced extraordinary
              creative work — in music, in language, in storytelling, in
              technology, in the daily act of making something out of nothing.
              That work built industries. It shaped cultures. It fed economies
              that were not built to feed back.
            </p>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: T.textSecondary,
              margin: 0,
            }}>
              The system that extracted that work without credit is not a
              historical problem. It is a present one. It operates in
              streaming royalties and publishing contracts and school
              curricula and cultural awards and the names on blue plaques
              and the names that are missing from them.
            </p>

            {/* The three-line argument — separated visually */}
            <div style={{
              padding: '2rem',
              background: 'rgba(251,191,36,0.05)',
              border: `1px solid ${T.borderGold}`,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {[
                { text: 'We write the songs.', colour: T.gold },
                { text: 'We keep the rights.', colour: T.green },
                { text: 'We set the standard. The community is the room. The cream rises because the room demands it.', colour: T.teal },
              ].map((line, i) => (
                <p key={i} style={{
                  fontFamily: T.font,
                  fontSize: i === 2 ? '1rem' : 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: 700,
                  color: line.colour,
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {line.text}
                </p>
              ))}
            </div>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: T.textMuted,
              margin: 0,
              fontStyle: 'italic',
            }}>
              This is not a diversity initiative. It is not a social enterprise
              with a mission statement. It is an infrastructure — a system for
              making sure that what is created here stays connected to the
              people who created it: in the record, in the credit, and in the income.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. HONEST ACCOUNT — unchanged from v3
          ══════════════════════════════════════════════════ */}
      <section style={{ ...sectionBase, maxWidth: 900 }}>
        <span style={labelStyle}>Before we go any further</span>
        <h2 style={h2Style}>
          We launched in 2020.{' '}
          <span style={{ color: T.gold }}>The data is still being made.</span>
        </h2>
        <p style={{
          fontSize: '1.05rem', lineHeight: 1.75,
          color: T.textMuted, maxWidth: 620, margin: '0 0 2rem',
        }}>
          Most organisations in our position would fill this page with
          statistics and success stories. We're not going to do that —
          because we don't think it serves you. Here's what we will and
          won't do instead.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {HONEST.map(col => (
            <div key={col.label} style={{ ...cardBase, borderTop: `3px solid ${col.colour}` }}>
              <h3 style={{
                fontSize: '0.8rem', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: col.colour, marginBottom: '1.25rem',
              }}>
                {col.label}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {col.items.map(item => (
                  <li key={item} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontSize: '0.95rem', lineHeight: 1.6, color: T.textSecondary,
                  }}>
                    <span style={{ color: col.colour, flexShrink: 0, marginTop: 3, fontWeight: 700 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.95rem', lineHeight: 1.75, color: T.textDim,
          fontStyle: 'italic',
          borderTop: `1px solid ${T.border}`,
          paddingTop: '1.5rem', maxWidth: 580,
        }}>
          As participants claim their credits and performances generate
          revenue, this page will update with real numbers from the real
          system. The evidence is being made right now.
        </p>

        <div style={{
          marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 10,
          background: 'rgba(251,191,36,0.05)',
          border: `1px solid ${T.borderGold}`,
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 2 }}>👁</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: T.gold, margin: '0 0 4px' }}>
              No stock photos. No AI faces. No borrowed credibility.
            </p>
            <p style={{ fontSize: '0.88rem', color: T.textMuted, margin: 0, lineHeight: 1.6 }}>
              If we can't explain what we do clearly enough in words,
              no image is going to fix that. You deserve a straight account.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. WHAT WE'VE BUILT — unchanged from v3
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(14,165,233,0.03)',
        borderTop: `1px solid rgba(14,165,233,0.12)`,
        borderBottom: `1px solid rgba(14,165,233,0.12)`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={labelStyle}>What we've built</span>
          <h2 style={h2Style}>
            Not a mission statement.{' '}
            <span style={{ color: T.cyan }}>An actual system.</span>
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75, color: T.textMuted,
            maxWidth: 580, margin: '0 0 2.5rem',
          }}>
            Four things that work together. Each one solves a specific
            problem that the traditional creative industry leaves unsolved.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}>
            {WHAT_WE_DO.map((item, i) => (
              <div
                key={item.n}
                onMouseEnter={() => setHoveredDoes(i)}
                onMouseLeave={() => setHoveredDoes(null)}
                style={{
                  ...cardBase,
                  transition: 'all 0.2s ease',
                  transform: hoveredDoes === i ? 'translateY(-3px)' : 'none',
                  boxShadow: hoveredDoes === i ? '0 14px 32px rgba(0,0,0,0.3)' : 'none',
                  borderTop: `2px solid ${hoveredDoes === i ? T.cyan : 'transparent'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 700,
                    color: T.textDim, textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>
                    {item.n}
                  </span>
                </div>
                <h3 style={{
                  fontWeight: 700, fontSize: '1rem',
                  color: T.textPrimary, marginBottom: '0.65rem', lineHeight: 1.3,
                  fontFamily: T.fontBody,
                }}>
                  {item.heading}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: T.textMuted, margin: 0 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3b. THE KNOWLEDGE COMMONS
          Three profiles. The system as evidence.
          Not described — demonstrated.
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: `linear-gradient(180deg, rgba(155,127,232,0.04) 0%, transparent 100%)`,
        borderBottom: `1px solid rgba(155,127,232,0.15)`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ ...labelStyle, color: '#9b7fe8' }}>The Knowledge Commons</span>
          <h2 style={h2Style}>
            We built the counter-archive.{' '}
            <span style={{ color: '#9b7fe8' }}>The record the mainstream missed.</span>
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75, color: T.textMuted,
            maxWidth: 680, margin: '0 0 2.5rem',
          }}>
            The Knowledge Commons is a growing archive of Black British history,
            written as page-turners — not Wikipedia entries. Every profile names
            the achievement, the structural context, and the gap: why this person
            isn't better known, and what that tells us about who the mainstream
            archive was built to serve.
          </p>

          {/* Profile selector tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {ARCHIVE_EXAMPLES.map((ex, i) => (
              <button
                key={ex.profileId}
                onClick={() => setActiveArchive(i)}
                style={{
                  background: i === activeArchive
                    ? `rgba(${ex.colour === T.gold ? '251,191,36' : ex.colour === T.teal ? '62,207,207' : '168,85,247'},0.12)`
                    : 'rgba(30,41,59,0.5)',
                  border: `1px solid ${i === activeArchive
                    ? `${ex.colour}`
                    : 'rgba(148,163,184,0.2)'}`,
                  borderRadius: 8,
                  padding: '0.65rem 1.1rem',
                  cursor: 'pointer',
                  color: i === activeArchive ? ex.colour : T.textMuted,
                  fontFamily: T.fontBody,
                  fontWeight: i === activeArchive ? 700 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                {ex.name}
              </button>
            ))}
          </div>

          {/* Active profile card */}
          <div style={{
            ...cardBase,
            background: `rgba(${activeProfile.colour === T.gold ? '251,191,36' : activeProfile.colour === T.teal ? '62,207,207' : '168,85,247'},0.05)`,
            border: `1px solid ${activeProfile.colour}40`,
            borderLeft: `4px solid ${activeProfile.colour}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: T.fontMono,
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeProfile.colour,
              }}>
                Counter-archive
              </span>
              <span style={{ color: T.textDim, fontSize: '0.8rem' }}>{activeProfile.dates}</span>
            </div>

            <h3 style={{
              fontFamily: T.font,
              fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
              fontWeight: 700,
              color: T.textPrimary,
              margin: '0 0 0.5rem',
            }}>
              {activeProfile.name}
            </h3>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: T.textSecondary,
              margin: '0 0 1.25rem',
            }}>
              {activeProfile.field}
            </p>

            {/* The gap */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'rgba(231,76,60,0.08)',
              border: '1px solid rgba(231,76,60,0.2)',
              borderRadius: 8,
              marginBottom: '1.25rem',
            }}>
              <span style={{
                fontFamily: T.fontMono,
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: T.red,
                display: 'block',
                marginBottom: 6,
              }}>
                The gap
              </span>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: T.textMuted, margin: 0 }}>
                {activeProfile.gap}
              </p>
            </div>

            <Link
              to={`/heritage?mode=thread`}
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.25rem',
                background: 'transparent',
                border: `1px solid ${activeProfile.colour}60`,
                borderRadius: 6,
                color: activeProfile.colour,
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.15s ease',
                fontFamily: T.fontBody,
              }}
            >
              Read their full profile in the Knowledge Commons →
            </Link>
          </div>

          <p style={{
            fontSize: '0.9rem',
            color: T.textDim,
            marginTop: '1.5rem',
            fontStyle: 'italic',
            lineHeight: 1.65,
          }}>
            The archive currently holds 20 profiles and is growing.
            Community members who research and document figures
            not yet in the archive contribute directly —
            their name is attached to the profile they build.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. THE FIVE ROLES — unchanged from v3
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(16,185,129,0.03)',
        borderBottom: `1px solid rgba(16,185,129,0.12)`,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={labelStyle}>The five roles</span>
          <h2 style={h2Style}>
            Traditional creative industries pay one person.{' '}
            <span style={{ color: T.green }}>We pay five.</span>
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75, color: T.textMuted,
            maxWidth: 620, margin: '0 0 2rem',
          }}>
            Every piece of creative work involves at least five kinds of
            contribution. Most industries only recognise — and pay — the
            performer. The other four walk away with nothing. Select a role
            below to see exactly what we mean.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {FRAMEWORK.map((item, i) => (
              <button
                key={item.c}
                onClick={() => setActiveC(i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-pressed={i === activeC}
                style={{
                  background: i === activeC
                    ? item.bg
                    : hoveredCard === i ? 'rgba(255,255,255,0.04)' : 'rgba(30,41,59,0.5)',
                  border: `1px solid ${i === activeC ? item.borderColour : T.border}`,
                  borderRadius: 8,
                  padding: '0.65rem 1.1rem',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3,
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontWeight: 700, fontSize: '0.85rem',
                  color: i === activeC ? item.colour : T.textMuted,
                  fontFamily: T.fontBody,
                }}>
                  {item.c} → {item.role}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: i === activeC ? item.colour : T.textDim,
                  fontFamily: T.fontBody,
                  opacity: 0.85,
                }}>
                  {item.plain}
                </span>
              </button>
            ))}
          </div>

          <div
            key={activeC}
            style={{
              ...cardBase,
              background: active.bg,
              border: `1px solid ${active.borderColour}`,
              borderLeft: `4px solid ${active.colour}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: active.colour, fontFamily: T.fontBody }}>
                {active.c}
              </span>
              <span style={{ color: T.textDim }}>→</span>
              <span style={{
                background: active.bg, color: active.colour,
                border: `1px solid ${active.borderColour}`,
                borderRadius: 20, padding: '2px 12px',
                fontSize: '0.8rem', fontWeight: 600, fontFamily: T.fontBody,
              }}>
                {active.role}
              </span>
              <span style={{ fontSize: '0.82rem', color: T.textMuted, fontStyle: 'italic', fontFamily: T.fontBody }}>
                — {active.plain}
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
              fontStyle: 'italic', fontWeight: 600,
              color: T.textPrimary, lineHeight: 1.4, marginBottom: '0.85rem',
              fontFamily: T.font,
            }}>
              "{active.statement}"
            </p>
            <p style={{
              fontSize: '1rem', lineHeight: 1.75,
              color: T.textSecondary, margin: 0, maxWidth: 640,
              fontFamily: T.fontBody,
            }}>
              {active.description}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4b. THE ORIGINSTORY PRINCIPLE
          The most important field on the platform —
          explained in plain language.
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(62,207,207,0.03)',
        borderBottom: `1px solid rgba(62,207,207,0.12)`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <span style={{ ...labelStyle, color: T.teal }}>The most important part</span>
          <h2 style={h2Style}>
            The sentence that makes your work{' '}
            <span style={{ color: T.teal }}>irreplaceable.</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            <div>
              <p style={{
                fontSize: '1.05rem', lineHeight: 1.8,
                color: T.textSecondary, margin: '0 0 1.5rem',
              }}>
                Every piece of work that moves through this platform carries
                one field that no system, no algorithm, and no institution
                can generate. We call it the originStory.
              </p>
              <p style={{
                fontSize: '1.05rem', lineHeight: 1.8,
                color: T.textSecondary, margin: '0 0 1.5rem',
              }}>
                It is one sentence. Written by a facilitator who was in
                the room. Specific to you and no one else.
                It is what makes your work impossible to replicate —
                because it carries who you are, not just what you made.
              </p>
              <p style={{
                fontSize: '1rem', lineHeight: 1.8,
                color: T.textMuted, margin: 0, fontStyle: 'italic',
              }}>
                Nothing on this platform publishes or broadcasts without it.
                That is not a rule. It is how we make sure you stay
                connected to your own work.
              </p>
            </div>

            {/* Example originStories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  story: 'Marcus heard the spider story and decided Anansi would have a different opinion about TikTok.',
                  meta: 'Marcus · age 14 · Bright Sparks · Anansi retelling → Rayd-yo',
                  colour: '#f39c12',
                },
                {
                  story: 'Eunice described the house on Harlesden Road for the first time in sixty years.',
                  meta: 'Eunice · age 78 · Oral History · testimony → Knowledge Commons',
                  colour: T.gold,
                },
                {
                  story: 'Felicia wrote the essay she couldn\'t write at school because she didn\'t know the words were allowed to be hers.',
                  meta: 'Felicia · Pageturners cohort 3 · personal essay → Joystick',
                  colour: T.teal,
                },
              ].map((ex, i) => (
                <div key={i} style={{
                  ...cardBase,
                  padding: '1.25rem',
                  borderLeft: `3px solid ${ex.colour}`,
                  background: `rgba(${ex.colour === T.teal ? '62,207,207' : '251,191,36'},0.05)`,
                }}>
                  <p style={{
                    fontFamily: T.font,
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    color: T.textPrimary,
                    margin: '0 0 0.5rem',
                    lineHeight: 1.55,
                  }}>
                    "{ex.story}"
                  </p>
                  <span style={{
                    fontFamily: T.fontMono,
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                    color: T.textDim,
                  }}>
                    {ex.meta}
                  </span>
                </div>
              ))}
              <p style={{
                fontSize: '0.8rem', color: T.textDim,
                fontStyle: 'italic', lineHeight: 1.6,
                margin: '0.5rem 0 0',
              }}>
                These are illustrative examples. The real ones are being
                written now, in sessions at 452 High Road.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4c. THE FAST TRACK
          Fourteen days. Seed to broadcast.
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: `linear-gradient(135deg, rgba(62,207,207,0.05) 0%, rgba(10,10,15,0) 100%)`,
        borderBottom: `1px solid rgba(62,207,207,0.15)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Atmospheric glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '40%', height: '100%',
          background: 'linear-gradient(270deg, rgba(62,207,207,0.04) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: T.teal,
              color: '#0a0a0f',
              fontFamily: T.fontMono,
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 4,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#0a0a0f',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              Fast Track
            </div>
            <span style={{
              fontFamily: T.fontMono,
              fontSize: '0.7rem',
              color: T.teal,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              14 days · seed to broadcast
            </span>
          </div>

          <h2 style={{ ...h2Style, color: T.textPrimary }}>
            The Cotton Club didn't ask permission.{' '}
            <span style={{ color: T.teal }}>It set a standard.</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}>
            <div>
              <p style={{
                fontSize: '1.05rem', lineHeight: 1.8,
                color: T.textSecondary, margin: '0 0 1.25rem',
              }}>
                The Fast Track is a fourteen-day production cycle for
                first-response content. Not a simplified version of the
                programme — a different form. Call and response culture
                meeting craftsmanship. The performance happens in the room
                and the room responds in real time.
              </p>
              <p style={{
                fontSize: '1rem', lineHeight: 1.8,
                color: T.textMuted, margin: '0 0 1.5rem',
              }}>
                Day one: the seed, the first draft, the originStory written.
                Day fourteen: on air on Rayd-yo or published in Joystick.
                The community hears it. The loop is live.
              </p>
              <p style={{
                fontSize: '0.95rem', lineHeight: 1.75,
                color: T.textMuted, margin: 0,
                padding: '1rem',
                background: 'rgba(62,207,207,0.06)',
                border: '1px solid rgba(62,207,207,0.2)',
                borderRadius: 8,
                fontStyle: 'italic',
              }}>
                "The gate is not 'is this good enough.' The gate is whether
                the piece, when broadcast or published, produces a response.
                The cream rises because the room demands it.
                The room is the community. Not the mainstream."
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{
                fontFamily: T.fontMono,
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: T.teal,
                margin: '0 0 0.25rem',
              }}>
                Five formats
              </p>
              {FAST_TRACK_FORMATS.map(f => (
                <div key={f.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '0.75rem 1rem',
                  background: 'rgba(62,207,207,0.06)',
                  border: '1px solid rgba(62,207,207,0.15)',
                  borderRadius: 8,
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{f.icon}</span>
                  <div style={{ flex: 1 }}>
                    <strong style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      color: T.textPrimary,
                      fontFamily: T.fontBody,
                    }}>
                      {f.label}
                    </strong>
                    <span style={{
                      fontSize: '0.75rem',
                      color: T.teal,
                      fontFamily: T.fontMono,
                    }}>
                      → {f.dest}
                    </span>
                  </div>
                </div>
              ))}
              <Link
                to="/programmes/pageturners/sandbox?fasttrack=true"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  background: T.teal,
                  color: '#0a0a0f',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontFamily: T.fontBody,
                  marginTop: '0.5rem',
                  transition: 'opacity 0.15s ease',
                }}
              >
                Your call is waiting →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. WHY IT WAS NECESSARY — unchanged from v3
          ══════════════════════════════════════════════════ */}
      <section style={{ ...sectionBase, maxWidth: 820 }}>
        <span style={labelStyle}>Why this was necessary</span>
        <h2 style={h2Style}>
          The contribution was always there.{' '}
          <span style={{ color: T.green }}>The record wasn't.</span>
        </h2>

        <div style={{
          padding: '1.5rem', borderRadius: 12,
          background: 'rgba(16,185,129,0.05)',
          border: `1px solid rgba(16,185,129,0.15)`,
          marginBottom: '2rem',
        }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: T.textSecondary, margin: 0 }}>
            Communities like Wembley produce enormous creative and cultural
            value — in music, in language, in aesthetic, in innovation. That
            value almost never stays connected to the people who made it.
            There's no record. No credit. No payment. The work gets used;
            the people who made it move on with nothing to show for it.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
            The young people we work with are not behind. They are not
            in need of remediation. They are not problems to be solved.
            They are unrecorded — excluded from the pipelines that would
            connect their contribution to their name, their credit, and
            their income.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: T.textMuted, margin: 0 }}>
            The "Forgotten 60%" is what we call the working-class communities
            left out of traditional creative and technology education. Not
            because the talent isn't there. Because the infrastructure
            wasn't built for them. We're building it.
          </p>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          paddingLeft: '1.25rem',
          borderLeft: `3px solid ${T.green}`,
        }}>
          <p style={{
            fontWeight: 800,
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: T.green, margin: 0, lineHeight: 1.3,
            fontFamily: T.fontBody,
          }}>
            The five roles aren't a new idea. They're what people already do.
          </p>
          <p style={{
            fontWeight: 700,
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: T.textSecondary, margin: 0, lineHeight: 1.5,
            fontFamily: T.fontBody,
          }}>
            We built the system that records it, the mechanism that pays it,
            and the pathway that turns it into something you can build a life on.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. EQUIANO — extended with the Brotherman principle
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 2rem',
        background: `linear-gradient(135deg, rgba(251,191,36,0.05) 0%, ${T.bg} 100%)`,
        borderTop: `1px solid ${T.borderGold}`,
        borderBottom: `1px solid ${T.borderGold}`,
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* The Equiano block — unchanged */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: 26, marginBottom: '1.5rem', opacity: 0.5 }}>◈</div>
            <blockquote style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
              fontStyle: 'italic', fontWeight: 400,
              fontFamily: T.font,
              color: T.textSecondary, lineHeight: 1.75,
              margin: '0 0 1.5rem', padding: 0, border: 'none',
            }}>
              This work carries the spirit of everyone who ever insisted on
              being seen as a full person — with intellectual agency, creative
              agency, and economic agency — in a system designed to deny all three.
            </blockquote>
            <p style={{ fontSize: '0.88rem', color: T.textDim, margin: 0, lineHeight: 1.6, fontFamily: T.fontBody }}>
              The first piece ever recorded in the system was called{' '}
              <em style={{ color: T.gold }}>The Equiano Effect.</em>{' '}
              That wasn't planned. It was instinct.
            </p>
          </div>

          {/* The Brotherman principle — new */}
          <div style={{
            padding: '2rem',
            background: 'rgba(251,191,36,0.04)',
            border: `1px solid ${T.borderGold}`,
            borderRadius: 12,
          }}>
            <p style={{
              fontFamily: T.fontMono,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: T.gold,
              margin: '0 0 1.25rem',
            }}>
              The principle we build from
            </p>
            <blockquote style={{
              fontFamily: T.font,
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontStyle: 'italic',
              color: T.textPrimary,
              margin: '0 0 1rem',
              padding: 0,
              border: 'none',
              lineHeight: 1.55,
            }}>
              "He is personified in our minds the black man in our communities
              who were disciplined, caring, and protectors of their families
              and communities, yet go to their grave with no songs written
              about them. We wanted to celebrate those who deserve it
              in mythology."
            </blockquote>
            <p style={{
              fontSize: '0.82rem',
              color: T.textDim,
              margin: '0 0 1.5rem',
              lineHeight: 1.6,
              fontFamily: T.fontBody,
            }}>
              — Dwaab Odom and Guy Sims, on creating Brotherman (1990) —
              750,000 copies sold independently, in barber shops, community
              town halls, and every place that was not just a comic book shop.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              paddingLeft: '1.25rem',
              borderLeft: `3px solid ${T.gold}`,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '1rem',
                fontWeight: 700,
                color: T.gold,
                margin: 0,
                lineHeight: 1.4,
              }}>
                They go to their grave with no songs written about them.
              </p>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '0.95rem',
                color: T.textSecondary,
                margin: 0,
                lineHeight: 1.65,
              }}>
                The Knowledge Commons is the song-writing infrastructure.
                The Fast Track is for the songs that need to be written now,
                this week, before someone else goes to their grave without one.
                The originStory field is how we make sure the song is
                attached to the person it was written about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CTA — extended with Fast Track
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: `linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(5,150,105,0.07) 100%)`,
        borderTop: `2px solid rgba(16,185,129,0.25)`,
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ ...h2Style, marginBottom: '1rem' }}>
            Don't take our word for it.{' '}
            <span style={{ color: T.green }}>Try the work.</span>
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75,
            color: T.textSecondary, marginBottom: '2.5rem',
            fontFamily: T.fontBody,
          }}>
            Every programme has a sandbox — open access, no registration,
            no commitment. Or start with the Fast Track: write something
            today, hear it on Rayd-yo in two weeks.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <Link
              to="/sandbox"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '0.95rem', fontWeight: 700,
                background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDk} 100%)`,
                color: 'white', borderRadius: 8,
                textDecoration: 'none', display: 'block',
                fontFamily: T.fontBody,
                textAlign: 'center',
              }}
            >
              Try a Programme →
            </Link>
            <Link
              to="/programmes/pageturners/sandbox?fasttrack=true"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '0.95rem', fontWeight: 700,
                background: T.teal,
                color: '#0a0a0f', borderRadius: 8,
                textDecoration: 'none', display: 'block',
                fontFamily: T.fontBody,
                textAlign: 'center',
              }}
            >
              Fast Track — 14 days →
            </Link>
            <Link
              to="/heritage"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '0.95rem', fontWeight: 600,
                background: 'transparent',
                color: '#9b7fe8',
                border: `2px solid #9b7fe8`,
                borderRadius: 8,
                textDecoration: 'none', display: 'block',
                fontFamily: T.fontBody,
                textAlign: 'center',
              }}
            >
              Explore the Archive →
            </Link>
            <Link
              to="/pathways"
              style={{
                padding: '1rem 1.5rem',
                fontSize: '0.95rem', fontWeight: 600,
                background: 'transparent',
                color: T.cyan,
                border: `2px solid ${T.cyan}`, borderRadius: 8,
                textDecoration: 'none', display: 'block',
                fontFamily: T.fontBody,
                textAlign: 'center',
              }}
            >
              See the Pathways
            </Link>
          </div>

          {/* The founding principle — the last thing they read */}
          <p style={{
            fontSize: '0.875rem',
            color: T.textDim,
            lineHeight: 1.7,
            fontStyle: 'italic',
            maxWidth: 480,
            margin: '0 auto',
            fontFamily: T.fontBody,
            borderTop: `1px solid ${T.border}`,
            paddingTop: '1.5rem',
          }}>
            You don't need art to live.
            But in order to live, you need art.
            And if you make it here, your name stays on it.
          </p>
        </div>
      </section>

    </div>
  );
};

export default ImpactPage;