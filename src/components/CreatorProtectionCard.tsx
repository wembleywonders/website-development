/*
 * TRUBBLE N BASS — CREATOR PROTECTION RESOURCE CARD
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 *
 * Drop-in component for src/pages/trubble-n-bass/index.tsx
 * Renders the "Protect Your Work" featured resource block.
 *
 * USAGE in TrubbleNBassPage:
 *   Import and place <CreatorProtectionCard /> anywhere in the
 *   page — recommended: between interactiveTool and communityShowcase,
 *   passed as a prop or rendered directly in the JSX return.
 *
 * FUTURE: When the Creator Resources hub is built, this card will
 *   link to /protect-your-work instead of the direct download.
 *   Change the href on .cpcard-download-btn at that point.
 */

import React, { useState } from 'react';

/* ─── CHECKLIST DATA ──────────────────────────────────────────────────── */

interface ChecklistSection {
  id: string;
  color: string;
  tag: string;
  head: string;
  items: string[];
}

const SECTIONS: ChecklistSection[] = [
  {
    id: 'sign',
    color: '#C9A84C',
    tag: 'Before you sign anything',
    head: 'Who is legally on your side right now?',
    items: [
      'Do you have independent legal advice — not the label\'s lawyer, yours?',
      'Do you know who owns the master recording?',
      'Do you know who owns the publishing (the song itself)?',
      'What happens to your rights if this company folds?',
      'What are the recoupable costs before you see money?',
    ],
  },
  {
    id: 'upload',
    color: '#4CAF9A',
    tag: 'Before you upload anything',
    head: 'Is this documented in your name?',
    items: [
      'Is the recording registered with PRS for Music? (prsformusic.com)',
      'Is it registered with PPL? (ppluk.com) — separate from PRS, both matter.',
      'Have you documented who created what — producer, songwriter, featured artist?',
      'Do you own the samples you used, or have clearance?',
      'Do you have copies of everything in a place you control?',
    ],
  },
  {
    id: 'perform',
    color: '#7BA3D4',
    tag: 'Before you perform for anyone offering something',
    head: 'What exactly is being offered, and what does it cost?',
    items: [
      'Is there a written agreement — not a promise, a document?',
      'What are you giving up in exchange? Exclusivity? Future releases? Rights?',
      'Is there a time limit on the agreement? No end date = forever.',
      'Who owns recordings made at this performance?',
      'What happens if they don\'t deliver what they promised?',
    ],
  },
  {
    id: 'people',
    color: '#D46A6A',
    tag: 'Before you trust anyone with your career',
    head: 'Who will notice if something is going wrong?',
    items: [
      'Does someone you trust know specifically what deals you\'ve made?',
      'Do you have community around you — not followers, people who know your actual life?',
      'Are you being isolated from people who care about you? That\'s a warning sign.',
      'Do you know where to go if something goes wrong? (Musicians\' Union, Citizens Advice)',
      'Is Wembley Wonders in the loop? We\'re your community. admin@wembleywonders.org',
    ],
  },
];

const MECHANISMS = [
  {
    color: '#C9A84C',
    label: 'Mechanism 1',
    name: 'The contract signed before you have a self',
    eg: 'TLC. New Edition. Children signing documents they cannot understand, without independent advice.',
  },
  {
    color: '#D46A6A',
    label: 'Mechanism 2',
    name: 'One voice made more valuable than the group',
    eg: 'The industry isolates the extractable asset and leaves the collective behind.',
  },
  {
    color: '#4CAF9A',
    label: 'Mechanism 3',
    name: 'Publishing rights taken in the confusion',
    eg: 'Gregory Coleman. The Amen Break. The window closes before you know what you made.',
  },
  {
    color: '#7BA3D4',
    label: 'Mechanism 4',
    name: 'Fame without infrastructure',
    eg: 'Charlie Wilson. David Ruffin. Extreme pressure arriving without support systems.',
  },
];

