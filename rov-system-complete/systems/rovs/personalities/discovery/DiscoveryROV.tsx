// src/systems/rovs/personalities/discovery/DiscoveryROV.tsx
// 🔬 Discovery — The Lab Observer

import React from 'react';
import { ROVMessage, LearnerContext } from '../../learning-support/LearningROVSystem';

export interface DiscoveryObservation {
  id: string;
  type: 'experiment' | 'build' | 'repair' | 'practice' | 'exploration';
  activity: string;
  duration: number; // minutes
  outcome: 'success' | 'partial' | 'learning' | 'in-progress';
  skills: string[];
  notes: string;
  timestamp: Date;
}

export interface DiscoveryProps {
  learnerId: string;
  sessionId: string;
  onObservation: (observation: DiscoveryObservation) => void;
  onSkillIdentified: (skill: string, level: number) => void;
}

/**
 * Discovery ROV - Observes and documents hands-on learning
 * 
 * Personality: Curious scientist who asks "what if?" questions, loves experiments
 * Primary Role: Activity observation and skill documentation
 */
export const DiscoveryROV: React.FC<DiscoveryProps> = ({
  learnerId,
  sessionId,
  onObservation,
  onSkillIdentified
}) => {
  const [observations, setObservations] = React.useState<DiscoveryObservation[]>([]);
  const [isObserving, setIsObserving] = React.useState(false);

  const messages: Record<string, string[]> = {
    observing: [
      "Interesting approach! What made you decide to try it that way?",
      "I'm watching closely — this technique is worth documenting.",
      "Fascinating! Let me log this for your portfolio."
    ],
    logging: [
      "I noticed you spent 45 minutes on that repair — logged for your portfolio!",
      "Session recorded: 3 new skills demonstrated today.",
      "That's going in the archive — solid work!"
    ],
    experiment: [
      "Experiment complete! Success rate: 80%. That's a solid learning curve.",
      "Hypothesis tested. Results documented. Science in action!",
      "Trial and error is how we learn. This attempt taught us something."
    ],
    curiosity: [
      "What if you tried it from a different angle?",
      "Have you considered combining this with what you learned last week?",
      "Curious — what do you think would happen if...?"
    ]
  };

  const logObservation = (
    type: DiscoveryObservation['type'],
    activity: string,
    duration: number,
    outcome: DiscoveryObservation['outcome'],
    skills: string[]
  ) => {
    const observation: DiscoveryObservation = {
      id: `obs-${Date.now()}`,
      type,
      activity,
      duration,
      outcome,
      skills,
      notes: '',
      timestamp: new Date()
    };
    
    setObservations(prev => [...prev, observation]);
    onObservation(observation);
    
    // Identify skills for badge progress
    skills.forEach(skill => {
      onSkillIdentified(skill, 1);
    });
  };

  return (
    <div className="rov-discovery" data-rov="discovery">
      <div className="rov-avatar">🔬</div>
      <div className="rov-content">
        <div className="rov-name">Discovery</div>
        <div className="rov-role">Lab Observer</div>
        <div className="rov-status">
          {isObserving ? '👁️ Observing...' : '📋 Ready to observe'}
        </div>
        {observations.length > 0 && (
          <div className="rov-observations">
            <h4>Recent Observations:</h4>
            <ul>
              {observations.slice(-3).map(obs => (
                <li key={obs.id}>
                  {obs.type}: {obs.activity} ({obs.duration}min) — {obs.outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Discovery utility functions
export const discoveryUtils = {
  /**
   * Categorize activity type from description
   */
  categorizeActivity: (description: string): DiscoveryObservation['type'] => {
    const lower = description.toLowerCase();
    if (lower.includes('repair') || lower.includes('fix')) return 'repair';
    if (lower.includes('build') || lower.includes('make')) return 'build';
    if (lower.includes('test') || lower.includes('try')) return 'experiment';
    if (lower.includes('practice') || lower.includes('drill')) return 'practice';
    return 'exploration';
  },

  /**
   * Extract skills from activity
   */
  extractSkills: (activity: string, programme: string): string[] => {
    const skillMaps: Record<string, string[]> = {
      'scrap-cat': ['diagnostics', 'soldering', 'component-id', 'safety', 'documentation'],
      'g-tech-casters': ['recording', 'editing', 'mixing', 'interviewing', 'publishing'],
      'techreneurs': ['research', 'pitching', 'pricing', 'marketing', 'sales'],
      'stemgineers': ['coding', 'electronics', 'prototyping', 'debugging', 'documentation']
    };
    
    const programmeSkills = skillMaps[programme] || [];
    return programmeSkills.filter(skill => 
      activity.toLowerCase().includes(skill.substring(0, 4))
    );
  },

  /**
   * Calculate session productivity
   */
  calculateProductivity: (observations: DiscoveryObservation[]): number => {
    if (observations.length === 0) return 0;
    
    const successCount = observations.filter(o => 
      o.outcome === 'success' || o.outcome === 'partial'
    ).length;
    
    return Math.round((successCount / observations.length) * 100);
  }
};

export default DiscoveryROV;
