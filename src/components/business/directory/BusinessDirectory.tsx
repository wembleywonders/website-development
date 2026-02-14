import React, { useState, useMemo } from 'react';
import { CommunityBusiness } from '../../../types/business/directory';
import { sampleBusinesses } from '../../../data/business/sampleBusinesses';
import BusinessCard from './BusinessCard';
import './BusinessDirectory.css';

const BusinessDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Businesses', icon: '🏪' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'food', name: 'Food & Hospitality', icon: '🍽️' },
    { id: 'retail', name: 'Retail', icon: '🛍️' },
    { id: 'services', name: 'Services', icon: '🔧' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'tech', name: 'Technology', icon: '💻' }
  ];

  const filteredBusinesses = useMemo(() => {
    return sampleBusinesses.filter(business => {
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="business-directory">
      <div className="directory-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="directory-results">
        <div className="results-header">
          <h3>
            {filteredBusinesses.length} Community Partner{filteredBusinesses.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </h3>
        </div>
        
        <div className="business-grid">
          {filteredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
        
        {filteredBusinesses.length === 0 && (
          <div className="no-results">
            <p>No businesses found matching your criteria.</p>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
