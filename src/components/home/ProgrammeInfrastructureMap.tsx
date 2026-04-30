// src/components/home/ProgrammeInfrastructureMap.tsx
// Infrastructure map with Maya as active concierge.
// Option C pop-out pattern — description + Visit → where live, coming soon where not.
// Every pop-out has "Ask Maya →" firing a contextual prompt with full frame.
// Maya concierge strip at top routes visitors who don't know where to start.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────
interface Programme {
  name:        string;
  desc:        string;
  tag:         'live' | 'broadcast' | 'editorial' | 'engine' | 'member' | 'governance';
  body:        string;
  path?:       string;
  soon?:       string;
  visitLabel?: string;
  mayaPrompt:  string;
}

interface CSection {
  id:         string;
  label:      string;
  title:      string;
  sub:        string;
  programmes: Programme[];
}

// ─── Maya prompt builder ──────────────────────────────────────
const frame = (name: string, extra: string) =>
  `Maya, I'm looking at the Wembley Wonders programme map. I want to understand ${name} — ${extra}how it connects to the other programmes, and whether it might be right for me.`;

// ─── Data ─────────────────────────────────────────────────────
const SECTIONS: CSection[] = [
  {
    id: 'connect', label: 'Connect', title: 'Community & culture', sub: 'entry layer',
    programmes: [
      {
        name: "Kaywana's Court", desc: "Women's leadership & community sovereignty", tag: 'live',
        body: "Diaspora theatre where Caribbean and African performance traditions meet contemporary community production. Heritage languages on stage. Dinner theatre. Elder storytelling. Cross-programme productions.",
        path: '/programmes/kaywanas-court',
        mayaPrompt: frame("Kaywana's Court", "what it is, who it's for, what kinds of people thrive in it, "),
      },
      {
        name: "Auntie Anansi's Kitchen", desc: 'Food heritage, diaspora recipes, cultural memory', tag: 'live',
        body: "Caribbean and African food knowledge — documented, celebrated, paid. Recipe archive, elder cook programme, Cyberstore food products, dinner theatre catering, Rayd-yo food segments.",
        path: '/programmes/auntie-anansis-kitchen',
        mayaPrompt: frame("Auntie Anansi's Kitchen", "what it is, who it's for, how food knowledge becomes an economic asset here, "),
      },
      {
        name: 'Roots', desc: 'Heritage, history & Black Atlantic lineage', tag: 'live',
        body: "Heritage research, oral history, and the Black Atlantic archive. Windrush documentation, ancestral mapping, community memory projects, Knowledge Commons contributions.",
        path: '/programmes/roots',
        mayaPrompt: frame("Roots", "what it is, who it's for, what kinds of heritage work happen here, "),
      },
      {
        name: 'Silk Stilettos', desc: 'Fashion, style & creative identity', tag: 'live',
        body: "Fashion design, wearable tech, pattern registry, and IP portfolio tools. Heritage-authentic costume for Kaywana's Court productions. Design studio and creative identity development.",
        path: '/programmes/silk-stilettos',
        mayaPrompt: frame("Silk Stilettos", "what it is, who it's for, how fashion design connects to the wider platform, "),
      },
    ],
  },
  {
    id: 'create', label: 'Create', title: 'Creative & broadcast', sub: 'production layer',
    programmes: [
      {
        name: 'Rayd-yo', desc: "Community radio — Brent learning to listen to itself", tag: 'broadcast',
        body: "Six location-based registers mapped to programmes. A full broadcasting clock. The platform's editorial voice — where everything made across all programmes eventually reaches an audience.",
        path: '/raydyo', visitLabel: 'Visit Rayd-yo →',
        mayaPrompt: frame("Rayd-yo", "what it broadcasts, who makes content for it, how it connects to the other programmes, "),
      },
      {
        name: 'Trubble n Bass', desc: 'Music production, Suno sandbox, provenance system', tag: 'live',
        body: "Music production with a full provenance system. Suno integration for AI-assisted composition. Cross-programme tagging. Sound design for Kaywana's Court. Creator earnings on every release.",
        path: '/programmes/trubble-n-bass',
        mayaPrompt: frame("Trubble n Bass", "what it is, who it's for, how the provenance system works and why it matters, "),
      },
      {
        name: 'G-Tech Casters', desc: 'Gaming, streaming & content creation', tag: 'live',
        body: "Gaming, streaming, and digital content creation. Tournament organisation, live commentary, content strategy, and Joystick editorial contributions. Community gaming with a creator economy backbone.",
        path: '/programmes/gtechcasters',
        mayaPrompt: frame("G-Tech Casters", "what it is, who it's for, how gaming connects to the wider creator economy here, "),
      },
      {
        name: 'Easy Street', desc: 'Radio drama lab — story & scriptwriting', tag: 'live',
        body: "Radio drama lab in collaboration with G-Tech Casters and Pageturners. Scriptwriting, voice acting, sound production. Mama's Little Fool and other community drama series developed here.",
        path: '/programmes/easy-street',
        mayaPrompt: frame("Easy Street", "what it is, who it's for, what kinds of drama get made here and how they reach an audience, "),
      },
      {
        name: 'Pageturners', desc: 'Literary culture, reading & writing', tag: 'live',
        body: "Literary culture, reading groups, and original writing. Script development for Kaywana's Court, food writing for the Kitchen, heritage essays for Roots. The platform's written word engine.",
        path: '/programmes/pageturners',
        mayaPrompt: frame("Pageturners", "what it is, who it's for, how writing connects across the other programmes, "),
      },
      {
        name: 'Joystick', desc: "Editorial hub — the platform's e-zine", tag: 'editorial',
        body: "The platform's editorial hub. Cultural commentary, food columns, programme features, community profiles, and the annual photography issue. Where platform activity becomes published record.",
        path: '/joystick', visitLabel: 'Visit Joystick →',
        mayaPrompt: frame("Joystick", "what it publishes, who contributes to it, and how it fits into the platform's editorial architecture, "),
      },
    ],
  },
  {
    id: 'change', label: 'Change', title: 'Learning & skills', sub: 'development layer',
    programmes: [
      {
        name: 'STEMgeneers', desc: 'STEM education for young community members', tag: 'live',
        body: "STEM education with a prototype lab, patent workbench, hardware iteration tracker, and ecosystem explorer. Set design and technical production for Kaywana's Court. Invention disclosure and IP tools.",
        path: '/programmes/stemgeneers',
        mayaPrompt: frame("STEMgeneers", "what it is, who it's for, what STEM skills get developed here and how they connect to the rest of the platform, "),
      },
      {
        name: 'TECHreneurs', desc: 'Digital entrepreneurship & tech business', tag: 'live',
        body: "Digital entrepreneurship with IP strategy planning, licensing dashboard, revenue model calculator, and venture builder tools. Business management for Kaywana's Court productions.",
        path: '/programmes/techreneurs',
        mayaPrompt: frame("TECHreneurs", "what it is, who it's for, how it builds digital business skills within the platform's creator economy, "),
      },
      {
        name: 'Bright Sparks', desc: 'Early talent, youth creativity & confidence', tag: 'live',
        body: "Early talent development — youth creativity, confidence building, and first steps into the creator economy. The platform's youngest members, properly supported from the start.",
        path: '/programmes/bright-sparks',
        mayaPrompt: frame("Bright Sparks", "what it is, what age group it's for, how young people progress from here into the wider platform, "),
      },
      {
        name: 'Knowledge Commons', desc: 'Editorial standards, heritage index & ROV framework', tag: 'editorial',
        body: "The platform's editorial standards, heritage discovery tools, and the ROV framework that powers Maya. LUGHA YA BIASHARA lexicon, epistemological framework, and community knowledge archive.",
        path: '/heritage', visitLabel: 'Visit Knowledge Commons →',
        mayaPrompt: frame("Knowledge Commons", "what it contains, who contributes to it, and how it underpins the platform's editorial and AI architecture, "),
      },
    ],
  },
  {
    id: 'challenge', label: 'Challenge', title: 'Commerce & opportunity', sub: 'market layer',
    programmes: [
      {
        name: 'Cyberstore', desc: 'Creator marketplace — Stripe Connect, 55/25/20 split', tag: 'live',
        body: "The platform marketplace. Stripe Connect wired to the 55/25/20 revenue architecture. Every sale auto-calculates the split. Creator earnings tracked in real time. Weekly auto-payout to bank.",
        path: '/cyberstore', visitLabel: 'Visit Cyberstore →',
        mayaPrompt: frame("the Cyberstore", "how it works, what kinds of products get sold here, how the 55/25/20 split operates in practice, "),
      },
      {
        name: 'External pipeline', desc: 'Commercial partnerships, commissions & broadcast', tag: 'live',
        body: "The vetting gate for commercial partners. Broadcast commissions, corporate training, creative partnerships. Maya advisory trigger at the SELL stage. Minimum acceptable terms framework built in.",
        soon: 'Full pipeline page coming soon',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand the external opportunity pipeline — how commercial partnerships work here, what the vetting process looks like, what minimum acceptable terms means, and how Maya gets involved when a creator is ready to sell.",
      },
      {
        name: 'Corporate training', desc: 'Revenue stream — skills into the market', tag: 'live',
        body: "Community skills packaged for the corporate market. Digital literacy, cultural competency, creative facilitation. A revenue stream that funds platform operations without grant dependency.",
        soon: 'Partnerships page coming soon',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand corporate training — what skills get packaged for the market, how community members get involved, and how this revenue stream connects to the platform's financial model.",
      },
    ],
  },
  {
    id: 'control', label: 'Control', title: 'Financial sovereignty', sub: 'ownership layer',
    programmes: [
      {
        name: 'The Counting House', desc: 'Financial literacy engine — The Count, The Hand, The Ledger', tag: 'engine',
        body: "Six tools: The Count, The 55 Calculator, Current Status, The Ledger, The Hand (pardner hand calculator), and the Grant Eligibility Calculator. The Equiano Principle made numerical.",
        soon: 'Building now — live soon',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand the Counting House — what the six financial tools do, how the pardner hand calculator works, what the Equiano Principle means in this context, and how this connects to the 55/25/20 revenue architecture.",
      },
      {
        name: 'The 55 Calculator', desc: 'Revenue modeller — Cyberstore & external opportunities', tag: 'engine',
        body: "Models Cyberstore revenue under the 55/25/20 architecture. Extended into an External Opportunity Modeller — so members walk into negotiations knowing their numbers before the other side speaks.",
        soon: 'Part of the Counting House — coming soon',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand the 55 Calculator — how it models creator revenue, how it extends into the external opportunity modeller, and what it means to walk into a negotiation knowing your numbers.",
      },
      {
        name: 'Your Panel', desc: 'Member control centre — Story, Programmes, Position', tag: 'member',
        body: "Three views: Your Story (5Cs strength bars, Maya arc), Your Programmes (active memberships and earnings), Your Position (governance role and Covenant Score). Members only.",
        path: '/panel', visitLabel: 'Go to Your Panel →',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand Your Panel — what the three views show, how the 5Cs strength bars work, what the Covenant Score means for my earnings, and how this connects to governance.",
      },
      {
        name: 'Covenant Score', desc: 'Community health metric — revenue band impact', tag: 'governance',
        body: "Community behaviour expressed as a revenue rate. Contributing band = 57% creator share. Flourishing band = 60%. How you show up in the community changes what appears in your earnings.",
        soon: 'Lives inside Your Panel and the Counting House',
        mayaPrompt: "Maya, I'm looking at the Wembley Wonders programme map. I want to understand the Covenant Score — how community behaviour affects revenue share rates, what the different bands mean, and how this connects to the pardner hand governance model.",
      },
    ],
  },
];

// ─── Tag styles ───────────────────────────────────────────────
const TAG_STYLES: Record<Programme['tag'], React.CSSProperties> = {
  live:       { background: 'rgba(16,185,129,0.12)',  color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' },
  broadcast:  { background: 'rgba(59,130,246,0.12)',  color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' },
  editorial:  { background: 'rgba(245,158,11,0.12)',  color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' },
  engine:     { background: 'rgba(148,163,184,0.1)',  color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' },
  member:     { background: 'rgba(148,163,184,0.1)',  color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' },
  governance: { background: 'rgba(148,163,184,0.1)',  color: '#94a3b8', border: '1px solid rgba(148,163,184,0.2)' },
};

const TAG_LABELS: Record<Programme['tag'], string> = {
  live: 'live', broadcast: 'broadcast', editorial: 'editorial',
  engine: 'financial engine', member: 'member layer', governance: 'governance',
};

// ─── Shared style constants ───────────────────────────────────
const FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const BORDER = 'rgba(148, 163, 184, 0.18)';

// ─── Main component ───────────────────────────────────────────
const ProgrammeInfrastructureMap: React.FC = () => {
  const navigate = useNavigate();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (key: string) => setOpenKey(prev => prev === key ? null : key);

  const go = (path: string) => {
    setOpenKey(null);
    navigate(path);
  };

  const askMaya = (prompt: string) => {
    setOpenKey(null);
    window.dispatchEvent(new CustomEvent('maya:open', {
      detail: { source: 'infrastructure-map', mode: 'guided', prompt }
    }));
  };

  const mayaConciergePrompt = "Maya, I'm looking at the Wembley Wonders programme map. I'm not sure where I fit yet — and I may not be based in the UK. Can you help me understand: is this platform open to diaspora creators wherever they live? What does remote membership actually mean in practice? And based on what the platform offers, where might someone like me want to start?";

  return (
    <div ref={mapRef} style={{ fontFamily: FONT }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ margin: '0 0 0.25rem', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>
          Platform infrastructure
        </p>
        <h2 style={{ margin: '0 0 0.25rem', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#f8fafc', lineHeight: 1.25 }}>
          Sixteen programmes. One architecture.
        </h2>
        <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b', lineHeight: 1.6 }}>
          Click any programme to see what it does. Ask Maya to find where you fit.
        </p>
      </div>

      {/* ── Maya concierge strip ── */}
      <div
        onClick={() => askMaya(mayaConciergePrompt)}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '13px 16px',
          background: 'rgba(155, 127, 232, 0.12)',
          border: '1px solid rgba(155, 127, 232, 0.28)',
          borderRadius: 12, marginBottom: 12,
          cursor: 'pointer', transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(155,127,232,0.2)',
          border: '1px solid rgba(155,127,232,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, position: 'relative',
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#9b7fe8' }}>M</span>
          <span style={{
            position: 'absolute', bottom: 1, right: 1,
            width: 9, height: 9, borderRadius: '50%',
            background: '#10b981',
            border: '2px solid #0f172a',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b7fe8', marginBottom: 2 }}>
            Your concierge
          </span>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0' }}>
            Not sure which room is yours?{' '}
            <em style={{ color: '#94a3b8', fontStyle: 'italic' }}>Tell Maya what you carry.</em>
          </p>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9b7fe8', whiteSpace: 'nowrap' }}>
          Ask Maya →
        </span>
      </div>

      {/* ── 5Cs sections ── */}
      {SECTIONS.map(section => (
        <div key={section.id} style={{
          border: `1px solid ${BORDER}`,
          borderRadius: 12, marginBottom: 10, overflow: 'visible',
        }}>
          {/* Section header */}
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 10,
            padding: '10px 14px',
            background: 'rgba(15, 23, 42, 0.7)',
            borderBottom: `1px solid ${BORDER}`,
            borderRadius: '12px 12px 0 0',
          }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', minWidth: 68 }}>
              {section.label}
            </span>
            <span style={{ fontSize: '0.83rem', fontWeight: 500, color: '#e2e8f0' }}>
              {section.title}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: 'auto' }}>
              {section.sub}
            </span>
          </div>

          {/* Programme grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))' }}>
            {section.programmes.map((prog, idx) => {
              const key = `${section.id}-${idx}`;
              const isOpen = openKey === key;
              const isRight = (idx + 1) % 4 === 0 || idx === section.programmes.length - 1;

              return (
                <div key={key} style={{ position: 'relative' }}>
                  {/* Card */}
                  <div
                    onClick={() => toggle(key)}
                    style={{
                      padding: '11px 13px',
                      borderRight: `1px solid ${BORDER}`,
                      borderBottom: `1px solid ${BORDER}`,
                      cursor: 'pointer',
                      background: isOpen ? 'rgba(30,41,59,0.6)' : 'transparent',
                      transition: 'background 0.12s',
                      userSelect: 'none',
                    }}
                    onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = 'rgba(30,41,59,0.35)'; }}
                    onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#f8fafc', marginBottom: 3 }}>
                      {prog.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, marginBottom: 6 }}>
                      {prog.desc}
                    </div>
                    <span style={{
                      display: 'inline-block', fontSize: '0.65rem', fontWeight: 600,
                      padding: '2px 7px', borderRadius: 20,
                      ...TAG_STYLES[prog.tag],
                    }}>
                      {TAG_LABELS[prog.tag]}
                    </span>
                  </div>

                  {/* Pop-out */}
                  {isOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 5px)',
                      ...(isRight ? { right: 0 } : { left: 0 }),
                      width: 268,
                      background: '#1e293b',
                      border: '1px solid rgba(148,163,184,0.25)',
                      borderRadius: 10,
                      padding: '13px 15px',
                      zIndex: 200,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
                    }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc', marginBottom: 6 }}>
                        {prog.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 10 }}>
                        {prog.body}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        {prog.path ? (
                          <button
                            onClick={e => { e.stopPropagation(); go(prog.path!); }}
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.75rem', fontWeight: 600, color: '#60a5fa', cursor: 'pointer', fontFamily: FONT }}
                          >
                            {prog.visitLabel ?? 'Visit programme →'}
                          </button>
                        ) : prog.soon ? (
                          <span style={{ fontSize: '0.7rem', color: '#475569', fontStyle: 'italic' }}>
                            {prog.soon}
                          </span>
                        ) : null}
                        <button
                          onClick={e => { e.stopPropagation(); askMaya(prog.mayaPrompt); }}
                          style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.72rem', color: '#9b7fe8', cursor: 'pointer', fontFamily: FONT, whiteSpace: 'nowrap' }}
                        >
                          Ask Maya →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

    </div>
  );
};

export default ProgrammeInfrastructureMap;