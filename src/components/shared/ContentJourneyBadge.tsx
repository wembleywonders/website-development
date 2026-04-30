/**
 * ContentJourneyBadge.tsx
 * ─────────────────────────────────────────────────────────────
 * Wembley Wonders CIC · Shared Component
 * Company No. 12960817
 *
 * The visible connective tissue.
 *
 * This component appears wherever platform content is displayed:
 * — on Rayd-yo broadcast listings
 * — on Joystick articles
 * — on Knowledge Commons profiles contributed by the community
 * — on Pageturners published pieces
 * — on Kaywana's Court programme notes
 * — on any piece of content that has a humanStory to tell
 *
 * Three sizes:
 *   'micro'   — inline, for feed items and cards
 *   'compact' — sidebar or below-title placement
 *   'full'    — standalone, for feature articles and broadcasts
 *
 * The humanStory is always the first thing.
 * The journey is always visible.
 * The programme colours are the visual language
 * that makes the connective tissue legible at a glance.
 *
 * "Marcus, age 14, Bright Sparks cohort 2, who heard
 *  the spider story and decided Anansi would have a
 *  different opinion about TikTok."
 *
 * That sentence is the badge. Everything else is context.
 * ─────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import {
  ContentJourneySummary,
  ProgrammeId,
  ContentStatus,
  ContentFormat,
  PROGRAMME_LABELS,
  PROGRAMME_COLOURS,
  STATUS_LABELS,
  STATUS_COLOURS,
} from '../../types/platform-content';
import styles from './ContentJourneyBadge.module.css';

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface ContentJourneyBadgeProps {
  content: ContentJourneySummary;
  size?: 'micro' | 'compact' | 'full';
  showJourney?: boolean;    // default true for compact and full, false for micro
  showRevenue?: boolean;    // default false — only for creator dashboards
  className?: string;
  onProgrammeClick?: (programmeId: ProgrammeId) => void;
}

// ─────────────────────────────────────────
// FORMAT ICONS
// Simple text icons — no external dependency
// ─────────────────────────────────────────

const FORMAT_ICONS: Partial<Record<ContentFormat, string>> = {
  'story':              '◌',
  'poem':               '◎',
  'script':             '◈',
  'essay':              '◆',
  'long-read':          '◇',
  'investigative':      '◉',
  'profile':            '◍',
  'testimony':          '○',
  'interview':          '◐',
  'review':             '◑',
  'debate':             '◒',
  'research':           '◓',
  'broadcast-segment':  '▷',
  'performance-piece':  '◈',
  'game-narrative':     '◇',
  'anansi-retelling':   '🕷',
  'seed':               '·',
};

// ─────────────────────────────────────────
// JOURNEY ICONS
// ─────────────────────────────────────────

const ACTION_ICONS: Record<string, string> = {
  originated: '○',
  developed:  '◌',
  performed:  '◈',
  broadcast:  '▷',
  published:  '◆',
  archived:   '◉',
  inspired:   '→',
};

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      month: 'short',
      year:  'numeric',
    });
  } catch {
    return '';
  }
}

function ageLabel(age: number): string {
  return `age ${age}`;
}

// ─────────────────────────────────────────
// MICRO BADGE
// For feed items, cards, and inline display.
// Shows: creator name, origin programme, status.
// The humanStory is present as a tooltip.
// ─────────────────────────────────────────

const MicroBadge: React.FC<{
  content: ContentJourneySummary;
  onProgrammeClick?: (p: ProgrammeId) => void;
}> = ({ content, onProgrammeClick }) => {
  const { humanStory, originProgramme, currentStatus, format } = content;
  const progColour = PROGRAMME_COLOURS[originProgramme];
  const icon = FORMAT_ICONS[format] ?? '○';

  return (
    <div
      className={styles.micro}
      title={humanStory.originStory}
      aria-label={`Created by ${humanStory.displayName}: ${humanStory.originStory}`}
    >
      <span className={styles.micro__icon} style={{ color: progColour }}>
        {icon}
      </span>
      <span className={styles.micro__name}>
        {humanStory.displayName}
        {humanStory.ageAtCreation && (
          <span className={styles.micro__age}>
            {' '}({ageLabel(humanStory.ageAtCreation)})
          </span>
        )}
      </span>
      <button
        className={styles.micro__prog}
        style={{ borderColor: `${progColour}40`, color: progColour }}
        onClick={() => onProgrammeClick?.(originProgramme)}
        aria-label={`View ${PROGRAMME_LABELS[originProgramme]} content`}
      >
        {PROGRAMME_LABELS[originProgramme]}
      </button>
      <span
        className={styles.micro__status}
        style={{ color: STATUS_COLOURS[currentStatus] }}
      >
        {STATUS_LABELS[currentStatus]}
      </span>
    </div>
  );
};

// ─────────────────────────────────────────
// COMPACT BADGE
// For sidebar and below-title placement.
// Shows: humanStory, journey highlights,
// cross-programme connections.
// ─────────────────────────────────────────

const CompactBadge: React.FC<{
  content: ContentJourneySummary;
  showJourney: boolean;
  onProgrammeClick?: (p: ProgrammeId) => void;
}> = ({ content, showJourney, onProgrammeClick }) => {
  const { humanStory, originProgramme, currentStatus, journeyHighlights, format } = content;
  const progColour = PROGRAMME_COLOURS[originProgramme];
  const icon = FORMAT_ICONS[format] ?? '○';

  return (
    <div className={styles.compact}>
      {/* Origin programme stripe */}
      <div
        className={styles.compact__stripe}
        style={{ background: progColour }}
        aria-hidden="true"
      />

      <div className={styles.compact__body}>
        {/* Format + programme */}
        <div className={styles.compact__header}>
          <span className={styles.compact__icon} style={{ color: progColour }}>
            {icon}
          </span>
          <button
            className={styles.compact__prog}
            style={{ color: progColour }}
            onClick={() => onProgrammeClick?.(originProgramme)}
          >
            {PROGRAMME_LABELS[originProgramme]}
          </button>
          <span
            className={styles.compact__status}
            style={{
              background: `${STATUS_COLOURS[currentStatus]}18`,
              color: STATUS_COLOURS[currentStatus],
              borderColor: `${STATUS_COLOURS[currentStatus]}40`,
            }}
          >
            {STATUS_LABELS[currentStatus]}
          </span>
        </div>

        {/* The human story — always first, always specific */}
        <p className={styles.compact__story}>
          {humanStory.originStory}
        </p>

        {/* Creator line */}
        <div className={styles.compact__creator}>
          <span className={styles.compact__creator__name}>
            {humanStory.displayName}
          </span>
          {humanStory.ageAtCreation && (
            <span className={styles.compact__creator__age}>
              {ageLabel(humanStory.ageAtCreation)}
            </span>
          )}
          {humanStory.cohort && (
            <span className={styles.compact__creator__cohort}>
              {humanStory.cohort}
            </span>
          )}
          {humanStory.heritageNote && (
            <span className={styles.compact__creator__heritage}>
              {humanStory.heritageNote}
            </span>
          )}
        </div>

        {/* Journey highlights */}
        {showJourney && journeyHighlights.length > 1 && (
          <div className={styles.compact__journey}>
            {journeyHighlights.map((stop, i) => (
              <React.Fragment key={`${stop.programme}-${stop.action}-${i}`}>
                <span
                  className={styles.compact__stop}
                  style={{ color: PROGRAMME_COLOURS[stop.programme] }}
                  title={stop.note}
                >
                  <span className={styles.compact__stop__icon}>
                    {ACTION_ICONS[stop.action] ?? '·'}
                  </span>
                  <span className={styles.compact__stop__label}>
                    {PROGRAMME_LABELS[stop.programme]}
                  </span>
                </span>
                {i < journeyHighlights.length - 1 && (
                  <span className={styles.compact__arrow} aria-hidden="true">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// FULL BADGE
// For feature articles, broadcast listings,
// and the Rayd-yo "About this piece" section.
// Shows everything — the full human story,
// the complete journey, all connections.
// ─────────────────────────────────────────

const FullBadge: React.FC<{
  content: ContentJourneySummary;
  showJourney: boolean;
  onProgrammeClick?: (p: ProgrammeId) => void;
}> = ({ content, showJourney, onProgrammeClick }) => {
  const [journeyExpanded, setJourneyExpanded] = useState(false);
  const {
    humanStory,
    originProgramme,
    currentStatus,
    journeyHighlights,
    connections,
    format,
    publishedAt,
  } = content;
  const progColour = PROGRAMME_COLOURS[originProgramme];
  const icon = FORMAT_ICONS[format] ?? '○';

  return (
    <div className={styles.full}>
      {/* Header bar */}
      <div
        className={styles.full__header}
        style={{ borderLeftColor: progColour }}
      >
        <div className={styles.full__header__left}>
          <span className={styles.full__icon} style={{ color: progColour }}>
            {icon}
          </span>
          <div>
            <button
              className={styles.full__prog}
              style={{ color: progColour }}
              onClick={() => onProgrammeClick?.(originProgramme)}
            >
              {PROGRAMME_LABELS[originProgramme]}
            </button>
            {publishedAt && (
              <span className={styles.full__date}>
                {formatDate(publishedAt)}
              </span>
            )}
          </div>
        </div>
        <span
          className={styles.full__status}
          style={{
            background: `${STATUS_COLOURS[currentStatus]}18`,
            color:       STATUS_COLOURS[currentStatus],
            borderColor: `${STATUS_COLOURS[currentStatus]}40`,
          }}
        >
          {STATUS_LABELS[currentStatus]}
        </span>
      </div>

      {/* The human story — the centre */}
      <blockquote className={styles.full__story}>
        "{humanStory.originStory}"
      </blockquote>

      {/* Creator details */}
      <div className={styles.full__creator}>
        <div className={styles.full__creator__name}>
          {humanStory.displayName}
        </div>
        <div className={styles.full__creator__meta}>
          {humanStory.ageAtCreation && (
            <span className={styles.full__creator__tag}>
              {ageLabel(humanStory.ageAtCreation)}
            </span>
          )}
          {humanStory.cohort && (
            <span className={styles.full__creator__tag}>
              {humanStory.cohort}
            </span>
          )}
          {humanStory.heritageNote && (
            <span className={styles.full__creator__tag}>
              {humanStory.heritageNote}
            </span>
          )}
          {humanStory.platformOrigin && (
            <span className={styles.full__creator__tag}>
              {humanStory.platformOrigin}
            </span>
          )}
        </div>
      </div>

      {/* Journey — expandable */}
      {showJourney && journeyHighlights.length > 0 && (
        <div className={styles.full__journey}>
          <button
            className={styles.full__journey__toggle}
            onClick={() => setJourneyExpanded(v => !v)}
            aria-expanded={journeyExpanded}
          >
            <span>The journey</span>
            <span className={styles.full__journey__count}>
              {journeyHighlights.length} stop{journeyHighlights.length !== 1 ? 's' : ''}
            </span>
            <span
              className={styles.full__journey__chevron}
              aria-hidden="true"
            >
              {journeyExpanded ? '▲' : '▼'}
            </span>
          </button>

          {journeyExpanded && (
            <div className={styles.full__journey__steps}>
              {journeyHighlights.map((stop, i) => (
                <div
                  key={`${stop.programme}-${stop.action}-${i}`}
                  className={styles.full__step}
                >
                  <div
                    className={styles.full__step__marker}
                    style={{ background: PROGRAMME_COLOURS[stop.programme] }}
                  />
                  <div className={styles.full__step__body}>
                    <div className={styles.full__step__header}>
                      <button
                        className={styles.full__step__prog}
                        style={{ color: PROGRAMME_COLOURS[stop.programme] }}
                        onClick={() => onProgrammeClick?.(stop.programme)}
                      >
                        {ACTION_ICONS[stop.action] ?? '·'}{' '}
                        {PROGRAMME_LABELS[stop.programme]}
                      </button>
                      <span className={styles.full__step__action}>
                        {stop.action}
                      </span>
                      <span className={styles.full__step__date}>
                        {formatDate(stop.date)}
                      </span>
                    </div>
                    {stop.note && (
                      <p className={styles.full__step__note}>{stop.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cross-programme connections */}
      {connections.length > 0 && (
        <div className={styles.full__connections}>
          <span className={styles.full__connections__label}>Connected to</span>
          <div className={styles.full__connections__list}>
            {connections.map((conn, i) => (
              <button
                key={i}
                className={styles.full__connection}
                style={{
                  borderColor: `${PROGRAMME_COLOURS[conn.programme]}40`,
                  color: PROGRAMME_COLOURS[conn.programme],
                }}
                onClick={() => onProgrammeClick?.(conn.programme)}
              >
                <span className={styles.full__connection__type}>
                  {conn.type.replace(/-/g, ' ')}
                </span>
                <span className={styles.full__connection__label}>
                  {conn.label}
                </span>
                <span className={styles.full__connection__prog}>
                  {PROGRAMME_LABELS[conn.programme]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// MAIN COMPONENT
// Routes to the right size.
// ─────────────────────────────────────────

const ContentJourneyBadge: React.FC<ContentJourneyBadgeProps> = ({
  content,
  size = 'compact',
  showJourney,
  showRevenue = false,
  className = '',
  onProgrammeClick,
}) => {
  const shouldShowJourney = showJourney ?? (size !== 'micro');

  return (
    <div
      className={`${styles.badge} ${styles[`badge--${size}`]} ${className}`}
      data-programme={content.originProgramme}
      data-status={content.currentStatus}
    >
      {size === 'micro' && (
        <MicroBadge
          content={content}
          onProgrammeClick={onProgrammeClick}
        />
      )}
      {size === 'compact' && (
        <CompactBadge
          content={content}
          showJourney={shouldShowJourney}
          onProgrammeClick={onProgrammeClick}
        />
      )}
      {size === 'full' && (
        <FullBadge
          content={content}
          showJourney={shouldShowJourney}
          onProgrammeClick={onProgrammeClick}
        />
      )}
    </div>
  );
};

export default ContentJourneyBadge;