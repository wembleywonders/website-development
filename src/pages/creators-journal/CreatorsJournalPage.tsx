import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import JournalTabs from '../../components/creators-journal/JournalTabs';
import ConnectSection from '../../components/creators-journal/ConnectSection';
import CreateSection from '../../components/creators-journal/CreateSection';
import CultivateSection from '../../components/creators-journal/CultivateSection';
import CompeteSection from '../../components/creators-journal/CompeteSection';
import CelebrateSection from '../../components/creators-journal/CelebrateSection';
import './CreatorsJournalPage.css';

type TabType = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';

const CreatorsJournalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('connect');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'connect':
        return <ConnectSection />;
      case 'create':
        return <CreateSection />;
      case 'cultivate':
        return <CultivateSection />;
      case 'compete':
        return <CompeteSection />;
      case 'celebrate':
        return <CelebrateSection />;
      default:
        return <ConnectSection />;
    }
  };

  return (
    <PageTemplate
      pageTitle="Creator's Journal"
      pageStrapline="Your work documents itself. Your success gets celebrated. Your story inspires others."
      pageType="framework"
    >
      <div className="creators-journal-container">
        
        {/* New: Automation Highlight Section */}
        <div className="automation-highlight">
          <div className="highlight-header">
            <span className="highlight-icon">✨</span>
            <h2>Your Work Documents Itself</h2>
          </div>
          <p className="highlight-description">
            No extra work. No manual documentation. Just do what you came here to do - 
            your Creator's Journal automatically logs everything.
          </p>
          
          <div className="automation-flow-visual">
            <div className="flow-step-visual">
              <div className="step-icon">🛠️</div>
              <div className="step-content">
                <strong>You Create</strong>
                <p>Build speaker boxes, record podcasts, write stories, practice simulators</p>
              </div>
            </div>
            <div className="flow-arrow-visual">→</div>
            
            <div className="flow-step-visual">
              <div className="step-icon">📝</div>
              <div className="step-content">
                <strong>Auto-Logged</strong>
                <p>Every activity automatically recorded in your journal</p>
              </div>
            </div>
            <div className="flow-arrow-visual">→</div>
            
            <div className="flow-step-visual">
              <div className="step-icon">🤖</div>
              <div className="step-content">
                <strong>ROV Journalists</strong>
                <p>System detects compelling stories, flags for publication</p>
              </div>
            </div>
            <div className="flow-arrow-visual">→</div>
            
            <div className="flow-step-visual">
              <div className="step-icon">📰</div>
              <div className="step-content">
                <strong>Published</strong>
                <p>Your story appears on Joystick & Rayd-yo</p>
              </div>
            </div>
            <div className="flow-arrow-visual">→</div>
            
            <div className="flow-step-visual">
              <div className="step-icon">♻️</div>
              <div className="step-content">
                <strong>Inspires Next</strong>
                <p>Someone discovers your story, wants to join</p>
              </div>
            </div>
          </div>

          <div className="highlight-cta">
            <p><strong>You focus on learning. We handle everything else.</strong></p>
          </div>
        </div>

        {/* New: What Gets Tracked Section */}
        <div className="tracked-section">
          <h2>What Your Journal Tracks</h2>
          <div className="tracked-grid">
            <div className="tracked-card">
              <span className="tracked-icon">🎯</span>
              <h3>Every Activity</h3>
              <ul>
                <li>Programme participation</li>
                <li>Workshop attendance</li>
                <li>Simulator practice sessions</li>
                <li>Skills developed</li>
                <li>Projects completed</li>
              </ul>
            </div>

            <div className="tracked-card">
              <span className="tracked-icon">📊</span>
              <h3>Your Progress</h3>
              <ul>
                <li>5C journey position</li>
                <li>Confidence levels</li>
                <li>Readiness assessments</li>
                <li>Skills mastery</li>
                <li>Time invested</li>
              </ul>
            </div>

            <div className="tracked-card">
              <span className="tracked-icon">🌟</span>
              <h3>Your Impact</h3>
              <ul>
                <li>Stories published</li>
                <li>People you've helped</li>
                <li>Knowledge shared</li>
                <li>Mentorship given</li>
                <li>Cultural contribution</li>
              </ul>
            </div>
          </div>
        </div>

        {/* New: Real Example Section */}
        <div className="real-example-section">
          <h2>How It Actually Works</h2>
          <div className="example-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">Day 1</div>
              <div className="timeline-content">
                <h3>Marcus Joins STEMgeneers</h3>
                <p>Meets Uncle Winston. Starts learning about speaker boxes.</p>
                <span className="auto-logged">✓ Automatically logged to Creator's Journal</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 3</div>
              <div className="timeline-content">
                <h3>Marcus Documents the Process</h3>
                <p>Films Uncle Winston teaching signal chains. Records the whole build process.</p>
                <span className="auto-logged">✓ Progress tracked: 60% through speaker box build</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 6</div>
              <div className="timeline-content">
                <h3>Speaker Box Complete</h3>
                <p>First successful build. Understanding of physics. Documented knowledge.</p>
                <span className="auto-logged">✓ Success flagged by Command Centre</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 7</div>
              <div className="timeline-content">
                <h3>ROV Journalists Activated</h3>
                <p>System identifies compelling story: intergenerational knowledge transfer.</p>
                <span className="auto-logged">✓ Story queued for publication</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 8</div>
              <div className="timeline-content">
                <h3>Published on Joystick</h3>
                <p>"Uncle Winston's Signal Chain: How OG Knowledge Meets New Generation"</p>
                <span className="auto-logged">✓ Article live, Marcus featured</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 9</div>
              <div className="timeline-content">
                <h3>Featured on Rayd-yo</h3>
                <p>Podcast interview: Marcus and Uncle Winston discuss the learning process.</p>
                <span className="auto-logged">✓ Audio archived, preserved forever</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">Week 12</div>
              <div className="timeline-content">
                <h3>Impact Measured</h3>
                <p>Marcus's story helped 8 new people join STEMgeneers. Knowledge now documented for next generation.</p>
                <span className="auto-logged">✓ Cultural preservation achieved</span>
              </div>
            </div>
          </div>
        </div>

        {/* New: Publication Path Section */}
        <div className="publication-path-section">
          <h2>Your Path to Publication</h2>
          <p className="section-intro">
            Not every journal entry becomes a published story - but the ones that show 
            real learning, cultural value, or community impact get featured.
          </p>

          <div className="publication-criteria">
            <h3>What Makes a Story Worth Sharing?</h3>
            <div className="criteria-grid">
              <div className="criteria-card">
                <span className="criteria-icon">🔄</span>
                <h4>Knowledge Transfer</h4>
                <p>Did you learn from an elder? Document indigenous knowledge? Preserve something that might be lost?</p>
              </div>
              <div className="criteria-card">
                <span className="criteria-icon">💡</span>
                <h4>Breakthrough Moments</h4>
                <p>Did you overcome a fear? Master something challenging? Have an "aha!" moment worth sharing?</p>
              </div>
              <div className="criteria-card">
                <span className="criteria-icon">🌉</span>
                <h4>Bridge Building</h4>
                <p>Did you connect two worlds? Show how skills transfer? Help someone else succeed?</p>
              </div>
              <div className="criteria-card">
                <span className="criteria-icon">🎯</span>
                <h4>Real Impact</h4>
                <p>Did you create something useful? Solve an actual problem? Make a tangible difference?</p>
              </div>
            </div>
          </div>

          <div className="publication-examples">
            <h3>Recent Publications from Journals</h3>
            <div className="publications-grid">
              <div className="publication-card">
                <span className="pub-badge joystick">Joystick</span>
                <h4>"From Tax Terror to Tax Confident: Jamal's Journey"</h4>
                <p>How simulator practice transformed fear into mastery</p>
                <div className="pub-stats">
                  <span>👥 12 people inspired to try simulator</span>
                  <span>📊 Journal entry → Published in 3 days</span>
                </div>
              </div>

              <div className="publication-card">
                <span className="pub-badge raydyo">Rayd-yo</span>
                <h4>"Auntie Clara's Montserrat Memories"</h4>
                <p>Oral history preserved through Kaywana's Court</p>
                <div className="pub-stats">
                  <span>🎧 156 listens in first week</span>
                  <span>📊 Cultural knowledge archived forever</span>
                </div>
              </div>

              <div className="publication-card">
                <span className="pub-badge joystick">Joystick</span>
                <h4>"Uncle Winston's Physics Lesson"</h4>
                <p>Why the tweeter goes on top: signal chain wisdom</p>
                <div className="pub-stats">
                  <span>👥 8 new STEMgeneers members</span>
                  <span>📊 Referenced in 3 other journals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Original: Journal Introduction */}
        <div className="journal-intro">
          <h2>Your Personal Journey Through The 5 Cs</h2>
          <p>
            Your Creator's Journal tracks your journey through the Five C's framework.
            Document your progress, showcase your work, and build a portfolio that demonstrates
            your growing skills and achievements.
          </p>
          <div className="journey-reminder">
            <p><strong>Remember:</strong> Every entry here is part of the archive. Your story becomes the thing that helps the next person.</p>
          </div>
        </div>

        {/* Original: Journal Tabs */}
        <JournalTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Original: Journal Content */}
        <div className="journal-content">
          {renderActiveSection()}
        </div>

        {/* New: Your Impact Dashboard Preview */}
        <div className="impact-preview">
          <h2>Your Impact (So Far)</h2>
          <div className="impact-stats-grid">
            <div className="impact-stat">
              <span className="stat-number">23</span>
              <span className="stat-label">Journal Entries</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">2</span>
              <span className="stat-label">Stories Published</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">12</span>
              <span className="stat-label">People Helped</span>
            </div>
            <div className="impact-stat">
              <span className="stat-number">1</span>
              <span className="stat-label">Podcast Featured</span>
            </div>
          </div>
          <p className="impact-note">
            <em>This grows as you grow. Your impact compounds over time.</em>
          </p>
        </div>

        {/* New: Archive Connection */}
        <div className="archive-connection">
          <h2>Connected to the Archive</h2>
          <p>Your Creator's Journal feeds into our permanent archive:</p>
          <div className="archive-links">
            <Link to="/joystick" className="archive-link">
              <span className="archive-icon">📰</span>
              <div>
                <strong>Joystick</strong>
                <p>Written stories and articles</p>
              </div>
            </Link>
            <Link to="/raydyo" className="archive-link">
              <span className="archive-icon">🎙️</span>
              <div>
                <strong>Rayd-yo</strong>
                <p>Audio stories and podcasts</p>
              </div>
            </Link>
          </div>
          <p className="archive-mission">
            <strong>Each one teach one.</strong> Your documentation becomes the thing that teaches the next generation.
          </p>
        </div>

        {/* Final CTA */}
        <div className="journal-cta">
          <h2>Ready to Start Documenting Your Journey?</h2>
          <p>Join a programme. Do the work. Watch your story unfold.</p>
          <div className="cta-buttons">
            <Link to="/get-started" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/programmes" className="cta-button secondary">
              View Programmes
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CreatorsJournalPage;