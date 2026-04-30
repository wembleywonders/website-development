import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ThreadExplorer from './ThreadExplorer';
import InstitutionalMap from './InstitutionalMap';
import EraTimeline from './EraTimeline';
import QuestionGateway from './QuestionGateway';
import PlaqueGenerator from './PlaqueGenerator';
import HeritageDiscoveryROV from './HeritageDiscoveryROV';
import './KnowledgeCommons.css';

// ── EPISTEMOLOGICAL FRAMEWORK ─────────────────────────────────────────────────
import {
  FRAMEWORK_OVERVIEW,
  SIX_CONCEPTS,
  VALIDATION_CHECKLIST,
  ROV_PROFILES,
  VALIDATION_OUTCOME_TIERS,
  getContributorSelfCheck
} from '../../data/epistemologicalFramework';

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE COMMONS SHELL
// Navigation and browsing logic for the counter-archive.
//
// Six browsing modes, each a different entry into the same corpus:
//   thread      — narrative threads connecting pioneers across time
//   place       — institutional map of post-colonial London
//   era         — chronological sweep 1807–present
//   question    — curated entry questions for non-historians
//   plaque      — community contribution: nominate missing plaques
//   framework   — the epistemological framework that governs the archive
//
// URL state: ?mode=thread&id=same-rule-different-arenas
// This means every view is linkable and shareable.
// ─────────────────────────────────────────────────────────────────────────────

export type BrowseMode = 'thread' | 'place' | 'era' | 'question' | 'plaque' | 'framework';

export interface CommonsContext {
  mode: BrowseMode;
  setMode: (m: BrowseMode) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const NAV_ITEMS: { id: BrowseMode; label: string; icon: string; description: string }[] = [
  { id: 'thread',    label: 'By Thread',    icon: '⟳', description: 'Follow narrative connections across time' },
  { id: 'place',     label: 'By Place',     icon: '◎', description: 'The institutional map of post-colonial London' },
  { id: 'era',       label: 'By Era',       icon: '│', description: 'Chronological sweep from 1807 to now' },
  { id: 'question',  label: 'By Question',  icon: '?', description: 'Start with a question, arrive at history' },
  { id: 'plaque',    label: 'Contribute',   icon: '+', description: 'Nominate a missing plaque' },
  { id: 'framework', label: 'Our Standard', icon: '◆', description: 'How knowledge enters and is validated in this archive' },
];

const ARCHIVE_STATS = [
  { value: '48',   label: 'Pioneer profiles' },
  { value: '6',    label: 'Deep-dive threads' },
  { value: '12',   label: 'Institutional markers' },
  { value: '1807', label: 'Earliest documented' },
];

// ─────────────────────────────────────────────────────────────────────────────
// EPISTEMOLOGICAL FRAMEWORK VIEW
// Rendered when mode === 'framework'.
// Presents the six concepts, validation checklist, outcome tiers, and
// the per-ROV question sets — all drawn from the data layer.
// ─────────────────────────────────────────────────────────────────────────────

const FrameworkView: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState<string | null>(null);
  const [activeRovId, setActiveRovId] = useState<string | null>(null);
  const selfCheck = getContributorSelfCheck();

