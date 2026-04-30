/**
 * PageturnersPage.tsx
 * Wembley Wonders CIC · Pageturners Writer's Workshop
 * ─────────────────────────────────────────────────────
 * Rebuilt around the page-turner-as-craft philosophy:
 * Eight techniques. Three tiers. One pipeline.
 *
 * Archive → Programme → Publication
 *
 * The page itself is engineered as a page-turner:
 * every section ends with a hook or an unanswered question.
 * ─────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import FastTrackWidget from '../../../components/shared/FastTrackWidget';
import styles from './PageturnersPage.module.css';

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────

const EIGHT_TECHNIQUES = [
  {
    number: '01',
    name: 'Narrative Momentum',
    signal: 'Something always changes.',
    craft: 'Every scene answers a question and opens a new one. If nothing changes, cut the scene.',
    inTheArchive: 'Jonathan Strong\'s profile: from baptism to beating to Lord Mayor\'s court — each beat changes everything.',
    joystickOutput: 'Long-read article where every paragraph earns the next',
  },
  {
    number: '02',
    name: 'Strategic Questions',
    signal: 'The curiosity loop never closes.',
    craft: 'Plant a mystery. Answer it. Plant a bigger one. Readers turn pages to resolve what you\'ve made unresolvable.',
    inTheArchive: 'George Padmore: who organised African independence from a North London flat — and why doesn\'t Britain know?',
    joystickOutput: 'Opinion piece that opens a question it refuses to fully answer',
  },
  {
    number: '03',
    name: 'High Stakes',
    signal: 'The cost of failure keeps rising.',
    craft: 'Stakes aren\'t just survival — they\'re identity, reputation, moral choice. What does your character stand to lose?',
    inTheArchive: 'Jack Gladstone: freedom, family, community, life — all on the line before dawn on 18 August 1823.',
    joystickOutput: 'Personal essay where what was actually at risk is named precisely',
  },
  {
    number: '04',
    name: 'Tension-Driven Scenes',
    signal: 'Want. Obstacle. Complication. Tension.',
    craft: 'Your character wants something. The scene gives them obstacles. It ends worse or differently than it started.',
    inTheArchive: 'Ira Aldridge: wants to play Othello at Covent Garden. Gets two nights. Run cancelled. Europe waits.',
    joystickOutput: 'Flash fiction or character piece — one scene, complete world',
  },
  {
    number: '05',
    name: 'End-of-Chapter Hooks',
    signal: 'Never land neatly.',
    craft: 'End on a revelation, a threat, a decision, or a question. Give readers no clean exit.',
    inTheArchive: 'Coleridge-Taylor sold his rights for a flat fee. The Royal Albert Hall performed his work every year for decades. He saw almost none of it.',
    joystickOutput: 'Serialised content — Joystick runs in issues. End each instalment hungry.',
  },
  {
    number: '06',
    name: 'Controlled Pacing',
    signal: 'Rhythm is invisible until it breaks.',
    craft: 'Short sentences accelerate. Long ones breathe. Dialogue moves faster than description. You control the reader\'s heartbeat.',
    inTheArchive: 'Jean Binta Breeze performed her poems before she published them — she knew pacing as a physical experience.',
    joystickOutput: 'Interview — when to let the subject breathe, when to cut',
  },
  {
    number: '07',
    name: 'Emotional Investment',
    signal: 'Care precedes suspense.',
    craft: 'Before you put a character in danger, make the reader love them. Understand what they want. Fear what they fear.',
    inTheArchive: 'Felicity Ethnic\'s Pearlene: you know her completely in thirty seconds — and then you\'re hers.',
    joystickOutput: 'Profile — making the reader care about a real person',
  },
  {
    number: '08',
    name: 'Information Control',
    signal: 'What the reader knows, and when, is your power.',
    craft: 'Withhold strategically. Use dramatic irony. Let a twist reframe everything that came before.',
    inTheArchive: 'Every Knowledge Commons profile: the gap is withheld until the reader has already invested. Then it lands.',
    joystickOutput: 'Investigative piece — what you reveal and when is the argument',
  },
];

const DIASPORA_FORMULAS = [
  { icon: '🔍', title: 'The Family Secret', hook: 'A descendant discovers what the migration story was hiding.' },
  { icon: '🛫', title: 'The Return', hook: 'Go back. Find out the homeland was misrepresented.' },
  { icon: '⏳', title: 'Two Timelines', hook: 'Past and present converge. The secret costs someone everything.' },
  { icon: '🎭', title: 'The Double Life', hook: 'One identity known. One hidden. Exposure is the engine.' },
  { icon: '🏘️', title: 'The Community Microcosm', hook: 'One disruptive event tears open decades of silence.' },
];

const ARCHETYPES = [
  { name: 'The Bridge', question: 'How can two cultures coexist?', note: 'The cultural translator. Often the narrator.' },
  { name: 'The Keeper', question: 'What must be remembered?', note: 'Guards history. Delays revealing it. Drives mystery.' },
  { name: 'The Assimilator', question: 'What must be left behind?', note: 'Changed their name. The past resurfaces.' },
  { name: 'The Exile', question: 'What was lost?', note: 'Didn\'t leave voluntarily. Carries unfinished business.' },
  { name: 'The Returner', question: 'What is the truth about the past?', note: 'Investigator. Insider and outsider at once.' },
  { name: 'The Gatekeeper', question: 'What must be protected?', note: 'Blocks truth. Defends reputation. Often sympathetic.' },
  { name: 'The Hybrid', question: 'What new identity can emerge?', note: 'That\'s you. That\'s your readers. That\'s the point.' },
];

const PIPELINE_STEPS = [
  {
    number: '01',
    phase: 'Read',
    title: 'The Archive is your research library',
    description: 'Every Knowledge Commons profile is engineered as a page-turner. Read them as a writer reads — notice the technique, not just the content. Where is the hook? When does the gap land?',
    link: '/heritage',
    linkLabel: 'Enter the Knowledge Commons →',
    technique: 'Technique 07: Emotional Investment',
  },
  {
    number: '02',
    phase: 'Learn',
    title: 'Eight techniques. One principle.',
    description: 'The Sandbox teaches each technique through diaspora stories you already own. You\'re not learning from someone else\'s material — you\'re learning from yours.',
    link: '/programmes/pageturners/sandbox',
    linkLabel: 'Open the Sandbox →',
    technique: 'Technique 08: Information Control',
  },
  {
    number: '03',
    phase: 'Write',
    title: 'The story that isn\'t written yet',
    description: 'Every diaspora community contains untold page-turners. The 6-step method: Historical shock → one family → plant the secret → jump a generation → interweave timelines → reveal the cost.',
    link: '/programmes/pageturners/sandbox?activity=diaspora-narratives',
    linkLabel: 'Start your story →',
    technique: 'Techniques 01–06: All of them at once',
  },
  {
    number: '04',
    phase: 'Publish',
    title: 'Joystick is the destination, not the reward',
    description: 'You are already a contributor. The question is whether your work is engineered to be read. Eight techniques. One submission. 55% revenue share.',
    link: '/programmes/joystick',
    linkLabel: 'Submit to Joystick →',
    technique: 'Technique 05: End-of-Chapter Hooks',
  },
];

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

const PageturnersPage: React.FC = () => {
  const [activeTechnique, setActiveTechnique] = useState<number | null>(null);
  const [activeArchetype, setActiveArchetype] = useState<number | null>(null);

  return (
    <PageTemplate
      pageTitle="Pageturners"
      pageStrapline="The craft of making people read to the end."
      pageGuide="Pageturners teaches the eight techniques that engineer compulsive reading — and applies them to the stories the mainstream record missed. Archive → Programme → Publication."
      showMaya={true}
      pageType="programme"
    >
      <div className={styles.pt}>

        {/* ── HOOK ─────────────────────────────────────── */}
        <section className={styles.pt__hook}>
          <div className={styles.pt__hook__inner}>
            <p className={styles.pt__hook__pull}>
              "You can't sell what people won't read."
            </p>
            <p className={styles.pt__hook__body}>
              A page-turner isn't just an exciting story. It's a story{' '}
              <em>engineered</em> so the reader feels a physical urge to
              keep reading. The effect comes from deliberate craft choices.
              Eight of them. You can learn all eight. And when you apply
              them to diaspora stories — stories built on migration,
              displacement, secrets across generations, and the cost of
              survival — you get something the publishing industry has been
              waiting decades to find.
            </p>
            <p className={styles.pt__hook__question}>
              What story do you know that hasn't been written yet?
            </p>
            <div className={styles.pt__hook__ctas}>
              <Link to="/programmes/pageturners/sandbox" className={styles.pt__cta__primary}>
                Enter the Sandbox →
              </Link>
              <Link to="/heritage" className={styles.pt__cta__secondary}>
                Browse the Archive →
              </Link>
            </div>
          </div>
        </section>

        {/* ── I WRITE WHAT I LIKE ──────────────────────── */}
        <section className={styles.pt__iwtl}>
          <div className={styles.pt__iwtl__inner}>
            <div className={styles.pt__iwtl__left}>
              <span className={styles.pt__label}>Before the craft begins</span>
              <h2 className={styles.pt__iwtl__title}>
                I Write What I Like
              </h2>
              <p className={styles.pt__iwtl__biko}>
                Steve Biko wrote his column under the name Frank Talk.
                "I write what I like" was a declaration of intellectual
                sovereignty against a system that decided what Black people
                were permitted to say, think, and claim.
              </p>
              <p>
                Before the eight techniques. Before structure and
                engineering and editorial craft. Two things that cannot
                be taught through a framework because they are the source
                material that technique serves.
              </p>
              <p>
                The techniques are the vehicle.
                This is the payload.
              </p>
              <Link
                to="/programmes/pageturners/sandbox?activity=diaspora-narratives"
                className={styles.pt__cta__primary}
              >
                Start here →
              </Link>
            </div>

            <div className={styles.pt__iwtl__right}>
              <div className={styles.pt__iwtl__card}>
                <div className={styles.pt__iwtl__card__header}>
                  <span className={styles.pt__iwtl__letter}>A</span>
                  <div>
                    <strong className={styles.pt__iwtl__card__title}>
                      Emotional Truth
                    </strong>
                    <p className={styles.pt__iwtl__card__signal}>
                      The accuracy of what you feel.
                    </p>
                  </div>
                </div>
                <p className={styles.pt__iwtl__card__body}>
                  The difference between emotion that is asserted
                  and emotion that is earned. The permission to feel
                  accurately. Why diaspora writing often hedges its
                  own pain — and what the writing looks like when
                  it stops.
                </p>
                <p className={styles.pt__iwtl__card__biko}>
                  "She felt a wave of grief" is asserted.
                  "She put the photograph face-down" is earned.
                  One tells the reader what to feel.
                  The other trusts them to feel it.
                </p>
              </div>

              <div className={styles.pt__iwtl__card}>
                <div className={styles.pt__iwtl__card__header}>
                  <span className={styles.pt__iwtl__letter}>B</span>
                  <div>
                    <strong className={styles.pt__iwtl__card__title}>
                      Specificity of Observation
                    </strong>
                    <p className={styles.pt__iwtl__card__signal}>
                      The accuracy of what you see.
                    </p>
                  </div>
                </div>
                <p className={styles.pt__iwtl__card__body}>
                  The selected detail versus the accumulated detail.
                  The difference between a setting and a world.
                  Why generic writing is a form of lying — and how
                  specificity is the political act that makes
                  diaspora stories undeniable.
                </p>
                <p className={styles.pt__iwtl__card__biko}>
                  "A street in Wembley" is a lie.
                  "452 High Road at seven in the morning when
                  the shutters are still down on the chicken shop"
                  is true.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE EIGHT TECHNIQUES ─────────────────────── */}
        <section className={styles.pt__techniques}>
          <div className={styles.pt__section__header}>
            <span className={styles.pt__label}>The Curriculum</span>
            <h2 className={styles.pt__section__title}>Eight Techniques</h2>
            <p className={styles.pt__section__sub}>
              Each technique is taught through a Knowledge Commons profile.
              Each produces a Joystick contribution type.
              Select any technique to see how it works in practice.
            </p>
          </div>

          <div className={styles.pt__techniques__grid}>
            {EIGHT_TECHNIQUES.map((t, i) => (
              <button
                key={t.number}
                className={`${styles.pt__technique__card}${activeTechnique === i ? ` ${styles['pt__technique__card--active']}` : ''}`}
                onClick={() => setActiveTechnique(activeTechnique === i ? null : i)}
              >
                <div className={styles.pt__technique__top}>
                  <span className={styles.pt__technique__number}>{t.number}</span>
                  <span className={styles.pt__technique__name}>{t.name}</span>
                </div>
                <p className={styles.pt__technique__signal}>"{t.signal}"</p>

                {activeTechnique === i && (
                  <div className={styles.pt__technique__expanded}>
                    <p className={styles.pt__technique__craft}>{t.craft}</p>
                    <div className={styles.pt__technique__archive}>
                      <span className={styles.pt__technique__archive__label}>In the archive</span>
                      <p>{t.inTheArchive}</p>
                    </div>
                    <div className={styles.pt__technique__output}>
                      <span className={styles.pt__technique__output__label}>Joystick output</span>
                      <p>{t.joystickOutput}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className={styles.pt__techniques__hook}>
            The eighth technique — information control — is the one that
            connects most directly to the Knowledge Commons.
            Every profile in the archive is engineered around it.
            Read one before you write one.
          </p>
        </section>

        {/* ── THE PIPELINE ─────────────────────────────── */}
        <section className={styles.pt__pipeline}>
          <div className={styles.pt__section__header}>
            <span className={styles.pt__label}>The Structure</span>
            <h2 className={styles.pt__section__title}>Archive → Programme → Publication</h2>
            <p className={styles.pt__section__sub}>
              Three tiers. Each feeds the next. Each feeds back.
            </p>
          </div>

          <div className={styles.pt__pipeline__steps}>
            {PIPELINE_STEPS.map((step) => (
              <div key={step.number} className={styles.pt__pipeline__step}>
                <div className={styles.pt__pipeline__step__left}>
                  <span className={styles.pt__pipeline__number}>{step.number}</span>
                  <span className={styles.pt__pipeline__phase}>{step.phase}</span>
                </div>
                <div className={styles.pt__pipeline__step__right}>
                  <h3 className={styles.pt__pipeline__title}>{step.title}</h3>
                  <p className={styles.pt__pipeline__desc}>{step.description}</p>
                  <div className={styles.pt__pipeline__footer}>
                    <span className={styles.pt__pipeline__technique}>{step.technique}</span>
                    <Link to={step.link} className={styles.pt__pipeline__link}>
                      {step.linkLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAST TRACK ───────────────────────────────────────
            Positioned between the pipeline and the diaspora material.
            Answers the question the pipeline raises:
            "but how long does it take?"
            The Fast Track answer: fourteen days.
            Not a simplified pathway — a different form.
        ─────────────────────────────────────────────────────── */}
        <section className={styles.pt__fasttrack__section}>
          <div className={styles.pt__fasttrack__intro}>
            <span className={styles.pt__label}>Another way in</span>
            <h2 className={styles.pt__section__title}>
              Don't wait for the full pathway.
            </h2>
            <p className={styles.pt__section__sub}>
              The Fast Track is a fourteen-day production cycle for
              first-response content. Call and response culture meeting
              craftsmanship. Seed to broadcast in two weeks.
              Not a simplified version — a different form entirely.
            </p>
          </div>
          <FastTrackWidget mode="banner" programmeName="Pageturners" />
        </section>

        {/* ── DIASPORA AS RAW MATERIAL ──────────────────── */}
        <section className={styles.pt__diaspora}>
          <div className={styles.pt__section__header}>
            <span className={styles.pt__label}>The Material</span>
            <h2 className={styles.pt__section__title}>
              Diaspora stories already contain everything a page-turner needs.
            </h2>
            <p className={styles.pt__section__sub}>
              Displacement. Secrets across generations. Identity under pressure.
              The cost of survival. Migration forces narrative —
              the question is whether it's been written yet.
            </p>
          </div>

          <div className={styles.pt__diaspora__body}>
            <div className={styles.pt__diaspora__formulas}>
              <h3 className={styles.pt__diaspora__h3}>Five formulas publishers buy</h3>
              <div className={styles.pt__formulas__list}>
                {DIASPORA_FORMULAS.map((f) => (
                  <div key={f.title} className={styles.pt__formula}>
                    <span className={styles.pt__formula__icon}>{f.icon}</span>
                    <div>
                      <strong className={styles.pt__formula__title}>{f.title}</strong>
                      <p className={styles.pt__formula__hook}>{f.hook}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.pt__diaspora__method}>
              <h3 className={styles.pt__diaspora__h3}>The 6-step method</h3>
              <ol className={styles.pt__method__list}>
                <li>Start with the historical shock — who was forced to move?</li>
                <li>Choose one family at the centre</li>
                <li>Plant a secret in the migration story</li>
                <li>Jump to the next generation — what do they discover?</li>
                <li>Interweave past and present</li>
                <li>Reveal the cost of the secret</li>
              </ol>
              <p className={styles.pt__method__formula}>
                Historical crisis + family secret + modern investigation
                = diaspora page-turner
              </p>
              <Link
                to="/programmes/pageturners/sandbox?activity=diaspora-narratives"
                className={styles.pt__cta__primary}
              >
                Apply the method now →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CHARACTER ARCHETYPES ─────────────────────── */}
        <section className={styles.pt__archetypes}>
          <div className={styles.pt__section__header}>
            <span className={styles.pt__label}>Character</span>
            <h2 className={styles.pt__section__title}>Seven archetypes. One triangle.</h2>
            <p className={styles.pt__section__sub}>
              The strongest diaspora page-turners centre on three of these
              in collision: the Returner (seeking truth), the Keeper
              (guarding the past), the Gatekeeper (protecting the community).
              That triangle almost automatically generates secrets, tension,
              and revelation.
            </p>
          </div>

          <div className={styles.pt__archetypes__grid}>
            {ARCHETYPES.map((a, i) => (
              <button
                key={a.name}
                className={`${styles.pt__archetype}${activeArchetype === i ? ` ${styles['pt__archetype--active']}` : ''}`}
                onClick={() => setActiveArchetype(activeArchetype === i ? null : i)}
              >
                <strong className={styles.pt__archetype__name}>{a.name}</strong>
                <em className={styles.pt__archetype__question}>{a.question}</em>
                {activeArchetype === i && (
                  <p className={styles.pt__archetype__note}>{a.note}</p>
                )}
              </button>
            ))}
          </div>

          <p className={styles.pt__archetypes__hook}>
            Which one are you? Which one is the person you're writing about?
            The answer is usually more complicated than you expect.
          </p>
        </section>

        {/* ── JOYSTICK CONNECTION ───────────────────────── */}
        <section className={styles.pt__joystick}>
          <div className={styles.pt__joystick__inner}>
            <div className={styles.pt__joystick__left}>
              <span className={styles.pt__label}>The Destination</span>
              <h2 className={styles.pt__joystick__title}>
                Joystick publishes what Pageturners produces.
              </h2>
              <p>
                You're not writing for a workshop portfolio. You're writing
                for an audience. Joystick is the platform's e-zine — real
                editorial standards, real readers, 55% revenue share on
                published work.
              </p>
              <p>
                Each of the eight techniques maps to a Joystick contribution
                type. By the time you've worked through the curriculum,
                you have eight potential submissions. The question is which
                one you finish first.
              </p>
              <Link to="/programmes/joystick" className={styles.pt__cta__primary}>
                See what Joystick publishes →
              </Link>
            </div>
            <div className={styles.pt__joystick__right}>
              <div className={styles.pt__joystick__table}>
                <div className={styles.pt__joystick__table__header}>
                  <span>Technique</span>
                  <span>Joystick Format</span>
                </div>
                {EIGHT_TECHNIQUES.map((t) => (
                  <div key={t.number} className={styles.pt__joystick__row}>
                    <span className={styles.pt__joystick__tech}>{t.name}</span>
                    <span className={styles.pt__joystick__format}>{t.joystickOutput}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT THIS IS NOT ─────────────────────────── */}
        <section className={styles.pt__notliteracy}>
          <div className={styles.pt__notliteracy__inner}>
            <h2 className={styles.pt__notliteracy__title}>
              This is not a literacy programme.
            </h2>
            <p>
              Most writing programmes say: here is craft, go and write something.
            </p>
            <p>
              Pageturners says: here is a body of stories that belong to you
              and have been deliberately kept from you. Here are the tools to
              read them as a writer reads — understanding how the tension is
              built, where the secrets are held, what the gap costs. Now write
              the story that isn't written yet. And here is the platform
              that will publish it, because we built the platform for
              exactly this purpose.
            </p>
            <p className={styles.pt__notliteracy__bold}>
              The content, the craft, and the destination are all aligned.
              That alignment is what makes it work.
            </p>
            <div className={styles.pt__notliteracy__ctas}>
              <Link to="/programmes/pageturners/sandbox" className={styles.pt__cta__primary}>
                Start in the Sandbox →
              </Link>
              <Link to="/heritage" className={styles.pt__cta__secondary}>
                Read the Archive first →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONNECTIONS ──────────────────────────────── */}
        <section className={styles.pt__connections}>
          <div className={styles.pt__section__header}>
            <span className={styles.pt__label}>The Ecosystem</span>
            <h2 className={styles.pt__section__title}>Where Pageturners connects</h2>
          </div>
          <div className={styles.pt__connections__grid}>
            <Link to="/heritage" className={styles.pt__connection}>
              <span className={styles.pt__connection__icon}>◈</span>
              <strong>Knowledge Commons</strong>
              <p>Your research library. Every profile is a worked example of the eight techniques.</p>
            </Link>
            <Link to="/programmes/joystick" className={styles.pt__connection}>
              <span className={styles.pt__connection__icon}>◎</span>
              <strong>Joystick</strong>
              <p>Your publication platform. 55% revenue. Real editorial standards. Real readers.</p>
            </Link>
            <Link to="/programmes/kaywanas-court" className={styles.pt__connection}>
              <span className={styles.pt__connection__icon}>◆</span>
              <strong>Kaywana's Court</strong>
              <p>Scripts and performance pieces developed in Pageturners are staged here.</p>
            </Link>
            <Link to="/oral-history" className={styles.pt__connection}>
              <span className={styles.pt__connection__icon}>◉</span>
              <strong>Oral History</strong>
              <p>Testimony that becomes source material. The Keeper's archive, available to writers.</p>
            </Link>
          </div>
        </section>

        {/* ── FINAL HOOK ───────────────────────────────── */}
        <section className={styles.pt__finalhook}>
          <p className={styles.pt__finalhook__pull}>
            "To have these characters, albeit fictional, allows us to have
            people to look up to. Because who would we have at the moment?"
          </p>
          <p className={styles.pt__finalhook__attr}>
            — Joseph Marcell, on the absence of Black British stories on screen
          </p>
          <p className={styles.pt__finalhook__response}>
            The archive has the research. The programme has the craft.
            Joystick has the platform. The story that isn't written yet
            is yours to write.
          </p>
          <Link to="/programmes/pageturners/sandbox" className={styles.pt__cta__primary}>
            Begin →
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default PageturnersPage;