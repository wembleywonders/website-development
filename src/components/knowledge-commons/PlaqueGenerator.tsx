import React, { useState } from 'react';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// PLAQUE GENERATOR
// Community contribution tool: nominate a person, place, or event for a
// counter-archive plaque.
//
// Two modes:
// 1. BROWSE — view existing counter-plaque nominations, vote/second them
// 2. NOMINATE — submit a new nomination
//
// The plaque preview renders as a circular navy/gold visual in real time
// as the user types — so the act of naming feels meaningful, not bureaucratic.
//
// Counter-archive mark: "Wembley Wonders Counter-Archive" appears on every
// plaque, asserting that this is a parallel record, not an unofficial one.
// ─────────────────────────────────────────────────────────────────────────────

export interface CounterPlaque {
  id:             string;
  name:           string;           // Person's name (all caps on plaque)
  dates:          string;           // e.g. "1865–1930"
  field:          string;           // e.g. "Footballer & Athlete"
  location:       string;           // Where the plaque should be
  locationNote:   string;           // Why this location specifically
  inscription:    string;           // The plaque text (max 60 words)
  theCase:        string;           // Why they deserve a plaque
  theGap:         string;           // What doesn't exist and should
  status:         'nominated' | 'researching' | 'campaigning' | 'installed';
  seconds:        number;           // Community endorsements
  secondedBy?:    string[];         // Names of endorsers (optional)
  thread?:        string;           // Connected thread ID
  nominatedBy:    string;           // Programme or member
  nominatedDate:  string;
}

const EXISTING_PLAQUES: CounterPlaque[] = [
  {
    id:           'arthur-wharton-plaque',
    name:         'ARTHUR WHARTON',
    dates:        '1865–1930',
    field:        'Footballer & Athlete',
    location:     'Darlington Railway Centre, County Durham',
    locationNote: 'Wharton played for Darlington FC and Sheffield United. The railway connection acknowledges his route from the Gold Coast to the North of England.',
    inscription:  'Arthur Wharton. Born Gold Coast 1865. World\'s first Black professional footballer. Sprint world record holder, 1886. Played for Preston North End, Sheffield United, and Darlington. Died 1930. Recognised here.',
    theCase:      'Wharton was the fastest man in the world in 1886, the same year he was playing professional football. He is the foundational figure of Black British sporting history. A community-funded gravestone was installed in 1997 — 67 years after his death. English Heritage has not acted.',
    theGap:       'The Football Association\'s official history does not feature him prominently. His world record is not on the list of British athletics records. He existed, excelled, and was erased in real time.',
    status:       'campaigning',
    seconds:      47,
    secondedBy:   ['Pageturners programme', 'G-Tech Casters', 'Kaywana\'s Court'],
    thread:       'same-rule-different-arenas',
    nominatedBy:  'Wembley Wonders Archive',
    nominatedDate: '2024-03-15',
  },
  {
    id:           'claudia-jones-wembley',
    name:         'CLAUDIA JONES',
    dates:        '1915–1964',
    field:        'Journalist, Activist & Carnival Founder',
    location:     'Notting Hill Gate, London W11',
    locationNote: 'Jones organised in Notting Hill, founded the Carnival as a response to the riots there, and edited the West Indian Gazette from nearby. A plaque exists at 332 Portobello Road but not at the site of the first Carnival.',
    inscription:  'Claudia Jones. Born Trinidad 1915. Journalist, communist, and founder of the Notting Hill Carnival. Organised against racism in Britain and the United States. Deported from the US; came to Britain. Died 1964, aged 49.',
    theCase:      'Jones has one blue plaque. She deserves at least three: at her home, at the site of the first Carnival, and at the West Indian Gazette offices. The Carnival she founded now generates £450m annually for London.',
    theGap:       'St Pancras Town Hall — where the first indoor Carnival was held in 1959 — has no marker acknowledging her. The site of the West Indian Gazette offices is unmarked.',
    status:       'researching',
    seconds:      38,
    thread:       'joy-as-politics',
    nominatedBy:  'G-Tech Casters programme',
    nominatedDate: '2024-06-01',
  },
  {
    id:           'len-johnson-plaque',
    name:         'LEN JOHNSON',
    dates:        '1902–1974',
    field:        'Boxer, Organiser & Activist',
    location:     'Ancoats, Manchester',
    locationNote: 'Johnson was born and based in Manchester. Ancoats was the heart of Manchester\'s Irish and working-class communities where he organised.',
    inscription:  'Len Johnson. Born Manchester 1902. Undefeated middleweight fighter, denied the British title by explicit racial rule for his entire career. Communist organiser. Activist for racial equality. Died Manchester 1974.',
    theCase:      'The rule that excluded Johnson was written down, in official BBBC policy. He won over 100 fights. He organised for equality for decades after boxing. Manchester has no plaque marking him.',
    theGap:       'The British Boxing Board of Control has never formally acknowledged the policy that excluded him. His record is not in the standard histories of British boxing.',
    status:       'nominated',
    seconds:      29,
    thread:       'same-rule-different-arenas',
    nominatedBy:  'Kaywana\'s Court programme',
    nominatedDate: '2024-09-10',
  },
  {
    id:           'linton-kwesi-johnson-plaque',
    name:         'LINTON KWESI JOHNSON',
    dates:        '1952–',
    field:        'Poet & Record Label Founder',
    location:     'Railton Road, Brixton SW2',
    locationNote: '"The frontline". Where Johnson lived, organised, and wrote. The location of the 1981 Brixton uprising.',
    inscription:  'Linton Kwesi Johnson. Born Jamaica 1952. Invented dub poetry. Second living poet in Penguin Modern Classics. Founded LKJ Records, 1981. Documented the experience of the Windrush generation in verse and music. Lives here.',
    theCase:      'Johnson invented a literary form and built the economic infrastructure to sustain it independently. He is the second living poet to have their collected works published by Penguin Modern Classics. He has no plaque.',
    theGap:       'His house on Railton Road is unmarked. The street itself — the frontline of the 1981 uprising — has no memorial to the uprising or to the community organising that preceded it.',
    status:       'nominated',
    seconds:      22,
    thread:       'who-owns-the-culture',
    nominatedBy:  'Pageturners programme',
    nominatedDate: '2025-01-20',
  },
];

