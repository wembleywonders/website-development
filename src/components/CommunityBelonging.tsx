import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CommunityBelonging.module.css';

const CONNOISSEURS_STAGES = [
  'Seedling — first contribution made public',
  'Apprentice — practice established and documented',
  'Practitioner — knowledge earning and teaching',
  'Keeper — mentoring the next generation',
  'Elder — sovereignty achieved, legacy secured',
];

const PASSIONISTAS_THREADS = [
  "Connected to Silk Stilettos women's programme",
  'Connected to Roots — hair health and body sovereignty',
  '@BryceOfWembley social community hub',
  'Open to all women members of Wembley Wonders',
];

const CommunityBelonging: React.FC = () => (
  <section className={styles.belonging}>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>Community & Belonging</span>
        <p className={styles.sectionIntro}>Two recognition societies — one for men, one for women. Both built on the same belief: that being seen by people who understand where you came from is not a luxury. It is the point.</p>
      </div>
      <div className={styles.clubGrid}>

        <div className={`${styles.clubCard} ${styles.clubCard__cc}`}>
          <div className={styles.clubMeta}>
            <span className={styles.convenorLine}>Convenor: Claude Fontanelle</span>
            <span className={`${styles.forBadge} ${styles.forBadge__cc}`}>For men</span>
          </div>
          <h3 className={styles.clubTitle}>The Connoisseurs Club</h3>
          <p className={styles.clubSub}>Cultural recognition · Rites of passage · Five stages</p>
          <p className={styles.clubBody}>A framework for men who've spent decades building expertise in silence — in trades, in community, in culture — and never had that knowledge formally witnessed or celebrated. Five stages from first contribution to Elder.</p>
          <blockquote className={styles.clubQuote}>"Forty years of knowledge doesn't retire. The Connoisseurs Club is where it gets its name back."</blockquote>
          <ol className={styles.stages}>
            {CONNOISSEURS_STAGES.map((stage, i) => (
              <li key={i} className={styles.stage}>
                <span className={styles.stageDot} style={{ opacity: 0.25 + (i * 0.19) }} />
                <span className={styles.stageText}>{stage}</span>
              </li>
            ))}
          </ol>
          <Link to="/connoisseurs-club" className={`${styles.clubCta} ${styles.clubCta__cc}`}>Join the Connoisseurs Club →</Link>
        </div>

        <div className={`${styles.clubCard} ${styles.clubCard__pfc}`}>
          <div className={styles.clubMeta}>
            <span className={styles.convenorLine}>Convenor: Judith Fontanelle</span>
            <span className={`${styles.forBadge} ${styles.forBadge__pfc}`}>For women</span>
          </div>
          <h3 className={styles.clubTitle}>The Passionistas Fan Club</h3>
          <p className={styles.clubSub}>Women's recognition · Celebration · Mutual witnessing</p>
          <p className={styles.clubBody}>A community of women who celebrate each other's achievements, knowledge, and growth — properly, loudly, and without apology. Not a support group. Not a networking event. A recognition society for women who are done being quietly extraordinary.</p>
          <blockquote className={styles.clubQuote}>"Every woman in this room has waited long enough. The Passionistas make it loud."</blockquote>
          <ul className={styles.threads}>
            {PASSIONISTAS_THREADS.map((thread, i) => (
              <li key={i} className={styles.thread}>
                <span className={styles.threadDot} />
                <span>{thread}</span>
              </li>
            ))}
          </ul>
          <Link to="/passionistas" className={`${styles.clubCta} ${styles.clubCta__pfc}`}>Join the Passionistas →</Link>
        </div>

      </div>
      <div className={styles.footer}>
        <div className={styles.footerDivider}>
          <div className={styles.footerLine} />
          <span className={styles.footerBadge}>The Fontanelles — Claude & Judith</span>
          <div className={styles.footerLine} />
        </div>
        <p className={styles.footerText}>The Connoisseurs Club and the Passionistas Fan Club are the belonging layer above every programme. One convened by Claude for men. One convened by Judith for women. Together they complete the picture — a platform where everyone has a community that sees them whole, not just as a creator or a learner, but as a person whose knowledge, history, and growth deserves to be witnessed.</p>
      </div>
    </div>
  </section>
);

export default CommunityBelonging;
