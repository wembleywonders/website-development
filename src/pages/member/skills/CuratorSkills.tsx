// src/pages/member/skills/CuratorSkills.tsx
import React, { useState } from 'react';
import SkillProgressBar from '../../../components/skills/SkillProgressBar';
import './CuratorSkills.css';

interface CuratorSkill {
  name: string;
  description: string;
  currentLevel: number;
  targetLevel: number;
  practiceActivities: string[];
  realWorldApplication: string[];
  careerBenefit: string;
  timeToMaster: string;
  rovSupport: string[];
}

const CuratorSkills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string>('content-strategy');

  const curatorSkills: Record<string, CuratorSkill> = {
    'content-strategy': {
      name: 'Content Strategy',
      description: 'Selecting and sharing high-value information and experiences for the community',
      currentLevel: 75,
      targetLevel: 90,
      practiceActivities: [
        'Curate weekly community newsletters with relevant local updates',
        'Select and promote quality local events and services',
        'Create themed content series for different resident demographics',
        'Develop content calendars for community social media'
      ],
      realWorldApplication: [
        'Brand content strategy and development',
        'Social media management and growth',
        'Marketing communications leadership',
        'Community management for companies'
      ],
      careerBenefit: 'Essential for marketing, communications, and brand management roles',
      timeToMaster: '6-9 months with consistent content creation',
      rovSupport: ['Insight Analysis ROV', 'Pathfinder ROV']
    },
    'experience-design': {
      name: 'Experience Design',
      description: 'Creating memorable and meaningful community experiences and events',
      currentLevel: 80,
      targetLevel: 95,
      practiceActivities: [
        'Design and organize quarterly Methodist Hall signature events',
        'Create intergenerational workshop experiences',
        'Develop community onboarding journeys for new residents',
        'Design collaborative spaces and interaction opportunities'
      ],
      realWorldApplication: [
        'User experience (UX) design and research',
        'Event planning and experience management',
        'Customer journey optimization',
        'Product management and development'
      ],
      careerBenefit: 'Highly valued in tech, hospitality, and customer-facing industries',
      timeToMaster: '8-12 months with diverse event experience',
      rovSupport: ['Insight Analysis ROV', 'Pathfinder ROV']
    },
    'quality-assessment': {
      name: 'Quality Assessment',
      description: 'Evaluating services, vendors, and opportunities to ensure community value',
      currentLevel: 70,
      targetLevel: 85,
      practiceActivities: [
        'Review and recommend local service providers',
        'Evaluate potential community partnerships and sponsorships',
        'Assess community feedback and implement improvements',
        'Develop quality standards for community initiatives'
      ],
      realWorldApplication: [
        'Quality assurance and process improvement',
        'Vendor management and procurement',
        'Business analysis and evaluation',
        'Operations management and optimization'
      ],
      careerBenefit: 'Critical for operations, consulting, and management roles',
      timeToMaster: '7-10 months with systematic evaluation practice',
      rovSupport: ['Insight Analysis ROV']
    },
    'brand-management': {
      name: 'Brand Management',
      description: 'Maintaining and enhancing Wembley Wonders community reputation and identity',
      currentLevel: 65,
      targetLevel: 80,
      practiceActivities: [
        'Develop community brand guidelines and messaging',
        'Manage external communications and media relations',
        'Create consistent visual and verbal identity across platforms',
        'Monitor and respond to community reputation issues'
      ],
      realWorldApplication: [
        'Corporate brand strategy and management',
        'Public relations and communications',
        'Marketing leadership and positioning',
        'Crisis communication and reputation management'
      ],
      careerBenefit: 'Essential for senior marketing and communications positions',
      timeToMaster: '9-12 months with comprehensive brand experience',
      rovSupport: ['Insight Analysis ROV', 'Pathfinder ROV']
    },
    'partnership-development': {
      name: 'Partnership Development',
      description: 'Building strategic relationships with local businesses and organizations',
      currentLevel: 60,
      targetLevel: 85,
      practiceActivities: [
        'Negotiate partnerships with local businesses for member discounts',
        'Develop relationships with Brent Council and local organizations',
        'Create mutually beneficial collaboration agreements',
        'Manage ongoing partnership relationships and renewals'
      ],
      realWorldApplication: [
        'Business development and sales leadership',
        'Strategic partnerships and alliances',
        'Account management and client relations',
        'Government relations and public affairs'
      ],
      careerBenefit: 'Valuable for business development and strategic roles',
      timeToMaster: '10-15 months with diverse partnership experience',
      rovSupport: ['Pathfinder ROV', 'Insight Analysis ROV']
    }
  };

  const currentSkill = curatorSkills[selectedSkill];

  const handleStartProject = (activity: string) => {
    alert(`Starting curator project: ${activity}\n\nInsight Analysis ROV will help you analyze community data and preferences to optimize your approach.`);
  };

  const handleROVAnalysis = () => {
    const rovList = currentSkill.rovSupport.join(', ');
    alert(`${rovList} Activated for ${currentSkill.name}!\n\nInsight Analysis ROV: "I'll analyze community engagement patterns and provide data-driven recommendations."\n\nPathfinder ROV: "I'll help you navigate complex strategic decisions and optimize your approach."\n\nReady to start advanced skill development?`);
  };

  const handleRequestMentorship = () => {
    alert('Connecting you with Champion-tier members who excel in this skill area. They can provide advanced guidance and career development insights.');
  };

  return (
    <div className="curator-skills">
      <header className="skills-header">
        <h1>Curator Skills Development</h1>
        <p>Select quality experiences, share valuable content, organize gatherings</p>
        <div className="tier-badge curator">Curator Tier</div>
      </header>

      <div className="skills-content">
        <nav className="skills-nav">
          <h3>Your Curator Skills</h3>
          {Object.entries(curatorSkills).map(([key, skill]) => (
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

            <div className="rov-support">
              <h4>Available ROV Support</h4>
              <div className="rov-badges">
                {currentSkill.rovSupport.map((rov, index) => (
                  <span key={index} className="rov-badge">{rov}</span>
                ))}
              </div>
              <button className="rov-analysis-btn" onClick={handleROVAnalysis}>
                Activate ROV Analysis
              </button>
            </div>
          </div>

          <div className="practice-projects">
            <h3>Community Curation Projects</h3>
            <div className="projects-grid">
              {currentSkill.practiceActivities.map((activity, index) => (
                <div key={index} className="project-card">
                  <p>{activity}</p>
                  <div className="project-meta">
                    <span className="complexity">Advanced Level</span>
                    <button 
                      className="start-project-btn"
                      onClick={() => handleStartProject(activity)}
                    >
                      Start Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="career-application">
            <h3>Professional Development Impact</h3>
            <div className="career-benefit">
              <p className="benefit-description">{currentSkill.careerBenefit}</p>
              <h4>Senior role applications:</h4>
              <ul className="application-list">
                {currentSkill.realWorldApplication.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="advanced-development">
            <h3>Advanced Development</h3>
            <div className="development-options">
              <div className="option-card">
                <h4>Champion Mentorship</h4>
                <p>Connect with Champion-tier members for advanced guidance</p>
                <button className="mentorship-btn" onClick={handleRequestMentorship}>
                  Request Mentorship
                </button>
              </div>
              <div className="option-card">
                <h4>Portfolio Development</h4>
                <p>Build a professional portfolio showcasing your community curation work</p>
                <button className="portfolio-btn">
                  Start Portfolio
                </button>
              </div>
              <div className="option-card">
                <h4>Leadership Opportunities</h4>
                <p>Lead community initiatives and represent Wembley Wonders externally</p>
                <button className="leadership-btn">
                  View Opportunities
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CuratorSkills;