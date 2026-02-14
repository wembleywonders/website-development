// File: src/pages/dashboard/CreatorDashboard.tsx

import React from 'react';
import { useTransformationStore, useTransformationInsights } from '@/stores/transformationStore';
import { useJournalStore, useJournalStats } from '@/stores/journalStore';
import { useMayaStore } from '@/stores/mayaStore';

export const CreatorDashboard = () => {
  const { journey } = useTransformationStore();
  const { insights, timeline, progress } = useTransformationInsights();
  const journalStats = useJournalStats();
  const { engagement } = useMayaStore();
  
  return (
    <div className="creator-dashboard">
      {/* Journey Progress */}
      <div className="journey-overview">
        <h2>Your Transformation Journey</h2>
        <div className="stage-display">
          <strong>Current Stage:</strong> {journey.stageLabels[journey.currentStage]}
        </div>
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} className="progress-fill" />
          <span>{progress}% Complete</span>
        </div>
      </div>
      
      {/* Time in Stage */}
      <div className="stage-insights">
        <p>You've been in this stage for <strong>{insights.timeInCurrentStage} days</strong></p>
        {insights.readinessForNextStage ? (
          <p className="ready">✅ You're ready for the next stage!</p>
        ) : (
          <div className="blockers">
            <h3>What's Next:</h3>
            <ul>
              {insights.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Journal Stats */}
      <div className="journal-stats">
        <h3>Your Creator's Journal</h3>
        <p><strong>{journalStats.totalEntries}</strong> entries</p>
        <p><strong>{journalStats.totalWords}</strong> words written</p>
        <p>Current streak: <strong>{journalStats.currentStreak} days</strong></p>
      </div>
      
      {/* Community Impact */}
      <div className="community-impact">
        <h3>Community Impact</h3>
        <p>Impact Score: <strong>{engagement.communityImpactScore}</strong></p>
        <p>Programme Attendance: <strong>{Object.values(engagement.programmeAttendance).reduce((a, b) => a + b, 0)}</strong></p>
        {journey.mentoringActive && (
          <p>Mentoring: <strong>{journey.mentoringActive.menteesCount} people</strong></p>
        )}
      </div>
      
      {/* Recent Timeline */}
      <div className="recent-activity">
        <h3>Recent Milestones</h3>
        <ul>
          {timeline.slice(-5).reverse().map((event, i) => (
            <li key={i}>
              <span className="date">{event.date.toLocaleDateString()}</span>
              <span className="event">{event.event}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
