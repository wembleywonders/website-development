import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSmartRouting, useInteractionTracking } from '../../hooks/useSmartRouting';
import './ContextualHero.css';

export const ContextualHero: React.FC = () => {
  const navigate = useNavigate();
  const { trackClick } = useInteractionTracking();
  const { suggestedPath, trackingId, confidence, redirectToSuggested } = useSmartRouting();

  // Different hero content based on routing confidence
  if (confidence > 0.8 && suggestedPath && trackingId) {
    return <HighConfidenceHero {...{ suggestedPath, trackingId, redirectToSuggested, trackClick }} />;
  }

  if (confidence > 0.5 && suggestedPath) {
    return <MediumConfidenceHero {...{ suggestedPath, redirectToSuggested, trackClick }} />;
  }

  return <DefaultHero />;
};

const HighConfidenceHero: React.FC<{
  suggestedPath: string;
  trackingId: string;
  redirectToSuggested: () => void;
  trackClick: (element: string, context?: string) => void;
}> = ({ suggestedPath, trackingId, redirectToSuggested, trackClick }) => {

  const getHeroContent = (trackingId: string) => {
    const content = {
      radio_referral: {
        title: "Ready to get on the airwaves?",
        subtitle: "Join Raydyo and share your voice with Wembley",
        cta: "Visit Raydyo Studio",
        icon: "📻"
      },
      gaming_referral: {
        title: "Game on! Welcome to Joystick",
        subtitle: "Tournaments, streaming, and retro gaming nights await",
        cta: "Join the Gaming Community",
        icon: "🎮"
      },
      training_referral: {
        title: "Let's build those skills!",
        subtitle: "From digital basics to professional development",
        cta: "Explore Workshops",
        icon: "🎯"
      },
      membership_referral: {
        title: "Ready to join our community?",
        subtitle: "Become a Champion, Connector, or Curator",
        cta: "Start Your Journey",
        icon: "🤝"
      }
    };

    return content[trackingId as keyof typeof content] || content.membership_referral;
  };

  const heroContent = getHeroContent(trackingId);

  return (
    <div className="contextual-hero high-confidence">
      <div className="hero-content">
        <div className="hero-icon">{heroContent.icon}</div>
        <h1>{heroContent.title}</h1>
        <p>{heroContent.subtitle}</p>
        <button 
          className="hero-cta primary"
          onClick={() => {
            trackClick('hero_cta_high_confidence', trackingId);
            redirectToSuggested();
          }}
        >
          {heroContent.cta}
        </button>
      </div>
    </div>
  );
};

const MediumConfidenceHero: React.FC<{
  suggestedPath: string;
  redirectToSuggested: () => void;
  trackClick: (element: string, context?: string) => void;
}> = ({ suggestedPath, redirectToSuggested, trackClick }) => {
  const navigate = useNavigate();

  return (
    <div className="contextual-hero medium-confidence">
      <div className="hero-content">
        <h1>Welcome to Wembley Wonders</h1>
        <p>We think you might be looking for something specific...</p>
        <div className="hero-actions">
          <button 
            className="hero-cta primary"
            onClick={() => {
              trackClick('hero_cta_suggested', suggestedPath);
              redirectToSuggested();
            }}
          >
            Take me there
          </button>
          <button 
            className="hero-cta secondary"
            onClick={() => {
              trackClick('hero_cta_explore');
              navigate('/get-started');
            }}
          >
            Let me explore
          </button>
        </div>
      </div>
    </div>
  );
};

const DefaultHero: React.FC = () => {
  const navigate = useNavigate();
  const { trackClick } = useInteractionTracking();

  return (
    <div className="contextual-hero default">
      <div className="hero-content">
        <h1>Welcome to Wembley Wonders</h1>
        <p>Building community through connection, creativity, and collaboration</p>
        <div className="hero-actions">
          <button 
            className="hero-cta primary"
            onClick={() => {
              trackClick('hero_cta_get_started');
              navigate('/get-started');
            }}
          >
            Get Started
          </button>
          <button 
            className="hero-cta secondary"
            onClick={() => {
              trackClick('hero_cta_learn_more');
              navigate('/about');
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
