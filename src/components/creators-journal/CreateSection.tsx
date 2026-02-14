import React from 'react';

const CreateSection: React.FC = () => {
  return (
    <div className="journal-section create-section">
      <div className="section-header">
        <h2>🎨 Create</h2>
        <p>Build projects, develop skills, and bring your ideas to life</p>
      </div>

      <div className="projects-grid">
        <h3>My Projects</h3>
        <p className="placeholder-text">
          Document your projects here. Upload photos, descriptions, and links to your work.
        </p>
        <button className="add-project-btn">+ Add New Project</button>
      </div>

      <div className="skills-tracker">
        <h3>Skills Acquired</h3>
        <p className="placeholder-text">
          Track the skills you're learning through your projects and workshops.
        </p>
      </div>
    </div>
  );
};

export default CreateSection;
