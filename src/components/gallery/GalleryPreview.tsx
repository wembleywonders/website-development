// src/components/gallery/GalleryPreview.tsx
// Gallery preview component for showcasing creator work

import React, { useState } from 'react';
import type { MediaItem } from '../../types/gallery.types';
import './GalleryPreview.css';

export interface GalleryPreviewProps {
  items: MediaItem[];
  title?: string;
  maxItems?: number;
  onItemClick?: (item: MediaItem) => void;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({
  items,
  title = 'Gallery',
  maxItems = 6,
  onItemClick,
  showViewAll = true,
  viewAllLink = '/gallery'
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  const displayItems = items.slice(0, maxItems);
  const remainingCount = items.length - maxItems;

  const handleItemClick = (item: MediaItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      setSelectedItem(item);
    }
  };

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
    <section className="gallery-preview">
      <header className="gallery-preview__header">
        <h3>{title}</h3>
        {showViewAll && items.length > maxItems && (
          <a href={viewAllLink} className="view-all-link">
            View all ({items.length}) →
          </a>
        )}
      </header>

      {displayItems.length === 0 ? (
        <div className="gallery-preview__empty">
          <span className="empty-icon">🖼️</span>
          <p>No items to display yet</p>
        </div>
      ) : (
        <div className="gallery-preview__grid">
          {displayItems.map((item) => (
            <article
              key={item.id}
              className={`gallery-item gallery-item--${item.type}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="gallery-item__thumbnail">
                {item.thumbnailUrl ? (
                  <img src={item.thumbnailUrl} alt={item.title} />
                ) : (
                  <span className="type-icon">{getMediaTypeIcon(item.type)}</span>
                )}
                <span className="type-badge">{getMediaTypeIcon(item.type)}</span>
              </div>
              <div className="gallery-item__info">
                <h4>{item.title}</h4>
                {item.creator && <span className="creator">by {item.creator}</span>}
              </div>
            </article>
          ))}
          
          {remainingCount > 0 && (
            <a href={viewAllLink} className="gallery-item gallery-item--more">
              <span className="more-count">+{remainingCount}</span>
              <span className="more-label">more items</span>
            </a>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="gallery-lightbox" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedItem(null)}>×</button>
            
            {selectedItem.type === 'image' && selectedItem.url && (
              <img src={selectedItem.url} alt={selectedItem.title} />
            )}
            
            {selectedItem.type === 'video' && selectedItem.url && (
              <video controls src={selectedItem.url} />
            )}
            
            {selectedItem.type === 'audio' && selectedItem.url && (
              <audio controls src={selectedItem.url} />
            )}
            
            <div className="lightbox-info">
              <h3>{selectedItem.title}</h3>
              {selectedItem.description && <p>{selectedItem.description}</p>}
              {selectedItem.creator && <span className="creator">by {selectedItem.creator}</span>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryPreview;
