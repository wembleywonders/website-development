// src/components/membership/SkillBenefits.tsx
import React from 'react';
import { MembershipTier } from '../../types/membership';
import './SkillBenefits.css';

interface SkillBenefitsProps {
  tier: MembershipTier;
  onUpgrade?: () => void;
  showUpgradePrompt?: boolean;
}

interface SkillBenefit {
  skill: string;
  description: string;
  careerImpact: string;
  realWorldApplication: string[];
  timeToCompetency: string;
  certification: boolean;
}

const SkillBenefits: React.FC<SkillBenefitsProps> = ({
  tier,
  onUpgrade,
  showUpgradePrompt = false
}) => {
  const skillBenefitsByTier: Record<MembershipTier, SkillBenefit[]> = {
    connector: [
      {
        skill: 'Relationship Building',
        description: 'Master the art of creating meaningful professional and personal connections across cultural and linguistic boundaries.',
        careerImpact: 'Essential for sales, business development, team leadership, and international roles.',
        realWorldApplication: [
          'Building client relationships in multicultural environments',
          'Networking effectively at professional events',
          'Creating inclusive team dynamics',
          'Cross-cultural communication in global companies'
        ],
        timeToCompetency: '3-6 months with consistent practice',
        certification: true
      },
      {
        skill: 'Cultural Intelligence',
        description: 'Develop the ability to work effectively across cultures and adapt communication styles to different audiences.',
        careerImpact: 'Highly valued in international business, consulting, and leadership roles.',
        realWorldApplication: [
          'Leading diverse international teams',
          'Adapting products for global markets',
          'Managing multicultural client relationships',
          'Facilitating cross-cultural negotiations'
        ],
        timeToCompetency: '6-9 months with diverse exposure',
        certification: true
      },
      {
        skill: 'Active Listening',
        description: 'Learn to truly understand others\' perspectives and respond with empathy and insight.',
        careerImpact: 'Critical for management, customer service, counseling, and any client-facing role.',
        realWorldApplication: [
          'Managing team conflicts and mediations',
          'Conducting effective customer interviews',
          'Building trust in sales conversations',
          'Providing supportive leadership during crises'
        ],
        timeToCompetency: '4-8 months with regular practice',
        certification: true
      },
      {
        skill: 'Digital Communication',
        description: 'Master professional online communication across platforms, from formal emails to social collaboration.',
        careerImpact: 'Essential for remote work, digital marketing, and modern professional environments.',
        realWorldApplication: [
          'Leading virtual teams effectively',
          'Creating engaging social media content',
          'Managing professional online presence',
          'Facilitating productive digital meetings'
        ],
        timeToCompetency: '2-4 months with consistent use',
        certification: true
      }
    ],
    curator: [
      {
        skill: 'Experience Design',
        description: 'Learn to create memorable, meaningful experiences that bring people together and create lasting value.',
        careerImpact: 'Critical for event management, product design, customer experience, and hospitality roles.',
        realWorldApplication: [
          'Designing customer journey experiences',
          'Creating engaging training programs',
          'Planning corporate events and team building',
          'Developing user experiences for digital products'
        ],
        timeToCompetency: '6-12 months with event practice',
        certification: true
      },
      {
        skill: 'Content Strategy',
        description: 'Develop the ability to curate, create, and distribute valuable content that engages and educates audiences.',
        careerImpact: 'Valuable for marketing, communications, education, and thought leadership positions.',
        realWorldApplication: [
          'Developing company blog and social strategies',
          'Creating educational content for teams',
          'Building thought leadership presence',
          'Managing brand storytelling and messaging'
        ],
        timeToCompetency: '8-12 months with regular creation',
        certification: true
      },
      {
        skill: 'Quality Assessment',
        description: 'Learn to evaluate experiences, content, and processes for quality, value, and improvement opportunities.',
        careerImpact: 'Essential for quality assurance, consulting, product management, and operations roles.',
        realWorldApplication: [
          'Conducting process improvement audits',
          'Evaluating vendor and partner performance',
          'Leading quality control initiatives',
          'Assessing training program effectiveness'
        ],
        timeToCompetency: '6-9 months with assessment practice',
        certification: true
      },
      {
        skill: 'Partnership Development',
        description: 'Master the art of identifying, building, and maintaining strategic partnerships that create mutual value.',
        careerImpact: 'Critical for business development, strategic planning, and senior management roles.',
        realWorldApplication: [
          'Negotiating vendor and supplier relationships',
          'Building strategic business alliances',
          'Creating community and nonprofit partnerships',
          'Developing cross-industry collaborations'
        ],
        timeToCompetency: '9-15 months with relationship building',
        certification: true
      }
    ],
    champion: [
      {
        skill: 'Strategic Leadership',
        description: 'Develop the ability to guide organizations and communities toward long-term success through visionary thinking and execution.',
        careerImpact: 'Essential for executive roles, entrepreneurship, and senior management positions.',
        realWorldApplication: [
          'Leading organizational transformation initiatives',
          'Setting and executing 3-5 year strategic plans',
          'Guiding companies through market changes',
          'Building and scaling social impact programs'
        ],
        timeToCompetency: '12-24 months with leadership experience',
        certification: true
      },
      {
        skill: 'Stakeholder Management',
        description: 'Master the complex art of managing diverse stakeholder interests while driving toward common goals.',
        careerImpact: 'Critical for senior management, project leadership, and public sector roles.',
        realWorldApplication: [
          'Managing complex multi-stakeholder projects',
          'Navigating board and investor relationships',
          'Leading community development initiatives',
          'Coordinating cross-functional team efforts'
        ],
        timeToCompetency: '15-18 months with diverse practice',
        certification: true
      },
      {
        skill: 'Public Advocacy',
        description: 'Learn to effectively represent causes, communities, and organizations in public forums and policy discussions.',
        careerImpact: 'Valuable for public relations, government relations, nonprofit leadership, and executive roles.',
        realWorldApplication: [
          'Representing company interests in policy discussions',
          'Leading public campaigns for social causes',
          'Managing crisis communications and public response',
          'Building coalitions for community change'
        ],
        timeToCompetency: '12-18 months with speaking practice',
        certification: true
      },
      {
        skill: 'Organizational Development',
        description: 'Develop expertise in building, scaling, and improving organizational systems and culture.',
        careerImpact: 'Essential for HR leadership, consulting, and executive management roles.',
        realWorldApplication: [
          'Designing organizational structures for growth',
          'Leading culture change initiatives',
          'Building high-performance team systems',
          'Creating sustainable operational processes'
        ],
        timeToCompetency: '18-24 months with implementation experience',
        certification: true
      }
    ]
  };

  const currentSkills = skillBenefitsByTier[tier];
  
  const getTierColor = (tier: MembershipTier) => {
    const colors = {
      connector: '#3498db',
      curator: '#9b59b6',
      champion: '#f39c12'
    };
    return colors[tier];
  };

  const getTierIcon = (tier: MembershipTier) => {
    const icons = {
      connector: '🤝',
      curator: '🎨',
      champion: '🏆'
    };
    return icons[tier];
  };

  return (
    <div className="skill-benefits">
      <div className="benefits-header">
        <div className="tier-info">
          <span className="tier-icon">{getTierIcon(tier)}</span>
          <h2>{tier.charAt(0).toUpperCase() + tier.slice(1)} Skills Development</h2>
        </div>
        <p className="tier-description">
          Professional skills you'll develop through community engagement and ROV coaching
        </p>
      </div>

      <div className="skills-grid">
        {currentSkills.map((skill, index) => (
          <div key={index} className="skill-benefit-card">
            <div className="skill-header">
              <h3>{skill.skill}</h3>
              {skill.certification && (
                <span className="certification-badge">Certified</span>
              )}
            </div>
            
            <p className="skill-description">{skill.description}</p>
            
            <div className="career-impact">
              <h4>Career Impact</h4>
              <p>{skill.careerImpact}</p>
            </div>
            
            <div className="real-world-applications">
              <h4>Real-World Applications</h4>
              <ul>
                {skill.realWorldApplication.map((application, appIndex) => (
                  <li key={appIndex}>{application}</li>
                ))}
              </ul>
            </div>
            
            <div className="skill-timeline">
              <div className="timeline-item">
                <strong>Time to Competency:</strong> {skill.timeToCompetency}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUpgradePrompt && tier !== 'champion' && (
        <div className="upgrade-prompt">
          <h3>Unlock Advanced Skills</h3>
          <p>
            Upgrade your membership to access higher-level professional development opportunities 
            and advanced ROV coaching for strategic leadership skills.
          </p>
          <button 
            className="upgrade-btn"
            onClick={onUpgrade}
            style={{ backgroundColor: getTierColor(tier) }}
          >
            Explore {tier === 'connector' ? 'Curator' : 'Champion'} Skills
          </button>
        </div>
      )}

      <div className="benefits-footer">
        <div className="learning-approach">
          <h4>Community-Based Learning</h4>
          <p>
            These skills are developed through real community projects, peer collaboration, 
            and practical application rather than traditional coursework. ROV coaching provides 
            personalized guidance while community engagement offers authentic practice opportunities.
          </p>
        </div>
        
        <div className="certification-info">
          <h4>Professional Certification</h4>
          <p>
            Complete skill development programs receive digital badges and certificates that 
            can be verified and shared on professional platforms like LinkedIn. Skills are 
            assessed through practical application and peer endorsement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillBenefits;