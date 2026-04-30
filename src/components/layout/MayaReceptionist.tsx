
/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaReceptionist — Global overlay component
 *
 * Judith's concierge answers the doorbell from every room in the building.
 * Mounted once in App.tsx, outside <Routes>, so she persists across navigation.
 *
 * Activation triggers:
 *   1. window 'maya:open' CustomEvent  — dispatched by Header "Ask Maya" button
 *      and by homepage "Ring the bell →" button
 *   2. useMayaStore.isVisitorGuideActive — for programmatic activation
 *
 * Guided mode: self-contained question tree, all 13 programmes, no API key needed.
 * LLM mode:    one env var away — see VITE_ANTHROPIC_API_KEY note below.
 *
 * When the visitor clicks a result CTA, the overlay closes and they navigate.
 * The homepage MayaSection becomes invitation-only — the doorbell visual + bell
 * button — it no longer owns the conversation.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useMayaStore from '../../stores/mayaStore';
import './MayaReceptionist.css';

// ─────────────────────────────────────────────────────────────
// QUESTION TREE
// Identical to what lived in MayaSection — single source of truth now.
// Replace with LLM conversation when VITE_ANTHROPIC_API_KEY is set.
// ─────────────────────────────────────────────────────────────

interface MayaOption {
  label: string;
  next: string;
}

interface MayaQuestion {
  id: string;
  prompt: string;
  subprompt?: string;
  options: MayaOption[];
  link?: string;
  cta?: string;
}

