// src/components/sandboxes/rayd-yo/ShowPlanner.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo ShowPlanner
//
// Full show planning tool. Builds a running order for any of the six
// confirmed Rayd-yo shows. Exports sandboxContext string for ROV integration.
//
// Six confirmed shows:
//   Groans and Moans | Wembley Wonders | Mother Tongue
//   Away from the Terrace | Remember When... | Reckon This Reckon That
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShowSegment {
  id: string;
  type: string;
  label: string;
  duration: number;
  note: string;
}

interface ShowPlannerProps {
  onContextChange?: (ctx: string) => void;
  compact?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RAYDYO_SHOWS = [
  { id: 'groans-moans',     label: 'Groans and Moans',          emoji: '😤' },
  { id: 'wembley-wonders',  label: 'Wembley Wonders',           emoji: '✨' },
  { id: 'mother-tongue',    label: 'Mother Tongue',             emoji: '🌍' },
  { id: 'away-terrace',     label: 'Away from the Terrace',     emoji: '⚽' },
  { id: 'remember-when',    label: 'Remember When...',          emoji: '📻' },
  { id: 'reckon-this',      label: 'Reckon This Reckon That',   emoji: '🤔' },
  { id: 'original',         label: 'My own show',               emoji: '🎙️' },
];

const SEGMENT_TYPES = [
  { id: 'intro',      label: 'Intro',           duration: 2,  colour: '#22c55e' },
  { id: 'feature',    label: 'Main feature',    duration: 15, colour: '#3b82f6' },
  { id: 'interview',  label: 'Interview',       duration: 10, colour: '#8b5cf6' },
  { id: 'music',      label: 'Music break',     duration: 8,  colour: '#f59e0b' },
  { id: 'community',  label: 'Community news',  duration: 5,  colour: '#0e8c8c' },
  { id: 'phone-in',   label: 'Phone-in',        duration: 10, colour: '#ec4899' },
  { id: 'archive',    label: 'Archive clip',    duration: 4,  colour: '#64748b' },
  { id: 'ad-break',   label: 'Station break',   duration: 2,  colour: '#94a3b8' },
];

// ─── RECONSTRUCTED SECTION — recovered content cut off at ad-break ───

let segmentCounter = 0;
const nextSegmentId = () => `seg-${Date.now()}-${segmentCounter++}`;

const ShowPlanner: React.FC<ShowPlannerProps> = ({ onContextChange, compact = false }) => {
  const [selectedShowId, setSelectedShowId] = useState<string>(RAYDYO_SHOWS[0].id);
  const [segments, setSegments] = useState<ShowSegment[]>([]);

  const selectedShow = RAYDYO_SHOWS.find((s) => s.id === selectedShowId) ?? RAYDYO_SHOWS[0];
  const totalDuration = segments.reduce((sum, s) => sum + s.duration, 0);

  const addSegment = (typeId: string) => {
    const segType = SEGMENT_TYPES.find((t) => t.id === typeId);
    if (!segType) return;
    setSegments((prev) => [
      ...prev,
      {
        id: nextSegmentId(),
        type: segType.id,
        label: segType.label,
        duration: segType.duration,
        note: '',
      },
    ]);
  };

  const removeSegment = (id: string) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSegment = (id: string, direction: -1 | 1) => {
    setSegments((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const updateSegment = (id: string, field: 'label' | 'note' | 'duration', value: string | number) => {
    setSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  // Build the ROV context string whenever the plan changes — this is what
  // the header comment calls "sandboxContext" for ROV integration.
  useEffect(() => {
    if (!onContextChange) return;
    if (segments.length === 0) {
      onContextChange(`Planning "${selectedShow.label}" — no segments added yet.`);
      return;
    }
    const summary = segments
      .map((s, i) => `${i + 1}. ${s.label} (${s.duration}min)${s.note ? ` — ${s.note}` : ''}`)
      .join('; ');
    onContextChange(
      `"${selectedShow.label}" running order, ${totalDuration}min total: ${summary}`
    );
  }, [segments, selectedShow, totalDuration, onContextChange]);

  return (
    <div className={`show-planner${compact ? ' show-planner--compact' : ''}`}>
      <header className="show-planner__header">
        <h3>Show Planner</h3>
        <p className="show-planner__subtitle">Build your running order.</p>
      </header>

      <div className="show-planner__show-select">
        {RAYDYO_SHOWS.map((show) => (
          <button
            key={show.id}
            type="button"
            className={`show-planner__show-btn${selectedShowId === show.id ? ' show-planner__show-btn--active' : ''}`}
            onClick={() => setSelectedShowId(show.id)}
          >
            <span aria-hidden="true">{show.emoji}</span> {show.label}
          </button>
        ))}
      </div>

      <div className="show-planner__add-row">
        {SEGMENT_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            className="show-planner__add-btn"
            style={{ borderColor: type.colour }}
            onClick={() => addSegment(type.id)}
          >
            + {type.label}
          </button>
        ))}
      </div>

      <ol className="show-planner__segments">
        {segments.map((segment, i) => {
          const segType = SEGMENT_TYPES.find((t) => t.id === segment.type);
          return (
            <li key={segment.id} className="show-planner__segment" style={{ borderLeftColor: segType?.colour }}>
              <div className="show-planner__segment-order">
                <button type="button" onClick={() => moveSegment(segment.id, -1)} disabled={i === 0}>▲</button>
                <button type="button" onClick={() => moveSegment(segment.id, 1)} disabled={i === segments.length - 1}>▼</button>
              </div>
              <input
                type="text"
                className="show-planner__segment-label"
                value={segment.label}
                onChange={(e) => updateSegment(segment.id, 'label', e.target.value)}
              />
              <input
                type="number"
                className="show-planner__segment-duration"
                min={1}
                value={segment.duration}
                onChange={(e) => updateSegment(segment.id, 'duration', Number(e.target.value))}
              />
              <span className="show-planner__segment-duration-label">min</span>
              <input
                type="text"
                className="show-planner__segment-note"
                placeholder="Note…"
                value={segment.note}
                onChange={(e) => updateSegment(segment.id, 'note', e.target.value)}
              />
              <button type="button" className="show-planner__segment-remove" onClick={() => removeSegment(segment.id)}>
                ✕
              </button>
            </li>
          );
        })}
      </ol>

      {segments.length > 0 && (
        <footer className="show-planner__footer">
          Total: {totalDuration} minutes
        </footer>
      )}
    </div>
  );
};

export default ShowPlanner;
