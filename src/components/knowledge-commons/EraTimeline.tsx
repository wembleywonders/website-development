import React, { useState, useRef, useEffect } from 'react';
import type { CommonsContext } from './KnowledgeCommonsShell';

// ─────────────────────────────────────────────────────────────────────────────
// ERA TIMELINE
// Chronological sweep from 1807 (Abolition Act) to the present.
//
// Each era is defined by a structural shift — a law, a wave of migration,
// a cultural turning point — not by a regnal period or a war.
// The eras are the frame. The events are the evidence.
//
// Design note: the timeline is horizontal on desktop, vertical on mobile.
// The active era expands to show its events without leaving the page.
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id:        string;
  year:      number;
  title:     string;
  type:      'legislation' | 'arrival' | 'cultural' | 'resistance' | 'institution' | 'loss';
  body:      string;
  theGap?:   string;    // The counter-archive note — what this event reveals about absence
  threads:   string[];
  location?: string;
}

export interface Era {
  id:         string;
  label:      string;
  span:       string;
  startYear:  number;
  endYear:    number;
  headline:   string;    // One-sentence characterisation
  subtext:    string;    // The structural argument
  colour:     string;
  events:     TimelineEvent[];
}

export const ERAS: Era[] = [
  {
    id:        'abolition-era',
    label:     'The Abolition Era',
    span:      '1807–1865',
    startYear: 1807,
    endYear:   1865,
    headline:  'The law changed. The economics didn\'t.',
    subtext:   'The Abolition Act of 1807 ended the transatlantic slave trade — not slavery itself, which continued in British territories until 1833, and was "compensated" with £20 million paid to slaveholders, not to the enslaved.',
    colour:    '#d4a853',
    events: [
      {
        id:       'abolition-1807',
        year:     1807,
        title:    'Abolition of the Slave Trade Act',
        type:     'legislation',
        body:     'The transatlantic slave trade was made illegal for British subjects. Slavery itself in British territories continued for a further 26 years. The Act is the one most people remember.',
        theGap:   'The Act is named \'Abolition\' but abolished the trade, not the condition. The distinction matters. The £20 million compensation paid in 1833 — to slaveholders — was only fully repaid by British taxpayers in 2015.',
        threads:  ['landscape-under-your-feet'],
        location: 'Westminster',
      },
      {
        id:       'slavery-abolition-1833',
        year:     1833,
        title:    'Slavery Abolition Act',
        type:     'legislation',
        body:     'Slavery itself was made illegal in British territories. Enslaved people were required to serve an "apprenticeship" of up to six years before full freedom. Slaveholders received £20 million in compensation.',
        theGap:   'The compensation was calculated at £20 million — 40% of the government\'s annual budget. The UK government borrowed to pay it. British taxpayers finished paying off that debt in 2015. The descendants of the enslaved received nothing.',
        threads:  ['landscape-under-your-feet', 'who-owns-the-culture'],
        location: 'Westminster / Caribbean',
      },
      {
        id:       'arthur-wharton-born',
        year:     1865,
        title:    'Arthur Wharton Born, Gold Coast',
        type:     'arrival',
        body:     'Born in Jamestown, Gold Coast (now Ghana) to a Ghanaian-Scottish father and a Fante-Grenadian mother. Came to England in 1882 to train as a Methodist minister. Became instead the world\'s fastest man and the world\'s first Black professional footballer.',
        theGap:   'His Gold Coast origin is the thread that connects the abolition era to the Victorian sporting era. He is standing on a lineage that the abolition legislation deliberately obscured.',
        threads:  ['same-rule-different-arenas'],
        location: 'Gold Coast (Ghana)',
      },
    ],
  },
  {
    id:        'empire-apex',
    label:     'Empire at Apex',
    span:      '1865–1914',
    startYear: 1865,
    endYear:   1914,
    headline:  'The empire performed itself for a home audience.',
    subtext:   'The period of high imperialism — the scramble for Africa, the exhibitions, the spectacle. The presence of Black people in Britain was visible but carefully managed as performance rather than citizenship.',
    colour:    '#f97316',
    events: [
      {
        id:       'wharton-record',
        year:     1886,
        title:    'Arthur Wharton Sets 100-Yard Sprint World Record',
        type:     'cultural',
        body:     'Wharton ran the 100 yards in 10 seconds flat at the AAA Championships — a world record. He was already playing professional football for Preston North End. He would go on to play for Sheffield United.',
        theGap:   'No English Heritage plaque. A community-funded gravestone was installed in 1997, 67 years after his death. The Football Association\'s official history of the game does not prominently feature him.',
        threads:  ['same-rule-different-arenas'],
        location: 'London / Sheffield',
      },
      {
        id:       'empire-exhibition-1924',
        year:     1924,
        title:    'British Empire Exhibition, Wembley',
        type:     'institution',
        body:     'The largest international exhibition ever held in Britain drew 27 million visitors over two seasons. It displayed the peoples and resources of 58 imperial territories as exhibits. Its permanent structures included the original Wembley Stadium.',
        theGap:   'The Exhibition site is now Brent — the most ethnically diverse borough in the UK. The people displayed as exhibits in 1924 are the majority population of the borough today. No marker at Wembley Park explains this.',
        threads:  ['landscape-under-your-feet'],
        location: 'Wembley Park, Brent HA9',
      },
    ],
  },
  {
    id:        'windrush-era',
    label:     'The Windrush Era',
    span:      '1948–1971',
    startYear: 1948,
    endYear:   1971,
    headline:  'The empire invited them. The country wasn\'t told.',
    subtext:   'The British Nationality Act 1948 gave citizens of Commonwealth countries the right to live and work in Britain. The Windrush generation came because they were invited by law, by employment agencies, and by the NHS. The hostility that greeted them was the gap between the law and the culture.',
    colour:    '#3ecfcf',
    events: [
      {
        id:       'british-nationality-act',
        year:     1948,
        title:    'British Nationality Act',
        type:     'legislation',
        body:     'All citizens of Commonwealth countries were granted the right to live and work in Britain. This was the legal foundation for the Windrush generation\'s arrival. The act was passed partly to address postwar labour shortages.',
        theGap:   'The act was passed with no public debate about what it meant culturally. The Windrush generation arrived into a country that had passed a law welcoming them but had no infrastructure — social, cultural, or psychological — for their arrival.',
        threads:  ['landscape-under-your-feet', 'distance-embassy-community'],
        location: 'Westminster',
      },
      {
        id:       'windrush-1948',
        year:     1948,
        title:    'HMT Empire Windrush Arrives',
        type:     'arrival',
        body:     '492 passengers from Jamaica, Trinidad, and other Caribbean islands arrived at Tilbury Docks. Many had served in WWII. They came to a country that had asked for their service and was now uncertain about their presence.',
        theGap:   'The 492 figure is the one that gets commemorated. The total number of Commonwealth citizens who arrived in the following decade is around half a million. Most were housed in areas like Brixton, Notting Hill, and Wembley — where cheap housing was available because white residents were moving out.',
        threads:  ['landscape-under-your-feet', 'joy-as-politics'],
        location: 'Tilbury Docks / London',
      },
      {
        id:       'notting-hill-riots',
        year:     1958,
        title:    'Notting Hill Race Riots',
        type:     'resistance',
        body:     'White mobs attacked Caribbean residents over several nights in August and September. The response of Caribbean community organisers, including Claudia Jones, was to create the Carnival the following year.',
        theGap:   'The riots are the context for the Carnival\'s founding. To describe the Carnival without naming the riots is to misunderstand it. It was not a celebration of arrival — it was a political act of claiming public space that had been violently contested.',
        threads:  ['joy-as-politics', 'who-owns-the-culture'],
        location: 'Notting Hill, London',
      },
      {
        id:       'claudia-jones-carnival',
        year:     1959,
        title:    'Claudia Jones Founds the Notting Hill Carnival',
        type:     'cultural',
        body:     'Jones organised the first indoor Carnival at St Pancras Town Hall as a direct political response to the riots. It moved outdoors to Notting Hill in 1966, two years after her death.',
        theGap:   'Jones died at 49, exhausted. She was deported from the US under McCarthy, arrived in Britain, and spent the rest of her life organising. The Carnival she founded now generates £450m annually. The neighbourhood she organised in has been entirely gentrified.',
        threads:  ['joy-as-politics', 'who-owns-the-culture'],
        location: 'St Pancras / Notting Hill',
      },
      {
        id:       'commonwealth-immigrants-act',
        year:     1962,
        title:    'Commonwealth Immigrants Act',
        type:     'legislation',
        body:     'The act introduced employment vouchers and began restricting the free movement that the 1948 Act had granted. It was followed by the Immigration Act 1971, which effectively ended primary immigration from the Caribbean.',
        theGap:   'The Jamaican High Commission opened in the same year as the act that began restricting Jamaican movement. The timing is the argument.',
        threads:  ['distance-embassy-community', 'landscape-under-your-feet'],
        location: 'Westminster',
      },
    ],
  },
  {
    id:        'second-generation',
    label:     'The Second Generation',
    span:      '1971–1993',
    startYear: 1971,
    endYear:   1993,
    headline:  'Born here. Still treated as if they\'d just arrived.',
    subtext:   'The children of the Windrush generation grew up British — schools, football, the charts — and encountered a Britain that consistently refused to acknowledge them as such. The cultural explosions of this era were the response.',
    colour:    '#9b7fe8',
    events: [
      {
        id:       'len-johnson-dies',
        year:     1974,
        title:    'Len Johnson Dies, Manchester',
        type:     'loss',
        body:     'Johnson died in Manchester, where he had spent his life as boxer, organiser, and political activist. He had been barred from the British middleweight title for his entire career. He organised for the Communist Party and for racial equality for decades after boxing.',
        theGap:   'He won over 100 fights. He was denied the title by an explicit racial rule. He spent his later years organising against the same logic in industry and politics. He has no blue plaque.',
        threads:  ['same-rule-different-arenas'],
        location: 'Manchester',
      },
      {
        id:       'brixton-riots',
        year:     1981,
        title:    'Brixton Uprising',
        type:     'resistance',
        body:     'Following years of heavy-handed policing under the Sus laws (which allowed police to stop and search anyone they suspected of planning to commit an offence), Brixton exploded over three days in April. The Scarman Report followed, acknowledging "racial disadvantage" for the first time in official language.',
        theGap:   'The Sus laws disproportionately targeted Black men. They were abolished in 1981 — then effectively reintroduced as Stop and Search. The Scarman Report\'s recommendations were not implemented.',
        threads:  ['same-rule-different-arenas', 'joy-as-politics'],
        location: 'Brixton, London',
      },
      {
        id:       'daley-thompson-gold',
        year:     1984,
        title:    'Daley Thompson: Double Olympic Gold',
        type:     'cultural',
        body:     'Thompson won the decathlon gold at the 1980 and 1984 Olympics. His celebrations — particularly the 1984 vest that read "Is the world\'s greatest athlete gay?" — were conspicuously, defiantly public joy.',
        theGap:   'Born in Notting Hill the year before the riots. His father was Nigerian, his mother Scottish. The deliberate, performed exuberance was a statement that his Britishness was not something he was asking permission for. No plaque in Notting Hill.',
        threads:  ['joy-as-politics', 'same-rule-different-arenas'],
        location: 'Los Angeles / Notting Hill',
      },
      {
        id:       'jazzie-b-soul-ii-soul',
        year:     1988,
        title:    'Soul II Soul: "Keep On Movin\'"',
        type:     'cultural',
        body:     'Soul II Soul released their debut single from an independent Black British enterprise — the label, the shop on Camden High Street, the sound system. "Back to Life (However Do You Want Me)" reached number one and won two Grammys.',
        theGap:   'Soul II Soul\'s 55/45 split prefigured the Wembley Wonders 55/25/20 model. The cultural infrastructure was built before the music was signed. The industry tried to buy the music and ignore the infrastructure. Jazzie B refused.',
        threads:  ['same-rule-different-arenas', 'who-owns-the-culture', 'kingston-to-the-grid'],
        location: 'Camden / Holloway, London',
      },
    ],
  },
  {
    id:        'digital-era',
    label:     'The Digital Reckoning',
    span:      '1993–2020',
    startYear: 1993,
    endYear:   2020,
    headline:  'The internet created new gatekeepers faster than it removed the old ones.',
    subtext:   'Digital distribution promised to disintermediate the music and media industries. It did — briefly. Then the platforms recreated the same extraction dynamic at greater scale and with better lawyers.',
    colour:    '#4ade80',
    events: [
      {
        id:       'kanya-king-mobo',
        year:     1996,
        title:    'Kanya King Founds MOBO Awards',
        type:     'institution',
        body:     'After every mainstream broadcaster and music industry body declined to recognise Black British music, King created the institution herself. The first MOBO ceremony was held at the Royal Opera House.',
        theGap:   'She was told the market didn\'t exist. She proved it did. The mechanism — create the institution the existing institutions refuse to be — is the pattern across this archive.',
        threads:  ['same-rule-different-arenas', 'who-owns-the-culture'],
        location: 'London',
      },
      {
        id:       'grime-origins',
        year:     2002,
        title:    'Grime Emerges from East London Pirate Radio',
        type:     'cultural',
        body:     'Grime cohered from jungle, UK garage, and dancehall on pirate stations — Rinse FM, Deja Vu, Heat FM. It was a decade before the mainstream noticed. By the time they did, the originators were already being displaced.',
        theGap:   'The pirate phase built the infrastructure. The mainstream then extracted the aesthetic while leaving the economic model behind. This is the sound system story again, one generation on.',
        threads:  ['kingston-to-the-grid', 'who-owns-the-culture'],
        location: 'Bow, East London',
      },
      {
        id:       'windrush-scandal',
        year:     2018,
        title:    'Windrush Scandal',
        type:     'resistance',
        body:     'Hundreds of Caribbean-born British citizens were wrongly detained, denied legal rights, and in some cases deported as a result of the Home Office\'s "hostile environment" policy. Many had lived in Britain for 50+ years but lacked documentary proof.',
        theGap:   'The documents that proved their right to remain were held by the Home Office. The Home Office destroyed them in 2010. The people affected were asked to prove what the government had deliberately made unprovable.',
        threads:  ['landscape-under-your-feet', 'distance-embassy-community'],
        location: 'UK-wide',
      },
      {
        id:       'michaela-coel-mactaggart',
        year:     2018,
        title:    'Michaela Coel Delivers MacTaggart Lecture',
        type:     'cultural',
        body:     'Coel named the structural conditions of the television industry at its most prestigious annual event. The industry listened, praised her, and continued the same practices. She then turned down $1 million from Netflix to keep copyright of I May Destroy You.',
        theGap:   'The lecture is the clearest statement written from inside the creative industries of what the extraction dynamic actually looks like in practice. It connects directly to Jazzie B\'s history and Kanya King\'s founding of MOBO.',
        threads:  ['same-rule-different-arenas', 'who-owns-the-culture'],
        location: 'Edinburgh / London',
      },
    ],
  },
  {
    id:        'present',
    label:     'The Present',
    span:      '2020–',
    startYear: 2020,
    endYear:   new Date().getFullYear(),
    headline:  'The counter-archive is being assembled.',
    subtext:   'Wembley Wonders CIC was founded in 2020 on the same land as the 1924 Exhibition. The Knowledge Commons is the institutional expression of the same argument the archive makes: the value created by this community belongs to this community.',
    colour:    '#d4a853',
    events: [
      {
        id:       'wembley-wonders-founded',
        year:     2020,
        title:    'Wembley Wonders CIC Founded',
        type:     'institution',
        body:     'Founded at 452 High Road, Wembley HA9 — on the same land as the 1924 British Empire Exhibition. The 55/25/20 revenue split is the Equiano Principle made structural.',
        theGap:   'There is no gap here. This is where the counter-archive lives.',
        threads:  ['landscape-under-your-feet'],
        location: '452 High Road, Wembley HA9',
      },
      {
        id:       'roots-programme',
        year:     2026,
        title:    'Roots Programme Launches, IWD 8 March 2026',
        type:     'institution',
        body:     'Hair science, body sovereignty, chemical literacy, legal rights. Led by Judith Fontanelle, Flora Agba, and Natalie. The knowledge that should have been handed down, made transmissible.',
        theGap:   'The gap this programme closes is the one between salon training and trichology, between product marketing and chemical literacy, between the knowledge that\'s held in communities and the knowledge that\'s written down.',
        threads:  ['landscape-under-your-feet'],
        location: 'Wembley Wonders CIC, HA9',
      },
    ],
  },
];

