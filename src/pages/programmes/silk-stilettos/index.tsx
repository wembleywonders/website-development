import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import DraggableMaya from '../../../components/maya/DraggableMaya';
import './SilkStilettosPage.css';

/**
 * Silk Stilettos - Applied Textile & Design Skills
 * =================================================
 * 
 * "The dressmaker in your grandmother's community wasn't famous—she was booked."
 * 
 * Enhanced with active sandbox panels for:
 * - Print on Demand setup
 * - Commission pricing
 * - Collection planning
 * - Service cataloguing
 */

// ========================================
// QUICK PRICING CALCULATOR (Inline Tool)
// ========================================

interface PricingCategory {
  name: string;
  services: { name: string; minRate: number; maxRate: number; time: string; notes: string }[];
}

const PRICING_DATA: PricingCategory[] = [
  {
    name: "Alterations & Tailoring",
    services: [
      { name: "Hem (trousers/skirt)", minRate: 10, maxRate: 20, time: "30 mins", notes: "Basic alteration, high volume" },
      { name: "Take in/let out seams", minRate: 15, maxRate: 35, time: "45 mins", notes: "Depends on garment complexity" },
      { name: "Replace zip", minRate: 15, maxRate: 40, time: "30-60 mins", notes: "Invisible zips cost more" },
      { name: "Sleeve shortening", minRate: 20, maxRate: 40, time: "45 mins", notes: "Jacket sleeves more complex" },
      { name: "Full suit alterations", minRate: 50, maxRate: 100, time: "2-3 hours", notes: "Multiple adjustments" },
    ]
  },
  {
    name: "Custom Occasion Wear",
    services: [
      { name: "Custom dress (simple)", minRate: 80, maxRate: 150, time: "8-12 hours", notes: "Your pattern, basic fabric" },
      { name: "Custom dress (complex)", minRate: 150, maxRate: 350, time: "15-25 hours", notes: "Beading, layers, special fabric" },
      { name: "African print outfit", minRate: 60, maxRate: 200, time: "6-15 hours", notes: "Matching set higher end" },
      { name: "Church/occasion hat", minRate: 40, maxRate: 120, time: "4-8 hours", notes: "Depends on embellishment" },
      { name: "Mother of bride/groom", minRate: 200, maxRate: 500, time: "20-30 hours", notes: "High-end, includes fitting" },
    ]
  },
  {
    name: "Wedding & Bridal",
    services: [
      { name: "Bridal alterations", minRate: 100, maxRate: 300, time: "4-8 hours", notes: "Depends on dress complexity" },
      { name: "Bridesmaid dress (made)", minRate: 80, maxRate: 180, time: "10-15 hours", notes: "Per dress, group discounts" },
      { name: "Wedding accessories", minRate: 30, maxRate: 150, time: "3-10 hours", notes: "Veils, headpieces, jewelry" },
      { name: "Custom wedding dress", minRate: 500, maxRate: 2000, time: "40-80 hours", notes: "Full bespoke, multiple fittings" },
      { name: "Groom/groomsmen styling", minRate: 50, maxRate: 150, time: "2-4 hours", notes: "Consultation + alterations" },
    ]
  },
  {
    name: "Carnival & Costume",
    services: [
      { name: "Basic carnival costume", minRate: 100, maxRate: 250, time: "10-20 hours", notes: "Wire, beading, feathers" },
      { name: "Section leader costume", minRate: 300, maxRate: 800, time: "30-50 hours", notes: "Complex, statement piece" },
      { name: "Theatre costume", minRate: 50, maxRate: 200, time: "8-20 hours", notes: "Per costume, production rates" },
      { name: "Costume repair/refresh", minRate: 30, maxRate: 80, time: "2-5 hours", notes: "Reuse previous year's" },
      { name: "Children's costume", minRate: 40, maxRate: 120, time: "5-12 hours", notes: "School plays, carnival" },
    ]
  },
  {
    name: "Print on Demand & Products",
    services: [
      { name: "Design for POD (simple)", minRate: 25, maxRate: 50, time: "2-4 hours", notes: "Text-based, simple graphics" },
      { name: "Design for POD (complex)", minRate: 50, maxRate: 150, time: "4-10 hours", notes: "Illustrations, patterns" },
      { name: "Pattern design (repeat)", minRate: 80, maxRate: 200, time: "6-15 hours", notes: "Seamless, print-ready" },
      { name: "Product photography", minRate: 30, maxRate: 80, time: "2-4 hours", notes: "Per product set, styled" },
      { name: "Cyberstore listing setup", minRate: 20, maxRate: 40, time: "1-2 hours", notes: "Per product, descriptions" },
    ]
  },
  {
    name: "Retrofitting & Upcycling",
    services: [
      { name: "Basic customization", minRate: 20, maxRate: 50, time: "1-3 hours", notes: "Patches, studs, cropping" },
      { name: "Full garment remake", minRate: 40, maxRate: 100, time: "3-8 hours", notes: "Transform into new item" },
      { name: "Vintage restoration", minRate: 50, maxRate: 150, time: "4-10 hours", notes: "Careful repair, preserve style" },
      { name: "Denim customization", minRate: 30, maxRate: 80, time: "2-5 hours", notes: "Distressing, patches, paint" },
      { name: "Streetwear upcycle", minRate: 40, maxRate: 120, time: "3-8 hours", notes: "Oversized remake, cuts" },
    ]
  },
  {
    name: "Boutique & Designer",
    services: [
      { name: "Sample making", minRate: 80, maxRate: 200, time: "8-20 hours", notes: "Per sample for designers" },
      { name: "Small batch production", minRate: 40, maxRate: 80, time: "4-8 hours", notes: "Per unit, 10+ pieces" },
      { name: "Exclusive commission", minRate: 200, maxRate: 800, time: "20-50 hours", notes: "One-off designer pieces" },
      { name: "Collection consultation", minRate: 50, maxRate: 100, time: "2-4 hours", notes: "Design advice, sourcing" },
      { name: "Tech pack creation", minRate: 100, maxRate: 250, time: "6-12 hours", notes: "Production specifications" },
    ]
  }
];

