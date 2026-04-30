import React, { useEffect, useRef } from 'react';
import type { HelpResponse } from '../../types/learnerHelp';
import './HelpPanel.css';

interface HelpPanelProps {
  help: HelpResponse;
  onDismiss: () => void;
  onOpenTutorial?: (id: string, step?: number) => void;
  onILPAction?: (action: string, milestone: string) => void;
}

const HelpPanel: React.FC<HelpPanelProps> = ({ help, onDismiss, onOpenTutorial, onILPAction }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [help.triggerPoint]);

  const { rovPrompt, tutorial, ilpSuggestion, facilitatorGuidance } = help;

  return (
    <div className="help-panel" ref={panelRef} role="complementary">
      <div className="help-panel__header">
        {rovPrompt && (
          <div className="help-panel__rov-id">
            <span className="help-panel__rov-avatar" style={{ background: `${rovPrompt.rovColour}22`, color: rovPrompt.rovColour }}>
              {rovPrompt.rovAvatar}
            </span>
            <span className="help-panel__rov-name" style={{ color: rovPrompt.rovColour }}>
              {rovPrompt.rovName}
            </span>
          </div>
        )}
        <button className="help-panel__dismiss" onClick={onDismiss} aria-label="Dismiss">×</button>
      </div>

      {rovPrompt && <p className="help-panel__message">"{rovPrompt.message}"</p>}

      {facilitatorGuidance && (
        <div className="help-panel__facilitator">
          <span className="help-panel__facilitator-label">Facilitator note</span>
          <p>{facilitatorGuidance}</p>
        </div>
      )}

      {rovPrompt?.suggestedQuestions && rovPrompt.suggestedQuestions.length > 0 && (
        <div className="help-panel__questions">
          {rovPrompt.suggestedQuestions.map((q, i) => (
            <button key={i} className="help-panel__question-btn">{q}</button>
          ))}
        </div>
      )}

      <div className="help-panel__actions">
        {tutorial && onOpenTutorial && (
          <button className="help-panel__action help-panel__action--primary"
            onClick={() => onOpenTutorial(tutorial.id, tutorial.entryStep ?? 0)}>
            {tutorial.triggerLabel} →
          </button>
        )}
        {ilpSuggestion && onILPAction && (
          <button className="help-panel__action help-panel__action--secondary"
            onClick={() => onILPAction(ilpSuggestion.action, ilpSuggestion.milestone)}>
            {ilpSuggestion.ctaLabel}
          </button>
        )}
        <button className="help-panel__action help-panel__action--dismiss" onClick={onDismiss}>
          Not now
        </button>
      </div>
    </div>
  );
};

export default HelpPanel;
