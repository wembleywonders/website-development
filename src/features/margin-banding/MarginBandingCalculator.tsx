/**
 * Creator Margin Banding — calculator component
 * Wembley Wonders CIC
 *
 * WW-SPEC-CREATOR-MARGIN-BANDING-001.
 *
 * Standalone and embeddable (Section 5 of the spec). Drop it into the ILP
 * business-plan review flow, a standalone tool page, or a Cyberstore
 * listing step — it holds its own state and needs no store.
 *
 * Constitutional clause (Section 0): advisory only. It shows arithmetic
 * about the creator's own inputs and never sets a price, approves a
 * listing, releases a payment, or issues a quota.
 *
 * Every result is phrased as a mirror, never a target: "here's what 40
 * sales at this price would mean for your time", not "you need 40 sales".
 */

import React, { useMemo, useState } from 'react';
import {
  NATIONAL_LIVING_WAGE,
  REAL_LIVING_WAGE_LONDON,
  REVENUE_MODELS,
  suggestedTimeValueFor,
  type RagBand,
  type RagResult,
  type RevenueModelKey,
} from './marginBandingConfig';
import {
  calcBreakEvenIp,
  calcCommission,
  calcTimeBilled,
  calcVolume,
  volumeCurve,
  CALCULATION_MODE_LABELS,
  type CalculationMode,
} from './MarginBandingEngine';
import './MarginBandingCalculator.css';

// ─── Section 6 — programme → default mode ────────────────────────────────────

const PROGRAMME_DEFAULT_MODE: Record<string, CalculationMode> = {
  'cyberstore': 'volume',
  'cyberstore-general': 'volume',
  'scrap-cat': 'volume',
  'silk-stilettos': 'commission',
  'trubble-n-bass': 'break-even-ip',
  'auntie-anansis-kitchen': 'break-even-ip',
  'techreneurs': 'time-billed',
  'g-tech-casters': 'time-billed',
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface MarginBandingCalculatorProps {
  /** Lock the calculator to one mode. Omit to let the creator choose. */
  mode?: CalculationMode;
  /** Programme slug — derives a default starting mode (Section 6) if `mode` is not set. */
  programme?: string;
  /** Which revenue split applies. Defaults to STANDARD (55/20/25). */
  revenueModelKey?: RevenueModelKey;
  /** Creator's badge tier ('Explorer'|'Builder'|'Innovator'|'Leader', any casing). Pre-fills time value where a mode uses one. */
  creatorTier?: string;
  /** Section 5: is this listing health / dietary / fitness-adjacent? */
  healthAdjacent?: boolean;
  /** Section 5: has the separate content-vetting gate cleared it? Defaults to NOT cleared. */
  healthContentCleared?: boolean;
  /** Name for mirror copy, e.g. "what this means for Gloria's time". */
  sellerDisplayName?: string;
  /** Where this is embedded — tunes one line of context copy. */
  context?: 'ilp-review' | 'listing-flow' | 'standalone';
}

// ─── Formatting helpers ──────────────────────────────────────────────────────

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

const rate = (n: number) => `${gbp(n)}/hr`;

// ─── Shared UI ───────────────────────────────────────────────────────────────

const RagPill: React.FC<{ rag: RagResult }> = ({ rag }) => {
  const dot: Record<RagBand, string> = { red: '🔴', amber: '🟡', green: '🟢' };
  const name: Record<RagBand, string> = { red: 'Below minimum wage', amber: 'Below Real Living Wage', green: 'Real Living Wage or above' };
  return (
    <span className={`mbc__pill mbc__pill--${rag.band}`}>
      <span aria-hidden="true">{dot[rag.band]}</span> {name[rag.band]}
    </span>
  );
};

const NumberField: React.FC<{
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  hint?: string;
}> = ({ id, label, value, onChange, prefix, suffix, min = 0, step = 0.5, hint }) => (
  <div className="mbc__field">
    <label className="mbc__label" htmlFor={id}>{label}</label>
    <div className="mbc__input-wrap">
      {prefix && <span className="mbc__affix">{prefix}</span>}
      <input
        id={id}
        className="mbc__input"
        type="number"
        inputMode="decimal"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Math.max(min, parseFloat(e.target.value) || 0))}
      />
      {suffix && <span className="mbc__affix mbc__affix--suffix">{suffix}</span>}
    </div>
    {hint && <p className="mbc__hint">{hint}</p>}
  </div>
);

