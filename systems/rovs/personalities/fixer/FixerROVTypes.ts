// src/systems/rovs/personalities/fixer/FixerROVTypes.ts

export interface FixerConfig {
  safetyChecksRequired: boolean;
  guidedModeDefault: boolean;
  autoLogRepairs: boolean;
  videoGuidanceEnabled: boolean;
}

export interface RepairLog {
  id: string;
  learnerId: string;
  deviceType: string;
  deviceMake: string;
  deviceModel: string;
  faultDescription: string;
  repairPerformed: string;
  outcome: 'success' | 'partial' | 'failed' | 'referred';
  difficulty: number;
  timeSpent: number;
  supervised: boolean;
  supervisorId?: string;
  partsReplaced: string[];
  toolsUsed: string[];
  safetyChecksCompleted: string[];
  notes: string;
  beforePhoto?: string;
  afterPhoto?: string;
  timestamp: Date;
}

export interface DeviceKnowledgeBase {
  deviceType: string;
  commonFaults: Array<{
    fault: string;
    symptoms: string[];
    causes: string[];
    solutions: string[];
    difficulty: number;
  }>;
  disassemblyGuides: string[];
  toolRequirements: string[];
  safetyNotes: string[];
}

export const DEFAULT_FIXER_CONFIG: FixerConfig = {
  safetyChecksRequired: true,
  guidedModeDefault: true,
  autoLogRepairs: true,
  videoGuidanceEnabled: true
};

export const SAFETY_CHECKLIST = [
  'Device unplugged from power',
  'Battery disconnected (if applicable)',
  'ESD protection worn',
  'Work area clear and well-lit',
  'First aid kit accessible',
  'Fire extinguisher nearby',
  'Ventilation adequate for soldering'
];