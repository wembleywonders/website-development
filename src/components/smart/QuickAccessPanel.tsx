import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInteractionTracking } from '../../hooks/useSmartRouting';
import './QuickAccessPanel.css';

export const QuickAccessPanel: React.FC = () => {
  const navigate = useNavigate();
  const { trackClick } = useInteractionTracking();
  const [isVisible, setIsVisible] = useState(false);
  const [lastInterest, setLastInterest] = useState<string | null>(null);

  useEffect(() => {
    // Show for returning visitors with known interests
    const visitCount = parseInt(localStorage.getItem('ww_visit_count') || '0');
    const interest = localStorage.getItem('ww_last_interest');
    
    if (visitCount > 1 && interest && !interest.includes('dismissed')) {
      setLastInterest(interest);
      setTimeout(() => setIsVisible(true), 3000); // Show after 3 seconds
    }
  }, []);

  const quickLinks = [
    { href: '/raydyo', title: '📻 Listen Live', keywords: ['radio'] },
    { href: '/apply', title: '🎯 Apply Now', keywords: ['membership', 'apply'] },
    { href: '/contact', title: '💬 Contact', keywords: ['help', 'support'] },
    { href: '/workshops', title: '📚 Workshops', keywords: ['training', 'skills'] }
  ];

  const relevantLinks = lastInterest 
    ? quickLinks.filter(link => 
        link.keywords.some(keyword => lastInterest.includes(keyword))
      ).concat(quickLinks.filter(link => 
        !link.keywords.some(keyword => lastInterest.includes(keyword))
      )).slice(0, 3)
    : quickLinks.slice(0, 3);

  if (!isVisible) return null;

  return (
    <div className="quick-access-panel">
      <div className="panel-header">
        <span>Quick Access</span>
        <button 
          className="panel-close"
          onClick={() => {
            setIsVisible(false);
            trackClick('quick_access_dismissed');
          }}
        >
          ✕
        </button>
      </div>
      <div className="panel-links">
        {relevantLinks.map((link, index) => (
          <button
            key={index}
            className="quick-link"
            onClick={() => {
              trackClick('quick_access_click', link.href);
              navigate(link.href);
              setIsVisible(false);
            }}
          >
            {link.title}
          </button>
        ))}
      </div>
    </div>
  );
};
