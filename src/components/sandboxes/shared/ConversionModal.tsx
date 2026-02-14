import React from 'react';
import styles from './SandboxPlanner.module.css';

interface ConversionModalProps {
  downloadCount: number;
  onClose: () => void;
  programmeName: string;
  programmeUrl?: string;
}

const ConversionModal: React.FC<ConversionModalProps> = ({ 
  downloadCount, 
  onClose,
  programmeName,
  programmeUrl = '/membership'
}) => {
  if (downloadCount === 1) {
    // First download modal
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
          <h3>🎉 Your plan is ready!</h3>
          <p>
            This is what's possible at Wembley Wonders. 
            Imagine making this real with your community.
          </p>
          <h4>Members can:</h4>
          <ul>
            <li>Submit plans to the community</li>
            <li>Access workshops and mentorship</li>
            <li>Use studio space and equipment</li>
            <li>Earn through collaborative projects</li>
            <li>Get featured across all platforms</li>
          </ul>
          <div className={styles.modalActions}>
            <a href={programmeUrl} className={styles.modalJoinButton}>
              Join to Make This Real
            </a>
            <button onClick={onClose} className={styles.modalKeepButton}>
              Keep Planning (2 free plans left)
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // Third download modal (limit reached)
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button className={styles.modalClose} onClick={onClose}>✕</button>
          <h3>🎉 You've planned 3 {programmeName} projects!</h3>
          <p>
            You're clearly passionate about this. Join Wembley Wonders to turn 
            these plans into reality.
          </p>
          <h4>Your membership includes:</h4>
          <ul>
            <li>✓ Submit unlimited plans</li>
            <li>✓ Access all workshops and equipment</li>
            <li>✓ Get matched with mentors and teams</li>
            <li>✓ Earn through revenue sharing (55-70%)</li>
            <li>✓ Featured across platforms</li>
            <li>✓ Portfolio tracking with DOI</li>
          </ul>
          <div className={styles.pricingOptions}>
            <div className={styles.pricingTier}>
              <p><strong>£15/month</strong></p>
              <p>1 programme access</p>
            </div>
            <div className={styles.pricingTier}>
              <p><strong>£35/month</strong></p>
              <p>3 programmes access</p>
            </div>
            <div className={`${styles.pricingTier} ${styles.bestValue}`}>
              <span className={styles.bestValueBadge}>BEST VALUE</span>
              <p><strong>£50/month</strong></p>
              <p>ALL 9 programmes</p>
            </div>
          </div>
          <div className={styles.modalActions}>
            <a href={programmeUrl} className={styles.modalJoinButton}>
              Join Now
            </a>
            <a href="/membership" className={styles.modalLearnButton}>
              Learn About Packages
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default ConversionModal;