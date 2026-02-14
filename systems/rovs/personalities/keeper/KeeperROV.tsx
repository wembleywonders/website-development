// src/systems/rovs/personalities/keeper/KeeperROV.tsx
// 📚 Keeper — The Archive Guardian

import React from 'react';

export interface ArchiveEntry {
  id: string;
  type: 'project' | 'recording' | 'document' | 'heritage' | 'evidence' | 'certificate';
  title: string;
  description: string;
  learnerId: string;
  programme: string;
  fileRefs: string[];
  metadata: Record<string, string>;
  archivedAt: Date;
  permanence: 'temporary' | 'long-term' | 'permanent';
  accessLevel: 'private' | 'community' | 'public';
}

export interface KeeperProps {
  learnerId: string;
  onArchived: (entry: ArchiveEntry) => void;
  onRetrieved: (entryId: string) => void;
}

/**
 * Keeper ROV - Preserves learning artifacts permanently
 * 
 * Personality: Careful librarian who respects history, never forgets
 * Primary Role: Archival and preservation
 */
export const KeeperROV: React.FC<KeeperProps> = ({
  learnerId,
  onArchived,
  onRetrieved
}) => {
  const [archiveCount, setArchiveCount] = React.useState(0);

  const messages: Record<string, string[]> = {
    archived: [
      "Archived and preserved. This knowledge will outlast all of us.",
      "Safely stored. Your work is protected now.",
      "Into the vault it goes. Future generations will thank you."
    ],
    stored: [
      "I've stored your project files securely. They'll be here whenever you need them.",
      "All evidence captured and catalogued. Ready for badge assessment.",
      "Files organized and backed up. Nothing will be lost."
    ],
    heritage: [
      "This recipe has been in your family for four generations. Now it's in our archive forever.",
      "Oral history preserved. This story will never be forgotten.",
      "Cultural treasure secured. Thank you for trusting us with this."
    ],
    retrieval: [
      "Found it! Here's what you were looking for.",
      "Retrieved from the archive. Everything's exactly as you left it.",
      "Memory recalled. Let me show you what we have."
    ]
  };

  const archive = (
    type: ArchiveEntry['type'],
    title: string,
    description: string,
    fileRefs: string[],
    permanence: ArchiveEntry['permanence'] = 'long-term'
  ) => {
    const entry: ArchiveEntry = {
      id: `archive-${Date.now()}`,
      type,
      title,
      description,
      learnerId,
      programme: '',
      fileRefs,
      metadata: {},
      archivedAt: new Date(),
      permanence,
      accessLevel: type === 'heritage' ? 'community' : 'private'
    };
    
    setArchiveCount(prev => prev + 1);
    onArchived(entry);
  };

  return (
    <div className="rov-keeper" data-rov="keeper">
      <div className="rov-avatar">📚</div>
      <div className="rov-content">
        <div className="rov-name">Keeper</div>
        <div className="rov-role">Archive Guardian</div>
        <div className="rov-stats">
          {archiveCount} items preserved
        </div>
      </div>
    </div>
  );
};

export const keeperUtils = {
  determinePermenance: (type: ArchiveEntry['type']): ArchiveEntry['permanence'] => {
    if (type === 'heritage' || type === 'certificate') return 'permanent';
    if (type === 'project' || type === 'evidence') return 'long-term';
    return 'temporary';
  },

  generateArchiveId: (type: string, learnerId: string): string => {
    const timestamp = Date.now().toString(36);
    const typeCode = type.substring(0, 3).toUpperCase();
    return `WW-${typeCode}-${timestamp}-${learnerId.substring(0, 4)}`;
  }
};

export default KeeperROV;