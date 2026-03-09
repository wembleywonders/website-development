import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EasyStreetPage.css';

const EasyStreetPage: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const weeks = [
    {
      number: 1,
      title: 'The World',
      subtitle: 'Where do we live?',
      description: 'We map Easy Street together. Wembley High Road, Auntie Jenny\'s Caribbean Restaurant, the barber\'s chair, the church hall, the Ace Café on a weekend morning. You bring one place that made you who you are. We build the world from those places combined.',
      output: 'A shared world document. The map of Easy Street.'
    },
    {
      number: 2,
      title: 'The People',
      subtitle: 'Who lives here?',
      description: 'Meet John and Marsha — thirty years of marriage in one kitchen. Pearl and Aubrey — separated but only meeting at Bible class. Brenda — back from Florida with Baptist fervour and the NHS on her lips like a prayer. Auntie Budgie. Bruk-up. Auntie Jenny. Then: who do you bring to the street?',
      output: 'Your character\'s first scene. One page. One true thing.'
    },
    {
      number: 3,
      title: 'The Tension',
      subtitle: 'What\'s held inside?',
      description: 'Every Easy Street scene carries something unsaid. John and Marsha\'s thirty years. Pearl\'s careful professional distance from what she knows about everyone. Aubrey\'s particular intelligence that has never found its right use. We study how drama lives in what isn\'t said as much as what is.',
      output: 'A two-person scene. The thing nobody says out loud.'
    },
    {
      number: 4,
      title: 'The Vernacular',
      subtitle: 'How do we actually speak?',
      description: 'The Caribbean British vernacular is not a stylistic choice — it\'s the politics. "H-ugly." "Tank yu." "He give you a lick." We study what Jamal Ali built at RAPP in 1972: the spoken word as the primary political instrument. Your character\'s voice is your cultural fingerprint.',
      output: 'A monologue in your character\'s specific voice. Recorded.'
    },
    {
      number: 5,
      title: 'The Ensemble',
      subtitle: 'How do we collide?',
      description: 'Easy Street scenes happen when worlds that usually stay separate are forced together. Bible class. Auntie Jenny\'s on a Saturday. The coach trip to the countryside. We write the collision scenes — where Pearl\'s discretion meets Brenda\'s fervour, where Winston Jr watches the adult world and begins to understand it.',
      output: 'A group scene. Three characters. One location. One collision.'
    },
    {
      number: 6,
      title: 'The Broadcast',
      subtitle: 'It goes out.',
      description: 'Your scene is produced and broadcast on Rayd-yo. Your name is in the credits. The attribution footer carries the lineage: written in the tradition of RAPP, the Radical Alliance of Poets and Players, Brixton 1972. You have a produced piece of radio drama with your name on it. That exists now. Nobody can take it away.',
      output: 'Broadcast episode. Full attribution. Your name on the archive.'
    }
  ];

  const characters = [
    {
      name: 'John & Marsha',
      years: '30 years married',
      detail: 'Something small goes wrong every morning. The drama is in what thirty years looks like from the inside.',
      colour: '#c084fc'
    },
    {
      name: 'Pearl & Aubrey',
      years: 'Separated. Sort of.',
      detail: 'Pearl put Aubrey out years ago. They only meet at Bible class. The whole church knows.',
      colour: '#f59e0b'
    },
    {
      name: 'Brenda',
      years: '30 years in Florida',
      detail: 'Back. Baptist. Reorganising the choir. The NHS moved her to tears and she\'s told everyone forty-seven times.',
      colour: '#10b981'
    },
    {
      name: 'Auntie Budgie',
      years: 'The institution',
      detail: 'Loud. Never to her face. Six month advance deposit on the Christmas cake. Her younger sister is Brenda.',
      colour: '#ef4444'
    },
    {
      name: 'Bruk-up',
      years: 'Nine years old',
      detail: 'Box of spare parts under the bed. Fixes everything. Asks for a screwdriver set every birthday — always just around the corner.',
      colour: '#06b6d4'
    },
    {
      name: 'Auntie Jenny',
      years: 'The Elder',
      detail: 'Runs the Caribbean restaurant in the Wembley Triangle. Has a story she hasn\'t told yet.',
      colour: '#f97316'
    }
  ];

  return (
    <div className="easy-street-page">

      {/* ── HERO ── */}
      <section className="es-hero">
        <div className="es-hero__grain" />
        <div className="es-hero__static-lines" />
        <div className="es-hero__content">
          <div className="es-hero__badge-row">
            <span className="es-badge es-badge--radio">📻 Rayd-yo</span>
            <span className="es-badge es-badge--programme">G-Tech Casters × Pageturners</span>
          </div>
          <h1 className="es-hero__title">
            <span className="es-hero__title-main">Easy Street</span>
            <span className="es-hero__title-sub">A Community Radio Drama</span>
          </h1>
          <p className="es-hero__strapline">
            John and Marsha. Pearl and Aubrey. Brenda back from Florida.
            Auntie Budgie. Bruk-up under the table fixing everything.
            <em> Stories from the Caribbean British world — written by the community it belongs to.</em>
          </p>
          <div className="es-hero__lineage">
            Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton 1972.
            With acknowledgment to <strong>Jamal Ali</strong>, originator.
          </div>
          <div className="es-hero__cta-row">
            <a href="#sandbox" className="es-btn es-btn--primary">Read the Sandbox Scene</a>
            <a href="#join" className="es-btn es-btn--ghost">Join the Writing Room</a>
          </div>
        </div>
        <div className="es-hero__scroll-signal">
          <span>scroll</span>
          <div className="es-hero__scroll-line" />
        </div>
      </section>

      {/* ── WHAT EASY STREET IS ── */}
      <section className="es-section es-what">
        <div className="es-section__inner">
          <div className="es-what__text">
            <h2 className="es-section__heading">What Easy Street Is</h2>
            <p>
              Easy Street is a serialised radio drama for Rayd-yo — the Wembley Wonders community 
              broadcast platform. It is the Caribbean British equivalent of what Coronation Street 
              was for working-class Northern England: ordinary people in extraordinary circumstances, 
              the drama living inside what is held and what is said and what is never quite said.
            </p>
            <p>
              No drugs. No crime. No prison. No stereotype. The lives the British sitcom 
              forgot to keep making room for — until now.
            </p>
            <p>
              Easy Street is written by its community. Every episode is contributed by a Wembley 
              Wonders member. Every contributor is credited, compensated, and archived. The world 
              belongs to the community that builds it.
            </p>
          </div>
          <div className="es-what__quote-block">
            <blockquote className="es-pull-quote">
              "We encourage all the members of the company to write, direct, look at the lights — 
              so it was a theatre company that was very inclusive and we had everything, you know."
              <cite>— Jamal Ali, Black Theatre of Brixton, 1975</cite>
            </blockquote>
            <p className="es-what__quote-note">
              That methodology is this methodology. Fifty years later. Wembley, not Brixton. 
              Rayd-yo, not a theatre building. The same principle: everyone contributes, 
              everyone is credited, the world belongs to the people who build it.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHARACTERS ── */}
      <section className="es-section es-characters">
        <div className="es-section__inner">
          <h2 className="es-section__heading">The People of Easy Street</h2>
          <p className="es-section__intro">
            These characters belong to the world. You write their next scene.
          </p>
          <div className="es-characters__grid">
            {characters.map((char) => (
              <div
                key={char.name}
                className="es-char-card"
                style={{ '--char-colour': char.colour } as React.CSSProperties}
              >
                <div className="es-char-card__accent" />
                <div className="es-char-card__body">
                  <h3 className="es-char-card__name">{char.name}</h3>
                  <span className="es-char-card__years">{char.years}</span>
                  <p className="es-char-card__detail">{char.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="es-characters__plus">
            + Winston Jr searching for Carlton Tingling. + Don and the mobility bus.
            + The one auntie who can't sing but decorates a cake <em>just so</em>.
            + Your character, when you join the writing room.
          </p>
        </div>
      </section>

      {/* ── SANDBOX ── */}
      <section className="es-section es-sandbox" id="sandbox">
        <div className="es-section__inner">
          <div className="es-sandbox__label">The Sandbox</div>
          <h2 className="es-section__heading">Read It First. Then Write Yours.</h2>
          <p className="es-section__intro">
            The sandbox is a published example of what an Easy Street scene looks like. 
            Read it. Hear it. Then write the next scene — your scene, your characters, 
            your family's specific truth inside this world.
          </p>

          <div className="es-sandbox__scene">
            <div className="es-sandbox__scene-header">
              <span className="es-sandbox__scene-label">Easy Street — Scene 1.01</span>
              <span className="es-sandbox__scene-title">H-Ugly</span>
              <span className="es-sandbox__scene-meta">John & Marsha's Kitchen. Sunday Morning. Early.</span>
            </div>
            <div className="es-sandbox__scene-body">
              <div className="es-sandbox__direction">
                Sound: A kitchen. The low hiss of a gas ring. A radio — old gospel, 
                turned low. The particular silence of a Sunday morning that has been 
                Sunday morning in this house for thirty years.
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">John. John. The eggs finish.</span>
              </div>

              <div className="es-sandbox__direction">Silence.</div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  I said the eggs finish. You hear me say the eggs finish?
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">
                  <em>(from somewhere else in the house)</em> I hear you.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">And?</span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">And what?</span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  And you was going to the shop yesterday. I ask you 
                  specifically. Get eggs. You write it down?
                </span>
              </div>

              <div className="es-sandbox__direction">
                Sound: footsteps. John enters. He is dressed — not for church yet, 
                but better than staying-in clothes. This is noted.
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">Where you going dressed like that?</span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  <em>(beat)</em> Me? You the one in your good shirt on a Sunday morning 
                  when the eggs finish.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">I'm just—</span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  Thirty years, John. Thirty years I know every shirt in that 
                  wardrobe. That is not your staying-in shirt.
                </span>
              </div>

              <div className="es-sandbox__direction">Silence. The radio fills it.</div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">
                  I'm going out. I'll get eggs.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  Out where?
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">
                  Just — out. For some air.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  In your good shirt.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">
                  <em>(quietly, the patience finally)</em> Marsha.
                </span>
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  What.
                </span>
              </div>

              <div className="es-sandbox__direction">
                A long beat. Thirty years in it.
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">JOHN</span>
                <span className="es-sandbox__speech">
                  <em>(on his way to the door)</em> 
                  You know what your problem is? You h-ugly in the morning.
                </span>
              </div>

              <div className="es-sandbox__direction">
                Sound: the front door. Not slammed. Closed. Which is worse.
                The radio continues. Old gospel. The gas ring still hissing 
                under nothing.
                Marsha stands in the kitchen.
                A beat. Two beats.
                She picks up the phone.
              </div>

              <div className="es-sandbox__line">
                <span className="es-sandbox__char">MARSHA</span>
                <span className="es-sandbox__speech">
                  Pearl. <em>(pause)</em> He gone out in his good shirt, Pearl.
                </span>
              </div>

              <div className="es-sandbox__direction">
                End of Scene 1.01.
              </div>
            </div>

            <div className="es-sandbox__scene-footer">
              <div className="es-sandbox__attribution">
                Easy Street is a Wembley Wonders CIC production. Written in the tradition 
                of RAPP — Radical Alliance of Poets and Players, Brixton, founded 1972. 
                With acknowledgment to <strong>Jamal Ali</strong>, originator.
                Community IP model: world © Wembley Wonders CIC. 
                Episode contributions attributed to their authors.
              </div>
            </div>
          </div>

          <div className="es-sandbox__invitation">
            <h3>Now Write Yours</h3>
            <p>
              What happens next? Does Pearl answer? What does she know that 
              Marsha doesn't? What does Auntie Budgie say when she finds out?
            </p>
            <p>
              Or bring your own characters into the world. Your grandmother's 
              kitchen. Your uncle who always dressed too well for wherever he 
              was going. The scene your family has been performing for thirty 
              years without a script.
            </p>
            <p>
              Write it. Bring it to the workshop. It will be produced, 
              broadcast, and archived with your name on it.
            </p>
            <a href="#join" className="es-btn es-btn--primary">
              Join the Writing Room
            </a>
          </div>
        </div>
      </section>

      {/* ── THE SIX WEEKS ── */}
      <section className="es-section es-weeks" id="programme">
        <div className="es-section__inner">
          <h2 className="es-section__heading">The Six Weeks</h2>
          <p className="es-section__intro">
            Zoom. Tuesday evenings. 7–8:30pm. Six sessions that build one broadcast episode — yours.
          </p>
          <div className="es-weeks__list">
            {weeks.map((week) => (
              <div
                key={week.number}
                className={`es-week ${activeWeek === week.number ? 'es-week--open' : ''}`}
                onClick={() => setActiveWeek(activeWeek === week.number ? null : week.number)}
              >
                <div className="es-week__header">
                  <span className="es-week__number">Week {week.number}</span>
                  <div className="es-week__titles">
                    <span className="es-week__title">{week.title}</span>
                    <span className="es-week__subtitle">{week.subtitle}</span>
                  </div>
                  <span className="es-week__toggle">{activeWeek === week.number ? '−' : '+'}</span>
                </div>
                {activeWeek === week.number && (
                  <div className="es-week__body">
                    <p>{week.description}</p>
                    <div className="es-week__output">
                      <span className="es-week__output-label">You leave with:</span>
                      <span>{week.output}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY IP MODEL ── */}
      <section className="es-section es-ip">
        <div className="es-section__inner">
          <h2 className="es-section__heading">How Ownership Works</h2>
          <p className="es-section__intro">
            Easy Street is a community-owned production. Here is exactly how that works.
          </p>
          <div className="es-ip__grid">
            <div className="es-ip__card es-ip__card--world">
              <div className="es-ip__card-icon">🌍</div>
              <h3>The World</h3>
              <p>
                Easy Street's world — the characters, the setting, the established 
                universe — belongs to Wembley Wonders CIC. It is the community's 
                asset. It cannot be sold, licensed away, or extracted.
              </p>
            </div>
            <div className="es-ip__card es-ip__card--episode">
              <div className="es-ip__card-icon">✍🏾</div>
              <h3>Your Episode</h3>
              <p>
                Every scene or episode you contribute is yours. Your name is on it. 
                You are compensated under our 55/25/20 model. You license Wembley 
                Wonders CIC to broadcast and archive it — you don't give it away.
              </p>
            </div>
            <div className="es-ip__card es-ip__card--lineage">
              <div className="es-ip__card-icon">🌱</div>
              <h3>The Lineage</h3>
              <p>
                Every Easy Street production carries the RAPP attribution. 
                Jamal Ali receives a Cultural Heritage contribution monthly — 
                not when we put on a show, but now, because the debt is now.
              </p>
            </div>
            <div className="es-ip__card es-ip__card--archive">
              <div className="es-ip__card-icon">📚</div>
              <h3>The Archive</h3>
              <p>
                Every episode is permanently archived with full attribution. 
                Ten years from now, fifty years from now, your name and your 
                contribution are findable, citable, real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="es-section es-for">
        <div className="es-section__inner">
          <h2 className="es-section__heading">Who This Is For</h2>
          <div className="es-for__grid">
            <div className="es-for__item">
              <h3>The person who has always had a story</h3>
              <p>
                The family scene that plays in your head. The character 
                who is clearly your uncle but you've never written him down. 
                This is where that goes.
              </p>
            </div>
            <div className="es-for__item">
              <h3>The person who wants to work in audio</h3>
              <p>
                Radio drama. Podcast. Production. A broadcast credit on 
                a real production is the thing that opens the next door. 
                We help you get it.
              </p>
            </div>
            <div className="es-for__item">
              <h3>The person who wants to perform</h3>
              <p>
                Easy Street needs voices as much as writers. 
                Your character needs your voice. Recorded, produced, broadcast.
              </p>
            </div>
            <div className="es-for__item">
              <h3>The person who isn't sure yet</h3>
              <p>
                Read the sandbox scene. If something in it felt like recognition —
                like you knew that kitchen, like you've heard that silence — 
                you're in the right place.
              </p>
            </div>
          </div>
          <div className="es-for__note">
            <strong>Age range:</strong> 16–60+. Wembley and the wider diaspora. 
            All backgrounds. No previous writing or production experience required. 
            If the sandbox scene felt true to you, that's the only qualification that matters.
          </div>
        </div>
      </section>

      {/* ── JOIN ── */}
      <section className="es-section es-join" id="join">
        <div className="es-section__inner">
          <h2 className="es-section__heading">Join the Writing Room</h2>
          <p className="es-section__intro">
            No formal application. Tell us what brings you here.
          </p>
          <div className="es-join__options">
            <div className="es-join__primary">
              <h3>Write to us</h3>
              <p>
                Email{' '}
                <a href="mailto:workshops@wembleywonders.org">
                  workshops@wembleywonders.org
                </a>{' '}
                with your name and a few sentences about what drew you here. 
                You can quote the sandbox scene if something in it landed.
              </p>
              <div className="es-join__deadline">
                <span className="es-join__deadline-label">Next cohort opens</span>
                <span className="es-join__deadline-date">[Date TBC — register interest now]</span>
              </div>
            </div>
            <div className="es-join__secondary">
              <h3>Come first</h3>
              <p>
                Not ready to commit to six weeks? Come to a Coffee Morning first. 
                Hear about the world. Meet people who are already writing in it. 
                Decide from there.
              </p>
              <Link to="/programmes/coffee-morning" className="es-btn es-btn--outline">
                Coffee Mornings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONNECTED PROGRAMMES ── */}
      <section className="es-section es-connected">
        <div className="es-section__inner">
          <h2 className="es-section__heading">Where This Leads</h2>
          <div className="es-connected__grid">
            {[
              {
                to: '/programmes/gtechcasters',
                name: 'G-Tech Casters',
                desc: 'Produce your Easy Street episode. Audio engineering, mixing, broadcast.',
                icon: '🎙️'
              },
              {
                to: '/programmes/pageturners',
                name: 'Pageturners',
                desc: 'The written archive. Your script documented, published, attributed.',
                icon: '📖'
              },
              {
                to: '/programmes/kaywanas-court',
                name: "Kaywana's Court",
                desc: 'Nominate the invisible contributors. Advocate for the overlooked.',
                icon: '⚖️'
              },
              {
                to: '/raydyo',
                name: 'Rayd-yo',
                desc: 'Community radio. Where Easy Street airs. Where you are heard.',
                icon: '📻'
              }
            ].map((prog) => (
              <Link key={prog.name} to={prog.to} className="es-connected__card">
                <span className="es-connected__icon">{prog.icon}</span>
                <h3>{prog.name}</h3>
                <p>{prog.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="es-footer-cta">
        <div className="es-footer-cta__grain" />
        <div className="es-footer-cta__inner">
          <p className="es-footer-cta__lineage">
            Easy Street is a Wembley Wonders CIC production.
            Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton, 1972.
            With acknowledgment to <strong>Jamal Ali</strong>, originator.
          </p>
          <p className="es-footer-cta__mission">
            We are a Community Interest Company building skills, platforms and archives 
            for the Forgotten 60% in Wembley. The world belongs to the community that builds it.
          </p>
          <Link to="/membership" className="es-btn es-btn--primary">
            Learn About Membership
          </Link>
        </div>
      </section>

    </div>
  );
};

export default EasyStreetPage;
