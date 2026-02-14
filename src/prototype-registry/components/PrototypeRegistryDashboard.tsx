/**
 * Prototype Registry Dashboard
 * Wembley Wonders CIC - Community Innovation IP System
 * 
 * Main dashboard for viewing and managing community prototypes.
 * Designed with the "industrial workshop" aesthetic - functional,
 * honest materials, clear hierarchy.
 */

import React, { useState, useEffect } from 'react';
import {
  Prototype,
  PrototypeStatus,
  PrototypeCategory,
  ProgrammeSource,
  IPStatus
} from '../types';
import { prototypeRegistry } from '../services/prototypeRegistry';
import styles from './PrototypeRegistryDashboard.module.scss';

// ============================================================================
// TYPES
// ============================================================================

interface DashboardFilters {
  status: PrototypeStatus | 'all';
  category: PrototypeCategory | 'all';
  programme: ProgrammeSource | 'all';
  ipStatus: IPStatus | 'all';
  searchQuery: string;
}

interface DashboardStats {
  total: number;
  inDevelopment: number;
  protected: number;
  inMarketplace: number;
  totalCreators: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const PrototypeRegistryDashboard: React.FC = () => {
  const [prototypes, setPrototypes] = useState<Prototype[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [filters, setFilters] = useState<DashboardFilters>({
    status: 'all',
    category: 'all',
    programme: 'all',
    ipStatus: 'all',
    searchQuery: ''
  });
  const [selectedPrototype, setSelectedPrototype] = useState<Prototype | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    loadPrototypes();
  }, [filters]);

  const loadPrototypes = async () => {
    setLoading(true);
    try {
      const result = await prototypeRegistry.searchPrototypes({
        status: filters.status !== 'all' ? [filters.status] : undefined,
        category: filters.category !== 'all' ? [filters.category] : undefined,
        programme: filters.programme !== 'all' ? [filters.programme] : undefined,
        ipStatus: filters.ipStatus !== 'all' ? [filters.ipStatus] : undefined,
        query: filters.searchQuery || undefined
      });
      setPrototypes(result.prototypes);
      calculateStats(result.prototypes);
    } catch (error) {
      console.error('Failed to load prototypes:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (protos: Prototype[]) => {
    const uniqueCreators = new Set<string>();
    protos.forEach(p => p.creators.forEach(c => uniqueCreators.add(c.id)));

    setStats({
      total: protos.length,
      inDevelopment: protos.filter(p => 
        ['concept', 'research', 'design', 'development', 'testing'].includes(p.status)
      ).length,
      protected: protos.filter(p => 
        ['patent-pending', 'patent-granted', 'design-registered', 'trademarked'].includes(p.ipStatus)
      ).length,
      inMarketplace: protos.filter(p => p.marketplaceStatus === 'listed').length,
      totalCreators: uniqueCreators.size
    });
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>Prototype Registry</h1>
            <p className={styles.subtitle}>
              Community Innovation Tracking & IP Management
            </p>
          </div>
          <div className={styles.headerActions}>
            <button 
              className={styles.primaryButton}
              onClick={() => {/* Open new prototype modal */}}
            >
              <span className={styles.buttonIcon}>+</span>
              Register New Prototype
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {stats && (
        <section className={styles.statsBar}>
          <StatCard 
            label="Total Prototypes" 
            value={stats.total}
            icon="📦"
          />
          <StatCard 
            label="In Development" 
            value={stats.inDevelopment}
            icon="🔧"
            accent="amber"
          />
          <StatCard 
            label="IP Protected" 
            value={stats.protected}
            icon="🛡️"
            accent="emerald"
          />
          <StatCard 
            label="In Marketplace" 
            value={stats.inMarketplace}
            icon="🏪"
            accent="violet"
          />
          <StatCard 
            label="Active Creators" 
            value={stats.totalCreators}
            icon="👥"
            accent="sky"
          />
        </section>
      )}

      {/* Filters */}
      <section className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search prototypes..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(v) => setFilters(f => ({ ...f, status: v as PrototypeStatus | 'all' }))}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'concept', label: 'Concept' },
              { value: 'research', label: 'Research' },
              { value: 'design', label: 'Design' },
              { value: 'development', label: 'Development' },
              { value: 'testing', label: 'Testing' },
              { value: 'documentation', label: 'Documentation' },
              { value: 'review', label: 'Under Review' },
              { value: 'protected', label: 'Protected' },
              { value: 'marketplace', label: 'Marketplace' }
            ]}
          />

          <FilterSelect
            label="Programme"
            value={filters.programme}
            onChange={(v) => setFilters(f => ({ ...f, programme: v as ProgrammeSource | 'all' }))}
            options={[
              { value: 'all', label: 'All Programmes' },
              { value: 'stemgeneers', label: 'STEMgeneers' },
              { value: 'silk-stilettos', label: 'Silk Stilettos' },
              { value: 'techreneurs', label: 'TECHreneurs' },
              { value: 'gtechcasters', label: 'G-Tech Casters' },
              { value: 'bright-sparks', label: 'Bright Sparks' },
              { value: 'trubble-n-bass', label: "Trubble 'n' Bass" },
              { value: 'scrap-cat', label: 'Scrap Cat' },
              { value: 'community-project', label: 'Community Project' }
            ]}
          />

          <FilterSelect
            label="Category"
            value={filters.category}
            onChange={(v) => setFilters(f => ({ ...f, category: v as PrototypeCategory | 'all' }))}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'hardware', label: 'Hardware' },
              { value: 'software', label: 'Software' },
              { value: 'fashion-tech', label: 'Fashion-Tech' },
              { value: 'content', label: 'Content' },
              { value: 'service', label: 'Service Design' },
              { value: 'hybrid', label: 'Hybrid' }
            ]}
          />

          <FilterSelect
            label="IP Status"
            value={filters.ipStatus}
            onChange={(v) => setFilters(f => ({ ...f, ipStatus: v as IPStatus | 'all' }))}
            options={[
              { value: 'all', label: 'All IP Statuses' },
              { value: 'unprotected', label: 'Unprotected' },
              { value: 'disclosure-filed', label: 'Disclosure Filed' },
              { value: 'patent-pending', label: 'Patent Pending' },
              { value: 'patent-granted', label: 'Patent Granted' },
              { value: 'design-registered', label: 'Design Registered' },
              { value: 'open-source', label: 'Open Source' },
              { value: 'creative-commons', label: 'Creative Commons' }
            ]}
          />
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            ▦
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            ☰
          </button>
        </div>
      </section>

      {/* Prototypes Grid/List */}
      <main className={styles.mainContent}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Loading prototypes...</p>
          </div>
        ) : prototypes.length === 0 ? (
          <EmptyState filters={filters} />
        ) : (
          <div className={viewMode === 'grid' ? styles.prototypeGrid : styles.prototypeList}>
            {prototypes.map(prototype => (
              <PrototypeCard
                key={prototype.id}
                prototype={prototype}
                viewMode={viewMode}
                onClick={() => setSelectedPrototype(prototype)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Detail Panel */}
      {selectedPrototype && (
        <PrototypeDetailPanel
          prototype={selectedPrototype}
          onClose={() => setSelectedPrototype(null)}
        />
      )}
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  accent?: 'amber' | 'emerald' | 'violet' | 'sky';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, accent }) => (
  <div className={`${styles.statCard} ${accent ? styles[accent] : ''}`}>
    <span className={styles.statIcon}>{icon}</span>
    <div className={styles.statContent}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  </div>
);

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options }) => (
  <div className={styles.filterSelect}>
    <label className={styles.filterLabel}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.select}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

