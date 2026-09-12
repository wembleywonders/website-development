// src/pages/programmes/rayd-yo/RaydyoSandbox.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo Sandbox (component form)
//
// FLAGGED, per earlier discussion: sandbox.tsx already has a real,
// recovered design (ShowPlanner + JingleMaker, two-tab page). This file
// was only ever named in the original scaffold list, never built with
// distinct content on record. Built here as a genuine, working combined
// studio view — ShowPlanner + JingleMaker + LiveClock together on one
// screen rather than tabbed — so it's not a blind duplicate. Still needs
// reconciling with sandbox.tsx and index.tsx: pick one as canonical,
// or confirm this is deliberately a third, different view. Not resolved
// here — flagged for the "go over flagged items" pass.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import ShowPlanner from '../../../components/sandboxes/rayd-yo/ShowPlanner';
import JingleMaker from '../../../components/sandboxes/rayd-yo/JingleMaker';
import LiveClock from '../../../components/sandboxes/rayd-yo/LiveClock';
import styles from './RaydyoSandbox.module.css';

const RaydyoSandbox: React.FC = () => {
  const [showContext, setShowContext] = useState('');
  const [jingleContext, setJingleContext] = useState('');

  return (
    <div className={styles.sandbox}>
      <LiveClock />

      <header className={styles.header}>
        <p className={styles.eyebrow}>🔴 Rayd-yo · Studio Tools</p>
        <h1 className={styles.title}>Production Sandbox</h1>
        <p className={styles.subtitle}>
          Plan your show. Build your jingle. Both at once, side by side.
        </p>
      </header>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <ShowPlanner onContextChange={setShowContext} />
        </section>

        <section className={styles.panel}>
          <JingleMaker onContextChange={setJingleContext} showName={showContext} />
        </section>
      </div>
    </div>
  );
};

export default RaydyoSandbox;
