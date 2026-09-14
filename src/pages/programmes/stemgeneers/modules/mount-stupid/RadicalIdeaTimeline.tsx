import React, { useState } from 'react';
import styles from './mountStupid.module.css';

interface TimelineItem {
  year: string;
  title: string;
  body: string;
}

const ITEMS: TimelineItem[] = [
  {
    year: '1912–60s',
    title: "Continents don't just sit there",
    body: 'Matching coastlines were dismissed as coincidence for decades. What actually settled it: matching fossils, hundreds of millions of years old, on both the South American and African coasts — and later, mapping showing the seafloor spreading apart along the Mid-Atlantic Ridge.',
  },
  {
    year: '1915–1919',
    title: 'Space and time bend',
    body: 'General relativity predicted gravity bends starlight. It was published in a physics journal first, then tested during a 1919 total solar eclipse, when starlight passing near the sun was measured and found bent by the predicted amount.',
  },
];

export default function RadicalIdeaTimeline() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.panel}>
      {ITEMS.map((item, idx) => (
        <button
          key={item.year}
          type="button"
          className={styles.tlItem}
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
        >
          <div className={styles.tlYear}>{item.year}</div>
          <div>
            <div className={styles.tlTitle}>{item.title}</div>
            <div className={`${styles.tlBody} ${openIdx === idx ? styles.tlBodyOpen : ''}`}>
              {item.body}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
