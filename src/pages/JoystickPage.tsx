import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import MediaSection from '../components/media/MediaSection';
import { 
  BookOpen, Edit, Eye, Calendar, User, Tag, 
  Heart, MessageCircle, Clock, Star, Search, 
  Filter, Grid, List, Download, ArrowRight
} from 'lucide-react';
import './JoystickPage.css';

const JoystickPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const featuredArticles = [
    {
      id: 'go-karts-code',
      title: "From Go-Karts to Code: My Summer Block Journey",
      excerpt: "A participant's reflection on hands-on learning and how building physical projects led to programming breakthroughs.",
      author: "Sarah M.",
      authorRole: "Youth Programme Participant",
      publishDate: "3 days ago",
      readTime: "6 min read",
      category: "Personal Stories",
      tags: ["Learning", "STEM", "Youth"],
      views: 234,
      likes: 28,
      comments: 12,
      featured: true
    },
    {
      id: 'maya-ai-analysis',
      title: "Maya AI: Community Assistant or Digital Friend?",
      excerpt: "Exploring AI's role in community engagement and what it means for authentic human connection.",
      author: "Tech Talk Collective", 
      authorRole: "Community Contributors",
      publishDate: "5 days ago",
      readTime: "8 min read",
      category: "Technology Analysis",
      tags: ["AI", "Community", "Ethics"],
      views: 412,
      likes: 56,
      comments: 23,
      featured: true
    }
  ];

  const recentArticles = [
    {
      id: 'community-apps',
      title: "Review: Best Apps for Local Community Organizing",
      excerpt: "Tools that actually help neighborhoods connect, tested by our community organizers.",
      author: "Community Curators",
      authorRole: "Editorial Team",
      publishDate: "1 week ago", 
      readTime: "5 min read",
      category: "App Reviews",
      tags: ["Apps", "Community Organizing", "Reviews"],
      views: 189,
      likes: 34,
      comments: 8
    },
    {
      id: 'accessible-websites',
      title: "Coding Workshop Spotlight: Building Accessible Websites",
      excerpt: "Why web accessibility matters for everyone and how our workshop participants are making the web more inclusive.",
      author: "STEMgineers Group",
      authorRole: "Workshop Facilitators",
      publishDate: "1 week ago",
      readTime: "7 min read", 
      category: "Tech Tutorials",
      tags: ["Accessibility", "Web Development", "Workshops"],
      views: 156,
      likes: 41,
      comments: 15
    },
    {
      id: 'arduino-projects',
      title: "Community Hardware Builds: Arduino Projects That Solve Real Problems",
      excerpt: "From automated plant watering to air quality monitors, see what our makers have been building.",
      author: "Maker Collective",
      authorRole: "Community Makers",
      publishDate: "2 weeks ago",
      readTime: "9 min read",
      category: "Project Showcases", 
      tags: ["Arduino", "Hardware", "Problem Solving"],
      views: 287,
      likes: 52,
      comments: 19
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: featuredArticles.length + recentArticles.length },
    { id: 'personal-stories', name: 'Personal Stories', count: 1 },
    { id: 'technology-analysis', name: 'Technology Analysis', count: 1 },
    { id: 'app-reviews', name: 'App Reviews', count: 1 },
    { id: 'tech-tutorials', name: 'Tech Tutorials', count: 1 },
    { id: 'project-showcases', name: 'Project Showcases', count: 1 }
  ];

  const allArticles = [...featuredArticles, ...recentArticles];
  
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
      article.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ArticleCard = ({ article, featured = false }: { article: any, featured?: boolean }) => (
    <article className={`joystick-article-card ${featured ? 'featured' : ''} ${viewMode}`}>
      {featured && (
        <div className="featured-badge">
          <Star size={16} />
          Featured
        </div>
      )}
      
      <div className="article-content">
        <div className="article-header">
          <div className="article-meta">
            <span className="article-category">{article.category}</span>
            <span className="article-date">
              <Clock size={12} />
              {article.publishDate}
            </span>
          </div>
          <div className="article-stats">
            <div className="stat-item">
              <Eye size={14} />
              <span>{article.views}</span>
            </div>
            <div className="stat-item">
              <Heart size={14} />
              <span>{article.likes}</span>
            </div>
          </div>
        </div>
        
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        
        <div className="article-tags">
          {article.tags.map((tag: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined, idx: React.Key | null | undefined) => (
            <span key={typeof tag === 'string' || typeof tag === 'number' ? tag : idx} className="tag">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="article-footer">
          <div className="article-author">
            <User size={16} />
            <div className="author-info">
              <span className="author-name">{article.author}</span>
              <span className="author-role">{article.authorRole}</span>
            </div>
          </div>
          
          <div className="article-actions">
            <span className="read-time">{article.readTime}</span>
            <button className="read-button">
              <BookOpen size={16} />
              Read
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <PageTemplate
      pageTitle="Joystick E-zine"
      pageStrapline="Wembley's digital magazine where residents write, create, and share stories about technology, gaming, community, and the future we're building together."
      pageType="programme"
    >
      <DraggableMaya 
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "Joystick Magazine",
          section: "media",
          contentType: "magazine"
        }}
      />

      <div className="joystick-content">
        {/* Hero Section */}
        <section className="joystick-hero">
          <div className="hero-badge">🎮</div>
          <h1>Joystick E-zine</h1>
          <p className="hero-tagline">
            Community Publishing Platform – Tech, Gaming, and Digital Culture
          </p>
        </section>

        {/* Search and Filter Controls */}
        <section className="controls-section">
          <div className="search-filters">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search articles, authors, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="category-filter">
              <Filter size={18} />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="view-controls">
            <button 
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
              Grid
            </button>
            <button 
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
              List
            </button>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="featured-section">
          <h2>Featured Stories</h2>
          <div className="featured-grid">
            {featuredArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured={true} />
            ))}
          </div>
        </section>

        {/* Latest Issue Showcase */}
        <section className="latest-issue-section">
          <h2>Latest Issue - September 2024</h2>
          
          <div className="issue-showcase">
            <div className="issue-cover">
              <div className="cover-placeholder">
                <BookOpen size={48} />
                <h3>Issue #3</h3>
                <p>Building Tomorrow</p>
              </div>
            </div>
            
            <div className="issue-content">
              <h3>This Issue Features</h3>
              <div className="issue-stats">
                <div className="stat">
                  <strong>8</strong> Articles
                </div>
                <div className="stat">
                  <strong>12</strong> Contributors  
                </div>
                <div className="stat">
                  <strong>45</strong> Pages
                </div>
              </div>
              <p>
                Our latest issue explores how community members are using technology 
                to build connections, solve problems, and create opportunities for everyone.
              </p>
              <button className="read-issue-button">
                <BookOpen size={18} />
                Read Full Issue
              </button>
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="articles-section">
          <div className="section-header">
            <h2>Recent Articles</h2>
            <span className="article-count">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          
          <div className={`articles-container ${viewMode}`}>
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="no-results">
              <BookOpen size={48} />
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </section>

        {/* Magazine Showcase Media Section */}
        <MediaSection 
          contentType="joystick-showcase"
          title="From Our Pages"
          description="Visual stories, infographics, and community content from Joystick Magazine"
          allowedRoles={['staff', 'volunteer', 'editor']}
          placeholder="Share magazine content, cover designs, and featured article images"
          autoArchive={false}
          maxItems={6}
          layout="grid"
        />

        {/* What is Joystick Section */}
        <section className="about-section">
          <h2>What is Joystick?</h2>
          <div className="about-grid">
            <div className="about-panel">
              <div className="panel-icon">
                <Edit size={32} />
              </div>
              <h3>Community Publishing</h3>
              <p>
                Residents write articles, reviews, tutorials, and opinion pieces 
                about technology, gaming, digital skills, and community life.
              </p>
            </div>
            
            <div className="about-panel">
              <div className="panel-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Tech & Gaming Culture</h3>
              <p>
                Reviews of games, apps, and tech tools. Discussions about how 
                technology impacts our daily lives and community connections.
              </p>
            </div>
            
            <div className="about-panel">
              <div className="panel-icon">
                <Star size={32} />
              </div>
              <h3>Innovation Showcase</h3>
              <p>
                Highlighting community tech projects, coding achievements, 
                and innovative solutions created by Wembley residents.
              </p>
            </div>
          </div>
        </section>

        {/* Contributing Section */}
        <section className="contributing-section">
          <h2>Contribute to Joystick</h2>
          
          <div className="contributing-grid">
            <div className="contribute-card">
              <div className="contribute-icon">
                <Edit size={24} />
              </div>
              <h3>Write Articles</h3>
              <p>
                Share your knowledge, experiences, or opinions. We welcome writers 
                of all skill levels and provide editing support.
              </p>
              <div className="contribute-details">
                <strong>What we're looking for:</strong>
                <ul>
                  <li>Personal tech experiences and lessons learned</li>
                  <li>Tutorial content that helps other residents</li>
                  <li>Reviews and recommendations</li>
                  <li>Community project documentation</li>
                </ul>
              </div>
              <button className="contribute-button">
                <Edit size={16} />
                Submit Article
              </button>
            </div>
            
            <div className="contribute-card">
              <div className="contribute-icon">
                <Calendar size={24} />
              </div>
              <h3>Editorial Support</h3>
              <p>
                Help with editing, fact-checking, and publishing. Learn digital 
                publishing skills while supporting community voices.
              </p>
              <div className="contribute-details">
                <strong>Editorial roles:</strong>
                <ul>
                  <li>Copy editing and proofreading</li>
                  <li>Fact-checking and research support</li>
                  <li>Social media promotion</li>
                  <li>Website maintenance and updates</li>
                </ul>
              </div>
              <button className="contribute-button">
                <MessageCircle size={16} />
                Join Editorial Team
              </button>
            </div>
          </div>
        </section>

        {/* Archive and Newsletter */}
        <section className="archive-newsletter-section">
          <div className="archive-split">
            <div className="archive-browser">
              <h2>Browse Archives</h2>
              <p>
                Explore past issues of Joystick and discover the evolution 
                of our community's digital conversations.
              </p>
              <div className="archive-list">
                <div className="archive-item">
                  <Calendar size={16} />
                  <span>Issue #2 - June 2024: "Summer of Making"</span>
                  <button className="archive-read">Read</button>
                </div>
                <div className="archive-item">
                  <Calendar size={16} />
                  <span>Issue #1 - March 2024: "Getting Started"</span>
                  <button className="archive-read">Read</button>
                </div>
              </div>
              <button className="archive-button">
                <BookOpen size={16} />
                View All Issues
              </button>
            </div>
            
            <div className="newsletter-signup">
              <h2>Stay Updated</h2>
              <p>
                Get the latest Joystick articles delivered to your inbox when each issue publishes.
              </p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="newsletter-input"
                />
                <button className="newsletter-button">
                  Subscribe
                </button>
              </div>
              <div className="newsletter-note">
                <p>Community members only. Quarterly issues.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Link to G-Tech Casters Programme */}
        <section className="programme-link-section">
          <div className="programme-link-card">
            <h2>Learn Digital Publishing with G-Tech Casters</h2>
            <p>
              Joystick Magazine is created by participants in our <strong>G-Tech Casters</strong> programme. 
              Learn podcast production, digital storytelling, and media creation skills.
            </p>
            <Link to="/programmes/gtechcasters" className="programme-link-button">
              <ArrowRight size={18} />
              Explore G-Tech Casters Programme
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="joystick-cta">
          <h2>Ready to Share Your Story?</h2>
          <p>Join our community of writers, makers, and storytellers</p>
          <div className="cta-buttons">
            <Link to="/get-started" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/programmes/gtechcasters" className="cta-button secondary">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default JoystickPage;