const PardnerNote: React.FC = () => (
  <p className="mbc__pardner-note">
    A red result isn&rsquo;t a failure. It&rsquo;s the gap the{' '}
    <strong>Pardner floor payment</strong> exists to cover while you build toward green.
  </p>
);

const MirrorNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mbc__mirror-note">{children}</p>
);

// ─── 4.1 Volume ─────────────────────────────────────────────────────────────

const VolumePanel: React.FC<{ model: RevenueModelKey; who: string }> = ({ model, who }) => {
  const [priceGbp, setPrice] = useState(12);
  const [materialsCostPerUnitGbp, setMaterials] = useState(3);
  const [hoursPerUnit, setHours] = useState(1.5);

  const result = useMemo(
    () => calcVolume({ priceGbp, materialsCostPerUnitGbp, hoursPerUnit, revenueModelKey: model }),
    [priceGbp, materialsCostPerUnitGbp, hoursPerUnit, model],
  );

  const curve = useMemo(
    () => volumeCurve(
      { materialsCostPerUnitGbp, hoursPerUnit, revenueModelKey: model },
      Math.max(0.5, priceGbp * 0.4),
      priceGbp * 1.8,
    ),
    [priceGbp, materialsCostPerUnitGbp, hoursPerUnit, model],
  );

  return (
    <div className="mbc__panel">
      <div className="mbc__fields">
        <NumberField id="v-price" label="Price per unit" prefix="£" value={priceGbp} onChange={setPrice} />
        <NumberField id="v-mat" label="Materials cost per unit" prefix="£" value={materialsCostPerUnitGbp} onChange={setMaterials} />
        <NumberField id="v-hrs" label="Hours of your time per unit" suffix="hrs" step={0.25} value={hoursPerUnit} onChange={setHours} />
      </div>

      <div className="mbc__result">
        <div className="mbc__headline">
          <span className="mbc__headline-num">{rate(result.impliedHourlyGbp)}</span>
          <RagPill rag={result.rag} />
        </div>
        <MirrorNote>
          At {gbp(priceGbp)} a unit, after the {REVENUE_MODELS[model].maker}% creator share and{' '}
          {gbp(materialsCostPerUnitGbp)} of materials, {who} keep{who === 'you' ? '' : 's'}{' '}
          {gbp(result.netTakePerUnitGbp)} per unit — {rate(result.impliedHourlyGbp)} for the{' '}
          {hoursPerUnit} {hoursPerUnit === 1 ? 'hour' : 'hours'} it takes to make one.
        </MirrorNote>
        {result.materialsExceedTake && (
          <p className="mbc__warning">
            Materials cost more than your share of the sale price here — every unit sold loses money before your time is counted.
          </p>
        )}
        <p className="mbc__band-meaning">{result.rag.meaning}</p>
        {result.rag.band === 'red' && <PardnerNote />}

        <div className="mbc__curve" role="img" aria-label="How the implied hourly rate changes as the price changes">
          <div className="mbc__curve-title">If the price changed</div>
          <div className="mbc__curve-bars">
            {curve.map((pt) => (
              <div
                key={pt.priceGbp}
                className={`mbc__curve-bar mbc__curve-bar--${pt.band}`}
                style={{ height: `${Math.min(100, Math.max(4, (pt.impliedHourlyGbp / (REAL_LIVING_WAGE_LONDON.gbpPerHour * 2)) * 100))}%` }}
                title={`${gbp(pt.priceGbp)} → ${rate(pt.impliedHourlyGbp)}`}
              />
            ))}
          </div>
          <div className="mbc__curve-axis">
            <span>{gbp(curve[0]?.priceGbp ?? 0)}</span>
            <span>{gbp(curve[curve.length - 1]?.priceGbp ?? 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 4.2 Commission ─────────────────────────────────────────────────────────

const CommissionPanel: React.FC<{ model: RevenueModelKey; who: string }> = ({ model, who }) => {
  const [jobPriceGbp, setPrice] = useState(600);
  const [jobMaterialsCostGbp, setMaterials] = useState(120);
  const [jobHours, setHours] = useState(35);
  const [weeklyHoursCeiling, setCeiling] = useState(20);

  const result = useMemo(
    () => calcCommission({ jobPriceGbp, jobMaterialsCostGbp, jobHours, weeklyHoursCeiling, revenueModelKey: model }),
    [jobPriceGbp, jobMaterialsCostGbp, jobHours, weeklyHoursCeiling, model],
  );

  return (
    <div className="mbc__panel">
      <div className="mbc__fields">
        <NumberField id="c-price" label="Price for this job" prefix="£" step={10} value={jobPriceGbp} onChange={setPrice} />
        <NumberField id="c-mat" label="Materials cost for this job" prefix="£" step={5} value={jobMaterialsCostGbp} onChange={setMaterials} />
        <NumberField id="c-hrs" label="Total hours for this job" suffix="hrs" step={1} value={jobHours} onChange={setHours}
          hint="This job specifically — not an average. Bespoke work varies job to job." />
        <NumberField id="c-ceil" label="Hours a week you're willing to work" suffix="hrs" step={1} value={weeklyHoursCeiling} onChange={setCeiling}
          hint="Your ceiling, set by you." />
      </div>

      <div className="mbc__result">
        <div className="mbc__headline">
          <span className="mbc__headline-num">{rate(result.impliedHourlyGbp)}</span>
          <RagPill rag={result.rag} />
        </div>
        <MirrorNote>
          At {gbp(jobPriceGbp)} for this job, after the {REVENUE_MODELS[model].maker}% creator share and{' '}
          {gbp(jobMaterialsCostGbp)} of materials, {who} keep{who === 'you' ? '' : 's'} {gbp(result.netJobTakeGbp)} for{' '}
          {jobHours} hours&rsquo; work — {rate(result.impliedHourlyGbp)}.
        </MirrorNote>
        {result.materialsExceedTake && (
          <p className="mbc__warning">Materials cost more than your share of this job&rsquo;s price.</p>
        )}
        <p className="mbc__band-meaning">{result.rag.meaning}</p>
        {result.rag.band === 'red' && <PardnerNote />}

        {result.feasibleJobsPerMonth !== null && (
          <p className="mbc__capacity">
            At {jobHours} hours a job and a {weeklyHoursCeiling}-hour week, about{' '}
            <strong>{result.feasibleJobsPerMonth} {result.feasibleJobsPerMonth === 1 ? 'job' : 'jobs'} a month</strong>{' '}
            fits your own hours ceiling — {gbp(result.netJobTakeGbp * result.feasibleJobsPerMonth)} a month if every slot is filled.
          </p>
        )}
      </div>
    </div>
  );
};

// ─── 4.3 Break-even-IP ──────────────────────────────────────────────────────

const BreakEvenIpPanel: React.FC<{ model: RevenueModelKey; who: string; tierTimeValue: number | null }> = ({ model, who, tierTimeValue }) => {
  const [pricePerCopyGbp, setPrice] = useState(4);
  const [creationHours, setHours] = useState(60);
  const [useOwnRate, setUseOwnRate] = useState(tierTimeValue !== null);
  const [ownTimeValueGbp, setOwnRate] = useState(tierTimeValue ?? REAL_LIVING_WAGE_LONDON.gbpPerHour);

  const result = useMemo(
    () => calcBreakEvenIp({
      pricePerCopyGbp,
      creationHours,
      ownTimeValueGbp: useOwnRate ? ownTimeValueGbp : undefined,
      revenueModelKey: model,
    }),
    [pricePerCopyGbp, creationHours, useOwnRate, ownTimeValueGbp, model],
  );

  return (
    <div className="mbc__panel">
      <div className="mbc__fields">
        <NumberField id="b-price" label="Price per copy" prefix="£" value={pricePerCopyGbp} onChange={setPrice} />
        <NumberField id="b-hrs" label="Hours to create the whole work" suffix="hrs" step={1} value={creationHours} onChange={setHours}
          hint="The whole thing, once — not per copy." />
        <div className="mbc__field">
          <label className="mbc__label mbc__label--check">
            <input type="checkbox" checked={useOwnRate} onChange={(e) => setUseOwnRate(e.target.checked)} />
            Also compare against my own hourly rate
          </label>
          {useOwnRate && (
            <div className="mbc__input-wrap">
              <span className="mbc__affix">£</span>
              <input
                className="mbc__input"
                type="number"
                min={0}
                step={0.5}
                value={ownTimeValueGbp}
                onChange={(e) => setOwnRate(Math.max(0, parseFloat(e.target.value) || 0))}
              />
              <span className="mbc__affix mbc__affix--suffix">/hr</span>
            </div>
          )}
        </div>
      </div>

      <div className="mbc__result">
        <MirrorNote>
          {who === 'you' ? 'You keep' : `${who} keeps`} {gbp(result.creatorTakePerCopyGbp)} of each {gbp(pricePerCopyGbp)} copy
          (the {REVENUE_MODELS[model].maker}% creator share). The creation time is worth{' '}
          {gbp(result.timeCostAtLivingWageGbp)} at a London living wage. Here&rsquo;s where different rates get covered:
        </MirrorNote>

        <ul className="mbc__breakeven-list">
          {result.breakEvenPoints.map((pt) => (
            <li key={pt.key} className={`mbc__breakeven mbc__breakeven--${pt.key === 'legalMinimum' ? 'red' : pt.key === 'livingWage' ? 'green' : 'own'}`}>
              <span className="mbc__breakeven-copies">{pt.copies}</span>
              <span className="mbc__breakeven-label">{pt.copies === 1 ? 'copy' : 'copies'} — {pt.label}</span>
            </li>
          ))}
        </ul>

        <p className="mbc__beyond-green">{result.beyondGreenNote}</p>
      </div>
    </div>
  );
};

// ─── 4.4 Time-billed ────────────────────────────────────────────────────────

const TimeBilledPanel: React.FC<{ model: RevenueModelKey; who: string }> = ({ model, who }) => {
  const [flatFeeGbp, setFee] = useState(80);
  const [typicalHours, setTypical] = useState(3);
  const [badCaseHours, setBadCase] = useState(8);

  const result = useMemo(
    () => calcTimeBilled({ flatFeeGbp, typicalHours, badCaseHours, revenueModelKey: model }),
    [flatFeeGbp, typicalHours, badCaseHours, model],
  );

  return (
    <div className="mbc__panel">
      <div className="mbc__fields">
        <NumberField id="t-fee" label="Flat fee you'd quote" prefix="£" step={5} value={flatFeeGbp} onChange={setFee} />
        <NumberField id="t-typ" label="Typical hours for this job" suffix="hrs" step={0.5} value={typicalHours} onChange={setTypical} />
        <NumberField id="t-bad" label="Bad-case hours" suffix="hrs" step={0.5} value={badCaseHours} onChange={setBadCase}
          hint="If it fights you — troubleshooting, a bricked device, a re-do." />
      </div>

      <div className="mbc__result">
        <MirrorNote>
          {who === 'you' ? 'You keep' : `${who} keeps`} {gbp(result.creatorTakeGbp)} of the {gbp(flatFeeGbp)} fee
          (the {REVENUE_MODELS[model].maker}% creator share). What that fee means per hour depends on how the job goes:
        </MirrorNote>

        <div className="mbc__two-case">
          <div className="mbc__case">
            <div className="mbc__case-label">Typical — {typicalHours} hrs</div>
            <div className="mbc__headline">
              <span className="mbc__headline-num">{rate(result.typical.impliedHourlyGbp)}</span>
              <RagPill rag={result.typical.rag} />
            </div>
          </div>
          <div className="mbc__case">
            <div className="mbc__case-label">Bad case — {badCaseHours} hrs</div>
            <div className="mbc__headline">
              <span className="mbc__headline-num">{rate(result.badCase.impliedHourlyGbp)}</span>
              <RagPill rag={result.badCase.rag} />
            </div>
          </div>
        </div>

        {result.badCaseFallsToRedWhileTypicalIsNot && (
          <p className="mbc__warning mbc__warning--strong">
            The typical case clears the wage floor, but the bad case drops below the UK minimum of{' '}
            {rate(NATIONAL_LIVING_WAGE.gbpPerHour)}. Flat-fee quotes bite exactly here — when a job runs long, the fee doesn&rsquo;t move.
          </p>
        )}
        {result.badCase.rag.band === 'red' && !result.badCaseFallsToRedWhileTypicalIsNot && <PardnerNote />}
      </div>
    </div>
  );
};

// ─── Health-content gate (Section 5) ────────────────────────────────────────

const HealthGate: React.FC = () => (
  <div className="mbc mbc--gated">
    <div className="mbc__gate">
      <h3 className="mbc__gate-title">Content check needed first</h3>
      <p>
        This listing is tagged as health, dietary, or fitness-related. Pricing guidance stays hidden
        until the content itself has been through accuracy review — bad pricing costs money, but
        unvetted health content can put a buyer managing a condition at real risk.
      </p>
      <p className="mbc__gate-next">
        Once the content-vetting gate marks this cleared, the calculator opens automatically.
      </p>
    </div>
  </div>
);

// ─── Main component ─────────────────────────────────────────────────────────

export const MarginBandingCalculator: React.FC<MarginBandingCalculatorProps> = ({
  mode,
  programme,
  revenueModelKey = 'STANDARD',
  creatorTier,
  healthAdjacent = false,
  healthContentCleared = false,
  sellerDisplayName,
  context = 'standalone',
}) => {
  const locked = mode !== undefined;
  const initialMode: CalculationMode =
    mode ?? (programme ? PROGRAMME_DEFAULT_MODE[programme] : undefined) ?? 'volume';
  const [activeMode, setActiveMode] = useState<CalculationMode>(initialMode);

  const who = sellerDisplayName ?? 'you';
  const tierTimeValue = suggestedTimeValueFor(creatorTier);

  if (healthAdjacent && !healthContentCleared) {
    return <HealthGate />;
  }

  const modeToRender = locked ? initialMode : activeMode;

  return (
    <div className="mbc">
      <header className="mbc__header">
        <h2 className="mbc__title">What the numbers mean for your time</h2>
        <p className="mbc__strapline">
          This is a mirror, not a target. It grounds a price against your own materials, your own
          hours, and the {REVENUE_MODELS[revenueModelKey].maker}/{REVENUE_MODELS[revenueModelKey].platform}/{REVENUE_MODELS[revenueModelKey].community} split —
          not against what anyone else charges. It never sets your price. You do.
        </p>
        {context === 'ilp-review' && (
          <p className="mbc__context">Model a price here before you&rsquo;ve made a listing — this is the business plan doing its job.</p>
        )}
      </header>

      {!locked && (
        <div className="mbc__modes" role="tablist" aria-label="Calculation mode">
          {(Object.keys(CALCULATION_MODE_LABELS) as CalculationMode[]).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={modeToRender === m}
              className={`mbc__mode ${modeToRender === m ? 'mbc__mode--active' : ''}`}
              onClick={() => setActiveMode(m)}
            >
              {CALCULATION_MODE_LABELS[m]}
            </button>
          ))}
        </div>
      )}
      {locked && (
        <p className="mbc__mode-locked">Mode: <strong>{CALCULATION_MODE_LABELS[modeToRender]}</strong></p>
      )}

      {modeToRender === 'volume' && <VolumePanel model={revenueModelKey} who={who} />}
      {modeToRender === 'commission' && <CommissionPanel model={revenueModelKey} who={who} />}
      {modeToRender === 'break-even-ip' && <BreakEvenIpPanel model={revenueModelKey} who={who} tierTimeValue={tierTimeValue} />}
      {modeToRender === 'time-billed' && <TimeBilledPanel model={revenueModelKey} who={who} />}

      <footer className="mbc__footer">
        <p>
          Bands: <strong>🔴</strong> below {rate(NATIONAL_LIVING_WAGE.gbpPerHour)} (UK minimum wage) ·{' '}
          <strong>🟡</strong> up to {rate(REAL_LIVING_WAGE_LONDON.gbpPerHour)} (Real Living Wage, London) ·{' '}
          <strong>🟢</strong> {rate(REAL_LIVING_WAGE_LONDON.gbpPerHour)} and above.
        </p>
        <p className="mbc__footer-note">
          Cost and time arithmetic only. It can&rsquo;t tell you whether units will sell at a given price.
        </p>
      </footer>
    </div>
  );
};

export default MarginBandingCalculator;
