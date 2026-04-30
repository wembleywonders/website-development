/**
 * EarningsInstrument
 * ==================
 * "You came here rich. This is what rich looks like in numbers."
 *
 * Compact mode  → Your Panel widget (collapsible, summary + one CTA)
 * Full mode     → TECHreneurs sandbox (all sliders, full Solomon panel)
 */

import React, { useState, useMemo, useCallback } from 'react';
import type {
  EarningsInstrumentProps,
  StreamSliderState,
  IncomeStream,
  EarningsProjection,
  SolomonAnnotation,
  PardnerState,
  StreamId,
} from '../../types/earningsInstrument';
import './EarningsInstrument.css';

const STREAMS: IncomeStream[] = [
  {
    id: 'repair-services', label: 'Repair Services', icon: '🔧',
    programme: 'STEMgeneers', rov: 'Neville', rovAvatar: '🔧', rovColour: '#10b981',
    unit: 'per job',
    rateMin: 10, rateMax: 120, rateStep: 5, rateDefault: 35,
    volumeMin: 0, volumeMax: 20, volumeStep: 1, volumeDefault: 4, active: true,
  },
  {
    id: 'workshop-facilitation', label: 'Workshop Facilitation', icon: '🎓',
    programme: 'Any', rov: 'Solomon', rovAvatar: '💼', rovColour: '#f59e0b',
    unit: 'per session',
    rateMin: 20, rateMax: 200, rateStep: 10, rateDefault: 60,
    volumeMin: 0, volumeMax: 12, volumeStep: 1, volumeDefault: 2, active: false,
  },
  {
    id: 'tutorial-kit-sales', label: 'Tutorial Kit Sales', icon: '📦',
    programme: 'Cyberstore', rov: 'Solomon', rovAvatar: '💼', rovColour: '#f59e0b',
    unit: 'per kit',
    rateMin: 5, rateMax: 80, rateStep: 5, rateDefault: 25,
    volumeMin: 0, volumeMax: 50, volumeStep: 1, volumeDefault: 5, active: false,
  },
  {
    id: 'music-releases', label: 'Music Releases', icon: '🎵',
    programme: 'Trubble n Bass', rov: 'Maxine', rovAvatar: '🎭', rovColour: '#7c3aed',
    unit: 'per release',
    rateMin: 10, rateMax: 500, rateStep: 10, rateDefault: 50,
    volumeMin: 0, volumeMax: 4, volumeStep: 1, volumeDefault: 1, active: false,
  },
  {
    id: 'content-creation', label: 'Content & Broadcasting', icon: '📻',
    programme: 'G-Tech Casters / Rayd-yo', rov: 'Tariq', rovAvatar: '🎬', rovColour: '#8b5cf6',
    unit: 'per episode',
    rateMin: 5, rateMax: 100, rateStep: 5, rateDefault: 20,
    volumeMin: 0, volumeMax: 16, volumeStep: 1, volumeDefault: 4, active: false,
  },
  {
    id: 'textile-sales', label: 'Textile & Fashion Sales', icon: '👠',
    programme: 'Silk Stilettos', rov: 'Adaeze', rovAvatar: '🎨', rovColour: '#db2777',
    unit: 'per item',
    rateMin: 10, rateMax: 300, rateStep: 10, rateDefault: 45,
    volumeMin: 0, volumeMax: 30, volumeStep: 1, volumeDefault: 6, active: false,
  },
  {
    id: 'food-products', label: 'Heritage Food Products', icon: '🍲',
    programme: "Auntie Anansi's Kitchen", rov: 'Esther', rovAvatar: '📚', rovColour: '#92400e',
    unit: 'per product',
    rateMin: 5, rateMax: 80, rateStep: 5, rateDefault: 18,
    volumeMin: 0, volumeMax: 60, volumeStep: 2, volumeDefault: 12, active: false,
  },
  {
    id: 'mentoring', label: 'Peer Mentoring', icon: '🤝',
    programme: 'Any', rov: 'Solomon', rovAvatar: '💼', rovColour: '#f59e0b',
    unit: 'per session',
    rateMin: 15, rateMax: 100, rateStep: 5, rateDefault: 30,
    volumeMin: 0, volumeMax: 12, volumeStep: 1, volumeDefault: 2, active: false,
  },
];

