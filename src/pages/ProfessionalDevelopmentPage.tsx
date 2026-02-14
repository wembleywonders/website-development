import React from 'react';
import DraggableMaya from "../components/maya/DraggableMaya";

const ProfessionalDevelopmentPage: React.FC = () => {
  return (
    <div className="professional-development-page">
      <h1>Professional Development</h1>
      <p>Professional development content coming soon...</p>
      <DraggableMaya membershipTier="membership" />
    </div>
  );
};

export default ProfessionalDevelopmentPage;
