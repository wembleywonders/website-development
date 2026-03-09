import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import './GetStartedPage.css';

// ============================================
// GET STARTED — The Session One Valuation
// ============================================
// This is NOT an onboarding form.
// This is NOT a menu of options.
//
// This is where the excavation begins.
//
// The visitor has just read "you walked in
// here rich." This page asks the question
// that session one asks in person:
//
// "What do you know that nobody taught you?"
//
// We help them name it. Then we show them
// which programme is the refinery for that
// specific asset. Then we invite them in.
//
// Sequence:
// 1. THE QUESTION — stop, sit with it
// 2. THE ASSET FINDER — guided excavation
// 3. THE MATCH — programme recommendation
// 4. THE HONEST MIRROR — what it takes
// 5. THE DOOR — join or sandbox first
// ============================================

// Asset categories — what people carry
type AssetCategory =
  | 'knowledge'    // Things you know from lived experience
  | 'craft'        // Things you make with your hands
  | 'voice'        // Stories, language, oral tradition
  | 'sound'        // Music, rhythm, sonic intuition
  | 'taste'        // Food, heritage recipes, culinary knowledge
  | 'eye'          // Visual, design, pattern recognition
  | 'code'         // Technical, systems, repair instinct
  | 'organise'     // People, events, community
  | null;

// Asset prompts per category
const ASSET_PROMPTS: Record<string, string[]> = {
  knowledge: [
    "Something you know about your culture or heritage that isn't written down anywhere",
    "A way of understanding the world that came from your community, not a classroom",
    "History that lives in your family but not in any textbook",
    "Knowledge passed down through doing, not teaching",
  ],
  craft: [
    "A technique you developed or inherited that you've never seen explained online",
    "Something you make that has a specific cultural or family origin",
    "A process you've refined over years that looks effortless to others",
    "Skills your hands know before your brain does",
  ],
  voice: [
    "A story that only your community knows",
    "A way of using language — dialect, expression, cadence — that is specifically yours",
    "Oral histories you carry that would otherwise disappear",
    "An ability to explain things that makes people stop and listen",
  ],
  sound: [
    "A musical vocabulary built from specific cultural roots",
    "Rhythmic intuition that came before formal training",
    "An ear trained by particular music, particular places",
    "Sound knowledge that lives in your body, not your education",
  ],
  taste: [
    "A recipe that exists nowhere online — only in your memory or your family's hands",
    "A culinary tradition from a specific place or culture you carry forward",
    "Flavour knowledge built through a particular heritage",
    "Food as cultural archive — something that would be lost without you",
  ],
  eye: [
    "A visual language — pattern, colour, form — from a specific cultural tradition",
    "Design instincts shaped by environments most designers have never seen",
    "An aesthetic vocabulary that doesn't appear in mainstream design education",
    "Pattern recognition trained by your specific cultural context",
  ],
  code: [
    "Technical intuition built from fixing things rather than building from scratch",
    "Problem-solving approaches that come from resource constraints, not abundance",
    "Systems thinking developed outside formal computer science",
    "Repair knowledge — understanding what breaks and why — that most developers lack",
  ],
  organise: [
    "Community knowledge — who connects to whom, how things actually work locally",
    "Event-building skills developed through cultural or community necessity",
    "The ability to bring people together across difference",
    "Institutional memory of how your community has organised and survived",
  ],
};

