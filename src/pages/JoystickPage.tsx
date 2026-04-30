/*
 * JOYSTICK E-ZINE — WEMBLEY WONDERS CIC
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */
 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './JoystickPage.css';
 
/* ─── TYPES ──────────────────────────────────────────────────────────── */
 
interface Article {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;
  kicker?: string;
  headline: string;
  deck: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
  marketRun?: boolean;
  sourceCredit?: string;
  sourceUrl?: string;
  tags: string[];
}
 
/* ─── DATA ───────────────────────────────────────────────────────────── */
 
const ARTICLES: Article[] = [
  {
    id: 'biscuit-price-fix',
    slug: 'biscuit-price-fix',
    category: 'Cost of Living',
    categoryColor: 'red',
    kicker: 'Food prices — Regulation',
    headline: "They calculated you'd pay it. So far, they've been right.",
    deck: 'The biscuits in your trolley cost more here than in Germany. Same factory. Same wrapper. Same lorry. And somebody made a very deliberate decision about that.',
    author: 'Andy Roberts / The Fine Print',
    authorRole: 'Adapted for Joystick',
    date: 'April 2026',
    readTime: '7 min read',
    featured: true,
    sourceCredit: 'The Fine Print — Andy Roberts',
    sourceUrl: 'https://www.youtube.com/watch?v=f63qalvQADc',
    tags: ['food prices', 'cost of living', 'supermarkets', 'regulation'],
  },
  {
    id: 'market-run-april',
    slug: 'market-run-april',
    category: "Auntie Anansi's Kitchen",
    categoryColor: 'gold',
    kicker: 'Market Run — April 2026',
    headline: "Where to shop smarter in Brent right now",
    deck: 'Cash-and-carry secrets, what\'s in season, and the ethnic grocers saving our readers serious money this month. Our new standing feature — community-sourced, locally verified.',
    author: 'Joystick Editors',
    authorRole: 'Community Intelligence',
    date: 'April 2026',
    readTime: '4 min read',
    marketRun: true,
    tags: ['shopping', 'local', 'food', 'community tips', 'Wembley', 'Brent'],
  },
  {
    id: 'harlem-walk-music',
    slug: 'harlem-walk-music',
    category: 'Culture',
    categoryColor: 'teal',
    kicker: 'Harlesden — 28 March 2026',
    headline: "The plaque, the people, and why Harlesden remembered",
    deck: 'Aswad\'s Tony Gad, The Simmerons, Janet Kay — and a community that showed up to say these names belong on the map.',
    author: 'Judith Fontanelle',
    authorRole: 'Director of Community Engagement',
    date: 'April 2026',
    readTime: '5 min read',
    tags: ['music', 'heritage', 'Harlesden', 'Aswad', 'roots'],
  },
  {
    id: 'stemgeneers-showcase',
    slug: 'stemgeneers-showcase',
    category: 'STEMgeneers',
    categoryColor: 'blue',
    kicker: 'Programme News',
    headline: "These young builders just proved Brent has engineers",
    deck: 'The latest STEMgeneers cohort presented their projects last month. What they built, what they said, and what comes next.',
    author: 'Joystick Editors',
    authorRole: 'Programme Desk',
    date: 'March 2026',
    readTime: '4 min read',
    tags: ['STEM', 'young people', 'engineering', 'Brent', 'STEMgeneers'],
  },
];
 
const CATEGORIES = ['All', 'Cost of Living', "Auntie Anansi's Kitchen", 'Culture', 'STEMgeneers', 'Community'];
 
/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────── */
 
const CategoryPill: React.FC<{ category: string; color: string }> = ({ category, color }) => (
  <span className={`jk-pill jk-pill--${color}`}>{category}</span>
);
 
