import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import { ProgrammeConfig } from '../config';
import { Zap, Radio, Music, DollarSign, Award } from 'lucide-react';
import './ProgrammePageTemplate.css';

interface ProgrammePageTemplateProps {
  config: ProgrammeConfig;
  interactiveTool: React.ReactNode;
  creatorResources?: React.ReactNode;
  communityShowcase?: React.ReactNode;
}

const ProgrammePageTemplate: React.FC<ProgrammePageTemplateProps> = ({ 
  config, 
  interactiveTool,
  creatorResources,
  communityShowcase 
}) => {
  const [activeTab, setActiveTab] = useState<'builder' | 'journey'>('builder');

  return (
    <PageTemplate
      pageTitle={config.name}
      pageStrapline={config.tagline}
      pageGuide={config.description}
      showMaya={true}
      pageType="programme"
    >
      <div className="programme-page">
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveTab('builder')}
          >
            {config.icon} Create Now
          </button>
          <button 
            className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
            onClick={() => setActiveTab('journey')}
          >
            🚀 Your Journey
          </button>
        </div>

        {/* Builder Tab */}
        {activeTab === 'builder' && (
          <section className="builder-section">
            <div className="builder-intro">
              <h2>Try {config.name}</h2>
              <p>
                No signup required. Start creating right now and experience what you'll learn.
              </p>
            </div>

            {/* Interactive Tool */}
            <div className="interactive-tool">
              {interactiveTool}
            </div>

            <div className="builder-cta">
              <p>Like what you created? Join the programme to unlock the full experience.</p>
              <div className="cta-buttons">
                <Link to={`/enroll?programme=${config.id}`} className="primary-cta">
                  Join {config.name}
                </Link>
                <button onClick={() => setActiveTab('journey')} className="secondary-cta">
                  See What You'll Learn
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Journey Tab */}
        {activeTab === 'journey' && (
          <section className="journey-section">
            
            {/* Journey Overview */}
            <div className="journey-hero">
              <h2>From Beginner to Leader</h2>
              <p className="journey-lead">
                {config.name} isn't just a workshop—it's a complete learning journey. 
                Create in our Impact Lab, showcase your work, and earn from what you build.
              </p>
            </div>

            {/* The Pipeline */}
            <div className="pipeline">
              <div className="pipeline-step">
                <div className="step-icon impact-lab">
                  <Zap size={32} />
                </div>
                <div className="step-content">
                  <h3>1. Impact Lab</h3>
                  <p><strong>Create & Practice</strong></p>
                  <p>{config.pipeline.impactLab}</p>
                  <div className="step-outcome">
                    ✓ Build portfolio-quality work
                  </div>
                </div>
              </div>

              <div className="pipeline-arrow">↓</div>

              <div className="pipeline-step">
                <div className="step-icon platform" style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}dd)` }}>
                  <Radio size={32} />
                </div>
                <div className="step-content">
                  <h3>2. Platform</h3>
                  <p><strong>Get Featured</strong></p>
                  <p>{config.pipeline.platform}</p>
                  <div className="step-outcome">
                    ✓ Build audience & reputation
                  </div>
                </div>
              </div>

              <div className="pipeline-arrow">↓</div>

              <div className="pipeline-step">
                <div className="step-icon showcase">
                  <Music size={32} />
                </div>
                <div className="step-content">
                  <h3>3. Showcase</h3>
                  <p><strong>Perform Live</strong></p>
                  <p>{config.pipeline.showcase}</p>
                  <div className="step-outcome">
                    ✓ Real-world experience
                  </div>
                </div>
              </div>

              <div className="pipeline-arrow">↓</div>

              <div className="pipeline-step">
                <div className="step-icon monetize">
                  <DollarSign size={32} />
                </div>
                <div className="step-content">
                  <h3>4. Monetize</h3>
                  <p><strong>Earn Income</strong></p>
                  <p>{config.pipeline.monetize}</p>
                  <div className="step-outcome">
                    ✓ Sustainable creative income
                  </div>
                </div>
              </div>

              <div className="pipeline-arrow">↓</div>

              <div className="pipeline-step mentor">
                <div className="step-icon progression">
                  <Award size={32} />
                </div>
                <div className="step-content">
                  <h3>5. Lead & Mentor</h3>
                  <p><strong>Give Back</strong></p>
                  <p>Mentor new creators, review work, and shape the programme.</p>
                  <div className="step-outcome">
                    ✓ Paid mentoring + community leadership
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            {Object.keys(config.learning).length > 0 && (
              <div className="learning-outcomes">
                <h3>What You'll Learn</h3>
                
                <div className="outcomes-grid">
                  {config.learning.cultural && (
                    <div className="outcome-card">
                      <h4>🌍 Cultural Foundations</h4>
                      <ul>
                        {config.learning.cultural.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {config.learning.technical && (
                    <div className="outcome-card">
                      <h4>🎵 Technical Skills</h4>
                      <ul>
                        {config.learning.technical.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {config.learning.performance && (
                    <div className="outcome-card">
                      <h4>🎭 Performance Skills</h4>
                      <ul>
                        {config.learning.performance.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {config.learning.professional && (
                    <div className="outcome-card">
                      <h4>💼 Professional Development</h4>
                      <ul>
                        {config.learning.professional.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Programme Details */}
            <div className="programme-details">
              <div className="details-grid">
                <div className="detail-item">
                  <h4>📅 Duration</h4>
                  <p>{config.duration}</p>
                </div>
                <div className="detail-item">
                  <h4>👥 Group Size</h4>
                  <p>{config.groupSize}</p>
                </div>
                <div className="detail-item">
                  <h4>⏰ Time Commitment</h4>
                  <p>{config.timeCommitment}</p>
                </div>
                <div className="detail-item">
                  <h4>💰 Investment</h4>
                  <p>{config.investment}</p>
                </div>
                <div className="detail-item">
                  <h4>📍 Location</h4>
                  <p>{config.location}</p>
                </div>
                <div className="detail-item">
                  <h4>🎯 Who For?</h4>
                  <p>{config.whoFor}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="journey-cta">
              <h3>Ready to Start Your Journey?</h3>
              <p>Join the next {config.name} cohort.</p>
              <div className="cta-buttons">
                <Link to={`/enroll?programme=${config.id}`} className="primary-cta">
                  Join {config.name}
                </Link>
                <button onClick={() => setActiveTab('builder')} className="secondary-cta">
                  Try the Tool First
                </button>
              </div>
            </div>

          </section>
        )}

        {/* ── PROTECT YOUR WORK ─────────────────────────────────────────
            Rendered outside the tabs so it's always visible regardless
            of which tab the user is on. Sits between the tab content
            and the community showcase — visible on first landing without
            requiring any tab interaction.
        ──────────────────────────────────────────────────────────────── */}
        {creatorResources && (
          <section className="creator-resources-section">
            {creatorResources}
          </section>
        )}

        {/* Community Showcase */}
        {communityShowcase && (
          <section className="community-showcase">
            <h3>Featured Creators</h3>
            {communityShowcase}
          </section>
        )}

      </div>
    </PageTemplate>
  );
};

export default ProgrammePageTemplate;