const MAYA_QUESTIONS: MayaQuestion[] = [
  {
    id: 'what-carry',
    prompt: "What do you know that nobody taught you?",
    subprompt: "A skill, a story, a technique, a cultural knowledge — anything.",
    options: [
      { label: "I make things — food, music, art, craft", next: 'maker' },
      { label: "I know things — history, community, culture", next: 'keeper' },
      { label: "I fix things — tech, devices, problems", next: 'fixer' },
      { label: "I tell things — stories, ideas, arguments", next: 'teller' },
      { label: "I'm not sure yet", next: 'bright-sparks' },
    ]
  },
  {
    id: 'maker',
    prompt: "What kind of making?",
    subprompt: "This helps me point you to the right room.",
    options: [
      { label: "Food and recipes", next: 'result-anansi' },
      { label: "Music and beats", next: 'result-trubble' },
      { label: "Fashion and design", next: 'result-silk' },
      { label: "Drama and storytelling", next: 'result-kaywana' },
    ]
  },
  {
    id: 'keeper',
    prompt: "Who needs to hear what you know?",
    subprompt: "Knowledge that stays unshared is knowledge at risk.",
    options: [
      { label: "My community — people like me", next: 'result-pageturners' },
      { label: "The next generation", next: 'result-pageturners' },
      { label: "The record — archives, history", next: 'result-commons' },
      { label: "Anyone who'll listen", next: 'result-casters' },
    ]
  },
  {
    id: 'fixer',
    prompt: "What do you fix?",
    subprompt: "Practical knowledge is undervalued. Let's change that.",
    options: [
      { label: "Phones, devices, electronics", next: 'result-stem' },
      { label: "Business problems, systems", next: 'result-tech' },
      { label: "Community problems", next: 'result-impact' },
    ]
  },
  {
    id: 'teller',
    prompt: "How do you tell it?",
    subprompt: "The medium shapes the message.",
    options: [
      { label: "In writing", next: 'result-pageturners' },
      { label: "Out loud — debate, performance", next: 'result-kaywana' },
      { label: "On air — radio, podcast", next: 'result-casters' },
      { label: "On screen — video, broadcast", next: 'result-casters' },
    ]
  },
  {
    id: 'bright-sparks',
    prompt: "That's the most honest answer in the room.",
    subprompt: "Bright Sparks is the room before the rooms. Saturday mornings. Free. No commitment.",
    options: [
      { label: "Tell me more about Bright Sparks", next: 'result-sparks' },
      { label: "Actually, let me try a different answer", next: 'what-carry' },
    ]
  },
  // ── Results ──────────────────────────────────────────────────
  { id: 'result-anansi',      prompt: "Your room is Auntie Anansi's Kitchen.",     subprompt: "Heritage recipes documented. The provenance of your food is the premium.",                           options: [], link: '/programmes/auntie-anansis-kitchen', cta: 'Enter the kitchen →' },
  { id: 'result-trubble',     prompt: "Your room is Trubble n Bass.",               subprompt: "Release a track. Listening party. 55% yours from the first sale.",                                  options: [], link: '/programmes/trubble-n-bass',          cta: 'Start producing →'  },
  { id: 'result-silk',        prompt: "Your room is Silk Stilettos.",               subprompt: "A portfolio of original pieces. Your aesthetic documented and priced.",                             options: [], link: '/programmes/silk-stilettos',          cta: 'Start designing →'  },
  { id: 'result-kaywana',     prompt: "Your room is Kaywana's Court.",              subprompt: "Argument as performance. The debate that goes on the record.",                                      options: [], link: '/programmes/kaywanas-court',          cta: 'Enter the court →'  },
  { id: 'result-pageturners', prompt: "Your room is Pageturners.",                  subprompt: "Your words in Joystick e-zine. Your name on them permanently.",                                    options: [], link: '/programmes/pageturners',             cta: 'Start writing →'    },
  { id: 'result-casters',     prompt: "Your room is G-Tech Casters.",              subprompt: "Your show on Rayd-yo. Your audience yours. Your archive permanent.",                               options: [], link: '/programmes/gtechcasters',            cta: 'Go on air →'        },
  { id: 'result-stem',        prompt: "Your room is STEMgeneers.",                  subprompt: "Device repair earns £15–40 a job. Practical knowledge priced properly.",                           options: [], link: '/programmes/stemgeneers',             cta: 'Start building →'   },
  { id: 'result-tech',        prompt: "Your room is TECHreneurs.",                  subprompt: "Build a product around what you already know. First sale within the programme.",                   options: [], link: '/programmes/techreneurs',             cta: 'Launch something →' },
  { id: 'result-impact',      prompt: "Your room is Impact Labs.",                  subprompt: "A real proposal to real directors. Community problems taken seriously.",                            options: [], link: '/programmes/impact-labs',             cta: 'Bring your proposal →' },
  { id: 'result-commons',     prompt: "Your room is the Knowledge Commons.",        subprompt: "The counter-archive. Pioneer profiles, oral history, the record that the official record missed.", options: [], link: '/heritage',                           cta: 'Enter the archive →' },
  { id: 'result-sparks',      prompt: "Bright Sparks. Saturday 10am. Free.",       subprompt: "The curiosity threshold. The room where you find out which room is yours.",                        options: [], link: '/programmes/bright-sparks',           cta: 'Come on Saturday →' },
];

