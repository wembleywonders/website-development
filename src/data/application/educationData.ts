// Education data for Step 2 application form

import { SelectOption } from '../../types/application/step2Types';

export const EDUCATION_LEVELS = [
  {
    value: 'no_formal_education',
    label: 'No formal education',
    description: 'Left school without qualifications'
  },
  {
    value: 'primary_school',
    label: 'Primary school',
    description: 'Completed primary education'
  },
  {
    value: 'secondary_school',
    label: 'Secondary school (GCSE/O-Levels)',
    description: 'GCSEs, O-Levels, or equivalent'
  },
  {
    value: 'college_diploma',
    label: 'College/A-Levels',
    description: 'A-Levels, BTEC, or college qualifications'
  },
  {
    value: 'undergraduate_degree',
    label: 'University degree (Bachelor\'s)',
    description: 'BA, BSc, or equivalent undergraduate degree'
  },
  {
    value: 'postgraduate_degree',
    label: 'Postgraduate degree',
    description: 'Master\'s, PhD, or professional doctorate'
  },
  {
    value: 'professional_qualification',
    label: 'Professional qualification',
    description: 'Chartered status, professional certification'
  },
  {
    value: 'vocational_training',
    label: 'Vocational training',
    description: 'Apprenticeship, trade qualification, or skills training'
  }
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  {
    value: 'employed_full_time',
    label: 'Employed (Full-time)',
    description: '30+ hours per week'
  },
  {
    value: 'employed_part_time',
    label: 'Employed (Part-time)',
    description: 'Less than 30 hours per week'
  },
  {
    value: 'self_employed',
    label: 'Self-employed',
    description: 'Running own business or freelancing'
  },
  {
    value: 'unemployed',
    label: 'Unemployed',
    description: 'Currently seeking employment'
  },
  {
    value: 'student',
    label: 'Student',
    description: 'Full-time or part-time education'
  },
  {
    value: 'retired',
    label: 'Retired',
    description: 'No longer in paid employment'
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Carer, volunteer, or other situation'
  }
];

export const WORK_SECTORS = [
  { value: 'agriculture', label: 'Agriculture & Farming' },
  { value: 'arts_entertainment', label: 'Arts & Entertainment' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'banking_finance', label: 'Banking & Finance' },
  { value: 'business_services', label: 'Business & Professional Services' },
  { value: 'charity_nonprofit', label: 'Charity & Non-Profit' },
  { value: 'construction', label: 'Construction & Property' },
  { value: 'education', label: 'Education' },
  { value: 'energy_utilities', label: 'Energy & Utilities' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'fashion_retail', label: 'Fashion & Retail' },
  { value: 'food_hospitality', label: 'Food & Hospitality' },
  { value: 'government', label: 'Government & Public Sector' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'hr_recruitment', label: 'HR & Recruitment' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'it_technology', label: 'IT & Technology' },
  { value: 'legal', label: 'Legal' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'marketing_advertising', label: 'Marketing & Advertising' },
  { value: 'media_communications', label: 'Media & Communications' },
  { value: 'property_real_estate', label: 'Property & Real Estate' },
  { value: 'research_development', label: 'Research & Development' },
  { value: 'sales', label: 'Sales' },
  { value: 'science', label: 'Science & Laboratory' },
  { value: 'security', label: 'Security' },
  { value: 'social_care', label: 'Social Care' },
  { value: 'sport_fitness', label: 'Sport & Fitness' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'tourism_travel', label: 'Tourism & Travel' },
  { value: 'transport_logistics', label: 'Transport & Logistics' },
  { value: 'other', label: 'Other' }
];

