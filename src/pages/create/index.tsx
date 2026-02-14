import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const CreatePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');

  const projectTypes = [
    {
      id: 'heritage-digitization',
      title: 'Heritage Digitization Project',
      description: 'Learn to scan, organize, and preserve family photos and documents while contributing to community heritage.',
      skills: ['Basic computer navigation', 'File organization', 'Digital scanning'],
      outcome: 'Create digital archives for your family and contribute to community heritage collection',
      timeCommitment: '3-4 sessions over 2 weeks',
      equipment: 'Scanner, computer access provided',
      prerequisite: 'CONNECT: Community engagement experience helpful'
    },
    {
      id: 'digital-literacy-tools',
      title: 'Essential Digital Services Access',
      description: 'Build confidence accessing online banking, health appointments, and government services.',
      skills: ['Online account creation', 'Secure password management', 'Form completion'],
      outcome: 'Independent access to essential digital services',
      timeCommitment: '4-6 sessions over 3 weeks',
      equipment: 'Computer or tablet, personal documents for account setup',
      prerequisite: 'CONNECT: Understanding of personal digital needs from community activities'
    },
    {
      id: 'community-communication',
      title: 'Community Communication Tools',
      description: 'Create simple websites or digital newsletters to share community information effectively.',
      skills: ['Basic web editing', 'Image editing', 'Content organization'],
      outcome: 'Publish community newsletters or simple websites',
      timeCommitment: '6-8 sessions over 4 weeks',
      equipment: 'Computer with internet access',
      prerequisite: 'CONNECT: Active participation in community activities to understand communication needs'
    }
  ];

  const badges = [
    {
      name: 'Heritage Preserver',
      criteria: 'Successfully digitize and organize family materials',
      community_value: 'Contributes to local cultural preservation'
    },
    {
      name: 'Digital Navigator',
      criteria: 'Demonstrate independent use of 3+ essential online services',
      community_value: 'Can help other residents access digital services'
    },
    {
      name: 'Community Communicator',
      criteria: 'Create and publish community-focused digital content',
      community_value: 'Strengthens local information sharing'
    }
  ];

  const supportStructure = {
    'beginner': {
      approach: 'One-on-one guidance with experienced community member',
      pace: 'Focus on one skill per session with plenty of practice time',
      materials: 'Step-by-step printed guides you can take home'
    },
    'some-experience': {
      approach: 'Small group sessions with peer learning',
      pace: 'Build on existing skills with new digital tools',
      materials: 'Online resources and community project examples'
    },
    'experienced': {
      approach: 'Project-based learning with mentorship opportunities',
      pace: 'Independent work with guidance on community impact',
      materials: 'Advanced resources and collaboration with other experienced residents'
    }
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="create-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🛠</span>
              CREATE - Step 2 of 5Cs Framework
            </div>
            
            <h1 className="hero-title fade-in">
              Develop Digital Skills Through Community Projects
            </h1>
            
            <p className="hero-subtitle fade-in">
              Build practical digital skills by working on projects that benefit your community. Learn by doing, with support from neighbors who share your goals.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">Project-Based Learning</h2>
              <p className="section-subtitle">
                Rather than abstract digital skills training, work on real projects that address community needs you've identified through CONNECT activities.
              </p>
            </div>

            <div className="skill-level-selector">
              <h3>Your Current Comfort Level</h3>
              <div className="level-buttons">
                {Object.keys(supportStructure).map((level) => (
                  <button
                    key={level}
                    className={`level-btn ${skillLevel === level ? 'active' : ''}`}
                    onClick={() => setSkillLevel(level)}
                  >
                    {level.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
              <div className="level-description">
                <h4>Your Learning Path</h4>
                <div className="support-details">
                  <p><strong>Approach:</strong> {supportStructure[skillLevel].approach}</p>
                  <p><strong>Pace:</strong> {supportStructure[skillLevel].pace}</p>
                  <p><strong>Materials:</strong> {supportStructure[skillLevel].materials}</p>
                </div>
              </div>
            </div>

            <div className="projects-grid">
              {projectTypes.map((project) => (
                <div key={project.id} className="project-card fade-in">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-details">
                    <div className="skills-section">
                      <h4>Skills You'll Develop</h4>
                      <ul className="skills-list">
                        {project.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="outcome-section">
                      <h4>What You'll Create</h4>
                      <p>{project.outcome}</p>
                    </div>
                    
                    <div className="practical-info">
                      <p><strong>Time Commitment:</strong> {project.timeCommitment}</p>
                      <p><strong>Equipment:</strong> {project.equipment}</p>
                      <p><strong>Builds on:</strong> {project.prerequisite}</p>
                    </div>
                  </div>

                  <button 
                    className="btn btn-secondary project-btn"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    Start This Project
                  </button>
                </div>
              ))}
            </div>

            <div className="certification-section">
              <h3 className="section-title">Community Recognition Badges</h3>
              <p className="section-subtitle">
                Earn recognition for skills that benefit both you and your community. Badges reflect practical capabilities, not just course completion.
              </p>

              <div className="badges-grid">
                {badges.map((badge, index) => (
                  <div key={index} className="badge-card">
                    <h4 className="badge-name">{badge.name}</h4>
                    <p className="badge-criteria"><strong>Earn by:</strong> {badge.criteria}</p>
                    <p className="badge-value"><strong>Community Value:</strong> {badge.community_value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="progression-section">
              <h3 className="section-title">After CREATE</h3>
              <p className="section-subtitle">
                Digital skills become more valuable when shared with others and applied to ongoing community development.
              </p>

              <div className="next-steps-preview">
                <div className="next-step">
                  <h4>CULTIVATE</h4>
                  <p>Share your skills with other community members while continuing to develop new capabilities through peer learning.</p>
                </div>
                <div className="next-step">
                  <h4>CHANGE</h4>
                  <p>Apply your digital skills to employment opportunities or community leadership roles that create lasting change.</p>
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

export default CreatePage;
