import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const ChangePage: React.FC = () => {
  const [selectedPathway, setSelectedPathway] = useState('');
  const [currentSkillLevel, setCurrentSkillLevel] = useState('');

  const careerPathways = [
    {
      id: 'community-development',
      title: 'Community Development Worker',
      description: 'Apply your community organizing and digital mentoring skills to paid roles in local government, housing associations, or community organizations.',
      prerequisites: 'Strong CULTIVATE experience with demonstrated community impact',
      skillsRequired: [
        'Community consultation and engagement',
        'Project coordination and reporting',
        'Digital inclusion program delivery',
        'Partnership building with local organizations'
      ],
      typicalRoles: [
        'Community Engagement Officer (£22-28k)',
        'Digital Inclusion Coordinator (£24-30k)', 
        'Resident Liaison Officer (£20-26k)',
        'Community Project Manager (£28-35k)'
      ],
      employerTypes: 'Local councils, housing associations, community interest companies, charity organizations',
      preparationSupport: 'CV development focused on community impact evidence, interview preparation, professional reference building'
    },
    {
      id: 'education-support',
      title: 'Adult Education and Digital Skills Training',
      description: 'Transform your peer mentoring experience into professional adult education roles.',
      prerequisites: 'Successful mentoring experience from CULTIVATE with teaching skills documentation',
      skillsRequired: [
        'Lesson planning and curriculum development',
        'Assessment and progress tracking',
        'Inclusive teaching methods',
        'Professional communication and reporting'
      ],
      typicalRoles: [
        'Digital Skills Tutor (£18-24k)',
        'Community Learning Assistant (£16-20k)',
        'Adult Education Coordinator (£25-32k)',
        'Learning Support Specialist (£20-28k)'
      ],
      employerTypes: 'Adult education colleges, libraries, community centers, local authority adult learning services',
      preparationSupport: 'Teaching qualification pathways, professional portfolio development, classroom observation experience'
    },
    {
      id: 'local-enterprise',
      title: 'Community-Based Social Enterprise',
      description: 'Create sustainable local businesses that address community needs while providing income.',
      prerequisites: 'Demonstrated success in heritage projects or community coordination from CULTIVATE',
      skillsRequired: [
        'Basic business planning and financial management',
        'Service delivery and customer relations',
        'Local partnership development',
        'Social impact measurement and reporting'
      ],
      typicalRoles: [
        'Heritage Preservation Services',
        'Digital Skills Training for Local Businesses',
        'Community Event Organization Services',
        'Local History and Cultural Documentation'
      ],
      employerTypes: 'Self-employment, community interest company creation, partnership with existing social enterprises',
      preparationSupport: 'Business planning workshops, financial management training, legal structure guidance, funding application support'
    }
  ];

  const employmentReadiness = [
    {
      component: 'Professional Skills Documentation',
      description: 'Transform your community volunteer experience into professional qualifications and evidence.',
      activities: [
        'Portfolio development showing community impact',
        'Professional reference building from mentoring work',
        'Skills certification through recognized frameworks',
        'CV writing that translates community work into employment language'
      ]
    },
    {
      component: 'Employment Navigation Support',
      description: 'Practical assistance with job searching and application processes.',
      activities: [
        'Job search strategies for community sector roles',
        'Application form completion and interview preparation',
        'Professional networking within local community organizations',
        'Workplace expectations and professional development planning'
      ]
    },
    {
      component: 'Bridge Programs',
      description: 'Structured pathways from volunteer community work to paid employment.',
      activities: [
        'Work experience placements with local partners',
        'Apprenticeship and traineeship identification',
        'Professional qualification pathways with funding support',
        'Mentorship matching with professionals in target sectors'
      ]
    }
  ];

  const realityCheck = {
    employmentMarket: 'Community sector roles are competitive and often require demonstrated experience. Building this through volunteer community work provides credible evidence.',
    incomeExpectations: 'Entry-level community work typically pays £16-25k annually. Career progression requires sustained professional development.',
    timeframes: 'Transition from community volunteering to professional employment typically takes 12-18 months of focused preparation.',
    alternatives: 'Some residents may prefer enhanced volunteer roles with community recognition rather than formal employment transitions.'
  };

  const sustainabilityFactors = [
    {
      factor: 'Personal Financial Stability',
      consideration: 'Ensure employment transition improves rather than jeopardizes your financial security',
      supportAvailable: 'Financial planning advice, benefit transition guidance, part-time work options during transition'
    },
    {
      factor: 'Community Relationship Maintenance', 
      consideration: 'Professional roles should strengthen rather than replace your community connections',
      supportAvailable: 'Role negotiation to maintain local focus, community accountability structures'
    },
    {
      factor: 'Skill Development Continuation',
      consideration: 'Employment should provide opportunities for continued learning and growth',
      supportAvailable: 'Professional development funding, continuing education partnerships, peer learning networks'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="change-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🚀</span>
              CHANGE - Step 4 of 5Cs Framework
            </div>
            
            <h1 className="hero-title fade-in">
              Transform Community Skills Into Career Opportunities
            </h1>
            
            <p className="hero-subtitle fade-in">
              Apply your proven community development and mentoring abilities to employment opportunities that create lasting change while providing financial stability.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">From Community Volunteer to Professional Impact</h2>
              <p className="section-subtitle">
                Your CULTIVATE experience demonstrates real professional competencies. This stage helps you translate community skills into employment opportunities.
              </p>
            </div>

            <div className="reality-check-section">
              <h3 className="section-title">Employment Market Reality</h3>
              <div className="reality-grid">
                <div className="reality-item">
                  <h4>Market Competition</h4>
                  <p>{realityCheck.employmentMarket}</p>
                </div>
                <div className="reality-item">
                  <h4>Income Expectations</h4>
                  <p>{realityCheck.incomeExpectations}</p>
                </div>
                <div className="reality-item">
                  <h4>Transition Timeline</h4>
                  <p>{realityCheck.timeframes}</p>
                </div>
                <div className="reality-item">
                  <h4>Alternative Pathways</h4>
                  <p>{realityCheck.alternatives}</p>
                </div>
              </div>
            </div>

            <div className="pathways-section">
              <h3 className="section-title">Career Development Pathways</h3>
              <div className="pathways-grid">
                {careerPathways.map((pathway) => (
                  <div key={pathway.id} className="pathway-card fade-in">
                    <h3 className="pathway-title">{pathway.title}</h3>
                    <p className="pathway-description">{pathway.description}</p>
                    
                    <div className="pathway-details">
                      <div className="prerequisites-section">
                        <h4>Prerequisites</h4>
                        <p>{pathway.prerequisites}</p>
                      </div>
                      
                      <div className="skills-section">
                        <h4>Required Skills</h4>
                        <ul className="skills-list">
                          {pathway.skillsRequired.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="roles-section">
                        <h4>Typical Roles and Salaries</h4>
                        <ul className="roles-list">
                          {pathway.typicalRoles.map((role, index) => (
                            <li key={index}>{role}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="employers-section">
                        <h4>Potential Employers</h4>
                        <p>{pathway.employerTypes}</p>
                      </div>
                      
                      <div className="preparation-section">
                        <h4>Preparation Support</h4>
                        <p>{pathway.preparationSupport}</p>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary pathway-btn"
                      onClick={() => setSelectedPathway(pathway.id)}
                    >
                      Explore This Pathway
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="readiness-section">
              <h3 className="section-title">Employment Readiness Support</h3>
              <div className="readiness-grid">
                {employmentReadiness.map((component, index) => (
                  <div key={index} className="readiness-card">
                    <h4 className="readiness-title">{component.component}</h4>
                    <p className="readiness-description">{component.description}</p>
                    <ul className="readiness-activities">
                      {component.activities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="sustainability-section">
              <h3 className="section-title">Sustainable Career Transition</h3>
              <p className="section-subtitle">
                Employment transitions should strengthen both your personal stability and community connections.
              </p>
              
              <div className="sustainability-grid">
                {sustainabilityFactors.map((item, index) => (
                  <div key={index} className="sustainability-card">
                    <h4 className="sustainability-factor">{item.factor}</h4>
                    <p className="sustainability-consideration">{item.consideration}</p>
                    <div className="sustainability-support">
                      <strong>Support Available:</strong> {item.supportAvailable}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="progression-section">
              <h3 className="section-title">Beyond Individual Change</h3>
              <div className="final-phase">
                <h4>COMPETE</h4>
                <p>With professional credentials and sustained community impact, represent your community's interests in policy discussions, funding applications, and regional development initiatives that shape broader social change.</p>
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

export default ChangePage;
