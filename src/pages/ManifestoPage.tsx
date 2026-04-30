/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * ManifestoPage — The Wembley Wonders Manifesto
 * Route: /manifesto
 *
 * "Our Work → The Wembley Wonders Manifesto"
 * Read this first.
 *
 * Structured in seven declarations — each one a complete thought
 * that stands alone, each one building on the last.
 * Editorial long-form. No tabs. No carousels. Just the argument.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ManifestoPage.css';

// ─────────────────────────────────────────────────────────────
// MANIFESTO CONTENT
// Seven declarations. The argument in full.
// ─────────────────────────────────────────────────────────────

const DECLARATIONS = [
  {
    number: 'I',
    title: 'The wealth is already here.',
    body: [
      'Wembley is one of the most culturally dense places on earth. One hundred and forty-eight nationalities. Centuries of migration, adaptation, and survival layered into a single borough. The knowledge carried by the people who live here — how to cook, how to build, how to negotiate, how to remember, how to raise children across cultures, how to hold a community together when the institutions that were supposed to help have failed — is extraordinary.',
      'None of it appears on any balance sheet. None of it is counted in any measure of local productivity. The people who hold it are routinely described as disadvantaged, hard to reach, in need of intervention.',
      'That is the first lie we are here to correct. The wealth is already here. It just hasn\'t been recognised, recorded, or rewarded.',
    ]
  },
  {
    number: 'II',
    title: 'The system was not built for the people we serve.',
    body: [
      'There is a category of person that the creative economy talks about constantly but serves almost never. Not the celebrated prodigy. Not the beneficiary of a grant scheme designed for someone else. Not the person who fits the diversity quota without disrupting the hierarchy.',
      'We call them the Forgotten 60%. The steady workers. The parents. The craftspeople. The people whose talent was never questioned — it was simply never asked for. They were not excluded by malice. They were excluded by design: by systems that mistake polish for quality, credentials for capability, and proximity to existing power for potential.',
      'Consider Jimmy. He lives in Dunstable. He is not Caribbean, not from Wembley, not part of any diaspora. He is a 58-year-old former engineer with thirty years of practical knowledge and no platform to share it. If this platform only works for people who already look like its founders, it has failed. The Forgotten 60% includes Jimmy. It includes everyone whose knowledge has been treated as invisible.',
      'We built this for them.',
    ]
  },
  {
    number: 'III',
    title: 'Knowledge that stays unshared is knowledge at risk.',
    body: [
      'Every generation, an enormous quantity of knowledge disappears. Not because it was wrong. Not because it was superseded. Because the people who held it died without being asked.',
      'The provenance of a recipe. The technique behind a textile pattern. The oral history of a community that never made it into the official archive. The negotiating wisdom of a market trader. The engineering intuition of someone who learned by doing rather than by studying. These are not anecdotes. They are intellectual property. They are culture. They are the material from which the next generation builds.',
      'Wembley Wonders exists to interrupt that loss. The Heritage Knowledge Commons, the Joystick e-zine, the Rayd-yo radio archive, the Roots programme, the Pageturners writing track — these are not nice-to-haves. They are the core of the argument: that community knowledge, properly documented and attributed, is worth preserving, sharing, and being paid for.',
    ]
  },
  {
    number: 'IV',
    title: 'Extraction is not partnership.',
    body: [
      'The creative economy has developed a sophisticated language for taking from communities without giving back. It is the language of partnership, of uplift, of empowerment. It arrives with lanyard-wearing facilitators, impact reports, and funding cycles that end just as the community starts to trust them.',
      'We have seen this pattern up close. We have watched organisations parachute into Wembley, extract the stories, the images, the cultural data, and leave. We have seen creators hand their best work to platforms that take 30%, 40%, 50% — and call it opportunity.',
      'The 55/25/20 model is not a revenue policy. It is a position. Fifty-five percent to the creator who made the work. Twenty-five percent to the community reserve that funds the next creator. Twenty percent to the operations that make the platform possible. Not because it is generous. Because it is correct. Because extraction dressed as opportunity is still extraction.',
      'We are not here to help creators succeed on someone else\'s terms. We are here to build the infrastructure that makes their terms possible.',
    ]
  },
  {
    number: 'V',
    title: 'The platform is the argument made visible.',
    body: [
      'Every decision in this platform is a position.',
      'The 55/25/20 split is a position on who owns the value of creative work. The Heritage Knowledge Commons is a position on whose history matters. The Kaywana\'s Court governance structure is a position on who gets to make decisions. The fact that Maya asks "what do you know that nobody taught you?" rather than "what are your credentials?" is a position on what capability looks like.',
      'The two Houses — the Connoisseurs Club and the Passionistas Fan Club — are a position on the difference between making and amplifying, and on the equal dignity of both. The Roots programme is a position on body sovereignty and the right of women to define their own standards of care. The 13 programmes are a position on the range of human capability and the narrowness of what the mainstream economy rewards.',
      'None of this is accidental. All of it is chosen. The platform is not the delivery mechanism for the argument — it is the argument itself, made tangible and interactive and open to everyone who wants to participate in it.',
    ]
  },
  {
    number: 'VI',
    title: 'Community self-determination over grant dependency.',
    body: [
      'Grants are not income. They are permission. Permission to exist, on someone else\'s timeline, for someone else\'s purposes, measured against someone else\'s definition of impact.',
      'We have nothing against grants as a source of early capital. We have everything against grants as a permanent operating model. A community organisation that can only survive with external funding is an organisation that can be defunded. An organisation whose survival depends on making its community legible to funders is an organisation that will, eventually, start designing its community for the funders rather than for itself.',
      'The goal is a platform that is owned by the people who use it, funded by the value it creates, and accountable to no external body whose interests diverge from the community\'s. The community reserve — the 25% — is not savings. It is sovereignty. It is the fund from which the community decides what to do next, without asking anyone\'s permission.',
      'We are seventeen years into this work. The platform is the infrastructure that makes the next seventeen years independent.',
    ]
  },
  {
    number: 'VII',
    title: 'This is not preparation for somewhere else. This is the place.',
    body: [
      'The most corrosive thing said to talented people in communities like ours is: "This is a great stepping stone." As though Wembley is a waiting room. As though the value of what is built here is only realised when it gets noticed somewhere else.',
      'We reject that framing completely.',
      'The work made here is for here first. The archive is ours. The revenue stays here. The governance is here. The knowledge produced on this platform — the music, the writing, the heritage documentation, the technical prototypes, the radio shows, the theatrical productions — belongs to the people who made it, in the community that shaped them.',
      'If it travels further, that is its right. If it reaches audiences beyond Wembley, that is its power. But it does not need external validation to be real. It is real because the people who made it are real. Because the community that holds it is real. Because the knowledge it carries has been real for generations, waiting for a platform worthy of it.',
      'That platform is this one. The work starts now.',
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export const ManifestoPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection observer for scroll-activated nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(i);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(ref);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <div className="mf-page">

      {/* ── Atmosphere ── */}
      <div className="mf-atmosphere" aria-hidden="true">
        <div className="mf-atm-orb mf-atm-orb--1" />
        <div className="mf-atm-orb mf-atm-orb--2" />
        <div className="mf-atm-grain" />
      </div>

      {/* ── Header ── */}
      <header className="mf-header">
        <nav className="mf-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/about#revenue-model">Our Work</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">The Manifesto</span>
        </nav>

        <div className="mf-title-block">
          <p className="mf-eyebrow">◆ Wembley Wonders CIC · Est. 2020</p>
          <h1 className="mf-title">The Manifesto</h1>
          <p className="mf-subtitle">
            What we are building and why.<br />
            <em>Read this first.</em>
          </p>
          <p className="mf-meta">
            Seven declarations · Company No. 12960817
          </p>
        </div>
      </header>

      {/* ── Body: sticky nav + scrolling text ── */}
      <div className="mf-body">

        {/* Sticky declaration nav — desktop */}
        <aside className="mf-nav" aria-label="Declaration navigation">
          <p className="mf-nav-label">Declarations</p>
          <ol className="mf-nav-list">
            {DECLARATIONS.map((d, i) => (
              <li key={d.number}>
                <a
                  href={`#declaration-${d.number}`}
                  className={`mf-nav-link ${activeSection === i ? 'mf-nav-link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <span className="mf-nav-numeral">{d.number}</span>
                  <span className="mf-nav-title">{d.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Declarations */}
        <main className="mf-content">
          {DECLARATIONS.map((d, i) => (
            <section
              key={d.number}
              id={`declaration-${d.number}`}
              className="mf-declaration"
              ref={el => { sectionRefs.current[i] = el; }}
            >
              <div className="mf-declaration-header">
                <span className="mf-numeral" aria-hidden="true">{d.number}</span>
                <h2 className="mf-declaration-title">{d.title}</h2>
              </div>
              <div className="mf-declaration-body">
                {d.body.map((para, j) => (
                  <p key={j} className={para.length < 60 ? 'mf-para mf-para--emphasis' : 'mf-para'}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {/* ── Closing mark ── */}
          <div className="mf-closing">
            <span className="mf-closing-mark">◆</span>
            <p className="mf-closing-text">
              Wembley Wonders CIC · Company No. 12960817<br />
              452 High Road, Wembley HA9 7AY
            </p>
            <div className="mf-closing-actions">
              <Link to="/join" className="mf-cta mf-cta--primary">
                Join the platform →
              </Link>
              <Link to="/programmes" className="mf-cta mf-cta--outline">
                See the programmes
              </Link>
              <Link to="/about" className="mf-cta mf-cta--ghost">
                Meet the founders
              </Link>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default ManifestoPage;