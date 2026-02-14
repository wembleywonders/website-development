import React, { useState } from 'react';
import '../ActivityShared.css';

interface GalleryPostStepProps {
  labResult?: any;
  journal?: string;
  voiceNote?: string;
  onPost: () => void;
}

const GalleryPostStep: React.FC<GalleryPostStepProps> = ({
  labResult,
  journal,
  voiceNote,
  onPost
}) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  const suggestedTags = [
    'Music Production',
    'Creative Writing',
    'Digital Art',
    'Community Voice',
    'Learning Journey',
    'First Creation',
    'Experimentation',
    'Cultural Heritage'
  ];

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePost = async () => {
    if (title.length < 3) {
      return;
    }

    setIsPosting(true);
    
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onPost();
  };

  return (
    <div className="activity-container">
      <div className="activity-header">
        <h2>📤 Share to Community Gallery</h2>
        <p className="activity-subtitle">
          Your creation is ready! Add some details and share it with the community.
        </p>
      </div>

      <div className="post-preview-section">
        <h3>Your Creation Preview</h3>
        
        {labResult && (
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-icon">🧪</span>
              <strong>Mini Lab Creation</strong>
            </div>
            <p>{labResult.title || 'Your creative project'}</p>
            {labResult.description && (
              <p className="preview-description">{labResult.description}</p>
            )}
          </div>
        )}

        {journal && (
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-icon">📖</span>
              <strong>Journal Reflection</strong>
            </div>
            <p className="preview-text">
              {journal.substring(0, 150)}
              {journal.length > 150 && '...'}
            </p>
            <p className="preview-meta">{journal.split(' ').length} words</p>
          </div>
        )}

        {voiceNote && (
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-icon">🎙️</span>
              <strong>Voice Note</strong>
            </div>
            <audio controls src={voiceNote} className="preview-audio">
              Your browser doesn't support audio playback.
            </audio>
          </div>
        )}
      </div>

      <div className="post-details-section">
        <h3>Post Details</h3>
        
        <div className="input-group">
          <label htmlFor="post-title">Title *</label>
          <input
            id="post-title"
            type="text"
            className="text-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your creation a title..."
            maxLength={60}
          />
          <span className="char-count">{title.length}/60</span>
        </div>

        <div className="input-group">
          <label>Tags (optional, max 5)</label>
          <div className="tags-container">
            {tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button 
                  className="tag-remove" 
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove ${tag} tag`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <div className="tag-input-row">
            <input
              type="text"
              className="text-input"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(currentTag);
                }
              }}
              placeholder="Type a tag and press Enter..."
              disabled={tags.length >= 5}
            />
            <button
              className="btn-secondary"
              onClick={() => handleAddTag(currentTag)}
              disabled={!currentTag || tags.length >= 5}
            >
              Add
            </button>
          </div>

          <div className="suggested-tags">
            <p>Suggested tags:</p>
            <div className="tags-container">
              {suggestedTags
                .filter(tag => !tags.includes(tag))
                .slice(0, 5)
                .map(tag => (
                  <button
                    key={tag}
                    className="tag-suggestion"
                    onClick={() => handleAddTag(tag)}
                    disabled={tags.length >= 5}
                  >
                    + {tag}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span>Make this post public</span>
          </label>
          <p className="helper-text">
            {isPublic 
              ? 'Everyone in the community can see this post.' 
              : 'Only you and community moderators can see this post.'}
          </p>
        </div>
      </div>

      <div className="privacy-notice">
        <h4>📋 Before you post:</h4>
        <ul>
          <li>Your post will be visible to {isPublic ? 'the entire community' : 'only you and moderators'}</li>
          <li>Your name and profile will be shown with this post</li>
          <li>Community guidelines apply to all posts</li>
          <li>You can edit or delete this post later from your dashboard</li>
        </ul>
      </div>

      <div className="activity-actions">
        <button
          className="btn-primary btn-large"
          onClick={handlePost}
          disabled={title.length < 3 || isPosting}
        >
          {isPosting ? (
            <>
              <span className="spinner"></span>
              Posting...
            </>
          ) : (
            '📤 Post to Gallery'
          )}
        </button>
        
        {title.length < 3 && (
          <p className="helper-text error">
            Please add a title (at least 3 characters)
          </p>
        )}
      </div>

      <div className="what-happens-next">
        <h4>What happens next?</h4>
        <p>
          Once posted, your creation will appear in the community gallery where others can:
        </p>
        <ul>
          <li>View and listen to your work</li>
          <li>Leave encouraging comments</li>
          <li>React with emojis</li>
          <li>Connect with you for collaboration</li>
        </ul>
        <p className="helper-text">
          This is the beginning of your creative journey with Wembley Wonders!
        </p>
      </div>
    </div>
  );
};

export default GalleryPostStep;
