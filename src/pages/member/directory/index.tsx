// src/pages/member/directory/index.tsx
import React, { useState, useEffect } from 'react';
import BusinessCard from '../../../components/directory/BusinessCard';
import ResidentProfile from '../../../components/directory/ResidentProfile';
import SearchFilters from '../../../components/directory/SearchFilters';
import BusinessListingModal from './BusinessListingModal';
import './CommunityDirectory.css';

interface DirectoryListing {
  id: string;
  type: 'resident' | 'business';
  name: string;
  title: string;
  location: string;
  description: string;
  services: string[];
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  avatar: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

const CommunityDirectory: React.FC = () => {
  const [listings, setListings] = useState<DirectoryListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<DirectoryListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'residents' | 'businesses' | 'creatives'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showAdvertiseModal, setShowAdvertiseModal] = useState(false);

  // Mock data - would come from API
  useEffect(() => {
    const mockListings: DirectoryListing[] = [
      {
        id: '1',
        type: 'business',
        name: 'Marcus Chen - DJ & Music Producer',
        title: 'DJ Services • Electronic Music',
        location: 'Solar Building • Available weekends',
        description: 'Professional DJ with 8+ years experience. Specializing in house, techno, and ambient music for community events, private parties, and cultural celebrations. Recent resident who loves bridging musical cultures.',
        services: ['Event DJ', 'Music Production', 'Sound System Rental', 'Community Events'],
        rating: 4.9,
        reviewCount: 12,
        isPremium: true,
        avatar: '🎵',
        contactInfo: { email: 'marcus.chen@example.com' }
      },
      {
        id: '2',
        type: 'business',
        name: 'Elena Rodriguez Art Studio',
        title: 'Artist • Sculptor • Workshop Leader',
        location: 'Luna Building • Home studio available',
        description: 'Contemporary sculptor working with sustainable materials. Offering art commissions, community workshops, and intergenerational art sessions.',
        services: ['Custom Sculptures', 'Art Workshops', 'Community Murals', 'Art Therapy'],
        rating: 5.0,
        reviewCount: 8,
        isPremium: false,
        avatar: '🎨'
      },
      {
        id: '3',
        type: 'resident',
        name: 'Raj Singh',
        title: 'Fintech Consultant • Crypto Enthusiast',
        location: 'Madison Building • Member since Oct 2024',
        description: 'Senior fintech consultant helping residents understand digital banking, cryptocurrency, and financial planning.',
        services: ['Financial Planning', 'Crypto Education', 'Digital Banking', 'Investment Advice'],
        rating: 4.7,
        reviewCount: 15,
        isPremium: false,
        avatar: 'RS'
      }
    ];
    setListings(mockListings);
    setFilteredListings(mockListings);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = listings;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'residents') {
        filtered = filtered.filter(listing => listing.type === 'resident');
      } else if (activeFilter === 'businesses') {
        filtered = filtered.filter(listing => listing.type === 'business');
      } else if (activeFilter === 'creatives') {
        filtered = filtered.filter(listing => 
          listing.services.some(service => 
            ['DJ', 'Music', 'Art', 'Creative', 'Design'].some(creative => 
              service.toLowerCase().includes(creative.toLowerCase())
            )
          )
        );
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'highest-rated':
          return b.rating - a.rating;
        case 'most-reviews':
          return b.reviewCount - a.reviewCount;
        case 'closest':
          // Mock distance sorting
          return 0;
        default: // newest
          return 0;
      }
    });

    setFilteredListings(filtered);
  }, [listings, searchTerm, activeFilter, selectedCategories, sortBy]);

  const handleContactListing = (listingId: string) => {
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
      console.log('Contacting:', listing.name);
      // Would open contact modal or redirect
      alert(`Contact feature would open for: ${listing.name}`);
    }
  };

  return (
    <div className="community-directory">
      <header className="directory-header">
        <div className="container">
          <h1>Community Directory</h1>
          <p>Connect with residents, local businesses, and creative services in Wembley</p>
        </div>
      </header>

      <div className="advertise-banner">
        <div className="advertise-content">
          <div className="advertise-text">
            <h3>Got a business, startup, or creative service?</h3>
            <p>Reach 1,300+ engaged residents for less than a shop window ad</p>
          </div>
          <button 
            className="advertise-btn"
            onClick={() => setShowAdvertiseModal(true)}
          >
            Advertise Here - From £8/week
          </button>
        </div>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </aside>

        <main className="directory-container">
          <div className="results-header">
            <div className="results-count">Showing {filteredListings.length} listings</div>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="closest">Closest to You</option>
              <option value="most-reviews">Most Reviews</option>
            </select>
          </div>

          <div className="listings-grid">
            {filteredListings.map((listing) => (
              listing.type === 'business' ? (
                <BusinessCard
                  key={listing.id}
                  listing={listing}
                  onContact={() => handleContactListing(listing.id)}
                />
              ) : (
                <ResidentProfile
                  key={listing.id}
                  listing={listing}
                  onContact={() => handleContactListing(listing.id)}
                />
              )
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="no-results">
              <h3>No listings found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </main>
      </div>

      {showAdvertiseModal && (
        <BusinessListingModal
          onClose={() => setShowAdvertiseModal(false)}
          onSubmit={(formData) => {
            console.log('Business listing submitted:', formData);
            setShowAdvertiseModal(false);
            alert('Thank you! Your listing will go live within 24 hours.');
          }}
        />
      )}
    </div>
  );
};

export default CommunityDirectory;