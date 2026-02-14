import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './ConnectorHandbookPage.css';

const ConnectorHandbookPage: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  const chapters = [
    {
      id: 'welcome',
      title: 'Welcome to the Connector Role',
      icon: '👋',
      sections: [
        {
          title: 'Your Journey Begins',
          content: `As a Connector, you're the vital link between community members and opportunities. Your role is to build bridges, facilitate connections, and help others discover pathways to growth and contribution.`
        },
        {
          title: 'Core Values',
          content: `Inclusivity, empowerment, authentic communication, and collaborative problem-solving guide everything we do as Connectors.`
        },
        {
          title: 'Impact Areas',
          content: `You'll work across education, community development, youth engagement, cultural programming, and local business support.`
        }
      ]
    },
    {
      id: 'responsibilities',
      title: 'Roles & Responsibilities',
      icon: '📋',
      sections: [
        {
          title: 'Daily Activities',
          content: `Respond to community inquiries, maintain resource databases, coordinate with local organizations, and facilitate introductions between community members.`
        },
        {
          title: 'Weekly Commitments',
          content: `Attend team meetings, update project progress, conduct outreach activities, and participate in skills development sessions.`
        },
        {
          title: 'Monthly Goals',
          content: `Complete project milestones, submit progress reports, organize community events, and mentor new applicants.`
        }
      ]
    },
    {
      id: 'structure',
      title: 'Community Structure',
      icon: '🏗️',
      sections: [
        {
          title: 'Governance Model',
          content: `Our community operates on democratic principles with tiered decision-making. Connectors participate in operational decisions and provide input on strategic initiatives.`
        },
        {
          title: 'Team Dynamics',
          content: `Work collaboratively with other Connectors, receive guidance from Curators, and support Champions in strategic initiatives.`
        },
        {
          title: 'Communication Channels',
          content: `Regular team meetings, digital collaboration platforms, community forums, and direct mentorship relationships.`
        }
      ]
    },
    {
      id: 'development',
      title: 'Skills Development',
      icon: '📚',
      sections: [
        {
          title: 'Training Modules',
          content: `Complete mandatory training in safeguarding, communication skills, project management basics, and cultural competency.`
        },
        {
          title: 'Learning Pathways',
          content: `Choose specialized tracks in youth work, business development, community organizing, or digital inclusion based on your interests.`
        },
        {
          title: 'Mentorship Program',
          content: `Paired with an experienced Curator for guidance, regular check-ins, and personalized development planning.`
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects & Initiatives',
      icon: '🚀',
      sections: [
        {
          title: 'Current Projects',
          content: `Digital inclusion program, youth leadership development, local business network, community event coordination, and resource sharing platform.`
        },
        {
          title: 'Project Participation',
          content: `Join existing initiatives based on your skills and interests, or propose new projects that address community needs.`
        },
        {
          title: 'Success Metrics',
          content: `Track engagement levels, community feedback, resource distribution, event attendance, and personal skill development progress.`
        }
      ]
    },
    {
      id: 'progression',
      title: 'Path to Curator',
      icon: '⬆️',
      sections: [
        {
          title: 'Eligibility Requirements',
          content: `12 months active service as Connector, completion of all training modules, successful leadership of a community project, and positive peer evaluations.`
        },
        {
          title: 'Assessment Process',
          content: `Portfolio review, practical assessment, community impact evaluation, and interview with current Champions.`
        },
        {
          title: 'Preparation Timeline',
          content: `Begin preparation 3 months before eligibility, gather documentation, complete leadership project, and receive mentor endorsement.`
        }
      ]
    }
  ];

  const toggleChapter = (chapterId: string) => {
    setActiveChapter(activeChapter === chapterId ? null : chapterId);
  };

  return (
    <div className="connector-handbook-page">
      
      <div className="handbook-container">
        <div className="handbook-hero">
          <div className="hero-content">
            <h1>Connector Handbook</h1>
            <p>Your comprehensive guide to succeeding as a community Connector</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Chapters</span>
              </div>
              <div className="stat">
                <span className="stat-number">15</span>
                <span className="stat-label">Key Topics</span>
              </div>
              <div className="stat">
                <span className="stat-number">4-6</span>
                <span className="stat-label">Hours/Month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="handbook-content">
          <div className="handbook-intro">
            <h2>About This Handbook</h2>
            <p>
              This handbook provides everything you need to excel as a Connector in our community. 
              Each chapter contains practical guidance, real-world examples, and actionable steps 
              to help you make a meaningful impact while developing your own skills and expertise.
            </p>
          </div>

          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-card">
                <div 
                  className="chapter-header"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="chapter-icon">{chapter.icon}</div>
                  <div className="chapter-info">
                    <h3>{chapter.title}</h3>
                    <span className="chapter-sections">
                      {chapter.sections.length} sections
                    </span>
                  </div>
                  <div className={`chapter-toggle ${activeChapter === chapter.id ? 'expanded' : ''}`}>
                    ▼
                  </div>
                </div>

                {activeChapter === chapter.id && (
                  <div className="chapter-content">
                    {chapter.sections.map((section, index) => (
                      <div key={index} className="section">
                        <h4>{section.title}</h4>
                        <p>{section.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="handbook-actions">
            <div className="action-cards">
              <div className="action-card">
                <h3>Ready to Apply?</h3>
                <p>Start your journey as a Connector today</p>
                <Link to="/apply" className="action-button primary">
                  Begin Application
                </Link>
              </div>
              
              <div className="action-card">
                <h3>Take Assessment</h3>
                <p>Test your readiness with our practice assessment</p>
                <Link to="/practice-assessment" className="action-button secondary">
                  Practice Assessment
                </Link>
              </div>
              
              <div className="action-card">
                <h3>Success Stories</h3>
                <p>Learn from current Connectors' experiences</p>
                <Link to="/success-stories" className="action-button outline">
                  Read Stories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectorHandbookPage;