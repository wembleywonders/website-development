import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import DraggableMaya from '../../components/maya/DraggableMaya';
import MediaSection from '../../components/media/MediaSection';
import { 
  Mic, BookOpen, Users, Target, Award, CheckCircle, ArrowRight, 
  Volume2, Edit, Camera, Radio, FileText, Trophy, Building, 
  Briefcase, TrendingUp, MapPin, DollarSign, Clock
} from 'lucide-react';
import './ProgrammePage.css';

const GTechCastersPage: React.FC = () => {
  // Ecosystem opportunities - who needs media in Brent
  const ecosystemOpportunities = [
    {
      sector: "Churches & Faith",
      icon: "⛪",
      need: "Livestreaming, podcast production, event recording",
      income: "£200-500/month retainer",
      context: "100+ places of worship in Brent, most with weak media presence"
    },
    {
      sector: "Schools & Colleges",
      icon: "🏫",
      need: "Event coverage, promotional videos, student showcases",
      income: "£300-1,000/project",
      context: "100+ schools need content for recruitment and celebration"
    },
    {
      sector: "Restaurants & Food",
      icon: "🍽️",
      need: "Video content, social reels, menu showcases",
      income: "£150-400/month retainer",
      context: "200+ independent restaurants with poor video presence"
    },
    {
      sector: "Professional Services",
      icon: "💼",
      need: "Podcast production, thought leadership content",
      income: "£400-800/month for full production",
      context: "Lawyers, coaches, consultants who should have podcasts"
    },
    {
      sector: "Small Businesses",
      icon: "🏪",
      need: "Video testimonials, service explainers, Google presence",
      income: "£200-400/month retainer",
      context: "Thousands of businesses with no video presence"
    },
    {
      sector: "Events & Conferences",
      icon: "🎪",
      need: "Event filming, highlight reels, social clips",
      income: "£200-800/event",
      context: "Constant cycle of community events and celebrations"
    }
  ];

  const subProjects = [
    { 
      title: "Raydyo Community Radio", 
      description: "Host your own show, learn broadcasting, build audience. £75-150/episode while you develop skills.",
      icon: "🎧",
      outcome: "Launch your own show within weeks",
      type: "internal"
    },
    { 
      title: "Joystick Digital Magazine", 
      description: "Write features, create content, build portfolio. £27.50/article with editorial support.",
      icon: "🕹️",
      outcome: "Published portfolio for client work",
      type: "internal"
    },
    { 
      title: "B2B Media Services", 
      description: "Serve churches, schools, restaurants, and businesses. Stable income, relationship-based.",
      icon: "🏢",
      outcome: "£500-2,000/month from local clients",
      type: "ecosystem"
    },
    { 
      title: "Heritage Media", 
      description: "Oral histories, heritage language programming, cultural documentation. Urgent, meaningful work.",
      icon: "🌍",
      outcome: "Preserve stories before they're lost",
      type: "ecosystem"
    }
  ];

  const pillars = [
    { name: "Digital Literacy", description: "Core skills in media tools, editing software, and online platforms", icon: "💻" },
    { name: "Storytelling", description: "Finding your voice, shaping narratives, interviewing, and scriptwriting", icon: "📝" },
    { name: "Production", description: "Hands-on training in audio, video, and written content creation", icon: "🎬" },
    { name: "Client Service", description: "Working with businesses, managing relationships, delivering on deadline", icon: "🤝" },
    { name: "Distribution", description: "Share content via podcasts, social media, community channels", icon: "📡" }
  ];

  const pathways = [
    {
      name: "Internal Start",
      icon: "🏠",
      description: "Begin with Rayd-yo and Joystick. Earn while learning in supportive environment.",
      income: "£300-600/month",
      stability: "Moderate",
      timeToEarn: "1 month"
    },
    {
      name: "Ecosystem Focus",
      icon: "🏢",
      description: "Serve local businesses and organizations. Churches, schools, restaurants need you.",
      income: "£500-2,000/month",
      stability: "Stable",
      timeToEarn: "1-2 months"
    },
    {
      name: "Personal Brand",
      icon: "👤",
      description: "Build your own audience through content. High ceiling, requires patience.",
      income: "£0-3,000/month",
      stability: "Variable",
      timeToEarn: "6-12 months"
    },
    {
      name: "Hybrid Approach",
      icon: "🔄",
      description: "B2B base provides floor, personal content provides ceiling. Best of both.",
      income: "£800-3,000/month",
      stability: "Stable",
      timeToEarn: "2-4 months"
    }
  ];

  const progressionLevels = [
    { level: "Explorer", description: "Try a taster — record a segment, write an article, assist on a shoot", icon: "🔍" },
    { level: "Builder", description: "Launch your show, take your first client, build portfolio", icon: "🛠️" },
    { level: "Established", description: "Multiple income streams, regular clients, growing reputation", icon: "💡" },
    { level: "Leader", description: "Train others, run productions, potentially inherit/buy media business", icon: "🎯" }
  ];

  const outcomes = [
    "Develop confidence in media production and client service",
    "Build portfolio through internal platforms (Rayd-yo, Joystick)",
    "Connect to local businesses needing media services",
    "Create multiple income streams (internal + ecosystem + personal)",
    "Position for long-term opportunities in local media ecosystem"
  ];

  return (
    <PageTemplate
      pageTitle="G-Tech Casters"
      pageStrapline="Community Media Hub — Your voice connects to what's already here. Churches need livestreams. Schools need videos. Restaurants need content. You create media."
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "G-Tech Casters Programme",
          section: "programmes",
          contentType: "media"
        }}
      />

      <div className="programme-content">
        {/* Hero Section */}
        <section className="programme-hero">
          <div className="hero-badge">🎙️</div>
          <h1>G-Tech Casters</h1>
          <p className="hero-tagline">
            Your Voice. Your Platform. Connected to What's Already Here.
          </p>
        </section>

        {/* Ecosystem Philosophy */}
        <section className="programme-section">
          <div className="ecosystem-philosophy" style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)',
            border: '2px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#06b6d4', marginBottom: '1rem' }}>The Insight</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1rem' }}>
              You don't have to build an audience from scratch. <strong>Churches need livestreams</strong>. 
              Schools need event videos. Restaurants need content. Professionals need podcasts. 
              They have budgets — they just don't know you exist yet.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              One church livestream contract can be worth more than months of grinding for YouTube subscribers. 
              <strong> Connect to what's already here.</strong>
            </p>
          </div>
        </section>

        {/* What It Is */}
        <section className="programme-section">
          <h2>What It Is</h2>
          <p className="section-intro">
            G-Tech Casters is <strong>media training connected to real opportunities</strong>. 
            We don't just teach you to make content — we connect you to churches, schools, businesses, 
            and organizations that need your skills right now.
          </p>
          <p className="section-intro">
            Start with our internal platforms (Rayd-yo radio, Joystick magazine) to build skills and portfolio. 
            Then expand into the local ecosystem where stable income awaits.
          </p>
        </section>

        {/* Ecosystem Opportunities */}
        <section className="programme-section">
          <h2>Who Needs Media in Brent?</h2>
          <p className="section-intro">
            These organizations have budgets and ongoing needs. They're not looking for influencers — 
            they're looking for reliable media partners.
          </p>
          <div className="modules-grid">
            {ecosystemOpportunities.map((opp, index) => (
              <div key={index} className="module-card">
                <div className="module-icon">{opp.icon}</div>
                <h3>{opp.sector}</h3>
                <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{opp.need}</p>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem', 
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px',
                  marginBottom: '0.75rem'
                }}>
                  <DollarSign size={16} style={{ color: '#10b981' }} />
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{opp.income}</span>
                </div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: '#94a3b8'
                }}>
                  <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{opp.context}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pathway Comparison */}
        <section className="programme-section">
          <h2>Choose Your Pathway</h2>
          <p className="section-intro">
            Different routes to media income. Most successful creators combine approaches.
          </p>
          <div className="pillars-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {pathways.map((pathway, index) => (
              <div key={index} className="pillar-card" style={{
                background: pathway.name === 'Hybrid Approach' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: pathway.name === 'Hybrid Approach'
                  ? '2px solid rgba(16, 185, 129, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="pillar-icon">{pathway.icon}</div>
                <h3>{pathway.name}</h3>
                <p style={{ marginBottom: '1rem' }}>{pathway.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Income:</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>{pathway.income}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Stability:</span>
                    <span style={{ 
                      color: pathway.stability === 'Stable' ? '#10b981' : 
                             pathway.stability === 'Moderate' ? '#fbbf24' : '#f87171',
                      fontWeight: '600'
                    }}>{pathway.stability}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>First £:</span>
                    <span style={{ color: '#e2e8f0' }}>{pathway.timeToEarn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sandbox CTA */}
        <section className="programme-section">
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            border: '2px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#06b6d4', marginBottom: '1rem' }}>🎙️ Media Pathways Planner</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Map your media interests to real earning opportunities. Explore ecosystem connections, 
              internal platforms, and build your personalized pathway.
            </p>
            <Link 
              to="/programmes/g-tech-casters/sandbox" 
              className="cta-button primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Open Planner <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Core Sub-Projects */}
        <section className="programme-section">
          <h2>How You Build</h2>
          <p className="section-intro">
            Start internally, expand into ecosystem. Each platform builds toward the next.
          </p>
          <div className="modules-grid">
            {subProjects.map((project, index) => (
              <div key={index} className="module-card" style={{
                border: project.type === 'ecosystem' 
                  ? '2px solid rgba(16, 185, 129, 0.4)' 
                  : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="module-icon">{project.icon}</div>
                  {project.type === 'ecosystem' && (
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>ECOSYSTEM</span>
                  )}
                  {project.type === 'internal' && (
                    <span style={{
                      background: 'rgba(6, 182, 212, 0.2)',
                      color: '#06b6d4',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>WW INTERNAL</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  background: project.type === 'ecosystem' 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'rgba(6, 182, 212, 0.1)',
                  borderLeft: `3px solid ${project.type === 'ecosystem' ? '#10b981' : '#06b6d4'}`,
                  borderRadius: '4px'
                }}>
                  <strong style={{ color: project.type === 'ecosystem' ? '#10b981' : '#06b6d4' }}>
                    Outcome:
                  </strong> {project.outcome}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Media Special */}
        <section className="programme-section mission-section">
          <div className="mission-card" style={{ 
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)', 
            border: '2px solid rgba(251, 191, 36, 0.4)' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h2 style={{ color: '#fbbf24' }}>Heritage Media: Urgent Work</h2>
            <p>
              The Windrush generation is aging. Stories are being lost every day. G-Tech Casters trains 
              participants in <strong>oral history recording</strong>, heritage language programming, and 
              cultural documentation.
            </p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <h3 style={{ color: '#fbbf24', marginBottom: '1rem' }}>What This Means:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <Mic size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span><strong>Heritage language shows:</strong> Patois, Yoruba, Hindi programming for community radio</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <Camera size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span><strong>Oral history interviews:</strong> £50-150 per interview from families and organizations</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <FileText size={20} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span><strong>Cultural documentation:</strong> Churches, community groups paying to preserve their history</span>
                </li>
              </ul>
            </div>
            <p style={{ marginTop: '1.5rem', fontStyle: 'italic', fontSize: '1.05rem' }}>
              This work is meaningful and paid. Cultural organizations and families will invest in preservation.
            </p>
          </div>
        </section>

        {/* Programme Pillars */}
        <section className="programme-section">
          <h2>What You'll Learn</h2>
          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon">{pillar.icon}</div>
                <h3>{pillar.name}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="programme-section">
          <h2>Who It's For</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <Mic size={32} />
              <h3>Podcasters & Broadcasters</h3>
              <p>Host shows, create audio content, serve clients who need podcast production</p>
            </div>
            <div className="audience-card">
              <Camera size={32} />
              <h3>Video Creators</h3>
              <p>Event coverage, social content, promotional videos for local businesses</p>
            </div>
            <div className="audience-card">
              <Edit size={32} />
              <h3>Writers & Journalists</h3>
              <p>Features, profiles, documentation — build portfolio through Joystick</p>
            </div>
            <div className="audience-card">
              <Building size={32} />
              <h3>B2B Media Providers</h3>
              <p>Serve churches, schools, restaurants with ongoing media needs</p>
            </div>
          </div>
        </section>

        {/* Progression Pathway */}
        <section className="programme-section">
          <h2>Progression Pathway</h2>
          <div className="pillars-grid">
            {progressionLevels.map((level, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon">{level.icon}</div>
                <h3>{level.level}</h3>
                <p>{level.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Programme Showcase */}
        <MediaSection 
          contentType="gtechcasters-showcase"
          title="G-Tech Casters in Action"
          description="See our community members creating podcasts, client work, and media projects"
          allowedRoles={['staff', 'volunteer', 'editor']}
          placeholder="Share G-Tech Casters podcasts, client projects, and media work"
          autoArchive={false}
          maxItems={6}
          layout="grid"
        />

        {/* Learning Outcomes */}
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

        {/* The Long Game */}
        <section className="programme-section">
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)',
            border: '2px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#a78bfa', marginBottom: '1rem' }}>🎯 The Long Game: Succession</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
              Many local media businesses — production companies, recording studios, photography studios — 
              are owned by people in their 50s and 60s with no succession plan.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1rem' }}>
              <strong>The 5-year play:</strong> Build relationships, become indispensable, position for 
              partnership or buyout. Instead of building from scratch, inherit existing clients, equipment, 
              and reputation.
            </p>
            <p style={{ fontStyle: 'italic', color: '#c4b5fd' }}>
              Watch for: Owner 55+ with no family involved. Business stable but not growing. 
              Owner talks about "old days" more than future. These are signals.
            </p>
          </div>
        </section>

        {/* Links to Media Platforms */}
        <section className="programme-section">
          <h2>Our Platforms</h2>
          <p className="section-intro">
            Start here to build skills and portfolio. Then expand into the ecosystem.
          </p>
          <div className="audience-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <Link to="/raydyo" className="audience-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📻</div>
              <h3>Rayd-yo Radio</h3>
              <p>Community radio platform. Host shows, earn £75-150/episode, build broadcasting skills.</p>
              <div style={{ marginTop: '1rem', color: '#06b6d4', fontWeight: '600' }}>
                Visit Rayd-yo →
              </div>
            </Link>
            <Link to="/joystick" className="audience-card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
              <h3>Joystick Magazine</h3>
              <p>Digital e-zine. Write features, create content, build portfolio for client work.</p>
              <div style={{ marginTop: '1rem', color: '#06b6d4', fontWeight: '600' }}>
                Visit Joystick →
              </div>
            </Link>
          </div>
        </section>

        {/* 55/25/20 Model */}
        <section className="programme-section">
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem'
          }}>
            <h2 style={{ marginBottom: '1rem' }}>The 55/25/20 Model</h2>
            <p style={{ marginBottom: '1.5rem', color: '#a0aec0' }}>
              Revenue from internal platforms (Rayd-yo, Joystick) follows our transparent split:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.1)', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                minWidth: '150px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>55%</div>
                <div style={{ color: '#e2e8f0' }}>To Creator</div>
              </div>
              <div style={{ 
                background: 'rgba(251, 191, 36, 0.1)', 
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                minWidth: '150px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fbbf24' }}>25%</div>
                <div style={{ color: '#e2e8f0' }}>Community Fund</div>
              </div>
              <div style={{ 
                background: 'rgba(139, 92, 246, 0.1)', 
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                minWidth: '150px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#a78bfa' }}>20%</div>
                <div style={{ color: '#e2e8f0' }}>Platform Costs</div>
              </div>
            </div>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', fontStyle: 'italic', color: '#94a3b8' }}>
              Complete transparency. Your ecosystem and B2B work is 100% yours.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta">
          <h2>Connect Your Voice to What's Here</h2>
          <p>Churches need livestreams. Schools need videos. Businesses need content. Start creating.</p>
          <div className="cta-buttons">
            <Link to="/programmes/g-tech-casters/sandbox" className="cta-button primary">
              Open Media Planner
            </Link>
            <Link to="/get-started" className="cta-button secondary">
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default GTechCastersPage;