import React from 'react';
import DraggableMaya from "../components/maya/DraggableMaya";

const CommunityVoicePage: React.FC = () => {
  return (
    <div className="community-voice-page">
      <h1>Community Voice</h1>
      <p>Community voice content coming soon...</p>
      <DraggableMaya membershipTier="membership" />
    </div>
  );
};

export default CommunityVoicePage;
