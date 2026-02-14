/**
 * SERVICE CARD COMPONENT
 * 
 * Displays a service listing with pricing options,
 * availability, and booking actions.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React from 'react';
import type { Service } from '../types';
import { PROGRAMME_INFO } from '../data/skillCombinations';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: Service;
  creatorName?: string;
  onBook?: (service: Service) => void;
  onViewDetails?: (service: Service) => void;
  onFavourite?: (service: Service) => void;
  isFavourited?: boolean;
  showRevenueSplit?: boolean;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  creatorName,
  onBook,
  onViewDetails,
  onFavourite,
  isFavourited = false,
  showRevenueSplit = true,
  compact = false
}) => {
  const programmeInfo = PROGRAMME_INFO[service.programmeId];
  
  // Get display price
  const getDisplayPrice = (): { price: string; label: string } => {
    if (service.pricingModel === 'hourly' && service.pricing.hourlyRate) {
      return { 
        price: `£${service.pricing.hourlyRate}`, 
        label: '/hour' 
      };
    }
    if (service.pricingModel === 'project' && service.pricing.startingPrice) {
      return { 
        price: `From £${service.pricing.startingPrice}`, 
        label: '' 
      };
    }
    if (service.pricingModel === 'retainer' && service.pricing.retainerOptions?.length) {
      const cheapest = Math.min(...service.pricing.retainerOptions.map(r => r.monthlyPrice));
      return { 
        price: `From £${cheapest}`, 
        label: '/month' 
      };
    }
    if (service.pricing.packages?.length) {
      const cheapest = Math.min(...service.pricing.packages.map(p => p.price));
      return { 
        price: `From £${cheapest}`, 
        label: '' 
      };
    }
    return { price: 'Custom', label: 'pricing' };
  };
  
  const displayPrice = getDisplayPrice();
  
  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBook?.(service);
  };
  
  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavourite?.(service);
  };
  
  const handleClick = () => {
    onViewDetails?.(service);
  };
  
  const getAvailabilityClass = () => {
    switch (service.status) {
      case 'active': return 'service-card__availability--available';
      case 'paused': return 'service-card__availability--paused';
      case 'fully-booked': return 'service-card__availability--booked';
      default: return '';
    }
  };
  
  const getAvailabilityText = () => {
    switch (service.status) {
      case 'active': return '✓ Available';
      case 'paused': return '⏸ Paused';
      case 'fully-booked': return '📅 Fully Booked';
      default: return '';
    }
  };

  return (
    <article 
      className={`service-card ${compact ? 'service-card--compact' : ''} ${service.status !== 'active' ? 'service-card--inactive' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div className="service-card__image-container">
        <img 
          src={service.thumbnail || '/images/placeholder-service.jpg'} 
          alt={service.title}
          className="service-card__image"
          loading="lazy"
        />
        
        {/* Delivery method badge */}
        <div className="service-card__badges">
          <span className={`service-card__badge service-card__badge--${service.deliveryMethod}`}>
            {service.deliveryMethod === 'remote' && '🌐 Remote'}
            {service.deliveryMethod === 'in-person' && '📍 In-Person'}
            {service.deliveryMethod === 'hybrid' && '🔄 Hybrid'}
          </span>
        </div>
        
        {/* Favourite button */}
        {onFavourite && (
          <button 
            className={`service-card__favourite ${isFavourited ? 'service-card__favourite--active' : ''}`}
            onClick={handleFavourite}
            aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
          >
            {isFavourited ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      
      {/* Content */}
      <div
        className="service-card__content"
      >
        {/* Programme tag */}
        <div className="service-card__programme">
          <span 
            className="service-card__programme-tag"
            style={{ backgroundColor: programmeInfo?.color || '#6B7280' }}
          >
            {programmeInfo?.icon} {programmeInfo?.shortName || 'Programme'}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="service-card__title">{service.title}</h3>
        
        {/* Creator */}
        {creatorName && (
          <p className="service-card__creator">by {creatorName}</p>
        )}
        
        {/* Short description */}
        {!compact && (
          <p className="service-card__description">{service.shortDescription}</p>
        )}
        
        {/* Stats */}
        <div className="service-card__stats">
          <span className="service-card__stat">
            ⭐ {service.averageRating.toFixed(1)}
          </span>
          <span className="service-card__stat">
            {service.completedProjects} completed
          </span>
          {service.repeatClientRate > 0 && (
            <span className="service-card__stat">
              🔄 {service.repeatClientRate}% repeat
            </span>
          )}
        </div>
        
        {/* Turnaround */}
        {!compact && (
          <div className="service-card__turnaround">
            ⏱️ {service.turnaroundTime}
          </div>
        )}
        
        {/* Pricing */}
        <div className="service-card__pricing">
          <div className="service-card__price-row">
            <span className="service-card__price">{displayPrice.price}</span>
            <span className="service-card__price-label">{displayPrice.label}</span>
          </div>
          
          {/* Revenue transparency */}
          {showRevenueSplit && !compact && (
            <div className="service-card__revenue-split">
              <span className="service-card__creator-share">
                Creator gets {Math.round(service.pricing.creatorShare * 100)}%
              </span>
            </div>
          )}
        </div>
        
        {/* Availability & Book */}
        <div className="service-card__footer">
          <span className={`service-card__availability ${getAvailabilityClass()}`}>
            {getAvailabilityText()}
          </span>
          
          {onBook && service.status === 'active' && (
            <button 
              className="service-card__book-btn"
              onClick={handleBook}
            >
              {service.bookingType === 'instant' ? 'Book Now' : 'Request'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;