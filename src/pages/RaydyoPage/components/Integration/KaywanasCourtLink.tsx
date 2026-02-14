import React from 'react';
import { Scale, ArrowRight, Shield, MessageSquare, FileText } from 'lucide-react';
import './KaywanasCourtLink.css';

export const KaywanasCourtLink: React.FC = () => {
  return (
    <div className="kaywanas-court-link">
      <div className="promo-header">
        <div className="icon-wrapper">
          <Scale size={24} />
        </div>
        <div className="header-text">
          <h3>Kaywana's Court</h3>
          <span className="subtitle">Community Legal Guidance</span>
        </div>
      </div>

      <div className="promo-content">
        <p className="description">
          Free legal advice and community advocacy for Wembley residents.
        </p>

        <div className="services">
          <div className="service">
            <Shield size={16} />
            <span>Housing Rights</span>
          </div>
          <div className="service">
            <MessageSquare size={16} />
            <span>Legal Advice</span>
          </div>
          <div className="service">
            <FileText size={16} />
            <span>Document Help</span>
          </div>
        </div>

        <div className="availability">
          <div className="status-indicator live"></div>
          <span>Available for consultation</span>
        </div>
      </div>

      <div className="promo-actions">
        <button className="primary-cta">
          <span>Get Legal Help</span>
          <ArrowRight size={16} />
        </button>
        <button className="secondary-cta">
          Schedule Consultation
        </button>
      </div>

      <div className="integration-note">
        <small>⚖️ Confidential community legal support</small>
      </div>
    </div>
  );
};