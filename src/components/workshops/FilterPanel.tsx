// src/components/workshops/FilterPanel.tsx
import React from 'react';
import { Grid, Calendar, List, Search } from 'lucide-react';
import './FilterPanel.css';

interface FilterPanelProps {
  selectedFramework: string;
  selectedType: string;
  searchTerm: string;
  onFrameworkChange: (framework: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  activeView: 'grid' | 'calendar' | 'list';
  onViewChange: (view: 'grid' | 'calendar' | 'list') => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedFramework,
  selectedType,
  searchTerm,
  onFrameworkChange,
  onTypeChange,
  onSearchChange,
  activeView,
  onViewChange
}) => {
  const frameworks = [
    { value: 'all', label: 'All Frameworks' },
    { value: 'CONNECT', label: 'Connect' },
    { value: 'CREATE', label: 'Create' },
    { value: 'CULTIVATE', label: 'Cultivate' },
    { value: 'COMPETE', label: 'Compete' },
    { value: 'CELEBRATE', label: 'Celebrate' }
  ];

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'programme', label: 'Programme' },
    { value: 'event', label: 'Event' },
    { value: 'drop-in', label: 'Drop-in' }
  ];

  return (
    <div className="filter-panel">
      <div className="filter-controls">
        <div className="filter-section">
          <label htmlFor="framework-select">Framework:</label>
          <select 
            id="framework-select"
            value={selectedFramework} 
            onChange={(e) => onFrameworkChange(e.target.value)}
            className="filter-select"
          >
            {frameworks.map(framework => (
              <option key={framework.value} value={framework.value}>
                {framework.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label htmlFor="type-select">Type:</label>
          <select 
            id="type-select"
            value={selectedType} 
            onChange={(e) => onTypeChange(e.target.value)}
            className="filter-select"
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section search-section">
          <label htmlFor="search-input">Search:</label>
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search workshops..."
              className="search-input"
            />
          </div>
        </div>
      </div>

      <div className="view-controls">
        <label>View:</label>
        <div className="view-buttons">
          <button 
            className={`view-button ${activeView === 'grid' ? 'active' : ''}`}
            onClick={() => onViewChange('grid')}
            aria-label="Grid View"
          >
            <Grid size={16} />
            <span>Grid</span>
          </button>
          <button 
            className={`view-button ${activeView === 'calendar' ? 'active' : ''}`}
            onClick={() => onViewChange('calendar')}
            aria-label="Calendar View"
          >
            <Calendar size={16} />
            <span>Calendar</span>
          </button>
          <button 
            className={`view-button ${activeView === 'list' ? 'active' : ''}`}
            onClick={() => onViewChange('list')}
            aria-label="List View"
          >
            <List size={16} />
            <span>List</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;