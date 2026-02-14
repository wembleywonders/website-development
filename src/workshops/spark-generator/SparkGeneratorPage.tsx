import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Clock, ChevronDown, ChevronUp, Play, Pause,
  RotateCcw, BookOpen, Zap, Info, ExternalLink,
  Layers, Target, Video, Lightbulb
} from 'lucide-react';
import PageTemplate from '../../components/PageTemplate';
import {
  PROGRAMMES, PROGRAMME_SPARKS, UNIVERSAL_SPARKS,
  MODE_NOTES, ENERGY_LABELS, getProgrammeByParam,
  type Programme, type Spark
} from './sparkData';
import './SparkGenerator.css';

// ============================================
// SPARK GENERATOR PAGE v2 — Connected
// ============================================
// Reads ?programme=pageturners from URL so facilitators
// can bookmark pre-configured links per programme.
// Shows session structure, sandbox links, and facilitation
// guide references alongside the spark generator.
// ============================================

const SparkGeneratorPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramProgramme = searchParams.get('programme');

  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);
  const [currentSpark, setCurrentSpark] = useState<Spark | null>(null);
  const [sparkType, setSparkType] = useState<'any' | 'opener' | 'closer'>('any');
  const [showNotes, setShowNotes] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showSessionPlan, setShowSessionPlan] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMax, setTimerMax] = useState(180);
  const [usedSparks, setUsedSparks] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<Spark[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  // Read programme from URL on mount
  useEffect(() => {
    if (paramProgramme) {
      const found = getProgrammeByParam(paramProgramme);
      if (found) {
        setSelectedProgramme(found.id);
      }
    }
  }, [paramProgramme]);

  // Update URL when programme changes
  const handleProgrammeSelect = (progId: string | null) => {
    setSelectedProgramme(progId);
    if (progId) {
      setSearchParams({ programme: progId });
    } else {
      setSearchParams({});
    }
  };

  // Timer
  useEffect(() => {
    if (timerRunning && timer < timerMax) {
      timerRef.current = setTimeout(() => setTimer(t => t + 1), 1000);
    } else if (timer >= timerMax) {
      setTimerRunning(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timerRunning, timer, timerMax]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const timerProgress = timerMax > 0 ? (timer / timerMax) * 100 : 0;

  const generateSpark = useCallback(() => {
    let pool: Spark[] = [];
    if (selectedProgramme && PROGRAMME_SPARKS[selectedProgramme]) {
      pool = [...PROGRAMME_SPARKS[selectedProgramme]];
    } else {
      Object.values(PROGRAMME_SPARKS).forEach(sparks => { pool = [...pool, ...sparks]; });
    }
    pool = [...pool, ...UNIVERSAL_SPARKS];
    if (sparkType !== 'any') pool = pool.filter(s => s.type === sparkType);
    const unused = pool.filter(s => !usedSparks.has(s.prompt));
    const finalPool = unused.length > 0 ? unused : pool;
    const spark = finalPool[Math.floor(Math.random() * finalPool.length)];
    setCurrentSpark(spark);
    setUsedSparks(prev => new Set([...prev, spark.prompt]));
    setHistory(prev => [spark, ...prev].slice(0, 10));
    setTimer(0);
    setTimerRunning(false);
    setShowNotes(false);
    setTimeout(() => { sparkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
  }, [selectedProgramme, sparkType, usedSparks]);

  const prog = selectedProgramme ? PROGRAMMES[selectedProgramme] : null;

  return (
    <PageTemplate
      pageTitle="Spark Generator"
      pageStrapline={prog ? `${prog.sparkIcon} ${prog.sparkName} — ${prog.name}` : 'Facilitator tool for Zoom session warm-ups'}
      pageType="standard"
    >
      <div className="spark-gen">

        {/* Header */}
        <section className="spark-gen-header">
          <div className="spark-gen-badge">
            <Zap size={16} />
            <span>Facilitator Tool</span>
          </div>
          <p className="spark-gen-subtitle">
            Playful, high-energy warm-ups for Zoom sessions.
            3 minutes max · Zero prep · Skills built surreptitiously.
          </p>
        </section>

        {/* Programme Selector */}
        <section className="spark-gen-programmes">
          <div className="spark-gen-section-label">Choose programme (or leave blank for any)</div>
          <div className="programme-selector-grid">
            {Object.values(PROGRAMMES).map((p: Programme) => {
              const isSelected = selectedProgramme === p.id;
              return (
                <button
                  key={p.id}
                  className={`programme-select-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleProgrammeSelect(isSelected ? null : p.id)}
                  style={{ '--prog-color': p.color, '--prog-light': p.colorLight } as React.CSSProperties}
                >
                  <span className="prog-select-icon">{p.icon}</span>
                  <span className="prog-select-name">{p.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════════════
            CONNECTED PANEL — Session, Sandbox, Guide
            ════════════════════════════════════════════ */}
        {prog && (
          <div className="spark-gen-connected" style={{ '--prog-color': prog.color } as React.CSSProperties}>

            {/* Programme Info Bar */}
            <div className="connected-header">
              <div className="connected-header-left">
                <span className="connected-spark-icon">{prog.sparkIcon}</span>
                <div>
                  <div className="connected-spark-name">{prog.sparkName}</div>
                  <div className="connected-tagline">{prog.tagline}</div>
                </div>
              </div>
              <div className="connected-skills">
                {prog.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Quick Links Row */}
            <div className="connected-links">
              <Link to={prog.routes.programme} className="connected-link">
                <Layers size={14} />
                Programme Page
                <ExternalLink size={12} />
              </Link>
              <Link to={prog.routes.sandbox} className="connected-link">
                <Target size={14} />
                Sandbox
                <ExternalLink size={12} />
              </Link>
              {prog.routes.facilitation && (
                <Link to={prog.routes.facilitation} className="connected-link highlight">
                  <BookOpen size={14} />
                  Facilitation Guide
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>

            {/* Session Structure (collapsible) */}
            <button
              className={`session-plan-toggle ${showSessionPlan ? 'open' : ''}`}
              onClick={() => setShowSessionPlan(!showSessionPlan)}
            >
              <Video size={16} />
              <span>Session Plan ({prog.sessionTemplate.duration} min)</span>
              {showSessionPlan ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showSessionPlan && (
              <div className="session-plan">
                {/* Timeline */}
                <div className="session-timeline">
                  {prog.sessionTemplate.structure.map((seg, i) => {
                    const phaseColors: Record<string, string> = {
                      'spark-opener': '#22c55e',
                      'core-activity': prog.color,
                      'break': '#94a3b8',
                      'applied-task': '#f59e0b',
                      'spark-closer': '#a855f7',
                      'reflection': '#06b6d4',
                    };
                    const widthPercent = (seg.duration / prog.sessionTemplate.duration) * 100;
                    return (
                      <div
                        key={i}
                        className="timeline-segment"
                        style={{
                          '--seg-color': phaseColors[seg.phase] || '#94a3b8',
                          width: `${widthPercent}%`,
                        } as React.CSSProperties}
                        title={`${seg.label} (${seg.duration} min)`}
                      >
                        <span className="seg-label">{seg.label}</span>
                        <span className="seg-duration">{seg.duration}m</span>
                      </div>
                    );
                  })}
                </div>

                {/* Segment Details */}
                <div className="session-segments">
                  {prog.sessionTemplate.structure.map((seg, i) => (
                    <div key={i} className={`segment-detail ${seg.phase}`}>
                      <div className="segment-time">{seg.duration} min</div>
                      <div className="segment-content">
                        <strong>{seg.label}</strong>
                        <span>{seg.description}</span>
                        {seg.sparkType && (
                          <button
                            className="segment-spark-btn"
                            onClick={() => { setSparkType(seg.sparkType!); generateSpark(); setShowSessionPlan(false); }}
                          >
                            <Zap size={12} />
                            Generate {seg.sparkType === 'opener' ? 'Opener' : 'Closer'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sandbox Challenges for Applied Task */}
                {prog.sandboxChallenges.length > 0 && (
                  <div className="session-sandboxes">
                    <h4><Target size={14} /> Sandbox Challenges for Applied Task</h4>
                    <div className="sandbox-links">
                      {prog.sandboxChallenges.map((ch, i) => (
                        <div key={i} className="sandbox-link-card">
                          <div className="sandbox-link-info">
                            <strong>{ch.title}</strong>
                            <span>{ch.description}</span>
                            <span className="sandbox-duration"><Clock size={12} /> {ch.duration}</span>
                          </div>
                          {ch.route && (
                            <Link to={ch.route} className="sandbox-open-btn">
                              Open <ExternalLink size={12} />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Zoom Tips */}
                <div className="session-zoom-tips">
                  <h4><Lightbulb size={14} /> Zoom Tips for {prog.name}</h4>
                  <div className="zoom-tips-list">
                    {prog.sessionTemplate.zoomTips.map((tip, i) => (
                      <div key={i} className="zoom-tip">{tip}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Guide character */}
            {prog.guide && (
              <div className="connected-guide">
                <span className="guide-char-emoji">{prog.guide.emoji}</span>
                <span>Guided by <strong>{prog.guide.name}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="spark-gen-controls">
          <div className="control-group type-selector">
            {(['any', 'opener', 'closer'] as const).map(opt => (
              <button key={opt} className={`type-btn ${sparkType === opt ? 'active' : ''}`} onClick={() => setSparkType(opt)}>
                {opt === 'any' ? 'Any' : opt === 'opener' ? '🎬 Opener' : '🎈 Closer'}
              </button>
            ))}
          </div>
          <div className="control-group timer-presets">
            <Clock size={14} />
            {[120, 180, 300].map(t => (
              <button key={t} className={`timer-preset-btn ${timerMax === t ? 'active' : ''}`}
                onClick={() => { setTimerMax(t); setTimer(0); setTimerRunning(false); }}>
                {t / 60}m
              </button>
            ))}
          </div>
          <button className={`guide-toggle-btn ${showGuide ? 'active' : ''}`} onClick={() => setShowGuide(!showGuide)}>
            <BookOpen size={14} /> Facilitator Guide
          </button>
        </div>

        {/* Facilitator Guide (Philosophy) */}
        {showGuide && (
          <div className="spark-gen-guide">
            <h3><BookOpen size={18} /> The Spark Philosophy</h3>
            <div className="guide-grid">
              <div className="guide-card"><h4>🎯 Purpose</h4><p>These aren't games — they're <strong>cognitive primers</strong>. After a long school day, commute, and homework, the last thing anyone needs is more pressure. Sparks activate the mindset needed for the session ahead while building skills surreptitiously.</p></div>
              <div className="guide-card"><h4>⏱ Timing</h4><p><strong>3 minutes max.</strong> End while they're still enjoying it. If energy drops, you've gone too long. Students should think: <em>"That was fun — I want another one"</em> not <em>"When will this end?"</em></p></div>
              <div className="guide-card"><h4>🚫 Avoid</h4><p>No public scoring. No ranking. No calling out "wrong" answers. Never force shy participants to speak first. Celebrate effort and ideas, not speed. This is <strong>warm-up energy, not assessment</strong>.</p></div>
              <div className="guide-card"><h4>🧠 Hidden Skills</h4><p>Every spark builds: processing speed, working memory, articulation, collaboration, resilience, and <strong>academic identity</strong> — the shift from "I can't do this" to "I'm someone who thinks."</p></div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="spark-gen-action">
          <button className="generate-btn" onClick={generateSpark}
            style={{ '--btn-color': prog?.color || '#f59e0b' } as React.CSSProperties}>
            <Zap size={20} />
            {currentSpark ? 'Next Spark' : 'Generate Spark'}
          </button>
          {usedSparks.size > 0 && <span className="sparks-used-count">{usedSparks.size} sparks used this session</span>}
        </div>

        {/* Spark Display */}
        {currentSpark && (
          <div ref={sparkRef} className="spark-display" style={{ '--prog-color': prog?.color || '#6366f1' } as React.CSSProperties}>
            <div className="spark-badges">
              <span className={`spark-badge type-${currentSpark.type}`}>
                {currentSpark.type === 'opener' ? '🎬 Opener' : '🎈 Closer'}
              </span>
              <span className="spark-badge energy" style={{ '--energy-color': ENERGY_LABELS[currentSpark.energy].color } as React.CSSProperties}>
                {ENERGY_LABELS[currentSpark.energy].icon} {ENERGY_LABELS[currentSpark.energy].label}
              </span>
              <span className="spark-badge mode">
                {MODE_NOTES[currentSpark.mode].icon} {MODE_NOTES[currentSpark.mode].label}
              </span>
            </div>

            <p className="spark-prompt">{currentSpark.prompt}</p>

            {/* Timer */}
            <div className="spark-timer">
              <div className="timer-controls">
                <button className={`timer-btn ${timerRunning ? 'running' : 'paused'}`} onClick={() => setTimerRunning(!timerRunning)}>
                  {timerRunning ? <Pause size={16} /> : <Play size={16} />}
                  {timerRunning ? 'Pause' : 'Start Timer'}
                </button>
                <button className="timer-btn reset" onClick={() => { setTimer(0); setTimerRunning(false); }}>
                  <RotateCcw size={14} /> Reset
                </button>
                <span className={`timer-display ${timer > timerMax * 0.8 ? 'danger' : timer > timerMax * 0.5 ? 'warning' : 'safe'}`}>
                  {formatTime(timer)}<span className="timer-max"> / {formatTime(timerMax)}</span>
                </span>
              </div>
              <div className="timer-bar">
                <div className={`timer-fill ${timerProgress > 80 ? 'danger' : timerProgress > 50 ? 'warning' : 'safe'}`} style={{ width: `${timerProgress}%` }} />
              </div>
            </div>

            {/* Facilitator Notes */}
            <button className={`notes-toggle ${showNotes ? 'open' : ''}`} onClick={() => setShowNotes(!showNotes)}>
              {showNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />} Facilitator Notes
            </button>
            {showNotes && (
              <div className="spark-notes">
                <div className="note-section">
                  <span className="note-label mode-label">Mode: {MODE_NOTES[currentSpark.mode].icon} {MODE_NOTES[currentSpark.mode].label}</span>
                  <p>{MODE_NOTES[currentSpark.mode].description}</p>
                </div>
                <div className="note-section">
                  <span className="note-label how-label">How to run it</span>
                  <p>{MODE_NOTES[currentSpark.mode].facilitation}</p>
                </div>
                <div className="note-section">
                  <span className="note-label builds-label">What this secretly builds</span>
                  <p>{MODE_NOTES[currentSpark.mode].builds}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 1 && (
          <section className="spark-history">
            <h3>Session History</h3>
            <div className="history-list">
              {history.slice(1).map((spark, i) => (
                <div key={i} className="history-item">
                  <span className="history-num">#{history.length - i}</span>
                  <span className="history-prompt">{spark.prompt.slice(0, 80)}...</span>
                  <span className="history-mode">{MODE_NOTES[spark.mode]?.icon}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Programme Spark Map */}
        <section className="spark-map">
          <h3>Programme Spark Map</h3>
          <div className="spark-map-grid">
            {Object.values(PROGRAMMES).map((p: Programme) => (
              <Link
                key={p.id}
                to={`/workshops/spark-generator?programme=${p.id}`}
                className={`spark-map-card ${selectedProgramme === p.id ? 'active' : ''}`}
                style={{ '--prog-color': p.color } as React.CSSProperties}
                onClick={() => handleProgrammeSelect(p.id)}
              >
                <div className="spark-map-header">
                  <span>{p.sparkIcon}</span>
                  <span className="spark-map-name">{p.sparkName}</span>
                </div>
                <div className="spark-map-prog">{p.icon} {p.name}</div>
                <div className="spark-map-skills">
                  {p.skills.slice(0, 2).map(s => (
                    <span key={s} className="spark-map-skill">{s}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default SparkGeneratorPage;