interface PrototypeCardProps {
  prototype: Prototype;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const PrototypeCard: React.FC<PrototypeCardProps> = ({ prototype, viewMode, onClick }) => (
  <article 
    className={`${styles.prototypeCard} ${styles[viewMode]}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className={styles.cardHeader}>
      <span className={styles.categoryBadge}>{prototype.category}</span>
      <IPStatusBadge status={prototype.ipStatus} />
    </div>
    
    <h3 className={styles.cardTitle}>{prototype.title}</h3>
    <p className={styles.cardDescription}>{prototype.description}</p>
    
    <div className={styles.cardMeta}>
      <span className={styles.programme}>
        {formatProgrammeName(prototype.programme)}
      </span>
      <span className={styles.version}>v{prototype.currentVersion}</span>
    </div>
    
    <div className={styles.cardFooter}>
      <div className={styles.creators}>
        {prototype.creators.slice(0, 3).map((creator: { id: React.Key | null | undefined; name: string | undefined; }, i: any) => (
          <span key={creator.id} className={styles.creatorAvatar} title={creator.name}>
            {creator.name ? creator.name.charAt(0) : ''}
          </span>
        ))}
        {prototype.creators.length > 3 && (
          <span className={styles.creatorMore}>+{prototype.creators.length - 3}</span>
        )}
      </div>
      <StatusBadge status={prototype.status} />
    </div>
  </article>
);

interface IPStatusBadgeProps {
  status: IPStatus;
}

const IPStatusBadge: React.FC<IPStatusBadgeProps> = ({ status }) => {
  const config: Record<IPStatus, { label: string; className: string }> = {
    'unprotected': { label: 'Unprotected', className: styles.ipUnprotected },
    'disclosure-filed': { label: 'Disclosed', className: styles.ipDisclosed },
    'under-review': { label: 'Under Review', className: styles.ipReview },
    'patent-pending': { label: 'Patent Pending', className: styles.ipPending },
    'patent-granted': { label: 'Patented', className: styles.ipGranted },
    'design-registered': { label: 'Design Reg.', className: styles.ipDesign },
    'trademarked': { label: 'Trademarked', className: styles.ipTrademark },
    'copyrighted': { label: 'Copyright', className: styles.ipCopyright },
    'open-source': { label: 'Open Source', className: styles.ipOpenSource },
    'creative-commons': { label: 'CC License', className: styles.ipCC }
  };

  const { label, className } = config[status];

  return <span className={`${styles.ipBadge} ${className}`}>{label}</span>;
};

interface StatusBadgeProps {
  status: PrototypeStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const labels: Record<PrototypeStatus, string> = {
    'concept': 'Concept',
    'research': 'Research',
    'design': 'Design',
    'development': 'Development',
    'testing': 'Testing',
    'documentation': 'Documenting',
    'review': 'Review',
    'protected': 'Protected',
    'marketplace': 'Marketplace',
    'archived': 'Archived'
  };

  return (
    <span className={`${styles.statusBadge} ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

interface EmptyStateProps {
  filters: DashboardFilters;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filters }) => {
  const hasFilters = filters.status !== 'all' || 
                     filters.category !== 'all' || 
                     filters.programme !== 'all' ||
                     filters.searchQuery !== '';

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>📦</div>
      {hasFilters ? (
        <>
          <h3>No prototypes match your filters</h3>
          <p>Try adjusting your search criteria or clearing filters</p>
        </>
      ) : (
        <>
          <h3>No prototypes registered yet</h3>
          <p>Start documenting your first innovation from a workshop or programme</p>
          <button className={styles.primaryButton}>
            Register First Prototype
          </button>
        </>
      )}
    </div>
  );
};

interface PrototypeDetailPanelProps {
  prototype: Prototype;
  onClose: () => void;
}

const PrototypeDetailPanel: React.FC<PrototypeDetailPanelProps> = ({ prototype, onClose }) => (
  <aside className={styles.detailPanel}>
    <div className={styles.panelHeader}>
      <h2>{prototype.title}</h2>
      <button onClick={onClose} className={styles.closeButton}>×</button>
    </div>
    
    <div className={styles.panelContent}>
      <section className={styles.panelSection}>
        <h4>Status</h4>
        <div className={styles.statusRow}>
          <StatusBadge status={prototype.status} />
          <IPStatusBadge status={prototype.ipStatus} />
        </div>
      </section>

      <section className={styles.panelSection}>
        <h4>Description</h4>
        <p>{prototype.description}</p>
      </section>

      <section className={styles.panelSection}>
        <h4>Creators ({prototype.creators.length})</h4>
        <ul className={styles.creatorList}>
          {prototype.creators.map((creator: {
            id: string;
            name: string;
            role: string;
            contributionPercentage: number;
          }) => (
            <li key={creator.id} className={styles.creatorItem}>
              <span className={styles.creatorName}>{creator.name}</span>
              <span className={styles.creatorRole}>{creator.role}</span>
              <span className={styles.creatorContribution}>{creator.contributionPercentage}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.panelSection}>
        <h4>Version History</h4>
        <div className={styles.versionTimeline}>
          {prototype.iterations.map((iteration) => (
            <div key={iteration.id} className={styles.versionEntry}>
              <span className={styles.versionNumber}>v{iteration.version}</span>
              <span className={styles.versionTitle}>{iteration.title}</span>
              <span className={styles.versionDate}>
                {new Date(iteration.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.panelSection}>
        <h4>Ownership Model</h4>
        <div className={styles.ownershipBreakdown}>
          <div className={styles.ownershipBar}>
            <div 
              className={styles.creatorShare}
              style={{ width: `${100 - prototype.communityContribution}%` }}
            />
            <div 
              className={styles.communityShare}
              style={{ width: `${prototype.communityContribution}%` }}
            />
          </div>
          <div className={styles.ownershipLabels}>
            <span>Creators: {100 - prototype.communityContribution}%</span>
            <span>Community: {prototype.communityContribution}%</span>
          </div>
        </div>
      </section>

      <div className={styles.panelActions}>
        <button className={styles.secondaryButton}>View Full Details</button>
        <button className={styles.primaryButton}>Manage Prototype</button>
      </div>
    </div>
  </aside>
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatProgrammeName(programme: ProgrammeSource): string {
  const names: Record<ProgrammeSource, string> = {
    'stemgeneers': 'STEMgeneers',
    'silk-stilettos': 'Silk Stilettos',
    'techreneurs': 'TECHreneurs',
    'gtechcasters': 'G-Tech Casters',
    'bright-sparks': 'Bright Sparks',
    'trubble-n-bass': "Trubble 'n' Bass",
    'kaywanas-court': "Kaywana's Court",
    'pageturners': 'Pageturners',
    'auntie-anansis-kitchen': "Auntie Anansi's Kitchen",
    'scrap-cat': 'Scrap Cat',
    'money-reset': 'Money Reset',
    'community-project': 'Community Project',
    'independent': 'Independent'
  };
  return names[programme] || programme;
}

export default PrototypeRegistryDashboard;