// Plaque preview component
const PlaquePreview: React.FC<{
  name:  string;
  dates: string;
  field: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ name, dates, field, size = 'md' }) => {
  const sizes = { sm: 80, md: 140, lg: 200 };
  const px = sizes[size];
  return (
    <div
      className={`kc-plaque-preview kc-plaque-preview--${size}`}
      style={{ width: px, height: px }}
      aria-label={`Counter-archive plaque: ${name}`}
    >
      <div className="kc-plaque-preview-inner">
        <span className="kc-plaque-preview-mark">Wembley Wonders Counter-Archive</span>
        <span className="kc-plaque-preview-name">{name || 'NAME'}</span>
        {dates && <span className="kc-plaque-preview-dates">{dates}</span>}
        {field && <span className="kc-plaque-preview-field">{field}</span>}
      </div>
    </div>
  );
};

// Status badge
const StatusBadge: React.FC<{ status: CounterPlaque['status'] }> = ({ status }) => {
  const labels = {
    nominated:    'Nominated',
    researching:  'Researching',
    campaigning:  'Campaigning',
    installed:    'Installed',
  };
  return (
    <span className={`kc-plaque-status kc-plaque-status--${status}`}>
      {labels[status]}
    </span>
  );
};

interface Props { ctx: CommonsContext; }

type PlaqueView = 'browse' | 'nominate' | 'detail';

interface NominationForm {
  name:         string;
  dates:        string;
  field:        string;
  location:     string;
  locationNote: string;
  inscription:  string;
  theCase:      string;
  theGap:       string;
  nominatedBy:  string;
  thread:       string;
}

const EMPTY_FORM: NominationForm = {
  name:         '',
  dates:        '',
  field:        '',
  location:     '',
  locationNote: '',
  inscription:  '',
  theCase:      '',
  theGap:       '',
  nominatedBy:  '',
  thread:       '',
};

