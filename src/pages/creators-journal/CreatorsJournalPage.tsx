/**
 * src/pages/creators-journal/CreatorsJournalPage.tsx
 * ===================================================
 * Creator's Journal — Updated
 * Wembley Wonders CIC
 *
 * REVISION:
 * - Hardcoded stats replaced with live data from journalStore
 * - STEMgeneers verification panel added (shows when pending)
 * - STEMgeneers portfolio section added for programme members
 * - Skill gate progress display added
 * - All original sections preserved exactly
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import JournalTabs from '../../components/creators-journal/JournalTabs';
import ConnectSection from '../../components/creators-journal/ConnectSection';
import CreateSection from '../../components/creators-journal/CreateSection';
import CultivateSection from '../../components/creators-journal/CultivateSection';
import CompeteSection from '../../components/creators-journal/CompeteSection';
import CelebrateSection from '../../components/creators-journal/CelebrateSection';
import {
  useJournalStats,
  useSTEMgeneersStats,
  usePendingVerificationId,
  usePendingVerificationSession,
  useDismissPendingVerification,
  useGateRequirements,
  useJournalStore,
} from '../../stores/journalStore';
import type { RepairLayer } from '../../types/creators-journal';
import './CreatorsJournalPage.css';

// ─────────────────────────────────────────────────────────────────────────────
// Whether to show STEMgeneers sections — in production this would come from
// the member's programme enrolment. For now, detect from repair evidence.
// ─────────────────────────────────────────────────────────────────────────────
const useIsSTEMgeneer = () => {
  const repairEvidence = useJournalStore((s) => s.repairEvidence);
  const diagnosticSessions = useJournalStore((s) => s.diagnosticSessions);
  return (
    Object.keys(repairEvidence).length > 0 ||
    Object.keys(diagnosticSessions).length > 0
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type TabType = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';

const REPAIR_LAYERS: RepairLayer[] = [
  'precision', 'appliance', 'home', 'furniture', 'making', 'trades'
];

const LAYER_LABELS: Record<RepairLayer, string> = {
  precision: 'Precision',
  appliance: 'Appliances',
  home: 'Home',
  furniture: 'Furniture',
  making: 'Making',
  trades: 'Trades',
};

const LAYER_ICONS: Record<RepairLayer, string> = {
  precision: '⌚',
  appliance: '🫧',
  home: '🏠',
  furniture: '🪑',
  making: '🖨️',
  trades: '⚡',
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Maya verification panel — shown when a repair has been logged
 * and STEMSage is waiting for the follow-up conversation
 */
