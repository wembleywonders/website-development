// src/pages/gallery/index.tsx
// Gallery page - converted from Next.js to plain React

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import type { MediaItem } from '../../types/gallery.types';
import './GalleryPage.css';

// If you have an auth context, import it:
// import { useAuth } from '../../contexts/AuthContext';

interface GalleryFilter {
  type: 'all' | 'image' | 'video' | 'audio' | 'document';
  programme: string;
  sortBy: 'newest' | 'oldest' | 'title';
}

const GalleryPage: React.FC = () => {
  // Replace useSession with your auth context if needed
  // const { user, isAuthenticated } = useAuth();
  const isAuthenticated = false; // Placeholder - replace with your auth
  
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>({
    type: 'all',
    programme: 'all',
    sortBy: 'newest'
  });
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Fetch gallery items on mount
  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In real implementation, fetch from API
      // const response = await fetch('/api/gallery');
      // const data = await response.json();
      // setItems(data);
      
      // Mock data for now
      setItems(SAMPLE_GALLERY_ITEMS);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Gallery load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort items
  const filteredItems = items
    .filter(item => filter.type === 'all' || item.type === filter.type)
    .filter(item => filter.programme === 'all' || item.programme === filter.programme)
    .sort((a, b) => {
      switch (filter.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Get unique programmes for filter
  const programmes = ['all', ...new Set(items.map(item => item.programme).filter(Boolean))];

  const getMediaTypeIcon = (type: MediaItem['type']): string => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎬';
      case 'audio': return '🎵';
      case 'document': return '📄';
      default: return '📁';
    }
  };

  return (
    <PageTemplate
      title="Creator Gallery"
      subtitle="Showcasing work from our community"
      icon="🖼️"
    >
      <div className="gallery-page">
        {/* Filter Bar */}
        <div className="gallery-filters">
          <div className="filter-group">
            <label>Type</label>
            <select 
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value as GalleryFilter['type'] })}
            >
              <option value="all">All Types</option>
              <option value="image">🖼️ Images</option>
              <option value="video">🎬 Videos</option>
              <option value="audio">🎵 Audio</option>
              <option value="document">📄 Documents</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Programme</label>
            <select
              value={filter.programme}
              onChange={(e) => setFilter({ ...filter, programme: e.target.value })}
            >
              {programmes.map(prog => (
                <option key={prog} value={prog}>
                  {prog === 'all' ? 'All Programmes' : prog}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as GalleryFilter['sortBy'] })}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>

          {isAuthenticated && (
            <Link to="/programmes" className="upload-button">
              ➕ Upload Work
            </Link>
          )}
        </div>

        {/* Results Count */}
        <div className="gallery-results-info">
          Showing {filteredItems.length} of {items.length} items
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="gallery-loading">
            <p>Loading gallery...</p>
          </div>
        ) : error ? (
          <div className="gallery-error">
            <p>{error}</p>
            <button onClick={loadGalleryItems}>Try Again</button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="gallery-empty">
            <span className="empty-icon">🖼️</span>
            <h3>No items found</h3>
            <p>Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map(item => (
              <article 
                key={item.id} 
                className={`gallery-card gallery-card--${item.type}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="gallery-card__thumbnail">
                  {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={item.title} loading="lazy" />
                  ) : (
                    <span className="type-placeholder">{getMediaTypeIcon(item.type)}</span>
                  )}
                  <span className="type-badge">{getMediaTypeIcon(item.type)}</span>
                </div>
                <div className="gallery-card__content">
                  <h3>{item.title}</h3>
                  {item.creator && <p className="creator">by {item.creator}</p>}
                  {item.programme && <span className="programme-tag">{item.programme}</span>}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="gallery-lightbox" onClick={() => setSelectedItem(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setSelectedItem(null)}>×</button>
              
              <div className="lightbox-media">
                {selectedItem.type === 'image' && selectedItem.url && (
                  <img src={selectedItem.url} alt={selectedItem.title} />
                )}
                {selectedItem.type === 'video' && selectedItem.url && (
                  <video controls src={selectedItem.url} />
                )}
                {selectedItem.type === 'audio' && selectedItem.url && (
                  <div className="audio-player">
                    <span className="audio-icon">🎵</span>
                    <audio controls src={selectedItem.url} />
                  </div>
                )}
                {selectedItem.type === 'document' && (
                  <div className="document-preview">
                    <span className="doc-icon">📄</span>
                    <p>Document preview not available</p>
                    {selectedItem.url && (
                      <a href={selectedItem.url} target="_blank" rel="noopener noreferrer">
                        Open Document →
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              <div className="lightbox-info">
                <h2>{selectedItem.title}</h2>
                {selectedItem.description && <p>{selectedItem.description}</p>}
                <div className="lightbox-meta">
                  {selectedItem.creator && <span>👤 {selectedItem.creator}</span>}
                  {selectedItem.programme && <span>📚 {selectedItem.programme}</span>}
                  <span>📅 {new Date(selectedItem.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="lightbox-tags">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

// Sample data - replace with API call
const SAMPLE_GALLERY_ITEMS: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'Speaker Box Restoration',
    description: 'Before and after of Uncle Winston\'s vintage speaker repair',
    thumbnailUrl: '/images/gallery/speaker-thumb.jpg',
    url: '/images/gallery/speaker-full.jpg',
    creator: 'Marcus J.',
    programme: 'Scrap Cat',
    tags: ['repair', 'audio', 'vintage'],
    createdAt: new Date('2025-01-10'),
    isPublic: true
  },
  {
    id: '2',
    type: 'video',
    title: 'My First Podcast Episode',
    description: 'Learning the ropes of audio production',
    thumbnailUrl: '/images/gallery/podcast-thumb.jpg',
    url: '/videos/gallery/podcast-ep1.mp4',
    creator: 'Aisha K.',
    programme: 'G-Tech Casters',
    tags: ['podcast', 'audio', 'first-project'],
    createdAt: new Date('2025-01-08'),
    isPublic: true
  },
  {
    id: '3',
    type: 'audio',
    title: 'Community Interview: Local Baker',
    description: 'Oral history recording from Wembley Market',
    url: '/audio/gallery/baker-interview.mp3',
    creator: 'Devon T.',
    programme: 'Pageturners',
    tags: ['interview', 'oral-history', 'community'],
    createdAt: new Date('2025-01-05'),
    isPublic: true
  },
  {
    id: '4',
    type: 'image',
    title: 'Circuit Board Art',
    description: 'Decorative piece made from recycled electronics',
    thumbnailUrl: '/images/gallery/circuit-art-thumb.jpg',
    url: '/images/gallery/circuit-art-full.jpg',
    creator: 'Priya M.',
    programme: 'STEMgineers',
    tags: ['art', 'recycling', 'electronics'],
    createdAt: new Date('2025-01-03'),
    isPublic: true
  }
];

export default GalleryPage;
