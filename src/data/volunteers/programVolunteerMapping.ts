// data/volunteers/programVolunteerMapping.ts

export interface ProgramVolunteerNeeds {
  programId: string;
  programName: string;
  skillsNeeded: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  volunteerRoleIds: string[];
  urgency: 'low' | 'medium' | 'high';
  participantCapacity: number;
  currentVolunteers: number;
  minVolunteersNeeded: number;
}

export const PROGRAM_VOLUNTEER_MAPPING: ProgramVolunteerNeeds[] = [
  // Backstage Skills Pathways
  {
    programId: 'theater-construction',
    programName: 'Theater Construction Pathway',
    skillsNeeded: ['carpentry', 'set building', 'scenic painting', 'workshop safety'],
    experienceLevel: 'advanced',
    volunteerRoleIds: ['carpentry-workshop-lead'],
    urgency: 'high',
    participantCapacity: 15,
    currentVolunteers: 0,
    minVolunteersNeeded: 2
  },
  
  {
    programId: 'technical-theater',
    programName: 'Technical Theater Pathway',
    skillsNeeded: ['lighting technology', 'sound engineering', 'electrical systems'],
    experienceLevel: 'advanced',
    volunteerRoleIds: ['lighting-instructor'],
    urgency: 'high',
    participantCapacity: 12,
    currentVolunteers: 0,
    minVolunteersNeeded: 2
  },
  
  {
    programId: 'costume-design',
    programName: 'Costume & Design Pathway',
    skillsNeeded: ['costume making', 'sewing', 'fabric work', 'wardrobe management'],
    experienceLevel: 'intermediate',
    volunteerRoleIds: ['costume-design-mentor'],
    urgency: 'medium',
    participantCapacity: 10,
    currentVolunteers: 0,
    minVolunteersNeeded: 1
  },

  // Community Programs
  {
    programId: 'trubble-n-bass',
    programName: 'Trubble n Bass',
    skillsNeeded: ['music production', 'sound engineering', 'DJing', 'audio equipment'],
    experienceLevel: 'intermediate',
    volunteerRoleIds: ['lighting-instructor'], // Sound engineer overlap
    urgency: 'medium',
    participantCapacity: 20,
    currentVolunteers: 0,
    minVolunteersNeeded: 2
  },
  
  {
    programId: 'kaywanas-court',
    programName: "Kaywana's Court",
    skillsNeeded: ['drama', 'creative writing', 'arts and crafts', 'performance'],
    experienceLevel: 'intermediate',
    volunteerRoleIds: ['costume-design-mentor', 'program-facilitator'],
    urgency: 'low',
    participantCapacity: 25,
    currentVolunteers: 1,
    minVolunteersNeeded: 2
  },
  
  {
    programId: 'bright-sparks',
    programName: 'Bright Sparks',
    skillsNeeded: ['STEM', 'coding', 'robotics', 'innovation', 'electronics'],
    experienceLevel: 'intermediate',
    volunteerRoleIds: ['lighting-instructor'], // Electronics overlap
    urgency: 'high',
    participantCapacity: 18,
    currentVolunteers: 0,
    minVolunteersNeeded: 3
  },
  
  {
    programId: 'connoisseurs-club',
    programName: 'Connoisseurs Club',
    skillsNeeded: ['leadership', 'mentoring', 'project management', 'facilitation'],
    experienceLevel: 'advanced',
    volunteerRoleIds: ['program-facilitator'],
    urgency: 'medium',
    participantCapacity: 15,
    currentVolunteers: 0,
    minVolunteersNeeded: 2
  },

  // Workshop-Specific Needs
  {
    programId: 'carpentry-workshop',
    programName: 'Carpentry Skills Workshop',
    skillsNeeded: ['carpentry', 'woodworking', 'tool operation', 'safety protocols'],
    experienceLevel: 'advanced',
    volunteerRoleIds: ['carpentry-workshop-lead'],
    urgency: 'high',
    participantCapacity: 8,
    currentVolunteers: 0,
    minVolunteersNeeded: 1
  },
  
  {
    programId: 'lighting-tech-workshop',
    programName: 'Lighting Technology Workshop',
    skillsNeeded: ['stage lighting', 'DMX systems', 'electrical safety', 'lighting consoles'],
    experienceLevel: 'advanced',
    volunteerRoleIds: ['lighting-instructor'],
    urgency: 'high',
    participantCapacity: 10,
    currentVolunteers: 0,
    minVolunteersNeeded: 1
  },
  
  {
    programId: 'costume-making-workshop',
    programName: 'Costume Making Workshop',
    skillsNeeded: ['sewing', 'pattern making', 'fabric selection', 'costume design'],
    experienceLevel: 'intermediate',
    volunteerRoleIds: ['costume-design-mentor'],
    urgency: 'medium',
    participantCapacity: 12,
    currentVolunteers: 0,
    minVolunteersNeeded: 1
  }
];

export const RECRUITMENT_TARGETS = {
  'hackspace-community': [
    'technical-theater',
    'bright-sparks',
    'lighting-tech-workshop'
  ],
  'retired-professionals': [
    'theater-construction',
    'carpentry-workshop',
    'costume-design',
    'connoisseurs-club'
  ],
  'amateur-theater': [
    'costume-design',
    'kaywanas-court',
    'theater-construction'
  ],
  'educational-sector': [
    'bright-sparks',
    'connoisseurs-club',
    'youth-programs'
  ]
};

export function getProgramVolunteerNeeds(programId: string): ProgramVolunteerNeeds | undefined {
  return PROGRAM_VOLUNTEER_MAPPING.find(program => program.programId === programId);
}

export function getHighPriorityPrograms(): ProgramVolunteerNeeds[] {
  return PROGRAM_VOLUNTEER_MAPPING.filter(program => program.urgency === 'high');
}

export function getUnderStaffedPrograms(): ProgramVolunteerNeeds[] {
  return PROGRAM_VOLUNTEER_MAPPING.filter(program => 
    program.currentVolunteers < program.minVolunteersNeeded
  );
}

export function getVolunteerCapacityStatus(programId: string): {
  status: 'critical' | 'low' | 'adequate' | 'good';
  message: string;
} {
  const program = getProgramVolunteerNeeds(programId);
  if (!program) {
    return { status: 'critical', message: 'Program not found' };
  }

  const ratio = program.currentVolunteers / program.minVolunteersNeeded;
  
  if (ratio === 0) {
    return { 
      status: 'critical', 
      message: `No volunteers assigned. Need ${program.minVolunteersNeeded} to launch.` 
    };
  } else if (ratio < 0.5) {
    return { 
      status: 'critical', 
      message: `Critically understaffed. Need ${program.minVolunteersNeeded - program.currentVolunteers} more volunteers.` 
    };
  } else if (ratio < 1) {
    return { 
      status: 'low', 
      message: `Need ${program.minVolunteersNeeded - program.currentVolunteers} more volunteer(s) to reach minimum staffing.` 
    };
  } else if (ratio === 1) {
    return { 
      status: 'adequate', 
      message: 'Minimum staffing met. Additional volunteers would improve program quality.' 
    };
  } else {
    return { 
      status: 'good', 
      message: 'Well staffed. Program can support full participant capacity.' 
    };
  }
}

export function getRecommendedRecruitmentChannels(programId: string): string[] {
  const channels: string[] = [];
  
  Object.entries(RECRUITMENT_TARGETS).forEach(([channel, programs]) => {
    if (programs.includes(programId)) {
      channels.push(channel);
    }
  });
  
  return channels;
}