import React, { useState, useRef, useCallback } from 'react';
import ProvenanceRecord, { RootsProvenanceRecord } from './ProvenanceRecord';
import './ElderCapture.css';

/**
 * ElderCapture.tsx — "the elder knowledge capture room: hum, record, archive."
 *
 * Two capture modes, both landing in the same place:
 *  - Hum a melody: rough pitch contour capture (same autocorrelation
 *    technique as HumCapture.tsx in Trubble n Bass, kept local rather than
 *    cross-imported across programme sandboxes).
 *  - Record a memory: a full spoken recording — a story, a song sung
 *    whole, a memory in the elder's own words.
 *
 * Either way, capture ends by handing straight to the real ProvenanceRecord
 * component — "the provenance token" confirmed on record — not a
 * duplicate attribution form.
 */

type CaptureMode = 'hum' | 'record' | null;

export interface ElderCaptureResult {
  mode: CaptureMode;
  audioUrl: string | null;
  contour: number[]; // rough pitch trace, only populated for 'hum' mode
  provenance: RootsProvenanceRecord;
}

export interface ElderCaptureProps {
  onComplete?: (result: ElderCaptureResult) => void;
}

function autocorrelate(buffer: Float32Array, sampleRate: number): number | null {
  const SIZE = buffer.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return null;

  let bestOffset = -1;
  let bestCorrelation = 0;
  const minOffset = Math.floor(sampleRate / 1000);
  const maxOffset = Math.floor(sampleRate / 70);

  for (let offset = minOffset; offset < maxOffset; offset++) {
    let correlation = 0;
    for (let i = 0; i < SIZE - offset; i++) correlation += buffer[i] * buffer[i + offset];
    correlation = correlation / (SIZE - offset);
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  if (bestCorrelation < 0.01 || bestOffset === -1) return null;
  return sampleRate / bestOffset;
}

const ElderCapture: React.FC<ElderCaptureProps> = ({ onComplete }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [mode, setMode] = useState<CaptureMode>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [contour, setContour] = useState<number[]>([]);
  const [showProvenanceForm, setShowProvenanceForm] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pitchIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const requestMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setPermissionGranted(true);
    } catch {
      setPermissionError(
        'Microphone access was needed for this. You can still bring an existing recording another way.'
      );
    }
  }, []);

  const startHumCapture = useCallback(() => {
    if (!streamRef.current) return;
    setMode('hum');
    setContour([]);
    setIsCapturing(true);

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(streamRef.current);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    audioCtxRef.current = audioCtx;

    const buffer = new Float32Array(analyser.fftSize);
    pitchIntervalRef.current = setInterval(() => {
      analyser.getFloatTimeDomainData(buffer);
      const freq = autocorrelate(buffer, audioCtx.sampleRate);
      if (freq !== null) setContour((prev) => [...prev, freq]);
    }, 100);

    // Also record the audio itself, not just the contour, so the elder's
    // actual hummed sound is preserved, not just an abstract pitch trace.
    const recorder = new MediaRecorder(streamRef.current);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.start();
    mediaRecorderRef.current = recorder;
  }, []);

  const startFullRecording = useCallback(() => {
    if (!streamRef.current) return;
    setMode('record');
    setIsCapturing(true);
    const recorder = new MediaRecorder(streamRef.current);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.start();
    mediaRecorderRef.current = recorder;
  }, []);

  const stopCapture = useCallback(() => {
    if (pitchIntervalRef.current) clearInterval(pitchIntervalRef.current);
    pitchIntervalRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current.stop();
    }
    setIsCapturing(false);
  }, []);

  const handleProceedToProvenance = () => {
    setShowProvenanceForm(true);
  };

  const handleProvenanceSave = (provenance: RootsProvenanceRecord) => {
    onComplete?.({ mode, audioUrl, contour, provenance });
  };

  const resetCapture = () => {
    setMode(null);
    setAudioUrl(null);
    setContour([]);
  };

  if (showProvenanceForm) {
    return (
      <div className="elder-capture">
        <p className="elder-capture__provenance-lead">
          Before this is archived — let&rsquo;s make sure it&rsquo;s properly attributed.
        </p>
        <ProvenanceRecord onSave={handleProvenanceSave} />
      </div>
    );
  }

  return (
    <div className="elder-capture">
      <header className="elder-capture__header">
        <h2>Bring what you carry</h2>
        <p className="elder-capture__subtitle">
          A melody you hum. A story in your own words. Nothing has to stay unheard.
        </p>
      </header>

      {!permissionGranted && (
        <>
          <button type="button" className="elder-capture__permission-btn" onClick={requestMic}>
            🎤 Allow microphone
          </button>
          {permissionError && <p className="elder-capture__error">{permissionError}</p>}
        </>
      )}

      {permissionGranted && mode === null && (
        <div className="elder-capture__mode-choice">
          <button type="button" className="elder-capture__mode-btn" onClick={startHumCapture}>
            🎵 Hum a melody
          </button>
          <button type="button" className="elder-capture__mode-btn" onClick={startFullRecording}>
            🎙️ Record a memory
          </button>
        </div>
      )}

      {mode !== null && (
        <div className="elder-capture__active">
          {isCapturing && (
            <>
              <p className="elder-capture__recording-indicator">● Recording…</p>
              {mode === 'hum' && contour.length > 0 && (
                <div className="elder-capture__contour">
                  {contour.map((freq, i) => (
                    <span
                      key={i}
                      className="elder-capture__contour-dot"
                      style={{ bottom: `${Math.min(100, Math.max(0, ((freq - 80) / 400) * 100))}%` }}
                    />
                  ))}
                </div>
              )}
              <button type="button" className="elder-capture__stop-btn" onClick={stopCapture}>
                ■ Stop
              </button>
            </>
          )}

          {!isCapturing && audioUrl && (
            <>
              <audio src={audioUrl} controls className="elder-capture__audio" />
              <div className="elder-capture__actions">
                <button type="button" className="elder-capture__redo-btn" onClick={resetCapture}>
                  Start again
                </button>
                <button
                  type="button"
                  className="elder-capture__proceed-btn"
                  onClick={handleProceedToProvenance}
                >
                  Archive this properly →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ElderCapture;
