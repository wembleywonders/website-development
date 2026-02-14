import React from 'react';
import { useSmartSearch } from '../../hooks/useSmartRouting';
import './SmartSearch.css';

interface SmartSearchProps {
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  placeholder = "What can we help you find?",
  className = "",
  showSuggestions = true
}) => {
  const { 
    searchTerm, 
    suggestions, 
    isSearching, 
    handleSearch, 
    selectSuggestion, 
    clearSearch,
    hasResults 
  } = useSmartSearch();

  return (
    <div className={`smart-search ${className}`}>
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search" onClick={clearSearch}>
            ✕
          </button>
        )}
        {isSearching && <div className="search-loading">🔍</div>}
      </div>

      {showSuggestions && hasResults && (
        <div className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-item"
              onClick={() => selectSuggestion(suggestion)}
            >
              <div className="suggestion-content">
                <div className="suggestion-title">{suggestion.title}</div>
                <div className="suggestion-description">{suggestion.description}</div>
              </div>
              <div className="suggestion-confidence">
                {suggestion.confidence > 0.8 ? '🎯' : '💡'}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