// Programme recommendations per asset category
const PROGRAMME_MATCHES: Record<string, {
  primary: string;
  primarySlug: string;
  secondary: string;
  secondarySlug: string;
  rationale: string;
}> = {
  knowledge: {
    primary: "Pageturners",
    primarySlug: "pageturners",
    secondary: "G-Tech Casters",
    secondarySlug: "gtechcasters",
    rationale: "Pageturners is your editorial backbone — it turns lived knowledge into documented, provenance-verified product. G-Tech Casters broadcasts it to the audiences who will pay for it."
  },
  craft: {
    primary: "Silk Stilettos",
    primarySlug: "silk-stilettos",
    secondary: "Scrap Cat",
    secondarySlug: "scrap-cat",
    rationale: "Craft needs documentation as much as execution. Silk Stilettos builds the portfolio and the provenance trail. The combination commands premium pricing that generic craft never can."
  },
  voice: {
    primary: "Easy Street",
    primarySlug: "easy-street",
    secondary: "Pageturners",
    secondarySlug: "pageturners",
    rationale: "Easy Street turns oral tradition into radio drama — authenticated, broadcast, owned. Pageturners preserves the written form. Together they make your voice an archive."
  },
  sound: {
    primary: "Trubble n Bass",
    primarySlug: "trubble-n-bass",
    secondary: "G-Tech Casters",
    secondarySlug: "gtechcasters",
    rationale: "Trubble n Bass traces musical lineage — your sound in its cultural context. G-Tech Casters broadcasts the story behind the music. Provenance turns a track into a cultural artefact."
  },
  taste: {
    primary: "Auntie Anansi's Kitchen",
    primarySlug: "auntie-anansis-kitchen",
    secondary: "Pageturners",
    secondarySlug: "pageturners",
    rationale: "Auntie Anansi's Kitchen documents what would otherwise disappear. Pageturners builds the heritage narrative. A recipe with provenance sells at a premium no supermarket sauce can touch."
  },
  eye: {
    primary: "Silk Stilettos",
    primarySlug: "silk-stilettos",
    secondary: "STEMgeneers",
    secondarySlug: "stemgeneers",
    rationale: "Visual cultural vocabulary is one of the most undervalued assets in London's creative economy. Silk Stilettos builds the portfolio. STEMgeneers adds the technical layer that turns design into product."
  },
  code: {
    primary: "STEMgeneers",
    primarySlug: "stemgeneers",
    secondary: "TECHreneurs",
    secondarySlug: "techreneurs",
    rationale: "Repair intelligence is rarer and more valuable than build-from-scratch skills. STEMgeneers formalises what you already know. TECHreneurs turns it into a business with real recurring revenue."
  },
  organise: {
    primary: "TECHreneurs",
    primarySlug: "techreneurs",
    secondary: "Kaywana's Court",
    secondarySlug: "kaywanas-court",
    rationale: "Community organising intelligence is a premium skill the market desperately underpays. TECHreneurs builds the business model around it. Kaywana's Court sharpens the advocacy and leadership."
  },
};

const CATEGORY_OPTIONS: { id: AssetCategory; label: string; sub: string; icon: string }[] = [
  { id: 'knowledge', label: 'Knowledge & heritage', sub: "Things you know that nobody taught you formally", icon: '🧠' },
  { id: 'craft', label: 'Making & craft', sub: "Things you make with your hands", icon: '🤲' },
  { id: 'voice', label: 'Story & voice', sub: "Words, language, oral tradition", icon: '🗣️' },
  { id: 'sound', label: 'Music & sound', sub: "Rhythm, production, sonic instinct", icon: '🎵' },
  { id: 'taste', label: 'Food & heritage recipes', sub: "Culinary knowledge from a specific tradition", icon: '🍲' },
  { id: 'eye', label: 'Visual & design', sub: "Pattern, colour, cultural aesthetics", icon: '👁️' },
  { id: 'code', label: 'Tech & repair', sub: "Systems, fixing, making things work", icon: '⚡' },
  { id: 'organise', label: 'Community & organising', sub: "Bringing people together, institutional memory", icon: '🤝' },
];

const HONEST_NUMBERS = [
  { period: "Months 1–6", range: "£500–1,500/mo", label: "First products, bridge income" },
  { period: "Months 6–18", range: "£2,000–4,000/mo", label: "Portfolio building, collaborations" },
  { period: "Months 18–36", range: "£5,000–8,000/mo", label: "Provenance commands premium" },
  { period: "Year 3+", range: "£10,000+/mo", label: "Full earnings actualisation" },
];

