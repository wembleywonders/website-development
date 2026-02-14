import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const CompetePage: React.FC = () => {
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [participationLevel, setParticipationLevel] = useState('collaborative');

  const competitionTypes = [
    {
      id: 'funding-applications',
      title: 'Community Funding Applications',
      description: 'Compete for grants and funding by demonstrating your community\'s documented impact and sustainable development approaches.',
      skillsRequired: [
        'Evidence-based project documentation',
        'Budget planning and financial accountability',
        'Community impact measurement and reporting',
        'Partnership coordination and stakeholder engagement'
      ],
      competitionFormat: 'Annual funding rounds with written applications and community presentations',
      successMetrics: 'Funding awarded, project delivery success, sustainable community outcomes',
      exampleOpportunities: [
        'National Lottery Community Fund (£10k-500k awards)',
        'Local Authority Community Development Grants',
        'Housing Association Community Investment Programs',
        'Social Enterprise Development Funding'
      ]
    },
    {
      id: 'policy-consultation',
      title: 'Policy Development Consultation',
      description: 'Represent community interests in local and regional policy consultations that affect resident services and community development.',
      skillsRequired: [
        'Policy analysis and community impact assessment',
        'Public speaking and formal presentation abilities',
        'Evidence collection and community consultation coordination',
        'Written response development and advocacy'
      ],
      competitionFormat: 'Competitive selection for consultation panels, community representative roles',
      successMetrics: 'Policy influence achieved, community concerns addressed, ongoing consultation relationships',
      exampleOpportunities: [
        'Local Authority Community Strategy Consultations',
        'Housing Policy Development Panels',
        'Digital Inclusion Strategy Advisory Groups',
        'Community Safety Partnership Boards'
      ]
    },
    {
      id: 'recognition-programs',
      title: 'Community Leadership Recognition',
      description: 'Compete for recognition programs that validate community development expertise and create platforms for broader influence.',
      skillsRequired: [
        'Professional portfolio development showing sustained impact',
        'Community testimonial coordination and reference building',
        'Public speaking and interview competencies',
        'Strategic vision articulation for community development'
      ],
      competitionFormat: 'Application-based awards with community impact evidence and peer recommendations',
      successMetrics: 'Recognition received, speaking opportunities created, network expansion achieved',
      exampleOpportunities: [
        'Community Champions Awards (Local Authority)',
        'Volunteer Excellence Recognition Programs',
        'Social Enterprise Leadership Awards',
        'Community Innovation Challenge Awards'
      ]
    }
  ];

  const competitionApproach = {
    collaborative: {
      description: 'Community-focused competition where success strengthens local relationships and builds collective capacity',
      principles: [
        'Represent community interests rather than individual achievement',
        'Share knowledge and resources with other community groups',
        'Focus on sustainable outcomes that benefit local residents',
        'Build lasting partnerships through competition participation'
      ],
      strategies: [
        'Coordinate with neighboring community groups for mutual support',
        'Document and share successful approaches with other applicants',
        'Emphasize community ownership and democratic decision-making',
        'Create mentorship relationships with experienced community leaders'
      ]
    },
    individual: {
      description: 'Personal professional development through competitive recognition while maintaining community accountability',
      principles: [
        'Use recognition to create opportunities for community benefit',
        'Maintain transparency about personal advancement with community members',
        'Leverage individual success to strengthen community capacity',
        'Balance personal career development with ongoing community commitment'
      ],
      strategies: [
        'Develop professional networks that include community development opportunities',
        'Use recognition platforms to advocate for community resources',
        'Create succession planning for community roles if career advancement occurs',
        'Establish community accountability mechanisms for ongoing involvement'
      ]
    }
  };

  const preparationSupport = [
    {
      component: 'Evidence Documentation Systems',
      description: 'Systematic collection and presentation of community impact data',
      activities: [
        'Impact measurement methodology development',
        'Community testimonial coordination and collection',
        'Financial accountability and budget tracking systems',
        'Partnership documentation and reference building'
      ],
      timeframe: '6-12 months ongoing development'
    },
    {
      component: 'Professional Communication Skills',
      description: 'Advanced communication abilities for formal competitive contexts',
      activities: [
        'Grant writing workshops and application development',
        'Public speaking training and presentation skills',
        'Interview preparation and confidence building',
        'Professional networking and relationship building'
      ],
      timeframe: '3-6 months intensive preparation'
    },
    {
      component: 'Strategic Planning and Vision Development',
      description: 'Long-term thinking and planning capabilities for sustainable impact',
      activities: [
        'Community needs analysis and priority setting',
        'Resource planning and sustainability modeling',
        'Stakeholder mapping and engagement strategies',
        'Innovation identification and implementation planning'
      ],
      timeframe: '12+ months ongoing strategic development'
    }
  ];

  const realityCheck = {
    competitionIntensity: 'Funding competitions often have success rates of 10-20%. Policy consultation roles require sustained commitment over multiple years.',
    timeCommitment: 'Serious competitive participation requires 10-15 hours weekly for preparation, applications, and ongoing responsibilities.',
    communityAccountability: 'Success creates obligations to community members who supported your development and expect continued local involvement.',
    personalCost: 'Competitive participation can create stress and time pressure that affects family relationships and personal wellbeing.'
  };

  const sustainabilityConsiderations = [
    {
      factor: 'Community Relationship Maintenance',
      challenge: 'Recognition and funding success can create distance from community members if not managed carefully',
      approach: 'Regular community reporting, democratic decision-making about resource use, ongoing accessible communication'
    },
    {
      factor: 'Burnout Prevention',
      challenge: 'High-intensity competition and ongoing responsibilities can lead to exhaustion and reduced effectiveness',
      approach: 'Realistic commitment levels, shared leadership development, regular breaks and recovery periods'
    },
    {
      factor: 'Succession Planning',
      challenge: 'Personal success should strengthen rather than create dependency in community capacity',
      approach: 'Mentorship of emerging community leaders, knowledge transfer systems, democratic transition planning'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div class

="bg-orb"></div>
      </div>
      
      
      <main className="compete-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🏆</span>
              COMPETE - Step 5 of 5Cs Framework
            </div>
            
            <h1 className="hero-title fade-in">
              Represent Community Interests in Competitive Contexts
            </h1>
            
            <p className="hero-subtitle fade-in">
              Use your proven community development expertise to compete for funding, policy influence, and recognition that strengthens local capacity and creates lasting change.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">Community-Accountable Competition</h2>
              <p className="section-subtitle">
                Competition becomes a tool for community advancement rather than individual achievement when approached with clear accountability and sustainability principles.
              </p>
            </div>

            <div className="reality-check-section">
              <h3 className="section-title">Competition Reality Check</h3>
              <div className="reality-grid">
                <div className="reality-item">
                  <h4>Success Rates</h4>
                  <p>{realityCheck.competitionIntensity}</p>
                </div>
                <div className="reality-item">
                  <h4>Time Requirements</h4>
                  <p>{realityCheck.timeCommitment}</p>
                </div>
                <div className="reality-item">
                  <h4>Community Obligations</h4>
                  <p>{realityCheck.communityAccountability}</p>
                </div>
                <div className="reality-item">
                  <h4>Personal Impact</h4>
                  <p>{realityCheck.personalCost}</p>
                </div>
              </div>
            </div>

            <div className="approach-selector">
              <h3 className="section-title">Choose Your Competition Approach</h3>
              <div className="approach-buttons">
                {Object.keys(competitionApproach).map((approach) => (
                  <button
                    key={approach}
                    className={`approach-btn ${participationLevel === approach ? 'active' : ''}`}
                    onClick={() => setParticipationLevel(approach)}
                  >
                    {approach.charAt(0).toUpperCase() + approach.slice(1)} Focus
                  </button>
                ))}
              </div>
              <div className="approach-description">
                <h4>{competitionApproach[participationLevel].description}</h4>
                <div className="principles-section">
                  <h5>Guiding Principles</h5>
                  <ul className="principles-list">
                    {competitionApproach[participationLevel].principles.map((principle, index) => (
                      <li key={index}>{principle}</li>
                    ))}
                  </ul>
                </div>
                <div className="strategies-section">
                  <h5>Implementation Strategies</h5>
                  <ul className="strategies-list">
                    {competitionApproach[participationLevel].strategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="competitions-section">
              <h3 className="section-title">Competition Categories</h3>
              <div className="competitions-grid">
                {competitionTypes.map((competition) => (
                  <div key={competition.id} className="competition-card fade-in">
                    <h4 className="competition-title">{competition.title}</h4>
                    <p className="competition-description">{competition.description}</p>
                    
                    <div className="competition-details">
                      <div className="skills-required">
                        <h5>Skills Required</h5>
                        <ul>
                          {competition.skillsRequired.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="competition-format">
                        <h5>Competition Format</h5>
                        <p>{competition.competitionFormat}</p>
                      </div>
                      
                      <div className="success-metrics">
                        <h5>Success Measurement</h5>
                        <p>{competition.successMetrics}</p>
                      </div>
                      
                      <div className="opportunities">
                        <h5>Example Opportunities</h5>
                        <ul>
                          {competition.exampleOpportunities.map((opportunity, index) => (
                            <li key={index}>{opportunity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button 
                      className="btn btn-secondary competition-btn"
                      onClick={() => setSelectedCompetition(competition.id)}
                    >
                      Prepare for This Competition
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="preparation-section">
              <h3 className="section-title">Competition Preparation Support</h3>
              <div className="preparation-grid">
                {preparationSupport.map((component, index) => (
                  <div key={index} className="preparation-card">
                    <h4 className="preparation-title">{component.component}</h4>
                    <p className="preparation-description">{component.description}</p>
                    <div className="preparation-timeframe">
                      <strong>Timeframe:</strong> {component.timeframe}
                    </div>
                    <ul className="preparation-activities">
                      {component.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="sustainability-section">
              <h3 className="section-title">Sustainable Competition Participation</h3>
              <div className="sustainability-grid">
                {sustainabilityConsiderations.map((consideration, index) => (
                  <div key={index} className="sustainability-card">
                    <h4 className="sustainability-factor">{consideration.factor}</h4>
                    <div className="sustainability-challenge">
                      <strong>Challenge:</strong> {consideration.challenge}
                    </div>
                    <div className="sustainability-approach">
                      <strong>Sustainable Approach:</strong> {consideration.approach}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="completion-section">
              <h3 className="section-title">Completing the 5Cs Journey</h3>
              <div className="completion-content">
                <p>COMPETE represents the culmination of community-grounded skill development. Through CONNECT, CREATE, CULTIVATE, and CHANGE, you've built the relationships, capabilities, and credibility needed to effectively represent community interests in competitive contexts.</p>
                <p>Success at this level creates obligations to strengthen the entire 5Cs pathway for future community members, ensuring sustainable development that benefits residents beyond individual achievement.</p>
              </div>
            </div>
          </div>
        </section>

        <MayaCrisisIntegration 
          currentLanguage="en"
          crisisLevel="normal"
          userCommunity="wembley-central"
        />
      </main>
    </div>
  );
};

export default CompetePage;
