/**
 * MARKETPLACE HOME PAGE
 * 
 * Main landing page for the marketplace showing
 * featured products, services, and creators.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';
import type { Product, Service, CreatorProfile, ProgrammeId } from '../types';
import { PROGRAMME_INFO } from '../data/skillCombinations';
import { ProductCard } from '../components/ProductCard';
import { ServiceCard } from '../components/ServiceCard';
import { CreatorProfileCard } from '../components/CreatorProfileCard';
import './MarketplaceHome.css';

export interface MarketplaceHomeProps {
  featuredProducts: Product[];
  featuredServices: Service[];
  featuredCreators: CreatorProfile[];
  creatorNames: Record<string, string>;
  onProductClick: (product: Product) => void;
  onServiceClick: (service: Service) => void;
  onCreatorClick: (creator: CreatorProfile) => void;
  onAddToCart: (product: Product) => void;
  onBookService: (service: Service) => void;
  onSearch: (query: string, filters: SearchFilters) => void;
  onBecomeCreator?: () => void;
}

export interface SearchFilters {
  type: 'all' | 'products' | 'services';
  programme: ProgrammeId | 'all';
  priceRange: [number, number] | null;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export const MarketplaceHome: React.FC<MarketplaceHomeProps> = ({
  featuredProducts,
  featuredServices,
  featuredCreators,
  creatorNames,
  onProductClick,
  onServiceClick,
  onCreatorClick,
  onAddToCart,
  onBookService,
  onSearch,
  onBecomeCreator
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    programme: 'all',
    priceRange: null,
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };
  
  const programmeOptions = Object.entries(PROGRAMME_INFO).map(([id, info]) => ({
    id: id as ProgrammeId,
    name: info.name,
    icon: info.icon
  }));

  return (
    <div className="marketplace-home">
      {/* Hero Section */}
      <section className="marketplace-home__hero">
        <div className="marketplace-home__hero-content">
          <h1>Discover Local Creative Talent</h1>
          <p>
            Products and services from Wembley's creative community. 
            Every purchase supports local creators and youth programmes.
          </p>
          
          {/* Search */}
          <form className="marketplace-home__search" onSubmit={handleSearch}>
            <div className="marketplace-home__search-input-wrap">
              <input
                type="text"
                placeholder="Search products, services, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="marketplace-home__search-input"
              />
              <button type="submit" className="marketplace-home__search-btn">
                Search
              </button>
            </div>
            
            <button 
              type="button"
              className="marketplace-home__filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {showFilters ? '▲' : '▼'}
            </button>
          </form>
          
          {/* Filters */}
          {showFilters && (
            <div className="marketplace-home__filters">
              <div className="marketplace-home__filter">
                <label>Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value as SearchFilters['type']})}
                >
                  <option value="all">All</option>
                  <option value="products">Products</option>
                  <option value="services">Services</option>
                </select>
              </div>
              
              <div className="marketplace-home__filter">
                <label>Programme</label>
                <select
                  value={filters.programme}
                  onChange={(e) => setFilters({...filters, programme: e.target.value as ProgrammeId | 'all'})}
                >
                  <option value="all">All Programmes</option>
                  {programmeOptions.map(prog => (
                    <option key={prog.id} value={prog.id}>
                      {prog.icon} {prog.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="marketplace-home__filter">
                <label>Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as SearchFilters['sortBy']})}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="marketplace-home__stats">
          <div className="marketplace-home__stat">
            <span className="marketplace-home__stat-value">50+</span>
            <span className="marketplace-home__stat-label">Active Creators</span>
          </div>
          <div className="marketplace-home__stat">
            <span className="marketplace-home__stat-value">200+</span>
            <span className="marketplace-home__stat-label">Products & Services</span>
          </div>
          <div className="marketplace-home__stat">
            <span className="marketplace-home__stat-value">£15k+</span>
            <span className="marketplace-home__stat-label">Creator Earnings</span>
          </div>
        </div>
      </section>
      
      {/* Programme Categories */}
      <section className="marketplace-home__programmes">
        <h2>Shop by Programme</h2>
        <div className="marketplace-home__programme-grid">
          {programmeOptions.map(prog => (
            <button
              key={prog.id}
              className="marketplace-home__programme-card"
              onClick={() => {
                setFilters({...filters, programme: prog.id});
                onSearch('', {...filters, programme: prog.id});
              }}
              style={{ borderColor: PROGRAMME_INFO[prog.id].color }}
            >
              <span 
                className="marketplace-home__programme-icon"
                style={{ backgroundColor: PROGRAMME_INFO[prog.id].color }}
              >
                {prog.icon}
              </span>
              <span className="marketplace-home__programme-name">{prog.name}</span>
            </button>
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="marketplace-home__section">
        <div className="marketplace-home__section-header">
          <h2>Featured Products</h2>
          <button 
            className="marketplace-home__view-all"
            onClick={() => onSearch('', {...filters, type: 'products'})}
          >
            View All →
          </button>
        </div>
        
        <div className="marketplace-home__product-grid">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              creatorName={creatorNames[product.creatorId]}
              onViewDetails={onProductClick}
              onAddToCart={onAddToCart}
              showRevenueSplit={true}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="marketplace-home__section">
        <div className="marketplace-home__section-header">
          <h2>Featured Services</h2>
          <button 
            className="marketplace-home__view-all"
            onClick={() => onSearch('', {...filters, type: 'services'})}
          >
            View All →
          </button>
        </div>
        
        <div className="marketplace-home__service-grid">
          {featuredServices.slice(0, 3).map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              creatorName={creatorNames[service.creatorId]}
              onViewDetails={onServiceClick}
              onBook={onBookService}
              showRevenueSplit={true}
            />
          ))}
        </div>
      </section>
      
      {/* Community Impact */}
      <section className="marketplace-home__impact">
        <div className="marketplace-home__impact-content">
          <h2>💚 Every Purchase Makes a Difference</h2>
          <p>
            When you buy from our marketplace, you're not just getting great products 
            and services – you're investing in Wembley's future.
          </p>
          
          <div className="marketplace-home__impact-split">
            <div className="marketplace-home__impact-item">
              <span className="marketplace-home__impact-percent">55-60%</span>
              <span className="marketplace-home__impact-label">Goes to Creators</span>
            </div>
            <div className="marketplace-home__impact-item">
              <span className="marketplace-home__impact-percent">20-25%</span>
              <span className="marketplace-home__impact-label">Community Fund</span>
            </div>
            <div className="marketplace-home__impact-item">
              <span className="marketplace-home__impact-percent">20%</span>
              <span className="marketplace-home__impact-label">Platform Operations</span>
            </div>
          </div>
          
          <p className="marketplace-home__impact-note">
            The Community Fund supports free workshops for young people 
            who can't afford creative education.
          </p>
        </div>
      </section>
      
      {/* Featured Creators */}
      <section className="marketplace-home__section">
        <div className="marketplace-home__section-header">
          <h2>Meet Our Creators</h2>
          <button className="marketplace-home__view-all">
            View All →
          </button>
        </div>
        
        <div className="marketplace-home__creator-grid">
          {featuredCreators.slice(0, 4).map(creator => (
            <CreatorProfileCard
              key={creator.id}
              creator={creator}
              onViewProfile={onCreatorClick}
              showCombinations={false}
              compact={true}
            />
          ))}
        </div>
      </section>
      
      {/* Become a Creator CTA */}
      {onBecomeCreator && (
        <section className="marketplace-home__cta">
          <div className="marketplace-home__cta-content">
            <h2>Ready to Start Earning?</h2>
            <p>
              Turn your creative skills into income. Join our community of 
              local creators and start selling your products and services.
            </p>
            <ul>
              <li>✓ Free training through our programmes</li>
              <li>✓ Keep 55-60% of every sale</li>
              <li>✓ Join a supportive creative community</li>
              <li>✓ Flexible – work on your own schedule</li>
            </ul>
            <button 
              className="marketplace-home__cta-btn"
              onClick={onBecomeCreator}
            >
              Become a Creator
            </button>
          </div>
        </section>
      )}
      
      {/* Footer Info */}
      <section className="marketplace-home__footer-info">
        <div className="marketplace-home__footer-grid">
          <div className="marketplace-home__footer-item">
            <span className="marketplace-home__footer-icon">🏠</span>
            <h4>Local First</h4>
            <p>All creators are from the Wembley and Brent community</p>
          </div>
          <div className="marketplace-home__footer-item">
            <span className="marketplace-home__footer-icon">🎓</span>
            <h4>Trained Creators</h4>
            <p>Every creator has completed our skills programmes</p>
          </div>
          <div className="marketplace-home__footer-item">
            <span className="marketplace-home__footer-icon">💳</span>
            <h4>Secure Payments</h4>
            <p>All transactions are protected and encrypted</p>
          </div>
          <div className="marketplace-home__footer-item">
            <span className="marketplace-home__footer-icon">💬</span>
            <h4>Community Support</h4>
            <p>Real people here to help with any questions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplaceHome;
