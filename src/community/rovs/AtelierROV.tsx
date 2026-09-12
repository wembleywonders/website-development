import React, { useState } from 'react';
import {
  ATELIER_COMMISSION,
  ATELIER_AUCTION,
} from '../../blockchain/config/revenueModels';

/**
 * AtelierROV — the Atelier's resident ROV trio.
 *
 * Esi   — craft and making guidance; helps the maker frame the work itself.
 * Kweku — business instinct; pricing, positioning, what the market will bear.
 * Nora  — qualified IP counsel (Children of Anansi, 12th child); active at
 *         the listing/export point. Signposts, never regulated legal advice.
 *
 * Splits are read from revenueModels.ts — the single source of truth.
 * Never hardcode percentages here.
 *
 * NOTE: atelier.commission.settlement.enabled=false (directors' decision).
 * This component displays splits for transparency; it does not settle.
 */

type AtelierMode = 'commission' | 'auction';

type PersonaId = 'esi' | 'kweku' | 'nora';

interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  activeAt: string;
  opener: string;
  scopeNote: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'esi',
    name: 'Esi',
    role: 'Craft & Making',
    activeAt: 'From first idea to finished piece',
    opener:
      'Tell me what you\u2019re making. Not what you think will sell \u2014 what your hands want to build. We start there.',
    scopeNote:
      'Esi helps you describe your work honestly: materials, method, time, and the story it carries.',
  },
  {
    id: 'kweku',
    name: 'Kweku',
    role: 'Business Instinct',
    activeAt: 'Pricing and positioning',
    opener:
      'Right. What did it cost you \u2014 materials, hours, the years it took to learn how? Your price starts from that, not from what feels polite.',
    scopeNote:
      'Kweku talks pricing, positioning, and realistic expectations. He will push back if you undervalue your work.',
  },
  {
    id: 'nora',
    name: 'Nora',
    role: 'IP Counsel',
    activeAt: 'Listing & export point',
    opener:
      'Before this goes out the door: who owns the design, is anyone else\u2019s work in it, and what rights are you keeping? Let\u2019s check all three.',
    scopeNote:
      'Nora flags IP questions at the point of listing. She signposts to qualified advice where needed \u2014 this is guidance, not regulated legal advice.',
  },
];

interface SplitRowProps {
  label: string;
  maker: number;
  platform: number;
  community: number;
}

const SplitRow: React.FC<SplitRowProps> = ({ label, maker, platform, community }) => (
  <div className="atelier-rov__split-row">
    <span className="atelier-rov__split-label">{label}</span>
    <div className="atelier-rov__split-bar">
      <div
        className="atelier-rov__split-segment atelier-rov__split-segment--maker"
        style={{ width: `${maker}%`, background: 'var(--hp-green)' }}
        title={`Maker ${maker}%`}
      >
        {maker}%
      </div>
      <div
        className="atelier-rov__split-segment atelier-rov__split-segment--platform"
        style={{ width: `${platform}%`, background: 'var(--hp-blue)' }}
        title={`Platform ${platform}%`}
      >
        {platform}%
      </div>
      <div
        className="atelier-rov__split-segment atelier-rov__split-segment--community"
        style={{ width: `${community}%`, background: 'var(--hp-amber, var(--hp-blue))' }}
        title={`Community ${community}%`}
      >
        {community}%
      </div>
    </div>
  </div>
);

export interface AtelierROVProps {
  /** Maker's display name, if known */
  makerName?: string;
  /** Initial mode; defaults to commission */
  initialMode?: AtelierMode;
}

const AtelierROV: React.FC<AtelierROVProps> = ({ makerName, initialMode = 'commission' }) => {
  const [mode, setMode] = useState<AtelierMode>(initialMode);
  const [activePersona, setActivePersona] = useState<PersonaId>('esi');

  const splits = mode === 'commission' ? ATELIER_COMMISSION : ATELIER_AUCTION;
  const persona = PERSONAS.find((p) => p.id === activePersona)!;

  return (
    <section className="atelier-rov" aria-label="Atelier guidance">
      <header className="atelier-rov__header">
        <h2>The Atelier{makerName ? ` \u2014 welcome, ${makerName}` : ''}</h2>
        <p className="atelier-rov__strapline">
          Your work, your terms. Three guides, one principle: the maker keeps the lion&rsquo;s share.
        </p>
      </header>

      <nav className="atelier-rov__persona-tabs" aria-label="Choose a guide">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`atelier-rov__persona-tab${
              p.id === activePersona ? ' atelier-rov__persona-tab--active' : ''
            }`}
            onClick={() => setActivePersona(p.id)}
            aria-pressed={p.id === activePersona}
          >
            <span className="atelier-rov__persona-name">{p.name}</span>
            <span className="atelier-rov__persona-role">{p.role}</span>
          </button>
        ))}
      </nav>

      <div className="atelier-rov__persona-panel">
        <p className="atelier-rov__persona-active-at">Active: {persona.activeAt}</p>
        <blockquote className="atelier-rov__persona-opener">{persona.opener}</blockquote>
        <p className="atelier-rov__persona-scope">{persona.scopeNote}</p>
      </div>

      <div className="atelier-rov__splits">
        <div className="atelier-rov__mode-toggle" role="tablist" aria-label="Sale type">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'commission'}
            className={mode === 'commission' ? 'atelier-rov__mode--active' : ''}
            onClick={() => setMode('commission')}
          >
            Commission
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'auction'}
            className={mode === 'auction' ? 'atelier-rov__mode--active' : ''}
            onClick={() => setMode('auction')}
          >
            Auction
          </button>
        </div>

        <SplitRow
          label={mode === 'commission' ? 'Commission split' : 'Auction split'}
          maker={splits.maker}
          platform={splits.platform}
          community={splits.community}
        />

        <p className="atelier-rov__settlement-note">
          Settlement is handled off-platform for now. These figures show how every sale is
          shared &mdash; maker first, always.
        </p>
      </div>
    </section>
  );
};

export default AtelierROV;
