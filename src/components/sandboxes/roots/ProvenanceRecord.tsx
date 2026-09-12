import React, { useState } from 'react';

/**
 * ProvenanceRecord.tsx — Roots sandbox: heritage and oral-history provenance capture.
 *
 * NOTE: There are (at least) three existing ProvenanceRecord type definitions
 * elsewhere in the codebase (features/provenance/types/index.ts, one used by
 * CommunityShopPage.tsx, one from the Suno/Trubble n Bass provenance work).
 * This file deliberately does NOT reuse any of them without confirmation —
 * doing so blind would risk aligning to the wrong shape and deepening the
 * duplication rather than resolving it.
 *
 * RootsProvenanceRecord below is scoped narrowly to what THIS room needs:
 * elder/family attribution, oral consent, and heritage lineage. If one of
 * the existing types already covers this, swap the import in one edit —
 * the component logic won't need to change, only the type source.
 */

export interface RootsProvenanceRecord {
  id: string;
  /** The elder, family member, or community source this knowledge came from */
  originatorName: string;
  originatorRelationship: string; // e.g. "grandmother", "community elder", "family recipe book"
  /** What kind of heritage material this captures */
  materialType: 'recipe' | 'oral-history' | 'remedy' | 'ritual-practice' | 'song-or-chant' | 'other';
  /** Free text describing the lineage — where/when/how it was passed down */
  lineageDescription: string;
  /** Has the originator (or their family, if they've passed) given consent to record and share this? */
  consentGiven: boolean;
  consentNotes?: string;
  /** Language or dialect the material was originally passed down in, if relevant */
  originalLanguage?: string;
  recordedAt: string;
  recordedBy: string; // member/creator id who captured this
}

export interface ProvenanceRecordProps {
  /** Existing record to display/edit; omit to start a fresh capture */
  record?: RootsProvenanceRecord;
  onSave: (record: RootsProvenanceRecord) => void;
  onCancel?: () => void;
}

const MATERIAL_TYPES: { value: RootsProvenanceRecord['materialType']; label: string }[] = [
  { value: 'recipe', label: 'Family recipe' },
  { value: 'oral-history', label: 'Oral history / story' },
  { value: 'remedy', label: 'Traditional remedy' },
  { value: 'ritual-practice', label: 'Ritual or practice' },
  { value: 'song-or-chant', label: 'Song or chant' },
  { value: 'other', label: 'Other' },
];

const ProvenanceRecord: React.FC<ProvenanceRecordProps> = ({ record, onSave, onCancel }) => {
  const [originatorName, setOriginatorName] = useState(record?.originatorName ?? '');
  const [originatorRelationship, setOriginatorRelationship] = useState(record?.originatorRelationship ?? '');
  const [materialType, setMaterialType] = useState<RootsProvenanceRecord['materialType']>(
    record?.materialType ?? 'recipe'
  );
  const [lineageDescription, setLineageDescription] = useState(record?.lineageDescription ?? '');
  const [consentGiven, setConsentGiven] = useState(record?.consentGiven ?? false);
  const [consentNotes, setConsentNotes] = useState(record?.consentNotes ?? '');
  const [originalLanguage, setOriginalLanguage] = useState(record?.originalLanguage ?? '');

  const canSave = originatorName.trim().length > 0 && lineageDescription.trim().length > 0 && consentGiven;

  const handleSave = () => {
    if (!canSave) return;
    onSave({
      id: record?.id ?? crypto.randomUUID(),
      originatorName: originatorName.trim(),
      originatorRelationship: originatorRelationship.trim(),
      materialType,
      lineageDescription: lineageDescription.trim(),
      consentGiven,
      consentNotes: consentNotes.trim() || undefined,
      originalLanguage: originalLanguage.trim() || undefined,
      recordedAt: record?.recordedAt ?? new Date().toISOString(),
      recordedBy: record?.recordedBy ?? '', // TODO: populate from auth context
    });
  };

  return (
    <div className="provenance-record">
      <h3>Where does this come from?</h3>
      <p className="provenance-record__intro">
        Every piece of heritage knowledge has a source. This isn&rsquo;t paperwork — it&rsquo;s
        making sure the person or family it came from is remembered and credited.
      </p>

      <label className="provenance-record__field">
        <span>Who did this come from?</span>
        <input
          type="text"
          value={originatorName}
          onChange={(e) => setOriginatorName(e.target.value)}
          placeholder="e.g. Grandma Winnie"
        />
      </label>

      <label className="provenance-record__field">
        <span>Their relationship to you</span>
        <input
          type="text"
          value={originatorRelationship}
          onChange={(e) => setOriginatorRelationship(e.target.value)}
          placeholder="e.g. grandmother, community elder"
        />
      </label>

      <label className="provenance-record__field">
        <span>What kind of knowledge is this?</span>
        <select
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value as RootsProvenanceRecord['materialType'])}
        >
          {MATERIAL_TYPES.map((mt) => (
            <option key={mt.value} value={mt.value}>{mt.label}</option>
          ))}
        </select>
      </label>

      <label className="provenance-record__field">
        <span>Tell its story — where it came from, how it was passed down</span>
        <textarea
          value={lineageDescription}
          onChange={(e) => setLineageDescription(e.target.value)}
          rows={4}
          placeholder="e.g. My grandmother learned this from her mother in Kingston in the 1950s..."
        />
      </label>

      <label className="provenance-record__field">
        <span>Original language or dialect (if any)</span>
        <input
          type="text"
          value={originalLanguage}
          onChange={(e) => setOriginalLanguage(e.target.value)}
          placeholder="e.g. Patois, Yoruba, Krio"
        />
      </label>

      <div className="provenance-record__consent">
        <label className="provenance-record__checkbox">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
          />
          <span>
            I have consent (from them, or their family if they&rsquo;ve passed) to share this
            publicly on the platform
          </span>
        </label>
        {!consentGiven && (
          <p className="provenance-record__consent-warning">
            This can&rsquo;t be saved without consent. If you&rsquo;re not sure, that&rsquo;s okay —
            come back to this once you&rsquo;ve checked.
          </p>
        )}
        <textarea
          className="provenance-record__consent-notes"
          value={consentNotes}
          onChange={(e) => setConsentNotes(e.target.value)}
          rows={2}
          placeholder="Optional: any notes about how consent was given"
        />
      </div>

      <div className="provenance-record__actions">
        {onCancel && (
          <button type="button" onClick={onCancel} className="provenance-record__cancel">
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className="provenance-record__save"
        >
          Save provenance record
        </button>
      </div>
    </div>
  );
};

export default ProvenanceRecord;
