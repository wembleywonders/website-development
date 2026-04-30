/**
 * HeritageDiscoveryROV.tsx
 * ─────────────────────────────────────────────────────────────
 * ESI — Heritage Discovery ROV
 * Wembley Wonders CIC · Knowledge Commons Layer
 * Company No. 12960817
 *
 * Three capabilities:
 * 1. Name resolution — fuzzy search against BlackBritishExcellence data
 * 2. Gap awareness — knows what's in the archive AND what's missing
 * 3. Thread routing — connects person to thread/era/place in the Commons
 *
 * Uses Anthropic API for figures not yet seeded in the archive.
 * Visitors can read; members can nominate and contribute.
 *
 * Voice register: warm authority. An archivist who loves her work.
 * Not a chatbot. Not a search bar. A guide who knows the building.
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BLACK_BRITISH_EXCELLENCE, ExcellenceProfile } from '../../systems/excellence/BlackBritishExcellence';
import './HeritageDiscoveryROV.css';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface Message {
  id: string;
  role: 'esi' | 'user';
  content: string;
  profileCard?: EsiProfileCard;
  nominationPrompt?: NominationPrompt;
  threadRoute?: ThreadRoute;
  timestamp: Date;
}

interface EsiProfileCard {
  id: string;
  name: string;
  dates: string;
  primaryField: string;
  theGap?: string;
  threadConnection?: string;
  plaqueStatus: 'in-archive' | 'nominated' | 'not-yet';
  leadsTo: { mode: string; id?: string; label: string };
}

interface NominationPrompt {
  name: string;
  reason: string;
  isLoggedIn: boolean;
}

interface ThreadRoute {
  threadName: string;
  threadId: string;
  connectionNote: string;
}

// ─────────────────────────────────────────
// FUZZY NAME MATCHING
// ─────────────────────────────────────────

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

function scoreMatch(query: string, profile: ExcellenceProfile): number {
  const q = normalise(query);
  const name = normalise(profile.name);
  const field = normalise(profile.primaryField);
  const known = profile.knownFor.map(k => normalise(k)).join(' ');

  // Exact name match
  if (name === q) return 100;
  // Name contains query
  if (name.includes(q)) return 85;
  // Query contains name
  if (q.includes(name)) return 80;
  // Word overlap on name
  const qWords = q.split(' ');
  const nameWords = name.split(' ');
  const overlap = qWords.filter(w => nameWords.includes(w) && w.length > 2);
  if (overlap.length > 0) return 60 + overlap.length * 10;
  // Field or known-for match
  if (field.includes(q) || q.includes(field.split(' ')[0])) return 40;
  if (known.includes(q)) return 35;
  return 0;
}

function findInArchive(query: string): ExcellenceProfile | null {
  if (!query || query.trim().length < 2) return null;
  let best: { profile: ExcellenceProfile; score: number } | null = null;
  for (const profile of BLACK_BRITISH_EXCELLENCE) {
    const score = scoreMatch(query, profile);
    if (score > 0 && (!best || score > best.score)) {
      best = { profile, score };
    }
  }
  return best && best.score >= 35 ? best.profile : null;
}

// ─────────────────────────────────────────
// THREAD ROUTING MAP
// Maps profile IDs and disciplines to Knowledge Commons threads
// ─────────────────────────────────────────

const THREAD_ROUTES: Record<string, { threadId: string; threadName: string; note: string }> = {
  'arthur-wharton':          { threadId: 'same-rule',    threadName: 'The Same Rule, Different Arenas', note: 'Wharton opens this thread — the same exclusion rule, applied to sport in 1889.' },
  'len-johnson':             { threadId: 'same-rule',    threadName: 'The Same Rule, Different Arenas', note: 'Johnson is the boxing node — the British Boxing Board\'s written racial bar.' },
  'jazzie-b':                { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'Soul II Soul\'s build-before-you-sign model is the counter-example to extraction.' },
  'kanya-king':              { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'MOBO is institutional self-determination — building the ceremony yourself.' },
  'michaela-coel':           { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'Coel refused $1m to retain ownership. She closes this thread in the present.' },
  'samuel-coleridge-taylor': { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'Coleridge-Taylor sold his royalties outright — the cautionary node.' },
  'claudia-jones':           { threadId: 'joy-politics', threadName: 'Joy as Politics',                  note: 'The Carnival is joy as organised resistance. Jones built it after the riots.' },
  'daley-thompson':          { threadId: 'joy-politics', threadName: 'Joy as Politics',                  note: 'Thompson\'s refusal to perform deference was joy as political act.' },
  'felicity-ethnic':         { threadId: 'joy-politics', threadName: 'Joy as Politics',                  note: 'Felicity\'s characters — especially Ma Bennette — are joy and counter-archive in one act.' },
  'rudy-lickwood':           { threadId: 'joy-politics', threadName: 'Joy as Politics',                  note: 'Black British comedy built its own infrastructure. Laughter as sovereignty.' },
  'jonathan-strong':         { threadId: 'landscape',    threadName: 'The Landscape Under Your Feet',   note: 'Strong\'s case is buried in the City streets — you can walk it.' },
  'jack-gladstone':          { threadId: 'landscape',    threadName: 'The Landscape Under Your Feet',   note: 'The Gladstone name is on buildings. The story of who built the wealth is under the surface.' },
  'ira-aldridge':            { threadId: 'same-rule',    threadName: 'The Same Rule, Different Arenas', note: 'Aldridge faced the same rule in theatre that Wharton faced in sport.' },
  'william-cuffay':          { threadId: 'same-rule',    threadName: 'The Same Rule, Different Arenas', note: 'Cuffay\'s transportation is the state using its rule against an organiser.' },
  'mark-dean':               { threadId: 'same-rule',    threadName: 'The Same Rule, Different Arenas', note: 'Dean\'s erasure from computing history follows the same structural logic.' },
  'george-padmore':          { threadId: 'landscape',    threadName: 'The Landscape Under Your Feet',   note: 'The flat in NW1 where African independence was organised is unmarked. Walk past it.' },
  'jean-binta-breeze':       { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'Breeze\'s oral tradition was undervalued by the written canon. The voice is not the page.' },
  'spartacus-r':             { threadId: 'kingston-grid', threadName: 'From Kingston to the Grid',      note: 'Osibisa\'s Afro-Caribbean fusion is the African root in the sound lineage.' },
  'marcelle-joseph':         { threadId: 'who-owns',     threadName: 'Who Owns the Culture?',           note: 'Joseph built the infrastructure for artists the gallery system ignored.' },
};

function getThreadRoute(profile: ExcellenceProfile): ThreadRoute | undefined {
  const route = THREAD_ROUTES[profile.id];
  if (route) return { threadName: route.threadName, threadId: route.threadId, connectionNote: route.note };
  // Fallback by discipline
  if (profile.discipline === 'music') return { threadId: 'who-owns', threadName: 'Who Owns the Culture?', connectionNote: `${profile.name}'s story connects to the question of who benefits from Black cultural production.` };
  if (profile.discipline === 'activism' || profile.discipline === 'law-justice') return { threadId: 'same-rule', threadName: 'The Same Rule, Different Arenas', connectionNote: `${profile.name}'s work challenged the structural rules of their era.` };
  return undefined;
}

// ─────────────────────────────────────────
// PROFILE → CARD
// ─────────────────────────────────────────

function profileToCard(profile: ExcellenceProfile): EsiProfileCard {
  const dates = profile.deathYear
    ? `${profile.birthYear ?? '?'}–${profile.deathYear}`
    : `b. ${profile.birthYear ?? '?'}`;

  return {
    id: profile.id,
    name: profile.name,
    dates,
    primaryField: profile.primaryField,
    theGap: profile.theGap,
    threadConnection: THREAD_ROUTES[profile.id]?.note,
    plaqueStatus: 'in-archive',
    leadsTo: { mode: 'thread', id: THREAD_ROUTES[profile.id]?.threadId, label: 'Explore their thread' }
  };
}

// ─────────────────────────────────────────
// ESI OPENING LINES
// Rotate so she doesn't always say the same thing
// ─────────────────────────────────────────

const OPENING_LINES = [
  'Looking for someone? Type a name — I\'ll tell you what we know, and what the record missed.',
  'The archive is open. Type a name and I\'ll show you what\'s here — and what\'s been hidden.',
  'Who are you looking for? I know the archive. I also know its gaps.',
  'A name, a question, or a hunch — I\'m here. The counter-archive is deeper than it looks.',
];

function getOpeningLine(): string {
  const day = new Date().getDate();
  return OPENING_LINES[day % OPENING_LINES.length];
}

// ─────────────────────────────────────────
// ANTHROPIC API CALL
// For figures not yet seeded in the archive
// ─────────────────────────────────────────

async function askAnthropicAboutFigure(
  name: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const systemPrompt = `You are Esi, the Heritage Discovery guide for the Wembley Wonders Knowledge Commons — a Black British counter-archive based in Wembley, London.

Your role: help visitors discover Black British history. You are warm, authoritative, and specific. You do not perform enthusiasm — you convey genuine expertise.

When asked about a historical figure:
- Give factual information: who they were, what they did, why it matters
- Always note structural context: what system were they navigating?
- Always note the gap: why aren't they better known? what did the mainstream record miss?
- If they have a connection to London, name the specific places
- End by noting whether they should be in the counter-archive and why

Keep responses concise: 3–4 short paragraphs maximum. No bullet points. Speak as an archivist, not a Wikipedia article.

Focus especially on Black British figures, but include figures from the African diaspora whose stories connect to British history (transatlantic slavery, colonialism, migration, cultural exchange).

Do not make up facts. If you are uncertain about something, say so clearly.`;

  const messages = [
    ...conversationHistory,
    {
      role: 'user' as const,
      content: `Tell me about ${name} — specifically their significance to Black British history and what the mainstream record has missed about them.`
    }
  ];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const textBlock = data.content?.find((b: { type: string }) => b.type === 'text');
    return textBlock?.text ?? 'I couldn\'t retrieve information about that figure right now. Try searching our archive directly, or ask me another question.';
  } catch {
    return `I know about ${name} but I'm having trouble accessing the full record right now. The archive is growing — they may not be fully documented yet. If you know their story, you could help us add them.`;
  }
}

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

interface HeritageDiscoveryROVProps {
  isLoggedIn?: boolean;
  defaultOpen?: boolean;
  onNavigate?: (mode: string, id?: string) => void;
}

const HeritageDiscoveryROV: React.FC<HeritageDiscoveryROVProps> = ({
  isLoggedIn = false,
  defaultOpen = false,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Opening greeting on first open
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        addEsiMessage(getOpeningLine());
      }, 400);
    }
  }, [isOpen, hasGreeted]);

  // Focus input when open
  useEffect(() => {
    if (isOpen && !isMinimised) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimised]);

  const addEsiMessage = useCallback((
    content: string,
    extras?: {
      profileCard?: EsiProfileCard;
      nominationPrompt?: NominationPrompt;
      threadRoute?: ThreadRoute;
    }
  ) => {
    const msg: Message = {
      id: `esi-${Date.now()}-${Math.random()}`,
      role: 'esi',
      content,
      timestamp: new Date(),
      ...extras,
    };
    setMessages(prev => [...prev, msg]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    const msg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
  }, []);

  const handleSubmit = useCallback(async () => {
    const query = input.trim();
    if (!query || isThinking) return;

    setInput('');
    addUserMessage(query);
    setIsThinking(true);

    // Update conversation history
    const newHistory: { role: 'user' | 'assistant'; content: string }[] = [
      ...conversationHistory,
      { role: 'user', content: query }
    ];

    // Check archive first
    const archiveMatch = findInArchive(query);

    if (archiveMatch) {
      // Found in archive
      const card = profileToCard(archiveMatch);
      const threadRoute = getThreadRoute(archiveMatch);

      const responseText = `${archiveMatch.name} is in the archive.${archiveMatch.theGap ? ` Here's what the mainstream record missed: ${archiveMatch.theGap}` : ''}`;

      setTimeout(() => {
        addEsiMessage(responseText, { profileCard: card, threadRoute });
        setConversationHistory([...newHistory, { role: 'assistant', content: responseText }]);
        setIsThinking(false);
      }, 600);

    } else {
      // Not in archive — ask Anthropic
      try {
        const response = await askAnthropicAboutFigure(query, conversationHistory);

        const nominationPrompt: NominationPrompt = {
          name: query,
          reason: `${query} was surfaced through Esi's discovery layer — not yet in the counter-archive.`,
          isLoggedIn,
        };

        addEsiMessage(response, { nominationPrompt });
        setConversationHistory([...newHistory, { role: 'assistant', content: response }]);
      } catch {
        addEsiMessage(`I'm looking for ${query} in the archive and beyond it. I can tell you what I know — ask me a more specific question, or try a name spelling variation.`);
        setConversationHistory([...newHistory, { role: 'assistant', content: `Searched for: ${query}` }]);
      } finally {
        setIsThinking(false);
      }
    }
  }, [input, isThinking, conversationHistory, isLoggedIn, addEsiMessage, addUserMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleNavigate = (mode: string, id?: string) => {
    onNavigate?.(mode, id);
    // Don't close — they may want to continue the conversation
  };

  // ─────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────

  const renderProfileCard = (card: EsiProfileCard) => (
    <div className="esi-profile-card">
      <div className="esi-profile-card__header">
        <div className="esi-profile-card__status esi-profile-card__status--archive">
          <span className="esi-profile-card__status-dot" />
          In the counter-archive
        </div>
        <div className="esi-profile-card__dates">{card.dates}</div>
      </div>
      <h3 className="esi-profile-card__name">{card.name}</h3>
      <p className="esi-profile-card__field">{card.primaryField}</p>
      {card.theGap && (
        <div className="esi-profile-card__gap">
          <span className="esi-profile-card__gap-label">The gap</span>
          <p>{card.theGap}</p>
        </div>
      )}
      {card.threadConnection && (
        <div className="esi-profile-card__thread">
          <span className="esi-profile-card__thread-label">Thread connection</span>
          <p>{card.threadConnection}</p>
        </div>
      )}
      <button
        className="esi-profile-card__cta"
        onClick={() => handleNavigate(card.leadsTo.mode, card.leadsTo.id)}
      >
        {card.leadsTo.label} →
      </button>
    </div>
  );

  const renderNominationPrompt = (nom: NominationPrompt) => (
    <div className="esi-nomination">
      <div className="esi-nomination__header">
        <span className="esi-nomination__icon">◌</span>
        <span className="esi-nomination__label">Not yet in the counter-archive</span>
      </div>
      <p className="esi-nomination__text">
        <strong>{nom.name}</strong> should be here. The archive is built by the community.
      </p>
      {nom.isLoggedIn ? (
        <button
          className="esi-nomination__cta esi-nomination__cta--active"
          onClick={() => handleNavigate('plaque')}
        >
          Nominate {nom.name} for a counter-plaque →
        </button>
      ) : (
        <div className="esi-nomination__gate">
          <p>Members can nominate figures for the counter-archive.</p>
          <a href="/enroll" className="esi-nomination__join">Join to contribute →</a>
        </div>
      )}
    </div>
  );

  const renderThreadRoute = (route: ThreadRoute) => (
    <div className="esi-thread-route">
      <span className="esi-thread-route__label">Connected thread</span>
      <p className="esi-thread-route__name">"{route.threadName}"</p>
      <p className="esi-thread-route__note">{route.connectionNote}</p>
      <button
        className="esi-thread-route__cta"
        onClick={() => handleNavigate('thread', route.threadId)}
      >
        Follow this thread →
      </button>
    </div>
  );

  // ─────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────

  if (!isOpen) {
    return (
      <button
        className="esi-launcher"
        onClick={() => setIsOpen(true)}
        aria-label="Open Esi — Heritage Discovery guide"
      >
        <span className="esi-launcher__icon" aria-hidden="true">◈</span>
        <span className="esi-launcher__label">Ask Esi</span>
        <span className="esi-launcher__sub">Heritage guide</span>
      </button>
    );
  }

  return (
    <div className={`esi-panel${isMinimised ? ' esi-panel--minimised' : ''}`} role="dialog" aria-label="Esi — Heritage Discovery">

      {/* ── Header ── */}
      <div className="esi-panel__header">
        <div className="esi-panel__identity">
          <span className="esi-panel__avatar" aria-hidden="true">◈</span>
          <div>
            <div className="esi-panel__name">Esi</div>
            <div className="esi-panel__role">Heritage Discovery · Knowledge Commons</div>
          </div>
        </div>
        <div className="esi-panel__controls">
          <button
            className="esi-panel__control"
            onClick={() => setIsMinimised(v => !v)}
            aria-label={isMinimised ? 'Expand' : 'Minimise'}
          >
            {isMinimised ? '▲' : '▼'}
          </button>
          <button
            className="esi-panel__control"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      {!isMinimised && (
        <>
          <div className="esi-panel__messages" aria-live="polite">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`esi-message esi-message--${msg.role}`}
              >
                {msg.role === 'esi' && (
                  <span className="esi-message__marker" aria-hidden="true">◈</span>
                )}
                <div className="esi-message__body">
                  <p className="esi-message__text">{msg.content}</p>
                  {msg.profileCard && renderProfileCard(msg.profileCard)}
                  {msg.threadRoute && renderThreadRoute(msg.threadRoute)}
                  {msg.nominationPrompt && renderNominationPrompt(msg.nominationPrompt)}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="esi-message esi-message--esi esi-message--thinking">
                <span className="esi-message__marker" aria-hidden="true">◈</span>
                <div className="esi-thinking-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick suggestions (only on empty) ── */}
          {messages.length <= 1 && (
            <div className="esi-suggestions">
              {['Jack Gladstone', 'George Padmore', 'Jean Binta Breeze', 'Night Moves', 'Felicity Ethnic', 'Osibisa'].map(name => (
                <button
                  key={name}
                  className="esi-suggestion"
                  onClick={() => {
                    setInput(name);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* ── Input ── */}
          <div className="esi-panel__input-area">
            <input
              ref={inputRef}
              type="text"
              className="esi-panel__input"
              placeholder="Type a name or question…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isThinking}
              aria-label="Ask Esi about a person or topic"
            />
            <button
              className="esi-panel__send"
              onClick={handleSubmit}
              disabled={!input.trim() || isThinking}
              aria-label="Send"
            >
              →
            </button>
          </div>

          {/* ── Archive status bar ── */}
          <div className="esi-panel__footer">
            <span>{BLACK_BRITISH_EXCELLENCE.length} figures in archive</span>
            <span>·</span>
            <button
              className="esi-panel__footer-link"
              onClick={() => handleNavigate('thread')}
            >
              Browse threads
            </button>
            <span>·</span>
            <button
              className="esi-panel__footer-link"
              onClick={() => handleNavigate('plaque')}
            >
              Missing plaques
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeritageDiscoveryROV;