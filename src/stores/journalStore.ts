/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * =======================================
 * File: src/stores/journalStore.ts
 * Component: creators-journal
 * Owner: G-Tech Community Platform Ltd
 * Copyright: 2024-2025 All Rights Reserved
 * License: Community-Controlled (Corporate use prohibited)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ===================================
// JOURNAL ENTRY TYPES
// ===================================

type TransformationStage = 1 | 2 | 3 | 4;
type CPhase = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
type EmotionalState = 'excited' | 'anxious' | 'confident' | 'stuck' | 'breakthrough' | 'overwhelmed' | 'motivated' | 'proud' | 'uncertain';
type EntryType = 'reflection' | 'milestone' | 'challenge' | 'learning' | 'gratitude' | 'plan';

interface JournalEntry {
  id: string;
  
  // Classification
  stage: TransformationStage;
  cPhase: CPhase;
  entryType: EntryType;
  
  // Content
  title?: string;
  content: string;
  
  // Emotional tracking
  emotionalState?: EmotionalState;
  energyLevel?: 1 | 2 | 3 | 4 | 5; // 1=drained, 5=energized
  
  // Context
  tags?: string[];
  linkedMilestoneId?: string;
  
  // Privacy
  isPrivate: boolean; // Can this be shared with mentors?
  sharedWith?: string[]; // ROVs or mentors who can see this
  
  // Metadata
  timestamp: Date;
  lastEdited?: Date;
  wordCount: number;
}

interface JournalPrompt {
  id: string;
  stage: TransformationStage;
  cPhase: CPhase;
  question: string;
  purpose: string;
  helpfulFor: string[];
}

interface JournalStats {
  totalEntries: number;
  entriesByStage: Record<TransformationStage, number>;
  entriesByCPhase: Record<CPhase, number>;
  currentStreak: number; // days
  longestStreak: number;
  lastEntryDate?: Date;
  totalWords: number;
  averageWordsPerEntry: number;
  mostCommonEmotions: Array<{ emotion: EmotionalState; count: number }>;
}

// ===================================
// STORE STATE & ACTIONS
// ===================================

interface JournalState {
  entries: JournalEntry[];
  
  // Entry management
  addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp' | 'wordCount'>) => string;
  updateEntry: (id: string, updates: Partial<Omit<JournalEntry, 'id' | 'timestamp'>>) => void;
  deleteEntry: (id: string) => void;
  
  // Retrieval
  getEntriesByStage: (stage: TransformationStage) => JournalEntry[];
  getEntriesByCPhase: (cPhase: CPhase) => JournalEntry[];
  getEntriesByEmotionalState: (emotion: EmotionalState) => JournalEntry[];
  getRecentEntries: (count?: number) => JournalEntry[];
  searchEntries: (query: string) => JournalEntry[];
  
  // Prompts
  getPromptForCurrentStage: (stage: TransformationStage, cPhase?: CPhase) => JournalPrompt | null;
  getAllPromptsForStage: (stage: TransformationStage) => JournalPrompt[];
  
  // Privacy
  shareEntryWith: (entryId: string, shareWith: string) => void;
  makeEntryPrivate: (entryId: string) => void;
  makeEntryPublic: (entryId: string) => void;
  
  // Analytics
  getJournalStats: () => JournalStats;
  getEmotionalJourney: () => Array<{ date: Date; emotion: EmotionalState; stage: TransformationStage }>;
  
  // Export
  exportJournal: (format: 'json' | 'markdown') => string;
  exportStageJournal: (stage: TransformationStage, format: 'json' | 'markdown') => string;
}

// ===================================
// JOURNAL PROMPTS
// ===================================

