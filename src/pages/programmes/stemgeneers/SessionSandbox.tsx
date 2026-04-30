/**
 * src/pages/programmes/stemgeneers/SessionSandbox.tsx
 * ====================================================
 * STEMgeneers Session Sandbox — Maya-First Creator Workspace
 * Wembley Wonders CIC
 *
 * Maya is the interface. She ascertains need through three exchanges,
 * then surfaces the right workspace. Spaces expand as the creator grows.
 *
 * Five stages:
 *   1. LEARN    — curriculum sessions, household science, periodic table
 *   2. REPAIR   — diagnostic trainer, layer gates, Neville verification
 *   3. MAKE     — prototype lab, bill of materials, iteration tracking
 *   4. PROTECT  — patent workbench, IP portfolio, prior art
 *   5. SELL     — cyberstore upload, impact lab submission, revenue
 */

import React, { useState, useRef, useEffect } from 'react';
import PageTemplate from '../../../components/PageTemplate';
import PageMeta from '../../../components/PageMeta';
import { MODULES, SESSION_PLANS, PROGRESSION_LEVELS } from './curriculum/curriculumData';
import type { ProgressionLevel } from './curriculum/curriculumData';
import './SessionSandbox.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type OrientingAnswer = 'broke' | 'understand' | 'fixing' | 'selling' | null;
type WorkspaceStage = 'learn' | 'repair' | 'make' | 'protect' | 'sell';
type ConversationPhase = 'orienting' | 'narrowing' | 'routing' | 'working';

interface Message {
  id: string;
  from: 'maya' | 'user';
  text: string;
  timestamp: number;
  options?: { label: string; value: string }[];
}

interface RepositoryEntry {
  id: string;
  moduleId: string;
  content: string;
  knowledgeHolder: string;
  tradition: string;
  submittedAt: number;
}

interface PrototypeEntry {
  id: string;
  name: string;
  description: string;
  stage: 'design' | 'prototype' | 'tested' | 'ready';
  materials: string;
  problem: string;
  submittedAt: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_COLOURS: Record<ProgressionLevel, string> = {
  explorer:     '#10b981',
  investigator: '#3b82f6',
  analyst:      '#8b5cf6',
  challenger:   '#fbbf24',
  architect:    '#f87171',
};

const STAGE_CONFIG: Record<WorkspaceStage, { label: string; icon: string; colour: string; desc: string }> = {
  learn:   { label: 'Learn',   icon: '⚗️',  colour: '#10b981', desc: 'Curriculum sessions and household science' },
  repair:  { label: 'Repair',  icon: '🔧',  colour: '#3b82f6', desc: 'Diagnostic trainer and layer gates' },
  make:    { label: 'Make',    icon: '🖨️',  colour: '#8b5cf6', desc: 'Prototype lab and fabrication' },
  protect: { label: 'Protect', icon: '🔐',  colour: '#fbbf24', desc: 'IP portfolio and prior art' },
  sell:    { label: 'Sell',    icon: '🏪',  colour: '#f87171', desc: 'Cyberstore and Impact Lab' },
};

const ORIENTING_OPTIONS = [
  { label: 'Something broke and I want to fix it',          value: 'broke'      },
  { label: 'I want to understand how things work',          value: 'understand' },
  { label: "I'm already fixing things — I want to formalise that", value: 'fixing' },
  { label: 'I make things and I want to sell them',         value: 'selling'    },
];

// Maya's routing logic — maps orienting answer + gate status to workspace
function resolveWorkspace(answer: OrientingAnswer, gatesPassed: number): WorkspaceStage {
  if (answer === 'broke')      return 'repair';
  if (answer === 'understand') return 'learn';
  if (answer === 'fixing')     return gatesPassed > 0 ? 'make' : 'repair';
  if (answer === 'selling')    return gatesPassed > 0 ? 'sell' : 'protect';
  return 'learn';
}

// Maya's routing message — contextual, not formulaic
function getMayaRoutingMessage(answer: OrientingAnswer, gatesPassed: number, narrowing: string): string {
  if (answer === 'broke') {
    return `Right. Let's diagnose it before anything else. The Diagnostic Trainer will walk you through a scored session — you'll know exactly what's wrong and what the repair involves. What you learn here counts toward your layer gate progress.`;
  }
  if (answer === 'understand') {
    if (narrowing === 'specific') {
      return `Good. The curriculum sessions are built around household objects and your family's existing knowledge. Every module connects what you already know to the periodic table. Start with Session 1 — it reframes the entire history of science in 95 minutes.`;
    }
    return `Starting from scratch is the right place to be. Session 1 covers the global history of STEM — who actually built the knowledge the world runs on. By the end you'll have made your first repository entry. That's the foundation everything else sits on.`;
  }
  if (answer === 'fixing') {
    if (gatesPassed > 0) {
      return `You've already passed ${gatesPassed} gate${gatesPassed > 1 ? 's' : ''}. The next step is moving from repair into making — the Prototype Lab is where you take the understanding you've built and start fabricating. Let's go there.`;
    }
    return `Good. Walk me through the last thing you repaired. That conversation with Neville is the start of your verification process — and your diagnostic sessions count toward the gate. Let's log what you've already done.`;
  }
  if (answer === 'selling') {
    if (gatesPassed > 0) {
      return `You've got gate progress — that credential is what makes the Cyberstore listing credible. Let's get your work into the Impact Lab first, then move it to the Cyberstore with the IP protection in place.`;
    }
    return `Before we list anything, we need to protect it. The Patent Workbench is where your design becomes prior art — documented, dated, attributed to you. That happens before anything goes public. Let's start there.`;
  }
  return `Let's start with the curriculum. Session 1 is the foundation.`;
}

// ─── Maya conversation engine ─────────────────────────────────────────────────

function useMaya() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [phase, setPhase] = useState<ConversationPhase>('orienting');
  const [orientingAnswer, setOrientingAnswer] = useState<OrientingAnswer>(null);
  const [narrowingAnswer, setNarrowingAnswer] = useState('');
  const [activeStage, setActiveStage] = useState<WorkspaceStage | null>(null);
  const [gatesPassed] = useState(0); // would come from journalStore

  const addMaya = (text: string, options?: { label: string; value: string }[]) => {
    setMessages(prev => [...prev, {
      id: `maya-${Date.now()}`,
      from: 'maya',
      text,
      timestamp: Date.now(),
      options,
    }]);
  };

  const addUser = (text: string) => {
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      from: 'user',
      text,
      timestamp: Date.now(),
    }]);
  };

  // Open with orienting question
  useEffect(() => {
    setTimeout(() => {
      addMaya(
        "What brought you to STEMgeneers today?",
        ORIENTING_OPTIONS
      );
    }, 400);
  }, []);

  const handleOrientingChoice = (value: string, label: string) => {
    const answer = value as OrientingAnswer;
    addUser(label);
    setOrientingAnswer(answer);
    setPhase('narrowing');

    setTimeout(() => {
      // Narrowing question — one follow-up
      if (answer === 'broke') {
        addMaya("What is it and what's it doing?");
      } else if (answer === 'understand') {
        addMaya(
          "Is there a specific thing you want to understand, or are you starting from scratch?",
          [
            { label: 'Something specific', value: 'specific' },
            { label: 'Starting from scratch', value: 'scratch' },
          ]
        );
      } else if (answer === 'fixing') {
        addMaya("What's the last thing you repaired? Walk me through what you did.");
      } else if (answer === 'selling') {
        addMaya(
          "What have you made, and where are you in the process?",
          [
            { label: 'Still designing', value: 'design' },
            { label: 'Have a prototype', value: 'prototype' },
            { label: 'Tested and ready', value: 'ready' },
          ]
        );
      }
    }, 500);
  };

  const handleNarrowingResponse = (text: string) => {
    addUser(text);
    setNarrowingAnswer(text);
    setPhase('routing');

    setTimeout(() => {
      const routingMsg = getMayaRoutingMessage(orientingAnswer, gatesPassed, text);
      addMaya(routingMsg);
      setTimeout(() => {
        const stage = resolveWorkspace(orientingAnswer, gatesPassed);
        setActiveStage(stage);
        setPhase('working');
      }, 800);
    }, 600);
  };

  const handleFreeText = (text: string) => {
    if (phase === 'narrowing') {
      handleNarrowingResponse(text);
    } else if (phase === 'working') {
      addUser(text);
      setTimeout(() => {
        addMaya("Got it. Use the workspace below — I'm here if you need guidance on any step.");
      }, 500);
    }
  };

  return {
    messages,
    phase,
    activeStage,
    orientingAnswer,
    handleOrientingChoice,
    handleNarrowingResponse,
    handleFreeText,
    setActiveStage,
  };
}

