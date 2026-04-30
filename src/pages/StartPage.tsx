// src/pages/StartPage.tsx
// Route: /start
// Entry point for first-time visitors from homepage "Try a sandbox first" CTA.
//
// One prompt. One text box. Two seconds of "Finding your room..."
// Then: your programme match.
//
// Judith's question. Her voice. Her community.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Colour tokens ───────────────────────────────────────────
const T = {
  pageBg:      '#0f172a',
  cardBg:      'rgba(20, 30, 50, 0.95)',
  cardBorder:  'rgba(148, 163, 184, 0.15)',
  white:       '#ffffff',
  bright:      '#f8fafc',
  main:        '#e2e8f0',
  mid:         '#cbd5e1',
  muted:       '#94a3b8',
  gold:        '#C9A84C',
  goldBg:      'rgba(201, 168, 76, 0.12)',
  goldBorder:  'rgba(201, 168, 76, 0.3)',
  green:       '#22c55e',
  greenLight:  '#86efac',
  greenBg:     'rgba(34, 197, 94, 0.12)',
  greenBorder: 'rgba(34, 197, 94, 0.3)',
  teal:        '#3ecfcf',
};

// ─── Programme matching ───────────────────────────────────────
// Simple keyword scoring. Top match wins.
// Extend this list as the platform grows.

interface Programme {
  id:          string;
  name:        string;
  emoji:       string;
  colour:      string;
  tagline:     string;
  description: string;
  path:        string;
  keywords:    string[];
}

const PROGRAMMES: Programme[] = [
  {
    id:          'auntie-anansis-kitchen',
    name:        "Auntie Anansi's Kitchen",
    emoji:       '🍲',
    colour:      '#d62828',
    tagline:     'Culture. Food. Heritage.',
    description: 'Document family recipes with stories, techniques, and the history behind every dish.',
    path:        '/programmes/auntie-anansis-kitchen',
    keywords:    ['food','cook','recipe','kitchen','dish','eat','meal','caribbean','african','heritage','spice','family recipe','grandmother','mother','bake','fry','stew','curry','rice','plantain'],
  },
  {
    id:          'trubble-n-bass',
    name:        'Trubble n Bass',
    emoji:       '🎵',
    colour:      '#8338ec',
    tagline:     'Decks. DAW. Drop.',
    description: 'Turn your knowledge of sound, rhythm, and music into something people can hear.',
    path:        '/programmes/trubble-n-bass',
    keywords:    ['music','sound','beat','rhythm','song','sing','dance','radio','bass','track','produce','dj','reggae','grime','jazz','blues','vinyl','record','listen','instrument'],
  },
  {
    id:          'pageturners',
    name:        'Pageturners',
    emoji:       '✍️',
    colour:      '#f4a261',
    tagline:     'Words. Stories. Worlds.',
    description: 'Write the stories that only you can tell — and find the people waiting to read them.',
    path:        '/programmes/pageturners',
    keywords:    ['write','story','book','words','read','poem','letter','diary','novel','author','tale','memory','remember','history','oral','narrative','voice','tell','said','told'],
  },
  {
    id:          'stemgeneers',
    name:        'STEMgeneers',
    emoji:       '⚡',
    colour:      '#2a9d8f',
    tagline:     'Make. Build. Innovate.',
    description: 'The knowledge in your hands — fixing, making, building — is worth more than you think.',
    path:        '/programmes/stemgeneers',
    keywords:    ['make','build','fix','repair','hands','tools','engineer','science','tech','machine','electric','wire','sew','construct','craft','create','mend','mechanical','practical','workshop'],
  },
  {
    id:          'silk-stilettos',
    name:        'Silk Stilettos',
    emoji:       '🎨',
    colour:      '#ff006e',
    tagline:     'Style. Confidence. Expression.',
    description: 'Your eye for style and design is a skill. Let\'s build something from it.',
    path:        '/programmes/silk-stilettos',
    keywords:    ['style','fashion','clothes','design','colour','beauty','hair','makeup','dress','fabric','pattern','aesthetic','art','visual','creative','look','wear','image','brand','market'],
  },
  {
    id:          'techreneurs',
    name:        'TECHreneurs',
    emoji:       '💻',
    colour:      '#e9c46a',
    tagline:     'Turn creativity into income.',
    description: 'Technology is a tool. You have ideas worth building with it.',
    path:        '/programmes/techreneurs',
    keywords:    ['tech','computer','code','digital','phone','app','software','online','website','internet','business','income','earn','sell','market','social media','content','platform','startup','idea'],
  },
  {
    id:          'kaywanas-court',
    name:        "Kaywana's Court",
    emoji:       '🎭',
    colour:      '#9d4edd',
    tagline:     'Stories. Stage. Screen.',
    description: 'Performance, drama, and presence — the skills you\'ve always had, now with a stage.',
    path:        '/programmes/kaywanas-court',
    keywords:    ['perform','act','stage','drama','theatre','speak','present','audience','character','role','play','dance','move','body','expression','confidence','public','speech','community','gather'],
  },
  {
    id:          'bright-sparks',
    name:        'Bright Sparks',
    emoji:       '✨',
    colour:      '#fbbf24',
    tagline:     'Not sure where you fit? Start here.',
    description: 'The discovery gateway. Try mini-challenges from every programme and find your path.',
    path:        '/programmes/bright-sparks',
    keywords:    [], // default — catches everything
  },
];

