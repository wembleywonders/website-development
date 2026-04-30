/**
 * ListingEditorPage.tsx
 * Wembley Wonders CIC
 *
 * The listing draft editor.
 * Creator lands here after clicking "Add to Cyberstore".
 * Everything is pre-filled. They set a price. They publish.
 *
 * Route: /cyberstore/listings/:listingId/edit
 *
 * Wire to router/index.tsx:
 *   { path: '/cyberstore/listings/:listingId/edit', element: <ListingEditorPage /> }
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StoreListing,
  validateListingDraft,
  publishListing,
  getPricingHint,
  getProgrammeLabel,
  formatGBP,
} from './sandboxToStoreService';
import './ListingEditorPage.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Replace with your actual auth hook
const useAuth = () => ({
  token: localStorage.getItem('ww_token') ?? '',
  creatorId: localStorage.getItem('ww_creator_id') ?? '',
});

// Replace with your actual listing fetch
const fetchListing = async (listingId: string, token: string): Promise<StoreListing> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/store/listings/${listingId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error('Listing not found');
  return res.json();
};

const updateListing = async (
  listingId: string,
  updates: Partial<StoreListing>,
  token: string
): Promise<StoreListing> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/store/listings/${listingId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );
  if (!res.ok) throw new Error('Failed to save changes');
  return res.json();
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="listing-field-error">{message}</p> : null;

const ProvenanceBadge: React.FC<{ provenanceId: string; programmeLabel: string }> = ({
  provenanceId,
  programmeLabel,
}) => (
  <div className="listing-provenance">
    <span className="listing-provenance__icon">◈</span>
    <div>
      <span className="listing-provenance__label">Provenance verified</span>
      <span className="listing-provenance__detail">
        Created in {programmeLabel} · Record ID: {provenanceId.slice(0, 8).toUpperCase()}
      </span>
    </div>
  </div>
);

const RevenueSplit: React.FC<{ priceGBP: number | null }> = ({ priceGBP }) => {
  if (priceGBP === null || priceGBP <= 0) return null;

  const creator = priceGBP * 0.55;
  const reserve = priceGBP * 0.25;
  const ops     = priceGBP * 0.20;

  return (
    <div className="listing-split">
      <h4 className="listing-split__title">Per sale at this price</h4>
      <div className="listing-split__rows">
        <div className="listing-split__row listing-split__row--creator">
          <span>You receive</span>
          <strong>£{creator.toFixed(2)}</strong>
        </div>
        <div className="listing-split__row listing-split__row--reserve">
          <span>Community reserve</span>
          <span>£{reserve.toFixed(2)}</span>
        </div>
        <div className="listing-split__row listing-split__row--ops">
          <span>Platform operations</span>
          <span>£{ops.toFixed(2)}</span>
        </div>
      </div>
      <p className="listing-split__note">
        Stripe processing fees (~1.5% + 20p) deducted before this split.
      </p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const ListingEditorPage: React.FC = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [listing, setListing]       = useState<StoreListing | null>(null);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [errors, setErrors]         = useState<string[]>([]);
  const [saveMsg, setSaveMsg]       = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Load the listing
  useEffect(() => {
    if (!listingId) return;
    fetchListing(listingId, token)
      .then(setListing)
      .catch(e => setErrors([e.message]))
      .finally(() => setLoading(false));
  }, [listingId, token]);

  // Auto-save on field changes (debounced)
  const autoSave = useCallback(
    async (updates: Partial<StoreListing>) => {
      if (!listingId || !listing) return;
      try {
        setSaving(true);
        await updateListing(listingId, updates, token);
        setSaveMsg('Saved');
        setTimeout(() => setSaveMsg(''), 2000);
      } catch {
        setSaveMsg('Save failed — check your connection');
      } finally {
        setSaving(false);
      }
    },
    [listingId, listing, token]
  );

  const updateField = <K extends keyof StoreListing>(
    field: K,
    value: StoreListing[K]
  ) => {
    if (!listing) return;
    const updated = { ...listing, [field]: value };
    setListing(updated);
    // Clear field error
    if (fieldErrors[field as string]) {
      setFieldErrors(prev => { const n = {...prev}; delete n[field as string]; return n; });
    }
    autoSave({ [field]: value });
  };

  const handlePublish = async () => {
    if (!listing || !listingId) return;

    const validationErrors = validateListingDraft(listing);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setPublishing(true);
      setErrors([]);
      await publishListing(listingId, token);
      navigate(`/cyberstore/listings/${listingId}?published=true`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to publish. Please try again.';
      setErrors([msg]);
      setPublishing(false);
    }
  };

  // ─── Render states ──────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="listing-editor listing-editor--loading">
        <div className="listing-editor__spinner" />
        <p>Loading your listing…</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="listing-editor listing-editor--error">
        <p>Listing not found. <a href="/cyberstore">Back to Cyberstore</a></p>
      </div>
    );
  }

  const programmeLabel = getProgrammeLabel(listing.programmeSlug);
  const pricingHint    = getPricingHint(listing.programmeSlug);

  return (
    <div className="listing-editor">

      {/* Header */}
      <header className="listing-editor__header">
        <div className="listing-editor__breadcrumb">
          <a href="/cyberstore">Cyberstore</a>
          <span>›</span>
          <span>New listing</span>
        </div>
        <div className="listing-editor__header-row">
          <h1 className="listing-editor__title">
            Your {programmeLabel} listing
          </h1>
          <div className="listing-editor__save-status">
            {saving && <span className="save-status--saving">Saving…</span>}
            {saveMsg && !saving && (
              <span className={saveMsg === 'Saved'
                ? 'save-status--saved'
                : 'save-status--error'
              }>{saveMsg}</span>
            )}
          </div>
        </div>
        <ProvenanceBadge
          provenanceId={listing.provenanceId}
          programmeLabel={programmeLabel}
        />
      </header>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="listing-editor__errors" role="alert">
          <strong>Before you publish:</strong>
          <ul>
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      <div className="listing-editor__body">

        {/* Left column — content */}
        <div className="listing-editor__main">

          {/* Title */}
          <section className="listing-section">
            <label className="listing-label" htmlFor="listing-title">
              Title
              <span className="listing-label__required">required</span>
            </label>
            <input
              id="listing-title"
              className="listing-input"
              type="text"
              value={listing.title}
              maxLength={120}
              onChange={e => updateField('title', e.target.value)}
              placeholder="Give your work a title"
            />
            <div className="listing-char-count">
              {listing.title.length}/120
            </div>
            <FieldError message={fieldErrors.title} />
          </section>

          {/* Description */}
          <section className="listing-section">
            <label className="listing-label" htmlFor="listing-description">
              Description
              <span className="listing-label__required">required</span>
            </label>
            <p className="listing-label__hint">
              Tell buyers what they're getting. What makes this yours?
            </p>
            <textarea
              id="listing-description"
              className="listing-textarea"
              value={listing.description}
              maxLength={2000}
              rows={6}
              onChange={e => updateField('description', e.target.value)}
              placeholder="Describe your work…"
            />
            <div className="listing-char-count">
              {listing.description.length}/2000
            </div>
            <FieldError message={fieldErrors.description} />
          </section>

          {/* Tags */}
          <section className="listing-section">
            <label className="listing-label">Tags</label>
            <p className="listing-label__hint">
              Help buyers discover your work. Separate with commas.
            </p>
            <input
              className="listing-input"
              type="text"
              value={listing.tags.join(', ')}
              onChange={e => updateField(
                'tags',
                e.target.value.split(',').map(t => t.trim()).filter(Boolean)
              )}
              placeholder="e.g. jazz, original, instrumental"
            />
            <div className="listing-tags-preview">
              {listing.tags.map((tag: string) => (
                <span key={tag} className="listing-tag">{tag}</span>
              ))}
            </div>
          </section>

        </div>

        {/* Right column — pricing and publish */}
        <aside className="listing-editor__sidebar">

          {/* Pricing */}
          <section className="listing-section listing-section--card">
            <h3 className="listing-section__title">Pricing</h3>

            <div className="listing-price-options">
              <label className="listing-radio">
                <input
                  type="radio"
                  name="price-type"
                  checked={!listing.isFreeDownload}
                  onChange={() => updateField('isFreeDownload', false)}
                />
                <span>Set a price</span>
              </label>
              <label className="listing-radio">
                <input
                  type="radio"
                  name="price-type"
                  checked={listing.isFreeDownload}
                  onChange={() => {
                    updateField('isFreeDownload', true);
                    updateField('priceGBP', 0);
                  }}
                />
                <span>Free download</span>
              </label>
            </div>

            {!listing.isFreeDownload && (
              <>
                <div className="listing-price-input">
                  <span className="listing-price-input__symbol">£</span>
                  <input
                    className="listing-input listing-input--price"
                    type="number"
                    min={0.50}
                    max={999}
                    step={0.50}
                    value={listing.priceGBP ?? ''}
                    onChange={e => updateField(
                      'priceGBP',
                      e.target.value ? parseFloat(e.target.value) : null
                    )}
                    placeholder="0.00"
                  />
                </div>
                <p className="listing-pricing-hint">{pricingHint}</p>
                <FieldError message={fieldErrors.priceGBP} />
              </>
            )}

            <RevenueSplit priceGBP={listing.priceGBP} />
          </section>

          {/* Limited edition */}
          <section className="listing-section listing-section--card">
            <label className="listing-toggle">
              <input
                type="checkbox"
                checked={listing.limitedEdition}
                onChange={e => updateField('limitedEdition', e.target.checked)}
              />
              <span className="listing-toggle__label">
                Limited edition
                <span className="listing-toggle__sub">
                  Cap how many copies are available
                </span>
              </span>
            </label>

            {listing.limitedEdition && (
              <div className="listing-edition-size">
                <label className="listing-label" htmlFor="edition-size">
                  Edition size
                </label>
                <input
                  id="edition-size"
                  className="listing-input listing-input--small"
                  type="number"
                  min={1}
                  max={9999}
                  value={listing.editionSize ?? ''}
                  onChange={e => updateField(
                    'editionSize',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )}
                  placeholder="e.g. 50"
                />
              </div>
            )}
          </section>

          {/* Publish */}
          <section className="listing-section listing-section--publish">
            <button
              className="listing-publish-btn"
              onClick={handlePublish}
              disabled={publishing}
            >
              {publishing ? (
                <>
                  <span className="listing-publish-btn__spinner" />
                  Publishing…
                </>
              ) : (
                <>✦ Publish to Cyberstore</>
              )}
            </button>

            <p className="listing-publish-note">
              Your listing will appear in the Cyberstore immediately.
              You can pause or edit it at any time from your dashboard.
            </p>

            <button
              className="listing-save-draft-btn"
              onClick={() => navigate('/dashboard/creator?tab=store')}
            >
              Save draft, finish later
            </button>
          </section>

        </aside>
      </div>
    </div>
  );
};

export default ListingEditorPage;