// src/components/sandboxes/rayd-yo/JingleMaker.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo JingleMaker
//
// 30-second station ident and show jingle builder.
// Lives in Rayd-yo sandbox — radio infrastructure.
// Connected to Trubble n Bass for longer music production.
//
// Tools:
//   1. Jingle type selector (station ident / show opener / break bumper / closer)
//   2. Lyric / spoken word builder — timed to 30s
//   3. Mood selector — maps to Trubble n Bass genre/style
//   4. Export brief — sends to Trubble n Bass as a production brief
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface JingleLine {
  id: string;
  text: string;
  durationSec: number;
  style: 'spoken' | 'sung' | 'sfx' | 'silence';
}

interface JingleMakerProps {
  onContextChange?: (ctx: string) => void;
  showName?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const JINGLE_TYPES = [
  { id: 'station-ident', label: 'Station ident',   emoji: '📡', desc: 'Rayd-yo — who we are',        maxSec: 10 },
  { id: 'show-opener',   label: 'Show opener',     emoji: '🎙️', desc: 'Welcome to your show',         maxSec: 30 },
  { id: 'break-bumper',  label: 'Break bumper',    emoji: '⏸️', desc: 'Into and out of a music break', maxSec: 8  },
  { id: 'show-closer',   label: 'Show closer',     emoji: '🎬', desc: 'Sign-off, next time, credits',  maxSec: 20 },
];

const LINE_STYLES = [
  { id: 'spoken',  label: 'Spoken',  colour: '#3b82f6', emoji: '🗣️' },
  { id: 'sung',    label: 'Sung',    colour: '#f59e0b', emoji: '🎵' },
  { id: 'sfx',     label: 'SFX',     colour: '#8b5cf6', emoji: '🔊' },
  { id: 'silence', label: 'Silence', colour: '#334155', emoji: '🤫' },
];

const MOODS = [
  { id: 'upbeat',    label: 'Upbeat',     emoji: '⚡', trubble: 'Fast tempo, major key, punchy' },
  { id: 'soulful',   label: 'Soulful',    emoji: '🎷', trubble: 'RnB/soul feel, warm bass, gospel choir' },
  { id: 'conscious', label: 'Conscious',  emoji: '✊', trubble: 'Roots reggae, dub influence, spoken word' },
  { id: 'caribbean', label: 'Caribbean',  emoji: '🌊', trubble: 'Soca/calypso rhythm, steel pan, carnival' },
  { id: 'jazz',      label: 'Jazz',       emoji: '🎺', trubble: 'Cool jazz, brushed drums, double bass' },
  { id: 'spoken',    label: 'Spoken only',emoji: '📖', trubble: 'Voice only, no music bed' },
];

const DEFAULT_LINES: JingleLine[] = [
  { id: '1', text: 'Rayd-yo —',                  durationSec: 2,  style: 'spoken' },
  { id: '2', text: 'broadcasting from Wembley',  durationSec: 3,  style: 'spoken' },
  { id: '3', text: '',                            durationSec: 1,  style: 'sfx'    },
  { id: '4', text: 'Street made. Creators owned.', durationSec: 3,  style: 'spoken' },
];

// ─── RECONSTRUCTED SECTION — recovered content cut off mid-DEFAULT_LINES ───

let lineCounter = 100;
const nextLineId = () => `line-${lineCounter++}`;

const JingleMaker: React.FC<JingleMakerProps> = ({ onContextChange, showName }) => {
  const [jingleTypeId, setJingleTypeId] = useState<string>(JINGLE_TYPES[0].id);
  const [lines, setLines] = useState<JingleLine[]>(DEFAULT_LINES);
  const [moodId, setMoodId] = useState<string>(MOODS[0].id);
  const [briefSent, setBriefSent] = useState(false);

  const jingleType = JINGLE_TYPES.find((t) => t.id === jingleTypeId) ?? JINGLE_TYPES[0];
  const mood = MOODS.find((m) => m.id === moodId) ?? MOODS[0];
  const totalSec = lines.reduce((sum, l) => sum + l.durationSec, 0);
  const overBudget = totalSec > jingleType.maxSec;

  const addLine = (style: JingleLine['style']) => {
    setLines((prev) => [...prev, { id: nextLineId(), text: '', durationSec: 2, style }]);
  };

  const removeLine = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (id: string, field: 'text' | 'durationSec', value: string | number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const buildBrief = (): string => {
    const scriptLines = lines
      .map((l) => `[${l.style}${l.durationSec ? `, ${l.durationSec}s` : ''}] ${l.text || '(silence)'}`)
      .join('\n');
    return [
      `JINGLE BRIEF — ${jingleType.label}${showName ? ` for "${showName}"` : ''}`,
      `Target length: ${jingleType.maxSec}s (script currently ${totalSec}s)`,
      `Mood: ${mood.label} — ${mood.trubble}`,
      '',
      'Script:',
      scriptLines,
      '',
      'Take this to Trubble n Bass to produce the music bed.',
    ].join('\n');
  };

  useEffect(() => {
    if (!onContextChange) return;
    onContextChange(
      `Building a ${jingleType.label} (${totalSec}/${jingleType.maxSec}s), mood: ${mood.label}.`
    );
  }, [jingleType, totalSec, mood, onContextChange]);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(buildBrief());
      setBriefSent(true);
      setTimeout(() => setBriefSent(false), 2000);
    } catch {
      // Clipboard API can fail silently in some contexts — brief still
      // visible on screen even if copy fails, so nothing is lost.
    }
  };

  return (
    <div className="jingle-maker">
      <header className="jingle-maker__header">
        <h3>Jingle Maker</h3>
        <p className="jingle-maker__subtitle">Build a 30-second ident, opener, bumper, or closer.</p>
      </header>

      <div className="jingle-maker__type-row">
        {JINGLE_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`jingle-maker__type-btn${jingleTypeId === type.id ? ' jingle-maker__type-btn--active' : ''}`}
            onClick={() => setJingleTypeId(type.id)}
          >
            <span aria-hidden="true">{type.emoji}</span> {type.label}
            <span className="jingle-maker__type-max">max {type.maxSec}s</span>
          </button>
        ))}
      </div>

      <div className={`jingle-maker__duration${overBudget ? ' jingle-maker__duration--over' : ''}`}>
        {totalSec}s / {jingleType.maxSec}s
      </div>

      <ol className="jingle-maker__lines">
        {lines.map((line) => {
          const styleDef = LINE_STYLES.find((s) => s.id === line.style);
          return (
            <li key={line.id} className="jingle-maker__line" style={{ borderLeftColor: styleDef?.colour }}>
              <span className="jingle-maker__line-style-icon">{styleDef?.emoji}</span>
              <input
                type="text"
                className="jingle-maker__line-text"
                value={line.text}
                onChange={(e) => updateLine(line.id, 'text', e.target.value)}
                placeholder={line.style === 'silence' ? '(silence)' : line.style === 'sfx' ? 'Describe the SFX…' : 'Line…'}
              />
              <input
                type="number"
                className="jingle-maker__line-duration"
                min={1}
                value={line.durationSec}
                onChange={(e) => updateLine(line.id, 'durationSec', Number(e.target.value))}
              />
              <span>s</span>
              <button type="button" className="jingle-maker__line-remove" onClick={() => removeLine(line.id)}>✕</button>
            </li>
          );
        })}
      </ol>

      <div className="jingle-maker__add-row">
        {LINE_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            className="jingle-maker__add-btn"
            style={{ borderColor: style.colour }}
            onClick={() => addLine(style.id as JingleLine['style'])}
          >
            + {style.label}
          </button>
        ))}
      </div>

      <div className="jingle-maker__mood-row">
        {MOODS.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`jingle-maker__mood-btn${moodId === m.id ? ' jingle-maker__mood-btn--active' : ''}`}
            onClick={() => setMoodId(m.id)}
            title={m.trubble}
          >
            <span aria-hidden="true">{m.emoji}</span> {m.label}
          </button>
        ))}
      </div>

      <div className="jingle-maker__brief">
        <button
          type="button"
          onClick={handleCopyBrief}
          style={{
            background: briefSent ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
            border: `1px solid ${briefSent ? '#22c55e' : '#f59e0b'}`,
            borderRadius: '6px', padding: '0.4rem 1rem',
            fontSize: '0.8rem', color: briefSent ? '#86efac' : '#fbbf24',
            cursor: 'pointer', width: '100%',
          }}>
          {briefSent ? '✓ Copied to clipboard' : '📋 Copy brief to clipboard'}
        </button>
      </div>

    </div>
  );
};

export default JingleMaker;
export { JingleMaker };
