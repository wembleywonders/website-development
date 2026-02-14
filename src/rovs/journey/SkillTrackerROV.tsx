/**
 * SKILL TRACKER ROV
 * 
 * Helps creators identify skill gaps and plan their learning.
 * Maps skills to programmes, tracks progress, recommends next steps.
 * 
 * Philosophy: You don't need to learn everything.
 * Focus on skills that serve your goals.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface SkillProfile {
  id: string;
  name: string;
  programme: string;
  workshopsCompleted: number;
  skills: SkillAssessment[];
  goals: string[];
  preferredLearningStyle: 'video' | 'reading' | 'hands-on' | 'mixed';
}

export interface SkillAssessment {
  skillId: string;
  level: 0 | 1 | 2 | 3 | 4 | 5; // 0=none, 1=aware, 2=beginner, 3=intermediate, 4=advanced, 5=expert
  lastPracticed?: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface Skill {
  id: string;
  name: string;
  category: 'core' | 'technical' | 'business' | 'soft';
  description: string;
  programmes: string[];
  prerequisites: string[];
  levels: SkillLevel[];
  resources: LearningResource[];
}

export interface SkillLevel {
  level: number;
  name: string;
  description: string;
  criteria: string[];
}

export interface LearningResource {
  title: string;
  type: 'video' | 'article' | 'course' | 'practice' | 'workshop';
  url?: string;
  isWW: boolean;
  forLevel: number[];
  estimatedTime: string;
}

export interface SkillRecommendation {
  skill: Skill;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  nextAction: string;
}

// ============================================================
// SKILL DATABASE
// ============================================================

const SKILLS: Skill[] = [
  // Core Creative Skills
  {
    id: 'creative-thinking',
    name: 'Creative Thinking',
    category: 'core',
    description: 'Generating original ideas and solutions',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Understands creativity can be developed', criteria: ['Recognizes creative work'] },
      { level: 2, name: 'Beginner', description: 'Can brainstorm with prompts', criteria: ['Generates 5+ ideas on a topic', 'Uses brainstorming techniques'] },
      { level: 3, name: 'Intermediate', description: 'Generates original concepts', criteria: ['Creates unique solutions', 'Combines ideas in new ways'] },
      { level: 4, name: 'Advanced', description: 'Consistent creative output', criteria: ['Regular ideation practice', 'Develops signature style'] },
      { level: 5, name: 'Expert', description: 'Teaches and inspires others', criteria: ['Mentors other creators', 'Recognized creative voice'] }
    ],
    resources: [
      { title: 'WW Creative Foundations Workshop', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'The Artist\'s Way (Julia Cameron)', type: 'course', isWW: false, forLevel: [2, 3], estimatedTime: '12 weeks' }
    ]
  },
  {
    id: 'project-completion',
    name: 'Project Completion',
    category: 'core',
    description: 'Starting and finishing creative projects',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Starts projects', criteria: ['Has begun a project'] },
      { level: 2, name: 'Beginner', description: 'Finishes simple projects', criteria: ['Completed 1-2 small projects'] },
      { level: 3, name: 'Intermediate', description: 'Reliably completes work', criteria: ['Completed 5+ projects', 'Meets self-set deadlines'] },
      { level: 4, name: 'Advanced', description: 'Manages complex projects', criteria: ['Handles multi-week projects', 'Manages scope effectively'] },
      { level: 5, name: 'Expert', description: 'Ships consistently', criteria: ['Regular output', 'Teaches project management'] }
    ],
    resources: [
      { title: 'Getting Things Done for Creatives', type: 'article', isWW: false, forLevel: [1, 2], estimatedTime: '30 min' }
    ]
  },
  
  // Technical - Music (Trubble n Bass)
  {
    id: 'beat-production',
    name: 'Beat Production',
    category: 'technical',
    description: 'Creating instrumental tracks and beats',
    programmes: ['trubble-n-bass'],
    prerequisites: ['daw-basics'],
    levels: [
      { level: 1, name: 'Aware', description: 'Understands beat structure', criteria: ['Knows drum patterns', 'Recognizes BPM'] },
      { level: 2, name: 'Beginner', description: 'Creates basic loops', criteria: ['Makes 4-bar loops', 'Uses samples'] },
      { level: 3, name: 'Intermediate', description: 'Produces full beats', criteria: ['Completes full arrangements', 'Creates original patterns'] },
      { level: 4, name: 'Advanced', description: 'Develops signature sound', criteria: ['Consistent style', 'Complex arrangements'] },
      { level: 5, name: 'Expert', description: 'Industry-ready production', criteria: ['Commercial quality', 'Teaches others'] }
    ],
    resources: [
      { title: 'WW Beat Making 101', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'BeatMaker ROV Guidance', type: 'practice', isWW: true, forLevel: [2, 3, 4], estimatedTime: 'Ongoing' }
    ]
  },
  {
    id: 'daw-basics',
    name: 'DAW Basics',
    category: 'technical',
    description: 'Using digital audio workstation software',
    programmes: ['trubble-n-bass'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows what a DAW is', criteria: ['Can name DAW software'] },
      { level: 2, name: 'Beginner', description: 'Basic navigation', criteria: ['Creates project', 'Adds tracks', 'Basic playback'] },
      { level: 3, name: 'Intermediate', description: 'Efficient workflow', criteria: ['Uses keyboard shortcuts', 'Manages sessions'] },
      { level: 4, name: 'Advanced', description: 'Power user', criteria: ['Complex routing', 'Templates', 'Automation'] },
      { level: 5, name: 'Expert', description: 'Teaches DAW use', criteria: ['Knows multiple DAWs', 'Troubleshoots issues'] }
    ],
    resources: [
      { title: 'BandLab Beginner Tutorial', type: 'video', isWW: false, forLevel: [1, 2], estimatedTime: '1 hour' }
    ]
  },
  
  // Technical - Design (Kaywana's Court)
  {
    id: 'visual-design',
    name: 'Visual Design',
    category: 'technical',
    description: 'Creating visually appealing graphics and layouts',
    programmes: ['kawanas-court'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Recognizes good design', criteria: ['Can identify well-designed work'] },
      { level: 2, name: 'Beginner', description: 'Uses templates', criteria: ['Modifies templates', 'Basic Canva use'] },
      { level: 3, name: 'Intermediate', description: 'Creates original designs', criteria: ['Designs from scratch', 'Understands principles'] },
      { level: 4, name: 'Advanced', description: 'Consistent quality', criteria: ['Develops brand systems', 'Client work'] },
      { level: 5, name: 'Expert', description: 'Design leader', criteria: ['Teaches design', 'Industry recognition'] }
    ],
    resources: [
      { title: 'WW Design Foundations', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'DesignCoach ROV', type: 'practice', isWW: true, forLevel: [2, 3, 4], estimatedTime: 'Ongoing' }
    ]
  },
  {
    id: 'color-theory',
    name: 'Color Theory',
    category: 'technical',
    description: 'Understanding and applying color effectively',
    programmes: ['kawanas-court'],
    prerequisites: ['visual-design'],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows colors affect mood', criteria: ['Basic color awareness'] },
      { level: 2, name: 'Beginner', description: 'Uses color tools', criteria: ['Uses palette generators', 'Follows guidelines'] },
      { level: 3, name: 'Intermediate', description: 'Creates palettes', criteria: ['Builds custom palettes', 'Understands harmony'] },
      { level: 4, name: 'Advanced', description: 'Strategic color use', criteria: ['Color for branding', 'Accessibility aware'] },
      { level: 5, name: 'Expert', description: 'Color mastery', criteria: ['Teaches color theory', 'Creates systems'] }
    ],
    resources: [
      { title: 'Coolors.co Tutorial', type: 'video', isWW: false, forLevel: [1, 2], estimatedTime: '20 min' }
    ]
  },
  
  // Technical - Writing (PageTurners)
  {
    id: 'writing-craft',
    name: 'Writing Craft',
    category: 'technical',
    description: 'Creating clear, engaging written content',
    programmes: ['page-turners'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Writes when needed', criteria: ['Can write basic messages'] },
      { level: 2, name: 'Beginner', description: 'Structured writing', criteria: ['Writes with intro/body/conclusion', 'Basic grammar'] },
      { level: 3, name: 'Intermediate', description: 'Engaging content', criteria: ['Writes for audience', 'Develops voice'] },
      { level: 4, name: 'Advanced', description: 'Professional quality', criteria: ['Consistent output', 'Multiple formats'] },
      { level: 5, name: 'Expert', description: 'Published writer', criteria: ['Regular publication', 'Teaches writing'] }
    ],
    resources: [
      { title: 'WW Writing Workshop', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'WriterAssist ROV', type: 'practice', isWW: true, forLevel: [2, 3, 4], estimatedTime: 'Ongoing' }
    ]
  },
  
  // Technical - Video (G-Tech Casters)
  {
    id: 'video-production',
    name: 'Video Production',
    category: 'technical',
    description: 'Creating and editing video content',
    programmes: ['g-tech-casters'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Watches video content', criteria: ['Understands video formats'] },
      { level: 2, name: 'Beginner', description: 'Basic recording', criteria: ['Records on phone', 'Simple cuts'] },
      { level: 3, name: 'Intermediate', description: 'Edited content', criteria: ['Full edit workflow', 'Adds music/text'] },
      { level: 4, name: 'Advanced', description: 'Professional quality', criteria: ['Lighting, audio, editing', 'Consistent style'] },
      { level: 5, name: 'Expert', description: 'Production lead', criteria: ['Teaches production', 'Complex projects'] }
    ],
    resources: [
      { title: 'WW Video Basics', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'VideoGuide ROV', type: 'practice', isWW: true, forLevel: [2, 3, 4], estimatedTime: 'Ongoing' }
    ]
  },
  
  // Technical - Code (TECHreneurs)
  {
    id: 'web-development',
    name: 'Web Development',
    category: 'technical',
    description: 'Building websites and web applications',
    programmes: ['techreneurs'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Uses websites', criteria: ['Understands web basics'] },
      { level: 2, name: 'Beginner', description: 'Basic HTML/CSS', criteria: ['Creates simple pages', 'Modifies templates'] },
      { level: 3, name: 'Intermediate', description: 'Builds sites', criteria: ['Full website creation', 'Responsive design'] },
      { level: 4, name: 'Advanced', description: 'Web apps', criteria: ['JavaScript', 'APIs', 'Frameworks'] },
      { level: 5, name: 'Expert', description: 'Full-stack', criteria: ['Frontend + backend', 'Teaches development'] }
    ],
    resources: [
      { title: 'WW Web Dev Intro', type: 'workshop', isWW: true, forLevel: [1, 2], estimatedTime: '2 hours' },
      { title: 'CodeMentor ROV', type: 'practice', isWW: true, forLevel: [2, 3, 4], estimatedTime: 'Ongoing' }
    ]
  },
  
  // Business Skills
  {
    id: 'pricing',
    name: 'Pricing Your Work',
    category: 'business',
    description: 'Setting appropriate prices for products and services',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows pricing matters', criteria: ['Understands need to charge'] },
      { level: 2, name: 'Beginner', description: 'Sets basic prices', criteria: ['Uses market research', 'Has a rate'] },
      { level: 3, name: 'Intermediate', description: 'Strategic pricing', criteria: ['Tiers and packages', 'Value-based'] },
      { level: 4, name: 'Advanced', description: 'Optimized pricing', criteria: ['Tests prices', 'Maximizes value'] },
      { level: 5, name: 'Expert', description: 'Pricing strategist', criteria: ['Teaches pricing', 'Consults on rates'] }
    ],
    resources: [
      { title: 'Pricing Advisor ROV', type: 'practice', isWW: true, forLevel: [1, 2, 3], estimatedTime: '30 min' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Promotion',
    category: 'business',
    description: 'Getting your work seen by potential customers',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows marketing is needed', criteria: ['Understands visibility matters'] },
      { level: 2, name: 'Beginner', description: 'Basic promotion', criteria: ['Posts on social media', 'Tells friends'] },
      { level: 3, name: 'Intermediate', description: 'Consistent marketing', criteria: ['Content strategy', 'Builds audience'] },
      { level: 4, name: 'Advanced', description: 'Effective marketing', criteria: ['Converts followers to customers', 'Multiple channels'] },
      { level: 5, name: 'Expert', description: 'Marketing lead', criteria: ['Teaches marketing', 'Large audience'] }
    ],
    resources: [
      { title: 'Marketing Coach ROV', type: 'practice', isWW: true, forLevel: [1, 2, 3], estimatedTime: 'Ongoing' }
    ]
  },
  {
    id: 'client-management',
    name: 'Client Management',
    category: 'business',
    description: 'Working professionally with paying customers',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows clients have needs', criteria: ['Understands client relationships'] },
      { level: 2, name: 'Beginner', description: 'Basic communication', criteria: ['Responds promptly', 'Sets expectations'] },
      { level: 3, name: 'Intermediate', description: 'Professional process', criteria: ['Contracts', 'Clear boundaries'] },
      { level: 4, name: 'Advanced', description: 'Client success', criteria: ['Repeat clients', 'Referrals'] },
      { level: 5, name: 'Expert', description: 'Client expert', criteria: ['Teaches client management', 'Complex clients'] }
    ],
    resources: []
  },
  
  // Soft Skills
  {
    id: 'self-promotion',
    name: 'Self-Promotion',
    category: 'soft',
    description: 'Confidently sharing your work and abilities',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows it\'s necessary', criteria: ['Understands need to share work'] },
      { level: 2, name: 'Beginner', description: 'Shares when prompted', criteria: ['Can describe work', 'Has portfolio'] },
      { level: 3, name: 'Intermediate', description: 'Proactive sharing', criteria: ['Regular content', 'Comfortable promoting'] },
      { level: 4, name: 'Advanced', description: 'Effective promotion', criteria: ['Personal brand', 'Media features'] },
      { level: 5, name: 'Expert', description: 'Thought leader', criteria: ['Recognized voice', 'Sought for commentary'] }
    ],
    resources: [
      { title: 'Portfolio Builder ROV', type: 'practice', isWW: true, forLevel: [1, 2, 3], estimatedTime: '4 hours' }
    ]
  },
  {
    id: 'feedback-resilience',
    name: 'Feedback Resilience',
    category: 'soft',
    description: 'Receiving and using criticism constructively',
    programmes: ['all'],
    prerequisites: [],
    levels: [
      { level: 1, name: 'Aware', description: 'Knows feedback is valuable', criteria: ['Understands feedback helps growth'] },
      { level: 2, name: 'Beginner', description: 'Accepts feedback', criteria: ['Listens without defensiveness'] },
      { level: 3, name: 'Intermediate', description: 'Uses feedback', criteria: ['Implements suggestions', 'Seeks feedback'] },
      { level: 4, name: 'Advanced', description: 'Feedback expert', criteria: ['Filters useful feedback', 'Gives good feedback'] },
      { level: 5, name: 'Expert', description: 'Feedback mentor', criteria: ['Helps others with feedback', 'Creates feedback systems'] }
    ],
    resources: []
  }
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function getSkillsForProgramme(programme: string): Skill[] {
  return SKILLS.filter(s => s.programmes.includes('all') || s.programmes.includes(programme));
}

function assessSkillLevel(profile: SkillProfile, skillId: string): number {
  const assessment = profile.skills.find(s => s.skillId === skillId);
  return assessment?.level || 0;
}

function getSkillRecommendations(profile: SkillProfile): SkillRecommendation[] {
  const programmeSkills = getSkillsForProgramme(profile.programme);
  const recommendations: SkillRecommendation[] = [];
  
  programmeSkills.forEach(skill => {
    const currentLevel = assessSkillLevel(profile, skill.id);
    
    // Recommend skills at level 0-2
    if (currentLevel < 3) {
      let priority: 'high' | 'medium' | 'low' = 'low';
      let reason = '';
      
      if (skill.category === 'core' && currentLevel < 2) {
        priority = 'high';
        reason = 'Core skill needed for all creators';
      } else if (skill.category === 'technical' && currentLevel < 2) {
        priority = 'high';
        reason = `Essential for ${profile.programme}`;
      } else if (skill.category === 'business' && profile.workshopsCompleted > 3) {
        priority = 'medium';
        reason = 'Time to start thinking about business';
      } else {
        priority = 'low';
        reason = 'Will help your growth';
      }
      
      recommendations.push({
        skill,
        reason,
        priority,
        nextAction: skill.levels[currentLevel + 1]?.criteria[0] || 'Continue practicing'
      });
    }
  });
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// ============================================================
// COMPONENT
// ============================================================

export interface SkillTrackerROVProps {
  profile: SkillProfile;
  onSkillSelect?: (skill: Skill) => void;
  onResourceClick?: (resource: LearningResource) => void;
}

export const SkillTrackerROV: React.FC<SkillTrackerROVProps> = ({
  profile,
  onSkillSelect,
  onResourceClick
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'technical' | 'business' | 'soft'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const programmeSkills = useMemo(() => getSkillsForProgramme(profile.programme), [profile.programme]);
  const recommendations = useMemo(() => getSkillRecommendations(profile), [profile]);
  
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return programmeSkills;
    return programmeSkills.filter(s => s.category === activeCategory);
  }, [programmeSkills, activeCategory]);
  
  const skillLevelCounts = useMemo(() => {
    const counts = { beginner: 0, intermediate: 0, advanced: 0, expert: 0 };
    programmeSkills.forEach(skill => {
      const level = assessSkillLevel(profile, skill.id);
      if (level >= 5) counts.expert++;
      else if (level >= 4) counts.advanced++;
      else if (level >= 3) counts.intermediate++;
      else if (level >= 1) counts.beginner++;
    });
    return counts;
  }, [programmeSkills, profile]);
  
  return (
    <div className="skill-tracker-rov">
      <div className="skill-tracker-rov__header">
        <div className="skill-tracker-rov__avatar">📊</div>
        <div className="skill-tracker-rov__info">
          <h2>Skill Tracker</h2>
          <span>Know What to Learn Next</span>
        </div>
      </div>
      
      {/* Overview */}
      <div className="skill-tracker-rov__overview">
        <div className="level-counts">
          <div className="count">
            <span className="value">{skillLevelCounts.beginner}</span>
            <span className="label">Learning</span>
          </div>
          <div className="count">
            <span className="value">{skillLevelCounts.intermediate}</span>
            <span className="label">Intermediate</span>
          </div>
          <div className="count">
            <span className="value">{skillLevelCounts.advanced}</span>
            <span className="label">Advanced</span>
          </div>
          <div className="count">
            <span className="value">{skillLevelCounts.expert}</span>
            <span className="label">Expert</span>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="skill-tracker-rov__recommendations">
          <h3>🎯 Recommended Focus</h3>
          <div className="recommendation-list">
            {recommendations.slice(0, 3).map(rec => (
              <div 
                key={rec.skill.id}
                className={`recommendation-card priority-${rec.priority}`}
                onClick={() => setSelectedSkill(rec.skill)}
              >
                <h4>{rec.skill.name}</h4>
                <p className="reason">{rec.reason}</p>
                <p className="next-action">Next: {rec.nextAction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Category Filter */}
      <div className="skill-tracker-rov__filters">
        {['all', 'core', 'technical', 'business', 'soft'].map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => setActiveCategory(cat as any)}
          >
            {cat === 'all' && '📋 All'}
            {cat === 'core' && '🎯 Core'}
            {cat === 'technical' && '🔧 Technical'}
            {cat === 'business' && '💼 Business'}
            {cat === 'soft' && '🤝 Soft Skills'}
          </button>
        ))}
      </div>
      
      {/* Skills Grid */}
      <div className="skill-tracker-rov__skills">
        {filteredSkills.map(skill => {
          const level = assessSkillLevel(profile, skill.id);
          const levelInfo = skill.levels[level] || skill.levels[0];
          
          return (
            <div 
              key={skill.id}
              className={`skill-card level-${level}`}
              onClick={() => setSelectedSkill(skill)}
            >
              <div className="skill-header">
                <h4>{skill.name}</h4>
                <span className="skill-level">{levelInfo?.name || 'Not started'}</span>
              </div>
              <p>{skill.description}</p>
              <div className="skill-progress">
                {[1, 2, 3, 4, 5].map(l => (
                  <span 
                    key={l} 
                    className={`progress-dot ${l <= level ? 'filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="skill-tracker-rov__modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedSkill(null)}>×</button>
            <h3>{selectedSkill.name}</h3>
            <p>{selectedSkill.description}</p>
            
            <div className="skill-levels">
              <h4>Levels</h4>
              {selectedSkill.levels.map(level => {
                const currentLevel = assessSkillLevel(profile, selectedSkill.id);
                const isAchieved = currentLevel >= level.level;
                const isCurrent = currentLevel === level.level - 1;
                
                return (
                  <div 
                    key={level.level}
                    className={`level-item ${isAchieved ? 'achieved' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <span className="level-number">{level.level}</span>
                    <div className="level-info">
                      <strong>{level.name}</strong>
                      <p>{level.description}</p>
                      <ul>
                        {level.criteria.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {selectedSkill.resources.length > 0 && (
              <div className="skill-resources">
                <h4>Learning Resources</h4>
                {selectedSkill.resources.map((resource, i) => (
                  <button
                    key={i}
                    className={`resource-item ${resource.isWW ? 'ww' : ''}`}
                    onClick={() => onResourceClick?.(resource)}
                  >
                    <span className="resource-type">
                      {resource.type === 'video' && '🎥'}
                      {resource.type === 'article' && '📄'}
                      {resource.type === 'course' && '📚'}
                      {resource.type === 'practice' && '🛠️'}
                      {resource.type === 'workshop' && '👥'}
                    </span>
                    <div className="resource-info">
                      <strong>{resource.title}</strong>
                      <span>{resource.estimatedTime}</span>
                    </div>
                    {resource.isWW && <span className="ww-badge">WW</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="skill-tracker-rov__footer">
        <p>
          💡 You don't need to master everything. Focus on skills that serve your goals.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { SKILLS, getSkillsForProgramme, getSkillRecommendations };
export default SkillTrackerROV;