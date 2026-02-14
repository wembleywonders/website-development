/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * MayaAvatar - Visual representation of Maya and the Children of Anansi
 * 
 * A flexible avatar component that displays:
 * - Maya or any of her 12 children
 * - Current mood/state indicators
 * - Stage progress visualization
 * - Trust level indicators
 * - Animated presence effects
 * 
 * Part of the unified Maya-ROV system.
 */

import React, { useMemo } from 'react';
import {
  useMayaROV,
  useMayaStage,
  useMayaMode,
  useMayaPreferences
} from '../../../../maya/stores/mayaStore';
import type { ActiveChild, MayaMode, PedagogicalStage } from '../../../../maya/types/mayaTypes';

// ============================================
// TYPES
// ============================================

interface MayaAvatarProps {
  /** Override the active entity from store */
  entity?: ActiveChild;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show stage progress ring */
  showStageProgress?: boolean;
  /** Show mood indicator */
  showMood?: boolean;
  /** Show trust level */
  showTrust?: boolean;
  /** Show name label */
  showLabel?: boolean;
  /** Show role/title */
  showRole?: boolean;
  /** Animated pulse effect */
  animated?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

// ============================================
// ENTITY DATA
// ============================================

interface EntityInfo {
  name: string;
  emoji: string;
  title: string;
  color: string;
  bgGradient: string;
}

const ENTITY_INFO: Record<ActiveChild, EntityInfo> = {
  maya: {
    name: 'Maya',
    emoji: '👩🏿‍🦱',
    title: 'The Mother',
    color: '#8B4513',
    bgGradient: 'linear-gradient(135deg, #8B4513, #A0522D)'
  },
  kweku: {
    name: 'Kweku',
    emoji: '🎯',
    title: 'The Questioner',
    color: '#D32F2F',
    bgGradient: 'linear-gradient(135deg, #D32F2F, #F44336)'
  },
  ntikuma: {
    name: 'Ntikuma',
    emoji: '📊',
    title: 'The Watcher',
    color: '#1976D2',
    bgGradient: 'linear-gradient(135deg, #1976D2, #2196F3)'
  },
  anansewa: {
    name: 'Anansewa',
    emoji: '🎭',
    title: 'The Performer',
    color: '#7B1FA2',
    bgGradient: 'linear-gradient(135deg, #7B1FA2, #9C27B0)'
  },
  kofi: {
    name: 'Kofi',
    emoji: '🔧',
    title: 'The Builder',
    color: '#388E3C',
    bgGradient: 'linear-gradient(135deg, #388E3C, #4CAF50)'
  },
  afua: {
    name: 'Afua',
    emoji: '🎙️',
    title: 'The Storyteller',
    color: '#F57C00',
    bgGradient: 'linear-gradient(135deg, #F57C00, #FF9800)'
  },
  yaw: {
    name: 'Yaw',
    emoji: '📝',
    title: 'The Chronicler',
    color: '#455A64',
    bgGradient: 'linear-gradient(135deg, #455A64, #607D8B)'
  },
  esi: {
    name: 'Esi',
    emoji: '📚',
    title: 'The Keeper',
    color: '#5D4037',
    bgGradient: 'linear-gradient(135deg, #5D4037, #795548)'
  },
  kumi: {
    name: 'Kumi',
    emoji: '🎮',
    title: 'The Gamer',
    color: '#00796B',
    bgGradient: 'linear-gradient(135deg, #00796B, #009688)'
  },
  adaeze: {
    name: 'Adaeze',
    emoji: '✂️',
    title: 'The Stylist',
    color: '#C2185B',
    bgGradient: 'linear-gradient(135deg, #C2185B, #E91E63)'
  },
  nyame: {
    name: 'Nyame',
    emoji: '⚖️',
    title: 'The Philosopher',
    color: '#512DA8',
    bgGradient: 'linear-gradient(135deg, #512DA8, #673AB7)'
  },
  osei: {
    name: 'Osei',
    emoji: '✊',
    title: 'The Organizer',
    color: '#E64A19',
    bgGradient: 'linear-gradient(135deg, #E64A19, #FF5722)'
  },
  akua: {
    name: 'Akua',
    emoji: '📜',
    title: 'The Advocate',
    color: '#303F9F',
    bgGradient: 'linear-gradient(135deg, #303F9F, #3F51B5)'
  }
};

// ============================================
// SIZE CONFIGURATIONS
// ============================================

interface SizeConfig {
  container: number;
  emoji: number;
  progressRing: number;
  strokeWidth: number;
  labelSize: number;
  roleSize: number;
  moodSize: number;
}

const SIZE_CONFIGS: Record<string, SizeConfig> = {
  xs: { container: 32, emoji: 16, progressRing: 36, strokeWidth: 2, labelSize: 10, roleSize: 8, moodSize: 10 },
  sm: { container: 40, emoji: 20, progressRing: 44, strokeWidth: 2, labelSize: 11, roleSize: 9, moodSize: 12 },
  md: { container: 56, emoji: 28, progressRing: 62, strokeWidth: 3, labelSize: 13, roleSize: 11, moodSize: 14 },
  lg: { container: 72, emoji: 36, progressRing: 80, strokeWidth: 3, labelSize: 15, roleSize: 12, moodSize: 16 },
  xl: { container: 96, emoji: 48, progressRing: 104, strokeWidth: 4, labelSize: 18, roleSize: 14, moodSize: 20 }
};

// ============================================
// MOOD INDICATORS
// ============================================

type Mood = 'neutral' | 'encouraging' | 'concerned' | 'celebrating' | 'thinking' | 'listening';

const MOOD_INDICATORS: Record<Mood, { emoji: string; color: string }> = {
  neutral: { emoji: '💭', color: '#9E9E9E' },
  encouraging: { emoji: '💪', color: '#4CAF50' },
  concerned: { emoji: '💛', color: '#FFC107' },
  celebrating: { emoji: '🎉', color: '#E91E63' },
  thinking: { emoji: '🤔', color: '#2196F3' },
  listening: { emoji: '👂', color: '#9C27B0' }
};

// ============================================
// COMPONENT
// ============================================

const MayaAvatar: React.FC<MayaAvatarProps> = ({
  entity: entityOverride,
  size = 'md',
  showStageProgress = false,
  showMood = false,
  showTrust = false,
  showLabel = false,
  showRole = false,
  animated = true,
  onClick,
  className = '',
  style = {}
}) => {
  // === Store Hooks ===
  const { activeEntity, currentMood, trustRelationships } = useMayaROV();
  const { currentStage } = useMayaStage();
  const { currentMode } = useMayaMode();
  const { preferences } = useMayaPreferences();

  // === Computed Values ===
  const entity = entityOverride || activeEntity;
  const entityInfo = ENTITY_INFO[entity] || ENTITY_INFO.maya;
  const sizeConfig = SIZE_CONFIGS[size] || SIZE_CONFIGS.md;
  
  // Stage progress (1-5 mapped to 0-100%)
  const stageProgress = useMemo(() => {
    const stageNum = typeof currentStage === 'number' 
      ? currentStage 
      : parseInt(currentStage as string) || 1;
    return ((stageNum - 1) / 4) * 100;
  }, [currentStage]);

  // Trust level for current entity
  const trustLevel = useMemo(() => {
    if (entity === 'maya') return 100; // Maya always trusted
    return trustRelationships?.[entity]?.trustScore ?? 50;
  }, [entity, trustRelationships]);

  // Map store mood to our mood type
  const mood: Mood = useMemo(() => {
    if (!currentMood) return 'neutral';
    const moodMap: Record<string, Mood> = {
      'excited': 'celebrating',
      'confident': 'encouraging',
      'frustrated': 'concerned',
      'confused': 'thinking',
      'neutral': 'neutral',
      'curious': 'listening'
    };
    return moodMap[currentMood] || 'neutral';
  }, [currentMood]);

  // Mode affects appearance
  const isWitnessing = currentMode === 'WITNESS';
  const isRouting = currentMode === 'ROUTING';

  // Don't render if Maya is disabled
  if (!preferences.mayaEnabled) return null;

  // === SVG Progress Ring ===
  const renderProgressRing = () => {
    if (!showStageProgress) return null;

    const radius = (sizeConfig.progressRing - sizeConfig.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (stageProgress / 100) * circumference;

    return (
      <svg
        className="maya-avatar-progress-ring"
        width={sizeConfig.progressRing}
        height={sizeConfig.progressRing}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          pointerEvents: 'none'
        }}
      >
        {/* Background circle */}
        <circle
          cx={sizeConfig.progressRing / 2}
          cy={sizeConfig.progressRing / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={sizeConfig.strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={sizeConfig.progressRing / 2}
          cy={sizeConfig.progressRing / 2}
          r={radius}
          fill="none"
          stroke={entityInfo.color}
          strokeWidth={sizeConfig.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
    );
  };

  // === Mood Indicator ===
  const renderMoodIndicator = () => {
    if (!showMood) return null;

    const moodInfo = MOOD_INDICATORS[mood];
    return (
      <div
        className="maya-avatar-mood"
        style={{
          position: 'absolute',
          bottom: -2,
          right: -2,
          width: sizeConfig.moodSize,
          height: sizeConfig.moodSize,
          background: moodInfo.color,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: sizeConfig.moodSize * 0.6,
          border: '2px solid white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
        title={`Mood: ${mood}`}
      >
        {moodInfo.emoji}
      </div>
    );
  };

  // === Trust Indicator ===
  const renderTrustIndicator = () => {
    if (!showTrust || entity === 'maya') return null;

    const trustColor = trustLevel >= 70 ? '#4CAF50' : trustLevel >= 40 ? '#FFC107' : '#F44336';
    
    return (
      <div
        className="maya-avatar-trust"
        style={{
          position: 'absolute',
          top: -2,
          right: -2,
          background: trustColor,
          color: 'white',
          fontSize: sizeConfig.moodSize * 0.5,
          fontWeight: 600,
          padding: '1px 4px',
          borderRadius: 8,
          border: '2px solid white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
        title={`Trust: ${trustLevel}%`}
      >
        {trustLevel}
      </div>
    );
  };

  return (
    <div
      className={`maya-avatar-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        ...style
      }}
    >
      {/* Avatar Container */}
      <div
        className={`maya-avatar ${animated ? 'maya-avatar-animated' : ''} ${isWitnessing ? 'maya-avatar-witnessing' : ''}`}
        onClick={onClick}
        style={{
          position: 'relative',
          width: sizeConfig.container,
          height: sizeConfig.container,
          borderRadius: '50%',
          background: entityInfo.bgGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isRouting 
            ? `0 0 0 3px ${entityInfo.color}, 0 4px 12px rgba(0,0,0,0.15)`
            : '0 2px 8px rgba(0,0,0,0.1)'
        }}
        {...(onClick && { role: 'button' as const })}
        aria-label={`${entityInfo.name} - ${entityInfo.title}`}
      >
        {/* Emoji */}
        <span
          style={{
            fontSize: sizeConfig.emoji,
            lineHeight: 1,
            filter: isWitnessing ? 'grayscale(50%)' : 'none',
            opacity: isWitnessing ? 0.7 : 1
          }}
        >
          {entityInfo.emoji}
        </span>

        {/* Progress Ring */}
        {renderProgressRing()}

        {/* Mood Indicator */}
        {renderMoodIndicator()}

        {/* Trust Indicator */}
        {renderTrustIndicator()}

        {/* Animated Pulse (when active) */}
        {animated && !isWitnessing && (
          <div
            className="maya-avatar-pulse"
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: `2px solid ${entityInfo.color}`,
              opacity: 0,
              animation: 'maya-pulse 2s infinite'
            }}
          />
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span
          className="maya-avatar-label"
          style={{
            fontSize: sizeConfig.labelSize,
            fontWeight: 600,
            color: entityInfo.color
          }}
        >
          {entityInfo.name}
        </span>
      )}

      {/* Role */}
      {showRole && (
        <span
          className="maya-avatar-role"
          style={{
            fontSize: sizeConfig.roleSize,
            color: '#666',
            marginTop: -2
          }}
        >
          {entityInfo.title}
        </span>
      )}

      {/* Keyframe Animation */}
      <style>{`
        @keyframes maya-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.15);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        .maya-avatar:hover {
          transform: scale(1.05);
        }
        
        .maya-avatar-witnessing {
          opacity: 0.6;
        }
        
        .maya-avatar-animated:not(.maya-avatar-witnessing):hover .maya-avatar-pulse {
          animation: none;
        }
      `}</style>
    </div>
  );
};

// ============================================
// VARIANT COMPONENTS
// ============================================

/**
 * Small inline avatar for message bubbles
 */
export const MayaAvatarInline: React.FC<{ entity?: ActiveChild }> = ({ entity }) => (
  <MayaAvatar 
    entity={entity} 
    size="xs" 
    animated={false}
  />
);

/**
 * Avatar with label for headers
 */
export const MayaAvatarLabeled: React.FC<{ 
  entity?: ActiveChild; 
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}> = ({ entity, size = 'md', onClick }) => (
  <MayaAvatar 
    entity={entity} 
    size={size} 
    showLabel 
    showRole
    onClick={onClick}
  />
);

/**
 * Avatar with all indicators for dashboards
 */
export const MayaAvatarFull: React.FC<{ 
  entity?: ActiveChild;
  onClick?: () => void;
}> = ({ entity, onClick }) => (
  <MayaAvatar 
    entity={entity} 
    size="lg" 
    showLabel 
    showRole 
    showStageProgress 
    showMood 
    showTrust
    onClick={onClick}
  />
);

/**
 * Family grid showing all entities
 */
export const MayaFamilyGrid: React.FC<{
  onSelect?: (entity: ActiveChild) => void;
  selectedEntity?: ActiveChild;
  size?: 'xs' | 'sm' | 'md';
  showMaya?: boolean;
}> = ({ 
  onSelect, 
  selectedEntity, 
  size = 'sm',
  showMaya = true 
}) => {
  const entities = Object.keys(ENTITY_INFO) as ActiveChild[];
  const displayEntities = showMaya ? entities : entities.filter(e => e !== 'maya');

  return (
    <div
      className="maya-family-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        padding: 8
      }}
    >
      {displayEntities.map(entity => (
        <MayaAvatar
          key={entity}
          entity={entity}
          size={size}
          showLabel
          animated={selectedEntity === entity}
          onClick={() => onSelect?.(entity)}
          style={{
            opacity: selectedEntity && selectedEntity !== entity ? 0.5 : 1,
            transition: 'opacity 0.2s'
          }}
        />
      ))}
    </div>
  );
};

/**
 * Horizontal row of top children for quick switching
 */
export const MayaChildSwitcher: React.FC<{
  children?: ActiveChild[];
  onSelect?: (entity: ActiveChild) => void;
  maxVisible?: number;
}> = ({ 
  children: childrenProp,
  onSelect,
  maxVisible = 5
}) => {
  const { activeEntity } = useMayaROV();
  
  const displayChildren = childrenProp || 
    (['kweku', 'ntikuma', 'kofi', 'afua', 'esi'] as ActiveChild[]);

  return (
    <div
      className="maya-child-switcher"
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}
    >
      {/* Maya always first */}
      <MayaAvatar
        entity="maya"
        size="sm"
        onClick={() => onSelect?.('maya')}
        style={{
          opacity: activeEntity === 'maya' ? 1 : 0.6
        }}
      />
      
      {/* Divider */}
      <div style={{ width: 1, height: 24, background: '#ddd' }} />
      
      {/* Children */}
      {displayChildren.slice(0, maxVisible).map(child => (
        <MayaAvatar
          key={child}
          entity={child}
          size="xs"
          onClick={() => onSelect?.(child)}
          style={{
            opacity: activeEntity === child ? 1 : 0.6
          }}
        />
      ))}
    </div>
  );
};

export default MayaAvatar;