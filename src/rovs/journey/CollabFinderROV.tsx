/**
 * COLLAB FINDER ROV
 * 
 * Helps creators find collaboration partners within WW.
 * Matches based on skills, programmes, and collaboration style.
 * 
 * Philosophy: Collaboration multiplies creativity.
 * The right partner makes 1+1=3.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';

// ============================================================
// TYPES
// ============================================================

export interface CollabProfile {
  id: string;
  name: string;
  avatar?: string;
  programme: string;
  skills: string[];
  lookingFor: string[];
  collabStyle: CollabStyle[];
  availability: 'high' | 'medium' | 'low';
  projectsCompleted: number;
  rating: number;
  bio: string;
  portfolio?: string;
  location?: string;
}

export type CollabStyle = 
  | 'equal-partners'      // 50/50 collaboration
  | 'lead-support'        // One leads, one supports
  | 'skill-swap'          // Trade services
  | 'learning-together'   // Both learning
  | 'mentor-mentee';      // Teaching relationship

export type CollabType = 
  | 'music-visual'        // Beat maker + designer
  | 'content-creation'    // Writer + video
  | 'product-launch'      // Designer + marketer
  | 'tech-creative'       // Developer + creative
  | 'cross-programme';    // Any cross-programme

export interface CollabOpportunity {
  id: string;
  type: CollabType;
  title: string;
  description: string;
  creatorId: string;
  skills_needed: string[];
  skills_offered: string[];
  timeline: string;
  compensation: 'revenue-share' | 'skill-swap' | 'paid' | 'portfolio';
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface CollabMatch {
  creator: CollabProfile;
  matchScore: number;
  matchReasons: string[];
  collabPotential: CollabType[];
}

// ============================================================
// COLLABORATION TEMPLATES
// ============================================================

const COLLAB_TEMPLATES: { type: CollabType; title: string; description: string; programmes: string[] }[] = [
  {
    type: 'music-visual',
    title: 'Music + Visuals',
    description: 'Beat maker pairs with designer for cover art, visualizers, or brand identity',
    programmes: ['trubble-n-bass', 'kawanas-court']
  },
  {
    type: 'content-creation',
    title: 'Content Creation',
    description: 'Writer pairs with video creator for scripts, captions, or full video content',
    programmes: ['page-turners', 'g-tech-casters']
  },
  {
    type: 'product-launch',
    title: 'Product Launch',
    description: 'Designer pairs with someone who can help with marketing and launch strategy',
    programmes: ['kawanas-court', 'techreneurs']
  },
  {
    type: 'tech-creative',
    title: 'Tech + Creative',
    description: 'Developer builds tools or platforms for creative work',
    programmes: ['techreneurs', 'trubble-n-bass', 'kawanas-court', 'page-turners', 'g-tech-casters']
  },
  {
    type: 'cross-programme',
    title: 'Cross-Programme',
    description: 'Any collaboration across different WW programmes',
    programmes: ['all']
  }
];

// ============================================================
// MATCHING LOGIC
// ============================================================

function calculateMatchScore(seeker: CollabProfile, candidate: CollabProfile): number {
  let score = 0;
  
  // Skill complement (seeker wants what candidate has)
  const skillMatch = seeker.lookingFor.filter(skill => 
    candidate.skills.includes(skill)
  ).length;
  score += skillMatch * 20;
  
  // Mutual benefit (candidate also looking for seeker's skills)
  const mutualMatch = candidate.lookingFor.filter(skill =>
    seeker.skills.includes(skill)
  ).length;
  score += mutualMatch * 15;
  
  // Collaboration style overlap
  const styleMatch = seeker.collabStyle.filter(style =>
    candidate.collabStyle.includes(style)
  ).length;
  score += styleMatch * 10;
  
  // Different programmes = interesting cross-pollination
  if (seeker.programme !== candidate.programme) {
    score += 10;
  }
  
  // Availability alignment
  if (seeker.availability === candidate.availability) {
    score += 5;
  }
  
  // Experience balance (not too far apart)
  const experienceDiff = Math.abs(seeker.projectsCompleted - candidate.projectsCompleted);
  if (experienceDiff < 5) {
    score += 10;
  }
  
  // Good rating
  if (candidate.rating >= 4.5) {
    score += 10;
  }
  
  return Math.min(score, 100);
}

function getMatchReasons(seeker: CollabProfile, candidate: CollabProfile): string[] {
  const reasons: string[] = [];
  
  const skillMatch = seeker.lookingFor.filter(skill => 
    candidate.skills.includes(skill)
  );
  if (skillMatch.length > 0) {
    reasons.push(`Has ${skillMatch.join(', ')} skills you're looking for`);
  }
  
  const mutualMatch = candidate.lookingFor.filter(skill =>
    seeker.skills.includes(skill)
  );
  if (mutualMatch.length > 0) {
    reasons.push(`Looking for ${mutualMatch.join(', ')} that you offer`);
  }
  
  if (seeker.programme !== candidate.programme) {
    reasons.push(`Cross-programme collaboration potential`);
  }
  
  const styleMatch = seeker.collabStyle.filter(style =>
    candidate.collabStyle.includes(style)
  );
  if (styleMatch.length > 0) {
    reasons.push(`Compatible collaboration style`);
  }
  
  return reasons;
}

function getCollabPotential(seeker: CollabProfile, candidate: CollabProfile): CollabType[] {
  const potential: CollabType[] = [];
  
  const programmes = [seeker.programme, candidate.programme];
  
  COLLAB_TEMPLATES.forEach(template => {
    const hasMatch = template.programmes.includes('all') ||
      template.programmes.some(p => programmes.includes(p));
    
    if (hasMatch && programmes[0] !== programmes[1]) {
      potential.push(template.type);
    }
  });
  
  if (potential.length === 0) {
    potential.push('cross-programme');
  }
  
  return potential;
}

function findMatches(seeker: CollabProfile, creators: CollabProfile[]): CollabMatch[] {
  return creators
    .filter(c => c.id !== seeker.id)
    .map(candidate => ({
      creator: candidate,
      matchScore: calculateMatchScore(seeker, candidate),
      matchReasons: getMatchReasons(seeker, candidate),
      collabPotential: getCollabPotential(seeker, candidate)
    }))
    .filter(match => match.matchScore > 20)
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ============================================================
// COMPONENT
// ============================================================

export interface CollabFinderROVProps {
  profile: CollabProfile;
  availableCreators: CollabProfile[];
  opportunities?: CollabOpportunity[];
  onConnect?: (creatorId: string) => void;
  onCreateOpportunity?: (opportunity: Partial<CollabOpportunity>) => void;
}

export const CollabFinderROV: React.FC<CollabFinderROVProps> = ({
  profile,
  availableCreators,
  opportunities = [],
  onConnect,
  onCreateOpportunity
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'opportunities' | 'create'>('matches');
  const [selectedMatch, setSelectedMatch] = useState<CollabMatch | null>(null);
  
  const matches = useMemo(() => findMatches(profile, availableCreators), [profile, availableCreators]);
  
  const openOpportunities = useMemo(() => 
    opportunities.filter(o => o.status === 'open'),
    [opportunities]
  );
  
  return (
    <div className="collab-finder-rov">
      <div className="collab-finder-rov__header">
        <div className="collab-finder-rov__avatar">🤝</div>
        <div className="collab-finder-rov__info">
          <h2>Collab Finder</h2>
          <span>Find Your Creative Partner</span>
        </div>
      </div>
      
      {/* Profile Summary */}
      <div className="collab-finder-rov__profile-summary">
        <p>
          <strong>Your skills:</strong> {profile.skills.join(', ')}
        </p>
        <p>
          <strong>Looking for:</strong> {profile.lookingFor.join(', ')}
        </p>
        <p>
          <strong>Collab style:</strong> {profile.collabStyle.map(s => 
            s.replace(/-/g, ' ')
          ).join(', ')}
        </p>
      </div>
      
      {/* Tabs */}
      <div className="collab-finder-rov__tabs">
        <button 
          className={activeTab === 'matches' ? 'active' : ''}
          onClick={() => setActiveTab('matches')}
        >
          ✨ Matches ({matches.length})
        </button>
        <button 
          className={activeTab === 'opportunities' ? 'active' : ''}
          onClick={() => setActiveTab('opportunities')}
        >
          📋 Opportunities ({openOpportunities.length})
        </button>
        <button 
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          ➕ Post Opportunity
        </button>
      </div>
      
      {/* Matches Tab */}
      {activeTab === 'matches' && (
        <div className="collab-finder-rov__matches">
          {matches.length === 0 ? (
            <div className="no-matches">
              <p>No strong matches found yet.</p>
              <p>Try updating your profile with more specific skills you're looking for.</p>
            </div>
          ) : (
            <div className="match-list">
              {matches.slice(0, 10).map(match => (
                <div 
                  key={match.creator.id}
                  className="match-card"
                  onClick={() => setSelectedMatch(match)}
                >
                  <div className="match-header">
                    <div className="match-avatar">
                      {match.creator.avatar ? (
                        <img src={match.creator.avatar} alt={match.creator.name} />
                      ) : (
                        <span>{match.creator.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="match-info">
                      <h4>{match.creator.name}</h4>
                      <span className="programme">{match.creator.programme}</span>
                    </div>
                    <div className="match-score">
                      <span className="score">{match.matchScore}%</span>
                      <span className="label">match</span>
                    </div>
                  </div>
                  
                  <div className="match-skills">
                    {match.creator.skills.slice(0, 4).map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="match-reasons">
                    {match.matchReasons.slice(0, 2).map((reason, i) => (
                      <p key={i}>✓ {reason}</p>
                    ))}
                  </div>
                  
                  <button 
                    className="connect-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConnect?.(match.creator.id);
                    }}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="collab-finder-rov__opportunities">
          {openOpportunities.length === 0 ? (
            <div className="no-opportunities">
              <p>No open opportunities right now.</p>
              <p>Create one to find collaborators!</p>
            </div>
          ) : (
            <div className="opportunity-list">
              {openOpportunities.map(opp => (
                <div key={opp.id} className="opportunity-card">
                  <h4>{opp.title}</h4>
                  <p>{opp.description}</p>
                  <div className="opportunity-meta">
                    <span className="compensation">{opp.compensation.replace(/-/g, ' ')}</span>
                    <span className="timeline">{opp.timeline}</span>
                  </div>
                  <div className="opportunity-skills">
                    <strong>Needs:</strong>
                    {opp.skills_needed.map(skill => (
                      <span key={skill} className="skill-tag needed">{skill}</span>
                    ))}
                  </div>
                  <div className="opportunity-skills">
                    <strong>Offers:</strong>
                    {opp.skills_offered.map(skill => (
                      <span key={skill} className="skill-tag offered">{skill}</span>
                    ))}
                  </div>
                  <button className="apply-btn">Express Interest</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="collab-finder-rov__create">
          <h3>Post a Collaboration Opportunity</h3>
          
          <div className="create-templates">
            <h4>Quick Templates</h4>
            {COLLAB_TEMPLATES.map(template => (
              <button
                key={template.type}
                className="template-btn"
                onClick={() => onCreateOpportunity?.({
                  type: template.type,
                  title: template.title,
                  description: template.description,
                  skills_needed: profile.lookingFor,
                  skills_offered: profile.skills,
                  compensation: 'revenue-share',
                  status: 'open'
                })}
              >
                <strong>{template.title}</strong>
                <p>{template.description}</p>
              </button>
            ))}
          </div>
          
          <div className="collab-tips">
            <h4>💡 Collaboration Tips</h4>
            <ul>
              <li><strong>Be specific</strong> about what you need and offer</li>
              <li><strong>Agree on terms</strong> before starting (revenue split, credit, etc.)</li>
              <li><strong>Start small</strong> - do a test project first</li>
              <li><strong>Communicate clearly</strong> - set expectations early</li>
              <li><strong>Document everything</strong> - avoid misunderstandings</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Match Detail Modal */}
      {selectedMatch && (
        <div className="collab-finder-rov__modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedMatch(null)}>×</button>
            
            <div className="modal-header">
              <div className="modal-avatar">
                {selectedMatch.creator.avatar ? (
                  <img src={selectedMatch.creator.avatar} alt={selectedMatch.creator.name} />
                ) : (
                  <span>{selectedMatch.creator.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h3>{selectedMatch.creator.name}</h3>
                <span>{selectedMatch.creator.programme}</span>
              </div>
              <div className="match-score-large">
                {selectedMatch.matchScore}% match
              </div>
            </div>
            
            <p className="bio">{selectedMatch.creator.bio}</p>
            
            <div className="modal-section">
              <h4>Skills</h4>
              <div className="skill-tags">
                {selectedMatch.creator.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="modal-section">
              <h4>Looking For</h4>
              <div className="skill-tags">
                {selectedMatch.creator.lookingFor.map(skill => (
                  <span 
                    key={skill} 
                    className={`skill-tag ${profile.skills.includes(skill) ? 'match' : ''}`}
                  >
                    {skill} {profile.skills.includes(skill) && '✓'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="modal-section">
              <h4>Why You Match</h4>
              <ul>
                {selectedMatch.matchReasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-section">
              <h4>Collaboration Potential</h4>
              <div className="collab-types">
                {selectedMatch.collabPotential.map(type => {
                  const template = COLLAB_TEMPLATES.find(t => t.type === type);
                  return template ? (
                    <div key={type} className="collab-type">
                      <strong>{template.title}</strong>
                      <p>{template.description}</p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="modal-section">
              <h4>Stats</h4>
              <div className="stats">
                <div className="stat">
                  <span className="value">{selectedMatch.creator.projectsCompleted}</span>
                  <span className="label">Projects</span>
                </div>
                <div className="stat">
                  <span className="value">⭐ {selectedMatch.creator.rating.toFixed(1)}</span>
                  <span className="label">Rating</span>
                </div>
                <div className="stat">
                  <span className="value">{selectedMatch.creator.availability}</span>
                  <span className="label">Availability</span>
                </div>
              </div>
            </div>
            
            <button 
              className="connect-btn-large"
              onClick={() => {
                onConnect?.(selectedMatch.creator.id);
                setSelectedMatch(null);
              }}
            >
              Send Connection Request
            </button>
          </div>
        </div>
      )}
      
      <div className="collab-finder-rov__footer">
        <p>
          💚 Collaboration multiplies creativity. The right partner makes 1+1=3.
        </p>
      </div>
    </div>
  );
};

// ============================================================
// EXPORTS
// ============================================================

export { COLLAB_TEMPLATES, findMatches, calculateMatchScore };
export default CollabFinderROV;