/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 *
 * ORAL HISTORY PAGE
 * The living archive layer of the Knowledge Commons.
 * Community testimony meets counter-archive.
 * Contributors are credited as archivists, not subjects.
 */

import React, { useState, useRef } from 'react';
import {
  BookOpen, Mic, Heart, Clock, PoundSterling, Users,
  CheckCircle, ArrowRight, Globe, Utensils, Ship,
  User, MessageCircle, Calendar, Mail, Phone,
  ChevronDown, ChevronUp, Archive, Sparkles, Link2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BLACK_BRITISH_EXCELLENCE,
  getPioneersByScore,
  type ExcellenceProfile,
} from '../systems/excellence/BlackBritishExcellence';
import './OralHistoryPage.css';

// ============================================
// TYPES
// ============================================

interface StorySeriesType {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  lookingFor: string[];
  duration: string;
  commonsConnection: CommonsConnection;
}

interface CommonsConnection {
  threadId?: string;
  threadTitle?: string;
  programmeLink?: string;
  programmeName?: string;
  pioneerIds?: string[];
  reason: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ArchiveEntry {
  id: string;
  seriesId: string;
  contributorName: string;
  contributorOrigin: string;
  title: string;
  excerpt: string;
  year: number;
  duration: string;
  commonsTag?: string;
}

// ============================================
// ARCHIVE ENTRIES
// Seeded entries showing the tone of what gets published.
// Replace with real entries from the backend as they come in.
// ============================================

const SEEDED_ARCHIVE: ArchiveEntry[] = [
  {
    id: 'ae-001',
    seriesId: 'windrush-legacy',
    contributorName: 'Eunice M.',
    contributorOrigin: 'Jamaica, arrived 1963',
    title: 'The house on Harlesden Road',
    excerpt: 'They told us in Jamaica the streets were paved with gold. The first thing I saw when I came off the bus was a sign in a window: No Blacks, No Irish, No Dogs. That was my welcome to England.',
    year: 2024,
    duration: '28 min',
    commonsTag: 'Windrush & Beyond'
  },
  {
    id: 'ae-002',
    seriesId: 'kitchen-stories',
    contributorName: 'Marilyn T.',
    contributorOrigin: 'Barbados, arrived 1971',
    title: 'Cou-cou and the corner shop',
    excerpt: 'The cornmeal was wrong. Everything here was wrong — the wrong texture, the wrong smell. My mother used to say a woman who can\'t cook her own food has lost something of herself. I spent fifteen years trying to find the right cornmeal.',
    year: 2024,
    duration: '22 min',
    commonsTag: 'Food Sovereignty'
  },
  {
    id: 'ae-003',
    seriesId: 'between-worlds',
    contributorName: 'Marcus A.',
    contributorOrigin: 'Born Wembley, parents from Ghana',
    title: 'Speaking in two registers',
    excerpt: 'At school I talked one way. At home another. My mum used to say I was "being white" when I slipped into school voice. I didn\'t understand then what she was protecting. I understand now.',
    year: 2024,
    duration: '31 min',
    commonsTag: 'Second Generation'
  },
  {
    id: 'ae-004',
    seriesId: 'elder-wisdom',
    contributorName: 'Reverend Samuel K.',
    contributorOrigin: 'Trinidad, arrived 1959',
    title: 'Before the Carnival came to the street',
    excerpt: 'Claudia Jones — she organised the first one. Indoor, in winter, at St Pancras. I was there. It was nothing like what it became. But the feeling — the feeling was exactly the same.',
    year: 2024,
    duration: '41 min',
    commonsTag: 'Claudia Jones — Joy as Politics'
  },
  {
    id: 'ae-005',
    seriesId: 'arrival-stories',
    contributorName: 'Ama O.',
    contributorOrigin: 'Nigeria, arrived 2003',
    title: 'The second wave',
    excerpt: 'People assume Wembley\'s Black community all came on the Windrush. My family came forty years later with degrees and ambitions. We still got the same looks on the bus.',
    year: 2025,
    duration: '19 min',
    commonsTag: 'New Arrivals'
  },
  {
    id: 'ae-006',
    seriesId: 'kitchen-stories',
    contributorName: 'Grace N.',
    contributorOrigin: 'Born Wembley, grandparents from Guyana',
    title: 'My great-grandmother\'s black cake',
    excerpt: 'She soaked the fruit for a year. You start soaking in January for Christmas. Every year, faithfully. She\'s been gone twelve years and I still soak the fruit in January.',
    year: 2025,
    duration: '24 min',
    commonsTag: 'Auntie Anansi\'s Kitchen'
  },
];

// ============================================
// STORY SERIES — now with commons connections
// ============================================

const storySeries: StorySeriesType[] = [
  {
    id: 'arrival-stories',
    title: 'Arrival Stories',
    icon: <Globe size={32} />,
    description: 'First-person accounts of coming to the UK — the journey, culture shock, and finding your feet.',
    lookingFor: [
      'When and why you came to Britain',
      'First impressions and surprises',
      'How you adapted and what you miss',
    ],
    duration: '15–30 minutes',
    commonsConnection: {
      threadTitle: 'The Landscape Under Your Feet',
      threadId: 'landscape-under-your-feet',
      reason: 'Arrival stories map directly onto the knowledge commons thread on immigration, Wembley\'s landscape, and the Windrush generation. Your testimony becomes evidence in the archive.'
    }
  },
  {
    id: 'kitchen-stories',
    title: 'Island Kitchen Stories',
    icon: <Utensils size={32} />,
    description: 'Food memories from home — recipes, what changed when cooking here, the tastes you miss.',
    lookingFor: [
      'Food memories from your childhood',
      'What you couldn\'t find in Britain',
      'Recipes that would be lost without you',
    ],
    duration: '20 minutes',
    commonsConnection: {
      programmeName: 'Auntie Anansi\'s Kitchen',
      programmeLink: '/programmes/auntie-anansis-kitchen',
      reason: 'Kitchen stories feed directly into the Auntie Anansi\'s Kitchen programme — an intergenerational food knowledge archive where recipes become monetisable cultural assets for contributors.'
    }
  },
  {
    id: 'between-worlds',
    title: 'Between Two Worlds',
    icon: <Users size={32} />,
    description: 'Second generation voices — born here, from there. Identity, belonging, code-switching.',
    lookingFor: [
      'Growing up between cultures',
      'Questions of identity and belonging',
      'What you inherited, what you rejected',
    ],
    duration: '25 minutes',
    commonsConnection: {
      threadTitle: 'Who Owns the Culture?',
      threadId: 'who-owns-the-culture',
      reason: 'Second generation stories are central to the ownership question. Michaela Coel, Kanya King, Jazzie B — all navigating inheritance and self-determination. Your voice adds depth to that argument.'
    }
  },
  {
    id: 'elder-wisdom',
    title: 'Elder Wisdom',
    icon: <Heart size={32} />,
    description: 'Conversations with community elders — preserving stories, advice, and heritage knowledge before it\'s lost.',
    lookingFor: [
      'Life lessons and advice for young people',
      'Traditions and skills being lost',
      'Stories from your community\'s history',
    ],
    duration: '30–45 minutes',
    commonsConnection: {
      threadTitle: 'Joy as Politics',
      threadId: 'joy-as-politics',
      pioneerIds: ['claudia-jones', 'daley-thompson'],
      reason: 'Elders who were present at the Carnival before it moved outdoors, who remember the hostile environment firsthand, or who knew the pioneers in the knowledge commons — their testimony is primary source material.'
    }
  },
  {
    id: 'windrush-legacy',
    title: 'Windrush & Beyond',
    icon: <Ship size={32} />,
    description: 'The Windrush generation and descendants — history, hostile environment, resilience.',
    lookingFor: [
      'Windrush generation testimonies',
      'Experiences of the hostile environment',
      'Stories of community resilience',
    ],
    duration: '30 minutes',
    commonsConnection: {
      threadTitle: 'The Landscape Under Your Feet',
      threadId: 'landscape-under-your-feet',
      reason: 'The Windrush thread in the knowledge commons draws on public record. Your personal testimony is the record. What you lived through is what the archive is built on.'
    }
  },
];

const faqs: FAQItem[] = [
  {
    question: 'Do I need any experience?',
    answer: 'No. You just need your own story to share. We handle all recording and production — you just talk.',
  },
  {
    question: 'How long does it take?',
    answer: 'Most interviews take 20–45 minutes. We work around your schedule and can come to your home, a care home, or a community space.',
  },
  {
    question: 'When do I get paid?',
    answer: 'You receive £25 after your story is approved and broadcast on Rayd-yo community radio. Payment is within 2 weeks of broadcast via bank transfer, PayPal, or cash.',
  },
  {
    question: 'Can I share more than one story?',
    answer: 'Each person can contribute one story per series. If you have different stories — an Arrival Story AND a Kitchen Story — those are separate contributions with separate £25 payments.',
  },
  {
    question: 'What if I change my mind?',
    answer: 'You can withdraw consent any time before your story is broadcast. Once it\'s in our archive, it becomes part of the permanent community record.',
  },
  {
    question: 'Will my story be edited?',
    answer: 'We may edit for length and clarity, but we never change what you said or meant. If you ask us to exclude something specific, we will.',
  },
  {
    question: 'Who owns my story?',
    answer: 'You. You grant Wembley Wonders non-exclusive rights to broadcast and archive. Non-exclusive means you can still share your story anywhere else you choose.',
  },
  {
    question: 'Can I stay anonymous?',
    answer: 'You can use just a first name or a pseudonym. We\'ll discuss this before your interview. Your name in the archive is your choice.',
  },
  {
    question: 'What does "knowledge commons" mean?',
    answer: 'Your oral history doesn\'t just go into a radio broadcast. It becomes part of the Wembley Wonders Knowledge Commons — a publicly accessible counter-archive connecting community testimony to the broader history of Black British life. Your story is linked to historical threads, placed on maps, and credited to you permanently.',
  },
];

// ============================================
// SUBCOMPONENTS
// ============================================

const CommonsConnectionBadge: React.FC<{ connection: CommonsConnection }> = ({ connection }) => (
  <div className="oh-commons-badge">
    <Link2 size={12} />
    <div className="oh-commons-badge__content">
      <span className="oh-commons-badge__label">Connects to the Knowledge Commons</span>
      {connection.threadTitle && (
        <span className="oh-commons-badge__thread">Thread: "{connection.threadTitle}"</span>
      )}
      {connection.programmeName && (
        <span className="oh-commons-badge__thread">Programme: {connection.programmeName}</span>
      )}
      <span className="oh-commons-badge__reason">{connection.reason}</span>
    </div>
  </div>
);

const ArchiveCard: React.FC<{ entry: ArchiveEntry }> = ({ entry }) => (
  <div className="oh-archive-card">
    <div className="oh-archive-card__series-tag">{entry.seriesId.replace(/-/g, ' ')}</div>
    <h3 className="oh-archive-card__title">"{entry.title}"</h3>
    <div className="oh-archive-card__contributor">
      <User size={12} />
      {entry.contributorName} · {entry.contributorOrigin}
    </div>
    <p className="oh-archive-card__excerpt">{entry.excerpt}</p>
    <div className="oh-archive-card__meta">
      <span className="oh-archive-card__duration">
        <Clock size={11} /> {entry.duration}
      </span>
      {entry.commonsTag && (
        <span className="oh-archive-card__commons-tag">
          <Archive size={11} /> {entry.commonsTag}
        </span>
      )}
    </div>
  </div>
);

// Pioneer reference — shows which pioneers connect to a series
const PioneerReference: React.FC<{ pioneerIds: string[] }> = ({ pioneerIds }) => {
  const profiles = pioneerIds
    .map(id => BLACK_BRITISH_EXCELLENCE.find(p => p.id === id))
    .filter(Boolean) as ExcellenceProfile[];

  if (!profiles.length) return null;

  return (
    <div className="oh-pioneer-refs">
      <span className="oh-pioneer-refs__label">Connects to:</span>
      {profiles.map(p => (
        <span key={p.id} className="oh-pioneer-refs__name">{p.name}</span>
      ))}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const OralHistoryPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<string>('');
  const [archiveFilter, setArchiveFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    series: '',
    briefStory: '',
    preferredContact: 'email',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Story submission:', formData);
    setFormSubmitted(true);
  };

  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeries(seriesId);
    setFormData({ ...formData, series: seriesId });
  };

  const filteredArchive = archiveFilter === 'all'
    ? SEEDED_ARCHIVE
    : SEEDED_ARCHIVE.filter(e => e.seriesId === archiveFilter);

  const selectedSeriesData = storySeries.find(s => s.id === selectedSeries);

  return (
    <div className="oral-history-page">

      {/* ── HERO ── */}
      <section className="oh-hero">
        <div className="oh-hero__container">
          <div className="oh-hero__badge">
            <Archive size={16} />
            Living Archive · Knowledge Commons
          </div>
          <h1 className="oh-hero__title">
            Your Story Is<br />
            <span className="oh-hero__highlight">Primary Evidence.</span>
          </h1>
          <p className="oh-hero__subtitle">
            We're building a permanent counter-archive of Black British life in Wembley
            and beyond. Share your testimony, connect it to the historical record,
            and earn <strong>£25</strong>.
          </p>
          <div className="oh-hero__cta">
            <a href="#share-story" className="oh-btn oh-btn--primary">
              <Mic size={20} />
              Share Your Story
            </a>
            <Link to="/heritage" className="oh-btn oh-btn--secondary">
              <Archive size={18} />
              Visit the Knowledge Commons
            </Link>
          </div>
          <div className="oh-hero__commons-link">
            <p>
              Oral histories submitted here become part of the{' '}
              <Link to="/heritage" className="oh-hero__commons-anchor">
                Wembley Wonders Knowledge Commons
              </Link>{' '}
              — publicly accessible, permanently credited to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE'RE BUILDING ── */}
      <section className="oh-section oh-mission">
        <div className="oh-container">
          <div className="oh-mission__content">
            <h2>A Living Counter-Archive</h2>
            <p>
              The official historical record of Black British life is incomplete.
              Libraries, museums, and blue plaques tell a partial story.
              Oral history is what fills the gaps — the texture, the feeling,
              the things that don't make it into documents.
            </p>
            <p>
              <strong>Rayd-yo Community Radio</strong> collects, broadcasts, and
              preserves these testimonies. But broadcast is not the only destination.
              Each story is also connected to the{' '}
              <Link to="/heritage">Wembley Wonders Knowledge Commons</Link> — our
              counter-archive linking community testimony to the broader history
              of Black British excellence, institutional geography, and cultural lineage.
            </p>
            <div className="oh-mission__stats">
              <div className="oh-stat">
                <span className="oh-stat__number">£25</span>
                <span className="oh-stat__label">Per story published</span>
              </div>
              <div className="oh-stat">
                <span className="oh-stat__number">5</span>
                <span className="oh-stat__label">Story series</span>
              </div>
              <div className="oh-stat">
                <span className="oh-stat__number">∞</span>
                <span className="oh-stat__label">Preserved permanently</span>
              </div>
              <div className="oh-stat">
                <span className="oh-stat__number">{SEEDED_ARCHIVE.length}+</span>
                <span className="oh-stat__label">Stories in archive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHIVE PREVIEW ── */}
      <section className="oh-section oh-archive-preview">
        <div className="oh-container">
          <div className="oh-section-header-row">
            <div>
              <h2 className="oh-section__title">From the Archive</h2>
              <p className="oh-section__subtitle">
                Voices already preserved. Yours would join them.
              </p>
            </div>
            <Link to="/raydyo" className="oh-btn oh-btn--ghost">
              <BookOpen size={16} />
              Full archive on Rayd-yo
            </Link>
          </div>

          <div className="oh-archive-filter">
            <button
              className={`oh-archive-filter-btn ${archiveFilter === 'all' ? 'active' : ''}`}
              onClick={() => setArchiveFilter('all')}
            >
              All
            </button>
            {storySeries.map(s => (
              <button
                key={s.id}
                className={`oh-archive-filter-btn ${archiveFilter === s.id ? 'active' : ''}`}
                onClick={() => setArchiveFilter(s.id)}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="oh-archive-grid">
            {filteredArchive.map(entry => (
              <ArchiveCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="oh-section oh-process">
        <div className="oh-container">
          <h2 className="oh-section__title">How It Works</h2>
          <p className="oh-section__subtitle">From expression of interest to permanent archive — four steps</p>

          <div className="oh-process__steps">
            <div className="oh-step">
              <div className="oh-step__number">1</div>
              <div className="oh-step__icon"><MessageCircle size={28} /></div>
              <h3>Tell Us About Yourself</h3>
              <p>Fill in the form below with a brief description of the story you'd like to share.</p>
            </div>
            <div className="oh-step">
              <div className="oh-step__number">2</div>
              <div className="oh-step__icon"><Calendar size={28} /></div>
              <h3>We Schedule Your Interview</h3>
              <p>A Community Archivist contacts you to arrange a time. We come to you — your home, a care home, or a community space.</p>
            </div>
            <div className="oh-step">
              <div className="oh-step__number">3</div>
              <div className="oh-step__icon"><Mic size={28} /></div>
              <h3>Share Your Story</h3>
              <p>A relaxed conversation guided by our interviewer. You talk, we record. Usually 20–45 minutes.</p>
            </div>
            <div className="oh-step">
              <div className="oh-step__number">4</div>
              <div className="oh-step__icon"><Archive size={28} /></div>
              <h3>Broadcast, Archive, Pay</h3>
              <p>Your story airs on Rayd-yo. It's connected to the Knowledge Commons. You receive £25 within 2 weeks.</p>
            </div>
          </div>

          <div className="oh-process__note">
            <CheckCircle size={20} />
            <p>
              <strong>No equipment needed.</strong> No experience required.
              We handle everything — you just share your story.
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY SERIES ── */}
      <section className="oh-section oh-series">
        <div className="oh-container">
          <h2 className="oh-section__title">What Stories We're Collecting</h2>
          <p className="oh-section__subtitle">
            Each series connects to a thread in the Knowledge Commons.
            Choose the one that fits your experience.
          </p>

          <div className="oh-series__grid">
            {storySeries.map((series) => (
              <div
                key={series.id}
                className={`oh-series__card ${selectedSeries === series.id ? 'oh-series__card--selected' : ''}`}
                onClick={() => handleSeriesSelect(series.id)}
              >
                <div className="oh-series__icon">{series.icon}</div>
                <h3>{series.title}</h3>
                <p>{series.description}</p>
                <div className="oh-series__looking-for">
                  <strong>We're looking for:</strong>
                  <ul>
                    {series.lookingFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Commons connection */}
                <CommonsConnectionBadge connection={series.commonsConnection} />

                {/* Pioneer references if present */}
                {series.commonsConnection.pioneerIds && (
                  <PioneerReference pioneerIds={series.commonsConnection.pioneerIds} />
                )}

                <div className="oh-series__meta">
                  <Clock size={14} />
                  <span>{series.duration}</span>
                  <PoundSterling size={14} />
                  <span>£25</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIORITY VOICES ── */}
      <section className="oh-section oh-priority">
        <div className="oh-container">
          <div className="oh-priority__content">
            <Sparkles size={32} className="oh-priority__icon" />
            <h2>Priority Voices</h2>
            <p>
              We're building a <strong>diverse</strong> archive, not a repeat roster.
              We prioritise voices not yet represented:
            </p>
            <div className="oh-priority__list">
              <div className="oh-priority__item">
                <Heart size={18} />
                <span><strong>Elders (75+)</strong> — preserving primary testimony while we can</span>
              </div>
              <div className="oh-priority__item">
                <Globe size={18} />
                <span><strong>Underrepresented communities</strong> — not just the largest diaspora groups</span>
              </div>
              <div className="oh-priority__item">
                <Users size={18} />
                <span><strong>First-time contributors</strong> — one unique testimony per person per series</span>
              </div>
              <div className="oh-priority__item">
                <BookOpen size={18} />
                <span><strong>Eyewitness accounts</strong> — people who were present at the events in our Knowledge Commons threads</span>
              </div>
            </div>

            {/* Specific eyewitness callout */}
            <div className="oh-eyewitness-callout">
              <div className="oh-eyewitness-callout__label">
                <Archive size={14} />
                Specifically seeking
              </div>
              <div className="oh-eyewitness-callout__items">
                <div className="oh-eyewitness-item">
                  People who attended the early Notting Hill Carnival (before it moved outdoors)
                </div>
                <div className="oh-eyewitness-item">
                  Anyone with memories of the Commonwealth Institute on Kensington High Street
                </div>
                <div className="oh-eyewitness-item">
                  Windrush generation testimonies — first generation only, urgent priority
                </div>
                <div className="oh-eyewitness-item">
                  People who experienced the Hostile Environment policy firsthand
                </div>
                <div className="oh-eyewitness-item">
                  Anyone with personal knowledge of the 1924 Wembley Empire Exhibition's legacy in this community
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGN UP FORM ── */}
      <section id="share-story" className="oh-section oh-form-section" ref={formRef}>
        <div className="oh-container">
          <h2 className="oh-section__title">Share Your Story</h2>
          <p className="oh-section__subtitle">
            Tell us about yourself and we'll be in touch to arrange your interview
          </p>

          {/* Selected series confirmation */}
          {selectedSeries && selectedSeriesData && (
            <div className="oh-form-series-confirm">
              <div className="oh-form-series-confirm__icon">{selectedSeriesData.icon}</div>
              <div>
                <strong>{selectedSeriesData.title}</strong>
                <span>selected · £25 on publication</span>
              </div>
            </div>
          )}

          {formSubmitted ? (
            <div className="oh-form-success">
              <CheckCircle size={48} />
              <h3>Thank You.</h3>
              <p>
                We've received your submission. A Community Archivist will contact
                you within 5 working days to arrange your interview.
              </p>
              <p className="oh-form-success__note">
                Check your email (and spam folder) for our response.
              </p>
              <div className="oh-form-success__commons">
                <Archive size={16} />
                <span>
                  While you wait, explore the{' '}
                  <Link to="/heritage">Knowledge Commons</Link>{' '}
                  to see how your story will connect to the broader archive.
                </span>
              </div>
            </div>
          ) : (
            <form className="oh-form" onSubmit={handleSubmit}>
              <div className="oh-form__row">
                <div className="oh-form__group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div className="oh-form__row oh-form__row--two">
                <div className="oh-form__group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div className="oh-form__group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    placeholder="07xxx xxxxxx"
                  />
                </div>
              </div>

              <div className="oh-form__group">
                <label htmlFor="series">Which Story Series? *</label>
                <select
                  id="series"
                  name="series"
                  value={formData.series}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a series…</option>
                  {storySeries.map((series) => (
                    <option key={series.id} value={series.id}>{series.title}</option>
                  ))}
                </select>
              </div>

              <div className="oh-form__group">
                <label htmlFor="briefStory">Tell Us Briefly About Your Story *</label>
                <textarea
                  id="briefStory"
                  name="briefStory"
                  value={formData.briefStory}
                  onChange={handleFormChange}
                  required
                  rows={4}
                  placeholder="A few sentences about the story you'd like to share. For example: 'I came to Wembley from Jamaica in 1962. I have stories about the journey, finding work, and how different everything was…'"
                />
                <p className="oh-form__hint">
                  This helps us match you with the right Community Archivist
                  and connect your story to the right Knowledge Commons thread.
                </p>
              </div>

              <div className="oh-form__group">
                <label>Preferred Contact Method *</label>
                <div className="oh-form__radio-group">
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleFormChange}
                    />
                    <Mail size={16} />
                    Email
                  </label>
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleFormChange}
                    />
                    <Phone size={16} />
                    Phone Call
                  </label>
                  <label className="oh-form__radio">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleFormChange}
                    />
                    <MessageCircle size={16} />
                    WhatsApp
                  </label>
                </div>
              </div>

              <div className="oh-form__consent">
                <p>
                  By submitting, you're expressing interest in sharing your story.
                  Full consent — including payment details, archiving rights, and
                  Knowledge Commons connection — will be discussed and signed before
                  your interview. You own your story. We're asking to preserve it.
                </p>
              </div>

              <button type="submit" className="oh-btn oh-btn--primary oh-btn--large">
                <Mic size={20} />
                Submit My Interest
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="oh-section oh-faq">
        <div className="oh-container">
          <h2 className="oh-section__title">Frequently Asked Questions</h2>
          <div className="oh-faq__list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`oh-faq__item ${expandedFaq === index ? 'oh-faq__item--expanded' : ''}`}
              >
                <button
                  className="oh-faq__question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedFaq === index && (
                  <div className="oh-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BECOME AN ARCHIVIST ── */}
      <section className="oh-section oh-archivist-cta">
        <div className="oh-container">
          <div className="oh-archivist-cta__content">
            <h2>Want to Collect Stories?</h2>
            <p>
              Become a <strong>Community Archivist</strong> and earn £15 per interview
              you conduct. Perfect for students, care workers, or anyone with community connections.
            </p>
            <Link to="/raydyo" className="oh-btn oh-btn--golden">
              Learn About Community Archivists
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── KNOWLEDGE COMMONS BRIDGE ── */}
      <section className="oh-section oh-commons-bridge">
        <div className="oh-container">
          <div className="oh-commons-bridge__content">
            <Archive size={28} />
            <div>
              <h2>This Archive Is Part of Something Larger</h2>
              <p>
                Every oral history submitted here connects to the Wembley Wonders
                Knowledge Commons — a publicly accessible counter-archive of Black British
                excellence, London's institutional geography, and the cultural lineages
                that run under the city's surface. Your testimony is evidence.
                Your story is primary source material. It belongs in the record.
              </p>
              <Link to="/heritage" className="oh-btn oh-btn--golden">
                Explore the Knowledge Commons
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OralHistoryPage;