/**
 * PRODUCT CARD COMPONENT
 * 
 * Displays a product listing with pricing, creator info,
 * and revenue transparency.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React from 'react';
import type { Product } from '../types';
import { PROGRAMME_INFO } from '../data/skillCombinations';
import './ProductCard.css';

export interface ProductCardProps {
  product: Product;
  creatorName?: string;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  onFavourite?: (product: Product) => void;
  isFavourited?: boolean;
  showRevenueSplit?: boolean;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  creatorName,
  onAddToCart,
  onViewDetails,
  onFavourite,
  isFavourited = false,
  showRevenueSplit = true,
  compact = false
}) => {
  const programmeInfo = PROGRAMME_INFO[product.programmeId];
  const hasDiscount = product.pricing.salePrice && product.pricing.salePrice < product.pricing.basePrice;
  const displayPrice = hasDiscount ? product.pricing.salePrice! : product.pricing.basePrice;
  const creatorEarnings = displayPrice * product.pricing.creatorShare;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };
  
  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavourite?.(product);
  };
  
  const handleClick = () => {
    onViewDetails?.(product);
  };

  return (
    <article 
      className={`product-card ${compact ? 'product-card--compact' : ''} ${product.status !== 'active' ? 'product-card--inactive' : ''}`}
    >
      {/* Make the whole card clickable except for interactive controls */}
      <div
        className="product-card__clickable-area"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        style={{ outline: 'none' }}
      >
        {/* Image */}
        <div className="product-card__image-container">
          <img 
            src={product.thumbnail || '/images/placeholder-product.jpg'} 
            alt={product.title}
            className="product-card__image"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="product-card__badges">
            {product.type === 'digital' && (
              <span className="product-card__badge product-card__badge--digital">
                ⚡ Instant
              </span>
            )}
            {hasDiscount && (
              <span className="product-card__badge product-card__badge--sale">
                Sale
              </span>
            )}
            {product.status === 'sold-out' && (
              <span className="product-card__badge product-card__badge--sold-out">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Favourite button - moved outside the clickable area */}
      {onFavourite && (
        <button 
          className={`product-card__favourite ${isFavourited ? 'product-card__favourite--active' : ''}`}
          onClick={handleFavourite}
          aria-label={isFavourited ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavourited ? '❤️' : '🤍'}
        </button>
      )}
      
      {/* Content */}
      <div className="product-card__content">
        {/* Programme tag */}
        <div className="product-card__programme">
          <span 
            className="product-card__programme-tag"
            style={{ backgroundColor: programmeInfo?.color || '#6B7280' }}
          >
            {programmeInfo?.icon} {programmeInfo?.shortName || 'Programme'}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="product-card__title">{product.title}</h3>
        
        {/* Creator */}
        {creatorName && (
          <p className="product-card__creator">by {creatorName}</p>
        )}
        
        {/* Short description */}
        {!compact && (
          <p className="product-card__description">{product.shortDescription}</p>
        )}
        
        {/* Stats */}
        <div className="product-card__stats">
          <span className="product-card__stat">
            ⭐ {product.averageRating.toFixed(1)}
          </span>
          <span className="product-card__stat">
            {product.sales} sold
          </span>
        </div>
        
        {/* Pricing */}
        <div className="product-card__pricing">
          <div className="product-card__price-row">
            <span className="product-card__price">
              £{displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="product-card__original-price">
                £{product.pricing.basePrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Revenue transparency */}
          {showRevenueSplit && !compact && (
            <div className="product-card__revenue-split">
              <span className="product-card__creator-share">
                Creator gets £{creatorEarnings.toFixed(2)} ({Math.round(product.pricing.creatorShare * 100)}%)
              </span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        {onAddToCart && product.status === 'active' && product.inStock && (
          <button 
            className="product-card__add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;