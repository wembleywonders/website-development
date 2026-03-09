// src/pages/ImpactPage.tsx
// v3 — Plain English first. Abstraction earns its place.
// Reader: young person / parent from Wembley community.
// Flow: Who we are → Honest account → What we built → Five roles → Why it was necessary → Equiano → CTA

import React, { useState, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

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
  font:          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

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

// ─── Component ────────────────────────────────────────────────────────────────
const ImpactPage: React.FC = () => {
  const [activeC, setActiveC]         = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredDoes, setHoveredDoes] = useState<number | null>(null);

  const active = FRAMEWORK[activeC];

  const cardBase: CSSProperties = {
    background: T.bgCard,
    border: `1px solid ${T.border}`,
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
    fontFamily: T.font,
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

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${T.bg} 0%, #1e293b 100%)`,
      color: T.textPrimary,
      fontFamily: T.font,
    }}>

      {/* ══════════════════════════════════════════════════
          1. HERO — answer "what is this and is it for me?"
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
          2. HONEST ACCOUNT — establish trust before making claims
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
          3. WHAT WE'VE BUILT — the system, plainly described
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
          4. THE FIVE ROLES — reader now understands the system
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

          {/* Manual tabs — plain English label on each */}
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
                  fontFamily: T.font,
                }}>
                  {item.c} → {item.role}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  color: i === activeC ? item.colour : T.textDim,
                  fontFamily: T.font,
                  opacity: 0.85,
                }}>
                  {item.plain}
                </span>
              </button>
            ))}
          </div>

          {/* Active detail */}
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
              <span style={{ fontWeight: 800, fontSize: '1rem', color: active.colour }}>
                {active.c}
              </span>
              <span style={{ color: T.textDim }}>→</span>
              <span style={{
                background: active.bg, color: active.colour,
                border: `1px solid ${active.borderColour}`,
                borderRadius: 20, padding: '2px 12px',
                fontSize: '0.8rem', fontWeight: 600,
              }}>
                {active.role}
              </span>
              <span style={{ fontSize: '0.82rem', color: T.textMuted, fontStyle: 'italic' }}>
                — {active.plain}
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
              fontStyle: 'italic', fontWeight: 600,
              color: T.textPrimary, lineHeight: 1.4, marginBottom: '0.85rem',
            }}>
              "{active.statement}"
            </p>
            <p style={{
              fontSize: '1rem', lineHeight: 1.75,
              color: T.textSecondary, margin: 0, maxWidth: 640,
            }}>
              {active.description}
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. WHY IT WAS NECESSARY — argument as conclusion,
             not preamble. Plain first, bigger picture after.
          ══════════════════════════════════════════════════ */}
      <section style={{ ...sectionBase, maxWidth: 820 }}>
        <span style={labelStyle}>Why this was necessary</span>
        <h2 style={h2Style}>
          The contribution was always there.{' '}
          <span style={{ color: T.green }}>The record wasn't.</span>
        </h2>

        {/* Plain English version first */}
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

        {/* Now the bigger language — earned */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          paddingLeft: '1.25rem',
          borderLeft: `3px solid ${T.green}`,
        }}>
          <p style={{
            fontWeight: 800,
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: T.green, margin: 0, lineHeight: 1.3,
          }}>
            The five roles aren't a new idea. They're what people already do.
          </p>
          <p style={{
            fontWeight: 700,
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: T.textSecondary, margin: 0, lineHeight: 1.5,
          }}>
            We built the system that records it, the mechanism that pays it,
            and the pathway that turns it into something you can build a life on.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. EQUIANO — emotional depth, fully earned now
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '4rem 2rem',
        background: `linear-gradient(135deg, rgba(251,191,36,0.05) 0%, ${T.bg} 100%)`,
        borderTop: `1px solid ${T.borderGold}`,
        borderBottom: `1px solid ${T.borderGold}`,
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: '1.5rem', opacity: 0.5 }}>◈</div>
          <blockquote style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic', fontWeight: 400,
            color: T.textSecondary, lineHeight: 1.75,
            margin: '0 0 1.5rem', padding: 0, border: 'none',
          }}>
            This work carries the spirit of everyone who ever insisted on
            being seen as a full person — with intellectual agency, creative
            agency, and economic agency — in a system designed to deny all three.
          </blockquote>
          <p style={{ fontSize: '0.88rem', color: T.textDim, margin: 0, lineHeight: 1.6 }}>
            The first piece ever recorded in the system was called{' '}
            <em style={{ color: T.gold }}>The Equiano Effect.</em>{' '}
            That wasn't planned. It was instinct.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CTA — clear, no jargon
          ══════════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: `linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(5,150,105,0.07) 100%)`,
        borderTop: `2px solid rgba(16,185,129,0.25)`,
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ ...h2Style, marginBottom: '1rem' }}>
            Don't take our word for it.{' '}
            <span style={{ color: T.green }}>Try the work.</span>
          </h2>
          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75,
            color: T.textSecondary, marginBottom: '2rem',
          }}>
            Every programme has a sandbox — open access, no registration,
            no commitment. See exactly what we do before you decide anything.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/sandbox"
              style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700,
                background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDk} 100%)`,
                color: 'white', borderRadius: 8,
                textDecoration: 'none', display: 'inline-block',
                fontFamily: T.font,
              }}
            >
              Try a Programme →
            </Link>
            <Link
              to="/pathways"
              style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600,
                background: 'transparent',
                color: T.cyan, border: `2px solid ${T.cyan}`, borderRadius: 8,
                textDecoration: 'none', display: 'inline-block',
                fontFamily: T.font,
              }}
            >
              See the Pathways
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ImpactPage;
