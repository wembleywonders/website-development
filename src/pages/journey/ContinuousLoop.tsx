import React from 'react';
import './ContinuousLoop.css';
import { Link } from 'lucide-react';

interface ContinuousLoopProps {
  onSectionClick: (sectionId: string) => void;
  reduceMotion: boolean;
}

const ContinuousLoop: React.FC<ContinuousLoopProps> = ({ onSectionClick, reduceMotion }) => {
  const segments = [
    { id: 'connect', label: 'Connect', color: '#f87171' },
    { id: 'create', label: 'Create', color: '#0ea5e9' },
    { id: 'cultivate', label: 'Cultivate', color: '#10b981' },
    { id: 'compete', label: 'Compete', color: '#ef4444' },
    { id: 'celebrate', label: 'Celebrate', color: '#fbbf24' },
  ];

  return (
    <div className="continuous-loop">
      <div className="section-container">
        <h2 className="loop-title">The Continuous Loop</h2>
        <p className="loop-subtitle">Powering the future, one creator at a time</p>

        <div className={`loop-diagram ${reduceMotion ? 'static' : ''}`}>
          <svg viewBox="0 0 400 400" className="loop-svg">
            {/* Circular path */}
            <circle 
              cx="200" 
              cy="200" 
              r="150" 
              fill="none" 
              stroke="rgba(148, 163, 184, 0.2)" 
              strokeWidth="2"
            />

            {/* Segments */}
            {segments.map((segment, index) => {
              const angle = (index / segments.length) * 2 * Math.PI - Math.PI / 2;
              const x = 200 + 150 * Math.cos(angle);
              const y = 200 + 150 * Math.sin(angle);

              return (
                <g key={segment.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill={segment.color}
                    opacity="0.2"
                    className="loop-segment"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSectionClick(segment.id)}
                  />
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="600"
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}

            {/* Center infinity symbol */}
            <text
              x="200"
              y="210"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="64"
              fontWeight="bold"
            >
              ∞
            </text>
          </svg>
        </div>

        <div className="loop-tagline">
          <p>Wembley is more than a place — it's a state of creation.</p>
        </div>

        <div className="section-ctas center">
          <Link to="/signup" className="section-cta primary">
            🌱 Join the Loop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContinuousLoop;
