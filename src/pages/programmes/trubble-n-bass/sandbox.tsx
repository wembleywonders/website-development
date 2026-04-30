/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConceptRoom, { ConceptRoomState } from '../../../components/sandboxes/trubble-n-bass/rooms/concept/ConceptRoom';
import Keyboard80 from '../../../components/sandboxes/trubble-n-bass/rooms/production/Keyboard80';
import MayaMusicToolbar from '../../../components/sandboxes/trubble-n-bass/maya-toolbar/MayaMusicToolbar';
import { MayaWelcome, useMayaStore } from '../../../maya';
import './sandbox.css';

type SandboxStage = 'concept' | 'production';

type RoomState = 'locked' | 'current' | 'complete';

const BRING_ITEMS = [
  { icon: '♩', input: 'A rhythm you tap on the desk', outcome: 'Becomes your beat — BPM locked, 16-step pattern ready' },
  { icon: '♪', input: 'A melody you hum or sing', outcome: 'Caught by the mic, played back in your chosen scale' },
  { icon: '✦', input: 'A line, a title, a feeling in words', outcome: 'The rhythm of your words becomes the musical rhythm' },
  { icon: '◈', input: 'A tradition you grew up hearing', outcome: 'Nine cultural feels — Afrobeats to Gospel to Grime' },
  { icon: '♫', input: 'Notes you find on a keyboard', outcome: 'Scale-locked — every key you press sounds right' },
  { icon: '◉', input: 'Nothing but a feeling', outcome: 'Describe it. Maya will suggest where to start' },
];

const DESTINATION_ITEMS = [
  { icon: '🎵', line: 'A complete track — your name on it, your sound in it' },
  { icon: '💰', line: '55% of every sale. Yours. Directly. Always.' },
  { icon: '🛒', line: 'Listed on the Wembley Wonders Cyberstore — your music as a product' },
  { icon: '📻', line: 'Broadcast on Rayd-yo — community radio, Brent\'s own station' },
  { icon: '📜', line: 'Provenance recorded — your name attached to what you made' },
  { icon: '🎓', line: 'ILP milestone earned — evidence of creative and commercial skill' },
];

