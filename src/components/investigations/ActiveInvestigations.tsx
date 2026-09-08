import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  INVESTIGATIONS,
  STATUS_CONFIG,
  getInvestigation,
  type Investigation,
} from './investigationsData';
import './Investigations.css';

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVE INVESTIGATIONS
// The research-vessel principle, made member-facing.
//
// Wembley Wonders produces original findings as part of what it is. Some
// research turns up a real lead, an uncorroborated claim, and a genuinely
// open question — all at once. Those threads are held open here, honestly
// labelled, rather than forced to a false resolution or quietly dropped.
//
// URL state: ?id=<slug> opens one investigation. Every view is linkable.
// Full principle: docs/research/WW-RESEARCH-VESSEL-PRINCIPLE.md
// ─────────────────────────────────────────────────────────────────────────────

const StatusPill: React.FC<{ status: Investigation['status']; withNote?: boolean }> = ({
  status,
  withNote,
}) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className="inv-status" style={{ '--inv-status-colour': cfg.colour } as React.CSSProperties}>
      <span className="inv-status__dot" />
      <span className="inv-status__label">{cfg.label}</span>
      {withNote && <span className="inv-status__note">{cfg.note}</span>}
    </span>
  );
};

// ─── Index view ──────────────────────────────────────────────────────────────

