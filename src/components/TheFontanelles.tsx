import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TheFontanelles.module.css';

// ── Swap these constants when real photos are ready ──
const JUDITH_PHOTO = '/images/judith-fontanelle.jpg';
const CLAUDE_PHOTO  = '/images/claude-fontanelle.jpg';

const TheFontanelles: React.FC = () => (
  <section className={styles.fontanelles}>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>The people behind the platform</span>
        <h2 className={styles.sectionTitle}>The Fontanelles</h2>
      </div>
      <div className={styles.grid}>

        <div className={styles.card}>
          <div className={styles.photoWrap}>
            {JUDITH_PHOTO
              ? <img src={JUDITH_PHOTO} alt="Judith Fontanelle" className={styles.photo} />
              : <div className={styles.photoPlaceholder}><span className={styles.photoInitial}>J</span></div>
            }
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>
              <span className={styles.cardName}>Judith Fontanelle</span>
              <span className={styles.cardRole}>Director of Community Engagement</span>
              <span className={styles.cardHandle}>@BryceOfWembley</span>
            </div>
            <p className={styles.cardVoice}>
              I'm the woman your friend told you to call. When you don't know where to start,
              when the system has made you feel like what you carry isn't valuable,
              when you need someone in your corner who actually understands — that's me.
              I've been holding this door open in Wembley for seventeen years.
              The Passionistas Fan Club is the community I wish had existed when I needed it.
              It exists now. Walk in.
            </p>
            <Link to="/passionistas" className={`${styles.cardCta} ${styles.cardCta__judith}`}>
              Meet the Passionistas →
            </Link>
            <a
              href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Wembley%20Wonders"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              💬 WhatsApp Judith directly
            </a>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.photoWrap}>
            {CLAUDE_PHOTO
              ? <img src={CLAUDE_PHOTO} alt="Claude Fontanelle" className={styles.photo} />
              : <div className={styles.photoPlaceholder}><span className={styles.photoInitial}>C</span></div>
            }
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardMeta}>
              <span className={styles.cardName}>Claude Fontanelle</span>
              <span className={styles.cardRole}>Technical Director & Co-founder</span>
              <span className={styles.cardHandle}>Wembley Wonders CIC</span>
            </div>
            <p className={styles.cardVoice}>
              You came in here rich. Let me show you how to make rich real.
              I'm a self-taught developer, a former ICT lecturer, a trade union educator —
              and I've spent forty years watching people underestimate what they carry.
              The Connoisseurs Club is the framework I built for men who've never had
              their knowledge formally witnessed. The platform is the infrastructure
              I built so that witnessing becomes income.
            </p>
            <Link to="/connoisseurs-club" className={`${styles.cardCta} ${styles.cardCta__claude}`}>
              Meet the Connoisseurs →
            </Link>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default TheFontanelles;
