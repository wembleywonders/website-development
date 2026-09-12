// ProgrammeROVToolbar.tsx
// The generic ROV toolbar UI — "Maya in the room" for any programme.
// Consumes ToolbarContext.tsx for per-programme config and active
// contexts, and useROVToolbar.ts for all mode/expand/dismiss state and
// filtering logic. This file owns rendering only; no toolbar state lives
// here directly, matching the split already established by the previous
// two files.
//
// UI pattern generalized from the confirmed, working
// trubble-n-bass/maya-toolbar/MayaMusicToolbar.tsx — same avatar button,
// same three mode tabs, same dismiss/revive affordance — but with no
// TnB-specific content hardcoded in.

import React from 'react';
import { useToolbarContext } from './ToolbarContext';
import { useROVToolbar, ROVToolbarMode } from './useROVToolbar';
import './ProgrammeROVToolbar.css';

export interface ProgrammeROVToolbarProps {
  /** Display name shown next to the avatar icon — e.g. "Maya", or a
   *  programme-specific ROV name if one exists. Defaults to "Maya". */
  displayName?: string;
  onSuggestionAccept?: (action: string) => void;
}

const MODE_ICON: Record<ROVToolbarMode, string> = {
  listen: '◉',
  suggest: '→',
  teach: '◈',
};

const ProgrammeROVToolbar: React.FC<ProgrammeROVToolbarProps> = ({
  displayName = 'Maya',
  onSuggestionAccept,
}) => {
  const { config, activeContexts } = useToolbarContext();

  const {
    mode,
    isExpanded,
    dismissed,
    currentTeach,
    visibleSuggestions,
    listenPrompt,
    toggleExpanded,
    dismiss,
    revive,
    selectMode,
    acceptSuggestion,
  } = useROVToolbar({
    programmeId: config.programmeId,
    suggestions: config.suggestions,
    teachMoments: config.teachMoments,
    activeContexts,
    getListenPrompt: config.getListenPrompt,
    onSuggestionAccept: (s) => onSuggestionAccept?.(s.action),
  });

  if (dismissed) {
    return (
      <button
        type="button"
        className="rov-toolbar__revive"
        onClick={revive}
        title={`Bring ${displayName} back`}
      >
        ◈ {displayName}
      </button>
    );
  }

  return (
    <div className={`rov-toolbar${isExpanded ? ' rov-toolbar--expanded' : ''}`}>
      <div className="rov-toolbar__bar">
        <button
          type="button"
          className="rov-toolbar__avatar"
          onClick={toggleExpanded}
          aria-label={`Toggle ${displayName} toolbar`}
          title="Ctrl+M to toggle"
        >
          <span className="rov-toolbar__avatar-icon">◈</span>
          <span className="rov-toolbar__avatar-name">{displayName}</span>
        </button>

        <div className="rov-toolbar__modes">
          {(['listen', 'suggest', 'teach'] as ROVToolbarMode[]).map((m) => (
            <button
              key={m}
              type="button"
              className={`rov-toolbar__mode${mode === m ? ' rov-toolbar__mode--active' : ''}`}
              onClick={() => selectMode(m)}
            >
              {MODE_ICON[m]} {m}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="rov-toolbar__dismiss"
          onClick={dismiss}
          aria-label={`Dismiss ${displayName}`}
          title={`Hide ${displayName}`}
        >
          ×
        </button>
      </div>

      {isExpanded && (
        <div className="rov-toolbar__content">
          {mode === 'listen' && (
            <div className="rov-toolbar__listen">
              <p className="rov-toolbar__message">{listenPrompt}</p>
            </div>
          )}

          {mode === 'suggest' && (
            <div className="rov-toolbar__suggest">
              {visibleSuggestions.length > 0 ? (
                visibleSuggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="rov-toolbar__suggestion"
                    onClick={() => acceptSuggestion(s)}
                  >
                    → {s.text}
                  </button>
                ))
              ) : (
                <p className="rov-toolbar__message">
                  Nothing to suggest yet — keep going and I&rsquo;ll catch up.
                </p>
              )}
            </div>
          )}

          {mode === 'teach' && (
            <div className="rov-toolbar__teach">
              {currentTeach ? (
                <>
                  <div className="rov-toolbar__teach-title">{currentTeach.title}</div>
                  <p className="rov-toolbar__teach-text">{currentTeach.explanation}</p>
                  {currentTeach.tradition && (
                    <div className="rov-toolbar__tradition">{currentTeach.tradition}</div>
                  )}
                </>
              ) : (
                <>
                  <p className="rov-toolbar__message">
                    Nothing to teach yet for where you are right now.
                  </p>
                  {config.teachMoments.length > 0 && (
                    <div className="rov-toolbar__teach-list">
                      {config.teachMoments.slice(0, 3).map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className="rov-toolbar__teach-item"
                          onClick={() => selectMode('teach')}
                        >
                          {t.title}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgrammeROVToolbar;
