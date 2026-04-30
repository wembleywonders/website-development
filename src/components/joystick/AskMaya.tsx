/**
 * AskMaya.tsx
 * Wembley Wonders CIC
 *
 * The conversation space that lives below every Joystick article.
 * Maya has already read the article and has a question ready.
 * The reader's first move is responding to Maya — not interrogating her.
 *
 * States:
 *   idle      — shows Maya's opening question, input ready
 *   responding — Maya is reading the contribution
 *   replied   — Maya's response shown, thread continues
 *   flagged   — contribution needs human review, warm holding message
 *
 * Place in: src/components/joystick/AskMaya.tsx
 *
 * Usage in JoystickPage:
 *   <AskMaya articleId={article.id} />
 */

import React, { useState, useRef, useEffect } from 'react';
import './AskMaya.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PreseedData {
  openingQuestion: string;
  archiveConnections?: ArchiveConnectionDisplay[];
}

interface ArchiveConnectionDisplay {
  title: string;
  relevanceNote: string;
  url?: string;
}

interface ConversationTurn {
  role: 'maya' | 'reader';
  content: string;
  timestamp: Date;
}

interface AskMayaProps {
  articleId: string;
  articleTitle: string;
  authorName: string;
  wardTag?: string;
  // Optional: preseed data fetched by parent, avoids duplicate API call
  preseedData?: PreseedData;
}

// ─── API calls ────────────────────────────────────────────────────────────────
// Wire to backend endpoints

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

async function fetchPreseed(articleId: string): Promise<PreseedData> {
  const res = await fetch(`${API_BASE}/api/joystick/articles/${articleId}/maya-preseed`);
  if (!res.ok) throw new Error('Could not load Maya\'s question');
  return res.json();
}

async function submitContribution(
  articleId: string,
  content: string,
  conversationHistory: ConversationTurn[]
): Promise<{ mayaResponse: string; requiresReview: boolean }> {
  const token = localStorage.getItem('ww_token');

  const res = await fetch(`${API_BASE}/api/joystick/articles/${articleId}/maya-respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      content,
      conversationHistory: conversationHistory.map(t => ({
        role: t.role,
        content: t.content,
      })),
    }),
  });

  if (!res.ok) throw new Error('Could not get Maya\'s response');
  return res.json();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const MayaBubble: React.FC<{ content: string; isOpening?: boolean }> = ({
  content,
  isOpening,
}) => (
  <div className={`ask-maya__bubble ask-maya__bubble--maya ${isOpening ? 'ask-maya__bubble--opening' : ''}`}>
    <div className="ask-maya__avatar">
      <span className="ask-maya__avatar-mark">✦</span>
    </div>
    <div className="ask-maya__bubble-content">
      <span className="ask-maya__speaker">Maya</span>
      <p className="ask-maya__text">{content}</p>
    </div>
  </div>
);

const ReaderBubble: React.FC<{ content: string }> = ({ content }) => (
  <div className="ask-maya__bubble ask-maya__bubble--reader">
    <div className="ask-maya__bubble-content ask-maya__bubble-content--reader">
      <span className="ask-maya__speaker">You</span>
      <p className="ask-maya__text">{content}</p>
    </div>
  </div>
);

const TypingIndicator: React.FC = () => (
  <div className="ask-maya__bubble ask-maya__bubble--maya ask-maya__bubble--typing">
    <div className="ask-maya__avatar">
      <span className="ask-maya__avatar-mark">✦</span>
    </div>
    <div className="ask-maya__typing">
      <span /><span /><span />
    </div>
  </div>
);

const ArchiveConnections: React.FC<{
  connections: ArchiveConnectionDisplay[]
}> = ({ connections }) => {
  if (!connections || connections.length === 0) return null;

  return (
    <div className="ask-maya__archive">
      <h4 className="ask-maya__archive-title">From the archive</h4>
      <ul className="ask-maya__archive-list">
        {connections.map((conn, i) => (
          <li key={i} className="ask-maya__archive-item">
            {conn.url
              ? <a href={conn.url} className="ask-maya__archive-link">{conn.title}</a>
              : <span className="ask-maya__archive-name">{conn.title}</span>
            }
            <span className="ask-maya__archive-note"> — {conn.relevanceNote}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const AskMaya: React.FC<AskMayaProps> = ({
  articleId,
  articleTitle,
  authorName,
  wardTag,
  preseedData: initialPreseed,
}) => {
  const [preseed, setPreseed] = useState<PreseedData | null>(initialPreseed ?? null);
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState<'loading' | 'idle' | 'responding' | 'flagged' | 'error'>('loading');
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load preseed if not provided
  useEffect(() => {
    if (initialPreseed) {
      setState('idle');
      return;
    }

    fetchPreseed(articleId)
      .then(data => {
        setPreseed(data);
        setState('idle');
      })
      .catch(() => setState('error'));
  }, [articleId, initialPreseed]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (expanded && conversation.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation, expanded]);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = async () => {
    const content = inputValue.trim();
    if (!content || state === 'responding') return;

    // Add reader turn
    const readerTurn: ConversationTurn = {
      role: 'reader',
      content,
      timestamp: new Date(),
    };

    setConversation(prev => [...prev, readerTurn]);
    setInputValue('');
    setState('responding');

    try {
      const { mayaResponse, requiresReview } = await submitContribution(
        articleId,
        content,
        [...conversation, readerTurn]
      );

      if (requiresReview) {
        setState('flagged');
        setConversation(prev => [...prev, {
          role: 'maya',
          content: 'Thank you for sharing this. It needs a bit more consideration before it can be part of the conversation — someone from the Joystick team will be in touch.',
          timestamp: new Date(),
        }]);
        return;
      }

      setConversation(prev => [...prev, {
        role: 'maya',
        content: mayaResponse,
        timestamp: new Date(),
      }]);
      setState('idle');

    } catch {
      setState('idle');
      setConversation(prev => [...prev, {
        role: 'maya',
        content: 'Something went wrong on my end. Try again in a moment.',
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ─── Render states ──────────────────────────────────────────────────────────

  if (state === 'loading') {
    return (
      <div className="ask-maya ask-maya--loading">
        <div className="ask-maya__loading-spinner" />
      </div>
    );
  }

  if (state === 'error' || !preseed) {
    return null; // Silent fail — don't break the article page
  }

  // Collapsed state — just Maya's question, tap to expand
  if (!expanded) {
    return (
      <div className="ask-maya ask-maya--collapsed">
        <div className="ask-maya__header">
          <span className="ask-maya__header-mark">✦</span>
          <span className="ask-maya__header-label">Maya has a question</span>
        </div>
        <p className="ask-maya__collapsed-question">
          {preseed.openingQuestion}
        </p>
        <button
          className="ask-maya__expand-btn"
          onClick={handleExpand}
          aria-label="Join the conversation"
        >
          Join the conversation
        </button>
        {preseed.archiveConnections && preseed.archiveConnections.length > 0 && (
          <ArchiveConnections connections={preseed.archiveConnections} />
        )}
      </div>
    );
  }

  // Expanded state — full conversation
  return (
    <div className="ask-maya ask-maya--expanded">

      <div className="ask-maya__header">
        <span className="ask-maya__header-mark">✦</span>
        <span className="ask-maya__header-label">The conversation</span>
        <button
          className="ask-maya__collapse-btn"
          onClick={() => setExpanded(false)}
          aria-label="Collapse conversation"
        >
          ↑
        </button>
      </div>

      {/* Conversation thread */}
      <div className="ask-maya__thread">

        {/* Opening question — always first */}
        <MayaBubble
          content={preseed.openingQuestion}
          isOpening
        />

        {/* Conversation history */}
        {conversation.map((turn, i) => (
          turn.role === 'maya'
            ? <MayaBubble key={i} content={turn.content} />
            : <ReaderBubble key={i} content={turn.content} />
        ))}

        {/* Typing indicator */}
        {state === 'responding' && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Archive connections */}
      {preseed.archiveConnections && preseed.archiveConnections.length > 0 && (
        <ArchiveConnections connections={preseed.archiveConnections} />
      )}

      {/* Input area */}
      {state !== 'flagged' && (
        <div className="ask-maya__input-area">
          <textarea
            ref={inputRef}
            className="ask-maya__input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the conversation…"
            rows={3}
            disabled={state === 'responding'}
            aria-label="Your contribution to the conversation"
          />
          <div className="ask-maya__input-footer">
            <p className="ask-maya__input-note">
              This conversation is part of the Joystick archive.
              Press Enter to send, Shift+Enter for a new line.
            </p>
            <button
              className="ask-maya__send-btn"
              onClick={handleSubmit}
              disabled={!inputValue.trim() || state === 'responding'}
              aria-label="Send your contribution"
            >
              {state === 'responding' ? '…' : 'Send'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AskMaya;