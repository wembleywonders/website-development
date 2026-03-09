import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Package, Users, DollarSign,
  Search, Tag, Star, Download,
  BookOpen, FileText, Code, Headphones, Video,
  Music, Play, Pause, Shield, Layers
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import MediaSection from '../components/media/MediaSection';
import CreatorJourneySection from '../components/cyberstore/CreatorJourneySection';
import { CREATOR_REGISTRY } from '../types/creatorRegistry';
import './CommunityShopPage.css';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'journal' | 'toolkit' | 'tutorial' | 'template' | 'course' | 'guide' | 'media' | 'beats';
  format: 'pdf' | 'epub' | 'video' | 'audio' | 'zip' | 'bundle' | 'mp3' | 'wav' | 'stems';
  creatorName: string;
  creatorEarnings: number;
  communityContribution: number;
  totalSales: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  lastUpdated: Date;
  previewAvailable: boolean;
  relatedProgramme?: string;
  bpm?: number;
  key?: string;
  genre?: string;
  stemsIncluded?: boolean;
  licenseTiers?: { name: string; price: number; features: string[]; popular?: boolean }[];
}

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  creatorId?: string;
  variant?: string;
}

const CommunityShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('newest');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleJourneyAddToCart = (item: any) => {
    const cartItem: CartItem = {
      productId: item.productId || item.id || '',
      title: item.title || '',
      price: item.price || 0,
      quantity: 1,
      creatorId: item.creatorId,
      variant: item.variant
    };
    setCartItems(prev => {
      const existing = prev.find(c => c.productId === cartItem.productId && c.variant === cartItem.variant);
      if (existing) return prev.map(c =>
        c.productId === cartItem.productId && c.variant === cartItem.variant
          ? { ...c, quantity: c.quantity + 1 } : c
      );
      return [...prev, cartItem];
    });
  };

  const mockProducts: Product[] = [
    {
      id: 'caribbean-riddim-01', title: 'Caribbean Sunset Riddim',
      description: 'Authentic dancehall riddim with live drum patterns, bassline, and horn stabs. Perfect for vocals or as an instrumental.',
      price: 25, category: 'beats', format: 'wav', creatorName: 'DJ Trubble',
      creatorEarnings: 13.75, communityContribution: 6.25, totalSales: 12, rating: 4.9, reviewCount: 8,
      tags: ['dancehall', 'riddim', 'caribbean'], featured: true, lastUpdated: new Date('2024-12-15'),
      previewAvailable: true, relatedProgramme: 'Trubble n Bass', bpm: 95, key: 'G minor', genre: 'Dancehall',
      stemsIncluded: true, licenseTiers: [
        { name: 'MP3 Lease', price: 25, features: ['MP3 file', 'Non-exclusive', '5,000 streams'] },
        { name: 'WAV Lease', price: 50, features: ['WAV + MP3', '50,000 streams'], popular: true },
        { name: 'Unlimited',  price: 150, features: ['WAV + Stems', 'Unlimited streams'] },
        { name: 'Exclusive',  price: 500, features: ['Full ownership', 'Beat removed from store'] }
      ]
    },
    {
      id: 'uk-drill-dark-01', title: 'Shadow Walker — UK Drill Type Beat',
      description: 'Dark, hard-hitting UK drill instrumental with sliding 808s and eerie piano melodies.',
      price: 30, category: 'beats', format: 'wav', creatorName: 'Neville Beats',
      creatorEarnings: 16.50, communityContribution: 7.50, totalSales: 23, rating: 4.7, reviewCount: 15,
      tags: ['uk-drill', 'trap', 'dark'], featured: true, lastUpdated: new Date('2024-12-20'),
      previewAvailable: true, bpm: 140, key: 'C minor', genre: 'UK Drill', stemsIncluded: true,
      licenseTiers: [
        { name: 'MP3 Lease', price: 30, features: ['MP3 file', '5,000 streams'] },
        { name: 'WAV Lease', price: 60, features: ['WAV + MP3', '50,000 streams'], popular: true },
        { name: 'Trackout',  price: 100, features: ['Individual stems', '100,000 streams'] },
        { name: 'Exclusive', price: 750, features: ['Full ownership', 'Beat removed'] }
      ]
    },
    {
      id: 'afrobeats-summer-01', title: 'Lagos Summer',
      description: 'Uplifting afrobeats instrumental with log drums, shakers, and catchy guitar loop.',
      price: 35, category: 'beats', format: 'wav', creatorName: 'Bright Sparks Collective',
      creatorEarnings: 19.25, communityContribution: 8.75, totalSales: 18, rating: 4.8, reviewCount: 11,
      tags: ['afrobeats', 'summer', 'uplifting'], featured: false, lastUpdated: new Date('2024-11-28'),
      previewAvailable: true, bpm: 108, key: 'A major', genre: 'Afrobeats', stemsIncluded: true
    },
    {
      id: 'grime-instrumental-01', title: 'East London Energy',
      description: 'Classic grime instrumental with aggressive synths and skippy drums. Made for MCs.',
      price: 20, category: 'beats', format: 'wav', creatorName: 'G-Tech Sound',
      creatorEarnings: 11.00, communityContribution: 5.00, totalSales: 31, rating: 4.6, reviewCount: 19,
      tags: ['grime', 'mc', 'london'], featured: false, lastUpdated: new Date('2024-12-01'),
      previewAvailable: true, bpm: 140, key: 'D minor', genre: 'Grime', stemsIncluded: false
    },
    {
      id: 'lo-fi-chill-01', title: 'Rainy Sunday (Lo-Fi)',
      description: 'Chilled lo-fi beat with vinyl crackle, jazz piano samples, and laid-back drums.',
      price: 15, category: 'beats', format: 'mp3', creatorName: 'Marcus T.',
      creatorEarnings: 8.25, communityContribution: 3.75, totalSales: 45, rating: 4.5, reviewCount: 28,
      tags: ['lo-fi', 'chill', 'study'], featured: false, lastUpdated: new Date('2024-10-15'),
      previewAvailable: true, bpm: 85, key: 'F major', genre: 'Lo-Fi', stemsIncluded: false
    },
    {
      id: 'creators-journal-2024', title: "Creator's Journal: Reflection + Goal-Setting Workbook",
      description: 'A comprehensive digital journal for creators to track their journey and set meaningful goals.',
      price: 10, category: 'journal', format: 'pdf', creatorName: 'Wembley Wonders Team',
      creatorEarnings: 5.50, communityContribution: 2.50, totalSales: 47, rating: 4.8, reviewCount: 23,
      tags: ['journaling', 'reflection', 'goal-setting'], featured: true,
      lastUpdated: new Date('2024-10-15'), previewAvailable: true, relatedProgramme: 'Adult Creator Community'
    },
    {
      id: 'codecrawler-python-basics', title: 'CodeCrawler: Python Fundamentals for Beginners',
      description: 'Step-by-step Python tutorial series for complete beginners. Learn by building 10 real projects.',
      price: 15, category: 'course', format: 'bundle', creatorName: 'Coding Collective',
      creatorEarnings: 8.25, communityContribution: 3.75, totalSales: 32, rating: 4.6, reviewCount: 18,
      tags: ['python', 'coding', 'programming'], featured: false, lastUpdated: new Date('2024-09-20'),
      previewAvailable: true, relatedProgramme: 'STEMgineers'
    },
    {
      id: 'local-skills-toolkit', title: 'Local Skills Toolkit: Home-Based Creative Income Guide',
      description: 'Practical guide to earning income from home using skills you already have.',
      price: 12, category: 'toolkit', format: 'pdf',
      creatorName: 'Sarah M. & Community Contributors',
      creatorEarnings: 6.60, communityContribution: 3.00, totalSales: 28, rating: 4.7, reviewCount: 14,
      tags: ['entrepreneurship', 'income', 'skills'], featured: false,
      lastUpdated: new Date('2024-10-01'), previewAvailable: true, relatedProgramme: 'Techtreneurs'
    },
    {
      id: 'podcast-starter-guide', title: 'Rad-Yo Podcast Starter Guide: From Idea to Episode 1',
      description: 'Everything you need to launch your first podcast on a budget.',
      price: 18, category: 'guide', format: 'pdf', creatorName: 'Rad-Yo Production Team',
      creatorEarnings: 9.90, communityContribution: 4.50, totalSales: 19, rating: 4.9, reviewCount: 11,
      tags: ['podcasting', 'audio', 'raydyo'], featured: false, lastUpdated: new Date('2024-08-15'),
      previewAvailable: true, relatedProgramme: 'Rad-Yo'
    },
    {
      id: 'portfolio-templates', title: 'Professional Portfolio Templates Pack',
      description: 'Five customizable portfolio templates for showcasing your creative work.',
      price: 8, category: 'template', format: 'zip', creatorName: 'Marcus T.',
      creatorEarnings: 4.40, communityContribution: 2.00, totalSales: 41, rating: 4.5, reviewCount: 22,
      tags: ['portfolio', 'templates', 'web-design'], featured: false,
      lastUpdated: new Date('2024-09-05'), previewAvailable: true
    },
    {
      id: 'ezine-publishing-guide', title: 'Joystick E-Zine Publishing Guide',
      description: 'Learn how to create, design, and publish your own digital magazine.',
      price: 14, category: 'guide', format: 'pdf', creatorName: 'Joystick Editorial Team',
      creatorEarnings: 7.70, communityContribution: 3.50, totalSales: 15, rating: 4.6, reviewCount: 8,
      tags: ['publishing', 'ezine', 'joystick'], featured: false,
      lastUpdated: new Date('2024-07-20'), previewAvailable: true, relatedProgramme: 'Joystick'
    }
  ];

  useEffect(() => { setProducts(mockProducts); }, []);

  const beatProducts    = products.filter(p => p.category === 'beats');
  const generalProducts = products.filter(p => p.category !== 'beats');

  const filteredGeneral = generalProducts.filter(p => {
    const cat = selectedCategory === 'all' || p.category === selectedCategory;
    const q   = !searchTerm || [p.title, p.description, p.creatorName, ...p.tags]
      .some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return cat && q;
  });

  const sortedGeneral = [...filteredGeneral].sort((a, b) => {
    if (sortBy === 'newest')     return +new Date(b.lastUpdated) - +new Date(a.lastUpdated);
    if (sortBy === 'popular')    return b.totalSales - a.totalSales;
    if (sortBy === 'price-low')  return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const totalCreatorEarnings      = products.reduce((s, p) => s + p.creatorEarnings * p.totalSales, 0);
  const totalCommunityContribution= products.reduce((s, p) => s + p.communityContribution * p.totalSales, 0);
  const activeCreators            = new Set(products.map(p => p.creatorName)).size;

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, JSX.Element> = {
      journal: <BookOpen size={18} />, toolkit: <Package size={18} />,
      tutorial: <Video size={18} />, template: <FileText size={18} />,
      course: <Code size={18} />, guide: <FileText size={18} />, media: <Headphones size={18} />
    };
    return icons[cat] ?? <Package size={18} />;
  };

  const formatLabel: Record<string, string> = {
    pdf: 'PDF', epub: 'ePub', video: 'Video', audio: 'Audio',
    zip: 'Bundle', bundle: 'Multi-format', mp3: 'MP3', wav: 'WAV', stems: 'Stems'
  };

  // ── Beat card ──────────────────────────────────────────────────────────────
  const BeatCard: React.FC<{ p: Product }> = ({ p }) => (
    <div className="product-card beat-card">
      <div className="beat-header">
        <button className="beat-play-btn" onClick={() => setPlayingTrack(t => t === p.id ? null : p.id)}>
          {playingTrack === p.id ? <Pause size={22} /> : <Play size={22} />}
        </button>
        <div className="beat-info">
          <h3 className="product-title">{p.title}</h3>
          <div className="creator-info"><Users size={13} /><span>by {p.creatorName}</span></div>
        </div>
        {p.stemsIncluded && <div className="stems-badge" title="Stems included"><Layers size={13} /></div>}
      </div>
      <div className="beat-details">
        <span className="beat-bpm">{p.bpm} BPM</span>
        <span className="beat-key">{p.key}</span>
        <span className="beat-genre">{p.genre}</span>
      </div>
      <p className="product-description">{p.description}</p>
      <div className="product-tags">{p.tags.slice(0,4).map(t=><span key={t} className="tag">{t}</span>)}</div>
      <div className="product-stats">
        <div className="stat rating"><Star size={13} fill="currentColor"/><span>{p.rating}</span><span className="count">({p.reviewCount})</span></div>
        <div className="stat sales"><Download size={13}/><span>{p.totalSales} sales</span></div>
      </div>
      {p.licenseTiers ? (
        <div className="license-tiers">
          <h4>License Options</h4>
          <div className="tiers-grid">
            {p.licenseTiers.slice(0,2).map((tier,i) => (
              <div key={i} className={`tier${tier.popular?' popular':''}`}>
                {tier.popular && <span className="popular-badge">Popular</span>}
                <div className="tier-name">{tier.name}</div>
                <div className="tier-price">£{tier.price}</div>
              </div>
            ))}
          </div>
          <button className="btn-view-licenses">View All Licenses</button>
        </div>
      ) : (
        <div className="product-footer">
          <div className="pricing">
            <div className="price">£{p.price.toFixed(2)}</div>
            <div className="creator-share">Creator gets: £{p.creatorEarnings.toFixed(2)}</div>
          </div>
          <button className="btn-buy"><ShoppingCart size={15}/> Buy Now</button>
        </div>
      )}
      <Link to="/programmes/trubble-n-bass/sandbox" className="made-with-link">🎵 Made with Trubble n Bass</Link>
    </div>
  );

  // ── General product card ───────────────────────────────────────────────────
  const GeneralCard: React.FC<{ p: Product }> = ({ p }) => (
    <div className="product-card">
      <div className="product-header">
        <div className="product-category">{getCategoryIcon(p.category)}<span>{p.category}</span></div>
        <span className="format-badge">{formatLabel[p.format] ?? 'Digital'}</span>
      </div>
      <h3 className="product-title">{p.title}</h3>
      <div className="creator-info"><Users size={13}/><span>by {p.creatorName}</span></div>
      {p.relatedProgramme && (
        <div className="programme-tag"><Tag size={11}/><span>{p.relatedProgramme}</span></div>
      )}
      <p className="product-description">{p.description}</p>
      <div className="product-tags">{p.tags.slice(0,3).map(t=><span key={t} className="tag">{t}</span>)}</div>
      <div className="product-stats">
        <div className="stat rating"><Star size={13} fill="currentColor"/><span>{p.rating}</span><span className="count">({p.reviewCount})</span></div>
        <div className="stat sales"><Download size={13}/><span>{p.totalSales} sales</span></div>
      </div>
      <div className="product-footer">
        <div className="pricing">
          <div className="price">£{p.price.toFixed(2)}</div>
          <div className="creator-share">Creator gets: £{p.creatorEarnings.toFixed(2)}</div>
        </div>
        <button className="btn-buy"><ShoppingCart size={15}/> Buy Now</button>
      </div>
      {p.previewAvailable && (
        <button className="btn-preview"><Download size={13}/> Free Preview</button>
      )}
    </div>
  );

  // ── Page ───────────────────────────────────────────────────────────────────
  return (
    <PageTemplate
      pageTitle="G-Tech Cyberstore"
      pageStrapline="Digital marketplace where creators earn 55% on every sale. Your work. Your income. Your community."
      pageType="shop"
    >
      <div className="shop-content">

        {/* Stats */}
        <section className="marketplace-impact">
          <h2>Marketplace Impact</h2>
          <div className="impact-grid">
            <div className="impact-card creators">
              <DollarSign size={30}/>
              <div className="impact-value">£{totalCreatorEarnings.toFixed(2)}</div>
              <div className="impact-label">Total Earned by Creators</div>
              <p className="impact-detail">55% of all sales goes directly to creators</p>
            </div>
            <div className="impact-card community">
              <Users size={30}/>
              <div className="impact-value">£{totalCommunityContribution.toFixed(2)}</div>
              <div className="impact-label">Community Reinvestment</div>
              <p className="impact-detail">25% funds micro-grants &amp; tools</p>
            </div>
            <div className="impact-card products">
              <Package size={30}/>
              <div className="impact-value">{products.length}</div>
              <div className="impact-label">Products Available</div>
              <p className="impact-detail">From {activeCreators} active creators</p>
            </div>
            <div className="impact-card beats">
              <Music size={30}/>
              <div className="impact-value">{beatProducts.length}</div>
              <div className="impact-label">Beats &amp; Instrumentals</div>
              <p className="impact-detail">Licensed for your projects</p>
            </div>
          </div>
        </section>

        {/* Revenue model */}
        <section className="revenue-explainer">
          <h2>How Creator Revenue Works</h2>
          <div className="revenue-breakdown-visual">
            <div className="revenue-bar">
              <div className="revenue-segment creator"  style={{width:'55%'}}><span className="segment-label">55% to Creator</span></div>
              <div className="revenue-segment community" style={{width:'25%'}}><span className="segment-label">25% Community</span></div>
              <div className="revenue-segment platform"  style={{width:'20%'}}><span className="segment-label">20% Platform</span></div>
            </div>
            <p className="revenue-example">
              <strong>Example:</strong> Sell a guide for £12 → Creator earns £6.60, £3.00 to community fund, £2.40 to platform
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ZONE 1 — CREATOR JOURNEYS
            Knowledge products with full provenance.
            Judith Fontanelle is CREATOR_REGISTRY[0].
        ══════════════════════════════════════════════════ */}
        <div className="shop-zone-header" id="creator-journeys">
          <div className="zone-label">Zone 1</div>
          <h2>Creator Journeys</h2>
          <p>
            Knowledge products made by named community members — documented from their original
            source (an appointment, a session, a lived experience) all the way to sale.
            Every product shows exactly where the knowledge came from and who earns from it.
          </p>
        </div>

        {CREATOR_REGISTRY.map(entry => (
          <CreatorJourneySection
            key={entry.profile.id}
            entry={entry}
            onAddToCart={handleJourneyAddToCart}
          />
        ))}

        {/* ══════════════════════════════════════════════════
            ZONE 2 — BEATS & INSTRUMENTALS
            Music. Purchase decision = genre/BPM/license tier.
        ══════════════════════════════════════════════════ */}
        <div className="shop-zone-header" id="beats">
          <div className="zone-label">Zone 2</div>
          <h2>Beats &amp; Instrumentals</h2>
          <p>
            Licensed beats from Trubble n Bass producers. Instant download. 55% to the producer on every sale.
            Choose your license below each track — MP3 for demos, WAV for releases, Stems for full control.
          </p>
        </div>

        <section className="beats-section">
          <div className="beats-header">
            <Link to="/programmes/trubble-n-bass/sandbox" className="create-beat-btn">
              🎵 Create Your Own Beat
            </Link>
          </div>
          <div className="beats-grid">
            {beatProducts.map(p => <BeatCard key={p.id} p={p}/>)}
          </div>
          <div className="licensing-explainer">
            <h3><Shield size={17}/> Understanding Beat Licenses</h3>
            <div className="license-types">
              <div className="license-type"><h4>MP3 Lease</h4><p>Demos &amp; mixtapes. Credit required. Limited streams.</p></div>
              <div className="license-type"><h4>WAV Lease</h4><p>Commercial releases. More streams. Most popular.</p></div>
              <div className="license-type"><h4>Trackout / Stems</h4><p>Individual tracks for mixing. Full creative control.</p></div>
              <div className="license-type"><h4>Exclusive</h4><p>Full ownership. Beat removed from store permanently.</p></div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            ZONE 3 — TOOLS, GUIDES & COURSES
            General digital products. No licensing complexity.
        ══════════════════════════════════════════════════ */}
        <div className="shop-zone-header" id="tools-guides">
          <div className="zone-label">Zone 3</div>
          <h2>Tools, Guides &amp; Courses</h2>
          <p>
            Practical resources for creators and learners — templates, tutorials, and course bundles
            made by and for the Wembley Wonders community.
          </p>
        </div>

        <section className="shop-filters">
          <div className="filter-controls">
            <div className="search-box">
              <Search size={18}/>
              <input
                type="text"
                placeholder="Search guides, courses, templates..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Category:</label>
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="all">All</option>
                <option value="journal">Journals &amp; Workbooks</option>
                <option value="toolkit">Toolkits</option>
                <option value="tutorial">Tutorials</option>
                <option value="course">Courses</option>
                <option value="guide">Guides</option>
                <option value="template">Templates</option>
                <option value="media">Media</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sort:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>
            </div>
          </div>
        </section>

        <section className="products-section">
          <div className="products-grid">
            {sortedGeneral.map(p => <GeneralCard key={p.id} p={p}/>)}
            {sortedGeneral.length === 0 && (
              <div className="empty-state">
                <Package size={36}/>
                <p>No products match your search.</p>
                <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>Clear filters</button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="creator-cta">
          <div className="cta-content">
            <h2>Want to Sell Your Work Here?</h2>
            <p>Join our creator community. Keep 55% of every sale. Fair pay. Clear terms. Transparent reporting.</p>
            <div className="cta-buttons">
              <Link to="/workshops/spark-generator" className="btn-primary-large">Start Creating</Link>
              <Link to="/programmes/trubble-n-bass/sandbox" className="btn-secondary-large">🎵 Make Beats</Link>
            </div>
            <p className="cta-subtext">
              Knowledge products, beats, guides, templates — upload your first product in under 10 minutes.
            </p>
          </div>
        </section>

        <MediaSection
          allowedRoles={['staff', 'participant', 'volunteer']}
          contentType="creator-spotlight"
          placeholder="Share creator stories, product development journeys, and community impact"
          layout="masonry" autoArchive={true}
          title="Creator Spotlights"
          description="Meet the creators behind our marketplace products"
        />
      </div>

      <DraggableMaya
        membershipTier="visitor"
        pageType="shop"
        pageContext={{ title: "G-Tech Cyberstore", section: "marketplace", contentType: "digital-products" }}
      />
    </PageTemplate>
  );
};

export default CommunityShopPage;