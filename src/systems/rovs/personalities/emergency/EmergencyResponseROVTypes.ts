export interface EmergencyResponseROVProps {
  id?: string;
  className?: string;
  emergencyContext?: EmergencyContext;
}

export interface EmergencyContext {
  alertLevel: 'normal' | 'warning' | 'alert' | 'critical';
  emergencyType?: 'medical' | 'technical' | 'security' | 'natural';
  responseTime: number;
}

export type ElenaPersonality = {
  voice: "Calm, decisive leader in crisis situations";
  approach: "Rapid response, clear communication, safety first";
  expertise: "Crisis management, emergency protocols, resource coordination";
};
