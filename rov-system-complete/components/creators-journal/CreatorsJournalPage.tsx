// src/components/creators-journal/CreatorsJournalPage.tsx
// Main page component for the Creator's Journal

import React, { useState, useEffect } from 'react';
import JournalEntryCard from './JournalEntryCard';
import StageProgress from './StageProgress';
import BadgeProgress from './BadgeProgress';
import ImpactDashboard from './ImpactDashboard';
import PublicationStatus from './PublicationStatus';
import ROVActivityFeed from './ROVActivityFeed';
import './CreatorsJournalPage.css';

export interface JournalEntry {
  id: string;
  type: 'activity' | 'observation' | 'milestone' | 'reflection' | 'evidence' | 'story';
  title: string;
  content: string;
  stage: 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
  programme?: string;
  badgeId?: string;
  rovSource: string;
  attachments: string[];
  tags: string[];
  isPublishable: boolean;
  createdAt: Date;
}

export interface CreatorsJournalPageProps {
  learnerId: string;
  learnerName: string;
}

const CreatorsJournalPage: React.FC<CreatorsJournalPageProps> = ({
  learnerId,
  learnerName
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'stage' | 'programme'>('timeline');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load journal entries
    loadEntries();
  }, [learnerId]);

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      // In real implementation, fetch from API
      // const response = await fetch(`/api/journal/${learnerId}`);
      // const data = await response.json();
      // setEntries(data);
      
      // Mock data for now
      setEntries([]);
    } catch (error) {
      console.error('Failed to load journal entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntries = selectedStage
    ? entries.filter(e => e.stage === selectedStage)
    : entries;

  const stageEmojis: Record<string, string> = {
    connect: '🤝',
    create: '🛠️',
    cultivate: '🌱',
    compete: '🏆',
    celebrate: '🎉'
  };

  return (
    <div className="creators-journal-page">
      <header className="journal-header">
        <h1>📔 {learnerName}'s Creator's Journal</h1>
        <p className="journal-subtitle">Your learning journey, documented</p>
      </header>

      <div className="journal-layout">
        {/* Left Sidebar - Stage Navigation */}
        <aside className="journal-sidebar">
          <div className="stage-navigation">
            <h3>Journey Stages</h3>
            <StageProgress 
              learnerId={learnerId}
              onStageSelect={setSelectedStage}
              selectedStage={selectedStage}
            />
          </div>

          <div className="badge-section">
            <h3>Badge Progress</h3>
            <BadgeProgress learnerId={learnerId} />
          </div>

          <div className="rov-feed-section">
            <h3>ROV Activity</h3>
            <ROVActivityFeed learnerId={learnerId} maxItems={5} showROVFleet={false} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="journal-main">
          {/* View Controls */}
          <div className="view-controls">
            <div className="view-mode-toggle">
              <button 
                className={viewMode === 'timeline' ? 'active' : ''}
                onClick={() => setViewMode('timeline')}
              >
                📅 Timeline
              </button>
              <button 
                className={viewMode === 'stage' ? 'active' : ''}
                onClick={() => setViewMode('stage')}
              >
                🎯 By Stage
              </button>
              <button 
                className={viewMode === 'programme' ? 'active' : ''}
                onClick={() => setViewMode('programme')}
              >
                📚 By Programme
              </button>
            </div>

            {selectedStage && (
              <button 
                className="clear-filter"
                onClick={() => setSelectedStage(null)}
              >
                Clear filter: {stageEmojis[selectedStage]} {selectedStage}
              </button>
            )}
          </div>

          {/* Entry List */}
          <div className="journal-entries">
            {isLoading ? (
              <div className="loading-state">
                <p>Loading your journal...</p>
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📔</div>
                <h3>Your journal is ready!</h3>
                <p>As you participate in activities, your journey will be documented here.</p>
                <p>ROVs will help capture your learning moments automatically.</p>
              </div>
            ) : (
              filteredEntries.map(entry => (
                <JournalEntryCard 
                  key={entry.id} 
                  entry={entry}
                  onPublish={() => {/* handle publish */}}
                />
              ))
            )}
          </div>
        </main>

        {/* Right Sidebar - Stats & Publication */}
        <aside className="journal-stats-sidebar">
          <ImpactDashboard learnerId={learnerId} />
          <PublicationStatus learnerId={learnerId} />
        </aside>
      </div>
    </div>
  );
};

export default CreatorsJournalPage;