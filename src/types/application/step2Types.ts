// Step 2 Background & Experience Types

export type EmploymentStatus = 
  | 'employed_full_time'
  | 'employed_part_time'
  | 'self_employed'
  | 'unemployed'
  | 'student'
  | 'retired'
  | 'other';

export type EducationLevel = 
  | 'no_formal_education'
  | 'primary_school'
  | 'secondary_school'
  | 'college_diploma'
  | 'undergraduate_degree'
  | 'postgraduate_degree'
  | 'professional_qualification'
  | 'vocational_training';

export type TimeCommitment = 
  | '1-2_hours'
  | '3-5_hours'
  | '6-10_hours'
  | '11-15_hours'
  | '16-20_hours'
  | '20+_hours';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type DayOfWeek = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  yearsExperience?: number;
  description?: string;
}

export interface VolunteeringExperience {
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrentRole: boolean;
  description: string;
  skillsGained: string[];
  hoursPerWeek?: number;
}

export interface WorkExperience {
  jobTitle: string;
  employer: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  description: string;
  relevantSkills: string[];
  sector: string;
}

export interface EducationHistory {
  level: EducationLevel;
  institution: string;
  fieldOfStudy: string;
  graduationYear?: number;
  isCompleted: boolean;
  relevantToRole?: boolean;
}

export interface LanguageSkill {
  language: string;
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  canInterpret: boolean;
}

export interface InterestArea {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  hasExperience: boolean;
  experienceDescription?: string;
}

export interface Availability {
  daysAvailable: DayOfWeek[];
  timeSlots: {
    morning: boolean;    // 9-12
    afternoon: boolean;  // 12-17
    evening: boolean;    // 17-21
    weekend: boolean;    // Saturday/Sunday
  };
  flexibleSchedule: boolean;
  noticeRequired: 'immediate' | '24_hours' | '1_week' | '2_weeks';
  canTravelLocally: boolean;
  hasReliableTransport: boolean;
  maxTravelDistance?: number; // in miles
}

export interface Step2FormData {
  // Employment Information
  employmentStatus: EmploymentStatus;
  currentJobTitle?: string;
  currentEmployer?: string;
  workSector?: string;
  yearsInCurrentRole?: number;
  workExperience: WorkExperience[];
  
  // Education Information
  highestEducationLevel: EducationLevel;
  educationHistory: EducationHistory[];
  professionalQualifications: string[];
  currentlyStudying: boolean;
  currentStudyDetails?: string;
  
  // Experience & Skills
  hasVolunteeringExperience: boolean;
  volunteeringExperience: VolunteeringExperience[];
  skills: Skill[];
  languageSkills: LanguageSkill[];
  digitalSkillsLevel: SkillLevel;
  
  // Interests & Commitment
  interestAreas: InterestArea[];
  timeCommitment: TimeCommitment;
  availability: Availability;
  
  // Additional Information
  hasUnspentConvictions: boolean;
  convictionDetails?: string;
  hasHealthConditions: boolean;
  healthConditionDetails?: string;
  needsReasonableAdjustments: boolean;
  adjustmentDetails?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

export interface Step2ValidationErrors {
  employmentStatus?: string;
  currentJobTitle?: string;
  currentEmployer?: string;
  highestEducationLevel?: string;
  skills?: string;
  interestAreas?: string;
  timeCommitment?: string;
  availability?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  general?: string;
}

export interface Step2Props {
  data: Partial<Step2FormData>;
  errors: Step2ValidationErrors;
  onChange: (field: keyof Step2FormData, value: any) => void;
  onValidate: () => boolean;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

// Utility types for form sections
export type EmploymentSectionData = Pick<Step2FormData, 
  'employmentStatus' | 'currentJobTitle' | 'currentEmployer' | 'workSector' | 'yearsInCurrentRole' | 'workExperience'>;

export type EducationSectionData = Pick<Step2FormData, 
  'highestEducationLevel' | 'educationHistory' | 'professionalQualifications' | 'currentlyStudying' | 'currentStudyDetails'>;

export type ExperienceSectionData = Pick<Step2FormData, 
  'hasVolunteeringExperience' | 'volunteeringExperience' | 'skills' | 'languageSkills' | 'digitalSkillsLevel'>;

export type AvailabilitySectionData = Pick<Step2FormData, 
  'interestAreas' | 'timeCommitment' | 'availability'>;

// Form field component props
export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface MultiSelectOption extends SelectOption {
  category?: string;
  icon?: string;
}

// Constants for validation
export const VALIDATION_RULES = {
  MIN_SKILLS: 1,
  MAX_SKILLS: 8,
  MIN_INTEREST_AREAS: 1,
  MAX_INTEREST_AREAS: 5,
  MIN_VOLUNTEERING_DESCRIPTION: 10,
  MAX_VOLUNTEERING_DESCRIPTION: 500,
  MIN_WORK_DESCRIPTION: 10,
  MAX_WORK_DESCRIPTION: 300,
} as const;