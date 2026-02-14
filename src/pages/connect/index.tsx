import React, { useState } from 'react';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const ConnectPage: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [userInterests, setUserInterests] = useState([]);

  const communityActivities = [
    {
      id: 'big-local',
      title: 'Big Local Partnership Sessions',
      description: 'Monthly resident consultation meetings where community priorities are identified and discussed.',
      when: 'Second Tuesday of each month, 7pm',
      where: 'Wembley Central Community Centre',
      commitment: 'Drop-in, no long-term commitment required',
      currentFocus: 'Winter 2024: Community space improvements and digital inclusion priorities'
    },
    {
      id: 'digital-workshops',
      title: 'Digital Inclusion Workshops',
      description: 'Hands-on support for residents developing digital skills at their own pace.',
      when: 'Saturdays 2-4pm',
      where: 'Local library computer suite',
      commitment: 'Attend when you can - each session is self-contained',
      currentFocus: 'Helping residents access online banking, health appointments, and community resources'
    },
    {
      id: 'community-consultation',
      title: 'Resident Consultation Projects',
      description: 'Participate in identifying local needs and solutions through community conversations.',
      when: 'Ongoing - various times to accommodate different schedules',
      where: 'Various local venues',
      commitment: 'One-off conversations or ongoing input as preferred',
      currentFocus: 'Understanding barriers to community participation and digital service access'
    }
  ];

  const connectionBarriers = [
    {
      barrier: 'Time constraints',
      solutions: ['Flexible meeting times', 'Drop-in format options', 'Online participation when needed']
    },
    {
      barrier: 'Technology access',
      solutions: ['Device lending program', 'In-person alternatives always available', 'Digital skills support']
    },
    {
      barrier: 'Transport/mobility',
      solutions: ['Local venues within walking distance', 'Transport assistance', 'Home visit options']
    },
    {
      barrier: 'Language/communication',
      solutions: ['Multilingual support available', 'Visual/written materials', 'Patient explanation approach']
    }
  ];

  const handleActivityInterest = (activityId: string) => {
    setSelectedActivity(activityId);
    // This would trigger Maya's pathway guidance
    console.log(`User expressed interest in: ${activityId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="connect-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>🔗</span>
              CONNECT - Step 1 of 5Cs Framework
            </div>
            
            <h1 className="hero-title fade-in">
              Build Meaningful Community Connections
            </h1>
            
            <p className="hero-subtitle fade-in">
              Start with real relationships and authentic community engagement. No prerequisites, no technical skills required - just genuine interest in local community development.
            </p>
          </div>
        </section>

        <section className="framework-section">
          <div className="framework-content">
            <div className="section-header fade-in">
              <h2 className="section-title">Why CONNECT Comes First</h2>
              <p className="section-subtitle">
                Digital skills and community development work best when grounded in real relationships and understanding of local needs. Start here to understand what matters to your neighbors.
              </p>
            </div>

            <div className="activities-grid">
              {communityActivities.map((activity) => (
                <div key={activity.id} className="activity-card fade-in">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-description">{activity.description}</p>
                  
                  <div className="activity-details">
                    <div className="detail-item">
                      <strong>When:</strong> {activity.when}
                    </div>
                    <div className="detail-item">
                      <strong>Where:</strong> {activity.where}
                    </div>
                    <div className="detail-item">
                      <strong>Commitment:</strong> {activity.commitment}
                    </div>
                    <div className="current-focus">
                      <strong>Current Focus:</strong> {activity.currentFocus}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary activity-btn"
                    onClick={() => handleActivityInterest(activity.id)}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>

            <div className="barriers-section">
              <h3 className="section-title">Addressing Connection Barriers</h3>
              <p className="section-subtitle">
                We recognize that community participation faces real obstacles. Here's how we address common challenges:
              </p>

              <div className="barriers-grid">
                {connectionBarriers.map((item, index) => (
                  <div key={index} className="barrier-card">
                    <h4 className="barrier-title">{item.barrier}</h4>
                    <div className="solutions-list">
                      {item.solutions.map((solution, i) => (
                        <div key={i} className="solution-item">
                          {solution}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="progression-preview">
              <h3 className="section-title">What Comes After CONNECT</h3>
              <p className="section-subtitle">
                Once you're engaged with community activities, you can choose your next steps based on your interests and availability:
              </p>

              <div className="next-steps-grid">
                <div className="next-step-card">
                  <div className="step-icon">🛠️</div>
                  <h4>CREATE</h4>
                  <p>Develop digital skills through hands-on projects that address community needs you've identified through connection activities.</p>
                </div>
                <div className="next-step-card">
                  <div className="step-icon">📚</div>
                  <h4>Heritage Preservation</h4>
                  <p>Use your community connections to help preserve local stories and cultural knowledge through collaborative projects.</p>
                </div>
                <div className="next-step-card">
                  <div className="step-icon">👥</div>
                  <h4>Community Labs</h4>
                  <p>Join collaborative workshops where community members work together on local solutions and skill sharing.</p>
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

export default ConnectPage;
