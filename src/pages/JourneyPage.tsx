// src/pages/JourneyPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './JourneyPage.css';

const JourneyPage: React.FC = () => {
  const journeyStages = [
    {
      stage: 1,
      title: 'Discover',
      icon: '🔍',
      description: 'Find your programme, attend taster session, apply',
      duration: 'Week 1',
      activities: ['Browse programmes', 'Attend open day/taster', 'Submit application', 'Get accepted!'],
      mindset: 'Curious & Exploring'
    },
    {
      stage: 2,
      title: 'Foundation',
      icon: '🛡️',
      description: 'Build safety, connection, belonging',
      duration: 'Weeks 2-4',
      activities: ['Meet your cohort', 'Team building', 'Build trust', 'Share your story', 'Feel safe'],
      mindset: 'Building Confidence'
    },
    {
      stage: 3,
      title: 'Learning',
      icon: '📚',
      description: 'Develop technical skills, create projects',
      duration: 'Weeks 5-10',
      activities: ['Hands-on projects', 'Skill development', 'Peer collaboration', 'Expert feedback', 'Build portfolio'],
      mindset: 'Growing & Creating'
    },
    {
      stage: 4,
      title: 'Showcase',
      icon: '🎯',
      description: 'Share your work, celebrate achievements',
      duration: 'Week 11-12',
      activities: ['Final project', 'Public showcase', 'Family invited', 'Celebrate success', 'Reflect on growth'],
      mindset: 'Proud & Confident'
    },
    {
      stage: 5,
      title: 'Progression',
      icon: '🚀',
      description: 'Next steps - advance, mentor, or move into employment',
      duration: 'Ongoing',
      activities: ['Advanced programme', 'Mentorship roles', 'Employment support', 'Alumni network', 'Lifelong community'],
      mindset: 'Empowered & Connected'
    }
  ];

  const pathways = [
    {
      pathway: 'Continue Learning',
      icon: '📈',
      description: 'Progress to advanced programmes, specialize deeper',
      examples: ['Raydyo Advanced', 'League Leadership', 'Specialist workshops']
    },
    {
      pathway: 'Give Back',
      icon: '🤝',
      description: 'Become mentor, volunteer, support next generation',
      examples: ['Peer mentor', 'Programme assistant', 'Community volunteer']
    },
    {
      pathway: 'Employment',
      icon: '💼',
      description: 'Enter workforce with skills, portfolio, and support',
      examples: ['Job placement', 'Apprenticeships', 'Career coaching']
    },
    {
      pathway: 'Further Education',
      icon: '🎓',
      description: 'Progress to college, university, vocational training',
      examples: ['University applications', 'FE college', 'Specialist training']
    }
  ];

  return (
    <div className="journey-page">
      <section className="hero-section">
        <h1>Your Journey</h1>
        <p>From first day to lifelong community member</p>
      </section>

      <section className="stages-section">
        <h2>The Five Stages</h2>
        <p className="intro">Every participant moves through these stages at their own pace</p>
        <div className="stages-timeline">
          {journeyStages.map((stage, index) => (
            <div key={index} className="stage-card">
              <div className="stage-number">Stage {stage.stage}</div>
              <div className="stage-icon">{stage.icon}</div>
              <h3>{stage.title}</h3>
              <div className="stage-duration">{stage.duration}</div>
              <p className="stage-description">{stage.description}</p>
              <div className="stage-activities">
                <strong>Activities:</strong>
                <ul>
                  {stage.activities.map((activity, idx) => (
                    <li key={idx}>• {activity}</li>
                  ))}
                </ul>
              </div>
              <div className="stage-mindset">Mindset: {stage.mindset}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pathways-section">
        <h2>After You Finish</h2>
        <p className="intro">Four pathways forward - choose what's right for you</p>
        <div className="pathways-grid">
          {pathways.map((path, index) => (
            <div key={index} className="pathway-card">
              <div className="pathway-icon">{path.icon}</div>
              <h3>{path.pathway}</h3>
              <p>{path.description}</p>
              <div className="pathway-examples">
                <strong>Examples:</strong>
                <ul>
                  {path.examples.map((ex, idx) => (
                    <li key={idx}>→ {ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="alumni-section">
        <h2>Once a Wonder, Always a Wonder</h2>
        <p>Graduation isn't goodbye - it's transformation into lifelong community membership.</p>
        <div className="alumni-benefits">
          <div className="benefit">✓ Alumni events & reunions</div>
          <div className="benefit">✓ Ongoing career support</div>
          <div className="benefit">✓ Mentorship opportunities</div>
          <div className="benefit">✓ Community network access</div>
          <div className="benefit">✓ Priority for advanced programmes</div>
          <div className="benefit">✓ Lifelong connection</div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Your Journey Today</h2>
        <p>Join hundreds of young people transforming their lives</p>
        <Link to="/enroll" className="btn-primary">Begin Your Journey</Link>
      </section>
    </div>
  );
};

export default JourneyPage;