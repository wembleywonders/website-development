/**
 * CREATOR DASHBOARD COMPONENT
 * 
 * Central hub for creators to manage listings, view analytics,
 * track earnings, and monitor their marketplace presence.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';
import type { 
  ProgrammeId, 
  Product, 
  Service, 
  CreatorProfile,
  CreatorAnalytics 
} from '../types';

// Define a type for top performers if not already present
type TopPerformer = {
  id: string;
  title: string;
  sales: number;
  revenue: number;
};
import { PROGRAMME_INFO } from '../data/skillCombinations';
import './CreatorDashboard.css';

export interface CreatorDashboardProps {
  creator: CreatorProfile;
  products: Product[];
  services: Service[];
  analytics: CreatorAnalytics;
  onCreateListing?: () => void;
  onEditListing?: (id: string, type: 'product' | 'service') => void;
  onViewAnalytics?: () => void;
  onWithdraw?: () => void;
}

type DashboardTab = 'overview' | 'products' | 'services' | 'earnings' | 'analytics';

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  creator,
  products,
  services,
  analytics,
  onCreateListing,
  onEditListing,
  onViewAnalytics,
  onWithdraw
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  
  // Calculate totals
  const totalListings = products.length + services.length;
  const activeListings = products.filter(p => p.status === 'active').length + 
                         services.filter(s => s.status === 'active').length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0) +
                     services.reduce((sum, s) => sum + s.completedProjects, 0);
  
  // Recent activity (mock - would come from API)
  const recentOrders = [
    { id: '1', title: 'Beat Pack Vol.1', buyer: 'Marcus T.', amount: 15.99, date: '2 hours ago' },
    { id: '2', title: 'Logo Design Service', buyer: 'Sarah K.', amount: 75.00, date: '1 day ago' },
    { id: '3', title: 'Social Media Template', buyer: 'James W.', amount: 8.99, date: '2 days ago' },
  ];

  const renderOverview = () => (
    <div className="creator-dash__overview">
      {/* Stats Grid */}
      <div className="creator-dash__stats-grid">
        <div className="creator-dash__stat-card">
          <span className="creator-dash__stat-icon">📦</span>
          <div className="creator-dash__stat-content">
            <span className="creator-dash__stat-value">{totalListings}</span>
            <span className="creator-dash__stat-label">Total Listings</span>
          </div>
        </div>
        
        <div className="creator-dash__stat-card">
          <span className="creator-dash__stat-icon">✓</span>
          <div className="creator-dash__stat-content">
            <span className="creator-dash__stat-value">{activeListings}</span>
            <span className="creator-dash__stat-label">Active</span>
          </div>
        </div>
        
        <div className="creator-dash__stat-card">
          <span className="creator-dash__stat-icon">🛒</span>
          <div className="creator-dash__stat-content">
            <span className="creator-dash__stat-value">{totalSales}</span>
            <span className="creator-dash__stat-label">Total Sales</span>
          </div>
        </div>
        
        <div className="creator-dash__stat-card creator-dash__stat-card--highlight">
          <span className="creator-dash__stat-icon">💰</span>
          <div className="creator-dash__stat-content">
            <span className="creator-dash__stat-value">
              £{analytics.earnings.total.toFixed(2)}
            </span>
            <span className="creator-dash__stat-label">Total Earned</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="creator-dash__quick-actions">
        <h3>Quick Actions</h3>
        <div className="creator-dash__action-buttons">
          {onCreateListing && (
            <button 
              className="creator-dash__action-btn creator-dash__action-btn--primary"
              onClick={onCreateListing}
            >
              + Create New Listing
            </button>
          )}
          {onWithdraw && analytics.earnings.available > 0 && (
            <button 
              className="creator-dash__action-btn creator-dash__action-btn--secondary"
              onClick={onWithdraw}
            >
              Withdraw £{analytics.earnings.available.toFixed(2)}
            </button>
          )}
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="creator-dash__recent">
        <h3>Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="creator-dash__empty">No orders yet. Create a listing to start selling!</p>
        ) : (
          <div className="creator-dash__order-list">
            {recentOrders.map(order => (
              <div key={order.id} className="creator-dash__order-item">
                <div className="creator-dash__order-info">
                  <span className="creator-dash__order-title">{order.title}</span>
                  <span className="creator-dash__order-buyer">{order.buyer}</span>
                </div>
                <div className="creator-dash__order-meta">
                  <span className="creator-dash__order-amount">£{order.amount.toFixed(2)}</span>
                  <span className="creator-dash__order-date">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Programmes */}
      <div className="creator-dash__programmes">
        <h3>Your Programmes</h3>
        <div className="creator-dash__programme-list">
          {creator.completedProgrammes.map(prog => {
            const info = PROGRAMME_INFO[prog.programmeId];
            return (
              <div key={prog.programmeId} className="creator-dash__programme-item">
                <span 
                  className="creator-dash__programme-badge"
                  style={{ backgroundColor: info?.color }}
                >
                  {info?.icon}
                </span>
                <div className="creator-dash__programme-info">
                  <span className="creator-dash__programme-name">{info?.name}</span>
                  <span className="creator-dash__programme-date">
                    Completed {new Date(prog.completedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="creator-dash__listings">
      <div className="creator-dash__listings-header">
        <h3>Your Products ({products.length})</h3>
        {onCreateListing && (
          <button 
            className="creator-dash__add-btn"
            onClick={onCreateListing}
          >
            + Add Product
          </button>
        )}
      </div>
      
      {products.length === 0 ? (
        <div className="creator-dash__empty-state">
          <span className="creator-dash__empty-icon">📦</span>
          <h4>No products yet</h4>
          <p>Create your first product to start earning</p>
          {onCreateListing && (
            <button onClick={onCreateListing}>Create Product</button>
          )}
        </div>
      ) : (
        <div className="creator-dash__listing-grid">
          {products.map(product => {
            const progInfo = PROGRAMME_INFO[product.programmeId];
            return (
              <div key={product.id} className="creator-dash__listing-card">
                <div className="creator-dash__listing-image">
                  <img src={product.thumbnail || '/images/placeholder.jpg'} alt={product.title} />
                  <span 
                    className={`creator-dash__listing-status creator-dash__listing-status--${product.status}`}
                  >
                    {product.status}
                  </span>
                </div>
                <div className="creator-dash__listing-content">
                  <div 
                    className="creator-dash__listing-programme"
                    style={{ backgroundColor: progInfo?.color }}
                  >
                    {progInfo?.icon}
                  </div>
                  <h4 className="creator-dash__listing-title">{product.title}</h4>
                  <div className="creator-dash__listing-stats">
                    <span>£{product.pricing.basePrice.toFixed(2)}</span>
                    <span>⭐ {product.averageRating.toFixed(1)}</span>
                    <span>{product.sales} sold</span>
                  </div>
                  {onEditListing && (
                    <button 
                      className="creator-dash__edit-btn"
                      onClick={() => onEditListing(product.id, 'product')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderServices = () => (
    <div className="creator-dash__listings">
      <div className="creator-dash__listings-header">
        <h3>Your Services ({services.length})</h3>
        {onCreateListing && (
          <button 
            className="creator-dash__add-btn"
            onClick={onCreateListing}
          >
            + Add Service
          </button>
        )}
      </div>
      
      {services.length === 0 ? (
        <div className="creator-dash__empty-state">
          <span className="creator-dash__empty-icon">🛠️</span>
          <h4>No services yet</h4>
          <p>Offer your skills as services to earn more</p>
          {onCreateListing && (
            <button onClick={onCreateListing}>Create Service</button>
          )}
        </div>
      ) : (
        <div className="creator-dash__listing-grid">
          {services.map(service => {
            const progInfo = PROGRAMME_INFO[service.programmeId];
            return (
              <div key={service.id} className="creator-dash__listing-card">
                <div className="creator-dash__listing-image">
                  <img src={service.thumbnail || '/images/placeholder.jpg'} alt={service.title} />
                  <span 
                    className={`creator-dash__listing-status creator-dash__listing-status--${service.status}`}
                  >
                    {service.status}
                  </span>
                </div>
                <div className="creator-dash__listing-content">
                  <div 
                    className="creator-dash__listing-programme"
                    style={{ backgroundColor: progInfo?.color }}
                  >
                    {progInfo?.icon}
                  </div>
                  <h4 className="creator-dash__listing-title">{service.title}</h4>
                  <div className="creator-dash__listing-stats">
                    <span>
                      {service.pricingModel === 'hourly' 
                        ? `£${service.pricing.hourlyRate}/hr`
                        : `From £${service.pricing.startingPrice}`
                      }
                    </span>
                    <span>⭐ {service.averageRating.toFixed(1)}</span>
                    <span>{service.completedProjects} done</span>
                  </div>
                  {onEditListing && (
                    <button 
                      className="creator-dash__edit-btn"
                      onClick={() => onEditListing(service.id, 'service')}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderEarnings = () => (
    <div className="creator-dash__earnings">
      {/* Earnings Summary */}
      <div className="creator-dash__earnings-summary">
        <div className="creator-dash__earnings-card creator-dash__earnings-card--available">
          <h4>Available to Withdraw</h4>
          <span className="creator-dash__earnings-amount">
            £{analytics.earnings.available.toFixed(2)}
          </span>
          {onWithdraw && analytics.earnings.available > 0 && (
            <button onClick={onWithdraw}>Withdraw Now</button>
          )}
        </div>
        
        <div className="creator-dash__earnings-card">
          <h4>Pending</h4>
          <span className="creator-dash__earnings-amount">
            £{analytics.earnings.pending.toFixed(2)}
          </span>
          <span className="creator-dash__earnings-note">Processing</span>
        </div>
        
        <div className="creator-dash__earnings-card">
          <h4>This Month</h4>
          <span className="creator-dash__earnings-amount">
            £{analytics.earnings.thisMonth.toFixed(2)}
          </span>
        </div>
        
        <div className="creator-dash__earnings-card">
          <h4>All Time</h4>
          <span className="creator-dash__earnings-amount">
            £{analytics.earnings.total.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* Revenue Split Explanation */}
      <div className="creator-dash__split-info">
        <h3>💚 How Your Earnings Work</h3>
        <p>Every sale supports you, the community, and the platform:</p>
        <div className="creator-dash__split-bars">
          <div className="creator-dash__split-bar">
            <div className="creator-dash__split-fill creator-dash__split-fill--creator" style={{ width: '55%' }} />
            <span>Products: You get 55%</span>
          </div>
          <div className="creator-dash__split-bar">
            <div className="creator-dash__split-fill creator-dash__split-fill--creator" style={{ width: '60%' }} />
            <span>Services: You get 60%</span>
          </div>
        </div>
        <p className="creator-dash__split-note">
          The community fund (20-25%) supports free workshops for local young people.
        </p>
      </div>
      
      {/* Transaction History */}
      <div className="creator-dash__transactions">
        <h3>Recent Transactions</h3>
        <div className="creator-dash__transaction-list">
          <div className="creator-dash__transaction">
            <div className="creator-dash__transaction-info">
              <span className="creator-dash__transaction-type">Sale</span>
              <span className="creator-dash__transaction-title">Beat Pack Vol.1</span>
            </div>
            <span className="creator-dash__transaction-amount creator-dash__transaction-amount--positive">
              +£8.79
            </span>
          </div>
          <div className="creator-dash__transaction">
            <div className="creator-dash__transaction-info">
              <span className="creator-dash__transaction-type">Sale</span>
              <span className="creator-dash__transaction-title">Logo Design</span>
            </div>
            <span className="creator-dash__transaction-amount creator-dash__transaction-amount--positive">
              +£45.00
            </span>
          </div>
          <div className="creator-dash__transaction">
            <div className="creator-dash__transaction-info">
              <span className="creator-dash__transaction-type">Withdrawal</span>
              <span className="creator-dash__transaction-title">Bank Transfer</span>
            </div>
            <span className="creator-dash__transaction-amount creator-dash__transaction-amount--negative">
              -£120.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="creator-dash__analytics">
      <div className="creator-dash__analytics-header">
        <h3>Performance Analytics</h3>
        {onViewAnalytics && (
          <button onClick={onViewAnalytics}>View Full Report</button>
        )}
      </div>
      
      {/* Key Metrics */}
      <div className="creator-dash__metrics-grid">
        <div className="creator-dash__metric">
          <span className="creator-dash__metric-value">{analytics.reviews.total}</span>
          <span className="creator-dash__metric-label">Total Reviews</span>
          <span className="creator-dash__metric-change creator-dash__metric-change--up">
            ⭐ {analytics.reviews.averageRating.toFixed(1)} average
          </span>
        </div>
        
        {/* Conversion Rate metric removed or replaced as 'views' does not exist */}
        
        <div className="creator-dash__metric">
          <span className="creator-dash__metric-value">{analytics.reviews.total}</span>
          <span className="creator-dash__metric-label">Reviews</span>
          <span className="creator-dash__metric-change">
            ⭐ {analytics.reviews.averageRating.toFixed(1)} average
          </span>
        </div>
        
        <div className="creator-dash__metric">
          <span className="creator-dash__metric-value">{analytics.repeatCustomers}</span>
          <span className="creator-dash__metric-label">Repeat Customers</span>
        </div>
      </div>
      
      {/* Top Performers */}
      <div className="creator-dash__top-performers">
        <h4>Top Performing Listings</h4>
        <div className="creator-dash__performer-list">
          {(analytics.topPerformers as TopPerformer[] ?? []).map((performer, index) => (
            <div key={performer.id} className="creator-dash__performer">
              <span className="creator-dash__performer-rank">#{index + 1}</span>
              <span className="creator-dash__performer-title">{performer.title}</span>
              <span className="creator-dash__performer-sales">{performer.sales} sales</span>
              <span className="creator-dash__performer-revenue">
                £{performer.revenue.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="creator-dash">
      {/* Header */}
      <div className="creator-dash__header">
        <div className="creator-dash__profile">
          <img 
            src={creator.avatar || '/images/default-avatar.jpg'} 
            alt={creator.displayName}
            className="creator-dash__avatar"
          />
          <div className="creator-dash__profile-info">
            <h1 className="creator-dash__name">
              {creator.displayName}
              {creator.verified && <span className="creator-dash__verified">✓</span>}
            </h1>
            <p className="creator-dash__tagline">{creator.tagline}</p>
          </div>
        </div>
        
        <div className="creator-dash__header-stats">
          <div className="creator-dash__header-stat">
            <span className="creator-dash__header-stat-value">
              ⭐ {creator.ratings.overall.toFixed(1)}
            </span>
            <span className="creator-dash__header-stat-label">
              ({creator.ratings.totalReviews} reviews)
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="creator-dash__tabs">
        <button 
          className={`creator-dash__tab ${activeTab === 'overview' ? 'creator-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`creator-dash__tab ${activeTab === 'products' ? 'creator-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products ({products.length})
        </button>
        <button 
          className={`creator-dash__tab ${activeTab === 'services' ? 'creator-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services ({services.length})
        </button>
        <button 
          className={`creator-dash__tab ${activeTab === 'earnings' ? 'creator-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings
        </button>
        <button 
          className={`creator-dash__tab ${activeTab === 'analytics' ? 'creator-dash__tab--active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>
      
      {/* Content */}
      <div className="creator-dash__content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'earnings' && renderEarnings()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default CreatorDashboard;