const MayaVerificationPanel: React.FC = () => {
  const sessionId = usePendingVerificationId();
  const session  = usePendingVerificationSession();
  const dismiss  = useDismissPendingVerification();
  const completeSession = useJournalStore((s) => s.completeVerificationSession);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; score: number } | null>(null);

  if (!sessionId || !session) return null;

  const questions = session.questionSequence;
  const currentQuestion = questions[currentQuestionIdx];
  const isLast = currentQuestionIdx === questions.length - 1;

  const handleResponse = (text: string) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: text }));
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentQuestionIdx((i) => i + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!sessionId) return;

    // Self-assessment scoring — in production this calls the Anthropic API
    // via the STEMSage assessment prompt. For now, score by response length
    // and keyword presence as a placeholder until API integration is wired.
    const assessments = questions.map((q) => {
      const response = responses[q.id] ?? '';
      const wordCount = response.trim().split(/\s+/).length;
      // Rough heuristic: 40+ words with technical content = demonstrates understanding
      const hasTechnicalContent = /physics|because|principle|science|material|circuit|pressure|force|current|bearing|lubric|tribolog|pascal|ohm|watt|amp|volt|therm|mech/i.test(response);
      const score = wordCount >= 40 && hasTechnicalContent ? 0.85
        : wordCount >= 25 && hasTechnicalContent ? 0.72
        : wordCount >= 40 ? 0.65
        : wordCount >= 15 ? 0.5
        : 0.3;

      return {
        questionId: q.id,
        score,
        demonstratesUnderstanding: score >= 0.7,
        specificFeedback: score >= 0.7
          ? 'Your explanation shows you understood the work, not just the procedure.'
          : 'Try to explain the underlying reason — not just what you did, but why it works.',
        followUpTriggered: score < 0.7,
        followUpQuestion: score < 0.7
          ? 'Can you say a bit more about the science behind why this fix works?'
          : undefined,
        gapsIdentified: score < 0.7 ? ['physics explanation', 'diagnosis reasoning'] : [],
      };
    });

    const overallScore =
      assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length;

    const { passed } = completeSession(sessionId, {
      overallScore,
      questionAssessments: assessments,
    });

    setResult({ passed, score: overallScore });
    setSubmitted(true);
  };

  if (submitted && result) {
    return (
      <div className={`maya-verification-panel ${result.passed ? 'passed' : 'needs-review'}`}>
        <div className="mvp-header">
          <span className="mvp-icon">🤖</span>
          <div>
            <h3>STEM Sage Verification</h3>
            <p>{result.passed ? 'Verification passed' : 'A little more to cover'}</p>
          </div>
        </div>
        <div className="mvp-result">
          {result.passed ? (
            <>
              <p className="mvp-pass">
                ✓ Your repair has been verified. Your reasoning demonstrates genuine understanding — not just following a procedure.
              </p>
              <p className="mvp-score">
                Score: {Math.round(result.score * 100)}% — contributes to your layer gate progress.
              </p>
            </>
          ) : (
            <>
              <p className="mvp-fail">
                Your repair is logged, but the verification needs a bit more depth.
                Come back to this after reviewing the relevant sandbox section.
              </p>
              <p className="mvp-score">
                Score: {Math.round(result.score * 100)}% — retry available in 7 days.
              </p>
            </>
          )}
        </div>
        <button className="mvp-dismiss" onClick={dismiss}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="maya-verification-panel pending">
      <div className="mvp-header">
        <span className="mvp-icon">🤖</span>
        <div>
          <h3>STEM Sage wants to check in</h3>
          <p>
            You logged a repair. A quick follow-up to confirm the understanding
            — not a test, just a conversation. Question {currentQuestionIdx + 1} of {questions.length}.
          </p>
        </div>
        <button className="mvp-skip" onClick={dismiss} title="Skip for now">
          Later
        </button>
      </div>

      <div className="mvp-question">
        <p className="mvp-question-type">
          {currentQuestion.questionType === 'physics-explanation' && '⚛️ Physics check'}
          {currentQuestion.questionType === 'open-reasoning' && '🔍 Diagnosis reasoning'}
          {currentQuestion.questionType === 'decision-justification' && '⚖️ Decision making'}
          {currentQuestion.questionType === 'reflection' && '💭 Reflection'}
        </p>
        <p className="mvp-question-text">{currentQuestion.questionText}</p>
        <textarea
          className="mvp-response"
          placeholder="Write your answer here — in your own words, as much detail as you can..."
          value={responses[currentQuestion.id] ?? ''}
          onChange={(e) => handleResponse(e.target.value)}
          rows={5}
        />
        <div className="mvp-actions">
          {currentQuestionIdx > 0 && (
            <button
              className="mvp-back"
              onClick={() => setCurrentQuestionIdx((i) => i - 1)}
            >
              ← Back
            </button>
          )}
          <button
            className="mvp-next"
            onClick={handleNext}
            disabled={!responses[currentQuestion.id]?.trim()}
          >
            {isLast ? 'Submit' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Gate progress card for a single repair layer
 */
const LayerGateCard: React.FC<{ layer: RepairLayer }> = ({ layer }) => {
  const gate = useGateRequirements(layer);
  const statusColour: Record<typeof gate.status, string> = {
    locked: '#6b7280',
    'in-progress': '#f59e0b',
    passed: '#10b981',
    'passed-with-distinction': '#8b5cf6',
  };

  return (
    <div
      className={`layer-gate-card status-${gate.status}`}
      style={{ borderColor: statusColour[gate.status] }}
    >
      <div className="lgc-header">
        <span className="lgc-icon">{LAYER_ICONS[layer]}</span>
        <div className="lgc-title">
          <h4>{LAYER_LABELS[layer]}</h4>
          <span
            className="lgc-status"
            style={{ color: statusColour[gate.status] }}
          >
            {gate.status === 'locked' && 'Not started'}
            {gate.status === 'in-progress' && 'In progress'}
            {gate.status === 'passed' && '✓ Passed'}
            {gate.status === 'passed-with-distinction' && '★ Distinction'}
          </span>
        </div>
        <div className="lgc-progress-ring">
          <svg viewBox="0 0 36 36" className="lgc-ring">
            <path
              className="lgc-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" strokeWidth="3"
            />
            <path
              className="lgc-ring-fill"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" strokeWidth="3"
              strokeDasharray={`${gate.overallProgress}, 100`}
              style={{ stroke: statusColour[gate.status] }}
            />
          </svg>
          <span className="lgc-ring-value">{gate.overallProgress}%</span>
        </div>
      </div>

      {gate.status !== 'locked' && (
        <div className="lgc-requirements">
          {gate.requirements.map((req, i) => (
            <div key={i} className={`lgc-req ${req.passed ? 'req-passed' : 'req-pending'}`}>
              <span className="lgc-req-check">{req.passed ? '✓' : '○'}</span>
              <div className="lgc-req-content">
                <span className="lgc-req-label">{req.label}</span>
                {!req.passed && (
                  <span className="lgc-req-progress">
                    {req.completed}/{req.required}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {gate.status === 'locked' && (
        <p className="lgc-next-action">
          Start with the{' '}
          <Link to="/programmes/stemgeneers/sandbox">Diagnostic Trainer</Link>
        </p>
      )}

      {gate.status === 'in-progress' && (
        <p className="lgc-next-action">{gate.nextAction}</p>
      )}
    </div>
  );
};

/**
 * STEMgeneers portfolio section — shown for STEMgeneers members only
 */
const STEMgeneersPortfolioSection: React.FC = () => {
  const stats = useSTEMgeneersStats();
  const portfolio = useJournalStore((s) => s.portfolio);
  const requestCertification = useJournalStore((s) => s.requestCertification);
  const [certCheck, setCertCheck] = useState<{
    eligible: boolean;
    missingRequirements: string[];
  } | null>(null);

  const handleCertCheck = () => {
    const result = requestCertification();
    setCertCheck(result);
  };

  return (
    <div className="stemgeneers-portfolio-section">
      <div className="sps-header">
        <span className="sps-icon">🔧</span>
        <div>
          <h2>STEMgeneers Portfolio</h2>
          <p>
            Your repair record, verified skills, and pathway to certification.
            This is your credential — built from evidence, not just claims.
          </p>
        </div>
      </div>

      {/* Economic summary — the most powerful number */}
      <div className="sps-economic-summary">
        <div className="sps-econ-stat primary">
          <span className="sps-econ-value">
            £{stats.totalSavingsGenerated.toLocaleString()}
          </span>
          <span className="sps-econ-label">
            Total savings generated for your community
          </span>
        </div>
        <div className="sps-econ-stat">
          <span className="sps-econ-value">
            £{stats.totalIncomeEarned.toLocaleString()}
          </span>
          <span className="sps-econ-label">Income earned from repairs</span>
        </div>
        <div className="sps-econ-stat">
          <span className="sps-econ-value">{stats.totalRepairs}</span>
          <span className="sps-econ-label">
            Repairs logged
            {stats.witnessedRepairs > 0 && (
              <span className="sps-witnessed">
                {' '}({stats.witnessedRepairs} witnessed)
              </span>
            )}
          </span>
        </div>
        <div className="sps-econ-stat">
          <span className="sps-econ-value">
            {Math.round(stats.averageDiagnosticAccuracy * 100)}%
          </span>
          <span className="sps-econ-label">Diagnostic accuracy</span>
        </div>
        {stats.claimTokenLinkedRepairs > 0 && (
          <div className="sps-econ-stat verified">
            <span className="sps-econ-value">{stats.claimTokenLinkedRepairs}</span>
            <span className="sps-econ-label">
              Claim-token verified repairs
              <span className="sps-verified-badge">★ Strongest evidence</span>
            </span>
          </div>
        )}
      </div>

      {/* Layer gates */}
      <div className="sps-gates">
        <h3>Skill Layer Progress</h3>
        <p className="sps-gates-intro">
          Each layer requires diagnostic accuracy, real-world repairs, physics
          understanding, and a STEM Sage conversation. All four. Not three.
        </p>
        <div className="sps-gates-grid">
          {REPAIR_LAYERS.map((layer) => (
            <LayerGateCard key={layer} layer={layer} />
          ))}
        </div>
      </div>

      {/* Certification status */}
      <div className="sps-certification">
        <div className="sps-cert-status">
          <h3>Certification Status</h3>
          <span className={`sps-cert-badge status-${stats.certificationStatus}`}>
            {stats.certificationStatus === 'not-started' && 'Not yet started'}
            {stats.certificationStatus === 'in-progress' && 'In progress'}
            {stats.certificationStatus === 'certified' && '✓ Certified'}
            {stats.certificationStatus === 'certified-with-distinction' && '★ Certified with Distinction'}
          </span>
        </div>

        {portfolio?.certification.pathwayRecommendations &&
          portfolio.certification.pathwayRecommendations.length > 0 && (
          <div className="sps-pathways">
            <h4>Pathway recommendations based on your record:</h4>
            <ul>
              {portfolio.certification.pathwayRecommendations.map((p, i) => (
                <li key={i}>{formatPathway(p)}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="sps-cert-actions">
          <button className="sps-cert-check-btn" onClick={handleCertCheck}>
            Check certification eligibility
          </button>
          <Link to="/programmes/stemgeneers/sandbox" className="sps-sandbox-link">
            Open STEMgeneers Sandbox →
          </Link>
        </div>

        {certCheck && (
          <div className={`sps-cert-result ${certCheck.eligible ? 'eligible' : 'not-yet'}`}>
            {certCheck.eligible ? (
              <p>
                ✓ You meet the requirements for certification. Contact a programme
                director to complete the process.
              </p>
            ) : (
              <div>
                <p>Not yet — requirements still to meet:</p>
                <ul>
                  {certCheck.missingRequirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Portfolio export */}
      <div className="sps-export">
        <h4>Your Portfolio Document</h4>
        <p>
          Download your full repair record as a portfolio document — every repair,
          diagnosis reasoning, verification status, and savings generated.
          This is the document you take to an interview, an apprenticeship application,
          or a Housing Association tender.
        </p>
        <PortfolioExportButton />
      </div>
    </div>
  );
};

/**
 * Portfolio markdown export button
 */
const PortfolioExportButton: React.FC = () => {
  const getPortfolioExport = useJournalStore((s) => s.getPortfolioExport);

  const handleExport = () => {
    const markdown = getPortfolioExport();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stemgeneers-portfolio-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="portfolio-export-btn" onClick={handleExport}>
      ⬇ Download Portfolio Document
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

const CreatorsJournalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('connect');
  const journalStats = useJournalStats();
  const stemStats = useSTEMgeneersStats();
  const isSTEMgeneer = useIsSTEMgeneer();
  const pendingVerification = usePendingVerificationId();

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'connect':    return <ConnectSection />;
      case 'create':     return <CreateSection />;
      case 'cultivate':  return <CultivateSection />;
      case 'compete':    return <CompeteSection />;
      case 'celebrate':  return <CelebrateSection />;
      default:           return <ConnectSection />;
    }
  };

  return (
    <PageTemplate
      pageTitle="Creator's Journal"
      pageStrapline="Your work documents itself. Your success gets celebrated. Your story inspires others."
      pageType="framework"
    >
      <div className="creators-journal-container">

        {/* ── MAYA VERIFICATION PANEL ─────────────────────────────────────── */}
        {/* Shown when a STEMgeneers repair triggers a follow-up session */}
        {pendingVerification && <MayaVerificationPanel />}

        {/* ── AUTOMATION HIGHLIGHT — original, unchanged ────────────────── */}
        <div className="automation-highlight">
          <div className="highlight-header">
            <span className="highlight-icon">✨</span>
            <h2>Your Work Documents Itself</h2>
          </div>
          <p className="highlight-description">
            No extra work. No manual documentation. Just do what you came here to do —
            your Creator's Journal automatically logs everything.
          </p>

          <div className="automation-flow-visual">
            {[
              { icon: '🛠️', label: 'You Create', desc: 'Build speaker boxes, record podcasts, write stories, practice simulators' },
              { icon: '📝', label: 'Auto-Logged', desc: 'Every activity automatically recorded in your journal' },
              { icon: '🤖', label: 'ROV Journalists', desc: 'System detects compelling stories, flags for publication' },
              { icon: '📰', label: 'Published', desc: 'Your story appears on Joystick & Rayd-yo' },
              { icon: '♻️', label: 'Inspires Next', desc: 'Someone discovers your story, wants to join' },
            ].map((step, i, arr) => (
              <React.Fragment key={i}>
                <div className="flow-step-visual">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <strong>{step.label}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="flow-arrow-visual">→</div>}
              </React.Fragment>
            ))}
          </div>

          <div className="highlight-cta">
            <p><strong>You focus on learning. We handle everything else.</strong></p>
          </div>
        </div>

        {/* ── WHAT GETS TRACKED — original, unchanged ───────────────────── */}
        <div className="tracked-section">
          <h2>What Your Journal Tracks</h2>
          <div className="tracked-grid">
            <div className="tracked-card">
              <span className="tracked-icon">🎯</span>
              <h3>Every Activity</h3>
              <ul>
                <li>Programme participation</li>
                <li>Workshop attendance</li>
                <li>Simulator practice sessions</li>
                <li>Skills developed</li>
                <li>Projects completed</li>
              </ul>
            </div>
            <div className="tracked-card">
              <span className="tracked-icon">📊</span>
              <h3>Your Progress</h3>
              <ul>
                <li>5C journey position</li>
                <li>Confidence levels</li>
                <li>Readiness assessments</li>
                <li>Skills mastery</li>
                <li>Time invested</li>
              </ul>
            </div>
            <div className="tracked-card">
              <span className="tracked-icon">🌟</span>
              <h3>Your Impact</h3>
              <ul>
                <li>Stories published</li>
                <li>People you've helped</li>
                <li>Knowledge shared</li>
                <li>Mentorship given</li>
                <li>Cultural contribution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── REAL EXAMPLE — original, unchanged ───────────────────────── */}
        <div className="real-example-section">
          <h2>How It Actually Works</h2>
          <div className="example-timeline">
            {[
              { marker: 'Day 1', title: 'Marcus Joins STEMgeneers', body: 'Meets Uncle Winston. Starts learning about speaker boxes.', log: '✓ Automatically logged to Creator\'s Journal' },
              { marker: 'Week 3', title: 'Marcus Documents the Process', body: 'Films Uncle Winston teaching signal chains. Records the whole build process.', log: '✓ Progress tracked: 60% through speaker box build' },
              { marker: 'Week 6', title: 'Speaker Box Complete', body: 'First successful build. Understanding of physics. Documented knowledge.', log: '✓ Success flagged by Command Centre' },
              { marker: 'Week 7', title: 'ROV Journalists Activated', body: 'System identifies compelling story: intergenerational knowledge transfer.', log: '✓ Story queued for publication' },
              { marker: 'Week 8', title: 'Published on Joystick', body: '"Uncle Winston\'s Signal Chain: How OG Knowledge Meets New Generation"', log: '✓ Article live, Marcus featured' },
              { marker: 'Week 9', title: 'Featured on Rayd-yo', body: 'Podcast interview: Marcus and Uncle Winston discuss the learning process.', log: '✓ Audio archived, preserved forever' },
              { marker: 'Week 12', title: 'Impact Measured', body: "Marcus's story helped 8 new people join STEMgeneers. Knowledge now documented for next generation.", log: '✓ Cultural preservation achieved' },
            ].map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-marker">{item.marker}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="auto-logged">{item.log}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PUBLICATION PATH — original, unchanged ────────────────────── */}
        <div className="publication-path-section">
          <h2>Your Path to Publication</h2>
          <p className="section-intro">
            Not every journal entry becomes a published story — but the ones that show
            real learning, cultural value, or community impact get featured.
          </p>
          <div className="publication-criteria">
            <h3>What Makes a Story Worth Sharing?</h3>
            <div className="criteria-grid">
              {[
                { icon: '🔄', title: 'Knowledge Transfer', desc: 'Did you learn from an elder? Document indigenous knowledge? Preserve something that might be lost?' },
                { icon: '💡', title: 'Breakthrough Moments', desc: 'Did you overcome a fear? Master something challenging? Have an "aha!" moment worth sharing?' },
                { icon: '🌉', title: 'Bridge Building', desc: 'Did you connect two worlds? Show how skills transfer? Help someone else succeed?' },
                { icon: '🎯', title: 'Real Impact', desc: 'Did you create something useful? Solve an actual problem? Make a tangible difference?' },
              ].map((c, i) => (
                <div key={i} className="criteria-card">
                  <span className="criteria-icon">{c.icon}</span>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="publication-examples">
            <h3>Recent Publications from Journals</h3>
            <div className="publications-grid">
              {[
                { badge: 'joystick', title: '"From Tax Terror to Tax Confident: Jamal\'s Journey"', desc: 'How simulator practice transformed fear into mastery', stats: ['👥 12 people inspired to try simulator', '📊 Journal entry → Published in 3 days'] },
                { badge: 'raydyo', title: '"Auntie Clara\'s Montserrat Memories"', desc: 'Oral history preserved through Kaywana\'s Court', stats: ['🎧 156 listens in first week', '📊 Cultural knowledge archived forever'] },
                { badge: 'joystick', title: '"Uncle Winston\'s Physics Lesson"', desc: 'Why the tweeter goes on top: signal chain wisdom', stats: ['👥 8 new STEMgeneers members', '📊 Referenced in 3 other journals'] },
              ].map((p, i) => (
                <div key={i} className="publication-card">
                  <span className={`pub-badge ${p.badge}`}>{p.badge === 'joystick' ? 'Joystick' : 'Rayd-yo'}</span>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <div className="pub-stats">
                    {p.stats.map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── JOURNAL INTRO — original, unchanged ──────────────────────── */}
        <div className="journal-intro">
          <h2>Your Personal Journey Through The 5 Cs</h2>
          <p>
            Your Creator's Journal tracks your journey through the Five C's framework.
            Document your progress, showcase your work, and build a portfolio that demonstrates
            your growing skills and achievements.
          </p>
          <div className="journey-reminder">
            <p>
              <strong>Remember:</strong> Every entry here is part of the archive.
              Your story becomes the thing that helps the next person.
            </p>
          </div>
        </div>

        {/* ── JOURNAL TABS + CONTENT — original, unchanged ─────────────── */}
        <JournalTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="journal-content">
          {renderActiveSection()}
        </div>

        {/* ── STEMGENEERS PORTFOLIO — new, conditional ─────────────────── */}
        {isSTEMgeneer && <STEMgeneersPortfolioSection />}

        {/* ── IMPACT DASHBOARD — now live from store ───────────────────── */}
        <div className="impact-preview">
          <h2>Your Impact (So Far)</h2>
          <div className="impact-stats-grid">
            <div className="impact-stat">
              <span className="stat-number">{journalStats.totalEntries}</span>
              <span className="stat-label">Journal Entries</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">
                {useJournalStore.getState().portfolio?.publicationRecord.joystickArticles ?? 0}
              </span>
              <span className="stat-label">Stories Published</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">
                {useJournalStore.getState().portfolio?.publicationRecord.peopleInspiredToJoin ?? 0}
              </span>
              <span className="stat-label">People Helped</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">
                {useJournalStore.getState().portfolio?.publicationRecord.raydyoFeatures ?? 0}
              </span>
              <span className="stat-label">Podcast Featured</span>
            </div>
            {/* NEW: STEMgeneers savings stat — shown when relevant */}
            {isSTEMgeneer && stemStats.totalSavingsGenerated > 0 && (
              <div className="impact-stat stemgeneers-stat">
                <span className="stat-number">
                  £{stemStats.totalSavingsGenerated.toLocaleString()}
                </span>
                <span className="stat-label">Saved for your community</span>
              </div>
            )}
            {isSTEMgeneer && stemStats.totalRepairs > 0 && (
              <div className="impact-stat stemgeneers-stat">
                <span className="stat-number">{stemStats.totalRepairs}</span>
                <span className="stat-label">
                  Repairs completed
                  {stemStats.witnessedRepairs > 0 && (
                    <span className="stat-sublabel">
                      {stemStats.witnessedRepairs} witnessed
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>
          <p className="impact-note">
            <em>This grows as you grow. Your impact compounds over time.</em>
          </p>
        </div>

        {/* ── ARCHIVE CONNECTION — original, unchanged ──────────────────── */}
        <div className="archive-connection">
          <h2>Connected to the Archive</h2>
          <p>Your Creator's Journal feeds into our permanent archive:</p>
          <div className="archive-links">
            <Link to="/joystick" className="archive-link">
              <span className="archive-icon">📰</span>
              <div>
                <strong>Joystick</strong>
                <p>Written stories and articles</p>
              </div>
            </Link>
            <Link to="/raydyo" className="archive-link">
              <span className="archive-icon">🎙️</span>
              <div>
                <strong>Rayd-yo</strong>
                <p>Audio stories and podcasts</p>
              </div>
            </Link>
          </div>
          <p className="archive-mission">
            <strong>Each one teach one.</strong> Your documentation becomes the
            thing that teaches the next generation.
          </p>
        </div>

        {/* ── FINAL CTA — original, unchanged ──────────────────────────── */}
        <div className="journal-cta">
          <h2>Ready to Start Documenting Your Journey?</h2>
          <p>Join a programme. Do the work. Watch your story unfold.</p>
          <div className="cta-buttons">
            <Link to="/get-started" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/programmes" className="cta-button secondary">
              View Programmes
            </Link>
          </div>
        </div>

      </div>
    </PageTemplate>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function formatPathway(p: string): string {
  const labels: Record<string, string> = {
    'community-stemgeneer': 'Community STEMgeneer — the person your community calls',
    'apprenticeship-electrical': 'Electrical apprenticeship pathway',
    'apprenticeship-plumbing': 'Plumbing / heating engineer apprenticeship pathway',
    'city-guilds-part-time': 'City & Guilds part-time qualification route',
    'renewable-energy-specialist': 'Renewable energy installer — solar, heat pumps, EV charging',
    'scrap-cat-technical-lead': 'Scrap Cat technical lead',
  };
  return labels[p] ?? p;
}

export default CreatorsJournalPage;
