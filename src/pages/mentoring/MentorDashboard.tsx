// File: src/pages/mentoring/MentorDashboard.tsx

import React from 'react';
import { useTransformationStore } from '@/stores/transformationStore';
import { useJournalStore } from '@/stores/journalStore';

export const MentorDashboard = () => {
  const { journey } = useTransformationStore();
  const { entries } = useJournalStore();
  
  // Mentors can see entries shared with them
  const sharedEntries = entries.filter(e => 
    e.sharedWith?.includes('mentor') || !e.isPrivate
  );
  
  return (
    <div className="mentor-dashboard">
      <h2>Mentee Progress</h2>
      
      {/* Mentee's current stage */}
      <div className="mentee-stage">
        <p>Current Stage: <strong>{journey.stageLabels[journey.currentStage]}</strong></p>
      </div>
      
      {/* Recent journal entries (with permission) */}
      <div className="shared-reflections">
        <h3>Shared Reflections</h3>
        {sharedEntries.slice(-3).reverse().map(entry => (
          <div key={entry.id} className="journal-entry">
            <h4>{entry.title || 'Journal Entry'}</h4>
            <p className="date">{new Date(entry.timestamp).toLocaleDateString()}</p>
            <p className="emotion">Feeling: {entry.emotionalState}</p>
            <p className="content">{entry.content}</p>
          </div>
        ))}
      </div>
      
      {/* Suggest support */}
      <div className="mentor-suggestions">
        <h3>How You Can Help</h3>
        {journey.currentStage === 2 && journey.solutionDesign && (
          <p>Your mentee is building: <strong>{journey.solutionDesign.title}</strong></p>
        )}
        <p>Skills they're learning: {journey.solutionDesign?.skillsToLearn.join(', ')}</p>
      </div>
    </div>
  );
};