const TrubbleNBassSandbox: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [stage, setStage] = useState<SandboxStage>(
    (searchParams.get('room') as SandboxStage) || 'concept'
  );
  const [conceptState, setConceptState] = useState<ConceptRoomState | null>(null);
  const [conceptComplete, setConceptComplete] = useState(false);
  const [productionComplete, setProductionComplete] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const { trackEvent } = useMayaStore();

  const handleConceptReady = (state: ConceptRoomState) => {
    setConceptState(state);
    setConceptComplete(true);
    setStage('production');
    trackEvent?.('tnb_concept_complete', {
      bpm: state.rhythm?.bpm,
      style: state.style?.id,
    });
  };

  // Room state logic
  const getRoomState = (room: SandboxStage): RoomState => {
    if (room === 'concept') {
      if (conceptComplete) return 'complete';
      return stage === 'concept' ? 'current' : 'locked';
    }
    if (room === 'production') {
      if (!conceptComplete) return 'locked';
      if (productionComplete) return 'complete';
      return stage === 'production' ? 'current' : 'locked';
    }
    return 'locked';
  };

  const advancedReady = conceptComplete && productionComplete;

  const ProStudio = advancedMode
    ? React.lazy(() => import('../../../components/sandboxes/trubble-n-bass/TrubbleNBassPro.jsx' as any))
    : null;

  if (advancedMode && ProStudio) {
    return (
      <div className="tnb-sandbox">
        <div className="tnb-sandbox__advanced-bar">
          <span className="tnb-sandbox__advanced-label">Advanced Mode — Pro Studio</span>
          <button className="tnb-sandbox__back-btn" onClick={() => setAdvancedMode(false)}>
            ← Back
          </button>
        </div>
        <React.Suspense fallback={<div className="tnb-sandbox__loading">Loading studio...</div>}>
          <ProStudio />
        </React.Suspense>
      </div>
    );
  }

  const rooms: { id: SandboxStage; label: string }[] = [
    { id: 'concept', label: 'Concept' },
    { id: 'production', label: 'Production' },
  ];

  return (
    <div className="tnb-sandbox">

      {/* Room navigation — red/amber/green */}
      <div className="tnb-sandbox__nav">
        <div className="tnb-sandbox__nav-rooms">
          {rooms.map((room, i) => {
            const state = getRoomState(room.id);
            const isActive = stage === room.id;
            const canClick = state !== 'locked';
            const prevComplete = i === 0 || getRoomState(rooms[i-1].id) === 'complete';

            return (
              <React.Fragment key={room.id}>
                <button
                  className={[
                    'tnb-sandbox__nav-room',
                    `tnb-sandbox__nav-room--${state}`,
                    isActive ? 'tnb-sandbox__nav-room--active' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => canClick && setStage(room.id)}
                  disabled={!canClick}
                  title={state === 'locked' ? 'Complete the previous room first' : ''}
                >
                  <span className="tnb-sandbox__nav-dot" />
                  <span className="tnb-sandbox__nav-label">{i + 1}. {room.label}</span>
                  {state === 'complete' && <span className="tnb-sandbox__nav-check">✓</span>}
                </button>
                {/* Progression arrow between rooms */}
                {i < rooms.length - 1 && (
                  <span className={`tnb-sandbox__nav-arrow${prevComplete ? ' tnb-sandbox__nav-arrow--lit' : ''}`}>
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Advanced mode — only amber when both rooms complete */}
        <button
          className={[
            'tnb-sandbox__advanced-link',
            advancedReady ? 'tnb-sandbox__advanced-link--ready' : '',
          ].filter(Boolean).join(' ')}
          onClick={() => advancedReady && setAdvancedMode(true)}
          disabled={!advancedReady}
          title={advancedReady ? 'Open the full pro studio' : 'Complete Concept and Production rooms first'}
        >
          {advancedReady ? 'Advanced mode →' : 'Advanced mode'}
        </button>
      </div>

      {/* Panel A — What can you bring in? */}
      {stage === 'concept' && !conceptComplete && (
        <div className="tnb-panel tnb-panel--bring">
          <h3 className="tnb-panel__title">What can you bring in?</h3>
          <p className="tnb-panel__lead">Everyone has something. The room is built to receive it.</p>
          <div className="tnb-panel__grid">
            {BRING_ITEMS.map((item, i) => (
              <div key={i} className="tnb-panel__item">
                <span className="tnb-panel__item-icon">{item.icon}</span>
                <div className="tnb-panel__item-body">
                  <div className="tnb-panel__item-input">{item.input}</div>
                  <div className="tnb-panel__item-outcome">{item.outcome}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Panel B — Where this goes */}
      {stage === 'concept' && !conceptComplete && (
        <div className="tnb-panel tnb-panel--destination">
          <h3 className="tnb-panel__title">Where this goes</h3>
          <p className="tnb-panel__lead">The creative act and the economic outcome are the same thing here.</p>
          <div className="tnb-panel__dest-list">
            {DESTINATION_ITEMS.map((item, i) => (
              <div key={i} className="tnb-panel__dest-item">
                <span className="tnb-panel__dest-icon">{item.icon}</span>
                <span className="tnb-panel__dest-line">{item.line}</span>
              </div>
            ))}
          </div>
          <div className="tnb-panel__dest-footer">
            <span className="tnb-panel__dest-split">55%</span>
            <span className="tnb-panel__dest-split-label">of every sale goes to you. Always. Non-negotiable.</span>
          </div>
        </div>
      )}

      {/* Active room */}
      <div className="tnb-sandbox__room">
        {stage === 'concept' && (
          <ConceptRoom
            onReadyForProduction={handleConceptReady}
            initialLyric={searchParams.get('lyric') || ''}
          />
        )}

        {stage === 'production' && conceptState && (
          <div className="tnb-sandbox__production">
            <div className="tnb-sandbox__production-header">
              <h2 className="tnb-sandbox__room-title">Production Room</h2>
              <div className="tnb-sandbox__session-context">
                {conceptState.rhythm && (
                  <span className="tnb-sandbox__ctx-tag">♩ {conceptState.rhythm.bpm} BPM</span>
                )}
                {conceptState.style && (
                  <span className="tnb-sandbox__ctx-tag">◈ {conceptState.style.name}</span>
                )}
              </div>
            </div>
            <Keyboard80
              rootNote={conceptState.style?.key || 'C'}
              scaleName={conceptState.style?.scale || 'pentatonic'}
            />
            {!productionComplete && (
              <div className="tnb-sandbox__production-proceed">
                <button
                  className="tnb-sandbox__proceed-btn"
                  onClick={() => setProductionComplete(true)}
                >
                  ✓ Save this production
                </button>
                <p className="tnb-sandbox__proceed-hint">
                  Save your production to unlock Advanced mode and the full release pipeline.
                </p>
              </div>
            )}
            {productionComplete && (
              <div className="tnb-sandbox__complete-banner">
                <span className="tnb-sandbox__complete-icon">✓</span>
                <span>Production saved. Advanced mode is now available.</span>
              </div>
            )}
          </div>
        )}

        {stage === 'production' && !conceptState && (
          <div className="tnb-sandbox__gate">
            <p className="tnb-sandbox__gate-text">
              Start in the Concept Room — tap a rhythm or pick a feel first.
            </p>
            <button className="tnb-sandbox__gate-btn" onClick={() => setStage('concept')}>
              Go to Concept Room
            </button>
          </div>
        )}
      </div>

      {/* Maya floating toolbar with avatar */}
      <MayaMusicToolbar
        currentStyle={conceptState?.style?.id}
        hasRhythm={!!conceptState?.rhythm}
        hasStyle={!!conceptState?.style}
        keyboardActive={stage === 'production'}
        roomComplete={conceptComplete || productionComplete}
      />
    </div>
  );
};

export default TrubbleNBassSandbox;
