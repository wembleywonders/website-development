import { useState, useEffect } from 'react';

// Retail Creator Component: DefaultComponent
import React, { useState, useEffect } from 'react';

const DefaultComponent = () => {
  const [salesData, setSalesData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchCreatorData = () => {
    setIsLoading(true);
    // This would be API calls in a real implementation
    setTimeout(() => {
      setSalesData({
        totalSales: 12850.75,
        monthlyRevenue: 3245.5,
        productsSold: 187,
        averageRating: 4.6,
        topProducts: [
          { name: 'DIY Robot Kit', sales: 42, revenue: 2079.58 },
          { name: 'Arduino Starter Pack', sales: 38, revenue: 1899.62 },
          { name: 'Electronics Basics Guide', sales: 31, revenue: 619.69 },
        ],
      });

      setProducts([
        { id: 1, name: 'DIY Robot Kit', price: 49.99, inventory: 25, status: 'active' },
        { id: 2, name: 'Arduino Starter Pack', price: 39.99, inventory: 18, status: 'active' },
        { id: 3, name: 'Electronics Basics Guide', price: 19.99, inventory: 52, status: 'active' },
        { id: 4, name: 'Raspberry Pi Project Book', price: 24.99, inventory: 0, status: 'out-of-stock' },
      ]);

      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchCreatorData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Sales</h4>
                <p className="stat-value">£{salesData?.totalSales.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h4>Monthly Revenue</h4>
                <p className="stat-value">£{salesData?.monthlyRevenue.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h4>Products Sold</h4>
                <p className="stat-value">{salesData?.productsSold}</p>
              </div>
              <div className="stat-card">
                <h4>Avg. Rating</h4>
                <p className="stat-value">{salesData?.averageRating}/5</p>
              </div>
            </div>

            <div className="top-products">
              <h4>Top Performing Products</h4>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData?.topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>£{product.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="products-tab">
            <div className="product-actions">
              <button className="add-product">Add New Product</button>
              <button className="import-products">Import Products</button>
            </div>

            <table className="products-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>£{product.price.toFixed(2)}</td>
                    <td>{product.inventory}</td>
                    <td>
                      <span className={`status-badge ${product.status}`}>{product.status}</span>
                    </td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'orders':
        return (
          <div className="orders-tab">
            <h4>Recent Orders</h4>
            <p>Order management would be displayed here.</p>
          </div>
        );

      case 'settings':
        return (
          <div className="settings-tab">
            <h4>Store Settings</h4>
            <div className="settings-form">
              <div className="form-group">
                <label>Store Name</label>
                <input type="text" defaultValue="STEMgeneers Shop" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  defaultValue="The official store of the STEMgeneers program, offering STEM kits, electronics, and educational materials."
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Payment Methods</label>
                <div className="checkbox-group">
                  <label>
                    <input type="checkbox" defaultChecked /> Credit/Debit Cards
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked /> PayPal
                  </label>
                  <label>
                    <input type="checkbox" /> Bank Transfer
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Revenue Share</label>
                <select defaultValue="standard">
                  <option value="standard">Standard (80/20)</option>
                  <option value="premium">Premium (70/30)</option>
                  <option value="physical">Physical Products (60/40)</option>
                </select>
              </div>
              <button className="save-settings">Save Settings</button>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="retail-creator-component">
      <h2>DefaultComponent</h2>

      {isLoading ? (
        <div className="loading-indicator">Loading creator dashboard...</div>
      ) : (
        <>
          <div className="creator-tabs">
            <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </button>
            <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
              Products
            </button>
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
              Orders
            </button>
            <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              Settings
            </button>
          </div>

          <div className="tab-content">{renderTabContent()}</div>
        </>
      )}
    </div>
  );
};

export default DefaultComponent;
