import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const RECOGNITION_PROMPTS = [
  "If you've spent years building expertise your community needs —",
  "If you've got knowledge nobody taught you but everyone around you needs —",
  "If you've been the go-to person in your community for as long as you can remember —",
  "If you know things about your culture, your trade, your people that no textbook holds —",
  "If someone told you that what you know isn't worth anything —",
];

function useTypewriter(strings: string[], speed = 38, pause = 3000) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
    }
  }, [charIdx, deleting, idx, strings, speed, pause]);

  useEffect(() => { setDisplay(strings[idx].slice(0, charIdx)); }, [charIdx, idx, strings]);
  return display;
}

const HeroSection: React.FC = () => {
  const recognitionText = useTypewriter(RECOGNITION_PROMPTS);

  return (
    <section className={styles.hero}>
      <div className={styles.atmosphere}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={styles.grain} />
      </div>
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          <span>Wembley Wonders CIC · Est. 2007 · 148 cultures, one borough</span>
        </div>
        <div className={styles.recognitionWrap}>
          <p className={styles.recognitionText}>{recognitionText || '\u00a0'}<span className={styles.cursor}>|</span></p>
          <p className={styles.recognitionAnswer}>you're in the right place.</p>
        </div>
        <h1 className={styles.title}>You walked in here <span className={styles.titleRich}>rich.</span></h1>
        <p className={styles.declaration}>You just didn't know it yet.</p>
        <p className={styles.sub}>Not rich in money. Rich in what you carry — the knowledge, the story, the technique, the taste, the memory that nobody else on earth holds in exactly your combination.</p>
        <div className={styles.richesBlock}>
          <p className={styles.richesLine}>
            <span>I find my people.</span><span className={styles.richesSep}>·</span>
            <span>I make something.</span><span className={styles.richesSep}>·</span>
            <span>I make a difference.</span><span className={styles.richesSep}>·</span>
            <span>I face something hard.</span><span className={styles.richesSep}>·</span>
            <span>I own something real.</span>
          </p>
          <p className={styles.richesClose}>And this becomes the real riches.</p>
          <p className={styles.richesTagline}>Family Knowledge = Family Investment</p>
        </div>
        <div className={styles.ctas}>
          <Link to="/programmes/bright-sparks" className={styles.ctaPrimary}>Find what you carry →</Link>
          <Link to="/sandbox" className={styles.ctaOutline}>Try a sandbox first</Link>
        </div>
        <div className={styles.meta}>
          <Link to="/join" className={styles.metaJoin}>Join free</Link>
          <span className={styles.metaSep}>·</span>
          <Link to="/login" className={styles.metaLogin}>Already a member</Link>
        </div>
      </div>
      <div className={styles.scrollHint}>
        <span>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
};

export default HeroSection;
