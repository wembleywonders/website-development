// src/components/media/MediaSection.tsx
import React, { useState, useRef } from 'react';
import { Upload, Camera, Video, Image, Plus, Calendar, User, Tag, X, Edit, Trash2 } from 'lucide-react';
import './MediaSection.css';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  contentType: string;
  archived?: boolean;
}

interface MediaSectionProps {
  allowedRoles: string[];
  contentType: string;
  placeholder: string;
  layout: 'grid' | 'carousel' | 'masonry';
  autoArchive?: boolean;
  title: string;
  description?: string;
  maxItems?: number;
}

const MediaSection: React.FC<MediaSectionProps> = ({
  allowedRoles,
  contentType,
  placeholder,
  layout,
  autoArchive = false,
  title,
  description,
  maxItems = 12
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock user role - in real app, this would come from auth context
  const currentUserRole = 'volunteer'; // Mock role
  const canUpload = allowedRoles.includes(currentUserRole);

  // CRITICAL: Hide section for non-staff when empty
  if (mediaItems.length === 0 && !canUpload) {
    return null;
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !canUpload) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        // In real app, this would upload to your media service
        const newItem: MediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: URL.createObjectURL(file), // Mock URL - would be real upload URL
          title: file.name.split('.')[0],
          description: '',
          uploadedBy: 'Current User', // Would be real user name
          uploadedAt: new Date(),
          tags: [contentType],
          contentType: contentType,
          archived: false
        };
        
        setMediaItems(prev => [newItem, ...prev].slice(0, maxItems));
      }
    });
    
    setShowUploadForm(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDelete = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleArchive = (id: string) => {
    setMediaItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, archived: !item.archived } : item
      )
    );
  };

  const getLayoutClass = () => {
    switch (layout) {
      case 'grid': return 'media-grid';
      case 'carousel': return 'media-carousel';
      case 'masonry': return 'media-masonry';
      default: return 'media-grid';
    }
  };

  return (
    <div className="media-section">
      <div className="media-header">
        <div className="media-title-section">
          <h3>{title}</h3>
          {description && <p className="media-description">{description}</p>}
        </div>
        
        {canUpload && (
          <div className="media-controls">
            <button 
              className="upload-button"
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              <Plus size={18} />
              <span>Add Media</span>
            </button>
          </div>
        )}
      </div>

      {showUploadForm && canUpload && (
        <div className="upload-form">
          <div 
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={32} />
            <h4>Upload Media</h4>
            <p>{placeholder}</p>
            <span className="upload-hint">
              Drag and drop files here, or click to select
            </span>
            <div className="file-types">
              <span><Image size={16} /> Images</span>
              <span><Video size={16} /> Videos</span>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {mediaItems.length > 0 ? (
        <div className={`media-container ${getLayoutClass()}`}>
          {mediaItems.filter(item => !item.archived || autoArchive).map(item => (
            <div key={item.id} className="media-item">
              <div className="media-content">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title} />
                ) : (
                  <video src={item.url} controls />
                )}
                
                <div className="media-overlay">
                  <div className="media-info">
                    <h5>{item.title}</h5>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  
                  {canUpload && (
                    <div className="media-actions">
                      <button 
                        className="action-button archive"
                        onClick={() => handleArchive(item.id)}
                        title={item.archived ? "Unarchive" : "Archive"}
                      >
                        <Calendar size={14} />
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="media-meta">
                <div className="media-author">
                  <User size={12} />
                  <span>{item.uploadedBy}</span>
                </div>
                <div className="media-date">
                  <Calendar size={12} />
                  <span>{item.uploadedAt.toLocaleDateString()}</span>
                </div>
                <div className="media-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="media-empty">
          <div className="empty-content">
            <Camera size={48} />
            <h4>No Media Yet</h4>
            <p>{placeholder}</p>
            {canUpload && (
              <button 
                className="empty-upload-button"
                onClick={() => setShowUploadForm(true)}
              >
                <Plus size={16} />
                Upload First Item
              </button>
            )}
          </div>
        </div>
      )}

      {mediaItems.length > 0 && (
        <div className="media-footer">
          <div className="media-stats">
            <span>{mediaItems.filter(item => !item.archived).length} items</span>
            {autoArchive && (
              <span>• Auto-archiving enabled</span>
            )}
            <span>• Content type: {contentType}</span>
          </div>
          
          {mediaItems.some(item => item.archived) && (
            <button className="view-archived">
              View Archived ({mediaItems.filter(item => item.archived).length})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaSection;