import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Mic, Play, Filter } from 'lucide-react';
import { SearchResult } from '../hooks/useSearch';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  onSearch: (query: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  isLoading?: boolean;
  error?: string | null;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  results,
  onSearch,
  suggestions = [],
  recentSearches = [],
  isLoading = false,
  error = null,
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return '';
    return duration;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'show':
        return <Mic size={16} />;
      case 'episode':
        return <Play size={16} />;
      case 'host':
        return <Mic size={16} />;
      default:
        return <Search size={16} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        {/* Header */}
        <div className="search-header">
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-container">
              <Search size={20} className="search-icon" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shows, episodes, hosts, or topics..."
                className="search-input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              aria-label="Toggle filters"
            >
              <Filter size={20} />
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="close-modal-btn"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </form>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Content Type:</label>
              <div className="filter-options">
                <button className="filter-option">All</button>
                <button className="filter-option">Shows</button>
                <button className="filter-option">Episodes</button>
                <button className="filter-option">Hosts</button>
              </div>
            </div>
            
            <div className="filter-group">
              <label>Date Range:</label>
              <div className="filter-options">
                <button className="filter-option">Any time</button>
                <button className="filter-option">Last week</button>
                <button className="filter-option">Last month</button>
                <button className="filter-option">Last year</button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="search-content">
          {/* Loading State */}
          {isLoading && (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Searching...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="search-error">
              <p>{error}</p>
              <button onClick={() => onSearch(query)}>Try Again</button>
            </div>
          )}

          {/* No Query State - Show Suggestions and Recent */}
          {!query && !isLoading && (
            <div className="search-suggestions">
              {recentSearches.length > 0 && (
                <div className="suggestion-group">
                  <h3 className="suggestion-title">
                    <Clock size={16} />
                    Recent Searches
                  </h3>
                  <div className="suggestion-list">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="suggestion-item recent"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="suggestion-group">
                <h3 className="suggestion-title">Popular Searches</h3>
                <div className="suggestion-list">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-item"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {query && !isLoading && results.length > 0 && (
            <div className="search-results">
              <div className="results-header">
                <h3>{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</h3>
              </div>
              
              <div className="results-list">
                {results.map((result) => (
                  <div key={result.id} className="result-item">
                    <div className="result-icon">
                      {getResultIcon(result.type)}
                    </div>
                    
                    <div className="result-content">
                      <div className="result-header">
                        <h4 className="result-title">{result.title}</h4>
                        <span className="result-type">{result.type}</span>
                      </div>
                      
                      <p className="result-description">{result.description}</p>
                      
                      <div className="result-meta">
                        {result.host && (
                          <span className="result-host">with {result.host}</span>
                        )}
                        {result.date && (
                          <span className="result-date">{formatDate(result.date)}</span>
                        )}
                        {result.duration && (
                          <span className="result-duration">{formatDuration(result.duration)}</span>
                        )}
                      </div>
                      
                      {result.tags && (
                        <div className="result-tags">
                          {result.tags.map((tag: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
                            <span key={index} className="result-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="result-actions">
                      <button className="play-result-btn">
                        <Play size={16} />
                        Play
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && !isLoading && results.length === 0 && !error && (
            <div className="no-results">
              <Search size={48} />
              <h3>No results found</h3>
              <p>Try searching for something else or check your spelling.</p>
              <div className="no-results-suggestions">
                <p>Popular searches:</p>
                <div className="suggestion-list">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-item"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};