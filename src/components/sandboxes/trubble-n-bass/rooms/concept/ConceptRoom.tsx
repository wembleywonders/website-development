// ConceptRoom.tsx
// The entry room — where the creator arrives with what they have
// Tap → Feel → Arrange → Production
// No wrong answers. No technical vocabulary required.

import React, { useState } from 'react';
import TapRhythm from './TapRhythm';
import FeelSelector from './FeelSelector';
import ArrangeRoom from './ArrangeRoom';
import { StyleProfile } from '../../engine/StyleProfiles';
import './ConceptRoom.css';
import { useLearnerHelp } from '../../../../../hooks/useLearnerHelp';
import HelpPanel from '../../../../learnerHelp/HelpPanel';

export type ConceptInput = 'tap' | 'feel' | 'arrange' | 'lyric';

export interface ConceptRoomState {
  rhythm: { pattern: boolean[]; bpm: number } | null;
  style: StyleProfile | null;
  melody: (string | null)[];
  lyric: string;
}

interface ConceptRoomProps {
  onReadyForProduction?: (state: ConceptRoomState) => void;
  initialLyric?: string;
}

const ConceptRoom: React.FC<ConceptRoomProps> = ({
  onReadyForProduction,
  initialLyric = '',
}) => {
  const [rhythm, setRhythm] = useState<{ pattern: boolean[]; bpm: number } | null>(null);
  const [style, setStyle] = useState<StyleProfile | null>(null);
  const [melody, setMelody] = useState<(string | null)[]>([]);
  const [lyric, setLyric] = useState(initialLyric);
  const [activeTab, setActiveTab] = useState<ConceptInput>('tap');

  const hasRhythm = !!rhythm;
  const hasStyle = !!style;
  const hasLyric = lyric.trim().length > 3;
  const hasMelody = melody.some(Boolean);
  const canArrange = hasRhythm && hasStyle;
  const canProceed = hasRhythm || hasStyle;

  const handlePatternReady = (pattern: boolean[], bpm: number) => {
    setRhythm({ pattern, bpm });
    // Auto-advance to Feel if not already selected
    if (!hasStyle) setActiveTab('feel');
  };

  const handleStyleSelect = (profile: StyleProfile) => {
    setStyle(profile);
    // Auto-advance to Arrange if rhythm is ready
    if (hasRhythm) setActiveTab('arrange');
  };

  const handleArrangeConfirm = (melodyPattern: (string | null)[]) => {
    setMelody(melodyPattern);
    if (onReadyForProduction) {
      onReadyForProduction({
        rhythm: rhythm!,
        style: style!,
        melody: melodyPattern,
        lyric,
      });
    }
  };

  const handleManualProceed = () => {
    if (canProceed && onReadyForProduction) {
      onReadyForProduction({ rhythm, style, melody, lyric });
    }
  };

  const TABS = [
    { id: 'tap' as ConceptInput,     icon: '♩', label: 'Tap',     done: hasRhythm,  available: true },
    { id: 'feel' as ConceptInput,    icon: '◈', label: 'Feel',    done: hasStyle,   available: true },
    { id: 'arrange' as ConceptInput, icon: '▦', label: 'Arrange', done: hasMelody,  available: canArrange },
    { id: 'lyric' as ConceptInput,   icon: '✦', label: 'Words',   done: hasLyric,   available: true },
  ];

  return (
    <div className="concept-room">
      <div className="concept-room__intro">
        <h2 className="concept-room__heading">What have you got?</h2>
        <p className="concept-room__lead">
          You do not need to know music theory. You do not need an instrument.
          Just start with what you have — a rhythm, a feeling, a line of words.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="concept-room__progress">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={[
              'concept-room__tab',
              activeTab === tab.id ? 'concept-room__tab--active' : '',
              tab.done ? 'concept-room__tab--done' : '',
              !tab.available ? 'concept-room__tab--locked' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => tab.available && setActiveTab(tab.id)}
            disabled={!tab.available}
            title={!tab.available ? 'Tap a rhythm and pick a feel first' : ''}
          >
            <span className="concept-room__tab-icon">{tab.done ? '✓' : tab.icon}</span>
            <span className="concept-room__tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="concept-room__panel">

        {activeTab === 'tap' && (
          <TapRhythm
            onPatternReady={handlePatternReady}
            onBpmChange={(bpm) => setRhythm(r => r ? { ...r, bpm } : null)}
            styleProfile={style}
          />
        )}

        {activeTab === 'feel' && (
          <FeelSelector
            selected={style?.id}
            onSelect={handleStyleSelect}
            rhythmPattern={rhythm?.pattern}
            rhythmBpm={rhythm?.bpm}
          />
        )}

        {activeTab === 'arrange' && canArrange && (
          <ArrangeRoom
            rhythmPattern={rhythm!.pattern}
            rhythmBpm={rhythm!.bpm}
            styleProfile={style!}
            onConfirm={handleArrangeConfirm}
          />
        )}

        {activeTab === 'lyric' && (
          <div className="concept-room__lyric-panel">
            <h3 className="concept-room__lyric-title">Your words</h3>
            <p className="concept-room__lyric-hint">
              A line, a phrase, a title, a hook — whatever you have.
              The rhythm of how you speak it becomes part of the music.
            </p>
            <textarea
              className="concept-room__lyric-input"
              value={lyric}
              onChange={e => setLyric(e.target.value)}
              placeholder="Type anything — a line, a title, a feeling in words..."
              rows={5}
            />
            {hasLyric && (
              <p className="concept-room__lyric-syllables">
                {lyric.trim().split(/\s+/).length} words ·{' '}
                {lyric.replace(/[^aeiouAEIOU]/g, '').length} syllables (approx)
              </p>
            )}
          </div>
        )}
      </div>

      {/* What you have so far */}
      {(hasRhythm || hasStyle || hasLyric || hasMelody) && (
        <div className="concept-room__summary">
          <div className="concept-room__summary-label">What you have so far</div>
          <div className="concept-room__summary-items">
            {hasRhythm && (
              <div className="concept-room__summary-item">
                <span className="concept-room__summary-icon">♩</span>
                <span>{rhythm!.bpm} BPM · {rhythm!.pattern.filter(Boolean).length} hits</span>
              </div>
            )}
            {hasStyle && (
              <div className="concept-room__summary-item">
                <span className="concept-room__summary-icon">◈</span>
                <span>{style!.name} · {style!.key} {style!.scale}</span>
              </div>
            )}
            {hasMelody && (
              <div className="concept-room__summary-item">
                <span className="concept-room__summary-icon">▦</span>
                <span>{melody.filter(Boolean).length} melody notes arranged</span>
              </div>
            )}
            {hasLyric && (
              <div className="concept-room__summary-item">
                <span className="concept-room__summary-icon">✦</span>
                <span>{lyric.trim().slice(0, 40)}{lyric.length > 40 ? '...' : ''}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Arrange CTA — appears when both rhythm and feel are ready */}
      {canArrange && !hasMelody && activeTab !== 'arrange' && (
        <div className="concept-room__arrange-cta">
          <button
            className="concept-room__arrange-btn"
            onClick={() => setActiveTab('arrange')}
          >
            ▦ Put rhythm and melody together →
          </button>
        </div>
      )}

      {/* Proceed without arrangement */}
      {canProceed && !canArrange && (
        <div className="concept-room__proceed">
          <button className="concept-room__proceed-btn" onClick={handleManualProceed}>
            Take this to the Production Room →
          </button>
          <p className="concept-room__proceed-hint">
            {!hasRhythm && 'Add a rhythm above to unlock the full journey.'}
            {hasRhythm && !hasStyle && 'Pick a feel to unlock the Arrange step.'}
          </p>
        </div>
      )}
      {/* Contextual help panel */}
      {activeHelp && (
        <HelpPanel
          help={activeHelp}
          onDismiss={dismissHelp}
          onOpenTutorial={openTutorialAt}
        />
      )}
    </div>
  );
};

export default ConceptRoom;
export type { ConceptRoomState };
