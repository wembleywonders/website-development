// src/components/common/ProgressionPathway.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProgressionPathway.css';

interface PathwayStep {
  id: string;
  number: number;
  title: string;
  description: string;
  examples: string[];
  links: { label: string; path: string }[];
  accessLevel: 'open' | 'member' | 'curator' | 'champion';
}

const pathwaySteps: PathwayStep[] = [
  {
    id: 'participate',
    number: 1,
    title: 'Participate',
    description: 'Start with workshops and community services. No commitment required - explore what interests you.',
    examples: [
      'Quarterly workshops (£50 each)',
      'Community hubs and resources',
      'Mutual aid participation',
      'Family support services'
    ],
    links: [
      { label: 'Browse Workshops', path: '/workshops' },
      { label: 'Find Community Hubs', path: '/community-hubs' },
      { label: 'Access Mutual Aid', path: '/mutual-aid' }
    ],
    accessLevel: 'open'
  },
  {
    id: 'engage',
    number: 2,
    title: 'Engage',
    description: 'Take action in your community. Join initiatives, contribute your skills, and start making connections.',
    examples: [
      'Connect with like-minded neighbors',
      'Create community projects',
      'Cultivate local initiatives',
      'Drive positive change'
    ],
    links: [
      { label: 'Connect with Others', path: '/connect' },
      { label: 'Create Projects', path: '/create' },
      { label: 'Cultivate Community', path: '/cultivate' },
      { label: 'Drive Change', path: '/change' }
    ],
    accessLevel: 'open'
  },
  {
    id: 'lead',
    number: 3,
    title: 'Lead',
    description: 'Apply for membership and develop professional leadership skills through our structured programme.',
    examples: [
      'Connector tier (12-month assessment)',
      'Curator tier (program leadership)',
      'Champion tier (strategic governance)',
      'Professional development tracking'
    ],
    links: [
      { label: 'View Membership Overview', path: '/membership' },
      { label: 'Apply for Connector Tier', path: '/apply' },
      { label: 'Download Rule Book', path: '/rulebook' }
    ],
    accessLevel: 'member'
  },
  {
    id: 'govern',
    number: 4,
    title: 'Govern',
    description: 'Shape community direction through democratic processes and strategic decision-making.',
    examples: [
      'Democratic participation in policy',
      'Community decision voting',
      'Strategic planning involvement',
      'External representation'
    ],
    links: [
      { label: 'Community Voice', path: '/community-voice' },
      { label: 'Democratic Participation', path: '/democratic-participation' },
      { label: 'Policy Discussions', path: '/policy-discussions' }
    ],
    accessLevel: 'curator'
  }
];

interface ProgressionPathwayProps {
  currentStep?: number;
  variant?: 'full' | 'compact' | 'horizontal';
  showCTA?: boolean;
}

const ProgressionPathway: React.FC<ProgressionPathwayProps> = ({ 
  currentStep, 
  variant = 'full',
  showCTA = true 
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  if (variant === 'compact') {
    return (
      <div className="progression-pathway compact">
        <div className="pathway-steps">
          {pathwaySteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`pathway-step ${currentStep === step.number ? 'current' : ''} ${step.accessLevel}`}
            >
              <div className="step-marker">
                <span className="step-number">{step.number}</span>
              </div>
              <div className="step-content">
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
              {index < pathwaySteps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="progression-pathway horizontal">
        <div className="pathway-header">
          <h2 className="pathway-title">Your Journey to Community Leadership</h2>
          <p className="pathway-subtitle">
            From workshop participant to community governance - choose your level of engagement
          </p>
        </div>
        <div className="pathway-steps horizontal">
          {pathwaySteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`pathway-step horizontal ${currentStep === step.number ? 'current' : ''} ${step.accessLevel}`}
            >
              <div className="step-marker">
                <span className="step-number">{step.number}</span>
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <div className="step-links">
                  {step.links.slice(0, 1).map((link, linkIndex) => (
                    <Link key={linkIndex} to={link.path} className="step-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              {index < pathwaySteps.length - 1 && <div className="step-connector horizontal"></div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="progression-pathway full">
      <div className="pathway-header">
        <h2 className="pathway-title">Your Journey to Community Leadership</h2>
        <p className="pathway-subtitle">
          From workshop participant to community governance - choose your level of engagement
        </p>
      </div>

      <div className="pathway-steps">
        {pathwaySteps.map((step, index) => (
          <div 
            key={step.id} 
            className={`pathway-step ${currentStep === step.number ? 'current' : ''} ${expandedStep === step.id ? 'expanded' : ''} ${step.accessLevel}`}
          >
            <div className="step-marker">
              <span className="step-number">{step.number}</span>
            </div>
            
            <div className="step-content">
              <div className="step-header" onClick={() => toggleStep(step.id)}>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <button className="expand-btn">
                  {expandedStep === step.id ? '−' : '+'}
                </button>
              </div>

              <div className="step-details">
                <div className="step-examples">
                  <h4>What's Included:</h4>
                  <ul>
                    {step.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>{example}</li>
                    ))}
                  </ul>
                </div>

                <div className="step-actions">
                  <h4>Get Started:</h4>
                  <div className="step-links">
                    {step.links.map((link, linkIndex) => (
                      <Link key={linkIndex} to={link.path} className="step-link">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="access-indicator">
                  <span className={`access-badge ${step.accessLevel}`}>
                    {step.accessLevel === 'open' ? 'Open to All' : 
                     step.accessLevel === 'member' ? 'Members Only' :
                     step.accessLevel === 'curator' ? 'Curator+ Only' : 
                     'Champion Only'}
                  </span>
                </div>
              </div>
            </div>

            {index < pathwaySteps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>

      {showCTA && (
        <div className="pathway-cta">
          <h3>Ready to Start Your Journey?</h3>
          <p>Join thousands of Wembley residents building stronger communities together.</p>
          <div className="cta-buttons">
            <Link to="/workshops" className="btn-primary">Start with Workshops</Link>
            <Link to="/apply" className="btn-secondary">Apply for Membership</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressionPathway;