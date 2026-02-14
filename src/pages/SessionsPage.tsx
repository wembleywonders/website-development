import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar, Clock, Zap, Target, BookOpen, ExternalLink,
  Video, Filter, ChevronRight, Users
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import { PROGRAMMES } from '../workshops/spark-generator/sparkData';
import { FacilitatorSessionPanel } from '../workshops/spark-generator/SessionSparkLinks';
import {
  generateSessions, getThisWeeksSessions, getUpcomingSessions,
  RECURRING_SESSIONS,
  type ScheduledSession
} from '../data/sessionsData';

// ============================================
// SESSIONS PAGE — Dark Theme
// ============================================

// Dark palette tokens (inline)
const C = {
  bg: 'rgba(51, 65, 85, 0.3)',
  bgHover: 'rgba(51, 65, 85, 0.5)',
  bgCard: 'rgba(30, 41, 59, 0.6)',
  border: 'rgba(148, 163, 184, 0.12)',
  borderHover: 'rgba(148, 163, 184, 0.25)',
  text: '#cbd5e1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textBright: '#f8fafc',
  textHeading: '#e2e8f0',
};

const SessionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filterProgramme = searchParams.get('programme');

  const [view, setView] = useState<'week' | 'upcoming' | 'all'>('upcoming');

  const allSessions = useMemo(() => generateSessions(new Date(), 8), []);

  const filteredSessions = useMemo(() => {
    if (!filterProgramme) return allSessions;
    return allSessions.filter(s => s.programmeId === filterProgramme || s.programmeId === filterProgramme.replace(/-/g, '_'));
  }, [allSessions, filterProgramme]);

  const thisWeek = useMemo(() => getThisWeeksSessions(filteredSessions), [filteredSessions]);
  const upcoming = useMemo(() => getUpcomingSessions(filteredSessions, 20), [filteredSessions]);

  const displaySessions = view === 'week' ? thisWeek : view === 'upcoming' ? upcoming : filteredSessions;

  const filterProg = filterProgramme ? PROGRAMMES[filterProgramme] || PROGRAMMES[filterProgramme.replace(/-/g, '_')] : null;

  return (
    <PageTemplate
      pageTitle={filterProg ? `${filterProg.icon} ${filterProg.name} Sessions` : 'Sessions'}
      pageStrapline={filterProg ? `Zoom schedule for ${filterProg.name}` : 'Your Zoom session schedule — all programmes, all weeks'}
      pageType="standard"
    >
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 1rem 3rem' }}>

        {filterProg && (
          <FacilitatorSessionPanel programmeId={filterProgramme!} />
        )}

        {/* View toggle + programme filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            {(['week', 'upcoming', 'all'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '8px 14px',
                background: view === v ? 'rgba(51, 65, 85, 0.6)' : 'rgba(30, 41, 59, 0.4)',
                border: 'none', cursor: 'pointer', fontSize: '0.8rem',
                fontWeight: view === v ? 700 : 400,
                color: view === v ? C.textBright : C.textDim,
              }}>
                {v === 'week' ? 'This Week' : v === 'upcoming' ? 'Upcoming' : 'All'}
              </button>
            ))}
          </div>

          {filterProg && (
            <Link to="/sessions" style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600,
              background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.25)',
              color: '#f87171', textDecoration: 'none',
            }}>
              ✕ Clear filter
            </Link>
          )}

          <span style={{ fontSize: '0.75rem', color: C.textDim, marginLeft: 'auto' }}>
            {displaySessions.length} session{displaySessions.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Programme quick-filter pills */}
        {!filterProg && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
            {Object.values(PROGRAMMES).map(p => (
              <Link key={p.id} to={`/sessions?programme=${p.id}`} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 10px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600,
                background: `color-mix(in srgb, ${p.color} 10%, rgba(15, 23, 42, 0.8))`,
                border: `1px solid color-mix(in srgb, ${p.color} 20%, transparent)`,
                color: p.color, textDecoration: 'none',
              }}>
                {p.icon} {p.name}
              </Link>
            ))}
          </div>
        )}

        {/* Session cards */}
        {displaySessions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: C.textDim }}>
            <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p>No sessions scheduled for this view.</p>
            {filterProg && <p style={{ fontSize: '0.8rem' }}>This programme may not be running in the current season.</p>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {displaySessions.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}

        {/* Recurring sessions */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: C.textDim, marginBottom: '1rem' }}>
            Weekly Recurring
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {RECURRING_SESSIONS.map((rs, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', background: C.bg, border: `1px solid ${C.border}`,
                borderRadius: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: rs.type === 'drop-in' ? 'rgba(16, 185, 129, 0.12)' : rs.type === 'feedback' ? 'rgba(79, 70, 229, 0.12)' : 'rgba(251, 191, 36, 0.12)',
                  color: rs.type === 'drop-in' ? '#34d399' : rs.type === 'feedback' ? '#818cf8' : '#fbbf24',
                  fontSize: '0.8rem',
                }}>
                  {rs.type === 'drop-in' ? <Users size={16} /> : rs.type === 'feedback' ? <BookOpen size={16} /> : <Zap size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: C.textHeading }}>{rs.title}</div>
                  <div style={{ fontSize: '0.75rem', color: C.textDim }}>{rs.day} · {rs.time}</div>
                </div>
                <div style={{ fontSize: '0.75rem', color: C.textMuted, maxWidth: 300 }}>{rs.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

// ── Session Card ──

const SessionCard: React.FC<{ session: ScheduledSession }> = ({ session }) => {
  const dateObj = new Date(session.date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  const isLive = session.status === 'live';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: '14px 18px', borderRadius: 14,
      background: isLive
        ? `color-mix(in srgb, ${session.programmeColor} 8%, rgba(15, 23, 42, 0.8))`
        : 'rgba(30, 41, 59, 0.6)',
      border: `1.5px solid ${isLive ? session.programmeColor : 'rgba(148, 163, 184, 0.12)'}`,
      transition: 'all 0.2s',
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.2rem' }}>{session.programmeIcon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>{session.title}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {dateStr} · {session.time}
            {isLive && (
              <span style={{
                marginLeft: 8, padding: '2px 8px', borderRadius: 100,
                background: '#dc2626', color: 'white', fontSize: '0.65rem', fontWeight: 700,
              }}>
                LIVE
              </span>
            )}
          </div>
        </div>
        <span style={{
          padding: '4px 10px', borderRadius: 100, fontSize: '0.65rem', fontWeight: 700,
          background: `color-mix(in srgb, ${session.programmeColor} 12%, rgba(15, 23, 42, 0.8))`,
          border: `1px solid color-mix(in srgb, ${session.programmeColor} 20%, transparent)`,
          color: session.programmeColor,
        }}>
          Week {session.week}
        </span>
      </div>

      {/* Quick links row */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Link to={session.sparkGeneratorUrl} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 8, fontSize: '0.7rem', fontWeight: 600,
          background: `color-mix(in srgb, ${session.programmeColor} 10%, rgba(15, 23, 42, 0.8))`,
          border: `1px solid color-mix(in srgb, ${session.programmeColor} 20%, transparent)`,
          color: session.programmeColor, textDecoration: 'none',
        }}>
          <Zap size={12} /> Sparks
        </Link>
        <Link to={session.facilitationGuideUrl} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 8, fontSize: '0.7rem', fontWeight: 600,
          background: 'rgba(51, 65, 85, 0.4)', border: '1px solid rgba(148, 163, 184, 0.15)',
          color: '#94a3b8', textDecoration: 'none',
        }}>
          <BookOpen size={12} /> Guide W{session.week}
        </Link>
        <Link to={session.sandboxUrl} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 8, fontSize: '0.7rem', fontWeight: 600,
          background: 'rgba(51, 65, 85, 0.4)', border: '1px solid rgba(148, 163, 184, 0.15)',
          color: '#94a3b8', textDecoration: 'none',
        }}>
          <Target size={12} /> Sandbox
        </Link>
      </div>
    </div>
  );
};

export default SessionsPage;