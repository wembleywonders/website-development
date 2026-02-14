import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        
        {/* Volunteer CTA Section - Above panels */}
        <div className="volunteer-cta-panel">
          <div className="volunteer-cta-content">
            <div className="volunteer-info">
              <h3>Share Your Skills, Build Community</h3>
              <p>
                Help address the backstage skills shortage. Your expertise creates opportunities 
                for others and strengthens our local creative economy.
              </p>
            </div>
            <div className="volunteer-actions">
              <Link to="/volunteers" className="volunteer-btn">
                Volunteer with Us
              </Link>
              <div className="volunteer-stats">
                <span className="stat">12 active roles</span>
                <span className="stat">30+ volunteers</span>
                <span className="stat">200+ trained annually</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Panels */}
        <div className="footer-panels">
          
          {/* About Panel */}
          <div className="footer-panel">
            <div className="panel-header">
              <div className="footer-brand">
                <span className="footer-brand-icon">🏆</span>
                <h3 className="panel-title">Wembley Wonders</h3>
              </div>
            </div>
            <div className="panel-content">
              <p className="panel-description">
                Building community through skills development, creative expression, 
                and employment pathways in North West London.
              </p>
              <div className="social-info">
                <p className="social-text">
                  Connect with us: WhatsApp • Instagram • Facebook • YouTube
                </p>
              </div>
            </div>
          </div>

          {/* Get Involved Panel */}
          <div className="footer-panel">
            <div className="panel-header">
              <h3 className="panel-title">Get Involved</h3>
            </div>
            <div className="panel-content">
              <div className="footer-links">
                <Link to="/programmes" className="footer-link">
                  <span className="link-icon">🎓</span>
                  Our Programmes
                </Link>
                <Link to="/workshops" className="footer-link">
                  <span className="link-icon">🔨</span>
                  Workshops
                </Link>
                <Link to="/membership" className="footer-link">
                  <span className="link-icon">🤝</span>
                  Become a Member
                </Link>
                <Link to="/volunteers" className="footer-link">
                  <span className="link-icon">👥</span>
                  Volunteer with Us
                </Link>
                <Link to="/partnerships" className="footer-link">
                  <span className="link-icon">🤝</span>
                  Partner with Us
                </Link>
              </div>
            </div>
          </div>

          {/* Programs Panel */}
          <div className="footer-panel">
            <div className="panel-header">
              <h3 className="panel-title">Programs & Services</h3>
            </div>
            <div className="panel-content">
              <div className="footer-links">
                <Link to="/programmes/trubble-n-bass" className="footer-link">
                  <span className="link-icon">🎵</span>
                  Trubble n Bass
                </Link>
                <Link to="/programmes/kaywanas-court" className="footer-link">
                  <span className="link-icon">🎭</span>
                  Kaywana's Court
                </Link>
                <Link to="/programmes/bright-sparks" className="footer-link">
                  <span className="link-icon">⚡</span>
                  Bright Sparks
                </Link>
                <Link to="/connoisseurs-club" className="footer-link">
                  <span className="link-icon">👑</span>
                  Connoisseurs Club
                </Link>
                <Link to="/programmes" className="footer-link">
                  <span className="link-icon">🎬</span>
                  Backstage Skills Training
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Panel */}
          <div className="footer-panel">
            <div className="panel-header">
              <h3 className="panel-title">Contact & Support</h3>
            </div>
            <div className="panel-content">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <address>
                    Wembley Community Centre<br />
                    123 High Road, Wembley, HA9 6AA
                  </address>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href="tel:02081234567">020 8123 4567</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:hello@wembleywonders.org">hello@wembleywonders.org</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🤝</span>
                  <a href="mailto:volunteers@wembleywonders.org">volunteers@wembleywonders.org</a>
                </div>
              </div>
              <div className="footer-links">
                <Link to="/contact" className="footer-link">
                  <span className="link-icon">📞</span>
                  Contact Us
                </Link>
                <Link to="/about" className="footer-link">
                  <span className="link-icon">ℹ️</span>
                  About Us
                </Link>
                <Link to="/safeguarding" className="footer-link">
                  <span className="link-icon">🛡️</span>
                  Safeguarding
                </Link>
                <Link to="/about" className="footer-link">
                  <span className="link-icon">♿</span>
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-left">
              <p className="copyright">
                © 2025 Wembley Wonders CIC. All rights reserved.
              </p>
              <p className="legal-info">
                Regulated CIC • Company No. 12960817 • Incorporated 19 October 2020
              </p>
              <p className="registration">
                Registered in England and Wales.
              </p>
            </div>
            <div className="footer-right">
              <div className="footer-meta-links">
                <Link to="/privacy" className="meta-link">Privacy Policy</Link>
                <Link to="/terms" className="meta-link">Terms of Service</Link>
                <Link to="/privacy" className="meta-link">Cookie Policy</Link>
                <Link to="/contact" className="meta-link">Complaints Procedure</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;