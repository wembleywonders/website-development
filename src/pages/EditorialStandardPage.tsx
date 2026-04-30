import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditorialStandardPage.css';

// ─────────────────────────────────────────────────────────────────────────────
// EditorialStandardPage — Wembley Wonders CIC
// Route: /knowledge-commons?mode=framework  OR  /editorial-standard
//
// The six-question framework that governs every piece in the Knowledge Commons.
// Written to serve contributors, readers, researchers, funders, and
// professional collaborators — without feeling like it's trying to
// please everyone.
//
// Unifying thread: trust. Every audience is asking the same question:
// "Can I rely on this?" This page answers that once.
//
// April 2026 update:
//   — Earnings evidence standard section added between questions and closing.
//     The same six-question framework applied to the What the Work Paid
//     feature in Joystick. One section, consistent register.
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    number: '01',
    question: 'Who does this knowledge belong to?',
    body: `Not who wrote it down. Who carried it. Who lived it. Who would lose
something real if it disappeared without being recorded. The archive exists
to return knowledge to the communities it came from — not to curate it
on their behalf. Before anything enters the record, we ask: does the person
or community this knowledge belongs to know it's here, and do they recognise
it as theirs?`,
    forWhom: 'For contributors: you are not donating your knowledge. You are placing it in a record that remains yours.',
  },
  {
    number: '02',
    question: 'What would be lost if this wasn\'t recorded?',
    body: `This is the test of whether something belongs in the archive at all.
If the answer is "not much" — it doesn't belong here. If the answer is
"a technique, a name, a lineage, a way of doing things that exists in no
other written record" — it does. The Knowledge Commons is not a repository
for everything. It is a repository for what is genuinely at risk of being
lost. That discipline is what makes it worth building.`,
    forWhom: 'For researchers: every item here passed this test. That is the basis for citation.',
  },
  {
    number: '03',
    question: 'Who is missing from this account?',
    body: `Every piece of received history has an absence engineered into it.
The editorial standard requires us to name the gap — the voice not quoted,
the perspective not sought, the community present in the story but absent
from the telling. We do not pretend completeness. We mark incompleteness
honestly, and treat that marking as part of the record rather than a
disclaimer attached to it.`,
    forWhom: 'For educators: the gaps are documented. Students can see where the research ends and the questions begin.',
  },
  {
    number: '04',
    question: 'Does this extract or does it return?',
    body: `Extraction takes knowledge out of a community and deposits value
elsewhere. Academic papers written about communities that never see them.
Documentaries that tour festivals but never come back. Oral histories
filed in institutions the community cannot access. This archive is built
on the opposite principle. Knowledge recorded here stays accessible to
the people it came from — attributed, owned, searchable, and returnable
on their terms.`,
    forWhom: 'For funders: anti-extraction is not a value statement. It is a structural commitment embedded in how the archive is built and governed.',
  },
  {
    number: '05',
    question: 'Can the person this is about recognise themselves in it?',
    body: `The dignity test. If the subject read this account, would they say
"yes, that is me, that is mine, that is true"? Or would they feel observed,
reduced, exoticised, or quietly misrepresented in ways that are hard to
name but unmistakable to experience? This question cannot be answered
without asking the person. So we ask. That conversation is part of the
editorial process, not a courtesy added afterwards.`,
    forWhom: 'For collaborators: this is the standard we hold our content to. It is also the standard we bring to any partnership.',
  },
  {
    number: '06',
    question: 'What does this connect to?',
    body: `No piece of knowledge exists in isolation. Every contribution to
the archive is required to name its lineages — what it comes from, what
it speaks to, what it sits alongside in the wider record. This is not
academic referencing for its own sake. It is how the archive becomes
a map rather than a list. A reader following connections through the
Knowledge Commons should be able to trace a thread from a single story
in Wembley to the broader patterns of the Black Atlantic, the Caribbean
diaspora, the long history of this borough. That tracability is the
difference between a collection and a commons.`,
    forWhom: 'For researchers and journalists: every item is positioned within a wider context. The connections are part of the record.',
  },
];

