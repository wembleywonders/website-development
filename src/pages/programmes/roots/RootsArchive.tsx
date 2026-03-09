// src/pages/programmes/roots/RootsArchive.tsx
// The Knowledge Archive — expandable sections, podcast slots, evidence grades, Aya integration
// Architecture-first: container built for editorial flexibility as Judith's podcast grows

import React, { useState, useRef, useEffect } from 'react';
import './RootsArchive.css';

// ─── Types ───────────────────────────────────────────────────────────────────

type EvidenceGrade = 'documented' | 'research' | 'traditional' | 'contested';
type SectionStatus = 'live' | 'in-progress' | 'coming-soon' | 'judith-leads';
type PodcastStatus = 'available' | 'recorded' | 'planned' | 'none';

interface EvidenceClaim {
  claim: string;
  grade: EvidenceGrade;
  note?: string;
}

interface PodcastEpisode {
  status: PodcastStatus;
  episodeNumber?: number;
  title?: string;
  duration?: string;
  raydyoUrl?: string;
  plannedDate?: string;
}

interface ArchiveSection {
  id: string;
  tag: string;
  icon: string;
  title: string;
  summary: string;
  intro?: string;
  claims?: EvidenceClaim[];
  subsections?: { title: string; content: string }[];
  podcast: PodcastEpisode;
  status: SectionStatus;
  leadBy?: string;
  ayaTopics?: string[];   // keywords Aya uses to surface this section
}

interface SeasonalGuide {
  id: string;
  icon: string;
  title: string;
  desc: string;
  podcast: PodcastEpisode;
  status: SectionStatus;
}

// ─── Evidence grade config ────────────────────────────────────────────────────

const GRADE_CONFIG: Record<EvidenceGrade, { emoji: string; label: string; colour: string }> = {
  documented: { emoji: '📚', label: 'Documented history / established science', colour: '#86b880' },
  research:   { emoji: '🔬', label: 'Research exists, quality varies',          colour: '#60a5fa' },
  traditional:{ emoji: '🌿', label: 'Traditional practice, plausible mechanism', colour: '#fbbf24' },
  contested:  { emoji: '⚠️', label: 'Contested or insufficient evidence',        colour: '#f87171' },
};

// ─── Archive data ─────────────────────────────────────────────────────────────

