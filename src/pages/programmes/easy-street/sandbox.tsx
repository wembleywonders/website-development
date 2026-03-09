import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sandbox.css';

// ─────────────────────────────────────────────
// SCENE PROMPTS — scaffolded starting points
// ─────────────────────────────────────────────
const PROMPTS = [
  {
    id: 'continue',
    label: 'Continue Scene 1.01',
    icon: '📻',
    setup: 'Pearl has just picked up the phone. Marsha says: "He gone out in his good shirt, Pearl."',
    hint: 'What does Pearl say? What does she already know that she isn\'t saying? What does she ask?',
    characters: ['PEARL', 'MARSHA'],
  },
  {
    id: 'auntie',
    label: 'Auntie Budgie finds out',
    icon: '👑',
    setup: 'Auntie Budgie is at Bible class. Someone mentions they saw John on the High Road this morning. In his good shirt.',
    hint: 'Budgie says nothing immediately. But her face. Write what she says to Pearl afterwards.',
    characters: ['AUNTIE BUDGIE', 'PEARL'],
  },
  {
    id: 'bruk-up',
    label: 'Bruk-up under the table',
    icon: '🔧',
    setup: 'Bruk-up is fixing something under Auntie Jenny\'s table. The adults think he can\'t hear them.',
    hint: 'He can hear everything. Write what he hears — and what he decides to do with it.',
    characters: ['BRUK-UP', 'AUNTIE JENNY'],
  },
  {
    id: 'own',
    label: 'Bring your own characters',
    icon: '✍️',
    setup: 'Your kitchen. Your family. Your specific Sunday morning silence.',
    hint: 'Who are the people? What has been held for thirty years? What small thing makes it surface today?',
    characters: ['YOUR CHARACTER', 'YOUR CHARACTER'],
  },
];

type RecordingState = 'idle' | 'recording' | 'recorded' | 'error';

const EasyStreetSandbox: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [scriptText, setScriptText] = useState('');
  const [characterNames, setCharacterNames] = useState(['', '']);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [showAttributionNote, setShowAttributionNote] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const prompt = PROMPTS.find(p => p.id === selectedPrompt);

  // ── Recording ──────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setRecordingState('recorded');
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecordingState('recording');
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);

    } catch {
      setRecordingState('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const clearRecording = () => {
    setAudioURL(null);
    setRecordingState('idle');
    setRecordingSeconds(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const wordCount = scriptText.trim().split(/\s+/).filter(Boolean).length;
  const hasContent = scriptText.trim().length > 50;

  // ── Submit ─────────────────────────────────
  const handleSubmit = () => {
    if (!hasContent || !authorName.trim()) return;
    setSubmitted(true);
  };

  // ── Render ─────────────────────────────────
  if (submitted) {
    return (
      <div className="es-sandbox-page">
        <div className="es-sandbox-page__grain" />
        <div className="es-submitted">
          <div className="es-submitted__icon">📻</div>
          <h1 className="es-submitted__title">Your scene is in.</h1>
          <p className="es-submitted__text">
            {authorName}, your contribution is now part of Easy Street's archive.
            It carries your name and the RAPP attribution.
          </p>
          <div className="es-submitted__attribution">
            Contributed by <strong>{authorName}</strong>.<br />
            Easy Street — a Wembley Wonders CIC production.<br />
            Written in the tradition of RAPP, Radical Alliance of Poets and Players, Brixton 1972.
          </div>
          <div className="es-submitted__next">
            <h2>What happens next</h2>
            <p>
              The editorial team reads every submission. If your scene works within the world,
              you'll hear from us about production — recording with the full cast, broadcast on
              Rayd-yo, your name in the credits.
            </p>
            <p>
              The fastest route to getting your scene produced is the Zoom writing room,
              where the editorial collective meets weekly and works with contributors directly.
            </p>
          </div>
          <div className="es-submitted__actions">
            <a href="mailto:workshops@wembleywonders.org?subject=Easy Street Writing Room"
              className="es-sandbox-btn es-sandbox-btn--primary">
              Join the Zoom Writing Room
            </a>
            <button onClick={() => {
              setSubmitted(false);
              setScriptText('');
              setAudioURL(null);
              setRecordingState('idle');
              setSelectedPrompt(null);
              setAuthorName('');
            }} className="es-sandbox-btn es-sandbox-btn--ghost">
              Write another scene
            </button>
          </div>
          <Link to="/programmes/easy-street" className="es-submitted__back">
            ← Back to Easy Street
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="es-sandbox-page">
      <div className="es-sandbox-page__grain" />

      {/* ── HEADER ── */}
      <header className="es-sandbox-header">
        <Link to="/programmes/easy-street" className="es-sandbox-back">
          ← Easy Street
        </Link>
        <div className="es-sandbox-header__centre">
          <span className="es-sandbox-header__label">Easy Street Sandbox</span>
          <h1 className="es-sandbox-header__title">Write the next scene.</h1>
          <p className="es-sandbox-header__sub">
            Pick a prompt. Write the dialogue. Record yourself reading it.
            Bring it to the Zoom writing room on Tuesday.
          </p>
        </div>
        <div className="es-sandbox-header__steps">
          <span className={`es-step ${selectedPrompt ? 'es-step--done' : 'es-step--active'}`}>1 Pick</span>
          <span className="es-step-line" />
          <span className={`es-step ${hasContent ? 'es-step--done' : selectedPrompt ? 'es-step--active' : ''}`}>2 Write</span>
          <span className="es-step-line" />
          <span className={`es-step ${recordingState === 'recorded' ? 'es-step--done' : hasContent ? 'es-step--active' : ''}`}>3 Record</span>
          <span className="es-step-line" />
          <span className={`es-step ${recordingState === 'recorded' && hasContent ? 'es-step--active' : ''}`}>4 Share</span>
        </div>
      </header>

      <div className="es-sandbox-body">

        {/* ── STEP 1: PROMPT SELECTION ── */}
        <section className="es-sandbox-section">
          <h2 className="es-sandbox-section__title">
            <span className="es-sandbox-section__num">1</span>
            Choose your starting point
          </h2>
          <div className="es-prompt-grid">
            {PROMPTS.map(p => (
              <button
                key={p.id}
                className={`es-prompt-card ${selectedPrompt === p.id ? 'es-prompt-card--selected' : ''}`}
                onClick={() => {
                  setSelectedPrompt(p.id);
                  if (p.id !== 'own') {
                    setCharacterNames(p.characters);
                  } else {
                    setCharacterNames(['', '']);
                  }
                }}
              >
                <span className="es-prompt-card__icon">{p.icon}</span>
                <div className="es-prompt-card__body">
                  <strong className="es-prompt-card__label">{p.label}</strong>
                  <p className="es-prompt-card__setup">{p.setup}</p>
                </div>
                {selectedPrompt === p.id && (
                  <span className="es-prompt-card__tick">✓</span>
                )}
              </button>
            ))}
          </div>

          {prompt && (
            <div className="es-prompt-hint">
              <span className="es-prompt-hint__label">Your scene starts here:</span>
              <p className="es-prompt-hint__setup">{prompt.setup}</p>
              <p className="es-prompt-hint__hint">{prompt.hint}</p>
            </div>
          )}
        </section>

        {/* ── STEP 2: WRITE ── */}
        {selectedPrompt && (
          <section className="es-sandbox-section">
            <h2 className="es-sandbox-section__title">
              <span className="es-sandbox-section__num">2</span>
              Write your scene
            </h2>

            {/* Character name fields for 'own' prompt */}
            {selectedPrompt === 'own' && (
              <div className="es-char-names">
                <div className="es-char-name-field">
                  <label>Character 1 name</label>
                  <input
                    type="text"
                    value={characterNames[0]}
                    onChange={e => setCharacterNames([e.target.value, characterNames[1]])}
                    placeholder="e.g. MISS GLORIA"
                    className="es-input"
                  />
                </div>
                <div className="es-char-name-field">
                  <label>Character 2 name</label>
                  <input
                    type="text"
                    value={characterNames[1]}
                    onChange={e => setCharacterNames([characterNames[0], e.target.value])}
                    placeholder="e.g. DESMOND"
                    className="es-input"
                  />
                </div>
              </div>
            )}

            {/* Format guide */}
            <div className="es-format-guide">
              <span className="es-format-guide__label">Radio drama format:</span>
              <code>CHARACTER NAME</code> on its own line, then dialogue below.
              Use <code>(beat)</code> or <code>(pause)</code> for silences.
              Sound directions in italics: <code>Sound: the front door.</code>
            </div>

            {/* Script editor */}
            <div className="es-script-editor">
              <div className="es-script-editor__toolbar">
                {characterNames.filter(Boolean).map(name => (
                  <button
                    key={name}
                    className="es-char-btn"
                    onClick={() => setScriptText(t => t + (t.endsWith('\n\n') || t === '' ? '' : '\n\n') + name + '\n')}
                  >
                    + {name || 'Character'}
                  </button>
                ))}
                <button
                  className="es-char-btn es-char-btn--direction"
                  onClick={() => setScriptText(t => t + (t.endsWith('\n\n') || t === '' ? '' : '\n\n') + 'Sound: ')}
                >
                  + Sound direction
                </button>
                <button
                  className="es-char-btn es-char-btn--direction"
                  onClick={() => setScriptText(t => {
                    const lines = t.split('\n');
                    const last = lines[lines.length - 1];
                    if (last && !last.startsWith('Sound:') && last === last.toUpperCase()) {
                      return t + '(beat) ';
                    }
                    return t + ' (beat) ';
                  })}
                >
                  + (beat)
                </button>
              </div>
              <textarea
                className="es-script-textarea"
                value={scriptText}
                onChange={e => setScriptText(e.target.value)}
                placeholder={`${characterNames[0] || 'CHARACTER A'}\nYour dialogue here.\n\n${characterNames[1] || 'CHARACTER B'}\nTheir response.\n\nSound: something specific.`}
                rows={18}
                spellCheck
              />
              <div className="es-script-editor__footer">
                <span className="es-word-count">{wordCount} words</span>
                {wordCount > 0 && wordCount < 50 && (
                  <span className="es-word-hint">Keep going — a scene needs room to breathe</span>
                )}
                {wordCount >= 50 && wordCount < 300 && (
                  <span className="es-word-hint es-word-hint--good">Good length for a radio scene</span>
                )}
                {wordCount >= 300 && (
                  <span className="es-word-hint">Strong scene — consider whether it needs trimming</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── STEP 3: RECORD ── */}
        {hasContent && (
          <section className="es-sandbox-section">
            <h2 className="es-sandbox-section__title">
              <span className="es-sandbox-section__num">3</span>
              Record yourself reading it
            </h2>
            <p className="es-sandbox-section__body">
              You don't need a microphone. Your phone or laptop is fine. Read all the parts —
              give each character a different voice. This recording is what you bring to the Zoom
              writing room. It doesn't have to be perfect. It just has to be true.
            </p>

            <div className="es-recorder">
              {recordingState === 'idle' && (
                <button className="es-record-btn" onClick={startRecording}>
                  <span className="es-record-btn__dot" />
                  Start recording
                </button>
              )}

              {recordingState === 'recording' && (
                <div className="es-recording-active">
                  <div className="es-recording-pulse">
                    <span className="es-recording-pulse__ring" />
                    <span className="es-recording-pulse__dot" />
                  </div>
                  <span className="es-recording-time">{formatTime(recordingSeconds)}</span>
                  <button className="es-record-stop-btn" onClick={stopRecording}>
                    Stop
                  </button>
                </div>
              )}

              {recordingState === 'recorded' && audioURL && (
                <div className="es-recording-done">
                  <div className="es-recording-done__label">
                    <span className="es-recording-done__tick">✓</span>
                    Recorded — {formatTime(recordingSeconds)}
                  </div>
                  <audio ref={audioRef} src={audioURL} controls className="es-audio-player" />
                  <button className="es-record-again-btn" onClick={clearRecording}>
                    Record again
                  </button>
                </div>
              )}

              {recordingState === 'error' && (
                <div className="es-record-error">
                  Microphone access denied. You can still submit your written scene without a recording.
                </div>
              )}
            </div>

            <p className="es-sandbox-section__note">
              Recording optional — you can submit the written scene alone and record at the Zoom session.
            </p>
          </section>
        )}

        {/* ── STEP 4: SHARE ── */}
        {hasContent && (
          <section className="es-sandbox-section es-sandbox-section--final">
            <h2 className="es-sandbox-section__title">
              <span className="es-sandbox-section__num">4</span>
              Name it and share it
            </h2>

            <div className="es-submit-form">
              <div className="es-submit-field">
                <label className="es-submit-label">Your name (for attribution)</label>
                <input
                  type="text"
                  className="es-input"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  placeholder="The name that goes on your scene"
                />
              </div>

              <button
                className="es-attribution-toggle"
                onClick={() => setShowAttributionNote(!showAttributionNote)}
              >
                What attribution means for your work {showAttributionNote ? '▲' : '▼'}
              </button>

              {showAttributionNote && (
                <div className="es-attribution-note">
                  <p>
                    Your name is attached to this scene permanently in the Easy Street archive.
                    The world of Easy Street belongs to Wembley Wonders CIC — but this scene is yours.
                    If it's produced and broadcast on Rayd-yo, you are credited as its author and
                    compensated under the 55/25/20 model.
                  </p>
                  <p>
                    Every Easy Street production carries the RAPP attribution: written in the tradition
                    of the Radical Alliance of Poets and Players, Brixton 1972, with acknowledgment to
                    Jamal Ali, originator.
                  </p>
                </div>
              )}

              <button
                className={`es-submit-btn ${!hasContent || !authorName.trim() ? 'es-submit-btn--disabled' : ''}`}
                onClick={handleSubmit}
                disabled={!hasContent || !authorName.trim()}
              >
                Submit to Easy Street
              </button>

              <p className="es-submit-or">or</p>

              <a
                href="mailto:workshops@wembleywonders.org?subject=Easy Street — my scene"
                className="es-sandbox-btn es-sandbox-btn--outline"
              >
                Email your scene directly
              </a>
            </div>
          </section>
        )}

        {/* ── ZOOM INVITATION ── */}
        <section className="es-zoom-invite">
          <div className="es-zoom-invite__inner">
            <span className="es-zoom-invite__icon">💬</span>
            <div className="es-zoom-invite__body">
              <h3>Tuesday evenings — the writing room</h3>
              <p>
                Every Tuesday at 7pm, the Easy Street editorial collective meets on Zoom.
                Bring your scene — written or recorded. You'll hear other people's scenes,
                give feedback, get feedback, and leave with the next scene already forming.
              </p>
              <p>
                This is where Easy Street is actually made. The sandbox is the door.
                The Zoom is the room.
              </p>
            </div>
            <a
              href="mailto:workshops@wembleywonders.org?subject=Easy Street Writing Room — joining Tuesday"
              className="es-sandbox-btn es-sandbox-btn--primary"
            >
              Join Tuesday's session
            </a>
          </div>
        </section>

        {/* Attribution footer */}
        <div className="es-sandbox-attribution">
          Easy Street is a Wembley Wonders CIC production.
          Written in the tradition of RAPP — Radical Alliance of Poets and Players, Brixton 1972.
          With acknowledgment to <strong>Jamal Ali</strong>, originator.
        </div>

      </div>
    </div>
  );
};

export default EasyStreetSandbox;
