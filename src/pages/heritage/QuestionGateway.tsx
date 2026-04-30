import React, { useState } from 'react';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION GATEWAY
// Entry by curiosity rather than prior knowledge.
//
// Every question here is real — the kind of question a visitor might arrive
// with, or that the archive is designed to provoke. Each question leads to
// a specific thread, era, or place.
//
// Design principle: the questions should feel personal and unfinished.
// Not "What was the British Empire Exhibition?" (encyclopaedic)
// but "What was on this land before the stadium?" (personal, spatial, now)
//
// Categories are broad — sport, music, law, place, economics — but the
// questions within them are specific and surprising.
// ─────────────────────────────────────────────────────────────────────────────

export interface GatewayQuestion {
  id:          string;
  question:    string;
  hook:        string;          // One-sentence why this matters
  category:    QuestionCategory;
  difficulty:  'entry' | 'intermediate' | 'deep';
  leadsTo: {
    type:      'thread' | 'era' | 'place' | 'oral-history';
    id:        string;
    label:     string;
  };
  teaser:      string;          // First paragraph of the answer — enough to pull them in
  tags:        string[];
}

type QuestionCategory = 'sport' | 'music' | 'law' | 'place' | 'economics' | 'people';

const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  sport:      'Sport',
  music:      'Music',
  law:        'Law & Rights',
  place:      'Place',
  economics:  'Economics',
  people:     'People',
};

const CATEGORY_COLOURS: Record<QuestionCategory, string> = {
  sport:      '#f97316',
  music:      '#a855f7',
  law:        '#f87171',
  place:      '#3ecfcf',
  economics:  '#d4a853',
  people:     '#4ade80',
};

const GATEWAY_QUESTIONS: GatewayQuestion[] = [
  {
    id:         'why-no-arthur-wharton',
    question:   'Why don\'t we know Arthur Wharton?',
    hook:       'He was the world\'s fastest man and the first Black professional footballer. He died in an unmarked grave.',
    category:   'sport',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'same-rule-different-arenas',
      label: 'The Same Rule, Different Arenas',
    },
    teaser:     'Arthur Wharton was born in Ghana in 1865, came to Britain to train as a Methodist minister, and ended up running the 100 yards in 10 seconds flat — a world record. He was playing professional football for Preston North End in the same year. The football authorities of his era operated an unwritten colour bar. When it became formal policy, Wharton was already too old to challenge it. He died in 1930. No plaque. A community campaign funded a gravestone in 1997.',
    tags:       ['football', 'athletics', 'Victorian', 'Ghana', 'racism-in-sport'],
  },
  {
    id:         'why-michaela-turned-down-million',
    question:   'Why did Michaela Coel turn down $1 million from Netflix?',
    hook:       'She kept the copyright. What that actually means — and why it matters more than the money.',
    category:   'economics',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'who-owns-the-culture',
      label: 'Who Owns the Culture?',
    },
    teaser:     'Netflix offered $1 million for I May Destroy You on the condition that she surrender her copyright. She declined. The principle is simple: copyright is the right to determine what happens to the work after it\'s made — who licenses it, in which territories, for what purposes, at what price. Without copyright, a creator becomes an employee of their own work. Michaela Coel\'s 2018 MacTaggart lecture explains the structural conditions precisely. The industry praised the lecture and continued the same practices.',
    tags:       ['copyright', 'television', 'ownership', 'Netflix', 'MacTaggart'],
  },
  {
    id:         'what-on-wembley-land',
    question:   'What was on this land before Wembley Stadium?',
    hook:       '1924. The British Empire Exhibition. 27 million visitors came to see an empire. The empire\'s subjects now live here.',
    category:   'place',
    difficulty: 'entry',
    leadsTo: {
      type:  'place',
      id:    'british-empire-exhibition-site',
      label: 'The Institutional Map',
    },
    teaser:     'The 1924 British Empire Exhibition was the largest international exhibition ever held in Britain. It occupied the site that is now Wembley Park. The permanent structures it left behind included the original Wembley Stadium. The exhibition displayed the peoples and resources of 58 imperial territories as exhibits — commodities alongside cotton, rubber, and tea. The borough those grounds now occupy — Brent — is the most ethnically diverse in the United Kingdom. The descendants of the 1924 Exhibition\'s "subjects" are now the majority population.',
    tags:       ['Wembley', '1924-exhibition', 'empire', 'Brent', 'history'],
  },
  {
    id:         'what-happened-commonwealth-institute',
    question:   'What happened to the Commonwealth Institute?',
    hook:       'It was built to represent 50 nations. It became a design museum. Nobody asked the 50 nations.',
    category:   'place',
    difficulty: 'intermediate',
    leadsTo: {
      type:  'place',
      id:    'commonwealth-institute',
      label: 'The Institutional Map',
    },
    teaser:     'The Commonwealth Institute opened in 1962, designed by Kenyan-born architect Robert Matthew. It housed permanent exhibitions from 50 Commonwealth nations and was specifically designed as a post-imperial cultural institution. It closed in 2002. After 14 years of dispute over its future, it was converted into the Design Museum at a cost of £83 million. No community consultation took place with representatives of the 50 nations it was built to represent. The tent-like roof — Grade I listed — was preserved. The mission wasn\'t.',
    tags:       ['Commonwealth', 'Kensington', 'Design-Museum', 'institutional-geography'],
  },
  {
    id:         'where-did-grime-come-from',
    question:   'Where did grime actually come from?',
    hook:       'Not from nowhere. From a specific lineage: Jamaica → sound systems → UK garage → pirate radio → Bow.',
    category:   'music',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'kingston-to-the-grid',
      label: 'From Kingston to the Grid',
    },
    teaser:     'Grime emerged from East London pirate radio stations around 2002 — Rinse FM, Deja Vu, Heat FM. But the pirate stations were themselves the latest iteration of a sound system tradition that arrived with the Windrush generation in 1948. Sound systems were built because Caribbean communities were excluded from mainstream venues. The exclusion created the infrastructure. The mainstream noticed grime a decade after it emerged, absorbed the aesthetic, and left the economic model behind. This is the sound system story, one generation on.',
    tags:       ['grime', 'pirate-radio', 'sound-systems', 'Windrush', 'East-London'],
  },
  {
    id:         'why-len-johnson-no-title',
    question:   'Why was Len Johnson barred from the British boxing title?',
    hook:       'He won over 100 fights. The rule that excluded him was written down. In plain English.',
    category:   'sport',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'same-rule-different-arenas',
      label: 'The Same Rule, Different Arenas',
    },
    teaser:     'The British Boxing Board of Control maintained an explicit rule that the British title could only be held by a "British-born white subject". This was not an unwritten convention — it was stated policy. Len Johnson, born in Manchester in 1902, won over 100 professional fights and was regarded as the best middleweight in Britain throughout the 1920s. He could not challenge for the title. The rule remained in force until 1948. Johnson spent the rest of his life organising for the Communist Party and for racial equality in Manchester.',
    tags:       ['boxing', 'Johnson', 'Manchester', 'colour-bar', 'law'],
  },
  {
    id:         'why-carnival-was-political',
    question:   'Was the Notting Hill Carnival always political?',
    hook:       'It was founded as political resistance. It has never been anything else.',
    category:   'people',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'joy-as-politics',
      label: 'Joy as Politics',
    },
    teaser:     'Claudia Jones founded the Carnival in 1959 as a direct political response to the Notting Hill race riots of 1958. The first Carnival was held indoors at St Pancras Town Hall. It moved outdoors after Jones\'s death in 1964. The Carnival was never primarily a cultural celebration of Caribbean heritage — though it became that too. It was an act of claiming public space that had been violently contested. The framing of it as "a colourful festival" is the erasure of its founding purpose.',
    tags:       ['Carnival', 'Claudia-Jones', 'Notting-Hill', 'riots', 'resistance'],
  },
  {
    id:         'slavery-compensation-who-paid',
    question:   'Who received the £20 million slavery compensation in 1833 — and who\'s still paying for it?',
    hook:       'The compensation went to slaveholders. British taxpayers finished paying off the debt in 2015.',
    category:   'economics',
    difficulty: 'intermediate',
    leadsTo: {
      type:  'era',
      id:    'abolition-era',
      label: 'The Abolition Era',
    },
    teaser:     'The Slavery Abolition Act of 1833 freed enslaved people in British territories but required them to serve an "apprenticeship" of up to six years. It also allocated £20 million — equivalent to 40% of the British government\'s annual budget — as compensation. The compensation went to slaveholders, not to the enslaved. The British government borrowed to pay it. The debt was still being repaid in 2015. The descendants of the enslaved received no compensation. In 2023, the University of Cambridge completed a reparations audit; its endowment had substantial origins in slavery.',
    tags:       ['slavery', 'compensation', 'abolition', 'reparations', 'economics'],
  },
  {
    id:         'why-jazzie-b-important',
    question:   'What was Jazzie B actually building?',
    hook:       'Not a band. An economic model. One that predated the streaming era by 30 years.',
    category:   'economics',
    difficulty: 'intermediate',
    leadsTo: {
      type:  'thread',
      id:    'who-owns-the-culture',
      label: 'Who Owns the Culture?',
    },
    teaser:     'Soul II Soul was a shop before it was a label, a label before it was a recording act, and a recording act that retained ownership of the catalogue. Jazzie B\'s 55/45 split — 55% to the artist — prefigured the argument that Wembley Wonders formalised as 55/25/20. The music industry tried to buy the music and ignore the infrastructure. The infrastructure was the point. What Soul II Soul built in north London in the late 1980s was a proof of concept for community-owned cultural enterprise.',
    tags:       ['Soul-II-Soul', 'Jazzie-B', 'ownership', 'north-London', 'economics'],
  },
  {
    id:         'where-are-high-commissions',
    question:   'Why are all the Commonwealth High Commissions in Kensington and Mayfair?',
    hook:       'The communities those nations built are in Brent, Hackney, and Brixton. The institutions are 40 minutes away.',
    category:   'place',
    difficulty: 'intermediate',
    leadsTo: {
      type:  'place',
      id:    'jamaican-high-commission',
      label: 'The Institutional Map',
    },
    teaser:     'The diplomatic geography of post-colonial London places the institutions of 53 nations in the most expensive boroughs in Britain. The Jamaican High Commission is in Kensington. The Trinidadian High Commission is in Belgrave Square. The Ghanaian High Commission is also in Belgrave Square — in a building rented from the Duke of Westminster. The communities these nations built — through the Windrush generation\'s arrival and settlement — are concentrated in Brent, Hackney, Lewisham, and Peckham. The distance between institution and community was not accidental.',
    tags:       ['diplomacy', 'Kensington', 'Mayfair', 'High-Commissions', 'geography'],
  },
  {
    id:         'daley-thompson-why-remembered',
    question:   'Why is Daley Thompson remembered as controversial rather than just brilliant?',
    hook:       'He was brilliant. The "controversy" was refusing to perform gratitude for existing.',
    category:   'sport',
    difficulty: 'entry',
    leadsTo: {
      type:  'thread',
      id:    'joy-as-politics',
      label: 'Joy as Politics',
    },
    teaser:     'Daley Thompson won Olympic decathlon gold in 1980 and 1984. His celebrations were conspicuously, defiantly public — the vest at the 1984 Games that read "Is the world\'s greatest athlete gay?" was not, in the context of 1984 Britain, a throwaway joke. It was a statement about whose body, whose joy, and whose Britishness was being performed for whom. He was born in Notting Hill the year before the riots that prompted Claudia Jones to found the Carnival. The geography is not a coincidence.',
    tags:       ['Daley-Thompson', 'Olympics', 'decathlon', 'Notting-Hill', 'joy'],
  },
  {
    id:         'windrush-scandal-how',
    question:   'How did the Windrush Scandal happen if people had been here for 50 years?',
    hook:       'The documents that proved they had the right to stay were held by the Home Office. The Home Office destroyed them in 2010.',
    category:   'law',
    difficulty: 'entry',
    leadsTo: {
      type:  'era',
      id:    'digital-era',
      label: 'The Windrush Scandal',
    },
    teaser:     'The Windrush generation arrived under the British Nationality Act 1948, which gave Commonwealth citizens the right to live and work in Britain. Many never formalised their residency documentation because the law said they didn\'t need to. The "hostile environment" policy introduced in 2012 required documentary proof of right to remain — proof the Home Office had been responsible for maintaining and had destroyed. The people affected were asked to prove what the government had deliberately made unprovable. Some lost their homes, their jobs, and their NHS access. Some were deported.',
    tags:       ['Windrush', 'hostile-environment', 'Home-Office', 'immigration', 'law'],
  },
];

