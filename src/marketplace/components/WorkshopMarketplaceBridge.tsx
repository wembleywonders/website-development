/**
 * WORKSHOP MARKETPLACE BRIDGE COMPONENT
 * 
 * Shows what marketplace capabilities a workshop unlocks,
 * displayed after workshop completion.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React from 'react';
import type { ProgrammeId } from '../types';
import { PROGRAMME_INFO, WORKSHOP_SKILLS } from '../data/skillCombinations';
import './WorkshopMarketplaceBridge.css';

export interface WorkshopMarketplaceBridgeProps {
  programmeId: ProgrammeId;
  workshopNumber: number;
  onCreateListing?: (type: 'product' | 'service', suggestion: string) => void;
  onViewMarketplace?: () => void;
  onContinueProgramme?: () => void;
  workshopsCompleted: number;
  totalWorkshops: number;
}

export const WorkshopMarketplaceBridge: React.FC<WorkshopMarketplaceBridgeProps> = ({
  programmeId,
  workshopNumber,
  onCreateListing,
  onViewMarketplace,
  onContinueProgramme,
  workshopsCompleted,
  totalWorkshops
}) => {
  const programmeInfo = PROGRAMME_INFO[programmeId];
  const workshopData = WORKSHOP_SKILLS[programmeId];
  const currentWorkshop = workshopData?.find(w => w.workshopNumber === workshopNumber);
  
  if (!currentWorkshop || !programmeInfo) {
    return null;
  }
  
  const isGraduated = workshopsCompleted >= totalWorkshops;
  const progressPercent = (workshopsCompleted / totalWorkshops) * 100;
  
  return (
    <div className="workshop-bridge">
      {/* Success Header */}
      <div 
        className="workshop-bridge__header"
        style={{ backgroundColor: programmeInfo.color }}
      >
        <div className="workshop-bridge__icon">🎉</div>
        <h2 className="workshop-bridge__title">
          Workshop {workshopNumber} Complete!
        </h2>
        <p className="workshop-bridge__subtitle">
          {programmeInfo.icon} {programmeInfo.name}
        </p>
      </div>
      
      {/* Progress Bar */}
      <div className="workshop-bridge__progress">
        <div className="workshop-bridge__progress-bar">
          <div 
            className="workshop-bridge__progress-fill"
            style={{ 
              width: `${progressPercent}%`,
              backgroundColor: programmeInfo.color 
            }}
          />
        </div>
        <div className="workshop-bridge__progress-text">
          <span>{workshopsCompleted} of {totalWorkshops} workshops completed</span>
          {isGraduated ? (
            <span className="workshop-bridge__graduated">🎓 Graduated!</span>
          ) : (
            <span>{totalWorkshops - workshopsCompleted} to go</span>
          )}
        </div>
      </div>
      
      {/* Skills Learned */}
      <div className="workshop-bridge__section">
        <h3 className="workshop-bridge__section-title">
          ✨ Skills Gained
        </h3>
        <div className="workshop-bridge__skills">
          {currentWorkshop.skillsLearned.map((skill, index) => (
            <span key={index} className="workshop-bridge__skill">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* New Unlocks */}
      {currentWorkshop.canSellAfter.length > 0 && (
        <div className="workshop-bridge__section workshop-bridge__section--highlight">
          <h3 className="workshop-bridge__section-title">
            🔓 You Can Now Sell
          </h3>
          <div className="workshop-bridge__unlocks">
            {currentWorkshop.canSellAfter.map((item, index) => (
              <div key={index} className="workshop-bridge__unlock-item">
                <span className="workshop-bridge__unlock-name">{item}</span>
                {onCreateListing && (
                  <button
                    className="workshop-bridge__unlock-action"
                    onClick={() => onCreateListing('product', item)}
                  >
                    Create Listing →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Graduation Message */}
      {isGraduated && (
        <div className="workshop-bridge__graduation">
          <div className="workshop-bridge__graduation-icon">🎓</div>
          <h3>Congratulations, Graduate!</h3>
          <p>
            You've completed {programmeInfo.name}. You now have full access to 
            list products and services in the marketplace.
          </p>
          <div className="workshop-bridge__graduation-stats">
            <div className="workshop-bridge__stat">
              <span className="workshop-bridge__stat-value">{totalWorkshops}</span>
              <span className="workshop-bridge__stat-label">Workshops</span>
            </div>
            <div className="workshop-bridge__stat">
              <span className="workshop-bridge__stat-value">
                {currentWorkshop.skillsLearned.length}
              </span>
              <span className="workshop-bridge__stat-label">Skills</span>
            </div>
            <div className="workshop-bridge__stat">
              <span className="workshop-bridge__stat-value">∞</span>
              <span className="workshop-bridge__stat-label">Potential</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Next Steps */}
      <div className="workshop-bridge__actions">
        {currentWorkshop.canSellAfter.length > 0 && onViewMarketplace && (
          <button
            className="workshop-bridge__action workshop-bridge__action--primary"
            onClick={onViewMarketplace}
          >
            Go to Marketplace
          </button>
        )}
        
        {!isGraduated && onContinueProgramme && (
          <button
            className="workshop-bridge__action workshop-bridge__action--secondary"
            onClick={onContinueProgramme}
          >
            Continue to Workshop {workshopNumber + 1}
          </button>
        )}
        
        {isGraduated && (
          <div className="workshop-bridge__next-steps">
            <h4>What's Next?</h4>
            <ul>
              <li>📦 List your first product or service</li>
              <li>🔗 Consider another programme for skill combinations</li>
              <li>🤝 Find collaboration partners</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Maya Tip */}
      <div className="workshop-bridge__maya-tip">
        <div className="workshop-bridge__maya-avatar">🤖</div>
        <div className="workshop-bridge__maya-content">
          <span className="workshop-bridge__maya-name">Maya</span>
          <p>
            {isGraduated 
              ? "Amazing work! You're ready to start earning. Remember, I'm here to help if you need guidance on your first listing."
              : `Great progress! Each workshop brings you closer to graduation. Keep going!`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkshopMarketplaceBridge;