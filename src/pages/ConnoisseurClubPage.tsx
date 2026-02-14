import React, { useState } from 'react';

const ConnoisseurClubPage = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const transitionStages = [
    {
      id: 'seedling',
      title: 'Seedling',
      subtitle: 'Primary → Secondary',
      ages: '10–12',
      icon: '🌱',
      colour: '#4ade80',
      focus: 'Foundation & First Steps',
      description: 'The journey begins here. Young people learn the basics of self-presentation — how to greet elders, how to introduce themselves with confidence, what it means to represent their family and community when they step into a new environment.',
      skills: [
        'Formal greetings across African and Caribbean traditions',
        'Introduction and handshake etiquette',
        'Understanding dress codes — when dashiki, when shirt and tie',
        'Table manners and communal dining customs',
        'Listening, observation, and respect for elders'
      ],
      ceremony: 'The Naming — each Seedling receives a community name chosen by elders, marking their formal entry into the Connoisseurs Club. A communal meal celebrates the transition.',
      marker: 'Seedling Pin & Community Name'
    },
    {
      id: 'rising',
      title: 'Rising',
      subtitle: 'Secondary → College',
      ages: '14–16',
      icon: '🌿',
      colour: '#f59e0b',
      focus: 'Growth & Responsibility',
      description: 'Expectations have risen. Young people are no longer just attendees — they help organise events, mentor Seedlings, and begin to understand the deeper cultural knowledge behind the protocols they practise.',
      skills: [
        'Public speaking and confident conversation',
        'Networking and professional introductions',
        'Organising and hosting community gatherings',
        'Cultural knowledge — history of the garments, the food, the music',
        'Mentoring younger participants'
      ],
      ceremony: 'The Elevation — Rising members present a cultural project to the community (a speech, performance, or demonstration) and receive their new status from existing elders and community leaders.',
      marker: 'Rising Sash & Mentor Assignment'
    },
    {
      id: 'grounded',
      title: 'Grounded',
      subtitle: 'College → University / Work',
      ages: '17–19',
      icon: '🌳',
      colour: '#0ea5e9',
      focus: 'Leadership & Service',
      description: 'The Grounded have internalised the principles. They lead Connoisseurs Club events, design ceremony programmes, and serve as the bridge between the community\'s youth and its elders. Their cultural fluency is now a lived practice, not a performance.',
      skills: [
        'Event direction and ceremony design',
        'Cross-cultural protocol — formal occasions across traditions',
        'Business and civic presentation skills',
        'Community leadership and conflict resolution',
        'Financial literacy for formal entertaining'
      ],
      ceremony: 'The Grounding — a formal dinner hosted entirely by the Grounded cohort, demonstrating mastery of hospitality, cultural protocol, and community leadership. Elders and community partners are guests of honour.',
      marker: 'Grounded Medallion & Leadership Portfolio'
    },
    {
      id: 'torchbearer',
      title: 'Torchbearer',
      subtitle: 'Young Adult → Community Builder',
      ages: '20–30',
      icon: '🔥',
      colour: '#a855f7',
      focus: 'Legacy & Enterprise',
      description: 'Torchbearers have completed their formal transitions and now carry the flame outward. They launch businesses, open community spaces, lead organisations — and they know how to mark those occasions with the dignity and cultural richness they deserve.',
      skills: [
        'Business launch and ribbon-cutting protocols',
        'Civic ceremony — community openings, dedications, libations',
        'Fundraising dinner organisation and hosting',
        'Cross-generational mentoring and programme design',
        'Media presentation — Rayd-yo interviews, Joystick features'
      ],
      ceremony: 'The Commissioning — a public ceremony where the community formally recognises the Torchbearer\'s readiness to lead. They receive their commission from the Council of Elders and pledge service to the next generation.',
      marker: 'Torchbearer Stole & Community Commission'
    },
    {
      id: 'elder',
      title: 'Elder',
      subtitle: 'Community Builder → Keeper of Ways',
      ages: '30+',
      icon: '👑',
      colour: '#fbbf24',
      focus: 'Wisdom & Continuity',
      description: 'Elders are the institutional memory. They conduct ceremonies, affirm transitions, hold the community accountable, and ensure that what has been built endures. Every title they bestow carries the weight of their own journey through every preceding stage.',
      skills: [
        'Ceremony officiation and cultural custodianship',
        'Institutional governance and democratic practice',
        'Oral history preservation and storytelling',
        'Intergenerational mediation and counsel',
        'Community representation at civic and cultural events'
      ],
      ceremony: 'The Enstoolment — the community\'s highest recognition, drawing on Akan tradition. Elders are formally seated by their peers in a ceremony that honours their accumulated service, wisdom, and commitment to the next generation.',
      marker: 'Elder\'s Kente Cloth & Seat on the Council'
    }
  ];

  const culturalCalendar: Array<{
    month: MonthName;
    event: string;
    date: string;
    type: EventType;
    description: string;
    dressCode: string;
    focus: string;
  }> = [
    {
      month: 'January',
      event: 'New Year\'s Reception',
      date: 'First Saturday',
      type: 'formal',
      description: 'A formal reception to welcome the new year. Dress code: traditional formal. Seedlings practise their first formal introductions. Elders share reflections on the year ahead.',
      dressCode: 'Traditional formal — agbada, buba & iro, kente, or Western formal',
      focus: 'New beginnings, goal setting, intergenerational connection'
    },
    {
      month: 'February',
      event: 'Windrush Heritage Dinner',
      date: 'Last Saturday',
      type: 'cultural',
      description: 'A sit-down dinner celebrating Caribbean heritage and the Windrush generation. Menu drawn from the traditions of the community\'s elders. Stories and music from the journey.',
      dressCode: 'Caribbean formal — linen suits, madras prints, elegant evening wear',
      focus: 'Caribbean heritage, oral history, intergenerational storytelling'
    },
    {
      month: 'March',
      event: 'International Women\'s Day Gala',
      date: '8th March (nearest Saturday)',
      type: 'gala',
      description: 'Young women take the lead — organising, hosting, and presenting. A celebration of women across the African and Caribbean diaspora. Guest speakers, cultural performances, and the Rising ceremony for young women transitioning to the next stage.',
      dressCode: 'Ankara gown, buba & iro with gele, or contemporary formal',
      focus: 'Women\'s leadership, cultural celebration, Rising ceremony (women)'
    },
    {
      month: 'March',
      event: 'Commonwealth Day Symposium',
      date: 'Second Monday (nearest Saturday)',
      type: 'symposium',
      description: 'A cross-cultural symposium reflecting the full breadth of Commonwealth heritage in Wembley — Caribbean, African, South Asian, and Pacific traditions. Panel discussions, cultural demonstrations, and shared dining.',
      dressCode: 'National formal dress — representing your heritage',
      focus: 'Cross-cultural exchange, civic engagement, Commonwealth traditions'
    },
    {
      month: 'March',
      event: 'Spring Equinox Gathering',
      date: '20th March (nearest Saturday)',
      type: 'seasonal',
      description: 'Marking the turning of the season. A community gathering that connects to agricultural and spiritual traditions across African cultures — renewal, planting, and preparation. The Seedling ceremony for new entrants.',
      dressCode: 'White and earth tones — symbolising renewal',
      focus: 'Seasonal renewal, Seedling naming ceremony, community planting'
    },
    {
      month: 'April',
      event: 'Easter / Resurrection Celebration',
      date: 'Easter Saturday',
      type: 'celebration',
      description: 'A celebration that honours the spiritual traditions of the community — drawing on Christian, Rastafari, and ancestral practices. Music, food, and reflection on themes of renewal and redemption.',
      dressCode: 'Sunday best — church formal across traditions',
      focus: 'Spiritual heritage, community fellowship, musical showcase'
    },
    {
      month: 'May',
      event: 'Africa Day Recital',
      date: '25th May (nearest Saturday)',
      type: 'recital',
      description: 'A formal recital celebrating African arts — poetry, music, dance, and oratory. Young people present prepared pieces. Grounded members direct the programme. The evening culminates in a recognition of Africa\'s cultural contribution to Britain.',
      dressCode: 'Pan-African formal — dashiki, agbada, kente, or continental elegance',
      focus: 'African arts, performance skills, cultural pride'
    },
    {
      month: 'June',
      event: 'Juneteenth Liberation Dinner',
      date: '19th June (nearest Saturday)',
      type: 'formal',
      description: 'A soul food dinner with jazz, blues, and spoken word. The evening connects the African American freedom tradition to the broader diaspora experience. Torchbearers host. The Rising ceremony for young men.',
      dressCode: 'African American formal — suits, elegant dresses, Harlem Renaissance inspired',
      focus: 'Liberation heritage, African American culture, Rising ceremony (men)'
    },
    {
      month: 'June',
      event: 'Father\'s Day Honours',
      date: 'Third Sunday (nearest Saturday)',
      type: 'honours',
      description: 'Young men step up as organisers and hosts. A celebration of fatherhood, mentorship, and male role models across the community. Awards for outstanding male contributors. The Grounding ceremony for young men completing their transition.',
      dressCode: 'Smart formal — demonstrating the standards being taught',
      focus: 'Fatherhood, mentoring, Grounding ceremony, male leadership'
    },
    {
      month: 'August',
      event: 'Emancipation Day / Summer Showcase',
      date: 'First Saturday of August',
      type: 'showcase',
      description: 'Marking Emancipation Day (1st August) with a summer showcase of community achievement. Outdoor if weather permits. Carnival spirit meets formal recognition. Preview of the autumn programme.',
      dressCode: 'Festival formal — carnival colours with elegance',
      focus: 'Freedom, celebration, community achievement, summer energy'
    },
    {
      month: 'September',
      event: 'Autumn Equinox / Harvest Gathering',
      date: '22nd September (nearest Saturday)',
      type: 'seasonal',
      description: 'A harvest celebration connecting to West African and Caribbean agricultural traditions. Community meal with seasonal, locally sourced food. Reflection on what has been cultivated through the year. New cohort welcome.',
      dressCode: 'Earth tones and harvest colours — amber, burgundy, forest green',
      focus: 'Harvest, gratitude, new cohort welcome, community meal'
    },
    {
      month: 'October',
      event: 'Black History Month Gala',
      date: 'Last Saturday of October',
      type: 'gala',
      description: 'The flagship formal event of the year. A gala dinner with keynote speaker, awards ceremony, cultural performances, and the Commissioning ceremony for Torchbearers. Broadcast live on Rayd-yo. Featured in the autumn Joystick edition.',
      dressCode: 'Black tie with cultural expression — the highest standard',
      focus: 'Black History celebration, Commissioning ceremony, annual awards'
    },
    {
      month: 'November',
      event: 'Remembrance & Reflection',
      date: 'Second Saturday',
      type: 'memorial',
      description: 'Honouring the contribution of African and Caribbean people to the World Wars and to Britain\'s story. Formal, dignified, and reflective. Wreath-laying, poetry, and remembrance of community elders who have passed.',
      dressCode: 'Formal dark — suits, traditional mourning colours, poppies',
      focus: 'Remembrance, military heritage, community memorial, dignity'
    },
    {
      month: 'December',
      event: 'Kwanzaa & Connoisseurs Club Showcase',
      date: 'December 26–January 1 (main event last Saturday)',
      type: 'showcase',
      description: 'The two-day year-end celebration culminating in the AGM. Day one: showcase of the year\'s achievements, awards, A/V presentation, cultural performances. Day two: AGM, planning for the year ahead, and the Enstoolment ceremony for new Elders. Seven days of Kwanzaa principles woven through the week.',
      dressCode: 'Pan-African formal — red, black, and green prominent',
      focus: 'Kwanzaa principles, annual showcase, AGM, Enstoolment ceremony'
    }
  ];

  type EventType =
    | 'formal'
    | 'cultural'
    | 'gala'
    | 'symposium'
    | 'seasonal'
    | 'celebration'
    | 'recital'
    | 'honours'
    | 'showcase'
    | 'memorial';

  const eventTypeColours: Record<EventType, string> = {
    formal: '#c084fc',
    cultural: '#f59e0b',
    gala: '#fbbf24',
    symposium: '#0ea5e9',
    seasonal: '#4ade80',
    celebration: '#fb923c',
    recital: '#a78bfa',
    honours: '#38bdf8',
    showcase: '#f472b6',
    memorial: '#94a3b8'
  };

  // Month-index mapping for next event lookup
  type MonthName =
    | 'January' | 'February' | 'March' | 'April'
    | 'May' | 'June' | 'July' | 'August'
    | 'September' | 'October' | 'November' | 'December';

  const monthIndex: Record<MonthName, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  const getNextEvents = () => {
    const now = new Date();
    const current = now.getMonth();
    const sorted = [...culturalCalendar].sort((a, b) => {
      const aMonth = monthIndex[a.month as MonthName];
      const bMonth = monthIndex[b.month as MonthName];
      const aOffset = (aMonth - current + 12) % 12;
      const bOffset = (bMonth - current + 12) % 12;
      return aOffset - bOffset;
    });
    return sorted.slice(0, 2);
  };

  const nextEvents = getNextEvents();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      color: '#e2e8f0',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif"
    }}>

      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 30%, #2d1b3d 50%, #1a0a2e 70%, #0a0a1a 100%)'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse 600px 400px at 20% 50%, rgba(251, 191, 36, 0.06), transparent),
            radial-gradient(ellipse 500px 500px at 80% 30%, rgba(168, 85, 247, 0.05), transparent),
            radial-gradient(ellipse 400px 300px at 50% 80%, rgba(251, 191, 36, 0.04), transparent)
          `,
          pointerEvents: 'none'
        }} />

        {/* Diasporan Nations border — flag colours of independent African and Caribbean nations */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '6px',
          background: `repeating-linear-gradient(90deg,
            #009B3A 0px, #009B3A 4px, #FCD116 4px, #FCD116 8px, #CE1126 8px, #CE1126 12px,
            #00A651 12px, #00A651 16px, #FFD100 16px, #FFD100 20px,
            #009E49 20px, #009E49 24px, #000000 24px, #000000 28px, #FED100 28px, #FED100 32px,
            #CE1126 32px, #CE1126 36px, #FFFFFF 36px, #FFFFFF 38px, #00209F 38px, #00209F 42px,
            #EF3340 42px, #EF3340 46px, #FFFFFF 46px, #FFFFFF 48px, #000000 48px, #000000 52px,
            #006847 52px, #006847 56px, #FCD116 56px, #FCD116 60px, #CE1126 60px, #CE1126 64px,
            #002868 64px, #002868 68px, #CE1126 68px, #CE1126 72px,
            #009739 72px, #009739 76px, #FFD100 76px, #FFD100 80px, #CE1126 80px, #CE1126 84px,
            #00267F 84px, #00267F 88px, #CE1126 88px, #CE1126 92px,
            #009543 92px, #009543 96px, #000000 96px, #000000 100px, #FFFFFF 100px, #FFFFFF 102px, #CE1126 102px, #CE1126 106px,
            #0072C6 106px, #0072C6 110px, #FCD116 110px, #FCD116 114px, #000000 114px, #000000 118px,
            #006233 118px, #006233 122px, #FCD116 122px, #FCD116 126px, #CE1126 126px, #CE1126 130px,
            #003580 130px, #003580 134px, #FFD100 134px, #FFD100 138px,
            #009E60 138px, #009E60 142px, #FFFFFF 142px, #FFFFFF 144px, #FF6600 144px, #FF6600 148px,
            #009A44 148px, #009A44 152px, #FFCE00 152px, #FFCE00 156px, #E8112D 156px, #E8112D 160px,
            #006B3F 160px, #006B3F 164px, #FCD116 164px, #FCD116 168px,
            #003893 168px, #003893 172px, #FFFFFF 172px, #FFFFFF 174px, #CF2029 174px, #CF2029 178px,
            #009639 178px, #009639 182px, #FCDD09 182px, #FCDD09 186px, #DA121A 186px, #DA121A 190px,
            #1EB53A 190px, #1EB53A 194px, #FCD116 194px, #FCD116 198px, #E8112D 198px, #E8112D 202px, #000000 202px, #000000 206px
          )`
        }} />
        {/* Nations represented: Ethiopia, Jamaica, Guyana, Trinidad & Tobago, Barbados, Ghana, Haiti,
            Grenada, Antigua & Barbuda, St Kitts & Nevis, Dominica, St Lucia, Nigeria, Cameroon,
            Senegal, Sierra Leone, Kenya, Guinea, The Bahamas, St Vincent, South Africa */}

        <div style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '900px' }}>
          <div style={{
            fontSize: '1rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#fbbf24',
            marginBottom: '1.5rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Wembley Wonders CIC
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 1.5rem 0',
            color: '#ffffff'
          }}>
            The Connoisseurs<br />
            <span style={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Club</span>
          </h1>

          <div style={{
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
            margin: '0 auto 2rem'
          }} />

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#c4b5fd',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            A rites of passage framework celebrating African and Diasporan culture — 
            guiding young people from childhood through adulthood with dignity, 
            cultural knowledge, and community recognition.
          </p>

          <p style={{
            fontSize: '1rem',
            color: '#94a3b8',
            fontStyle: 'italic',
            fontFamily: "'Outfit', sans-serif"
          }}>
            From boy to man. From girl to woman. From adult to elder.
          </p>

          <div style={{
            marginTop: '2.5rem',
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: '0.8rem',
            color: '#64748b',
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: '0.05em'
          }}>
            <span>Four seasonal programmes</span>
            <span style={{ color: '#fbbf2444' }}>·</span>
            <span>Two media platforms</span>
            <span style={{ color: '#fbbf2444' }}>·</span>
            <span>One cultural calendar</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#64748b',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: "'Outfit', sans-serif",
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <span>Explore</span>
          <span style={{ fontSize: '1.2rem' }}>↓</span>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
          fontWeight: 300,
          color: '#fbbf24',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Why This Matters
        </h2>

        <div style={{
          display: 'grid',
          gap: '2rem',
          fontSize: '1.05rem',
          lineHeight: 1.8,
          color: '#cbd5e1'
        }}>
          <p>
            Traditional cultures have always formally recognised the transitions of life — from 
            childhood to youth, youth to adulthood, adulthood to eldership. These ceremonies, 
            titles, and markers gave people their bearings. They told you where you stood, what 
            was expected of you, and who would guide you forward.
          </p>
          <p>
            In modern urban Britain, that architecture has largely disappeared. Young people 
            from African and Caribbean backgrounds navigate their transitions without the 
            cultural scaffolding their grandparents took for granted. The Connoisseurs Club 
            rebuilds it — not as nostalgia, but as a living, practical framework that grows 
            with each person from their first formal introduction at age ten to the day they 
            cut the ribbon on their own business or take their seat on the Council of Elders.
          </p>
          <p style={{ color: '#a78bfa', fontStyle: 'italic', textAlign: 'center', fontSize: '1.15rem' }}>
            Every transition carries responsibility. Every title is earned through service. 
            Every ceremony is witnessed by the community that shaped you.
          </p>
        </div>
      </section>

      {/* NEXT ON THE CALENDAR */}
      <section style={{
        padding: '0 clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 4rem)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: nextEvents.length > 1 ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: '1.25rem'
        }}>
          {nextEvents.map((event, i) => (
            <div key={i} style={{
              background: i === 0 
                ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(15, 23, 42, 0.7))'
                : 'rgba(15, 23, 42, 0.5)',
              border: `1px solid ${i === 0 ? 'rgba(251, 191, 36, 0.2)' : 'rgba(148, 163, 184, 0.1)'}`,
              borderRadius: '1.25rem',
              padding: '1.5rem 1.75rem',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.6rem'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: i === 0 ? '#fbbf24' : '#94a3b8',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600
                }}>
                  {i === 0 ? 'Next occasion' : 'Coming soon'}
                </span>
                <span style={{
                  background: `${eventTypeColours[event.type]}18`,
                  color: eventTypeColours[event.type],
                  fontSize: '0.6rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600
                }}>{event.type}</span>
              </div>
              <h3 style={{
                fontSize: '1.15rem',
                color: '#ffffff',
                margin: '0 0 0.4rem',
                fontWeight: 500,
                lineHeight: 1.3
              }}>{event.event}</h3>
              <div style={{
                fontSize: '0.8rem',
                color: '#94a3b8',
                fontFamily: "'Outfit', sans-serif"
              }}>{event.month} · {event.date}</div>
              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: '#cbd5e1',
                fontFamily: "'Outfit', sans-serif"
              }}>
                <span style={{ color: '#fbbf2499' }}>Dress: </span>{event.dressCode}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRANSITION STAGES */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.3), rgba(10, 10, 26, 0.8))'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '0.75rem',
            textAlign: 'center'
          }}>
            The Five Stages
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '3rem',
            fontSize: '1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Each stage carries its own expectations, ceremony, and formal recognition
          </p>

          {/* Stage navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}>
            {transitionStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                style={{
                  background: activeStage === stage.id
                    ? `linear-gradient(135deg, ${stage.colour}22, ${stage.colour}11)`
                    : 'rgba(30, 41, 59, 0.5)',
                  border: `1.5px solid ${activeStage === stage.id ? stage.colour : 'rgba(148, 163, 184, 0.2)'}`,
                  borderRadius: '1rem',
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  minWidth: '140px'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{stage.icon}</span>
                <span style={{
                  color: activeStage === stage.id ? stage.colour : '#e2e8f0',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: "'Outfit', sans-serif"
                }}>{stage.title}</span>
                <span style={{
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  fontFamily: "'Outfit', sans-serif"
                }}>{stage.ages}</span>
              </button>
            ))}
          </div>

          {/* Connecting line */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '0 2rem'
          }}>
            {transitionStages.map((stage, i) => (
              <React.Fragment key={stage.id}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: stage.colour,
                  border: `2px solid ${stage.colour}`,
                  boxShadow: `0 0 12px ${stage.colour}44`,
                  flexShrink: 0
                }} />
                {i < transitionStages.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    background: `linear-gradient(90deg, ${stage.colour}, ${transitionStages[i + 1].colour})`,
                    opacity: 0.4,
                    maxWidth: '120px'
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Active stage detail */}
          {activeStage && (() => {
            const stage = transitionStages.find(s => s.id === activeStage);
            if (!stage) return null;
            return (
              <div style={{
                background: `linear-gradient(135deg, ${stage.colour}08, rgba(15, 23, 42, 0.8))`,
                border: `1px solid ${stage.colour}33`,
                borderRadius: '1.5rem',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                maxWidth: '900px',
                margin: '0 auto',
                animation: 'fadeIn 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '2.5rem' }}>{stage.icon}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.8rem',
                      color: stage.colour,
                      margin: 0,
                      fontWeight: 400
                    }}>{stage.title}</h3>
                    <p style={{
                      color: '#94a3b8',
                      margin: 0,
                      fontSize: '0.9rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>{stage.subtitle} · Ages {stage.ages} · {stage.focus}</p>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                  {stage.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                  {/* Skills */}
                  <div>
                    <h4 style={{
                      color: stage.colour,
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>What They Learn</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {stage.skills.map((skill, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          gap: '0.75rem',
                          alignItems: 'flex-start',
                          color: '#cbd5e1',
                          fontSize: '0.95rem',
                          lineHeight: 1.5
                        }}>
                          <span style={{ color: stage.colour, flexShrink: 0, marginTop: '2px' }}>◆</span>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ceremony */}
                  <div>
                    <h4 style={{
                      color: stage.colour,
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>The Ceremony</h4>
                    <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      {stage.ceremony}
                    </p>

                    <div style={{
                      background: `${stage.colour}11`,
                      border: `1px solid ${stage.colour}22`,
                      borderRadius: '0.75rem',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.3rem' }}>🏅</span>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontFamily: "'Outfit', sans-serif"
                        }}>Recognition</div>
                        <div style={{ color: stage.colour, fontWeight: 500 }}>{stage.marker}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {!activeStage && (
            <p style={{
              textAlign: 'center',
              color: '#64748b',
              fontStyle: 'italic',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Select a stage above to explore its journey
            </p>
          )}
        </div>
      </section>

      {/* CULTURAL CALENDAR */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '0.75rem',
            textAlign: 'center'
          }}>
            The Cultural Calendar
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '3rem',
            fontSize: '1rem',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Each occasion demands different knowledge — different dress, different food, 
            different music, different protocols. Young people build genuine cultural 
            fluency across the entire diaspora.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {culturalCalendar.map((event, index) => (
              <div
                key={index}
                onClick={() => setActiveEvent(activeEvent === index ? null : index)}
                style={{
                  background: activeEvent === index
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${activeEvent === index
                    ? eventTypeColours[event.type]
                    : 'rgba(148, 163, 184, 0.15)'}`,
                  borderRadius: '1rem',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ...(activeEvent === index && {
                    gridColumn: 'span 1',
                    boxShadow: `0 4px 20px ${eventTypeColours[event.type]}15`
                  })
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <div style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: eventTypeColours[event.type],
                      marginBottom: '0.3rem',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600
                    }}>{event.month}</div>
                    <h3 style={{
                      fontSize: '1.05rem',
                      color: '#ffffff',
                      margin: 0,
                      fontWeight: 500,
                      lineHeight: 1.3
                    }}>{event.event}</h3>
                  </div>
                  <span style={{
                    background: `${eventTypeColours[event.type]}22`,
                    color: eventTypeColours[event.type],
                    fontSize: '0.65rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>{event.type}</span>
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#94a3b8',
                  marginBottom: activeEvent === index ? '1rem' : 0,
                  fontFamily: "'Outfit', sans-serif"
                }}>{event.date}</div>

                {activeEvent === index && (
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <p style={{
                      color: '#cbd5e1',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      marginBottom: '1rem'
                    }}>{event.description}</p>

                    <div style={{
                      display: 'grid',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        background: 'rgba(251, 191, 36, 0.08)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{
                          fontSize: '0.7rem',
                          color: '#fbbf24',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.3rem',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600
                        }}>Dress Code</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>{event.dressCode}</div>
                      </div>

                      <div style={{
                        background: 'rgba(168, 85, 247, 0.08)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem'
                      }}>
                        <div style={{
                          fontSize: '0.7rem',
                          color: '#a78bfa',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.3rem',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600
                        }}>Focus</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>{event.focus}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION WITH PROGRAMMES */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.3), rgba(10, 10, 26, 0.8))'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            How It Connects
          </h2>

          <p style={{
            color: '#cbd5e1',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto 3rem'
          }}>
            The Connoisseurs Club isn't a standalone programme — it's the cultural thread that 
            runs through everything Wembley Wonders builds. A young person in any programme is 
            simultaneously progressing through the Club's transition framework.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                programme: 'Trubble n Bass',
                icon: '🎵',
                colour: '#a855f7',
                path: '/programmes/trubble-n-bass',
                connection: 'Musical performances at formal events. Young producers learn to curate playlists that honour cultural traditions — not just play what\'s popular.'
              },
              {
                programme: 'Kaywana\'s Court',
                icon: '🎭',
                colour: '#f472b6',
                path: '/programmes/kaywanas-court',
                connection: 'Drama and oratory skills feed directly into ceremony presentation. Kaywana\'s Court participants become the MCs, speakers, and storytellers at Connoisseurs Club events.'
              },
              {
                programme: 'Bright Sparks',
                icon: '💡',
                colour: '#4ade80',
                path: '/programmes/bright-sparks',
                connection: 'Technical skills applied to event production — A/V presentations, live broadcasting, digital documentation of ceremonies and achievements.'
              },
              {
                programme: 'TECHreneurs',
                icon: '🚀',
                colour: '#0ea5e9',
                path: '/programmes/techreneurs',
                connection: 'Business launch protocols and civic ceremony skills. TECHreneurs graduates know how to open a business with the dignity the occasion demands.'
              },
              {
                programme: 'Rayd-yo',
                icon: '📻',
                colour: '#f59e0b',
                path: '/raydyo',
                connection: 'Live broadcast coverage of major events. Interviews with elders, Torchbearers, and community partners. The community\'s living audio archive.'
              },
              {
                programme: 'Joystick',
                icon: '📰',
                colour: '#fb923c',
                path: '/joystick',
                connection: 'Pre-event previews, post-event coverage, member profiles, and cultural features. The written record of every transition and celebration.'
              }
            ].map((item, i) => (
              <a key={i} href={item.path} style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${item.colour}22`,
                borderRadius: '1rem',
                padding: '1.5rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                display: 'block'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <h3 style={{
                    color: item.colour,
                    fontSize: '1.05rem',
                    margin: 0,
                    fontWeight: 500
                  }}>{item.programme}</h3>
                </div>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  margin: '0 0 0.75rem 0'
                }}>{item.connection}</p>
                <span style={{
                  color: item.colour,
                  fontSize: '0.8rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  opacity: 0.6
                }}>Explore {item.programme} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* THE MENTORING PIPELINE */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '2rem'
          }}>
            The Circle
          </h2>

          <div style={{
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.15)',
            borderRadius: '1.5rem',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'left'
          }}>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              The same child who learned to tie their first gele or wore their first dashiki 
              at age ten is cutting the ribbon on their own business at twenty-five — knowing 
              exactly how to carry that occasion because they've been prepared for it across 
              fifteen years.
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              And the elder who places the kente cloth on the newest member of the Council 
              once stood where that Seedling stands now, receiving their own community name 
              from the elders who came before.
            </p>
            <p style={{
              color: '#fbbf24',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              fontStyle: 'italic',
              margin: 0,
              textAlign: 'center'
            }}>
              That's how cultural knowledge has always been transmitted.
              <br />That's what Wembley Wonders is for.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(251, 191, 36, 0.1)'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 300,
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Begin the Journey
          </h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Whether your child is approaching their first transition or you're an elder 
            ready to give back — the Connoisseurs Club has a place for you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/membership" style={{
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              color: '#0a0a1a',
              padding: '0.9rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.3s ease'
            }}>
              Join Wembley Wonders
            </a>
            <a href="/events" style={{
              background: 'transparent',
              color: '#fbbf24',
              padding: '0.9rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.95rem',
              fontFamily: "'Outfit', sans-serif",
              border: '1.5px solid #fbbf24',
              transition: 'all 0.3s ease'
            }}>
              View Upcoming Events
            </a>
          </div>
        </div>

        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          color: '#475569',
          fontSize: '0.8rem',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Wembley Wonders CIC · Company No. 12960817 · Flat 2, 452 High Road, Wembley HA9 7AY
          <br />
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>admin@wembleywonders.org · 0208 902 9991</span>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        * { box-sizing: border-box; }

        @media (max-width: 768px) {
          .stage-buttons { flex-direction: column; align-items: center; }
        }
      `}</style>
    </div>
  );
};

export default ConnoisseurClubPage;