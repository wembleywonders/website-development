// src/components/creators-journal/index.ts

export { JournalEntryCard, type JournalEntryCardProps } from './JournalEntryCard';
export { PublicationStatus, type PublicationItem, type PublicationStatusProps } from './PublicationStatus';
export { BadgeProgress, type BadgeProgressData, type BadgeProgressProps } from './BadgeProgress';
export { ImpactDashboard, type ImpactMetric, type ImpactHighlight, type ImpactDashboardProps } from './ImpactDashboard';
export { StageProgress } from './StageProgress';

// Default export
export default {
  JournalEntryCard: require('./JournalEntryCard').default,
  PublicationStatus: require('./PublicationStatus').default,
  BadgeProgress: require('./BadgeProgress').default,
  ImpactDashboard: require('./ImpactDashboard').default,
  StageProgress: require('./StageProgress').default
};
