import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, Package, Users, DollarSign, Clock, 
  TrendingUp, Filter, Search, Tag, Star, Download,
  BookOpen, FileText, Code, Headphones, Image, Video,
  Music, Play, Pause, Volume2, Award, Layers, Shield
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import MediaSection from '../components/media/MediaSection';
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
  // Music-specific fields
  bpm?: number;
  key?: string;
  genre?: string;
  licenseType?: 'lease' | 'exclusive' | 'unlimited';
  stemsIncluded?: boolean;
  audioPreviewUrl?: string;
  licenseTiers?: LicenseTier[];
}

interface LicenseTier {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const CommunityShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-low' | 'price-high'>('newest');
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  // Mock product data - Including beats/music
  const mockProducts: Product[] = [
    // BEATS & MUSIC
    {
      id: 'caribbean-riddim-01',
      title: 'Caribbean Sunset Riddim',
      description: 'Authentic dancehall riddim with live drum patterns, bassline, and horn stabs. Perfect for vocals or as an instrumental. Inspired by classic sound system culture.',
      price: 25.00,
      category: 'beats',
      format: 'wav',
      creatorName: 'DJ Trubble',
      creatorEarnings: 13.75,
      communityContribution: 6.25,
      totalSales: 12,
      rating: 4.9,
      reviewCount: 8,
      tags: ['dancehall', 'riddim', 'caribbean', 'instrumental'],
      featured: true,
      lastUpdated: new Date('2024-12-15'),
      previewAvailable: true,
      relatedProgramme: 'Trubble n Bass',
      bpm: 95,
      key: 'G minor',
      genre: 'Dancehall',
      licenseType: 'lease',
      stemsIncluded: true,
      licenseTiers: [
        { name: 'MP3 Lease', price: 25, features: ['MP3 file', 'Non-exclusive', '5,000 streams', 'Credit required'] },
        { name: 'WAV Lease', price: 50, features: ['WAV + MP3', 'Non-exclusive', '50,000 streams', 'Credit required'], popular: true },
        { name: 'Unlimited', price: 150, features: ['WAV + Stems', 'Unlimited streams', 'Music videos OK', 'Credit optional'] },
        { name: 'Exclusive', price: 500, features: ['Full ownership', 'Beat removed from store', 'All rights transferred'] }
      ]
    },
    {
      id: 'uk-drill-dark-01',
      title: 'Shadow Walker - UK Drill Type Beat',
      description: 'Dark, hard-hitting UK drill instrumental with sliding 808s and eerie piano melodies. Ready for bars.',
      price: 30.00,
      category: 'beats',
      format: 'wav',
      creatorName: 'Neville Beats',
      creatorEarnings: 16.50,
      communityContribution: 7.50,
      totalSales: 23,
      rating: 4.7,
      reviewCount: 15,
      tags: ['uk-drill', 'trap', 'dark', 'instrumental'],
      featured: true,
      lastUpdated: new Date('2024-12-20'),
      previewAvailable: true,
      relatedProgramme: 'Trubble n Bass',
      bpm: 140,
      key: 'C minor',
      genre: 'UK Drill',
      licenseType: 'lease',
      stemsIncluded: true,
      licenseTiers: [
        { name: 'MP3 Lease', price: 30, features: ['MP3 file', 'Non-exclusive', '5,000 streams'] },
        { name: 'WAV Lease', price: 60, features: ['WAV + MP3', '50,000 streams'], popular: true },
        { name: 'Trackout', price: 100, features: ['Individual stems', '100,000 streams'] },
        { name: 'Exclusive', price: 750, features: ['Full ownership', 'Beat removed'] }
      ]
    },
    {
      id: 'afrobeats-summer-01',
      title: 'Lagos Summer',
      description: 'Uplifting afrobeats instrumental with log drums, shakers, and catchy guitar loop. Festival ready.',
      price: 35.00,
      category: 'beats',
      format: 'wav',
      creatorName: 'Bright Sparks Collective',
      creatorEarnings: 19.25,
      communityContribution: 8.75,
      totalSales: 18,
      rating: 4.8,
      reviewCount: 11,
      tags: ['afrobeats', 'summer', 'uplifting', 'festival'],
      featured: false,
      lastUpdated: new Date('2024-11-28'),
      previewAvailable: true,
      relatedProgramme: 'Trubble n Bass',
      bpm: 108,
      key: 'A major',
      genre: 'Afrobeats',
      licenseType: 'lease',
      stemsIncluded: true
    },
    {
      id: 'grime-instrumental-01',
      title: 'East London Energy',
      description: 'Classic grime instrumental with aggressive synths and skippy drums. Made for MCs.',
      price: 20.00,
      category: 'beats',
      format: 'wav',
      creatorName: 'G-Tech Sound',
      creatorEarnings: 11.00,
      communityContribution: 5.00,
      totalSales: 31,
      rating: 4.6,
      reviewCount: 19,
      tags: ['grime', 'mc', 'london', 'aggressive'],
      featured: false,
      lastUpdated: new Date('2024-12-01'),
      previewAvailable: true,
      relatedProgramme: 'Trubble n Bass',
      bpm: 140,
      key: 'D minor',
      genre: 'Grime',
      licenseType: 'lease',
      stemsIncluded: false
    },
    {
      id: 'lo-fi-chill-01',
      title: 'Rainy Sunday (Lo-Fi)',
      description: 'Chilled lo-fi beat with vinyl crackle, jazz piano samples, and laid-back drums. Perfect for studying or content.',
      price: 15.00,
      category: 'beats',
      format: 'mp3',
      creatorName: 'Marcus T.',
      creatorEarnings: 8.25,
      communityContribution: 3.75,
      totalSales: 45,
      rating: 4.5,
      reviewCount: 28,
      tags: ['lo-fi', 'chill', 'study', 'content'],
      featured: false,
      lastUpdated: new Date('2024-10-15'),
      previewAvailable: true,
      relatedProgramme: 'Trubble n Bass',
      bpm: 85,
      key: 'F major',
      genre: 'Lo-Fi',
      licenseType: 'lease',
      stemsIncluded: false
    },
    // EXISTING PRODUCTS
    {
      id: 'creators-journal-2024',
      title: 'Creator\'s Journal: Reflection + Goal-Setting Workbook',
      description: 'A comprehensive digital journal designed for creators to track their journey, set meaningful goals, and reflect on their creative process. 52-week structured format with prompts, templates, and progress tracking.',
      price: 10.00,
      category: 'journal',
      format: 'pdf',
      creatorName: 'Wembley Wonders Team',
      creatorEarnings: 5.50,
      communityContribution: 2.50,
      totalSales: 47,
      rating: 4.8,
      reviewCount: 23,
      tags: ['journaling', 'reflection', 'goal-setting', 'self-development'],
      featured: true,
      lastUpdated: new Date('2024-10-15'),
      previewAvailable: true,
      relatedProgramme: 'Adult Creator Community'
    },
    {
      id: 'codecrawler-python-basics',
      title: 'CodeCrawler: Python Fundamentals for Beginners',
      description: 'Step-by-step Python tutorial series for complete beginners. Learn by building 10 real projects. Includes video lessons, code samples, and practice exercises. Perfect for self-paced learning.',
      price: 15.00,
      category: 'course',
      format: 'bundle',
      creatorName: 'Coding Collective',
      creatorEarnings: 8.25,
      communityContribution: 3.75,
      totalSales: 32,
      rating: 4.6,
      reviewCount: 18,
      tags: ['python', 'coding', 'programming', 'tutorial', 'stemgeneers'],
      featured: false,
      lastUpdated: new Date('2024-09-20'),
      previewAvailable: true,
      relatedProgramme: 'STEMgineers'
    },
    {
      id: 'local-skills-toolkit',
      title: 'Local Skills Toolkit: Home-Based Creative Income Guide',
      description: 'Practical guide to earning income from home using skills you already have. Covers digital services, craft sales, content creation, and local marketplace strategies. Includes templates and worksheets.',
      price: 12.00,
      category: 'toolkit',
      format: 'pdf',
      creatorName: 'Sarah M. & Community Contributors',
      creatorEarnings: 6.60,
      communityContribution: 3.00,
      totalSales: 28,
      rating: 4.7,
      reviewCount: 14,
      tags: ['entrepreneurship', 'income', 'skills', 'home-business', 'techtreneurs'],
      featured: false,
      lastUpdated: new Date('2024-10-01'),
      previewAvailable: true,
      relatedProgramme: 'Techtreneurs'
    },
    {
      id: 'podcast-starter-guide',
      title: 'Rad-Yo Podcast Starter Guide: From Idea to Episode 1',
      description: 'Everything you need to launch your first podcast on a budget. Equipment recommendations, recording tips, editing basics, and distribution strategies. Based on our Rad-Yo programme.',
      price: 18.00,
      category: 'guide',
      format: 'pdf',
      creatorName: 'Rad-Yo Production Team',
      creatorEarnings: 9.90,
      communityContribution: 4.50,
      totalSales: 19,
      rating: 4.9,
      reviewCount: 11,
      tags: ['podcasting', 'audio', 'content-creation', 'raydyo', 'media'],
      featured: false,
      lastUpdated: new Date('2024-08-15'),
      previewAvailable: true,
      relatedProgramme: 'Rad-Yo'
    },
    {
      id: 'portfolio-templates',
      title: 'Professional Portfolio Templates Pack',
      description: 'Five customizable portfolio templates for showcasing your creative work. Includes HTML/CSS templates for web portfolios, plus printable PDF versions. Perfect for job applications.',
      price: 8.00,
      category: 'template',
      format: 'zip',
      creatorName: 'Marcus T.',
      creatorEarnings: 4.40,
      communityContribution: 2.00,
      totalSales: 41,
      rating: 4.5,
      reviewCount: 22,
      tags: ['portfolio', 'templates', 'web-design', 'career'],
      featured: false,
      lastUpdated: new Date('2024-09-05'),
      previewAvailable: true
    },
    {
      id: 'ezine-publishing-guide',
      title: 'Joystick E-Zine Publishing Guide',
      description: 'Learn how to create, design, and publish your own digital magazine. Covers content planning, layout design, digital distribution, and monetization strategies.',
      price: 14.00,
      category: 'guide',
      format: 'pdf',
      creatorName: 'Joystick Editorial Team',
      creatorEarnings: 7.70,
      communityContribution: 3.50,
      totalSales: 15,
      rating: 4.6,
      reviewCount: 8,
      tags: ['publishing', 'ezine', 'content', 'joystick', 'media'],
      featured: false,
      lastUpdated: new Date('2024-07-20'),
      previewAvailable: true,
      relatedProgramme: 'Joystick'
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest': 
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'popular': 
        return b.totalSales - a.totalSales;
      case 'price-low': 
        return a.price - b.price;
      case 'price-high': 
        return b.price - a.price;
      default: 
        return 0;
    }
  });

  const totalCreatorEarnings = products.reduce((sum, p) => sum + (p.creatorEarnings * p.totalSales), 0);
  const totalCommunityContribution = products.reduce((sum, p) => sum + (p.communityContribution * p.totalSales), 0);
  const totalProducts = products.length;
  const activeCreators = new Set(products.map(p => p.creatorName)).size;
  const beatsCount = products.filter(p => p.category === 'beats').length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'journal': return <BookOpen size={20} />;
      case 'toolkit': return <Package size={20} />;
      case 'tutorial': return <Video size={20} />;
      case 'template': return <FileText size={20} />;
      case 'course': return <Code size={20} />;
      case 'guide': return <FileText size={20} />;
      case 'media': return <Headphones size={20} />;
      case 'beats': return <Music size={20} />;
      default: return <Package size={20} />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'pdf': return 'PDF';
      case 'epub': return 'ePub';
      case 'video': return 'Video';
      case 'audio': return 'Audio';
      case 'zip': return 'Bundle';
      case 'bundle': return 'Multi-format';
      case 'mp3': return 'MP3';
      case 'wav': return 'WAV';
      case 'stems': return 'Stems';
      default: return 'Digital';
    }
  };

  const togglePlay = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
    }
  };

  // Beat-specific card component
  const BeatProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="product-card beat-card">
      <div className="beat-header">
        <div className="beat-play-btn" onClick={() => togglePlay(product.id)}>
          {playingTrack === product.id ? <Pause size={24} /> : <Play size={24} />}
        </div>
        <div className="beat-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="creator-info">
            <Users size={14} />
            <span>by {product.creatorName}</span>
          </div>
        </div>
        {product.stemsIncluded && (
          <div className="stems-badge" title="Stems included">
            <Layers size={14} />
          </div>
        )}
      </div>

      <div className="beat-details">
        <span className="beat-bpm">{product.bpm} BPM</span>
        <span className="beat-key">{product.key}</span>
        <span className="beat-genre">{product.genre}</span>
      </div>

      <p className="product-description">{product.description}</p>

      <div className="product-tags">
        {product.tags.slice(0, 4).map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="product-stats">
        <div className="stat rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="count">({product.reviewCount})</span>
        </div>
        <div className="stat sales">
          <Download size={14} />
          <span>{product.totalSales} sales</span>
        </div>
      </div>

      {/* License Tiers */}
      {product.licenseTiers && (
        <div className="license-tiers">
          <h4>License Options</h4>
          <div className="tiers-grid">
            {product.licenseTiers.slice(0, 2).map((tier, index) => (
              <div key={index} className={`tier ${tier.popular ? 'popular' : ''}`}>
                {tier.popular && <span className="popular-badge">Popular</span>}
                <div className="tier-name">{tier.name}</div>
                <div className="tier-price">£{tier.price}</div>
              </div>
            ))}
          </div>
          <button className="btn-view-licenses">View All Licenses</button>
        </div>
      )}

      {!product.licenseTiers && (
        <div className="product-footer">
          <div className="pricing">
            <div className="price">£{product.price.toFixed(2)}</div>
            <div className="creator-share">
              Creator gets: £{product.creatorEarnings.toFixed(2)}
            </div>
          </div>
          <button className="btn-buy">
            <ShoppingCart size={16} />
            Buy Now
          </button>
        </div>
      )}

      {product.relatedProgramme && (
        <Link to="/programmes/trubble-n-bass/sandbox" className="made-with-link">
          🎵 Made with Trubble n Bass
        </Link>
      )}
    </div>
  );

  return (
    <PageTemplate
      pageTitle="G-Tech Cyberstore"
      pageStrapline="Digital marketplace where creators earn 55% on every sale. Your work. Your income. Your community."
      pageType="shop"
    >
      <div className="shop-content">
        
        {/* Marketplace Impact Stats */}
        <section className="marketplace-impact">
          <h2>Marketplace Impact</h2>
          <div className="impact-grid">
            <div className="impact-card creators">
              <DollarSign size={32} />
              <div className="impact-value">£{totalCreatorEarnings.toFixed(2)}</div>
              <div className="impact-label">Total Earned by Creators</div>
              <p className="impact-detail">55% of all sales goes directly to creators</p>
            </div>
            <div className="impact-card community">
              <Users size={32} />
              <div className="impact-value">£{totalCommunityContribution.toFixed(2)}</div>
              <div className="impact-label">Community Reinvestment</div>
              <p className="impact-detail">25% funds micro-grants & tools</p>
            </div>
            <div className="impact-card products">
              <Package size={32} />
              <div className="impact-value">{totalProducts}</div>
              <div className="impact-label">Digital Products Available</div>
              <p className="impact-detail">From {activeCreators} active creators</p>
            </div>
            <div className="impact-card beats">
              <Music size={32} />
              <div className="impact-value">{beatsCount}</div>
              <div className="impact-label">Beats & Instrumentals</div>
              <p className="impact-detail">Licensed for your projects</p>
            </div>
          </div>
        </section>

        {/* How the Revenue Split Works */}
        <section className="revenue-explainer">
          <h2>How Creator Revenue Works</h2>
          <div className="revenue-breakdown-visual">
            <div className="revenue-bar">
              <div className="revenue-segment creator" style={{ width: '55%' }}>
                <span className="segment-label">55% to Creator</span>
              </div>
              <div className="revenue-segment community" style={{ width: '25%' }}>
                <span className="segment-label">25% Community</span>
              </div>
              <div className="revenue-segment platform" style={{ width: '20%' }}>
                <span className="segment-label">20% Platform</span>
              </div>
            </div>
            <p className="revenue-example">
              <strong>Example:</strong> Sell a beat for £50 → You earn £27.50, 
              £12.50 funds community growth, £10 maintains platform
            </p>
          </div>
        </section>

        {/* Beats Section - NEW */}
        <section className="beats-section">
          <div className="beats-header">
            <div className="beats-title-area">
              <Music size={32} />
              <div>
                <h2>Beats & Instrumentals</h2>
                <p>Licensed beats from Trubble n Bass producers. Instant download. Clear licensing.</p>
              </div>
            </div>
            <Link to="/programmes/trubble-n-bass/sandbox" className="create-beat-btn">
              🎵 Create Your Own Beat
            </Link>
          </div>

          <div className="beats-grid">
            {sortedProducts.filter(p => p.category === 'beats').slice(0, 4).map(product => (
              <BeatProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="beats-footer">
            <button 
              className="btn-view-all-beats"
              onClick={() => setSelectedCategory('beats')}
            >
              View All {beatsCount} Beats →
            </button>
          </div>

          {/* Licensing Explainer */}
          <div className="licensing-explainer">
            <h3><Shield size={20} /> Understanding Beat Licenses</h3>
            <div className="license-types">
              <div className="license-type">
                <h4>MP3 Lease</h4>
                <p>Basic license for demos & mixtapes. Credit required. Limited streams.</p>
              </div>
              <div className="license-type">
                <h4>WAV Lease</h4>
                <p>Higher quality for releases. More streams allowed. Most popular choice.</p>
              </div>
              <div className="license-type">
                <h4>Trackout/Stems</h4>
                <p>Individual tracks for mixing. Full creative control. Professional releases.</p>
              </div>
              <div className="license-type">
                <h4>Exclusive</h4>
                <p>Full ownership. Beat removed from store. You own it completely.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {sortedProducts.filter(p => p.featured && p.category !== 'beats').length > 0 && (
          <section className="featured-section">
            <h2>Featured Products</h2>
            <div className="featured-grid">
              {sortedProducts.filter(p => p.featured && p.category !== 'beats').map(product => (
                <div key={product.id} className="featured-product-card">
                  <div className="featured-badge">Featured</div>
                  <div className="product-icon">
                    {getCategoryIcon(product.category)}
                  </div>
                  <h3>{product.title}</h3>
                  <p className="creator-credit">by {product.creatorName}</p>
                  <div className="product-rating">
                    <Star size={16} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="review-count">({product.reviewCount} reviews)</span>
                  </div>
                  <p className="product-description">{product.description}</p>
                  <div className="product-pricing">
                    <div className="price-main">£{product.price.toFixed(2)}</div>
                    <div className="creator-earnings">
                      Creator earns: £{product.creatorEarnings.toFixed(2)}
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="btn-primary">
                      <ShoppingCart size={18} />
                      Buy Now
                    </button>
                    {product.previewAvailable && (
                      <button className="btn-secondary">
                        <Download size={18} />
                        Preview
                      </button>
                    )}
                  </div>
                  <div className="product-meta">
                    <span className="format-badge">{getFormatLabel(product.format)}</span>
                    <span className="sales-count">{product.totalSales} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filters & Search */}
        <section className="shop-filters">
          <div className="filter-header">
            <h2>Browse All Products</h2>
          </div>
          <div className="filter-controls">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products, creators, genres, BPM..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Products</option>
                <option value="beats">🎵 Beats & Instrumentals</option>
                <option value="journal">Journals & Workbooks</option>
                <option value="toolkit">Toolkits & Resources</option>
                <option value="tutorial">Tutorials & Videos</option>
                <option value="course">Complete Courses</option>
                <option value="guide">Guides & How-Tos</option>
                <option value="template">Templates & Designs</option>
                <option value="media">Media & Audio</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="products-section">
          <div className="products-grid">
            {sortedProducts.filter(p => p.category !== 'beats' || selectedCategory === 'beats').map(product => (
              product.category === 'beats' ? (
                <BeatProductCard key={product.id} product={product} />
              ) : (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <div className="product-category">
                      {getCategoryIcon(product.category)}
                      <span>{product.category}</span>
                    </div>
                    <span className="format-badge">{getFormatLabel(product.format)}</span>
                  </div>

                  <h3 className="product-title">{product.title}</h3>
                  
                  <div className="creator-info">
                    <Users size={14} />
                    <span>by {product.creatorName}</span>
                  </div>

                  {product.relatedProgramme && (
                    <div className="programme-tag">
                      <Tag size={12} />
                      <span>{product.relatedProgramme}</span>
                    </div>
                  )}

                  <p className="product-description">{product.description}</p>

                  <div className="product-tags">
                    {product.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="product-stats">
                    <div className="stat rating">
                      <Star size={14} fill="currentColor" />
                      <span>{product.rating}</span>
                      <span className="count">({product.reviewCount})</span>
                    </div>
                    <div className="stat sales">
                      <Download size={14} />
                      <span>{product.totalSales} sales</span>
                    </div>
                  </div>

                  <div className="product-footer">
                    <div className="pricing">
                      <div className="price">£{product.price.toFixed(2)}</div>
                      <div className="creator-share">
                        Creator gets: £{product.creatorEarnings.toFixed(2)}
                      </div>
                    </div>
                    <button className="btn-buy">
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>

                  {product.previewAvailable && (
                    <button className="btn-preview">
                      <Download size={14} />
                      Free Preview
                    </button>
                  )}
                </div>
              )
            ))}
          </div>
        </section>

        {/* Become a Creator CTA */}
        <section className="creator-cta">
          <div className="cta-content">
            <h2>Want to Sell Your Work Here?</h2>
            <p>
              Join our creator community. Keep 55% of every sale. Your work funds community growth. 
              Fair pay. Clear terms. Transparent reporting.
            </p>
            <div className="cta-buttons">
              <Link to="/workshops/spark-generator" className="btn-primary-large">
                Start Creating
              </Link>
              <Link to="/programmes/trubble-n-bass/sandbox" className="btn-secondary-large">
                🎵 Make Beats
              </Link>
            </div>
            <p className="cta-subtext">
              Beats, guides, templates, courses — upload your first product in under 10 minutes.
            </p>
          </div>
        </section>

        {/* Creator Showcase Media */}
        <MediaSection 
          allowedRoles={['staff', 'participant', 'volunteer']}
          contentType="creator-spotlight"
          placeholder="Share creator stories, product development journeys, and community impact"
          layout="masonry"
          autoArchive={true}
          title="Creator Spotlights"
          description="Meet the creators behind our marketplace products"
        />
      </div>

      <DraggableMaya 
        membershipTier="visitor"
        pageType="shop"
        pageContext={{
          title: "G-Tech Cyberstore",
          section: "marketplace",
          contentType: "digital-products"
        }}
      />
    </PageTemplate>
  );
};

export default CommunityShopPage;