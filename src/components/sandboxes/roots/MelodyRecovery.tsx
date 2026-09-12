import React, { useState, useEffect, useCallback } from 'react';
import ProvenanceRecord, { RootsProvenanceRecord } from './ProvenanceRecord';
import './MelodyRecovery.css';

/**
 * MelodyRecovery.tsx — "Archive Recovery": rescuing heritage melodies and
 * old recordings before they're lost, or before they go to an AI tool
 * without their provenance ever being captured.
 *
 * Two entry paths, confirmed on record:
 *  1. Handed off from Trubble n Bass via the 'tnb-to-roots' journey bridge
 *     (triggerContext: 'elder-melody-captured'), read from sessionStorage
 *     using the exact key JourneyBridge.tsx writes to.
 *  2. A direct upload — an elder's own old recording, brought straight
 *     into Roots without ever passing through Trubble n Bass.
 *
 * Either path ends the same way: full attribution via the real
 * ProvenanceRecord component (not a second, duplicate provenance form).
 */

interface IncomingBridgeData {
  melodyData?: unknown;
  provenanceNote?: string;
  style?: string;
}

export type RecoverySource = 'trubble-n-bass' | 'direct-upload';

export interface RecoveredMelody {
  source: RecoverySource;
  audioUrl: string | null;
  styleHint?: string;
  suggestedNote?: string;
  provenance: RootsProvenanceRecord;
}

export interface MelodyRecoveryProps {
  onComplete?: (recovered: RecoveredMelody) => void;
}

const BRIDGE_STORAGE_KEY = 'journey-bridge:tnb-to-roots';

const MelodyRecovery: React.FC<MelodyRecoveryProps> = ({ onComplete }) => {
  const [source, setSource] = useState<RecoverySource | null>(null);
  const [incomingData, setIncomingData] = useState<IncomingBridgeData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [showProvenanceForm, setShowProvenanceForm] = useState(false);

  // Check for a handoff from Trubble n Bass on mount — same storage key
  // JourneyBridge.tsx writes to for the 'tnb-to-roots' bridge.
  useEffect(() => {
    const raw = sessionStorage.getItem(BRIDGE_STORAGE_KEY);
    if (raw) {
      try {
        const parsed: IncomingBridgeData = JSON.parse(raw);
        setIncomingData(parsed);
        setSource('trubble-n-bass');
        sessionStorage.removeItem(BRIDGE_STORAGE_KEY); // consume once
      } catch {
        // Malformed data — ignore rather than crash the room.
      }
    }
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedUrl(URL.createObjectURL(file));
    setSource('direct-upload');
  }, []);

  const handleStartDirectUpload = () => {
    setSource('direct-upload');
  };

  const handleProceedToProvenance = () => {
    setShowProvenanceForm(true);
  };

  const handleProvenanceSave = (provenance: RootsProvenanceRecord) => {
    onComplete?.({
      source: source ?? 'direct-upload',
      audioUrl: source === 'trubble-n-bass' ? null : uploadedUrl,
      styleHint: incomingData?.style,
      suggestedNote: incomingData?.provenanceNote,
      provenance,
    });
  };

  if (showProvenanceForm) {
    return (
      <div className="melody-recovery">
        <p className="melody-recovery__provenance-lead">
          Now let&rsquo;s make sure this melody is properly attributed.
        </p>
        <ProvenanceRecord onSave={handleProvenanceSave} />
      </div>
    );
  }

  return (
    <div className="melody-recovery">
      <header className="melody-recovery__header">
        <h2>Archive Recovery</h2>
        <p className="melody-recovery__subtitle">
          A melody, a song, an old recording — nothing has to stay unheard.
        </p>
      </header>

      {source === 'trubble-n-bass' && incomingData && (
        <div className="melody-recovery__incoming">
          <p className="melody-recovery__incoming-label">Arrived from Trubble n Bass</p>
          {incomingData.style && (
            <p className="melody-recovery__incoming-detail">Style: {incomingData.style}</p>
          )}
          {incomingData.provenanceNote && (
            <p className="melody-recovery__incoming-note">
              &ldquo;{incomingData.provenanceNote}&rdquo;
            </p>
          )}
          <button
            type="button"
            className="melody-recovery__proceed-btn"
            onClick={handleProceedToProvenance}
          >
            Archive this melody properly →
          </button>
        </div>
      )}

      {source === null && (
        <div className="melody-recovery__entry-choice">
          <p className="melody-recovery__entry-hint">
            Have an old recording — a song someone wrote, a tape, a voice note
            of an elder singing? Bring it here first, before it goes anywhere else.
          </p>
          <button
            type="button"
            className="melody-recovery__upload-prompt-btn"
            onClick={handleStartDirectUpload}
          >
            📼 I have a recording to bring in
          </button>
        </div>
      )}

      {source === 'direct-upload' && (
        <div className="melody-recovery__upload">
          {!uploadedFile && (
            <label className="melody-recovery__file-input-label">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="melody-recovery__file-input"
              />
              Choose an audio file
            </label>
          )}

          {uploadedFile && uploadedUrl && (
            <div className="melody-recovery__preview">
              <p className="melody-recovery__file-name">{uploadedFile.name}</p>
              <audio src={uploadedUrl} controls className="melody-recovery__audio" />
              <button
                type="button"
                className="melody-recovery__proceed-btn"
                onClick={handleProceedToProvenance}
              >
                Archive this recording properly →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MelodyRecovery;
