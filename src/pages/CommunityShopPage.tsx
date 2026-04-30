import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import DraggableMaya from '../components/maya/DraggableMaya';
import {
  CATEGORIES,
  PRODUCTS,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  type CyberstoreProduct,
  type CyberstoreCategory,
} from '../data/cyberstoreData';
import styles from './CommunityShopPage.module.css';

// ============================================================
// CommunityShopPage.tsx — The Wembley Wonders Cyberstore
// Shelf model: Department → Shelf → Product
// Maplin/Currys: you always know which room you're in
// ============================================================

// ── Provenance panel ─────────────────────────────────────────
const ProvenancePanel: React.FC<{ product: CyberstoreProduct }> = ({ product }) => (
  <div className={styles.provenance}>
    <div className={styles.provenanceHeader}>
      <span className={styles.provenanceLabel}>Provenance record</span>
      <span className={styles.creatorShare}>55% to maker</span>
    </div>
    <div className={styles.provenanceBody}>
      {([
        ['Maker',     product.provenance.maker],
        ['Origin',    product.provenance.origin],
        ['Lineage',   product.provenance.lineage],
        ['Programme', product.provenance.programme],
        ['Developed', product.provenance.developed],
        ...(product.provenance.archive ? [['Archive', product.provenance.archive]] : []),
      ] as [string,string][]).map(([key, val]) => (
        <div key={key} className={styles.provenanceLine}>
          <span className={styles.provenanceKey}>{key}</span>
          <span className={styles.provenanceVal}>{val}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Product card ──────────────────────────────────────────────
const ProductCard: React.FC<{
  product:        CyberstoreProduct;
  categoryColour: string;
  expanded:       boolean;
  onToggle:       () => void;
}> = ({ product, categoryColour, expanded, onToggle }) => (
  <div
    className={`${styles.productCard} ${expanded ? styles.expanded : ''}`}
    style={{ '--cat-colour': categoryColour } as React.CSSProperties}
  >
    {product.featured && <span className={styles.featuredBadge}>Featured</span>}
    {product.status === 'coming-soon' && <span className={styles.soonBadge}>Coming soon</span>}

    <div className={styles.productMeta}>
      <span className={styles.productSubcat}>{product.subcategory}</span>
      <span className={styles.productPrice}>£{product.price.toFixed(2)}</span>
    </div>
    <h3 className={styles.productName}>{product.name}</h3>
    <p className={styles.productDesc}>{product.description}</p>
    <div className={styles.productTags}>
      {product.tags.slice(0, 3).map(t => <span key={t} className={styles.tag}>{t}</span>)}
    </div>
    <button className={styles.provenanceToggle} style={{ color: categoryColour }} onClick={onToggle}>
      {expanded ? 'Hide provenance ↑' : 'View provenance ↓'}
    </button>
    {expanded && <ProvenancePanel product={product} />}
    <div className={styles.productActions}>
      {product.status === 'available'
        ? <button className={styles.buyBtn} style={{ background: categoryColour }}>
            Add to basket — £{product.price.toFixed(2)}
          </button>
        : <button className={styles.notifyBtn}>Notify me when available</button>
      }
      <span className={styles.unitLabel}>{product.unit}</span>
    </div>
  </div>
);

// ── Shelf ─────────────────────────────────────────────────────
const Shelf: React.FC<{
  label:          string;
  products:       CyberstoreProduct[];
  categoryColour: string;
  expandedId:     string | null;
  onToggle:       (id: string) => void;
}> = ({ label, products, categoryColour, expandedId, onToggle }) => {
  if (products.length === 0) return (
    <div className={styles.shelf}>
      <div className={styles.shelfHeader}>
        <span className={styles.shelfLabel} style={{ color: categoryColour }}>{label}</span>
        <div className={styles.shelfRule} style={{ background: `linear-gradient(to right, ${categoryColour}30, transparent)` }} />
        <span className={styles.shelfCount}>coming soon</span>
      </div>
      <div className={styles.shelfEmpty}>
        Products from this shelf are in development. Join the feeding programme to contribute.
      </div>
    </div>
  );

  return (
    <div className={styles.shelf}>
      <div className={styles.shelfHeader}>
        <span className={styles.shelfLabel} style={{ color: categoryColour }}>{label}</span>
        <div className={styles.shelfRule} style={{ background: `linear-gradient(to right, ${categoryColour}30, transparent)` }} />
        <span className={styles.shelfCount}>{products.length} item{products.length !== 1 ? 's' : ''}</span>
      </div>
      <div className={styles.shelfProducts}>
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            categoryColour={categoryColour}
            expanded={expandedId === p.id}
            onToggle={() => onToggle(p.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ── Department ────────────────────────────────────────────────
const Department: React.FC<{
  category:     CyberstoreCategory;
  products:     CyberstoreProduct[];
  expandedId:   string | null;
  onToggle:     (id: string) => void;
  isOpen:       boolean;
  onToggleDept: () => void;
}> = ({ category, products, expandedId, onToggle, isOpen, onToggleDept }) => {
  const bySubcat = category.subcategories.reduce<Record<string, CyberstoreProduct[]>>(
    (acc, sub) => { acc[sub] = products.filter(p => p.subcategory === sub); return acc; },
    {}
  );
  const total = products.length;

  return (
    <div
      className={`${styles.department} ${isOpen ? styles.departmentOpen : ''}`}
      style={{ '--cat-colour': category.colour } as React.CSSProperties}
      id={`dept-${category.id}`}
    >
      {/* Department sign — the aisle header */}
      <button className={styles.deptHeader} onClick={onToggleDept}>
        <div className={styles.deptHeaderLeft}>
          <span className={styles.deptIcon}>{category.icon}</span>
          <div className={styles.deptTitles}>
            <span className={styles.deptName}>{category.name}</span>
            <span className={styles.deptTagline}>{category.tagline}</span>
          </div>
        </div>
        <div className={styles.deptHeaderRight}>
          {category.programme && (
            <span className={styles.deptProgramme}>via {category.programme}</span>
          )}
          <span className={styles.deptCount}>
            {total > 0 ? `${total} item${total !== 1 ? 's' : ''}` : 'Coming soon'}
          </span>
          <span className={styles.deptChevron}>{isOpen ? '↑' : '↓'}</span>
        </div>
      </button>

      {isOpen && (
        <div className={styles.deptBody}>
          <p className={styles.deptDesc}>{category.description}</p>
          {category.programme && (
            <div className={styles.deptProgrammeLink}>
              <span>Products from:</span>
              <Link to="/programmes" className={styles.programmePill} style={{ color: category.colour }}>
                {category.programme} →
              </Link>
            </div>
          )}
          {/* Shelves within the department */}
          <div className={styles.shelves}>
            {category.subcategories.map(sub => (
              <Shelf
                key={sub}
                label={sub}
                products={bySubcat[sub] || []}
                categoryColour={category.colour}
                expandedId={expandedId}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Store directory / floor plan ──────────────────────────────
const StoreDirectory: React.FC<{
  openDepts: Set<string>;
  onJumpTo:  (id: string) => void;
}> = ({ openDepts, onJumpTo }) => (
  <div className={styles.storeDirectory}>
    <div className={styles.directoryLabel}>Store directory</div>
    <div className={styles.directoryGrid}>
      {CATEGORIES.map(cat => {
        const count = getProductsByCategory(cat.id).length;
        return (
          <button
            key={cat.id}
            className={`${styles.directoryItem} ${openDepts.has(cat.id) ? styles.directoryOpen : ''}`}
            style={{ '--cat-colour': cat.colour } as React.CSSProperties}
            onClick={() => onJumpTo(cat.id)}
          >
            <span className={styles.directoryIcon}>{cat.icon}</span>
            <span className={styles.directoryName}>{cat.name}</span>
            <span className={styles.directoryCount}>{count || '·'}</span>
          </button>
        );
      })}
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────
const CommunityShopPage: React.FC = () => {
  const [openDepts, setOpenDepts]     = useState<Set<string>>(new Set(['food-heritage']));
  const [expandedProduct, setExpanded]= useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CyberstoreProduct[] | null>(null);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setSearchResults(q.trim().length > 1 ? searchProducts(q) : null);
  };

  const handleJumpTo = (id: string) => {
    setOpenDepts(prev => { const n = new Set(prev); n.add(id); return n; });
    setTimeout(() => {
      document.getElementById(`dept-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleToggleDept = (id: string) => {
    setOpenDepts(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleToggleProduct = (id: string) =>
    setExpanded(prev => prev === id ? null : id);

  const getCategoryColour = (catId: string) =>
    CATEGORIES.find(c => c.id === catId)?.colour ?? '#d4a853';

  return (
    <PageTemplate
      pageTitle="The Cyberstore"
      pageStrapline="A provenance market. Every wonder carries its maker's story."
      pageGuide="Eleven departments. Every item documented, attributed, and priced to sustain the person who made it."
      pageType="standard"
    >
      <div className={styles.cyberstore}>

        {/* Philosophy strip */}
        <div className={styles.philosophyStrip}>
          {[['55%','stays with the maker'],['25%','builds the next wonder'],['20%','protects the infrastructure'],['0%','extracted']].map(([n,l],i,arr) => (
            <React.Fragment key={n}>
              <div className={styles.philosophyItem}>
                <span className={styles.philosophyNum}>{n}</span>
                <span className={styles.philosophyLabel}>{l}</span>
              </div>
              {i < arr.length - 1 && <div className={styles.philosophySep} />}
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by maker, lineage, culture, programme..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && <button className={styles.searchClear} onClick={() => handleSearch('')}>×</button>}
        </div>

        {/* Search results */}
        {searchResults !== null && (
          <div className={styles.searchResults}>
            <div className={styles.searchResultsHeader}>
              <span>{searchResults.length} wonder{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
              <button className={styles.clearSearchBtn} onClick={() => handleSearch('')}>Clear search</button>
            </div>
            <div className={styles.searchResultsGrid}>
              {searchResults.length > 0
                ? searchResults.map(p => (
                    <ProductCard key={p.id} product={p}
                      categoryColour={getCategoryColour(p.category)}
                      expanded={expandedProduct === p.id}
                      onToggle={() => handleToggleProduct(p.id)} />
                  ))
                : <p className={styles.noResults}>No wonders found. Try culture, lineage, or programme name.</p>
              }
            </div>
          </div>
        )}

        {!searchResults && (
          <>
            {/* Store directory — the floor plan */}
            <StoreDirectory openDepts={openDepts} onJumpTo={handleJumpTo} />

            {/* Featured wonders */}
            <div className={styles.featuredSection}>
              <div className={styles.featuredHeader}>
                <span className={styles.featuredLabel}>✨ Featured wonders</span>
                <div className={styles.featuredRule} />
              </div>
              <div className={styles.featuredGrid}>
                {getFeaturedProducts().map(p => (
                  <ProductCard key={p.id} product={p}
                    categoryColour={getCategoryColour(p.category)}
                    expanded={expandedProduct === p.id}
                    onToggle={() => handleToggleProduct(p.id)} />
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className={styles.departments}>
              {CATEGORIES.map(cat => (
                <Department
                  key={cat.id}
                  category={cat}
                  products={getProductsByCategory(cat.id)}
                  expandedId={expandedProduct}
                  onToggle={handleToggleProduct}
                  isOpen={openDepts.has(cat.id)}
                  onToggleDept={() => handleToggleDept(cat.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Contribute CTA */}
        <div className={styles.contributeCta}>
          <div className={styles.contributeLeft}>
            <h3 className={styles.contributeTitle}>The infrastructure is digital. The room is wherever you are.</h3>
            <p className={styles.contributeBody}>
              What you carry — the recipe, the technique, the music, the knowledge nobody else holds
              in exactly your combination — belongs on these shelves. 55% yours. Your name on it.
              Your provenance documented permanently.
            </p>
          </div>
          <div className={styles.contributeActions}>
            <Link to="/programmes" className={styles.contributeBtn}>Find your programme →</Link>
            <Link to="/auth/signup" className={styles.contributeBtnSecondary}>Join free</Link>
          </div>
        </div>

      </div>

      <DraggableMaya
        membershipTier="visitor"
        pageType="shop"
        pageContext={{ title: "G-Tech Cyberstore", section: "marketplace", contentType: "provenance-market" }}
      />
    </PageTemplate>
  );
};

export default CommunityShopPage;
