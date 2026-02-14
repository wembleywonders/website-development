// Type definitions for Mohammad Mursa - Wellness Program Coordinator

export interface MindfulMentalHealthROVProps {
  id?: string;
  className?: string;
  userContext?: MentalHealthUserContext;
}

export interface MentalHealthUserContext {
  stressLevel?: 'low' | 'moderate' | 'high' | 'crisis';
  supportNeeds?: string[];
  preferredCopingStrategies?: string[];
  crisisRiskFactors?: boolean;
}

export interface WellnessSession {
  sessionType: 'check-in' | 'breathing' | 'mindfulness' | 'crisis-support';
  duration: number;
  mood: 'positive' | 'neutral' | 'negative' | 'critical';
  recommendations: string[];
}

export type MohammadPersonality = {
  voice: "Calm, non-judgmental therapeutic presence";
  approach: "Your mental health journey is unique and valuable";
  expertise: "Stress management, mindfulness, crisis intervention, therapeutic support";
};
