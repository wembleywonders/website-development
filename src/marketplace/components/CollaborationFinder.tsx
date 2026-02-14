/**
 * COLLABORATION FINDER COMPONENT
 * 
 * Helps creators find partners with complementary skills
 * for collaboration opportunities.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState, useMemo } from 'react';
import type { ProgrammeId, CreatorProfile } from '../types';
import { PROGRAMME_INFO, SKILL_COMBINATIONS, getAvailableCombinations } from '../data/skillCombinations';
import './CollaborationFinder.css';

export interface CollaborationFinderProps {
  currentUserProgrammes: ProgrammeId[];
  creators: CreatorProfile[];
  onViewCreator?: (creator: CreatorProfile) => void;
  onContact?: (creator: CreatorProfile, combinationId: string) => void;
}

interface MatchedCreator extends CreatorProfile {
  matchScore: number;
  possibleCombinations: string[];
  complementaryProgrammes: ProgrammeId[];
}

export const CollaborationFinder: React.FC<CollaborationFinderProps> = ({
  currentUserProgrammes,
  creators,
  onViewCreator,
  onContact
}) => {
  const [selectedCombination, setSelectedCombination] = useState<string | null>(null);
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'limited'>('all');
  
  // Get combinations user can unlock with partners
  const potentialCombinations = useMemo(() => {
    const results: {
      combination: typeof SKILL_COMBINATIONS[0];
      neededProgrammes: ProgrammeId[];
    }[] = [];
    
    SKILL_COMBINATIONS.forEach(combo => {
      const hasProgrammes = combo.programmes.filter(p => currentUserProgrammes.includes(p));
      const neededProgrammes = combo.programmes.filter(p => !currentUserProgrammes.includes(p));
      
      // User has at least one programme from this combination
      if (hasProgrammes.length > 0 && neededProgrammes.length > 0) {
        results.push({
          combination: combo,
          neededProgrammes
        });
      }
    });
    
    return results;
  }, [currentUserProgrammes]);
  
  // Find and score matching creators
  const matchedCreators = useMemo(() => {
    const matches: MatchedCreator[] = [];
    
    creators.forEach(creator => {
      // Don't match with self
      if (creator.completedProgrammes.some(p => currentUserProgrammes.includes(p.programmeId))) {
        // Check for complementary skills
        const creatorProgrammeIds = creator.completedProgrammes.map(p => p.programmeId);
        const complementary = creatorProgrammeIds.filter(p => !currentUserProgrammes.includes(p));
        
        if (complementary.length === 0) return;
        
        // Find possible combinations
        const possibleCombos: string[] = [];
        let matchScore = 0;
        
        potentialCombinations.forEach(({ combination, neededProgrammes }) => {
          const creatorHasNeeded = neededProgrammes.some(p => creatorProgrammeIds.includes(p));
          if (creatorHasNeeded) {
            possibleCombos.push(combination.id);
            matchScore += combination.revenueMultiplier * 10;
          }
        });
        
        if (possibleCombos.length > 0) {
          // Boost score for availability
          if (creator.availability === 'available') matchScore += 20;
          if (creator.availability === 'limited') matchScore += 10;
          
          // Boost for rating
          matchScore += creator.ratings.overall * 5;
          
          // Boost for collaboration interest
          if (creator.openToCollaboration) matchScore += 15;
          
          matches.push({
            ...creator,
            matchScore,
            possibleCombinations: possibleCombos,
            complementaryProgrammes: complementary
          });
        }
      }
    });
    
    // Sort by match score
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }, [creators, currentUserProgrammes, potentialCombinations]);
  
  // Filter creators
  const filteredCreators = useMemo(() => {
    let results = matchedCreators;
    
    if (selectedCombination) {
      results = results.filter(c => c.possibleCombinations.includes(selectedCombination));
    }
    
    if (filterLocation) {
      results = results.filter(c => 
        c.location.area.toLowerCase().includes(filterLocation.toLowerCase()) ||
        c.location.borough.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    
    if (filterAvailability !== 'all') {
      results = results.filter(c => c.availability === filterAvailability);
    }
    
    return results;
  }, [matchedCreators, selectedCombination, filterLocation, filterAvailability]);
  
  const getCombinationById = (id: string) => 
    SKILL_COMBINATIONS.find(c => c.id === id);

  return (
    <div className="collab-finder">
      {/* Header */}
      <div className="collab-finder__header">
        <h2 className="collab-finder__title">Find Collaboration Partners</h2>
        <p className="collab-finder__subtitle">
          Combine your skills with other creators to unlock premium offerings
        </p>
      </div>
      
      {/* Your Skills */}
      <div className="collab-finder__your-skills">
        <h4>Your Programmes</h4>
        <div className="collab-finder__programme-badges">
          {currentUserProgrammes.map(progId => {
            const info = PROGRAMME_INFO[progId];
            return (
              <span 
                key={progId}
                className="collab-finder__programme-badge"
                style={{ backgroundColor: info?.color }}
              >
                {info?.icon} {info?.shortName}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Potential Combinations */}
      <div className="collab-finder__combinations">
        <h4>Combinations You Can Unlock</h4>
        <div className="collab-finder__combo-grid">
          {potentialCombinations.map(({ combination, neededProgrammes }) => (
            <button
              key={combination.id}
              className={`collab-finder__combo-card ${selectedCombination === combination.id ? 'collab-finder__combo-card--selected' : ''}`}
              onClick={() => setSelectedCombination(
                selectedCombination === combination.id ? null : combination.id
              )}
            >
              <div className="collab-finder__combo-header">
                <span className="collab-finder__combo-name">{combination.name}</span>
                <span className="collab-finder__combo-multiplier">
                  {combination.revenueMultiplier}x
                </span>
              </div>
              <div className="collab-finder__combo-programmes">
                {combination.programmes.map(progId => {
                  const info = PROGRAMME_INFO[progId];
                  const hasIt = currentUserProgrammes.includes(progId);
                  return (
                    <span 
                      key={progId}
                      className={`collab-finder__mini-badge ${hasIt ? 'collab-finder__mini-badge--have' : 'collab-finder__mini-badge--need'}`}
                      style={{ backgroundColor: hasIt ? info?.color : undefined }}
                      title={info?.name}
                    >
                      {info?.icon}
                    </span>
                  );
                })}
              </div>
              <div className="collab-finder__combo-need">
                Need: {neededProgrammes.map(p => PROGRAMME_INFO[p]?.shortName).join(', ')}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Filters */}
      <div className="collab-finder__filters">
        <div className="collab-finder__filter">
          <label>Location</label>
          <input
            type="text"
            placeholder="Any location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
        
        <div className="collab-finder__filter">
          <label>Availability</label>
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value as 'all' | 'available' | 'limited')}
          >
            <option value="all">Any</option>
            <option value="available">Available</option>
            <option value="limited">Limited</option>
          </select>
        </div>
        
        {selectedCombination && (
          <button 
            className="collab-finder__clear-filter"
            onClick={() => setSelectedCombination(null)}
          >
            Clear combination filter ×
          </button>
        )}
      </div>
      
      {/* Results */}
      <div className="collab-finder__results">
        <h4>
          {filteredCreators.length} Potential Partner{filteredCreators.length !== 1 ? 's' : ''}
          {selectedCombination && ` for ${getCombinationById(selectedCombination)?.name}`}
        </h4>
        
        {filteredCreators.length === 0 ? (
          <div className="collab-finder__empty">
            <p>No matching creators found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="collab-finder__creator-list">
            {filteredCreators.map(creator => (
              <div key={creator.id} className="collab-finder__creator-card">
                <div className="collab-finder__creator-main">
                  <img 
                    src={creator.avatar || '/images/default-avatar.jpg'}
                    alt={creator.displayName}
                    className="collab-finder__creator-avatar"
                  />
                  
                  <div className="collab-finder__creator-info">
                    <h5 className="collab-finder__creator-name">
                      {creator.displayName}
                      {creator.verified && <span className="collab-finder__verified">✓</span>}
                    </h5>
                    <p className="collab-finder__creator-tagline">{creator.tagline}</p>
                    <p className="collab-finder__creator-location">
                      📍 {creator.location.area}
                    </p>
                  </div>
                  
                  <div className="collab-finder__creator-score">
                    <span className="collab-finder__score-value">{creator.matchScore}</span>
                    <span className="collab-finder__score-label">match</span>
                  </div>
                </div>
                
                <div className="collab-finder__creator-skills">
                  <span className="collab-finder__skills-label">Has:</span>
                  {creator.complementaryProgrammes.map(progId => {
                    const info = PROGRAMME_INFO[progId];
                    return (
                      <span 
                        key={progId}
                        className="collab-finder__skill-badge"
                        style={{ backgroundColor: info?.color }}
                      >
                        {info?.icon} {info?.shortName}
                      </span>
                    );
                  })}
                </div>
                
                <div className="collab-finder__creator-combos">
                  <span className="collab-finder__combos-label">Could create:</span>
                  <div className="collab-finder__combo-tags">
                    {creator.possibleCombinations.slice(0, 3).map(comboId => {
                      const combo = getCombinationById(comboId);
                      return (
                        <span key={comboId} className="collab-finder__combo-tag">
                          {combo?.name}
                        </span>
                      );
                    })}
                    {creator.possibleCombinations.length > 3 && (
                      <span className="collab-finder__combo-more">
                        +{creator.possibleCombinations.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="collab-finder__creator-actions">
                  <span className={`collab-finder__availability collab-finder__availability--${creator.availability}`}>
                    {creator.availability === 'available' && '✓ Available'}
                    {creator.availability === 'limited' && '⏳ Limited'}
                    {creator.availability === 'unavailable' && '✗ Unavailable'}
                  </span>
                  
                  <div className="collab-finder__buttons">
                    {onViewCreator && (
                      <button
                        className="collab-finder__btn collab-finder__btn--secondary"
                        onClick={() => onViewCreator(creator)}
                      >
                        View Profile
                      </button>
                    )}
                    {onContact && creator.availability !== 'unavailable' && (
                      <button
                        className="collab-finder__btn collab-finder__btn--primary"
                        onClick={() => onContact(creator, creator.possibleCombinations[0])}
                      >
                        Propose Collab
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationFinder;
