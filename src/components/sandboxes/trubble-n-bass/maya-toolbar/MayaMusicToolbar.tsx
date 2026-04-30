// MayaMusicToolbar.tsx
// Maya's floating ROV toolbar — the ear in the room
// Three modes: Listen (observes, offers), Suggest (next musical move), Teach (plain language)
// Never interrupts flow. Sits at the edge. Speaks when useful.

import React, { useState, useEffect } from 'react';
import {
  ToolbarMode,
  MayaSuggestion,
  TeachMoment,
  LISTEN_PROMPTS,
  TEACH_MOMENTS,
} from './ToolbarModes';
import './MayaMusicToolbar.css';

interface MayaMusicToolbarProps {
  currentStyle?: string;
  hasRhythm?: boolean;
  hasStyle?: boolean;
  keyboardActive?: boolean;
  onSuggestionAccept?: (suggestion: MayaSuggestion) => void;
  onTeachRequest?: (moment: TeachMoment) => void;
  customSuggestion?: string;
  roomComplete?: boolean;
}

const MayaMusicToolbar: React.FC<MayaMusicToolbarProps> = ({
  currentStyle,
  hasRhythm = false,
  hasStyle = false,
  keyboardActive = false,
  onSuggestionAccept,
  onTeachRequest,
  customSuggestion,
  roomComplete = false,
}) => {
  const [mode, setMode] = useState<ToolbarMode>('listen');
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTeach, setCurrentTeach] = useState<TeachMoment | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Determine contextual listen prompt
  const getListenPrompt = (): string => {
    if (customSuggestion) return customSuggestion;
    if (keyboardActive) return LISTEN_PROMPTS.keyboard;
    if (hasRhythm && hasStyle) return 'You have a rhythm and a feel. Ready to go to the Production Room.';
    if (hasRhythm) return LISTEN_PROMPTS.has_rhythm;
    if (hasStyle) return LISTEN_PROMPTS.has_style;
    return LISTEN_PROMPTS.idle;
  };

  // Load relevant teach moment when style changes
  useEffect(() => {
    if (!currentStyle) return;
    const moment = TEACH_MOMENTS.find(t => t.trigger === `style:${currentStyle}`);
    if (moment) setCurrentTeach(moment);
  }, [currentStyle]);

  // Keyboard shortcut: M to toggle toolbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.ctrlKey) {
        e.preventDefault();
        setIsExpanded(x => !x);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (dismissed) {
    return (
      <button
        className="maya-toolbar__revive"
        onClick={() => setDismissed(false)}
        title="Bring Maya back"
      >
        ◈ Maya
      </button>
    );
  }

  const suggestions: MayaSuggestion[] = [
    {
      id: 'add-bass',
      mode: 'suggest',
      text: 'Add a bass line under this rhythm',
      action: 'open:session-room',
      context: 'has_rhythm',
    },
    {
      id: 'try-gospel',
      mode: 'suggest',
      text: 'Try the Gospel feel for this tempo',
      action: 'set:style:gospel',
      context: 'has_rhythm',
    },
    {
      id: 'add-vocal',
      mode: 'suggest',
      text: 'Take this to the Vocal Room',
      action: 'open:vocal-room',
      context: 'has_style',
    },
    {
      id: 'to-raydyo',
      mode: 'suggest',
      text: 'This is ready for Rayd-yo broadcast',
      action: 'journey:tnb-to-raydyo',
      context: 'has_rhythm',
    },
  ];

  const visibleSuggestions = suggestions.filter(s =>
    (s.context === 'has_rhythm' && hasRhythm) ||
    (s.context === 'has_style' && hasStyle) ||
    !s.context
  ).slice(0, 3);

  return (
    <div className={`maya-toolbar${isExpanded ? ' maya-toolbar--expanded' : ''}`}>
      {/* Header bar — always visible */}
      <div className="maya-toolbar__bar">
        <button
          className="maya-toolbar__avatar"
          onClick={() => setIsExpanded(x => !x)}
          aria-label="Toggle Maya toolbar"
          title="Ctrl+M to toggle"
        >
          <span className="maya-toolbar__avatar-img-wrap">
            <img
              src="/images/maya-avatar.png"
              alt="Maya"
              className="maya-toolbar__avatar-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="maya-toolbar__avatar-fallback">M</span>
            <span className={`maya-toolbar__avatar-dot${roomComplete ? ' maya-toolbar__avatar-dot--active' : ''}`} />
          </span>
          <span className="maya-toolbar__avatar-name">Maya</span>
        </button>

        {/* Mode tabs */}
        <div className="maya-toolbar__modes">
          {(['listen', 'suggest', 'teach'] as ToolbarMode[]).map(m => (
            <button
              key={m}
              className={`maya-toolbar__mode${mode === m ? ' maya-toolbar__mode--active' : ''}`}
              onClick={() => { setMode(m); setIsExpanded(true); }}
            >
              {m === 'listen' ? '◉' : m === 'suggest' ? '→' : '◈'} {m}
            </button>
          ))}
        </div>

        <button
          className="maya-toolbar__dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss Maya"
          title="Hide Maya"
        >×</button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="maya-toolbar__content">
          {mode === 'listen' && (
            <div className="maya-toolbar__listen">
              <p className="maya-toolbar__message">{getListenPrompt()}</p>
            </div>
          )}

          {mode === 'suggest' && (
            <div className="maya-toolbar__suggest">
              {visibleSuggestions.length > 0 ? (
                visibleSuggestions.map(s => (
                  <button
                    key={s.id}
                    className="maya-toolbar__suggestion"
                    onClick={() => onSuggestionAccept?.(s)}
                  >
                    → {s.text}
                  </button>
                ))
              ) : (
                <p className="maya-toolbar__message">
                  Tap a rhythm or pick a feel first — then I can suggest next moves.
                </p>
              )}
            </div>
          )}

          {mode === 'teach' && (
            <div className="maya-toolbar__teach">
              {currentTeach ? (
                <>
                  <div className="maya-toolbar__teach-title">{currentTeach.title}</div>
                  <p className="maya-toolbar__teach-text">{currentTeach.explanation}</p>
                  {currentTeach.tradition && (
                    <div className="maya-toolbar__tradition">
                      {currentTeach.tradition}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="maya-toolbar__message">
                    Pick a feel and I can tell you about the tradition behind it.
                  </p>
                  <div className="maya-toolbar__teach-list">
                    {TEACH_MOMENTS.slice(0, 3).map(t => (
                      <button
                        key={t.id}
                        className="maya-toolbar__teach-item"
                        onClick={() => { setCurrentTeach(t); onTeachRequest?.(t); }}
                      >
                        {t.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {currentTeach && (
                <button
                  className="maya-toolbar__teach-back"
                  onClick={() => setCurrentTeach(null)}
                >
                  ← All lessons
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MayaMusicToolbar;