const EditorialStandardPage: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="es-page">

      {/* ── Atmosphere ───────────────────────────────────────────── */}
      <div className="es-atmosphere">
        <div className="es-atm-orb es-atm-orb--1" />
        <div className="es-atm-orb es-atm-orb--2" />
        <div className="es-atm-grain" />
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────── */}
      <nav className="es-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/heritage">Knowledge Commons</Link>
        <span>›</span>
        <span>Editorial Standard</span>
      </nav>

      {/* ── Opening declaration ──────────────────────────────────── */}
      <header className="es-header">
        <div className="es-header-inner">
          <p className="es-overline">The Knowledge Commons</p>
          <h1 className="es-title">
            The Editorial<br />
            <em>Standard</em>
          </h1>
          <div className="es-opening">
            <p className="es-opening-lead">
              Everything in the Knowledge Commons was measured against
              six questions before it entered the record.
            </p>
            <p className="es-opening-body">
              Not guidelines. Not aspirations. Questions that every contribution
              must be able to answer — and that we must be able to answer on
              behalf of every contribution we accept. This standard exists
              because the communities whose knowledge this archive holds deserve
              more than good intentions. They deserve a method.
            </p>
            <p className="es-opening-body">
              If you are a contributor, these questions describe what we will
              ask of your submission. If you are a researcher or educator,
              they describe the basis on which you can rely on what you find
              here. If you are considering a partnership or funding relationship
              with Wembley Wonders, they describe how we work.
            </p>
          </div>
        </div>
      </header>

      {/* ── The six questions ────────────────────────────────────── */}
      <section className="es-questions">
        <div className="es-questions-inner">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              ref={el => { itemRefs.current[i] = el; }}
              className={`es-question ${visibleItems.has(i) ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <div className="es-q-number">{q.number}</div>
              <div className="es-q-content">
                <h2 className="es-q-title">{q.question}</h2>
                <p className="es-q-body">{q.body}</p>
                <p className="es-q-audience">{q.forWhom}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Earnings evidence standard ───────────────────────────── */}
      {/* The same six-question framework applied to the What the Work  */}
      {/* Paid earnings evidence series in Joystick. The standard is    */}
      {/* not suspended because the subject is money. It is more        */}
      {/* important because the subject is money.                       */}
      <section className="es-questions es-earnings-standard">
        <div className="es-questions-inner">
          <div className="es-question visible" style={{ paddingTop: 0 }}>
            <div className="es-q-number" style={{ opacity: 1, color: 'var(--gold)' }}>
              ◈
            </div>
            <div className="es-q-content">
              <p className="es-overline" style={{ marginBottom: '0.875rem' }}>
                Applied to earnings evidence
              </p>
              <h2 className="es-q-title">What the Work Paid</h2>
              <p className="es-q-body">
                The same standard that governs the Knowledge Commons governs
                the earnings evidence we publish in Joystick. Every entry in
                the What the Work Paid series is real income from a real creator,
                published with their explicit consent, anonymised to protect
                their identity, and representative of what most people earn —
                not the ceiling.
              </p>
              <p className="es-q-body" style={{ marginTop: '1rem' }}>
                We publish the ordinary months alongside the strong ones. We do
                not curate only the best results. A platform that publishes only
                its highest earners is doing what every other platform does —
                leading with the exception and burying the floor. This standard
                requires us to be honest about both. The floor is real. The
                trajectory from the floor is also real. Both belong in the record.
              </p>
              <p className="es-q-body" style={{ marginTop: '1rem' }}>
                The six questions apply here as they apply everywhere. Does this
                reflect what the creator actually experienced? Would they
                recognise themselves in it? Does it return value to them rather
                than extracting it? Is the gap between what was earned and what
                could be earned named honestly? Those questions are not suspended
                because the subject is money. They are more important because
                the subject is money.
              </p>
              <p className="es-q-audience" style={{ marginTop: '1.25rem' }}>
                For potential members: the figures we publish are what most
                people earn, not what some people reach. When you earn more —
                and you will — it's yours to enjoy. That surprise is more useful
                to you than a promise that turns out to be an exception.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/joystick" className="es-action es-action--secondary">
                  Read What the Work Paid in Joystick →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing statement ────────────────────────────────────── */}
      <section className="es-closing">
        <div className="es-closing-inner">
          <blockquote className="es-closing-quote">
            "The standard is not a filter that keeps things out.
            It is a commitment to the people whose knowledge
            we are asking to trust us with."
          </blockquote>
          <p className="es-closing-sig">
            Wembley Wonders CIC · Knowledge Commons Editorial Board
          </p>
          <div className="es-closing-actions">
            <Link to="/heritage" className="es-action es-action--primary">
              Enter the Knowledge Commons →
            </Link>
            <Link to="/manifesto" className="es-action es-action--secondary">
              Read the Manifesto
            </Link>
            <Link to="/contact" className="es-action es-action--secondary">
              Contribute to the archive
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EditorialStandardPage;