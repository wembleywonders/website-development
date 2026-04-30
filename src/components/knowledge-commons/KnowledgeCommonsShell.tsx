import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ThreadExplorer from './ThreadExplorer';
import InstitutionalMap from './InstitutionalMap';
import EraTimeline from './EraTimeline';
import QuestionGateway from './QuestionGateway';
import PlaqueGenerator from './PlaqueGenerator';
import './KnowledgeCommons.css';

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE COMMONS SHELL
// Navigation and browsing logic for the counter-archive.
//
// Five browsing modes, each a different entry into the same corpus:
//   thread   — narrative threads connecting pioneers across time
//   place    — institutional map of post-colonial London
//   era      — chronological sweep 1807–present
//   question — curated entry questions for non-historians
//   plaque   — community contribution: nominate missing plaques
//
// URL state: ?mode=thread&id=same-rule-different-arenas
// This means every view is linkable and shareable.
// ─────────────────────────────────────────────────────────────────────────────

export type BrowseMode = 'thread' | 'place' | 'era' | 'question' | 'plaque';

export interface CommonsContext {
  mode: BrowseMode;
  setMode: (m: BrowseMode) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const NAV_ITEMS: { id: BrowseMode; label: string; icon: string; description: string }[] = [
  { id: 'thread',   label: 'By Thread',   icon: '⟳', description: 'Follow narrative connections across time' },
  { id: 'place',    label: 'By Place',    icon: '◎', description: 'The institutional map of post-colonial London' },
  { id: 'era',      label: 'By Era',      icon: '│', description: 'Chronological sweep from 1807 to now' },
  { id: 'question', label: 'By Question', icon: '?', description: 'Start with a question, arrive at history' },
  { id: 'plaque',   label: 'Contribute',  icon: '+', description: 'Nominate a missing plaque' },
];

const ARCHIVE_STATS = [
  { value: '48',  label: 'Pioneer profiles' },
  { value: '6',   label: 'Deep-dive threads' },
  { value: '12',  label: 'Institutional markers' },
  { value: '1807',label: 'Earliest documented' },
];

const KnowledgeCommonsShell: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = (searchParams.get('mode') as BrowseMode) || 'thread';
  const initialId   = searchParams.get('id') || null;

  const [mode, setModeState]       = useState<BrowseMode>(initialMode);
  const [activeId, setActiveIdState] = useState<string | null>(initialId);
  const [navStuck, setNavStuck]    = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sync mode/id to URL so every view is shareable
  const setMode = (m: BrowseMode) => {
    setModeState(m);
    setActiveIdState(null);
    setSearchParams({ mode: m });
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const setActiveId = (id: string | null) => {
    setActiveIdState(id);
    if (id) setSearchParams({ mode, id });
    else    setSearchParams({ mode });
  };

  // Sticky nav detection
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      setNavStuck(rect.top <= 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dismiss intro panel after first mode selection
  useEffect(() => {
    if (mode !== 'thread' || activeId) setIntroVisible(false);
  }, [mode, activeId]);

  const ctx: CommonsContext = { mode, setMode, activeId, setActiveId };

  return (
    <div className="kc">

      {/* ── MASTHEAD ─────────────────────────────────────────────── */}
      <header className="kc-masthead">
        <div className="kc-masthead-atmosphere">
          <div className="kc-atm-bar kc-atm-bar--1" />
          <div className="kc-atm-bar kc-atm-bar--2" />
          <div className="kc-atm-grain" />
        </div>

        <div className="kc-container kc-masthead-inner">
          <div className="kc-masthead-left">
            <div className="kc-masthead-provenance">
              <Link to="/" className="kc-breadcrumb">Wembley Wonders</Link>
              <span className="kc-breadcrumb-sep">›</span>
              <span className="kc-breadcrumb-current">Knowledge Commons</span>
            </div>

            <h1 className="kc-masthead-title">
              Knowledge<br />
              <em>Commons</em>
            </h1>

            <p className="kc-masthead-tagline">
              The counter-archive. Publicly accessible.<br />
              Assembled, not generated.
            </p>

            <div className="kc-masthead-mandate">
              <span className="kc-mandate-mark">◆</span>
              <p>
                English Heritage has issued 950+ blue plaques across London.
                This archive documents the ones that don't exist yet — and
                the history they would mark if they did.
              </p>
            </div>
          </div>

          <div className="kc-masthead-right">
            <div className="kc-archive-stats">
              {ARCHIVE_STATS.map((s, i) => (
                <div key={i} className="kc-stat">
                  <span className="kc-stat-value">{s.value}</span>
                  <span className="kc-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="kc-masthead-access">
              <div className="kc-access-badge">
                <span className="kc-access-dot" />
                Free to read · No login required
              </div>
              <p className="kc-access-note">
                Login to contribute oral history, nominate plaques,
                or submit archival material.
              </p>
              <Link to="/oral-history" className="kc-access-cta">
                Contribute your story →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── STICKY NAVIGATION ────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`kc-nav${navStuck ? ' kc-nav--stuck' : ''}`}
        role="navigation"
        aria-label="Knowledge Commons browsing modes"
      >
        <div className="kc-container kc-nav-inner">
          <div className="kc-nav-modes">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`kc-nav-btn${mode === item.id ? ' active' : ''}`}
                onClick={() => setMode(item.id)}
                aria-current={mode === item.id ? 'page' : undefined}
                title={item.description}
              >
                <span className="kc-nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="kc-nav-label">{item.label}</span>
                {item.id === 'plaque' && (
                  <span className="kc-nav-contribute-badge">Open</span>
                )}
              </button>
            ))}
          </div>

          <div className="kc-nav-mode-desc">
            {NAV_ITEMS.find(n => n.id === mode)?.description}
          </div>
        </div>
      </nav>

      {/* ── CONTENT AREA ─────────────────────────────────────────── */}
      <main className="kc-content" ref={contentRef} id="kc-content">
        <div className="kc-container">

          {/* Mode introductions — shown when no item selected */}
          {!activeId && (
            <div className="kc-mode-intro">
              {mode === 'thread' && (
                <div className="kc-intro-panel">
                  <span className="kc-intro-label">Browsing by thread</span>
                  <p className="kc-intro-text">
                    Six narrative threads, each tracing a single argument across
                    multiple lives and centuries. A thread isn't a category —
                    it's a claim. Follow it and see if you agree.
                  </p>
                </div>
              )}
              {mode === 'place' && (
                <div className="kc-intro-panel">
                  <span className="kc-intro-label">Browsing by place</span>
                  <p className="kc-intro-text">
                    Post-colonial London mapped institutionally. High commissions,
                    cultural institutes, former imperial buildings — the geography
                    of a relationship the city has never fully named.
                  </p>
                </div>
              )}
              {mode === 'era' && (
                <div className="kc-intro-panel">
                  <span className="kc-intro-label">Browsing by era</span>
                  <p className="kc-intro-text">
                    From the Abolition Act of 1807 to the present. Each era marked
                    by the legislation, the migrations, the cultural moments that
                    shaped who is here and why.
                  </p>
                </div>
              )}
              {mode === 'question' && (
                <div className="kc-intro-panel">
                  <span className="kc-intro-label">Start with a question</span>
                  <p className="kc-intro-text">
                    You don't need to know the history to enter it. Every question
                    here leads somewhere real. Start where curiosity is.
                  </p>
                </div>
              )}
              {mode === 'plaque' && (
                <div className="kc-intro-panel kc-intro-panel--contribute">
                  <span className="kc-intro-label">Community contribution</span>
                  <p className="kc-intro-text">
                    English Heritage decides who gets a plaque. We document who
                    should have one. Nominate a person, a place, or an event that
                    belongs in the record.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Mode components */}
          {mode === 'thread'   && <ThreadExplorer   ctx={ctx} />}
          {mode === 'place'    && <InstitutionalMap ctx={ctx} />}
          {mode === 'era'      && <EraTimeline      ctx={ctx} />}
          {mode === 'question' && <QuestionGateway  ctx={ctx} />}
          {mode === 'plaque'   && <PlaqueGenerator  ctx={ctx} />}

        </div>
      </main>

      {/* ── COMMONS FOOTER ───────────────────────────────────────── */}
      <footer className="kc-footer">
        <div className="kc-container kc-footer-inner">
          <div className="kc-footer-left">
            <span className="kc-footer-mark">Wembley Wonders Counter-Archive</span>
            <p className="kc-footer-note">
              This archive is assembled from public record, academic sources,
              and community testimony. Where sources conflict, we note it.
              Where gaps exist, we name them.
            </p>
          </div>
          <div className="kc-footer-right">
            <Link to="/oral-history" className="kc-footer-link">Contribute testimony →</Link>
            <Link to="/heritage/methodology" className="kc-footer-link">Editorial methodology →</Link>
            <Link to="/heritage/sources" className="kc-footer-link">Primary sources →</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default KnowledgeCommonsShell;