function projectEarnings(sliders: StreamSliderState[], baseline: number): EarningsProjection {
  const activeSliders = sliders.filter(s => s.enabled);
  const streamBreakdowns = activeSliders.map(s => {
    const def = STREAMS.find(st => st.id === s.streamId)!;
    const gross = s.rate * s.volume;
    return {
      streamId: s.streamId,
      label: def?.label ?? s.streamId,
      grossMonthly: gross,
      creatorMonthly: gross * 0.55,
      pctOfTotal: 0,
    };
  });
  const totalGross = streamBreakdowns.reduce((sum, s) => sum + s.grossMonthly, 0);
  streamBreakdowns.forEach(s => {
    s.pctOfTotal = totalGross > 0 ? (s.grossMonthly / totalGross) * 100 : 0;
  });
  return {
    grossMonthly: totalGross,
    creatorShare: totalGross * 0.55,
    communityShare: totalGross * 0.25,
    platformShare: totalGross * 0.20,
    annualCreator: totalGross * 0.55 * 12,
    annualCommunity: totalGross * 0.25 * 12,
    vsCurrentMonthly: (totalGross * 0.55) - baseline,
    monthsToTarget: null,
    streams: streamBreakdowns,
  };
}

function generateSolomon(
  projection: EarningsProjection,
  target: number,
  baseline: number,
  activeCount: number
): SolomonAnnotation {
  const monthly = projection.creatorShare;
  const gap = target - monthly;
  const pct = target > 0 ? (monthly / target) * 100 : 100;

  if (monthly === 0 && baseline === 0) {
    return {
      headline: "You came here rich. Now let's put a number on it.",
      gap: null,
      primaryAdvice: "Turn on a stream below and set your rate. Start with what you already do.",
      realism: 'realistic',
    };
  }
  if (monthly >= target && target > 0) {
    return {
      headline: `You've hit your target — £${Math.round(monthly).toLocaleString()}/month.`,
      gap: null,
      primaryAdvice: activeCount > 1
        ? "Multiple streams running. This is what sustainability looks like."
        : "One stream hitting target. A second stream makes this resilient.",
      realism: 'conservative',
    };
  }
  if (gap > 0 && target > 0) {
    let advice = '';
    if (pct < 30) advice = "Start with one stream at a realistic rate. Model what you'll actually do next month, not your best month.";
    else if (pct < 60) advice = "You're building. One more active stream, or a modest rate increase, closes this faster than you think.";
    else advice = `You're ${Math.round(pct)}% of the way there. Adjust one slider — rate or volume — and watch what moves.`;
    return {
      headline: `£${Math.round(monthly).toLocaleString()}/month to you after split.`,
      gap: `£${Math.round(gap).toLocaleString()}/month short of your target`,
      primaryAdvice: advice,
      secondaryAdvice: activeCount === 0 ? "No streams active yet. Turn on the one you already do." : undefined,
      realism: pct > 70 ? 'realistic' : 'conservative',
    };
  }
  return {
    headline: `£${Math.round(monthly).toLocaleString()}/month to you after split.`,
    gap: null,
    primaryAdvice: "Set a target above to see what it takes to reach it.",
    realism: 'realistic',
  };
}

function calcPardner(communityMonthly: number, members = 8): PardnerState {
  return {
    monthlyContribution: communityMonthly,
    currentPot: communityMonthly * members,
    rotationMonth: members,
    handValue: communityMonthly * members,
    membersInCircle: members,
  };
}

const SplitBar: React.FC<{ projection: EarningsProjection }> = ({ projection }) => {
  if (projection.grossMonthly === 0) return null;
  return (
    <div className="ei-split">
      <div className="ei-split-bar">
        <div className="ei-split-segment ei-split-creator" style={{ width: '55%' }}><span>55%</span></div>
        <div className="ei-split-segment ei-split-community" style={{ width: '25%' }}><span>25%</span></div>
        <div className="ei-split-segment ei-split-platform" style={{ width: '20%' }}><span>20%</span></div>
      </div>
      <div className="ei-split-labels">
        <span className="ei-split-label ei-split-label--creator">You · £{Math.round(projection.creatorShare)}/mo</span>
        <span className="ei-split-label ei-split-label--community">Community · £{Math.round(projection.communityShare)}/mo</span>
        <span className="ei-split-label ei-split-label--platform">Platform · £{Math.round(projection.platformShare)}/mo</span>
      </div>
    </div>
  );
};

