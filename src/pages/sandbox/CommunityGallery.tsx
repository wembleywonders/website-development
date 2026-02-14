// src/pages/sandbox/CommunityGallery.tsx
import React, { useState } from 'react';
import { useSandbox, ActivityResult } from '../../contexts/SandboxContext';
import './ActivityShared.css';

interface CommunityGalleryProps {
  filter?: 'all' | 'journal' | 'mini-lab' | 'voice-note' | 'gallery-post';
  limit?: number;
}

const CommunityGallery: React.FC<CommunityGalleryProps> = ({
  filter = 'all',
  limit = 12,
}) => {
  const { session } = useSandbox();
  const [selectedItem, setSelectedItem] = useState<ActivityResult | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  // Filter activities based on visibility and type
  const communityActivities = session.completedActivities
    .filter(activity => activity.visibility !== 'private')
    .filter(activity => (filter === 'all' ? true : activity.type === filter))
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
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
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
              </select>
            </label>
            <p className="gallery-count">
              Showing {communityActivities.length} creation{communityActivities.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="gallery-grid">
            {communityActivities.map(activity => (
              <div
                key={activity.id}
                className="gallery-card"
                onClick={() => setSelectedItem(activity)}
              >
                <div className="card-icon">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="card-content">
                  <h4>{activity.promptTitle}</h4>
                  <p className="card-preview">
                    {truncateText(activity.content)}
                  </p>
                  <div className="card-meta">
                    <span className="activity-type">
                      {getActivityLabel(activity.type)}
                    </span>
                    {activity.wordCount && (
                      <span className="word-count">{activity.wordCount} words</span>
                    )}
                    {activity.duration && (
                      <span className="duration">{activity.duration}s</span>
                    )}
                  </div>
                </div>
                <div className="card-date">
                  {new Date(activity.timestamp).toLocaleDateString('en-GB', {
                    month: 'short',
                    day: 'numeric',
                  })}
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
            <button
              className="modal-close"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-icon">
                {getActivityIcon(selectedItem.type)}
              </span>
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
                  {new Date(selectedItem.timestamp).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-primary"
                onClick={() => setSelectedItem(null)}
              >
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
