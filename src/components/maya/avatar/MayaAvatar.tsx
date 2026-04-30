// src/components/maya/avatar/MayaAvatar.tsx
// SVG-based avatar — no emoji, proper expressions, ROV variant support
// Expressions: neutral | thinking | helpful | concerned | excited | listening
// ROV variants: maya | narrator | maker | merchant | keeper | guardian | weaver | spark | elder

import React, { useEffect, useState } from 'react';
import { MayaAvatarProps, MayaExpression } from '../../../types/maya/avatar';
import './MayaAvatar.css';

// ── ROV colour palettes ───────────────────────────────────────────────────────

const ROV_PALETTES: Record<string, { primary: string; accent: string; skin: string; label: string }> = {
  maya:     { primary: '#7c3aed', accent: '#a78bfa', skin: '#c8a882', label: 'Maya'     },
  narrator: { primary: '#0f766e', accent: '#2dd4bf', skin: '#c8a882', label: 'Narrator' },
  maker:    { primary: '#b45309', accent: '#fbbf24', skin: '#c8a882', label: 'Maker'    },
  merchant: { primary: '#1d4ed8', accent: '#60a5fa', skin: '#c8a882', label: 'Merchant' },
  keeper:   { primary: '#065f46', accent: '#34d399', skin: '#c8a882', label: 'Keeper'   },
  guardian: { primary: '#7f1d1d', accent: '#f87171', skin: '#c8a882', label: 'Guardian' },
  weaver:   { primary: '#4c1d95', accent: '#c084fc', skin: '#c8a882', label: 'Weaver'   },
  spark:    { primary: '#be185d', accent: '#f472b6', skin: '#c8a882', label: 'Spark'    },
  elder:    { primary: '#374151', accent: '#9ca3af', skin: '#c8a882', label: 'Elder'    },
};

// ── Size map ──────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<string, number> = {
  small:  36,
  medium: 56,
  large:  80,
};

// ── Expression feature sets ───────────────────────────────────────────────────
// Each expression controls: brow angle, eye shape, mouth curve, pupil offset

interface ExpressionFeatures {
  browLeftY:   number;   // brow left end Y offset
  browRightY:  number;   // brow right end Y offset
  eyeRY:       number;   // eye vertical radius
  pupilOY:     number;   // pupil vertical offset
  mouthCurve:  number;   // mouth bezier control Y (+up, -down)
  mouthWidth:  number;   // mouth end X offset from centre
  blinkRate:   number;   // ms between blinks (0 = no blink)
}

const EXPRESSIONS: Record<MayaExpression | string, ExpressionFeatures> = {
  neutral:   { browLeftY: 0,   browRightY: 0,   eyeRY: 5,   pupilOY: 0,   mouthCurve:  3, mouthWidth: 7,  blinkRate: 4000 },
  helpful:   { browLeftY: -2,  browRightY: -2,  eyeRY: 6,   pupilOY: -1,  mouthCurve:  7, mouthWidth: 9,  blinkRate: 3000 },
  thinking:  { browLeftY: -3,  browRightY:  1,  eyeRY: 4,   pupilOY:  2,  mouthCurve:  0, mouthWidth: 5,  blinkRate: 6000 },
  concerned: { browLeftY:  2,  browRightY:  2,  eyeRY: 4.5, pupilOY:  1,  mouthCurve: -3, mouthWidth: 6,  blinkRate: 3500 },
  excited:   { browLeftY: -4,  browRightY: -4,  eyeRY: 7,   pupilOY: -2,  mouthCurve:  9, mouthWidth: 10, blinkRate: 2000 },
  listening: { browLeftY: -1,  browRightY: -1,  eyeRY: 5.5, pupilOY:  0,  mouthCurve:  2, mouthWidth: 6,  blinkRate: 3500 },
};

// ── SVG Face ──────────────────────────────────────────────────────────────────

interface FaceProps {
  features: ExpressionFeatures;
  palette:  typeof ROV_PALETTES[string];
  size:     number;
  animated: boolean;
}

