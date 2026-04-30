import React from 'react';
import styles from './ProofSection.module.css';
import { TESTIMONIALS } from '../data/testimonials';

const DOOR_LABELS: Record<string, string> = {
  A: 'Connoisseurs Club',
  B: 'Passionistas',
  sparks: 'Bright Sparks',
};

const ProofSection: React.FC = () => (
  <section className={styles.proof}>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>It works</span>
        <h2 className={styles.sectionTitle}>Real people. Real stories. Real outcomes.</h2>
        <p className={styles.sectionSub}>Not case studies. Not marketing copy. Three moments from seventeen years on the High Road.</p>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map(t => (
          <div key={t.id} className={styles.card} style={{ '--t-colour': t.colour } as React.CSSProperties}>
            <div className={styles.cardTop}>
              <span className={styles.doorBadge} style={{ color: t.colour, borderColor: `${t.colour}44`, background: `${t.colour}12` }}>
                {DOOR_LABELS[t.door]}
              </span>
            </div>
            <div className={styles.asset}>{t.asset}</div>
            <p className={styles.story}>{t.story}</p>
            <blockquote className={styles.quote}>"{t.quote}"</blockquote>
            <div className={styles.footer}>
              <div className={styles.author}>
                <strong>{t.name}</strong>
                <span>{t.detail}</span>
              </div>
              <div className={styles.outcome} style={{ color: t.colour }}>{t.outcome}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProofSection;
