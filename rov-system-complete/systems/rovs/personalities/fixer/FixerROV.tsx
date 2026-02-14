// src/systems/rovs/personalities/fixer/FixerROV.tsx
// 🔧 Fixer — The Technical Mentor

import React from 'react';

export interface RepairGuidance {
  id: string;
  deviceType: string;
  faultType: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  steps: RepairStep[];
  toolsRequired: string[];
  safetyNotes: string[];
  estimatedTime: number; // minutes
}

export interface RepairStep {
  stepNumber: number;
  instruction: string;
  warning?: string;
  imageRef?: string;
  videoRef?: string;
}

export interface FixerProps {
  learnerId: string;
  currentDevice?: string;
  onRepairLogged: (repair: any) => void;
  onSafetyAlert: (alert: string) => void;
}

/**
 * Fixer ROV - Supports technical/hardware learning
 * 
 * Personality: Practical problem-solver who explains while fixing
 * Primary Role: Technical guidance and safety
 */
export const FixerROV: React.FC<FixerProps> = ({
  learnerId,
  currentDevice,
  onRepairLogged,
  onSafetyAlert
}) => {
  const [activeGuidance, setActiveGuidance] = React.useState<RepairGuidance | null>(null);

  const messages: Record<string, string[]> = {
    diagnosis: [
      "Ah, I see the issue. The capacitor's blown — here's how we fix it...",
      "Classic symptom. Let me walk you through the diagnosis.",
      "I've seen this before. Here's what's probably happening..."
    ],
    tools: [
      "Good diagnosis! Now, tools you'll need: soldering iron, flux, and patience.",
      "Before we start, let's gather: multimeter, screwdrivers, and an ESD strap.",
      "Right tool for the right job. Here's what we need..."
    ],
    guidance: [
      "That's a tricky repair. Let me walk you through it step by step.",
      "Take your time with this one. I'll guide you through each step.",
      "Let's break this down. First things first..."
    ],
    safety: [
      "Hold on — let's make sure you're properly grounded first.",
      "Safety check: Is the device unplugged? Battery disconnected?",
      "Before we touch anything, let's review the safety checklist."
    ],
    celebration: [
      "Perfect repair! That device has a second life now.",
      "You nailed it. Another one saved from landfill!",
      "Excellent work. Your repair skills are really developing."
    ]
  };

  const startGuidance = (guidance: RepairGuidance) => {
    // Check safety first
    if (guidance.safetyNotes.length > 0) {
      onSafetyAlert(guidance.safetyNotes[0]);
    }
    setActiveGuidance(guidance);
  };

  return (
    <div className="rov-fixer" data-rov="fixer">
      <div className="rov-avatar">🔧</div>
      <div className="rov-content">
        <div className="rov-name">Fixer</div>
        <div className="rov-role">Technical Mentor</div>
        {currentDevice && (
          <div className="rov-device">
            Working on: {currentDevice}
          </div>
        )}
        {activeGuidance && (
          <div className="rov-guidance">
            <h4>{activeGuidance.faultType}</h4>
            <p>Difficulty: {'⭐'.repeat(activeGuidance.difficulty)}</p>
            <p>Est. time: {activeGuidance.estimatedTime} min</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const fixerUtils = {
  assessDifficulty: (deviceType: string, faultType: string): number => {
    const difficultyMap: Record<string, Record<string, number>> = {
      'laptop': {
        'screen-replacement': 3,
        'keyboard-replacement': 2,
        'battery-replacement': 1,
        'motherboard-repair': 5,
        'ram-upgrade': 1
      },
      'phone': {
        'screen-replacement': 3,
        'battery-replacement': 2,
        'charging-port': 4,
        'speaker-replacement': 3
      },
      'desktop': {
        'psu-replacement': 2,
        'gpu-replacement': 1,
        'cpu-upgrade': 2,
        'case-fan': 1
      }
    };
    
    return difficultyMap[deviceType]?.[faultType] || 3;
  },

  getRequiredTools: (deviceType: string): string[] => {
    const baseTools = ['ESD strap', 'Screwdriver set', 'Spudger', 'Tweezers'];
    
    const additionalTools: Record<string, string[]> = {
      'laptop': ['Suction cup', 'Heat gun', 'iFixit kit'],
      'phone': ['Pentalobe screwdriver', 'SIM tool', 'Screen separator'],
      'desktop': ['Cable ties', 'Thermal paste', 'Anti-static mat']
    };
    
    return [...baseTools, ...(additionalTools[deviceType] || [])];
  },

  estimateRepairTime: (difficulty: number, isSupervised: boolean): number => {
    const baseTime = difficulty * 15; // 15 minutes per difficulty level
    return isSupervised ? baseTime * 1.5 : baseTime; // 50% longer if supervised
  }
};

export default FixerROV;
