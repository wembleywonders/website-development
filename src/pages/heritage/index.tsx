import React, { useState } from 'react';
import StoryForm from '../../features/heritage/StoryForm';
import MayaCrisisIntegration from '../../integrations/MayaCrisisIntegration';

const HeritagePage: React.FC = () => {
  const [activeStories, setActiveStories] = useState<any[]>([]);
  const [collaborationMode, setCollaborationMode] = useState('individual');

  const handleStorySubmission = (story: any) => {
    console.log('Story submitted for cultural guidance review:', story);
    // This would integrate with Maya's cultural sensitivity guidance
    setActiveStories(prev => [...prev, { ...story, status: 'under_review', id: Date.now() }]);
  };

  return (
    <div className="min-h-screen">
      <div className="animated-bg">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>
      
      
      <main className="heritage-main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span>📚</span>
              Community Heritage Preservation Project
            </div>
            
            <h1 className="hero-title fade-in">
              Preserving Our Community Stories
            </h1>
            
            <p className="hero-subtitle fade-in">
              Working together to capture, preserve, and share the stories that make Wembley Central unique. Real community collaboration between residents, local expertise, and cultural guidance.
            </p>
          </div>
        </section>

        <section className="demonstration-section">
          <div className="demo-content">
            <div className="section-header fade-in">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                This demonstrates our community craftsmanship approach - combining resident knowledge, practical expertise, and cultural intelligence for meaningful results.
              </p>
            </div>

            <div className="workflow-grid">
              <div className="workflow-card fade-in">
                <div className="workflow-icon">👥</div>
                <h3>Community Input</h3>
                <p>Residents share family stories, local memories, and cultural knowledge that needs preserving.</p>
                <div className="workflow-example">
                  <strong>Example:</strong> Maria wants to preserve her grandmother's recipes and the stories behind them.
                </div>
              </div>

              <div className="workflow-card fade-in">
                <div className="workflow-icon">🛠️</div>
                <h3>Practical Organization</h3>
                <p>Derek provides guidance on organizing materials, ensuring proper documentation, and maintaining quality standards.</p>
                <div className="workflow-example">
                  <strong>Example:</strong> Structuring recipe cards, photos, and family context for long-term preservation.
                </div>
              </div>

              <div className="workflow-card fade-in">
                <div className="workflow-icon">🤖</div>
                <h3>Cultural Guidance</h3>
                <p>Maya provides cultural sensitivity guidance, helping ensure stories are preserved respectfully and appropriately.</p>
                <div className="workflow-example">
                  <strong>Example:</strong> Advising on privacy considerations and cultural context for family traditions.
                </div>
              </div>
            </div>

            <div className="collaboration-modes">
              <h3 className="section-title">Choose Your Approach</h3>
              <div className="mode-selector">
                <button 
                  className={`mode-btn ${collaborationMode === 'individual' ? 'active' : ''}`}
                  onClick={() => setCollaborationMode('individual')}
                >
                  Individual Story
                </button>
                <button 
                  className={`mode-btn ${collaborationMode === 'collaborative' ? 'active' : ''}`}
                  onClick={() => setCollaborationMode('collaborative')}
                >
                  Community Collaboration
                </button>
              </div>
            </div>

            {collaborationMode === 'individual' && (
              <div className="individual-mode">
                <StoryForm onSubmit={handleStorySubmission} />
              </div>
            )}

            {collaborationMode === 'collaborative' && (
              <div className="collaborative-mode">
                <div className="collaboration-workspace">
                  <h4>Community Heritage Workshop</h4>
                  <p>Connect with Derek for organizational guidance and other community members working on similar preservation projects.</p>
                  <div className="workshop-features">
                    <div className="feature">
                      <strong>Skills Sharing:</strong> Learn from others' preservation experiences
                    </div>
                    <div className="feature">
                      <strong>Resource Pooling:</strong> Share scanning equipment, storage solutions
                    </div>
                    <div className="feature">
                      <strong>Quality Control:</strong> Community review for accuracy and completeness
                    </div>
                  </div>
                  <button className="btn btn-primary">Join Workshop Session</button>
                </div>
              </div>
            )}

            <div className="active-projects">
              <h3>Current Community Projects</h3>
              {activeStories.length > 0 ? (
                <div className="projects-grid">
                  {activeStories.map((story: any) => (
                    <div key={story.id} className="project-card">
                      <h4>{story.title}</h4>
                      <p className="project-status">Status: {story.status}</p>
                      <p className="project-preview">{story.content.slice(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-projects">
                  <p>No active heritage projects yet. Be the first to start preserving community stories!</p>
                </div>
              )}
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

export default HeritagePage;
