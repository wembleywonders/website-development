/**
 * SKILL UNLOCKS COMPONENT
 * 
 * Displays what products/services a creator can sell
 * based on their completed programmes and combinations.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';
import type { ProgrammeId } from '../types';
import { 
  PROGRAMME_INFO, 
  SINGLE_PROGRAMME_PRODUCTS,
  getAvailableCombinations,
  getSuggestedNextProgramme
} from '../data/skillCombinations';
import './SkillUnlocks.css';

export interface SkillUnlocksProps {
  completedProgrammes: ProgrammeId[];
  onProgrammeClick?: (programmeId: ProgrammeId) => void;
  onCreateListing?: (type: 'product' | 'service', suggestion: string) => void;
  showSuggestions?: boolean;
}

export const SkillUnlocks: React.FC<SkillUnlocksProps> = ({
  completedProgrammes,
  onProgrammeClick,
  onCreateListing,
  showSuggestions = true
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'combinations'>('products');
  
  // Get all unlocked products and services
  const unlockedProducts: { item: string; programmeId: ProgrammeId }[] = [];
  const unlockedServices: { item: string; programmeId: ProgrammeId }[] = [];
  
  completedProgrammes.forEach(programmeId => {
    const programmeProducts = SINGLE_PROGRAMME_PRODUCTS.find(
      p => p.programmeId === programmeId
    );
    
    if (programmeProducts) {
      programmeProducts.products.forEach(item => {
        unlockedProducts.push({ item, programmeId });
      });
      programmeProducts.services.forEach(item => {
        unlockedServices.push({ item, programmeId });
      });
    }
  });
  
  // Get combinations
  const combinations = getAvailableCombinations(completedProgrammes);
  
  // Get suggestions for next programmes
  const suggestions = getSuggestedNextProgramme(completedProgrammes);
  
  const handleCreateListing = (type: 'product' | 'service', item: string) => {
    onCreateListing?.(type, item);
  };

  return (
    <div className="skill-unlocks">
      {/* Header */}
      <div className="skill-unlocks__header">
        <h2 className="skill-unlocks__title">Your Skill Unlocks</h2>
        <p className="skill-unlocks__subtitle">
          Based on {completedProgrammes.length} completed programme{completedProgrammes.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      {/* Programme badges */}
      <div className="skill-unlocks__programmes">
        {completedProgrammes.map(programmeId => {
          const info = PROGRAMME_INFO[programmeId];
          return (
            <button
              key={programmeId}
              className="skill-unlocks__programme-badge"
              style={{ backgroundColor: info?.color || '#6B7280' }}
              onClick={() => onProgrammeClick?.(programmeId)}
              title={info?.name}
            >
              {info?.icon} {info?.shortName}
            </button>
          );
        })}
      </div>
      
      {/* Tabs */}
      <div className="skill-unlocks__tabs">
        <button
          className={`skill-unlocks__tab ${activeTab === 'products' ? 'skill-unlocks__tab--active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({unlockedProducts.length})
        </button>
        <button
          className={`skill-unlocks__tab ${activeTab === 'services' ? 'skill-unlocks__tab--active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services ({unlockedServices.length})
        </button>
        <button
          className={`skill-unlocks__tab ${activeTab === 'combinations' ? 'skill-unlocks__tab--active' : ''}`}
          onClick={() => setActiveTab('combinations')}
        >
          Combinations ({combinations.length})
        </button>
      </div>
      
      {/* Content */}
      <div className="skill-unlocks__content">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="skill-unlocks__list">
            {unlockedProducts.length === 0 ? (
              <p className="skill-unlocks__empty">
                Complete a programme to unlock products you can sell.
              </p>
            ) : (
              unlockedProducts.map(({ item, programmeId }, index) => {
                const info = PROGRAMME_INFO[programmeId];
                return (
                  <div key={`${programmeId}-${index}`} className="skill-unlocks__item">
                    <span 
                      className="skill-unlocks__item-badge"
                      style={{ backgroundColor: info?.color || '#6B7280' }}
                    >
                      {info?.icon}
                    </span>
                    <span className="skill-unlocks__item-name">{item}</span>
                    {onCreateListing && (
                      <button
                        className="skill-unlocks__item-action"
                        onClick={() => handleCreateListing('product', item)}
                      >
                        + Create
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
        
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="skill-unlocks__list">
            {unlockedServices.length === 0 ? (
              <p className="skill-unlocks__empty">
                Complete a programme to unlock services you can offer.
              </p>
            ) : (
              unlockedServices.map(({ item, programmeId }, index) => {
                const info = PROGRAMME_INFO[programmeId];
                return (
                  <div key={`${programmeId}-${index}`} className="skill-unlocks__item">
                    <span 
                      className="skill-unlocks__item-badge"
                      style={{ backgroundColor: info?.color || '#6B7280' }}
                    >
                      {info?.icon}
                    </span>
                    <span className="skill-unlocks__item-name">{item}</span>
                    {onCreateListing && (
                      <button
                        className="skill-unlocks__item-action"
                        onClick={() => handleCreateListing('service', item)}
                      >
                        + Create
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
        
        {/* Combinations Tab */}
        {activeTab === 'combinations' && (
          <div className="skill-unlocks__combinations">
            {combinations.length === 0 ? (
              <div className="skill-unlocks__empty-combinations">
                <p className="skill-unlocks__empty">
                  Complete 2+ programmes to unlock powerful skill combinations.
                </p>
                {showSuggestions && suggestions.length > 0 && (
                  <div className="skill-unlocks__suggestion">
                    <h4>💡 Suggested Next Programme</h4>
                    <p>
                      Adding <strong>{PROGRAMME_INFO[suggestions[0].programmeId]?.name}</strong> would 
                      unlock {suggestions[0].unlocksCount} combination{suggestions[0].unlocksCount !== 1 ? 's' : ''}:
                    </p>
                    <ul>
                      {suggestions[0].unlocks.map((unlock, i) => (
                        <li key={i}>{unlock}</li>
                      ))}
                    </ul>
                    {onProgrammeClick && (
                      <button
                        className="skill-unlocks__suggestion-btn"
                        onClick={() => onProgrammeClick(suggestions[0].programmeId)}
                      >
                        Learn More
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              combinations.map(combo => (
                <div key={combo.id} className="skill-unlocks__combination-card">
                  <div className="skill-unlocks__combination-header">
                    <h4 className="skill-unlocks__combination-name">{combo.name}</h4>
                    <span className="skill-unlocks__combination-multiplier">
                      {combo.revenueMultiplier}x potential
                    </span>
                  </div>
                  
                  <div className="skill-unlocks__combination-programmes">
                    {combo.programmes.map(programmeId => {
                      const info = PROGRAMME_INFO[programmeId];
                      return (
                        <span 
                          key={programmeId}
                          className="skill-unlocks__mini-badge"
                          style={{ backgroundColor: info?.color || '#6B7280' }}
                        >
                          {info?.icon}
                        </span>
                      );
                    })}
                  </div>
                  
                  <p className="skill-unlocks__combination-desc">{combo.description}</p>
                  
                  <div className="skill-unlocks__combination-unlocks">
                    <span className="skill-unlocks__unlocks-label">Unlocks:</span>
                    <div className="skill-unlocks__unlocks-list">
                      {combo.unlocks.map((unlock, i) => (
                        <span key={i} className="skill-unlocks__unlock-tag">{unlock}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      {/* Next programme suggestion */}
      {showSuggestions && suggestions.length > 0 && activeTab !== 'combinations' && completedProgrammes.length < 3 && (
        <div className="skill-unlocks__footer-suggestion">
          <span className="skill-unlocks__footer-icon">💡</span>
          <span className="skill-unlocks__footer-text">
            Add {PROGRAMME_INFO[suggestions[0].programmeId]?.name} to unlock {suggestions[0].unlocksCount} combination{suggestions[0].unlocksCount !== 1 ? 's' : ''}
          </span>
          {onProgrammeClick && (
            <button
              className="skill-unlocks__footer-btn"
              onClick={() => onProgrammeClick(suggestions[0].programmeId)}
            >
              Explore
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillUnlocks;