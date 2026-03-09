// pages/programmes/_shared/CreatorSpaceTemplate.tsx (NEW)

import React from 'react';
import { ROV_REGISTRY } from '@/services/rovs/ROVRegistry';
let MayaAssistant: React.ComponentType<any> | null = null;
try {
  const mod = require('@/features/workspace/components/MayaAssistant') as any;
  MayaAssistant = mod.MayaAssistant ?? mod.default ?? mod;
} catch (e) {
  MayaAssistant = null;
}
let ToolsCatalogue: React.ComponentType<any> | null = null;
try {
  const mod = require('@/components/tools/ToolsCatalogue') as any;
  ToolsCatalogue = mod.ToolsCatalogue ?? mod.default ?? mod;
} catch (e) {
  ToolsCatalogue = null;
}
let CollaborationBoard: React.ComponentType<any> | null = null;
try {
  const mod = require('@/components/collaboration/CollaborationBoard') as any;
  CollaborationBoard = mod.CollaborationBoard ?? mod.default ?? mod;
} catch (e) {
  CollaborationBoard = null;
}

interface CreatorSpaceTemplateProps {
  spaceId: string;
  children: React.ReactNode;
}

export const CreatorSpaceTemplate: React.FC<CreatorSpaceTemplateProps> = ({
  spaceId,
  children
}) => {
  // Get guild mentor ROV for this space
  const guildMentor = Object.values(ROV_REGISTRY).find(
    rov => rov.role === ('guild-mentor' as any) &&
           rov.contexts.creatorSpaces?.includes(spaceId as any)
  );

  // Get recommended tools for this creator space
  const recommendedTools = getRecommendedTools(spaceId);

  // Local helper to resolve recommended tools for a creator space.
  // Returns an array of tool identifiers/names appropriate for ToolsCatalogue.highlighted.
  function getRecommendedTools(spaceId: string): string[] {
    const catalogueMap: Record<string, string[]> = {
      'maker-space': ['soldering-iron', '3d-printer', 'multimeter'],
      'creator-lab': ['laser-cutter', 'arduino-kit', 'soldering-iron'],
      'design-studio': ['sketch-tablet', 'adobe-cc', 'color-calibrator'],
      'art-lab': ['easel', 'acrylic-set', 'digital-scanner'],
      'game-dev': ['unity-pro', 'graphics-tablet', 'gamepad'],
      'community-hub': ['projector', 'whiteboard', 'meeting-mic']
    };

    return catalogueMap[spaceId] ?? ['notebook', 'pen', 'basic-toolkit'];
  }

  function formatSpaceName(spaceId: string): React.ReactNode {
    if (!spaceId) return 'Unknown Space';

    const knownNames: Record<string, string> = {
      'maker-space': 'Maker Space',
      'creator-lab': 'Creator Lab',
      'design-studio': 'Design Studio',
      'art-lab': 'Art Lab',
      'game-dev': 'Game Development',
      'community-hub': 'Community Hub'
    };

    if (knownNames[spaceId]) return knownNames[spaceId];

    // Normalize delimiters and split camelCase
    let normalized = spaceId
      .replace(/[\/_.]/g, ' ')
      .replace(/-/g, ' ')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2');

    const words = normalized
      .split(/\s+/)
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1));

    return words.join(' ');
  }

  return (
    <div className="creator-space">
      {/* Guild Banner with ROV Introduction */}
      <header className="guild-header">
        <div className="guild-mentor-intro">
          <img src={guildMentor?.personality?.avatar} alt={guildMentor?.name ?? 'Guild Mentor'} />
          <div>
            <h2>Welcome to {formatSpaceName(spaceId)}</h2>
            <p>Your guide: <strong>{guildMentor?.name ?? 'TBD'}</strong></p>
            <p className="expertise">
              Expert in: {guildMentor?.personality?.expertise?.join(', ') ?? 'General'}
            </p>
          </div>
        </div>
      </header>
  
      {/* Recommended Tools Section */}
      <section className="recommended-tools">
        <h3>Tools for {formatSpaceName(spaceId)}</h3>
        {ToolsCatalogue ? <ToolsCatalogue highlighted={recommendedTools} /> : <div>No tools available</div>}
      </section>
  
      {/* Collaboration Board and Maya Assistant */}
      <section className="collaboration">
        {/* Only render MayaAssistant when it was successfully required */}
        {MayaAssistant ? <MayaAssistant guildMentor={guildMentor ?? undefined} /> : null}
        {/* Only render the board when it was successfully required */}
        {CollaborationBoard ? <CollaborationBoard spaceFilter={spaceId} /> : null}
      </section>
    </div>
  );
};
