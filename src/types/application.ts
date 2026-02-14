// Application-related TypeScript interfaces and types

export interface ApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  postcode: string;
  
  // Background Information
  employment: string;
  education: string;
  volunteerExperience: string;
  
  // Motivation & Commitment
  motivationStatement: string;
  availableHours: number;
  specificInterests: string[];
  
  // Skills & Experience
  digitalSkills: number; // 1-5 scale
  leadershipExperience: string;
  communityInvolvement: string;
  
  // Safeguarding & References
  safeguardingConsent: boolean;
  reference1Name: string;
  reference1Contact: string;
  reference2Name: string;
  reference2Contact: string;
  
  // Declarations
  eligibilityDeclaration: boolean;
  dataProtectionConsent: boolean;
  backgroundCheckConsent: boolean;
}

export interface Application extends ApplicationData {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
  lastUpdated: string;
  reviewNotes?: string;
  assessmentScore?: number;
  interviewer?: string;
  interviewDate?: string;
  decisionDate?: string;
  decisionReason?: string;
}

export type ApplicationStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'references_pending' 
  | 'assessment_invited' 
  | 'assessment_completed' 
  | 'interview_scheduled'
  | 'interview_completed'
  | 'approved' 
  | 'rejected'
  | 'withdrawn';

export interface ApplicationProgress {
  currentStep: number;
  totalSteps: number;
  steps: ApplicationStep[];
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  completedDate?: string;
  estimatedCompletion?: string;
}

export interface ApplicationValidationErrors {
  [key: string]: string;
}

export interface Assessment {
  id: string;
  applicationId: string;
  type: 'online_questionnaire' | 'scenario_analysis' | 'video_interview' | 'practical_exercise';
  status: 'not_started' | 'in_progress' | 'completed' | 'expired';
  score?: number;
  maxScore: number;
  timeLimit: number; // in minutes
  startedAt?: string;
  completedAt?: string;
  expiresAt: string;
  responses?: AssessmentResponse[];
}

export interface AssessmentResponse {
  questionId: string;
  response: string | string[] | number;
  timeSpent: number; // seconds
  submittedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'short_answer' | 'long_answer' | 'rating_scale' | 'scenario';
  category: 'community_knowledge' | 'communication_skills' | 'problem_solving' | 'digital_literacy' | 'leadership_potential';
  question: string;
  description?: string;
  options?: string[];
  maxLength?: number;
  required: boolean;
  points: number;
}

export interface Reference {
  id: string;
  applicationId: string;
  name: string;
  contact: string;
  relationship: string;
  status: 'pending' | 'contacted' | 'received' | 'declined';
  response?: ReferenceResponse;
  contactedAt?: string;
  respondedAt?: string;
}

export interface ReferenceResponse {
  recommendation: 'strongly_recommend' | 'recommend' | 'recommend_with_reservations' | 'do_not_recommend';
  workingRelationship: string;
  strengths: string;
  areasForDevelopment: string;
  suitabilityForRole: string;
  additionalComments?: string;
  contactForFollowUp: boolean;
}

export interface ApplicationStatistics {
  totalApplications: number;
  applicationsByStatus: Record<ApplicationStatus, number>;
  averageProcessingTime: number; // days
  approvalRate: number; // percentage
  mostCommonInterests: string[];
  averageDigitalSkillsLevel: number;
  applicationsByMonth: Array<{
    month: string;
    count: number;
  }>;
}

export interface ApplicationFilters {
  status?: ApplicationStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  interests?: string[];
  digitalSkillsRange?: {
    min: number;
    max: number;
  };
  ageRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
}

export interface ApplicationAction {
  id: string;
  applicationId: string;
  type: 'status_change' | 'note_added' | 'assessment_sent' | 'interview_scheduled' | 'decision_made';
  performedBy: string;
  performedAt: string;
  details: string;
  previousValue?: string;
  newValue?: string;
}

// Utility types for form handling
export type ApplicationFormStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface FormValidation {
  isValid: boolean;
  errors: ApplicationValidationErrors;
}

export interface ApplicationFormProps {
  initialData?: Partial<ApplicationData>;
  onSubmit: (data: ApplicationData) => Promise<void>;
  onSaveDraft?: (data: Partial<ApplicationData>) => void;
  readonly?: boolean;
}

// Interest categories for the application
export const INTEREST_CATEGORIES = [
  'Youth Development Programs',
  'Community Events & Festivals',
  'Environmental Initiatives',
  'Digital Inclusion Projects',
  'Local Business Support',
  'Arts & Culture Programs',
  'Sports & Recreation',
  'Education & Skills Training',
  'Social Services Support',
  'Community Safety Initiatives'
] as const;

export type InterestCategory = typeof INTEREST_CATEGORIES[number];

// Application status flow
export const APPLICATION_STATUS_FLOW: Record<ApplicationStatus, ApplicationStatus[]> = {
  submitted: ['under_review', 'rejected'],
  under_review: ['references_pending', 'assessment_invited', 'rejected'],
  references_pending: ['assessment_invited', 'rejected'],
  assessment_invited: ['assessment_completed', 'rejected'],
  assessment_completed: ['interview_scheduled', 'approved', 'rejected'],
  interview_scheduled: ['interview_completed', 'rejected'],
  interview_completed: ['approved', 'rejected'],
  approved: [],
  rejected: [],
  withdrawn: []
};

// Default values for new applications
export const DEFAULT_APPLICATION_DATA: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  postcode: '',
  employment: '',
  education: '',
  volunteerExperience: '',
  motivationStatement: '',
  availableHours: 4,
  specificInterests: [],
  digitalSkills: 3,
  leadershipExperience: '',
  communityInvolvement: '',
  safeguardingConsent: false,
  reference1Name: '',
  reference1Contact: '',
  reference2Name: '',
  reference2Contact: '',
  eligibilityDeclaration: false,
  dataProtectionConsent: false,
  backgroundCheckConsent: false
};