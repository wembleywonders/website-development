// src/components/creators-journal/BadgeProgress.tsx
// Member badge progression — four session types, four quality grades,
// ROV-specific assessment records, elder knowledge credentials,
// provenance chain display, peer nomination layer.
// Sits inside the Creator's Journal alongside ROVActivityFeed and ImpactDashboard.

import React, { useState, useEffect } from 'react';
import './BadgeProgress.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SessionType = 'presence' | 'collab' | 'production' | 'governance';
export type QualityGrade = 'documented' | 'practitioner' | 'referenced' | 'market-validated';
export type BadgeTier = 'connector' | 'curator' | 'champion';
export type VerificationMethod = 'maya-confirmed' | 'mutual-attestation' | 'rov-assessed';

export interface SessionRecord {
  id: string;
  type: SessionType;
  programme: string;
  durationMins: number;          // 95 min floor
  date: string;
  verification: VerificationMethod;
  rovPresent?: string;            // ROV name if present
  qualityGrade?: QualityGrade;
  collaborators?: string[];       // member IDs for collab sessions
  provenanceLinks?: string[];     // product/entry IDs this session contributed to
  iterationOf?: string;           // session ID if this is a retry/iteration
  elderKnowledge?: boolean;       // Nana-flagged elder transmission
  crossCultural?: boolean;        // Amara-flagged cross-cultural exchange
  refusal?: boolean;              // member declined below-floor opportunity
}

export interface ROVAssessment {
  rovName: string;
  rovEmoji: string;
  domain: string;
  grade: QualityGrade;
  note: string;
  date: string;
}

export interface PeerNomination {
  type: 'bridge-builder' | 'elder-knowledge' | 'curator' | 'resilience' | 'accessibility' | 'financial-generosity';
  nominatedBy: string[];
  programmes: string[];           // must span 2+ programmes
  confirmed: boolean;
  date: string;
}