const PlaqueGenerator: React.FC<Props> = ({ ctx }) => {
  const [view, setView]             = useState<PlaqueView>('browse');
  const [activePlaque, setActivePlaque] = useState<CounterPlaque | null>(null);
  const [form, setForm]             = useState<NominationForm>(EMPTY_FORM);
  const [submitted, setSubmitted]   = useState(false);
  const [sortBy, setSortBy]         = useState<'seconds' | 'recent'>('seconds');

  const sorted = [...EXISTING_PLAQUES].sort((a, b) =>
    sortBy === 'seconds'
      ? b.seconds - a.seconds
      : new Date(b.nominatedDate).getTime() - new Date(a.nominatedDate).getTime()
  );

  const handleFormChange = (field: keyof NominationForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In production: POST to /api/plaques/nominate
    // For now: show success state
    setSubmitted(true);
  };

  // ── DETAIL VIEW ────────────────────────────────────────────────────────────
  if (activePlaque) {
    return (
      <div className="kc-plaque-detail">
        <button className="kc-back-btn" onClick={() => { setActivePlaque(null); setView('browse'); }}>
          ← All nominations
        </button>

        <div className="kc-plaque-detail-header">
          <PlaquePreview
            name={activePlaque.name}
            dates={activePlaque.dates}
            field={activePlaque.field}
            size="lg"
          />
          <div className="kc-plaque-detail-info">
            <StatusBadge status={activePlaque.status} />
            <h2 className="kc-plaque-detail-name">{activePlaque.name}</h2>
            <p className="kc-plaque-detail-dates-field">
              {activePlaque.dates} · {activePlaque.field}
            </p>
            <div className="kc-plaque-seconds">
              <span className="kc-plaque-seconds-count">{activePlaque.seconds}</span>
              <span className="kc-plaque-seconds-label">community endorsements</span>
            </div>
            <button className="kc-plaque-second-btn">
              Second this nomination →
            </button>
          </div>
        </div>

        <div className="kc-plaque-location">
          <span className="kc-plaque-loc-label">Proposed location</span>
          <p className="kc-plaque-loc-name">{activePlaque.location}</p>
          <p className="kc-plaque-loc-note">{activePlaque.locationNote}</p>
        </div>

        <div className="kc-plaque-sections">
          <div className="kc-plaque-section">
            <span className="kc-plaque-section-label">Proposed inscription</span>
            <blockquote className="kc-plaque-inscription">{activePlaque.inscription}</blockquote>
          </div>

          <div className="kc-plaque-section">
            <span className="kc-plaque-section-label">The case</span>
            <p className="kc-plaque-section-text">{activePlaque.theCase}</p>
          </div>

          <div className="kc-plaque-section kc-plaque-section--gap">
            <span className="kc-plaque-section-label kc-plaque-section-label--gap">The gap</span>
            <p className="kc-plaque-section-text">{activePlaque.theGap}</p>
          </div>
        </div>

        {activePlaque.thread && (
          <button
            className="kc-plaque-thread-link"
            onClick={() => { ctx.setMode('thread'); ctx.setActiveId(activePlaque.thread!); }}
          >
            Read the related thread: {activePlaque.thread.replace(/-/g, ' ')} →
          </button>
        )}

        <div className="kc-plaque-meta">
          Nominated by {activePlaque.nominatedBy} ·{' '}
          {new Date(activePlaque.nominatedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
        </div>
      </div>
    );
  }

  // ── SUBMISSION SUCCESS ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="kc-plaque-success">
        <PlaquePreview name={form.name} dates={form.dates} field={form.field} size="lg" />
        <h2 className="kc-plaque-success-title">Nomination received.</h2>
        <p className="kc-plaque-success-body">
          {form.name || 'This nomination'} has been added to the counter-archive queue.
          The archive team will research, verify, and publish it within 30 days.
          You'll receive a notification when it goes live.
        </p>
        <div className="kc-plaque-success-actions">
          <button
            className="kc-plaque-submit-btn"
            onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setView('browse'); }}
          >
            Submit another nomination
          </button>
          <button
            className="kc-back-btn"
            onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setView('browse'); }}
          >
            ← Back to all nominations
          </button>
        </div>
      </div>
    );
  }

  // ── NOMINATION FORM ────────────────────────────────────────────────────────
  if (view === 'nominate') {
    const wordCount = form.inscription.trim().split(/\s+/).filter(Boolean).length;
    const inscriptionValid = wordCount <= 60;

    return (
      <div className="kc-nominate">
        <button className="kc-back-btn" onClick={() => setView('browse')}>
          ← Back to nominations
        </button>

        <div className="kc-nominate-header">
          <h2 className="kc-nominate-title">Nominate a missing plaque</h2>
          <p className="kc-nominate-intro">
            English Heritage decides who gets a plaque. This archive documents who should.
            Nominations are researched, verified, and published. The most-endorsed nominations
            are submitted formally to English Heritage and local councils.
          </p>
        </div>

        <div className="kc-nominate-layout">

          {/* Live preview */}
          <div className="kc-nominate-preview-col">
            <span className="kc-nominate-preview-label">Live preview</span>
            <PlaquePreview
              name={form.name}
              dates={form.dates}
              field={form.field}
              size="lg"
            />
            <p className="kc-nominate-preview-note">
              The plaque preview updates as you type.
              Navy and gold — the counter-archive colourway.
            </p>
          </div>

          {/* Form */}
          <div className="kc-nominate-form-col">

            <div className="kc-form-section">
              <h3 className="kc-form-section-title">The person</h3>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-name">
                  Full name <span className="kc-form-req">*</span>
                </label>
                <input
                  id="kc-name"
                  className="kc-form-input"
                  type="text"
                  placeholder="e.g. Claudia Vera Jones"
                  value={form.name}
                  onChange={e => handleFormChange('name', e.target.value.toUpperCase())}
                  maxLength={60}
                />
                <span className="kc-form-note">Will appear in capitals on the plaque.</span>
              </div>

              <div className="kc-form-row">
                <div className="kc-form-field">
                  <label className="kc-form-label" htmlFor="kc-dates">Dates</label>
                  <input
                    id="kc-dates"
                    className="kc-form-input"
                    type="text"
                    placeholder="e.g. 1915–1964"
                    value={form.dates}
                    onChange={e => handleFormChange('dates', e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div className="kc-form-field">
                  <label className="kc-form-label" htmlFor="kc-field">
                    Field <span className="kc-form-req">*</span>
                  </label>
                  <input
                    id="kc-field"
                    className="kc-form-input"
                    type="text"
                    placeholder="e.g. Journalist & Activist"
                    value={form.field}
                    onChange={e => handleFormChange('field', e.target.value)}
                    maxLength={60}
                  />
                </div>
              </div>
            </div>

            <div className="kc-form-section">
              <h3 className="kc-form-section-title">The location</h3>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-location">
                  Where should the plaque be? <span className="kc-form-req">*</span>
                </label>
                <input
                  id="kc-location"
                  className="kc-form-input"
                  type="text"
                  placeholder="e.g. 332 Portobello Road, London W10"
                  value={form.location}
                  onChange={e => handleFormChange('location', e.target.value)}
                  maxLength={120}
                />
              </div>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-location-note">
                  Why this location?
                </label>
                <textarea
                  id="kc-location-note"
                  className="kc-form-textarea"
                  rows={2}
                  placeholder="The specific significance of this address to this person's life or work."
                  value={form.locationNote}
                  onChange={e => handleFormChange('locationNote', e.target.value)}
                  maxLength={300}
                />
              </div>
            </div>

            <div className="kc-form-section">
              <h3 className="kc-form-section-title">The inscription</h3>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-inscription">
                  Proposed plaque text <span className="kc-form-req">*</span>
                </label>
                <textarea
                  id="kc-inscription"
                  className={`kc-form-textarea${!inscriptionValid ? ' kc-form-textarea--error' : ''}`}
                  rows={4}
                  placeholder="The text that should appear on the plaque. Maximum 60 words. Name, dates, what they did, why it matters here."
                  value={form.inscription}
                  onChange={e => handleFormChange('inscription', e.target.value)}
                />
                <span className={`kc-form-count${!inscriptionValid ? ' kc-form-count--error' : ''}`}>
                  {wordCount}/60 words
                </span>
              </div>
            </div>

            <div className="kc-form-section">
              <h3 className="kc-form-section-title">The case</h3>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-case">
                  Why do they deserve a plaque? <span className="kc-form-req">*</span>
                </label>
                <textarea
                  id="kc-case"
                  className="kc-form-textarea"
                  rows={4}
                  placeholder="The evidence. What did they achieve? What is the institutional record? What is missing from it?"
                  value={form.theCase}
                  onChange={e => handleFormChange('theCase', e.target.value)}
                  maxLength={600}
                />
              </div>

              <div className="kc-form-field">
                <label className="kc-form-label" htmlFor="kc-gap">
                  What gap does this plaque address?
                </label>
                <textarea
                  id="kc-gap"
                  className="kc-form-textarea"
                  rows={3}
                  placeholder="What doesn't exist and should? What has been erased, overlooked, or deliberately excluded?"
                  value={form.theGap}
                  onChange={e => handleFormChange('theGap', e.target.value)}
                  maxLength={400}
                />
              </div>
            </div>

            <div className="kc-form-section">
              <div className="kc-form-row">
                <div className="kc-form-field">
                  <label className="kc-form-label" htmlFor="kc-nomby">Your name / programme</label>
                  <input
                    id="kc-nomby"
                    className="kc-form-input"
                    type="text"
                    placeholder="e.g. Pageturners member"
                    value={form.nominatedBy}
                    onChange={e => handleFormChange('nominatedBy', e.target.value)}
                    maxLength={80}
                  />
                </div>
                <div className="kc-form-field">
                  <label className="kc-form-label" htmlFor="kc-thread">Related thread (optional)</label>
                  <select
                    id="kc-thread"
                    className="kc-form-select"
                    value={form.thread}
                    onChange={e => handleFormChange('thread', e.target.value)}
                  >
                    <option value="">None</option>
                    <option value="same-rule-different-arenas">The Same Rule, Different Arenas</option>
                    <option value="who-owns-the-culture">Who Owns the Culture?</option>
                    <option value="landscape-under-your-feet">The Landscape Under Your Feet</option>
                    <option value="kingston-to-the-grid">From Kingston to the Grid</option>
                    <option value="distance-embassy-community">The Distance Between the Embassy and the Community</option>
                    <option value="joy-as-politics">Joy as Politics</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              className="kc-plaque-submit-btn"
              onClick={handleSubmit}
              disabled={!form.name || !form.field || !form.inscription || !form.theCase || !inscriptionValid}
            >
              Submit nomination to the counter-archive →
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ── BROWSE VIEW ────────────────────────────────────────────────────────────
  return (
    <div className="kc-plaque-browse">

      <div className="kc-plaque-browse-header">
        <div className="kc-plaque-browse-intro">
          <p className="kc-plaque-browse-body">
            {EXISTING_PLAQUES.length} nominations in the counter-archive.
            The most-endorsed are submitted formally to English Heritage and local councils.
            Anyone can nominate. Anyone can second. The archive team verifies.
          </p>
        </div>
        <button
          className="kc-nominate-trigger-btn"
          onClick={() => setView('nominate')}
        >
          + Nominate a missing plaque
        </button>
      </div>

      {/* Sort */}
      <div className="kc-plaque-controls">
        <span className="kc-filter-label">Sort by</span>
        <button
          className={`kc-sort-btn${sortBy === 'seconds' ? ' active' : ''}`}
          onClick={() => setSortBy('seconds')}
        >
          Most endorsed
        </button>
        <button
          className={`kc-sort-btn${sortBy === 'recent' ? ' active' : ''}`}
          onClick={() => setSortBy('recent')}
        >
          Most recent
        </button>
      </div>

      {/* Plaque grid */}
      <div className="kc-plaque-grid">
        {sorted.map(plaque => (
          <button
            key={plaque.id}
            className="kc-plaque-card"
            onClick={() => setActivePlaque(plaque)}
          >
            <div className="kc-plaque-card-inner">
              <PlaquePreview
                name={plaque.name}
                dates={plaque.dates}
                field={plaque.field}
                size="md"
              />
              <div className="kc-plaque-card-info">
                <StatusBadge status={plaque.status} />
                <div className="kc-plaque-card-name">{plaque.name}</div>
                <div className="kc-plaque-card-field">{plaque.field}</div>
                <div className="kc-plaque-card-location">◎ {plaque.location.split(',')[0]}</div>
                <div className="kc-plaque-card-seconds">
                  {plaque.seconds} endorsement{plaque.seconds !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <p className="kc-plaque-card-case">{plaque.theCase.slice(0, 120)}…</p>
          </button>
        ))}
      </div>

    </div>
  );
};

export default PlaqueGenerator;