import React from 'react';
import { BusinessROVTypes } from './BusinessROVTypes';

const BusinessROV: React.FC<BusinessROVTypes.BusinessROVProps> = ({ 
  onSponsorshipInquiry, 
  currentStep,
  businessData 
}) => {
  const generateBusinessGuidance = (step: string) => {
    switch (step) {
      case 'initial':
        return "Hello! I'm here to help your business connect with our Wembley community. What kind of partnership are you interested in?";
      case 'tier-selection':
        return "Based on your goals, I'd recommend starting with our Silver tier. It includes monthly Joystick features and Rayd-yo mentions.";
      case 'onboarding':
        return "Great choice! Let me walk you through the simple signup process. First, I'll need some basic information about your business.";
      default:
        return "I'm here to help with any questions about business partnerships with Wembley Wonders.";
    }
  };

  return (
    <div className="business-rov">
      <div className="rov-message">
        {generateBusinessGuidance(currentStep)}
      </div>
      
      <div className="rov-actions">
        <button onClick={() => onSponsorshipInquiry('bronze')}>
          Bronze Tier - £25/month
        </button>
        <button onClick={() => onSponsorshipInquiry('silver')}>
          Silver Tier - £50/month
        </button>
        <button onClick={() => onSponsorshipInquiry('gold')}>
          Gold Tier - £100/month
        </button>
      </div>
    </div>
  );
};

export default BusinessROV;