export const STUDY_FIELDS = [
  // STEM Fields
  { value: 'computer_science', label: 'Computer Science & IT', category: 'STEM' },
  { value: 'engineering', label: 'Engineering', category: 'STEM' },
  { value: 'mathematics', label: 'Mathematics & Statistics', category: 'STEM' },
  { value: 'biology', label: 'Biology & Life Sciences', category: 'STEM' },
  { value: 'chemistry', label: 'Chemistry', category: 'STEM' },
  { value: 'physics', label: 'Physics', category: 'STEM' },
  { value: 'medicine', label: 'Medicine & Healthcare', category: 'STEM' },
  { value: 'nursing', label: 'Nursing', category: 'STEM' },
  { value: 'dentistry', label: 'Dentistry', category: 'STEM' },
  { value: 'pharmacy', label: 'Pharmacy', category: 'STEM' },
  { value: 'veterinary', label: 'Veterinary Science', category: 'STEM' },

  // Business & Economics
  { value: 'business', label: 'Business Studies', category: 'Business' },
  { value: 'economics', label: 'Economics', category: 'Business' },
  { value: 'accounting', label: 'Accounting & Finance', category: 'Business' },
  { value: 'marketing', label: 'Marketing', category: 'Business' },
  { value: 'management', label: 'Management', category: 'Business' },

  // Arts & Humanities
  { value: 'english', label: 'English Literature & Language', category: 'Arts' },
  { value: 'history', label: 'History', category: 'Arts' },
  { value: 'philosophy', label: 'Philosophy', category: 'Arts' },
  { value: 'art_design', label: 'Art & Design', category: 'Arts' },
  { value: 'music', label: 'Music', category: 'Arts' },
  { value: 'drama', label: 'Drama & Theatre', category: 'Arts' },
  { value: 'film_media', label: 'Film & Media Studies', category: 'Arts' },
  { value: 'languages', label: 'Modern Languages', category: 'Arts' },

  // Social Sciences
  { value: 'psychology', label: 'Psychology', category: 'Social Sciences' },
  { value: 'sociology', label: 'Sociology', category: 'Social Sciences' },
  { value: 'social_work', label: 'Social Work', category: 'Social Sciences' },
  { value: 'politics', label: 'Politics & Government', category: 'Social Sciences' },
  { value: 'international_relations', label: 'International Relations', category: 'Social Sciences' },
  { value: 'criminology', label: 'Criminology', category: 'Social Sciences' },
  { value: 'anthropology', label: 'Anthropology', category: 'Social Sciences' },

  // Education
  { value: 'education', label: 'Education & Teaching', category: 'Education' },
  { value: 'early_childhood', label: 'Early Childhood Education', category: 'Education' },
  { value: 'special_education', label: 'Special Educational Needs', category: 'Education' },

  // Law
  { value: 'law', label: 'Law', category: 'Law' },
  { value: 'legal_studies', label: 'Legal Studies', category: 'Law' },

  // Vocational & Trade
  { value: 'construction_trades', label: 'Construction & Trades', category: 'Vocational' },
  { value: 'automotive', label: 'Automotive', category: 'Vocational' },
  { value: 'electrical', label: 'Electrical', category: 'Vocational' },
  { value: 'plumbing', label: 'Plumbing', category: 'Vocational' },
  { value: 'carpentry', label: 'Carpentry', category: 'Vocational' },
  { value: 'hairdressing', label: 'Hairdressing & Beauty', category: 'Vocational' },
  { value: 'catering', label: 'Catering & Hospitality', category: 'Vocational' },
  { value: 'childcare', label: 'Childcare', category: 'Vocational' },

  // Other
  { value: 'agriculture', label: 'Agriculture & Environmental Science', category: 'Other' },
  { value: 'sports_science', label: 'Sports Science', category: 'Other' },
  { value: 'journalism', label: 'Journalism', category: 'Other' },
  { value: 'architecture', label: 'Architecture', category: 'Other' },
  { value: 'other', label: 'Other', category: 'Other' }
];

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'chinese_mandarin', label: 'Chinese (Mandarin)' },
  { value: 'chinese_cantonese', label: 'Chinese (Cantonese)' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'urdu', label: 'Urdu' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'gujarati', label: 'Gujarati' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'polish', label: 'Polish' },
  { value: 'romanian', label: 'Romanian' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'greek', label: 'Greek' },
  { value: 'hebrew', label: 'Hebrew' },
  { value: 'persian_farsi', label: 'Persian (Farsi)' },
  { value: 'swahili', label: 'Swahili' },
  { value: 'amharic', label: 'Amharic' },
  { value: 'yoruba', label: 'Yoruba' },
  { value: 'igbo', label: 'Igbo' },
  { value: 'hausa', label: 'Hausa' },
  { value: 'somali', label: 'Somali' },
  { value: 'tagalog', label: 'Tagalog' },
  { value: 'vietnamese', label: 'Vietnamese' },
  { value: 'thai', label: 'Thai' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'swedish', label: 'Swedish' },
  { value: 'norwegian', label: 'Norwegian' },
  { value: 'danish', label: 'Danish' },
  { value: 'finnish', label: 'Finnish' },
  { value: 'other', label: 'Other' }
];

