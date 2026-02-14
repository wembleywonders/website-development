import React from 'react';
import { Link } from 'react-router-dom';
import './CreateSection.css';

interface CreateSectionProps {
  reduceMotion: boolean;
}

const CreateSection: React.FC<CreateSectionProps> = ({ reduceMotion }) => {
  return (
    <div className="create-section">
      <div className="section-container">
        
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Create</h2>
          <p className="section-tagline">From idea to action</p>
        </div>

        {/* 3-Column Grid */}
        <div className="create-grid">
          
          {/* Lab Scenes */}
          <div className={`create-card lab-card ${reduceMotion ? 'static' : ''}`}>
            <div className="card-visual">
              <span className="card-emoji">🧪</span>
            </div>
            <h3 className="card-title">The Lab</h3>
            <p className="card-description">
              Mentors, whiteboards, and collaboration. Turn your ideas into prototypes.
            </p>
          </div>

          {/* Workshops */}
          <div className={`create-card workshop-card ${reduceMotion ? 'static' : ''}`}>
            <div className="card-visual">
              <span className="card-emoji">🛠️</span>
            </div>
            <h3 className="card-title">Workshops</h3>
            <p className="card-description">
              Hands-on sessions in STEMgeneers, TECHreneurs, and more.
            </p>
          </div>

          {/* Projects */}
          <div className={`create-card project-card ${reduceMotion ? 'static' : ''}`}>
            <div className="card-visual">
              <span className="card-emoji">💻</span>
            </div>
            <h3 className="card-title">Your Projects</h3>
            <p className="card-description">
              Build apps, create art, code robots. Make it real.
            </p>
          </div>
        </div>

        <div className="section-overlay-text">
          Turn your ideas into impact. Learn. Build. Test.
        </div>

        <div className="section-ctas center">
          <Link to="/programmes" className="section-cta primary">
            🧪 Explore Labs
          </Link>
          <Link to="/calendar" className="section-cta secondary">
            🛠️ Join a Workshop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateSection;
