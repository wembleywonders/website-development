import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSmartRouting } from '../hooks/useSmartRouting';
import { WelcomeBanner } from '../components/smart/WelcomeBanner';
import { useMayaStore } from '../stores/mayaStore';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import { 
  Radio, Target, Gamepad2, Users, ArrowRight, 
  Sparkles, BookOpen, Heart, Palette
} from 'lucide-react';
import './GetStartedPage.css';

interface Pathway {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  description: string;
  primaryAction: () => void;
  primaryText: string;
  secondaryAction?: () => void;
  secondaryText?: string;
}

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();
  const mayaStore = useMayaStore();
  const { suggestedPath, welcomeMessage, confidence } = useSmartRouting();
  
  const showWelcome = confidence > 0.6 && welcomeMessage;

  useEffect(() => {
    // Maya context setup for get started page
  }, [mayaStore]);

  // Primary entry pathways - what brings people here
  const primaryPathways: Pathway[] = [
    {
      id: 'creator',
      title: "I want to earn from my creativity",
      subtitle: "Join our creator community",
      icon: Palette,
      description: "Use our tools to build and sell digital products. Keep 55% of every sale. Template studio, audio booth, and tutorial producer all included.",
      primaryAction: () => navigate('/auth/signup?intent=creator'),
      primaryText: "Join as Creator",
      secondaryAction: () => navigate('/'),
      secondaryText: "See how it works"
    },
    {
      id: 'radio',
      title: "I heard about your radio station",
      subtitle: "That's Rayd-yo community radio",
      icon: Radio,
      description: "Listen live, request songs, join shows, or learn broadcasting. We train residents to become radio presenters and podcast producers.",
      primaryAction: () => navigate('/raydyo'),
      primaryText: "Visit Rayd-yo",
      secondaryAction: () => navigate('/raydyo#get-involved'),
      secondaryText: "Get involved"
    },
    {
      id: 'training',
      title: "I'm looking for skills training",
      subtitle: "From basics to professional level",
      icon: Target,
      description: "Free workshops in digital skills, creative media, and professional development. Take our assessment to find your pathway.",
      primaryAction: () => navigate('/workshops'),
      primaryText: "See Workshops",
      secondaryAction: () => navigate('/auth/signup?intent=learner'),
      secondaryText: "Start learning"
    },
    {
      id: 'gaming',
      title: "I heard about gaming events",
      subtitle: "Welcome to Joystick Gaming",
      icon: Gamepad2,
      description: "Gaming tournaments, retro nights, learn-to-stream workshops, and esports coaching. All skill levels welcome.",
      primaryAction: () => navigate('/joystick'),
      primaryText: "Visit Joystick",
      secondaryAction: () => navigate('/joystick#events'),
      secondaryText: "See events"
    },
    {
      id: 'community',
      title: "I want to get involved in my community",
      subtitle: "Join as member or volunteer",
      icon: Users,
      description: "Become a Champion, Connector, or Curator. Help shape your local community while developing new skills and building connections.",
      primaryAction: () => navigate('/membership'),
      primaryText: "Learn about roles",
      secondaryAction: () => navigate('/auth/signup?intent=volunteer'),
      secondaryText: "Join community"
    }
  ];

  return (
    <PageTemplate
      pageTitle="Get Started"
      pageStrapline="Find Your Path in Our Community"
      pageGuide="Whether someone sent you here or you're exploring on your own, we'll help you find exactly what you need."
      pageType="community"
      showMaya={true}
    >
      {showWelcome && <WelcomeBanner />}

      {/* Smart routing suggestion if available */}
      {confidence > 0.6 && welcomeMessage && suggestedPath && (
        <div className="suggested-banner">
          <span className="suggestion-text">{welcomeMessage}</span>
          <button 
            className="suggestion-btn"
            onClick={() => navigate(suggestedPath)}
          >
            Take me there
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {/* Main Pathways */}
      <section className="pathways-section">
        <h2>What brings you here?</h2>
        <p className="section-intro">
          Everyone starts somewhere different. Pick what brought you to Wembley Wonders.
        </p>
        
        <div className="entry-pathways-grid">
          {primaryPathways.map((pathway) => (
            <div key={pathway.id} className="entry-pathway-card">
              <div className="pathway-icon-header">
                <pathway.icon size={40} className="pathway-icon-large" />
              </div>
              <h3>{pathway.title}</h3>
              <p className="pathway-subtitle">{pathway.subtitle}</p>
              <p className="pathway-description">{pathway.description}</p>
              <div className="pathway-actions">
                <button 
                  className="pathway-primary-btn"
                  onClick={pathway.primaryAction}
                >
                  {pathway.primaryText}
                </button>
                {pathway.secondaryAction && (
                  <button 
                    className="pathway-secondary-btn"
                    onClick={pathway.secondaryAction}
                  >
                    {pathway.secondaryText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Happens After You Join */}
      <section className="content-section">
        <h2>What Happens After You Sign Up</h2>
        <p className="section-intro">
          No complicated onboarding. No waiting for approval. Start immediately.
        </p>

        <div className="post-signup-flow">
          <div className="flow-step">
            <div className="flow-number">1</div>
            <div className="flow-content">
              <h3>Create your account (2 minutes)</h3>
              <p>Email, password, and tell us what you're interested in. That's it.</p>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-number">2</div>
            <div className="flow-content">
              <h3>Access your workspace immediately</h3>
              <p>Personal dashboard with all creator tools, workshops, and community spaces.</p>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-number">3</div>
            <div className="flow-content">
              <h3>Start creating (or learning)</h3>
              <p>Use templates, record audio, make tutorials. Or take a workshop first. Your choice.</p>
            </div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step">
            <div className="flow-number">4</div>
            <div className="flow-content">
              <h3>Earn when you're ready</h3>
              <p>Get your work peer-reviewed, publish to Cyberstore, keep 55% forever.</p>
            </div>
          </div>
        </div>

        <div className="signup-cta">
          <Link to="/auth/signup" className="cta-button cta-primary cta-large">
            Create Free Account
          </Link>
          <p className="signup-note">
            ✓ No credit card required  ✓ Cancel anytime  ✓ Keep everything you create
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="content-section">
        <h2>Not sure yet? Explore first.</h2>
        
        <div className="quick-links-grid">
          <div className="quick-link-card">
            <Sparkles size={32} />
            <h3>View Programmes</h3>
            <p>See all our youth and adult programmes, workshops, and seasonal activities.</p>
            <Link to="/programmes" className="quick-link-btn">Browse Programmes →</Link>
          </div>

          <div className="quick-link-card">
            <BookOpen size={32} />
            <h3>Success Stories</h3>
            <p>Read how other creators have built skills and earned income in our community.</p>
            <Link to="/success-stories" className="quick-link-btn">Read Stories →</Link>
          </div>

          <div className="quick-link-card">
            <Heart size={32} />
            <h3>About Us</h3>
            <p>Learn about our Community Interest Company structure and how we share power.</p>
            <Link to="/about" className="quick-link-btn">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* Maya Integration */}
      {mayaStore && (
        <DraggableMaya 
          membershipTier="visitor"
        />
      )}
    </PageTemplate>
  );
};

export default GetStartedPage;
