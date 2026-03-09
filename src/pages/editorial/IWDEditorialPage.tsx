/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * IWDEditorialPage
 * Route: /editorial/iwd-2026
 *
 * ARCHITECTURE NOTES:
 *   - After 31 March 2026, this route automatically redirects to
 *     /programmes/roots where the content lives permanently.
 *   - The redirect is client-side via React Router Navigate.
 *   - A server-side 301 redirect from /editorial/iwd-2026 to
 *     /programmes/roots should be added in the Cloudflare config
 *     once March ends, to handle direct URL access.
 *   - This page is editorially owned by Judith Fontanelle and her network.
 *     The structure below provides the container; content is populated
 *     via the CMS/Joystick editorial pipeline.
 *
 * CONTENT BRIEF (for Judith):
 *   Community voices responding to IWD 2026 — not reacting to mainstream
 *   coverage, but speaking from experience that mainstream coverage didn't
 *   include. The 27-women Independent article is reference context only.
 *   Primary voices: Wembley, Brent, Forgotten 60% women.
 *   Judith's trichologist journey (Enitan Agidee appointment chain)
 *   as a live proof-of-concept creator journey woven through the editorial.
 *   Rayd-yo body sovereignty series links from this page once live.
 */

import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './IWDEditorialPage.css';

// ============================================
// REDIRECT LOGIC
// ============================================

/**
 * After 31 March 2026, redirect permanently to /programmes/roots.
 * The IWD content lives there from 1 April onwards.
 *
 * This is checked at render time — no useEffect needed.
 * A hard-coded date is used rather than a CMS flag to ensure
 * the redirect works without a backend call.
 */
const IWD_ARCHIVE_DATE = new Date('2026-04-01T00:00:00Z');

const isPastArchiveDate = (): boolean => {
  return new Date() >= IWD_ARCHIVE_DATE;
};

// ============================================
// TYPES
// ============================================

interface VoiceEntry {
  id: string;
  contributor: string;
  location: string;
  quote: string;
  context: string;
  /** Links to their Joystick feature or Rayd-yo episode if live */
  link?: string;
  linkLabel?: string;
}

// ============================================
// PLACEHOLDER CONTENT
// (Replace with CMS data once Judith's editorial pipeline is live)
// ============================================

const EDITORIAL_VOICE_ENTRIES: VoiceEntry[] = [
  // Judith's editorial team will populate this via the Joystick CMS.
  // The structure below shows the data shape expected.
  // Placeholder entries are provided so the page renders during build.
  {
    id: 'placeholder-01',
    contributor: 'Judith Fontanelle',
    location: 'Wembley',
    quote: "The trichologist appointment was the first time in years someone looked at what was actually happening — not what it was supposed to look like.",
    context: "Director of Community Engagement, Wembley Wonders CIC. Her appointment with trichologist Enitan Agidee forms the first complete creator journey in the counter-archive.",
    link: '/programmes/roots',
    linkLabel: 'Read the full journey →'
  }
];

const MAINSTREAM_CONTRAST = {
  note: "In March 2026, a mainstream publication asked 27 prominent women one question for International Women's Day. All 27 spoke from establishment and success. None were from Brent. None had built something with no prior institutional access. The voices here are from that other place.",
  attribution: "Editorial frame, not criticism — those 27 women earned their platforms. This page is for the ones still building theirs."
};

// ============================================
// COMPONENT
// ============================================

const IWDEditorialPage: React.FC = () => {

  // ── Redirect after March 2026 ──────────────────────────────────────────
  if (isPastArchiveDate()) {
    return <Navigate to="/programmes/roots" replace />;
  }

  // ── Active March 2026 view ─────────────────────────────────────────────
  return (
    <div className="iwd-editorial-page">

      {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
      <header className="iwd-masthead">
        <div className="iwd-joystick-label">
          <span className="joystick-badge">Joystick</span>
          <span className="joystick-issue">IWD 2026 · Community Edition</span>
        </div>

        <h1 className="iwd-headline">
          The Room They Hadn't Been Given Yet
        </h1>

        <p className="iwd-standfirst">
          International Women's Day brought 27 prominent voices to the mainstream press.
          Here are the ones who weren't in that room — and what they're building instead.
        </p>

        <div className="iwd-byline">
          <span className="byline-credit">Curated by Judith Fontanelle, Director of Community Engagement</span>
          <span className="byline-date">March 2026</span>
        </div>
      </header>

      {/* ── EDITORIAL CONTEXT ────────────────────────────────────────────── */}
      <section className="iwd-context">
        <blockquote className="iwd-context-note">
          {MAINSTREAM_CONTRAST.note}
        </blockquote>
        <p className="iwd-context-attribution">
          {MAINSTREAM_CONTRAST.attribution}
        </p>
      </section>

      {/* ── VOICE ENTRIES ────────────────────────────────────────────────── */}
      <section className="iwd-voices">
        <h2 className="voices-heading">Community Voices</h2>

        {EDITORIAL_VOICE_ENTRIES.map(entry => (
          <article key={entry.id} className="voice-entry">
            <div className="voice-header">
              <span className="voice-contributor">{entry.contributor}</span>
              <span className="voice-location">{entry.location}</span>
            </div>

            <blockquote className="voice-quote">
              "{entry.quote}"
            </blockquote>

            <p className="voice-context">{entry.context}</p>

            {entry.link && (
              <Link to={entry.link} className="voice-link">
                {entry.linkLabel || 'Read more →'}
              </Link>
            )}
          </article>
        ))}

        {/* CMS hook — additional entries rendered dynamically by Joystick pipeline */}
        {/* TODO: wire to Joystick editorial API once Judith's content is ready */}
      </section>

      {/* ── RAYD-YO CONNECTION ───────────────────────────────────────────── */}
      <section className="iwd-raydyo">
        <div className="raydyo-callout">
          <span className="raydyo-badge">Rayd-yo</span>
          <h3 className="raydyo-heading">Body Sovereignty — the audio series</h3>
          <p className="raydyo-desc">
            A new series launching through Wembley Wonders community radio.
            Women's voices on health, agency, and what it means to own your body's story.
            Hosted by community contributors. Produced here.
          </p>
          <Link to="/raydyo" className="raydyo-link">
            Listen on Rayd-yo →
          </Link>
        </div>
      </section>

      {/* ── COUNTER-ARCHIVE NOTE ─────────────────────────────────────────── */}
      <section className="iwd-archive">
        <p className="archive-note">
          Every voice on this page is counter-archive certified.
          What is published here belongs to the contributor — permanently and provably.
        </p>
        <Link to="/programmes/roots" className="archive-link">
          Learn about the counter-archive →
        </Link>
      </section>

      {/* ── ARCHIVE NOTICE ───────────────────────────────────────────────── */}
      <aside className="iwd-archive-notice">
        <p>
          This page is live through March 2026. From April, it moves permanently to{' '}
          <Link to="/programmes/roots">Roots Knowledge Archive</Link> where it will
          remain as a certified community document.
        </p>
      </aside>

      {/* ── CONTRIBUTE ───────────────────────────────────────────────────── */}
      <section className="iwd-contribute">
        <h3>Add your voice</h3>
        <p>
          This editorial is open to community contributors through the end of March.
          Speak to Judith or any Wembley Wonders team member to be included.
        </p>
        <Link to="/get-started" className="btn-primary">
          Get involved →
        </Link>
      </section>

    </div>
  );
};

export default IWDEditorialPage;