/**
 * src/systems/rovs/personalities/pathfinder/PathfinderROV.tsx
 * ===========================================================
 * PathfinderROV → Neville
 * Wembley Wonders CIC
 *
 * MIGRATION: PathfinderROV (generic navigation) merged with:
 *   - STEMSage (repair diagnosis coaching)
 *   - SmithROV (making/fabrication guidance)
 * into unified personality: NEVILLE
 *
 * Neville is the person your uncle calls when the washing machine
 * breaks down. He knows that the Indesit repair man's callout fee
 * is the mystification tax — and his whole purpose is to remove it.
 *
 * Personality: patient, precise, culturally grounded, anti-mystification.
 * Voice: explains the physics without condescension. Never says "it's complicated."
 * Says instead: "here's why it works, in plain English."
 *
 * Modes:
 * ─ STEMGENEERS: repair diagnosis, verification follow-up, skill gate coaching
 * ─ TECHRENEURS: hardware prototyping, BOM costing, patent narrative
 * ─ SCRAP CAT:   materials knowledge, 3D print decisions, salvage assessment
 * ─ GENERAL:     pathway navigation (original PathfinderROV capability, preserved)
 *
 * Exports (backward-compatible with original PathfinderROV imports):
 *   default: PathfinderROV (= Neville)
 *   named:   useNeville, NevilleContext, NevilleMode
 *            + all original NavigationPath, StrategicRecommendation types
 */

import React, {
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  useEffect,
} from 'react';
import type {
  NavigationPath,
  NavigationStep,
  PathAlternative,
  RiskAssessment,
  StrategicRecommendation,
} from './PathfinderROVTypes';
import {
  useJournalStore,
  usePendingVerificationId,
  usePendingVerificationSession,
  useDismissPendingVerification,
  useGateRequirements,
  useSTEMgeneersStats,
} from '../../../../stores/journalStore';
import type {
  RepairLayer,
  DiagnosisMethod,
  MayaVerificationSession,
} from '../../../../types/creators-journal';

// ============================================================================
// TYPES
// ============================================================================

export type NevilleMode =
  | 'stemgeneers'   // repair diagnosis + verification
  | 'techreneurs'   // hardware prototyping + patent
  | 'scrap-cat'     // materials + salvage + 3D print
  | 'general';      // original PathfinderROV pathway navigation

export type NevilleConversationStage =
  | 'greeting'
  | 'mode-select'
  | 'diagnosis-active'
  | 'verification-active'
  | 'pathway-active'
  | 'gate-coaching'
  | 'idle';

export interface NevilleMessage {
  id: string;
  role: 'neville' | 'user' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    mode?: NevilleMode;
    stage?: NevilleConversationStage;
    verificationQuestionId?: string;
    gateLayer?: RepairLayer;
    requiresResponse?: boolean;
    physicsSubject?: string;
    actionType?: 'record-session' | 'submit-repair' | 'open-sandbox' | 'view-portfolio';
    actionLabel?: string;
    actionRoute?: string;
  };
}

export interface NevilleState {
  mode: NevilleMode;
  stage: NevilleConversationStage;
  messages: NevilleMessage[];
  isThinking: boolean;
  currentVerificationSessionId: string | null;
  currentVerificationQuestionIdx: number;
  verificationResponses: Record<string, string>;
  activeLayer: RepairLayer | null;
}

// Original PathfinderROV props — preserved for backward compatibility
export interface PathfinderROVProps {
  context?: Record<string, unknown>;
  currentObjective?: string;
  onPathGenerated?: (path: NavigationPath) => void;
  onRecommendation?: (rec: StrategicRecommendation) => void;
  // New: mode override for embedding in programme pages
  initialMode?: NevilleMode;
  // New: called when verification session completes
  onVerificationComplete?: (sessionId: string, passed: boolean) => void;
}

// ============================================================================
// NEVILLE CONTEXT — for embedding in programme pages
// ============================================================================

interface NevilleContextValue {
  state: NevilleState;
  sendMessage: (text: string) => void;
  setMode: (mode: NevilleMode) => void;
  dismissVerification: () => void;
}

export const NevilleContext = createContext<NevilleContextValue | null>(null);

export function useNeville() {
  const ctx = useContext(NevilleContext);
  if (!ctx) throw new Error('useNeville must be used within PathfinderROV');
  return ctx;
}

// ============================================================================
// NEVILLE'S VOICE
// Voice guide: plain, direct, no jargon without explanation.
// Never condescending. Treats the learner as capable.
// Grounds technical content in Caribbean/community sensibility where natural.
// ============================================================================

const GREETINGS: Record<NevilleMode, string> = {
  stemgeneers: `Alright. I'm Neville — the STEMgeneers technical guide.\n\nI'm here to help you work through repairs, understand what's actually happening inside the machine, and build a portfolio that means something. Not just a list of jobs — a record that shows you understood the work.\n\nWhat are we looking at today?`,

  techreneurs: `Good. I'm Neville — your hardware and prototyping guide.\n\nWhether you're working through a bill of materials, documenting iterations for a patent trail, or trying to figure out whether to print a part or source one — I'm the person to talk to.\n\nWhat's the build?`,

  'scrap-cat': `Neville here. The Scrap Cat programme is where salvage meets design intelligence.\n\nMost "waste" material has a second life — the question is always whether the material properties suit the application. That's what we work out together.\n\nWhat have you got in front of you?`,

  general: `I'm Neville — the technical pathfinder for Wembley Wonders.\n\nI can help you map a route through any of our programmes, identify the skills you're building toward, and work out the most practical path from where you are now.\n\nWhat are you trying to get to?`,
};

const MODE_DESCRIPTIONS: Record<NevilleMode, string> = {
  stemgeneers: 'STEMgeneers — repair skills, diagnosis, verification',
  techreneurs: 'TECHreneurs — hardware prototyping, patent preparation',
  'scrap-cat': 'Scrap Cat — salvage, materials, circular making',
  general: 'General pathway navigation',
};

// ============================================================================
// REPAIR LAYER LABELS (for Neville's responses)
// ============================================================================

const LAYER_LABELS: Record<RepairLayer, string> = {
  precision: 'Precision (watch, phone, lock)',
  appliance: 'Appliances (washing machine, vacuum)',
  home: 'Home (tap, plumbing, decorating)',
  furniture: 'Furniture (joinery, upholstery)',
  making: 'Making (3D print, fabrication)',
  trades: 'Trades (electrical, plumbing, HVAC)',
};

// ============================================================================
// NEVILLE'S RESPONSE LOGIC
// ============================================================================

/**
 * Generate Neville's response to a user message.
 * In production this calls the Anthropic API with a Neville system prompt.
 * The system prompt is returned here so the caller can use it.
 */
function buildNevilleSystemPrompt(mode: NevilleMode, context: {
  activeLayer?: RepairLayer | null;
  pendingVerificationSession?: MayaVerificationSession | null;
  gateProgress?: Record<RepairLayer, number>;
}): string {
  const base = `You are Neville, the technical guide for Wembley Wonders CIC.

PERSONALITY
- Patient, precise, direct. Anti-mystification in everything you say.
- You explain the physics and mechanics of why things break, not just what to do.
- You treat the person you're talking to as fully capable. You never say "it's complicated" — you say "here's why."
- Culturally grounded. You understand that what looks like a broken washing machine is often a missed payment, a landlord relationship, a family disruption. You don't reduce problems to their technical components.
- You know the difference between knowledge that was deliberately kept from working-class and Caribbean communities and knowledge that's genuinely complex. The former is most of what people call "technical expertise."

VOICE
- Plain English first, technical terms second — always explained when introduced.
- No jargon without immediate definition.
- You use analogies from everyday experience: engines, cooking, sewing, music, sport.
- You never talk down. You assume the person can understand anything if it's explained well.

CURRENT MODE: ${mode.toUpperCase()}`;

  const modeContext: Record<NevilleMode, string> = {
    stemgeneers: `
STEMGENEERS FOCUS
You help people:
1. Diagnose what's actually wrong before spending money or time
2. Understand the physics/mechanics behind the fault and the fix
3. Build a repair record that functions as a credential
4. Navigate the skill gate system (diagnostic accuracy + real-world repairs + physics explanation + verification conversation)

Key principle: The diagnosis reasoning is what turns a job into evidence of competence.
"I replaced the bearing" tells an employer nothing.
"The grinding frequency during spin indicated outer race failure consistent with lubricant breakdown over 8 years of load cycles — confirmed by disassembly, outer race had visible pitting" — that's a credential.

Active layer context: ${context.activeLayer ? LAYER_LABELS[context.activeLayer] : 'not set'}`,

    techreneurs: `
TECHRENEURS FOCUS
You help hardware builders:
1. Think through bill of materials before ordering
2. Document iterations in a way that builds patent evidence
3. Decide when to 3D print versus source a component
4. Understand the IP implications of their design choices

Key principle: Witnessed, timestamped iterations are the foundation of a patent application. Every build session that isn't documented is evidence lost.`,

    'scrap-cat': `
SCRAP CAT FOCUS
You help makers working with salvage and reclaimed materials:
1. Assess material properties before committing to a design
2. Understand filament choices for specific applications
3. Think through whether a salvaged component is suitable for its new purpose
4. Avoid the failure modes that come from ignoring material science

Key principle: Most repair and making failures come from not understanding what the material can and can't do under load, heat, or vibration.`,

    general: `
GENERAL PATHWAY FOCUS
You help people navigate the Wembley Wonders ecosystem:
1. Identify which programme fits their current skills and goals
2. Map a realistic route from entry to the outcome they want
3. Understand what each programme actually builds — not the marketing version, the real version
4. Make connections between programmes (STEMgeneers skills that feed TECHreneurs, etc.)`,
  };

  return base + modeContext[mode] + `

RESPONSE STYLE
- Conversational but substantive. Not bullet points unless listing steps.
- When explaining a technical concept, give the plain version first, then go deeper if the person wants it.
- If someone is stuck on the wrong problem, say so — kindly but directly.
- Never congratulate people for basic things. Save acknowledgment for genuine progress.
- Maximum 3-4 short paragraphs per response. If it needs more, offer to continue.`;
}

/**
 * Neville's verification assessment.
 * Called when a verification response is submitted.
 * Returns a score 0-1 and specific feedback.
 *
 * In production: calls Anthropic API with assessment prompt.
 * Here: keyword/length heuristic as placeholder (clearly marked).
 */
function assessVerificationResponse(
  questionType: MayaVerificationSession['questionSequence'][0]['questionType'],
  response: string,
  physicsSubject?: string,
): { score: number; feedback: string; demonstratesUnderstanding: boolean } {
  const words = response.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Physics-specific keywords by domain
  const physicsKeywords: Record<string, string[]> = {
    'Tribology': ['lubric', 'bearing', 'friction', 'raceway', 'load cycle', 'wear', 'contact', 'pitting'],
    'Capacitance': ['capacitor', 'charge', 'microfarad', 'current', 'discharge', 'phase', 'motor'],
    "Pascal's Law": ['pressure', 'force', 'area', 'hydraulic', 'compress', 'seal', 'washer'],
    'default': ['because', 'principle', 'physics', 'science', 'material', 'force', 'energy', 'current',
                'pressure', 'heat', 'vibrat', 'frequency', 'resist', 'conduct', 'thermal'],
  };

  const domainKeywords = physicsSubject
    ? (physicsKeywords[physicsSubject] ?? physicsKeywords['default'])
    : physicsKeywords['default'];

  const hasTechnicalDepth = domainKeywords.some(kw =>
    response.toLowerCase().includes(kw.toLowerCase())
  );

  const hasReasoning = /because|therefore|which means|that's why|this causes|result|due to|explains/i.test(response);
  const hasElimination = /ruled out|not the|can't be|eliminated|checked|confirmed/i.test(response);

  let score: number;
  let feedback: string;

  if (wordCount >= 50 && hasTechnicalDepth && hasReasoning) {
    score = 0.90;
    feedback = 'Your explanation demonstrates genuine understanding — you\'ve described the why, not just the what. This is the level that makes a portfolio entry worth reading.';
  } else if (wordCount >= 35 && (hasTechnicalDepth || hasReasoning)) {
    score = 0.78;
    feedback = 'Good — you\'ve shown you did the work, not just followed a procedure. A little more on the physics or the elimination reasoning would push this to distinction level.';
  } else if (wordCount >= 20 && hasElimination) {
    score = 0.65;
    feedback = 'You\'ve started the reasoning — the elimination thinking is there. Try to say more about what physical process is actually happening, not just what you did.';
  } else if (wordCount >= 15) {
    score = 0.50;
    feedback = 'This reads more like a description of what you did than why it worked. Walk me through your thinking — what told you it was this fault and not something else?';
  } else {
    score = 0.25;
    feedback = 'This is too brief to verify understanding. Tell me more — describe your diagnosis process as if you were explaining it to someone who needs to learn from it.';
  }

  return { score, feedback, demonstratesUnderstanding: score >= 0.70 };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PathfinderROV: React.FC<PathfinderROVProps> = ({
  context = {},
  currentObjective = '',
  onPathGenerated,
  onRecommendation,
  initialMode = 'general',
  onVerificationComplete,
}) => {
  // ── STATE ─────────────────────────────────────────────────────────────────

  const [state, setState] = useState<NevilleState>({
    mode: initialMode,
    stage: 'greeting',
    messages: [],
    isThinking: false,
    currentVerificationSessionId: null,
    currentVerificationQuestionIdx: 0,
    verificationResponses: {},
    activeLayer: null,
  });

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ── STORE ─────────────────────────────────────────────────────────────────

  const pendingSessionId = usePendingVerificationId();
  const pendingSession   = usePendingVerificationSession();
  const dismissPending   = useDismissPendingVerification();
  const completeVerificationSession = useJournalStore(s => s.completeVerificationSession);
  const stemStats = useSTEMgeneersStats();

  // ── INITIALISATION ────────────────────────────────────────────────────────

  useEffect(() => {
    const greeting = buildGreeting(initialMode, pendingSessionId);
    setState(prev => ({
      ...prev,
      mode: initialMode,
      stage: pendingSessionId ? 'verification-active' : 'greeting',
      currentVerificationSessionId: pendingSessionId ?? null,
      messages: [greeting],
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  // ── GREETING BUILDER ──────────────────────────────────────────────────────

  function buildGreeting(mode: NevilleMode, verificationPending: string | null): NevilleMessage {
    let content: string;

    if (verificationPending && pendingSession) {
      const q = pendingSession.questionSequence[0];
      content = `Neville here. You've logged a repair — I just want to make sure you understood the work, not just that you completed it.\n\nFirst question:\n\n${q.questionText}\n\nTake your time. Your own words are what matter.`;
    } else {
      content = GREETINGS[mode];
    }

    return {
      id: `msg-${Date.now()}`,
      role: 'neville',
      content,
      timestamp: new Date(),
      metadata: {
        mode,
        stage: verificationPending ? 'verification-active' : 'greeting',
        requiresResponse: true,
      },
    };
  }

  // ── MESSAGE FACTORY ───────────────────────────────────────────────────────

  function makeMessage(
    content: string,
    metadata?: NevilleMessage['metadata'],
  ): NevilleMessage {
    return {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role: 'neville',
      content,
      timestamp: new Date(),
      metadata,
    };
  }

  function makeUserMessage(content: string): NevilleMessage {
    return {
      id: `umsg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
  }

  // ── VERIFICATION FLOW ─────────────────────────────────────────────────────

  const handleVerificationResponse = useCallback((responseText: string) => {
    if (!state.currentVerificationSessionId || !pendingSession) return;

    const questions = pendingSession.questionSequence;
    const currentQ = questions[state.currentVerificationQuestionIdx];
    if (!currentQ) return;

    const { score, feedback, demonstratesUnderstanding } = assessVerificationResponse(
      currentQ.questionType,
      responseText,
      currentQ.questionType === 'physics-explanation'
        ? (currentQ.questionText.includes('physics') ? 'default' : undefined)
        : undefined,
    );

    const newResponses = {
      ...state.verificationResponses,
      [currentQ.id]: responseText,
    };

    const isLast = state.currentVerificationQuestionIdx === questions.length - 1;

    if (isLast) {
      // Score the full session
      const allResponses = Object.values(newResponses);
      const overallScore = allResponses.reduce((sum, _, i) => {
        const q = questions[i];
        const r = newResponses[q?.id ?? ''] ?? '';
        const { score: s } = assessVerificationResponse(q?.questionType ?? 'open-reasoning', r);
        return sum + s;
      }, 0) / questions.length;

      const assessments = questions.map(q => {
        const r = newResponses[q.id] ?? '';
        const { score: s, feedback: f, demonstratesUnderstanding: d } =
          assessVerificationResponse(q.questionType, r);
        return {
          questionId: q.id,
          score: s,
          demonstratesUnderstanding: d,
          specificFeedback: f,
          followUpTriggered: s < 0.70,
          gapsIdentified: s < 0.70 ? [q.questionType] : [],
        };
      });

      const { passed, failureResponse } = completeVerificationSession(
        state.currentVerificationSessionId,
        { overallScore, questionAssessments: assessments },
      );

      onVerificationComplete?.(state.currentVerificationSessionId, passed);

      const summaryMessage = passed
        ? makeMessage(
            `That's what I needed to hear.\n\n${feedback}\n\nOverall: ${Math.round(overallScore * 100)}% — this session contributes to your ${state.activeLayer ? LAYER_LABELS[state.activeLayer] : 'repair'} layer gate. Keep logging with this level of reasoning and the credential builds itself.`,
            { stage: 'idle', mode: state.mode },
          )
        : makeMessage(
            `${feedback}\n\n${failureResponse?.specificGaps?.join('. ') ?? ''}\n\nYour repair is still logged — but the verification needs more depth before it counts toward your gate. ${failureResponse?.retryAvailableFrom ? `You can retry from ${new Date(failureResponse.retryAvailableFrom).toLocaleDateString('en-GB')}.` : ''}\n\nIf you want, talk me through the diagnosis now — not for the record, just so you understand it yourself.`,
            { stage: 'idle', mode: state.mode },
          );

      setState(prev => ({
        ...prev,
        stage: 'idle',
        currentVerificationSessionId: null,
        currentVerificationQuestionIdx: 0,
        verificationResponses: {},
        messages: [...prev.messages, makeUserMessage(responseText), summaryMessage],
        isThinking: false,
      }));
    } else {
      // Next question
      const nextQ = questions[state.currentVerificationQuestionIdx + 1];
      const bridgeComment = score >= 0.70
        ? `Good.\n\n`
        : `Noted — ${feedback}\n\nMoving on:\n\n`;

      const nextMessage = makeMessage(
        `${bridgeComment}${nextQ.questionText}`,
        {
          stage: 'verification-active',
          verificationQuestionId: nextQ.id,
          requiresResponse: true,
        },
      );

      setState(prev => ({
        ...prev,
        currentVerificationQuestionIdx: prev.currentVerificationQuestionIdx + 1,
        verificationResponses: newResponses,
        messages: [...prev.messages, makeUserMessage(responseText), nextMessage],
        isThinking: false,
      }));
    }
  }, [
    state.currentVerificationSessionId,
    state.currentVerificationQuestionIdx,
    state.verificationResponses,
    state.activeLayer,
    pendingSession,
    completeVerificationSession,
    onVerificationComplete,
  ]);

  // ── GATE COACHING ─────────────────────────────────────────────────────────

  const buildGateCoachingResponse = useCallback((layer: RepairLayer): string => {
    const gate = useJournalStore.getState().skillGates[layer];
    const label = LAYER_LABELS[layer];

    if (!gate) {
      return `You haven't started the ${label} layer yet. Here's what it takes:\n\n1. At least 3 diagnostic trainer sessions at 80%+ accuracy\n2. At least 2 real-world repairs logged — at least one witnessed\n3. Physics explanation attempted in at least one session\n4. A verification conversation with me at 70%+ threshold\n\nStart with the Diagnostic Trainer in the sandbox — it's free, it scores, and every session counts.`;
    }

    const reqs = [
      { label: 'Diagnostic accuracy (3 sessions, 80%+)', met: gate.diagnosticAccuracy >= 0.80 },
      { label: 'Real-world repairs (2 minimum)', met: gate.repairsLogged >= 2 },
      { label: 'Witnessed repair (1 minimum)', met: gate.witnessedRepairsCount >= 1 },
      { label: 'Physics explanation quality', met: gate.physicsExplanationMet },
      { label: 'Verification conversation', met: gate.verificationMet },
    ];

    const unmet = reqs.filter(r => !r.met);
    const met = reqs.filter(r => r.met);

    if (unmet.length === 0) {
      return `You've passed the ${label} gate${gate.status === 'passed-with-distinction' ? ' with distinction' : ''}. That's a verified skill layer — not a certificate from a box, evidence from actual work.\n\nCheck your Creator's Journal for certification eligibility if you've passed 2+ layers.`;
    }

    const progressPercent = Math.round((met.length / reqs.length) * 100);
    return `${label} gate — ${progressPercent}% complete.\n\n${met.length > 0 ? `Done: ${met.map(r => r.label).join(', ')}.\n\n` : ''}Still needed: ${unmet.map(r => r.label).join(', ')}.\n\n${unmet[0].label.includes('Diagnostic') ? 'Go to the Diagnostic Trainer in the sandbox — three sessions at 80%+, that\'s the threshold.' : unmet[0].label.includes('repair') ? 'Log your next real repair in the Repair Workshop. Witness where you can.' : 'The next repair you log triggers a verification conversation with me. That\'s the last gate.'}`;
  }, []);

  // ── GENERAL RESPONSE (fallback / general mode) ────────────────────────────

  const buildGeneralResponse = useCallback((userText: string): string => {
    const lower = userText.toLowerCase();

    // Mode detection from user message
    if (lower.includes('repair') || lower.includes('washing') || lower.includes('broken') || lower.includes('fix')) {
      return `That sounds like STEMgeneers territory. Tell me what's broken and what it's doing — or not doing — and we'll work through the diagnosis together.\n\nThe diagnosis is always the first step. Before parts, before cost, before anything else: what's actually wrong?`;
    }
    if (lower.includes('prototype') || lower.includes('build') || lower.includes('patent') || lower.includes('invent')) {
      return `Hardware build work — that's TECHreneurs. What stage are you at? Early concept, or are you into iterations?\n\nIf you're building something original, the documentation starts now — not when you're ready to apply for a patent.`;
    }
    if (lower.includes('scrap') || lower.includes('salvage') || lower.includes('material') || lower.includes('3d print') || lower.includes('filament')) {
      return `Scrap Cat territory. What material are you working with, and what does the application need it to do?\n\nThe question is always about properties: load, heat, vibration, precision. The material either handles it or it doesn't.`;
    }
    if (lower.includes('gate') || lower.includes('layer') || lower.includes('cert') || lower.includes('portfolio') || lower.includes('progress')) {
      return `Your skill gate progress — which layer are you working on? Tell me the layer and I'll give you the honest picture of where you stand and what's next.`;
    }

    return `I can help with repair diagnosis, hardware builds, materials and salvage, or navigating your skill gate progress. What's in front of you?`;
  }, []);

  // ── SEND MESSAGE ──────────────────────────────────────────────────────────

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    setState(prev => ({ ...prev, isThinking: true }));

    // Route by stage
    if (state.stage === 'verification-active') {
      handleVerificationResponse(text);
      return;
    }

    // Gate coaching trigger
    const gateLayerMatch = Object.entries(LAYER_LABELS).find(([k, v]) =>
      text.toLowerCase().includes(k) || text.toLowerCase().includes(v.toLowerCase().split('(')[0].trim().toLowerCase())
    );

    if (gateLayerMatch && (text.toLowerCase().includes('gate') || text.toLowerCase().includes('progress') || text.toLowerCase().includes('layer'))) {
      const layer = gateLayerMatch[0] as RepairLayer;
      const response = buildGateCoachingResponse(layer);
      setState(prev => ({
        ...prev,
        activeLayer: layer,
        stage: 'gate-coaching',
        isThinking: false,
        messages: [
          ...prev.messages,
          makeUserMessage(text),
          makeMessage(response, { gateLayer: layer, stage: 'gate-coaching' }),
        ],
      }));
      return;
    }

    // General response
    const response = buildGeneralResponse(text);
    setState(prev => ({
      ...prev,
      isThinking: false,
      messages: [
        ...prev.messages,
        makeUserMessage(text),
        makeMessage(response, { mode: prev.mode }),
      ],
    }));
  }, [
    state.stage,
    handleVerificationResponse,
    buildGateCoachingResponse,
    buildGeneralResponse,
  ]);

  // ── MODE SWITCH ───────────────────────────────────────────────────────────

  const setMode = useCallback((mode: NevilleMode) => {
    const greeting = makeMessage(GREETINGS[mode], { mode, stage: 'greeting' });
    setState(prev => ({
      ...prev,
      mode,
      stage: 'greeting',
      messages: [...prev.messages, greeting],
    }));
  }, []);

  // ── DISMISS VERIFICATION ──────────────────────────────────────────────────

  const dismissVerification = useCallback(() => {
    dismissPending();
    setState(prev => ({
      ...prev,
      currentVerificationSessionId: null,
      currentVerificationQuestionIdx: 0,
      verificationResponses: {},
      stage: 'idle',
      messages: [
        ...prev.messages,
        makeMessage(
          `No problem — the repair is logged. The verification follow-up will be here when you\'re ready. Come back any time.\n\nWhat else are you working on?`,
          { stage: 'idle' },
        ),
      ],
    }));
  }, [dismissPending]);

  // ── CONTEXT VALUE ─────────────────────────────────────────────────────────

  const contextValue: NevilleContextValue = {
    state,
    sendMessage,
    setMode,
    dismissVerification,
  };

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <NevilleContext.Provider value={contextValue}>
      <div className="neville-rov" data-mode={state.mode} data-stage={state.stage}>

        {/* Header */}
        <div className="neville-header">
          <div className="neville-identity">
            <span className="neville-icon" role="img" aria-label="Neville">🔧</span>
            <div className="neville-nameplate">
              <span className="neville-name">Neville</span>
              <span className="neville-role">Technical Guide — {MODE_DESCRIPTIONS[state.mode]}</span>
            </div>
          </div>

          {/* Mode switcher — shown outside verification flow */}
          {state.stage !== 'verification-active' && (
            <div className="neville-mode-switcher">
              {(Object.keys(MODE_DESCRIPTIONS) as NevilleMode[]).map(mode => (
                <button
                  key={mode}
                  className={`neville-mode-btn ${state.mode === mode ? 'active' : ''}`}
                  onClick={() => setMode(mode)}
                >
                  {mode === 'stemgeneers' ? '🔧'
                    : mode === 'techreneurs' ? '⚙️'
                    : mode === 'scrap-cat' ? '♻️'
                    : '🗺️'}
                </button>
              ))}
            </div>
          )}

          {/* Verification dismiss — shown during verification */}
          {state.stage === 'verification-active' && (
            <button
              className="neville-dismiss-verification"
              onClick={dismissVerification}
              title="Come back to this later"
            >
              Later
            </button>
          )}
        </div>

        {/* STEMgeneers stats strip — shown in stemgeneers mode */}
        {state.mode === 'stemgeneers' && (
          <div className="neville-stats-strip">
            <span className="neville-stat">
              <strong>{stemStats.totalRepairs}</strong> repairs
            </span>
            <span className="neville-stat">
              <strong>{stemStats.witnessedRepairs}</strong> witnessed
            </span>
            <span className="neville-stat">
              <strong>{Math.round(stemStats.averageDiagnosticAccuracy * 100)}%</strong> diagnostic accuracy
            </span>
            <span className="neville-stat">
              <strong>£{stemStats.totalSavingsGenerated.toLocaleString()}</strong> saved
            </span>
            {stemStats.layersPassed > 0 && (
              <span className="neville-stat neville-stat--highlight">
                <strong>{stemStats.layersPassed}</strong> {stemStats.layersPassed === 1 ? 'layer' : 'layers'} passed
              </span>
            )}
          </div>
        )}

        {/* Message thread */}
        <div className="neville-messages" role="log" aria-live="polite">
          {state.messages.map(msg => (
            <div
              key={msg.id}
              className={`neville-message neville-message--${msg.role}`}
            >
              {msg.role === 'neville' && (
                <span className="neville-message-avatar" aria-hidden>🔧</span>
              )}
              <div className="neville-message-content">
                <p className="neville-message-text">{msg.content}</p>
                {/* Action button — if message has an action */}
                {msg.metadata?.actionType && msg.metadata.actionLabel && (
                  <a
                    href={msg.metadata.actionRoute ?? '#'}
                    className="neville-action-btn"
                  >
                    {msg.metadata.actionLabel} →
                  </a>
                )}
                {/* Physics subject tag */}
                {msg.metadata?.physicsSubject && (
                  <span className="neville-physics-tag">
                    ⚛️ {msg.metadata.physicsSubject}
                  </span>
                )}
              </div>
            </div>
          ))}

          {state.isThinking && (
            <div className="neville-message neville-message--neville neville-thinking">
              <span className="neville-message-avatar" aria-hidden>🔧</span>
              <div className="neville-thinking-dots">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="neville-input-area">
          {/* Verification — textarea for longer responses */}
          {state.stage === 'verification-active' ? (
            <VerificationInput
              onSubmit={(text) => {
                sendMessage(text);
                setInputText('');
              }}
            />
          ) : (
            <div className="neville-standard-input">
              <input
                type="text"
                className="neville-input"
                placeholder={
                  state.mode === 'stemgeneers' ? "What's broken? What's it doing?"
                  : state.mode === 'techreneurs' ? "What's the build?"
                  : state.mode === 'scrap-cat' ? "What material? What does it need to do?"
                  : "What are you trying to get to?"
                }
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(inputText);
                    setInputText('');
                  }
                }}
                disabled={state.isThinking}
                aria-label="Message Neville"
              />
              <button
                className="neville-send-btn"
                onClick={() => { sendMessage(inputText); setInputText(''); }}
                disabled={!inputText.trim() || state.isThinking}
                aria-label="Send"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Quick prompts — shown when idle in stemgeneers mode */}
        {state.mode === 'stemgeneers' && state.stage === 'idle' && (
          <div className="neville-quick-prompts">
            {[
              "Check my appliance layer gate",
              "What makes a good repair record?",
              "Explain diagnostic accuracy scoring",
              "How does witnessing work?",
            ].map((prompt, i) => (
              <button
                key={i}
                className="neville-quick-prompt"
                onClick={() => {
                  sendMessage(prompt);
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

      </div>
    </NevilleContext.Provider>
  );
};

// ============================================================================
// VERIFICATION INPUT — separate component to avoid re-renders on typing
// ============================================================================

const VerificationInput: React.FC<{ onSubmit: (text: string) => void }> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  return (
    <div className="neville-verification-input">
      <textarea
        className="neville-verification-textarea"
        placeholder="Your answer — in your own words. Take as much space as you need."
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={5}
        aria-label="Verification response"
      />
      <div className="neville-verification-actions">
        <span className="neville-word-count">
          {value.trim().split(/\s+/).filter(Boolean).length} words
        </span>
        <button
          className="neville-submit-btn"
          onClick={() => { onSubmit(value); setValue(''); }}
          disabled={value.trim().split(/\s+/).filter(Boolean).length < 10}
        >
          Submit answer
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// Backward-compatible: default export stays as PathfinderROV.
// Named exports expose Neville-specific API for new code.
// ============================================================================

export { PathfinderROV as default };
export { PathfinderROV };
export { buildNevilleSystemPrompt };
