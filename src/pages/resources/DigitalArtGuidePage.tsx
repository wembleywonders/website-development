import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, Monitor, Smartphone, Tablet, PoundSterling, 
  Download, BookOpen, Users, ArrowRight, CheckCircle,
  ExternalLink, ChevronDown, ChevronUp, Package, Heart,
  Zap, Target, Gift
} from 'lucide-react';
import './DigitalArtGuidePage.css';

// ========================================
// TYPES
// ========================================

interface HardwareOption {
  name: string;
  price: string;
  notes: string;
  recommended?: boolean;
}

interface SoftwareOption {
  name: string;
  price: string;
  platform: string;
  bestFor: string;
  link?: string;
}

interface PathwayConnection {
  programme: string;
  icon: string;
  path: string;
  howItHelps: string;
  earning: string;
}

interface EquipmentItem {
  item: string;
  quantity: number;
  cost: number;
}

// ========================================
// DATA
// ========================================

const FREE_SOFTWARE: SoftwareOption[] = [
  {
    name: 'Krita',
    price: 'Free',
    platform: 'Windows, Mac, Linux',
    bestFor: 'Illustration, comics, concept art',
    link: 'https://krita.org',
  },
  {
    name: 'Ibis Paint X',
    price: 'Free (ads)',
    platform: 'Android, iOS, Windows',
    bestFor: 'Mobile drawing, quick sketches',
  },
  {
    name: 'MediBang Paint',
    price: 'Free',
    platform: 'All platforms',
    bestFor: 'Comics, manga',
  },
  {
    name: 'FireAlpaca',
    price: 'Free',
    platform: 'Windows, Mac',
    bestFor: 'Simple illustration, beginners',
  },
  {
    name: 'Photopea',
    price: 'Free',
    platform: 'Web browser',
    bestFor: 'Photoshop alternative, no download',
    link: 'https://photopea.com',
  },
];

const BUDGET_TABLETS: HardwareOption[] = [
  { name: 'XP-Pen Deco Mini 4', price: '~£25', notes: 'Great starter, portable' },
  { name: 'XP-Pen Deco 01 V2', price: '~£40', notes: 'Best budget option', recommended: true },
  { name: 'Huion Inspiroy H640P', price: '~£35', notes: 'Good alternative' },
  { name: 'Wacom One S', price: '~£50', notes: 'Industry standard brand' },
  { name: 'Wacom Intuos S', price: '~£60', notes: 'Reliable, lasts years' },
];

const DISPLAY_TABLETS: HardwareOption[] = [
  { name: 'XP-Pen Artist 12 (2nd Gen)', price: '~£150', notes: 'Great entry display', recommended: true },
  { name: 'Huion Kamvas 13', price: '~£180', notes: 'Good colours, reliable' },
  { name: 'XP-Pen Artist 16 (2nd Gen)', price: '~£250', notes: 'Bigger working area' },
  { name: 'Wacom One 13', price: '~£300', notes: 'Wacom quality' },
];

const REFURB_IPADS: HardwareOption[] = [
  { name: 'iPad 6th Gen (2018)', price: '~£150', notes: 'Oldest usable + £80 Pencil' },
  { name: 'iPad 7th Gen (2019)', price: '~£180', notes: 'Slightly bigger screen' },
  { name: 'iPad 8th Gen (2020)', price: '~£200', notes: 'Good balance', recommended: true },
];

const PATHWAY_CONNECTIONS: PathwayConnection[] = [
  {
    programme: 'Silk Stilettos',
    icon: '👠',
    path: '/pathways/silk-stilettos',
    howItHelps: 'Fashion illustration, pattern design, textile art',
    earning: 'Sell designs, take commissions',
  },
  {
    programme: 'Joystick',
    icon: '🎮',
    path: '/pathways/joystick',
    howItHelps: 'E-zine illustrations, comic strips, game fan art',
    earning: 'Creator revenue share (55% to you)',
  },
  {
    programme: 'Pageturners',
    icon: '📖',
    path: '/pathways/pageturners',
    howItHelps: 'Book covers, interior illustrations, chapter headers',
    earning: 'Per-project payment',
  },
  {
    programme: 'G-Tech Casters',
    icon: '🎙️',
    path: '/pathways/gtech-casters',
    howItHelps: 'Thumbnails, channel art, stream overlays',
    earning: 'Freelance work, own channel',
  },
  {
    programme: 'Rayd-yo',
    icon: '📻',
    path: '/raydyo',
    howItHelps: 'Podcast artwork, social media graphics, show branding',
    earning: 'Project-based work',
  },
];

