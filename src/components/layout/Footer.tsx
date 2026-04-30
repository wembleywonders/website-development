import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">

        {/* Volunteer CTA Section */}
        <div className="volunteer-cta-panel">
          <div className="volunteer-cta-content">
            <div className="volunteer-info">
              <h3>Rooted in Wembley. Built for the diaspora.</h3>
              <p>
                What you carry — the knowledge, the technique, the story — belongs in the record.
                Find your programme and start building something that's yours.
              </p>
            </div>
            <div className="volunteer-actions">
              <Link to="/auth/signup" className="volunteer-btn">
                Join free
              </Link>
              <div className="volunteer-stats">
                <span className="stat">13 programmes</span>
                <span className="stat">55% to creators</span>
                <span className="stat">148 cultures, one borough</span>
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
                A community creator economy platform on Wembley High Road.
                Family Knowledge = Family Investment.
              </p>
              <div className="social-info">
                <div className="social-links">
                  <a
                    href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Wembley%20Wonders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link whatsapp-link"
                  >
                    💬 WhatsApp Judith
                  </a>
                </div>
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
                <Link to="/auth/signup" className="footer-link">
                  <span className="link-icon">🚪</span>
                  Join free
                </Link>
                <Link to="/programmes" className="footer-link">
                  <span className="link-icon">🎓</span>
                  Our Programmes
                </Link>
                <Link to="/heritage" className="footer-link">
                  <span className="link-icon">🗃️</span>
                  Knowledge Commons
                </Link>
                <Link to="/shop" className="footer-link">
                  <span className="link-icon">🛍️</span>
                  The Cyberstore
                </Link>
                <Link to="/volunteers" className="footer-link">
                  <span className="link-icon">👥</span>
                  Volunteer with us
                </Link>
              </div>
            </div>
          </div>

          {/* Programmes Panel */}
          <div className="footer-panel">
            <div className="panel-header">
              <h3 className="panel-title">Programmes</h3>
            </div>
            <div className="panel-content">
              <div className="footer-links">
                <Link to="/programmes/bright-sparks" className="footer-link">
                  <span className="link-icon">✨</span>
                  Bright Sparks
                </Link>
                <Link to="/programmes/techreneurs" className="footer-link">
                  <span className="link-icon">💻</span>
                  TECHreneurs
                </Link>
                <Link to="/programmes/kaywanas-court" className="footer-link">
                  <span className="link-icon">🎭</span>
                  Kaywana's Court
                </Link>
                <Link to="/programmes/roots" className="footer-link">
                  <span className="link-icon">🌿</span>
                  Roots
                </Link>
                <Link to="/programmes" className="footer-link">
                  <span className="link-icon">→</span>
                  All 13 programmes
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
                    Wembley Wonders CIC<br />
                    452 High Road, Wembley, HA9 7AY
                  </address>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href="tel:02089029991">0208 902 9991</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <a
                    href="https://wa.me/447932198468"
                    target="_blank"
                    rel="noopener noreferrer"
                  >WhatsApp Judith</a>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <a href="mailto:hello@wembleywonders.org">hello@wembleywonders.org</a>
                </div>
              </div>
              <div className="footer-links">
                <Link to="/about" className="footer-link">
                  <span className="link-icon">ℹ️</span>
                  About us
                </Link>
                <Link to="/safeguarding" className="footer-link">
                  <span className="link-icon">🛡️</span>
                  Safeguarding
                </Link>
                <Link to="/accessibility" className="footer-link">
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
                © 2026 Wembley Wonders CIC. All rights reserved.
              </p>
              <p className="legal-info">
                Community Interest Company · No. 12960817 · Incorporated 19 October 2020
              </p>
              <p className="registration">
                Registered in England and Wales. All volunteers DBS-checked.
              </p>
            </div>
            <div className="footer-right">
              <div className="footer-meta-links">
                <Link to="/cookies" className="meta-link">Privacy Policy</Link>
                <Link to="/terms" className="meta-link">Terms of Service</Link>
                <Link to="/cookies" className="meta-link">Cookie Policy</Link>
                <Link to="/complaints" className="meta-link">Complaints Procedure</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