const AvatarFace: React.FC<FaceProps> = ({ features, palette, size, animated }) => {
  const [blink, setBlink] = useState(false);
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r  = s * 0.42;  // face radius

  // head geometry
  const eyeLX = cx - s * 0.14;
  const eyeRX = cx + s * 0.14;
  const eyeY  = cy - s * 0.06;
  const eyeRX2 = s * 0.09;
  const eyeRY2 = features.eyeRY * (s / 56);
  const blinkRY = blink ? 1 : eyeRY2;

  // mouth
  const mW  = features.mouthWidth * (s / 56);
  const mCY = features.mouthCurve * (s / 56);
  const mY  = cy + s * 0.18;
  const mouthD = `M ${cx - mW} ${mY} Q ${cx} ${mY - mCY} ${cx + mW} ${mY}`;

  // brows
  const browY  = eyeY - s * 0.13;
  const browW  = s * 0.1;
  const browLY1 = browY + features.browLeftY  * (s / 56);
  const browRY1 = browY + features.browRightY * (s / 56);

  // blink effect
  useEffect(() => {
    if (!animated || features.blinkRate === 0) return;
    const schedule = () => {
      const t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => { setBlink(false); schedule(); }, 120);
      }, features.blinkRate + Math.random() * 1000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, [animated, features.blinkRate]);

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`bg-${palette.primary}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor={palette.accent}  stopOpacity="0.25" />
          <stop offset="100%" stopColor={palette.primary} stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id={`skin-${palette.primary}`} cx="45%" cy="35%" r="70%">
          <stop offset="0%"   stopColor="#e8c99a" />
          <stop offset="100%" stopColor={palette.skin} />
        </radialGradient>
        <filter id={`glow-${palette.primary}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r + 4} fill={`url(#bg-${palette.primary})`} />

      {/* Neck */}
      <rect
        x={cx - s * 0.08} y={cy + r * 0.72}
        width={s * 0.16} height={s * 0.12}
        rx={s * 0.04}
        fill={palette.skin}
      />

      {/* Shoulders */}
      <ellipse
        cx={cx} cy={cy + r * 0.95}
        rx={s * 0.32} ry={s * 0.1}
        fill={palette.primary}
        opacity="0.9"
      />

      {/* Head */}
      <ellipse
        cx={cx} cy={cy - s * 0.02}
        rx={r * 0.82} ry={r * 0.9}
        fill={`url(#skin-${palette.primary})`}
      />

      {/* Hair */}
      <ellipse
        cx={cx} cy={cy - r * 0.7}
        rx={r * 0.84} ry={r * 0.42}
        fill={palette.primary}
        opacity="0.95"
      />
      {/* Hair sides */}
      <ellipse cx={cx - r * 0.78} cy={cy - r * 0.3} rx={r * 0.18} ry={r * 0.5}  fill={palette.primary} opacity="0.95" />
      <ellipse cx={cx + r * 0.78} cy={cy - r * 0.3} rx={r * 0.18} ry={r * 0.5}  fill={palette.primary} opacity="0.95" />

      {/* Earrings — small accent dots */}
      <circle cx={cx - r * 0.84} cy={cy + s * 0.04} r={s * 0.025} fill={palette.accent} opacity="0.9" />
      <circle cx={cx + r * 0.84} cy={cy + s * 0.04} r={s * 0.025} fill={palette.accent} opacity="0.9" />

      {/* Left brow */}
      <line
        x1={eyeLX - browW} y1={browLY1 + s * 0.02}
        x2={eyeLX + browW} y2={browLY1 - s * 0.01}
        stroke={palette.primary} strokeWidth={s * 0.025} strokeLinecap="round"
      />
      {/* Right brow */}
      <line
        x1={eyeRX - browW} y1={browRY1 - s * 0.01}
        x2={eyeRX + browW} y2={browRY1 + s * 0.02}
        stroke={palette.primary} strokeWidth={s * 0.025} strokeLinecap="round"
      />

      {/* Left eye white */}
      <ellipse cx={eyeLX} cy={eyeY} rx={eyeRX2} ry={blinkRY} fill="white" />
      {/* Right eye white */}
      <ellipse cx={eyeRX} cy={eyeY} rx={eyeRX2} ry={blinkRY} fill="white" />

      {!blink && <>
        {/* Pupils */}
        <circle
          cx={eyeLX + s * 0.01}
          cy={eyeY + features.pupilOY * (s / 56)}
          r={s * 0.04}
          fill={palette.primary}
        />
        <circle
          cx={eyeRX + s * 0.01}
          cy={eyeY + features.pupilOY * (s / 56)}
          r={s * 0.04}
          fill={palette.primary}
        />
        {/* Eye shine */}
        <circle cx={eyeLX + s * 0.025} cy={eyeY - s * 0.02} r={s * 0.015} fill="white" opacity="0.8" />
        <circle cx={eyeRX + s * 0.025} cy={eyeY - s * 0.02} r={s * 0.015} fill="white" opacity="0.8" />
      </>}

      {/* Nose */}
      <path
        d={`M ${cx} ${cy + s * 0.04} q ${s * 0.03} ${s * 0.06} 0 ${s * 0.08}`}
        stroke={palette.skin} strokeWidth={s * 0.02} strokeLinecap="round"
        fill="none" opacity="0.5"
      />

      {/* Mouth */}
      <path
        d={mouthD}
        stroke={palette.primary}
        strokeWidth={s * 0.03}
        strokeLinecap="round"
        fill="none"
        filter={`url(#glow-${palette.primary})`}
      />

      {/* Thinking dots */}
      {features.browLeftY === -3 && (
        <>
          <circle cx={cx + r * 0.55} cy={cy - r * 0.55} r={s * 0.025} fill={palette.accent} opacity="0.7" />
          <circle cx={cx + r * 0.72} cy={cy - r * 0.72} r={s * 0.018} fill={palette.accent} opacity="0.5" />
          <circle cx={cx + r * 0.86} cy={cy - r * 0.86} r={s * 0.012} fill={palette.accent} opacity="0.3" />
        </>
      )}
    </svg>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

