import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// AboutUs — Our Story
// Route: /about  (linked from Who We Are → Our Story in Header)
//
// Architecture:
//   Section 1 — MASTHEAD: Judith's direct address. Warm, no nonsense.
//   Section 2 — THE NUMBERS: UK Music "Black Music Means Business" (March 2026)
//   Section 3 — THREE LAYERS: the structural argument for potential members
//   Section 4 — HOW IT STARTED: the origin story. Windrush, Wembley, 2020.
//   Section 5 — CTA SPLIT: creators (Join) / public/press (Manifesto)
//
// Voice: Judith. Warm, direct, no corporate softness.
// Audiences: (A) Potential members/creators — need to feel seen + called
//            (B) Public / press / partners — need to understand what this is
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  {
    value: '£24.5bn',
    label: 'contributed to the UK music industry by Black music over 30 years',
    source: 'UK Music, Black Music Means Business, March 2026',
  },
  {
    value: '80%',
    label: 'of total UK music industry value driven by Black music genres',
    source: 'UK Music, Black Music Means Business, March 2026',
  },
  {
    value: '22%',
    label: 'of senior music industry roles held by Black or minority ethnic professionals — in a city that is 46% non-white',
    source: 'UK Music Diversity Report, 2024',
  },
  {
    value: '20%',
    label: 'documented pay gap for Black artists and industry professionals',
    source: 'Black Lives in Music, 2021',
  },
];

const LAYERS = [
  {
    number: '01',
    title: 'Your earnings come back to you',
    sub: 'Individual creator economics',
    body: `On every major platform, the deal is the same: you create, they
    take the biggest share. Here, 55% of every pound generated goes
    directly to you. Not after fees, not after algorithms decide how
    often to show your work. Directly to you. That's the floor, not
    the ceiling.`,
    icon: '◈',
    accent: '#C9A84C',
  },
  {
    number: '02',
    title: 'The community keeps a share too',
    sub: 'Community economic infrastructure',
    body: `25% of every pound generated flows into a community pool —
    governed collectively, accountable to members. Not to shareholders
    in San Francisco. Not to a board none of you elected. This is the
    pardner hand principle — a Caribbean economic tradition centuries
    older than fintech — applied to a creator economy. Value that
    the community generates stays inside the community that built it.`,
    icon: '◉',
    accent: '#7EB8A0',
  },
  {
    number: '03',
    title: 'The culture stays authored',
    sub: 'Cultural memory and sovereignty',
    body: `Garage. Grime. Drum and bass. Jungle. Lovers rock. Patwa.
    Sound system culture. These didn't appear from nowhere. They came
    from specific people, in specific places, holding specific memories.
    Wembley Wonders is the infrastructure that keeps those names
    attached to that work — through the Knowledge Commons, through
    Rayd-yo, through Maya and the Children of Anansi. Culture memory
    with an economic engine attached.`,
    icon: '◆',
    accent: '#B87BAA',
  },
];

// ── Intersection-observer based fade-in hook ─────────────────────────────────
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

// ── Individual fade wrapper ──────────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
const AboutUs: React.FC = () => {
  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', color: '#F0EDE6' }}>

      {/* ══ FONTS ══════════════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .about-page * { box-sizing: border-box; }

        /* ── masthead ── */
        .about-masthead {
          position: relative;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(24px, 6vw, 96px) clamp(60px, 10vh, 120px);
          overflow: hidden;
        }
        .about-masthead-grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }
        .about-masthead-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .about-masthead-orb-1 {
          width: 520px; height: 520px;
          top: -80px; right: -120px;
          background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%);
        }
        .about-masthead-orb-2 {
          width: 360px; height: 360px;
          bottom: 60px; left: -60px;
          background: radial-gradient(circle, rgba(126,184,160,0.12) 0%, transparent 70%);
        }
        .about-masthead-inner { position: relative; z-index: 1; max-width: 860px; }
        .about-masthead-provenance {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 32px;
          display: flex; align-items: center; gap: 10px;
        }
        .about-masthead-provenance a { color: #C9A84C; text-decoration: none; }
        .about-masthead-provenance a:hover { text-decoration: underline; }
        .about-masthead-sep { opacity: 0.4; }
        .about-masthead-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.45);
          margin-bottom: 20px;
        }
        .about-masthead-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(48px, 7vw, 96px);
          line-height: 1.02;
          font-weight: 400;
          color: #F0EDE6;
          margin: 0 0 40px;
          letter-spacing: -0.02em;
        }
        .about-masthead-title em {
          font-style: italic;
          color: #C9A84C;
        }
        .about-masthead-lede {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(20px, 2.4vw, 28px);
          font-style: italic;
          line-height: 1.5;
          color: rgba(240,237,230,0.82);
          max-width: 660px;
          margin: 0 0 48px;
        }
        .about-masthead-scroll {
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
        }
        .about-masthead-scroll-line {
          width: 40px; height: 1px;
          background: rgba(240,237,230,0.25);
        }

        /* ── divider mark ── */
        .about-divider {
          display: flex; align-items: center; gap: 16px;
          padding: clamp(40px, 6vw, 80px) clamp(24px, 6vw, 96px) 0;
        }
        .about-divider-mark {
          color: #C9A84C; font-size: 18px; flex-shrink: 0;
        }
        .about-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, rgba(201,168,76,0.4), rgba(201,168,76,0));
        }

        /* ── judith direct address ── */
        .about-judith {
          padding: clamp(48px, 7vw, 96px) clamp(24px, 6vw, 96px);
          max-width: 1100px;
        }
        .about-judith-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7EB8A0;
          margin-bottom: 28px;
        }
        .about-judith-body {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(22px, 2.6vw, 32px);
          font-style: italic;
          line-height: 1.58;
          color: rgba(240,237,230,0.88);
          max-width: 780px;
        }
        .about-judith-body strong {
          font-style: normal;
          color: #F0EDE6;
        }
        .about-judith-sig {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(240,237,230,0.45);
          margin-top: 36px;
          letter-spacing: 0.06em;
        }

        /* ── stats strip ── */
        .about-stats {
          padding: clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px);
          border-top: 1px solid rgba(201,168,76,0.15);
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .about-stats-header {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
          margin-bottom: 48px;
        }
        .about-stats-header span {
          color: #C9A84C;
          margin-right: 8px;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2px;
        }
        .about-stat-card {
          padding: 36px 32px;
          border: 1px solid rgba(240,237,230,0.07);
          background: rgba(240,237,230,0.02);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }
        .about-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #C9A84C;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s ease;
        }
        .about-stat-card:hover::before { transform: scaleY(1); }
        .about-stat-card:hover { border-color: rgba(201,168,76,0.25); }
        .about-stat-value {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(36px, 4vw, 54px);
          color: #C9A84C;
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .about-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(240,237,230,0.7);
          margin-bottom: 12px;
        }
        .about-stat-source {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.28);
        }
        .about-stats-context {
          margin-top: 40px;
          padding: 28px 32px;
          border-left: 2px solid #7EB8A0;
          background: rgba(126,184,160,0.05);
        }
        .about-stats-context p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(240,237,230,0.65);
          margin: 0;
        }
        .about-stats-context strong { color: #7EB8A0; }

        /* ── market question ── */
        .about-question {
          padding: clamp(60px, 8vw, 120px) clamp(24px, 6vw, 96px);
          max-width: 1100px;
        }
        .about-question-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .about-question-pair { grid-template-columns: 1fr; gap: 32px; }
        }
        .about-question-item {
          padding: 40px;
          border: 1px solid rgba(240,237,230,0.08);
          position: relative;
        }
        .about-question-item--other {
          background: rgba(240,237,230,0.025);
          opacity: 0.55;
        }
        .about-question-item--us {
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.04);
        }
        .about-question-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .about-question-label--other { color: rgba(240,237,230,0.3); }
        .about-question-label--us    { color: #C9A84C; }
        .about-question-text {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(20px, 2.2vw, 26px);
          line-height: 1.4;
          color: rgba(240,237,230,0.75);
        }
        .about-question-item--us .about-question-text {
          color: #F0EDE6;
          font-style: italic;
        }

        /* ── three layers ── */
        .about-layers {
          padding: clamp(60px, 8vw, 100px) clamp(24px, 6vw, 96px);
          border-top: 1px solid rgba(240,237,230,0.06);
        }
        .about-layers-header {
          margin-bottom: 56px;
        }
        .about-layers-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
          margin-bottom: 16px;
        }
        .about-layers-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3vw, 42px);
          color: #F0EDE6;
          font-weight: 400;
          max-width: 600px;
          line-height: 1.2;
        }
        .about-layer {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 0 40px;
          padding: 48px 0;
          border-top: 1px solid rgba(240,237,230,0.07);
          align-items: start;
        }
        @media (max-width: 600px) {
          .about-layer { grid-template-columns: 1fr; gap: 20px; }
        }
        .about-layer-num-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 4px;
        }
        .about-layer-icon {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .about-layer-number {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(240,237,230,0.2);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .about-layer-content {}
        .about-layer-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .about-layer-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(22px, 2.4vw, 30px);
          color: #F0EDE6;
          font-weight: 400;
          margin-bottom: 20px;
          line-height: 1.25;
        }
        .about-layer-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.72;
          color: rgba(240,237,230,0.62);
          max-width: 620px;
        }

        /* ── origin story ── */
        .about-origin {
          padding: clamp(60px, 8vw, 100px) clamp(24px, 6vw, 96px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
          border-top: 1px solid rgba(240,237,230,0.06);
        }
        @media (max-width: 800px) {
          .about-origin { grid-template-columns: 1fr; gap: 40px; }
        }
        .about-origin-left {}
        .about-origin-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7EB8A0;
          margin-bottom: 24px;
        }
        .about-origin-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 400;
          color: #F0EDE6;
          line-height: 1.22;
          margin-bottom: 32px;
        }
        .about-origin-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.72;
          color: rgba(240,237,230,0.62);
        }
        .about-origin-body p { margin: 0 0 20px; }
        .about-origin-body p:last-child { margin: 0; }
        .about-origin-right {
          padding-top: 8px;
        }
        .about-origin-facts {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .about-origin-fact {
          padding: 24px 28px;
          background: rgba(240,237,230,0.03);
          border: 1px solid rgba(240,237,230,0.07);
        }
        .about-origin-fact-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.3);
          margin-bottom: 8px;
        }
        .about-origin-fact-value {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 18px;
          color: #F0EDE6;
        }
        .about-origin-fact-value em {
          font-style: italic;
          color: #C9A84C;
        }

        /* ── cic note ── */
        .about-cic {
          padding: 32px clamp(24px, 6vw, 96px);
          background: rgba(240,237,230,0.025);
          border-top: 1px solid rgba(240,237,230,0.06);
          border-bottom: 1px solid rgba(240,237,230,0.06);
        }
        .about-cic-inner {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          max-width: 900px;
        }
        .about-cic-mark {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7EB8A0;
          background: rgba(126,184,160,0.1);
          padding: 6px 12px;
          border: 1px solid rgba(126,184,160,0.25);
          flex-shrink: 0;
        }
        .about-cic-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(240,237,230,0.4);
          line-height: 1.5;
        }

        /* ── CTA split ── */
        .about-cta {
          padding: clamp(60px, 8vw, 100px) clamp(24px, 6vw, 96px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }
        @media (max-width: 700px) {
          .about-cta { grid-template-columns: 1fr; }
        }
        .about-cta-panel {
          padding: 56px 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }
        .about-cta-panel--creator {
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.25);
        }
        .about-cta-panel--public {
          background: rgba(240,237,230,0.025);
          border: 1px solid rgba(240,237,230,0.08);
        }
        .about-cta-audience {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(240,237,230,0.35);
        }
        .about-cta-panel--creator .about-cta-audience { color: #C9A84C; }
        .about-cta-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 400;
          color: #F0EDE6;
          line-height: 1.25;
        }
        .about-cta-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(240,237,230,0.58);
          flex: 1;
        }
        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 16px 28px;
          border: 1px solid;
          transition: all 0.3s ease;
          align-self: flex-start;
          cursor: pointer;
        }
        .about-cta-btn--creator {
          color: #0E0E0E;
          background: #C9A84C;
          border-color: #C9A84C;
        }
        .about-cta-btn--creator:hover {
          background: #D4B86A;
          border-color: #D4B86A;
        }
        .about-cta-btn--public {
          color: rgba(240,237,230,0.7);
          background: transparent;
          border-color: rgba(240,237,230,0.2);
        }
        .about-cta-btn--public:hover {
          color: #F0EDE6;
          border-color: rgba(240,237,230,0.5);
        }

        /* ── responsive ── */
        @media (max-width: 480px) {
          .about-cta-panel { padding: 40px 28px; }
          .about-judith { padding: 40px 24px; }
          .about-layers { padding: 40px 24px; }
          .about-origin { padding: 40px 24px; }
          .about-stats  { padding: 40px 24px; }
          .about-question { padding: 40px 24px; }
        }
      `}</style>

      <div className="about-page">

        {/* ══ MASTHEAD ════════════════════════════════════════════════════════ */}
        <section className="about-masthead">
          <div className="about-masthead-grain" />
          <div className="about-masthead-orb about-masthead-orb-1" />
          <div className="about-masthead-orb about-masthead-orb-2" />

          <div className="about-masthead-inner">
            <div
              className="about-masthead-provenance"
              style={{
                opacity: 1,
                animation: 'none',
              }}
            >
              <Link to="/">Wembley Wonders</Link>
              <span className="about-masthead-sep">›</span>
              <span>Our Story</span>
            </div>

            <p className="about-masthead-eyebrow">Who We Are · Why We Built This</p>

            <h1 className="about-masthead-title">
              The community<br />
              that built the culture<br />
              <em>owns its future.</em>
            </h1>

            <p className="about-masthead-lede">
              Wembley Wonders is a community creator economy — built in Brent,
              designed from the ground up for the people who made British culture
              what it is, and who still haven't been paid for it.
            </p>

            <div className="about-masthead-scroll">
              <span className="about-masthead-scroll-line" />
              <span>Our story</span>
            </div>
          </div>
        </section>

        {/* ══ JUDITH DIRECT ADDRESS ═══════════════════════════════════════════ */}
        <section className="about-judith">
          <FadeIn>
            <p className="about-judith-label">From Judith, Co-Founder</p>
            <p className="about-judith-body">
              I've been in this community for years. I've watched people here
              create things that went around the world — <strong>music, language,
              fashion, ideas</strong> — and I've watched the money and the credit
              go somewhere else every single time.
              <br /><br />
              That's not bad luck. That's a system working exactly as it was
              designed to. We didn't build Wembley Wonders to complain about that
              system. We built it to <strong>replace it.</strong>
              <br /><br />
              This is your platform. The earnings are yours. The governance is
              yours. The culture stays authored.
              <br /><br />
              Come and build with us.
            </p>
            <p className="about-judith-sig">— Judith Fontanelle, Co-Founder, Wembley Wonders CIC</p>
          </FadeIn>
        </section>

        {/* ══ THE NUMBERS ═════════════════════════════════════════════════════ */}
        <section className="about-stats">
          <FadeIn>
            <p className="about-stats-header">
              <span>◆</span>
              The evidence — UK Music, Black Music Means Business, March 2026
            </p>
          </FadeIn>

          <div className="about-stats-grid">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="about-stat-card">
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                  <div className="about-stat-source">{s.source}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={340}>
            <div className="about-stats-context">
              <p>
                In March 2026, UK Music published the first report of its kind in Europe
                to measure the economic value of Black music in Britain. The finding:
                <strong> 80% of the UK music industry's total value — £24.5 billion over
                30 years</strong> — comes from Black music genres rooted in Caribbean and
                African heritage. The same report found that Black artists and professionals
                hold just 22% of senior industry roles and face a documented 20% pay gap.
                This is not a gap in talent. It is a gap in infrastructure.
                Wembley Wonders is that infrastructure.
              </p>
              <p style={{ marginTop: '16px', marginBottom: 0 }}>
                <a
                  href="https://www.ukmusic.org/equality-diversity/black-music-means-business/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,237,230,0.35)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(240,237,230,0.18)',
                    paddingBottom: '1px',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#C9A84C';
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(201,168,76,0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,237,230,0.35)';
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(240,237,230,0.18)';
                  }}
                >
                  Read the full report: Black Music Means Business, UK Music, March 2026 ↗
                </a>
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ══ THE QUESTION ════════════════════════════════════════════════════ */}
        <section className="about-question">
          <FadeIn>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase' as const,
              color: 'rgba(240,237,230,0.35)',
              marginBottom: '40px',
            }}>
              The question that started this
            </div>
          </FadeIn>
          <div className="about-question-pair">
            <FadeIn delay={80}>
              <div className="about-question-item about-question-item--other">
                <p className="about-question-label about-question-label--other">
                  Every other creator platform asks
                </p>
                <p className="about-question-text">
                  How do we get more creators?
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div className="about-question-item about-question-item--us">
                <p className="about-question-label about-question-label--us">
                  Wembley Wonders asks
                </p>
                <p className="about-question-text">
                  How do we make sure the community that built the culture is
                  the community that owns its future?
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ THREE LAYERS ════════════════════════════════════════════════════ */}
        <section className="about-layers">
          <FadeIn>
            <div className="about-layers-header">
              <p className="about-layers-eyebrow">How the platform works</p>
              <h2 className="about-layers-title">
                Three things no other platform does at once
              </h2>
            </div>
          </FadeIn>

          {LAYERS.map((layer, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="about-layer">
                <div className="about-layer-num-col">
                  <div
                    className="about-layer-icon"
                    style={{ color: layer.accent }}
                  >
                    {layer.icon}
                  </div>
                  <div className="about-layer-number">{layer.number}</div>
                </div>
                <div className="about-layer-content">
                  <p
                    className="about-layer-sub"
                    style={{ color: layer.accent }}
                  >
                    {layer.sub}
                  </p>
                  <h3 className="about-layer-title">{layer.title}</h3>
                  <p className="about-layer-body">{layer.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* ══ ORIGIN STORY ════════════════════════════════════════════════════ */}
        <section className="about-origin">
          <FadeIn>
            <div className="about-origin-left">
              <p className="about-origin-eyebrow">How this started</p>
              <h2 className="about-origin-title">
                Wembley. October 2020. No grants. No permissions asked.
              </h2>
              <div className="about-origin-body">
                <p>
                  Wembley Wonders was incorporated in October 2020, in the middle
                  of a pandemic, in one of the most economically complex boroughs
                  in London. Brent: ranked the wealthiest Black community in the
                  city, and simultaneously one of the most underserved by the
                  creative economy infrastructure that keeps cultural value in the
                  hands of the people who generate it.
                </p>
                <p>
                  The founding decision was deliberate: no grants, no external
                  obligations, no institutional permission. Four years of
                  self-financed development, built around the question of what
                  a platform looks like when it is designed from the inside out —
                  by and for the Windrush generation and their children and
                  grandchildren who have been running British culture on a
                  volunteer basis for seventy-five years.
                </p>
                <p>
                  The platform is a Community Interest Company. That legal
                  structure is not incidental. It is the architecture. The
                  community has a legal claim on what we build together.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="about-origin-right">
              <div className="about-origin-facts">
                {[
                  { label: 'Incorporated', value: <><em>October 2020</em></> },
                  { label: 'Legal structure', value: 'Community Interest Company (CIC)' },
                  { label: 'Company number', value: '12960817' },
                  { label: 'Anchor geography', value: <><em>Wembley, Brent, London</em></> },
                  { label: 'Revenue model', value: '55% creator · 25% community · 20% platform' },
                  { label: 'Governance tradition', value: <><em>Pardner hand</em> — Caribbean mutual aid</> },
                  { label: 'Programmes running', value: '13 and growing' },
                  { label: 'External grants received', value: 'None. By design.' },
                ].map((fact, i) => (
                  <div className="about-origin-fact" key={i}>
                    <p className="about-origin-fact-label">{fact.label}</p>
                    <p className="about-origin-fact-value">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ══ CIC REGISTRATION NOTE ═══════════════════════════════════════════ */}
        <div className="about-cic">
          <div className="about-cic-inner">
            <span className="about-cic-mark">CIC Registered</span>
            <p className="about-cic-text">
              Wembley Wonders CIC · Co. No. 12960817 · Registered at Flat 2, 452 High Road,
              Wembley HA9 7AY · admin@wembleywonders.org · 0208 902 9991
            </p>
          </div>
        </div>

        {/* ══ CTA SPLIT ═══════════════════════════════════════════════════════ */}
        <section className="about-cta">
          <FadeIn>
            <div className="about-cta-panel about-cta-panel--creator">
              <p className="about-cta-audience">For creators and community members</p>
              <h3 className="about-cta-heading">
                Your work. Your earnings. Your community's future.
              </h3>
              <p className="about-cta-body">
                Join free. Choose a programme. Start building. Your Panel tracks
                your time, your contributions, and your earnings from the moment
                you arrive. The 55% is yours from day one.
              </p>
              <Link to="/signup" className="about-cta-btn about-cta-btn--creator">
                Create your account →
              </Link>
              <Link
                to="/creator-pathways"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(240,237,230,0.45)',
                  textDecoration: 'none',
                  marginTop: '-12px',
                }}
              >
                Not sure where to start? Find your path →
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="about-cta-panel about-cta-panel--public">
              <p className="about-cta-audience">For press, partners and institutions</p>
              <h3 className="about-cta-heading">
                Read what we're building and why.
              </h3>
              <p className="about-cta-body">
                The Wembley Wonders Manifesto sets out the full architectural
                argument: the economic model, the governance structure, the
                cultural theory of change. If you want to understand this
                platform properly, start there.
              </p>
              <Link to="/manifesto" className="about-cta-btn about-cta-btn--public">
                Read the Manifesto →
              </Link>
              <Link
                to="/contact"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(240,237,230,0.3)',
                  textDecoration: 'none',
                  marginTop: '-12px',
                }}
              >
                Get in touch directly →
              </Link>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;