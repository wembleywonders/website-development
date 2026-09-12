import React, { useState, useEffect, useMemo } from 'react';
import { RootsProvenanceRecord } from './ProvenanceRecord';
import './OralArchive.css';

/**
 * OralArchive.tsx — browse previously captured oral history entries.
 *
 * SCOPE NOTE: no prior build exists for this file — new territory. Reuses
 * RootsProvenanceRecord from ProvenanceRecord.tsx rather than defining a
 * second provenance shape, since that type is real and already landed
 * this session. This is the listening/browsing view; ElderCapture.tsx
 * (still empty) is presumably the recording UI that produces these
 * entries in the first place — not assumed or built here.
 */

export interface OralArchiveEntry {
  id: string;
  title: string;
  audioUrl: string;
  durationSeconds: number;
  transcript?: string;
  provenance: RootsProvenanceRecord;
}

// TODO: replace with a real API call once the Roots backend endpoint
// exists. Mirrors the "provided ≠ saved" rule — mock data stays clearly
// marked, never silently indistinguishable from live data.
async function fetchOralArchiveMock(): Promise<OralArchiveEntry[]> {
  return [];
}

const MATERIAL_FILTER_OPTIONS: { value: RootsProvenanceRecord['materialType'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'recipe', label: 'Recipes' },
  { value: 'oral-history', label: 'Oral history' },
  { value: 'remedy', label: 'Remedies' },
  { value: 'ritual-practice', label: 'Rituals' },
  { value: 'song-or-chant', label: 'Songs & chants' },
  { value: 'other', label: 'Other' },
];

interface OralArchiveProps {
  onSelectEntry?: (entry: OralArchiveEntry) => void;
}

const OralArchive: React.FC<OralArchiveProps> = ({ onSelectEntry }) => {
  const [entries, setEntries] = useState<OralArchiveEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RootsProvenanceRecord['materialType'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [nowPlayingId, setNowPlayingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchOralArchiveMock()
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load the archive.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesFilter = filter === 'all' || entry.provenance.materialType === filter;
      const matchesSearch =
        searchTerm.trim().length === 0 ||
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.provenance.originatorName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [entries, filter, searchTerm]);

  const togglePlay = (entry: OralArchiveEntry) => {
    setNowPlayingId((prev) => (prev === entry.id ? null : entry.id));
  };

  return (
    <div className="oral-archive">
      <header className="oral-archive__header">
        <h2>The Archive</h2>
        <p className="oral-archive__subtitle">
          Stories, recipes, and knowledge kept by the people who carry them.
        </p>
      </header>

      <div className="oral-archive__controls">
        <input
          type="text"
          className="oral-archive__search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or who it's from…"
        />
        <div className="oral-archive__filter-row">
          {MATERIAL_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`oral-archive__filter-btn${filter === opt.value ? ' oral-archive__filter-btn--active' : ''}`}
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="oral-archive__status">Loading the archive…</p>}
      {error && <p className="oral-archive__status oral-archive__status--error">{error}</p>}

      {!loading && !error && filteredEntries.length === 0 && (
        <p className="oral-archive__empty">
          Nothing here yet. Nothing is illustrative — this reflects what&rsquo;s actually
          been captured and shared with consent.
        </p>
      )}

      {!loading && !error && filteredEntries.length > 0 && (
        <ul className="oral-archive__list">
          {filteredEntries.map((entry) => (
            <li key={entry.id} className="oral-archive__entry">
              <button
                type="button"
                className="oral-archive__entry-main"
                onClick={() => onSelectEntry?.(entry)}
              >
                <h3 className="oral-archive__entry-title">{entry.title}</h3>
                <p className="oral-archive__entry-from">
                  From {entry.provenance.originatorName}
                  {entry.provenance.originatorRelationship && ` (${entry.provenance.originatorRelationship})`}
                </p>
                <p className="oral-archive__entry-lineage">
                  {entry.provenance.lineageDescription.slice(0, 100)}
                  {entry.provenance.lineageDescription.length > 100 ? '…' : ''}
                </p>
              </button>

              <button
                type="button"
                className="oral-archive__play-btn"
                onClick={() => togglePlay(entry)}
                aria-label={nowPlayingId === entry.id ? 'Pause' : 'Play'}
              >
                {nowPlayingId === entry.id ? '❚❚' : '▶'}
              </button>

              {nowPlayingId === entry.id && (
                <audio
                  className="oral-archive__audio"
                  src={entry.audioUrl}
                  autoPlay
                  onEnded={() => setNowPlayingId(null)}
                  controls
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OralArchive;