  return (
    <div className="kc-framework">

      {/* ── INTRO ── */}
      <div className="kc-framework-intro">
        <span className="kc-framework-version">
          {FRAMEWORK_OVERVIEW.title} · v{FRAMEWORK_OVERVIEW.version} · {FRAMEWORK_OVERVIEW.date}
        </span>
        <p className="kc-framework-summary">{FRAMEWORK_OVERVIEW.summary}</p>
        <blockquote className="kc-framework-equiano">
          <span className="kc-framework-equiano-mark">◆</span>
          {FRAMEWORK_OVERVIEW.equianoPrinciple}
        </blockquote>
        <p className="kc-framework-commitment">{FRAMEWORK_OVERVIEW.coreCommitment}</p>
      </div>

      {/* ── SIX CONCEPTS ── */}
      <section className="kc-framework-section">
        <h2 className="kc-framework-section-title">Six named concepts</h2>
        <p className="kc-framework-section-intro">
          Each concept is drawn from a specific observed case study and names a
          failure mode or its corrective. Click any concept to expand the full definition.
        </p>
        <div className="kc-concepts-grid">
          {SIX_CONCEPTS.map(concept => (
            <div
              key={concept.id}
              className={`kc-concept-card${activeConceptId === concept.id ? ' kc-concept-card--open' : ''}`}
              onClick={() =>
                setActiveConceptId(activeConceptId === concept.id ? null : concept.id)
              }
            >
              <div className="kc-concept-header">
                <span className="kc-concept-number">0{concept.number}</span>
                <div className="kc-concept-title-block">
                  <h3 className="kc-concept-name">{concept.name}</h3>
                  <span className="kc-concept-source">{concept.source}</span>
                </div>
                <span className="kc-concept-toggle">
                  {activeConceptId === concept.id ? '−' : '+'}
                </span>
              </div>

              <div className="kc-concept-question">
                <span className="kc-concept-question-label">The question it asks:</span>
                <em>"{concept.coreQuestion}"</em>
              </div>

              {activeConceptId === concept.id && (
                <div className="kc-concept-body">
                  <div className="kc-concept-subsection">
                    <span className="kc-concept-sublabel">Source</span>
                    <p>{concept.sourceDescription}</p>
                  </div>
                  <div className="kc-concept-subsection">
                    <span className="kc-concept-sublabel">Principle</span>
                    <p>{concept.principle}</p>
                  </div>
                  <div className="kc-concept-subsection">
                    <span className="kc-concept-sublabel">Applied in the Commons</span>
                    <p>{concept.commonsApplication}</p>
                  </div>
                  <div className="kc-concept-subsection kc-concept-subsection--failure">
                    <span className="kc-concept-sublabel">Failure pattern to watch for</span>
                    <p>{concept.failurePattern}</p>
                  </div>
                  <div className="kc-concept-subsection kc-concept-subsection--corrective">
                    <span className="kc-concept-sublabel">The corrective</span>
                    <p>{concept.corrective}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── VALIDATION CHECKLIST ── */}
      <section className="kc-framework-section">
        <h2 className="kc-framework-section-title">The validation checklist</h2>
        <p className="kc-framework-section-intro">
          Every submission to the Knowledge Commons passes through these six questions.
          The checklist is diagnostic, not binary — see the outcome tiers below for
          what happens at each level.
        </p>
        <div className="kc-checklist">
          {VALIDATION_CHECKLIST.map(q => (
            <div key={q.id} className="kc-checklist-item">
              <div className="kc-checklist-number">{q.id}</div>
              <div className="kc-checklist-content">
                <p className="kc-checklist-question">{q.question}</p>
                <p className="kc-checklist-elaboration">{q.elaboration}</p>
                <div className="kc-checklist-indicators">
                  <div className="kc-checklist-pass">
                    <span className="kc-indicator-label kc-indicator-label--pass">Pass</span>
                    {q.passIndicator}
                  </div>
                  <div className="kc-checklist-fail">
                    <span className="kc-indicator-label kc-indicator-label--fail">Fail</span>
                    {q.failIndicator}
                  </div>
                </div>
                <div className="kc-checklist-failure-mode">
                  <span className="kc-failure-label">Why this matters:</span>
                  {q.failureMode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUTCOME TIERS ── */}
      <section className="kc-framework-section">
        <h2 className="kc-framework-section-title">Outcome tiers</h2>
        <p className="kc-framework-section-intro">
          A submission that fails a question is not rejected. It is classified accurately.
          The archive is honest about what it knows and how it knows it.
        </p>
        <div className="kc-outcome-tiers">
          {VALIDATION_OUTCOME_TIERS.map(tier => (
            <div
              key={tier.outcome}
              className={`kc-outcome-tier kc-outcome-tier--${tier.outcome}`}
            >
              <div className="kc-outcome-header">
                <span className="kc-outcome-range">
                  {tier.questionsFailedRange === '0'
                    ? 'Passes all 6'
                    : `Fails ${tier.questionsFailedRange} questions`}
                </span>
                <span className="kc-outcome-label">{tier.label}</span>
              </div>
              <p className="kc-outcome-status">{tier.archiveStatus}</p>
              <p className="kc-outcome-action">
                <strong>Action:</strong> {tier.action}
              </p>
              {tier.notation && (
                <div className="kc-outcome-notation">
                  <span className="kc-notation-label">Archive notation:</span>
                  <em>{tier.notation}</em>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ROV APPLICATION GUIDE ── */}
      <section className="kc-framework-section">
        <h2 className="kc-framework-section-title">How each specialist applies it</h2>
        <p className="kc-framework-section-intro">
          Each ROV applies the framework differently depending on their knowledge domain.
          Click any specialist to see their domain-specific validation questions.
        </p>
        <div className="kc-rov-grid">
          {ROV_PROFILES.map(rov => (
            <div
              key={rov.id}
              className={`kc-rov-card${activeRovId === rov.id ? ' kc-rov-card--open' : ''}`}
              onClick={() =>
                setActiveRovId(activeRovId === rov.id ? null : rov.id)
              }
            >
              <div className="kc-rov-header">
                <span className="kc-rov-icon">{rov.icon}</span>
                <div>
                  <h3 className="kc-rov-name">{rov.name}</h3>
                  <span className="kc-rov-domain">{rov.domain}</span>
                </div>
                <span className="kc-rov-toggle">
                  {activeRovId === rov.id ? '−' : '+'}
                </span>
              </div>

              {activeRovId === rov.id && (
                <div className="kc-rov-body">
                  <div className="kc-rov-subsection">
                    <span className="kc-rov-sublabel">Validation questions</span>
                    <ol className="kc-rov-questions">
                      {rov.validationQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="kc-rov-subsection">
                    <span className="kc-rov-sublabel">Common failure modes in this domain</span>
                    <ul className="kc-rov-failures">
                      {rov.commonFailureModes.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="kc-rov-subsection kc-rov-subsection--intervention">
                    <span className="kc-rov-sublabel">Example intervention</span>
                    <blockquote className="kc-rov-example">
                      "{rov.exampleIntervention}"
                    </blockquote>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTRIBUTOR SELF-CHECK ── */}
      <section className="kc-framework-section kc-framework-section--selfcheck">
        <h2 className="kc-framework-section-title">Before you submit</h2>
        <p className="kc-framework-section-intro">
          Run your submission through these six questions before sending it to the archive.
          Most validation issues are caught here before the ROV ever sees them.
        </p>
        <div className="kc-selfcheck">
          {selfCheck.map((item, i) => (
            <div key={item.id} className="kc-selfcheck-item">
              <div className="kc-selfcheck-number">{i + 1}</div>
              <div className="kc-selfcheck-content">
                <p className="kc-selfcheck-question">{item.question}</p>
                <p className="kc-selfcheck-hint">{item.hint}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="kc-selfcheck-cta">
          <Link to="/oral-history" className="kc-selfcheck-submit-btn">
            Submit to the Knowledge Commons →
          </Link>
          <p className="kc-selfcheck-note">
            Not sure which questions your submission satisfies? Submit anyway — the
            relevant specialist will help you work through it.
          </p>
        </div>
      </section>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SHELL COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const KnowledgeCommonsShell: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = (searchParams.get('mode') as BrowseMode) || 'thread';
  const initialId   = searchParams.get('id') || null;

  const [mode, setModeState]         = useState<BrowseMode>(initialMode);
  const [activeId, setActiveIdState] = useState<string | null>(initialId);
  const [navStuck, setNavStuck]      = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const navRef     = useRef<HTMLDivElement>(null);
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
              <div className="kc-access-links">
                <Link to="/oral-history" className="kc-access-cta">
                  Contribute your story →
                </Link>
                <button
                  className="kc-access-standard-btn"
                  onClick={() => setMode('framework')}
                >
                  Our editorial standard ◆
                </button>
              </div>
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
                className={`kc-nav-btn${mode === item.id ? ' active' : ''}${item.id === 'framework' ? ' kc-nav-btn--standard' : ''}`}
                onClick={() => setMode(item.id)}
                aria-current={mode === item.id ? 'page' : undefined}
                title={item.description}
              >
                <span className="kc-nav-icon" aria-hidden="true">{item.icon}</span>
                <span className="kc-nav-label">{item.label}</span>
                {item.id === 'plaque' && (
                  <span className="kc-nav-contribute-badge">Open</span>
                )}
                {item.id === 'framework' && (
                  <span className="kc-nav-framework-badge">v1.0</span>
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
          {!activeId && mode !== 'framework' && (
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
          {mode === 'thread'    && <ThreadExplorer   ctx={ctx} />}
          {mode === 'place'     && <InstitutionalMap ctx={ctx} />}
          {mode === 'era'       && <EraTimeline      ctx={ctx} />}
          {mode === 'question'  && <QuestionGateway  ctx={ctx} />}
          {mode === 'plaque'    && <PlaqueGenerator  ctx={ctx} />}
          {mode === 'framework' && <FrameworkView />}

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
            <button
              className="kc-footer-link kc-footer-link--btn"
              onClick={() => setMode('framework')}
            >
              Editorial standard →
            </button>
            <Link to="/heritage/sources" className="kc-footer-link">Primary sources →</Link>
          </div>
        </div>
      </footer>

      {/* ── ESI — HERITAGE DISCOVERY ROV ─────────────────────────── */}
      {/* Fixed bottom-right. Appears on all modes of the Knowledge Commons.    */}
      {/* In framework mode, Esi's opening message is adjusted to orient the     */}
      {/* visitor toward the editorial standard they are reading.               */}
      <HeritageDiscoveryROV
        isLoggedIn={false}
        defaultOpen={false}
        onNavigate={(esiMode: string, id?: string) => {
          setMode(esiMode as BrowseMode);
          setActiveId(id ?? null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
};

export default KnowledgeCommonsShell;