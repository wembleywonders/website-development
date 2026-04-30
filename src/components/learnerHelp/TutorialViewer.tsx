/**
 * TutorialViewer
 * ==============
 * Inline step-by-step tutorial drawer.
 * Opens from HelpPanel CTA or repair item cards.
 * Renders from STEMGENEERS_TUTORIALS data.
 *
 * Usage:
 *   <TutorialViewer tutorialId="phone-battery-health" startStep={0} onClose={() => ...} />
 */

import React, { useState, useEffect } from 'react';
import { STEMGENEERS_TUTORIALS } from '../../data/tutorials/tutorials.stemgeneers';
import type { Tutorial, TutorialStep } from '../../types/tutorial';
import './TutorialViewer.css';

interface TutorialViewerProps {
  tutorialId: string;
  startStep?: number;
  onClose: () => void;
}

// Combine all available tutorials — extend as more are added
const ALL_TUTORIALS: Tutorial[] = [
  ...STEMGENEERS_TUTORIALS,
];

const TutorialViewer: React.FC<TutorialViewerProps> = ({ tutorialId, startStep = 0, onClose }) => {
  const tutorial = ALL_TUTORIALS.find(t => t.id === tutorialId);
  const [currentStep, setCurrentStep] = useState(startStep);

  useEffect(() => {
    setCurrentStep(startStep);
  }, [tutorialId, startStep]);

  if (!tutorial) {
    return (
      <div className="tv-drawer tv-drawer--open">
        <div className="tv-header">
          <span className="tv-title">Tutorial not found</span>
          <button className="tv-close" onClick={onClose}>×</button>
        </div>
        <div className="tv-body">
          <p className="tv-not-found">
            Tutorial "{tutorialId}" is not yet available.
            Check back soon — Neville is writing it.
          </p>
        </div>
      </div>
    );
  }

  const step = tutorial.steps[currentStep];
  const totalSteps = tutorial.steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="tv-drawer tv-drawer--open" role="complementary" aria-label={tutorial.title}>

      {/* Header */}
      <div className="tv-header">
        <div className="tv-header-left">
          <span className="tv-rov-avatar">🔧</span>
          <div>
            <div className="tv-title">{tutorial.title}</div>
            <div className="tv-meta">
              {tutorial.pathway} · {tutorial.duration} · {tutorial.difficulty}
            </div>
          </div>
        </div>
        <button className="tv-close" onClick={onClose} aria-label="Close tutorial">×</button>
      </div>

      {/* Progress bar */}
      <div className="tv-progress">
        <div className="tv-progress-track">
          <div className="tv-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="tv-progress-label">Step {currentStep + 1} of {totalSteps}</span>
      </div>

      {/* Step content */}
      <div className="tv-body">
        <div className="tv-step-number">Step {step.step}</div>
        <h3 className="tv-step-title">{step.title}</h3>
        <p className="tv-step-desc">{step.description}</p>

        {step.tip && (
          <div className="tv-tip">
            <span className="tv-tip-icon">💡</span>
            <p>{step.tip}</p>
          </div>
        )}

        {step.warning && (
          <div className="tv-warning">
            <span className="tv-warning-icon">⚠️</span>
            <p>{step.warning}</p>
          </div>
        )}
      </div>

      {/* Tools for this tutorial (shown on first step only) */}
      {isFirst && tutorial.tools && tutorial.tools.length > 0 && (
        <div className="tv-tools">
          <div className="tv-tools-label">What you'll need</div>
          <div className="tv-tools-list">
            {tutorial.tools.filter(t => t.essential).map((tool, i) => (
              <div key={i} className="tv-tool">
                <span className="tv-tool-name">{tool.name}</span>
                {tool.price && <span className="tv-tool-price">{tool.price}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="tv-nav">
        <button
          className="tv-btn tv-btn--secondary"
          onClick={() => setCurrentStep(s => s - 1)}
          disabled={isFirst}
        >
          ← Previous
        </button>

        <div className="tv-step-dots">
          {tutorial.steps.map((_, i) => (
            <button
              key={i}
              className={`tv-dot ${i === currentStep ? 'tv-dot--active' : i < currentStep ? 'tv-dot--done' : ''}`}
              onClick={() => setCurrentStep(i)}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        {isLast ? (
          <button className="tv-btn tv-btn--primary" onClick={onClose}>
            Done ✓
          </button>
        ) : (
          <button
            className="tv-btn tv-btn--primary"
            onClick={() => setCurrentStep(s => s + 1)}
          >
            Next →
          </button>
        )}
      </div>

    </div>
  );
};

export default TutorialViewer;
