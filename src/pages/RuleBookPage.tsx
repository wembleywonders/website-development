import React from 'react';
import DraggableMaya from "../components/maya/DraggableMaya";

const RuleBookPage: React.FC = () => {
  return (
    <div className="rulebook-page">
      <h1>Connector's Rule Book</h1>
      <p>Rule book content coming soon...</p>
      <DraggableMaya membershipTier="membership" />
    </div>
  );
};

export default RuleBookPage;