const InvestigationsIndex: React.FC = () => (
  <div className="inv">
    <header className="inv-masthead">
      <div className="inv-container inv-masthead__inner">
        <div className="inv-provenance">
          <Link to="/" className="inv-crumb">Wembley Wonders</Link>
          <span className="inv-crumb-sep">›</span>
          <span className="inv-crumb-current">Active Investigations</span>
        </div>

        <h1 className="inv-masthead__title">
          Active<br /><em>Investigations</em>
        </h1>

        <p className="inv-masthead__tagline">
          Research held open, not forced to resolve.<br />
          Here is what we are still figuring out.
        </p>

        <div className="inv-masthead__mandate">
          <span className="inv-mandate-mark">◆</span>
          <p>
            Wembley Wonders was built as a research vessel, not only an archive and an
            academy. A vessel is allowed to come back with a real lead, an uncorroborated
            claim, and an open question at the same time — and say so plainly. These are
            those threads. Some of them, you can help dig.
          </p>
        </div>
      </div>
    </header>

    <main className="inv-content">
      <div className="inv-container">
        <div className="inv-list">
          {INVESTIGATIONS.map((inv) => (
            <Link
              key={inv.id}
              to={`/investigations/${inv.slug}`}
              className="inv-card"
            >
              <div className="inv-card__top">
                <StatusPill status={inv.status} />
                <span className="inv-card__meta">
                  Opened {inv.opened} · Reviewed {inv.lastReviewed}
                </span>
              </div>
              <h2 className="inv-card__title">{inv.title}</h2>
              <p className="inv-card__region">{inv.region}</p>
              <p className="inv-card__summary">{inv.summary}</p>
              <div className="inv-card__footer">
                <span className="inv-card__lens">{inv.lens}</span>
                <span className="inv-card__cta">
                  Open investigation
                  <span className="inv-card__counts">
                    {inv.confirmed.length} confirmed · {inv.openQuestions.length} open ·
                    {' '}{inv.corrections.length} corrected
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <aside className="inv-note">
          <h3>Why this section exists</h3>
          <p>
            Everywhere else on the platform, content ships when it is locked — complete,
            vetted, resolved. This section is the exception. An investigation here has a
            verified fact base, but it also has questions we have not answered and, in some
            cases, claims we are still testing. "Genuinely unclear" is a real answer, not a
            failure to finish.
          </p>
          <p>
            When a thread closes out, it moves into the settled record — a Knowledge Commons
            entry, a programme's course material — and the trail stays readable here.
          </p>
        </aside>
      </div>
    </main>
  </div>
);

// ─── Detail view ─────────────────────────────────────────────────────────────

const InvestigationDetail: React.FC<{ investigation: Investigation }> = ({
  investigation: inv,
}) => {
  const mailto =
    `mailto:${inv.contribute.email}` +
    `?subject=${encodeURIComponent(inv.contribute.emailSubject)}`;

  return (
    <div className="inv inv--detail">
      <header className="inv-detail-head">
        <div className="inv-container">
          <div className="inv-provenance">
            <Link to="/" className="inv-crumb">Wembley Wonders</Link>
            <span className="inv-crumb-sep">›</span>
            <Link to="/investigations" className="inv-crumb">Active Investigations</Link>
            <span className="inv-crumb-sep">›</span>
            <span className="inv-crumb-current">{inv.title}</span>
          </div>

          <Link to="/investigations" className="inv-back">← All investigations</Link>

          <StatusPill status={inv.status} withNote />

          <h1 className="inv-detail-title">{inv.title}</h1>
          <p className="inv-detail-region">{inv.region}</p>

          <dl className="inv-detail-meta">
            <div><dt>Opened</dt><dd>{inv.opened}</dd></div>
            <div><dt>Last reviewed</dt><dd>{inv.lastReviewed}</dd></div>
            <div><dt>Research lens</dt><dd>{inv.lens}</dd></div>
          </dl>
        </div>
      </header>

      <main className="inv-content inv-container">

        <section className="inv-section">
          <p className="inv-lede">{inv.summary}</p>
          <div className="inv-callout inv-callout--scope">
            <span className="inv-callout__tag">Scope</span>
            <p>{inv.scopeNote}</p>
          </div>
          <div className="inv-callout inv-callout--why">
            <span className="inv-callout__tag">Why it is held open</span>
            <p>{inv.whyOpen}</p>
          </div>
        </section>

        <section className="inv-section">
          <h2 className="inv-h2">
            <span className="inv-h2__mark inv-h2__mark--confirmed" />
            Confirmed — verified and sourced
          </h2>
          <ul className="inv-findings">
            {inv.confirmed.map((f, i) => (
              <li key={i} className="inv-finding">
                <p className="inv-finding__claim">{f.claim}</p>
                {f.detail && <p className="inv-finding__detail">{f.detail}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="inv-section">
          <h2 className="inv-h2">
            <span className="inv-h2__mark inv-h2__mark--uncorroborated" />
            Uncorroborated or contested — treat as competing claims
          </h2>
          <ul className="inv-findings">
            {inv.uncorroborated.map((f, i) => (
              <li key={i} className="inv-finding inv-finding--soft">
                <p className="inv-finding__claim">{f.claim}</p>
                {f.detail && <p className="inv-finding__detail">{f.detail}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="inv-section">
          <h2 className="inv-h2">
            <span className="inv-h2__mark inv-h2__mark--open" />
            Open questions
          </h2>
          <div className="inv-questions">
            {inv.openQuestions.map((q, i) => (
              <article key={i} className="inv-question">
                <h3 className="inv-question__q">{q.question}</h3>
                <p className="inv-question__row">
                  <span className="inv-question__key">Why it matters</span>
                  {q.whyItMatters}
                </p>
                <p className="inv-question__row">
                  <span className="inv-question__key">What would close it</span>
                  {q.whatWouldCloseIt}
                </p>
              </article>
            ))}
          </div>
        </section>

        {inv.corrections.length > 0 && (
          <section className="inv-section">
            <h2 className="inv-h2">
              <span className="inv-h2__mark inv-h2__mark--corrected" />
              Corrections made in this investigation
            </h2>
            <p className="inv-section__intro">
              Provided is not the same as verified. Catching a false claim is a finding in
              its own right — these were caught while checking the working file.
            </p>
            <ul className="inv-corrections">
              {inv.corrections.map((c, i) => (
                <li key={i} className="inv-correction">
                  <p className="inv-correction__was">
                    <span className="inv-correction__key">Was claimed</span>
                    {c.wasClaimed}
                  </p>
                  <p className="inv-correction__now">
                    <span className="inv-correction__key">Actually</span>
                    {c.actually}
                  </p>
                  <p className="inv-correction__when">Caught {c.caughtOn}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="inv-section inv-contribute">
          <h2 className="inv-h2">
            <span className="inv-h2__mark inv-h2__mark--dig" />
            Want to help dig?
          </h2>
          <p className="inv-contribute__lead">{inv.contribute.lead}</p>
          <ul className="inv-contribute__asks">
            {inv.contribute.asks.map((a, i) => (
              <li key={i}>
                <strong>{a.label}.</strong> {a.detail}
              </li>
            ))}
          </ul>
          <div className="inv-contribute__actions">
            <a className="inv-btn inv-btn--primary" href={mailto}>
              Email the research team →
            </a>
            {inv.crossLinks.map((l) =>
              l.internal ? (
                <Link key={l.href} className="inv-btn inv-btn--ghost" to={l.href}>
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  className="inv-btn inv-btn--ghost"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ),
            )}
          </div>
        </section>

        <section className="inv-section inv-provenance-block">
          <h2 className="inv-h2">Provenance</h2>
          <p>
            Full working file, with the complete correction log and every source:
            <br />
            <code className="inv-code">{inv.sourceDoc}</code>
          </p>
          <details className="inv-sources">
            <summary>Sources ({inv.sources.length})</summary>
            <ul>
              {inv.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </section>

      </main>
    </div>
  );
};

// ─── Shell ───────────────────────────────────────────────────────────────────

const ActiveInvestigations: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const id = slug ?? searchParams.get('id');
  const investigation = getInvestigation(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (id && investigation) {
    return <InvestigationDetail investigation={investigation} />;
  }

  return <InvestigationsIndex />;
};

export default ActiveInvestigations;
