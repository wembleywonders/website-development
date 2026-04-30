/**
 * FastTrackWidget.tsx
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Fast Track Component
 * Company No. 12960817
 *
 * The visible Fast Track pathway.
 * Appears in: PageturnersSandbox, PageturnersPage,
 * BrightSparksPage, AuntieAnansiPage, and any programme
 * that runs Fast Track sessions.
 *
 * Three modes:
 *   'banner'   — full-width announcement, top of page
 *   'panel'    — sidebar or section component
 *   'card'     — inline, within a grid of activities
 *
 * The manifesto is always present.
 * The fourteen-day protocol is expandable.
 * The format selector routes to the appropriate sandbox activity.
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FAST_TRACK_FORMAT_LABELS,
  FAST_TRACK_FORMAT_DESCRIPTIONS,
  FAST_TRACK_LIMITS,
  FAST_TRACK_TECHNIQUE,
  FAST_TRACK_DESTINATIONS,
  FOURTEEN_DAY_PROTOCOL,
  FAST_TRACK_MANIFESTO,
  FastTrackFormat,
} from '../../../data/FastTrack';
import { PROGRAMME_COLOURS } from '../../../types/platform-content';
import styles from './FastTrackWidget.module.css';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

// Matches FastTrackDay from FastTrack.ts —
// typed locally so the component stays self-contained
interface FourteenDayProtocolStep {
  days: string;
  phase: string;
  description: string;
  facilitatorAction: string;
  creatorAction: string;
  output: string;
  gateCheck?: string;
}

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface FastTrackWidgetProps {
  mode?: 'banner' | 'panel' | 'card';
  programmeName?: string;
  onFormatSelect?: (format: FastTrackFormat) => void;
  className?: string;
}

// ─────────────────────────────────────────
// FORMAT SELECTOR
// Shown in panel and banner modes.
// ─────────────────────────────────────────

const FORMAT_ICONS: Record<FastTrackFormat, string> = {
  'anansi-retelling':  '🕷',
  'response-poem':     '◎',
  'flash-story':       '◌',
  'personal-response': '◉',
  'broadcast-minute':  '▷',
  'community-voice':   '◆',
  'character-sketch':  '◈',
};

const FORMAT_DESTINATIONS: Record<FastTrackFormat, string> = {
  'anansi-retelling':  '/programmes/pageturners/sandbox?activity=story-starter&fasttrack=anansi',
  'response-poem':     '/programmes/pageturners/sandbox?activity=creative-writing&fasttrack=poem',
  'flash-story':       '/programmes/pageturners/sandbox?activity=story-starter&fasttrack=flash',
  'personal-response': '/programmes/pageturners/sandbox?activity=diaspora-narratives&fasttrack=personal',
  'broadcast-minute':  '/programmes/pageturners/sandbox?activity=script-writing&fasttrack=broadcast',
  'community-voice':   '/programmes/pageturners/sandbox?activity=creative-writing&fasttrack=community',
  'character-sketch':  '/programmes/pageturners/sandbox?activity=creative-writing&fasttrack=character',
};

// ─────────────────────────────────────────
// CARD MODE
// Compact — fits in an activity grid
// ─────────────────────────────────────────

const CardMode: React.FC<FastTrackWidgetProps> = ({
  onFormatSelect,
  className = '',
}) => (
  <div className={`${styles.card} ${className}`}>
    <div className={styles.card__header}>
      <span className={styles.card__badge}>Fast Track</span>
      <span className={styles.card__time}>14 days</span>
    </div>
    <h3 className={styles.card__title}>Seed to Broadcast</h3>
    <p className={styles.card__tagline}>
      Call and response. The room is listening.
    </p>
    <p className={styles.card__desc}>
      Write in direct response to something real.
      One technique. Two weeks. On air or published.
      The originStory written the same day you write it.
    </p>
    <div className={styles.card__formats}>
      {(Object.keys(FAST_TRACK_FORMAT_LABELS) as FastTrackFormat[])
        .slice(0, 4)
        .map(f => (
          <button
            key={f}
            className={styles.card__format}
            onClick={() => onFormatSelect?.(f)}
            title={FAST_TRACK_FORMAT_DESCRIPTIONS[f]}
          >
            <span>{FORMAT_ICONS[f]}</span>
            <span>{FAST_TRACK_FORMAT_LABELS[f]}</span>
          </button>
        ))}
      <span className={styles.card__more}>+3 more</span>
    </div>
    <Link
      to="/programmes/pageturners/sandbox?fasttrack=true"
      className={styles.card__cta}
    >
      Start now →
    </Link>
  </div>
);

// ─────────────────────────────────────────
// PANEL MODE
// Full format selector + protocol summary
// ─────────────────────────────────────────

const PanelMode: React.FC<FastTrackWidgetProps> = ({
  programmeName = 'Pageturners',
  onFormatSelect,
  className = '',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<FastTrackFormat | null>(null);
  const [showProtocol, setShowProtocol] = useState(false);

  const handleSelect = (format: FastTrackFormat) => {
    setSelectedFormat(format);
    onFormatSelect?.(format);
  };

  const selected = selectedFormat
    ? {
        format: selectedFormat,
        label:       FAST_TRACK_FORMAT_LABELS[selectedFormat],
        description: FAST_TRACK_FORMAT_DESCRIPTIONS[selectedFormat],
        limits:      FAST_TRACK_LIMITS[selectedFormat],
        technique:   FAST_TRACK_TECHNIQUE[selectedFormat],
        destination: FAST_TRACK_DESTINATIONS[selectedFormat],
        icon:        FORMAT_ICONS[selectedFormat],
        url:         FORMAT_DESTINATIONS[selectedFormat],
      }
    : null;

  return (
    <div className={`${styles.panel} ${className}`}>

      {/* ── Header ── */}
      <div className={styles.panel__header}>
        <div className={styles.panel__header__left}>
          <span className={styles.panel__badge}>Fast Track</span>
          <h2 className={styles.panel__title}>
            Fourteen days. Seed to broadcast.
          </h2>
        </div>
        <span className={styles.panel__subtitle}>
          {programmeName}
        </span>
      </div>

      {/* ── Manifesto pull quote ── */}
      <blockquote className={styles.panel__manifesto}>
        The Cotton Club didn't ask permission. It set a standard.
        The cream rises because the room demands it.
        The room is the community. Not the mainstream.
      </blockquote>

      {/* ── Format selector ── */}
      <div className={styles.panel__formats__header}>
        <span className={styles.panel__section__label}>
          Choose your format
        </span>
        <span className={styles.panel__section__note}>
          Each format has one technique. One destination.
        </span>
      </div>

      <div className={styles.panel__formats}>
        {(Object.keys(FAST_TRACK_FORMAT_LABELS) as FastTrackFormat[]).map(format => (
          <button
            key={format}
            className={`${styles.panel__format}${selectedFormat === format ? ` ${styles['panel__format--selected']}` : ''}`}
            onClick={() => handleSelect(format)}
          >
            <span className={styles.panel__format__icon}>
              {FORMAT_ICONS[format]}
            </span>
            <div className={styles.panel__format__body}>
              <strong className={styles.panel__format__name}>
                {FAST_TRACK_FORMAT_LABELS[format]}
              </strong>
              <span className={styles.panel__format__limits}>
                {FAST_TRACK_LIMITS[format].minWords}–{FAST_TRACK_LIMITS[format].maxWords} words
              </span>
            </div>
            <span className={styles.panel__format__tech}>
              {FAST_TRACK_TECHNIQUE[format].number}
            </span>
          </button>
        ))}
      </div>

      {/* ── Selected format detail ── */}
      {selected && (
        <div className={styles.panel__selected}>
          <div className={styles.panel__selected__header}>
            <span className={styles.panel__selected__icon}>
              {selected.icon}
            </span>
            <h3 className={styles.panel__selected__title}>
              {selected.label}
            </h3>
          </div>

          <p className={styles.panel__selected__desc}>
            {selected.description}
          </p>

          <div className={styles.panel__selected__meta}>
            <div className={styles.panel__selected__item}>
              <span className={styles.panel__meta__label}>Technique</span>
              <span className={styles.panel__meta__value}>
                {selected.technique.number}: {selected.technique.name}
              </span>
            </div>
            <div className={styles.panel__selected__item}>
              <span className={styles.panel__meta__label}>Application</span>
              <span className={styles.panel__meta__value}>
                {selected.technique.application}
              </span>
            </div>
            <div className={styles.panel__selected__item}>
              <span className={styles.panel__meta__label}>Destination</span>
              <span
                className={styles.panel__meta__value}
                style={{
                  color: PROGRAMME_COLOURS[selected.destination.primary],
                }}
              >
                {selected.destination.label}
              </span>
            </div>
            <div className={styles.panel__selected__item}>
              <span className={styles.panel__meta__label}>Word range</span>
              <span className={styles.panel__meta__value}>
                {selected.limits.minWords}–{selected.limits.maxWords} words
                {selected.limits.maxMinutes && ` · ${selected.limits.minMinutes}–${selected.limits.maxMinutes} min`}
              </span>
            </div>
          </div>

          <p className={styles.panel__selected__note}>
            {selected.limits.note}
          </p>

          <Link
            to={selected.url}
            className={styles.panel__selected__cta}
          >
            Begin {selected.label} →
          </Link>
        </div>
      )}

      {/* ── Protocol — expandable ── */}
      <div className={styles.panel__protocol}>
        <button
          className={styles.panel__protocol__toggle}
          onClick={() => setShowProtocol(v => !v)}
          aria-expanded={showProtocol}
        >
          <span>The fourteen-day protocol</span>
          <span className={styles.panel__protocol__chevron}>
            {showProtocol ? '▲' : '▼'}
          </span>
        </button>

        {showProtocol && (
          <div className={styles.panel__protocol__steps}>
            {FOURTEEN_DAY_PROTOCOL.map((step: { days: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; phase: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; gateCheck: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, i: React.Key | null | undefined) => (
              <div key={i} className={styles.panel__step}>
                <div className={styles.panel__step__marker}>
                  <span className={styles.panel__step__days}>
                    {step.days}
                  </span>
                </div>
                <div className={styles.panel__step__body}>
                  <strong className={styles.panel__step__phase}>
                    {step.phase}
                  </strong>
                  <p className={styles.panel__step__desc}>
                    {step.description}
                  </p>
                  {step.gateCheck && (
                    <div className={styles.panel__step__gate}>
                      <span className={styles.panel__gate__icon}>◉</span>
                      <span>{step.gateCheck}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className={styles.panel__footer}>
        <p className={styles.panel__footer__gate}>
          <span className={styles.panel__gate__icon}>◉</span>
          {FAST_TRACK_MANIFESTO.gate}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// BANNER MODE
// Full-width. Top of page or section.
// The statement, not the selector.
// ─────────────────────────────────────────

const BannerMode: React.FC<FastTrackWidgetProps> = ({
  programmeName = 'Pageturners',
  className = '',
}) => (
  <div className={`${styles.banner} ${className}`}>
    <div className={styles.banner__inner}>
      <div className={styles.banner__left}>
        <div className={styles.banner__badge__row}>
          <span className={styles.banner__badge}>Fast Track</span>
          <span className={styles.banner__time}>14 days · seed to broadcast</span>
        </div>
        <h2 className={styles.banner__title}>
          The Cotton Club didn't ask permission.
          <br />
          It set a standard.
        </h2>
        <p className={styles.banner__body}>
          Call and response culture meets craftsmanship.
          Write in direct response to something real.
          One technique. The originStory written the same day.
          Broadcast or published within two weeks.
          The room responds. The loop is live.
        </p>
        <div className={styles.banner__formats}>
          {(Object.keys(FAST_TRACK_FORMAT_LABELS) as FastTrackFormat[]).map(f => (
            <Link
              key={f}
              to={FORMAT_DESTINATIONS[f]}
              className={styles.banner__format__pill}
            >
              {FORMAT_ICONS[f]} {FAST_TRACK_FORMAT_LABELS[f]}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.banner__right}>
        {FOURTEEN_DAY_PROTOCOL.map(
          (
            step: {
              days: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
              phase: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
              gateCheck: any;
            },
            i: number
          ) => (
          <div key={i} className={styles.banner__step}>
            <span className={styles.banner__step__days}>{step.days}</span>
            <div className={styles.banner__step__content}>
              <strong className={styles.banner__step__phase}>
                {step.phase}
              </strong>
              {step.gateCheck && (
                <span className={styles.banner__step__gate}>
                  Gate
                </span>
              )}
            </div>
            {i < FOURTEEN_DAY_PROTOCOL.length - 1 && (
              <span className={styles.banner__step__line} aria-hidden="true" />
            )}
          </div>
        ))}
        <Link
          to="/programmes/pageturners/sandbox?fasttrack=true"
          className={styles.banner__cta}
        >
          Your call is waiting →
        </Link>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

const FastTrackWidget: React.FC<FastTrackWidgetProps> = ({
  mode = 'panel',
  programmeName,
  onFormatSelect,
  className,
}) => {
  switch (mode) {
    case 'banner': return <BannerMode programmeName={programmeName} className={className} />;
    case 'card':   return <CardMode onFormatSelect={onFormatSelect} className={className} />;
    default:       return <PanelMode programmeName={programmeName} onFormatSelect={onFormatSelect} className={className} />;
  }
};

export default FastTrackWidget;