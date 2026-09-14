import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './mountStupid.module.css';
import type { Track } from './types';

interface Stage {
  t: number;
  name: string;
  desc: string;
}

const STAGES: Stage[] = [
  { t: 0.0, name: 'Just starting', desc: 'Confidence and knowledge both start low and roughly track each other.' },
  { t: 0.2, name: 'Mount Stupid', desc: "A little bit of knowledge is enough to feel certain, but not enough to know what you're missing." },
  { t: 0.42, name: 'The Valley', desc: 'Learning more reveals how much was missed the first time. Confidence drops even as real knowledge climbs.' },
  { t: 0.68, name: 'Slope of Sense', desc: 'Confidence rebuilds slowly, this time anchored to what has actually been tested and checked.' },
  { t: 0.95, name: 'Years of study', desc: "Expertise is built through repeated exposure to a field's failed ideas and contested claims, over years — not a single flash of insight." },
];

const PATH_D = 'M 20 240 C 100 40, 160 30, 200 90 C 230 130, 250 200, 280 210 C 380 235, 500 60, 620 25';

function stageForT(t: number): Stage {
  let closest = STAGES[0];
  let min = Infinity;
  for (const s of STAGES) {
    const d = Math.abs(s.t - t);
    if (d < min) { min = d; closest = s; }
  }
  return closest;
}

export default function DunningKrugerCurve({ track }: { track: Track }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [t, setT] = useState(0.2);
  const [dragging, setDragging] = useState(false);
  const [handlePoint, setHandlePoint] = useState({ x: 20, y: 240 });

  const applyT = useCallback((rawT: number) => {
    const clamped = Math.max(0, Math.min(1, rawT));
    setT(clamped);
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      const pt = path.getPointAtLength(clamped * length);
      setHandlePoint({ x: pt.x, y: pt.y });
    }
  }, []);

  useEffect(() => {
    applyT(0.2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tFromClientX = useCallback((clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return t;
    const rect = svg.getBoundingClientRect();
    const x = (clientX - rect.left) * (640 / rect.width);
    return (x - 20) / (620 - 20);
  }, [t]);

  const handlePointerMove = useCallback((e: React.PointerEvent | PointerEvent) => {
    applyT(tFromClientX(e.clientX));
  }, [applyT, tFromClientX]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => handlePointerMove(e);
    const onUp = () => setDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, handlePointerMove]);

  const stage = stageForT(t);

  return (
    <div className={styles.panel}>
      <svg
        ref={svgRef}
        className={styles.dkSvg}
        viewBox="0 0 640 280"
        onPointerDown={(e) => { setDragging(true); handlePointerMove(e); }}
      >
        <path ref={pathRef} d={PATH_D} fill="none" stroke="#3a4356" strokeWidth={2} />
        <line x1="20" y1="252" x2="620" y2="252" stroke="#2c3444" strokeWidth={1} />
        <text x="20" y="270" fill="#a6b0c0" fontSize="11" fontFamily="IBM Plex Mono, monospace">knows little</text>
        <text x="540" y="270" fill="#a6b0c0" fontSize="11" fontFamily="IBM Plex Mono, monospace">years of study</text>
        <circle cx={handlePoint.x} cy={handlePoint.y} r={8} fill="#c23b22" stroke="#eef1ee" strokeWidth={2} />
      </svg>
      <div className={styles.dkCaption}>
        <div className={`${styles.dkStageName} ${track === 'bright' ? styles.dkStageNameBright : styles.dkStageNameStem}`}>
          {stage.name}
        </div>
        <div className={styles.dkStageDesc}>{stage.desc}</div>
      </div>
      <div className={styles.dkHint}>drag the red dot along the curve</div>
    </div>
  );
}
