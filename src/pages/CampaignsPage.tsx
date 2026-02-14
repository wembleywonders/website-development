import React from 'react';
import DraggableMaya from "../components/maya/DraggableMaya";

const CampaignsPage: React.FC = () => {
  return (
    <div className="campaigns-page">
      <h1>Current Campaigns</h1>
      <p>Crowdfunding campaigns content coming soon...</p>
      <DraggableMaya membershipTier="membership" />
    </div>
  );
};

export default CampaignsPage;
