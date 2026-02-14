// src/systems/rovs/personalities/discovery/DiscoveryROVTypes.ts

export interface DiscoveryConfig {
  autoLogThresholdMinutes: number;
  skillExtractionEnabled: boolean;
  photographyPromptEnabled: boolean;
  sessionSummaryEnabled: boolean;
}

export interface DiscoverySession {
  id: string;
  learnerId: string;
  programme: string;
  startTime: Date;
  endTime?: Date;
  observations: string[];
  skillsIdentified: string[];
  toolsUsed: string[];
  equipmentUsed: string[];
  productivityScore: number;
}

export interface DiscoverySkillLog {
  skillId: string;
  skillName: string;
  demonstrationCount: number;
  lastDemonstrated: Date;
  proficiencyLevel: 1 | 2 | 3 | 4 | 5;
  evidenceRefs: string[];
}

export const DEFAULT_DISCOVERY_CONFIG: DiscoveryConfig = {
  autoLogThresholdMinutes: 5,
  skillExtractionEnabled: true,
  photographyPromptEnabled: true,
  sessionSummaryEnabled: true
};