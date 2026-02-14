// src/pages/member/simulators/PreLaunchModal.tsx
import React, { useState } from 'react';
import './PreLaunchModal.css';

interface PreLaunchModalProps {
  simulator: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  };
  onClose: () => void;
  onConfirm: () => void;
}

const PreLaunchModal: React.FC<PreLaunchModalProps> = ({ simulator, onClose, onConfirm }) => {
  const [checkedItems, setCheckedItems] = useState({
    dummyData: false,
    timeAvailable: false,
    helperRov: false,
    saveProgress: false
  });

  const checklistItems = [
    {
      id: 'dummyData',
      label: 'Understanding this uses dummy data only',
      description: 'No real personal information will be submitted'
    },
    {
      id: 'timeAvailable',
      label: '15-30 minutes available for practice',
      description: 'Enough time to complete a meaningful practice session'
    },
    {
      id: 'helperRov',
      label: 'Helper ROV activated for assistance',
      description: 'Real-time guidance available throughout the session'
    },
    {
      id: 'saveProgress',
      label: 'Progress will be saved to your account',
      description: 'You can continue from where you left off'
    }
  ];

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const allItemsChecked = Object.values(checkedItems).every(checked => checked);

  const handleConfirm = () => {
    if (!allItemsChecked) {
      alert('Please confirm all preparation items before launching the simulator.');
      return;
    }
    onConfirm();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="simulator-modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">{simulator.icon}</div>
          <h3 className="modal-title">Launch {simulator.title}</h3>
          <p className="modal-description">
            Get ready to practice {simulator.subtitle} in a safe environment
          </p>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="preparation-checklist">
          <div className="checklist-title">Before you start, make sure you have:</div>
          {checklistItems.map((item) => (
            <div key={item.id} className="checklist-item">
              <input
                type="checkbox"
                className="checklist-checkbox"
                id={item.id}
                checked={checkedItems[item.id as keyof typeof checkedItems]}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
              />
              <div className="checklist-content">
                <label htmlFor={item.id} className="checklist-text">
                  {item.label}
                </label>
                <p className="checklist-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="modal-actions">
          <button type="button" className="modal-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className={`modal-btn primary ${!allItemsChecked ? 'disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!allItemsChecked}
          >
            Launch Simulator
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreLaunchModal;