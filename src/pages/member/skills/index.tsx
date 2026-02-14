// src/pages/member/skills/index.tsx
import React, { useState, useEffect } from 'react';
import { MEMBERSHIP_PLANS, type MembershipTier } from '../../../types/membership';
import SkillProgressBar from '../../../components/skills/SkillProgressBar';
import ROVCoaching from '../../../components/skills/ROVCoaching';
import CertificationBadge from '../../../components/skills/CertificationBadge';
import './SkillsDevelopment.css';

interface SkillProgress {
  skillName: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  experiencePoints: number;
  lastPracticed: Date;
  rovSessions: number;
  endorsements: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned: Date;
  tier: MembershipTier;
  badge: string;
}

const SkillsDevelopmentHub: React.FC = () => {
  const [currentTier, setCurrentTier] = useState<MembershipTier>('curator');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [rovCoachingActive, setRovCoachingActive] = useState(false);

  useEffect(() => {
    // Mock data - would come from API
    const mockSkillProgress: SkillProgress[] = [
      {
        skillName: 'Cultural Intelligence',
        category: 'Relationship Building',
        currentLevel: 75,
        targetLevel: 90,
        experiencePoints: 1250,
        lastPracticed: new Date('2024-03-01'),
        rovSessions: 8,
        endorsements: 5
      },
      {
        skillName: 'Content Strategy',
        category: 'Experience Design',
        currentLevel: 85,
        targetLevel: 100,
        experiencePoints: 1800,
        lastPracticed: new Date('2024-03-03'),
        rovSessions: 12,
        endorsements: 8
      },
      {
        skillName: 'Community Facilitation',
        category: 'Leadership',
        currentLevel: 60,
        targetLevel: 85,
        experiencePoints: 900,
        lastPracticed: new Date('2024-02-28'),
        rovSessions: 6,
        endorsements: 3
      }
    ];

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Community Connector',
        description: 'Made 50+ meaningful resident connections',
        dateEarned: new Date('2024-02-15'),
        tier: 'connector',
        badge: '🤝'
      },
      {
        id: '2',
        title: 'Event Curator',
        description: 'Successfully organized 5 community events',
        dateEarned: new Date('2024-03-01'),
        tier: 'curator',
        badge: '🎯'
      }
    ];

    setSkillProgress(mockSkillProgress);
    setAchievements(mockAchievements);
  }, []);

  const currentPlan = MEMBERSHIP_PLANS.find(plan => plan.id === currentTier);
  
  const filteredSkills = selectedSkillCategory === 'all' 
    ? skillProgress 
    : skillProgress.filter(skill => skill.category === selectedSkillCategory);

  const handleSkillCategoryChange = (category: string) => {
    setSelectedSkillCategory(category);
  };

  const handleROVCoaching = (skillName: string) => {
    setRovCoachingActive(true);
    console.log(`Starting ROV coaching for: ${skillName}`);
  };

  const handleUpgradeTier = () => {
    const nextTier: MembershipTier = 
      currentTier === 'connector' ? 'curator' : 
      currentTier === 'curator' ? 'champion' : 'champion';
    
    if (nextTier !== currentTier) {
      alert(`Upgrade to ${nextTier} tier would unlock advanced skill development features!`);
    }
  };

  const getSkillCategories = () => {
    const categories = ['all', ...new Set(skillProgress.map(skill => skill.category))];
    return categories;
  };

  return (
    <div className="skills-development-hub">
      <header className="skills-header">
        <div className="container">
          <h1>Professional Skill Development</h1>
          <p>Enhance your career through community engagement</p>
        </div>
      </header>

      <div className="main-content">
        <div className="skills-overview">
          <div className="tier-status">
            <h2>Your {currentPlan?.name} Development Track</h2>
            <p>{currentPlan?.description}</p>
            <div className="tier-progress">
              <div className="progress-stats">
                <div className="stat">
                  <span className="stat-number">{skillProgress.length}</span>
                  <span className="stat-label">Active Skills</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{achievements.length}</span>
                  <span className="stat-label">Achievements</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {skillProgress.reduce((sum, skill) => sum + skill.rovSessions, 0)}
                  </span>
                  <span className="stat-label">ROV Sessions</span>
                </div>
              </div>
              {currentTier !== 'champion' && (
                <button className="upgrade-btn" onClick={handleUpgradeTier}>
                  Upgrade Tier
                </button>
              )}
            </div>
          </div>

          <div className="skill-focus-areas">
            <h3>Your Tier Focus Areas</h3>
            <div className="focus-grid">
              {currentPlan?.skillFocus.map((skill, index) => (
                <div key={index} className="focus-item">
                  <span className="focus-icon">🎯</span>
                  <span className="focus-text">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-section">
          <div className="section-header">
            <h3>Skill Development Progress</h3>
            <div className="category-filters">
              {getSkillCategories().map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedSkillCategory === category ? 'active' : ''}`}
                  onClick={() => handleSkillCategoryChange(category)}
                >
                  {category === 'all' ? 'All Skills' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <h4>{skill.skillName}</h4>
                  <span className="skill-category">{skill.category}</span>
                </div>
                <SkillProgressBar
                  current={skill.currentLevel}
                  target={skill.targetLevel}
                  skillName={skill.skillName}
                />
                <div className="skill-meta">
                  <div className="skill-stats">
                    <span>{skill.experiencePoints} XP</span>
                    <span>{skill.endorsements} endorsements</span>
                    <span>{skill.rovSessions} ROV sessions</span>
                  </div>
                  <button 
                    className="coaching-btn"
                    onClick={() => handleROVCoaching(skill.skillName)}
                  >
                    Get ROV Coaching
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="achievements-section">
          <h3>Your Achievements</h3>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <CertificationBadge
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                dateEarned={achievement.dateEarned}
                badge={achievement.badge}
                tier={achievement.tier}
              />
            ))}
          </div>
        </div>

        <div className="rov-support-section">
          <h3>ROV Assistance Available</h3>
          <div className="rov-cards">
            {currentPlan?.rovSupport.map((rov, index) => (
              <div key={index} className="rov-card">
                <div className="rov-icon">🤖</div>
                <div className="rov-info">
                  <h4>{rov}</h4>
                  <p>
                    {rov.includes('Helper') && 'Real-time guidance and basic skill coaching'}
                    {rov.includes('Insight') && 'Data-driven analysis and strategic recommendations'}
                    {rov.includes('Justice') && 'Ethical guidance and compliance support'}
                    {rov.includes('Pathfinder') && 'Navigation and process optimization'}
                    {rov.includes('Guardian') && 'Security and risk assessment'}
                  </p>
                </div>
                <button className="activate-rov-btn">
                  Activate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {rovCoachingActive && (
        <ROVCoaching
          onClose={() => setRovCoachingActive(false)}
          skillName="Cultural Intelligence"
          tier={currentTier}
        />
      )}
    </div>
  );
};

export default SkillsDevelopmentHub;