// HumCapture.tsx
// Alternative melody input for the Concept Room — hum into the mic,
// the room catches the rough shape (rising/falling contour), not exact
// pitch. Built for a built-in laptop mic, not an external instrument.
//
// BUILT FROM EMPTY — genuinely never built before, confirmed by a later
// audit: ConceptRoom's "hum" tab is currently just placeholder text
// ("Mic input coming soon..."). This file is NOT wired into ConceptRoom
// here — that's a separate integration decision, same as LyricRhythm.
//
// PITCH DETECTION NOTE: engine/PitchDetector.ts and engine/OnsetDetector.ts
// are confirmed to exist as files, but their actual interface has never
// been seen by any build session on record. Rather than guess at their
// signature (and risk being wrong, as already happened twice tonight),
// this file implements a simple autocorrelation-based pitch detector
// directly, inline. If PitchDetector.ts turns out to already do this
// better, swap it in — don't assume compatibility blind.

import React, { useState, useRef, useCallback } from 'react';
import './HumCapture.css';

export interface HumNote {
  frequency: number;
  timestamp: number;
}

export interface HumCaptureProps {
  onMelodyCaptured?: (notes: HumNote[]) => void;
}

const SAMPLE_INTERVAL_MS = 100; // sample pitch ~10x/second while recording

/**
 * Simple autocorrelation pitch detection — good enough for rough contour,
 * not concert-tuning accurate. Standard technique for browser-based pitch
 * following without an external library.
 */
function autocorrelate(buffer: Float32Array, sampleRate: number): number | null {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return null; // too quiet — likely silence, not a hum

  let bestOffset = -1;
  let bestCorrelation = 0;
  const minOffset = Math.floor(sampleRate / 1000); // ~1000 Hz upper bound
  const maxOffset = Math.floor(sampleRate / 70); // ~70 Hz lower bound

  for (let offset = minOffset; offset < maxOffset; offset++) {
    let correlation = 0;
    for (let i = 0; i < SIZE - offset; i++) {
      correlation += buffer[i] * buffer[i + offset];
    }
    correlation = correlation / (SIZE - offset);
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation < 0.01 || bestOffset === -1) return null;
  return sampleRate / bestOffset;
}

function freqToNoteName(freq: number): string {
  const A4 = 440;
  const noteNum = 12 * (Math.log(freq / A4) / Math.log(2));
  const rounded = Math.round(noteNum) + 57; // MIDI note number, A4 = 69
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(rounded / 12) - 1;
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12];
  return `${name}${octave}`;
}

const HumCapture: React.FC<HumCaptureProps> = ({ onMelodyCaptured }) => {
  const [permissionState, setPermissionState] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [capturedNotes, setCapturedNotes] = useState<HumNote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sampleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const requestMic = useCallback(async () => {
    setPermissionState('requesting');
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionState('granted');
    } catch (err) {
      setPermissionState('denied');
      setError('Microphone access was denied. You can still find your melody on the keyboard in the Production Room.');
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!streamRef.current) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(streamRef.current);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    startTimeRef.current = Date.now();

    setCapturedNotes([]);
    setIsRecording(true);

    const buffer = new Float32Array(analyser.fftSize);

    sampleIntervalRef.current = setInterval(() => {
      analyser.getFloatTimeDomainData(buffer);
      const freq = autocorrelate(buffer, audioCtx.sampleRate);
      if (freq !== null) {
        setCapturedNotes((prev) => [
          ...prev,
          { frequency: freq, timestamp: Date.now() - startTimeRef.current },
        ]);
      }
    }, SAMPLE_INTERVAL_MS);
  }, []);

  const stopRecording = useCallback(() => {
    if (sampleIntervalRef.current) clearInterval(sampleIntervalRef.current);
    sampleIntervalRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
    setIsRecording(false);
  }, []);

  const handleConfirm = () => {
    onMelodyCaptured?.(capturedNotes);
  };

  const clearCapture = () => {
    setCapturedNotes([]);
  };

  return (
    <div className="hum-capture">
      <header className="hum-capture__header">
        <h3>Hum your melody</h3>
        <p className="hum-capture__hint">
          Just hum, sing, or whistle a shape — up, down, doesn't matter if it's exact.
          We'll catch the general contour.
        </p>
      </header>

      {permissionState === 'idle' && (
        <button type="button" className="hum-capture__permission-btn" onClick={requestMic}>
          🎤 Allow microphone
        </button>
      )}

      {permissionState === 'requesting' && (
        <p className="hum-capture__status">Waiting for microphone permission…</p>
      )}

      {permissionState === 'denied' && (
        <p className="hum-capture__error">{error}</p>
      )}

      {permissionState === 'granted' && (
        <>
          <div className="hum-capture__transport">
            <button
              type="button"
              className="hum-capture__record-btn"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? '■ Stop' : '● Record'}
            </button>
            {capturedNotes.length > 0 && !isRecording && (
              <button type="button" className="hum-capture__clear-btn" onClick={clearCapture}>
                Clear
              </button>
            )}
          </div>

          {capturedNotes.length > 0 && (
            <div className="hum-capture__contour">
              {capturedNotes.map((note, i) => (
                <span
                  key={i}
                  className="hum-capture__note-dot"
                  style={{
                    // Rough visual contour: higher frequency = higher on screen
                    bottom: `${Math.min(100, Math.max(0, ((note.frequency - 80) / 400) * 100))}%`,
                  }}
                  title={freqToNoteName(note.frequency)}
                />
              ))}
            </div>
          )}

          {capturedNotes.length > 0 && !isRecording && (
            <div className="hum-capture__actions">
              <button type="button" className="hum-capture__confirm-btn" onClick={handleConfirm}>
                Confirm this melody →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HumCapture;