const QuickPricingTool: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<{name: string, qty: number}[]>([]);

  const category = PRICING_DATA.find(c => c.name === selectedCategory);

  const addService = (serviceName: string) => {
    const existing = selectedServices.find(s => s.name === serviceName);
    if (existing) {
      setSelectedServices(selectedServices.map(s => 
        s.name === serviceName ? { ...s, qty: s.qty + 1 } : s
      ));
    } else {
      setSelectedServices([...selectedServices, { name: serviceName, qty: 1 }]);
    }
  };

  const removeService = (serviceName: string) => {
    const existing = selectedServices.find(s => s.name === serviceName);
    if (existing && existing.qty > 1) {
      setSelectedServices(selectedServices.map(s => 
        s.name === serviceName ? { ...s, qty: s.qty - 1 } : s
      ));
    } else {
      setSelectedServices(selectedServices.filter(s => s.name !== serviceName));
    }
  };

  const calculateTotal = () => {
    let min = 0, max = 0;
    selectedServices.forEach(sel => {
      PRICING_DATA.forEach(cat => {
        const service = cat.services.find(s => s.name === sel.name);
        if (service) {
          min += service.minRate * sel.qty;
          max += service.maxRate * sel.qty;
        }
      });
    });
    return { min, max };
  };

  const totals = calculateTotal();

  return (
    <div className="pricing-tool">
      <div className="pricing-tool-header">
        <h3>💷 Quick Pricing Calculator</h3>
        <p>See what your services are worth. London market rates.</p>
      </div>

      <div className="pricing-categories">
        {PRICING_DATA.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {category && (
        <div className="pricing-services">
          {category.services.map((service) => {
            const selected = selectedServices.find(s => s.name === service.name);
            return (
              <div key={service.name} className="service-row">
                <div className="service-info">
                  <strong>{service.name}</strong>
                  <span className="service-time">⏱️ {service.time}</span>
                  <span className="service-notes">{service.notes}</span>
                </div>
                <div className="service-price">
                  <span className="price-range">£{service.minRate}-{service.maxRate}</span>
                  <div className="qty-controls">
                    <button onClick={() => removeService(service.name)}>−</button>
                    <span>{selected?.qty || 0}</span>
                    <button onClick={() => addService(service.name)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedServices.length > 0 && (
        <div className="pricing-total">
          <div className="total-breakdown">
            {selectedServices.map(s => (
              <div key={s.name} className="total-item">
                <span>{s.name}</span>
                <span>× {s.qty}</span>
              </div>
            ))}
          </div>
          <div className="total-amount">
            <span>Estimated Total:</span>
            <strong>£{totals.min} - £{totals.max}</strong>
          </div>
          <p className="total-note">
            Adjust based on your experience, materials, and client budget. 
            These are fair market rates—don't undercharge.
          </p>
        </div>
      )}
    </div>
  );
};

// ========================================
// PRINT ON DEMAND PLANNER (Inline Tool)
// ========================================

interface PODProduct {
  name: string;
  baseCost: string;
  suggestedPrice: string;
  profit: string;
  platform: string;
}

const POD_PRODUCTS: PODProduct[] = [
  { name: "T-shirt (organic)", baseCost: "£8-12", suggestedPrice: "£22-30", profit: "£10-18", platform: "Printful, SPOD" },
  { name: "Hoodie", baseCost: "£18-25", suggestedPrice: "£40-55", profit: "£15-30", platform: "Printful, Gooten" },
  { name: "Tote bag", baseCost: "£6-10", suggestedPrice: "£15-22", profit: "£5-12", platform: "Printful, Printify" },
  { name: "Phone case", baseCost: "£5-8", suggestedPrice: "£18-25", profit: "£10-17", platform: "Printify, Gooten" },
  { name: "Art print (A4)", baseCost: "£3-6", suggestedPrice: "£12-20", profit: "£6-14", platform: "Printful, Prodigi" },
  { name: "Canvas print", baseCost: "£12-20", suggestedPrice: "£35-60", profit: "£15-40", platform: "Printful, Prodigi" },
  { name: "Mug", baseCost: "£4-7", suggestedPrice: "£12-18", profit: "£5-11", platform: "Printful, SPOD" },
  { name: "Cushion cover", baseCost: "£8-14", suggestedPrice: "£25-35", profit: "£11-21", platform: "Printful, Gooten" },
  { name: "All-over print dress", baseCost: "£25-40", suggestedPrice: "£55-85", profit: "£15-45", platform: "Printful, AOP+" },
  { name: "Headwrap/scarf", baseCost: "£8-15", suggestedPrice: "£22-35", profit: "£7-20", platform: "Printful, Contrado" },
];

const PODPlanner: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (name: string) => {
    if (selectedProducts.includes(name)) {
      setSelectedProducts(selectedProducts.filter(p => p !== name));
    } else if (selectedProducts.length < 5) {
      setSelectedProducts([...selectedProducts, name]);
    }
  };

  return (
    <div className="pod-planner">
      <div className="pod-header">
        <h3>🖨️ Print on Demand Planner</h3>
        <p>Design once, sell repeatedly. No inventory, no risk.</p>
      </div>

      <div className="pod-intro">
        <p>
          <strong>How it works:</strong> You create designs. POD platform prints and ships when 
          orders come in. You keep the profit margin. Connect to Cyberstore or sell directly.
        </p>
      </div>

      <div className="pod-grid">
        {POD_PRODUCTS.map((product) => (
          <div 
            key={product.name}
            className={`pod-card ${selectedProducts.includes(product.name) ? 'selected' : ''}`}
            onClick={() => toggleProduct(product.name)}
          >
            <h4>{product.name}</h4>
            <div className="pod-economics">
              <div className="pod-row">
                <span>Base cost:</span>
                <span>{product.baseCost}</span>
              </div>
              <div className="pod-row">
                <span>Your price:</span>
                <span>{product.suggestedPrice}</span>
              </div>
              <div className="pod-row profit">
                <span>Your profit:</span>
                <span>{product.profit}</span>
              </div>
            </div>
            <div className="pod-platform">
              <small>Via: {product.platform}</small>
            </div>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="pod-selection">
          <h4>Your Starting Collection ({selectedProducts.length}/5)</h4>
          <div className="pod-selected-list">
            {selectedProducts.map(p => (
              <span key={p} className="pod-selected-tag">{p}</span>
            ))}
          </div>
          <div className="pod-next-steps">
            <p><strong>Next steps:</strong></p>
            <ol>
              <li>Create 3-5 designs that work across these products</li>
              <li>Set up accounts on recommended platforms</li>
              <li>Connect to Cyberstore for 55% revenue share, or sell direct</li>
              <li>Promote through Rayd-yo tutorials and Joystick features</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// COMMISSION BRIEF BUILDER (Inline Tool)
// ========================================

const CommissionBriefBuilder: React.FC = () => {
  const [brief, setBrief] = useState({
    type: '',
    occasion: '',
    budget: '',
    timeline: '',
    style: '',
    notes: ''
  });

  const commissionTypes = [
    "Alterations", "Custom dress", "African print outfit", "Wedding wear",
    "Carnival costume", "Theatre costume", "Accessories", "Upcycle/Retrofit",
    "Print design", "Sample making"
  ];

  const occasions = [
    "Wedding", "Christening", "Funeral", "Church event", "Carnival",
    "Party/celebration", "Theatre production", "Photoshoot", "Everyday wear", "Gift"
  ];

  const timelines = [
    "Rush (1 week)", "Standard (2-3 weeks)", "Relaxed (4-6 weeks)", "Flexible"
  ];

  const handleDownload = () => {
    const content = `
COMMISSION BRIEF
================
Generated by Silk Stilettos

Type: ${brief.type}
Occasion: ${brief.occasion}
Budget: ${brief.budget}
Timeline: ${brief.timeline}
Style notes: ${brief.style}
Additional notes: ${brief.notes}

---
Next steps:
1. Share this brief with your maker
2. Discuss materials and specifics
3. Agree on deposit (usually 50%)
4. Schedule fitting(s) if needed

wembleywonders.org/silk-stilettos
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commission-brief-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="brief-builder">
      <div className="brief-header">
        <h3>📋 Commission Brief Builder</h3>
        <p>Create a clear brief for your clients—or use it yourself to scope projects.</p>
      </div>

      <div className="brief-form">
        <div className="brief-group">
          <label>What type of work?</label>
          <div className="brief-options">
            {commissionTypes.map(type => (
              <button
                key={type}
                className={`brief-option ${brief.type === type ? 'selected' : ''}`}
                onClick={() => setBrief({...brief, type})}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="brief-group">
          <label>For what occasion?</label>
          <div className="brief-options">
            {occasions.map(occ => (
              <button
                key={occ}
                className={`brief-option ${brief.occasion === occ ? 'selected' : ''}`}
                onClick={() => setBrief({...brief, occasion: occ})}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        <div className="brief-row">
          <div className="brief-group">
            <label>Budget range</label>
            <input
              type="text"
              placeholder="e.g., £100-150"
              value={brief.budget}
              onChange={(e) => setBrief({...brief, budget: e.target.value})}
            />
          </div>

          <div className="brief-group">
            <label>Timeline</label>
            <select
              value={brief.timeline}
              onChange={(e) => setBrief({...brief, timeline: e.target.value})}
            >
              <option value="">Select...</option>
              {timelines.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="brief-group">
          <label>Style notes (colors, references, inspiration)</label>
          <textarea
            placeholder="Describe the look you want..."
            value={brief.style}
            onChange={(e) => setBrief({...brief, style: e.target.value})}
          />
        </div>

        <div className="brief-group">
          <label>Additional notes (measurements, special requirements)</label>
          <textarea
            placeholder="Any other details..."
            value={brief.notes}
            onChange={(e) => setBrief({...brief, notes: e.target.value})}
          />
        </div>

        {brief.type && brief.occasion && (
          <button className="brief-download" onClick={handleDownload}>
            📥 Download Brief
          </button>
        )}
      </div>
    </div>
  );
};

// ========================================
// MAIN PAGE COMPONENT
// ========================================

const SilkStilettosPage: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'pricing' | 'pod' | 'brief' | null>(null);
  
  // Heritage traditions
  const heritageTextiles = [
    {
      name: "The Dressmaker Tradition",
      icon: "🧵",
      description: "Every Caribbean community had one. Not famous. Just essential. Made children's clothes, wedding dresses, church outfits.",
      lesson: "You don't need Vogue. You need to be valuable to your community."
    },
    {
      name: "Madras & National Dress",
      icon: "🇩🇲",
      description: "The madras cloth traditions of Dominica, Martinique, Guadeloupe. National dress as cultural identity.",
      lesson: "Your heritage textiles have value. Document them. Teach them. Sell them."
    },
    {
      name: "African Print in Diaspora",
      icon: "🌍",
      description: "Ankara, kente, adinkra adapted for British Caribbean life. Saturday markets. Sunday best.",
      lesson: "Diaspora fashion tells a story. Your designs carry meaning."
    },
    {
      name: "Sunday Best Culture",
      icon: "⛪",
      description: "The church hat. The coordinated outfit. Presentation as cultural value and dignity.",
      lesson: "Style is survival. Looking good is resistance."
    },
    {
      name: "Carnival Mas",
      icon: "🎭",
      description: "Wearable art and engineering. Wire-bending, beading, featherwork. Costumes as sculpture.",
      lesson: "Carnival skills transfer to theatre, events, commissions."
    }
  ];

  // Expanded service categories
  const serviceCategories = [
    {
      category: "Alterations & Tailoring",
      icon: "✂️",
      description: "The bread and butter. Constant demand, quick turnaround, builds reputation.",
      examples: ["Hemming", "Taking in/letting out", "Zip replacement", "Sleeve shortening", "Full suit alterations"],
      rates: "£10-100 per item"
    },
    {
      category: "Wedding & Bridal",
      icon: "💒",
      description: "High-value work. One wedding can bring multiple commissions.",
      examples: ["Bridal alterations", "Custom bridesmaid dresses", "Mother of bride/groom", "Accessories", "Groom styling"],
      rates: "£50-2000+ per commission"
    },
    {
      category: "African/Caribbean Occasion Wear",
      icon: "👗",
      description: "Cultural events never stop. Weddings, christenings, funerals, church anniversaries.",
      examples: ["Custom dresses", "Matching family outfits", "Church hats", "African print sets", "Funeral attire"],
      rates: "£60-500 per outfit"
    },
    {
      category: "Carnival & Costume",
      icon: "🎭",
      description: "Seasonal but high-value. Skills transfer to theatre and events year-round.",
      examples: ["Mas costumes", "Section leader pieces", "Theatre costumes", "Children's costumes", "Costume repairs"],
      rates: "£40-800 per costume"
    },
    {
      category: "Retrofitting & Upcycling",
      icon: "♻️",
      description: "Growing market. Sustainable fashion, vintage restoration, streetwear customization.",
      examples: ["Garment remake", "Vintage restoration", "Denim customization", "Streetwear upcycle", "Size adjustments"],
      rates: "£20-150 per item"
    },
    {
      category: "Print on Demand",
      icon: "🖨️",
      description: "Design once, sell repeatedly. No inventory risk. Passive income potential.",
      examples: ["T-shirt designs", "All-over prints", "Art prints", "Home textiles", "Accessories"],
      rates: "£5-45 profit per sale"
    },
    {
      category: "Boutique & Designer Services",
      icon: "✨",
      description: "Work with emerging designers. Sample making, small batch production, exclusive pieces.",
      examples: ["Sample making", "Small batch production", "Exclusive commissions", "Tech packs", "Collection consultation"],
      rates: "£50-800 per project"
    },
    {
      category: "Cyberstore Products",
      icon: "🛒",
      description: "Build a catalogue. Sell your handmade products through Wembley Wonders' platform.",
      examples: ["Jewelry", "Accessories", "Headwraps", "Bags", "Art pieces"],
      rates: "55% of sale price"
    }
  ];

  // The makers collective
  const makersCollective = {
    shared: [
      "Industrial sewing machines",
      "Overlocker/serger",
      "Cutting tables and workspace",
      "Pattern-making equipment",
      "Embroidery machine (collective owned)",
      "Iron and pressing equipment",
      "Dress forms in various sizes"
    ],
    bulkBuying: [
      "Ankara fabric direct from suppliers",
      "Thread and notions in quantity",
      "Zips, buttons, fastenings wholesale",
      "Beading and carnival materials",
      "African print by the bolt"
    ]
  };

  // Cross-programme connections
  const programmeConnections = [
    { programme: "Kaywana's Court", connection: "Costume design for every production", icon: "🎭" },
    { programme: "Trubble n Bass", connection: "Stage outfits for performers", icon: "🎵" },
    { programme: "G-Tech Casters", connection: "Styling for video content", icon: "🎬" },
    { programme: "Joystick", connection: "Fashion features, designer profiles", icon: "📰" },
    { programme: "Rayd-yo", connection: "'How I Make...' tutorials", icon: "📻" },
    { programme: "Cyberstore", connection: "Sell products at 55% revenue share", icon: "🛒" }
  ];

  return (
    <PageTemplate
      pageTitle="Silk Stilettos"
      pageStrapline="Applied Textile & Design Skills — Be Valuable to Your Community, Not Famous to the World"
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "Silk Stilettos Programme",
          section: "programmes",
          contentType: "textile-design"
        }}
      />

      <div className="silk-stilettos-content">
        
        {/* Hero Section */}
        <section className="ss-hero">
          <div className="ss-hero-badge">👠</div>
          <h1>Silk Stilettos</h1>
          <p className="ss-hero-tagline">Applied Textile & Design Skills</p>
          <p className="ss-hero-quote">
            "The dressmaker in your grandmother's community wasn't famous—she was booked."
          </p>
        </section>

        {/* Quick Action Panels */}
        <section className="ss-section quick-actions">
          <h2>Start Creating Now</h2>
          <p className="section-intro">
            Tools to help you price work, plan products, and manage commissions. 
            Try them free—no signup required.
          </p>

          <div className="action-buttons">
            <button 
              className={`action-btn ${activePanel === 'pricing' ? 'active' : ''}`}
              onClick={() => setActivePanel(activePanel === 'pricing' ? null : 'pricing')}
            >
              💷 Pricing Calculator
            </button>
            <button 
              className={`action-btn ${activePanel === 'pod' ? 'active' : ''}`}
              onClick={() => setActivePanel(activePanel === 'pod' ? null : 'pod')}
            >
              🖨️ Print on Demand
            </button>
            <button 
              className={`action-btn ${activePanel === 'brief' ? 'active' : ''}`}
              onClick={() => setActivePanel(activePanel === 'brief' ? null : 'brief')}
            >
              📋 Commission Brief
            </button>
          </div>

          {/* Active Panel */}
          {activePanel === 'pricing' && <QuickPricingTool />}
          {activePanel === 'pod' && <PODPlanner />}
          {activePanel === 'brief' && <CommissionBriefBuilder />}
        </section>

        {/* Service Categories */}
        <section className="ss-section services-section">
          <h2>Services That Earn</h2>
          <p className="section-intro">
            Eight pathways to income through textile and design skills. 
            Pick what interests you, price fairly, deliver quality.
          </p>

          <div className="services-grid">
            {serviceCategories.map((cat, index) => (
              <div key={index} className="service-category-card">
                <div className="service-header">
                  <span className="service-icon">{cat.icon}</span>
                  <h3>{cat.category}</h3>
                </div>
                <p className="service-desc">{cat.description}</p>
                <div className="service-examples">
                  {cat.examples.map((ex, i) => (
                    <span key={i} className="example-tag">{ex}</span>
                  ))}
                </div>
                <div className="service-rates">
                  <strong>Rates:</strong> {cat.rates}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Heritage */}
        <section className="ss-section heritage-section">
          <h2>Your Heritage is Your Foundation</h2>
          <p className="section-intro">
            Before Fashion Week, there was the dressmaker. Before influencers, there was 
            the woman who made the wedding dresses. Your skills connect to traditions 
            that built communities.
          </p>

          <div className="heritage-grid">
            {heritageTextiles.map((tradition, index) => (
              <div key={index} className="heritage-card">
                <span className="heritage-icon">{tradition.icon}</span>
                <h3>{tradition.name}</h3>
                <p>{tradition.description}</p>
                <p className="heritage-lesson"><strong>The lesson:</strong> {tradition.lesson}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Not Fashion Week - Community Service */}
        <section className="ss-section reframe-section">
          <div className="reframe-card">
            <h2>This Isn't About Fashion Week</h2>
            <div className="reframe-comparison">
              <div className="reframe-old">
                <h3>The Old Path</h3>
                <p>Fashion school → Get discovered → Fashion Week → Brand deal</p>
                <ul>
                  <li>Winner-take-all economics</li>
                  <li>Fashion degrees cost £30-50k</li>
                  <li>Most graduates work retail or leave</li>
                  <li>Visible success is extreme outlier</li>
                </ul>
              </div>
              <div className="reframe-new">
                <h3>The Third Path</h3>
                <p>Build applied skills → Serve your community → Multiple income streams</p>
                <ul>
                  <li>Steady income from community service</li>
                  <li>Learn by doing, earn while learning</li>
                  <li>Collective resources through Makers Pardner</li>
                  <li>Skills that compound over time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Makers Collective */}
        <section className="ss-section collective-section">
          <h2>The Makers Collective: Pardner for Resources</h2>
          <p className="section-intro">
            Equipment is expensive. Studio space is expensive. Fabric in quantity is expensive. 
            But together, we access what none of us could afford alone.
          </p>

          <div className="collective-grid">
            <div className="collective-card shared">
              <h3>🧵 Shared Equipment</h3>
              <p>Collective owns, everyone accesses:</p>
              <ul>
                {makersCollective.shared.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="collective-card bulk">
              <h3>📦 Bulk Buying Power</h3>
              <p>Group purchasing for wholesale prices:</p>
              <ul>
                {makersCollective.bulkBuying.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="bulk-savings">10 people buying ankara together = wholesale prices</p>
            </div>

            <div className="collective-card pardner">
              <h3>💰 Makers Pardner</h3>
              <p>Rotating capital for major purchases:</p>
              <div className="pardner-example">
                <p><strong>Example:</strong> 10 members, £40/month</p>
                <p>Each month, one person gets £400</p>
                <p>→ Industrial sewing machine, overlocker, or fabric stock</p>
                <p>After 10 months, everyone has £400 of equipment</p>
              </div>
            </div>
          </div>

          <div className="collective-note">
            <p>
              This is heritage economics applied to making. Your grandmother's pardner 
              bought houses. Your Makers Pardner buys the tools to build income.
            </p>
          </div>
        </section>

        {/* Cross-Programme Connections */}
        <section className="ss-section connections-section">
          <h2>Connected Across All Programmes</h2>
          <p className="section-intro">
            Your textile and design skills are needed everywhere. Every production 
            needs costumes. Every performer needs styling. Every event needs presentation.
          </p>

          <div className="connections-grid">
            {programmeConnections.map((conn, index) => (
              <div key={index} className="connection-card">
                <span className="connection-icon">{conn.icon}</span>
                <h4>{conn.programme}</h4>
                <p>{conn.connection}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Journey */}
        <section className="ss-section journey-section">
          <h2>Example Journey: From Interest to Income</h2>
          <div className="journey-card">
            <div className="journey-steps">
              <div className="journey-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Join with Any Interest</h4>
                  <p>Jewelry, sewing, upcycling, print design—any starting point works.</p>
                </div>
              </div>
              <div className="journey-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>First Paid Work</h4>
                  <p>Costume pieces for Kaywana's Court, alterations for community. £50-150.</p>
                </div>
              </div>
              <div className="journey-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Build Content</h4>
                  <p>"How I Make..." tutorials for Rayd-yo. £25/episode. Builds reputation.</p>
                </div>
              </div>
              <div className="journey-step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>Multiple Streams</h4>
                  <p>Commissions + Cyberstore products + workshops + POD. £300-600/month.</p>
                </div>
              </div>
            </div>
            <div className="journey-total">
              <p><strong>Plus:</strong> Access to shared equipment, bulk buying discounts, Makers Pardner capital</p>
            </div>
          </div>
        </section>

        {/* For Parents / For Young People */}
        <section className="ss-section messaging-section">
          <h2>Having the Conversation</h2>
          
          <div className="messaging-grid">
            <div className="messaging-card parents">
              <h3>👵 For Parents</h3>
              <p>
                "They're learning the skills your mother had—sewing, pattern-making, design—
                but applying them to real community needs. Carnival costumes, church wear, 
                alterations. People pay for this. Your mother knew that. We're formalising 
                it and adding business skills."
              </p>
            </div>
            <div className="messaging-card young-people">
              <h3>🧑 For Young People</h3>
              <p>
                "You don't need Vogue to validate that you can design. Make the costumes for 
                the next production. Style the church anniversary. Build a Cyberstore line. 
                Get paid for your skill, not your fame."
              </p>
            </div>
          </div>
        </section>

        {/* Full Sandbox CTA */}
        <section className="ss-section sandbox-section">
          <div className="sandbox-card">
            <span className="sandbox-icon">👠</span>
            <h2>Creative Pathways Planner</h2>
            <p>
              The full sandbox experience. Map your interests to earning pathways, 
              document your textile heritage, calculate collective economics, and 
              plan your first collection.
            </p>
            <div className="sandbox-features">
              <span>Creative Pathways Mapper</span>
              <span>Textile Heritage Documenter</span>
              <span>Makers Collective Calculator</span>
              <span>Carnival Costing Tool</span>
            </div>
            <Link to="/programmes/silk-stilettos/sandbox" className="sandbox-cta">
              👠 Open Full Sandbox →
            </Link>
          </div>
        </section>

        {/* Membership */}
        <section className="ss-section membership-section">
          <h2>Join Silk Stilettos</h2>
          
          <div className="membership-grid">
            <div className="membership-card">
              <h3>Single Programme</h3>
              <div className="membership-price">£15/month</div>
              <ul>
                <li>Access to Silk Stilettos + Kaywana's Court</li>
                <li>Shared studio space access</li>
                <li>Makers Collective membership</li>
                <li>Cyberstore selling privileges</li>
                <li>Costume design opportunities</li>
              </ul>
            </div>

            <div className="membership-card featured">
              <div className="featured-badge">BEST VALUE</div>
              <h3>Multi-Programme</h3>
              <div className="membership-price">£35/month</div>
              <ul>
                <li>3 programmes of your choice</li>
                <li>Cross-programme opportunities</li>
                <li>Priority for production work</li>
                <li>Advanced workshops</li>
                <li>Mentorship matching</li>
              </ul>
            </div>
          </div>

          <p className="membership-note">
            💚 Sliding scale available — we don't gatekeep talent based on ability to pay.
          </p>
        </section>

        {/* CTA */}
        <section className="ss-cta">
          <div className="cta-content">
            <h2>Ready to Build?</h2>
            <p>
              Your skills have value. Your heritage has meaning. Your community needs 
              what you can make. Start building income from applied design.
            </p>
            <div className="cta-buttons">
              <Link to="/programmes/silk-stilettos/sandbox" className="cta-button primary">
                Open Creative Sandbox
              </Link>
              <Link to="/get-started" className="cta-button secondary">
                Join Silk Stilettos
              </Link>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="ss-closing">
          <blockquote>
            "Your grandmother didn't need Fashion Week. She needed to be useful to her 
            community, skilled at her craft, and connected to people who valued her work. 
            That's still the path. We're just making it visible."
          </blockquote>
        </section>

      </div>
    </PageTemplate>
  );
};

export default SilkStilettosPage;