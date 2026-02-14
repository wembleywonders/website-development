// src/pages/member/skills/ChampionSkills.tsx
import React, { useState } from 'react';
import SkillProgressBar from '../../../components/skills/SkillProgressBar';
import './ChampionSkills.css';

interface ChampionSkill {
  name: string;
  description: string;
  currentLevel: number;
  targetLevel: number;
  leadershipActivities: string[];
  realWorldApplication: string[];
  careerBenefit: string;
  timeToMaster: string;
  rovSupport: string[];
  governanceRole: string;
}

const ChampionSkills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('strategic-leadership');

  const championSkills: Record<string, ChampionSkill> = {
    'strategic-leadership': {
      name: 'Strategic Leadership',
      description: 'Setting community vision, long-term direction, and guiding major initiatives',
      currentLevel: 85,
      targetLevel: 95,
      leadershipActivities: [
        'Lead community governance board meetings and decision-making',
        'Develop 5-year strategic plans for community growth and sustainability',
        'Champion community interests in negotiations with Quintain and Brent Council',
        'Guide crisis response and community emergency preparedness'
      ],
      realWorldApplication: [
        'C-suite executive leadership and strategic planning',
        'Board of directors and governance roles',
        'Non-profit organization leadership',
        'Government and public sector leadership'
      ],
      careerBenefit: 'Essential for executive leadership and board-level positions',
      timeToMaster: '12-18 months with complex leadership challenges',
      rovSupport: ['Justice Compliance ROV', 'Insight Analysis ROV', 'Guardian Security ROV'],
      governanceRole: 'Community Board Chair or Strategic Planning Lead'
    },
    'stakeholder-management': {
      name: 'Stakeholder Management',
      description: 'Balancing diverse community interests and external relationships',
      currentLevel: 80,
      targetLevel: 90,
      leadershipActivities: [
        'Coordinate between resident groups, building management, and local authorities',
        'Manage relationships with Methodist Church partnership and venue partners',
        'Facilitate consensus-building across different demographic groups',
        'Represent community interests in municipal planning and development discussions'
      ],
      realWorldApplication: [
        'Government relations and public affairs',
        'Corporate stakeholder engagement',
        'Multi-party negotiation and mediation',
        'Public-private partnership development'
      ],
      careerBenefit: 'Critical for senior management and public sector roles',
      timeToMaster: '15-20 months with diverse stakeholder experience',
      rovSupport: ['Justice Compliance ROV', 'Insight Analysis ROV'],
      governanceRole: 'External Relations Director or Community Advocate'
    },
    'public-advocacy': {
      name: 'Public Advocacy',
      description: 'Representing community needs to councils, media, and public forums',
      currentLevel: 70,
      targetLevel: 85,
      leadershipActivities: [
        'Present to Brent Council on behalf of community needs and concerns',
        'Manage media relations and public communications during community issues',
        'Advocate for policy changes that benefit Wembley residents',
        'Build coalitions with other community organizations for collective advocacy'
      ],
      realWorldApplication: [
        'Public relations and crisis communications',
        'Government lobbying and advocacy',
        'Non-profit advocacy and fundraising',
        'Corporate social responsibility leadership'
      ],
      careerBenefit: 'Valuable for public affairs, communications, and advocacy roles',
      timeToMaster: '12-16 months with public speaking and media experience',
      rovSupport: ['Justice Compliance ROV', 'Guardian Security ROV'],
      governanceRole: 'Public Affairs Director or Community Spokesperson'
    },
    'organizational-development': {
      name: 'Organizational Development',
      description: 'Building sustainable systems and processes for community growth',
      currentLevel: 75,
      targetLevel: 90,
      leadershipActivities: [
        'Design governance structures and democratic processes',
        'Develop member onboarding and progression pathways',
        'Create sustainable revenue models and financial planning',
        'Build community resilience and continuity planning'
      ],
      realWorldApplication: [
        'Organizational design and change management',
        'Business process optimization and development',
        'Systems thinking and process improvement',
        'Institutional capacity building'
      ],
      careerBenefit: 'Essential for operations leadership and organizational consulting',
      timeToMaster: '18-24 months with comprehensive organizational experience',
      rovSupport: ['Justice Compliance ROV', 'Insight Analysis ROV'],
      governanceRole: 'Operations Director or Organizational Development Lead'
    },
    'crisis-management': {
      name: 'Crisis Management',
      description: 'Leading community response during challenges and emergency situations',
      currentLevel: 65,
      targetLevel: 80,
      leadershipActivities: [
        'Develop emergency response protocols and communication plans',
        'Lead community response during building maintenance crises or service disruptions',
        'Manage reputational challenges and community conflicts',
        'Coordinate with emergency services and local authorities during incidents'
      ],
      realWorldApplication: [
        'Corporate crisis management and business continuity',
        'Emergency management and disaster response',
        'Risk management and security planning',
        'Public safety and community resilience'
      ],
      careerBenefit: 'Highly valued in risk management and executive leadership roles',
      timeToMaster: '10-14 months with crisis simulation and real experience',
      rovSupport: ['Guardian Security ROV', 'Justice Compliance ROV'],
      governanceRole: 'Risk Management Director or Emergency Response Coordinator'
    }
  };

  const currentSkill = championSkills[selectedSkill];

  const handleLeadInitiative = (activity: string) => {
    alert(`Leading Champion initiative: ${activity}\n\nJustice Compliance ROV: "I'll ensure all governance procedures follow proper protocols and maintain ethical standards."\n\nInsight Analysis ROV: "I'll provide strategic data analysis to inform your leadership decisions."\n\nGuardian Security ROV: "I'll monitor for potential risks and ensure community safety throughout the initiative."`);
  };

  const handleGovernanceRole = () => {
    alert(`Governance Role Available: ${currentSkill.governanceRole}\n\nThis role comes with significant community responsibility and provides executive-level experience.\n\nBenefits:\n• Board-level decision making experience\n• Strategic planning and implementation\n• Stakeholder management at scale\n• Professional references for C-suite applications\n\nReady to take on community leadership?`);
  };

  const handlePolicyDevelopment = () => {
    alert('Champion Policy Development Workshop\n\nWork with Justice Compliance ROV to develop community policies that:\n• Ensure fair and transparent governance\n• Protect community interests\n• Maintain legal compliance\n• Support sustainable growth\n\nThis experience directly translates to corporate board service and public sector leadership.');
  };

  return (
    <div className="champion-skills">
      <header className="skills-header">
        <h1>Champion Skills Development</h1>
        <p>Lead initiatives, advocate for community needs, shape direction</p>
        <div className="tier-badge champion">Champion Tier</div>
      </header>

      <div className="skills-content">
        <nav className="skills-nav">
          <h3>Your Champion Skills</h3>
          {Object.entries(championSkills).map(([key, skill]) => (
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

            <div className="governance-role">
              <h4>Available Governance Role</h4>
              <div className="role-card">
                <h5>{currentSkill.governanceRole}</h5>
                <p>Lead community governance with real executive responsibility</p>
                <button className="governance-btn" onClick={handleGovernanceRole}>
                  Apply for Role
                </button>
              </div>
            </div>

            <div className="rov-support">
              <h4>Executive ROV Support</h4>
              <div className="rov-badges">
                {currentSkill.rovSupport.map((rov, index) => (
                  <span key={index} className="rov-badge executive">{rov}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="leadership-initiatives">
            <h3>Community Leadership Initiatives</h3>
            <div className="initiatives-grid">
              {currentSkill.leadershipActivities.map((activity, index) => (
                <div key={index} className="initiative-card">
                  <p>{activity}</p>
                  <div className="initiative-meta">
                    <span className="complexity">Executive Level</span>
                    <span className="impact">High Impact</span>
                    <button 
                      className="lead-initiative-btn"
                      onClick={() => handleLeadInitiative(activity)}
                    >
                      Lead Initiative
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="executive-development">
            <h3>Executive Career Development</h3>
            <div className="career-benefit">
              <p className="benefit-description">{currentSkill.careerBenefit}</p>
              <h4>C-suite and board-level applications:</h4>
              <ul className="application-list">
                {currentSkill.realWorldApplication.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="champion-opportunities">
            <h3>Champion Leadership Opportunities</h3>
            <div className="opportunities-grid">
              <div className="opportunity-card">
                <h4>Board Service Preparation</h4>
                <p>Develop board-ready skills through community governance</p>
                <button className="opportunity-btn">
                  Start Board Training
                </button>
              </div>
              <div className="opportunity-card">
                <h4>Policy Development</h4>
                <p>Create and implement community policies with legal guidance</p>
                <button className="opportunity-btn" onClick={handlePolicyDevelopment}>
                  Develop Policy
                </button>
              </div>
              <div className="opportunity-card">
                <h4>External Representation</h4>
                <p>Represent Wembley Wonders at municipal and industry events</p>
                <button className="opportunity-btn">
                  View Speaking Opportunities
                </button>
              </div>
              <div className="opportunity-card">
                <h4>Mentorship Program</h4>
                <p>Mentor Connector and Curator members in leadership development</p>
                <button className="opportunity-btn">
                  Become Mentor
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChampionSkills;