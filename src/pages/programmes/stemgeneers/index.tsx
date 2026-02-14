import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import DraggableMaya from '../../../components/maya/DraggableMaya';
import MediaSection from '../../../components/media/MediaSection';
import ProductionTechSimulator from '../../../components/sandboxes/ProductionTechSimulator';
import { Mic, Lightbulb, Cpu, Users, Wrench, CheckCircle, ArrowRight, Radio, Drama } from 'lucide-react';
import '../ProgrammePage.css';

const STEMgeneersPage: React.FC = () => {
  const technicalRoles = [
    { title: "Sound Engineering", description: "Record, mix, and master radio dramas", icon: "🎚️" },
    { title: "Lighting Design", description: "Design lighting for live performances", icon: "💡" },
    { title: "Stage Technology", description: "Build and operate stage automation", icon: "⚙️" },
    { title: "Broadcast Engineering", description: "Run Rayd-yo radio broadcasts", icon: "📡" },
    { title: "Recording Equipment", description: "Mic placement, monitoring, mixing boards", icon: "🎙️" },
    { title: "Problem Solving", description: "Fix technical issues during productions", icon: "🔧" }
  ];

  const productionExamples = [
    { 
      production: "A House for Mr Biswas",
      role: "8-part radio drama recording",
      skills: "Multi-track recording, dialogue editing, sound effects, final mix"
    },
    { 
      production: "Miss Lou: Colonization in Reverse",
      role: "Live performance lighting",
      skills: "Stage lighting plot, cue programming, live operation"
    },
    { 
      production: "The Dragon Can't Dance",
      role: "Musical theatre tech",
      skills: "Sound reinforcement, wireless mics, live mixing, lighting coordination"
    }
  ];

  const outcomes = [
    "Professional audio recording and mixing skills",
    "Lighting design for theatre and events",
    "Live broadcast engineering experience",
    "Portfolio of real production work",
    "Pathways to professional AV careers"
  ];

  return (
    <PageTemplate
      pageTitle="STEMgeneers"
      pageStrapline="Technical Production Crew – Learn professional sound engineering, lighting design, and broadcast technology through real Caribbean cultural productions."
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "STEMgeneers Programme",
          section: "programmes",
          contentType: "technical-production"
        }}
      />

      <div className="programme-content">
        {/* Hero Section */}
        <section className="programme-hero">
          <div className="hero-badge">🎚️</div>
          <h1>STEMgeneers</h1>
          <p className="hero-tagline">
            Build. Engineer. Run the Show.
          </p>
        </section>

        {/* What It Is */}
        <section className="programme-section">
          <h2>Technical Production for Caribbean Theatre</h2>
          <p className="section-intro">
            STEMgeneers trains the <strong>technical production crew</strong> behind our Caribbean radio dramas 
            and live performances. You'll learn professional sound engineering, lighting design, broadcast 
            technology, and stage automation — through real productions with real audiences.
          </p>
        </section>

        {/* Try It Now - REAL Sandbox */}
        <section className="programme-section sandbox-section">
          <ProductionTechSimulator />
        </section>

        {/* Mission */}
        <section className="programme-section mission-section">
          <div className="mission-card">
            <Wrench size={48} />
            <h2>Our Mission</h2>
            <p>
              To train professional-quality technical crews who can <strong>record radio dramas, 
              run live performances, and broadcast to thousands</strong> — while preserving Caribbean 
              cultural heritage.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="programme-section">
          <h2>Who It's For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <Cpu size={32} />
              <h3>Tech-Minded Creators</h3>
              <p>Love figuring out how things work and solving technical problems</p>
            </div>
            <div className="audience-card">
              <Mic size={32} />
              <h3>Audio Enthusiasts</h3>
              <p>Interested in recording, mixing, or broadcast engineering</p>
            </div>
            <div className="audience-card">
              <Lightbulb size={32} />
              <h3>Behind-the-Scenes Builders</h3>
              <p>Prefer making the magic happen backstage rather than performing</p>
            </div>
          </div>
        </section>

        {/* Technical Roles You'll Learn */}
        <section className="programme-section">
          <h2>Technical Roles You'll Master</h2>
          <div className="modules-grid">
            {technicalRoles.map((role, index) => (
              <div key={index} className="module-card">
                <div className="module-icon">{role.icon}</div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Real Production Examples */}
        <section className="programme-section">
          <h2>Real Productions You'll Work On</h2>
          <div className="production-examples">
            {productionExamples.map((example, index) => (
              <div key={index} className="example-card">
                <div className="example-header">
                  <Radio size={24} />
                  <h3>{example.production}</h3>
                </div>
                <div className="example-role">
                  <strong>Your Role:</strong> {example.role}
                </div>
                <div className="example-skills">
                  <strong>Skills:</strong> {example.skills}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STEMgeneers Showcase */}
        <MediaSection 
          contentType="stemgeneers-production"
          title="STEMgeneers in Action"
          description="See our technical crews recording radio dramas and running live performances"
          allowedRoles={['staff', 'volunteer', 'editor']}
          placeholder="Share photos and videos of STEMgeneers at work on productions"
          autoArchive={false}
          maxItems={6}
          layout="grid"
        />

        {/* Learning Path */}
        <section className="programme-section">
          <h2>Your Learning Path</h2>
          <div className="learning-path">
            <div className="path-step">
              <div className="step-number">1</div>
              <h3>Individual Workshops</h3>
              <p>2-hour intro sessions: "Sound Engineering Basics" or "Lighting Design 101"</p>
              <span className="path-duration">Free • Drop-in</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">2</div>
              <h3>Team Projects</h3>
              <p>4-week crew training: Work on pre-production for upcoming show</p>
              <span className="path-duration">£80 • Small groups</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">3</div>
              <h3>Full Production</h3>
              <p>8-week programme: Record complete radio drama or run live performance</p>
              <span className="path-duration">Free for members • Get paid!</span>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="programme-section outcomes-section">
          <h2>What You'll Achieve</h2>
          <div className="outcomes-grid">
            {outcomes.map((outcome, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={24} />
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Programme Integration */}
        <section className="programme-section integration-section">
          <div className="integration-card">
            <h2>How STEMgeneers Supports All Productions</h2>
            <p>
              Every radio drama needs sound engineers. Every live performance needs lighting designers. 
              Every broadcast needs technical crew. STEMgeneers work with:
            </p>
            <div className="integration-links">
              <Link to="/programmes/kaywanas-court" className="integration-link">
                <Drama size={20} />
                <span>Kaywana's Court (Live Performances)</span>
              </Link>
              <Link to="/programmes/gtechcasters" className="integration-link">
                <Radio size={20} />
                <span>G-TechCasters (Radio Broadcasts)</span>
              </Link>
              <Link to="/programmes/trubble-n-bass" className="integration-link">
                <Mic size={20} />
                <span>Trubble n Bass (Music Production)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta">
          <h2>Ready to Run the Show?</h2>
          <p>Join STEMgeneers and learn professional production technology through real Caribbean theatre</p>
          <div className="cta-buttons">
            <Link to="/calendar" className="cta-button primary">
              View Upcoming Productions
            </Link>
            <Link to="/programmes" className="cta-button secondary">
              Explore All Roles
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default STEMgeneersPage;