function matchProgramme(text: string): Programme {
  const lower = text.toLowerCase();
  let best = PROGRAMMES[PROGRAMMES.length - 1]; // Bright Sparks default
  let bestScore = 0;

  for (const prog of PROGRAMMES.slice(0, -1)) {
    const score = prog.keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = prog;
    }
  }
  return best;
}

// ─── Loading messages ─────────────────────────────────────────
const LOADING_MESSAGES = [
  'Reading what you wrote…',
  'Finding your room…',
  'Almost there…',
];

// ─── Component ───────────────────────────────────────────────
type Stage = 'prompt' | 'loading' | 'result';

const StartPage: React.FC = () => {
  const [text,    setText]    = useState('');
  const [stage,   setStage]   = useState<Stage>('prompt');
  const [loadMsg, setLoadMsg] = useState(0);
  const [match,   setMatch]   = useState<Programme | null>(null);
  const navigate = useNavigate();

  // Cycle loading messages
  useEffect(() => {
    if (stage !== 'loading') return;
    const interval = setInterval(() => {
      setLoadMsg(m => (m + 1) % LOADING_MESSAGES.length);
    }, 650);
    const timeout = setTimeout(() => {
      setMatch(matchProgramme(text));
      setStage('result');
    }, 2000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [stage, text]);

  const handleSubmit = () => {
    if (text.trim().length < 20) return;
    setStage('loading');
  };

  // ── Prompt stage ──────────────────────────────────────────
  if (stage === 'prompt') return (
    <div style={{
      minHeight:   '100vh',
      background:  T.pageBg,
      display:     'flex',
      alignItems:  'center',
      justifyContent: 'center',
      padding:     '2rem 1.25rem',
      fontFamily:  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        width:      '100%',
        maxWidth:   620,
        display:    'flex',
        flexDirection: 'column',
        gap:        '2rem',
      }}>

        {/* Wembley Wonders badge */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '0.5rem',
        }}>
          <div style={{
            width:        8,
            height:       8,
            borderRadius: '50%',
            background:   T.teal,
          }} />
          <span style={{
            fontSize:      '0.8rem',
            fontWeight:    700,
            color:         T.muted,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>
            Wembley Wonders CIC
          </span>
        </div>

        {/* The question */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h1 style={{
            margin:      0,
            fontSize:    'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight:  800,
            color:       T.white,
            lineHeight:  1.25,
            letterSpacing: '-0.02em',
          }}>
            Let's see what we can do together
          </h1>
          <p style={{
            margin:     0,
            fontSize:   'clamp(1.1rem, 2.5vw, 1.3rem)',
            fontWeight: 500,
            color:      T.gold,
            fontStyle:  'italic',
            lineHeight: 1.5,
          }}>
            You start, I'm listening.
          </p>
          <p style={{
            margin:     0,
            fontSize:   '0.8rem',
            color:      T.muted,
            letterSpacing: '0.01em',
          }}>
            — Judith Fontanelle, Director of Community Engagement
          </p>
        </div>

        {/* Text box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write anything. A person, a skill, a memory, something you make or fix or cook or know. There's no wrong answer here."
            rows={6}
            style={{
              width:          '100%',
              background:     T.cardBg,
              border:         `1px solid ${text.length > 20 ? T.goldBorder : T.cardBorder}`,
              borderRadius:   12,
              padding:        '1rem 1.125rem',
              fontSize:       '1rem',
              color:          T.main,
              lineHeight:     1.65,
              resize:         'vertical',
              outline:        'none',
              fontFamily:     'inherit',
              transition:     'border-color 0.2s ease',
              boxSizing:      'border-box',
            }}
            autoFocus
          />
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
          }}>
            <span style={{
              fontSize: '0.8rem',
              color:    text.length > 20 ? T.greenLight : T.muted,
              transition: 'color 0.2s',
            }}>
              {text.length < 20
                ? `${20 - text.length} more characters to go`
                : 'Ready — hit the button when you are'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={text.trim().length < 20}
              style={{
                padding:       '0.75rem 1.75rem',
                background:    text.length > 20
                  ? `linear-gradient(135deg, ${T.gold} 0%, #b8923d 100%)`
                  : 'rgba(148,163,184,0.15)',
                border:        'none',
                borderRadius:  8,
                color:         text.length > 20 ? '#fff' : T.muted,
                fontSize:      '0.95rem',
                fontWeight:    700,
                cursor:        text.length > 20 ? 'pointer' : 'not-allowed',
                transition:    'all 0.2s ease',
                fontFamily:    'inherit',
                letterSpacing: '-0.01em',
              }}
            >
              Find my room →
            </button>
          </div>
        </div>

        {/* Reassurance */}
        <p style={{
          margin:     0,
          fontSize:   '0.8rem',
          color:      T.muted,
          lineHeight: 1.6,
          borderTop:  `1px solid ${T.cardBorder}`,
          paddingTop: '1rem',
        }}>
          No account needed. No right answer. Whatever you write stays between you and the platform until you decide otherwise.
        </p>

      </div>
    </div>
  );

  // ── Loading stage ─────────────────────────────────────────
  if (stage === 'loading') return (
    <div style={{
      minHeight:      '100vh',
      background:     T.pageBg,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap:            '1.5rem',
      }}>
        {/* Spinner */}
        <div style={{
          width:        48,
          height:       48,
          borderRadius: '50%',
          border:       `3px solid rgba(201, 168, 76, 0.2)`,
          borderTop:    `3px solid ${T.gold}`,
          animation:    'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{
          margin:     0,
          fontSize:   '1.1rem',
          color:      T.mid,
          fontWeight: 500,
          fontStyle:  'italic',
          transition: 'opacity 0.3s',
        }}>
          {LOADING_MESSAGES[loadMsg]}
        </p>
      </div>
    </div>
  );

  // ── Result stage ──────────────────────────────────────────
  if (stage === 'result' && match) return (
    <div style={{
      minHeight:      '100vh',
      background:     T.pageBg,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '2rem 1.25rem',
      fontFamily:     "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        width:         '100%',
        maxWidth:      560,
        display:       'flex',
        flexDirection: 'column',
        gap:           '1.75rem',
      }}>

        {/* Match card */}
        <div style={{
          background:   T.cardBg,
          border:       `1px solid ${match.colour}40`,
          borderLeft:   `4px solid ${match.colour}`,
          borderRadius: 16,
          padding:      '2rem',
          display:      'flex',
          flexDirection:'column',
          gap:          '1rem',
        }}>
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '0.75rem',
          }}>
            <span style={{ fontSize: '2rem' }}>{match.emoji}</span>
            <div>
              <p style={{
                margin:        0,
                fontSize:      '0.75rem',
                fontWeight:    700,
                color:         T.muted,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom:  '0.2rem',
              }}>
                Your room
              </p>
              <h2 style={{
                margin:      0,
                fontSize:    '1.4rem',
                fontWeight:  800,
                color:       T.white,
                lineHeight:  1.2,
              }}>
                {match.name}
              </h2>
            </div>
          </div>

          <p style={{
            margin:     0,
            fontSize:   '0.875rem',
            fontWeight: 700,
            color:      match.colour,
            fontStyle:  'italic',
          }}>
            {match.tagline}
          </p>

          <p style={{
            margin:     0,
            fontSize:   '0.95rem',
            color:      T.mid,
            lineHeight: 1.65,
          }}>
            {match.description}
          </p>
        </div>

        {/* What you wrote */}
        <div style={{
          background:   T.cardBg,
          border:       `1px solid ${T.cardBorder}`,
          borderRadius: 12,
          padding:      '1.25rem',
        }}>
          <p style={{
            margin:        0,
            fontSize:      '0.75rem',
            fontWeight:    700,
            color:         T.muted,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom:  '0.625rem',
          }}>
            What you wrote
          </p>
          <p style={{
            margin:     0,
            fontSize:   '0.9rem',
            color:      T.mid,
            lineHeight: 1.65,
            fontStyle:  'italic',
          }}>
            "{text.length > 200 ? text.slice(0, 200) + '…' : text}"
          </p>
        </div>

        {/* CTAs */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          gap:           '0.75rem',
        }}>
          <button
            onClick={() => navigate(match.path)}
            style={{
              padding:       '0.9rem 1.5rem',
              background:    `linear-gradient(135deg, ${match.colour} 0%, ${match.colour}bb 100%)`,
              border:        'none',
              borderRadius:  10,
              color:         '#fff',
              fontSize:      '1rem',
              fontWeight:    700,
              cursor:        'pointer',
              fontFamily:    'inherit',
              letterSpacing: '-0.01em',
            }}
          >
            Take me to {match.name} →
          </button>

          <button
            onClick={() => { setText(''); setStage('prompt'); setLoadMsg(0); }}
            style={{
              padding:    '0.75rem 1.5rem',
              background: 'transparent',
              border:     `1px solid ${T.cardBorder}`,
              borderRadius: 10,
              color:      T.muted,
              fontSize:   '0.9rem',
              fontWeight: 600,
              cursor:     'pointer',
              fontFamily: 'inherit',
            }}
          >
            Try a different answer
          </button>

          <button
            onClick={() => navigate('/join')}
            style={{
              padding:    '0.75rem 1.5rem',
              background: T.greenBg,
              border:     `1px solid ${T.greenBorder}`,
              borderRadius: 10,
              color:      T.greenLight,
              fontSize:   '0.9rem',
              fontWeight: 700,
              cursor:     'pointer',
              fontFamily: 'inherit',
            }}
          >
            Join free — save this and keep going
          </button>
        </div>

        {/* Reassurance */}
        <p style={{
          margin:     0,
          fontSize:   '0.8rem',
          color:      T.muted,
          lineHeight: 1.6,
          textAlign:  'center',
        }}>
          Not what you expected? Try a different answer or{' '}
          <span
            onClick={() => navigate('/sandbox')}
            style={{ color: T.gold, cursor: 'pointer', textDecoration: 'underline' }}
          >
            browse all programmes
          </span>.
        </p>

      </div>
    </div>
  );

  return null;
};

export default StartPage;