const EQUIPMENT_WISHLIST = {
  priority1: {
    name: 'Starter Kits',
    items: [
      { item: 'XP-Pen Deco 01 V2', quantity: 10, cost: 400 },
      { item: 'Carrying case', quantity: 10, cost: 50 },
      { item: 'USB-C adapters', quantity: 10, cost: 30 },
    ],
    total: 480,
  },
  priority2: {
    name: 'Intermediate Kits',
    items: [
      { item: 'XP-Pen Artist 12 (2nd Gen)', quantity: 5, cost: 750 },
      { item: 'Tablet stand', quantity: 5, cost: 75 },
      { item: 'Carrying case', quantity: 5, cost: 50 },
    ],
    total: 875,
  },
  priority3: {
    name: 'Pro/Workshop Kits',
    items: [
      { item: 'XP-Pen Artist 16 (2nd Gen)', quantity: 2, cost: 500 },
      { item: 'Adjustable stand', quantity: 2, cost: 100 },
      { item: 'Laptop (refurbished)', quantity: 2, cost: 400 },
    ],
    total: 1000,
  },
  priority4: {
    name: 'Mobile Kits',
    items: [
      { item: 'Samsung Galaxy Tab S6 Lite', quantity: 3, cost: 600 },
      { item: 'S Pen', quantity: 3, cost: 60 },
      { item: 'Protective case', quantity: 3, cost: 45 },
    ],
    total: 705,
  },
};

// ========================================
// COMPONENT
// ========================================