const FeaturedCard: React.FC<{ article: Article }> = ({ article }) => (
  <article className="jk-featured-card">
    <div className="jk-featured-flag">
      <span className="jk-featured-label">Lead Story</span>
    </div>
    <div className="jk-featured-body">
      <div className="jk-featured-meta">
        <CategoryPill category={article.category} color={article.categoryColor} />
        {article.kicker && <span className="jk-kicker">{article.kicker}</span>}
      </div>
      <h2 className="jk-featured-hed">{article.headline}</h2>
      <p className="jk-featured-dek">{article.deck}</p>
      <div className="jk-featured-footer">
        <div className="jk-byline-block">
          <span className="jk-author">{article.author}</span>
          <span className="jk-author-role">{article.authorRole}</span>
        </div>
        <div className="jk-featured-actions">
          <span className="jk-read-time">{article.readTime}</span>
          <Link to={`/joystick/${article.slug}`} className="jk-btn-read">
            Read the story →
          </Link>
        </div>
      </div>
      {article.sourceCredit && article.sourceUrl && (
        <div className="jk-source-credit">
          Source: <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{article.sourceCredit}</a>
          {' '}— adapted for Joystick
        </div>
      )}
    </div>
  </article>
);
 
const MarketRunCard: React.FC<{ article: Article }> = ({ article }) => (
  <article className="jk-marketrun-card">
    <div className="jk-marketrun-header">
      <span className="jk-spider" aria-hidden="true">🕷</span>
      <div>
        <span className="jk-marketrun-label">Auntie Anansi's Market Run</span>
        <span className="jk-marketrun-sub">New standing feature — April 2026</span>
      </div>
    </div>
    <h3 className="jk-marketrun-hed">{article.headline}</h3>
    <p className="jk-marketrun-dek">{article.deck}</p>
    <div className="jk-marketrun-footer">
      <span className="jk-read-time">{article.readTime}</span>
      <Link to={`/joystick/${article.slug}`} className="jk-btn-gold">
        Read + contribute tips →
      </Link>
    </div>
  </article>
);
 
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  if (article.featured) return <FeaturedCard article={article} />;
  if (article.marketRun) return <MarketRunCard article={article} />;
  return (
    <article className="jk-article-card">
      <div className="jk-article-meta">
        <CategoryPill category={article.category} color={article.categoryColor} />
        <span className="jk-article-date">{article.date}</span>
      </div>
      <h3 className="jk-article-hed">{article.headline}</h3>
      <p className="jk-article-dek">{article.deck}</p>
      <div className="jk-article-footer">
        <span className="jk-author">{article.author}</span>
        <div className="jk-article-actions">
          <span className="jk-read-time">{article.readTime}</span>
          <Link to={`/joystick/${article.slug}`} className="jk-btn-text">
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
};
 
/* ─── PAGE ───────────────────────────────────────────────────────────── */
 
const JoystickPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
 
  const filtered = ARTICLES.filter(a => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      a.headline.toLowerCase().includes(q) ||
      a.deck.toLowerCase().includes(q) ||
      a.tags.some(t => t.includes(q));
    return matchesCat && matchesSearch;
  });
 
  const featured = filtered.find(a => a.featured);
  const marketRun = filtered.find(a => a.marketRun);
  const rest = filtered.filter(a => !a.featured && !a.marketRun);
 
  return (
    <div className="jk-page">
 
      {/* ── MASTHEAD ──────────────────────────────────────────────── */}
      <header className="jk-masthead">
        <div className="jk-masthead-top">
          <div className="jk-masthead-left">
            <span className="jk-issue-label">Wembley Wonders CIC</span>
          </div>
          <div className="jk-masthead-centre">
            <div className="jk-logo-lockup">
              <span className="jk-logo-icon" aria-hidden="true">🕹</span>
              <h1 className="jk-logo">Joystick</h1>
            </div>
            <p className="jk-tagline">The community e-zine for the Forgotten 60%</p>
          </div>
          <div className="jk-masthead-right">
            <span className="jk-issue-label">Issue 3 · April 2026</span>
          </div>
        </div>
        <div className="jk-masthead-rule" />
        <nav className="jk-nav" aria-label="Section navigation">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`jk-nav-btn${activeCategory === cat ? ' jk-nav-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
          <div className="jk-search-wrap">
            <input
              type="search"
              className="jk-search"
              placeholder="Search Joystick…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
        </nav>
      </header>
 
      {/* ── CONTENT ───────────────────────────────────────────────── */}
      <main className="jk-main">
 
        {/* Featured lead */}
        {featured && <FeaturedCard article={featured} />}
 
        {/* Two-col: market run + sidebar */}
        <div className="jk-two-col">
          <div className="jk-col-primary">
            {marketRun && <MarketRunCard article={marketRun} />}
            {rest.slice(0, 2).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
          <aside className="jk-sidebar">
 
            {/* Contribute callout */}
            <div className="jk-sidebar-box jk-sidebar-box--dark">
              <h3 className="jk-sidebar-hed">Write for Joystick</h3>
              <p className="jk-sidebar-body">
                You don't need to be a journalist. You need to know something
                the community needs to know. Story ideas, local tips,
                programme updates, reader letters.
              </p>
              <a href="mailto:admin@wembleywonders.org?subject=Joystick%20submission"
                className="jk-btn-outline">
                Get in touch →
              </a>
            </div>
 
            {/* Market Run tip callout */}
            <div className="jk-sidebar-box jk-sidebar-box--gold">
              <div className="jk-sidebar-spider" aria-hidden="true">🕷</div>
              <h3 className="jk-sidebar-hed">Got a Market Run tip?</h3>
              <p className="jk-sidebar-body">
                Know a cash-and-carry bargain, a brilliant local grocer,
                or a bulk-buy trick that saves your household real money?
                Auntie Anansi wants to hear from you.
              </p>
              <a href="mailto:admin@wembleywonders.org?subject=Market%20Run"
                className="jk-btn-gold-outline">
                Send your tip →
              </a>
            </div>
 
            {/* Past issues */}
            <div className="jk-sidebar-box">
              <h3 className="jk-sidebar-hed">Past issues</h3>
              <ul className="jk-archive-list">
                <li><Link to="/joystick/issue/2" className="jk-archive-link">Issue 2 · January 2026</Link></li>
                <li><Link to="/joystick/issue/1" className="jk-archive-link">Issue 1 · October 2025</Link></li>
              </ul>
            </div>
 
            {/* Programmes cross-link */}
            <div className="jk-sidebar-box jk-sidebar-box--teal">
              <h3 className="jk-sidebar-hed">On the platform</h3>
              <ul className="jk-programme-links">
                <li><Link to="/raydyo" className="jk-prog-link">📻 Rayd-yo</Link></li>
                <li><Link to="/programmes/gtechcasters" className="jk-prog-link">🎙️ G-Tech Casters</Link></li>
                <li><Link to="/programmes/kaywanascourt" className="jk-prog-link">⚖️ Kaywana's Court</Link></li>
                <li><Link to="/programmes/roots" className="jk-prog-link">🌿 Roots</Link></li>
                <li><Link to="/programmes/auntieanansiskitchen" className="jk-prog-link">🕷 Auntie Anansi's Kitchen</Link></li>
              </ul>
            </div>
 
          </aside>
        </div>
 
        {/* Remaining articles */}
        {rest.length > 2 && (
          <section className="jk-more-section">
            <h2 className="jk-section-hed">More from this issue</h2>
            <div className="jk-article-grid">
              {rest.slice(2).map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </section>
        )}
 
        {/* No results */}
        {filtered.length === 0 && (
          <div className="jk-no-results">
            <p>Nothing found for "{searchQuery}" in {activeCategory}.</p>
            <button className="jk-btn-text" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Clear filters
            </button>
          </div>
        )}
 
      </main>
 
      {/* ── FOOTER STRIP ──────────────────────────────────────────── */}
      <footer className="jk-footer-strip">
        <div className="jk-footer-inner">
          <span>Joystick is published by Wembley Wonders CIC · Co. No. 12960817</span>
          <span>
            <a href="mailto:admin@wembleywonders.org">admin@wembleywonders.org</a>
            {' · '}
            <Link to="/editorial-standard">Editorial standards</Link>
          </span>
        </div>
      </footer>
 
    </div>
  );
};
 
export { JoystickPage };
export default JoystickPage;
