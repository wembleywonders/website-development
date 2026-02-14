import React, { useState, useCallback } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import { PROGRAMMES, PROGRAMME_SPARKS, type Spark } from '../workshops/spark-generator/sparkData';

// ============================================
// SPARK TASTER — Lightweight visitor-facing component
// ============================================
// Sits on the Bright Sparks page to give visitors a quick
// flavour of each programme's energy. No timer, no facilitator
// notes, no scoring — just the prompt and the vibe.
// ============================================

interface SparkTasterProps {
  programmeId?: string; // Optional: lock to specific programme
  className?: string;
}

const SparkTaster: React.FC<SparkTasterProps> = ({ programmeId, className = '' }) => {
  const [currentSpark, setCurrentSpark] = useState<Spark | null>(null);
  const [currentProgramme, setCurrentProgramme] = useState<string | null>(null);
  const [used, setUsed] = useState<Set<string>>(new Set());

  const generateTaster = useCallback(() => {
    let pool: Spark[] = [];
    let progId: string | null = null;

    if (programmeId && PROGRAMME_SPARKS[programmeId]) {
      pool = [...PROGRAMME_SPARKS[programmeId]];
      progId = programmeId;
    } else {
      // Pick a random programme
      const progKeys = Object.keys(PROGRAMME_SPARKS);
      progId = progKeys[Math.floor(Math.random() * progKeys.length)];
      pool = [...PROGRAMME_SPARKS[progId]];
    }

    // Only openers for tasters — closers need session context
    pool = pool.filter(s => s.type === 'opener');

    const unused = pool.filter(s => !used.has(s.prompt));
    const finalPool = unused.length > 0 ? unused : pool;

    const spark = finalPool[Math.floor(Math.random() * finalPool.length)];

    setCurrentSpark(spark);
    setCurrentProgramme(progId);
    setUsed(prev => new Set([...prev, spark.prompt]));
  }, [programmeId, used]);

  const prog = currentProgramme ? PROGRAMMES[currentProgramme] : null;

  return (
    <div className={`spark-taster ${className}`}>
      {!currentSpark ? (
        <div className="spark-taster-cta">
          <div className="taster-icon">
            <Zap size={24} />
          </div>
          <div className="taster-text">
            <h4>Try a Spark</h4>
            <p>Get a taste of how our workshops begin — a quick brain-ignition prompt from one of our programmes.</p>
          </div>
          <button className="taster-btn" onClick={generateTaster}>
            <Zap size={16} />
            Light the Spark
          </button>
        </div>
      ) : (
        <div
          className="spark-taster-active"
          style={{ '--taster-color': prog?.color || '#f59e0b' } as React.CSSProperties}
        >
          <div className="taster-source">
            <span className="taster-prog-icon">{prog?.sparkIcon}</span>
            <span className="taster-prog-name">
              {prog?.sparkName} · {prog?.name}
            </span>
          </div>
          <p className="taster-prompt">{currentSpark.prompt}</p>
          <div className="taster-footer">
            <span className="taster-hint">
              This is how every {prog?.name} session begins — playful, zero-pressure, skills-building.
            </span>
            <button className="taster-another" onClick={generateTaster}>
              <RefreshCw size={14} />
              Try Another
            </button>
          </div>
        </div>
      )}

      <style>{`
        .spark-taster {
          margin: 1.5rem 0;
        }

        .spark-taster-cta {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, #fef3c7, #fef9c3);
          border: 1px solid #fde68a;
          border-radius: 14px;
          flex-wrap: wrap;
        }

        .taster-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: #fbbf24;
          color: white;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .taster-text {
          flex: 1;
          min-width: 200px;
        }

        .taster-text h4 {
          margin: 0 0 2px;
          font-size: 1rem;
          font-weight: 700;
          color: #92400e;
        }

        .taster-text p {
          margin: 0;
          font-size: 0.85rem;
          color: #a16207;
          line-height: 1.5;
        }

        .taster-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f59e0b;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .taster-btn:hover {
          background: #d97706;
          transform: translateY(-1px);
        }

        .spark-taster-active {
          padding: 1.5rem;
          background: color-mix(in srgb, var(--taster-color) 5%, white);
          border: 1.5px solid color-mix(in srgb, var(--taster-color) 20%, transparent);
          border-radius: 16px;
          animation: tasterFadeIn 0.4s ease;
        }

        .taster-source {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.75rem;
        }

        .taster-prog-icon {
          font-size: 1.3rem;
        }

        .taster-prog-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--taster-color);
        }

        .taster-prompt {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.4;
          color: #111827;
          margin: 0 0 1rem;
        }

        .taster-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .taster-hint {
          font-size: 0.75rem;
          color: #9ca3af;
          font-style: italic;
          flex: 1;
          min-width: 200px;
        }

        .taster-another {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid color-mix(in srgb, var(--taster-color) 25%, transparent);
          border-radius: 8px;
          color: var(--taster-color);
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .taster-another:hover {
          background: color-mix(in srgb, var(--taster-color) 8%, white);
        }

        @keyframes tasterFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SparkTaster;