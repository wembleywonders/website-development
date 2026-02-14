import React, { useState } from 'react';

const WembleyWondersHome = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>('monday');

  // WEEKLY SCHEDULE - The actual rhythm
  const weeklySchedule = [
    {
      day: 'monday',
      label: 'Monday',
      sessions: [
        { time: '4:30-6pm', activity: 'STEMgineers Open Lab', ages: '13-19', type: 'drop-in', cost: 'Free' },
        { time: '6-8pm', activity: 'Trubble n Bass Production', ages: '16+', type: 'workshop', cost: 'Free' }
      ]
    },
    {
      day: 'tuesday',
      label: 'Tuesday',
      sessions: [
        { time: '4:30-6pm', activity: 'PageTurners Writing Circle', ages: 'All ages', type: 'drop-in', cost: 'Free' },
        { time: '6-8pm', activity: 'TECHreneurs Business Planning', ages: '18+', type: 'workshop', cost: 'Free' }
      ]
    },
    {
      day: 'wednesday',
      label: 'Wednesday',
      sessions: [
        { time: '4:30-6pm', activity: 'G-Tech Casters Studio', ages: '14-25', type: 'drop-in', cost: 'Free' },
        { time: '6-8pm', activity: 'Kaywana\'s Court Rehearsal', ages: '16+', type: 'workshop', cost: 'Free' }
      ]
    },
    {
      day: 'thursday',
      label: 'Thursday',
      sessions: [
        { time: '4:30-6pm', activity: 'Auntie Anansi\'s Kitchen', ages: 'All ages', type: 'cooking', cost: '£3' },
        { time: '6-8pm', activity: 'Silk Stilettos Design Lab', ages: '16+', type: 'workshop', cost: 'Free' }
      ]
    },
    {
      day: 'saturday',
      label: 'Saturday',
      sessions: [
        { time: '10am-12pm', activity: 'Repair Café (All Programmes)', ages: 'All ages', type: 'community', cost: 'Free' },
        { time: '2-4pm', activity: 'Monthly Showcase (varies)', ages: 'All ages', type: 'event', cost: 'Free' }
      ]
    }
  ];

  const programmes = [
    {
      id: 'stemgineers',
      name: 'STEMgineers',
      icon: '🔧',
      colour: '#4ade80',
      ages: '13-19',
      tagline: 'Fix things. Earn money. Strengthen the ecosystem.',
      what: 'Device repair, electronics, prototyping',
      outcome: 'Connect to local repair shops, earn £15-40/repair',
      when: 'Monday 4:30-6pm',
      path: '/programmes/stemgineers'
    },
    {
      id: 'techreneurs',
      name: 'TECHreneurs',
      icon: '💼',
      colour: '#0ea5e9',
      ages: '18+',
      tagline: 'Economic literacy. Not startup hype.',
      what: 'Business planning, revenue models, ecosystem integration',
      outcome: 'Understand money, not just chase it',
      when: 'Tuesday 6-8pm',
      path: '/programmes/techreneurs'
    },
    {
      id: 'gtechcasters',
      name: 'G-Tech Casters',
      icon: '🎮',
      colour: '#a855f7',
      ages: '14-25',
      tagline: 'Gaming, podcasting, streaming production',
      what: 'Audio/video production, content creation, esports',
      outcome: 'Broadcast on Rayd-yo, monetize content',
      when: 'Wednesday 4:30-6pm',
      path: '/programmes/gtechcasters'
    },
    {
      id: 'pageturners',
      name: 'PageTurners',
      icon: '📖',
      colour: '#f59e0b',
      ages: 'All ages',
      tagline: 'Oral histories. Real writing. Published work.',
      what: 'Writing, oral history recording, journalism',
      outcome: 'Published in Joystick, preserve family stories',
      when: 'Tuesday 4:30-6pm',
      path: '/programmes/pageturners'
    },
    {
      id: 'trubblenbass',
      name: 'Trubble n Bass',
      icon: '🎵',
      colour: '#ec4899',
      ages: '16+',
      tagline: 'Music production. Radio broadcast. Fair pay.',
      what: 'Audio engineering, music production, radio',
      outcome: 'Broadcast on Rayd-yo, 55% of streaming revenue',
      when: 'Monday 6-8pm',
      path: '/programmes/trubble-n-bass'
    },
    {
      id: 'kaywaanascourt',
      name: 'Kaywana\'s Court',
      icon: '🎭',
      colour: '#fb923c',
      ages: '16+',
      tagline: 'Theatre. Audio drama. Performance.',
      what: 'Acting, directing, scriptwriting, voice work',
      outcome: 'Live showcases, Rayd-yo radio dramas',
      when: 'Wednesday 6-8pm',
      path: '/programmes/kaywanas-court'
    },
    {
      id: 'silkstilettoes',
      name: 'Silk Stilettos',
      icon: '👗',
      colour: '#c084fc',
      ages: '16+ (Women)',
      tagline: 'Fashion design. Heritage textiles. Market sales.',
      what: 'Pattern making, sewing, textile design',
      outcome: 'Sell through Cyberstore, showcase at events',
      when: 'Thursday 6-8pm',
      path: '/programmes/silk-stilettos'
    },
    {
      id: 'auntieanansiskitchen',
      name: 'Auntie Anansi\'s Kitchen',
      icon: '🍳',
      colour: '#fbbf24',
      ages: 'All ages',
      tagline: 'Recipe preservation. Cultural heritage. Community meals.',
      what: 'Cooking, recipe documentation, food history',
      outcome: 'Recipes archived, featured in Joystick',
      when: 'Thursday 4:30-6pm (£3)',
      path: '/programmes/auntie-anansiskitchen'
    }
  ];

  const testimonials = [
    {
      quote: "My son learned phone repair here. Now he fixes neighbors' phones and earns £200 a month. First time he's had his own money.",
      name: "Mrs. Patel",
      role: "Mother, Wembley resident since 1987",
      programme: "STEMgineers parent"
    },
    {
      quote: "I'm 58. I thought I was too old to podcast. Now I record Caribbean history stories every week on Rayd-yo. Young people actually listen.",
      name: "Winston",
      role: "Bus driver, PageTurners member",
      programme: "PageTurners"
    },
    {
      quote: "They don't just teach you to make music - they teach you how money works. 55% is mine, not Spotify's 30%. That's real.",
      name: "Aaliyah, 19",
      role: "Music producer",
      programme: "Trubble n Bass"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      color: '#e2e8f0',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif"
    }}>
      
      {/* HERO - Clear, direct, no jargon */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0a0a1a 0%, #1a0a2e 30%, #2d1b3d 50%, #1a0a2e 70%, #0a0a1a 100%)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(ellipse 600px 400px at 20% 50%, rgba(251, 191, 36, 0.06), transparent),
            radial-gradient(ellipse 500px 500px at 80% 30%, rgba(168, 85, 247, 0.05), transparent)
          `,
          pointerEvents: 'none'
        }} />

        {/* Diasporan flag border */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '6px',
          background: `repeating-linear-gradient(90deg,
            #009B3A 0px, #009B3A 4px, #FCD116 4px, #FCD116 8px, #CE1126 8px, #CE1126 12px,
            #00A651 12px, #00A651 16px, #FFD100 16px, #FFD100 20px,
            #009E49 20px, #009E49 24px, #000000 24px, #000000 28px, #FED100 28px, #FED100 32px
          )`
        }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '900px' }}>
          <div style={{
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#fbbf24',
            marginBottom: '1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Wembley Wonders CIC · Company No. 12960817
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            margin: '0 0 1.5rem 0',
            color: '#ffffff'
          }}>
            Learn Skills.<br />
            <span style={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Earn Money.</span><br />
            Build Community.
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#cbd5e1',
            maxWidth: '650px',
            margin: '0 auto 2.5rem'
          }}>
            Free weekly workshops in device repair, music production, writing, podcasting, 
            and more. Keep 55% of what you earn. Celebrate with cultural dignity.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            <a href="#schedule" style={{
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              color: '#0a0a1a',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              See This Week's Schedule
            </a>
            <a href="#programmes" style={{
              background: 'transparent',
              color: '#fbbf24',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              fontFamily: "'Outfit', sans-serif",
              border: '1.5px solid #fbbf24'
            }}>
              Browse 8 Programmes
            </a>
          </div>

          <div style={{
            fontSize: '0.85rem',
            color: '#94a3b8',
            fontFamily: "'Outfit', sans-serif"
          }}>
            📍 Park Lane Methodist Church, Wembley · Every weekday + Saturday
          </div>
        </div>
      </section>

      {/* FOUR PANELS - The core value proposition */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'rgba(15, 23, 42, 0.4)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Panel 1: Creation Development */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>🎓</div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4ade80',
                margin: '0 0 0.75rem',
                fontWeight: 500
              }}>Learn & Create</h3>
              <p style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Free workshops every week. Device repair. Music production. Writing. 
                Podcasting. Fashion. No experience needed.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#94a3b8',
                fontFamily: "'Outfit', sans-serif"
              }}>
                <div>✓ 8 different programmes</div>
                <div>✓ Expert instructors</div>
                <div>✓ All equipment provided</div>
                <div>✓ Portfolio development</div>
              </div>
              <a href="#programmes" style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                color: '#4ade80',
                fontSize: '0.9rem',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Explore Programmes →
              </a>
            </div>

            {/* Panel 2: Promotions */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(251, 146, 60, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>📻</div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#fb923c',
                margin: '0 0 0.75rem',
                fontWeight: 500
              }}>Get Heard & Read</h3>
              <p style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Your work broadcasts on Rayd-yo community radio (2,000+ listeners) 
                and publishes in Joystick e-zine (500+ readers/month).
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#94a3b8',
                fontFamily: "'Outfit', sans-serif"
              }}>
                <div>✓ Live radio broadcasts</div>
                <div>✓ Monthly publication</div>
                <div>✓ Portfolio building</div>
                <div>✓ Community recognition</div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <a href="/raydyo" style={{
                  color: '#fb923c',
                  fontSize: '0.9rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>Rayd-yo →</a>
                <a href="/joystick" style={{
                  color: '#fb923c',
                  fontSize: '0.9rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textDecoration: 'none'
                }}>Joystick →</a>
              </div>
            </div>

            {/* Panel 3: Income Earners */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>💰</div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#fbbf24',
                margin: '0 0 0.75rem',
                fontWeight: 500
              }}>Earn Fair Money</h3>
              <p style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                55% of sales goes to YOU (industry standard is 30%). 
                Sell repairs, music, designs, articles. Your IP is protected.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#94a3b8',
                fontFamily: "'Outfit', sans-serif"
              }}>
                <div>✓ 55% creator revenue share</div>
                <div>✓ Legal IP timestamping</div>
                <div>✓ Cyberstore marketplace</div>
                <div>✓ Average £200-800/month</div>
              </div>
              <a href="/cyberstore" style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                color: '#fbbf24',
                fontSize: '0.9rem',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Browse Cyberstore →
              </a>
            </div>

            {/* Panel 4: Events & Culture */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>🎭</div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#a855f7',
                margin: '0 0 0.75rem',
                fontWeight: 500
              }}>Celebrate Together</h3>
              <p style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Monthly showcases, cultural celebrations, rites of passage ceremonies. 
                Your achievements recognized with dignity.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#94a3b8',
                fontFamily: "'Outfit', sans-serif"
              }}>
                <div>✓ Monthly showcases</div>
                <div>✓ Cultural calendar events</div>
                <div>✓ Connoisseurs Club ceremonies</div>
                <div>✓ Community recognition</div>
              </div>
              <a href="/events" style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                color: '#a855f7',
                fontSize: '0.9rem',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                View Events Calendar →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY SCHEDULE - What's actually happening THIS WEEK */}
      <section id="schedule" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>This Week at Park Lane Methodist</h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            📍 Park Lane Methodist Church, Wembley · All sessions are free (except where noted)
          </p>

          {/* Day selector */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {weeklySchedule.map(day => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                style={{
                  background: activeDay === day.day 
                    ? 'linear-gradient(135deg, #fbbf24, #d97706)'
                    : 'rgba(30, 41, 59, 0.5)',
                  color: activeDay === day.day ? '#0a0a1a' : '#e2e8f0',
                  border: activeDay === day.day ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: activeDay === day.day ? 600 : 500,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Schedule display */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '1.25rem',
            padding: '2rem',
            minHeight: '220px'
          }}>
            {weeklySchedule.find(d => d.day === activeDay)?.sessions.map((session, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 100px 80px 100px',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.25rem 0',
                borderBottom: i < weeklySchedule.find(d => d.day === activeDay)!.sessions.length - 1 
                  ? '1px solid rgba(148, 163, 184, 0.1)' 
                  : 'none'
              }}>
                <div style={{
                  color: '#fbbf24',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem'
                }}>
                  {session.time}
                </div>
                <div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    marginBottom: '0.25rem'
                  }}>
                    {session.activity}
                  </div>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    Ages: {session.ages}
                  </div>
                </div>
                <div style={{
                  background: session.type === 'drop-in' 
                    ? 'rgba(74, 222, 128, 0.15)' 
                    : session.type === 'workshop'
                    ? 'rgba(14, 165, 233, 0.15)'
                    : session.type === 'event'
                    ? 'rgba(168, 85, 247, 0.15)'
                    : 'rgba(251, 146, 60, 0.15)',
                  color: session.type === 'drop-in' 
                    ? '#4ade80'
                    : session.type === 'workshop'
                    ? '#0ea5e9'
                    : session.type === 'event'
                    ? '#a855f7'
                    : '#fb923c',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textAlign: 'center'
                }}>
                  {session.type}
                </div>
                <div style={{
                  color: session.cost === 'Free' ? '#4ade80' : '#fbbf24',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textAlign: 'right'
                }}>
                  {session.cost}
                </div>
                <button style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(217, 119, 6, 0.2))',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  color: '#fbbf24',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  Join
                </button>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: '#64748b',
            fontSize: '0.9rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            First time? Just show up. No registration needed for drop-in sessions.
          </p>
        </div>
      </section>

      {/* 8 PROGRAMMES - Clear, filterable */}
      <section id="programmes" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.3), rgba(10, 10, 26, 0.8))'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>8 Ways to Learn & Earn</h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '2.5rem',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Every programme teaches real skills, connects you to real opportunities, 
            and pays you fairly for your work.
          </p>

          {/* Age filter */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            {['All ages', '13-16', '16-25', '18+', '25+'].map(age => (
              <button
                key={age}
                onClick={() => setSelectedAge(selectedAge === age ? null : age)}
                style={{
                  background: selectedAge === age 
                    ? 'rgba(251, 191, 36, 0.2)' 
                    : 'rgba(30, 41, 59, 0.5)',
                  border: `1px solid ${selectedAge === age ? '#fbbf24' : 'rgba(148, 163, 184, 0.2)'}`,
                  color: selectedAge === age ? '#fbbf24' : '#cbd5e1',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '1rem',
                  cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9rem'
                }}
              >
                {age}
              </button>
            ))}
          </div>

          {/* Programme grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {programmes.map(prog => (
              <a key={prog.id} href={prog.path} style={{
                background: `linear-gradient(135deg, ${prog.colour}08, rgba(15, 23, 42, 0.8))`,
                border: `1px solid ${prog.colour}33`,
                borderRadius: '1.25rem',
                padding: '2rem',
                textDecoration: 'none',
                display: 'block',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{prog.icon}</span>
                  <div>
                    <h3 style={{
                      color: prog.colour,
                      fontSize: '1.4rem',
                      margin: 0,
                      fontWeight: 500
                    }}>{prog.name}</h3>
                    <div style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      fontFamily: "'Outfit', sans-serif",
                      marginTop: '0.25rem'
                    }}>
                      Ages {prog.ages}
                    </div>
                  </div>
                </div>

                <p style={{
                  color: '#cbd5e1',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                  lineHeight: 1.5
                }}>
                  {prog.tagline}
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{
                      color: prog.colour,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      marginBottom: '0.25rem'
                    }}>What You Learn</div>
                    <div style={{
                      color: '#cbd5e1',
                      fontSize: '0.9rem'
                    }}>{prog.what}</div>
                  </div>

                  <div>
                    <div style={{
                      color: prog.colour,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      marginBottom: '0.25rem'
                    }}>What You Earn</div>
                    <div style={{
                      color: '#cbd5e1',
                      fontSize: '0.9rem'
                    }}>{prog.outcome}</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: `1px solid ${prog.colour}22`
                }}>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {prog.when}
                  </div>
                  <div style={{
                    color: prog.colour,
                    fontSize: '0.9rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600
                  }}>
                    Learn more →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* START HERE - Clear pathways by age */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>Not Sure Where to Start?</h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Pick your age range and we'll recommend the right first step
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Ages 10-16 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: '1.25rem',
              padding: '2.5rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>🌱</div>
              <h3 style={{
                fontSize: '1.8rem',
                color: '#4ade80',
                margin: '0 0 0.5rem',
                fontWeight: 500
              }}>Ages 10-16</h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Discover skills, build confidence, earn your first money
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>Best first programme:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    STEMgineers or PageTurners
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>When to show up:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Monday or Tuesday, 4:30pm
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#4ade80',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>What to expect:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Learn by doing. Make friends. Take work home.
                  </div>
                </div>
              </div>

              <button style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                color: '#0a0a1a',
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Start Here
              </button>
            </div>

            {/* Ages 17-25 */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              borderRadius: '1.25rem',
              padding: '2.5rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>🚀</div>
              <h3 style={{
                fontSize: '1.8rem',
                color: '#0ea5e9',
                margin: '0 0 0.5rem',
                fontWeight: 500
              }}>Ages 17-25</h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Master skills, build portfolio, earn consistent income
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{
                    color: '#0ea5e9',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>Best first programme:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Trubble n Bass or G-Tech Casters
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#0ea5e9',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>When to show up:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Monday or Wednesday, 6pm
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#0ea5e9',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>What to expect:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Professional-level training. Portfolio work. Revenue opportunities.
                  </div>
                </div>
              </div>

              <button style={{
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#ffffff',
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Start Here
              </button>
            </div>

            {/* Ages 40+ */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '1.25rem',
              padding: '2.5rem'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>👑</div>
              <h3 style={{
                fontSize: '1.8rem',
                color: '#fbbf24',
                margin: '0 0 0.5rem',
                fontWeight: 500
              }}>Ages 40+</h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Share expertise, preserve knowledge, mentor next generation
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>Best first programme:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    PageTurners or Auntie Anansi's Kitchen
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>When to show up:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Tuesday 4:30pm or Thursday 4:30pm
                  </div>
                </div>
                <div>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>What to expect:</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Your knowledge documented. Community recognition. Mentorship opportunities.
                  </div>
                </div>
              </div>

              <button style={{
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                color: '#0a0a1a',
                width: '100%',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Start Here
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TRANSPARENCY */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.3), rgba(10, 10, 26, 0.8))'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>What It Costs</h2>
          <p style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginBottom: '3rem',
            fontSize: '1.1rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            No hidden fees. No surprise charges. Here's the truth.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Free */}
            <div style={{
              background: 'rgba(74, 222, 128, 0.08)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#4ade80',
                marginBottom: '0.5rem'
              }}>FREE</div>
              <div style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>Most programmes</div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                textAlign: 'left',
                color: '#cbd5e1',
                fontSize: '0.95rem'
              }}>
                <div>✓ All workshops</div>
                <div>✓ All equipment</div>
                <div>✓ Expert instruction</div>
                <div>✓ Portfolio development</div>
                <div>✓ Broadcasting/publishing</div>
              </div>
            </div>

            {/* Small Fee */}
            <div style={{
              background: 'rgba(251, 146, 60, 0.08)',
              border: '1px solid rgba(251, 146, 60, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#fb923c',
                marginBottom: '0.5rem'
              }}>£3</div>
              <div style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>Auntie Anansi's Kitchen only</div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                textAlign: 'left',
                color: '#cbd5e1',
                fontSize: '0.95rem'
              }}>
                <div>✓ Covers ingredients</div>
                <div>✓ Covers gas/electricity</div>
                <div>✓ Take food home</div>
                <div>✓ Recipe documented forever</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                  (Waived if you can't afford it)
                </div>
              </div>
            </div>

            {/* Revenue Share */}
            <div style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '1.25rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#fbbf24',
                marginBottom: '0.5rem'
              }}>55%</div>
              <div style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                fontFamily: "'Outfit', sans-serif"
              }}>Your share when you sell</div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                textAlign: 'left',
                color: '#cbd5e1',
                fontSize: '0.95rem'
              }}>
                <div>✓ 55% to you (creator)</div>
                <div>✓ 25% to community fund</div>
                <div>✓ 20% to operations</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '0.5rem' }}>
                  Industry standard is 30% to creator.<br />
                  We give you 55%.
                </div>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            marginTop: '3rem',
            color: '#cbd5e1',
            fontSize: '1.05rem',
            maxWidth: '700px',
            margin: '3rem auto 0',
            lineHeight: 1.7
          }}>
            We're grant-independent by design. The 20% operations fee keeps the lights on. 
            The 25% community fund buys equipment and supports programmes. That's it.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS - Real people, real results */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>What People Actually Say</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                borderRadius: '1.25rem',
                padding: '2rem'
              }}>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{
                  borderTop: '1px solid rgba(148, 163, 184, 0.1)',
                  paddingTop: '1rem'
                }}>
                  <div style={{
                    color: '#fbbf24',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>{testimonial.name}</div>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    fontFamily: "'Outfit', sans-serif"
                  }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNOISSEURS CLUB - Cultural recognition layer */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, rgba(26, 10, 46, 0.3), rgba(10, 10, 26, 0.8))'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#fbbf24',
            marginBottom: '1rem'
          }}>The Connoisseurs Club</h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Cultural recognition framework celebrating your journey
          </p>

          <div style={{
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.15)',
            borderRadius: '1.5rem',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <p style={{
              color: '#cbd5e1',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '1.5rem'
            }}>
              Every programme teaches skills. The Connoisseurs Club recognizes your growth 
              through <strong style={{ color: '#fbbf24' }}>five transition stages</strong> — 
              from Seedling (ages 10-12) to Elder (community builders). 
            </p>
            <p style={{
              color: '#cbd5e1',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              marginBottom: '1.5rem'
            }}>
              Each stage has its own <strong style={{ color: '#fbbf24' }}>ceremony, dress code, 
              and community expectations</strong>. You learn formal protocols across African and 
              Caribbean traditions. You organize events. You mentor younger members. You take 
              your place as an adult in the community.
            </p>
            <p style={{
              color: '#fbbf24',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              fontStyle: 'italic',
              margin: 0,
              textAlign: 'center'
            }}>
              It's how you go from learning device repair to cutting the ribbon on your own 
              repair shop — with the cultural knowledge to carry the occasion properly.
            </p>
          </div>

          <a href="/connoisseurs-club" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(217, 119, 6, 0.2))',
            border: '1.5px solid #fbbf24',
            color: '#fbbf24',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            Explore the Five Stages →
          </a>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        textAlign: 'center',
        borderTop: '1px solid rgba(251, 191, 36, 0.1)'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#ffffff',
            marginBottom: '1rem'
          }}>Ready to Start?</h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
            fontFamily: "'Outfit', sans-serif"
          }}>
            No registration required for drop-in sessions. Just show up at Park Lane 
            Methodist Church during the times listed above.
          </p>

          <div style={{
            background: 'rgba(251, 191, 36, 0.08)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div style={{
              color: '#fbbf24',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600
            }}>Location</div>
            <div style={{ color: '#cbd5e1', fontSize: '1.05rem', marginBottom: '1rem' }}>
              Park Lane Methodist Church<br />
              Park Lane, Wembley HA9 7RY
            </div>
            <div style={{
              color: '#fbbf24',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600
            }}>Contact</div>
            <div style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>
              📧 admin@wembleywonders.org<br />
              📞 0208 902 9991
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/membership" style={{
              background: 'linear-gradient(135deg, #fbbf24, #d97706)',
              color: '#0a0a1a',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Become a Member
            </a>
            <a href="#schedule" style={{
              background: 'transparent',
              color: '#fbbf24',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              fontFamily: "'Outfit', sans-serif",
              border: '1.5px solid #fbbf24'
            }}>
              View Schedule Again
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
          Wembley Wonders CIC · Company No. 12960817<br />
          Flat 2, 452 High Road, Wembley HA9 7AY<br />
          <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            Safeguarding: All volunteers DBS-checked · Activity logs viewable by parents
          </span>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default WembleyWondersHome;