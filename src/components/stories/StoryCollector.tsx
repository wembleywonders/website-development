import React, { useState } from 'react';
import { CommunityStory } from '../../types/stories';
import { storyCollectionService } from '../../services/impact/storyCollectionService';
import './StoryCollector.css';

interface StoryCollectorProps {
  platform: 'raydyo' | 'joystick' | 'passionistas' | 'kaywanas-court';
  businessPartners: string[];
}

const StoryCollector: React.FC<StoryCollectorProps> = ({ platform, businessPartners }) => {
  const [formData, setFormData] = useState({
    participantName: '',
    businessPartner: '',
    storyType: 'success' as const,
    content: '',
    tags: ''
  });

  const platformPrompts = {
    raydyo: [
      "Tell us about a skill you've developed through our programmes.",
      "How has working with local businesses affected your career path?",
      "What's the most valuable thing you've learned from a community mentor?"
    ],
    joystick: [
      "Describe a project you've completed with a business partner.",
      "What advice would you give to someone starting their journey with us?",
      "How has your involvement changed your perspective on your community?"
    ],
    passionistas: [
      "What's your proudest achievement from the programmes?",
      "How has Maya or the ROV system helped your development?",
      "What would you tell other young people about getting involved?"
    ],
    'kaywanas-court': [
      "Share a moment when you felt truly supported by the community.",
      "How has creative collaboration impacted your personal growth?",
      "What community connection are you most grateful for?"
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await storyCollectionService.collectStory({
        ...formData,
        platform,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        verificationStatus: 'unverified'
      });
      
      // Reset form
      setFormData({
        participantName: '',
        businessPartner: '',
        storyType: 'success',
        content: '',
        tags: ''
      });
      
      alert('Thank you for sharing your story! We\'ll review it for publication.');
    } catch (error) {
      alert('There was an error submitting your story. Please try again.');
    }
  };

  return (
    <div className="story-collector">
      <h3>Share Your {platform.charAt(0).toUpperCase() + platform.slice(1)} Story</h3>
      
      <div className="story-prompts">
        <h4>Story prompts to get you started:</h4>
        <ul>
          {platformPrompts[platform].map((prompt, index) => (
            <li key={index}>{prompt}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="participantName">Your Name (or initials if you prefer)</label>
          <input
            type="text"
            id="participantName"
            value={formData.participantName}
            onChange={(e) => setFormData({...formData, participantName: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessPartner">Business Partner (if applicable)</label>
          <select
            id="businessPartner"
            value={formData.businessPartner}
            onChange={(e) => setFormData({...formData, businessPartner: e.target.value})}
          >
            <option value="">Not applicable</option>
            {businessPartners.map(partner => (
              <option key={partner} value={partner}>{partner}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="storyType">Story Type</label>
          <select
            id="storyType"
            value={formData.storyType}
            onChange={(e) => setFormData({...formData, storyType: e.target.value as any})}
          >
            <option value="success">Success Story</option>
            <option value="progress">Progress Update</option>
            <option value="challenge">Challenge Overcome</option>
            <option value="collaboration">Business Collaboration</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Story</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={6}
            placeholder="Share your experience, what you learned, how it's impacted you..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Keywords (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="e.g. coding, mentorship, employment, skills"
          />
        </div>

        <button type="submit">Share Your Story</button>
      </form>
    </div>
  );
};

export default StoryCollector;
