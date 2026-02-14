import React, { useState } from 'react';
import { Upload, Mic, Calendar, Clock, Check, AlertCircle } from 'lucide-react';
import './SimpleUploader.css';

interface VolunteerProfile {
  id: string;
  name: string;
  role: 'host' | 'producer' | 'tech' | 'content_creator';
}

interface SimpleUploaderProps {
  userProfile: VolunteerProfile | null;
  onUploadComplete: () => void;
}

export const SimpleUploader: React.FC<SimpleUploaderProps> = ({ 
  userProfile, 
  onUploadComplete 
}) => {
  const [uploadStep, setUploadStep] = useState<'select' | 'details' | 'uploading' | 'complete'>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showTitle, setShowTitle] = useState('');
  const [showDescription, setShowDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStep('details');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStep('uploading');
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStep('complete');
          setTimeout(() => {
            onUploadComplete();
            resetForm();
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetForm = () => {
    setUploadStep('select');
    setSelectedFile(null);
    setShowTitle('');
    setShowDescription('');
    setScheduledTime('');
    setUploadProgress(0);
  };

  if (!userProfile) {
    return (
      <div className="simple-uploader">
        <div className="access-denied">
          <AlertCircle size={32} />
          <h3>Access Required</h3>
          <p>Please log in with your volunteer account to upload content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="simple-uploader">
      <div className="uploader-header">
        <Mic size={24} />
        <div>
          <h3>Content Upload</h3>
          <p>Welcome back, {userProfile.name} ({userProfile.role})</p>
        </div>
      </div>

      {uploadStep === 'select' && (
        <div className="upload-select">
          <div className="upload-zone">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="file-input"
              id="audio-upload"
            />
            <label htmlFor="audio-upload" className="upload-label">
              <Upload size={48} />
              <h4>Upload Your Show</h4>
              <p>Drag & drop an audio file or click to browse</p>
              <small>Supported: MP3, WAV, M4A (max 100MB)</small>
            </label>
          </div>
        </div>
      )}

      {uploadStep === 'details' && selectedFile && (
        <div className="upload-details">
          <div className="file-info">
            <div className="file-preview">
              <Mic size={32} />
              <div>
                <h4>{selectedFile.name}</h4>
                <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="details-form">
            <div className="form-group">
              <label htmlFor="show-title">Show Title *</label>
              <input
                type="text"
                id="show-title"
                value={showTitle}
                onChange={(e) => setShowTitle(e.target.value)}
                placeholder="e.g., Community Voices with Sarah"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="show-description">Description</label>
              <textarea
                id="show-description"
                value={showDescription}
                onChange={(e) => setShowDescription(e.target.value)}
                placeholder="Brief description of your show content..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="scheduled-time">Schedule for Broadcast</label>
              <input
                type="datetime-local"
                id="scheduled-time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
              <small>Leave empty to publish immediately</small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="upload-btn">
                <Upload size={16} />
                Upload Show
              </button>
            </div>
          </form>
        </div>
      )}

      {uploadStep === 'uploading' && (
        <div className="upload-progress">
          <div className="progress-header">
            <Mic size={32} />
            <h4>Uploading Your Show...</h4>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>{uploadProgress}% complete</p>
        </div>
      )}

      {uploadStep === 'complete' && (
        <div className="upload-complete">
          <Check size={48} />
          <h4>Upload Successful!</h4>
          <p>Your show "{showTitle}" has been uploaded and is ready for broadcast.</p>
          {scheduledTime && (
            <div className="schedule-info">
              <Calendar size={16} />
              <span>Scheduled for {new Date(scheduledTime).toLocaleString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};