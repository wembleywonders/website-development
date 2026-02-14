import React, { useState, useEffect, useRef } from 'react';

// ============================================
// CREATOR FACTORY SANDBOX CHALLENGES
// ============================================

// ── Constraint Design Challenge ──
// Random constraints + timer = creative pressure

interface Constraint {
  shapes: string[];
  colors: string[];
  timeLimit: number; // seconds
  brief: string;
}

const CONSTRAINTS: Constraint[] = [
  { shapes: ['Circle', 'Triangle', 'Line'], colors: ['#ef4444', '#1e293b'], timeLimit: 90, brief: 'Design a logo for a Wembley café' },
  { shapes: ['Square', 'Circle'], colors: ['#3b82f6', '#fbbf24'], timeLimit: 90, brief: 'Create a poster for a community event' },
  { shapes: ['Triangle', 'Rectangle', 'Dot'], colors: ['#10b981', '#f9fafb'], timeLimit: 90, brief: 'Design a business card for yourself' },
  { shapes: ['Hexagon', 'Line', 'Circle'], colors: ['#8b5cf6', '#f97316'], timeLimit: 90, brief: 'Make an album cover for a fictional band' },
  { shapes: ['Star', 'Rectangle'], colors: ['#ec4899', '#111827'], timeLimit: 90, brief: 'Design a menu for a food pop-up' },
];

export const ConstraintDesignChallenge: React.FC<{ onComplete?: (result: any) => void }> = ({ onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [description, setDescription] = useState('');
  const [submissions, setSubmissions] = useState<Array<{ brief: string; description: string; time: number }>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const constraint = currentIdx !== null ? CONSTRAINTS[currentIdx] : null;

  useEffect(() => {
    if (running && constraint && timer < constraint.timeLimit) {
      timerRef.current = setTimeout(() => setTimer(t => t + 1), 1000);
    } else if (constraint && timer >= constraint.timeLimit) {
      setRunning(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running, timer, constraint]);

  const startChallenge = () => {
    const idx = Math.floor(Math.random() * CONSTRAINTS.length);
    setCurrentIdx(idx);
    setTimer(0);
    setRunning(true);
    setDescription('');
  };

  const handleSubmit = () => {
    if (!constraint || !description.trim()) return;
    setRunning(false);
    setSubmissions([...submissions, { brief: constraint.brief, description: description.trim(), time: timer }]);
    setCurrentIdx(null);
    if (submissions.length >= 2) onComplete?.(submissions);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        🎲 Constraint Chaos · {submissions.length}/3 completed
      </div>

      {!constraint ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1.5rem' }}>
            You'll get random constraints — shapes, colours, time limit — and a brief.
            Describe (or sketch and photograph) your design before time runs out.
          </p>
          <button onClick={startChallenge} style={{
            padding: '14px 32px', borderRadius: 12, border: 'none',
            background: '#a855f7', color: 'white', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(168, 85, 247, 0.3)',
          }}>
            {submissions.length === 0 ? '🎲 Roll Constraints' : '🎲 Next Challenge'}
          </button>
        </div>
      ) : (
        <div>
          {/* Constraints display */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1rem',
          }}>
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Shapes</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginTop: 4 }}>
                {constraint.shapes.join(' + ')}
              </div>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Colours</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 6 }}>
                {constraint.colors.map((c, i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: 6, background: c, border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                ))}
              </div>
            </div>
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Time</div>
              <div style={{
                fontSize: '1.2rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginTop: 2,
                color: timer > constraint.timeLimit * 0.8 ? '#ef4444' : timer > constraint.timeLimit * 0.5 ? '#d97706' : '#22c55e',
              }}>
                {formatTime(constraint.timeLimit - timer)}
              </div>
            </div>
          </div>

          {/* Brief */}
          <div style={{
            padding: '14px 18px', borderRadius: 12, marginBottom: '1rem',
            background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168, 85, 247, 0.15)',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a855f7', marginBottom: 4 }}>BRIEF</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#374151' }}>{constraint.brief}</div>
          </div>

          {/* Timer bar */}
          <div style={{ height: 4, borderRadius: 2, background: '#e5e7eb', marginBottom: '1rem' }}>
            <div style={{
              height: '100%', borderRadius: 2, transition: 'width 1s linear',
              width: `${(timer / constraint.timeLimit) * 100}%`,
              background: timer > constraint.timeLimit * 0.8 ? '#ef4444' : timer > constraint.timeLimit * 0.5 ? '#d97706' : '#22c55e',
            }} />
          </div>

          {/* Description input */}
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Describe your design: what shapes where, what it looks like, why it works..."
            style={{
              width: '100%', minHeight: 80, padding: 12, borderRadius: 10,
              border: '1.5px solid #e5e7eb', fontSize: '0.85rem', lineHeight: 1.6,
              resize: 'vertical', fontFamily: 'inherit', marginBottom: 8,
            }}
          />
          <button onClick={handleSubmit} disabled={!description.trim()} style={{
            padding: '10px 20px', borderRadius: 10, border: 'none',
            background: description.trim() ? '#a855f7' : '#e5e7eb',
            color: description.trim() ? 'white' : '#9ca3af',
            fontWeight: 700, fontSize: '0.8rem', cursor: description.trim() ? 'pointer' : 'default',
          }}>
            Submit Design
          </button>
        </div>
      )}

      {/* Previous submissions */}
      {submissions.length > 0 && !constraint && (
        <div style={{ marginTop: '1.5rem' }}>
          {submissions.map((s, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 10, background: '#faf5ff',
              border: '1px solid #e9d5ff', marginBottom: 8,
            }}>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{s.brief} · {formatTime(s.time)}</div>
              <div style={{ fontSize: '0.8rem', color: '#374151', marginTop: 4 }}>{s.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Emoji Story Challenge ──
// Tell a story in exactly 5 emojis

export const EmojiStoryChallenge: React.FC<{ onComplete?: (result: any) => void }> = ({ onComplete }) => {
  const [emojis, setEmojis] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [stories, setStories] = useState<Array<{ emojis: string[]; decoded: string }>>([]);
  const [decoded, setDecoded] = useState('');

  const addEmoji = () => {
    if (emojis.length >= 5 || !input.trim()) return;
    setEmojis([...emojis, input.trim()]);
    setInput('');
  };

  const removeEmoji = (idx: number) => {
    setEmojis(emojis.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (emojis.length !== 5) return;
    setStories([...stories, { emojis: [...emojis], decoded: decoded.trim() }]);
    setEmojis([]);
    setDecoded('');
    if (stories.length >= 2) onComplete?.(stories);
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '1.5rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        🎨 Emoji Story · {stories.length}/3 completed
      </div>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
        Tell a story using exactly 5 emojis. Then decode it in one sentence.
      </p>

      {/* Emoji display */}
      <div style={{
        display: 'flex', gap: 10, justifyContent: 'center', padding: '1.5rem',
        background: '#f9fafb', borderRadius: 16, marginBottom: '1rem', minHeight: 70,
      }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} onClick={() => emojis[i] && removeEmoji(i)} style={{
            width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: emojis[i] ? '2rem' : '1rem',
            background: emojis[i] ? 'white' : '#e5e7eb',
            border: emojis[i] ? '2px solid #a855f7' : '2px dashed #d1d5db',
            cursor: emojis[i] ? 'pointer' : 'default',
            color: '#d1d5db',
          }}>
            {emojis[i] || (i + 1)}
          </div>
        ))}
      </div>

      {/* Input */}
      {emojis.length < 5 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addEmoji()}
            placeholder="Type or paste an emoji..."
            style={{ flex: 1, padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '1.2rem', textAlign: 'center' }}
          />
          <button onClick={addEmoji} style={{
            padding: '10px 16px', borderRadius: 8, border: 'none',
            background: '#a855f7', color: 'white', fontWeight: 700, cursor: 'pointer',
          }}>
            Add ({emojis.length}/5)
          </button>
        </div>
      )}

      {/* Decode */}
      {emojis.length === 5 && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', marginBottom: 6 }}>
            Decode your story in one sentence:
          </label>
          <input type="text" value={decoded} onChange={e => setDecoded(e.target.value)}
            placeholder="What's the story?"
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: '0.85rem' }}
          />
          <button onClick={handleSubmit} style={{
            marginTop: 8, padding: '10px 20px', borderRadius: 10, border: 'none',
            background: '#a855f7', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
          }}>
            Submit Story
          </button>
        </div>
      )}

      {/* Previous stories */}
      {stories.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {stories.map((s, i) => (
            <div key={i} style={{
              padding: '10px 14px', borderRadius: 10, background: '#faf5ff',
              border: '1px solid #e9d5ff', marginBottom: 8,
            }}>
              <div style={{ fontSize: '1.5rem', letterSpacing: 4 }}>{s.emojis.join('')}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: 4 }}>{s.decoded}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConstraintDesignChallenge;