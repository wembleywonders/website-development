import React from 'react';

const CultivateSection: React.FC = () => {
  return (
    <div className="journal-section cultivate-section">
      <div className="section-header">
        <h2>🌱 Cultivate</h2>
        <p>Grow your skills, refine your craft, and develop expertise</p>
      </div>

      <div className="learning-path">
        <h3>Learning Journey</h3>
        <p className="placeholder-text">
          Track your progression through workshops, courses, and self-directed learning.
        </p>
      </div>

      <div className="reflections">
        <h3>Reflections & Notes</h3>
        <p className="placeholder-text">
          Document your learning insights, challenges overcome, and growth moments.
        </p>
        <button className="add-reflection-btn">+ Add Reflection</button>
      </div>
    </div>
  );
};

export default CultivateSection;
