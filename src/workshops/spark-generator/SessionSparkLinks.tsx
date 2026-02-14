import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ExternalLink, BookOpen, Target } from 'lucide-react';
import { PROGRAMMES, getProgrammeByParam, type Programme } from './sparkData';

// ============================================
// SESSION SPARK LINKS
// ============================================
// Drop this component into SessionsPage to add
// Spark Generator quick-launch buttons to each
// scheduled workshop session.
//
// Usage in SessionsPage:
//
//   import { SessionSparkLinks } from '../workshops/spark-generator';
//
//   <SessionSparkLinks programmeId="pageturners" />
//   <SessionSparkLinks programmeId="kaywanas-court" />
//
// Or use the full facilitator panel:
//
//   <FacilitatorSessionPanel programmeId="pageturners" sessionTitle="Story Structure" />
// ============================================

// ── Simple inline link ──
// Adds a small "Launch Sparks" button next to a session listing

interface SessionSparkLinksProps {
  programmeId: string;
  className?: string;
}

export const SessionSparkLinks: React.FC<SessionSparkLinksProps> = ({ programmeId, className = '' }) => {
  const prog = getProgrammeByParam(programmeId);
  if (!prog) return null;

  return (
    <div className={`session-spark-links ${className}`} style={{ display: 'inline-flex', gap: '6px' }}>
      <Link
        to={`/workshops/spark-generator?programme=${prog.id}`}
        className="session-spark-btn"
        title={`Open ${prog.sparkName} for this session`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none',
          background: `color-mix(in srgb, ${prog.color} 8%, white)`,
          border: `1px solid color-mix(in srgb, ${prog.color} 20%, transparent)`,
          color: prog.color,
          transition: 'all 0.2s',
        }}
      >
        <Zap size={12} />
        Sparks
      </Link>
      {prog.routes.sandbox && (
        <Link
          to={prog.routes.sandbox}
          className="session-sandbox-btn"
          title="Open sandbox"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontWeight: 600,
            textDecoration: 'none',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            color: '#6b7280',
            transition: 'all 0.2s',
          }}
        >
          <Target size={12} />
          Sandbox
        </Link>
      )}
    </div>
  );
};

// ── Full facilitator panel ──
// Shows before a Zoom session: spark launcher, sandbox links,
// session structure summary, and facilitation guide link

interface FacilitatorSessionPanelProps {
  programmeId: string;
  sessionTitle?: string;
  sessionWeek?: number;
  className?: string;
}

export const FacilitatorSessionPanel: React.FC<FacilitatorSessionPanelProps> = ({
  programmeId,
  sessionTitle,
  sessionWeek,
  className = '',
}) => {
  const prog = getProgrammeByParam(programmeId);
  if (!prog) return null;

  return (
    <div
      className={`facilitator-session-panel ${className}`}
      style={{
        background: `color-mix(in srgb, ${prog.color} 4%, white)`,
        border: `1.5px solid color-mix(in srgb, ${prog.color} 15%, transparent)`,
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>{prog.sparkIcon}</span>
          <div>
            <div style={{ fontWeight: 700, color: prog.color, fontSize: '1rem' }}>
              {sessionTitle || prog.name}
              {sessionWeek && <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '0.8rem' }}> · Week {sessionWeek}</span>}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{prog.sparkName} · {prog.sessionTemplate.duration} min session</div>
          </div>
        </div>
        <Link
          to={`/workshops/spark-generator?programme=${prog.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: prog.color,
            color: 'white',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <Zap size={14} />
          Launch Spark Generator
        </Link>
      </div>

      {/* Session timeline bar */}
      <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', height: '28px', marginBottom: '1rem' }}>
        {prog.sessionTemplate.structure.map((seg, i) => {
          const phaseColors: Record<string, string> = {
            'spark-opener': '#22c55e',
            'core-activity': prog.color,
            'break': '#e5e7eb',
            'applied-task': '#f59e0b',
            'spark-closer': '#a855f7',
            'reflection': '#06b6d4',
          };
          const widthPercent = (seg.duration / prog.sessionTemplate.duration) * 100;
          return (
            <div
              key={i}
              title={`${seg.label} (${seg.duration}m)`}
              style={{
                width: `${widthPercent}%`,
                background: phaseColors[seg.phase] || '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                fontWeight: 600,
                color: seg.phase === 'break' ? '#9ca3af' : 'white',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                padding: '0 4px',
              }}
            >
              {widthPercent > 8 ? `${seg.label} ${seg.duration}m` : `${seg.duration}m`}
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Link to={prog.routes.sandbox} style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
          background: '#f9fafb', border: '1px solid #e5e7eb', color: '#6b7280', textDecoration: 'none',
        }}>
          <Target size={13} /> Sandbox <ExternalLink size={10} />
        </Link>
        {prog.routes.facilitation && (
          <Link to={prog.routes.facilitation} style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
            background: 'color-mix(in srgb, ' + prog.color + ' 6%, white)',
            border: `1px solid color-mix(in srgb, ${prog.color} 15%, transparent)`,
            color: prog.color, textDecoration: 'none',
          }}>
            <BookOpen size={13} /> Facilitation Guide <ExternalLink size={10} />
          </Link>
        )}
        <Link to={prog.routes.programme} style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
          background: '#f9fafb', border: '1px solid #e5e7eb', color: '#6b7280', textDecoration: 'none',
        }}>
          {prog.icon} Programme Page <ExternalLink size={10} />
        </Link>
      </div>

      {/* Sandbox challenges hint */}
      {prog.sandboxChallenges.length > 0 && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#9ca3af' }}>
          <strong>Applied Task options:</strong>{' '}
          {prog.sandboxChallenges.map(ch => ch.title).join(' · ')}
        </div>
      )}
    </div>
  );
};

export default SessionSparkLinks;