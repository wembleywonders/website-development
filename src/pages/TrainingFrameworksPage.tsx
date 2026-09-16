import React from 'react';
import PageTemplate from '../components/PageTemplate';
import {
  TRAINING_MODULE_TITLE,
  TRAINING_MODULE_SUBTITLE,
  TRAINING_MODULE_AUDIENCE,
  TRAINING_OUTCOMES,
  FRAMEWORKS,
  PENDING_DECISIONS,
  REFLECTION_PROMPTS,
  GLOSSARY,
  SEE_ALSO,
  type FrameworkSection,
} from '../data/TrainingFrameworksData';
import './TrainingFrameworksPage.css';

/**
 * TrainingFrameworksPage.tsx
 * Wembley Wonders CIC — internal staff/ROV training module
 *
 * Route: /training/frameworks
 *
 * Renders WW-TRAINING-FRAMEWORKS-001 (v2). The one rule this page exists
 * to enforce visually: the four "embedded" frameworks and the one
 * "framing-only-pending-consultancy" framework are NOT interchangeable
 * entries in a flat list. They are rendered in separate sections with
 * different visual treatment, and the pending framework's caveat is a
 * standing warning callout, not a footnote.
 *
 * This page has no access control wired up — it is reachable by anyone
 * with the URL, same as every other page in this app at present. That is
 * an infrastructure gap, not a decision that internal-only content should
 * be public; flag it before treating this as launch-ready staff training.
 */

const embeddedFrameworks = FRAMEWORKS.filter((f) => f.status === 'embedded').sort(
  (a, b) => a.order - b.order
);
const pendingFrameworks = FRAMEWORKS.filter(
  (f) => f.status === 'framing-only-pending-consultancy'
).sort((a, b) => a.order - b.order);

const FrameworkCard: React.FC<{ framework: FrameworkSection; variant: 'embedded' | 'pending' }> = ({
  framework,
  variant,
}) => (
  <article className={`tf-card tf-card--${variant}`}>
    <header className="tf-card-header">
      <span className="tf-card-order">{framework.order}</span>
      <div>
        <h3 className="tf-card-title">{framework.title}</h3>
        <p className="tf-card-originator">{framework.originator}</p>
      </div>
      <span className={`tf-status-tag tf-status-tag--${variant}`}>
        {variant === 'embedded' ? 'Embedded' : 'Framing only — not yet designed'}
      </span>
    </header>

    {framework.caveat && (
      <div className="tf-caveat" role="note">
        <span className="tf-caveat-icon" aria-hidden="true">⚠</span>
        <div>
          <p className="tf-caveat-label">Not clinical policy</p>
          <p className="tf-caveat-body">{framework.caveat}</p>
        </div>
      </div>
    )}

    <dl className="tf-card-body">
      <dt>What it is</dt>
      <dd>{framework.whatItIs}</dd>

      <dt>Why WW uses it</dt>
      <dd>{framework.whyWWUsesIt}</dd>

      <dt>{variant === 'embedded' ? 'How it lives in WW' : 'Current status in WW'}</dt>
      <dd>{framework.howItLivesInWW}</dd>

      <dt>What this means for your role</dt>
      <dd>{framework.roleImplication}</dd>
    </dl>
  </article>
);

const TrainingFrameworksPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle={TRAINING_MODULE_TITLE}
      pageStrapline={TRAINING_MODULE_SUBTITLE}
      pageType="standard"
    >
      <div className="tf-content">
        <section className="tf-intro">
          <p className="tf-audience">
            <strong>Audience:</strong> {TRAINING_MODULE_AUDIENCE}
          </p>
          <h2>By the end of this module you should be able to:</h2>
          <ul className="tf-outcomes">
            {TRAINING_OUTCOMES.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>
        </section>

        <section className="tf-section">
          <h2 className="tf-section-title">Frameworks already embedded in WW's design</h2>
          <p className="tf-section-intro">
            These four describe things genuinely already true of how Wembley Wonders is built —
            not aspirations, not a shift in language, but the reasoning behind design decisions
            already live in the platform.
          </p>
          <div className="tf-card-grid">
            {embeddedFrameworks.map((f) => (
              <FrameworkCard key={f.id} framework={f} variant="embedded" />
            ))}
          </div>
        </section>

        <section className="tf-section tf-section--pending">
          <h2 className="tf-section-title">Framing adopted, design not yet built</h2>
          <p className="tf-section-intro">
            This entry is deliberately kept apart from the four above. It describes a shift in
            how staff talk about behaviour — not a designed, clinically-reviewed protocol. Treat
            it as an open question the organisation is holding, not a settled practice.
          </p>
          <div className="tf-card-grid">
            {pendingFrameworks.map((f) => (
              <FrameworkCard key={f.id} framework={f} variant="pending" />
            ))}
          </div>
        </section>

        {PENDING_DECISIONS.length > 0 && (
          <section className="tf-pending-decisions" role="note">
            <h2 className="tf-section-title">Pending decisions</h2>
            <p className="tf-pending-decisions-note">
              These are open governance/budget questions for CJ and Judith — not something to
              resolve by writing more thorough-sounding content underneath them.
            </p>
            <ul>
              {PENDING_DECISIONS.map((decision, i) => (
                <li key={i}>{decision}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="tf-section">
          <h2 className="tf-section-title">Reflection prompts</h2>
          <div className="tf-prompt-list">
            {REFLECTION_PROMPTS.map((p, i) => {
              const framework = FRAMEWORKS.find((f) => f.id === p.frameworkId);
              return (
                <div key={i} className="tf-prompt">
                  <span className="tf-prompt-framework">{framework?.title ?? p.frameworkId}</span>
                  <p>{p.prompt}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="tf-section">
          <h2 className="tf-section-title">Glossary</h2>
          <dl className="tf-glossary">
            {GLOSSARY.map((entry, i) => (
              <React.Fragment key={i}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        <section className="tf-see-also">
          <h2 className="tf-section-title">See also</h2>
          <ul>
            {SEE_ALSO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TrainingFrameworksPage;
