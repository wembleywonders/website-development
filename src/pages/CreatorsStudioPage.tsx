import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreatorsStudioPage.css';

interface MissionZone {
  id: string;
  name: string;
  thunderbirdAnalogue: string;
  icon: string;
  status: 'ready' | 'active' | 'standby';
  description: string;
  activeMissions: number;
  color: string;
  route: string;
}

const CreatorsStudioPage: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const missionZones: MissionZone[] = [
    {
      id: 'mission-deck',
      name: 'Mission Deck',
      thunderbirdAnalogue: "Jeff Tracy's Command Balcony",
      icon: '🧠',
      status: 'ready',
      description: 'Overlooks the whole Studio. Project coordination, mentoring, live briefings.',
      activeMissions: 0,
      color: '#06b6d4',
      route: '/studio/mission-deck'
    },
    {
      id: 'audio-bay',
      name: 'Audio Bay',
      thunderbirdAnalogue: 'Thunderbird 5 (Space Communications)',
      icon: '🎙️',
      status: 'active',
      description: 'Broadcast Rayd-yo shows, edit podcasts, transmit cultural stories.',
      activeMissions: 3,
      color: '#a855f7',
      route: '/studio/audio-bay'
    },
    {
      id: 'innovation-pod',
      name: 'Innovation Pod',
      thunderbirdAnalogue: "Thunderbird 2's Cargo Bay",
      icon: '🧩',
      status: 'active',
      description: 'Flexible engineering space. Build prototypes, IoT kits, creative rigs.',
      activeMissions: 2,
      color: '#f59e0b',
      route: '/studio/innovation-pod'
    },
    {
      id: 'simulation-chamber',
      name: 'Simulation Chamber',
      thunderbirdAnalogue: 'Thunderbird 1 Control Pod',
      icon: '🎮',
      status: 'standby',
      description: 'Test games, livestreams, interactive experiences in the Sandbox.',
      activeMissions: 1,
      color: '#10b981',
      route: '/studio/simulation-chamber'
    },
    {
      id: 'journal-wall',
      name: "Creator's Journal Wall",
      thunderbirdAnalogue: 'Mission Archive',
      icon: '📓',
      status: 'ready',
      description: 'Auto-logs every project. Voice, image, code, idea. A living timeline.',
      activeMissions: 0,
      color: '#ec4899',
      route: '/creators-journal'
    },
    {
      id: 'cyberstore-dock',
      name: 'Cyberstore Dock',
      thunderbirdAnalogue: 'Launch Pad Doors',
      icon: '🛍️',
      status: 'active',
      description: 'Finished creations "roll out" into public release. Music, merch, apps, art.',
      activeMissions: 4,
      color: '#0ea5e9',
      route: '/shop'
    },
    {
      id: 'kaywanas-atrium',
      name: "Kaywana's Court Atrium",
      thunderbirdAnalogue: "Thunderbird 3's Launch Tower",
      icon: '💫',
      status: 'standby',
      description: 'Event and exhibition hub. The Studio's vertical showcase.',
      activeMissions: 0,
      color: '#fbbf24',
      route: '/programmes/kaywanas-court'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'standby': return '#fbbf24';
      case 'ready': return '#64748b';
      default: return '#64748b';
    }
  };

  return (
    <div className="creators-studio-page">
      {/* Command Header */}
      <header className="studio-header">
        <div className="header-grid">
          <div className="header-left">
            <div className="studio-logo">
              <span className="logo-icon">🚀</span>
              <div className="logo-text">
                <h1>Creator's Studio</h1>
                <p className="tagline">Mission Control for Creativity</p>
              </div>
            </div>
          </div>
          
          <div className="header-center">
            <div className="mission-status-board">
              <div className="status-item">
                <span className="status-label">Active Missions</span>
                <span className="status-value active">10</span>
              </div>
              <div className="status-divider"></div>
              <div className="status-item">
                <span className="status-label">Creators Online</span>
                <span className="status-value">24</span>
              </div>
              <div className="status-divider"></div>
              <div className="status-item">
                <span className="status-label">Launched Today</span>
                <span className="status-value success">3</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="studio-clock">
              <span className="clock-time">{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="clock-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Command View */}
      <section className="command-view">
        <div className="command-overlay">
          <div className="scan-lines"></div>
        </div>
        
        <div className="command-content">
          <h2 className="command-title">Ideas. Assembled. Launched. Celebrated.</h2>
          <p className="command-subtitle">
            Welcome to Command Central. Every project is a mission. Every creator is a pilot.
            The Studio is your launch bay.
          </p>
          
          <div className="command-briefing">
            <div className="briefing-alert">
              <span className="alert-icon pulsing">●</span>
              <span className="alert-text">3 new mission briefs available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Zones Grid */}
      <section className="mission-zones">
        <div className="zones-header">
          <h3>Mission Zones</h3>
          <p>Select a zone to begin your mission</p>
        </div>

        <div className="zones-grid">
          {missionZones.map((zone) => (
            <Link
              key={zone.id}
              to={zone.route}
              className={`zone-card ${zone.status} ${selectedZone === zone.id ? 'selected' : ''}`}
              onMouseEnter={() => setSelectedZone(zone.id)}
              onMouseLeave={() => setSelectedZone(null)}
              style={{ '--zone-color': zone.color } as React.CSSProperties}
            >
              {/* Status Indicator */}
              <div className="zone-status-bar">
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(zone.status) }}
                >
                  <span className="status-pulse"></span>
                </div>
                <span className="status-text">{zone.status.toUpperCase()}</span>
              </div>

              {/* Zone Icon */}
              <div className="zone-icon-container">
                <span className="zone-icon">{zone.icon}</span>
                {zone.activeMissions > 0 && (
                  <span className="active-badge">{zone.activeMissions}</span>
                )}
              </div>

              {/* Zone Info */}
              <div className="zone-info">
                <h4 className="zone-name">{zone.name}</h4>
                <p className="zone-analogue">{zone.thunderbirdAnalogue}</p>
                <p className="zone-description">{zone.description}</p>
              </div>

              {/* Launch Button */}
              <div className="zone-footer">
                <span className="launch-text">
                  {zone.status === 'active' ? 'Continue Mission' : 
                   zone.status === 'standby' ? 'Prepare Launch' : 
                   'Initiate Mission'}
                </span>
                <span className="launch-arrow">→</span>
              </div>

              {/* Hover Effect Overlay */}
              <div className="zone-hover-overlay"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Active Missions Board */}
      <section className="active-missions">
        <div className="missions-header">
          <h3>🔴 LIVE MISSIONS</h3>
          <p>Currently in progress across all zones</p>
        </div>

        <div className="missions-board">
          <div className="mission-item">
            <div className="mission-status">
              <span className="status-dot active"></span>
              <span className="status-label">ACTIVE</span>
            </div>
            <div className="mission-content">
              <h4>Rayd-yo Episode 47: "Sound System Culture"</h4>
              <p className="mission-creator">Uncle Winston & Marcus</p>
              <p className="mission-zone">🎙️ Audio Bay</p>
            </div>
            <div className="mission-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="progress-text">65% complete</span>
            </div>
          </div>

          <div className="mission-item">
            <div className="mission-status">
              <span className="status-dot active"></span>
              <span className="status-label">ACTIVE</span>
            </div>
            <div className="mission-content">
              <h4>IoT Speaker Prototype Testing</h4>
              <p className="mission-creator">STEMgeneers Team</p>
              <p className="mission-zone">🧩 Innovation Pod</p>
            </div>
            <div className="mission-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '40%' }}></div>
              </div>
              <span className="progress-text">40% complete</span>
            </div>
          </div>

          <div className="mission-item">
            <div className="mission-status">
              <span className="status-dot standby"></span>
              <span className="status-label">STANDBY</span>
            </div>
            <div className="mission-content">
              <h4>Casters Tournament Livestream Setup</h4>
              <p className="mission-creator">G-Tech Casters Crew</p>
              <p className="mission-zone">🎮 Simulation Chamber</p>
            </div>
            <div className="mission-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
              <span className="progress-text">Prep phase</span>
            </div>
          </div>

          <div className="mission-item">
            <div className="mission-status">
              <span className="status-dot launching"></span>
              <span className="status-label">LAUNCHING</span>
            </div>
            <div className="mission-content">
              <h4>New Merch Drop: "Wembley Wonders" Collection</h4>
              <p className="mission-creator">Silk Stilettos Design Team</p>
              <p className="mission-zone">🛍️ Cyberstore Dock</p>
            </div>
            <div className="mission-progress">
              <div className="progress-bar">
                <div className="progress-fill launching" style={{ width: '95%' }}></div>
              </div>
              <span className="progress-text">Final checks</span>
            </div>
          </div>
        </div>

        <div className="missions-footer">
          <Link to="/creators-studio" className="view-all-btn">
            View All Missions →
          </Link>
        </div>
      </section>

      {/* Mission Flow Timeline */}
      <section className="mission-flow">
        <h3>Mission Timeline</h3>
        <p className="flow-subtitle">From brief to launch — every mission follows the sequence</p>

        <div className="flow-stages">
          <div className="flow-stage">
            <div className="stage-number">1</div>
            <div className="stage-icon">📋</div>
            <h4>Lab Brief</h4>
            <p>Challenge incoming. Team assigned.</p>
          </div>

          <div className="flow-connector">→</div>

          <div className="flow-stage">
            <div className="stage-number">2</div>
            <div className="stage-icon">🛠️</div>
            <h4>Workshop</h4>
            <p>Specialists suit up. Tools ready.</p>
          </div>

          <div className="flow-connector">→</div>

          <div className="flow-stage">
            <div className="stage-number">3</div>
            <div className="stage-icon">🧪</div>
            <h4>Sandbox Test</h4>
            <p>Countdown. Prototype validated.</p>
          </div>

          <div className="flow-connector">→</div>

          <div className="flow-stage">
            <div className="stage-number">4</div>
            <div className="stage-icon">📓</div>
            <h4>Journal Log</h4>
            <p>Mission report. Data captured.</p>
          </div>

          <div className="flow-connector">→</div>

          <div className="flow-stage">
            <div className="stage-number">5</div>
            <div className="stage-icon">🚀</div>
            <h4>Launch</h4>
            <p>Go live. Mission complete.</p>
          </div>

          <div className="flow-connector">→</div>

          <div className="flow-stage">
            <div className="stage-number">6</div>
            <div className="stage-icon">🏆</div>
            <h4>Celebrate</h4>
            <p>Spotlight. Reinvest. Repeat.</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="studio-footer-cta">
        <div className="cta-content">
          <h3>Ready to Launch Your Mission?</h3>
          <p>Select a zone above or book a mentored session</p>
          <div className="cta-buttons">
            <Link to="/calendar" className="cta-btn primary">
              📅 Book Studio Time
            </Link>
            <Link to="/meet-maya" className="cta-btn secondary">
              🤖 Mission Briefing with Maya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorsStudioPage;
