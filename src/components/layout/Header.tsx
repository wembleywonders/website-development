import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMayaStore } from '../../stores/mayaStore';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isVisitorGuideActive, toggleVisitorGuide } = useMayaStore();

  // TODO: Replace with actual auth state
  const isLoggedIn = false;
  const userName = "Guest";

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle Maya/ROV button click
  const handleMayaClick = () => {
    toggleVisitorGuide();
    window.dispatchEvent(new CustomEvent('maya:open', { 
      detail: { source: 'header' } 
    }));
  };

  return (
    <>
      {/* ==================== ROW 1: TOP BAR ==================== */}
      <header className={`top-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="top-bar-container">
          
          {/* LEFT SECTION */}
          <div className="top-bar-left">
            
            {/* Logo */}
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img 
                src="/logo.png" 
                alt="Wembley Wonders" 
                className="logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <span className="logo-fallback">🌟</span>
              <div className="logo-text">
                <span className="logo-name">Wembley Wonders</span>
                <span className="logo-tagline">Create • Earn • Belong</span>
              </div>
            </Link>

            {/* Search Button */}
            <button className="search-button" aria-label="Search">
              <span className="search-icon">🔍</span>
              <span className="search-text">Search...</span>
            </button>

          </div>

          {/* RIGHT SECTION */}
          <div className="top-bar-right">

            {/* Ask Maya Button */}
            <button 
              className={`maya-button ${isVisitorGuideActive ? 'active' : ''}`}
              onClick={handleMayaClick}
              aria-label="Ask Maya AI Assistant"
            >
              <span className="maya-icon">💬</span>
              <span className="maya-text">Ask Maya</span>
              {isVisitorGuideActive && <span className="maya-active-dot" />}
            </button>
            
            {/* Media Links */}
            <div className="media-links">
              <Link to="/raydyo" className="media-link" title="Rayd-yo Radio">
                <span className="media-icon">📻</span>
                <span className="media-text">Listen</span>
              </Link>
              <Link to="/joystick" className="media-link" title="Joystick E-zine">
                <span className="media-icon">📰</span>
                <span className="media-text">Read</span>
              </Link>
            </div>

            {/* Account Section */}
            <div 
              className="account-section"
              onMouseEnter={() => setActiveDropdown('account')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {isLoggedIn ? (
                <button className="account-button">
                  <span className="account-icon">👤</span>
                  <span className="account-text">{userName}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="login-button">Log in</Link>
                  <Link to="/signup" className="signup-button">Join Free</Link>
                </div>
              )}

              {activeDropdown === 'account' && isLoggedIn && (
                <div className="account-dropdown">
                  <Link to="/dashboard" className="dropdown-link" onClick={closeMenu}>
                    <span className="link-icon">🎨</span>
                    My Workspace
                  </Link>
                  <Link to="/creators-journal" className="dropdown-link" onClick={closeMenu}>
                    <span className="link-icon">📔</span>
                    Creator's Journal
                  </Link>
                  <Link to="/dashboard" className="dropdown-link" onClick={closeMenu}>
                    <span className="link-icon">📊</span>
                    Dashboard
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-link" onClick={closeMenu}>
                    <span className="link-icon">⚙️</span>
                    Settings
                  </Link>
                  <button className="dropdown-link logout" onClick={() => {
                    console.log('Logout clicked');
                    closeMenu();
                  }}>
                    <span className="link-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </header>

      {/* ==================== ROW 2: MAIN NAVIGATION ==================== */}
      <nav className={`main-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="main-nav-container">
          <ul className="nav-list">
            
            {/* PRIMARY CTA: Try It */}
            <li className="nav-item nav-primary">
              <Link 
                to="/sandbox" 
                className={`nav-link nav-cta ${isActive('/sandbox') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-icon">🎨</span>
                <span>Try It</span>
              </Link>
            </li>

            {/* What's On Dropdown */}
            <li 
              className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('whats-on')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">📅</span>
                <span>What's On</span>
                <span className="nav-arrow">▼</span>
              </button>
              
              {activeDropdown === 'whats-on' && (
                <div className="nav-dropdown-menu">
                  <Link to="/calendar" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📆</span>
                    <div className="item-content">
                      <strong>Calendar</strong>
                      <span className="item-subtitle">All events & activities</span>
                    </div>
                  </Link>
                  <Link to="/workshops" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">🛠️</span>
                    <div className="item-content">
                      <strong>Workshops</strong>
                      <span className="item-subtitle">Hands-on skill sessions</span>
                    </div>
                  </Link>
                  <Link to="/sessions" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">💻</span>
                    <div className="item-content">
                      <strong>Zoom Sessions</strong>
                      <span className="item-subtitle">Weekly programme sessions</span>
                    </div>
                  </Link>
                  <Link to="/events" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">🎉</span>
                    <div className="item-content">
                      <strong>Events</strong>
                      <span className="item-subtitle">Showcases & celebrations</span>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/raydyo" className="dropdown-item featured" onClick={closeMenu}>
                    <span className="item-icon">📻</span>
                    <div className="item-content">
                      <strong>Rayd-yo Live</strong>
                      <span className="item-subtitle">Community radio</span>
                    </div>
                  </Link>
                </div>
              )}
            </li>

            {/* Creator Spaces Dropdown - NOW WITH FACTORY AS PRIMARY */}
            <li 
              className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('creator-spaces')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">🚀</span>
                <span>Creator Spaces</span>
                <span className="nav-arrow">▼</span>
              </button>
              
              {activeDropdown === 'creator-spaces' && (
                <div className="nav-dropdown-menu nav-dropdown-wide">
                  
                  {/* ✨ NEW: The Factory - Primary Featured Link */}
                  <Link to="/creator-factory" className="dropdown-item featured factory-featured" onClick={closeMenu}>
                    <span className="item-icon">🏭</span>
                    <div className="item-content">
                      <strong>The Creator Factory</strong>
                      <span className="item-subtitle">Ideas go in. Income comes out. See the full pipeline.</span>
                    </div>
                    <span className="new-badge">NEW</span>
                  </Link>

                  {/* Bright Sparks - Welcome Mat */}
                  <Link to="/programmes/bright-sparks" className="dropdown-item bright-sparks-featured" onClick={closeMenu}>
                    <span className="item-icon">✨</span>
                    <div className="item-content">
                      <strong>Bright Sparks</strong>
                      <span className="item-subtitle">Not sure where to start? Begin here.</span>
                    </div>
                  </Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  {/* Creator Spaces Grid */}
                  <div className="dropdown-grid">
                    <Link to="/programmes/stemgeneers" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">⚡</span>
                      <strong>STEMgeneers</strong>
                    </Link>
                    <Link to="/programmes/techreneurs" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">💻</span>
                      <strong>TECHreneurs</strong>
                    </Link>
                    <Link to="/programmes/pageturners" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">✍️</span>
                      <strong>Pageturners</strong>
                    </Link>
                    <Link to="/programmes/gtechcasters" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">🎙️</span>
                      <strong>G-Tech Casters</strong>
                    </Link>
                    <Link to="/programmes/silk-stilettos" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">🎨</span>
                      <strong>Silk Stilettos</strong>
                    </Link>
                    <Link to="/programmes/kaywanas-court" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">🎭</span>
                      <strong>Kaywana's Court</strong>
                    </Link>
                    <Link to="/programmes/trubble-n-bass" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">🎵</span>
                      <strong>Trubble n Bass</strong>
                    </Link>
                    <Link to="/programmes/auntie-anansis-kitchen" className="dropdown-item compact" onClick={closeMenu}>
                      <span className="item-icon">🍲</span>
                      <strong>Auntie Anansi's Kitchen</strong>
                    </Link>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-footer-links">
                    <Link to="/programmes" className="dropdown-item view-all" onClick={closeMenu}>
                      View all programmes →
                    </Link>
                    <Link to="/creator-pathways" className="dropdown-item view-all secondary" onClick={closeMenu}>
                      Creator Pathways (Classic) →
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* ✨ NEW: Facilitator Tools Dropdown */}
            <li 
              className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('facilitator-tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`nav-link ${isActive('/workshops/spark-generator') || isActive('/workshops/facilitation') ? 'active' : ''}`}>
                <span className="nav-icon">⚡</span>
                <span>Facilitator Tools</span>
                <span className="nav-arrow">▼</span>
              </button>
              
              {activeDropdown === 'facilitator-tools' && (
                <div className="nav-dropdown-menu">
                  <Link to="/workshops/spark-generator" className="dropdown-item featured" onClick={closeMenu}>
                    <span className="item-icon">🎯</span>
                    <div className="item-content">
                      <strong>Spark Generator</strong>
                      <span className="item-subtitle">Zoom warm-up prompts for every programme</span>
                    </div>
                  </Link>
                  <Link to="/workshops/facilitation" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📋</span>
                    <div className="item-content">
                      <strong>Facilitation Guides</strong>
                      <span className="item-subtitle">Week-by-week session plans</span>
                    </div>
                  </Link>
                  <Link to="/sessions" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📅</span>
                    <div className="item-content">
                      <strong>Sessions Schedule</strong>
                      <span className="item-subtitle">Upcoming Zoom sessions with quick links</span>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/sandbox" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">🧪</span>
                    <div className="item-content">
                      <strong>Sandbox Challenges</strong>
                      <span className="item-subtitle">Interactive activities for applied tasks</span>
                    </div>
                  </Link>
                  <Link to="/downloads" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📥</span>
                    <div className="item-content">
                      <strong>Downloads</strong>
                      <span className="item-subtitle">Worksheets & resources</span>
                    </div>
                  </Link>
                </div>
              )}
            </li>

            {/* Who We Are Dropdown */}
            <li 
              className="nav-item nav-dropdown"
              onMouseEnter={() => setActiveDropdown('who-we-are')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-link">
                <span className="nav-icon">👥</span>
                <span>Who We Are</span>
                <span className="nav-arrow">▼</span>
              </button>
              
              {activeDropdown === 'who-we-are' && (
                <div className="nav-dropdown-menu">
                  <Link to="/about" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📖</span>
                    <div className="item-content">
                      <strong>Our Story</strong>
                      <span className="item-subtitle">How Wembley Wonders began</span>
                    </div>
                  </Link>
                  <Link to="/team" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">👋</span>
                    <div className="item-content">
                      <strong>The Team</strong>
                      <span className="item-subtitle">Meet the people behind it</span>
                    </div>
                  </Link>
                  <Link to="/impact" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">📊</span>
                    <div className="item-content">
                      <strong>Our Impact</strong>
                      <span className="item-subtitle">What we've achieved together</span>
                    </div>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/volunteers" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">🤝</span>
                    <div className="item-content">
                      <strong>Volunteer</strong>
                      <span className="item-subtitle">Join our team</span>
                    </div>
                  </Link>
                  <Link to="/contact" className="dropdown-item" onClick={closeMenu}>
                    <span className="item-icon">💬</span>
                    <div className="item-content">
                      <strong>Contact</strong>
                      <span className="item-subtitle">Get in touch</span>
                    </div>
                  </Link>
                </div>
              )}
            </li>

            {/* Shop */}
            <li className="nav-item">
              <Link 
                to="/shop" 
                className={`nav-link nav-shop ${isActive('/shop') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-icon">🛒</span>
                <span>Shop</span>
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      {/* ==================== MOBILE NAVIGATION ==================== */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          
          {/* Mobile Primary CTA */}
          <div className="mobile-cta-section">
            <Link 
              to="/sandbox" 
              className="mobile-cta-button"
              onClick={closeMenu}
            >
              🎨 Try It Now — No Signup Needed
            </Link>
          </div>

          {/* Mobile Quick Actions */}
          <div className="mobile-quick-section">
            <button 
              className={`mobile-maya-btn ${isVisitorGuideActive ? 'active' : ''}`}
              onClick={() => {
                handleMayaClick();
                closeMenu();
              }}
            >
              💬 Ask Maya {isVisitorGuideActive && '(Active)'}
            </button>
          </div>

          {/* ✨ NEW: Mobile Factory CTA */}
          <div className="mobile-factory-section">
            <Link to="/creator-factory" className="mobile-factory-btn" onClick={closeMenu}>
              🏭 The Creator Factory
              <span className="mobile-factory-subtitle">Ideas → Income Pipeline</span>
            </Link>
          </div>

          {/* Mobile Media Links */}
          <div className="mobile-media-section">
            <h3 className="mobile-section-title">Community Media</h3>
            <Link to="/raydyo" className="mobile-media-btn raydyo" onClick={closeMenu}>
              📻 Listen — Rayd-yo
            </Link>
            <Link to="/joystick" className="mobile-media-btn joystick" onClick={closeMenu}>
              📰 Read — Joystick
            </Link>
          </div>

          {/* Mobile Account Section */}
          <div className="mobile-account-section">
            <h3 className="mobile-section-title">Account</h3>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
                  🎨 My Workspace
                </Link>
                <Link to="/creators-journal" className="mobile-nav-link" onClick={closeMenu}>
                  📔 Creator's Journal
                </Link>
                <Link to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
                  📊 Dashboard
                </Link>
                <Link to="/dashboard" className="mobile-nav-link" onClick={closeMenu}>
                  ⚙️ Settings
                </Link>
                <button className="mobile-nav-link logout" onClick={closeMenu}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-login-btn" onClick={closeMenu}>
                  Log in
                </Link>
                <Link to="/signup" className="mobile-signup-btn" onClick={closeMenu}>
                  Join Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Main Navigation */}
          <div className="mobile-main-section">
            <h3 className="mobile-section-title">Explore</h3>

            {/* What's On */}
            <div className="mobile-expandable">
              <button 
                className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-whats-on' ? null : 'mobile-whats-on')}
              >
                📅 What's On {activeDropdown === 'mobile-whats-on' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-whats-on' && (
                <div className="mobile-submenu">
                  <Link to="/calendar" className="mobile-nav-link sub" onClick={closeMenu}>
                    📆 Calendar
                  </Link>
                  <Link to="/workshops" className="mobile-nav-link sub" onClick={closeMenu}>
                    🛠️ Workshops
                  </Link>
                  <Link to="/sessions" className="mobile-nav-link sub" onClick={closeMenu}>
                    💻 Zoom Sessions
                  </Link>
                  <Link to="/events" className="mobile-nav-link sub" onClick={closeMenu}>
                    🎉 Events
                  </Link>
                </div>
              )}
            </div>

            {/* Creator Spaces - Updated with Factory */}
            <div className="mobile-expandable">
              <button 
                className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-spaces' ? null : 'mobile-spaces')}
              >
                🚀 Creator Spaces {activeDropdown === 'mobile-spaces' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-spaces' && (
                <div className="mobile-submenu">
                  {/* Factory - Primary */}
                  <Link to="/creator-factory" className="mobile-nav-link sub featured factory" onClick={closeMenu}>
                    🏭 The Creator Factory <span className="mobile-new-badge">NEW</span>
                  </Link>
                  {/* Bright Sparks - Welcome Mat */}
                  <Link to="/programmes/bright-sparks" className="mobile-nav-link sub featured" onClick={closeMenu}>
                    ✨ Bright Sparks — Start Here
                  </Link>
                  <div className="mobile-submenu-divider"></div>
                  <Link to="/programmes/stemgeneers" className="mobile-nav-link sub" onClick={closeMenu}>
                    ⚡ STEMgeneers
                  </Link>
                  <Link to="/programmes/techreneurs" className="mobile-nav-link sub" onClick={closeMenu}>
                    💻 TECHreneurs
                  </Link>
                  <Link to="/programmes/pageturners" className="mobile-nav-link sub" onClick={closeMenu}>
                    ✍️ Pageturners
                  </Link>
                  <Link to="/programmes/gtechcasters" className="mobile-nav-link sub" onClick={closeMenu}>
                    🎙️ G-Tech Casters
                  </Link>
                  <Link to="/programmes/silk-stilettos" className="mobile-nav-link sub" onClick={closeMenu}>
                    🎨 Silk Stilettos
                  </Link>
                  <Link to="/programmes/kaywanas-court" className="mobile-nav-link sub" onClick={closeMenu}>
                    🎭 Kaywana's Court
                  </Link>
                  <Link to="/programmes/trubble-n-bass" className="mobile-nav-link sub" onClick={closeMenu}>
                    🎵 Trubble n Bass
                  </Link>
                  <Link to="/programmes/auntie-anansis-kitchen" className="mobile-nav-link sub" onClick={closeMenu}>
                    🍲 Auntie Anansi's Kitchen
                  </Link>
                  <div className="mobile-submenu-divider"></div>
                  <Link to="/programmes" className="mobile-nav-link sub view-all" onClick={closeMenu}>
                    View all programmes →
                  </Link>
                  <Link to="/creator-pathways" className="mobile-nav-link sub view-all secondary" onClick={closeMenu}>
                    Creator Pathways (Classic) →
                  </Link>
                </div>
              )}
            </div>

            {/* ✨ NEW: Facilitator Tools (Mobile) */}
            <div className="mobile-expandable">
              <button 
                className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-facilitator' ? null : 'mobile-facilitator')}
              >
                ⚡ Facilitator Tools {activeDropdown === 'mobile-facilitator' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-facilitator' && (
                <div className="mobile-submenu">
                  <Link to="/workshops/spark-generator" className="mobile-nav-link sub featured" onClick={closeMenu}>
                    🎯 Spark Generator
                  </Link>
                  <Link to="/workshops/facilitation" className="mobile-nav-link sub" onClick={closeMenu}>
                    📋 Facilitation Guides
                  </Link>
                  <Link to="/sessions" className="mobile-nav-link sub" onClick={closeMenu}>
                    📅 Sessions Schedule
                  </Link>
                  <div className="mobile-submenu-divider"></div>
                  <Link to="/sandbox" className="mobile-nav-link sub" onClick={closeMenu}>
                    🧪 Sandbox Challenges
                  </Link>
                  <Link to="/downloads" className="mobile-nav-link sub" onClick={closeMenu}>
                    📥 Downloads
                  </Link>
                </div>
              )}
            </div>

            {/* Who We Are */}
            <div className="mobile-expandable">
              <button 
                className="mobile-expand-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'mobile-about' ? null : 'mobile-about')}
              >
                👥 Who We Are {activeDropdown === 'mobile-about' ? '▲' : '▼'}
              </button>
              {activeDropdown === 'mobile-about' && (
                <div className="mobile-submenu">
                  <Link to="/about" className="mobile-nav-link sub" onClick={closeMenu}>
                    📖 Our Story
                  </Link>
                  <Link to="/team" className="mobile-nav-link sub" onClick={closeMenu}>
                    👋 The Team
                  </Link>
                  <Link to="/impact" className="mobile-nav-link sub" onClick={closeMenu}>
                    📊 Our Impact
                  </Link>
                  <Link to="/volunteers" className="mobile-nav-link sub" onClick={closeMenu}>
                    🤝 Volunteer
                  </Link>
                  <Link to="/contact" className="mobile-nav-link sub" onClick={closeMenu}>
                    💬 Contact
                  </Link>
                </div>
              )}
            </div>

            {/* Shop */}
            <Link to="/shop" className="mobile-nav-link" onClick={closeMenu}>
              🛒 Shop
            </Link>

          </div>

        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-nav-backdrop" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;