interface ExtendedAvatarProps extends MayaAvatarProps {
  rov?: keyof typeof ROV_PALETTES;
  showLabel?: boolean;
}

const MayaAvatar: React.FC<ExtendedAvatarProps> = ({
  expression = 'neutral',
  size      = 'medium',
  animated  = true,
  rov       = 'maya',
  showLabel = false,
}) => {
  const [currentExpression, setCurrentExpression] = useState<string>(expression);
  const [isTransitioning, setIsTransitioning]     = useState(false);

  useEffect(() => {
    if (expression === currentExpression) return;
    if (animated) {
      setIsTransitioning(true);
      const t = setTimeout(() => {
        setCurrentExpression(expression);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(t);
    }
    setCurrentExpression(expression);
  }, [expression, animated]);

  const px       = SIZE_MAP[size] ?? 56;
  const features = EXPRESSIONS[currentExpression] ?? EXPRESSIONS.neutral;
  const palette  = ROV_PALETTES[rov] ?? ROV_PALETTES.maya;

  return (
    <div
      className={`maya-avatar maya-avatar--${size} maya-avatar--${rov} ${isTransitioning ? 'maya-avatar--transitioning' : ''}`}
      role="img"
      aria-label={`${palette.label} — ${currentExpression}`}
    >
      <div
        className="maya-avatar__ring"
        style={{ '--rov-primary': palette.primary, '--rov-accent': palette.accent } as React.CSSProperties}
      >
        <AvatarFace
          features={features}
          palette={palette}
          size={px}
          animated={animated}
        />
      </div>
      {showLabel && (
        <span className="maya-avatar__label" style={{ color: palette.primary }}>
          {palette.label}
        </span>
      )}
    </div>
  );
};

export default MayaAvatar;