const PardnerVisual: React.FC<{ pardner: PardnerState }> = ({ pardner }) => {
  if (pardner.monthlyContribution === 0) return null;
  return (
    <div className="ei-pardner">
      <div className="ei-pardner-header">
        <span className="ei-pardner-title">Your pardner hand</span>
        <span className="ei-pardner-subtitle">{pardner.membersInCircle} members · your turn in month {pardner.rotationMonth}</span>
      </div>
      <div className="ei-pardner-stats">
        <div className="ei-pardner-stat">
          <span className="ei-pardner-stat-value">£{Math.round(pardner.monthlyContribution)}/mo</span>
          <span className="ei-pardner-stat-label">your contribution</span>
        </div>
        <div className="ei-pardner-arrow">→</div>
        <div className="ei-pardner-stat ei-pardner-stat--hand">
          <span className="ei-pardner-stat-value">£{Math.round(pardner.handValue).toLocaleString()}</span>
          <span className="ei-pardner-stat-label">your hand value</span>
        </div>
      </div>
      <p className="ei-pardner-note">
        Your community contribution isn't a fee — it's a hand in the pardner.
        When your turn comes around, that's yours.
      </p>
    </div>
  );
};

const EarningsInstrument: React.FC<EarningsInstrumentProps> = ({
  creatorId,
  activeStreams,
  currentMetrics,
  compact = false,
  initialTarget = 800,
}) => {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [target, setTarget] = useState(initialTarget);
  const [pardnerMembers, setPardnerMembers] = useState(8);

  const [sliders, setSliders] = useState<StreamSliderState[]>(() =>
    STREAMS.map(s => ({
      streamId: s.id,
      rate: s.rateDefault,
      volume: s.volumeDefault,
      enabled: activeStreams.includes(s.id),
    }))
  );

  const updateSlider = useCallback((
    streamId: StreamId,
    field: 'rate' | 'volume' | 'enabled',
    value: number | boolean
  ) => {
    setSliders(prev => prev.map(s => s.streamId === streamId ? { ...s, [field]: value } : s));
  }, []);

  const projection = useMemo(() =>
    projectEarnings(sliders, currentMetrics.monthlyIncomeEstimate),
    [sliders, currentMetrics.monthlyIncomeEstimate]
  );

  const projectionWithTarget = useMemo(() => {
    const mtt = projection.creatorShare > 0 && target > projection.creatorShare
      ? Math.ceil((target - currentMetrics.monthlyIncomeEstimate) /
          Math.max(1, projection.creatorShare - currentMetrics.monthlyIncomeEstimate))
      : null;
    return { ...projection, monthsToTarget: mtt };
  }, [projection, target, currentMetrics.monthlyIncomeEstimate]);

  const solomon = useMemo(() =>
    generateSolomon(
      projectionWithTarget, target,
      currentMetrics.monthlyIncomeEstimate,
      sliders.filter(s => s.enabled).length
    ),
    [projectionWithTarget, target, currentMetrics.monthlyIncomeEstimate, sliders]
  );

  const pardner = useMemo(() =>
    calcPardner(projectionWithTarget.communityShare, pardnerMembers),
    [projectionWithTarget.communityShare, pardnerMembers]
  );

  if (compact && !isExpanded) {
    return (
      <div className="ei-widget">
        <div className="ei-widget-header" onClick={() => setIsExpanded(true)}>
          <div className="ei-widget-left">
            <span className="ei-widget-icon">💼</span>
            <div>
              <span className="ei-widget-title">Your Earnings Instrument</span>
              <span className="ei-widget-summary">
                {currentMetrics.totalIncomeEarned > 0
                  ? `£${currentMetrics.totalIncomeEarned.toLocaleString()} earned · £${currentMetrics.totalSavingsGenerated.toLocaleString()} saved`
                  : "Model your next move — see what your skills are worth"
                }
              </span>
            </div>
          </div>
          <span className="ei-widget-expand">▼ Open</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`ei-instrument ${compact ? 'ei-instrument--compact' : ''}`}>

      <div className="ei-header">
        <div className="ei-header-text">
          <h2 className="ei-title">{compact ? 'Your Earnings Instrument' : 'Earnings Instrument'}</h2>
          <p className="ei-strapline">You came here rich. This is what rich looks like in numbers.</p>
        </div>
        {compact && (
          <button className="ei-collapse-btn" onClick={() => setIsExpanded(false)}>▲ Close</button>
        )}
      </div>

      {/* Baseline from ILP */}
      {(currentMetrics.totalIncomeEarned > 0 || currentMetrics.totalSavingsGenerated > 0) && (
        <div className="ei-baseline">
          <div className="ei-baseline-label">What the platform already knows about you</div>
          <div className="ei-baseline-stats">
            {currentMetrics.totalIncomeEarned > 0 && (
              <div className="ei-baseline-stat">
                <span className="ei-baseline-value ei-baseline-value--income">£{currentMetrics.totalIncomeEarned.toLocaleString()}</span>
                <span className="ei-baseline-desc">earned from repairs</span>
              </div>
            )}
            {currentMetrics.totalSavingsGenerated > 0 && (
              <div className="ei-baseline-stat">
                <span className="ei-baseline-value ei-baseline-value--savings">£{currentMetrics.totalSavingsGenerated.toLocaleString()}</span>
                <span className="ei-baseline-desc">saved for households</span>
              </div>
            )}
            {currentMetrics.repairsLogged > 0 && (
              <div className="ei-baseline-stat">
                <span className="ei-baseline-value">{currentMetrics.repairsLogged}</span>
                <span className="ei-baseline-desc">repairs logged</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Target setter */}
      <div className="ei-target">
        <label className="ei-target-label">Monthly target — what you want to earn</label>
        <div className="ei-target-row">
          <span className="ei-target-prefix">£</span>
          <input type="range" className="ei-target-slider"
            min={100} max={3000} step={50} value={target}
            onChange={e => setTarget(Number(e.target.value))} />
          <span className="ei-target-value">{target.toLocaleString()}/mo</span>
        </div>
        {currentMetrics.earningsTarget && currentMetrics.earningsTarget !== target && (
          <button className="ei-target-restore" onClick={() => setTarget(currentMetrics.earningsTarget!)}>
            Restore ILP target (£{currentMetrics.earningsTarget.toLocaleString()})
          </button>
        )}
      </div>

      {/* Projection bar */}
      <div className="ei-projection">
        <div className="ei-projection-bar-wrap">
          <div className="ei-projection-bar-fill"
            style={{ width: target > 0 ? `${Math.min(100, (projectionWithTarget.creatorShare / target) * 100)}%` : '0%' }} />
        </div>
        <div className="ei-projection-numbers">
          <span className="ei-projection-current">
            £{Math.round(projectionWithTarget.creatorShare).toLocaleString()}
            <em>/mo to you</em>
          </span>
          {projectionWithTarget.vsCurrentMonthly !== 0 && (
            <span className={`ei-projection-delta ${projectionWithTarget.vsCurrentMonthly > 0 ? 'positive' : 'negative'}`}>
              {projectionWithTarget.vsCurrentMonthly > 0 ? '+' : ''}£{Math.round(projectionWithTarget.vsCurrentMonthly).toLocaleString()} vs now
            </span>
          )}
        </div>
      </div>

      <SplitBar projection={projectionWithTarget} />

      {/* Solomon */}
      <div className={`ei-solomon ei-solomon--${solomon.realism}`}>
        <div className="ei-solomon-header">
          <span className="ei-solomon-avatar">💼</span>
          <span className="ei-solomon-name">Solomon</span>
        </div>
        <p className="ei-solomon-headline">{solomon.headline}</p>
        {solomon.gap && <p className="ei-solomon-gap">{solomon.gap}</p>}
        <p className="ei-solomon-advice">{solomon.primaryAdvice}</p>
        {solomon.secondaryAdvice && (
          <p className="ei-solomon-advice ei-solomon-advice--secondary">{solomon.secondaryAdvice}</p>
        )}
      </div>

      {/* Stream sliders */}
      <div className="ei-streams">
        <div className="ei-streams-header">
          <span className="ei-streams-title">Your income streams</span>
          <span className="ei-streams-hint">Turn on the streams you already have. Model what you could add.</span>
        </div>
        {STREAMS.map(stream => {
          const slider = sliders.find(s => s.streamId === stream.id)!;
          const streamGross = slider.enabled ? slider.rate * slider.volume : 0;
          const streamCreator = streamGross * 0.55;
          return (
            <div key={stream.id}
              className={`ei-stream ${slider.enabled ? 'ei-stream--active' : 'ei-stream--inactive'}`}
              style={{ '--stream-colour': stream.rovColour } as React.CSSProperties}>
              <div className="ei-stream-header">
                <label className="ei-stream-toggle">
                  <input type="checkbox" checked={slider.enabled}
                    onChange={e => updateSlider(stream.id, 'enabled', e.target.checked)} />
                  <span className="ei-stream-icon">{stream.icon}</span>
                  <span className="ei-stream-label">{stream.label}</span>
                  <span className="ei-stream-programme">{stream.programme}</span>
                </label>
                {slider.enabled && (
                  <span className="ei-stream-monthly">£{Math.round(streamCreator).toLocaleString()}/mo to you</span>
                )}
              </div>
              {slider.enabled && (
                <div className="ei-stream-sliders">
                  <div className="ei-stream-slider-row">
                    <span className="ei-stream-slider-label">Rate · £{slider.rate} {stream.unit}</span>
                    <input type="range" className="ei-stream-range"
                      min={stream.rateMin} max={stream.rateMax} step={stream.rateStep} value={slider.rate}
                      onChange={e => updateSlider(stream.id, 'rate', Number(e.target.value))} />
                    <span className="ei-stream-range-bounds">£{stream.rateMin}–£{stream.rateMax}</span>
                  </div>
                  <div className="ei-stream-slider-row">
                    <span className="ei-stream-slider-label">Volume · {slider.volume} {stream.unit.replace('per ','')}s/mo</span>
                    <input type="range" className="ei-stream-range"
                      min={stream.volumeMin} max={stream.volumeMax} step={stream.volumeStep} value={slider.volume}
                      onChange={e => updateSlider(stream.id, 'volume', Number(e.target.value))} />
                    <span className="ei-stream-range-bounds">{stream.volumeMin}–{stream.volumeMax}/mo</span>
                  </div>
                  <div className="ei-stream-gross">
                    £{streamGross.toLocaleString()} gross → £{Math.round(streamCreator).toLocaleString()} to you
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Annual view */}
      {projectionWithTarget.creatorShare > 0 && (
        <div className="ei-annual">
          <div className="ei-annual-stat">
            <span className="ei-annual-value">£{Math.round(projectionWithTarget.annualCreator).toLocaleString()}</span>
            <span className="ei-annual-label">to you over 12 months</span>
          </div>
          <div className="ei-annual-stat">
            <span className="ei-annual-value ei-annual-value--community">£{Math.round(projectionWithTarget.annualCommunity).toLocaleString()}</span>
            <span className="ei-annual-label">into the community fund</span>
          </div>
          {projectionWithTarget.monthsToTarget && projectionWithTarget.monthsToTarget > 0 && (
            <div className="ei-annual-stat">
              <span className="ei-annual-value ei-annual-value--months">{projectionWithTarget.monthsToTarget}</span>
              <span className="ei-annual-label">months to target at this pace</span>
            </div>
          )}
        </div>
      )}

      {!compact && <PardnerVisual pardner={pardner} />}

      {!compact && projectionWithTarget.communityShare > 0 && (
        <div className="ei-pardner-adjuster">
          <label className="ei-pardner-adjuster-label">Members in your pardner circle: {pardnerMembers}</label>
          <input type="range" className="ei-stream-range"
            min={4} max={20} step={1} value={pardnerMembers}
            onChange={e => setPardnerMembers(Number(e.target.value))} />
        </div>
      )}

      <div className="ei-cta">
        <a href="https://wa.me/442089029991?text=I've been using the Earnings Instrument and want to talk to Solomon about my next move"
          target="_blank" rel="noopener noreferrer" className="ei-cta-btn">
          Talk to Solomon — make this real →
        </a>
      </div>

    </div>
  );
};

export default EarningsInstrument;
