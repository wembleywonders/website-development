// ProductionRoom.tsx
// The third room — turning concept (rhythm + feel) into a played idea.
// Tabs: Keyboard (built) → Rhythm Pad (built) → Mixer (not yet built)
//
// BUILD NOTE (27 June 2026): RhythmPad.tsx and MixerStrip.tsx are empty
// files. This room renders an honest "not yet built" state for those two
// tabs rather than fake interactivity — see ProductionRoom.css
// .production-room__not-built. Do not wire a fake interactive panel here;
// build the real RhythmPad/MixerStrip components first, then this room
// picks them up by replacing the placeholder block in each tab panel.
//
// This is a self-contained room, same shape as ConceptRoom — it does not
// assume how sandbox.tsx mounts it. Wiring this into sandbox.tsx in place
// of the current inline Keyboard80 usage is a separate decision, not done
// here.
//
// UPDATE (this session): RhythmPad is now real — its placeholder has been
// replaced below. MixerStrip is still empty; its placeholder remains.
//
// DEVIATION FROM RECOVERED VERSION: the original imported useLearnerHelp
// and HelpPanel. ConceptRoom.tsx is confirmed to import that same hook
// without ever calling it — a real bug. Since the body that would show
// whether ProductionRoom called it correctly wasn't recovered, that
// integration is left out here rather than risk copying the bug forward
// a second time. Add it back once useLearnerHelp's real signature and
// correct usage are confirmed.

import React, { useState } from 'react';
import Keyboard80 from './Keyboard80';
import RhythmPad from './RhythmPad';
import './ProductionRoom.css';

export type ProductionTab = 'keyboard' | 'rhythm' | 'mixer';

export interface ProductionContextTag {
  icon?: string;
  label: string;
  variant?: 'default' | 'highlight';
}

export interface ProductionRoomState {
  rootNote: string;
  scaleName: string;
  rhythmPattern: boolean[] | null;
  rhythmBpm: number;
}

interface ProductionRoomProps {
  rootNote?: string;
  scaleName?: string;
  rhythmPattern?: boolean[];
  rhythmBpm?: number;
  contextTags?: ProductionContextTag[];
  productionComplete?: boolean;
  onSaveProduction?: (state: ProductionRoomState) => void;
}

const TABS: { key: ProductionTab; label: string }[] = [
  { key: 'keyboard', label: 'Keyboard' },
  { key: 'rhythm', label: 'Rhythm Pad' },
  { key: 'mixer', label: 'Mixer' },
];

const ProductionRoom: React.FC<ProductionRoomProps> = ({
  rootNote = 'C',
  scaleName = 'pentatonic',
  rhythmPattern: initialRhythmPattern,
  rhythmBpm: initialRhythmBpm = 100,
  contextTags = [],
  productionComplete = false,
  onSaveProduction,
}) => {
  const [activeTab, setActiveTab] = useState<ProductionTab>('keyboard');
  const [rhythmPattern, setRhythmPattern] = useState<boolean[] | null>(
    initialRhythmPattern ?? null
  );
  const [rhythmBpm, setRhythmBpm] = useState<number>(initialRhythmBpm);

  const handleRhythmChange = (pattern: boolean[], bpm: number) => {
    setRhythmPattern(pattern);
    setRhythmBpm(bpm);
  };

  const handleSave = () => {
    onSaveProduction?.({
      rootNote,
      scaleName,
      rhythmPattern,
      rhythmBpm,
    });
  };

  return (
    <div className="production-room">
      <header className="production-room__header">
        <h2>Production Room</h2>
        <p className="production-room__subtitle">
          Play it. Loop it. Mix it. No wrong notes, no wrong beats.
        </p>

        {contextTags.length > 0 && (
          <div className="production-room__context-tags">
            {contextTags.map((tag, i) => (
              <span
                key={i}
                className={`production-room__context-tag${
                  tag.variant === 'highlight' ? ' production-room__context-tag--highlight' : ''
                }`}
              >
                {tag.icon && <span aria-hidden="true">{tag.icon} </span>}
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </header>

      <nav className="production-room__tabs" role="tablist" aria-label="Production tool">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`production-room__tab${activeTab === tab.key ? ' production-room__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="production-room__panel">
        {activeTab === 'keyboard' && (
          <Keyboard80 rootNote={rootNote} scaleName={scaleName} />
        )}

        {activeTab === 'rhythm' && (
          <RhythmPad bpm={rhythmBpm} onChange={handleRhythmChange} />
        )}

        {activeTab === 'mixer' && (
          <div className="production-room__not-built">
            <p>Mixer isn&rsquo;t built yet.</p>
            <p className="production-room__not-built-sub">
              This tab will let you balance levels once you&rsquo;ve got parts
              recorded. For now, focus on getting the idea down.
            </p>
          </div>
        )}
      </div>

      <div className="production-room__actions">
        <button
          type="button"
          className="production-room__save-btn"
          onClick={handleSave}
          disabled={productionComplete}
        >
          {productionComplete ? 'Saved' : 'Save this production →'}
        </button>
      </div>
    </div>
  );
};

export default ProductionRoom;
