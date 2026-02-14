import React, { useEffect, useState } from 'react';
import { storyCollectionService } from '../../services/impact/storyCollectionService';
import { CommunityStory } from '../../types/stories';
import './BusinessImpactDisplay.css';

interface BusinessImpactDisplayProps {
  businessId: string;
  businessName: string;
}

const BusinessImpactDisplay: React.FC<BusinessImpactDisplayProps> = ({ 
  businessId, 
  businessName 
}) => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [impactSummary, setImpactSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImpactData = async () => {
      try {
        const [storiesData, summaryData] = await Promise.all([
          storyCollectionService.getVerifiedStories(businessId),
          storyCollectionService.getBusinessImpactSummary(businessId)
        ]);
        
        setStories(storiesData);
        setImpactSummary(summaryData);
      } catch (error) {
        console.error('Error loading impact data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImpactData();
  }, [businessId]);

  if (loading) {
    return <div className="loading">Loading impact data...</div>;
  }

  return (
    <div className="business-impact-display">
      <h3>{businessName} Community Impact</h3>
      
      {impactSummary && (
        <div className="impact-summary">
          <div className="metric-cards">
            <div className="metric-card">
              <span className="metric-number">{impactSummary.participantsSupported || 0}</span>
              <span className="metric-label">Participants Supported</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{impactSummary.projectsCompleted || 0}</span>
              <span className="metric-label">Projects Completed</span>
            </div>
            <div className="metric-card">
              <span className="metric-number">{impactSummary.mentorshipHours || 0}</span>
              <span className="metric-label">Mentorship Hours</span>
            </div>
          </div>
          
          <p className="verification-note">
            *All metrics independently verified through participant feedback and programme records.
          </p>
        </div>
      )}

      <div className="community-stories">
        <h4>Community Stories</h4>
        {stories.length > 0 ? (
          stories.map(story => (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <span className="story-type">{story.storyType}</span>
                <span className="story-platform">{story.platform}</span>
              </div>
              <div className="story-content">
                {story.content}
              </div>
              <div className="story-footer">
                <span className="story-author">- {story.participantName}</span>
                <div className="story-tags">
                  {story.tags.map(tag => (
                    <span key={tag} className="story-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No verified stories available yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default BusinessImpactDisplay;
