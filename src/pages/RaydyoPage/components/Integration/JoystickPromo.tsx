import React from 'react';
import { Gamepad2, ArrowRight, Star, Users, Calendar } from 'lucide-react';
import './JoystickPromo.css';

export const JoystickPromo: React.FC = () => {
  return (
    <div className="joystick-promo">
      <div className="promo-header">
        <div className="icon-wrapper">
          <Gamepad2 size={24} />
        </div>
        <div className="header-text">
          <h3>Joystick E-zine</h3>
          <span className="subtitle">Gaming Culture & Community</span>
        </div>
      </div>

      <div className="promo-content">
        <p className="description">
          Explore gaming culture, reviews, and community stories from Wembley's digital creators.
        </p>

        <div className="feature-highlights">
          <div className="feature">
            <Star size={16} />
            <span>Game Reviews</span>
          </div>
          <div className="feature">
            <Users size={16} />
            <span>Community Stories</span>
          </div>
          <div className="feature">
            <Calendar size={16} />
            <span>Gaming Events</span>
          </div>
        </div>

        <div className="current-issue">
          <div className="issue-badge">Latest Issue</div>
          <h4>Wembley Gaming Scene 2025</h4>
          <p>Featuring local streamers, retro gaming cafes, and the rise of community esports.</p>
        </div>
      </div>

      <div className="promo-actions">
        <button className="primary-cta">
          <span>Read Latest Issue</span>
          <ArrowRight size={16} />
        </button>
        <button className="secondary-cta">
          Submit Your Story
        </button>
      </div>

      <div className="integration-note">
        <small>🎮 Connected to your community profile</small>
      </div>
    </div>
  );
};