// src/pages/member/skills/ConnectorSkills.tsx
import React, { useState } from 'react';
import SkillProgressBar from '../../../components/skills/SkillProgressBar';
import './ConnectorSkills.css';

interface ConnectorSkill {
  name: string;
  description: string;
  currentLevel: number;
  targetLevel: number;
  practiceActivities: string[];
  realWorldApplication: string[];
  careerBenefit: string;
  timeToMaster: string;
}

const ConnectorSkills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('cultural-intelligence');

  const connectorSkills: Record<string, ConnectorSkill> = {
    'cultural-intelligence': {
      name: 'Cultural Intelligence',
      description: 'Understanding and bridging cultural differences effectively within Wembley\'s diverse community',
      currentLevel: 65,
      targetLevel: 85,
      practiceActivities: [
        'Facilitate introductions between residents from different cultural backgrounds',
        'Organize building mixer events with cultural themes',
        'Practice active listening in multilingual community settings',
        'Lead cross-cultural problem-solving discussions'
      ],
      realWorldApplication: [
        'International client relationship management',
        'Global team leadership and coordination',
        'Cross-border business negotiations',
        'Diversity and inclusion program development'
      ],
      careerBenefit: 'Essential for multinational corporations and global consulting roles',
      timeToMaster: '6-9 months with regular community practice'
    },
    'active-listening': {
      name: 'Active Listening',
      description: 'Deep listening skills that help residents feel heard and understood',
      currentLevel: 70,
      targetLevel: 90,
      practiceActivities: [
        'Practice reflective listening during community meetings',
        'Facilitate conflict resolution between neighbors',
        'Lead support groups for new residents',
        'Conduct informal community interviews and feedback sessions'
      ],
      realWorldApplication: [
        'Customer success and support roles',
        'Management and team leadership',
        'Sales and business development',
        'Coaching and mentoring positions'
      ],
      careerBenefit: 'Critical for any role involving stakeholder management',
      timeToMaster: '4-6 months with consistent practice'
    },
    'digital-communication': {
      name: 'Digital Communication',
      description: 'Effective online communication across platforms and cultural contexts',
      currentLevel: 80,
      targetLevel: 95,
      practiceActivities: [
        'Manage building WhatsApp groups effectively',
        'Create engaging community newsletter content',
        'Moderate online discussions and forums',
        'Coordinate virtual community events'
      ],
      realWorldApplication: [
        'Digital marketing and social media management',
        'Remote team coordination',
        'Online community building for brands',
        'Customer engagement and support'
      ],
      careerBenefit: 'Essential in the modern remote work environment',
      timeToMaster: '3-5 months with regular platform usage'
    },
    'conflict-mediation': {
      name: 'Conflict Mediation',
      description: 'Helping resolve disputes and find common ground between community members',
      currentLevel: 45,
      targetLevel: 75,
      practiceActivities: [
        'Mediate noise complaints between neighbors',
        'Facilitate discussions about building amenity usage',
        'Help resolve parking and shared space disputes',
        'Lead community consensus-building meetings'
      ],
      realWorldApplication: [
        'HR and people operations roles',
        'Project management and coordination',
        'Customer service and account management',
        'Legal mediation and negotiation'
      ],
      careerBenefit: 'Valuable for leadership and management positions',
      timeToMaster: '8-12 months with guided practice'
    },
    'community-integration': {
      name: 'Community Integration',
      description: 'Helping new residents quickly feel at home and connected',
      currentLevel: 85,
      targetLevel: 95,
      practiceActivities: [
        'Create welcome packages for new building residents',
        'Organize orientation tours of local amenities',
        'Connect newcomers with established residents who share interests',
        'Develop community resource guides and local tips'
      ],
      realWorldApplication: [
        'Employee onboarding and integration',
        'Change management consulting',
        'Customer success and retention',
        'Organizational development roles'
      ],
      careerBenefit: 'Highly valued in rapidly growing organizations',
      timeToMaster: '5-7 months with consistent community engagement'
    }
  };

  const currentSkill = connectorSkills[selectedSkill];

  const handleStartPractice = (activity: string) => {
    alert(`Starting practice activity: ${activity}\n\nHelper ROV will guide you through this exercise and provide real-time feedback.`);
  };

  const handleROVGuidance = () => {
    alert(`Helper ROV Activated for ${currentSkill.name}!\n\nI can help you with:\n• Setting up practice scenarios\n• Finding community members to practice with\n• Providing feedback on your interactions\n• Tracking your progress over time\n\nLet's start with a beginner-friendly exercise!`);
  };

  return (
    <div className="connector-skills">
      <header className="skills-header">
        <h1>Connector Skills Development</h1>
        <p>Build relationships, make introductions, expand networks</p>
        <div className="tier-badge">Connector Tier</div>
      </header>

      <div className="skills-content">
        <nav className="skills-nav">
          <h3>Your Connector Skills</h3>
          {Object.entries(connectorSkills).map(([key, skill]) => (
            <button
              key={key}
              className={`skill-nav-btn ${selectedSkill === key ? 'active' : ''}`}
              onClick={() => setSelectedSkill(key)}
            >
              <span className="skill-name">{skill.name}</span>
              <span className="skill-progress">{skill.currentLevel}%</span>
            </button>
          ))}
        </nav>

        <main className="skill-detail">
          <div className="skill-overview">
            <h2>{currentSkill.name}</h2>
            <p className="skill-description">{currentSkill.description}</p>
            
            <div className="progress-section">
              <SkillProgressBar
                current={currentSkill.currentLevel}
                target={currentSkill.targetLevel}
                skillName={currentSkill.name}
              />
              <div className="progress-meta">
                <span>Target: {currentSkill.targetLevel}%</span>
                <span>Time to master: {currentSkill.timeToMaster}</span>
              </div>
            </div>

            <button className="rov-guidance-btn" onClick={handleROVGuidance}>
              🤖 Get Helper ROV Guidance
            </button>
          </div>

          <div className="practice-activities">
            <h3>Community Practice Activities</h3>
            <div className="activities-grid">
              {currentSkill.practiceActivities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <p>{activity}</p>
                  <button 
                    className="start-practice-btn"
                    onClick={() => handleStartPractice(activity)}
                  >
                    Start Practice
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="career-application">
            <h3>Career Applications</h3>
            <div className="career-benefit">
              <p className="benefit-description">{currentSkill.careerBenefit}</p>
              <h4>Real-world applications:</h4>
              <ul className="application-list">
                {currentSkill.realWorldApplication.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="skill-endorsements">
            <h3>Skill Endorsements</h3>
            <div className="endorsement-section">
              <p>Get your {currentSkill.name} skills endorsed by community members who've experienced your help.</p>
              <div className="endorsement-stats">
                <div className="stat">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Current Endorsements</span>
                </div>
                <div className="stat">
                  <span className="stat-number">3</span>
                  <span className="stat-label">This Month</span>
                </div>
              </div>
              <button className="request-endorsement-btn">
                Request Endorsement
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConnectorSkills;