// src/pages/programmes/rayd-yo/index.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo Programme Page
//
// Tab 1: On Air   → station identity, LiveClock, link to the six shows
// Tab 2: Plan     → SimpleShowPlanner (this page's own contribution,
//                    while the full ShowPlanner/JingleMaker sandbox at
//                    /programmes/rayd-yo/sandbox is the deeper tool)
// Tab 3: Signal   → what Rayd-yo is, in plain terms
//
// DEVIATION FROM RECOVERED VERSION: the newest version on record lazy-
// imports RaydyoListen and ROVLearningCompanion, and imports
// RAYDYO_STUDIO_VIDEOS from data/youtube/raydyo-videos.ts. All three are
// confirmed missing from disk. Rather than import files that don't exist,
// the On Air tab below is honest, self-contained content — not a stand-in
// for RaydyoListen's fuller feature set (weather, noticeboard, network),
// which remains a real, separate build task whenever those pieces exist.
//
// EDITORIAL GATE: JUDITH REVIEW on all programmeHeader text.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgrammePageTemplate from '../_shared/ProgrammePageTemplate';
import { getProgramme } from '../config';

type RaydyoTab = 'onair' | 'plan' | 'signal';

// ── LIVE CLOCK ────────────────────────────────────────────────────────────────
// Renders the current time — the liveness marker. Not decoration; it's the
// thing that distinguishes a broadcast from a recording.

const LiveClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const isFriday = time.getDay() === 5;
  const h = time.getHours();
  const isFeatureSlot = isFriday && h >= 18 && h < 20; // Away from the Terrace, Friday 8pm

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', padding: '0.875rem 1.25rem', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'monospace', fontSize: '1.75rem', fontWeight: 700, color: '#dc2626', letterSpacing: '0.05em' }}>
        {timeStr}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-block', background: '#dc2626', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '3px', letterSpacing: '0.1em' }}>
          ON AIR
        </span>
        {isFeatureSlot && (
          <span style={{ display: 'inline-block', background: '#a855f7', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '3px', letterSpacing: '0.1em' }}>
            Away from the Terrace
          </span>
        )}
        <span style={{ fontSize: '0.825rem', color: '#94a3b8' }}>{dateStr}</span>
      </div>
    </div>
  );
};

// ── SHOW SEGMENTS ─────────────────────────────────────────────────────────────
// A simple show planner — this page's own contribution, while the full
// ShowPlanner sandbox component (with all six shows, reorder, tech notes)
// lives at /programmes/rayd-yo/sandbox.

const SEGMENT_TYPES = [
  { id: 'intro',     label: 'Intro',          duration: 2,  colour: '#3b82f6' },
  { id: 'feature',   label: 'Main feature',   duration: 15, colour: '#BA7517' },
  { id: 'community', label: 'Community news', duration: 5,  colour: '#22c55e' },
  { id: 'music',     label: 'Music break',    duration: 8,  colour: '#a855f7' },
  { id: 'callout',   label: 'Call-out',       duration: 3,  colour: '#f97316' },
  { id: 'outro',     label: 'Outro',          duration: 2,  colour: '#64748b' },
];

interface ShowSegment { id: string; type: string; label: string; duration: number; note: string }

let segCounter = 10;
const nextSegId = () => `seg-${segCounter++}`;

const SimpleShowPlanner: React.FC = () => {
  const [showName, setShowName] = useState('');
  const [segments, setSegments] = useState<ShowSegment[]>([
    { id:'1', type:'intro',     label:'Intro',         duration:2,  note:'' },
    { id:'2', type:'feature',   label:'Main feature',  duration:15, note:'' },
    { id:'3', type:'music',     label:'Music break',   duration:8,  note:'' },
    { id:'4', type:'community', label:'Community news',duration:5,  note:'' },
    { id:'5', type:'outro',     label:'Outro',         duration:2,  note:'' },
  ]);
  const total = segments.reduce((t,s) => t+s.duration, 0);
  const colours: Record<string,string> = Object.fromEntries(SEGMENT_TYPES.map(t => [t.id, t.colour]));

  // ─── RECONSTRUCTED — recovered fragment cut off at the total/colours line ───
  const addSegment = (type: typeof SEGMENT_TYPES[number]) => {
    setSegments(prev => [...prev, { id: nextSegId(), type: type.id, label: type.label, duration: type.duration, note: '' }]);
  };
  const removeSegment = (id: string) => setSegments(prev => prev.filter(s => s.id !== id));
  const updateNote = (id: string, note: string) => setSegments(prev => prev.map(s => s.id === id ? { ...s, note } : s));

  return (
    <div>
      <div style={{ marginBottom:'1.25rem' }}>
        <label style={{ display:'block', fontSize:'0.8rem', color:'#94a3b8', marginBottom:'0.375rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>Show name</label>
        <input type="text" value={showName} onChange={e => setShowName(e.target.value)} placeholder="What's your show called?"
          style={{ width:'100%', background:'rgba(15,23,42,0.5)', border:'1px solid rgba(100,116,139,0.3)', borderRadius:'8px', padding:'0.625rem 0.875rem', fontSize:'1rem', color:'#f8fafc', outline:'none' }} />
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'0.625rem' }}>
        <p style={{ fontSize:'0.8rem', color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.06em', margin:0 }}>Running order</p>
        <p style={{ fontSize:'0.875rem', color: total>60 ? '#f87171' : '#94a3b8', margin: 0 }}>{total} min</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginBottom:'1.25rem' }}>
        {segments.map(seg => (
          <div key={seg.id} style={{ borderLeft: `3px solid ${colours[seg.type] ?? '#64748b'}`, background:'rgba(15,23,42,0.4)', borderRadius:'6px', padding:'0.5rem 0.75rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'0.85rem', color:'#e2e8f0', fontWeight:600 }}>{seg.label}</span>
              <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                <span style={{ fontSize:'0.75rem', color:'#64748b' }}>{seg.duration} min</span>
                <button type="button" onClick={() => removeSegment(seg.id)} style={{ background:'transparent', border:'none', color:'#475569', cursor:'pointer', fontSize:'1rem', padding:'0 0.2rem' }}>×</button>
              </div>
            </div>
            <input type="text" value={seg.note} onChange={e => updateNote(seg.id, e.target.value)} placeholder="What's in this segment?"
              style={{ width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(100,116,139,0.15)', padding:'0.15rem 0', fontSize:'0.75rem', color:'#94a3b8', outline:'none', boxSizing:'border-box' as const, marginTop:'0.25rem' }} />
          </div>
        ))}
      </div>

      <div>
        <label style={{ display:'block', fontSize:'0.8rem', color:'#94a3b8', marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>Add segment</label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
          {SEGMENT_TYPES.map(type => (
            <button key={type.id} type="button" onClick={() => addSegment(type)}
              style={{ background:'rgba(15,23,42,0.4)', border:`1px solid ${type.colour}40`, borderRadius:'6px', padding:'0.3rem 0.65rem', fontSize:'0.75rem', color:type.colour, cursor:'pointer' }}>
              + {type.label}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize:'0.75rem', color:'#475569', marginTop:'1.25rem' }}>
        Need reordering, six named shows, or a jingle to go with it?{' '}
        <Link to="/programmes/rayd-yo/sandbox" style={{ color:'#dc2626' }}>Open the full studio →</Link>
      </p>
    </div>
  );
  // ─── END RECONSTRUCTED SECTION ───
};

// ── ON AIR TAB CONTENT ────────────────────────────────────────────────────────
// Honest, self-contained content — NOT a stand-in for RaydyoListen's
// intended fuller feature set (weather, noticeboard, network view), which
// doesn't exist yet. See file header.

const OnAirContent: React.FC = () => (
  <div>
    <LiveClock />
    <p style={{ color:'#cbd5e1', fontSize:'0.95rem', lineHeight:1.6, marginBottom:'1.5rem' }}>
      Brent learning to listen to itself. Six shows, six registers, one borough
      speaking in its own voice all day long.
    </p>
    <div style={{ display:'grid', gap:'0.5rem' }}>
      {[
        { label: 'Groans and Moans', slot: 'Wednesdays · 9am · Kitchen Table AM' },
        { label: 'Wembley Wonders', slot: 'Match days · all registers' },
        { label: 'Mother Tongue', slot: 'Saturdays · 10am' },
        { label: 'Away from the Terrace', slot: 'Fridays · 8pm' },
        { label: 'Remember When...', slot: 'Sundays · 4pm · Kitchen Table PM' },
        { label: 'Reckon This, Reckon That', slot: 'Thursdays · 12pm · Under the Arches' },
      ].map(show => (
        <div key={show.label} style={{ padding:'0.6rem 0.875rem', background:'rgba(15,23,42,0.4)', border:'1px solid rgba(100,116,139,0.15)', borderRadius:'8px' }}>
          <p style={{ margin:0, fontSize:'0.85rem', fontWeight:600, color:'#e2e8f0' }}>{show.label}</p>
          <p style={{ margin:0, fontSize:'0.7rem', color:'#64748b' }}>{show.slot}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── SIGNAL TAB CONTENT ────────────────────────────────────────────────────────
// RECONSTRUCTED — no content for the four identity panels was ever
// recovered; kept deliberately brief rather than invented at length.

const SignalContent: React.FC = () => (
  <div style={{ display:'grid', gap:'1rem' }}>
    <div>
      <h3 style={{ color:'#f8fafc', fontSize:'1rem', marginBottom:'0.4rem' }}>What Rayd-yo is</h3>
      <p style={{ color:'#94a3b8', fontSize:'0.875rem', lineHeight:1.6 }}>
        Not a presenter. Brent itself, learning to listen to itself.
      </p>
    </div>
    <div>
      <h3 style={{ color:'#f8fafc', fontSize:'1rem', marginBottom:'0.4rem' }}>Who it's for</h3>
      <p style={{ color:'#94a3b8', fontSize:'0.875rem', lineHeight:1.6 }}>
        Anyone with a story, a language, a memory, or a voice worth broadcasting.
      </p>
    </div>
  </div>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────

const RaydyoPage: React.FC = () => {
  const config = getProgramme('rayd-yo');
  const [activeTab, setActiveTab] = useState<RaydyoTab>('onair');

  if (!config) {
    return <div>Programme not found</div>;
  }

  const tabs: { key: RaydyoTab; label: string }[] = [
    { key: 'onair', label: 'On Air' },
    { key: 'plan', label: 'Plan Your Show' },
    { key: 'signal', label: 'The Signal' },
  ];

  return (
    <ProgrammePageTemplate
      config={config}
      interactiveTool={
        <div>
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.25rem' }}>
            {tabs.map(tab => (
              <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)}
                style={{
                  padding:'0.5rem 1rem', borderRadius:'8px',
                  border: activeTab === tab.key ? '1px solid #dc2626' : '1px solid rgba(100,116,139,0.2)',
                  background: activeTab === tab.key ? 'rgba(220,38,38,0.1)' : 'transparent',
                  color: activeTab === tab.key ? '#f8fafc' : '#94a3b8',
                  fontSize:'0.85rem', cursor:'pointer',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'onair' && <OnAirContent />}
          {activeTab === 'plan' && <SimpleShowPlanner />}
          {activeTab === 'signal' && <SignalContent />}
        </div>
      }
    />
  );
};

export default RaydyoPage;