// ─── Maya chat UI ─────────────────────────────────────────────────────────────

function MayaChat({
  messages,
  phase,
  onChoice,
  onFreeText,
}: {
  messages: Message[];
  phase: ConversationPhase;
  onChoice: (value: string, label: string) => void;
  onFreeText: (text: string) => void;
}) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submit = () => {
    if (!input.trim()) return;
    onFreeText(input.trim());
    setInput('');
  };

  const lastMessage = messages[messages.length - 1];
  const showOptions = lastMessage?.from === 'maya' && lastMessage.options && phase !== 'working';
  const showInput = phase === 'narrowing' && !lastMessage?.options;

  return (
    <div className="ss-maya-chat">
      <div className="ss-maya-header">
        <div className="ss-maya-avatar">M</div>
        <div>
          <span className="ss-maya-name">Maya</span>
          <span className="ss-maya-role">STEMgeneers guide</span>
        </div>
        <div className="ss-maya-status">
          <span className="ss-maya-dot" />
          <span>Active</span>
        </div>
      </div>

      <div className="ss-maya-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`ss-msg ss-msg-${msg.from}`}>
            {msg.from === 'maya' && <div className="ss-msg-avatar">M</div>}
            <div className="ss-msg-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {showOptions && lastMessage.options && (
          <div className="ss-options">
            {lastMessage.options.map(opt => (
              <button
                key={opt.value}
                className="ss-option-btn"
                onClick={() => onChoice(opt.value, opt.label)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {showInput && (
          <div className="ss-input-row">
            <input
              className="ss-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Tell Maya what you're working on..."
              autoFocus
            />
            <button className="ss-input-send" onClick={submit}>→</button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {phase === 'working' && (
        <div className="ss-maya-working-input">
          <input
            className="ss-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Ask Maya anything..."
          />
          <button className="ss-input-send" onClick={submit}>→</button>
        </div>
      )}
    </div>
  );
}

// ─── Stage nav ────────────────────────────────────────────────────────────────

function StageNav({
  active,
  available,
  onSelect,
}: {
  active: WorkspaceStage;
  available: WorkspaceStage[];
  onSelect: (s: WorkspaceStage) => void;
}) {
  return (
    <div className="ss-stage-nav">
      {(Object.keys(STAGE_CONFIG) as WorkspaceStage[]).map(stage => {
        const cfg = STAGE_CONFIG[stage];
        const isActive = stage === active;
        const isAvailable = available.includes(stage);
        return (
          <button
            key={stage}
            className={`ss-stage-btn ${isActive ? 'active' : ''} ${!isAvailable ? 'locked' : ''}`}
            onClick={() => isAvailable && onSelect(stage)}
            style={isActive ? { borderColor: cfg.colour, color: cfg.colour } : {}}
            title={!isAvailable ? 'Complete earlier stages to unlock' : cfg.desc}
          >
            <span className="ss-stage-icon">{cfg.icon}</span>
            <span className="ss-stage-label">{cfg.label}</span>
            {!isAvailable && <span className="ss-stage-lock">🔒</span>}
          </button>
        );
      })}
    </div>
  );
}

// ─── LEARN workspace ──────────────────────────────────────────────────────────

function LearnWorkspace() {
  const [activeSession, setActiveSession] = useState('session-1');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [level, setLevel] = useState<ProgressionLevel>('investigator');
  const [repoEntries, setRepoEntries] = useState<RepositoryEntry[]>([]);
  const [repoForm, setRepoForm] = useState({ content: '', holder: '', tradition: '' });
  const [submitted, setSubmitted] = useState<string | null>(null);

  const session = SESSION_PLANS[activeSession];
  const modules = session.modules.map(id => MODULES[id]).filter(Boolean);
  const currentMod = activeModule ? MODULES[activeModule] : null;

  const submitEntry = (moduleId: string) => {
    if (!repoForm.content.trim()) return;
    setRepoEntries(prev => [...prev, {
      id: `entry-${Date.now()}`,
      moduleId,
      content: repoForm.content,
      knowledgeHolder: repoForm.holder || 'Family member',
      tradition: repoForm.tradition || 'Not specified',
      submittedAt: Date.now(),
    }]);
    setRepoForm({ content: '', holder: '', tradition: '' });
    setSubmitted(moduleId);
  };

  return (
    <div className="ss-workspace">
      <div className="ss-workspace-header">
        <h2>Curriculum Sessions</h2>
        <p className="ss-workspace-sub">95-minute sessions built from 20-minute modules. Each module connects household science to community knowledge to the periodic table.</p>
      </div>

      {/* Level selector */}
      <div className="ss-level-row">
        <span className="ss-level-label">Your level:</span>
        {PROGRESSION_LEVELS.map(l => (
          <button
            key={l.id}
            className={`ss-level-btn ${level === l.id ? 'active' : ''}`}
            style={level === l.id ? { background: `${LEVEL_COLOURS[l.id]}20`, borderColor: LEVEL_COLOURS[l.id], color: LEVEL_COLOURS[l.id] } : {}}
            onClick={() => setLevel(l.id)}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* Session tabs */}
      <div className="ss-session-tabs">
        {Object.values(SESSION_PLANS).map(s => (
          <button
            key={s.id}
            className={`ss-tab ${activeSession === s.id ? 'active' : ''}`}
            onClick={() => { setActiveSession(s.id); setActiveModule(null); }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Module list */}
      <div className="ss-module-list">
        {modules.map((mod, i) => (
          <div key={mod.id} className={`ss-module-row ${activeModule === mod.id ? 'active' : ''}`}>
            <button className="ss-module-row-header" onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}>
              <div className="ss-module-row-left">
                <span className="ss-mod-num">{i + 1}</span>
                <div>
                  <span className="ss-mod-title">{mod.title}</span>
                  <span className="ss-mod-tagline">{mod.tagline}</span>
                </div>
              </div>
              <div className="ss-module-row-right">
                <span className="ss-mod-dur">{mod.duration}m</span>
                {repoEntries.some(e => e.moduleId === mod.id) && (
                  <span className="ss-mod-done">✓ Repository entry submitted</span>
                )}
                <span className="ss-mod-chevron">{activeModule === mod.id ? '−' : '+'}</span>
              </div>
            </button>

            {activeModule === mod.id && (
              <div className="ss-module-expanded">
                {/* Maya opening */}
                <div className="ss-maya-frame">
                  <span className="ss-frame-label">Maya says</span>
                  <blockquote>{mod.mayaOpeningFrame}</blockquote>
                </div>

                {/* Wrong answer */}
                {mod.wrongObviousAnswer && (
                  <div className="ss-detail-block ss-wrong">
                    <span className="ss-block-label">Common assumption</span>
                    <p>{mod.wrongObviousAnswer}</p>
                  </div>
                )}

                {/* The science */}
                <div className="ss-detail-block ss-answer">
                  <span className="ss-block-label">The science</span>
                  <p>{mod.realAnswer}</p>
                </div>

                {/* Periodic elements */}
                {mod.periodicElements.length > 0 && (
                  <div className="ss-detail-block">
                    <span className="ss-block-label">Periodic table</span>
                    <div className="ss-elements-row">
                      {mod.periodicElements.map(el => (
                        <div key={el.symbol} className="ss-element">
                          <span className="ss-el-sym">{el.symbol}</span>
                          <span className="ss-el-name">{el.name}</span>
                          <span className="ss-el-pos">Gp{el.group}·P{el.period}</span>
                          <span className="ss-el-rel">{el.relevance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Household experiment */}
                {mod.householdExperiment && (
                  <div className="ss-detail-block">
                    <span className="ss-block-label">Household experiment — {mod.householdExperiment.title}</span>
                    <div className="ss-materials">
                      {mod.householdExperiment.materials.map((m, i) => (
                        <span key={i} className="ss-material">{m}</span>
                      ))}
                    </div>
                    <div className="ss-steps">
                      {mod.householdExperiment.procedure.map((step, i) => (
                        <div key={i} className="ss-step">
                          <span className="ss-step-num">{i + 1}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="ss-age-blocks">
                      <div className="ss-age-block">
                        <span className="ss-age-tag ss-age-younger">Ages 11–13</span>
                        <p>{mod.householdExperiment.ageAdaptation.younger}</p>
                      </div>
                      <div className="ss-age-block">
                        <span className="ss-age-tag ss-age-older">Ages 14–16</span>
                        <p>{mod.householdExperiment.ageAdaptation.older}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Retrieval */}
                <div className="ss-retrieval">
                  <span className="ss-block-label">Retrieval prompt</span>
                  <p>{mod.retrievalPrompt}</p>
                </div>

                {/* Repository entry */}
                <div className="ss-repo-section">
                  <span className="ss-block-label">Repository task</span>
                  <p className="ss-repo-task">{mod.repositoryTask}</p>
                  {submitted === mod.id ? (
                    <div className="ss-repo-success">
                      <span>✓</span>
                      <p>Repository entry submitted. Your family's knowledge is now documented and protected.</p>
                    </div>
                  ) : (
                    <div className="ss-repo-form">
                      <textarea
                        value={repoForm.content}
                        onChange={e => setRepoForm(f => ({ ...f, content: e.target.value }))}
                        placeholder="Describe the practice, remedy, or knowledge in detail..."
                        rows={3}
                      />
                      <div className="ss-repo-form-row">
                        <input
                          value={repoForm.holder}
                          onChange={e => setRepoForm(f => ({ ...f, holder: e.target.value }))}
                          placeholder="Knowledge holder (e.g. Grandma Rose)"
                        />
                        <input
                          value={repoForm.tradition}
                          onChange={e => setRepoForm(f => ({ ...f, tradition: e.target.value }))}
                          placeholder="Cultural tradition"
                        />
                      </div>
                      <button className="ss-repo-submit" onClick={() => submitEntry(mod.id)}>
                        Submit to community repository →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Repository summary */}
      {repoEntries.length > 0 && (
        <div className="ss-repo-summary">
          <h3>Your repository entries this session ({repoEntries.length})</h3>
          {repoEntries.map(e => (
            <div key={e.id} className="ss-repo-entry">
              <div className="ss-repo-entry-meta">
                <span className="ss-repo-tradition">{e.tradition}</span>
                <span className="ss-repo-holder">{e.knowledgeHolder}</span>
              </div>
              <p>{e.content.length > 100 ? e.content.slice(0, 100) + '…' : e.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── REPAIR workspace ─────────────────────────────────────────────────────────

function RepairWorkspace() {
  return (
    <div className="ss-workspace">
      <div className="ss-workspace-header">
        <h2>Diagnostic Trainer & Repair Workshop</h2>
        <p className="ss-workspace-sub">Scored diagnostic sessions that count toward your layer gate. Log real repairs with evidence to trigger Neville verification.</p>
      </div>
      <div className="ss-repair-grid">
        <a href="/programmes/stemgeneers/sandbox" className="ss-repair-card ss-repair-primary">
          <span className="ss-repair-icon">🔍</span>
          <h3>Diagnostic Trainer</h3>
          <p>Fault scenarios with randomised symptom variants. Each session is scored — diagnostic accuracy, elimination reasoning, and physics explanation. Gate progress updates in real time.</p>
          <div className="ss-repair-features">
            <span>Six repair layers</span>
            <span>Accuracy scoring</span>
            <span>Physics capture</span>
            <span>Gate progress</span>
          </div>
          <span className="ss-repair-cta">Open Diagnostic Trainer →</span>
        </a>
        <a href="/programmes/stemgeneers/sandbox#repair-workshop" className="ss-repair-card ss-repair-secondary">
          <span className="ss-repair-icon">🛠️</span>
          <h3>Repair Workshop</h3>
          <p>Log real repairs with evidence — fault description, diagnosis reasoning, methods used, outcome, savings generated. Every completed log triggers a verification conversation with Neville.</p>
          <div className="ss-repair-features">
            <span>Four-step evidence form</span>
            <span>Witness capture</span>
            <span>Claim token reference</span>
            <span>Portfolio export</span>
          </div>
          <span className="ss-repair-cta">Open Repair Workshop →</span>
        </a>
      </div>
      <div className="ss-layer-gates">
        <h3>Layer gates</h3>
        <p className="ss-gates-sub">Each layer requires: three diagnostic sessions at 80%+ accuracy, two real-world repair logs, one physics explanation, and a Neville verification conversation.</p>
        <div className="ss-gates-grid">
          {[
            { name: 'Precision Layer',  icon: '⌚', desc: 'Watches, phones, locks, small mechanisms' },
            { name: 'Appliance Layer',  icon: '🫧', desc: 'Washing machines, sewing machines, vacuums' },
            { name: 'Home Layer',       icon: '🏠', desc: 'Plumbing, decorating, basic electrical' },
            { name: 'Furniture Layer',  icon: '🪑', desc: 'Joinery, upholstery, wooden repairs' },
            { name: 'Making Layer',     icon: '🖨️', desc: '3D printing, fabrication, custom parts' },
            { name: 'Trades Layer',     icon: '⚡', desc: 'Electrical, plumbing, HVAC understanding' },
          ].map(layer => (
            <div key={layer.name} className="ss-gate-card">
              <span className="ss-gate-icon">{layer.icon}</span>
              <div>
                <h4>{layer.name}</h4>
                <p>{layer.desc}</p>
              </div>
              <span className="ss-gate-status">Not started</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAKE workspace ───────────────────────────────────────────────────────────

function MakeWorkspace() {
  const [prototypes, setPrototypes] = useState<PrototypeEntry[]>([]);
  const [form, setForm] = useState({ name: '', description: '', problem: '', materials: '', stage: 'design' as PrototypeEntry['stage'] });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    setPrototypes(prev => [...prev, {
      id: `proto-${Date.now()}`,
      ...form,
      submittedAt: Date.now(),
    }]);
    setForm({ name: '', description: '', problem: '', materials: '', stage: 'design' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="ss-workspace">
      <div className="ss-workspace-header">
        <h2>Prototype Lab</h2>
        <p className="ss-workspace-sub">Where understanding becomes making. Document your prototype, track iterations, and prepare for IP protection before anything goes public.</p>
      </div>
      <div className="ss-make-grid">
        <div className="ss-make-form">
          <h3>Log a new prototype</h3>
          <div className="ss-form-group">
            <label>What have you made or are making?</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Replacement bracket for Bosch dishwasher model X" />
          </div>
          <div className="ss-form-group">
            <label>What problem does it solve?</label>
            <textarea value={form.problem} onChange={e => setForm(f => ({ ...f, problem: e.target.value }))} placeholder="The original part is discontinued. The machine would be written off without it..." rows={2} />
          </div>
          <div className="ss-form-group">
            <label>Description of the design</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Dimensions, materials, how it fits, what it does..." rows={3} />
          </div>
          <div className="ss-form-group">
            <label>Materials and cost</label>
            <input value={form.materials} onChange={e => setForm(f => ({ ...f, materials: e.target.value }))} placeholder="e.g. PETG filament, 12g, ~£0.60" />
          </div>
          <div className="ss-form-group">
            <label>Stage</label>
            <div className="ss-stage-options">
              {(['design', 'prototype', 'tested', 'ready'] as const).map(s => (
                <button key={s} className={`ss-stage-option ${form.stage === s ? 'active' : ''}`} onClick={() => setForm(f => ({ ...f, stage: s }))}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button className="ss-submit-btn" onClick={handleSubmit}>
            Log prototype →
          </button>
          {submitted && <p className="ss-submit-confirm">✓ Logged. Next step: protect it before it goes public.</p>}
        </div>

        <div className="ss-make-tools">
          <h3>Tools in the lab</h3>
          {[
            { name: 'Bill of Materials', desc: 'Cost every component. Know your margin before you price anything.', link: '/programmes/stemgeneers/sandbox#bom' },
            { name: 'Hardware Iteration Tracker', desc: 'Version control for physical builds. What changed, why, what happened.', link: '/programmes/stemgeneers/sandbox#iterations' },
            { name: 'Ecosystem Explorer', desc: 'Who else is solving this problem. Where your solution fits.', link: '/programmes/stemgeneers/sandbox#ecosystem' },
            { name: 'Print or Buy?', desc: 'The decision framework for 3D printing vs sourcing parts.', link: '/programmes/stemgeneers/sandbox#print' },
          ].map(tool => (
            <a key={tool.name} href={tool.link} className="ss-tool-link">
              <h4>{tool.name}</h4>
              <p>{tool.desc}</p>
              <span>Open →</span>
            </a>
          ))}
        </div>
      </div>

      {prototypes.length > 0 && (
        <div className="ss-prototypes-log">
          <h3>Your prototypes</h3>
          {prototypes.map(p => (
            <div key={p.id} className="ss-prototype-card">
              <div className="ss-prototype-header">
                <h4>{p.name}</h4>
                <span className={`ss-proto-stage ss-proto-${p.stage}`}>{p.stage}</span>
              </div>
              <p className="ss-proto-problem">{p.problem}</p>
              <p className="ss-proto-materials">{p.materials}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROTECT workspace ────────────────────────────────────────────────────────

function ProtectWorkspace() {
  return (
    <div className="ss-workspace">
      <div className="ss-workspace-header">
        <h2>IP Protection & Patent Workbench</h2>
        <p className="ss-workspace-sub">Your design documented as prior art before anything goes public. Dated, attributed to you, formatted in a way patent offices recognise.</p>
      </div>
      <div className="ss-protect-intro">
        <div className="ss-protect-principle">
          <span className="ss-protect-icon">📅</span>
          <div>
            <h3>Date establishes priority</h3>
            <p>The moment your design is documented and dated in the repository, you have established prior art. Anyone who files a patent on the same design after that date cannot hold it against you.</p>
          </div>
        </div>
        <div className="ss-protect-principle">
          <span className="ss-protect-icon">🔬</span>
          <div>
            <h3>Scientific language strengthens the claim</h3>
            <p>A design documented with materials, dimensions, function, and mechanism — not just a photo — is the format that patent offices and courts recognise. The Patent Workbench produces that format.</p>
          </div>
        </div>
        <div className="ss-protect-principle">
          <span className="ss-protect-icon">👤</span>
          <div>
            <h3>Attribution protects the community</h3>
            <p>Every entry is attributed to the creator by name. The knowledge stays with the person it belongs to — not the platform, not a corporation that discovers it later.</p>
          </div>
        </div>
      </div>
      <div className="ss-protect-tools">
        <a href="/programmes/stemgeneers/sandbox#patent" className="ss-protect-tool ss-protect-primary">
          <span>⚖️</span>
          <div>
            <h3>Patent Workbench</h3>
            <p>Document your design as prior art. Produces a dated, attributed record in the format that establishes legal priority.</p>
            <span className="ss-repair-cta">Open Patent Workbench →</span>
          </div>
        </a>
        <a href="/programmes/stemgeneers/sandbox#ip" className="ss-protect-tool">
          <span>📁</span>
          <div>
            <h3>IP Portfolio</h3>
            <p>Your complete record of documented designs, prior art entries, and protection status across all your work.</p>
            <span className="ss-repair-cta">Open IP Portfolio →</span>
          </div>
        </a>
      </div>
      <div className="ss-biopiracy-note">
        <h3>The community knowledge repository</h3>
        <p>Traditional knowledge documented through the STEMgeneers curriculum — plants, preparations, techniques — goes into the community repository as prior art. The Hoodia case. The neem patent revocation. The turmeric challenge. All were won using exactly this kind of documented prior art. Your family's knowledge, formatted correctly, is legally protective.</p>
      </div>
    </div>
  );
}

// ─── SELL workspace ───────────────────────────────────────────────────────────

function SellWorkspace() {
  return (
    <div className="ss-workspace">
      <div className="ss-workspace-header">
        <h2>Impact Lab & Cyberstore</h2>
        <p className="ss-workspace-sub">From prototype to listing. The Impact Lab is where your work gets seen. The Cyberstore is where it generates revenue through the 55/25/20 model.</p>
      </div>
      <div className="ss-sell-pipeline">
        {[
          { step: '01', title: 'Impact Lab submission', desc: 'Your documented prototype goes into the Impact Lab — community visibility, feedback, and endorsement before commercial listing.', link: '/programmes/stemgeneers/sandbox#impact', cta: 'Submit to Impact Lab →' },
          { step: '02', title: 'Community review', desc: 'Impact Lab members — other STEMgeneers, Connectors, and Curators — review and endorse your work. Endorsements build the credibility the Cyberstore listing carries.', link: null, cta: null },
          { step: '03', title: 'Cyberstore listing', desc: 'Endorsed work goes live in the Cyberstore. Every sale generates 55% to you, 25% to the community pool, 20% to platform operations. The pardner model applied to maker revenue.', link: '/cyberstore', cta: 'View Cyberstore →' },
          { step: '04', title: 'Revenue and reinvestment', desc: 'Your 55% is yours. The 25% community pool funds collective equipment, collective callouts, and the next STEMgeneer cohort. Your success funds the infrastructure.', link: null, cta: null },
        ].map(step => (
          <div key={step.step} className="ss-sell-step">
            <span className="ss-sell-num">{step.step}</span>
            <div className="ss-sell-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {step.link && step.cta && (
                <a href={step.link} className="ss-sell-link">{step.cta}</a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="ss-revenue-model">
        <h3>The 55/25/20 model</h3>
        <div className="ss-revenue-split">
          <div className="ss-revenue-bar" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)' }}>
            <span className="ss-revenue-pct" style={{ color: '#10b981' }}>55%</span>
            <span className="ss-revenue-who">Creator</span>
            <span className="ss-revenue-desc">Direct to you on every sale</span>
          </div>
          <div className="ss-revenue-bar" style={{ background: 'rgba(251,191,36,0.1)', borderColor: 'rgba(251,191,36,0.3)' }}>
            <span className="ss-revenue-pct" style={{ color: '#fbbf24' }}>25%</span>
            <span className="ss-revenue-who">Community pool</span>
            <span className="ss-revenue-desc">Collective equipment, cohort funding, mutual aid</span>
          </div>
          <div className="ss-revenue-bar" style={{ background: 'rgba(148,163,184,0.08)', borderColor: 'rgba(148,163,184,0.15)' }}>
            <span className="ss-revenue-pct" style={{ color: '#94a3b8' }}>20%</span>
            <span className="ss-revenue-who">Platform operations</span>
            <span className="ss-revenue-desc">Infrastructure, Maya, Cyberstore, Knowledge Commons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const STEMgeneersSession: React.FC = () => {
  const {
    messages,
    phase,
    activeStage,
    handleOrientingChoice,
    handleNarrowingResponse,
    handleFreeText,
    setActiveStage,
  } = useMaya();

  // Available stages expand as the creator progresses
  // For now, all stages available once Maya has routed them
  const availableStages: WorkspaceStage[] = activeStage
    ? ['learn', 'repair', 'make', 'protect', 'sell']
    : [];

  const handleChoice = (value: string, label: string) => {
    if (phase === 'orienting') {
      handleOrientingChoice(value, label);
    } else if (phase === 'narrowing') {
      handleNarrowingResponse(label);
    }
  };

  return (
    <PageTemplate
      pageTitle="STEMgeneers Session"
      pageStrapline="Maya ascertains what you need. The workspace surfaces around you."
      pageType="sandbox"
    >
      <PageMeta pageKey="stemgeneers-session" />

      <div className="ss-page">

        {/* Maya conversation — always visible */}
        <div className={`ss-maya-panel ${activeStage ? 'ss-maya-compact' : 'ss-maya-full'}`}>
          <MayaChat
            messages={messages}
            phase={phase}
            onChoice={handleChoice}
            onFreeText={handleFreeText}
          />
        </div>

        {/* Workspace — surfaces after routing */}
        {activeStage && (
          <div className="ss-workspace-panel">
            <StageNav
              active={activeStage}
              available={availableStages}
              onSelect={setActiveStage}
            />

            <div className="ss-workspace-content">
              {activeStage === 'learn'   && <LearnWorkspace />}
              {activeStage === 'repair'  && <RepairWorkspace />}
              {activeStage === 'make'    && <MakeWorkspace />}
              {activeStage === 'protect' && <ProtectWorkspace />}
              {activeStage === 'sell'    && <SellWorkspace />}
            </div>
          </div>
        )}

        {/* Pre-routing state — show what's possible */}
        {!activeStage && phase === 'orienting' && (
          <div className="ss-pre-routing">
            <div className="ss-pre-routing-stages">
              {(Object.keys(STAGE_CONFIG) as WorkspaceStage[]).map(stage => {
                const cfg = STAGE_CONFIG[stage];
                return (
                  <div key={stage} className="ss-pre-stage">
                    <span className="ss-pre-stage-icon">{cfg.icon}</span>
                    <h3 style={{ color: cfg.colour }}>{cfg.label}</h3>
                    <p>{cfg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </PageTemplate>
  );
};

export default STEMgeneersSession;