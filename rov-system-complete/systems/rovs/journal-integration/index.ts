// src/systems/rovs/journal-integration/index.ts

export { JournalWriter, type JournalEntry } from './JournalWriter';
export { EntryClassifier, type ClassificationResult } from './EntryClassifier';
export { StageMapper, type Stage, type StageMapping, type LearnerStageProgress } from './StageMapper';

export default {
  JournalWriter: require('./JournalWriter').default,
  EntryClassifier: require('./EntryClassifier').default,
  StageMapper: require('./StageMapper').default
};