const EVENT_TYPE_COLOURS: Record<TimelineEvent['type'], string> = {
  legislation: '#f87171',
  arrival:     '#3ecfcf',
  cultural:    '#d4a853',
  resistance:  '#9b7fe8',
  institution: '#4ade80',
  loss:        '#6b6b80',
};

const EVENT_TYPE_LABELS: Record<TimelineEvent['type'], string> = {
  legislation: 'Legislation',
  arrival:     'Arrival',
  cultural:    'Cultural moment',
  resistance:  'Resistance',
  institution: 'Institution',
  loss:        'Loss',
};

interface Props { ctx: CommonsContext; }

const EraTimeline: React.FC<Props> = ({ ctx }) => {
  const [activeEra, setActiveEra] = useState<Era | null>(null);
  const [activeEvent, setActiveEvent] = useState<TimelineEvent | null>(null);
  const [filterType, setFilterType] = useState<TimelineEvent['type'] | 'all'>('all');
  const timelineRef = useRef<HTMLDivElement>(null);

  const openEra = (era: Era) => {
    setActiveEra(era);
    setActiveEvent(null);
    ctx.setActiveId(era.id);
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const closeEra = () => {
    setActiveEra(null);
    setActiveEvent(null);
    ctx.setActiveId(null);
  };

  const allYears = ERAS.flatMap(e => e.events.map(ev => ev.year));
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);

  if (activeEra) {
    const filteredEvents = activeEra.events
      .filter(e => filterType === 'all' || e.type === filterType)
      .sort((a, b) => a.year - b.year);

    return (
      <div className="kc-era-detail" ref={timelineRef} style={{ '--era-colour': activeEra.colour } as React.CSSProperties}>
        <button className="kc-back-btn" onClick={closeEra}>← All eras</button>

        <div className="kc-era-detail-header">
          <span className="kc-era-span-badge">{activeEra.span}</span>
          <h2 className="kc-era-detail-title">{activeEra.label}</h2>
          <p className="kc-era-headline">{activeEra.headline}</p>
          <p className="kc-era-subtext">{activeEra.subtext}</p>
        </div>

        <div className="kc-era-filter">
          {(['all', ...Object.keys(EVENT_TYPE_LABELS)] as (TimelineEvent['type'] | 'all')[]).map(t => (
            <button
              key={t}
              className={`kc-filter-btn${filterType === t ? ' active' : ''}`}
              style={t !== 'all' ? { '--filter-colour': EVENT_TYPE_COLOURS[t as TimelineEvent['type']] } as React.CSSProperties : {}}
              onClick={() => setFilterType(t as typeof filterType)}
            >
              {t === 'all' ? 'All events' : EVENT_TYPE_LABELS[t as TimelineEvent['type']]}
            </button>
          ))}
        </div>

        <div className="kc-era-events">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className={`kc-event${activeEvent?.id === event.id ? ' kc-event--active' : ''}`}
              style={{ '--event-colour': EVENT_TYPE_COLOURS[event.type] } as React.CSSProperties}
            >
              <div className="kc-event-spine">
                <div className="kc-event-year">{event.year}</div>
                <div className="kc-event-line" />
              </div>

              <div className="kc-event-body">
                <div className="kc-event-type-badge">
                  {EVENT_TYPE_LABELS[event.type]}
                </div>
                <h3 className="kc-event-title">{event.title}</h3>
                {event.location && (
                  <div className="kc-event-location">◎ {event.location}</div>
                )}
                <p className="kc-event-text">{event.body}</p>

                {event.theGap && (
                  <div className="kc-event-gap">
                    <span className="kc-event-gap-label">The counter-archive note</span>
                    <p className="kc-event-gap-text">{event.theGap}</p>
                  </div>
                )}

                {event.threads.length > 0 && (
                  <div className="kc-event-threads">
                    {event.threads.map(tid => (
                      <button
                        key={tid}
                        className="kc-event-thread-link"
                        onClick={() => { ctx.setMode('thread'); ctx.setActiveId(tid); }}
                      >
                        Thread: {tid.replace(/-/g, ' ')} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="kc-timeline">
      {/* Continuous year bar */}
      <div className="kc-year-bar">
        <span className="kc-year-bar-start">{minYear}</span>
        <div className="kc-year-bar-track">
          {ERAS.map(era => {
            const totalSpan = maxYear - minYear;
            const eraStart = ((era.startYear - minYear) / totalSpan) * 100;
            const eraWidth = ((Math.min(era.endYear, maxYear) - era.startYear) / totalSpan) * 100;
            return (
              <div
                key={era.id}
                className="kc-year-segment"
                style={{
                  left: `${eraStart}%`,
                  width: `${eraWidth}%`,
                  background: era.colour,
                }}
                title={era.label}
              />
            );
          })}
        </div>
        <span className="kc-year-bar-end">Now</span>
      </div>

      {/* Era cards */}
      <div className="kc-era-grid">
        {ERAS.map(era => (
          <button
            key={era.id}
            className="kc-era-card"
            style={{ '--era-colour': era.colour } as React.CSSProperties}
            onClick={() => openEra(era)}
          >
            <span className="kc-era-card-span">{era.span}</span>
            <h3 className="kc-era-card-label">{era.label}</h3>
            <p className="kc-era-card-headline">{era.headline}</p>
            <div className="kc-era-card-event-count">
              <div className="kc-era-event-dots">
                {era.events.map(e => (
                  <span
                    key={e.id}
                    className="kc-era-event-dot"
                    style={{ background: EVENT_TYPE_COLOURS[e.type] }}
                    title={e.title}
                  />
                ))}
              </div>
              <span className="kc-era-event-label">{era.events.length} event{era.events.length !== 1 ? 's' : ''}</span>
            </div>
            <span className="kc-era-enter">Explore this era →</span>
          </button>
        ))}
      </div>

      {/* Type legend */}
      <div className="kc-event-legend">
        {Object.entries(EVENT_TYPE_LABELS).map(([type, label]) => (
          <div key={type} className="kc-legend-item">
            <span className="kc-legend-dot" style={{ background: EVENT_TYPE_COLOURS[type as TimelineEvent['type']] }} />
            <span className="kc-legend-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EraTimeline;