const JOURNAL_PROMPTS: JournalPrompt[] = [
  // Stage 1: Seeking Help
  {
    id: 'stage1-problem',
    stage: 1,
    cPhase: 'connect',
    question: "What problem am I facing? Who else is affected by this?",
    purpose: "Clarify the problem you want to solve",
    helpfulFor: ['problem-identification', 'empathy-building']
  },
  {
    id: 'stage1-impact',
    stage: 1,
    cPhase: 'connect',
    question: "How does this problem affect my life or my community?",
    purpose: "Understand personal motivation",
    helpfulFor: ['motivation', 'urgency-assessment']
  },
  {
    id: 'stage1-tried',
    stage: 1,
    cPhase: 'create',
    question: "What have I already tried? What didn't work and why?",
    purpose: "Learn from past attempts",
    helpfulFor: ['learning', 'avoiding-repeats']
  },
  {
    id: 'stage1-fear',
    stage: 1,
    cPhase: 'connect',
    question: "What am I afraid of? What's holding me back?",
    purpose: "Identify barriers",
    helpfulFor: ['self-awareness', 'barrier-removal']
  },
  
  // Stage 2: Building Solution
  {
    id: 'stage2-ignition',
    stage: 2,
    cPhase: 'create',
    question: "What made me decide 'I can build this'? What changed?",
    purpose: "Capture the ignition moment",
    helpfulFor: ['transformation-tracking', 'inspiration']
  },
  {
    id: 'stage2-approach',
    stage: 2,
    cPhase: 'create',
    question: "What's my approach? What tools and skills do I need?",
    purpose: "Plan the solution",
    helpfulFor: ['planning', 'skill-assessment']
  },
  {
    id: 'stage2-stuck',
    stage: 2,
    cPhase: 'cultivate',
    question: "Where am I stuck right now? What would help me move forward?",
    purpose: "Identify blockers",
    helpfulFor: ['problem-solving', 'asking-for-help']
  },
  {
    id: 'stage2-progress',
    stage: 2,
    cPhase: 'compete',
    question: "What progress have I made this week? What did I learn?",
    purpose: "Track learning",
    helpfulFor: ['motivation', 'skill-development']
  },
  {
    id: 'stage2-support',
    stage: 2,
    cPhase: 'connect',
    question: "Who's helping me? How are they supporting my journey?",
    purpose: "Recognize support network",
    helpfulFor: ['gratitude', 'relationship-building']
  },
  
  // Stage 3: Solution Deployed
  {
    id: 'stage3-launch',
    stage: 3,
    cPhase: 'celebrate',
    question: "How does it feel to have my solution out in the world?",
    purpose: "Celebrate achievement",
    helpfulFor: ['identity-shift', 'confidence-building']
  },
  {
    id: 'stage3-feedback',
    stage: 3,
    cPhase: 'cultivate',
    question: "What feedback am I receiving? What's surprising?",
    purpose: "Learn from users",
    helpfulFor: ['improvement', 'user-understanding']
  },
  {
    id: 'stage3-impact',
    stage: 3,
    cPhase: 'compete',
    question: "Who's using my solution? What impact am I seeing?",
    purpose: "Measure success",
    helpfulFor: ['validation', 'motivation']
  },
  {
    id: 'stage3-iteration',
    stage: 3,
    cPhase: 'create',
    question: "What would I improve? What would I do differently?",
    purpose: "Reflect on learning",
    helpfulFor: ['continuous-improvement', 'wisdom']
  },
  {
    id: 'stage3-future',
    stage: 3,
    cPhase: 'cultivate',
    question: "How can this solution grow? What's next?",
    purpose: "Plan sustainability",
    helpfulFor: ['strategic-thinking', 'scaling']
  },
  
  // Stage 4: Teaching Others
  {
    id: 'stage4-first-mentee',
    stage: 4,
    cPhase: 'connect',
    question: "How does it feel to guide someone through what I learned?",
    purpose: "Reflect on mentorship",
    helpfulFor: ['identity-shift', 'teaching-skills']
  },
  {
    id: 'stage4-lessons',
    stage: 4,
    cPhase: 'cultivate',
    question: "What are the key lessons I want others to know?",
    purpose: "Distill wisdom",
    helpfulFor: ['knowledge-transfer', 'teaching']
  },
  {
    id: 'stage4-patterns',
    stage: 4,
    cPhase: 'compete',
    question: "What patterns do I see across different creators' journeys?",
    purpose: "Recognize systems",
    helpfulFor: ['pattern-recognition', 'systemic-thinking']
  },
  {
    id: 'stage4-growth',
    stage: 4,
    cPhase: 'celebrate',
    question: "How have I changed since I started? What surprised me?",
    purpose: "Recognize transformation",
    helpfulFor: ['self-awareness', 'inspiration']
  },
  {
    id: 'stage4-legacy',
    stage: 4,
    cPhase: 'celebrate',
    question: "What do I want to be known for in this community?",
    purpose: "Define legacy",
    helpfulFor: ['purpose', 'long-term-thinking']
  }
];

// ===================================
// STORE IMPLEMENTATION
// ===================================

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],

      // ===================================
      // ENTRY MANAGEMENT
      // ===================================
      
      addEntry: (entry) => {
        const wordCount = entry.content.trim().split(/\s+/).length;
        const newEntry: JournalEntry = {
          ...entry,
          id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          wordCount
        };
        
        set((state) => ({
          entries: [...state.entries, newEntry]
        }));
        
        return newEntry.id;
      },
      
      updateEntry: (id, updates) => {
        set((state) => {
          const entries = state.entries.map(entry => {
            if (entry.id === id) {
              const updatedContent = updates.content !== undefined ? updates.content : entry.content;
              const wordCount = updatedContent.trim().split(/\s+/).length;
              
              return {
                ...entry,
                ...updates,
                wordCount,
                lastEdited: new Date()
              };
            }
            return entry;
          });
          
          return { entries };
        });
      },
      
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter(e => e.id !== id)
        }));
      },

      // ===================================
      // RETRIEVAL
      // ===================================
      
      getEntriesByStage: (stage) => {
        return get().entries.filter(e => e.stage === stage)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },
      
      getEntriesByCPhase: (cPhase) => {
        return get().entries.filter(e => e.cPhase === cPhase)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },
      
      getEntriesByEmotionalState: (emotion) => {
        return get().entries.filter(e => e.emotionalState === emotion)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },
      
      getRecentEntries: (count = 10) => {
        return get().entries
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, count);
      },
      
      searchEntries: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().entries.filter(e =>
          e.content.toLowerCase().includes(lowerQuery) ||
          e.title?.toLowerCase().includes(lowerQuery) ||
          e.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
        ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },

      // ===================================
      // PROMPTS
      // ===================================
      
      getPromptForCurrentStage: (stage, cPhase) => {
        const prompts = JOURNAL_PROMPTS.filter(p => {
          if (cPhase) {
            return p.stage === stage && p.cPhase === cPhase;
          }
          return p.stage === stage;
        });
        
        if (prompts.length === 0) return null;
        
        // Return random prompt from matching prompts
        return prompts[Math.floor(Math.random() * prompts.length)];
      },
      
      getAllPromptsForStage: (stage) => {
        return JOURNAL_PROMPTS.filter(p => p.stage === stage);
      },

      // ===================================
      // PRIVACY
      // ===================================
      
      shareEntryWith: (entryId, shareWith) => {
        set((state) => ({
          entries: state.entries.map(e => {
            if (e.id === entryId) {
              return {
                ...e,
                sharedWith: [...(e.sharedWith || []), shareWith],
                isPrivate: false
              };
            }
            return e;
          })
        }));
      },
      
      makeEntryPrivate: (entryId) => {
        set((state) => ({
          entries: state.entries.map(e => {
            if (e.id === entryId) {
              return {
                ...e,
                isPrivate: true,
                sharedWith: []
              };
            }
            return e;
          })
        }));
      },
      
      makeEntryPublic: (entryId) => {
        set((state) => ({
          entries: state.entries.map(e => {
            if (e.id === entryId) {
              return {
                ...e,
                isPrivate: false
              };
            }
            return e;
          })
        }));
      },

      // ===================================
      // ANALYTICS
      // ===================================
      
      getJournalStats: () => {
        const { entries } = get();
        
        if (entries.length === 0) {
          return {
            totalEntries: 0,
            entriesByStage: { 1: 0, 2: 0, 3: 0, 4: 0 },
            entriesByCPhase: {
              connect: 0,
              create: 0,
              cultivate: 0,
              compete: 0,
              celebrate: 0
            },
            currentStreak: 0,
            longestStreak: 0,
            totalWords: 0,
            averageWordsPerEntry: 0,
            mostCommonEmotions: []
          };
        }
        
        // Count by stage
        const entriesByStage = entries.reduce((acc, e) => {
          acc[e.stage] = (acc[e.stage] || 0) + 1;
          return acc;
        }, {} as Record<TransformationStage, number>);
        
        // Count by C phase
        const entriesByCPhase = entries.reduce((acc, e) => {
          acc[e.cPhase] = (acc[e.cPhase] || 0) + 1;
          return acc;
        }, {} as Record<CPhase, number>);
        
        // Calculate streaks
        const sortedEntries = [...entries].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 1;
        
        for (let i = 1; i < sortedEntries.length; i++) {
          const prevDate = new Date(sortedEntries[i - 1].timestamp);
          const currDate = new Date(sortedEntries[i].timestamp);
          const daysDiff = Math.floor(
            (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysDiff <= 1) {
            tempStreak++;
          } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
          }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
        
        // Current streak
        const today = new Date();
        const lastEntry = sortedEntries[sortedEntries.length - 1];
        const daysSinceLastEntry = Math.floor(
          (today.getTime() - new Date(lastEntry.timestamp).getTime()) / (1000 * 60 * 60 * 24)
        );
        currentStreak = daysSinceLastEntry <= 1 ? tempStreak : 0;
        
        // Word stats
        const totalWords = entries.reduce((sum, e) => sum + e.wordCount, 0);
        
        // Emotion tracking
        const emotionCounts = entries.reduce((acc, e) => {
          if (e.emotionalState) {
            acc[e.emotionalState] = (acc[e.emotionalState] || 0) + 1;
          }
          return acc;
        }, {} as Record<EmotionalState, number>);
        
        const mostCommonEmotions = Object.entries(emotionCounts)
          .map(([emotion, count]) => ({ emotion: emotion as EmotionalState, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        return {
          totalEntries: entries.length,
          entriesByStage: {
            1: entriesByStage[1] || 0,
            2: entriesByStage[2] || 0,
            3: entriesByStage[3] || 0,
            4: entriesByStage[4] || 0
          },
          entriesByCPhase: {
            connect: entriesByCPhase.connect || 0,
            create: entriesByCPhase.create || 0,
            cultivate: entriesByCPhase.cultivate || 0,
            compete: entriesByCPhase.compete || 0,
            celebrate: entriesByCPhase.celebrate || 0
          },
          currentStreak,
          longestStreak,
          lastEntryDate: lastEntry.timestamp,
          totalWords,
          averageWordsPerEntry: Math.round(totalWords / entries.length),
          mostCommonEmotions
        };
      },
      
      getEmotionalJourney: () => {
        return get().entries
          .filter(e => e.emotionalState)
          .map(e => ({
            date: e.timestamp,
            emotion: e.emotionalState!,
            stage: e.stage
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime());
      },

      // ===================================
      // EXPORT
      // ===================================
      
      exportJournal: (format) => {
        const { entries } = get();
        
        if (format === 'json') {
          return JSON.stringify(entries, null, 2);
        }
        
        // Markdown format
        const sortedEntries = [...entries].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        
        let markdown = '# My Creator\'s Journey\n\n';
        markdown += `Total Entries: ${entries.length}\n`;
        markdown += `Total Words: ${entries.reduce((sum, e) => sum + e.wordCount, 0)}\n\n`;
        markdown += '---\n\n';
        
        sortedEntries.forEach(entry => {
          markdown += `## ${entry.title || 'Journal Entry'}\n\n`;
          markdown += `**Date:** ${new Date(entry.timestamp).toLocaleDateString()}\n`;
          markdown += `**Stage:** ${entry.stage} | **Phase:** ${entry.cPhase}\n`;
          if (entry.emotionalState) {
            markdown += `**Feeling:** ${entry.emotionalState}\n`;
          }
          markdown += `\n${entry.content}\n\n`;
          markdown += '---\n\n';
        });
        
        return markdown;
      },
      
      exportStageJournal: (stage, format) => {
        const stageEntries = get().getEntriesByStage(stage);
        
        if (format === 'json') {
          return JSON.stringify(stageEntries, null, 2);
        }
        
        // Markdown format
        let markdown = `# Stage ${stage} Journey\n\n`;
        markdown += `Total Entries: ${stageEntries.length}\n\n`;
        markdown += '---\n\n';
        
        stageEntries.forEach(entry => {
          markdown += `## ${entry.title || 'Journal Entry'}\n\n`;
          markdown += `**Date:** ${new Date(entry.timestamp).toLocaleDateString()}\n`;
          markdown += `**Phase:** ${entry.cPhase}\n`;
          if (entry.emotionalState) {
            markdown += `**Feeling:** ${entry.emotionalState}\n`;
          }
          markdown += `\n${entry.content}\n\n`;
          markdown += '---\n\n';
        });
        
        return markdown;
      }
    }),
    {
      name: 'journal-store',
      partialize: (state) => ({
        entries: state.entries
      })
    }
  )
);

// ===================================
// CUSTOM HOOKS
// ===================================

export const useJournalStats = () => {
  const stats = useJournalStore((state) => state.getJournalStats());
  return stats;
};

export const useJournalPrompts = (stage: TransformationStage, cPhase?: CPhase) => {
  const getPrompt = useJournalStore((state) => state.getPromptForCurrentStage);
  const getAllPrompts = useJournalStore((state) => state.getAllPromptsForStage);
  
  return {
    currentPrompt: getPrompt(stage, cPhase),
    allPrompts: getAllPrompts(stage)
  };
};

export const useRecentJournalEntries = (count: number = 5) => {
  const getRecentEntries = useJournalStore((state) => state.getRecentEntries);
  return getRecentEntries(count);
};

export default useJournalStore;
