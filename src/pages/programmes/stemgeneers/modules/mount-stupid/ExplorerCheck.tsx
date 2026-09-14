import React, { useState, useEffect } from 'react';
import styles from './mountStupid.module.css';

interface Question {
  prompt: string;
  options: string[];
  answerIdx: number;
}

const QUESTIONS: Question[] = [
  {
    prompt: '1. For which values of n does n² come out smaller than n?',
    options: ['n greater than 1', 'n strictly between 0 and 1', 'n equal to 0 or 1'],
    answerIdx: 1,
  },
  {
    prompt: '2. Why does a mirror never quite double a light reading?',
    options: [
      "Imperfect reflectivity plus the reflection's greater apparent distance",
      "Light meters can't measure reflected light at all",
      'Mirrors absorb all colour except white light',
    ],
    answerIdx: 0,
  },
  {
    prompt: "3. What actually confirmed general relativity's prediction, rather than public opinion?",
    options: ["Einstein's own reputation", 'A vote among physicists', 'Measured starlight bending during the 1919 eclipse'],
    answerIdx: 2,
  },
];

// Comprehension check only — no automated badge award. Wembley Wonders'
// constitutional rule is no automated badge approval: every badge requires
// a documented output plus named sign-off. This component only reports a
// score to its caller; it does not mint, unlock, or self-certify anything.
export default function ExplorerCheck({ onComplete }: { onComplete: (score: number) => void }) {
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [reported, setReported] = useState(false);

  const correctCount = Object.entries(answered).filter(
    ([qIdx, chosen]) => QUESTIONS[Number(qIdx)].answerIdx === chosen
  ).length;
  const allAnswered = Object.keys(answered).length === QUESTIONS.length;

  useEffect(() => {
    if (allAnswered && !reported) {
      setReported(true);
      onComplete(correctCount);
    }
  }, [allAnswered, reported, correctCount, onComplete]);

  const choose = (qIdx: number, optIdx: number) => {
    if (answered[qIdx] !== undefined) return;
    setAnswered((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className={styles.panel}>
      {QUESTIONS.map((q, qIdx) => {
        const chosen = answered[qIdx];
        return (
          <div className={styles.q} key={q.prompt}>
            <div className={styles.qPrompt}>{q.prompt}</div>
            <div className={styles.qOpts}>
              {q.options.map((opt, optIdx) => {
                let cls = styles.qOpt;
                if (chosen !== undefined) {
                  if (optIdx === q.answerIdx) cls += ` ${styles.qOptCorrect}`;
                  else if (optIdx === chosen) cls += ` ${styles.qOptWrong}`;
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={cls}
                    disabled={chosen !== undefined}
                    onClick={() => choose(qIdx, optIdx)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            <div className={styles.qFeedback}>
              {chosen === undefined ? '' : chosen === q.answerIdx ? 'Correct.' : 'Not quite — correct answer highlighted.'}
            </div>
          </div>
        );
      })}
      {allAnswered && (
        <>
          <div className={styles.checkStatus}>
            {correctCount} / {QUESTIONS.length} correct — ready for the Builder-tier lab attempt.
          </div>
          <div className={styles.checkNote}>
            This is a self-scored comprehension check, logged for assessor visibility.
            It does not itself satisfy any STEM-APM assessment criterion and does not
            unlock or award a badge — Explorer-tier criteria 1.1–5.1 are assessed
            separately (see accreditation/programmes/stemgeneers/assessment-criteria.md).
          </div>
        </>
      )}
    </div>
  );
}