const ARCHIVE_SECTIONS: ArchiveSection[] = [
  {
    id: 'hair-science',
    tag: 'Knowledge Archive',
    icon: '🔬',
    title: 'Hair Science by Texture',
    summary: 'Porosity, density, elasticity, scalp pH, sebum travel. What your hair actually is and what it actually needs.',
    intro: `Most hair care advice is written for one hair type and applied universally. The science underneath — 
      how porosity determines what products actually penetrate, how sebum travels differently down 
      coily versus straight strands, how scalp pH affects product efficacy — is rarely explained. 
      This section builds the foundation everything else rests on.`,
    claims: [
      { claim: 'Hair porosity determines how readily the cuticle absorbs and retains moisture', grade: 'documented' },
      { claim: 'Sebum travels more slowly down tightly coiled strands due to the curl pattern geometry', grade: 'documented' },
      { claim: 'Scalp pH sits between 4.5–5.5 in most individuals; products outside this range can disrupt the microbiome', grade: 'research' },
      { claim: 'Hot water opens the cuticle and can increase moisture loss in high-porosity hair', grade: 'research' },
      { claim: 'Protective styles reduce mechanical damage by limiting daily manipulation', grade: 'documented' },
    ],
    subsections: [
      { title: 'Porosity', content: 'Low, medium, and high porosity — what each means, how to assess yours, and what it tells you about which products will actually work versus which ones will sit on top of the strand.' },
      { title: 'Density & Diameter', content: 'The difference between how much hair you have and how thick each strand is. Both affect styling time, product quantity, and how heat behaves.' },
      { title: 'Elasticity', content: 'Healthy hair stretches and returns. Compromised elasticity — from heat damage, chemical processing, or protein deficiency — is often the early warning sign that something is wrong.' },
      { title: 'The Scalp', content: 'The scalp is skin. pH, sebum production, the microbiome. What disrupts it and what supports it. Why the scalp and the strand often need different things.' },
      { title: 'Sebum Travel', content: 'Why Afro-textured hair is often described as "dry" when sebum production is normal — the geometry of the curl prevents sebum from travelling down the shaft the way it does on straight hair.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 1,
      title: 'Hair Science by Texture — The Foundation',
      plannedDate: 'Spring 2026',
    },
    status: 'in-progress',
    ayaTopics: ['porosity', 'sebum', 'scalp', 'moisture', 'curl pattern', 'elasticity'],
  },
  {
    id: 'chemical-literacy',
    tag: 'Knowledge Archive',
    icon: '⚗️',
    title: 'Chemical Literacy',
    summary: "What's in relaxers, bleach, edge controls, and adhesives. Ingredient red flags. What sodium hydroxide is when it appears under a different name.",
    intro: `The beauty industry is not required to explain what its products contain in plain language. 
      INCI naming conventions, active chemical concentrations, and the practice of listing the same 
      ingredient under different names across product lines — these are literacy barriers that cost people 
      their hair and, in some cases, their health. This section removes those barriers.`,
    claims: [
      { claim: 'Sodium hydroxide (lye) is the active chemical in most relaxers; it works by permanently breaking disulfide bonds in the hair shaft', grade: 'documented' },
      { claim: 'Repeated relaxer use on already-processed hair significantly increases risk of chemical burns and breakage', grade: 'documented' },
      { claim: '"No-lye" relaxers use calcium hydroxide or guanidine carbonate — different chemistry, similar pH range and damage potential', grade: 'documented' },
      { claim: 'Prolonged use of gel-based edge control containing strong hold polymers can contribute to traction alopecia at the hairline', grade: 'research' },
      { claim: 'Formaldehyde (and formaldehyde-releasing agents like methylene glycol) in keratin treatments poses inhalation risks above safe thresholds', grade: 'documented' },
    ],
    subsections: [
      { title: 'Reading an Ingredients List', content: 'INCI naming, the 1% threshold rule, what "fragrance" conceals, and how to find the same chemical under different trade names.' },
      { title: 'Relaxers', content: 'Lye versus no-lye chemistry, application timing, the role of the base cream, what overlapping means and why it matters.' },
      { title: 'Bleach & Colour', content: 'Hydrogen peroxide concentrations, developer volumes, what lifting does to the cortex, and the cumulative damage of repeated processing.' },
      { title: 'Adhesives & Glue', content: 'What wig and extension adhesives contain, how they interact with the scalp, and what removal products do to the hairline over time.' },
      { title: 'Edge Controls & Styling Products', content: 'Hold polymers, alcohol content, and why some edge controls cause the thinning they claim to prevent.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 2,
      title: 'What\'s Actually In It — Chemical Literacy for Hair Products',
      plannedDate: 'Spring 2026',
    },
    status: 'in-progress',
    ayaTopics: ['relaxer', 'chemicals', 'ingredients', 'bleach', 'sodium hydroxide', 'edge control'],
  },
  {
    id: 'feature-pressure',
    tag: 'History & Politics',
    icon: '🏛️',
    title: 'Feature Pressure & Its History',
    summary: 'Where beauty standards came from, who built them, and who profited. The nasal index, lip standards, colorism, the nubility requirement.',
    intro: `Current beauty standards did not emerge naturally. They were constructed — often explicitly, 
      in scientific and commercial literature — to produce hierarchies of appearance that mapped onto 
      hierarchies of race, class, and gender. Understanding the construction is the first step to 
      refusing the premise. This section, led by Natalie with academic grounding from her Women's 
      Studies work at Roehampton, names the architects and the mechanisms.`,
    claims: [
      { claim: 'The nasal index (measuring nose width-to-height ratio) was used in 19th-century anthropology to racially classify and rank human populations', grade: 'documented' },
      { claim: 'The global skin lightening industry is worth over $8 billion annually; its marketing disproportionately targets women of colour in South Asia, East Asia, and sub-Saharan Africa', grade: 'documented' },
      { claim: 'Colorism — discrimination based on skin tone within racial groups — produces measurable wage differentials in the UK and US labour markets', grade: 'research' },
      { claim: 'The "nubility requirement" in advertising — the preference for pre-reproductive or barely-reproductive female bodies — has been documented since the 1980s', grade: 'research' },
      { claim: 'The Halo Code (2020) was developed in response to documented discrimination against Black natural hair in UK schools and workplaces', grade: 'documented' },
    ],
    subsections: [
      { title: 'The Construction of Standards', content: 'Who wrote the standards, what institutions enforced them, and how colonial science gave "objective" language to subjective preferences.' },
      { title: 'Colorism', content: 'Its origins in plantation hierarchies, its persistence in contemporary media and hiring practices, and its distinct effects within Black and South Asian communities.' },
      { title: 'The Hair Hierarchy', content: 'From the paper bag test to natural hair discrimination in UK schools — the documented history of Afro-textured hair as a site of regulation and resistance.' },
      { title: 'Who Profits', content: 'The commercial infrastructure built on appearance anxiety. Product markets, surgical markets, and the media that feeds both.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 3,
      title: 'Who Built These Standards — Feature Pressure and Its History',
      plannedDate: 'Summer 2026',
    },
    status: 'in-progress',
    leadBy: 'Natalie · Women\'s Studies Consultant, BA Roehampton',
    ayaTopics: ['colorism', 'beauty standards', 'halo code', 'discrimination', 'hair politics'],
  },
  {
    id: 'mixed-heritage',
    tag: 'Judith Leads',
    icon: '🤝',
    title: 'Mixed Heritage Hair',
    summary: 'For new and young mothers navigating hair care for children whose texture differs from their own. Practical, non-judgmental, evidence-based.',
    intro: `Nobody failed. The information simply wasn't passed on. This section is specifically for 
      carers — particularly mothers — whose own hair type differs significantly from their child's. 
      White mothers with mixed-race children. Caribbean mothers whose child has a looser curl pattern. 
      South Asian mothers navigating 4C hair. The knowledge gap is structural, not personal. 
      Judith Fontanelle leads this section from her work in child development and maternal support.`,
    claims: [
      { claim: 'Children\'s hair texture can differ significantly from either parent\'s due to the polygenic nature of hair texture inheritance', grade: 'documented' },
      { claim: 'Children\'s scalp pH and sebum production differ from adults, meaning adult products may be inappropriate', grade: 'research' },
      { claim: 'Wash day practices that cause pain or discomfort in childhood can create lasting negative associations with natural hair care', grade: 'traditional' },
      { claim: 'Detangling from ends to roots significantly reduces breakage compared to root-to-tip methods', grade: 'documented' },
    ],
    subsections: [
      { title: 'Understanding Your Child\'s Texture', content: 'A practical guide to assessing curl pattern, porosity, and density in children\'s hair — without the jargon.' },
      { title: 'Products for Children', content: 'What to look for, what to avoid, and why adult products often have the wrong pH, hold, or chemical profile for children.' },
      { title: 'Making Wash Day Positive', content: 'Timing, tools, temperature, and the relational aspect — how wash day can become a bonding practice rather than a battle.' },
      { title: 'School & Social Pressure', content: 'How to talk to children about their hair in a world that may not affirm it. The Halo Code in schools. When and how to advocate.' },
      { title: 'Mothers\' Training Pathway', content: 'Judith\'s planned training programme for mothers — practical workshops launching Spring 2026.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 4,
      title: 'Mixed Heritage Hair — Judith Fontanelle',
      plannedDate: 'Spring 2026',
    },
    status: 'judith-leads',
    leadBy: 'Judith Fontanelle · Director of Community Engagement',
    ayaTopics: ['mixed heritage', 'children\'s hair', 'wash day', 'mothers', 'child development'],
  },
  {
    id: 'remedies',
    tag: 'Practical Resource',
    icon: '🌿',
    title: 'Remedies & Preventatives',
    summary: "Evidence-graded solutions for traction alopecia, chemical damage, hyperpigmentation, bleaching damage. What works, what doesn't, what the research actually says.",
    intro: `This section applies the evidence grading system honestly. Some remedies have strong clinical 
      support. Others have traditional use, plausible mechanisms, and limited formal research. 
      A few popular recommendations have no credible evidence at all. The grading tells you which 
      is which — so you can make your own informed decision rather than relying on marketing claims 
      or anecdote alone.`,
    claims: [
      { claim: 'Minoxidil (2% or 5%) has the strongest clinical evidence for promoting hair regrowth in androgenetic alopecia and some traction alopecia cases', grade: 'documented' },
      { claim: 'Castor oil is widely used for hair growth; evidence for efficacy is limited to anecdote and one small study', grade: 'traditional' },
      { claim: 'Reducing tension at the hairline by loosening braids, weaves, and extensions is the most evidence-supported intervention for traction alopecia', grade: 'documented' },
      { claim: 'Niacinamide (vitamin B3) has documented evidence for reducing hyperpigmentation via inhibition of melanosome transfer', grade: 'documented' },
      { claim: 'Protein treatments can temporarily improve elasticity in chemically damaged hair; overuse causes brittleness', grade: 'research' },
      { claim: 'Rice water rinses are widely promoted for hair growth; current evidence is insufficient to support this claim', grade: 'contested' },
    ],
    subsections: [
      { title: 'Traction Alopecia', content: 'Causes, stages, and the evidence hierarchy for intervention — from style modification to clinical treatment.' },
      { title: 'Chemical Damage Recovery', content: 'Protein-moisture balance, trimming versus waiting, and what actually helps versus what prolongs the damage.' },
      { title: 'Hyperpigmentation', content: 'Causes (including post-inflammatory), ingredient evidence (niacinamide, azelaic acid, kojic acid), and the risk profile of some popular lightening agents.' },
      { title: 'Scalp Conditions', content: 'Seborrhoeic dermatitis, scalp psoriasis, contact dermatitis — when to treat with products and when to see a dermatologist.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 5,
      title: 'What Actually Works — Remedies, Evidence, and Honest Answers',
      plannedDate: 'Summer 2026',
    },
    status: 'in-progress',
    ayaTopics: ['traction alopecia', 'hair loss', 'remedies', 'chemical damage', 'hyperpigmentation', 'castor oil'],
  },
  {
    id: 'legal-rights',
    tag: 'Rights & Law',
    icon: '⚖️',
    title: 'Legal Rights',
    summary: 'The Halo Code. The Equality Act. Workplace discrimination. What you can do when it happens to you or your child.',
    intro: `You have more legal protection than most people know — and less than you deserve. 
      This section covers what the law actually says, where the gaps are, and what practical 
      steps are available when discrimination happens in schools, workplaces, or service settings. 
      The legal content is reviewed against current UK legislation. It is not legal advice — 
      it is the information that helps you decide when to seek it.`,
    claims: [
      { claim: 'The Halo Code (2020) is a voluntary commitment by schools and employers not to discriminate against natural Afro hair; it has no statutory force', grade: 'documented' },
      { claim: 'The Equality Act 2010 protects against race discrimination, which courts have found can include discrimination based on a racial group\'s hair texture in some circumstances', grade: 'documented' },
      { claim: 'As of 2024, the UK has no explicit legislation protecting natural hair, unlike California\'s CROWN Act (2019)', grade: 'documented' },
      { claim: 'Employment tribunals have upheld claims related to natural hair discrimination under existing race provisions', grade: 'documented' },
    ],
    subsections: [
      { title: 'The Halo Code', content: 'What it is, who has signed it, how to find out if your school or employer is a signatory, and what to do when a signatory doesn\'t comply.' },
      { title: 'The Equality Act 2010', content: 'What it covers, what "race" means in law, and how hair discrimination claims have been brought and won.' },
      { title: 'In Schools', content: 'Uniform policies, school rules about hair, what constitutes indirect discrimination, and how to challenge policies formally.' },
      { title: 'In the Workplace', content: 'Dress codes, professionalism standards, the grievance process, and when to contact ACAS or an employment solicitor.' },
      { title: 'In Services', content: 'Salons, healthcare settings, and other services — what counts as discrimination and what routes are available.' },
    ],
    podcast: {
      status: 'planned',
      episodeNumber: 6,
      title: 'Know Your Rights — Hair, Appearance, and UK Law',
      plannedDate: 'Summer 2026',
    },
    status: 'in-progress',
    ayaTopics: ['halo code', 'equality act', 'discrimination', 'legal rights', 'school uniform', 'workplace'],
  },
];

const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    id: 'back-to-school',
    icon: '🎒',
    title: 'Back to School',
    desc: 'Protective styles, school regulations, the Halo Code in schools, morning routines under pressure.',
    podcast: { status: 'planned', plannedDate: 'August 2026' },
    status: 'coming-soon',
  },
  {
    id: 'winter-hair',
    icon: '❄️',
    title: 'Winter Hair Care',
    desc: 'Cold air, central heating, hat damage, scalp health. What mainstream advice misses about Afro-textured hair in winter.',
    podcast: { status: 'planned', plannedDate: 'November 2026' },
    status: 'coming-soon',
  },
  {
    id: 'half-term-reset',
    icon: '🍂',
    title: 'Half-Term Reset',
    desc: 'The wash day, taking down protective styles, the reinstall. Making it a positive experience for children.',
    podcast: { status: 'planned', plannedDate: 'October 2026' },
    status: 'coming-soon',
  },
  {
    id: 'spring-summer',
    icon: '🌸',
    title: 'Spring & Summer',
    desc: 'Humidity, UV damage, swimming, holiday hair, sweat and scalp care.',
    podcast: { status: 'planned', plannedDate: 'May 2026' },
    status: 'coming-soon',
  },
  {
    id: 'hairdressers',
    icon: '💇🏾',
    title: 'Dealing with Hairdressers',
    desc: "Your rights in the chair. What to ask. Scripts for speaking up. What to do when something is applied without consent.",
    podcast: { status: 'planned', plannedDate: 'Spring 2026' },
    status: 'coming-soon',
  },
  {
    id: 'accessories',
    icon: '🪢',
    title: 'Accessories',
    desc: 'What damages hair, what protects it, and how choosing accessories becomes an act of self-definition.',
    podcast: { status: 'planned', plannedDate: 'Spring 2026' },
    status: 'coming-soon',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const EvidenceBadge: React.FC<{ grade: EvidenceGrade }> = ({ grade }) => {
  const config = GRADE_CONFIG[grade];
  return (
    <span
      className="ra-evidence-badge"
      style={{ '--badge-colour': config.colour } as React.CSSProperties}
      title={config.label}
    >
      {config.emoji}
    </span>
  );
};

const PodcastSlot: React.FC<{ episode: PodcastEpisode }> = ({ episode }) => {
  if (episode.status === 'none') return null;

  if (episode.status === 'available' && episode.raydyoUrl) {
    return (
      <div className="ra-podcast-slot ra-podcast-slot--live">
        <div className="ra-podcast-slot__label">
          <span className="ra-podcast-dot ra-podcast-dot--live" />
          Episode {episode.episodeNumber} · Now on Rayd-yo
        </div>
        <div className="ra-podcast-slot__title">{episode.title}</div>
        <div className="ra-podcast-slot__meta">{episode.duration}</div>
        <a href={episode.raydyoUrl} className="ra-podcast-slot__play" target="_blank" rel="noopener noreferrer">
          ▶ Listen on Rayd-yo
        </a>
      </div>
    );
  }

  if (episode.status === 'recorded') {
    return (
      <div className="ra-podcast-slot ra-podcast-slot--recorded">
        <div className="ra-podcast-slot__label">
          <span className="ra-podcast-dot ra-podcast-dot--recorded" />
          Episode {episode.episodeNumber} · Recorded — editing now
        </div>
        <div className="ra-podcast-slot__title">{episode.title}</div>
      </div>
    );
  }

  return (
    <div className="ra-podcast-slot ra-podcast-slot--planned">
      <div className="ra-podcast-slot__label">
        <span className="ra-podcast-dot ra-podcast-dot--planned" />
        Episode {episode.episodeNumber} · {episode.plannedDate}
      </div>
      <div className="ra-podcast-slot__title">{episode.title}</div>
      <div className="ra-podcast-slot__note">
        Judith is completing her podcasting course at K2K Radio. Episodes publish to Rayd-yo as they're recorded.
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: SectionStatus; leadBy?: string }> = ({ status, leadBy }) => {
  const config = {
    'live':          { label: '● Live',        cls: 'live' },
    'in-progress':   { label: '◐ In progress', cls: 'progress' },
    'coming-soon':   { label: '○ Coming soon', cls: 'soon' },
    'judith-leads':  { label: '✦ Judith leads', cls: 'judith' },
  }[status];

  return (
    <div className={`ra-status-badge ra-status-badge--${config.cls}`}>
      {config.label}
      {leadBy && <span className="ra-status-badge__lead"> · {leadBy}</span>}
    </div>
  );
};

// ─── Archive Section (expandable) ────────────────────────────────────────────

interface ArchiveSectionCardProps {
  section: ArchiveSection;
  onAyaOpen: (topic: string) => void;
}

const ArchiveSectionCard: React.FC<ArchiveSectionCardProps> = ({ section, onAyaOpen }) => {
  const [expanded, setExpanded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.maxHeight = expanded
        ? `${bodyRef.current.scrollHeight}px`
        : '0px';
    }
  }, [expanded]);

  return (
    <div
      className={`ra-card ra-card--${section.status} ${expanded ? 'ra-card--open' : ''}`}
      id={`archive-${section.id}`}
    >
      {/* ── Header (always visible) ── */}
      <button
        className="ra-card__header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="ra-card__header-left">
          <span className="ra-card__tag">{section.tag}</span>
          <div className="ra-card__title-row">
            <span className="ra-card__icon">{section.icon}</span>
            <h3 className="ra-card__title">{section.title}</h3>
          </div>
          <p className="ra-card__summary">{section.summary}</p>
        </div>
        <div className="ra-card__header-right">
          <StatusBadge status={section.status} />
          {section.podcast.status !== 'none' && (
            <div className="ra-card__podcast-indicator">
              <span className={`ra-podcast-dot ra-podcast-dot--${section.podcast.status}`} />
              <span>
                {section.podcast.status === 'available' ? 'Episode live' :
                 section.podcast.status === 'recorded'  ? 'Episode recorded' :
                 `Ep. ${section.podcast.episodeNumber} planned`}
              </span>
            </div>
          )}
          <span className="ra-card__chevron">{expanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* ── Expandable body ── */}
      <div className="ra-card__body" ref={bodyRef}>
        <div className="ra-card__body-inner">

          {/* Intro */}
          {section.intro && (
            <p className="ra-card__intro">{section.intro}</p>
          )}

          {/* Podcast slot */}
          <PodcastSlot episode={section.podcast} />

          {/* Evidence claims */}
          {section.claims && section.claims.length > 0 && (
            <div className="ra-card__claims">
              <h4 className="ra-card__claims-title">Evidence summary</h4>
              <ul className="ra-card__claims-list">
                {section.claims.map((c, i) => (
                  <li key={i} className="ra-card__claim">
                    <EvidenceBadge grade={c.grade} />
                    <span className="ra-card__claim-text">{c.claim}</span>
                    {c.note && <span className="ra-card__claim-note">{c.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subsections */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="ra-card__subsections">
              <h4 className="ra-card__subsections-title">What this section covers</h4>
              <div className="ra-card__subsections-grid">
                {section.subsections.map((sub, i) => (
                  <div key={i} className="ra-card__subsection">
                    <h5 className="ra-card__subsection-title">{sub.title}</h5>
                    <p className="ra-card__subsection-content">{sub.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aya prompt */}
          {section.ayaTopics && section.ayaTopics.length > 0 && (
            <div className="ra-card__aya-prompt">
              <span className="ra-card__aya-icon">🌿</span>
              <div>
                <span className="ra-card__aya-label">Ask Aya about this section:</span>
                <div className="ra-card__aya-topics">
                  {section.ayaTopics.map((topic) => (
                    <button
                      key={topic}
                      className="ra-card__aya-topic"
                      onClick={() => onAyaOpen(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// ─── Seasonal guide card ──────────────────────────────────────────────────────

const SeasonalCard: React.FC<{ guide: SeasonalGuide; onAyaOpen: (t: string) => void }> = ({ guide, onAyaOpen }) => (
  <div className="ra-seasonal-card">
    <div className="ra-seasonal-card__icon">{guide.icon}</div>
    <h3 className="ra-seasonal-card__title">{guide.title}</h3>
    <p className="ra-seasonal-card__desc">{guide.desc}</p>
    <div className="ra-seasonal-card__footer">
      {guide.podcast.plannedDate && (
        <div className="ra-seasonal-card__podcast">
          <span className="ra-podcast-dot ra-podcast-dot--planned" />
          {guide.podcast.plannedDate}
        </div>
      )}
      <button
        className="ra-seasonal-card__aya"
        onClick={() => onAyaOpen(guide.title.toLowerCase())}
      >
        Ask Aya 🌿
      </button>
    </div>
  </div>
);

// ─── Aya drawer ───────────────────────────────────────────────────────────────

interface AyaDrawerProps {
  isOpen: boolean;
  initialTopic: string;
  onClose: () => void;
}

const AyaDrawer: React.FC<AyaDrawerProps> = ({ isOpen, initialTopic, onClose }) => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && initialTopic) {
      setMessage(initialTopic);
      setSubmitted(false);
    }
  }, [isOpen, initialTopic]);

  const handleSend = () => {
    if (message.trim()) {
      setSubmitted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ra-aya-overlay" onClick={onClose}>
      <div className="ra-aya-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="ra-aya-drawer__close" onClick={onClose}>✕</button>

        <div className="ra-aya-drawer__header">
          <div className="ra-aya-drawer__avatar">🌿</div>
          <div>
            <h3 className="ra-aya-drawer__name">Aya</h3>
            <p className="ra-aya-drawer__role">Body sovereignty knowledge keeper</p>
          </div>
        </div>

        {!submitted ? (
          <>
            <div className="ra-aya-drawer__intro">
              <p>
                I'm Aya — the Roots knowledge keeper. I can help you find information
                across the archive: hair science, ingredients, remedies, legal rights,
                and mixed heritage hair care.
              </p>
              <p>
                I'm not a replacement for a trichologist or dermatologist. When a
                question is beyond the archive, I'll say so clearly.
              </p>
            </div>

            <div className="ra-aya-drawer__building">
              <span>✦</span>
              <span>
                Aya's full conversational capability is being built as Judith's podcast
                episodes are recorded. Each episode expands what Aya knows. 
                Leave your question below — it shapes what she learns first.
              </span>
            </div>

            <div className="ra-aya-drawer__input-row">
              <input
                className="ra-aya-drawer__input"
                type="text"
                placeholder="What do you want Aya to know about?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                autoFocus
              />
              <button className="roots-btn roots-btn--primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="ra-aya-drawer__confirmed">
            <div className="ra-aya-drawer__confirmed-icon">✦</div>
            <p>Thank you — we've noted: <em>"{message}"</em></p>
            <p>This shapes what Aya learns as the archive is built. We'll make sure this question is answered.</p>
            <button className="roots-btn roots-btn--ghost" onClick={() => setSubmitted(false)}>
              Ask another question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface RootsArchiveProps {
  onAyaOpen?: (topic: string) => void;
}

const RootsArchive: React.FC<RootsArchiveProps> = () => {
  const [ayaOpen, setAyaOpen]   = useState(false);
  const [ayaTopic, setAyaTopic] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const openAya = (topic: string) => {
    setAyaTopic(topic);
    setAyaOpen(true);
  };

  const filters = [
    { id: 'all',       label: 'All sections' },
    { id: 'knowledge', label: '🔬 Knowledge Archive' },
    { id: 'history',   label: '🏛️ History & Politics' },
    { id: 'practical', label: '🌿 Practical Resource' },
    { id: 'rights',    label: '⚖️ Rights & Law' },
    { id: 'judith',    label: '✦ Judith Leads' },
  ];

  const filteredSections = ARCHIVE_SECTIONS.filter((s) => {
    if (activeFilter === 'all')      return true;
    if (activeFilter === 'knowledge') return s.tag === 'Knowledge Archive';
    if (activeFilter === 'history')   return s.tag === 'History & Politics';
    if (activeFilter === 'practical') return s.tag === 'Practical Resource';
    if (activeFilter === 'rights')    return s.tag === 'Rights & Law';
    if (activeFilter === 'judith')    return s.status === 'judith-leads';
    return true;
  });

  return (
    <div className="roots-archive-page" id="archive">

      {/* ── Archive header ── */}
      <div className="ra-header">
        <div className="ra-header__eyebrow">The Knowledge Archive</div>
        <h2 className="ra-header__title">Evidence-graded.<br />Honest about what works.</h2>
        <p className="ra-header__sub">
          Built live as Judith's podcast series at K2K Radio progresses. Each episode
          becomes a section. Each section grows as the founding team adds depth.
          The archive is never finished — it reflects what we currently know.
        </p>

        {/* Podcast series callout */}
        <div className="ra-podcast-series">
          <div className="ra-podcast-series__icon">🎙️</div>
          <div>
            <div className="ra-podcast-series__label">Judith Fontanelle · K2K Radio → Rayd-yo</div>
            <div className="ra-podcast-series__title">Roots Podcast Series</div>
            <div className="ra-podcast-series__desc">
              Judith is completing her podcasting course at K2K Radio. As episodes are recorded,
              they publish to Rayd-yo — and the corresponding archive section goes live.
              The podcast IS the archive, building in public.
            </div>
          </div>
        </div>

        {/* Evidence grade legend */}
        <div className="ra-grade-legend">
          {Object.entries(GRADE_CONFIG).map(([key, config]) => (
            <span key={key} className="ra-grade-legend__item" style={{ '--badge-colour': config.colour } as React.CSSProperties}>
              {config.emoji} <span>{config.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="ra-filter-bar">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`ra-filter-btn ${activeFilter === f.id ? 'ra-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Archive sections ── */}
      <div className="ra-sections">
        {filteredSections.map((section) => (
          <ArchiveSectionCard
            key={section.id}
            section={section}
            onAyaOpen={openAya}
          />
        ))}
      </div>

      {/* ── Seasonal guides ── */}
      <div className="ra-seasonal-block">
        <div className="ra-seasonal-header">
          <h3 className="ra-seasonal-header__title">Seasonal & Practical Guides</h3>
          <p className="ra-seasonal-header__sub">
            The content people search for at 10pm the Sunday before school starts.
            Each guide connects upward to the archive, outward to remedies, across to the Apothecary.
          </p>
        </div>
        <div className="ra-seasonal-grid">
          {SEASONAL_GUIDES.map((guide) => (
            <SeasonalCard key={guide.id} guide={guide} onAyaOpen={openAya} />
          ))}
        </div>
      </div>

      {/* ── Aya FAB ── */}
      <button className="ra-aya-fab" onClick={() => openAya('')} aria-label="Ask Aya">
        <span>🌿</span>
        <span>Ask Aya</span>
      </button>

      {/* ── Aya drawer ── */}
      <AyaDrawer isOpen={ayaOpen} initialTopic={ayaTopic} onClose={() => setAyaOpen(false)} />

    </div>
  );
};

export default RootsArchive;