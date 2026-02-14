import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import './HomePage.css';

// Live Activity Feed Component (Creator-focused)
const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState([
    { id: 1, icon: '💰', text: 'Sarah earned her first £45', subtext: 'Creator\'s Journal sold on marketplace', time: '2 min ago', type: 'success' },
    { id: 2, icon: '📱', text: 'Marcus published new toolkit', subtext: 'Local Skills Guide - now live', time: '15 min ago', type: 'start' },
    { id: 3, icon: '🤝', text: 'New creator joined', subtext: 'Welcome to the community!', time: '1 hour ago', type: 'new' },
    { id: 4, icon: '✅', text: 'Project completed', subtext: 'CodeCrawler tutorial series', time: '2 hours ago', type: 'milestone' },
    { id: 5, icon: '🎨', text: 'Gallery post shared', subtext: 'Digital art portfolio piece', time: '3 hours ago', type: 'practice' },
  ]);

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    // Simulate new activities (for demo purposes)
    const interval = setInterval(() => {
      const newActivity = {
        id: Date.now(),
        icon: ['💰', '📱', '🤝', '✅', '🎨'][Math.floor(Math.random() * 5)],
        text: [
          'Creator earned income',
          'New product published',
          'Member milestone reached',
          'Project completed',
          'Community growing'
        ][Math.floor(Math.random() * 5)],
        subtext: 'Happening now',
        time: 'Just now',
        type: 'new'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 45000); // New activity every 45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-activity-feed">
      <div className="feed-header">
        <div className="feed-title-row">
          <h3 className="feed-title">
            <span className="live-pulse">●</span> Creator Activity
          </h3>
          <span className="feed-subtitle">See what's happening</span>
        </div>
      </div>
      
      <div className="feed-activities">
        {activities.slice(0, visibleCount).map((activity) => (
          <div key={activity.id} className={`activity-item ${activity.type}`}>
            <span className="activity-icon">{activity.icon}</span>
            <div className="activity-content">
              <p className="activity-text">{activity.text}</p>
              <p className="activity-subtext">{activity.subtext}</p>
            </div>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>

      <div className="feed-footer">
        <p>✨ Your work will appear here when you join</p>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  // Sidebar content - Creator-focused
  const sidebarContent = (
    <>
      {/* Live Activity Feed */}
      <div className="sidebar-section feed-section">
        <LiveActivityFeed />
      </div>

      {/* Primary CTA - Start Creating */}
      <div className="sidebar-section cta-section">
        <h3 className="sidebar-title">Ready to Start?</h3>
        <Link 
          to="/auth/signup?intent=creator" 
          className="sidebar-cta-button primary"
        >
          🎨 Join as Creator
        </Link>
        <p className="sidebar-cta-note">
          Free to start • Keep 55% of sales
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Explore</h3>
        <nav className="sidebar-nav">
          <Link to="/get-started" className="sidebar-link">
            <span className="link-icon">🚀</span>
            <span className="link-text">Get Started</span>
          </Link>
          <Link to="/programmes" className="sidebar-link">
            <span className="link-icon">📚</span>
            <span className="link-text">View Programmes</span>
          </Link>
          <Link to="/workshops" className="sidebar-link">
            <span className="link-icon">🎓</span>
            <span className="link-text">Free Workshops</span>
          </Link>
          <Link to="/about" className="sidebar-link">
            <span className="link-icon">ℹ️</span>
            <span className="link-text">About Our CIC</span>
          </Link>
        </nav>
      </div>

      {/* Community Platforms */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Our Platforms</h3>
        <div className="platform-links">
          <Link to="/raydyo" className="platform-link">
            <span className="platform-icon">📻</span>
            <div className="platform-info">
              <strong>Rayd-yo Radio</strong>
              <small>Listen live now</small>
            </div>
          </Link>
          <Link to="/joystick" className="platform-link">
            <span className="platform-icon">🎮</span>
            <div className="platform-info">
              <strong>Joystick</strong>
              <small>Gaming & esports</small>
            </div>
          </Link>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="sidebar-section contact-section">
        <h3 className="sidebar-title">Questions?</h3>
        <div className="contact-methods">
          <a href="mailto:hello@wembleywonders.org" className="contact-method">
            <span className="contact-icon">📧</span>
            <span className="contact-text">Email us</span>
          </a>
        </div>
        <p className="location-note">
          📍 Online & Wembley, London
        </p>
      </div>

      {/* Stats Banner */}
      <div className="sidebar-section stats-section">
        <div className="stat-item-small">
          <strong>30+</strong> Active Creators
        </div>
        <div className="stat-item-small">
          <strong>£14k+</strong> Creator Earnings
        </div>
        <div className="stat-item-small">
          <strong>100%</strong> Community-Owned
        </div>
      </div>
    </>
  );

  return (
    <PageTemplate
      pageTitle="We Help Creators Earn Income"
      pageStrapline="Join our community of creators sharing their work, building portfolios, and finding their people — from anywhere."
      pageType="standard"
      sidebarContent={sidebarContent}
    >
      {/* Quick Actions - First thing visitors see */}
      <div className="hero-actions">
        <Link to="/auth/signup?intent=creator" className="cta-button cta-primary cta-large">
          Start Creating
        </Link>
        <Link to="/about" className="cta-button cta-secondary cta-large">
          Learn About Our CIC
        </Link>
        <p className="hero-guarantee">✓ Free to start • No credit card required</p>
      </div>

      {/* Your Creator Journey - Workflow Preview */}
      <section className="content-section">
        <h2>Your Creator Journey</h2>
        <p className="section-intro">
          From idea to income. Here's how our community helps you succeed.
        </p>
        
        <div className="journey-grid">
          <div className="journey-step">
            <div className="step-number">1</div>
            <div className="step-icon">🎨</div>
            <h3>Create in Sandbox</h3>
            <p>Access our template studio, audio booth, and tutorial producer. Build professional digital products with guided tools and community support.</p>
            <span className="availability-note">Available after signup</span>
          </div>

          <div className="journey-step">
            <div className="step-number">2</div>
            <div className="step-icon">🎓</div>
            <h3>Learn in Workshops</h3>
            <p>Free skills training from digital basics to advanced techniques. Live sessions, recorded tutorials, and peer learning groups.</p>
            <span className="availability-note">Available after signup</span>
          </div>

          <div className="journey-step">
            <div className="step-number">3</div>
            <div className="step-icon">🔬</div>
            <h3>Validate in Impact Labs</h3>
            <p>Peer review ensures quality. Three community reviewers check your work before it goes to market. Get the "Wembley Wonders Certified" badge.</p>
            <span className="availability-note">Quality guarantee</span>
          </div>

          <div className="journey-step">
            <div className="step-number">4</div>
            <div className="step-icon">🏪</div>
            <h3>Sell in Cyberstore</h3>
            <p>List your certified products. Keep 55% of every sale. Automatic payouts. Your work, your income, your rights.</p>
            <span className="availability-note">Earn immediately</span>
          </div>

          <div className="journey-step">
            <div className="step-number">5</div>
            <div className="step-icon">📻</div>
            <h3>Get Featured</h3>
            <p>Top creators showcased on Rayd-yo radio, Joystick e-zine, and quarterly community events. Build your reputation.</p>
            <span className="availability-note">Earn this recognition</span>
          </div>

          <div className="journey-step">
            <div className="step-number">6</div>
            <div className="step-icon">📔</div>
            <h3>Document in Journal</h3>
            <p>Track your progress, reflect on lessons learned, build case studies. Your journey inspires the next creator.</p>
            <span className="availability-note">Your story matters</span>
          </div>
        </div>

        <div className="journey-cta">
          <p className="journey-tagline">
            <strong>This is the complete cycle.</strong> Create → Learn → Validate → Sell → Celebrate → Inspire others.
          </p>
          <Link to="/auth/signup?intent=creator" className="cta-button cta-primary cta-large">
            Join the Creator Community
          </Link>
        </div>
      </section>

      {/* How It Works: The 55/25/20 Model */}
      <section className="content-section">
        <h2>When You Earn, Your Community Grows</h2>
        <p className="section-intro">
          We're a Community Interest Company. Every product sold supports creators AND their communities.
        </p>
        
        <div className="revenue-split-grid">
          <div className="revenue-card creator-share">
            <div className="revenue-icon">💰</div>
            <div className="revenue-percentage">55%</div>
            <h3>To You</h3>
            <p>Creators keep the majority of income from their work. You made it, you earn it.</p>
          </div>

          <div className="revenue-card community-share">
            <div className="revenue-icon">🤝</div>
            <div className="revenue-percentage">25%</div>
            <h3>Community Development</h3>
            <p>Micro-grants, shared tools, training programmes. Your success funds others' growth.</p>
          </div>

          <div className="revenue-card platform-share">
            <div className="revenue-icon">⚙️</div>
            <div className="revenue-percentage">20%</div>
            <h3>Platform & Support</h3>
            <p>Infrastructure, hosting, and ongoing support to keep everything running smoothly.</p>
          </div>
        </div>

        <div className="model-explainer">
          <p><strong>This is sustainable creative income.</strong> Not gigs. Not exploitation. Real ownership.</p>
          <Link to="/about" className="inline-link">Read our full Collaboration Agreement →</Link>
        </div>
      </section>

      {/* Who Creates With Us */}
      <section className="content-section">
        <h2>Who Creates With Us</h2>
        <p className="section-intro">
          Two pathways. One mission. Everyone earns fairly.
        </p>

        <div className="pathways-grid">
          {/* Young Creators */}
          <div className="pathway-card">
            <div className="pathway-header">
              <span className="pathway-icon">🎓</span>
              <h3>Young Creators</h3>
              <p className="pathway-ages">Ages 13-19</p>
            </div>
            <p>Build skills, create projects, earn your first income. From learning to earning.</p>
            <ul>
              <li>Bright Sparks summer programme</li>
              <li>Silk Stilettos (women-only spaces)</li>
              <li>Neurodiversity Studio (SEND-friendly)</li>
              <li>Digital Makerspace workshops</li>
            </ul>
            <p className="outcome"><strong>Outcome:</strong> Real portfolio. Real skills. Real income.</p>
            <Link to="/programmes/youth" className="pathway-button">
              Explore Youth Programmes →
            </Link>
          </div>

          {/* Adult Creators */}
          <div className="pathway-card">
            <div className="pathway-header">
              <span className="pathway-icon">💼</span>
              <h3>Adult Creators</h3>
              <p className="pathway-ages">Ages 18+</p>
            </div>
            <p>Learn, make, publish — and get paid for your work. Turn ideas into income.</p>
            <ul>
              <li>Creator's Journal & portfolio tools</li>
              <li>Rad-Yo podcast production</li>
              <li>Joystick e-zine publishing</li>
              <li>Marketplace access (55% yours)</li>
            </ul>
            <p className="outcome"><strong>Outcome:</strong> Published products. Ongoing income. Creative freedom.</p>
            <Link to="/programmes/adult" className="pathway-button">
              Join Creator Community →
            </Link>
          </div>
        </div>
      </section>

      {/* What We Make Together */}
      <section className="content-section">
        <h2>What We Make Together</h2>
        <p className="section-intro">
          Digital products created by our community. Real income for real creators.
        </p>

        <div className="products-grid">
          <div className="product-card">
            <div className="product-preview">📔</div>
            <h3>Creator's Journal</h3>
            <p>Reflection + goal-setting workbook. Track your creative journey.</p>
            <div className="product-meta">
              <span className="product-status">✓ Available now</span>
              <span className="product-earnings">Creators earning</span>
            </div>
          </div>

          <div className="product-card">
            <div className="product-preview">💻</div>
            <h3>CodeCrawler</h3>
            <p>Beginner-friendly coding tutorials. Learn by building real projects.</p>
            <div className="product-meta">
              <span className="product-status">✓ Available now</span>
              <span className="product-earnings">Creators earning</span>
            </div>
          </div>

          <div className="product-card">
            <div className="product-preview">🛠️</div>
            <h3>Local Skills Toolkit</h3>
            <p>Starter guides for home-based creative income.</p>
            <div className="product-meta">
              <span className="product-status">Coming soon</span>
            </div>
          </div>

          <div className="product-card">
            <div className="product-preview">🎨</div>
            <h3>Craft & Culture Series</h3>
            <p>Tutorials and printable patterns from local artisans.</p>
            <div className="product-meta">
              <span className="product-status">Coming soon</span>
            </div>
          </div>
        </div>

        <div className="products-cta">
          <p>Your work could be here. Your income starts when you publish.</p>
          <Link to="/marketplace" className="inline-link">
            Browse the Marketplace →
          </Link>
        </div>
      </section>

      {/* Community Voices / Social Proof */}
      <section className="content-section">
        <h2>Real Creators. Real Stories.</h2>
        <p className="section-intro">
          No marketing fluff. Just people building, earning, and growing.
        </p>

        <div className="voices-grid">
          <div className="voice-card">
            <div className="voice-header">
              <span className="voice-icon">👩‍💻</span>
              <div className="voice-info">
                <h4>Sarah, 23</h4>
                <p className="voice-role">Creator • 3 months</p>
              </div>
            </div>
            <blockquote>
              "I published my first digital journal and made £45 in the first week. It's not huge money yet, 
              but it's MY work earning ME income. That changes everything."
            </blockquote>
          </div>

          <div className="voice-card">
            <div className="voice-header">
              <span className="voice-icon">🎧</span>
              <div className="voice-info">
                <h4>Marcus, 17</h4>
                <p className="voice-role">Bright Sparks • Youth creator</p>
              </div>
            </div>
            <blockquote>
              "School told me I wasn't smart enough for 'real' careers. Here, I created podcast intro packs, 
              sold 15 copies at £10 each, and earned my own money. Turns out I'm pretty smart when someone actually listens."
            </blockquote>
          </div>

          <div className="voice-card">
            <div className="voice-header">
              <span className="voice-icon">👔</span>
              <div className="voice-info">
                <h4>David, 56</h4>
                <p className="voice-role">Creator • Career transition</p>
              </div>
            </div>
            <blockquote>
              "After redundancy at 55, I felt worthless. This community showed me my 30 years of knowledge 
              IS valuable. I'm now creating digital guides and actually earning from what I know."
            </blockquote>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <span className="stat-label">Active Creators</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">£14k+</span>
            <span className="stat-label">Earned by Creators</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Community-Owned</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="content-section final-cta">
        <h2>Ready to Start Creating?</h2>
        <p>Join creators earning income from their work. Free to start. No credit card required.</p>
        <div className="cta-buttons">
          <Link to="/auth/signup?intent=creator" className="cta-button cta-primary cta-large">
            Start Creating
          </Link>
          <Link to="/about" className="cta-button cta-secondary cta-large">
            Read Collaboration Agreement
          </Link>
        </div>
        <p className="final-guarantee">
          ✓ 55% of sales goes to you  ✓ No hidden fees  ✓ You own your work
        </p>
      </section>
    </PageTemplate>
  );
};

export default HomePage;
