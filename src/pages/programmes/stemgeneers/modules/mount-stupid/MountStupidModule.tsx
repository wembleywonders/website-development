import React, { useState, useCallback } from 'react';
import { useJournalStore } from '../../../../../stores/journalStore';
import styles from './mountStupid.module.css';
import type { Track } from './types';
import SquaringDemo from './SquaringDemo';
import MirrorLightDemo from './MirrorLightDemo';
import DunningKrugerCurve from './DunningKrugerCurve';
import RadicalIdeaTimeline from './RadicalIdeaTimeline';
import ExplorerCheck from './ExplorerCheck';

interface MountStupidModuleProps {
  defaultTrack: Track;
}

// Shared component for both entry points — Bright Sparks taster and the
// STEMgeneers Applied Mathematics & Physics (STEM-APM) unit. Do not fork
// this file; each entry point renders it with a different defaultTrack.
export default function MountStupidModule({ defaultTrack }: MountStupidModuleProps) {
  const [track, setTrack] = useState<Track>(defaultTrack);
  const [showCorrection, setShowCorrection] = useState(false);
  const addEntry = useJournalStore((state) => state.addEntry);

  const handleExplorerCheckComplete = useCallback((score: number) => {
    // Real, live signal into journalStore — the same mechanism this
    // programme's other pages (sandbox.tsx, PrototypeLab.tsx) already use.
    // verificationStatus stays 'self-reported': this does not verify,
    // approve, or award anything on its own. No badge is minted here.
    addEntry({
      stage: 1,
      cPhase: 'connect',
      entryType: 'milestone',
      title: 'Mount Stupid — Explorer comprehension check',
      content: `${score}/3 correct on the Mount Stupid comprehension check (STEM-APM verification-principle primer). Self-scored; ready for assessor review, not yet reviewed.`,
      isPrivate: false,
      verificationStatus: 'self-reported',
    });
  }, [addEntry]);

  return (
    <div className={styles.root}>
      <div className={styles.trackBar}>
        <span className={styles.trackLabel}>viewing as</span>
        <div className={styles.trackToggle}>
          <button
            type="button"
            className={`${styles.trackBtn} ${track === 'bright' ? styles.trackBtnActiveBright : ''}`}
            onClick={() => setTrack('bright')}
          >
            Bright Sparks
          </button>
          <button
            type="button"
            className={`${styles.trackBtn} ${track === 'stem' ? styles.trackBtnActiveStem : ''}`}
            onClick={() => setTrack('stem')}
          >
            STEMgeneers
          </button>
        </div>
      </div>

      <div className={styles.hero}>
        <button type="button" className={styles.heroEq} onClick={() => setShowCorrection((v) => !v)}>
          1 <span className={styles.strike}>&times;</span> 1 = 2
        </button>
        <div className={`${styles.heroCorrection} ${showCorrection ? styles.heroCorrectionShow : ''}`}>
          {track === 'bright'
            ? '→ nope. tap it and see why.'
            : '→ false for every value strictly between 0 and 1. tap the equation.'}
        </div>
        {track === 'stem' && (
          <div className={styles.badgeChip}>
            STEM-APM · Applied Mathematics &amp; Physics — verification-principle primer
          </div>
        )}
        <p className={`${styles.heroSub} ${track === 'bright' ? styles.heroSubBright : ''}`}>
          {track === 'bright'
            ? "A famous actor once tried to say maths could be rewritten — that a number times itself is always bigger. A real scientist checked it, line by line, and showed where it broke. Let's check it ourselves."
            : "Eight years ago an actor sent an astrophysicist a 36-page treatise arguing that squaring a number always produces a larger one, and that a mirror can double a candle's measured light. The astrophysicist reviewed every page and returned it fully annotated. This module walks through what checking a claim like that actually looks like, using the same reasoning tools this programme's applied maths strand is built on."}
        </p>
      </div>

      <div className={styles.wrap}>
        <section className={styles.section}>
          <div className={styles.sectionNum}>01</div>
          <h2 className={styles.sectionTitle}>Does squaring a number always make it bigger?</h2>
          <p className={styles.lede}>
            {track === 'bright'
              ? 'Drag the slider. Watch what n and n² do.'
              : 'The treatise claimed squaring a number always produces something greater, and that any counter-example would unravel the foundations of mathematics. Test it.'}
          </p>
          <SquaringDemo track={track} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionNum}>02</div>
          <h2 className={styles.sectionTitle}>Does a mirror double a candle's light?</h2>
          <p className={styles.lede}>
            {track === 'bright'
              ? "A mirror doesn't make a perfect copy of light — some gets lost, and the reflection looks like it's farther away. Try the sliders."
              : 'Two physical effects stop a mirror reading exactly double: imperfect reflectivity, and the inverse-square law acting over the reflection\'s extra apparent distance.'}
          </p>
          <MirrorLightDemo />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionNum}>03</div>
          <h2 className={styles.sectionTitle}>Why confident-and-wrong can feel just like confident-and-right</h2>
          <p className={styles.lede}>
            {track === 'bright'
              ? 'This happens to everyone, not just the actor in the story. Drag the dot and see the stages.'
              : 'Applies well beyond maths: a small amount of knowledge in any subject can produce more certainty than the knowledge itself supports. Drag the marker.'}
          </p>
          <DunningKrugerCurve track={track} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionNum}>04</div>
          <h2 className={styles.sectionTitle}>How a genuinely radical idea earns its place</h2>
          <p className={styles.lede}>
            {track === 'bright'
              ? "Sometimes a wild idea turns out true. Here's how people actually proved it, instead of just arguing."
              : "Being dismissed at first is not evidence either way — it's the starting condition every real breakthrough shares with every failed one. What separates them is testable evidence."}
          </p>
          <RadicalIdeaTimeline />
        </section>

        {track === 'stem' && (
          <section className={styles.section}>
            <div className={styles.sectionNum}>05</div>
            <h2 className={styles.sectionTitle}>Explorer check</h2>
            <p className={styles.lede}>
              Three quick questions. This is the comprehension check for the module — Builder tier picks up from here with a hands-on lab attempt.
            </p>
            <ExplorerCheck onComplete={handleExplorerCheckComplete} />
          </section>
        )}

        <footer className={styles.footer}>
          Based on Neil deGrasse Tyson's public account of a peer review he wrote for
          Terrence Howard's manuscript, discussed on StarTalk. Figures and examples are
          paraphrased and reworked for this module, not quoted from the transcript.
        </footer>
      </div>
    </div>
  );
}
