import React, { useState } from 'react';

// ============================================
// IMPACT LABS SANDBOX CHALLENGES
// ============================================

// ── Ethical Dilemma Challenge ──
// Present a dilemma, force a choice, explore the reasoning

interface Dilemma {
  title: string;
  scenario: string;
  optionA: string;
  optionB: string;
  followUp: string;
}

const DILEMMAS: Dilemma[] = [
  {
    title: 'The Wallet',
    scenario: 'You find a wallet with £200 cash and an ID card. The person lives 3 bus rides away. Returning it costs you 2 hours and £4.50 in bus fare.',
    optionA: 'Return it in person — they deserve their money back',
    optionB: 'Hand it to the nearest police station — let the system handle it',
    followUp: 'What if the wallet had £20 instead? Would your answer change? Why does the amount matter?',
  },
  {
    title: 'The AI Decision',
    scenario: 'A hospital uses AI to decide who gets a transplant. The AI is statistically fairer than human doctors but can\'t explain its decisions. A patient asks: "Why wasn\'t I chosen?"',
    optionA: 'Use the AI — fairness matters more than explanation',
    optionB: 'Use human doctors — people deserve to understand decisions about their lives',
    followUp: 'What if the AI saves 20% more lives? Is unexplained fairness better than explained bias?',
  },
  {
    title: 'The Shop',
    scenario: 'A new chain store opens on Wembley High Road. It\'s cheaper than the family-owned shop next door. The family shop will probably close within 6 months.',
    optionA: 'Shop at the chain — families need affordable prices',
    optionB: 'Shop at the family store — community wealth matters more',
    followUp: 'What if you can\'t afford the family shop? Is choosing community a privilege?',
  },
  {
    title: 'The Recording',
    scenario: 'You see a teacher being unfair to a student. You record it on your phone. The recording could get the teacher fired but would also expose the student publicly.',
    optionA: 'Share the recording — accountability matters',
    optionB: 'Report it privately without the recording — protect the student',
    followUp: 'Who owns the story? The person who recorded it, or the people in it?',
  },
];

export const EthicalDilemmaChallenge: React.FC<{ onComplete?: (result: any) => void }> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [choice, setChoice] = useState<'A' | 'B' | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [responses, setResponses] = useState<Array<{ dilemma: string; choice: string; reasoning: string }>>([]);

  const dilemma = DILEMMAS[currentIdx];

  const handleSubmit = () => {
    if (!choice || !reasoning.trim()) return;
    const newResponses = [...responses, {
      dilemma: dilemma.title,
      choice: choice === 'A' ? dilemma.optionA : dilemma.optionB,
      reasoning: reasoning.trim(),
    }];
    setResponses(newResponses);
    setShowFollowUp(true);
  };

  const handleNext = () => {
    if (currentIdx < DILEMMAS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setChoice(null);
      setReasoning('');
      setShowFollowUp(false);
    } else {
      onComplete?.(responses);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        🧭 Ethical Edge · Dilemma {currentIdx + 1} of {DILEMMAS.length}
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 12px' }}>{dilemma.title}</h3>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#374151', marginBottom: '1.5rem' }}>{dilemma.scenario}</p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1rem' }}>
        {(['A', 'B'] as const).map(opt => (
          <button key={opt} onClick={() => { setChoice(opt); setShowFollowUp(false); }} style={{
            padding: '12px 16px', borderRadius: 12, textAlign: 'left', cursor: 'pointer',
            fontSize: '0.85rem', lineHeight: 1.5, fontWeight: choice === opt ? 700 : 400,
            background: choice === opt ? 'rgba(14, 165, 233, 0.08)' : '#f9fafb',
            border: `2px solid ${choice === opt ? '#0ea5e9' : '#e5e7eb'}`,
            color: choice === opt ? '#0c4a6e' : '#6b7280', transition: 'all 0.2s',
          }}>
            {opt === 'A' ? dilemma.optionA : dilemma.optionB}
          </button>
        ))}
      </div>

      {/* Reasoning */}
      {choice && !showFollowUp && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', marginBottom: 6 }}>
            Why? (This is the part that matters)
          </label>
          <textarea
            value={reasoning} onChange={e => setReasoning(e.target.value)}
            placeholder="Explain your reasoning in 2-3 sentences..."
            style={{
              width: '100%', minHeight: 80, padding: 12, borderRadius: 10,
              border: '1.5px solid #e5e7eb', fontSize: '0.85rem', lineHeight: 1.6,
              resize: 'vertical', fontFamily: 'inherit',
            }}
          />
          <button onClick={handleSubmit} disabled={!reasoning.trim()} style={{
            marginTop: 8, padding: '10px 20px', borderRadius: 10, border: 'none',
            background: reasoning.trim() ? '#0ea5e9' : '#e5e7eb',
            color: reasoning.trim() ? 'white' : '#9ca3af',
            fontWeight: 700, fontSize: '0.8rem', cursor: reasoning.trim() ? 'pointer' : 'default',
          }}>
            Submit Reasoning
          </button>
        </div>
      )}

      {/* Follow-up */}
      {showFollowUp && (
        <div style={{
          padding: '1rem', borderRadius: 12, background: '#f0f9ff',
          border: '1px solid #bae6fd', marginBottom: '1rem',
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0ea5e9', marginBottom: 6 }}>FOLLOW-UP</div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#374151', margin: 0 }}>{dilemma.followUp}</p>
          <button onClick={handleNext} style={{
            marginTop: 12, padding: '10px 20px', borderRadius: 10, border: 'none',
            background: '#0ea5e9', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
          }}>
            {currentIdx < DILEMMAS.length - 1 ? 'Next Dilemma →' : 'Complete ✓'}
          </button>
        </div>
      )}

      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginTop: '1rem' }}>
        {DILEMMAS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: i < currentIdx ? '#0ea5e9' : i === currentIdx ? '#bae6fd' : '#e5e7eb',
          }} />
        ))}
      </div>
    </div>
  );
};

// ── Community Problem Mapper ──
// Convert complaints into researchable problem definitions

export const CommunityProblemMapper: React.FC<{ onComplete?: (result: any) => void }> = ({ onComplete }) => {
  const [complaint, setComplaint] = useState('');
  const [problemDef, setProblemDef] = useState('');
  const [who, setWho] = useState('');
  const [evidence, setEvidence] = useState('');
  const [entries, setEntries] = useState<Array<{ complaint: string; problem: string; who: string; evidence: string }>>([]);

  const handleSubmit = () => {
    if (!complaint.trim() || !problemDef.trim()) return;
    const newEntries = [...entries, {
      complaint: complaint.trim(),
      problem: problemDef.trim(),
      who: who.trim(),
      evidence: evidence.trim(),
    }];
    setEntries(newEntries);
    setComplaint('');
    setProblemDef('');
    setWho('');
    setEvidence('');
    if (newEntries.length >= 3) onComplete?.(newEntries);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        🔬 Problem Mapper · {entries.length}/3 completed
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
          1. The complaint (what people say)
        </label>
        <input type="text" value={complaint} onChange={e => setComplaint(e.target.value)}
          placeholder="e.g. There's too much litter near the stadium"
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '0.85rem' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
          2. The problem definition (specific, measurable)
        </label>
        <textarea value={problemDef} onChange={e => setProblemDef(e.target.value)}
          placeholder='e.g. "Litter bins on Olympic Way overflow by 2pm on match days because collection happens at 6am"'
          style={{ width: '100%', minHeight: 60, padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '0.85rem', resize: 'vertical', fontFamily: 'inherit' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
          3. Who's affected?
        </label>
        <input type="text" value={who} onChange={e => setWho(e.target.value)}
          placeholder="e.g. Residents, shop owners, match-day visitors"
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '0.85rem' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>
          4. How would you find evidence?
        </label>
        <input type="text" value={evidence} onChange={e => setEvidence(e.target.value)}
          placeholder="e.g. Count overflowing bins at 2pm vs 6am on match day"
          style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '0.85rem' }}
        />
      </div>

      <button onClick={handleSubmit} disabled={!complaint.trim() || !problemDef.trim()} style={{
        padding: '10px 20px', borderRadius: 10, border: 'none',
        background: complaint.trim() && problemDef.trim() ? '#0ea5e9' : '#e5e7eb',
        color: complaint.trim() && problemDef.trim() ? 'white' : '#9ca3af',
        fontWeight: 700, fontSize: '0.8rem', cursor: complaint.trim() && problemDef.trim() ? 'pointer' : 'default',
      }}>
        Save Problem ({entries.length + 1}/3)
      </button>

      {/* Previous entries */}
      {entries.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          {entries.map((e, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 10, background: '#f0f9ff',
              border: '1px solid #bae6fd', marginBottom: 8,
            }}>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginBottom: 4 }}>Complaint: "{e.complaint}"</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0c4a6e' }}>→ {e.problem}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EthicalDilemmaChallenge;