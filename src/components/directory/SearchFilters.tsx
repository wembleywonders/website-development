// src/components/directory/SearchFilters.tsx
import React from 'react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: 'all' | 'residents' | 'businesses' | 'creatives';
  onFilterChange: (filter: 'all' | 'residents' | 'businesses' | 'creatives') => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  selectedCategories,
  onCategoryChange
}) => {
  const categories = [
    { id: 'dj-music', label: 'DJs & Musicians', count: 23 },
    { id: 'artists', label: 'Artists & Sculptors', count: 18 },
    { id: 'tech-services', label: 'Tech & Digital', count: 31 },
    { id: 'food-catering', label: 'Food & Catering', count: 12 },
    { id: 'fitness-wellness', label: 'Fitness & Wellness', count: 15 },
    { id: 'startups', label: 'Startups & Ideas', count: 9 },
    { id: 'local-shops', label: 'Local Shops', count: 27 }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId]);
    } else {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  return (
    <div className="sidebar">
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search members, businesses, services..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filter-section">
        <h3 className="filter-title">Browse By</h3>
        <div className="filter-tabs">
          {(['all', 'residents', 'businesses', 'creatives'] as const).map((filter) => (
            <div
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter === 'all' ? 'All Directory' : 
               filter === 'residents' ? 'Residents' : 
               filter === 'businesses' ? 'Businesses' : 'Creatives'}
            </div>
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h3 className="filter-title">Categories</h3>
        <div className="category-filters">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <input
                type="checkbox"
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              />
              <label htmlFor={category.id}>{category.label}</label>
              <span className="category-count">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;