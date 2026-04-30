// src/hooks/useDockState.ts
// Manages the detachable companion sandbox state for programme pages.
// Up to 2 companions can be docked simultaneously.
// Dispatches maya:companion events when cross-programme combinations are detected.
// Used by CompanionStrip.tsx and all programme pages.

import { useState, useCallback, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TabId =
  | 'connect' | 'create' | 'change' | 'challenge' | 'control'
  | 'counting-house' | 'knowledge-commons' | 'cyberstore' | 'external';

export interface DockedCompanion {
  id: string;           // unique instance id
  tabId: TabId;
  label: string;
  programme: string;    // which programme page this came from
  colour: string;       // accent colour for the companion header
  content: React.ReactNode;
}

export interface DockState {
  companions: DockedCompanion[];
  primaryTab: TabId;
  splitActive: boolean;
}

// ─── Cross-pollination detection ──────────────────────────────────────────────

const CROSS_PROGRAMME_PAIRS: Array<{
  tabs: [TabId, TabId];
  programmes?: [string, string];
  mayaNote: string;
}> = [
  {
    tabs: ['create', 'control'],
    mayaNote: 'Creating with your earnings picture visible. Financial awareness informing your creative work — this combination counts toward your Financial Integrity score.',
  },
  {
    tabs: ['challenge', 'control'],
    mayaNote: 'Preparing for a negotiation with your numbers open. The platform sees this. Your External Opportunity Modeller is available in the Counting House companion.',
  },
  {
    tabs: ['change', 'control'],
    mayaNote: 'Development work with the community fund in view. Your grant eligibility may be relevant here.',
  },
  {
    tabs: ['connect', 'create'],
    mayaNote: 'Community connection informing your creative output — cross-pollination in action. This combination lifts your Reciprocity Score.',
  },
];

function detectCrossPollination(
  companions: DockedCompanion[],
  primaryTab: TabId
): string | null {
  const activeTabs: TabId[] = [primaryTab, ...companions.map(c => c.tabId)];
  const activePrograms = companions.map(c => c.programme);

  for (const pair of CROSS_PROGRAMME_PAIRS) {
    const [a, b] = pair.tabs;
    if (activeTabs.includes(a) && activeTabs.includes(b)) {
      if (!pair.programmes) return pair.mayaNote;
      const [pa, pb] = pair.programmes;
      if (activePrograms.includes(pa) && activePrograms.includes(pb)) {
        return pair.mayaNote;
      }
    }
  }
  return null;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDockState(programme: string, initialTab: TabId = 'connect') {
  const [primaryTab, setPrimaryTab] = useState<TabId>(initialTab);
  const [companions, setCompanions] = useState<DockedCompanion[]>([]);
  const [lastCrossNote, setLastCrossNote] = useState<string | null>(null);

  // Detect cross-pollination whenever state changes
  useEffect(() => {
    const note = detectCrossPollination(companions, primaryTab);
    if (note && note !== lastCrossNote) {
      setLastCrossNote(note);
      window.dispatchEvent(new CustomEvent('maya:companion', {
        detail: {
          source: programme,
          primaryTab,
          companionTabs: companions.map(c => c.tabId),
          note,
        }
      }));
    }
  }, [companions, primaryTab, programme]);

  const dock = useCallback((companion: Omit<DockedCompanion, 'id'>) => {
    setCompanions(prev => {
      // Already docked this tab from this programme
      if (prev.some(c => c.tabId === companion.tabId && c.programme === companion.programme)) {
        return prev;
      }
      // Max 2 companions
      const next = prev.length >= 2 ? prev.slice(1) : prev;
      return [...next, { ...companion, id: `${companion.programme}-${companion.tabId}-${Date.now()}` }];
    });
  }, []);

  const undock = useCallback((id: string) => {
    setCompanions(prev => prev.filter(c => c.id !== id));
  }, []);

  const undockAll = useCallback(() => {
    setCompanions([]);
  }, []);

  const isDockedTab = useCallback((tabId: TabId, prog?: string) => {
    return companions.some(c => c.tabId === tabId && (!prog || c.programme === prog));
  }, [companions]);

  const splitActive = companions.length > 0;

  return {
    primaryTab,
    setPrimaryTab,
    companions,
    splitActive,
    dock,
    undock,
    undockAll,
    isDockedTab,
  };
}
