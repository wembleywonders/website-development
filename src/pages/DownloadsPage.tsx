import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, FileText, Image, Music, Video, BookOpen, 
  Wrench, Calculator, Search, Filter, Lock
} from 'lucide-react';
import PageTemplate from '../components/PageTemplate';
import './PlaceholderPages.css';

/**
 * Downloads Page
 * ==============
 * 
 * Central hub for all downloadable resources.
 * Worksheets, guides, templates, checklists.
 * Some free, some members-only.
 */

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: string;
  format: string;
  fileSize: string;
  pathway: string;
  membersOnly: boolean;
  downloadUrl: string;
  icon: string;
}

const DOWNLOADS: DownloadItem[] = [
  // FREE RESOURCES
  {
    id: 'repair-checklist-phones',
    title: 'Phone Repair Diagnostic Checklist',
    description: 'Step-by-step checklist for diagnosing common phone problems before ordering parts.',
    category: 'Checklists',
    format: 'PDF',
    fileSize: '245 KB',
    pathway: 'STEMgeneers',
    membersOnly: false,
    downloadUrl: '/downloads/repair-checklist-phones.pdf',
    icon: '📋'
  },
  {
    id: 'recipe-template',
    title: 'Heritage Recipe Template',
    description: 'Document family recipes with space for stories, variations, and tips.',
    category: 'Templates',
    format: 'PDF',
    fileSize: '180 KB',
    pathway: "Auntie's Kitchen",
    membersOnly: false,
    downloadUrl: '/downloads/recipe-template.pdf',
    icon: '🍲'
  },
  {
    id: 'business-canvas',
    title: 'Quick Business Canvas',
    description: 'One-page business model template. No jargon, just clarity.',
    category: 'Templates',
    format: 'PDF',
    fileSize: '320 KB',
    pathway: 'TECHreneurs',
    membersOnly: false,
    downloadUrl: '/downloads/business-canvas.pdf',
    icon: '💼'
  },
  {
    id: 'streaming-checklist',
    title: 'Streaming Pre-Flight Checklist',
    description: 'Never forget to unmute again. Pre-stream checklist for OBS, audio, and graphics.',
    category: 'Checklists',
    format: 'PDF',
    fileSize: '150 KB',
    pathway: 'G-Tech Casters',
    membersOnly: false,
    downloadUrl: '/downloads/streaming-checklist.pdf',
    icon: '📺'
  },
  {
    id: 'script-format-guide',
    title: 'Radio Drama Script Format Guide',
    description: 'How to format scripts for radio drama with sound cues and timing notes.',
    category: 'Guides',
    format: 'PDF',
    fileSize: '420 KB',
    pathway: "Kaywana's Court",
    membersOnly: false,
    downloadUrl: '/downloads/script-format-guide.pdf',
    icon: '🎭'
  },
  
  // MEMBERS ONLY
  {
    id: 'pricing-guide-london',
    title: 'London Service Pricing Guide 2025',
    description: 'Comprehensive pricing research for tech repair, setup, and creative services.',
    category: 'Guides',
    format: 'PDF',
    fileSize: '1.2 MB',
    pathway: 'STEMgeneers',
    membersOnly: true,
    downloadUrl: '/downloads/pricing-guide-london.pdf',
    icon: '💷'
  },
  {
    id: 'pardner-agreement',
    title: 'Equipment Collective Agreement Template',
    description: 'Legal-ready template for forming a pardner-style equipment sharing group.',
    category: 'Templates',
    format: 'DOCX',
    fileSize: '85 KB',
    pathway: 'TECHreneurs',
    membersOnly: true,
    downloadUrl: '/downloads/pardner-agreement.docx',
    icon: '🤝'
  },
  {
    id: 'oral-history-prompts',
    title: 'Oral History Interview Prompts',
    description: '50+ prompts for interviewing elders about heritage, food, music, and migration.',
    category: 'Guides',
    format: 'PDF',
    fileSize: '380 KB',
    pathway: 'Pageturners',
    membersOnly: true,
    downloadUrl: '/downloads/oral-history-prompts.pdf',
    icon: '🎤'
  },
  {
    id: 'music-contracts-pack',
    title: 'Music Collaboration Contracts Pack',
    description: 'Split sheets, collaboration agreements, and licensing templates.',
    category: 'Templates',
    format: 'ZIP',
    fileSize: '2.1 MB',
    pathway: 'Trubble n Bass',
    membersOnly: true,
    downloadUrl: '/downloads/music-contracts.zip',
    icon: '🎵'
  },
  {
    id: 'fashion-tech-pack',
    title: 'Pattern Grading & Tech Pack Template',
    description: 'Industry-standard templates for garment specifications and sizing.',
    category: 'Templates',
    format: 'ZIP',
    fileSize: '4.5 MB',
    pathway: 'Silk Stilettos',
    membersOnly: true,
    downloadUrl: '/downloads/fashion-tech-pack.zip',
    icon: '👠'
  },
  {
    id: 'production-cue-sheet',
    title: 'Production Cue Sheet Template',
    description: 'Sound and lighting cue sheets for live theatre productions.',
    category: 'Templates',
    format: 'XLSX',
    fileSize: '125 KB',
    pathway: "Kaywana's Court",
    membersOnly: true,
    downloadUrl: '/downloads/production-cue-sheet.xlsx',
    icon: '🎚️'
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'Checklists', label: 'Checklists' },
  { id: 'Templates', label: 'Templates' },
  { id: 'Guides', label: 'Guides' },
];

const DownloadsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMembersOnly, setShowMembersOnly] = useState<'all' | 'free' | 'members'>('all');

  const filteredDownloads = DOWNLOADS.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    const matchesAccess = 
      showMembersOnly === 'all' ||
      (showMembersOnly === 'free' && !item.membersOnly) ||
      (showMembersOnly === 'members' && item.membersOnly);
    
    return matchesSearch && matchesCategory && matchesAccess;
  });

  const freeCount = DOWNLOADS.filter(d => !d.membersOnly).length;
  const membersCount = DOWNLOADS.filter(d => d.membersOnly).length;

  return (
    <PageTemplate
      pageTitle="Downloads"
      pageStrapline="Worksheets, guides, and templates — take them offline"
      pageType="community"
    >
      <div className="placeholder-page downloads-page">
        
        {/* Header */}
        <header className="page-header">
          <div className="header-icon">
            <Download size={48} />
          </div>
          <h1>Resources & Downloads</h1>
          <p>
            Worksheets, templates, and guides you can use offline. 
            Print them, share them, make them your own.
          </p>
          <div className="download-stats">
            <span className="stat">{freeCount} free resources</span>
            <span className="stat">{membersCount} members-only</span>
          </div>
        </header>

        {/* Search & Filters */}
        <section className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Access:</label>
            <select
              value={showMembersOnly}
              onChange={(e) => setShowMembersOnly(e.target.value as 'all' | 'free' | 'members')}
            >
              <option value="all">All Resources</option>
              <option value="free">Free Only</option>
              <option value="members">Members Only</option>
            </select>
          </div>
        </section>

        {/* Downloads Grid */}
        <section className="content-section">
          {filteredDownloads.length === 0 ? (
            <div className="no-results">
              <p>No resources match your search. Try different keywords.</p>
              <button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowMembersOnly('all');
              }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="downloads-grid">
              {filteredDownloads.map(item => (
                <div 
                  key={item.id} 
                  className={`download-card ${item.membersOnly ? 'members-only' : ''}`}
                >
                  {item.membersOnly && (
                    <div className="members-badge">
                      <Lock size={14} />
                      <span>Members</span>
                    </div>
                  )}
                  
                  <div className="download-icon">{item.icon}</div>
                  
                  <div className="download-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  
                  <div className="download-meta">
                    <span className="meta-format">{item.format}</span>
                    <span className="meta-size">{item.fileSize}</span>
                    <span className="meta-pathway">{item.pathway}</span>
                  </div>
                  
                  {item.membersOnly ? (
                    <Link to="/membership" className="download-btn locked">
                      <Lock size={16} />
                      Join to Download
                    </Link>
                  ) : (
                    <a 
                      href={item.downloadUrl} 
                      className="download-btn"
                      download
                    >
                      <Download size={16} />
                      Download Free
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Request Resources */}
        <section className="page-cta">
          <FileText size={32} />
          <h2>Need Something Specific?</h2>
          <p>
            Can't find what you're looking for? Passionistas can request new resources 
            or contribute their own templates to the library.
          </p>
          <div className="cta-buttons">
            <Link to="/membership" className="cta-btn primary">
              Become a Passionista
            </Link>
            <Link to="/workshops/spark-generator" className="cta-btn secondary">
              Try Tools First
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default DownloadsPage;