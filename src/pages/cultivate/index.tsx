import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const CultivatePage: React.FC = () => {
  const [mentorshipRole, setMentorshipRole] = useState('');
  const [skillsToShare, setSkillsToShare] = useState([]);

  const mentorshipOpportunities = [
    {
      id: 'peer-mentor',
      title: 'Peer Digital Skills Mentor',
      description: 'Share the digital skills you developed in CREATE with other community members who are just starting their journey.',
      requirements: 'Completed at least one CREATE project successfully',
      timeCommitment: '2-3 hours per week, flexible scheduling',
      support: 'Training on patience-based teaching methods and community communication',
      impact: 'Help 2-3 community members per month develop digital confidence'
    },
    {
      id: 'heritage-coordinator',
      title: 'Heritage Project Coordinator',
      description: 'Guide collaborative heritage preservation efforts, helping families and community groups organize their materials effectively.',
      requirements: 'Experience with heritage digitization project from CREATE',
      timeCommitment: '4-5 hours per week, includes some weekend workshops',
      support: 'Advanced organization training and cultural sensitivity guidance',
      impact: 'Lead quarterly community heritage preservation workshops'
    },
    {
      id: 'community-connector',
      title: 'Community Connector',
      description: 'Bridge between CONNECT activities and CREATE projects, helping newcomers identify relevant skill-building opportunities.',
      requirements: 'Regular participation in Big Local activities and completed CREATE projects',
      timeCommitment: '3-4 hours per week, mainly attending community meetings',
      support: 'Ongoing consultation with community development professionals',
      impact: 'Guide 5-8 residents monthly from community engagement to skills development'
    }
  ];

  const skillSharingFormats = [
    {
      format: 'One-on-One Mentoring',
      description: 'Work directly with individual community members, providing personalized guidance based on their specific needs and pace.',
      bestFor: 'Complex technical skills, confidence building, accessibility needs'
    },
    {
      format: 'Small Group Workshops',
      description: 'Lead 3-5 person sessions where participants learn together and support each other through challenges.',
      bestFor: 'General digital literacy, heritage projects, collaborative problem-solving'
    },
    {
      format: 'Drop-in Support Sessions',
      description: 'Available for questions and troubleshooting during community center open hours.',
      bestFor: 'Ongoing support, quick problem resolution, informal skill reinforcement'
    }
  ];

  const sustainabilityPrinciples = [
    {
      principle: 'Mutual Learning',
      description: 'Even as you teach others, continue developing your own skills through peer exchange and advanced projects.',
      implementation: 'Monthly skill-swap sessions where mentors learn from each other'
    },
    {
      principle: 'Community Ownership',
      description: 'Ensure skills and knowledge remain within the community rather than depending on external trainers.',
      implementation: 'Document successful teaching methods and create community resource libraries'
    },
    {
      principle: 'Realistic Expectations',
      description: 'Focus on sustainable participation levels that work with people\'s actual availability and constraints.',
      implementation: 'Flexible scheduling, family-friendly sessions, transport assistance where needed'
    },
    {
      principle: 'Local Problem-Solving',
      description: 'Address challenges that emerge from your specific community context rather than generic solutions.',
      implementation: 'Regular feedback sessions with participants and community needs assessments'
    }
  ];

  const recognitionStructure = [
    {
      level: 'Community Contributor',
      criteria: 'Successfully mentor 3+ community members through CREATE projects',
      responsibilities: 'Provide regular skills support and participate in mentor coordination meetings'
    },
    {
      level: 'Community Specialist',
      criteria: 'Lead successful community workshops and mentor other emerging mentors',
      responsibilities: 'Develop new teaching materials and coordinate with local organizations'
    },
    {
      level: 'Community Leader',
      criteria: 'Demonstrate sustained impact on community digital inclusion and skills development',
      responsibilities: 'Represent community interests in broader policy discussions and funding applications'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="cultivate-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🌱</span>
              CULTIVATE - Step 3 of 5Cs Framework
            </div>
            
            <h1 className="hero-title fade-in">
              Grow Skills Through Teaching and Mentoring
            </h1>
            
            <p className="hero-subtitle fade-in">
              Strengthen your own abilities while supporting others. Create sustainable learning networks where community members develop each other's capabilities.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">Why Teaching Deepens Learning</h2>
              <p className="section-subtitle">
                The most effective way to consolidate your CREATE skills is through mentoring others. This builds community capacity while advancing your own expertise.
              </p>
            </div>

            <div className="mentorship-grid">
              {mentorshipOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="mentorship-card fade-in">
                  <h3 className="mentorship-title">{opportunity.title}</h3>
                  <p className="mentorship-description">{opportunity.description}</p>
                  
                  <div className="mentorship-details">
                    <div className="detail-section">
                      <h4>Requirements</h4>
                      <p>{opportunity.requirements}</p>
                    </div>
                    <div className="detail-section">
                      <h4>Time Commitment</h4>
                      <p>{opportunity.timeCommitment}</p>
                    </div>
                    <div className="detail-section">
                      <h4>Support Provided</h4>
                      <p>{opportunity.support}</p>
                    </div>
                    <div className="impact-section">
                      <h4>Community Impact</h4>
                      <p>{opportunity.impact}</p>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary mentorship-btn"
                    onClick={() => setMentorshipRole(opportunity.id)}
                  >
                    Learn More About This Role
                  </button>
                </div>
              ))}
            </div>

            <div className="teaching-formats-section">
              <h3 className="section-title">Choose Your Teaching Approach</h3>
              <p className="section-subtitle">
                Different community members learn best through different formats. You can specialize in the approach that matches your strengths and availability.
              </p>

              <div className="formats-grid">
                {skillSharingFormats.map((format, index) => (
                  <div key={index} className="format-card">
                    <h4 className="format-title">{format.format}</h4>
                    <p className="format-description">{format.description}</p>
                    <div className="format-best-for">
                      <strong>Best for:</strong> {format.bestFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sustainability-section">
              <h3 className="section-title">Sustainable Community Learning</h3>
              <p className="section-subtitle">
                Build learning systems that can continue without external dependency, ensuring long-term community resilience.
              </p>

              <div className="principles-grid">
                {sustainabilityPrinciples.map((item, index) => (
                  <div key={index} className="principle-card">
                    <h4 className="principle-title">{item.principle}</h4>
                    <p className="principle-description">{item.description}</p>
                    <div className="principle-implementation">
                      <strong>In practice:</strong> {item.implementation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="recognition-section">
              <h3 className="section-title">Community Recognition Pathway</h3>
              <p className="section-subtitle">
                As you develop mentoring skills and community impact, gain recognition that reflects your growing expertise and leadership.
              </p>

              <div className="recognition-levels">
                {recognitionStructure.map((level, index) => (
                  <div key={index} className="level-card">
                    <h4 className="level-title">{level.level}</h4>
                    <div className="level-criteria">
                      <strong>Achieved by:</strong> {level.criteria}
                    </div>
                    <div className="level-responsibilities">
                      <strong>Responsibilities:</strong> {level.responsibilities}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="progression-section">
              <h3 className="section-title">Beyond CULTIVATE</h3>
              <p className="section-subtitle">
                Strong mentoring and community development skills open pathways to broader change and recognition.
              </p>

              <div className="next-phase-preview">
                <div className="next-phase">
                  <h4>CHANGE</h4>
                  <p>Apply your mentoring expertise to employment opportunities in community development, education, or local government initiatives.</p>
                </div>
                <div className="next-phase">
                  <h4>COMPETE</h4>
                  <p>Represent your community in regional skills competitions, funding applications, or policy consultations that require demonstrated expertise.</p>
                </div>
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

export default CultivatePage;
