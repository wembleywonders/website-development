import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StoragePage.css';

// ─────────────────────────────────────────────────────────────────────────────
// StoragePage — Wembley Wonders CIC
// Route: /storage
//
// Community creator storage — tiered pricing, community fund framing.
// The most grounded entry point into the WW economic system.
// ─────────────────────────────────────────────────────────────────────────────

const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 25,
    icon: '📦',
    description: 'Boxes, samples, small stock, art supplies, portfolios.',
    features: ['Up to 5 standard storage boxes', 'Shared shelving space', 'Monthly access (by appointment)', 'Inventory log via shared doc'],
    cta: 'Get started',
    highlight: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 60,
    icon: '🗄️',
    description: 'Medium storage — shelves, equipment, product lines, merch.',
    features: ['Up to 15 boxes or equivalent', 'Dedicated shelf section', 'Fortnightly access (by appointment)', 'Inventory log + digital photos', 'One member workshop session/month'],
    cta: 'Get started',
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 120,
    icon: '🏗️',
    description: 'Serious operators — large stock, equipment, packing materials.',
    features: ['Large dedicated storage area', 'Weekly access (flexible hours)', 'Full inventory management', 'Priority handling', 'All workshop sessions included', 'Opportunity to join storage ops crew'],
    cta: 'Talk to us',
    highlight: false,
  },
];

const addOns = [
  { label: 'Collection / delivery run', price: '£5–£15', desc: 'We collect or deliver within Wembley / Brent' },
  { label: 'Packing service',           price: '£10',    desc: 'We pack and label your items on arrival' },
  { label: 'Photography',               price: '£8',     desc: 'Product shots of stored items for online selling' },
];

const StoragePage: React.FC = () => {
  const [enquiryTier, setEnquiryTier] = useState<string | null>(null);

  return (
    <div className="storage-page">

      <nav className="storage-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>›</span>
        <Link to="/get-involved">Get Involved</Link><span>›</span>
        <span aria-current="page">Storage & Services</span>
      </nav>

      <header className="storage-hero">
        <div className="storage-hero-inner">
          <p className="storage-overline">Community Infrastructure</p>
          <h1 className="storage-headline">
            Storage for creators.<br />Built into a community.
          </h1>
          <p className="storage-strapline">
            Not a self-storage unit. Shared space run by and for Wembley creators —
            with real people behind it, a community fund built into every subscription,
            and membership that opens doors beyond the storage room.
          </p>
          <div className="storage-trust-row">
            <span>📍 Wembley, HA9</span>
            <span>·</span>
            <span>25% of your subscription funds the community</span>
            <span>·</span>
            <span>Members get workshop access</span>
          </div>
        </div>
      </header>

      <section className="storage-tiers-section">
        <div className="storage-tiers">
          {tiers.map(t => (
            <div key={t.id} className={`storage-tier ${t.highlight ? 'tier--highlight' : ''}`}>
              {t.highlight && <div className="tier-badge">Most popular</div>}
              <div className="tier-inner">
                <div className="tier-header">
                  <span className="tier-icon">{t.icon}</span>
                  <div>
                    <h2 className="tier-name">{t.name}</h2>
                    <div className="tier-price">
                      <span className="tier-amount">£{t.price}</span>
                      <span className="tier-period">/ month</span>
                    </div>
                  </div>
                </div>
                <p className="tier-desc">{t.description}</p>
                <ul className="tier-features">
                  {t.features.map((f, i) => (
                    <li key={i}><span className="tier-check">✓</span>{f}</li>
                  ))}
                </ul>
                <div className="tier-community-note">
                  <span className="community-note-icon">🏛️</span>
                  <span>£{Math.round(t.price * 0.25)}/month goes to the community fund</span>
                </div>
                <button
                  className={`tier-cta ${t.highlight ? 'tier-cta--highlight' : ''}`}
                  onClick={() => setEnquiryTier(t.id)}
                >
                  {t.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {enquiryTier && (
        <section className="storage-enquiry">
          <div className="enquiry-inner">
            <h2 className="enquiry-title">
              Register your interest — {tiers.find(t => t.id === enquiryTier)?.name}
            </h2>
            <p className="enquiry-note">
              We'll confirm availability and arrange a quick call or message to sort the details.
            </p>
            <div className="enquiry-actions">
              <a
                href={`https://wa.me/447932198468?text=Hi%20Judith%2C%20I%27m%20interested%20in%20the%20${tiers.find(t => t.id === enquiryTier)?.name}%20storage%20at%20Wembley%20Wonders`}
                target="_blank"
                rel="noopener noreferrer"
                className="enquiry-whatsapp"
              >💬 WhatsApp Judith</a>
              <a href="mailto:storage@wembleywonders.com?subject=Storage enquiry" className="enquiry-email">
                ✉ Email us
              </a>
              <button className="enquiry-close" onClick={() => setEnquiryTier(null)}>Cancel</button>
            </div>
          </div>
        </section>
      )}

      <section className="storage-addons-section">
        <div className="storage-addons-inner">
          <h2 className="addons-title">Add-on services</h2>
          <div className="addons-grid">
            {addOns.map((a, i) => (
              <div key={i} className="addon-card">
                <div className="addon-row">
                  <strong className="addon-label">{a.label}</strong>
                  <span className="addon-price">{a.price}</span>
                </div>
                <p className="addon-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="storage-wider-section">
        <div className="storage-wider-inner">
          <h2 className="wider-title">Storage is the start, not the sum.</h2>
          <p className="wider-body">
            Every storage member is a Wembley Wonders member. That means access
            to workshops, a voice in how the community fund is spent, and a pathway
            into the crew roles that run the platform. Some of our storage members
            have become Operators, Stewards, and Programme Directors. The room
            is a door.
          </p>
          <div className="wider-links">
            <Link to="/get-involved" className="wider-link wider-link--primary">See what membership means →</Link>
            <Link to="/community/dashboard" className="wider-link wider-link--secondary">Community Dashboard →</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StoragePage;