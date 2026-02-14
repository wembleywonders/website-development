import React, { useEffect } from 'react';

export const ScreenReaderHelper: React.FC = () => {
  useEffect(() => {
    // Announce page load to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'Rayd-yo community radio page loaded. Use tab to navigate between controls.';
    
    document.body.appendChild(announcement);
    
    // Clean up
    return () => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };
  }, []);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      {/* Screen reader only announcements */}
      <div id="sr-announcements" aria-live="polite" aria-atomic="true" className="sr-only"></div>
      
      {/* Hidden styles for screen reader only content */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          z-index: 1000;
          text-decoration: none;
          border-radius: 4px;
        }
        
        .skip-link:focus {
          top: 6px;
        }
      `}</style>
    </>
  );
};