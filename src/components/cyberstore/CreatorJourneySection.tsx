// src/components/cyberstore/CreatorJourneySection.tsx
//
// Generic version of JudithJourneySection.
// Takes a CreatorRegistryEntry as its only data prop.
// All display config (colours, titles, links) comes from entry.display.
// JudithJourneySection.tsx is now a one-line wrapper around this.
//
// Usage:
//   import CreatorJourneySection from './CreatorJourneySection';
//   import { CREATOR_REGISTRY } from '../../types/creatorRegistry';
//
//   // Render all creators:
//   {CREATOR_REGISTRY.map(entry => (
//     <CreatorJourneySection key={entry.profile.id} entry={entry} />
//   ))}
//
//   // Or just Judith:
//   <CreatorJourneySection entry={CREATOR_REGISTRY[0]} />

import React, { useState, useEffect } from 'react';
import type { CreatorRegistryEntry } from '../../types/creatorRegistry';
import type { CyberstoreProduct, CalendarEvent } from '../../types/creatorJourney';
import {
  getProductProvenance,
  getCostRecoveryStatus,
  formatRevenueSplit,
} from '../../marketplace/integrations/creatorJourneyIntegration';
import { journeyProductToCartItem } from '../../marketplace/integrations/creatorJourneyIntegration';
import './CreatorJourneySection.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreatorJourneySectionProps {
  entry: CreatorRegistryEntry;
  onAddToCart?: (item: ReturnType<typeof journeyProductToCartItem>) => void;
  defaultTimelineOpen?: boolean;
  variant?: 'full' | 'compact';  // full = Cyberstore page, compact = sidebar/widget
}

// ─── Config maps (generic — no creator-specific values) ───────────────────────

const EVENT_CONFIG: Record<string, { icon: string; label: string }> = {
  trichologist:        { icon: '🩺', label: 'Trichologist'     },
  'k2k-recording':     { icon: '🎙️', label: 'K2K Recording'    },
  'raydyo-drop':       { icon: '📻', label: 'Rayd-yo'           },
  'archive-update':    { icon: '📚', label: 'Archive Update'    },
  'founding-session':  { icon: '✦',  label: 'Founding Session'  },
  workshop:            { icon: '👥', label: 'Workshop'          },
  'cyberstore-launch': { icon: '🛍️', label: 'Cyberstore'        },
  community:           { icon: '🌍', label: 'Community'         },
};

const EVIDENCE_CONFIG = {
  documented:  { emoji: '📚', label: 'Documented science'   },
  research:    { emoji: '🔬', label: 'Research-informed'    },
  traditional: { emoji: '🌿', label: 'Traditional practice' },
  contested:   { emoji: '⚠️', label: 'Evidence contested'  },
};

const STATUS_CONFIG = {
  'live':        { label: 'Live',        cls: 'live'        },
  'coming-soon': { label: 'Coming soon', cls: 'coming-soon' },
  'draft':       { label: 'In dev',      cls: 'draft'       },
  'sold-out':    { label: 'Sold out',    cls: 'sold-out'    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProvenanceChain: React.FC<{
  product: CyberstoreProduct;
  events: CalendarEvent[];
  accent: string;
}> = ({ product, events, accent }) => {
  const sourceEvents = getProductProvenance(product, events);
  if (sourceEvents.length === 0) return null;

  return (
    <div className="cjs-prov">
      {sourceEvents.map((ev: CalendarEvent, i: number) => {
        const ec = EVENT_CONFIG[ev.type as keyof typeof EVENT_CONFIG] ?? EVENT_CONFIG.community;
        return (
          <React.Fragment key={ev.id}>
            <div className="cjs-prov__node" style={{ '--accent': accent } as React.CSSProperties}>
              <span className="cjs-prov__icon">{ec.icon}</span>
              <div className="cjs-prov__body">
                <span className="cjs-prov__type">{ec.label}</span>
                <span className="cjs-prov__title">{ev.title}</span>
                <span className="cjs-prov__date">
                  {new Date(ev.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </span>
                {ev.journeyNotePublic && ev.journeyNote && (
                  <em className="cjs-prov__note">"{ev.journeyNote}"</em>
                )}
                {ev.location && (
                  <span className="cjs-prov__loc">
                    {ev.locationUrl
                      ? <a href={ev.locationUrl} target="_blank" rel="noopener noreferrer">📍 {ev.location}</a>
                      : <>📍 {ev.location}</>
                    }
                  </span>
                )}
              </div>
            </div>
            {i < sourceEvents.length - 1 && (
              <div className="cjs-prov__arrow">↓</div>
            )}
          </React.Fragment>
        );
      })}

      {product.creatorJourney.costsRecovered.length > 0 && (
        <div className="cjs-prov__costs">
          <div className="cjs-prov__costs-title">R&amp;D costs this product offsets</div>
          {product.creatorJourney.costsRecovered.map((c: { description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; amount: number; }, i: React.Key | null | undefined) => (
            <div key={i} className="cjs-prov__costs-row">
              <span>{c.description}</span>
              <strong>£{c.amount.toFixed(2)}</strong>
            </div>
          ))}
          <p className="cjs-prov__costs-note">
            These are R&amp;D expenses, not personal costs.
            The knowledge they produce is what makes this resource credible.
          </p>
        </div>
      )}
    </div>
  );
};

const ProductCard: React.FC<{
  product: CyberstoreProduct;
  events: CalendarEvent[];
  accent: string;
  secondary: string;
  onAddToCart?: CreatorJourneySectionProps['onAddToCart'];
}> = ({ product, events, accent, secondary, onAddToCart }) => {
  const [provenanceOpen, setProvenanceOpen] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.label ?? '');

  const { salesNeeded, creatorEarningPerSale } = getCostRecoveryStatus(product);
  const split = formatRevenueSplit(product.price);
  const statusConf = STATUS_CONFIG[(product.status as keyof typeof STATUS_CONFIG) ?? 'draft'];
  const evidenceConf = product.creatorJourney.evidenceGrade
    ? EVIDENCE_CONFIG[product.creatorJourney.evidenceGrade as keyof typeof EVIDENCE_CONFIG]
    : null;

  const handleBuy = () => {
    onAddToCart?.(journeyProductToCartItem(product, 1, selectedVariant || undefined));
  };

  return (
    <div
      className={`cjs-card cjs-card--${statusConf.cls}`}
      style={{ '--accent': accent, '--secondary': secondary } as React.CSSProperties}
    >
      {/* Status ribbon */}
      {product.status !== 'live' && (
        <div className={`cjs-card__ribbon cjs-card__ribbon--${statusConf.cls}`}>
          {statusConf.label}
        </div>
      )}

      {/* Header */}
      <div className="cjs-card__head">
        <div className="cjs-card__creator">
          <span className="cjs-card__avatar">{product.creatorJourney.creatorName.charAt(0)}</span>
          <span className="cjs-card__creator-name">{product.creatorJourney.creatorName}</span>
        </div>
      </div>

      {/* Title */}
      <div className="cjs-card__body">
        <h4 className="cjs-card__title">{product.title}</h4>
        <p className="cjs-card__tagline">{product.tagline}</p>
        <p className="cjs-card__desc">{product.description}</p>

        {/* Evidence */}
        {evidenceConf && (
          <div className="cjs-card__evidence">
            <span className="cjs-card__evidence-badge">
              {evidenceConf.emoji} {evidenceConf.label}
            </span>
            {product.creatorJourney.clinicalBasis && (
              <span className="cjs-card__evidence-basis">
                {product.creatorJourney.clinicalBasis}
              </span>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="cjs-card__tags">
          {product.tags.slice(0, 4).map((t: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined, i: number) => (
            <span key={i} className="cjs-card__tag">{t}</span>
          ))}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="cjs-card__variants">
            {product.variants.map((v: { label: boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.Key | null | undefined; }, idx: number) => (
              <button
                key={idx}
                className={`cjs-card__variant${selectedVariant === v.label ? ' cjs-card__variant--sel' : ''}`}
                onClick={() => setSelectedVariant(v.label as string)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Provenance toggle */}
      <button
        className="cjs-card__toggle cjs-card__toggle--prov"
        onClick={() => setProvenanceOpen(!provenanceOpen)}
      >
        <span>🔗 How this was made</span>
        <span>{provenanceOpen ? '▲' : '▼'}</span>
      </button>

      {provenanceOpen && (
        <ProvenanceChain product={product} events={events} accent={accent} />
      )}

      {/* Revenue split toggle */}
      <button
        className="cjs-card__toggle cjs-card__toggle--split"
        onClick={() => setSplitOpen(!splitOpen)}
      >
        <span>💰 Where your money goes</span>
        <span>{splitOpen ? '▲' : '▼'}</span>
      </button>

      {splitOpen && (
        <div className="cjs-split">
          <div className="cjs-split__bars">
            <div className="cjs-split__bar">
              <div className="cjs-split__fill cjs-split__fill--creator" style={{ width: '55%' }} />
              <div className="cjs-split__label">
                <span>{product.creatorJourney.creatorName}</span>
                <span style={{ color: accent }}>£{split.creator} (55%)</span>
              </div>
            </div>
            <div className="cjs-split__bar">
              <div className="cjs-split__fill cjs-split__fill--community" style={{ width: '25%' }} />
              <div className="cjs-split__label">
                <span>Community Fund</span>
                <span>£{split.community} (25%)</span>
              </div>
            </div>
            <div className="cjs-split__bar">
              <div className="cjs-split__fill cjs-split__fill--platform" style={{ width: '20%' }} />
              <div className="cjs-split__label">
                <span>Platform</span>
                <span>£{split.platform} (20%)</span>
              </div>
            </div>
          </div>
          <p className="cjs-split__note">
            Every split is blockchain-recorded.{' '}
            {product.creatorJourney.creatorName} earns from the first sale.
          </p>
        </div>
      )}

      {/* Cost recovery indicator */}
      {product.creatorJourney.costsRecovered.length > 0 && (
        <div className="cjs-card__recovery">
          📈 {salesNeeded} sales recovers the R&amp;D.
          £{creatorEarningPerSale.toFixed(2)} goes to{' '}
          {product.creatorJourney.creatorName} per sale.
        </div>
      )}

      {/* Footer */}
      <div className="cjs-card__footer">
        <div className="cjs-card__price" style={{ color: secondary }}>
          £{product.price.toFixed(2)}
        </div>
        <button
          className={`cjs-card__cta${product.status !== 'live' ? ' cjs-card__cta--disabled' : ''}`}
          disabled={product.status !== 'live'}
          onClick={handleBuy}
          style={product.status === 'live'
            ? { background: `linear-gradient(135deg, ${secondary} 0%, ${accent} 100%)` }
            : {}
          }
        >
          {product.status === 'live'        ? 'Add to basket'  :
           product.status === 'coming-soon' ? 'Notify me'      :
           product.status === 'sold-out'    ? 'Sold out'       : 'In development'}
        </button>
      </div>

      {/* Token */}
      {product.creatorJourney.tokenId && (
        <div className="cjs-card__token">
          ⛓ {product.creatorJourney.tokenId}
        </div>
      )}
    </div>
  );
};

// ─── Timeline ─────────────────────────────────────────────────────────────────

const JourneyTimeline: React.FC<{
  events: CalendarEvent[];
  products: CyberstoreProduct[];
  accent: string;
}> = ({ events, products, accent }) => {
  const sorted = [...events]
    .filter(e => e.isPublic)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="cjs-timeline">
      {sorted.map((ev, i) => {
        const ec = EVENT_CONFIG[ev.type] ?? EVENT_CONFIG.community;
        const linked = products.filter(p =>
          p.creatorJourney.sourcingEvents.includes(ev.id)
        );
        return (
          <div key={ev.id} className="cjs-timeline__item">
            <div className="cjs-timeline__spine">
              <div
                className="cjs-timeline__dot"
                style={{ '--accent': accent } as React.CSSProperties}
              >
                {ec.icon}
              </div>
              {i < sorted.length - 1 && <div className="cjs-timeline__line" />}
            </div>
            <div className="cjs-timeline__content">
              <div className="cjs-timeline__meta">
                <span className="cjs-timeline__type" style={{ color: accent }}>
                  {ec.label}
                </span>
                <span className="cjs-timeline__date">
                  {new Date(ev.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
              <div className="cjs-timeline__title">{ev.title}</div>
              {ev.journeyNotePublic && ev.journeyNote && (
                <em className="cjs-timeline__note">"{ev.journeyNote}"</em>
              )}
              {ev.location && (
                <span className="cjs-timeline__loc">
                  {ev.locationUrl
                    ? <a href={ev.locationUrl} target="_blank" rel="noopener noreferrer">📍 {ev.location}</a>
                    : <>📍 {ev.location}</>
                  }
                </span>
              )}
              {linked.length > 0 && (
                <div className="cjs-timeline__chips">
                  {linked.map(p => (
                    <span key={p.id} className="cjs-timeline__chip">🛍️ {p.title}</span>
                  ))}
                </div>
              )}
              {ev.cost && (
                <div className="cjs-timeline__cost">
                  R&amp;D: £{ev.cost.amount.toFixed(2)} ·{' '}
                  <em>recoverable through Cyberstore income</em>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const CreatorJourneySection: React.FC<CreatorJourneySectionProps> = ({
  entry: initialEntry,
  onAddToCart,
  defaultTimelineOpen = false,
  variant = 'full',
}) => {
  const [entry, setEntry] = useState<CreatorRegistryEntry>(initialEntry);
  const [timelineOpen, setTimelineOpen] = useState(defaultTimelineOpen);
  const [loading, setLoading] = useState(false);

  const { profile, products, events, display } = entry;
  const { accentColour, secondaryColour } = display;

  const totalCosts = events.reduce((s, e) => s + (e.cost?.amount ?? 0), 0);
  const liveCount = products.filter(p => p.status === 'live').length;
  const comingCount = products.filter(p => p.status === 'coming-soon').length;

  // Attempt to hydrate from live API — falls back to static silently
  useEffect(() => {
    if (!initialEntry.apiEndpoint) return;
    setLoading(true);
    // TODO: Replace with actual API fetch function from creatorJourneyIntegration
    setLoading(false);
  }, [profile.id, initialEntry.apiEndpoint]);

  if (variant === 'compact') {
    return (
      <div
        className="cjs cjs--compact"
        style={{ '--accent': accentColour, '--secondary': secondaryColour } as React.CSSProperties}
      >
        <div className="cjs__compact-header">
          <span className="cjs__compact-avatar">{profile.name.charAt(0)}</span>
          <div>
            <div className="cjs__compact-name">{profile.name}</div>
            <div className="cjs__compact-role">{profile.role}</div>
          </div>
        </div>
        <p className="cjs__compact-tagline">{display.sectionTagline}</p>
        <div className="cjs__compact-stats">
          <span>{products.length} products</span>
          <span>{events.length} events</span>
          <span>55% creator</span>
        </div>
      </div>
    );
  }

  return (
    <section
      className="cjs"
      style={{ '--accent': accentColour, '--secondary': secondaryColour } as React.CSSProperties}
      aria-label={`${profile.name} creator journey`}
    >
      {/* Loading shimmer — only shows briefly while API hydrates */}
      {loading && <div className="cjs__loading-bar" style={{ background: accentColour }} />}

      {/* ── Header ── */}
      <div className="cjs__header">
        <div className="cjs__eyebrow">Creator Journey · {profile.role.split('·')[0].trim()}</div>
        <h2 className="cjs__title">{display.sectionTitle}</h2>
        <p className="cjs__subtitle">{display.sectionTagline}</p>

        {/* Stats */}
        <div className="cjs__stats">
          <div className="cjs__stat">
            <span className="cjs__stat-value" style={{ color: secondaryColour }}>
              {products.length}
            </span>
            <span className="cjs__stat-label">Products in range</span>
          </div>
          <div className="cjs__stat">
            <span className="cjs__stat-value" style={{ color: secondaryColour }}>
              £{totalCosts.toFixed(0)}
            </span>
            <span className="cjs__stat-label">R&amp;D documented</span>
          </div>
          <div className="cjs__stat">
            <span className="cjs__stat-value" style={{ color: accentColour }}>
              55%
            </span>
            <span className="cjs__stat-label">{profile.name.split(' ')[0]} earns per sale</span>
          </div>
          <div className="cjs__stat">
            <span className="cjs__stat-value" style={{ color: accentColour }}>
              {events.filter(e => e.isPublic).length}
            </span>
            <span className="cjs__stat-label">Journey events on record</span>
          </div>
        </div>

        {/* Headline — generated from profile data, not hardcoded */}
        <blockquote className="cjs__headline" style={{ borderColor: accentColour }}>
          "{profile.name} started documenting her knowledge.
          Every appointment, every session, every archive section is on record —
          and she earns 55% of every sale that knowledge generates,
          permanently attributed on the blockchain."
        </blockquote>
      </div>

      {/* ── Journey model ── */}
      <div className="cjs__model">
        {[
          { icon: '📝', label: 'Knowledge source', sub: 'Documented. Dated. Attributed.' },
          { icon: '🎙️', label: 'Production session', sub: 'K2K → Rayd-yo. Token minted.' },
          { icon: '📚', label: 'Archive updated', sub: 'Evidence-graded. Citable.' },
          { icon: '🛍️', label: 'Product listed', sub: '55% from first pound. Always.' },
        ].map((step, i, arr) => (
          <React.Fragment key={step.label}>
            <div className={`cjs__model-step${i === arr.length - 1 ? ' cjs__model-step--last' : ''}`}>
              <span className="cjs__model-icon">{step.icon}</span>
              <div className="cjs__model-body">
                <strong>{step.label}</strong>
                <span>{step.sub}</span>
              </div>
            </div>
            {i < arr.length - 1 && <div className="cjs__model-arrow">→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* ── Timeline toggle ── */}
      <button
        className="cjs__timeline-toggle"
        onClick={() => setTimelineOpen(!timelineOpen)}
        style={timelineOpen ? { borderColor: accentColour, color: accentColour } : {}}
      >
        <span>📅 Follow {profile.name.split(' ')[0]}'s Journey — {events.filter(e => e.isPublic).length} events on record</span>
        <span>{timelineOpen ? '▲ Hide' : '▼ Show'}</span>
      </button>

      {timelineOpen && (
        <JourneyTimeline events={events} products={products} accent={accentColour} />
      )}

      {/* ── Products ── */}
      <div className="cjs__products-header">
        <h3 className="cjs__products-title">
          Products Available
          {liveCount > 0 && <span className="cjs__products-live">{liveCount} live</span>}
          {comingCount > 0 && <span className="cjs__products-coming">{comingCount} coming soon</span>}
        </h3>
        <p className="cjs__products-sub">
          Expand "How this was made" on any product to see the full provenance chain.
        </p>
      </div>

      <div className="cjs__grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            events={events}
            accent={accentColour}
            secondary={secondaryColour}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {/* ── CIC advance model ── */}
      <div className="cjs__advance">
        <span className="cjs__advance-icon">🏛️</span>
        <div>
          <strong>How costs are covered</strong>
          <p>
            Wembley Wonders CIC advances knowledge-sourcing costs — appointments,
            course fees, product testing — as a structured advance against future
            Cyberstore income. Repaid through the 20% platform split as sales arrive.
            {profile.name.split(' ')[0]} retains 55% from the first pound.
            No grants, no dependency, no extraction.
          </p>
        </div>
      </div>

      {/* ── External links ── */}
      <div className="cjs__links">
        {display.programmeLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="cjs__link"
            style={{ borderColor: `${accentColour}55`, color: accentColour }}
          >
            {link.label}
          </a>
        ))}
        {display.externalLinks?.map(link => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cjs__link cjs__link--external"
            style={{ borderColor: `${secondaryColour}55`, color: secondaryColour }}
          >
            {link.icon} {link.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default CreatorJourneySection;