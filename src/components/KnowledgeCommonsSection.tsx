import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './KnowledgeCommonsSection.module.css';

const THREADS = [
  { question: "Why don't we know Arthur Wharton?", context: "World's first Black professional footballer. Sprint world record holder. Died in an unmarked grave. Wembley Stadium was built on his era.", thread: "The Same Rule, Different Arenas" },
  { question: "What happened to the Commonwealth Institute?", context: "Built to represent fifty nations. Converted into a design museum. No community consultation. The archive dispersed.", thread: "The Distance Between the Embassy and the Community" },
  { question: "Why did Michaela Coel turn down $1 million?", context: "Netflix offered her everything. She walked away to keep her copyright. What that means for every creator who came after her.", thread: "Who Owns the Culture?" },
  { question: "What was on this land before Wembley Stadium?", context: "1924. The British Empire Exhibition. The same Empire whose subjects' descendants now live, work, and create here.", thread: "The Landscape Under Your Feet" },
  { question: "Who was William Cuffay?", context: "Son of an enslaved man. Leader of the London Chartists. Transported to Tasmania for demanding the vote. His story is your story.", thread: "The Forgotten Radicals" },
];

const MISSING_PLAQUES = [
  { name: 'ARTHUR WHARTON',         dates: '1865–1930', field: 'Footballer & Sprinter' },
  { name: 'CLAUDIA JONES',          dates: '1915–1964', field: 'Activist & Founder' },
  { name: 'SAMUEL COLERIDGE-TAYLOR',dates: '1875–1912', field: 'Composer' },
];

const KnowledgeCommonsSection: React.FC = () => {
  const [activeThread, setActiveThread] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => { setActiveThread(i => (i + 1) % THREADS.length); setIsTransitioning(false); }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goToThread = (i: number) => {
    if (i === activeThread) return;
    setIsTransitioning(true);
    setTimeout(() => { setActiveThread(i); setIsTransitioning(false); }, 200);
  };

  const handleAskMaya = () => {
    window.dispatchEvent(new CustomEvent('maya:open', {
      detail: { source: 'heritage', context: 'knowledge-commons', prompt: "I'm in the Knowledge Commons. Help me explore the archive." },
    }));
  };

  const current = THREADS[activeThread];

  return (
    <section className={styles.commons}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.sectionLabel}>The counter-archive</span>
          <h2 className={styles.sectionTitle}>The history they didn't teach you.<br /><em className={styles.titleAccent}>Documented here.</em></h2>
          <p className={styles.body}>English Heritage has issued 950+ blue plaques in London. Here are the people who deserve one more than many who have one. Here is the ground under Wembley Stadium and what it remembers.</p>
          <p className={styles.body}>A publicly accessible counter-archive — pioneer profiles, deep-dive threads, an institutional map of post-colonial London, and a living oral history. Free. No login required to read.</p>
          <div className={styles.plaques}>
            <div className={styles.plaquesLabel}>Missing plaques</div>
            <div className={styles.plaqueRow}>
              {MISSING_PLAQUES.map(p => (
                <div key={p.name} className={styles.plaque}>
                  <span className={styles.plaqueName}>{p.name}</span>
                  <span className={styles.plaqueDates}>{p.dates}</span>
                  <span className={styles.plaqueField}>{p.field}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.ctas}>
            <Link to="/heritage" className={styles.ctaPrimary}>Enter the Knowledge Commons →</Link>
            <Link to="/oral-history" className={styles.ctaGhost}>Contribute your story</Link>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.threadCard}>
            <div className={styles.threadKicker}><span className={styles.threadPulse} />Deep-dive thread</div>
            <p className={`${styles.threadQuestion} ${isTransitioning ? styles.threadFading : ''}`}>{current.question}</p>
            <p className={`${styles.threadContext} ${isTransitioning ? styles.threadFading : ''}`}>{current.context}</p>
            <div className={styles.threadName}>{current.thread}</div>
            <Link to="/heritage" className={styles.threadLink}>Read the thread →</Link>
          </div>
          <div className={styles.threadDots}>
            {THREADS.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === activeThread ? styles.dotActive : ''}`} onClick={() => goToThread(i)} aria-label={`Thread ${i + 1}`} />
            ))}
          </div>
          <div className={styles.mayaCard}>
            <div className={styles.mayaLeft}>
              <div className={styles.mayaAvatar}><span className={styles.mayaIcon}>💬</span></div>
            </div>
            <div className={styles.mayaRight}>
              <div className={styles.mayaName}>Ask Maya</div>
              <p className={styles.mayaText}>Not sure where to start in the archive? Maya knows this room. Ask her anything — a name, a place, a question you've never been able to answer.</p>
              <button className={styles.mayaCta} onClick={handleAskMaya}>Ask the librarian →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCommonsSection;
