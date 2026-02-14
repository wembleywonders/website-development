// src/pages/sandbox/CommunityGallery.tsx
import React, { useState, createContext, useContext } from 'react';
import './ActivityShared.css';

interface CommunityGalleryProps {
  filter?: 'all' | 'journal' | 'mini-lab' | 'voice-note' | 'gallery-post';
  limit?: number;
}
export interface CompletedActivity {
  id: string;
  type: 'mini-lab' | 'journal' | 'voice-note' | 'gallery-post';
  title?: string;
  // some data uses `promptTitle` in the UI
  promptTitle?: string;
  content?: string;
  wordCount?: number;
  // optional duration for voice notes or media posts
  duration?: number;
  // visibility used to filter community vs private
  visibility?: 'private' | 'community' | 'public';
  // timestamp used in UI; keep completedAt for compatibility
  timestamp?: Date | string | number;
  completedAt?: Date | string;
}

export interface SandboxSession {
  sessionId: string;
  programmeName?: string;
  completedActivities: CompletedActivity[];
  createdAt: Date | string;
  lastActiveAt: Date | string;
}

export interface SandboxContextValue {
  session: SandboxSession;
  setCurrentActivity: (activity?: string) => void;
  clearSession: () => void;
}

// Then use in your context:
const SandboxContext = createContext<SandboxContextValue | null>(null);

export const useSandbox = (): SandboxContextValue => {
  const context = useContext(SandboxContext);
  if (!context) {
    throw new Error('useSandbox must be used within a SandboxProvider');
  }
  return context;
};

const CommunityGallery: React.FC<CommunityGalleryProps> = ({
  filter = 'all',
  limit = 12,
}) => {
  const { session } = useSandbox();
  const [selectedItem, setSelectedItem] = useState<CompletedActivity | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  const getTime = (t?: Date | string | number) => new Date(t ?? Date.now()).getTime();

  // Filter activities based on visibility and type
  const communityActivities = session.completedActivities
    .filter((activity) => activity.visibility !== 'private')
    .filter((activity) => (filter === 'all' ? true : activity.type === filter))
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return getTime(b.timestamp ?? b.completedAt) - getTime(a.timestamp ?? a.completedAt);
      }
      // Could add popularity sorting later
      return 0;
    })
    .slice(0, limit);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mini-lab':
        return '⚡';
      case 'journal':
        return '📓';
      case 'voice-note':
        return '🎙️';
      case 'gallery-post':
        return '🖼️';
      default:
        return '✨';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'mini-lab':
        return 'Mini Lab';
      case 'journal':
        return 'Journal';
      case 'voice-note':
        return 'Voice Note';
      case 'gallery-post':
        return 'Gallery Post';
      default:
        return 'Activity';
    }
  };

  const truncateText = (text: string, length: number = 150) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="community-gallery">
      <div className="gallery-header">
        <h2>✨ Community Creations</h2>
        <p>See what others in the community are creating</p>
      </div>

      {communityActivities.length === 0 ? (
        <div className="gallery-empty">
          <p>🌱 No community creations yet</p>
          <p className="empty-subtext">
            Be the first to share something! Create a mini lab, journal entry, or voice note
            and mark it as community or public.
          </p>
        </div>
      ) : (
        <>
          <div className="gallery-controls">
            <label>
              Sort by:
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </label>
          </div>

          <div className="gallery-grid">
            {communityActivities.map((activity: CompletedActivity) => (
              <div
                key={activity.id}
                className="gallery-card"
                onClick={() => setSelectedItem(activity)}
              >
                <div className="card-icon">{getActivityIcon(activity.type)}</div>
                <div className="card-content">
                  <h4>{activity.promptTitle}</h4>
                  <p className="card-preview">{truncateText(activity.content || '')}</p>
                  <div className="card-meta">
                    <span className="activity-type">{getActivityLabel(activity.type)}</span>
                    {activity.wordCount && <span className="word-count">{activity.wordCount} words</span>}
                    {activity.duration && <span className="duration">{activity.duration}s</span>}
                  </div>
                </div>
                <div className="card-date">
                  {new Date(activity.timestamp ?? activity.completedAt ?? Date.now()).toLocaleDateString(
                    'en-GB',
                    {
                      month: 'short',
                      day: 'numeric',
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for viewing full activity */}
      {selectedItem && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-icon">{getActivityIcon(selectedItem.type)}</span>
              <h3>{selectedItem.promptTitle}</h3>
            </div>

            <div className="modal-content">
              <p className="modal-text">{selectedItem.content}</p>

              <div className="modal-metadata">
                <span className="metadata-item">
                  <strong>Type:</strong> {getActivityLabel(selectedItem.type)}
                </span>
                {selectedItem.wordCount && (
                  <span className="metadata-item">
                    <strong>Words:</strong> {selectedItem.wordCount}
                  </span>
                )}
                {selectedItem.duration && (
                  <span className="metadata-item">
                    <strong>Duration:</strong> {selectedItem.duration}s
                  </span>
                )}
                <span className="metadata-item">
                  <strong>Shared:</strong>{' '}
                  {selectedItem.visibility === 'community' ? '👥 Community' : '🌍 Public'}
                </span>
                <span className="metadata-item">
                  <strong>Date:</strong>{' '}
                  {new Date(selectedItem.timestamp ?? selectedItem.completedAt ?? Date.now()).toLocaleDateString(
                    'en-GB',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setSelectedItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityGallery;

