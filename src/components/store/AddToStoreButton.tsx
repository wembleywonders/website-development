/**
 * AddToStoreButton.tsx
 * Wembley Wonders CIC
 *
 * The single button that connects sandbox to Cyberstore.
 * Appears at the point of export in every sandbox.
 * One click → pre-populated listing draft → creator reviews → publish.
 *
 * Drop this into any sandbox export flow.
 * It already exists in: Trubble n Bass, Joystick, Kaywana's Court etc.
 * Add it wherever there's a download/export button.
 *
 * Usage:
 *   <AddToStoreButton
 *     payload={exportPayload}
 *     onListingCreated={(draft) => navigate(`/cyberstore/listings/${draft.listing.id}/edit`)}
 *   />
 */

import React, { useState } from 'react';
import {
  SandboxExportPayload,
  StoreListing,
  StoreListingDraftResponse,
  buildListingDraft,
  saveListingDraft,
  getProgrammeLabel,
} from './sandboxToStoreService';
import './AddToStoreButton.css';

// ─── Props ────────────────────────────────────────────────────────────────────

interface AddToStoreButtonProps {
  payload: SandboxExportPayload;
  creatorDisplayName: string;
  authToken: string;                      // From your auth context/store
  onListingCreated: (draft: StoreListingDraftResponse) => void;
  onError?: (error: string) => void;
  variant?: 'primary' | 'secondary';     // primary = after export, secondary = inline
}

// ─── Component ────────────────────────────────────────────────────────────────

const AddToStoreButton: React.FC<AddToStoreButtonProps> = ({
  payload,
  creatorDisplayName,
  authToken,
  onListingCreated,
  onError,
  variant = 'primary',
}) => {
  const [state, setState] = useState<'idle' | 'building' | 'saving' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const programmeLabel = getProgrammeLabel(payload.programmeSlug);

  const handleClick = async () => {
    if (state !== 'idle') return;

    try {
      // Step 1 — build the draft locally
      setState('building');
      const draft = buildListingDraft(payload, creatorDisplayName);

      // Brief pause so the state change is perceptible — not jarring
      await new Promise(r => setTimeout(r, 400));

      // Step 2 — save to backend
      setState('saving');
      const response = await saveListingDraft(draft, authToken);

      setState('done');

      // Hand off to parent — typically navigates to the edit page
      setTimeout(() => onListingCreated(response), 600);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setState('error');
      setErrorMsg(message);
      onError?.(message);

      // Reset after 4 seconds so they can try again
      setTimeout(() => {
        setState('idle');
        setErrorMsg('');
      }, 4000);
    }
  };

  return (
    <div className={`add-to-store add-to-store--${variant}`}>
      <button
        className={`add-to-store__btn add-to-store__btn--${state}`}
        onClick={handleClick}
        disabled={state !== 'idle' && state !== 'error'}
        aria-live="polite"
        aria-label={
          state === 'idle' ? `Add this ${programmeLabel} work to your Cyberstore` :
          state === 'building' ? 'Preparing your listing…' :
          state === 'saving' ? 'Saving your listing…' :
          state === 'done' ? 'Listing created — taking you there' :
          'Something went wrong'
        }
      >
        <span className="add-to-store__icon" aria-hidden="true">
          {state === 'idle'    && '✦'}
          {state === 'building' && <span className="add-to-store__spinner" />}
          {state === 'saving'   && <span className="add-to-store__spinner" />}
          {state === 'done'     && '✓'}
          {state === 'error'    && '⚠'}
        </span>

        <span className="add-to-store__label">
          {state === 'idle'     && 'Add to Cyberstore'}
          {state === 'building' && 'Preparing listing…'}
          {state === 'saving'   && 'Saving…'}
          {state === 'done'     && 'Listing ready'}
          {state === 'error'    && 'Try again'}
        </span>
      </button>

      {/* Contextual message beneath the button */}
      <div className="add-to-store__context">
        {state === 'idle' && (
          <p className="add-to-store__hint">
            We'll pre-fill your listing from this {programmeLabel} session.
            You set the price. You keep 55%.
          </p>
        )}
        {state === 'building' && (
          <p className="add-to-store__hint">
            Building your listing from this session…
          </p>
        )}
        {state === 'saving' && (
          <p className="add-to-store__hint">
            Saving your draft to the Cyberstore…
          </p>
        )}
        {state === 'done' && (
          <p className="add-to-store__hint add-to-store__hint--success">
            Your listing draft is ready. Taking you there to set your price.
          </p>
        )}
        {state === 'error' && (
          <p className="add-to-store__hint add-to-store__hint--error">
            {errorMsg}
          </p>
        )}
      </div>

      {/* Revenue split — always visible when idle, reinforces the promise */}
      {state === 'idle' && variant === 'primary' && (
        <div className="add-to-store__split">
          <div className="add-to-store__split-bar">
            <div
              className="add-to-store__split-segment add-to-store__split-segment--creator"
              style={{ width: '55%' }}
              title="Your earnings — 55%"
            >
              <span>You 55%</span>
            </div>
            <div
              className="add-to-store__split-segment add-to-store__split-segment--reserve"
              style={{ width: '25%' }}
              title="Community reserve — 25%"
            >
              <span>Community 25%</span>
            </div>
            <div
              className="add-to-store__split-segment add-to-store__split-segment--ops"
              style={{ width: '20%' }}
              title="Platform operations — 20%"
            >
              <span>Platform 20%</span>
            </div>
          </div>
          <p className="add-to-store__split-note">
            Every sale. Always. Hardcoded, not a promise.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToStoreButton;