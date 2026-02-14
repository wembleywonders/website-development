/**
 * ROV SELECTOR
 * 
 * Component for selecting and launching ROVs.
 * Shows available ROVs organized by category with recommendations.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 */

import React, { useMemo } from 'react';
import { ROV_COMPONENTS, ROV_CATEGORIES, PROGRAMME_ROVS, ROVId } from '../../rovs';

// ============================================================
// TYPES
// ============================================================

export interface ROVSelectorProps {
  currentProgramme?: string;
  onSelect: (rovId: ROVId) => void;
  recommended?: ROVId[];
  compact?: boolean;
}

interface ROVInfo {
  id: ROVId;
  name: string;
  icon: string;
  description: string;
  category: 'central' | 'studio' | 'business' | 'journey';
}

// ============================================================
// ROV METADATA
// ============================================================

const ROV_INFO: Record<ROVId, Omit<ROVInfo, 'id' | 'category'>> = {
  'maya': { name: 'Maya', icon: '🌟', description: 'Central guidance for any question' },
  'beatmaker': { name: 'BeatMaker', icon: '🎵', description: 'Music production guidance' },
  'design-coach': { name: 'Design Coach', icon: '🎨', description: 'Visual design help' },
  'writer-assist': { name: 'Writer Assist', icon: '✍️', description: 'Writing and content' },
  'video-guide': { name: 'Video Guide', icon: '🎬', description: 'Video production' },
  'code-mentor': { name: 'Code Mentor', icon: '💻', description: 'Coding and tech' },
  'pricing-advisor': { name: 'Pricing Advisor', icon: '💰', description: 'What to charge' },
  'marketing-coach': { name: 'Marketing Coach', icon: '📣', description: 'Promotion and audience' },
  'portfolio-builder': { name: 'Portfolio Builder', icon: '📁', description: 'Showcase your work' },
  'finance-guide': { name: 'Finance Guide', icon: '💷', description: 'Money and tax basics' },
  'client-comms': { name: 'Client Comms', icon: '💬', description: 'Professional communication' },
  'milestone-coach': { name: 'Milestone Coach', icon: '🏆', description: 'Track achievements' },
  'skill-tracker': { name: 'Skill Tracker', icon: '📊', description: 'Plan your learning' },
  'collab-finder': { name: 'Collab Finder', icon: '🤝', description: 'Find partners' }
};

const CATEGORY_INFO = {
  central: { name: 'General', icon: '🌟', description: 'Start here for guidance' },
  studio: { name: 'Production', icon: '🎨', description: 'Create your work' },
  business: { name: 'Business', icon: '💼', description: 'Grow your income' },
  journey: { name: 'Growth', icon: '🚀', description: 'Track your progress' }
};

// ============================================================
// COMPONENT
// ============================================================

export const ROVSelector: React.FC<ROVSelectorProps> = ({
  currentProgramme,
  onSelect,
  recommended = [],
  compact = false
}) => {
  // Get programme-specific ROV
  const programmeROV = currentProgramme ? PROGRAMME_ROVS[currentProgramme] : null;
  
  // Build full ROV list with categories
  const rovsByCategory = useMemo(() => {
    const result: Record<string, ROVInfo[]> = {};
    
    Object.entries(ROV_CATEGORIES).forEach(([category, rovIds]) => {
      const ids = rovIds as ROVId[];
      result[category] = ids.map(id => ({
        id: id as ROVId,
        category: category as ROVInfo['category'],
        ...ROV_INFO[id as ROVId]
      }));
    });
    
    return result;
  }, []);
  
  if (compact) {
    return (
      <div className="rov-selector rov-selector--compact">
        <div className="rov-selector__grid">
          {Object.values(ROV_INFO).map((rov, index) => {
            const id = Object.keys(ROV_INFO)[index] as ROVId;
            const isRecommended = recommended.includes(id) || id === programmeROV;
            
            return (
              <button
                key={id}
                className={`rov-selector__item ${isRecommended ? 'recommended' : ''}`}
                onClick={() => onSelect(id)}
                title={rov.description}
              >
                <span className="icon">{rov.icon}</span>
                <span className="name">{rov.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className="rov-selector">
      <div className="rov-selector__header">
        <h2>Choose Your Guide</h2>
        <p>Select an AI assistant to help with your task</p>
      </div>
      
      {/* Recommended Section */}
      {(recommended.length > 0 || programmeROV) && (
        <div className="rov-selector__section rov-selector__section--recommended">
          <h3>✨ Recommended for You</h3>
          <div className="rov-selector__grid">
            {programmeROV && (
              <button
                className="rov-selector__card recommended"
                onClick={() => onSelect(programmeROV)}
              >
                <span className="icon">{ROV_INFO[programmeROV].icon}</span>
                <div className="info">
                  <h4>{ROV_INFO[programmeROV].name}</h4>
                  <p>{ROV_INFO[programmeROV].description}</p>
                </div>
                <span className="badge">Your Programme</span>
              </button>
            )}
            {recommended.filter(r => r !== programmeROV).map(id => (
              <button
                key={id}
                className="rov-selector__card recommended"
                onClick={() => onSelect(id)}
              >
                <span className="icon">{ROV_INFO[id].icon}</span>
                <div className="info">
                  <h4>{ROV_INFO[id].name}</h4>
                  <p>{ROV_INFO[id].description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Categories */}
      {Object.entries(rovsByCategory).map(([category, rovs]) => (
        <div key={category} className="rov-selector__section">
          <h3>
            {CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].icon}{' '}
            {CATEGORY_INFO[category as keyof typeof CATEGORY_INFO].name}
          </h3>
          <div className="rov-selector__grid">
            {rovs.map(rov => (
              <button
                key={rov.id}
                className={`rov-selector__card ${rov.id === programmeROV ? 'programme-match' : ''}`}
                onClick={() => onSelect(rov.id)}
              >
                <span className="icon">{rov.icon}</span>
                <div className="info">
                  <h4>{rov.name}</h4>
                  <p>{rov.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ROVSelector;