export interface BadgeRecord {
  memberId: string;
  memberName: string;
  currentTier: BadgeTier;
  covenantScore: number;
  sessions: SessionRecord[];
  rovAssessments: ROVAssessment[];
  peerNominations: PeerNomination[];
  rotationBadges: string[];       // programme-specific badges earned
  credentials: string[];          // ILP phases, external engagements
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SESSION_FLOORS: Record<SessionType, { label: string; colour: string; icon: string; desc: string }> = {
  presence:   { label: 'Presence',   colour: '#3b82f6', icon: '📅', desc: '95 min engaged programme session' },
  collab:     { label: 'Collab',     colour: '#8b5cf6', icon: '🤝', desc: 'Real-time session with another member. Mutually attested or ROV-confirmed.' },
  production: { label: 'Production', colour: '#f59e0b', icon: '✏️',  desc: 'Verifiable output produced. Archive entry, podcast, listing, contribution.' },
  governance: { label: 'Governance', colour: '#4A6741', icon: '⚖️',  desc: 'Held something for others. AGM, peer panel, mentoring, whistleblower review.' },
};

const QUALITY_GRADES: Record<QualityGrade, { label: string; colour: string; desc: string }> = {
  'documented':       { label: 'Documented',       colour: '#64748b', desc: 'Output exists and is recorded.' },
  'practitioner':     { label: 'Practitioner',     colour: '#3b82f6', desc: 'Peer-reviewed by a member with relevant expertise or ROV-confirmed.' },
  'referenced':       { label: 'Referenced',       colour: '#f59e0b', desc: 'Used by another member as a production input. Provenance link exists.' },
  'market-validated': { label: 'Market-validated', colour: '#4A6741', desc: 'Contributed to a verified economic outcome at or above the ROV benchmark.' },
};

const TIER_REQUIREMENTS: Record<BadgeTier, { label: string; colour: string; icon: string; presence: number; collab: number; production: number; governance: number; crossProgramme: number; knowledgeCommons: number; desc: string }> = {
  connector: {
    label: 'Connector', colour: '#3b82f6', icon: '🔗',
    presence: 12, collab: 0, production: 0, governance: 0, crossProgramme: 0, knowledgeCommons: 0,
    desc: '12 sessions (presence or collab) across any programmes. Member sets the pace.',
  },
  curator: {
    label: 'Curator', colour: '#8b5cf6', icon: '🗂️',
    presence: 24, collab: 3, production: 6, governance: 0, crossProgramme: 2, knowledgeCommons: 1,
    desc: '24 presence/collab sessions + 6 production sessions + 3 collabs across 2+ programmes + 1 Knowledge Commons contribution.',
  },
  champion: {
    label: 'Champion', colour: '#4A6741', icon: '🏆',
    presence: 48, collab: 8, production: 18, governance: 4, crossProgramme: 3, knowledgeCommons: 0,
    desc: '48 presence/collab + 18 production + 4 governance sessions spanning 2 AGM cycles + 8 collabs across 3+ programmes. Flourishing band sustained across 24 consecutive sessions.',
  },
};

const ROV_ROSTER = [
  { name: 'Aya',    emoji: '🧿', domain: 'Knowledge keeper · Community elder register' },
  { name: 'Kwame',  emoji: '💰', domain: 'Financial literacy · Economic architecture' },
  { name: 'Zora',   emoji: '🎨', domain: 'Creative practice · Cultural production' },
  { name: 'Iris',   emoji: '🌼', domain: 'Body sovereignty · Health literacy' },
  { name: 'Marcus', emoji: '⚖️',  domain: 'Governance · Civic participation' },
  { name: 'Nana',   emoji: '🧓', domain: 'Intergenerational knowledge · Heritage' },
  { name: 'Seren',  emoji: '🔬', domain: 'STEM · Technology literacy' },
  { name: 'Jomo',   emoji: '📊', domain: 'Enterprise · Market literacy' },
  { name: 'Amara',  emoji: '🌐', domain: 'Community connection · Cross-cultural bridge-building' },
];

const PEER_NOMINATION_TYPES: Record<string, { label: string; icon: string; desc: string }> = {
  'bridge-builder':        { label: 'Bridge Builder',       icon: '🌉', desc: 'Connects communities that don’t naturally find each other.' },
  'elder-knowledge':       { label: 'Elder Knowledge',      icon: '🧓', desc: 'Carries and transmits knowledge that predates the platform.' },
  'curator':               { label: 'Community Curator',    icon: '🗂️', desc: 'Surfaces, organises and amplifies others’ work.' },
  'resilience':            { label: 'Resilient Presence',   icon: '🌿', desc: 'Maintained contribution through personal difficulty.' },
  'accessibility':         { label: 'Access Champion',      icon: '♿',  desc: 'Makes the platform more navigable for members with different access needs.' },
  'financial-generosity':  { label: 'Financial Generosity', icon: '🤍', desc: 'Contributes beyond obligation. Sliding scale. Early pardner hand repayment.' },
};

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEMO_RECORD: BadgeRecord = {
  memberId: 'demo-001',
  memberName: 'Judith Fontanelle',
  currentTier: 'curator',
  covenantScore: 78,
  sessions: [
    { id: 's1', type: 'presence', programme: 'Roots', durationMins: 95, date: '2026-01-15', verification: 'maya-confirmed' },
    { id: 's2', type: 'collab', programme: 'Roots', durationMins: 110, date: '2026-01-22', verification: 'rov-assessed', rovPresent: 'Nana', elderKnowledge: true, collaborators: ['trichologist-001'] },
    { id: 's3', type: 'production', programme: 'Roots', durationMins: 120, date: '2026-02-01', verification: 'rov-assessed', rovPresent: 'Iris', qualityGrade: 'practitioner', provenanceLinks: ['archive-hair-care-001'] },
    { id: 's4', type: 'production', programme: 'Rayd-yo', durationMins: 95, date: '2026-02-10', verification: 'mutual-attestation', qualityGrade: 'documented', provenanceLinks: ['podcast-ep-001'] },
    { id: 's5', type: 'collab', programme: 'Roots', durationMins: 95, date: '2026-02-18', verification: 'rov-assessed', rovPresent: 'Amara', crossCultural: true, collaborators: ['member-accra-001'] },
    { id: 's6', type: 'governance', programme: 'Platform', durationMins: 95, date: '2026-03-01', verification: 'maya-confirmed' },
    { id: 's7', type: 'production', programme: 'Roots', durationMins: 140, date: '2026-03-10', verification: 'rov-assessed', rovPresent: 'Kwame', qualityGrade: 'market-validated', provenanceLinks: ['cyberstore-remedy-001'] },
    { id: 's8', type: 'presence', programme: 'Bright Sparks', durationMins: 95, date: '2026-03-15', verification: 'maya-confirmed' },
    { id: 's9', type: 'production', programme: 'Roots', durationMins: 95, date: '2026-03-20', verification: 'rov-assessed', rovPresent: 'Nana', qualityGrade: 'referenced', elderKnowledge: true },
    { id: 's10', type: 'presence', programme: 'Roots', durationMins: 95, date: '2026-03-25', verification: 'mutual-attestation', refusal: true },
  ],
  rovAssessments: [
    { rovName: 'Nana', rovEmoji: '🧓', domain: 'Intergenerational knowledge', grade: 'practitioner', note: 'Elder knowledge transmission confirmed. Trichologist consultation documented for archive provenance.', date: '2026-01-22' },
    { rovName: 'Iris', rovEmoji: '🌼', domain: 'Body sovereignty', grade: 'practitioner', note: 'Knowledge Commons entry meets Research evidence grade. Clinical accuracy confirmed against trichologist consultation.', date: '2026-02-01' },
    { rovName: 'Kwame', rovEmoji: '💰', domain: 'Financial literacy', grade: 'market-validated', note: 'Apothecary listing priced at market rate. Gap between cost-based (£30) and market-validated (£85) rate identified and addressed.', date: '2026-03-10' },
    { rovName: 'Amara', rovEmoji: '🌐', domain: 'Cross-cultural bridge-building', grade: 'practitioner', note: 'Cross-geography collab confirmed. Genuine cultural exchange between Wembley and Accra contexts documented.', date: '2026-02-18' },
  ],
  peerNominations: [
    { type: 'elder-knowledge', nominatedBy: ['Flora Agba', 'Natalie'], programmes: ['Roots', 'Rayd-yo'], confirmed: true, date: '2026-03-01' },
    { type: 'bridge-builder', nominatedBy: ['member-accra-001', 'Flora Agba', 'Natalie'], programmes: ['Roots', 'Rayd-yo', 'Bright Sparks'], confirmed: true, date: '2026-03-20' },
  ],
  rotationBadges: ['Roots Apothecary', 'Rayd-yo Broadcaster'],
  credentials: ['ILP Phase 1 Complete', 'Halo Code Consultancy — Marcus confirmed', 'External opportunity engaged — floor held'],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const TierCard: React.FC<{ tier: BadgeTier; current: BadgeTier; record: BadgeRecord }> = ({ tier, current, record }) => {
  const req = TIER_REQUIREMENTS[tier];
  const presenceCount = record.sessions.filter(s => s.type === 'presence' || s.type === 'collab').length;
  const collabCount = record.sessions.filter(s => s.type === 'collab').length;
  const productionCount = record.sessions.filter(s => s.type === 'production').length;
  const governanceCount = record.sessions.filter(s => s.type === 'governance').length;
  const programmes = [...new Set(record.sessions.filter(s => s.type === 'collab').map(s => s.programme))];
  const crossProgramme = programmes.length;
  const knowledgeCommons = record.sessions.filter(s => s.type === 'production' && s.provenanceLinks?.some(l => l.startsWith('archive-'))).length;
  const isActive = tier === current;
  const isComplete = (
    presenceCount >= req.presence &&
    collabCount >= req.collab &&
    productionCount >= req.production &&
    governanceCount >= req.governance &&
    crossProgramme >= req.crossProgramme &&
    knowledgeCommons >= req.knowledgeCommons
  );

  const bars = [
    { label: 'Presence/Collab', count: presenceCount, req: req.presence, colour: '#3b82f6' },
    ...(req.collab > 0 ? [{ label: 'Collab (cross-programme)', count: collabCount, req: req.collab, colour: '#8b5cf6' }] : []),
    ...(req.production > 0 ? [{ label: 'Production', count: productionCount, req: req.production, colour: '#f59e0b' }] : []),
    ...(req.governance > 0 ? [{ label: 'Governance', count: governanceCount, req: req.governance, colour: '#4A6741' }] : []),
  ];

  return (
    <div className={"bp-tier-card" + (isActive ? " bp-tier-card--active" : "") + (isComplete ? " bp-tier-card--complete" : "")}
      style={{ "--bp-tier-colour": req.colour } as React.CSSProperties}>
      <div className="bp-tier-card__header">
        <span className="bp-tier-card__icon">{req.icon}</span>
        <div>
          <h3 className="bp-tier-card__name">{req.label}</h3>
          {isActive && <span className="bp-tier-card__status">Current tier</span>}
          {isComplete && !isActive && <span className="bp-tier-card__status bp-tier-card__status--complete">Complete</span>}
        </div>
      </div>
      <p className="bp-tier-card__desc">{req.desc}</p>
      <div className="bp-tier-bars">
        {bars.map(bar => (
          <div key={bar.label} className="bp-tier-bar">
            <div className="bp-tier-bar__meta">
              <span className="bp-tier-bar__label">{bar.label}</span>
              <span className="bp-tier-bar__count">{Math.min(bar.count, bar.req)}/{bar.req}</span>
            </div>
            <div className="bp-tier-bar__track">
              <div className="bp-tier-bar__fill"
                style={{ width: Math.min(100, (bar.count / bar.req) * 100) + '%', background: bar.colour }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SessionLog: React.FC<{ sessions: SessionRecord[] }> = ({ sessions }) => (
  <div className="bp-session-log">
    <h3 className="bp-section-title">Session record</h3>
    <div className="bp-session-list">
      {sessions.slice().reverse().map(s => {
        const st = SESSION_FLOORS[s.type];
        return (
          <div key={s.id} className="bp-session-row">
            <span className="bp-session-icon">{st.icon}</span>
            <div className="bp-session-meta">
              <span className="bp-session-type" style={{ color: st.colour }}>{st.label}</span>
              <span className="bp-session-programme">{s.programme}</span>
              {s.rovPresent && <span className="bp-session-rov">ROV: {s.rovPresent}</span>}
              {s.elderKnowledge && <span className="bp-session-flag bp-session-flag--elder">Elder knowledge</span>}
              {s.crossCultural && <span className="bp-session-flag bp-session-flag--cross">Cross-cultural</span>}
              {s.refusal && <span className="bp-session-flag bp-session-flag--refusal">Floor held</span>}
            </div>
            <div className="bp-session-right">
              {s.qualityGrade && (
                <span className="bp-session-grade" style={{ color: QUALITY_GRADES[s.qualityGrade].colour }}>
                  {QUALITY_GRADES[s.qualityGrade].label}
                </span>
              )}
              <span className="bp-session-date">{s.date}</span>
              <span className="bp-session-dur">{s.durationMins}m</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const ROVPanel: React.FC<{ assessments: ROVAssessment[] }> = ({ assessments }) => (
  <div className="bp-rov-panel">
    <h3 className="bp-section-title">ROV assessments</h3>
    <p className="bp-section-sub">Which specialists have witnessed your work and what they confirmed.</p>
    <div className="bp-rov-list">
      {assessments.map((a, i) => (
        <div key={i} className="bp-rov-card">
          <div className="bp-rov-card__header">
            <span className="bp-rov-card__emoji">{a.rovEmoji}</span>
            <div>
              <span className="bp-rov-card__name">{a.rovName}</span>
              <span className="bp-rov-card__domain">{a.domain}</span>
            </div>
            <span className="bp-rov-card__grade" style={{ color: QUALITY_GRADES[a.grade].colour }}>
              {QUALITY_GRADES[a.grade].label}
            </span>
          </div>
          <p className="bp-rov-card__note">{a.note}</p>
          <span className="bp-rov-card__date">{a.date}</span>
        </div>
      ))}
    </div>
  </div>
);

const NominationsPanel: React.FC<{ nominations: PeerNomination[] }> = ({ nominations }) => (
  <div className="bp-nominations">
    <h3 className="bp-section-title">Peer nominations</h3>
    <p className="bp-section-sub">What other members have confirmed about your contribution. Requires cross-programme confirmation.</p>
    <div className="bp-nomination-list">
      {nominations.map((n, i) => {
        const nt = PEER_NOMINATION_TYPES[n.type];
        return (
          <div key={i} className={"bp-nomination-card" + (n.confirmed ? " bp-nomination-card--confirmed" : "")}>
            <span className="bp-nomination-icon">{nt.icon}</span>
            <div className="bp-nomination-body">
              <span className="bp-nomination-label">{nt.label}</span>
              <p className="bp-nomination-desc">{nt.desc}</p>
              <div className="bp-nomination-meta">
                <span>Nominated by {n.nominatedBy.length} member{n.nominatedBy.length > 1 ? "s" : ""}</span>
                <span>Across {n.programmes.length} programmes</span>
                {n.confirmed && <span className="bp-nomination-confirmed">✓ Confirmed</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const CredentialsPanel: React.FC<{ rotationBadges: string[]; credentials: string[] }> = ({ rotationBadges, credentials }) => (
  <div className="bp-credentials">
    <h3 className="bp-section-title">Credentials & rotation badges</h3>
    <div className="bp-rotation-badges">
      {rotationBadges.map(b => (
        <span key={b} className="bp-rotation-badge">{b}</span>
      ))}
    </div>
    <div className="bp-credential-list">
      {credentials.map(c => (
        <div key={c} className="bp-credential-row">
          <span className="bp-credential-dot" />
          <span className="bp-credential-text">{c}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

type ActiveTab = 'tiers' | 'sessions' | 'rovs' | 'nominations' | 'credentials';

interface BadgeProgressProps {
  record?: BadgeRecord;   // pass directly for testing
  learnerId?: string;     // fetch from backend when present
  demo?: boolean;         // force demo mode
}

const BadgeProgress: React.FC<BadgeProgressProps> = ({ record, learnerId, demo = false }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('tiers');
  const [fetchedRecord, setFetchedRecord] = useState<BadgeRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!learnerId || record || demo) return;
    setLoading(true);
    fetch(`/api/badge-progress/${learnerId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('ww_token')}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setFetchedRecord(data); })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [learnerId]);

  if (loading) return (
    <div className="bp-wrap bp-loading">
      <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>Loading your badge record…</p>
    </div>
  );

  const data = record || fetchedRecord || DEMO_RECORD;
  const isDemo = !record && !fetchedRecord;
  const tier = TIER_REQUIREMENTS[data.currentTier];
  const covenantBand = data.covenantScore >= 80 ? 'Flourishing'
    : data.covenantScore >= 60 ? 'Contributing'
    : data.covenantScore >= 40 ? 'Coasting'
    : data.covenantScore >= 20 ? 'Extracting' : 'Breaching';
  const covenantColour = data.covenantScore >= 80 ? '#4A6741'
    : data.covenantScore >= 60 ? '#6B8F4E'
    : data.covenantScore >= 40 ? '#8B7355'
    : data.covenantScore >= 20 ? '#B8860B' : '#8B1A1A';

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'tiers',       label: 'Tier progress',   icon: '🏆' },
    { id: 'sessions',    label: 'Session record',  icon: '📅' },
    { id: 'rovs',        label: 'ROV assessments', icon: '🧿' },
    { id: 'nominations', label: 'Peer nominations',icon: '🤝' },
    { id: 'credentials', label: 'Credentials',     icon: '🎖️' },
  ];

  return (
    <div className="bp-wrap">
      {isDemo && <div className="bp-demo-banner">Demo view — your badge record will appear here once your first session is logged</div>}

      {/* Header */}
      <div className="bp-header">
        <div className="bp-header__tier" style={{ "--bp-tier-colour": tier.colour } as React.CSSProperties}>
          <span className="bp-header__tier-icon">{tier.icon}</span>
          <div>
            <span className="bp-header__tier-label">{tier.label}</span>
            <span className="bp-header__member">{data.memberName}</span>
          </div>
        </div>
        <div className="bp-header__score" style={{ color: covenantColour }}>
          <span className="bp-header__score-num">{data.covenantScore}</span>
          <span className="bp-header__score-band">{covenantBand}</span>
        </div>
      </div>

      {/* Session type summary */}
      <div className="bp-session-summary">
        {(Object.keys(SESSION_FLOORS) as SessionType[]).map(type => {
          const count = data.sessions.filter(s => s.type === type).length;
          const st = SESSION_FLOORS[type];
          return (
            <div key={type} className="bp-summary-pill" style={{ "--bp-pill-colour": st.colour } as React.CSSProperties}>
              <span className="bp-summary-pill__icon">{st.icon}</span>
              <span className="bp-summary-pill__count">{count}</span>
              <span className="bp-summary-pill__label">{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <nav className="bp-tabs">
        {tabs.map(t => (
          <button key={t.id}
            className={"bp-tab" + (activeTab === t.id ? " bp-tab--active" : "")}
            onClick={() => setActiveTab(t.id)}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="bp-content">
        {activeTab === 'tiers' && (
          <div className="bp-tier-grid">
            {(['connector', 'curator', 'champion'] as BadgeTier[]).map(t => (
              <TierCard key={t} tier={t} current={data.currentTier} record={data} />
            ))}
          </div>
        )}
        {activeTab === 'sessions' && <SessionLog sessions={data.sessions} />}
        {activeTab === 'rovs' && <ROVPanel assessments={data.rovAssessments} />}
        {activeTab === 'nominations' && <NominationsPanel nominations={data.peerNominations} />}
        {activeTab === 'credentials' && <CredentialsPanel rotationBadges={data.rotationBadges} credentials={data.credentials} />}
      </div>
    </div>
  );
};

export default BadgeProgress;