/* ─── EXPANDABLE SECTION ─────────────────────────────────────────────── */

const ExpandableSection: React.FC<{ section: ChecklistSection }> = ({ section }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="cpcard-section" style={{ '--sec-color': section.color } as React.CSSProperties}>
      <button
        className={`cpcard-section-head ${open ? 'cpcard-section-head--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="cpcard-section-tag">{section.tag}</span>
        <span className="cpcard-section-title">{section.head}</span>
        <span className="cpcard-section-chevron" aria-hidden="true">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <ul className="cpcard-checklist">
          {section.items.map((item, i) => (
            <li key={i} className="cpcard-checklist-item">
              <span className="cpcard-checkbox" aria-hidden="true">□</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────── */

const CreatorProtectionCard: React.FC = () => {
  return (
    <div className="cpcard">

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <div className="cpcard-header">
        <div className="cpcard-header-spine" aria-hidden="true" />
        <div className="cpcard-header-body">
          <div className="cpcard-eyebrow">
            <span className="cpcard-programme-tag">Trubble n Bass · Creator Protection</span>
            <span className="cpcard-version">Free resource · Print & share</span>
          </div>
          <h2 className="cpcard-title">Protect Your Work</h2>
          <p className="cpcard-deck">
            Free resources for creators who want to own what they make.
          </p>
        </div>
      </div>

      {/* ── ANCHOR STORY ────────────────────────────────────────────── */}
      <div className="cpcard-anchor">
        <div className="cpcard-anchor-rule" aria-hidden="true" />
        <div className="cpcard-anchor-body">
          <p className="cpcard-anchor-text">
            In 1969, a drummer named <strong>Gregory Coleman</strong> played
            a four-bar break lasting seven seconds on a B-side nobody cared
            about. That seven seconds became the <strong>Amen Break</strong> —
            the most sampled drum recording in history, foundational to hip-hop,
            drum and bass, and jungle. Used in over 4,000 tracks.{' '}
            <strong>Coleman received nothing.</strong> The copyright window
            closed before he knew what he had made. He died in 2006, homeless
            and broke. Not because he lacked talent.{' '}
            <strong>
              Because nobody told him what he had made was an asset
              that needed protecting.
            </strong>
          </p>
          <p className="cpcard-anchor-credit">
            Source:{' '}
            <a
              href="https://youtube.com/@RnBVinyl"
              target="_blank"
              rel="noopener noreferrer"
              className="cpcard-anchor-link"
            >
              RnB Vinyl
            </a>
            {' '}· Nigerian music history channel · credited because we cannot
            argue for creator rights and then ignore the creators who taught us.
          </p>
        </div>
      </div>

      {/* ── WARNING ─────────────────────────────────────────────────── */}
      <div className="cpcard-warning">
        <span className="cpcard-warning-icon" aria-hidden="true">⚠</span>
        <div className="cpcard-warning-body">
          <div className="cpcard-warning-head">The one rule that overrides everything</div>
          <p className="cpcard-warning-text">
            If you feel pressure to sign or agree to something{' '}
            <strong>today, right now, before you've had time to think</strong> —
            that pressure is the warning sign.{' '}
            <strong>Legitimate offers survive 48 hours.</strong> Anything that
            requires your signature before you can get independent advice is not
            an opportunity. It is a trap dressed as one.
          </p>
        </div>
      </div>

      {/* ── FOUR QUESTIONS ──────────────────────────────────────────── */}
      <div className="cpcard-questions-label">
        The checklist — four questions, three moments, one rule
      </div>

      <div className="cpcard-sections">
        {SECTIONS.map(section => (
          <ExpandableSection key={section.id} section={section} />
        ))}
      </div>

      {/* ── FOUR MECHANISMS ─────────────────────────────────────────── */}
      <div className="cpcard-mechanisms-label">
        The four ways exploitation actually happens — know them by name
      </div>

      <div className="cpcard-mechanisms">
        {MECHANISMS.map((m, i) => (
          <div
            key={i}
            className="cpcard-mechanism"
            style={{ '--mech-color': m.color } as React.CSSProperties}
          >
            <div className="cpcard-mechanism-label">{m.label}</div>
            <div className="cpcard-mechanism-name">{m.name}</div>
            <div className="cpcard-mechanism-eg">{m.eg}</div>
          </div>
        ))}
      </div>

      {/* ── DOWNLOAD + SHARE ────────────────────────────────────────── */}
      <div className="cpcard-actions">
        <div className="cpcard-actions-left">
          <p className="cpcard-actions-copy">
            This checklist is free to download, print, and share. Pass it on.
            Hand it to someone who needs it before they sign something they
            don't understand.
          </p>
          <p className="cpcard-actions-contact">
            Questions?{' '}
            <a href="mailto:admin@wembleywonders.org" className="cpcard-email">
              admin@wembleywonders.org
            </a>
          </p>
        </div>
        <div className="cpcard-actions-right">
          <a
            href="/creators_checklist.html"
            download="WembleyWonders_CreatorChecklist.html"
            className="cpcard-download-btn"
            aria-label="Download the Creator's Checklist as a printable document"
          >
            <span className="cpcard-download-icon" aria-hidden="true">↓</span>
            Download & Print
          </a>
          <p className="cpcard-download-note">
            A4 · Print-ready · Dark background
          </p>
        </div>
      </div>

      {/* ── COMING SOON ─────────────────────────────────────────────── */}
      <div className="cpcard-coming-soon">
        <div className="cpcard-coming-soon-label">Coming to Protect Your Work</div>
        <div className="cpcard-coming-soon-items">
          {[
            { icon: '✓', text: 'Creator\'s Checklist', done: true },
            { icon: '○', text: 'Plain-English PRS Registration Guide' },
            { icon: '○', text: 'Collaboration Agreement Template' },
            { icon: '○', text: 'Joystick Contributor Brief' },
            { icon: '○', text: 'What is a Master Recording? — One-pager' },
          ].map((item, i) => (
            <div
              key={i}
              className={`cpcard-coming-item ${item.done ? 'cpcard-coming-item--done' : ''}`}
            >
              <span className="cpcard-coming-icon">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── STYLES ──────────────────────────────────────────────────── */}
      <style>{`
        /* ── TOKENS ───────────────────────────────────────────────── */
        .cpcard {
          --cp-bg:      #0C0C10;
          --cp-surface: #141418;
          --cp-border:  #252530;
          --cp-gold:    #C9A84C;
          --cp-gold-d:  #7A6228;
          --cp-gold-p:  #E8D49A;
          --cp-red:     #B83232;
          --cp-teal:    #2A7A6A;
          --cp-body:    #C8C4BC;
          --cp-muted:   #6A6878;
          --cp-head:    #F0EDE6;
          --cp-mono:    'DM Mono', 'Courier New', monospace;
          --cp-serif:   Georgia, 'Times New Roman', serif;

          background: var(--cp-bg);
          border: 1px solid var(--cp-border);
          border-radius: 2px;
          overflow: hidden;
          margin: 2rem 0;
          color: var(--cp-body);
          font-family: var(--cp-serif);
        }

        /* ── HEADER ───────────────────────────────────────────────── */
        .cpcard-header {
          display: flex;
          align-items: stretch;
          background: var(--cp-bg);
          border-bottom: 1px solid var(--cp-border);
        }
        .cpcard-header-spine {
          width: 5px;
          flex-shrink: 0;
          background: linear-gradient(180deg, var(--cp-gold) 0%, #7A6228 60%, #B83232 100%);
        }
        .cpcard-header-body {
          padding: 1.25rem 1.5rem;
          flex: 1;
        }
        .cpcard-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .cpcard-programme-tag {
          font-family: var(--cp-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cp-gold);
          font-weight: 500;
        }
        .cpcard-version {
          font-family: var(--cp-mono);
          font-size: 0.62rem;
          color: var(--cp-muted);
          letter-spacing: 0.06em;
        }
        .cpcard-title {
          font-family: var(--cp-serif);
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          color: var(--cp-head);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .cpcard-deck {
          font-size: 0.92rem;
          color: var(--cp-muted);
          font-style: italic;
          line-height: 1.5;
        }

        /* ── ANCHOR ───────────────────────────────────────────────── */
        .cpcard-anchor {
          display: flex;
          align-items: stretch;
          background: var(--cp-surface);
          border-bottom: 1px solid var(--cp-border);
        }
        .cpcard-anchor-rule {
          width: 3px;
          flex-shrink: 0;
          background: var(--cp-gold);
        }
        .cpcard-anchor-body {
          padding: 1rem 1.25rem;
          flex: 1;
        }
        .cpcard-anchor-text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--cp-body);
          margin-bottom: 0.6rem;
        }
        .cpcard-anchor-text strong { color: var(--cp-head); font-weight: 700; }
        .cpcard-anchor-credit {
          font-family: var(--cp-mono);
          font-size: 0.65rem;
          color: var(--cp-muted);
          line-height: 1.5;
          letter-spacing: 0.02em;
        }
        .cpcard-anchor-link {
          color: var(--cp-gold-d);
          text-decoration: underline;
        }
        .cpcard-anchor-link:hover { color: var(--cp-gold); }

        /* ── WARNING ──────────────────────────────────────────────── */
        .cpcard-warning {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          background: #160A0A;
          border-bottom: 1px solid #3A1515;
          padding: 0.9rem 1.25rem;
        }
        .cpcard-warning-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
          line-height: 1.3;
          color: var(--cp-red);
        }
        .cpcard-warning-head {
          font-family: var(--cp-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cp-red);
          margin-bottom: 0.3rem;
          font-weight: 500;
        }
        .cpcard-warning-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #C09090;
        }
        .cpcard-warning-text strong { color: #F0C0C0; font-weight: 700; }

        /* ── SECTION LABELS ───────────────────────────────────────── */
        .cpcard-questions-label,
        .cpcard-mechanisms-label {
          font-family: var(--cp-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cp-muted);
          padding: 0.65rem 1.25rem 0.4rem;
          border-bottom: 1px solid var(--cp-border);
          background: var(--cp-bg);
        }

        /* ── EXPANDABLE SECTIONS ──────────────────────────────────── */
        .cpcard-sections {
          border-bottom: 1px solid var(--cp-border);
        }
        .cpcard-section {
          border-bottom: 1px solid var(--cp-border);
        }
        .cpcard-section:last-child { border-bottom: none; }

        .cpcard-section-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          background: var(--cp-surface);
          border: none;
          cursor: pointer;
          padding: 0.85rem 1.25rem;
          text-align: left;
          transition: background 0.15s;
          position: relative;
          border-left: 3px solid var(--sec-color, #C9A84C);
        }
        .cpcard-section-head:hover { background: #1A1A22; }
        .cpcard-section-head--open { background: #1A1A22; }

        .cpcard-section-tag {
          font-family: var(--cp-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sec-color, #C9A84C);
          flex-shrink: 0;
          min-width: 160px;
        }
        .cpcard-section-title {
          font-size: 0.88rem;
          color: var(--cp-head);
          flex: 1;
          font-weight: 600;
          line-height: 1.3;
        }
        .cpcard-section-chevron {
          font-family: var(--cp-mono);
          font-size: 0.6rem;
          color: var(--cp-muted);
          flex-shrink: 0;
        }

        .cpcard-checklist {
          list-style: none;
          padding: 0.75rem 1.25rem 0.85rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: var(--cp-bg);
          border-left: 3px solid var(--sec-color, #C9A84C);
        }
        .cpcard-checklist-item {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--cp-body);
        }
        .cpcard-checkbox {
          font-family: var(--cp-mono);
          font-size: 0.8rem;
          color: var(--cp-muted);
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* ── MECHANISMS ───────────────────────────────────────────── */
        .cpcard-mechanisms {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1px;
          background: var(--cp-border);
          border-bottom: 1px solid var(--cp-border);
        }
        .cpcard-mechanism {
          background: var(--cp-surface);
          padding: 0.85rem 1rem;
          border-top: 2px solid var(--mech-color, #C9A84C);
        }
        .cpcard-mechanism-label {
          font-family: var(--cp-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--mech-color, #C9A84C);
          margin-bottom: 0.3rem;
          font-weight: 500;
        }
        .cpcard-mechanism-name {
          font-size: 0.82rem;
          color: var(--cp-head);
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.35rem;
          font-family: var(--cp-serif);
        }
        .cpcard-mechanism-eg {
          font-size: 0.75rem;
          color: var(--cp-muted);
          line-height: 1.45;
          font-style: italic;
        }

        /* ── ACTIONS ──────────────────────────────────────────────── */
        .cpcard-actions {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid var(--cp-border);
          background: var(--cp-bg);
          flex-wrap: wrap;
        }
        .cpcard-actions-left { flex: 1; min-width: 200px; }
        .cpcard-actions-copy {
          font-size: 0.82rem;
          line-height: 1.6;
          color: var(--cp-body);
          margin-bottom: 0.35rem;
        }
        .cpcard-actions-contact {
          font-family: var(--cp-mono);
          font-size: 0.65rem;
          color: var(--cp-muted);
          letter-spacing: 0.03em;
        }
        .cpcard-email {
          color: var(--cp-gold);
          text-decoration: none;
        }
        .cpcard-email:hover { text-decoration: underline; }

        .cpcard-actions-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
          flex-shrink: 0;
        }
        .cpcard-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--cp-mono);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #000;
          background: var(--cp-gold);
          border: none;
          padding: 0.55rem 1.25rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .cpcard-download-btn:hover {
          background: var(--cp-gold-p);
          transform: translateY(-1px);
        }
        .cpcard-download-icon {
          font-size: 1rem;
          font-weight: 700;
        }
        .cpcard-download-note {
          font-family: var(--cp-mono);
          font-size: 0.6rem;
          color: var(--cp-muted);
          letter-spacing: 0.06em;
          text-align: right;
        }

        /* ── COMING SOON ──────────────────────────────────────────── */
        .cpcard-coming-soon {
          padding: 0.85rem 1.25rem;
          background: var(--cp-surface);
        }
        .cpcard-coming-soon-label {
          font-family: var(--cp-mono);
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cp-muted);
          margin-bottom: 0.6rem;
        }
        .cpcard-coming-soon-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 1.25rem;
        }
        .cpcard-coming-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--cp-mono);
          font-size: 0.68rem;
          color: var(--cp-muted);
          letter-spacing: 0.02em;
        }
        .cpcard-coming-item--done {
          color: var(--cp-gold);
        }
        .cpcard-coming-icon {
          font-size: 0.65rem;
        }

        /* ── RESPONSIVE ───────────────────────────────────────────── */
        @media (max-width: 600px) {
          .cpcard-section-head {
            flex-wrap: wrap;
            gap: 0.4rem;
          }
          .cpcard-section-tag { min-width: unset; }
          .cpcard-mechanisms {
            grid-template-columns: 1fr 1fr;
          }
          .cpcard-actions {
            flex-direction: column;
            align-items: flex-start;
          }
          .cpcard-actions-right { align-items: flex-start; }
          .cpcard-download-note { text-align: left; }
        }
        @media (max-width: 380px) {
          .cpcard-mechanisms { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export { CreatorProtectionCard };
export default CreatorProtectionCard;