type Step = 'question' | 'category' | 'asset' | 'match' | 'mirror' | 'door';

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('question');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>(null);
  const [assetDescription, setAssetDescription] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const match = selectedCategory ? PROGRAMME_MATCHES[selectedCategory] : null;
  const prompts = selectedCategory ? ASSET_PROMPTS[selectedCategory] : [];

  const handleCategorySelect = (cat: AssetCategory) => {
    setSelectedCategory(cat);
    setStep('asset');
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setAssetDescription(prompt);
  };

  const progressSteps: Step[] = ['question', 'category', 'asset', 'match', 'mirror', 'door'];
  const currentStepIdx = progressSteps.indexOf(step);

  return (
    <PageTemplate
      pageTitle="Get Started"
      pageStrapline="A guided conversation — not a form."
      pageType="community"
    >
      <div className="gs-page">

        {/* Progress */}
        <div className="gs-progress">
          <div className="gs-progress-bar">
            <div
              className="gs-progress-fill"
              style={{ width: `${(currentStepIdx / (progressSteps.length - 1)) * 100}%` }}
            />
          </div>
          <span className="gs-progress-label">
            {step === 'question' && 'The question'}
            {step === 'category' && 'What you carry'}
            {step === 'asset' && 'Name it specifically'}
            {step === 'match' && 'Your programme'}
            {step === 'mirror' && 'The honest picture'}
            {step === 'door' && 'The door is open'}
          </span>
        </div>

        {/* ── STEP 1: THE QUESTION ── */}
        {step === 'question' && (
          <div className="gs-step gs-step--question">
            <div className="gs-step-inner">
              <span className="gs-label">Before anything else</span>
              <h1 className="gs-question-heading">
                What do you know that<br />
                <em>nobody taught you?</em>
              </h1>
              <p className="gs-question-body">
                Not what you studied. Not what you were qualified in.
                What you carry — from your family, your community,
                your ends, your culture — that nobody else holds
                in exactly your combination.
              </p>
              <p className="gs-question-body">
                That's not a warm-up question. That's the most
                important thing we'll ask you. Because whatever
                just came to mind — that's your primary economic asset.
                Everything we do here is built around it.
              </p>
              <p className="gs-question-body gs-question-body--accent">
                Take a moment. Then tell us what category it falls into.
              </p>
              <button
                className="gs-btn gs-btn--primary"
                onClick={() => setStep('category')}
              >
                I'm ready →
              </button>
              <div className="gs-question-alt">
                <Link to="/sandbox" className="gs-alt-link">
                  Not ready yet? Try the sandbox first — no signup needed
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: CATEGORY ── */}
        {step === 'category' && (
          <div className="gs-step gs-step--category">
            <div className="gs-step-inner gs-step-inner--wide">
              <span className="gs-label">Step 1 of 3</span>
              <h2 className="gs-step-heading">What's the territory?</h2>
              <p className="gs-step-sub">
                Choose the category that feels closest to what came to mind.
                You can always change it — this is the beginning of a conversation,
                not a box you're being put in.
              </p>
              <div className="gs-category-grid">
                {CATEGORY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`gs-category-card ${selectedCategory === opt.id ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(opt.id)}
                  >
                    <span className="gs-cat-icon">{opt.icon}</span>
                    <div>
                      <span className="gs-cat-label">{opt.label}</span>
                      <span className="gs-cat-sub">{opt.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: NAME THE ASSET ── */}
        {step === 'asset' && selectedCategory && (
          <div className="gs-step gs-step--asset">
            <div className="gs-step-inner gs-step-inner--wide">
              <span className="gs-label">Step 2 of 3</span>
              <h2 className="gs-step-heading">Name it specifically.</h2>
              <p className="gs-step-sub">
                Vague assets have vague value. Specific, documented,
                provenance-verified assets command premium prices.
                Which of these is closest to what you carry?
              </p>

              <div className="gs-prompts">
                {prompts.map((prompt, i) => (
                  <button
                    key={i}
                    className={`gs-prompt-card ${selectedPrompt === prompt ? 'selected' : ''}`}
                    onClick={() => handlePromptSelect(prompt)}
                  >
                    <span className="gs-prompt-check">{selectedPrompt === prompt ? '✓' : '○'}</span>
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>

              <div className="gs-asset-own">
                <label className="gs-own-label">
                  Or describe it in your own words —
                </label>
                <textarea
                  className="gs-own-textarea"
                  placeholder="What specifically do you carry that nobody taught you? The more precise, the more valuable it becomes..."
                  value={assetDescription === selectedPrompt ? '' : assetDescription}
                  onChange={e => {
                    setAssetDescription(e.target.value);
                    setSelectedPrompt('');
                  }}
                  rows={3}
                />
              </div>

              <div className="gs-step-actions">
                <button className="gs-btn gs-btn--ghost" onClick={() => setStep('category')}>
                  ← Back
                </button>
                <button
                  className="gs-btn gs-btn--primary"
                  disabled={!selectedPrompt && !assetDescription.trim()}
                  onClick={() => setStep('match')}
                >
                  Show me where this goes →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: THE MATCH ── */}
        {step === 'match' && match && selectedCategory && (
          <div className="gs-step gs-step--match">
            <div className="gs-step-inner">
              <span className="gs-label">Step 3 of 3</span>
              <h2 className="gs-step-heading">Here's your refinery.</h2>
              <p className="gs-step-sub">
                Based on what you carry, these are the programmes that
                will help you document it, protect it, and price it properly.
              </p>

              <div className="gs-asset-recap">
                <span className="gs-recap-label">Your asset</span>
                <p className="gs-recap-text">
                  {selectedPrompt || assetDescription}
                </p>
              </div>

              <div className="gs-matches">
                <div className="gs-match-card gs-match-card--primary">
                  <div className="gs-match-tag">Primary programme</div>
                  <h3>{match.primary}</h3>
                  <p className="gs-match-rationale">{match.rationale}</p>
                  <Link
                    to={`/programmes/${match.primarySlug}`}
                    className="gs-btn gs-btn--primary"
                  >
                    Explore {match.primary} →
                  </Link>
                </div>

                <div className="gs-match-card gs-match-card--secondary">
                  <div className="gs-match-tag">Compound with</div>
                  <h3>{match.secondary}</h3>
                  <p className="gs-match-note">
                    Cross-programme combinations are where the real
                    earnings multiplication happens. A single programme
                    gets you started. Two or more in combination
                    build a defensible position.
                  </p>
                  <Link
                    to={`/programmes/${match.secondarySlug}`}
                    className="gs-btn gs-btn--outline"
                  >
                    Explore {match.secondary} →
                  </Link>
                </div>
              </div>

              <button
                className="gs-btn gs-btn--text"
                onClick={() => setStep('mirror')}
              >
                Show me the honest timeline →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 5: THE HONEST MIRROR ── */}
        {step === 'mirror' && (
          <div className="gs-step gs-step--mirror">
            <div className="gs-step-inner">
              <span className="gs-label">Before you join</span>
              <h2 className="gs-step-heading">
                We won't tell you everything<br />
                you make is worth premium money.
              </h2>
              <p className="gs-step-sub">
                We will tell you exactly what it takes to get there —
                because you deserve honesty more than encouragement.
              </p>

              <div className="gs-mirror-grid">
                {HONEST_NUMBERS.map((n, i) => (
                  <div key={i} className={`gs-mirror-card gs-mirror-card--${i + 1}`}>
                    <span className="gs-mirror-period">{n.period}</span>
                    <span className="gs-mirror-range">{n.range}</span>
                    <span className="gs-mirror-label">{n.label}</span>
                  </div>
                ))}
              </div>

              <div className="gs-mirror-truths">
                <div className="gs-truth-item">
                  <span className="gs-truth-marker">→</span>
                  <p>The employment market offers no such roadmap. Just a door that doesn't open.</p>
                </div>
                <div className="gs-truth-item">
                  <span className="gs-truth-marker">→</span>
                  <p>Not everything you make will command premium prices immediately. Provenance takes time to document and market to recognise.</p>
                </div>
                <div className="gs-truth-item">
                  <span className="gs-truth-marker">→</span>
                  <p>Cross-programme combinations multiply value. Single-programme creators take longer to reach earning actualisation.</p>
                </div>
                <div className="gs-truth-item">
                  <span className="gs-truth-marker">→</span>
                  <p>55% of what you create is yours. That's not a reward for completing the programme. It's yours from the first thing you make.</p>
                </div>
                <div className="gs-truth-item">
                  <span className="gs-truth-marker">→</span>
                  <p>Your IP is legally yours. We document it. We protect it. We never extract it.</p>
                </div>
              </div>

              <button
                className="gs-btn gs-btn--primary"
                onClick={() => setStep('door')}
              >
                I understand. Open the door →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 6: THE DOOR ── */}
        {step === 'door' && match && (
          <div className="gs-step gs-step--door">
            <div className="gs-step-inner">
              <span className="gs-label">The door is open</span>
              <h2 className="gs-step-heading">
                Let's find it.<br />
                Refine it.<br />
                Make it yours to own.
              </h2>

              {selectedCategory && (
                <div className="gs-door-recap">
                  <p>
                    You carry something in the territory of{' '}
                    <strong>
                      {CATEGORY_OPTIONS.find(c => c.id === selectedCategory)?.label}
                    </strong>.
                    Your refinery is{' '}
                    <strong>{match.primary}</strong>,
                    compounded with{' '}
                    <strong>{match.secondary}</strong>.
                  </p>
                </div>
              )}

              <div className="gs-door-options">
                <div className="gs-door-card gs-door-card--primary">
                  <h3>Join free and start</h3>
                  <p>
                    Create your account in 2 minutes. Session one
                    is Saturday at 10am with Bright Sparks, or
                    join your matched programme directly.
                  </p>
                  <Link to="/auth/signup?intent=creator" className="gs-btn gs-btn--primary gs-btn--lg">
                    Join free →
                  </Link>
                </div>

                <div className="gs-door-card gs-door-card--secondary">
                  <h3>Try the sandbox first</h3>
                  <p>
                    No signup. No commitment. Use the programme
                    tools for 20 minutes and see if the fit feels right.
                  </p>
                  <Link
                    to={`/programmes/${match.primarySlug}/sandbox`}
                    className="gs-btn gs-btn--outline"
                  >
                    Open {match.primary} sandbox →
                  </Link>
                </div>

                <div className="gs-door-card gs-door-card--tertiary">
                  <h3>Come to Bright Sparks first</h3>
                  <p>
                    Saturday 10am on Zoom. The session one
                    valuation in a live community setting.
                    No pressure, no commitment.
                  </p>
                  <Link to="/programmes/bright-sparks" className="gs-btn gs-btn--outline">
                    Learn about Bright Sparks →
                  </Link>
                </div>
              </div>

              <div className="gs-door-footer">
                <p>
                  Not quite right? <button className="gs-reset-btn" onClick={() => {
                    setStep('question');
                    setSelectedCategory(null);
                    setAssetDescription('');
                    setSelectedPrompt('');
                  }}>Start again</button> or{' '}
                  <Link to="/programmes" className="gs-alt-link">browse all programmes</Link>.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      <DraggableMaya
        membershipTier="visitor"
        pageType="community"
        pageContext={{
          title: "Get Started — Find Your Asset",
          section: "onboarding",
          contentType: "valuation"
        }}
      />
    </PageTemplate>
  );
};

export default GetStartedPage;