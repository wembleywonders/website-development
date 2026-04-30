import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CommunityMedia.module.css';

const OUTPUTS = [
  { id:'raydyo', icon:'📻', name:'Rayd-yo', tagline:'Broadcast what you know.', body:'Community radio made by members. Podcasts, interviews, music, heritage storytelling. Your voice, your audience, your archive.', cta:'Listen now →', href:'/raydyo', colour:'#f87171', glow:'rgba(248,113,113,0.08)', border:'rgba(248,113,113,0.2)' },
  { id:'joystick', icon:'📰', name:'Joystick', tagline:'Write what you know.', body:'The community e-zine. Written, designed, and published by members. Your words, documented, attributed, permanently yours.', cta:'Read now →', href:'/joystick', colour:'#34d399', glow:'rgba(52,211,153,0.08)', border:'rgba(52,211,153,0.2)' },
  { id:'commons', icon:'🗃️', name:'Knowledge Commons', tagline:'Document, discover, navigate.', body:"The counter-archive. Pioneer profiles, deep-dive threads, oral history. The knowledge that was never written down — written down here.", cta:'Enter the archive →', href:'/heritage', colour:'#d4a853', glow:'rgba(212,168,83,0.08)', border:'rgba(212,168,83,0.2)' },
];

const CommunityMedia: React.FC = () => (
  <section className={styles.media}>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.sectionLabel}>Where your work lives</span>
        <h2 className={styles.sectionTitle}>Three outputs. One community voice.</h2>
        <p className={styles.sectionSub}>Everything created through Wembley Wonders has a home — on air, in print, and in the archive. Your name on it. Nobody can take that.</p>
      </div>
      <div className={styles.grid}>
        {OUTPUTS.map(output => (
          <Link key={output.id} to={output.href} className={styles.card} style={{ '--out-colour':output.colour, '--out-glow':output.glow, '--out-border':output.border } as React.CSSProperties}>
            <div className={styles.cardTop}>
              <span className={styles.cardIcon}>{output.icon}</span>
              <div>
                <div className={styles.cardName}>{output.name}</div>
                <div className={styles.cardTagline} style={{ color: output.colour }}>{output.tagline}</div>
              </div>
            </div>
            <p className={styles.cardBody}>{output.body}</p>
            <div className={styles.cardCta}>{output.cta}</div>
          </Link>
        ))}
      </div>
      <p className={styles.connective}>Rayd-yo, Joystick, and the Knowledge Commons are not three separate features. They are one knowledge ecosystem — broadcast, written, and archived. A creator who moves through all three leaves a provenance trail that no platform can strip-mine without acknowledgement or payment.</p>
    </div>
  </section>
);

export default CommunityMedia;
