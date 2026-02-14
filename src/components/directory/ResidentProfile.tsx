// src/components/directory/ResidentProfile.tsx
import React from 'react';

interface ResidentProfileProps {
  listing: {
    id: string;
    name: string;
    title: string;
    location: string;
    description: string;
    services: string[];
    rating: number;
    reviewCount: number;
    avatar: string;
  };
  onContact: () => void;
}

const ResidentProfile: React.FC<ResidentProfileProps> = ({ listing, onContact }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <span className="stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </span>
    );
  };

  return (
    <article className="listing-card resident-card">
      <div className="listing-header">
        <div className="listing-avatar">{listing.avatar}</div>
        <div className="listing-info">
          <h3 className="listing-name">{listing.name}</h3>
          <p className="listing-type">{listing.title}</p>
          <p className="listing-location">{listing.location}</p>
        </div>
      </div>
      <div className="listing-content">
        <p className="listing-description">{listing.description}</p>
        <div className="listing-services">
          {listing.services.map((service, index) => (
            <span key={index} className="service-tag">{service}</span>
          ))}
        </div>
        <div className="listing-contact">
          <button className="contact-btn" onClick={onContact}>
            Connect with {listing.name.split(' ')[0]}
          </button>
          <div className="rating-display">
            {renderStars(listing.rating)}
            <span>{listing.rating} ({listing.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResidentProfile;