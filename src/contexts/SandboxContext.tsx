// src/contexts/SandboxContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ActivityResult {
  id: string;
  type: 'mini-lab' | 'journal' | 'voice-note' | 'gallery-post';
  promptId: string;
  promptTitle: string;
  content: string;
  mediaUrls?: string[];
  timestamp: string;           // ISO string
  wordCount?: number;
  duration?: number;
  visibility: 'private' | 'community' | 'public';
}

export interface SandboxSession {
  sessionId: string;
  programmeId?: string;        // e.g. 'gtechcasters', 'pageturners'
  programmeName?: string;
  startedAt: string;
  completedActivities: ActivityResult[];
  currentActivity?: string;
  userId?: string;
  isAnonymous: boolean;
}

interface SandboxContextType {
  session: SandboxSession;
  addActivity: (activity: ActivityResult) => void;
  updateActivity: (id: string, updates: Partial<ActivityResult>) => void;
  removeActivity: (id: string) => void;
  setCurrentActivity: (activityType: string | undefined) => void;
  clearSession: () => void;
  exportSession: () => SandboxSession;
  startNewSession: (programmeId?: string, programmeName?: string) => void;
  // convenience helpers used by programme sandboxes
  updateProgress: (key: string, value: number) => void;
  addAchievement: (achievement: string) => void;
  progress: Record<string, number>;
  achievements: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeSession(programmeId?: string, programmeName?: string): SandboxSession {
  return {
    sessionId: `sandbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    programmeId,
    programmeName,
    startedAt: new Date().toISOString(),
    completedActivities: [],
    isAnonymous: true,
  };
}

function loadSession(): SandboxSession {
  try {
    const stored = localStorage.getItem('sandboxSession');
    if (stored) return JSON.parse(stored);
  } catch {
    // corrupt storage — fall through
  }
  return makeSession();
}

function persist(session: SandboxSession) {
  try {
    localStorage.setItem('sandboxSession', JSON.stringify(session));
  } catch {
    // storage full or unavailable — silent fail
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

interface SandboxProviderProps {
  children: ReactNode;
  programmeId?: string;
  programmeName?: string;
}

export const SandboxProvider: React.FC<SandboxProviderProps> = ({
  children,
  programmeId,
  programmeName,
}) => {
  const [session, setSession] = useState<SandboxSession>(() => {
    const stored = loadSession();
    // If launched with a programme context, start fresh for that programme
    if (programmeId && stored.programmeId !== programmeId) {
      return makeSession(programmeId, programmeName);
    }
    return stored;
  });

  const [progress, setProgress] = useState<Record<string, number>>({});
  const [achievements, setAchievements] = useState<string[]>([]);

  const update = (next: SandboxSession) => {
    persist(next);
    setSession(next);
  };

  const addActivity = (activity: ActivityResult) => {
    update({
      ...session,
      completedActivities: [...session.completedActivities, activity],
    });
  };

  const updateActivity = (id: string, updates: Partial<ActivityResult>) => {
    update({
      ...session,
      completedActivities: session.completedActivities.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    });
  };

  const removeActivity = (id: string) => {
    update({
      ...session,
      completedActivities: session.completedActivities.filter((a) => a.id !== id),
    });
  };

  const setCurrentActivity = (activityType: string | undefined) => {
    update({ ...session, currentActivity: activityType });
  };

  const clearSession = () => {
    localStorage.removeItem('sandboxSession');
    setSession(makeSession(programmeId, programmeName));
    setProgress({});
    setAchievements([]);
  };

  const exportSession = () => session;

  const startNewSession = (newProgrammeId?: string, newProgrammeName?: string) => {
    const fresh = makeSession(newProgrammeId, newProgrammeName);
    persist(fresh);
    setSession(fresh);
  };

  const updateProgress = (key: string, value: number) => {
    setProgress((prev) => ({ ...prev, [key]: value }));
  };

  const addAchievement = (achievement: string) => {
    setAchievements((prev) =>
      prev.includes(achievement) ? prev : [...prev, achievement]
    );
  };

  return (
    <SandboxContext.Provider
      value={{
        session,
        addActivity,
        updateActivity,
        removeActivity,
        setCurrentActivity,
        clearSession,
        exportSession,
        startNewSession,
        updateProgress,
        addAchievement,
        progress,
        achievements,
      }}
    >
      {children}
    </SandboxContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export const useSandbox = (): SandboxContextType => {
  const context = useContext(SandboxContext);
  if (!context) {
    throw new Error('useSandbox must be used within a SandboxProvider');
  }
  return context;
};

export default SandboxContext;