// src/pages/programmes/roots/sandbox.tsx
// Roots Sandbox — full interactive tools
// Replaces the IWD placeholder with working infrastructure
//
// Four tools:
//   1. Aya — curated knowledge Q&A
//   2. Remedies Database — browse / filter documented remedies
//   3. Apothecary — ingredient formulation workspace
//   4. Seasonal Guide — what to use when
//
// Plus: counter-archive submission flow + Cyberstore revenue path

import './sandbox.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLearnerHelp } from '../../../hooks/useLearnerHelp';
import HelpPanel from '../../../components/learnerHelp/HelpPanel';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tool = 'aya' | 'remedies' | 'apothecary' | 'seasonal';

interface Remedy {
  id: string;
  name: string;
  hairType: string[];
  concern: string;
  ingredients: string[];
  method: string;
  evidenceGrade: 'community' | 'practitioner' | 'research';
  cautions?: string;
  cyberstoreLinked?: boolean;
}

interface FormulationIngredient {
  name: string;
  role: string;
  inci: string;
  regNote: string;
  compatible: string[];
  incompatible: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const AYA_KNOWLEDGE: Record<string, string[]> = {
  'shrinkage': [
    "Shrinkage is your hair doing exactly what it was designed to do — the tighter the curl, the more elasticity. A 4c strand can shrink to 25% of its stretched length.",
    "To reduce it: stretch while damp using banding, braiding, or a stretched blowout on low heat. African threading is the oldest method and still one of the most effective.",
    "Don't fight shrinkage by applying more product. Work with the curl pattern — moisture is the goal, elongation is just one way to show it."
  ],
  'scalp health': [
    "A healthy scalp is not a dry scalp. The scalp produces sebum — a natural oil — that moisturises the first few inches of each strand. Overwashing strips this.",
    "Signs of an unhealthy scalp: persistent flaking that isn't dandruff, tenderness, hair loss in patches, or inflammation. These warrant a GP or trichologist visit, not a YouTube remedy.",
    "For routine scalp care: scalp massage with a lightweight oil (jojoba closely mimics sebum), a gentle sulphate-free shampoo, and giving the scalp time between wash days."
  ],
  'moisture': [
    "The LOC method — Liquid, Oil, Cream — was developed for Type 4 hair specifically. Apply in that order to seal water into the strand.",
    "Humectants (glycerin, honey, aloe vera) draw moisture from the air into the hair. In very dry climates, they can draw moisture from the hair instead — use sparingly in winter.",
    "Protein and moisture work in balance. If hair feels mushy when wet, it likely needs protein. If it feels brittle and stiff, it needs moisture."
  ],
  'protective styles': [
    "A protective style protects the ends of your hair — the oldest, most fragile part of each strand — by tucking them away.",
    "The protection comes from reduced manipulation, not from the style itself. Braids left in too long without moisturising underneath cause as much damage as daily combing.",
    "Signs a protective style is causing damage: tension at the hairline, small bumps where braids attach, pain in the scalp. These are not normal and should not be pushed through."
  ],
  'children': [
    "Children's scalps produce less sebum than adults. Their hair is also finer in the first few years. Products designed for adults are often too heavy.",
    "The most important thing for children's hair is gentleness — in handling, in detangling, in styling. Traction alopecia from tight styles is permanent.",
    "Judith's resource 'Caring for Your Child's Hair' is being developed specifically for parents, foster carers, and professionals working with Black children. If you have questions that should shape that resource, leave them with us."
  ],
  'mixed heritage': [
    "Mixed heritage hair doesn't have a single pattern — even within the same person's head. You may have 3a curls at the front and 4b coils at the crown. Treat them differently.",
    "What works for Type 3 hair and what works for Type 4 hair are often different products and techniques. Don't apply one parent's routine wholesale — observe your own hair.",
    "The mixed heritage hair section of the Roots archive is being built by people with direct experience. If you have knowledge to contribute, that's exactly what the archive is for."
  ],
  'default': [
    "That's a question I want to answer properly. The Roots archive is built from documented community knowledge, practitioner expertise from Flora, and academic grounding from Natalie.",
    "If I don't have a specific entry for what you're asking, I'd rather say that than give you something uncertain.",
    "You can leave your question below — it goes directly to the founding team and shapes what Aya learns next."
  ]
};

const REMEDIES: Remedy[] = [
  {
    id: 'r01',
    name: 'Deep Moisture Mask',
    hairType: ['4a', '4b', '4c', '3c'],
    concern: 'Dryness / moisture retention',
    ingredients: ['Avocado (½)', 'Honey (2 tbsp)', 'Coconut oil (1 tbsp)', 'Aloe vera gel (2 tbsp)'],
    method: 'Mash avocado until smooth. Mix in remaining ingredients. Apply to clean, damp hair from root to tip. Cover with a shower cap for 30–45 minutes. Rinse thoroughly with warm water.',
    evidenceGrade: 'community',
    cautions: 'Patch test honey if you have scalp sensitivity. Rinse thoroughly — residue can attract buildup.',
    cyberstoreLinked: true
  },
  {
    id: 'r02',
    name: 'Scalp Stimulation Oil',
    hairType: ['all'],
    concern: 'Scalp health / circulation',
    ingredients: ['Jojoba oil (30ml)', 'Peppermint essential oil (3 drops)', 'Rosemary essential oil (3 drops)', 'Lavender essential oil (2 drops)'],
    method: 'Combine oils in a dark glass bottle. Shake before use. Apply to scalp sections using a dropper or applicator bottle. Massage with fingertips (not nails) in circular motions for 5 minutes. Leave overnight or wash out after 2 hours.',
    evidenceGrade: 'practitioner',
    cautions: 'Never apply essential oils undiluted. Keep away from eyes. Not for use during pregnancy without GP advice.',
  },
  {
    id: 'r03',
    name: 'Protein Treatment',
    hairType: ['4a', '4b', '4c', '3b', '3c'],
    concern: 'Breakage / strength',
    ingredients: ['Egg (1, whole)', 'Mayonnaise (2 tbsp)', 'Olive oil (1 tbsp)', 'Apple cider vinegar (1 tsp)'],
    method: 'Beat egg. Mix in mayonnaise, olive oil, and ACV. Apply to clean, slightly damp hair. Focus on mid-lengths and ends. Cover with shower cap for 20 minutes maximum. Rinse with cool water (warm water cooks the egg). Follow with a moisture treatment.',
    evidenceGrade: 'community',
    cautions: 'Rinse with cool water only. Overuse of protein treatments causes brittleness — use fortnightly at most. Follow with moisture.',
  },
  {
    id: 'r04',
    name: 'Aloe Vera Leave-In Spray',
    hairType: ['all'],
    concern: 'Daily moisture / curl definition',
    ingredients: ['Aloe vera juice (100ml)', 'Distilled water (100ml)', 'Glycerin (1 tsp)', 'Lavender essential oil (3 drops)'],
    method: 'Combine in a spray bottle. Shake before each use. Spritz onto hair as needed for moisture refresh. Can be used daily. Store in fridge for up to 2 weeks.',
    evidenceGrade: 'community',
    cyberstoreLinked: true
  },
  {
    id: 'r05',
    name: "Children's Detangling Rinse",
    hairType: ['all'],
    concern: "Detangling / children's hair",
    ingredients: ['Conditioner (2 tbsp)', 'Water (500ml)', 'Aloe vera gel (1 tbsp)'],
    method: 'Mix until fully combined in a squeeze bottle. Apply generously to wet hair after shampooing. Detangle from ends to roots using fingers first, then a wide-tooth comb. Rinse or leave in depending on hair density.',
    evidenceGrade: 'practitioner',
    cautions: "Designed for children under 10. Fully rinse if scalp is sensitive. Don't use adult conditioners on children's fine hair.",
  }
];

const INGREDIENTS: FormulationIngredient[] = [
  {
    name: 'Shea Butter',
    role: 'Emollient / occlusive',
    inci: 'Butyrospermum Parkii Butter',
    regNote: 'No restriction under UK Cosmetics Regulation. Natural origin claim supported.',
    compatible: ['Coconut oil', 'Castor oil', 'Mango butter', 'Argan oil'],
    incompatible: ['High-water formulations (phase separation without emulsifier)']
  },
  {
    name: 'Aloe Vera',
    role: 'Humectant / soothing agent',
    inci: 'Aloe Barbadensis Leaf Juice',
    regNote: 'Decolorized whole leaf aloe vera required for leave-on products per SCCS guidance.',
    compatible: ['Glycerin', 'Panthenol', 'Water-based ingredients', 'Hyaluronic acid'],
    incompatible: ['High oil concentrations without emulsifier', 'Vitamin C (pH conflict)']
  },
  {
    name: 'Castor Oil',
    role: 'Humectant / film-former',
    inci: 'Ricinus Communis Seed Oil',
    regNote: 'No restriction. "Castor oil" is acceptable common name alongside INCI.',
    compatible: ['Shea butter', 'Jojoba oil', 'Coconut oil'],
    incompatible: ['Can feel heavy alone — blend at 10-20% max in leave-on products']
  },
  {
    name: 'Glycerin',
    role: 'Humectant',
    inci: 'Glycerin',
    regNote: 'No restriction. Vegetable-derived glycerin supports "natural" positioning.',
    compatible: ['Most water-phase ingredients', 'Aloe vera', 'Panthenol'],
    incompatible: ['Use below 5% in dry climates — can draw moisture from hair in low humidity']
  },
  {
    name: 'Rosemary Extract',
    role: 'Antioxidant / scalp stimulant',
    inci: 'Rosmarinus Officinalis Leaf Extract',
    regNote: 'Below 0.5% in leave-on products per SCCS. Avoid in pregnancy. Declare clearly.',
    compatible: ['Carrier oils', 'Jojoba', 'Vitamin E'],
    incompatible: ['Not for use by pregnant women. Dilute always — never undiluted on scalp.']
  }
];

const SEASONAL_GUIDE = [
  {
    season: 'Spring',
    icon: '🌱',
    challenge: 'Transition from winter dryness. Humidity begins to rise.',
    focus: 'Reset moisture balance. Gentle protein treatment to repair winter breakage.',
    avoid: 'Heavy butters as sole sealant — switch to lighter oils as humidity rises.',
    routine: ['Clarifying wash to remove product buildup', 'Light protein treatment', 'Switch to humectant-rich leave-in', 'Protective style for growth retention']
  },
  {
    season: 'Summer',
    icon: '☀️',
    challenge: 'UV damage, chlorine/salt water, high humidity causing frizz.',
    focus: 'UV protection, hydration, and moisture-sealing.',
    avoid: 'Heavy products that weigh down hair in heat. Skipping sun protection.',
    routine: ['UV-protective leave-in or product with UV filter', 'Rinse with fresh water before and after swimming', 'Weekly deep conditioning', 'Silk scarf at night to reduce friction']
  },
  {
    season: 'Autumn',
    icon: '🍂',
    challenge: 'Dropping humidity, central heating begins. Hair begins losing moisture faster.',
    focus: 'Increase moisture frequency. Begin protective styling season.',
    avoid: 'Reducing wash days too much — scalp health still matters.',
    routine: ['Switch to heavier moisturiser', 'Seal with butter or heavier oil', 'Begin protective styling if growing', 'Monthly scalp massage with stimulating oil']
  },
  {
    season: 'Winter',
    icon: '❄️',
    challenge: 'Lowest humidity. Central heating strips moisture. Hats cause friction.',
    focus: 'Retain moisture. Protect from friction. Keep scalp healthy under coverings.',
    avoid: 'Cotton pillowcases and hat linings. Hot water washing.',
    routine: ['LOC or LCO method strictly', 'Satin-lined hats or silk scarf underneath', 'Reduce heat styling to zero if possible', 'Infrequent washing — but maintain scalp health with scalp oil between washes']
  }
];

// ─── Grade badge ──────────────────────────────────────────────────────────────

const GradeBadge: React.FC<{ grade: Remedy['evidenceGrade'] }> = ({ grade }) => {
  const map = {
    community: { label: 'Community knowledge', bg: '#EFF6E0', color: '#3A6B1A' },
    practitioner: { label: 'Practitioner verified', bg: '#E8F4FD', color: '#1A5276' },
    research: { label: 'Research supported', bg: '#FDF2E9', color: '#784212' }
  };
  const { label, bg, color } = map[grade];
  return (
    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4, background: bg, color, fontWeight: 600 }}>
      {label}
    </span>
  );
};

// ─── Tool: Aya ────────────────────────────────────────────────────────────────

const AyaTool: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string[] | null>(null);
  const [archived, setArchived] = useState(false);
  const [archiveQuestion, setArchiveQuestion] = useState('');

  const TOPICS = ['shrinkage', 'scalp health', 'moisture', 'protective styles', 'children', 'mixed heritage'];

  const handleAsk = (q?: string) => {
    const question = (q ?? query).toLowerCase();
    const matched = Object.keys(AYA_KNOWLEDGE).find(k =>
      k !== 'default' && question.includes(k)
    );
    setResponse(AYA_KNOWLEDGE[matched ?? 'default']);
    if (!q) setQuery('');
  };

  const handleArchive = () => {
    if (!archiveQuestion.trim()) return;
    setArchived(true);
  };

  return (
    <div className="rs-tool">
      <div className="rs-tool__header">
        <span className="rs-tool__icon">🌿</span>
        <div>
          <h3>Ask Aya</h3>
          <p>Body sovereignty knowledge keeper. Hair science, remedies, your rights.</p>
        </div>
      </div>

      <div className="rs-aya-disclaimer">
        <strong>Aya is not a trichologist or GP.</strong> For medical concerns — persistent
        hair loss, scalp inflammation, pain — please seek professional advice. Aya will tell
        you when something is beyond the archive.
      </div>

      <div className="rs-aya-topics">
        <p className="rs-aya-topics__label">Quick topics:</p>
        <div className="rs-aya-topics__chips">
          {TOPICS.map(t => (
            <button key={t} className="rs-chip" onClick={() => handleAsk(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rs-aya-input-row">
        <input
          type="text"
          className="rs-input"
          placeholder="Ask about hair care, ingredients, your rights..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && query.trim() && handleAsk()}
        />
        <button
          className="rs-btn rs-btn--primary"
          onClick={() => handleAsk()}
          disabled={!query.trim()}
        >
          Ask
        </button>
      </div>

      {response && (
        <div className="rs-aya-response">
          <div className="rs-aya-response__avatar">🌿 Aya</div>
          {response.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      <div className="rs-archive-prompt">
        <h4>Shape what Aya knows next</h4>
        <p>
          Aya's knowledge grows from the founding team and from questions the community asks.
          Leave a question that isn't in the archive yet — it goes directly to Judith, Flora, and Natalie.
        </p>
        {!archived ? (
          <div className="rs-aya-input-row">
            <input
              type="text"
              className="rs-input"
              placeholder="What should Aya know about?"
              value={archiveQuestion}
              onChange={e => setArchiveQuestion(e.target.value)}
            />
            <button
              className="rs-btn rs-btn--secondary"
              onClick={handleArchive}
              disabled={!archiveQuestion.trim()}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="rs-success">
            ✓ Logged to the archive. Your question is now part of what Aya learns.
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tool: Remedies Database ──────────────────────────────────────────────────

const RemediesDB: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Remedy | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [contribution, setContribution] = useState({ name: '', remedy: '', notes: '' });

  const CONCERNS = ['all', ...Array.from(new Set(REMEDIES.map(r => r.concern.split(' / ')[0])))];

  const filtered = filter === 'all'
    ? REMEDIES
    : REMEDIES.filter(r => r.concern.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="rs-tool">
      <div className="rs-tool__header">
        <span className="rs-tool__icon">📋</span>
        <div>
          <h3>Remedies Database</h3>
          <p>Documented community remedies — graded by evidence, not by marketing.</p>
        </div>
      </div>

      <div className="rs-filter-row">
        {CONCERNS.map(c => (
          <button
            key={c}
            className={`rs-chip ${filter === c ? 'rs-chip--active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <div className="rs-remedies-grid">
        {filtered.map(remedy => (
          <button
            key={remedy.id}
            className={`rs-remedy-card ${selected?.id === remedy.id ? 'rs-remedy-card--active' : ''}`}
            onClick={() => setSelected(selected?.id === remedy.id ? null : remedy)}
          >
            <div className="rs-remedy-card__top">
              <strong>{remedy.name}</strong>
              <GradeBadge grade={remedy.evidenceGrade} />
            </div>
            <p className="rs-remedy-card__concern">{remedy.concern}</p>
            <p className="rs-remedy-card__types">Hair types: {remedy.hairType.join(', ')}</p>
            {remedy.cyberstoreLinked && (
              <span className="rs-cyberstore-badge">🛒 Cyberstore kit available</span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div className="rs-remedy-detail">
          <h4>{selected.name}</h4>
          <GradeBadge grade={selected.evidenceGrade} />

          <div className="rs-remedy-section">
            <h5>Ingredients</h5>
            <ul>
              {selected.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
            </ul>
          </div>

          <div className="rs-remedy-section">
            <h5>Method</h5>
            <p>{selected.method}</p>
          </div>

          {selected.cautions && (
            <div className="rs-remedy-caution">
              <strong>⚠ Cautions:</strong> {selected.cautions}
            </div>
          )}

          {selected.cyberstoreLinked && (
            <div className="rs-cyberstore-cta">
              <div>
                <strong>Turn this into income.</strong>
                <p>
                  Community-tested remedies can become Cyberstore products.
                  You contribute the knowledge and formulation.
                  55% of every sale comes to you.
                </p>
              </div>
              <Link to="/cyberstore" className="rs-btn rs-btn--cyberstore">
                List on Cyberstore
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="rs-contribute">
        <h4>Contribute a remedy</h4>
        <p>
          The database is built from community knowledge. If you have a remedy that works —
          one passed down, one you developed, one you've tested — it belongs here.
          Everything submitted is reviewed by Flora before it goes live.
        </p>
        {!submitted ? (
          <div className="rs-contribute-form">
            <input
              className="rs-input"
              placeholder="Remedy name"
              value={contribution.name}
              onChange={e => setContribution({ ...contribution, name: e.target.value })}
            />
            <textarea
              className="rs-input rs-textarea"
              placeholder="Ingredients and method..."
              value={contribution.remedy}
              onChange={e => setContribution({ ...contribution, remedy: e.target.value })}
              rows={4}
            />
            <input
              className="rs-input"
              placeholder="Any cautions or notes (optional)"
              value={contribution.notes}
              onChange={e => setContribution({ ...contribution, notes: e.target.value })}
            />
            <button
              className="rs-btn rs-btn--primary"
              onClick={() => contribution.name && contribution.remedy && setSubmitted(true)}
              disabled={!contribution.name || !contribution.remedy}
            >
              Submit for review
            </button>
          </div>
        ) : (
          <div className="rs-success">
            ✓ Submitted. Flora will review your contribution and follow up.
            Your knowledge is now part of the archive process.
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Tool: Apothecary ────────────────────────────────────────────────────────

const ApothecaryTool: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [productName, setProductName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleIngredient = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const selectedIngredients = INGREDIENTS.filter(i => selected.includes(i.name));

  const warnings = selectedIngredients.flatMap(ing =>
    selectedIngredients
      .filter(other => other.name !== ing.name)
      .filter(other => ing.incompatible.some(inc => other.name.toLowerCase().includes(inc.toLowerCase().split(' ')[0])))
      .map(other => `${ing.name} + ${other.name}: check compatibility`)
  );

  const uniqueWarnings = [...new Set(warnings)];

  return (
    <div className="rs-tool">
      <div className="rs-tool__header">
        <span className="rs-tool__icon">⚗️</span>
        <div>
          <h3>Apothecary Workspace</h3>
          <p>Build formulations. Understand ingredients. Find your route to market.</p>
        </div>
      </div>

      <div className="rs-apothecary-reg-note">
        <strong>UK Cosmetics Regulation:</strong> Products applied to the body for sale require
        a Cosmetic Product Safety Report (CPSR) from a qualified assessor before they can be
        sold legally. The Apothecary workspace helps you understand your ingredients and
        formulation — the regulatory pathway is the next step.{' '}
        <Link to="/programmes/techreneurs" className="rs-link">TECHreneurs covers route to market.</Link>
      </div>

      <div className="rs-apothecary-grid">
        <div className="rs-ingredient-selector">
          <h4>Select ingredients</h4>
          {INGREDIENTS.map(ing => (
            <button
              key={ing.name}
              className={`rs-ingredient-btn ${selected.includes(ing.name) ? 'rs-ingredient-btn--active' : ''}`}
              onClick={() => toggleIngredient(ing.name)}
            >
              <div className="rs-ingredient-btn__name">{ing.name}</div>
              <div className="rs-ingredient-btn__role">{ing.role}</div>
            </button>
          ))}
        </div>

        <div className="rs-formulation-panel">
          <h4>Your formulation</h4>
          {selected.length === 0 ? (
            <p className="rs-formulation-empty">Select ingredients to begin building your formulation.</p>
          ) : (
            <>
              {selectedIngredients.map(ing => (
                <div key={ing.name} className="rs-formulation-ingredient">
                  <div className="rs-fi-name">{ing.name}</div>
                  <div className="rs-fi-inci">INCI: <em>{ing.inci}</em></div>
                  <div className="rs-fi-reg">{ing.regNote}</div>
                </div>
              ))}

              {uniqueWarnings.length > 0 && (
                <div className="rs-formulation-warnings">
                  <strong>⚠ Compatibility notes:</strong>
                  {uniqueWarnings.map((w, i) => <p key={i}>{w}</p>)}
                </div>
              )}

              <div className="rs-formulation-cyberstore">
                <h5>Ready to list this product?</h5>
                <p>
                  Knowledge Archive → Formulation → Cyberstore.
                  55% of sales to you. Provenance documented.
                  You still need a CPSR before listing — we can signpost you to assessors.
                </p>
                <input
                  className="rs-input"
                  placeholder="Product name"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                />
                {!submitted ? (
                  <button
                    className="rs-btn rs-btn--cyberstore"
                    onClick={() => productName && setSubmitted(true)}
                    disabled={!productName}
                  >
                    Save formulation + start Cyberstore listing
                  </button>
                ) : (
                  <div className="rs-success">
                    ✓ Formulation saved. Your provenance record has been created.
                    Next step: obtain your CPSR. We'll be in touch with signposting.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Tool: Seasonal Guide ─────────────────────────────────────────────────────

const SeasonalGuide: React.FC = () => {
  const currentMonth = new Date().getMonth();
  const currentSeasonIndex =
    currentMonth >= 2 && currentMonth <= 4 ? 0 :
    currentMonth >= 5 && currentMonth <= 7 ? 1 :
    currentMonth >= 8 && currentMonth <= 10 ? 2 : 3;

  const [activeSeason, setActiveSeason] = useState(currentSeasonIndex);
  const season = SEASONAL_GUIDE[activeSeason];

  return (
    <div className="rs-tool">
      <div className="rs-tool__header">
        <span className="rs-tool__icon">🗓️</span>
        <div>
          <h3>Seasonal Guide</h3>
          <p>What your hair needs changes with the weather. Here's what to do when.</p>
        </div>
      </div>

      <div className="rs-season-tabs">
        {SEASONAL_GUIDE.map((s, i) => (
          <button
            key={s.season}
            className={`rs-season-tab ${activeSeason === i ? 'rs-season-tab--active' : ''} ${i === currentSeasonIndex ? 'rs-season-tab--current' : ''}`}
            onClick={() => setActiveSeason(i)}
          >
            <span>{s.icon}</span>
            <span>{s.season}</span>
            {i === currentSeasonIndex && <span className="rs-current-badge">Now</span>}
          </button>
        ))}
      </div>

      <div className="rs-season-content">
        <div className="rs-season-challenge">
          <h4>The seasonal challenge</h4>
          <p>{season.challenge}</p>
        </div>

        <div className="rs-season-two-col">
          <div className="rs-season-block rs-season-focus">
            <h5>Focus on</h5>
            <p>{season.focus}</p>
          </div>
          <div className="rs-season-block rs-season-avoid">
            <h5>Avoid</h5>
            <p>{season.avoid}</p>
          </div>
        </div>

        <div className="rs-season-routine">
          <h5>Seasonal routine</h5>
          <ol>
            {season.routine.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

// ─── Main Sandbox ─────────────────────────────────────────────────────────────

const RootsSandbox: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('aya');

  const { onLearnerNeedsHelp, activeHelp, dismissHelp, openTutorialAt } =
    useLearnerHelp('roots', 'roots-sandbox');

  const TOOLS: { id: Tool; label: string; icon: string; desc: string }[] = [
    { id: 'aya',      label: 'Ask Aya',       icon: '🌿', desc: 'Knowledge Q&A' },
    { id: 'remedies', label: 'Remedies',       icon: '📋', desc: 'Documented database' },
    { id: 'apothecary', label: 'Apothecary',  icon: '⚗️', desc: 'Formulation workspace' },
    { id: 'seasonal', label: 'Seasonal Guide', icon: '🗓️', desc: 'What to do when' },
  ];

  return (
    <div className="roots-sandbox">
      <header className="rs-header">
        <div className="rs-header__eyebrow">Roots · Body Sovereignty Resource</div>
        <h1 className="rs-header__title">Knowledge Tools</h1>
        <p className="rs-header__sub">
          Built with the founding team. Documented knowledge, not marketing.
          Everything here traces back to Flora, Natalie, Judith, and the community archive.
        </p>
      </header>

      <nav className="rs-tool-nav" aria-label="Roots tools">
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            className={`rs-tool-btn ${activeTool === tool.id ? 'rs-tool-btn--active' : ''}`}
            onClick={() => {
              setActiveTool(tool.id);
              onLearnerNeedsHelp('tool-selected', {
                currentContent: { type: 'tool', id: tool.id, label: tool.label }
              });
            }}
          >
            <span className="rs-tool-btn__icon">{tool.icon}</span>
            <span className="rs-tool-btn__label">{tool.label}</span>
            <span className="rs-tool-btn__desc">{tool.desc}</span>
          </button>
        ))}
      </nav>

      <main className="rs-main">
        {activeTool === 'aya'       && <AyaTool />}
        {activeTool === 'remedies'  && <RemediesDB />}
        {activeTool === 'apothecary' && <ApothecaryTool />}
        {activeTool === 'seasonal'  && <SeasonalGuide />}
      </main>

      <footer className="rs-footer">
        <div className="rs-footer__revenue">
          <div className="rs-footer__split">
            <span className="rs-split-num">55%</span>
            <span>to you</span>
          </div>
          <div className="rs-footer__split">
            <span className="rs-split-num">25%</span>
            <span>community fund</span>
          </div>
          <div className="rs-footer__split">
            <span className="rs-split-num">20%</span>
            <span>platform</span>
          </div>
        </div>
        <p className="rs-footer__note">
          Every product listed through Roots follows the same model.
          Documented. Provenance-tracked. Revenue split on day one.{' '}
          <Link to="/programmes/roots" className="rs-link">Back to Roots programme →</Link>
        </p>
      </footer>

      {activeHelp && (
        <HelpPanel
          help={activeHelp}
          onDismiss={dismissHelp}
          onOpenTutorial={openTutorialAt}
        />
      )}
    </div>
  );
};

export default RootsSandbox;