// ── FEATURED QUESTION ─────────────────────────────────────────────────────────
// Rotates daily (uses date to seed) — gives the page a sense of editorial
// curation without requiring a CMS.
const getFeaturedIndex = () => {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return day % GATEWAY_QUESTIONS.length;
};

interface Props { ctx: CommonsContext; }

const QuestionGateway: React.FC<Props> = ({ ctx }) => {
  const [activeQ, setActiveQ] = useState<GatewayQuestion | null>(null);
  const [filterCategory, setFilterCategory] = useState<QuestionCategory | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<GatewayQuestion['difficulty'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const featuredIndex = getFeaturedIndex();

  const filtered = GATEWAY_QUESTIONS.filter(q => {
    if (filterCategory !== 'all' && q.category !== filterCategory) return false;
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false;
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(search) ||
        q.hook.toLowerCase().includes(search) ||
        q.tags.some(t => t.toLowerCase().includes(search))
      );
    }
    return true;
  });

  const openQuestion = (q: GatewayQuestion) => {
    setActiveQ(q);
    ctx.setActiveId(q.id);
  };

  const closeQuestion = () => {
    setActiveQ(null);
    ctx.setActiveId(null);
  };

  const handleLeadsTo = (q: GatewayQuestion) => {
    if (q.leadsTo.type === 'oral-history') {
      // Would navigate — handled by Link in real implementation
      return;
    }
    ctx.setMode(q.leadsTo.type as any);
    ctx.setActiveId(q.leadsTo.id);
  };

  if (activeQ) {
    return (
      <div className="kc-question-detail">
        <button className="kc-back-btn" onClick={closeQuestion}>← All questions</button>

        <div
          className="kc-question-detail-header"
          style={{ '--q-colour': CATEGORY_COLOURS[activeQ.category] } as React.CSSProperties}
        >
          <div className="kc-question-meta-row">
            <span className="kc-question-category-badge">
              {CATEGORY_LABELS[activeQ.category]}
            </span>
            <span className={`kc-question-difficulty kc-question-difficulty--${activeQ.difficulty}`}>
              {activeQ.difficulty}
            </span>
          </div>

          <h2 className="kc-question-detail-q">{activeQ.question}</h2>
          <p className="kc-question-hook">{activeQ.hook}</p>
        </div>

        <div className="kc-question-teaser">
          <span className="kc-question-teaser-label">The short answer</span>
          <p className="kc-question-teaser-text">{activeQ.teaser}</p>
        </div>

        <div className="kc-question-leads-to">
          <span className="kc-question-leads-label">For the full story →</span>
          <button
            className="kc-question-leads-btn"
            onClick={() => handleLeadsTo(activeQ)}
          >
            {activeQ.leadsTo.type === 'thread' && '⟳ '}
            {activeQ.leadsTo.type === 'era' && '│ '}
            {activeQ.leadsTo.type === 'place' && '◎ '}
            {activeQ.leadsTo.label}
          </button>
        </div>

        <div className="kc-question-tags">
          {activeQ.tags.map(tag => (
            <span key={tag} className="kc-question-tag">{tag}</span>
          ))}
        </div>

        {/* Find related questions */}
        <div className="kc-question-related">
          <span className="kc-question-related-label">Related questions</span>
          <div className="kc-question-related-list">
            {GATEWAY_QUESTIONS
              .filter(q => q.id !== activeQ.id && q.category === activeQ.category)
              .slice(0, 3)
              .map(q => (
                <button
                  key={q.id}
                  className="kc-question-related-btn"
                  onClick={() => setActiveQ(q)}
                >
                  {q.question}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  const featured = GATEWAY_QUESTIONS[featuredIndex];

  return (
    <div className="kc-questions">

      {/* Featured question of the day */}
      <div
        className="kc-question-featured"
        style={{ '--q-colour': CATEGORY_COLOURS[featured.category] } as React.CSSProperties}
      >
        <span className="kc-featured-label">Question of the day</span>
        <h3 className="kc-featured-q">{featured.question}</h3>
        <p className="kc-featured-hook">{featured.hook}</p>
        <button className="kc-featured-cta" onClick={() => openQuestion(featured)}>
          Find the answer →
        </button>
      </div>

      {/* Search and filters */}
      <div className="kc-question-controls">
        <div className="kc-question-search-wrap">
          <input
            type="search"
            className="kc-question-search"
            placeholder="Search questions, topics, people..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search questions"
          />
        </div>

        <div className="kc-filter-row">
          {(['all', ...Object.keys(CATEGORY_LABELS)] as (QuestionCategory | 'all')[]).map(c => (
            <button
              key={c}
              className={`kc-filter-btn${filterCategory === c ? ' active' : ''}`}
              style={c !== 'all' ? { '--filter-colour': CATEGORY_COLOURS[c as QuestionCategory] } as React.CSSProperties : {}}
              onClick={() => setFilterCategory(c)}
            >
              {c === 'all' ? 'All' : CATEGORY_LABELS[c as QuestionCategory]}
            </button>
          ))}
        </div>

        <div className="kc-filter-row">
          {(['all', 'entry', 'intermediate', 'deep'] as const).map(d => (
            <button
              key={d}
              className={`kc-sort-btn${filterDifficulty === d ? ' active' : ''}`}
              onClick={() => setFilterDifficulty(d)}
            >
              {d === 'all' ? 'All levels' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Question grid */}
      <div className="kc-question-grid">
        {filtered.length === 0 ? (
          <div className="kc-question-empty">
            <p>No questions match your search. Try a different term, or
              <button className="kc-question-empty-reset" onClick={() => { setSearchQuery(''); setFilterCategory('all'); setFilterDifficulty('all'); }}>
                {' '}reset filters
              </button>.
            </p>
          </div>
        ) : filtered.map(q => (
          <button
            key={q.id}
            className="kc-question-card"
            style={{ '--q-colour': CATEGORY_COLOURS[q.category] } as React.CSSProperties}
            onClick={() => openQuestion(q)}
          >
            <div className="kc-question-card-meta">
              <span className="kc-question-category-badge kc-question-category-badge--sm">
                {CATEGORY_LABELS[q.category]}
              </span>
              <span className={`kc-question-difficulty kc-question-difficulty--sm kc-question-difficulty--${q.difficulty}`}>
                {q.difficulty}
              </span>
            </div>
            <h3 className="kc-question-card-q">{q.question}</h3>
            <p className="kc-question-card-hook">{q.hook}</p>
            <span className="kc-question-card-cta">Find the answer →</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default QuestionGateway;