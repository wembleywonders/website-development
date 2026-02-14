// src/pages/programmes/{programme-slug}/index.tsx
import React from 'react';
import ProgrammePageTemplate from '../_shared/ProgrammePageTemplate';
import { getProgramme } from '../config';
import './Programme.css';

const ProgrammePage: React.FC = () => {
  const config = getProgramme('programme-slug');

  if (!config) {
    return <div className="programme-not-found">Programme not found</div>;
  }

  return (
    <ProgrammePageTemplate
      config={config}
      interactiveTool={<ProgrammeInteractiveTool />}
      communityShowcase={<ProgrammeShowcase />}
    />
  );
};

// Interactive Tool Component - Programme-specific sandbox preview
const ProgrammeInteractiveTool: React.FC = () => {
  return (
    <div className="programme-interactive-tool">
      {/* Programme-specific content */}
    </div>
  );
};

// Community Showcase Component - Work samples, success stories
const ProgrammeShowcase: React.FC = () => {
  return (
    <div className="programme-showcase">
      {/* Gallery of work */}
    </div>
  );
};

export default ProgrammePage;
