/**
 * MayaCompanion - Main Maya AI Component
 *
 * UPDATED: Compatible with unified mayaStore structure and ROV framework
 *
 * Implements the full pedagogical state machine with:
 * - ACTIVE mode: Inline overlays, proactive tips
 * - WITNESS mode: Collapsed icon, pull-only
 * - PARTNER mode: Minimal presence, pattern sharing
 * - ROUTING mode: Transitioning between Maya and children
 *
 * Maya's silence is not absence—it's the sound of the user's own voice becoming primary.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  useMayaStore,
  useMayaMode,
  useMayaMessages,
  useMayaStage,
  useMayaROV,
  useMayaPreferences,
  useMayaOpenLoops
} from '../stores/mayaStore';
import {
  MayaMessage,
  MayaMode,
  STAGE_DEFINITIONS,
  ActiveChild,
  getRandomMessage
} from '../types/mayaTypes';
import styles from './MayaCompanion.module.css';

// ============================================
// CHILD INFO
// ============================================

const ENTITY_INFO: Record<ActiveChild, { emoji: string; name: string; role: string }> = {
  maya:     { emoji: '👩🏾‍💼', name: 'Maya',     role: 'The Mother' },
  kweku:    { emoji: '🎯',    name: 'Kweku',    role: 'Business Strategist' },
  ntikuma:  { emoji: '📊',    name: 'Ntikuma',  role: 'Financial Advisor' },
  anansewa: { emoji: '🎭',    name: 'Anansewa', role: 'Performance Coach' },
  kofi:     { emoji: '🔧',    name: 'Kofi',     role: 'Technical Builder' },
  afua:     { emoji: '🎙️',   name: 'Afua',     role: 'Voice Coach' },
  yaw:      { emoji: '📝',    name: 'Yaw',      role: 'Journalist' },
  esi:      { emoji: '📚',    name: 'Esi',      role: 'Heritage Keeper' },
  kumi:     { emoji: '🎮',    name: 'Kumi',     role: 'Gaming Strategist' },
  adaeze:   { emoji: '✂️',   name: 'Adaeze',   role: 'Fashion Designer' },
  nyame:    { emoji: '⚖️',   name: 'Nyame',    role: 'Ethics Guide' },
  osei:     { emoji: '✊',    name: 'Osei',     role: 'Community Organizer' },
  akua:     { emoji: '📜',    name: 'Akua',     role: 'Legal Advocate' }
};

// ============================================
// MAYA AVATAR
// ============================================

interface MayaAvatarProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  hasUnread?: boolean;
  entity?: ActiveChild;
}

const MayaAvatar: React.FC<MayaAvatarProps> = ({
  size = 'medium',
  animated = false,
  hasUnread = false,
  entity = 'maya'
}) => {
  const info = ENTITY_INFO[entity] ?? ENTITY_INFO.maya;
  return (
    <div className={`${styles.avatar} ${styles[size]} ${animated ? styles.animated : ''}`}>
      <span className={styles.avatarEmoji}>{info.emoji}</span>
      {hasUnread && <span className={styles.unreadDot} />}
    </div>
  );
};

// ============================================
// MAYA MESSAGE BUBBLE
// ============================================

interface MayaMessageBubbleProps {
  message: MayaMessage;
  onResponse?: (response: string) => void;
}

const MayaMessageBubble: React.FC<MayaMessageBubbleProps> = ({ message, onResponse }) => {
  const [responded, setResponded] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleResponse = (response: string) => {
    setResponded(true);
    onResponse?.(response);
  };

  const entityInfo = message.metadata?.childId
    ? (ENTITY_INFO[message.metadata.childId] ?? ENTITY_INFO.maya)
    : ENTITY_INFO.maya;

  const getTypeClass = () => {
    switch (message.type) {
      case 'community-mirror':        return styles.communityMirror;
      case 'gatekeeper-bypass':       return styles.gatekeeperBypass;
      case 'ignition':                return styles.ignition;
      case 'push':                    return styles.push;
      case 'child-introduction':      return styles.childIntro;
      case 'child-return':            return styles.childReturn;
      case 'independence-recognition':return styles.independence;
      default:                        return '';
    }
  };

  return (
    <div className={`${styles.messageBubble} ${styles[message.type] ?? ''} ${getTypeClass()}`}>
      {message.metadata?.childId && message.metadata.childId !== 'maya' && (
        <div className={styles.entityIndicator}>
          <span>{entityInfo.emoji}</span>
          <span>{entityInfo.name}</span>
        </div>
      )}

      <p className={styles.messageText}>{message.text}</p>

      {message.requiresResponse && !responded && (
        <div className={styles.responseButtons}>
          {message.type === 're-entry' && (
            <>
              <button className={styles.responseBtn} onClick={() => handleResponse('not-now')}>
                Not now
              </button>
              <button
                className={`${styles.responseBtn} ${styles.primary}`}
                onClick={() => handleResponse('tell-me')}
              >
                Tell me
              </button>
            </>
          )}

          {message.type === 'session-end' && (
            <>
              <button className={styles.responseBtn} onClick={() => handleResponse('nothing')}>
                Nothing comes to mind
              </button>
              <button
                className={`${styles.responseBtn} ${styles.primary}`}
                onClick={() => handleResponse('yes')}
              >
                Yes, actually...
              </button>
            </>
          )}

          {(message.type === 'three-questions' || message.type === 'reflection') && (
            <input
              type="text"
              className={styles.reflectionInput}
              placeholder={message.type === 'three-questions' ? 'Tell me...' : 'Type your thought...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleResponse(inputValue.trim());
                  setInputValue('');
                }
              }}
            />
          )}
        </div>
      )}

      <span className={styles.messageTime}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};

// ============================================
// MAYA INLINE OVERLAY (ACTIVE MODE)
// ============================================

interface MayaInlineOverlayProps {
  message: string;
  entity?: ActiveChild;
  onDismiss?: () => void;
}

export const MayaInlineOverlay: React.FC<MayaInlineOverlayProps> = ({
  message,
  entity = 'maya',
  onDismiss
}) => (
  <div className={styles.inlineOverlay}>
    <MayaAvatar size="small" entity={entity} />
    <div className={styles.inlineContent}>
      <p>{message}</p>
      {onDismiss && (
        <button className={styles.dismissBtn} onClick={onDismiss}>Got it</button>
      )}
    </div>
  </div>
);

// ============================================
// MAYA COLLAPSED ICON (WITNESS MODE)
// ============================================

interface MayaCollapsedIconProps {
  onClick: () => void;
  hasUnread: boolean;
  entity?: ActiveChild;
  openLoopCount?: number;
}

const MayaCollapsedIcon: React.FC<MayaCollapsedIconProps> = ({
  onClick,
  hasUnread,
  entity = 'maya',
  openLoopCount = 0
}) => (
  <button
    className={styles.collapsedIcon}
    onClick={onClick}
    aria-label={`Open ${ENTITY_INFO[entity]?.name ?? 'Maya'}`}
  >
    <MayaAvatar size="medium" hasUnread={hasUnread} entity={entity} />
    {openLoopCount > 0 && (
      <span className={styles.openLoopBadge}>{openLoopCount}</span>
    )}
  </button>
);

// ============================================
// MAYA CHAT PANEL
// ============================================

interface MayaChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: MayaMessage[];
  onSendMessage: (text: string) => void;
  onMessageResponse: (messageId: string, response: string) => void;
  mode: MayaMode;
  stage: number;
  activeEntity: ActiveChild;
  openLoopCount?: number;
}

const MayaChatPanel: React.FC<MayaChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onMessageResponse,
  mode,
  stage,
  activeEntity,
  openLoopCount = 0
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const entityInfo = ENTITY_INFO[activeEntity] ?? ENTITY_INFO.maya;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const getPlaceholder = () => {
    if (activeEntity !== 'maya') return `Message ${entityInfo.name}...`;
    switch (mode) {
      case 'ACTIVE':  return 'Ask Maya anything...';
      case 'WITNESS':
      case 'PARTNER': return 'What are you thinking about?';
      case 'ROUTING': return 'Where do you need help?';
      default:        return 'Type a message...';
    }
  };

  const getRoleText = () => {
    if (activeEntity !== 'maya') return entityInfo.role;
    return STAGE_DEFINITIONS[stage as 1 | 2 | 3 | 4 | 5]?.mayaRole ?? 'Guide';
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <MayaAvatar size="small" entity={activeEntity} />
          <div className={styles.chatHeaderInfo}>
            <span className={styles.chatHeaderName}>{entityInfo.name}</span>
            <span className={styles.chatHeaderStatus}>{getRoleText()}</span>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className={styles.stageIndicator}>
        <span>Stage {stage}: {STAGE_DEFINITIONS[stage as 1 | 2 | 3 | 4 | 5]?.label ?? 'Unknown'}</span>
        <div className={styles.stageDots}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} className={`${styles.stageDot} ${s <= stage ? styles.active : ''}`} />
          ))}
        </div>
      </div>

      {openLoopCount > 0 && (
        <div className={styles.openLoopsIndicator}>
          📌 {openLoopCount} open {openLoopCount === 1 ? 'thread' : 'threads'}
        </div>
      )}

      <div className={styles.chatMessages}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <MayaAvatar size="large" entity={activeEntity} />
            <p>
              {activeEntity === 'maya'
                ? mode === 'WITNESS'
                  ? "I'm here when you need reflection."
                  : "How can I help you today?"
                : `${entityInfo.name} is ready to help.`}
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MayaMessageBubble
            key={msg.id}
            message={msg}
            onResponse={(response) => onMessageResponse(msg.id, response)}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form className={styles.chatInput} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={getPlaceholder()}
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.sendBtn}
          disabled={!inputValue.trim()}
          aria-label="Send"
        >
          →
        </button>
      </form>
    </div>
  );
};

// ============================================
// MAIN MAYA COMPANION COMPONENT
// ============================================

interface MayaCompanionProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  sandboxId?: string;
}

export const MayaCompanion: React.FC<MayaCompanionProps> = ({
  className = '',
  position = 'bottom-right',
  sandboxId: _sandboxId
}) => {
  const { currentMode } = useMayaMode();
  const { currentStage }  = useMayaStage();
  const { messages, addMessage } = useMayaMessages();
  const { activeEntity, routeToChild: _routeToChild, returnToMaya: _returnToMaya } = useMayaROV();
  const { openLoops }     = useMayaOpenLoops();
  const { preferences }   = useMayaPreferences();

  const state        = useMayaStore((s) => s.state);
  const shareInsight = useMayaStore((s) => s.shareInsight);

  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnread,  setHasUnread]  = useState(false);

  useEffect(() => {
    if (isExpanded) setHasUnread(false);
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded && messages.length > 0) setHasUnread(true);
  }, [messages.length, isExpanded]);

  // ── send message ──────────────────────────────────────────
  const handleSendMessage = (text: string) => {
    if (activeEntity === 'maya') {
      if (currentMode === 'WITNESS' || currentMode === 'PARTNER') {
        setTimeout(() => addMessage("What made you think of that?", 'reflection'), 500);
      } else {
        setTimeout(() => addMessage(
          "I see what you're working on. Try experimenting with different approaches—you can always undo.",
          'narration'
        ), 500);
      }
    } else {
      // Child personalities — concise, opinionated responses
      const CHILD_RESPONSES: Record<ActiveChild, string[]> = {
        maya:     ["How can I help?"],
        kweku:    ["Interesting. But who's paying for this?", "What's your evidence?"],
        ntikuma:  ["Let's look at the numbers.", "I notice a pattern here."],
        anansewa: ["Show me again, and mean it this time.", "Breathe. Now speak."],
        kofi:     ["Stop explaining. Build it.", "What have you actually made?"],
        afua:     ["That's a list. Tell me like it matters.", "Find your spine."],
        yaw:      ["If we don't write it down, it didn't happen.", "What's the angle?"],
        esi:      ["Who taught you this?", "Their name goes in the book."],
        kumi:     ["What's your strategy here?", "That was a throw. Let's analyse."],
        adaeze:   ["What is this piece trying to say?", "Your hands know things."],
        nyame:    ["That's what you want to do. But should you?", "Think it through."],
        osei:     ["Who benefits from things staying the same?", "Are you in the room?"],
        akua:     ["Do you have that in writing?", "Document everything."]
      };
      const pool = CHILD_RESPONSES[activeEntity] ?? CHILD_RESPONSES.maya;
      const reply = pool[Math.floor(Math.random() * pool.length)];
      setTimeout(() => addMessage(reply, 'narration', { childId: activeEntity }), 600);
    }
  };

  // ── message response ──────────────────────────────────────
  const handleMessageResponse = (messageId: string, response: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    if (message.type === 're-entry' && response === 'tell-me') {
      const insight = state.silentObservations.insights.find((i) => !i.shared);
      if (insight) {
        shareInsight(insight.id);
        addMessage(insight.observation + " This isn't advice—it's a mirror.", 'pattern');
      }
    }

    if (message.type === 'session-end' && response === 'yes') {
      addMessage("I'm listening. What stood out to you?", 'reflection');
    }
  };

  // ── guard ─────────────────────────────────────────────────
  if (!preferences?.mayaEnabled) return null;

  return (
    <div className={`${styles.mayaCompanion} ${styles[position]} ${className}`}>
      {!isExpanded && (
        <MayaCollapsedIcon
          onClick={() => setIsExpanded(true)}
          hasUnread={hasUnread}
          entity={activeEntity}
          openLoopCount={openLoops.length}
        />
      )}

      <MayaChatPanel
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onMessageResponse={handleMessageResponse}
        mode={currentMode}
        stage={currentStage}
        activeEntity={activeEntity}
        openLoopCount={openLoops.length}
      />

      {process.env.NODE_ENV === 'development' && (
        <div className={styles.devIndicator}>
          Stage {currentStage} | {currentMode} | {activeEntity}
        </div>
      )}
    </div>
  );
};

// ============================================
// MAYA CONTEXT PANEL (Sidebar Integration)
// ============================================

interface MayaContextPanelProps {
  currentTool?: string;
  currentAction?: string;
  className?: string;
}

export const MayaContextPanel: React.FC<MayaContextPanelProps> = ({
  currentTool,
  currentAction,
  className = ''
}) => {
  const { currentMode } = useMayaMode();
  const { preferences } = useMayaPreferences();
  const { activeEntity } = useMayaROV();

  if (currentMode !== 'ACTIVE' || !preferences?.showHints) return null;

  const getContextHint = (): string | null => {
    if (currentTool === 'layer')          return "Layers let you test ideas without committing—watch how toggling this changes the outcome.";
    if (currentTool === 'undo')           return "Nothing is permanent here. Experiment freely.";
    if (currentAction === 'stuck')        return "Being stuck is part of building. What have you tried so far?";
    if (currentAction === 'first-action') return "No approval needed. Just start.";
    return null;
  };

  const hint = getContextHint();
  if (!hint) return null;

  return (
    <div className={`${styles.contextPanel} ${className}`}>
      <div className={styles.contextHeader}>
        <MayaAvatar size="small" entity={activeEntity} />
        <span>{ENTITY_INFO[activeEntity]?.name ?? 'Maya'}</span>
      </div>
      <p className={styles.contextHint}>{hint}</p>
    </div>
  );
};

// ============================================
// MAYA STATUS BAR INDICATOR
// ============================================

interface MayaStatusIndicatorProps {
  onNextAction?: () => void;
  nextActionLabel?: string;
}

export const MayaStatusIndicator: React.FC<MayaStatusIndicatorProps> = ({
  onNextAction,
  nextActionLabel = 'Next →'
}) => {
  const { currentMode } = useMayaMode();
  const { activeEntity } = useMayaROV();
  const [isExpanded, setIsExpanded] = useState(false);

  if (currentMode === 'ACTIVE') return null;

  const entityInfo = ENTITY_INFO[activeEntity] ?? ENTITY_INFO.maya;

  return (
    <div className={styles.statusIndicator}>
      <button
        className={styles.statusMayaBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={`Toggle ${entityInfo.name}`}
      >
        {entityInfo.emoji}
      </button>
      {onNextAction && (
        <button className={styles.nextActionBtn} onClick={onNextAction}>
          {nextActionLabel}
        </button>
      )}
    </div>
  );
};

// ============================================
// CHILD QUICK SWITCH
// ============================================

interface ChildQuickSwitchProps {
  onSelect: (childId: ActiveChild) => void;
  currentEntity: ActiveChild;
  className?: string;
}

export const ChildQuickSwitch: React.FC<ChildQuickSwitchProps> = ({
  onSelect,
  currentEntity,
  className = ''
}) => (
  <div className={`${styles.quickSwitch} ${className}`}>
    {(Object.entries(ENTITY_INFO) as [ActiveChild, typeof ENTITY_INFO[ActiveChild]][]).map(([id, info]) => (
      <button
        key={id}
        className={`${styles.quickSwitchBtn} ${id === currentEntity ? styles.active : ''}`}
        onClick={() => onSelect(id)}
        disabled={id === currentEntity}
        title={`${info.name} – ${info.role}`}
      >
        <span>{info.emoji}</span>
      </button>
    ))}
  </div>
);

export default MayaCompanion;