const DigitalArtGuidePage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('software');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const grandTotal = 
    EQUIPMENT_WISHLIST.priority1.total + 
    EQUIPMENT_WISHLIST.priority2.total + 
    EQUIPMENT_WISHLIST.priority3.total + 
    EQUIPMENT_WISHLIST.priority4.total;

  return (
    <div className="digital-art-guide">
      
      {/* Hero */}
      <section className="dag-hero">
        <div className="dag-hero__container">
          <div className="dag-hero__icon">
            <Palette size={48} />
          </div>
          <h1>Digital Art on a Budget</h1>
          <p className="dag-hero__subtitle">
            You don't need expensive gear to create amazing digital art. 
            Start with what you have, build skills that earn, access equipment when you're ready.
          </p>
          <div className="dag-hero__badges">
            <span className="dag-badge dag-badge--green">Free software available</span>
            <span className="dag-badge dag-badge--gold">From £0 to professional</span>
            <span className="dag-badge dag-badge--blue">Equipment lending coming</span>
          </div>
        </div>
      </section>

      {/* Start Where You Are */}
      <section className="dag-section dag-start">
        <div className="dag-container">
          <h2>Start Where You Are</h2>
          
          <div className="dag-levels">
            <div className="dag-level">
              <div className="dag-level__header">
                <span className="dag-level__price">£0</span>
                <h3>Paper & Pencil</h3>
              </div>
              <p>Foundational skills transfer directly to digital. Line control, perspective, shading — learn these first.</p>
              <div className="dag-level__verdict">
                <CheckCircle size={16} />
                Don't skip this stage
              </div>
            </div>
            
            <div className="dag-level">
              <div className="dag-level__header">
                <span className="dag-level__price">£0</span>
                <h3>Your Phone</h3>
              </div>
              <p>Yes, really. Ibis Paint X is free and full-featured. Add a £5 stylus from Poundland.</p>
              <div className="dag-level__verdict">
                <Smartphone size={16} />
                Removes all barriers
              </div>
            </div>
            
            <div className="dag-level dag-level--recommended">
              <div className="dag-level__header">
                <span className="dag-level__price">£40</span>
                <h3>Budget Tablet + Krita</h3>
              </div>
              <p>XP-Pen Deco 01 V2 + free Krita software = professional-capable setup.</p>
              <div className="dag-level__verdict">
                <Target size={16} />
                Our recommendation
              </div>
            </div>
            
            <div className="dag-level">
              <div className="dag-level__header">
                <span className="dag-level__price">£150+</span>
                <h3>Display Tablet</h3>
              </div>
              <p>Draw directly on screen. More intuitive but not strictly necessary.</p>
              <div className="dag-level__verdict">
                <Monitor size={16} />
                When you're serious
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Software - Krita Focus */}
      <section className="dag-section dag-software">
        <div className="dag-container">
          <div 
            className="dag-section-header dag-section-header--expandable"
            onClick={() => toggleSection('software')}
          >
            <div>
              <h2><Download size={24} /> Free Software</h2>
              <p>Professional tools that cost nothing</p>
            </div>
            {expandedSection === 'software' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          
          {expandedSection === 'software' && (
            <div className="dag-section-content">
              {/* Krita Highlight */}
              <div className="dag-krita-highlight">
                <div className="dag-krita-highlight__header">
                  <h3>🎨 Krita: Our Recommendation</h3>
                  <a 
                    href="https://krita.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dag-btn dag-btn--small"
                  >
                    Download Free <ExternalLink size={14} />
                  </a>
                </div>
                <p>
                  Krita is free, open-source, and used by professional concept artists, 
                  illustrators, and comic creators worldwide. No account needed, no hidden costs, 
                  no trial period.
                </p>
                <div className="dag-krita-features">
                  <span>✓ Illustration</span>
                  <span>✓ Comics</span>
                  <span>✓ Animation</span>
                  <span>✓ Concept art</span>
                  <span>✓ Hundreds of brushes</span>
                  <span>✓ Windows, Mac, Linux</span>
                </div>
              </div>

              {/* Other Free Options */}
              <h4>Other Free Options</h4>
              <div className="dag-software-grid">
                {FREE_SOFTWARE.map((software, index) => (
                  <div key={index} className="dag-software-card">
                    <div className="dag-software-card__header">
                      <h5>{software.name}</h5>
                      <span className="dag-software-card__price">{software.price}</span>
                    </div>
                    <p className="dag-software-card__platform">{software.platform}</p>
                    <p className="dag-software-card__best">{software.bestFor}</p>
                    {software.link && (
                      <a href={software.link} target="_blank" rel="noopener noreferrer" className="dag-software-card__link">
                        Visit site <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hardware Options */}
      <section className="dag-section dag-hardware">
        <div className="dag-container">
          <div 
            className="dag-section-header dag-section-header--expandable"
            onClick={() => toggleSection('hardware')}
          >
            <div>
              <h2><Tablet size={24} /> Hardware Options</h2>
              <p>UK prices, January 2026</p>
            </div>
            {expandedSection === 'hardware' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
          
          {expandedSection === 'hardware' && (
            <div className="dag-section-content">
              {/* Budget Graphics Tablets */}
              <div className="dag-hardware-category">
                <h4>
                  <Monitor size={18} />
                  Graphics Tablets (Non-Display) — £25-60
                </h4>
                <p className="dag-hardware-note">Draw on tablet, look at computer screen. Takes practice but works brilliantly.</p>
                <div className="dag-hardware-grid">
                  {BUDGET_TABLETS.map((tablet, index) => (
                    <div key={index} className={`dag-hardware-card ${tablet.recommended ? 'dag-hardware-card--recommended' : ''}`}>
                      {tablet.recommended && <span className="dag-recommended-badge">Recommended</span>}
                      <h5>{tablet.name}</h5>
                      <span className="dag-hardware-price">{tablet.price}</span>
                      <p>{tablet.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Display Tablets */}
              <div className="dag-hardware-category">
                <h4>
                  <Monitor size={18} />
                  Display Tablets — £150-500+
                </h4>
                <p className="dag-hardware-note">Draw directly on screen, connected to computer. More intuitive.</p>
                <div className="dag-hardware-grid">
                  {DISPLAY_TABLETS.map((tablet, index) => (
                    <div key={index} className={`dag-hardware-card ${tablet.recommended ? 'dag-hardware-card--recommended' : ''}`}>
                      {tablet.recommended && <span className="dag-recommended-badge">Recommended</span>}
                      <h5>{tablet.name}</h5>
                      <span className="dag-hardware-price">{tablet.price}</span>
                      <p>{tablet.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refurbished iPads */}
              <div className="dag-hardware-category">
                <h4>
                  <Tablet size={18} />
                  Refurbished iPads — £150-300
                </h4>
                <p className="dag-hardware-note">Best drawing experience. Buy refurbished to save money. Add Procreate (£13.99).</p>
                <div className="dag-hardware-grid">
                  {REFURB_IPADS.map((ipad, index) => (
                    <div key={index} className={`dag-hardware-card ${ipad.recommended ? 'dag-hardware-card--recommended' : ''}`}>
                      {ipad.recommended && <span className="dag-recommended-badge">Recommended</span>}
                      <h5>{ipad.name}</h5>
                      <span className="dag-hardware-price">{ipad.price}</span>
                      <p>{ipad.notes}</p>
                    </div>
                  ))}
                </div>
                <p className="dag-hardware-tip">
                  <strong>Where to buy refurbished:</strong> Apple Refurbished Store, Back Market, Music Magpie, CEX
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pathway to Earning */}
      <section className="dag-section dag-pathways">
        <div className="dag-container">
          <h2><Zap size={24} /> Pathway to Earning</h2>
          <p className="dag-section-intro">
            Digital art skills connect to multiple Wembley Wonders programmes. Build skills, create for others, start earning.
          </p>
          
          <div className="dag-pathway-grid">
            {PATHWAY_CONNECTIONS.map((pathway, index) => (
              <Link key={index} to={pathway.path} className="dag-pathway-card">
                <span className="dag-pathway-icon">{pathway.icon}</span>
                <div className="dag-pathway-content">
                  <h4>{pathway.programme}</h4>
                  <p className="dag-pathway-how">{pathway.howItHelps}</p>
                  <p className="dag-pathway-earning">
                    <PoundSterling size={14} />
                    {pathway.earning}
                  </p>
                </div>
                <ArrowRight size={18} className="dag-pathway-arrow" />
              </Link>
            ))}
          </div>

          {/* Journey Diagram */}
          <div className="dag-journey">
            <h3>Your Journey</h3>
            <div className="dag-journey-steps">
              <div className="dag-journey-step">
                <div className="dag-journey-step__marker">1</div>
                <div className="dag-journey-step__content">
                  <strong>Foundations</strong>
                  <span>Free tools, daily practice</span>
                </div>
              </div>
              <div className="dag-journey-arrow">→</div>
              <div className="dag-journey-step">
                <div className="dag-journey-step__marker">2</div>
                <div className="dag-journey-step__content">
                  <strong>Skill Building</strong>
                  <span>Budget tablet, Krita mastery</span>
                </div>
              </div>
              <div className="dag-journey-arrow">→</div>
              <div className="dag-journey-step">
                <div className="dag-journey-step__marker">3</div>
                <div className="dag-journey-step__content">
                  <strong>Creating</strong>
                  <span>Joystick, Pageturners work</span>
                </div>
              </div>
              <div className="dag-journey-arrow">→</div>
              <div className="dag-journey-step">
                <div className="dag-journey-step__marker">4</div>
                <div className="dag-journey-step__content">
                  <strong>Professional</strong>
                  <span>Commissions, teaching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Lending */}
      <section className="dag-section dag-lending">
        <div className="dag-container">
          <div className="dag-lending-header">
            <Package size={32} />
            <div>
              <h2>Equipment Lending Library</h2>
              <p>Borrow professional gear without buying it</p>
            </div>
            <span className="dag-badge dag-badge--gold">Coming Soon</span>
          </div>

          <div className="dag-lending-intro">
            <p>
              We're building an Equipment Lending Library so members can access professional 
              digital art tools. Funded by the <strong>25% Community Set-Aside</strong> from 
              creator earnings and our <strong>Pardner/Susu collective saving circles</strong>.
            </p>
          </div>

          <div className="dag-wishlist">
            <h3>Equipment Wishlist</h3>
            
            <div className="dag-wishlist-grid">
              {Object.entries(EQUIPMENT_WISHLIST).map(([key, priority]) => (
                <div key={key} className="dag-wishlist-card">
                  <h4>{priority.name}</h4>
                  <ul>
                    {priority.items.map((item, index) => (
                      <li key={index}>
                        <span>{item.quantity}× {item.item}</span>
                        <span>£{item.cost}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="dag-wishlist-total">
                    Total: <strong>£{priority.total}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="dag-wishlist-grand">
              <span>Grand Total Needed:</span>
              <strong>£{grandTotal.toLocaleString()}</strong>
            </div>
          </div>

          <div className="dag-contribute">
            <h3><Heart size={20} /> How You Can Help</h3>
            <div className="dag-contribute-options">
              <div className="dag-contribute-option">
                <Gift size={24} />
                <h4>Donate Equipment</h4>
                <p>Old tablets, iPads, drawing tablets, working laptops</p>
              </div>
              <div className="dag-contribute-option">
                <Users size={24} />
                <h4>Join a Pardner Circle</h4>
                <p>Collective saving towards community equipment</p>
              </div>
              <div className="dag-contribute-option">
                <PoundSterling size={24} />
                <h4>Creator Set-Aside</h4>
                <p>25% of your earnings automatically contributes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="dag-section dag-quickstart">
        <div className="dag-container">
          <h2>Quick Start Checklist</h2>
          
          <div className="dag-checklist-grid">
            <div className="dag-checklist">
              <h4>If You Have Nothing (£0)</h4>
              <ul>
                <li>Practice drawing on paper</li>
                <li>Download Ibis Paint on your phone</li>
                <li>Try Krita on a library computer</li>
                <li>Join Passionistas drop-in session</li>
                <li>Ask about Equipment Lending</li>
              </ul>
            </div>
            
            <div className="dag-checklist dag-checklist--highlight">
              <h4>If You Have £40</h4>
              <ul>
                <li>Buy XP-Pen Deco 01 V2</li>
                <li>Download Krita (free)</li>
                <li>Complete Krita basics tutorial</li>
                <li>Join Silk Stilettos pathway</li>
                <li>Start building portfolio</li>
              </ul>
            </div>
            
            <div className="dag-checklist">
              <h4>If You Have £150-200</h4>
              <ul>
                <li>Buy XP-Pen Artist 12 display tablet</li>
                <li>OR refurbished iPad + Pencil</li>
                <li>Take on first Joystick illustration</li>
                <li>Set up Creator Marketplace profile</li>
                <li>Start taking commissions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dag-section dag-cta">
        <div className="dag-container">
          <div className="dag-cta-content">
            <h2>Ready to Start?</h2>
            <p>
              Join a Passionistas session to try the tools, or dive into the Silk Stilettos 
              pathway for structured learning.
            </p>
            <div className="dag-cta-buttons">
              <Link to="/workshops/spark-generator" className="dag-btn dag-btn--primary">
                <Palette size={18} />
                Try Tools Free
              </Link>
              <Link to="/pathways/silk-stilettos" className="dag-btn dag-btn--secondary">
                <BookOpen size={18} />
                Silk Stilettos Pathway
              </Link>
              <a href="https://krita.org" target="_blank" rel="noopener noreferrer" className="dag-btn dag-btn--outline">
                <Download size={18} />
                Download Krita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="dag-footer-note">
        <p>
          <strong>Remember:</strong> The best tablet is the one you use. The best software 
          is the one you learn. Start where you are, use what you have, do what you can.
        </p>
        <p className="dag-contact">
          Questions? Email <a href="mailto:admin@wembleywonders.org">admin@wembleywonders.org</a> or 
          call <a href="tel:02089029991">0208 902 9991</a>
        </p>
      </div>

    </div>
  );
};

export default DigitalArtGuidePage;