export const LANGUAGE_PROFICIENCY_LEVELS = [
  {
    value: 'basic',
    label: 'Basic',
    description: 'Can understand and use simple phrases'
  },
  {
    value: 'conversational',
    label: 'Conversational',
    description: 'Can hold basic conversations'
  },
  {
    value: 'fluent',
    label: 'Fluent',
    description: 'Can communicate effectively in most situations'
  },
  {
    value: 'native',
    label: 'Native/Bilingual',
    description: 'Native speaker or equivalent fluency'
  }
];

export const PROFESSIONAL_QUALIFICATIONS = [
  // Healthcare
  { value: 'registered_nurse', label: 'Registered Nurse (RGN)', category: 'Healthcare' },
  { value: 'health_visitor', label: 'Health Visitor', category: 'Healthcare' },
  { value: 'social_worker', label: 'Registered Social Worker', category: 'Healthcare' },
  { value: 'occupational_therapist', label: 'Occupational Therapist', category: 'Healthcare' },
  { value: 'physiotherapist', label: 'Physiotherapist', category: 'Healthcare' },
  { value: 'counsellor', label: 'Qualified Counsellor', category: 'Healthcare' },

  // Education
  { value: 'qualified_teacher', label: 'Qualified Teacher Status (QTS)', category: 'Education' },
  { value: 'pgce', label: 'PGCE', category: 'Education' },
  { value: 'senco', label: 'SENCO Qualification', category: 'Education' },
  { value: 'early_years', label: 'Early Years Professional', category: 'Education' },

  // Finance & Accounting
  { value: 'chartered_accountant', label: 'Chartered Accountant (ACA/ACCA)', category: 'Finance' },
  { value: 'certified_accountant', label: 'Certified Accountant', category: 'Finance' },
  { value: 'bookkeeper', label: 'Certified Bookkeeper', category: 'Finance' },

  // Legal
  { value: 'solicitor', label: 'Qualified Solicitor', category: 'Legal' },
  { value: 'barrister', label: 'Called to the Bar', category: 'Legal' },
  { value: 'legal_executive', label: 'Chartered Legal Executive', category: 'Legal' },

  // Engineering & Technical
  { value: 'chartered_engineer', label: 'Chartered Engineer', category: 'Engineering' },
  { value: 'electrician', label: 'Qualified Electrician', category: 'Engineering' },
  { value: 'plumber', label: 'Qualified Plumber', category: 'Engineering' },
  { value: 'gas_safe', label: 'Gas Safe Registered', category: 'Engineering' },

  // Business & Management
  { value: 'chartered_manager', label: 'Chartered Manager', category: 'Business' },
  { value: 'project_management', label: 'Project Management (PRINCE2/PMP)', category: 'Business' },
  { value: 'hr_professional', label: 'HR Professional (CIPD)', category: 'Business' },

  // IT & Digital
  { value: 'it_professional', label: 'IT Professional Certification', category: 'IT' },
  { value: 'digital_marketing', label: 'Digital Marketing Qualification', category: 'IT' },

  // Other
  { value: 'driving_instructor', label: 'Driving Instructor (ADI)', category: 'Other' },
  { value: 'youth_worker', label: 'Qualified Youth Worker', category: 'Other' },
  { value: 'community_worker', label: 'Community Development Worker', category: 'Other' },
  { value: 'other', label: 'Other Professional Qualification', category: 'Other' }
];

// Helper functions
export const getEducationLevelByValue = (value: string) => {
  return EDUCATION_LEVELS.find(level => level.value === value);
};

export const getStudyFieldsByCategory = (category: string) => {
  return STUDY_FIELDS.filter(field => field.category === category);
};

export const getStudyFieldCategories = () => {
  return [...new Set(STUDY_FIELDS.map(field => field.category))];
};

export const getProfessionalQualificationsByCategory = (category: string) => {
  return PROFESSIONAL_QUALIFICATIONS.filter(qual => qual.category === category);
};

export const getProfessionalQualificationCategories = () => {
  return [...new Set(PROFESSIONAL_QUALIFICATIONS.map(qual => qual.category))];
};