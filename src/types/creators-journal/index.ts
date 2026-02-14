export interface JournalEntry {
  id: string;
  date: Date;
  type: 'reflection' | 'milestone' | 'project' | 'skill';
  content: string;
  attachments?: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
  completed: boolean;
  completedDate?: Date;
  evidence?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  dateAcquired: Date;
  verifiedBy?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';
  earnedDate: Date;
  criteria: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'planning' | 'in-progress' | 'completed' | 'archived';
  category: string;
  skills: string[];
  collaborators?: string[];
  mediaUrls?: string[];
}