// src/components/sandboxes/rayd-yo/BroadcastStudio.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wembley Wonders CIC · Rayd-yo BroadcastStudio (v1, self-contained)
//
// Confirmed missing dependencies (YouTubePanel.tsx, raydyo-videos.ts) meant
// building the later v2/v3 rebuild wasn't safe tonight — this is the
// original, self-contained version: mic/music/master channel strips,
// Web Audio synth bed, three FX sounds, MediaRecorder capture-to-download.
// No cross-programme engine import — self-contained Web Audio, same
// pattern as ElderCapture/HumCapture staying local to their own sandbox.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback, useEffect } from 'react';
import './BroadcastStudio.css';

type ChannelId = 'mic' | 'music';

interface ChannelState {
  gain: number; // 0–1
  muted: boolean;
  levels: number[]; // 12-segment meter, each 0–1
}

const METER_SEGMENTS = 12;

const BroadcastStudio: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showName, setShowName] = useState('');
  const [inStudio, setInStudio] = useState(false);

  const [micChannel, setMicChannel] = useState<ChannelState>({ gain: 0.8, muted: false, levels: Array(METER_SEGMENTS).fill(0) });
  const [musicChannel, setMusicChannel] = useState<ChannelState>({ gain: 0.6, muted: false, levels: Array(METER_SEGMENTS).fill(0) });
  const [masterLevels, setMasterLevels] = useState<number[]>(Array(METER_SEGMENTS).fill(0));
  const [masterGainValue, setMasterGainValue] = useState(0.85);

  const [musicSource, setMusicSource] = useState<'none' | 'synth' | 'track'>('none');
  const [trackFileName, setTrackFileName] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micGainNodeRef = useRef<GainNode | null>(null);
  const musicGainNodeRef = useRef<GainNode | null>(null);
  const masterGainNodeRef = useRef<GainNode | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const musicAnalyserRef = useRef<AnalyserNode | null>(null);
  const masterAnalyserRef = useRef<AnalyserNode | null>(null);

  const synthNodesRef = useRef<OscillatorNode[]>([]);
  const trackAudioElRef = useRef<HTMLAudioElement | null>(null);
  const trackSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordStartRef = useRef<number>(0);
  const meterRafRef = useRef<number | null>(null);

  // ── Setup ──────────────────────────────────────────────────────────────

  const requestMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setPermissionGranted(true);
    } catch {
      setPermissionError(
        'Microphone access was denied. Nothing here is sent anywhere — the audio never leaves this device unless you choose to download the recording. You can re-enable the mic in your browser\u2019s site settings and try again.'
      );
    }
  }, []);

  const enterStudio = useCallback(() => {
    if (!micStreamRef.current) return;

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const micSource = ctx.createMediaStreamSource(micStreamRef.current);
    const micGain = ctx.createGain();
    micGain.gain.value = micChannel.gain;
    const micAnalyser = ctx.createAnalyser();
    micAnalyser.fftSize = 256;
    micSource.connect(micGain);
    micGain.connect(micAnalyser);
    micGainNodeRef.current = micGain;
    micAnalyserRef.current = micAnalyser;

    const musicGain = ctx.createGain();
    musicGain.gain.value = musicChannel.gain;
    const musicAnalyser = ctx.createAnalyser();
    musicAnalyser.fftSize = 256;
    musicGain.connect(musicAnalyser);
    musicGainNodeRef.current = musicGain;
    musicAnalyserRef.current = musicAnalyser;

    const masterGain = ctx.createGain();
    masterGain.gain.value = masterGainValue;
    const masterAnalyser = ctx.createAnalyser();
    masterAnalyser.fftSize = 256;
    micGain.connect(masterGain);
    musicGain.connect(masterGain);
    masterGain.connect(masterAnalyser);
    masterGain.connect(ctx.destination);
    masterGainNodeRef.current = masterGain;
    masterAnalyserRef.current = masterAnalyser;

    setInStudio(true);
  }, [micChannel.gain, musicChannel.gain, masterGainValue]);

  // ── Level metering ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!inStudio) return;

    const readLevel = (analyser: AnalyserNode | null): number[] => {
      if (!analyser) return Array(METER_SEGMENTS).fill(0);
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(data);
      let rms = 0;
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128;
        rms += v * v;
      }
      rms = Math.sqrt(rms / data.length);
      const lit = Math.round(rms * METER_SEGMENTS * 3); // scaled for visibility
      return Array.from({ length: METER_SEGMENTS }, (_, i) => (i < lit ? 1 : 0));
    };

    const tick = () => {
      setMicChannel((prev) => ({ ...prev, levels: readLevel(micAnalyserRef.current) }));
      setMusicChannel((prev) => ({ ...prev, levels: readLevel(musicAnalyserRef.current) }));
      setMasterLevels(readLevel(masterAnalyserRef.current));
      meterRafRef.current = requestAnimationFrame(tick);
    };
    meterRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (meterRafRef.current) cancelAnimationFrame(meterRafRef.current);
    };
  }, [inStudio]);

  // ── Channel controls ───────────────────────────────────────────────────

  const setChannelGain = (channel: ChannelId, value: number) => {
    const node = channel === 'mic' ? micGainNodeRef.current : musicGainNodeRef.current;
    if (node) node.gain.value = value;
    if (channel === 'mic') setMicChannel((prev) => ({ ...prev, gain: value }));
    else setMusicChannel((prev) => ({ ...prev, gain: value }));
  };

  const toggleMute = (channel: ChannelId) => {
    const node = channel === 'mic' ? micGainNodeRef.current : musicGainNodeRef.current;
    const state = channel === 'mic' ? micChannel : musicChannel;
    const nextMuted = !state.muted;
    if (node) node.gain.value = nextMuted ? 0 : state.gain;
    if (channel === 'mic') setMicChannel((prev) => ({ ...prev, muted: nextMuted }));
    else setMusicChannel((prev) => ({ ...prev, muted: nextMuted }));
  };

  const setMasterGain = (value: number) => {
    if (masterGainNodeRef.current) masterGainNodeRef.current.gain.value = value;
    setMasterGainValue(value);
  };

  // ── Synth bed (ambient C major pad, slow tremolo) ──────────────────────

  const startSynthBed = () => {
    const ctx = audioCtxRef.current;
    const musicGain = musicGainNodeRef.current;
    if (!ctx || !musicGain) return;
    stopMusicSource();

    const notes = [261.63, 329.63, 392.0]; // C4, E4, G4
    const nodes: OscillatorNode[] = [];

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const tremolo = ctx.createGain();
      tremolo.gain.value = 0.5;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15; // slow tremolo
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.3;
      lfo.connect(lfoGain);
      lfoGain.connect(tremolo.gain);

      osc.connect(tremolo);
      tremolo.connect(musicGain);
      osc.start();
      lfo.start();
      nodes.push(osc, lfo);
    });

    synthNodesRef.current = nodes;
    setMusicSource('synth');
  };

  const stopMusicSource = () => {
    synthNodesRef.current.forEach((n) => {
      try { n.stop(); } catch { /* already stopped */ }
    });
    synthNodesRef.current = [];
    if (trackAudioElRef.current) {
      trackAudioElRef.current.pause();
      trackAudioElRef.current = null;
    }
    trackSourceRef.current?.disconnect();
    trackSourceRef.current = null;
    setMusicSource('none');
    setTrackFileName(null);
  };

  const loadTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const ctx = audioCtxRef.current;
    const musicGain = musicGainNodeRef.current;
    if (!file || !ctx || !musicGain) return;
    stopMusicSource();

    const url = URL.createObjectURL(file);
    const audioEl = new Audio(url);
    audioEl.loop = true;
    const source = ctx.createMediaElementSource(audioEl);
    source.connect(musicGain);
    audioEl.play();

    trackAudioElRef.current = audioEl;
    trackSourceRef.current = source;
    setTrackFileName(file.name);
    setMusicSource('track');
  };

  // ── FX (one-shot, synthesised) ──────────────────────────────────────────

  const playSting = () => {
    const ctx = audioCtxRef.current;
    const master = masterGainNodeRef.current;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.45);
  };

  const playWhoosh = () => {
    const ctx = audioCtxRef.current;
    const master = masterGainNodeRef.current;
    if (!ctx || !master) return;
    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    const now = ctx.currentTime;
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 0.5);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(now);
    noise.stop(now + 0.6);
  };

  const playJingle = () => {
    const ctx = audioCtxRef.current;
    const master = masterGainNodeRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const gain = ctx.createGain();
      const t = now + i * 0.15;
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(master);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  };

  // ── Record / download ───────────────────────────────────────────────────

  const startRecording = () => {
    const ctx = audioCtxRef.current;
    const master = masterGainNodeRef.current;
    if (!ctx || !master) return;
    const dest = ctx.createMediaStreamDestination();
    master.connect(dest);

    const recorder = new MediaRecorder(dest.stream);
    recordedChunksRef.current = [];
    recorder.ondataavailable = (e) => recordedChunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
      setRecordedUrl(URL.createObjectURL(blob));
      setRecordedDuration((Date.now() - recordStartRef.current) / 1000);
    };
    recorder.start();
    recordStartRef.current = Date.now();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setRecordedUrl(null);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const downloadFilename = () => {
    const date = new Date().toISOString().slice(0, 10);
    const safeShow = (showName || 'rayd-yo-session').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    return `${safeShow}-${date}.webm`;
  };

  // ── Render ───────────────────────────────────────────────────────────────

  if (!permissionGranted) {
    return (
      <div className="broadcast-studio broadcast-studio--preflight">
        <h2>Before you go live</h2>
        <p className="broadcast-studio__explain">
          This studio uses your microphone. Nothing leaves this device unless
          you choose to download your recording at the end — there&rsquo;s no
          live streaming here, no upload happening in the background.
        </p>
        <label className="broadcast-studio__show-name-label">
          Show name
          <input
            type="text"
            value={showName}
            onChange={(e) => setShowName(e.target.value)}
            placeholder="e.g. Mother Tongue"
          />
        </label>
        <button type="button" className="broadcast-studio__permission-btn" onClick={requestMic}>
          🎤 Allow microphone
        </button>
        {permissionError && <p className="broadcast-studio__error">{permissionError}</p>}
      </div>
    );
  }

  if (!inStudio) {
    return (
      <div className="broadcast-studio broadcast-studio--preflight">
        <h2>Ready, {showName || 'presenter'}?</h2>
        <button type="button" className="broadcast-studio__enter-btn" onClick={enterStudio}>
          Enter the studio →
        </button>
      </div>
    );
  }

  return (
    <div className="broadcast-studio">
      <header className="broadcast-studio__header">
        <h2>{showName || 'Untitled show'}</h2>
      </header>

      <div className="broadcast-studio__strips">
        {/* Mic strip */}
        <div className="broadcast-studio__strip">
          <h3>Mic</h3>
          <div className="broadcast-studio__meter">
            {micChannel.levels.map((lit, i) => (
              <span key={i} className={`broadcast-studio__meter-seg${lit ? ' broadcast-studio__meter-seg--lit-mic' : ''}`} />
            ))}
          </div>
          <input
            type="range" min={0} max={1} step={0.01}
            value={micChannel.gain}
            onChange={(e) => setChannelGain('mic', Number(e.target.value))}
            orient="vertical"
          />
          <button type="button" onClick={() => toggleMute('mic')}>
            {micChannel.muted ? 'Muted' : 'Live'}
          </button>
        </div>

        {/* Music strip */}
        <div className="broadcast-studio__strip">
          <h3>Music</h3>
          <div className="broadcast-studio__meter">
            {musicChannel.levels.map((lit, i) => (
              <span key={i} className={`broadcast-studio__meter-seg${lit ? ' broadcast-studio__meter-seg--lit-music' : ''}`} />
            ))}
          </div>
          <input
            type="range" min={0} max={1} step={0.01}
            value={musicChannel.gain}
            onChange={(e) => setChannelGain('music', Number(e.target.value))}
            orient="vertical"
          />
          <button type="button" onClick={() => toggleMute('music')}>
            {musicChannel.muted ? 'Muted' : 'Live'}
          </button>
          <button type="button" onClick={startSynthBed} disabled={musicSource === 'synth'}>
            Synth Bed
          </button>
          <label className="broadcast-studio__load-track">
            Load Track
            <input type="file" accept="audio/*" onChange={loadTrack} />
          </label>
          {trackFileName && <p className="broadcast-studio__track-name">{trackFileName}</p>}
        </div>

        {/* Master strip */}
        <div className="broadcast-studio__strip">
          <h3>Master</h3>
          <div className="broadcast-studio__meter">
            {masterLevels.map((lit, i) => (
              <span key={i} className={`broadcast-studio__meter-seg${lit ? ' broadcast-studio__meter-seg--lit-master' : ''}`} />
            ))}
          </div>
          <input
            type="range" min={0} max={1} step={0.01}
            value={masterGainValue}
            onChange={(e) => setMasterGain(Number(e.target.value))}
            orient="vertical"
          />
          <span className="broadcast-studio__master-status">{isRecording ? '● REC' : 'Ready'}</span>
        </div>
      </div>

      <div className="broadcast-studio__fx">
        <button type="button" onClick={playSting}>Sting</button>
        <button type="button" onClick={playWhoosh}>Whoosh</button>
        <button type="button" onClick={playJingle}>Jingle</button>
      </div>

      <div className="broadcast-studio__record">
        {!isRecording && !recordedUrl && (
          <button type="button" className="broadcast-studio__record-btn" onClick={startRecording}>
            ● Start recording
          </button>
        )}
        {isRecording && (
          <button type="button" className="broadcast-studio__stop-btn" onClick={stopRecording}>
            ■ Stop recording
          </button>
        )}
        {recordedUrl && (
          <div className="broadcast-studio__playback">
            <audio src={recordedUrl} controls />
            <p>{Math.round(recordedDuration)}s recorded</p>
            <a href={recordedUrl} download={downloadFilename()} className="broadcast-studio__download-btn">
              ⬇ Download
            </a>
          </div>
        )}
      </div>

      <p className="broadcast-studio__contact">
        Questions: <a href="mailto:raydyo@wembleywonders.org">raydyo@wembleywonders.org</a>
      </p>
    </div>
  );
};

export default BroadcastStudio;