const getQuestion = (id: string): MayaQuestion | undefined =>
  MAYA_QUESTIONS.find(q => q.id === id);

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export const MayaReceptionist: React.FC = () => {
  const navigate = useNavigate();

  // Store wire — reads isVisitorGuideActive, writes it on close
  const isVisitorGuideActive  = useMayaStore((s) => s.isVisitorGuideActive);
  const setVisitorGuideActive = useMayaStore((s) => s.setVisitorGuideActive);

  const [isOpen,    setIsOpen]    = useState(false);
  const [currentId, setCurrentId] = useState('what-carry');
  const [history,   setHistory]   = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false); // controls CSS enter animation

  const current  = getQuestion(currentId);
  const isResult = (current?.options.length ?? 1) === 0;

  // ── Open / close ────────────────────────────────────────────

  const open = useCallback(() => {
    setIsOpen(true);
    // Small delay so CSS transition fires after mount
    requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    // Wait for CSS exit transition before unmounting panel
    setTimeout(() => {
      setIsOpen(false);
      setCurrentId('what-carry');
      setHistory([]);
      setVisitorGuideActive(false);
    }, 280);
  }, [setVisitorGuideActive]);

  // ── Listen for Header button dispatch ───────────────────────
  useEffect(() => {
    const handleMayaOpen = () => open();
    window.addEventListener('maya:open', handleMayaOpen);
    return () => window.removeEventListener('maya:open', handleMayaOpen);
  }, [open]);

  // ── Sync with store (programmatic activation) ───────────────
  useEffect(() => {
    if (isVisitorGuideActive && !isOpen) open();
  }, [isVisitorGuideActive, isOpen, open]);

  // ── Close on Escape ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  // ── Tree navigation ─────────────────────────────────────────

  const handleOption = (next: string) => {
    setHistory(h => [...h, currentId]);
    setCurrentId(next);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    setCurrentId(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
  };

  const handleReset = () => {
    setCurrentId('what-carry');
    setHistory([]);
  };

  const handleResultCTA = (link: string) => {
    close();
    // Brief pause so the overlay closes cleanly before navigation
    setTimeout(() => navigate(link), 300);
  };

  // ── Render ───────────────────────────────────────────────────

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mr-backdrop ${isVisible ? 'mr-backdrop--visible' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`mr-panel ${isVisible ? 'mr-panel--visible' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Maya — Wembley Wonders receptionist"
      >
        {/* ── Header ── */}
        <div className="mr-header">
          <div className="mr-header-identity">
            <div className="mr-avatar" aria-hidden="true">
              {/*
               * Maya avatar — replace the placeholder span with:
               * <img src="/images/maya-avatar.png" alt="" />
               * once the neon-lit photo is in /public/images/
               */}
              <span className="mr-avatar-placeholder">M</span>
              <span className="mr-status-dot" />
            </div>
            <div className="mr-header-text">
              <span className="mr-name">Maya</span>
              <span className="mr-role">Wembley Wonders receptionist</span>
            </div>
          </div>
          <button
            className="mr-close"
            onClick={close}
            aria-label="Close Maya"
          >
            ×
          </button>
        </div>

        {/* ── Body ── */}
        <div className="mr-body">
          {/* Question / result bubble */}
          <div className="mr-bubble">
            <p className="mr-bubble-prompt">{current?.prompt}</p>
            {current?.subprompt && (
              <p className="mr-bubble-sub">{current.subprompt}</p>
            )}
          </div>

          {/* Options or result */}
          {isResult ? (
            <div className="mr-result">
              {current?.link && (
                <button
                  className="mr-result-cta"
                  onClick={() => handleResultCTA(current.link!)}
                >
                  {current.cta}
                </button>
              )}
              <Link
                to="/join"
                className="mr-result-join"
                onClick={close}
              >
                Or join free and explore everything →
              </Link>
              <button className="mr-restart" onClick={handleReset}>
                ← Start again
              </button>
            </div>
          ) : (
            <div className="mr-options">
              {current?.options.map((opt, i) => (
                <button
                  key={i}
                  className="mr-option"
                  onClick={() => handleOption(opt.next)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Back button ── */}
        {history.length > 0 && !isResult && (
          <button className="mr-back" onClick={handleBack}>
            ← Back
          </button>
        )}

        {/* ── Footer note ── */}
        <div className="mr-footer-note">
          Free to use · No account required · Guided by Maya
          {/* ── LLM NOTE ───────────────────────────────────────────────
              Guided mode is active (no VITE_ANTHROPIC_API_KEY).
              To activate full LLM conversation:
                1. Add VITE_ANTHROPIC_API_KEY=your_key to .env
                2. Replace the MAYA_QUESTIONS tree above with a call to
                   the Anthropic API using the conversationPersistence
                   and rovBridge services in src/services/maya/conversation/
                3. Remove the static tree — Maya handles it from there.
          ─────────────────────────────────────────────────────────── */}
        </div>
      </div>
    </>
  );
};

export default MayaReceptionist;
